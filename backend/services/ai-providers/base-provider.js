/**
 * Base AI Provider Interface
 * All providers must implement this interface
 */

class BaseProvider {
  constructor(name) {
    this.name = name;
  }

  /**
   * Check if provider is properly configured
   * @returns {boolean}
   */
  isConfigured() {
    throw new Error('Method isConfigured() must be implemented');
  }

  /**
   * Chat completion - Generate text response
   * @param {Array} messages - Array of {role, content} objects
   * @param {Object} options - Provider-specific options
   * @returns {Promise<{content: string, usage?: Object}>}
   */
  async chatCompletion(messages, options = {}) {
    throw new Error('Method chatCompletion() must be implemented');
  }

  /**
   * Chat completion with JSON response
   * @param {Array} messages - Array of {role, content} objects
   * @param {Object} options - Provider-specific options
   * @returns {Promise<Object>} Parsed JSON object
   */
  async chatCompletionJSON(messages, options = {}) {
    throw new Error('Method chatCompletionJSON() must be implemented');
  }

  /**
   * Speech-to-text transcription
   * @param {string} audioFilePath - Path to audio file
   * @param {Object} options - Provider-specific options
   * @returns {Promise<{text: string, duration?: number, language?: string, words?: Array}>}
   */
  async transcribe(audioFilePath, options = {}) {
    throw new Error('Method transcribe() not supported by this provider');
  }

  /**
   * Text-to-speech synthesis
   * @param {string} text - Text to synthesize
   * @param {Object} options - Provider-specific options
   * @returns {Promise<Buffer>} Audio buffer
   */
  async synthesize(text, options = {}) {
    throw new Error('Method synthesize() not supported by this provider');
  }

  /**
   * Health check
   * @returns {Promise<{ok: boolean, error?: string}>}
   */
  async healthCheck() {
    throw new Error('Method healthCheck() must be implemented');
  }
}

module.exports = BaseProvider;
