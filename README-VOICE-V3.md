# GEVA-Sco Voice Assistant V3

Interface vocale intelligente pour remplir automatiquement un GEVA-Sco à partir d'un entretien guidé avec OpenAI (Whisper + GPT-4 + TTS).

## 🎯 Fonctionnalités

- **Extraction automatique PDF**: Upload d'un GEVA-Sco pré-rempli (pages 1-2) pour extraire les données administratives
- **Entretien vocal guidé**: 10 questions approfondies (2-3 min chacune) couvrant tous les aspects pédagogiques
- **Transcription Whisper**: Conversion parole → texte avec haute précision
- **Enrichissement GPT-4**: Structuration et formulation professionnelle des réponses
- **Confirmation TTS**: Relecture vocale des réponses structurées
- **Génération PDF finale**: Document complet 6 pages conforme au modèle officiel

## 📋 Prérequis

- Node.js 16+ installé
- Clé API OpenAI (avec accès à Whisper, GPT-4, TTS)
- Navigateur moderne avec support du microphone (Chrome/Edge recommandé)

## 🚀 Installation

### 1. Installer les dépendances

```bash
cd backend
npm install
```

### 2. Configurer l'API OpenAI

Créez un fichier `.env` à la racine du projet:

```bash
cp .env.example .env
```

Éditez `.env` et ajoutez votre clé API:

```env
OPENAI_API_KEY=sk-proj-votre-cle-api-ici
PORT=3000
NODE_ENV=development
MAX_AUDIO_SIZE_MB=25
```

### 3. Démarrer le serveur

```bash
cd backend
npm start
```

Ou en mode développement avec auto-reload:

```bash
npm run dev
```

Le serveur démarre sur `http://localhost:3000`

## 📖 Utilisation

### Étape 1: Accès à l'interface

Ouvrez votre navigateur et allez sur:
```
http://localhost:3000
```

Ou ouvrez directement le fichier:
```
http://localhost:3000/voice-v3.html
```

### Étape 2: Upload du PDF pré-rempli

1. Cliquez sur la zone d'upload ou glissez-déposez votre PDF GEVA-Sco
2. Le système extrait automatiquement:
   - Nom et prénom de l'élève
   - Date de naissance
   - Informations parents
   - École et classe
   - Enseignant référent
3. Vérifiez les données extraites
4. Cliquez sur **"Démarrer l'entretien vocal"**

### Étape 3: Entretien vocal

Pour chaque question (10 au total):

1. **Écoute de la question** - L'IA lit la question à voix haute
2. **Votre réponse** - Cliquez sur "Commencer à parler" et répondez oralement (2-3 min)
3. **Transcription** - Whisper convertit votre parole en texte
4. **Enrichissement** - GPT-4 structure votre réponse professionnellement
5. **Confirmation** - L'IA relit le résumé structuré
6. **Validation** - Validez ou reformulez si nécessaire

**Questions posées:**
1. Vue d'ensemble de l'élève
2. Comportement et relations sociales
3. Lecture et décodage
4. Écriture et graphisme
5. Compréhension orale et expression
6. Mathématiques
7. Autonomie et organisation
8. Besoins identifiés
9. Aménagements et propositions
10. Évolutions et perspectives

### Étape 4: Validation finale

1. Écoutez le résumé complet généré par l'IA
2. Modifiez si nécessaire
3. Cliquez sur **"Générer le PDF final"**
4. Le document complet (6 pages) est téléchargé

## 🏗 Architecture

```
Gevasco/
├── backend/
│   ├── server.js                 # Serveur Express
│   ├── routes/
│   │   ├── pdf-extract.js        # Route extraction PDF
│   │   └── voice.js              # Routes vocales
│   ├── services/
│   │   ├── whisper.service.js    # Transcription audio
│   │   ├── gpt.service.js        # Enrichissement GPT-4
│   │   ├── tts.service.js        # Synthèse vocale
│   │   └── pdf-parser.service.js # Parsing PDF
│   └── uploads/                  # Fichiers temporaires
│
├── js/
│   ├── voice-orchestrator.js     # Coordinateur principal
│   ├── voice-api-client.js       # Client API backend
│   ├── voice-session.js          # Gestion état session
│   ├── voice-ui.js               # Interface utilisateur
│   ├── pdf-generator.js          # Génération PDF finale
│   └── phrases-cp.js             # Bibliothèque phrases
│
├── css/
│   └── voice-styles.css          # Styles interface
│
├── voice-v3.html                 # Page principale
├── .env                          # Configuration (à créer)
└── .env.example                  # Template configuration
```

## 🔧 Configuration avancée

### Modifier la voix TTS

