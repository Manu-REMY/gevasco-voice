# AI Providers - Multi-Provider Support

Ce module permet d'utiliser différents fournisseurs d'IA pour GEVA-Sco Voice Assistant.

## Providers Supportés

| Provider | Chat | STT | TTS | Notes |
|----------|------|-----|-----|-------|
| **OpenAI** | ✅ | ✅ | ✅ | Provider complet (GPT-4, Whisper, TTS) |
| **Mistral** | ✅ | ❌ | ❌ | Excellent pour le français |
| **Claude** | ✅ | ❌ | ❌ | Claude 3.5 Sonnet |
| **Albert** | ✅ | ❌ | ❌ | Modèle français (Hugging Face) |

## Configuration

### Variables d'Environnement

```env
# Provider principal pour le chat/enrichissement
AI_PROVIDER=openai   # openai | mistral | claude | albert

# Providers spécifiques (fallback sur OpenAI)
STT_PROVIDER=openai  # Speech-to-Text
TTS_PROVIDER=openai  # Text-to-Speech
```

### Clés API par Provider

#### OpenAI
```env
OPENAI_API_KEY=sk-proj-xxx
OPENAI_CHAT_MODEL=gpt-4-turbo-preview  # optionnel
```

#### Mistral
```env
MISTRAL_API_KEY=xxx
MISTRAL_CHAT_MODEL=mistral-large-latest  # optionnel
```

#### Claude (Anthropic)
```env
ANTHROPIC_API_KEY=sk-ant-xxx
CLAUDE_CHAT_MODEL=claude-3-5-sonnet-20241022  # optionnel
```

#### Albert
```env
ALBERT_API_KEY=hf_xxx  # Token Hugging Face
ALBERT_MODEL=AgentPublic/llama3-instruct-8b  # optionnel
ALBERT_API_URL=https://api-inference.huggingface.co/models  # optionnel
```

## Architecture

```
ai-providers/
├── index.js           # Factory et exports
├── provider-config.js # Configuration des providers
├── base-provider.js   # Interface abstraite
├── openai-provider.js # Implémentation OpenAI
├── mistral-provider.js # Implémentation Mistral
├── claude-provider.js  # Implémentation Claude
├── albert-provider.js  # Implémentation Albert
└── README.md
```

## Utilisation

### Dans les Services

```javascript
const { getChatProvider, getSTTProvider, getTTSProvider } = require('./ai-providers');

// Chat (enrichissement texte)
const chatProvider = getChatProvider();
const result = await chatProvider.chatCompletionJSON(messages, { temperature: 0.3 });

// Speech-to-Text
const sttProvider = getSTTProvider();
const transcript = await sttProvider.transcribe(audioPath, { language: 'fr' });

// Text-to-Speech
const ttsProvider = getTTSProvider();
const audioBuffer = await ttsProvider.synthesize(text, { voice: 'nova' });
```

### API Endpoints

```bash
# Status des providers
GET /api/providers

# Health check basique
GET /api/health

# Health check détaillé (teste chaque provider)
GET /api/health/detailed
```

## Fallback Automatique

Si le provider configuré n'est pas disponible, le système cherche automatiquement un fallback :

1. **Chat** : OpenAI → Mistral → Claude → Albert
2. **STT** : OpenAI uniquement (seul provider supporté)
3. **TTS** : OpenAI uniquement (seul provider supporté)

## Ajout d'un Nouveau Provider

1. Créer `nouveau-provider.js` basé sur `base-provider.js`
2. Implémenter les méthodes requises :
   - `isConfigured()`
   - `chatCompletion(messages, options)`
   - `chatCompletionJSON(messages, options)`
   - `transcribe(audioPath, options)` - si supporté
   - `synthesize(text, options)` - si supporté
   - `healthCheck()`
3. Ajouter dans `provider-config.js`
4. Enregistrer dans `index.js`

## Notes Importantes

- **STT/TTS** : Seul OpenAI supporte actuellement ces fonctionnalités
- **JSON Mode** : OpenAI et Mistral supportent nativement le mode JSON, Claude et Albert utilisent le prompt engineering
- **Coûts** : Les coûts varient selon les providers, vérifiez votre usage
- **Rate Limits** : Chaque provider a ses propres limites
