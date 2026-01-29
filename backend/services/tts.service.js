const { getTTSProvider } = require('./ai-providers');

class TTSService {
  constructor() {
    // Provider will be resolved at runtime
    this.provider = null;
  }

  /**
   * Get the TTS provider (lazy initialization)
   */
  _getProvider() {
    if (!this.provider) {
      this.provider = getTTSProvider();
    }
    return this.provider;
  }

  async synthesize(text, voice = 'nova', speed = 1.10) {
    try {
      const provider = this._getProvider();
      // Available voices for OpenAI: alloy, echo, fable, onyx, nova, shimmer
      // nova is recommended for clear, pleasant female voice
      const buffer = await provider.synthesize(text, {
        voice: voice,
        speed: speed
      });

      return buffer;
    } catch (error) {
      throw new Error(`TTS synthesis failed: ${error.message}`);
    }
  }
}

module.exports = new TTSService();
