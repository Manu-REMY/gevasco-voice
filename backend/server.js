const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files from parent directory
app.use(express.static(path.join(__dirname, '../')));

// Routes
app.use('/api/pdf', require('./routes/pdf-extract'));
app.use('/api/voice', require('./routes/voice'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    openaiConfigured: !!process.env.OPENAI_API_KEY
  });
});

// Root route - serve voice interface
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../voice-v3.html'));
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
  console.log(`🎤 GEVA-Sco Voice API running on http://localhost:${PORT}`);
  console.log(`   OpenAI API configured: ${process.env.OPENAI_API_KEY ? '✅' : '❌'}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
});
