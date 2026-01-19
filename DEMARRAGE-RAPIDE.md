# 🚀 Démarrage Rapide - GEVA-Sco Voice V3

Guide pour démarrer l'application en 5 minutes.

## ✅ Étape 1: Installer Node.js

Si pas déjà installé, téléchargez Node.js 16+ depuis:
```
https://nodejs.org/
```

Vérifiez l'installation:
```bash
node --version
npm --version
```

## ✅ Étape 2: Installer les dépendances

Ouvrez un terminal et exécutez:

```bash
cd "/Users/remyemmanuel/Documents/Claude code/Gevasco/backend"
npm install
```

Cela installera toutes les dépendances nécessaires:
- express (serveur web)
- cors (gestion CORS)
- multer (upload fichiers)
- dotenv (variables d'environnement)
- openai (API OpenAI)
- pdf-parse (extraction PDF)
- nodemon (auto-reload en dev)

## ✅ Étape 3: Configurer votre clé API OpenAI

### 3.1 Obtenir une clé API OpenAI

1. Allez sur https://platform.openai.com/
2. Créez un compte ou connectez-vous
3. Allez dans **API Keys** (https://platform.openai.com/api-keys)
4. Cliquez sur **"Create new secret key"**
5. Copiez la clé (elle commence par `sk-proj-...`)

### 3.2 Créer le fichier .env

À la racine du projet (`/Users/remyemmanuel/Documents/Claude code/Gevasco`), créez un fichier nommé `.env`:

```bash
cd "/Users/remyemmanuel/Documents/Claude code/Gevasco"
cp .env.example .env
```

Puis éditez `.env` avec votre éditeur de texte favori et remplacez:

```env
OPENAI_API_KEY=sk-proj-VOTRE_CLE_API_ICI
PORT=3000
NODE_ENV=development
MAX_AUDIO_SIZE_MB=25
```

**⚠️ IMPORTANT**: Ne partagez JAMAIS votre clé API!

## ✅ Étape 4: Démarrer le serveur

```bash
cd "/Users/remyemmanuel/Documents/Claude code/Gevasco/backend"
npm start
```

Vous devriez voir:
```
🎤 GEVA-Sco Voice API running on http://localhost:3000
   OpenAI API configured: ✅
   Environment: development
```

✅ Si vous voyez ce message, tout fonctionne!

## ✅ Étape 5: Ouvrir l'interface

Ouvrez votre navigateur (Chrome ou Edge recommandé) et allez sur:

```
http://localhost:3000
```

Vous verrez l'interface vocale GEVA-Sco V3!

## 🎤 Utilisation rapide

1. **Upload PDF**: Glissez-déposez votre GEVA-Sco pré-rempli
2. **Vérifiez les données extraites**
3. **Cliquez "Démarrer l'entretien vocal"**
4. **Pour chaque question**:
   - Écoutez la question
   - Cliquez "Commencer à parler"
   - Répondez oralement (2-3 minutes)
   - Validez la réponse structurée
5. **Validation finale**: Écoutez le résumé et générez le PDF

## 🐛 Problèmes courants

### ❌ "OPENAI_API_KEY not configured"

➡️ Vérifiez que:
- Le fichier `.env` existe à la racine du projet
- Votre clé API est correctement copiée
- La clé commence bien par `sk-proj-` ou `sk-`
- Il n'y a pas d'espaces avant/après la clé

### ❌ "Cannot find module 'express'"

➡️ Installez les dépendances:
```bash
cd backend
npm install
```

### ❌ "Port 3000 already in use"

➡️ Le port est occupé. Changez le port dans `.env`:
```env
PORT=3001
```

Puis redémarrez le serveur.

### ❌ Le microphone ne fonctionne pas

➡️ Autorisez l'accès microphone:
- Chrome: Cliquez sur l'icône cadenas → Autorisations → Microphone
- Vérifiez les paramètres système (Préférences Système → Sécurité → Microphone)

### ❌ "Invalid API Key"

➡️ Votre clé API est incorrecte ou expirée:
1. Vérifiez sur https://platform.openai.com/api-keys
2. Créez une nouvelle clé si nécessaire
3. Mettez à jour `.env`
4. Redémarrez le serveur

### ❌ "Insufficient credits"

➡️ Votre compte OpenAI n'a plus de crédits:
1. Allez sur https://platform.openai.com/usage
2. Ajoutez des crédits si nécessaire
3. Vérifiez vos limites de dépenses

## 📊 Test rapide du système

### Test 1: Vérifier que le serveur fonctionne

```bash
curl http://localhost:3000/api/health
```

Réponse attendue:
```json
{
  "status": "ok",
  "openaiConfigured": true
}
```

### Test 2: Vérifier l'interface

Ouvrez http://localhost:3000 dans votre navigateur.

Vous devriez voir:
- ✅ "API connectée" en haut à droite (point vert)
- ✅ Section "Étape 1: Importer le GEVA-Sco pré-rempli"
- ✅ Zone d'upload PDF

## 💰 Coûts

Chaque document GEVA-Sco coûte environ **$0.43** en crédits OpenAI:
- Whisper (transcription): ~$0.12
- GPT-4 (enrichissement): ~$0.20
- TTS (synthèse vocale): ~$0.08
- Résumé final: ~$0.03

Pour 10 documents: ~$4.30
Pour 100 documents: ~$43.00

## 🔥 Mode développement

Pour le développement avec auto-reload:

```bash
cd backend
npm run dev
```

Le serveur redémarre automatiquement à chaque modification de fichier.

## 📚 Documentation complète

Pour plus de détails, consultez [README-VOICE-V3.md](README-VOICE-V3.md)

## ✉️ Support

Problèmes non résolus?
1. Vérifiez les logs du serveur dans le terminal
2. Ouvrez la console développeur du navigateur (F12)
3. Consultez la section "Dépannage" du README complet

---

**Temps de setup estimé**: 5-10 minutes
**Prêt à utiliser**: Dès que le serveur affiche "API configured: ✅"
