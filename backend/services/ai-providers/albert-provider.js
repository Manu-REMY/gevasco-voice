/**
 * Albert Provider Implementation
 * Albert is a French AI model, typically deployed via Hugging Face or custom endpoints
 * Supports: Chat completion only (no STT/TTS)
 *
 * Albert can be accessed via:
 * - Hugging Face Inference API
 * - Custom deployment endpoints
 * - French government's Albert API (if available)
 */

const BaseProvider = require('./base-provider');

class AlbertProvider extends BaseProvider {
  constructor() {
    super('albert');
    this.apiKey = process.env.ALBERT_API_KEY;
    // Albert can be deployed on various endpoints
    this.baseUrl = process.env.ALBERT_API_URL || 'https://api-inference.huggingface.co/models';
    // Default to AgentPublic/albertlight-7b or similar French model
    this.defaultModel = process.env.ALBERT_MODEL || 'AgentPublic/llama3-instruct-8b';
    this.isHuggingFace = this.baseUrl.includes('huggingface.co');
  }

  isConfigured() {
    return !!this.apiKey;
  }

  /**
   * Make API request to Albert/Hugging Face
   */
  async _request(model, body) {
    const url = this.isHuggingFace
      ? `${this.baseUrl}/${model}`
      : this.baseUrl;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(error.error || `Albert API error: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Format messages for text generation
   * Converts chat messages to a single prompt string
   */
  _formatPrompt(messages) {
    let prompt = '';

    for (const msg of messages) {
      if (msg.role === 'system') {
        prompt += `<|system|>\n${msg.content}\n`;
      } else if (msg.role === 'user') {
        prompt += `<|user|>\n${msg.content}\n`;
      } else if (msg.role === 'assistant') {
        prompt += `<|assistant|>\n${msg.content}\n`;
      }
    }

    prompt += '<|assistant|>\n';
    return prompt;
  }

  /**
   * Alternative: Format as simple conversation for models without special tokens
   */
  _formatSimplePrompt(messages) {
    let systemPrompt = '';
    let conversation = '';

    for (const msg of messages) {
      if (msg.role === 'system') {
        systemPrompt = msg.content;
      } else if (msg.role === 'user') {
        conversation += `Utilisateur: ${msg.content}\n\n`;
      } else if (msg.role === 'assistant') {
        conversation += `Assistant: ${msg.content}\n\n`;
      }
    }

    return systemPrompt
      ? `${systemPrompt}\n\n${conversation}Assistant:`
      : `${conversation}Assistant:`;
  }

  /**
   * Chat completion
   */
  async chatCompletion(messages, options = {}) {
    if (!this.isConfigured()) {
      throw new Error('Albert API key not configured');
    }

    const {
      model = this.defaultModel,
      temperature = 0.7,
      maxTokens = 2000
    } = options;

    try {
      const prompt = this._formatSimplePrompt(messages);

      let response;

      if (this.isHuggingFace) {
        // Hugging Face Inference API format
        response = await this._request(model, {
          inputs: prompt,
          parameters: {
            max_new_tokens: maxTokens,
            temperature: temperature,
            return_full_text: false,
            do_sample: temperature > 0
          }
        });

        // HF returns array of generated texts
        const generatedText = Array.isArray(response)
          ? response[0]?.generated_text || response[0]
          : response.generated_text || response;

        return {
          content: typeof generatedText === 'string' ? generatedText.trim() : String(generatedText),
          usage: null // HF doesn't provide usage stats
        };
      } else {
        // Custom OpenAI-compatible endpoint
        response = await this._request(model, {
          model,
          messages,
          temperature,
          max_tokens: maxTokens
        });

        return {
          content: response.choices?.[0]?.message?.content || response.content || '',
          usage: response.usage
        };
      }
    } catch (error) {
      throw new Error(`Albert chat completion failed: ${error.message}`);
    }
  }

  /**
   * Chat completion with JSON response
   */
  async chatCompletionJSON(messages, options = {}) {
    if (!this.isConfigured()) {
      throw new Error('Albert API key not configured');
    }

    const {
      model = this.defaultModel,
      temperature = 0.3,
      maxTokens = 2000
    } = options;

    // Modify messages to strongly request JSON output
    const jsonMessages = messages.map((msg, idx) => {
      if (idx === messages.length - 1 && msg.role === 'user') {
        return {
          ...msg,
          content: msg.content + '\n\nIMPORTANT: Réponds UNIQUEMENT avec du JSON valide. Pas d\'explication, pas de markdown, juste l\'objet JSON brut.'
        };
      }
      if (msg.role === 'system') {
        return {
          ...msg,
          content: msg.content + '\n\nTu DOIS répondre uniquement avec du JSON valide. Aucun autre texte ou formatage.'
        };
      }
      return msg;
    });

    try {
      const result = await this.chatCompletion(jsonMessages, { model, temperature, maxTokens });
      let content = result.content;

      // Clean up potential markdown or extra text
      if (content.includes('```json')) {
        content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      } else if (content.includes('```')) {
        content = content.replace(/```\n?/g, '');
      }

      // Try to extract JSON from response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      return JSON.parse(content.trim());
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error(`Albert JSON parse error: Invalid JSON response`);
      }
      throw new Error(`Albert JSON completion failed: ${error.message}`);
    }
  }

  /**
   * Speech-to-text - Not supported by Albert
   */
  async transcribe(audioFilePath, options = {}) {
    throw new Error('Albert does not support speech-to-text. Configure STT_PROVIDER=openai for transcription.');
  }

  /**
   * Text-to-speech - Not supported by Albert
   */
  async synthesize(text, options = {}) {
    throw new Error('Albert does not support text-to-speech. Configure TTS_PROVIDER=openai for synthesis.');
  }

  /**
   * Health check
   */
  async healthCheck() {
    if (!this.isConfigured()) {
      return { ok: false, error: 'API key not configured' };
    }

    try {
      if (this.isHuggingFace) {
        // Check model availability on HF
        const response = await fetch(`${this.baseUrl}/${this.defaultModel}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            inputs: 'test',
            parameters: { max_new_tokens: 5 }
          })
        });

        // HF returns 503 if model is loading, which is still "ok"
        if (response.ok || response.status === 503) {
          return { ok: true, loading: response.status === 503 };
        }

        return { ok: false, error: `HTTP ${response.status}` };
      } else {
        // Custom endpoint health check
        const response = await fetch(this.baseUrl.replace('/chat/completions', '/health') || this.baseUrl, {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`
          }
        });

        return { ok: response.ok, error: response.ok ? null : `HTTP ${response.status}` };
      }
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }
}

module.exports = AlbertProvider;
