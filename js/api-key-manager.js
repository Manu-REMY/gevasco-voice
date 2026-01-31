/**
 * API Key Manager
 * Handles API key storage, validation, and UI interactions
 */
class APIKeyManager {
  constructor() {
    this.STORAGE_KEY = 'gevasco_openai_api_key';
    this.STORAGE_KEY_STT_MODE = 'gevasco_stt_mode';
    this.modal = null;
    this.input = null;
    this.errorEl = null;
    this.successEl = null;
    this.validateBtn = null;
    this.isValidating = false;
  }

  /**
   * Initialize the API key manager
   */
  init() {
    this.modal = document.getElementById('api-key-modal');
    this.input = document.getElementById('api-key-input');
    this.errorEl = document.getElementById('api-key-error');
    this.successEl = document.getElementById('api-key-success');
    this.validateBtn = document.getElementById('validate-api-key-btn');

    this.setupEventListeners();
    this.initSTTModeToggle();
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Validate button
    if (this.validateBtn) {
      this.validateBtn.addEventListener('click', () => this.validateAndSave());
    }

    // Enter key in input
    if (this.input) {
      this.input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.validateAndSave();
        }
      });
    }

    // Toggle visibility button
    const toggleBtn = document.getElementById('toggle-key-visibility');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        if (this.input.type === 'password') {
          this.input.type = 'text';
          toggleBtn.textContent = '🙈';
        } else {
          this.input.type = 'password';
          toggleBtn.textContent = '👁';
        }
      });
    }

    // Change API key button
    const changeBtn = document.getElementById('change-api-key-btn');
    if (changeBtn) {
      changeBtn.addEventListener('click', () => this.showModal());
    }
  }

  /**
   * Check if API key is configured (localStorage or server)
   */
  async checkAPIKeyStatus() {
    // First check localStorage
    const storedKey = this.getStoredKey();

    if (storedKey) {
      // Try to validate with backend
      const isValid = await this.sendKeyToBackend(storedKey);
      if (isValid) {
        return true;
      }
      // Key is invalid, remove it
      this.clearStoredKey();
    }

    // Check if server has a key configured (via .env)
    try {
      const response = await fetch(`${this.getBaseURL()}/api/apikey/status`);
      const data = await response.json();

      if (data.configured && data.valid) {
        return true;
      }
    } catch (error) {
      console.error('Error checking API key status:', error);
    }

    return false;
  }

  /**
   * Show the API key modal
   */
  showModal() {
    if (this.modal) {
      this.modal.style.display = 'flex';
      this.hideError();
      this.hideSuccess();
      if (this.input) {
        this.input.value = '';
        this.input.focus();
      }
    }
  }

  /**
   * Hide the API key modal
   */
  hideModal() {
    if (this.modal) {
      this.modal.style.display = 'none';
    }
  }

  /**
   * Validate and save the API key
   */
  async validateAndSave() {
    if (this.isValidating) return;

    const apiKey = this.input?.value?.trim();

    if (!apiKey) {
      this.showError('Veuillez entrer une clé API');
      return;
    }

    if (!apiKey.startsWith('sk-')) {
      this.showError('La clé API doit commencer par "sk-"');
      return;
    }

    this.isValidating = true;
    this.setButtonLoading(true);
    this.hideError();
    this.hideSuccess();

    try {
      const isValid = await this.sendKeyToBackend(apiKey);

      if (isValid) {
        // Store in localStorage
        this.storeKey(apiKey);
        this.showSuccess();

        // Wait a moment then hide modal and refresh status
        setTimeout(() => {
          this.hideModal();
          // Trigger app refresh
          if (window.voiceOrchestrator) {
            window.voiceOrchestrator.checkAPIConnection();
          } else {
            window.location.reload();
          }
        }, 1500);
      }
    } catch (error) {
      this.showError(error.message || 'Erreur lors de la validation');
    } finally {
      this.isValidating = false;
      this.setButtonLoading(false);
    }
  }

  /**
   * Send API key to backend for validation
   */
  async sendKeyToBackend(apiKey) {
    const response = await fetch(`${this.getBaseURL()}/api/apikey/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ apiKey })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Validation échouée');
    }

    return true;
  }

  /**
   * Get base URL for API calls
   */
  getBaseURL() {
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    return isLocalhost ? 'http://localhost:3000' : window.location.origin;
  }

  /**
   * Store API key in localStorage
   */
  storeKey(apiKey) {
    try {
      // Store only a masked version for display, full key is on server
      localStorage.setItem(this.STORAGE_KEY, apiKey);
    } catch (error) {
      console.error('Error storing API key:', error);
    }
  }

  /**
   * Get stored API key
   */
  getStoredKey() {
    try {
      return localStorage.getItem(this.STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  /**
   * Clear stored API key
   */
  clearStoredKey() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing API key:', error);
    }
  }

  /**
   * Show error message
   */
  showError(message) {
    if (this.errorEl) {
      this.errorEl.textContent = message;
      this.errorEl.style.display = 'block';
    }
  }

  /**
   * Hide error message
   */
  hideError() {
    if (this.errorEl) {
      this.errorEl.style.display = 'none';
    }
  }

  /**
   * Show success message
   */
  showSuccess() {
    if (this.successEl) {
      this.successEl.style.display = 'block';
    }
  }

  /**
   * Hide success message
   */
  hideSuccess() {
    if (this.successEl) {
      this.successEl.style.display = 'none';
    }
  }

  /**
   * Set button loading state
   */
  setButtonLoading(isLoading) {
    if (this.validateBtn) {
      if (isLoading) {
        this.validateBtn.disabled = true;
        this.validateBtn.innerHTML = '<span class="btn-icon">⏳</span><span>Validation...</span>';
      } else {
        this.validateBtn.disabled = false;
        this.validateBtn.innerHTML = '<span class="btn-icon">✓</span><span>Valider la clé</span>';
      }
    }
  }

  // ============================================
  // STT Mode Management
  // ============================================

  /**
   * Initialize STT mode toggle
   */
  initSTTModeToggle() {
    const toggle = document.getElementById('stt-mode-toggle');
    if (!toggle) return;

    // Load saved preference
    const isRemote = this.getSTTMode() === 'remote';
    toggle.checked = isRemote;
    this.updateSTTModeUI(isRemote);

    // Listen for changes
    toggle.addEventListener('change', () => {
      const isRemote = toggle.checked;
      this.setSTTMode(isRemote ? 'remote' : 'local');
      this.updateSTTModeUI(isRemote);
    });
  }

  /**
   * Update STT mode UI based on selection
   */
  updateSTTModeUI(isRemote) {
    const warningBox = document.getElementById('stt-warning-box');
    const infoLocal = document.getElementById('stt-info-local');
    const optionLocal = document.querySelector('.stt-option-local');
    const optionRemote = document.querySelector('.stt-option-remote');

    if (isRemote) {
      warningBox?.classList.remove('hidden');
      infoLocal?.classList.add('hidden');
      optionLocal?.classList.remove('active');
      optionRemote?.classList.add('active');
    } else {
      warningBox?.classList.add('hidden');
      infoLocal?.classList.remove('hidden');
      optionLocal?.classList.add('active');
      optionRemote?.classList.remove('active');
    }
  }

  /**
   * Set STT mode preference
   * @param {string} mode - 'local' or 'remote'
   */
  setSTTMode(mode) {
    try {
      localStorage.setItem(this.STORAGE_KEY_STT_MODE, mode);
    } catch (error) {
      console.error('Error storing STT mode:', error);
    }
  }

  /**
   * Get STT mode preference
   * @returns {string} 'local' or 'remote' (default: 'local')
   */
  getSTTMode() {
    try {
      return localStorage.getItem(this.STORAGE_KEY_STT_MODE) || 'local';
    } catch (error) {
      return 'local';
    }
  }

  /**
   * Check if Web Speech API is supported
   * @returns {boolean}
   */
  isWebSpeechSupported() {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }
}

// Create global instance
const apiKeyManager = new APIKeyManager();
