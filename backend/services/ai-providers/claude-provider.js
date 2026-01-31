/**
 * Claude (Anthropic) Provider Implementation
 * Supports: Chat completion only (no STT/TTS)
 * API Documentation: https://docs.anthropic.com/
 */

const BaseProvider = require('./base-provider');

class ClaudeProvider extends BaseProvider {
  constructor() {
    super('claude');
    this.apiKey = process.env.ANTHROPIC_API_KEY;
    this.baseUrl = process.env.ANTHROPIC_API_URL || 'https://api.anthropic.com';
    this.apiVersion = '2023-06-01';
  }

  isConfigured() {
    return !!this.apiKey;
  }

  /**
   * Convert OpenAI-style messages to Claude format
   */
  _convertMessages(messages) {
    // Claude has a different message format
    // System message is separate, user/assistant alternate
    let systemMessage = '';
    const convertedMessages = [];

    for (const msg of messages) {
      if (msg.role === 'system') {
        systemMessage = msg.content;
      } else {
        convertedMessages.push({
          role: msg.role,
          content: msg.content
        });
      }
    }

    return { system: systemMessage, messages: convertedMessages };
  }

  /**
   * Make API request to Anthropic
   */
  async _request(endpoint, body) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'x-api-key': this.apiKey,
        'anthropic-version': this.apiVersion
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: { message: response.statusText } }));
      throw new Error(error.error?.message || `Anthropic API error: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Chat completion
   */
  async chatCompletion(messages, options = {}) {
    if (!this.isConfigured()) {
      throw new Error('Anthropic API key not configured');
    }

    const {
      model = process.env.CLAUDE_CHAT_MODEL || 'claude-3-5-sonnet-20241022',
      temperature = 0.7,
      maxTokens = 2000
    } = options;

    try {
      const { system, messages: convertedMessages } = this._convertMessages(messages);

      const requestBody = {
        model,
        max_tokens: maxTokens,
        messages: convertedMessages
      };

      // Only add system if present
      if (system) {
        requestBody.system = system;
      }

      // Claude doesn't support temperature=0, minimum is 0.01
      if (temperature > 0) {
        requestBody.temperature = Math.max(0.01, temperature);
      }

      const response = await this._request('/v1/messages', requestBody);

      return {
        content: this.normalizeUTF8(response.content[0].text),
        usage: {
          prompt_tokens: response.usage?.input_tokens,
          completion_tokens: response.usage?.output_tokens,
          total_tokens: (response.usage?.input_tokens || 0) + (response.usage?.output_tokens || 0)
        }
      };
    } catch (error) {
      throw new Error(`Claude chat completion failed: ${error.message}`);
    }
  }

  /**
   * Chat completion with JSON response
   * Note: Claude doesn't have native JSON mode, we use prompt engineering
   */
  async chatCompletionJSON(messages, options = {}) {
    if (!this.isConfigured()) {
      throw new Error('Anthropic API key not configured');
    }

    const {
      model = process.env.CLAUDE_CHAT_MODEL || 'claude-3-5-sonnet-20241022',
      temperature = 0.3,
      maxTokens = 2000
    } = options;

    // Modify the last user message to request JSON
    const jsonMessages = messages.map((msg, idx) => {
      if (idx === messages.length - 1 && msg.role === 'user') {
        return {
          ...msg,
          content: msg.content + '\n\nIMPORTANT: Your response MUST be valid JSON only. No explanations, no markdown code blocks, just the raw JSON object.'
        };
      }
      // For system messages, also reinforce JSON requirement
      if (msg.role === 'system') {
        return {
          ...msg,
          content: msg.content + '\n\nYou MUST respond with valid JSON only. No other text or formatting.'
        };
      }
      return msg;
    });

    try {
      const { system, messages: convertedMessages } = this._convertMessages(jsonMessages);

      const requestBody = {
        model,
        max_tokens: maxTokens,
        messages: convertedMessages
      };

      if (system) {
        requestBody.system = system;
      }

      if (temperature > 0) {
        requestBody.temperature = Math.max(0.01, temperature);
      }

      const response = await this._request('/v1/messages', requestBody);
      const content = this.normalizeUTF8(response.content[0].text);

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
        throw new Error(`Claude JSON parse error: Invalid JSON response`);
      }
      throw new Error(`Claude JSON completion failed: ${error.message}`);
    }
  }

  /**
   * Speech-to-text - Not supported by Claude
   */
  async transcribe(audioFilePath, options = {}) {
    throw new Error('Claude does not support speech-to-text. Configure STT_PROVIDER=openai for transcription.');
  }

  /**
   * Text-to-speech - Not supported by Claude
   */
  async synthesize(text, options = {}) {
    throw new Error('Claude does not support text-to-speech. Configure TTS_PROVIDER=openai for synthesis.');
  }

  /**
   * Health check
   */
  async healthCheck() {
    if (!this.isConfigured()) {
      return { ok: false, error: 'API key not configured' };
    }

    try {
      // Simple ping with minimal request
      const response = await fetch(`${this.baseUrl}/v1/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': this.apiVersion
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307', // Use cheapest model for health check
          max_tokens: 10,
          messages: [{ role: 'user', content: 'Hi' }]
        })
      });

      if (response.ok) {
        return { ok: true };
      }

      // Check if it's an auth error vs other error
      const error = await response.json().catch(() => null);
      if (response.status === 401) {
        return { ok: false, error: 'Invalid API key' };
      }

      return { ok: false, error: error?.error?.message || `HTTP ${response.status}` };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }
}

module.exports = ClaudeProvider;
