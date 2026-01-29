/**
 * AI Provider Factory
 * Central access point for all AI providers
 */

const {
  PROVIDERS,
  CAPABILITIES,
  getActiveProvider,
  getProviderConfig,
  isProviderConfigured,
  getConfiguredProviders,
  getProvidersStatus
} = require('./provider-config');

const OpenAIProvider = require('./openai-provider');
const MistralProvider = require('./mistral-provider');
const ClaudeProvider = require('./claude-provider');
const AlbertProvider = require('./albert-provider');

// Provider instances (lazy initialized)
const providers = {};

/**
 * Clear all cached provider instances
 * Call this when API keys change
 */
function clearProviderCache() {
  Object.keys(providers).forEach(key => {
    delete providers[key];
  });
  console.log('Provider cache cleared');
}

/**
 * Get or create provider instance
 */
function getProvider(providerName) {
  const name = providerName.toLowerCase();

  if (!providers[name]) {
    switch (name) {
      case PROVIDERS.OPENAI:
        providers[name] = new OpenAIProvider();
        break;
      case PROVIDERS.MISTRAL:
        providers[name] = new MistralProvider();
        break;
      case PROVIDERS.CLAUDE:
        providers[name] = new ClaudeProvider();
        break;
      case PROVIDERS.ALBERT:
        providers[name] = new AlbertProvider();
        break;
      default:
        throw new Error(`Unknown provider: ${providerName}`);
    }
  }

  return providers[name];
}

/**
 * Get provider for a specific capability
 * Automatically selects the best available provider
 */
function getProviderForCapability(capability) {
  const providerName = getActiveProvider(capability);
  const provider = getProvider(providerName);

  if (!provider.isConfigured()) {
    // Try fallback providers
    const fallbacks = {
      [CAPABILITIES.CHAT]: [PROVIDERS.OPENAI, PROVIDERS.MISTRAL, PROVIDERS.CLAUDE, PROVIDERS.ALBERT],
      [CAPABILITIES.STT]: [PROVIDERS.OPENAI],
      [CAPABILITIES.TTS]: [PROVIDERS.OPENAI]
    };

    for (const fallback of fallbacks[capability] || []) {
      if (fallback !== providerName) {
        const fallbackProvider = getProvider(fallback);
        if (fallbackProvider.isConfigured()) {
          console.log(`Falling back from ${providerName} to ${fallback} for ${capability}`);
          return fallbackProvider;
        }
      }
    }

    throw new Error(`No configured provider found for capability: ${capability}`);
  }

  return provider;
}

/**
 * Get chat provider (convenience method)
 */
function getChatProvider() {
  return getProviderForCapability(CAPABILITIES.CHAT);
}

/**
 * Get STT provider (convenience method)
 */
function getSTTProvider() {
  return getProviderForCapability(CAPABILITIES.STT);
}

/**
 * Get TTS provider (convenience method)
 */
function getTTSProvider() {
  return getProviderForCapability(CAPABILITIES.TTS);
}

/**
 * Health check all configured providers
 */
async function healthCheckAll() {
  const results = {};

  for (const providerName of Object.values(PROVIDERS)) {
    try {
      const provider = getProvider(providerName);
      if (provider.isConfigured()) {
        results[providerName] = await provider.healthCheck();
      } else {
        results[providerName] = { ok: false, error: 'Not configured' };
      }
    } catch (error) {
      results[providerName] = { ok: false, error: error.message };
    }
  }

  return results;
}

/**
 * Get summary of provider status
 */
function getStatus() {
  const activeChat = getActiveProvider(CAPABILITIES.CHAT);
  const activeSTT = getActiveProvider(CAPABILITIES.STT);
  const activeTTS = getActiveProvider(CAPABILITIES.TTS);

  return {
    activeProviders: {
      chat: activeChat,
      stt: activeSTT,
      tts: activeTTS
    },
    configured: getConfiguredProviders(),
    details: getProvidersStatus()
  };
}

module.exports = {
  // Constants
  PROVIDERS,
  CAPABILITIES,

  // Provider access
  getProvider,
  getProviderForCapability,
  getChatProvider,
  getSTTProvider,
  getTTSProvider,

  // Status
  getStatus,
  healthCheckAll,
  isProviderConfigured,
  getConfiguredProviders,

  // Cache management
  clearProviderCache
};