Dans `backend/services/tts.service.js`, changez la voix par défaut:

```javascript
// Voix disponibles: alloy, echo, fable, onyx, nova, shimmer
const voice = 'nova'; // Voix féminine claire (recommandée)
```

### Ajuster la vitesse de lecture

```javascript
const speed = 0.95; // 0.5 à 2.0 (1.0 = normale)
```

### Modifier les questions

Éditez `js/voice-orchestrator.js` dans la méthode `defineQuestions()`:

```javascript
{
  id: 'nouvelle_question',
  text: "Votre question ici?",
  category: 'categorie',
  targetFields: ['champ1', 'champ2'],
  duration: 120
}
```

## 🧪 Tests

### Test rapide du backend

```bash
# Vérifier que le serveur répond
curl http://localhost:3000/api/health
```

Réponse attendue:
```json
{
  "status": "ok",
  "timestamp": "2024-01-19T10:00:00.000Z",
  "openaiConfigured": true
}
```

### Test d'extraction PDF

```bash
curl -X POST http://localhost:3000/api/pdf/extract \
  -F "pdf=@chemin/vers/votre/geva.pdf"
```

### Test de transcription

```bash
curl -X POST http://localhost:3000/api/voice/transcribe \
  -F "audio=@chemin/vers/audio.webm"
```

## 💰 Coûts estimés

Par document GEVA-Sco:

| Service | Usage | Coût |
|---------|-------|------|
| Whisper | 10 × 2min audio | ~$0.12 |
| GPT-4 Turbo | 10 enrichissements | ~$0.20 |
| TTS | ~15 synthèses | ~$0.08 |
| Résumé final | 1 appel GPT-4 | ~$0.03 |
| **TOTAL** | | **~$0.43** |

## 🐛 Dépannage

### Le serveur ne démarre pas

```bash
# Vérifier que Node.js est installé
node --version

# Vérifier que les dépendances sont installées
cd backend && npm install

# Vérifier que le port 3000 n'est pas occupé
lsof -i :3000
```

### L'API OpenAI ne répond pas

1. Vérifiez votre clé API dans `.env`
2. Vérifiez votre quota OpenAI sur https://platform.openai.com/usage
3. Vérifiez votre connexion internet

### Le microphone ne fonctionne pas

1. **Chrome**: Autorisez l'accès microphone dans les paramètres du site
2. **Firefox**: Cliquez sur l'icône cadenas > Autorisations > Microphone
3. **Safari**: Préférences > Sites web > Microphone

### La transcription est imprécise

1. Parlez clairement et distinctement
2. Réduisez le bruit ambiant
3. Utilisez un bon microphone (casque recommandé)
4. Ajustez le volume d'entrée dans les paramètres système

### Le PDF ne se génère pas

1. Vérifiez que `pdf-generator.js` est bien chargé
2. Ouvrez la console développeur (F12) pour voir les erreurs
3. Vérifiez que toutes les données sont présentes

## 📝 Logs et debugging

Les logs du serveur s'affichent dans le terminal:

```bash
🎤 GEVA-Sco Voice API running on http://localhost:3000
   OpenAI API configured: ✅
   Environment: development
```

Pour plus de détails, activez le mode debug:

```bash
NODE_ENV=development DEBUG=* npm start
```

## 🔒 Sécurité

- ✅ Clé API stockée côté serveur uniquement
- ✅ Fichiers audio/PDF supprimés après traitement
- ✅ Données stockées uniquement dans localStorage du navigateur
- ✅ Pas de stockage permanent côté serveur
- ⚠️ Pour production: ajoutez HTTPS, rate limiting, authentification

## 🚧 Limitations connues

- Durée audio max: 25MB (~10 minutes)
- Langues supportées: Français uniquement (Whisper multi-lingue disponible)
- Navigateurs: Chrome/Edge recommandés (meilleur support MediaRecorder)
- Format audio: WebM/Opus (fallback automatique si non supporté)

## 📚 Ressources

- [Documentation OpenAI Whisper](https://platform.openai.com/docs/guides/speech-to-text)
- [Documentation OpenAI GPT-4](https://platform.openai.com/docs/guides/gpt)
- [Documentation OpenAI TTS](https://platform.openai.com/docs/guides/text-to-speech)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

## 🤝 Support

Pour des questions ou problèmes:
1. Vérifiez ce README
2. Consultez les logs du serveur
3. Ouvrez la console développeur (F12) dans le navigateur

## 📄 Licence

Projet éducatif - Usage libre

---

**Version**: 3.0.0
**Dernière mise à jour**: Janvier 2024
**Technologies**: Node.js, Express, OpenAI SDK, Web Audio API
