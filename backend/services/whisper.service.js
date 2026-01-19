const OpenAI = require('openai');
const fs = require('fs');

class WhisperService {
  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }
    this.client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async transcribe(audioFilePath) {
    try {
      const audioFile = fs.createReadStream(audioFilePath);

      const response = await this.client.audio.transcriptions.create({
        file: audioFile,
        model: 'whisper-1',
        language: 'fr',
        response_format: 'verbose_json',
        timestamp_granularities: ['word']
      });

      // Cleanup file after transcription
      try {
        fs.unlinkSync(audioFilePath);
      } catch (cleanupError) {
        console.warn('Could not cleanup audio file:', cleanupError);
      }

      return {
        text: response.text,
        duration: response.duration,
        language: response.language,
        words: response.words || []
      };
    } catch (error) {
      // Cleanup on error
      try {
        fs.unlinkSync(audioFilePath);
      } catch (cleanupError) {
        // Ignore cleanup errors
      }
      throw new Error(`Whisper transcription failed: ${error.message}`);
    }
  }
}

module.exports = new WhisperService();
