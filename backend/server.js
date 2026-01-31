const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Charger .env en développement local
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.join(__dirname, '../.env') });
}

// Import AI providers for status
const { getStatus, healthCheckAll, PROVIDERS } = require('./services/ai-providers');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Force UTF-8 encoding on all JSON responses
app.use((req, res, next) => {
  const originalJson = res.json.bind(res);
  res.json = (data) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return originalJson(data);
  };
  next();
});

// Serve static files from parent directory
app.use(express.static(path.join(__dirname, '../')));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Routes
app.use('/api/pdf', require('./routes/pdf-extract'));
app.use('/api/voice', require('./routes/voice'));
app.use('/api/apikey', require('./routes/api-key'));

// Health check - basic status
app.get('/api/health', (req, res) => {
  const status = getStatus();

  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    providers: {
      active: status.activeProviders,
      configured: status.configured
    }
  });
});

// Detailed health check - tests all providers
app.get('/api/health/detailed', async (req, res) => {
  try {
    const status = getStatus();
    const healthResults = await healthCheckAll();

    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      providers: {
        active: status.activeProviders,
        configured: status.configured,
        health: healthResults,
        details: status.details
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error: error.message
    });
  }
});

// Provider info endpoint
app.get('/api/providers', (req, res) => {
  const status = getStatus();

  res.json({
    available: Object.values(PROVIDERS),
    active: status.activeProviders,
    configured: status.configured,
    details: status.details
  });
});

// Root route - serve voice interface (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  const status = getStatus();

  console.log(`🎤 GEVA-Sco Voice API running on http://localhost:${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('');
  console.log('📡 AI Providers configured:');
  status.configured.forEach(provider => {
    console.log(`   ✅ ${provider}`);
  });

  if (status.configured.length === 0) {
    console.log('   ⚠️  No AI providers configured!');
  }

  console.log('');
  console.log('🔧 Active providers:');
  console.log(`   Chat: ${status.activeProviders.chat}`);
  console.log(`   STT:  ${status.activeProviders.stt}`);
  console.log(`   TTS:  ${status.activeProviders.tts}`);
});
