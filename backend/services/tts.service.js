const OpenAI = require('openai');

class TTSService {
  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }
    this.client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async synthesize(text, voice = 'nova', speed = 0.95) {
    try {
      // Available voices: alloy, echo, fable, onyx, nova, shimmer
      // nova is recommended for clear, pleasant female voice
      const response = await this.client.audio.speech.create({
        model: 'tts-1',
        voice: voice,
        input: text,
        speed: speed // Slightly slower for better comprehension
      });

      const buffer = Buffer.from(await response.arrayBuffer());
      return buffer;
    } catch (error) {
      throw new Error(`TTS synthesis failed: ${error.message}`);
    }
  }
}

module.exports = new TTSService();
