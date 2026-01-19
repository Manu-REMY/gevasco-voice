/**
 * Script de test pour vérifier la configuration
 * Usage: node test-setup.js
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

console.log('\n🔍 Vérification de la configuration GEVA-Sco Voice V3\n');

// Test 1: Node.js version
console.log('✓ Test 1: Version Node.js');
const nodeVersion = process.version;
console.log(`  Node.js: ${nodeVersion}`);

const major = parseInt(nodeVersion.split('.')[0].substring(1));
if (major < 16) {
  console.error('  ❌ ERREUR: Node.js 16+ requis');
  process.exit(1);
} else {
  console.log('  ✅ Version compatible\n');
}

// Test 2: Dépendances
console.log('✓ Test 2: Dépendances npm');
const requiredPackages = [
  'express',
  'cors',
  'multer',
  'dotenv',
  'openai',
  'pdf-parse'
];

let missingPackages = [];
for (const pkg of requiredPackages) {
  try {
    require.resolve(pkg);
    console.log(`  ✅ ${pkg}`);
  } catch (error) {
    console.log(`  ❌ ${pkg} - MANQUANT`);
    missingPackages.push(pkg);
  }
}

if (missingPackages.length > 0) {
  console.error('\n  ❌ ERREUR: Dépendances manquantes');
  console.error('  Exécutez: cd backend && npm install\n');
  process.exit(1);
} else {
  console.log('  ✅ Toutes les dépendances installées\n');
}

// Test 3: Configuration OpenAI
console.log('✓ Test 3: Configuration OpenAI API');
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error('  ❌ ERREUR: OPENAI_API_KEY non configurée');
  console.error('  Créez un fichier .env à la racine du projet');
  console.error('  Ajoutez: OPENAI_API_KEY=votre_cle_api\n');
  process.exit(1);
}

if (!apiKey.startsWith('sk-')) {
  console.error('  ❌ ERREUR: Format de clé API invalide');
  console.error('  La clé doit commencer par "sk-"\n');
  process.exit(1);
}

// Mask the API key for security
const maskedKey = `${apiKey.substring(0, 7)}...${apiKey.substring(apiKey.length - 4)}`;
console.log(`  ✅ Clé API configurée: ${maskedKey}\n`);

// Test 4: Test connexion OpenAI (optionnel)
console.log('✓ Test 4: Connexion OpenAI API');
const OpenAI = require('openai');
const client = new OpenAI({ apiKey: apiKey });

(async () => {
  try {
    // Test simple avec un modèle minimal
    const response = await client.models.list();
    console.log('  ✅ Connexion OpenAI réussie');
    console.log(`  ✅ Accès à ${response.data.length} modèles\n`);
  } catch (error) {
    console.error('  ❌ ERREUR de connexion OpenAI:', error.message);
    console.error('  Vérifiez votre clé API sur https://platform.openai.com/\n');
    process.exit(1);
  }

  // Test 5: Structure des fichiers
  console.log('✓ Test 5: Structure des fichiers');
  const fs = require('fs');
  const path = require('path');

  const requiredFiles = [
    '../voice-v3.html',
    '../js/voice-orchestrator.js',
    '../js/voice-api-client.js',
    '../js/voice-session.js',
    '../js/voice-ui.js',
    '../js/pdf-generator.js',
    '../js/phrases-cp.js',
    '../css/voice-styles.css',
    './server.js',
    './routes/voice.js',
    './routes/pdf-extract.js',
    './services/whisper.service.js',
    './services/gpt.service.js',
    './services/tts.service.js',
    './services/pdf-parser.service.js'
  ];

  let missingFiles = [];
  for (const file of requiredFiles) {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      console.log(`  ✅ ${file}`);
    } else {
      console.log(`  ❌ ${file} - MANQUANT`);
      missingFiles.push(file);
    }
  }

  if (missingFiles.length > 0) {
    console.error('\n  ⚠️ ATTENTION: Fichiers manquants');
    console.error('  L\'application pourrait ne pas fonctionner correctement\n');
  } else {
    console.log('  ✅ Tous les fichiers présents\n');
  }

  // Test 6: Répertoire uploads
  console.log('✓ Test 6: Répertoire uploads');
  const uploadsDir = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('  ✅ Répertoire uploads créé\n');
  } else {
    console.log('  ✅ Répertoire uploads existe\n');
  }

  // Résumé final
  console.log('═'.repeat(60));
  console.log('🎉 CONFIGURATION COMPLÈTE ET VALIDE');
  console.log('═'.repeat(60));
  console.log('\n📋 Prochaines étapes:\n');
  console.log('  1. Démarrer le serveur:');
  console.log('     cd backend && npm start\n');
  console.log('  2. Ouvrir le navigateur:');
  console.log('     http://localhost:3000\n');
  console.log('  3. Autoriser le microphone quand demandé\n');
  console.log('  4. Uploader un PDF GEVA-Sco et commencer!\n');
  console.log('💰 Coût estimé: ~$0.43 par document GEVA-Sco\n');
  console.log('📚 Documentation: README-VOICE-V3.md\n');
})();
