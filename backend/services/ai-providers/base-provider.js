/**
 * Base AI Provider Interface
 * All providers must implement this interface
 */

class BaseProvider {
  constructor(name) {
    this.name = name;
  }

  /**
   * Normalize UTF-8 text to fix double encoding issues
   * Detects patterns like "Ã©" (é double-encoded) and fixes them
   * @param {string} text - Text to normalize
   * @returns {string} Normalized text
   */
  normalizeUTF8(text) {
    if (!text || typeof text !== 'string') return text;

    // Detect common double-encoded UTF-8 patterns
    // "Ã©" = é, "Ã¨" = è, "Ã " = à, "Ã§" = ç, etc.
    if (/Ã[©¨ ´§¹®¢ª«¯¼±â]|Ã©|Ã¨|Ã |Ã´|Ã§|Ã¹|Ã®|Ã¢|Ãª|Ã«|Ã¯|Ã¼|Ã±|Å"|Ã€|Ã‰|Ãˆ|Ã"|Ã™|Ã‡/.test(text)) {
      try {
        // Re-encode as latin1 then decode as UTF-8
        return Buffer.from(text, 'latin1').toString('utf8');
      } catch (e) {
        return text;
      }
    }
    return text;
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
