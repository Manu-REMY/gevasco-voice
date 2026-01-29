/**
 * OpenAI Provider Implementation
 * Supports: Chat, Speech-to-Text (Whisper), Text-to-Speech
 */

const BaseProvider = require('./base-provider');
const OpenAI = require('openai');
const fs = require('fs');

class OpenAIProvider extends BaseProvider {
  constructor() {
    super('openai');
    this.client = null;
    this.apiKey = process.env.OPENAI_API_KEY;

    if (this.apiKey) {
      this.client = new OpenAI({ apiKey: this.apiKey });
    }
  }

  isConfigured() {
    return !!this.apiKey && this.apiKey.startsWith('sk-');
  }

  /**
   * Chat completion
   */
  async chatCompletion(messages, options = {}) {
    if (!this.isConfigured()) {
      throw new Error('OpenAI API key not configured');
    }

    const {
      model = process.env.OPENAI_CHAT_MODEL || 'gpt-4-turbo-preview',
      temperature = 0.7,
      maxTokens = 2000
    } = options;

    try {
      const response = await this.client.chat.completions.create({
        model,
        messages,
        temperature,
        max_tokens: maxTokens
      });

      return {
        content: response.choices[0].message.content,
        usage: response.usage
      };
    } catch (error) {
      throw new Error(`OpenAI chat completion failed: ${error.message}`);
    }
  }

  /**
   * Chat completion with JSON response
   */
  async chatCompletionJSON(messages, options = {}) {
    if (!this.isConfigured()) {
      throw new Error('OpenAI API key not configured');
    }

    const {
      model = process.env.OPENAI_CHAT_MODEL || 'gpt-4-turbo-preview',
      temperature = 0.3,
      maxTokens = 2000
    } = options;

    try {
      const response = await this.client.chat.completions.create({
        model,
        messages,
        response_format: { type: 'json_object' },
        temperature,
        max_tokens: maxTokens
      });

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      throw new Error(`OpenAI JSON completion failed: ${error.message}`);
    }
  }

  /**
   * Speech-to-text transcription using Whisper
   */
  async transcribe(audioFilePath, options = {}) {
    if (!this.isConfigured()) {
      throw new Error('OpenAI API key not configured');
    }

    const {
      model = process.env.OPENAI_STT_MODEL || 'whisper-1',
      language = 'fr',
      responseFormat = 'verbose_json'
    } = options;

    try {
      console.log('OpenAI Whisper transcribing:', audioFilePath);

      const stats = fs.statSync(audioFilePath);
      console.log('Audio file size:', stats.size, 'bytes');

      const audioFile = fs.createReadStream(audioFilePath);

      const response = await this.client.audio.transcriptions.create({
        file: audioFile,
        model,
        language,
        response_format: responseFormat,
        timestamp_granularities: ['word']
      });

      console.log('Transcription successful');

      return {
        text: response.text,
        duration: response.duration,
        language: response.language,
        words: response.words || []
      };
    } catch (error) {
      console.error('OpenAI Whisper error:', error.message);
      throw new Error(`OpenAI transcription failed: ${error.message}`);
    }
  }

  /**
   * Text-to-speech synthesis
   */
  async synthesize(text, options = {}) {
    if (!this.isConfigured()) {
      throw new Error('OpenAI API key not configured');
    }

    const {
      model = process.env.OPENAI_TTS_MODEL || 'tts-1',
      voice = process.env.OPENAI_TTS_VOICE || 'nova',
      speed = 1.10
    } = options;

    try {
      const response = await this.client.audio.speech.create({
        model,
        voice,
        input: text,
        speed
      });

      const buffer = Buffer.from(await response.arrayBuffer());
      return buffer;
    } catch (error) {
      throw new Error(`OpenAI TTS synthesis failed: ${error.message}`);
    }
  }

  /**
   * Health check
   */
  async healthCheck() {
    if (!this.isConfigured()) {
      return { ok: false, error: 'API key not configured' };
    }

    try {
      // Simple models list to verify API connection
      await this.client.models.list();
      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }
}

module.exports = OpenAIProvider;
