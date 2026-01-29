const fs = require('fs');
const { getSTTProvider } = require('./ai-providers');

class WhisperService {
  constructor() {
    // Provider will be resolved at runtime
    this.provider = null;
  }

  /**
   * Get the STT provider (lazy initialization)
   */
  _getProvider() {
    if (!this.provider) {
      this.provider = getSTTProvider();
    }
    return this.provider;
  }

  async transcribe(audioFilePath) {
    try {
      console.log('Transcribing audio file:', audioFilePath);

      // Check if file exists and get size
      const stats = fs.statSync(audioFilePath);
      console.log('Audio file size:', stats.size, 'bytes');

      const provider = this._getProvider();
      const result = await provider.transcribe(audioFilePath, {
        language: 'fr'
      });

      console.log('Transcription successful');

      // Cleanup file after transcription
      try {
        fs.unlinkSync(audioFilePath);
      } catch (cleanupError) {
        console.warn('Could not cleanup audio file:', cleanupError);
      }

      return {
        text: result.text,
        duration: result.duration,
        language: result.language,
        words: result.words || []
      };
    } catch (error) {
      console.error('STT error details:', {
        message: error.message
      });

      // Cleanup on error
      try {
        fs.unlinkSync(audioFilePath);
      } catch (cleanupError) {
        // Ignore cleanup errors
      }
      throw new Error(`Transcription failed: ${error.message}`);
    }
  }
}

module.exports = new WhisperService();
