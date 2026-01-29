/**
 * API Key Management Routes
 * Handles validation and storage of OpenAI API keys
 */

const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

// In-memory storage for the API key (per server instance)
// In production, consider using a more persistent solution
let currentApiKey = process.env.OPENAI_API_KEY || null;

/**
 * Validate an OpenAI API key by making a test request
 */
async function validateOpenAIKey(apiKey) {
  if (!apiKey || typeof apiKey !== 'string') {
    return { valid: false, error: 'Clé API manquante ou invalide' };
  }

  // Basic format validation
  if (!apiKey.startsWith('sk-')) {
    return { valid: false, error: 'La clé API doit commencer par "sk-"' };
  }

  try {
    const client = new OpenAI({ apiKey });

    // Make a simple API call to validate the key
    // Using models.list() as it's a lightweight call
    await client.models.list();

    return { valid: true };
  } catch (error) {
    if (error.status === 401) {
      return { valid: false, error: 'Clé API invalide ou expirée' };
    }
    if (error.status === 429) {
      return { valid: false, error: 'Quota API dépassé' };
    }
    return { valid: false, error: `Erreur de validation: ${error.message}` };
  }
}

/**
 * POST /api/apikey/validate
 * Validate and store an OpenAI API key
 */
router.post('/validate', async (req, res) => {
  try {
    const { apiKey } = req.body;

    if (!apiKey) {
      return res.status(400).json({
        success: false,
        error: 'Clé API requise'
      });
    }

    // Validate the key
    const validation = await validateOpenAIKey(apiKey);

    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: validation.error
      });
    }

    // Store the key in memory and update process.env
    currentApiKey = apiKey;
    process.env.OPENAI_API_KEY = apiKey;

    // Clear cached provider instances to use new key
    const { clearProviderCache } = require('../services/ai-providers');
    if (typeof clearProviderCache === 'function') {
      clearProviderCache();
    }

    res.json({
      success: true,
      message: 'Clé API validée et enregistrée avec succès'
    });

  } catch (error) {
    console.error('API key validation error:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la validation de la clé API'
    });
  }
});

/**
 * GET /api/apikey/status
 * Check if an API key is configured and valid
 */
router.get('/status', async (req, res) => {
  try {
    const hasKey = !!currentApiKey || !!process.env.OPENAI_API_KEY;

    if (!hasKey) {
      return res.json({
        configured: false,
        message: 'Aucune clé API configurée'
      });
    }

    // Optionally validate the key
    const key = currentApiKey || process.env.OPENAI_API_KEY;
    const validation = await validateOpenAIKey(key);

    res.json({
      configured: true,
      valid: validation.valid,
      error: validation.error || null
    });

  } catch (error) {
    res.status(500).json({
      configured: false,
      error: 'Erreur lors de la vérification du statut'
    });
  }
});

/**
 * DELETE /api/apikey
 * Remove the stored API key
 */
router.delete('/', (req, res) => {
  currentApiKey = null;
  // Don't delete from process.env if it was set via .env file

  res.json({
    success: true,
    message: 'Clé API supprimée'
  });
});

module.exports = router;
