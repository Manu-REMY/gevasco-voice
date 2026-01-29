/**
 * AI Provider Configuration
 * Defines available providers and their capabilities
 */

const PROVIDERS = {
  OPENAI: 'openai',
  MISTRAL: 'mistral',
  CLAUDE: 'claude',
  ALBERT: 'albert'
};

const CAPABILITIES = {
  CHAT: 'chat',           // Text generation/completion
  STT: 'stt',             // Speech-to-text
  TTS: 'tts'              // Text-to-speech
};

/**
 * Provider capability matrix
 * Defines what each provider supports
 */
const PROVIDER_CAPABILITIES = {
  [PROVIDERS.OPENAI]: {
    [CAPABILITIES.CHAT]: true,
    [CAPABILITIES.STT]: true,
    [CAPABILITIES.TTS]: true,
    envKey: 'OPENAI_API_KEY',
    keyPrefix: 'sk-',
    defaultChatModel: 'gpt-4-turbo-preview',
    defaultSTTModel: 'whisper-1',
    defaultTTSModel: 'tts-1',
    baseUrl: null // Uses default
  },
  [PROVIDERS.MISTRAL]: {
    [CAPABILITIES.CHAT]: true,
    [CAPABILITIES.STT]: false,  // Mistral doesn't have native STT
    [CAPABILITIES.TTS]: false,  // Mistral doesn't have native TTS
    envKey: 'MISTRAL_API_KEY',
    keyPrefix: null,
    defaultChatModel: 'mistral-large-latest',
    baseUrl: 'https://api.mistral.ai/v1'
  },
  [PROVIDERS.CLAUDE]: {
    [CAPABILITIES.CHAT]: true,
    [CAPABILITIES.STT]: false,  // Claude doesn't have native STT
    [CAPABILITIES.TTS]: false,  // Claude doesn't have native TTS
    envKey: 'ANTHROPIC_API_KEY',
    keyPrefix: 'sk-ant-',
    defaultChatModel: 'claude-3-5-sonnet-20241022',
    baseUrl: 'https://api.anthropic.com'
  },
  [PROVIDERS.ALBERT]: {
    [CAPABILITIES.CHAT]: true,
    [CAPABILITIES.STT]: false,  // Albert typically doesn't have STT
    [CAPABILITIES.TTS]: false,  // Albert typically doesn't have TTS
    envKey: 'ALBERT_API_KEY',
    keyPrefix: null,
    defaultChatModel: 'albert',
    baseUrl: null // Configurable via ALBERT_API_URL
  }
};

/**
 * Get active provider from environment
 */
function getActiveProvider(capability) {
  const envProvider = process.env.AI_PROVIDER?.toLowerCase();

  // If specific provider requested, validate capability
  if (envProvider && PROVIDERS[envProvider.toUpperCase()]) {
    const provider = envProvider.toLowerCase();
    if (PROVIDER_CAPABILITIES[provider]?.[capability]) {
      return provider;
    }
  }

  // Fallback logic for specific capabilities
  switch (capability) {
    case CAPABILITIES.STT:
      // Only OpenAI supports STT natively, but can fallback to configured STT_PROVIDER
      return process.env.STT_PROVIDER?.toLowerCase() || PROVIDERS.OPENAI;

    case CAPABILITIES.TTS:
      // Only OpenAI supports TTS natively, but can fallback to configured TTS_PROVIDER
      return process.env.TTS_PROVIDER?.toLowerCase() || PROVIDERS.OPENAI;

    case CAPABILITIES.CHAT:
    default:
      return envProvider || PROVIDERS.OPENAI;
  }
}

/**
 * Get provider configuration
 */
function getProviderConfig(provider) {
  return PROVIDER_CAPABILITIES[provider] || null;
}

/**
 * Check if provider is configured (has API key)
 */
function isProviderConfigured(provider) {
  const config = PROVIDER_CAPABILITIES[provider];
  if (!config) return false;

  const apiKey = process.env[config.envKey];
  if (!apiKey) return false;

  // Validate key prefix if specified
  if (config.keyPrefix && !apiKey.startsWith(config.keyPrefix)) {
    console.warn(`Warning: ${provider} API key doesn't start with expected prefix ${config.keyPrefix}`);
  }

  return true;
}

/**
 * Get all configured providers
 */
function getConfiguredProviders() {
  return Object.keys(PROVIDERS)
    .map(key => PROVIDERS[key])
    .filter(provider => isProviderConfigured(provider));
}

/**
 * Get provider status for health check
 */
function getProvidersStatus() {
  const status = {};

  for (const provider of Object.values(PROVIDERS)) {
    const config = PROVIDER_CAPABILITIES[provider];
    status[provider] = {
      configured: isProviderConfigured(provider),
      capabilities: {
        chat: config[CAPABILITIES.CHAT],
        stt: config[CAPABILITIES.STT],
        tts: config[CAPABILITIES.TTS]
      }
    };
  }

  return status;
}

module.exports = {
  PROVIDERS,
  CAPABILITIES,
  PROVIDER_CAPABILITIES,
  getActiveProvider,
  getProviderConfig,
  isProviderConfigured,
  getConfiguredProviders,
  getProvidersStatus
};
