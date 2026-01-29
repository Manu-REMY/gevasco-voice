/**
 * Mistral AI Provider Implementation
 * Supports: Chat completion only (no STT/TTS)
 * API Documentation: https://docs.mistral.ai/
 */

const BaseProvider = require('./base-provider');

class MistralProvider extends BaseProvider {
  constructor() {
    super('mistral');
    this.apiKey = process.env.MISTRAL_API_KEY;
    this.baseUrl = process.env.MISTRAL_API_URL || 'https://api.mistral.ai/v1';
  }

  isConfigured() {
    return !!this.apiKey;
  }

  /**
   * Make API request to Mistral
   */
  async _request(endpoint, body) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(error.message || `Mistral API error: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Chat completion
   */
  async chatCompletion(messages, options = {}) {
    if (!this.isConfigured()) {
      throw new Error('Mistral API key not configured');
    }

    const {
      model = process.env.MISTRAL_CHAT_MODEL || 'mistral-large-latest',
      temperature = 0.7,
      maxTokens = 2000
    } = options;

    try {
      const response = await this._request('/chat/completions', {
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
      throw new Error(`Mistral chat completion failed: ${error.message}`);
    }
  }

  /**
   * Chat completion with JSON response
   * Note: Mistral supports JSON mode with response_format
   */
  async chatCompletionJSON(messages, options = {}) {
    if (!this.isConfigured()) {
      throw new Error('Mistral API key not configured');
    }

    const {
      model = process.env.MISTRAL_CHAT_MODEL || 'mistral-large-latest',
      temperature = 0.3,
      maxTokens = 2000
    } = options;

    // Ensure the last user message asks for JSON
    const jsonMessages = messages.map((msg, idx) => {
      if (idx === messages.length - 1 && msg.role === 'user') {
        return {
          ...msg,
          content: msg.content + '\n\nIMPORTANT: Respond with valid JSON only, no other text.'
        };
      }
      return msg;
    });

    try {
      const response = await this._request('/chat/completions', {
        model,
        messages: jsonMessages,
        temperature,
        max_tokens: maxTokens,
        response_format: { type: 'json_object' }
      });

      const content = response.choices[0].message.content;

      // Try to parse JSON, handle potential markdown code blocks
      let jsonContent = content;
      if (content.includes('```json')) {
        jsonContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      } else if (content.includes('```')) {
        jsonContent = content.replace(/```\n?/g, '');
      }

      return JSON.parse(jsonContent.trim());
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error(`Mistral JSON parse error: Invalid JSON response`);
      }
      throw new Error(`Mistral JSON completion failed: ${error.message}`);
    }
  }

  /**
   * Speech-to-text - Not supported by Mistral
   */
  async transcribe(audioFilePath, options = {}) {
    throw new Error('Mistral does not support speech-to-text. Configure STT_PROVIDER=openai for transcription.');
  }

  /**
   * Text-to-speech - Not supported by Mistral
   */
  async synthesize(text, options = {}) {
    throw new Error('Mistral does not support text-to-speech. Configure TTS_PROVIDER=openai for synthesis.');
  }

  /**
   * Health check
   */
  async healthCheck() {
    if (!this.isConfigured()) {
      return { ok: false, error: 'API key not configured' };
    }

    try {
      // Use models endpoint for health check
      const response = await fetch(`${this.baseUrl}/models`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (response.ok) {
        return { ok: true };
      }

      return { ok: false, error: `HTTP ${response.status}` };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }
}

module.exports = MistralProvider;
