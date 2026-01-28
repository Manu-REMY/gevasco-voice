const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs').promises;
const path = require('path');
const pdfParserService = require('../services/pdf-parser.service');
const pdfFillerService = require('../services/pdf-filler.service');

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

// Stockage temporaire des PDFs originaux par session
const pdfStorage = new Map();

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

    // Générer un ID de session pour ce PDF
    const sessionId = `pdf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Stocker le PDF original pour le remplissage ultérieur
    pdfStorage.set(sessionId, {
      buffer: pdfBuffer,
      filename: req.file.originalname,
      createdAt: Date.now()
    });

    // Nettoyer les anciens PDFs (plus de 2 heures)
    const twoHoursAgo = Date.now() - (2 * 60 * 60 * 1000);
    for (const [key, value] of pdfStorage.entries()) {
      if (value.createdAt < twoHoursAgo) {
        pdfStorage.delete(key);
      }
    }

    // Cleanup uploaded file
    try {
      await fs.unlink(req.file.path);
    } catch (cleanupError) {
      console.warn('Could not cleanup uploaded file:', cleanupError);
    }

    res.json({
      success: true,
      data: result.data,
      sessionId: sessionId,
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

/**
 * Route pour remplir le PDF avec les données de l'entretien
 * POST /api/pdf/fill
 * Body: { sessionId, extractedData, interviewData }
 */
router.post('/fill', express.json({ limit: '10mb' }), async (req, res) => {
  try {
    const { sessionId, extractedData, interviewData } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        error: 'Session ID manquant'
      });
    }

    // Récupérer le PDF original
    const storedPdf = pdfStorage.get(sessionId);
    if (!storedPdf) {
      return res.status(404).json({
        success: false,
        error: 'PDF original non trouvé. Veuillez recharger le PDF.'
      });
    }

    // Transformer les données de l'entretien
    const dataToFill = pdfFillerService.transformInterviewData(
      extractedData || {},
      interviewData || {}
    );

    // Remplir le PDF
    const filledPdfBuffer = await pdfFillerService.fillPDF(storedPdf.buffer, dataToFill);

    // Générer le nom du fichier
    const nomEleve = extractedData?.nomEleve || 'eleve';
    const date = new Date().toISOString().split('T')[0];
    const filename = `GEVA-Sco_${nomEleve.replace(/\s+/g, '_')}_${date}.pdf`;

    // Supprimer le PDF du stockage temporaire
    pdfStorage.delete(sessionId);

    // Envoyer le PDF rempli
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', filledPdfBuffer.length);
    res.send(filledPdfBuffer);

  } catch (error) {
    console.error('PDF fill error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Échec du remplissage PDF'
    });
  }
});

/**
 * Route pour lister les champs d'un PDF (debug/développement)
 * POST /api/pdf/fields
 */
router.post('/fields', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No PDF file provided'
      });
    }

    const pdfBuffer = await fs.readFile(req.file.path);
    const fields = await pdfFillerService.listFields(pdfBuffer);

    // Cleanup
    try {
      await fs.unlink(req.file.path);
    } catch (cleanupError) {
      console.warn('Could not cleanup uploaded file:', cleanupError);
    }

    res.json({
      success: true,
      fields: fields
    });

  } catch (error) {
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (cleanupError) {}
    }

    console.error('PDF fields error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Échec de l\'analyse PDF'
    });
  }
});

module.exports = router;
