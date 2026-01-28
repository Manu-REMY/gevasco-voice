# 🚀 Déploiement GEVA-Sco Voice V3 sur la Forge

Guide complet pour déployer et faire fonctionner l'application GEVA-Sco Voice Assistant V3 en autonomie sur GitLab Forge Edu.

## 📋 Table des matières

1. [Prérequis](#prérequis)
2. [Configuration initiale](#configuration-initiale)
3. [Déploiement avec Docker](#déploiement-avec-docker)
4. [Variables d'environnement](#variables-denvironnement)
5. [Pipeline CI/CD](#pipeline-cicd)
6. [Maintenance et surveillance](#maintenance-et-surveillance)
7. [Dépannage](#dépannage)

---

## 🔧 Prérequis

### Sur la Forge GitLab

- Accès au projet GitLab
- GitLab Runner configuré avec support Docker
- Variables CI/CD configurées (voir section Variables d'environnement)

### Sur le serveur de déploiement

- Docker 20.10+ installé
- Docker Compose 2.0+ installé
- Port 3000 disponible
- Accès Internet pour OpenAI API

---

## ⚙️ Configuration initiale

### 1. Cloner le projet

```bash
git clone <url-du-projet-forge>
cd Gevasco
```

### 2. Configurer les variables d'environnement

Créez le fichier `.env` depuis le template:

```bash
cp .env.example .env
```

Éditez `.env` et configurez votre clé API OpenAI:

```env
OPENAI_API_KEY=sk-proj-VOTRE_CLE_API_ICI
PORT=3000
NODE_ENV=production
VOICE_MODEL=alloy
TTS_MODEL=tts-1
WHISPER_MODEL=whisper-1
MAX_AUDIO_SIZE_MB=25
```

> 🔑 **Obtenir une clé API OpenAI**: https://platform.openai.com/api-keys

---

## 🐳 Déploiement avec Docker

### Méthode 1: Script automatique (Recommandé)

Le script `start.sh` gère automatiquement tout le processus:

```bash
./start.sh
```

Le script va:
1. ✅ Vérifier que Docker est installé
2. ✅ Vérifier la configuration `.env`
3. ✅ Construire l'image Docker
4. ✅ Démarrer le conteneur
5. ✅ Vérifier que le serveur est opérationnel

### Méthode 2: Commandes manuelles

```bash
# Construction de l'image
docker-compose build

# Démarrage du service
docker-compose up -d

# Vérifier les logs
docker-compose logs -f

# Vérifier l'état
curl http://localhost:3000/api/health
```

### Arrêter le service

```bash
docker-compose down
```

### Redémarrer le service

```bash
docker-compose restart
```

---

## 🔐 Variables d'environnement

### Variables requises

| Variable | Description | Exemple |
|----------|-------------|---------|
| `OPENAI_API_KEY` | Clé API OpenAI (obligatoire) | `sk-proj-...` |
| `PORT` | Port d'écoute du serveur | `3000` |
| `NODE_ENV` | Environnement d'exécution | `production` |

### Variables optionnelles

| Variable | Description | Défaut |
|----------|-------------|--------|
| `VOICE_MODEL` | Modèle de voix TTS | `alloy` |
| `TTS_MODEL` | Modèle TTS OpenAI | `tts-1` |
| `WHISPER_MODEL` | Modèle de transcription | `whisper-1` |
| `MAX_AUDIO_SIZE_MB` | Taille max des uploads audio | `25` |

### Configuration dans GitLab CI/CD

Pour le pipeline GitLab, configurez les variables dans:
**Settings → CI/CD → Variables**

Ajoutez:
- `OPENAI_API_KEY` (Type: Variable, Protected: ✅, Masked: ✅)

---

## 🔄 Pipeline CI/CD

Le projet utilise `.gitlab-ci.yml` avec 4 stages:

### 1. Install (stage: install)
- Installation des dépendances backend
- Mise en cache de `node_modules`

### 2. Test (stage: test)
- Vérification de la structure du projet
- Validation de la syntaxe JavaScript

### 3. Build (stage: build)
- Construction de l'image Docker
- Génération des artifacts pour déploiement

### 4. Deploy (stage: deploy)
- Déploiement GitLab Pages (interface statique)
- Notification de succès

### Déclencher manuellement le pipeline

Dans GitLab:
1. Allez dans **CI/CD → Pipelines**
2. Cliquez sur **Run pipeline**
3. Sélectionnez la branche `main` ou `develop`

---

## 📊 Maintenance et surveillance

### Vérifier l'état du service

```bash
# Statut du conteneur
docker-compose ps

# Logs en temps réel
docker-compose logs -f

# Santé de l'API
curl http://localhost:3000/api/health
```

Réponse attendue:
```json
{
  "status": "ok",
  "timestamp": "2026-01-20T...",
  "openaiConfigured": true
}
```

### Surveiller l'utilisation des ressources

```bash
# CPU et RAM du conteneur
docker stats gevasco-voice-assistant

# Espace disque des uploads
du -sh backend/uploads/
```

### Mise à jour de l'application

```bash
# Récupérer les dernières modifications
git pull origin main

# Reconstruire et redémarrer
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

---

## 🛠️ Dépannage

### Le conteneur ne démarre pas

1. Vérifier les logs:
```bash
docker-compose logs gevasco-voice
```

2. Vérifier la configuration `.env`:
```bash
cat .env | grep OPENAI_API_KEY
```

3. Vérifier que le port 3000 est libre:
```bash
lsof -i :3000
# ou
netstat -tuln | grep 3000
```

### Erreur 500 lors de la transcription

**Cause**: Clé API OpenAI invalide ou expirée

**Solution**:
1. Vérifiez votre clé API sur https://platform.openai.com/api-keys
2. Mettez à jour `.env` avec une clé valide
3. Redémarrez: `docker-compose restart`

### Le serveur répond "API not configured"

**Cause**: Variable d'environnement `OPENAI_API_KEY` non chargée

**Solution**:
```bash
# Vérifier que .env existe et contient la clé
cat .env

# Forcer le rechargement
docker-compose down
docker-compose up -d
```

### Les fichiers audio ne sont pas supprimés

**Cause**: Problème de permissions sur le dossier `uploads`

**Solution**:
```bash
# Donner les permissions appropriées
chmod 777 backend/uploads

# Redémarrer le conteneur
docker-compose restart
```

### Le pipeline GitLab échoue

**Problème 1**: "Docker not available"
- Vérifiez que le GitLab Runner a le tag `docker`
- Activez Docker-in-Docker dans le runner

**Problème 2**: "npm install fails"
- Vérifiez la connexion Internet du runner
- Utilisez un miroir npm si nécessaire:
  ```bash
  npm config set registry https://registry.npmjs.org/
  ```

---

## 📱 Accès à l'application

Une fois déployée, l'application est accessible:

- **Interface Web**: http://localhost:3000
- **API Health Check**: http://localhost:3000/api/health
- **API Voice Transcribe**: http://localhost:3000/api/voice/transcribe
- **API Voice Enrich**: http://localhost:3000/api/voice/enrich
- **API Voice TTS**: http://localhost:3000/api/voice/tts

---

## 🔒 Sécurité

### Bonnes pratiques

1. **Ne jamais commiter le fichier `.env`**
   - ✅ Le fichier est dans `.gitignore`
   - ✅ Utilisez `.env.example` comme template

2. **Protéger la clé API OpenAI**
   - Utilisez les variables GitLab CI/CD (masked + protected)
   - Renouvelez régulièrement la clé

3. **Limiter l'accès réseau**
   - Utilisez un reverse proxy (nginx) en production
   - Configurez HTTPS avec certificat SSL
   - Ajoutez un firewall pour limiter l'accès au port 3000

4. **Surveiller les uploads**
   - Nettoyez régulièrement `/backend/uploads`
   - Limitez la taille des fichiers (déjà configuré: 25MB)

---

## 📞 Support

En cas de problème:
1. Consultez les logs: `docker-compose logs -f`
2. Vérifiez le statut: `curl http://localhost:3000/api/health`
3. Consultez la documentation OpenAI: https://platform.openai.com/docs

---

## 📝 Checklist de déploiement

- [ ] Docker et Docker Compose installés
- [ ] Fichier `.env` créé avec clé API OpenAI valide
- [ ] Port 3000 disponible
- [ ] Script `start.sh` rendu exécutable (`chmod +x start.sh`)
- [ ] Image Docker construite (`docker-compose build`)
- [ ] Conteneur démarré (`docker-compose up -d`)
- [ ] Health check OK (`curl http://localhost:3000/api/health`)
- [ ] Interface web accessible (http://localhost:3000)
- [ ] Test de transcription réussi
- [ ] Variables GitLab CI/CD configurées (pour pipeline)
- [ ] Pipeline GitLab passé avec succès

---

**Version**: 3.0.0
**Dernière mise à jour**: 2026-01-20
**Maintenance**: Vérifier les mises à jour hebdomadaires
