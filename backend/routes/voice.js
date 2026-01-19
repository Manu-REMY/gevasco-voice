const express = require('express');
const router = express.Router();
const multer = require('multer');
const whisperService = require('../services/whisper.service');
const gptService = require('../services/gpt.service');
const ttsService = require('../services/tts.service');

// Configure multer for audio upload
const upload = multer({
  dest: 'backend/uploads/',
  limits: {
    fileSize: parseInt(process.env.MAX_AUDIO_SIZE_MB || 25) * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['audio/webm', 'audio/mp4', 'audio/mpeg', 'audio/wav', 'audio/ogg'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Audio type ${file.mimetype} not supported`));
    }
  }
});

// POST /api/voice/transcribe
// Transcribe audio to text using Whisper
router.post('/transcribe', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No audio file provided'
      });
    }

    const transcript = await whisperService.transcribe(req.file.path);

    res.json({
      success: true,
      transcript: transcript
    });

  } catch (error) {
    console.error('Transcription error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Transcription failed'
    });
  }
});

// POST /api/voice/enrich
// Enrich transcription with GPT-4
router.post('/enrich', async (req, res) => {
  try {
    const { transcript, questionContext, existingData } = req.body;

    if (!transcript) {
      return res.status(400).json({
        success: false,
        error: 'Transcript is required'
      });
    }

    if (!questionContext) {
      return res.status(400).json({
        success: false,
        error: 'Question context is required'
      });
    }

    const enriched = await gptService.enrichResponse(
      transcript,
      questionContext,
      existingData || {}
    );

    res.json({
      success: true,
      enriched: enriched
    });

  } catch (error) {
    console.error('Enrichment error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Enrichment failed'
    });
  }
});

// POST /api/voice/tts
// Generate speech from text
router.post('/tts', async (req, res) => {
  try {
    const { text, voice, speed } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        error: 'Text is required'
      });
    }

    const audioBuffer = await ttsService.synthesize(
      text,
      voice || 'nova',
      speed || 0.95
    );

    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': audioBuffer.length
    });
    res.send(audioBuffer);

  } catch (error) {
    console.error('TTS error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'TTS generation failed'
    });
  }
});

// POST /api/voice/summary
// Generate final summary
router.post('/summary', async (req, res) => {
  try {
    const { formData } = req.body;

    if (!formData) {
      return res.status(400).json({
        success: false,
        error: 'Form data is required'
      });
    }

    const summary = await gptService.generateSummary(formData);

    res.json({
      success: true,
      summary: summary
    });

  } catch (error) {
    console.error('Summary generation error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Summary generation failed'
    });
  }
});

module.exports = router;
