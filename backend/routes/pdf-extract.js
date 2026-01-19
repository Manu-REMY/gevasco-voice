const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs').promises;
const pdfParserService = require('../services/pdf-parser.service');

// Configure multer for file upload
const upload = multer({
  dest: 'backend/uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB max
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

router.post('/extract', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No PDF file provided'
      });
    }

    // Read PDF file
    const pdfBuffer = await fs.readFile(req.file.path);

    // Extract data
    const result = await pdfParserService.extractData(pdfBuffer);

    // Cleanup uploaded file
    try {
      await fs.unlink(req.file.path);
    } catch (cleanupError) {
      console.warn('Could not cleanup uploaded file:', cleanupError);
    }

    res.json({
      success: true,
      data: result.data,
      meta: {
        pageCount: result.pageCount,
        filename: req.file.originalname
      }
    });

  } catch (error) {
    // Cleanup on error
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (cleanupError) {
        // Ignore cleanup errors
      }
    }

    console.error('PDF extraction error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'PDF extraction failed'
    });
  }
});

module.exports = router;
