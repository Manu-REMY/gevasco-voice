/**
 * Voice Session Manager
 * Manages the state of the voice interview session
 */
class VoiceSession {
  constructor() {
    this.extractedPDFData = {};
    this.formData = {};
    this.responses = [];
    this.currentQuestion = null;
    this.currentEnrichedResponse = null;
    this.startTime = null;
    this.questionStartTime = null;
  }

  /**
   * Initialize session with extracted PDF data
   */
  initWithPDFData(pdfData) {
    this.extractedPDFData = pdfData;
    this.saveToLocalStorage();
  }

  /**
   * Start the interview
   */
  startInterview() {
    this.startTime = new Date();
    this.responses = [];
    this.saveToLocalStorage();
  }

  /**
   * Set current question
   */
  setCurrentQuestion(question) {
    this.currentQuestion = question;
    this.questionStartTime = new Date();
  }

  /**
   * Save enriched response
   */
  saveEnrichedResponse(questionId, transcript, enriched) {
    const response = {
      questionId: questionId,
      timestamp: new Date().toISOString(),
      transcript: transcript,
      enriched: enriched,
      duration: this.questionStartTime
        ? Math.round((new Date() - this.questionStartTime) / 1000)
        : 0
    };

    this.responses.push(response);
    this.currentEnrichedResponse = enriched;
    this.saveToLocalStorage();
  }

  /**
   * Update form field
   */
  updateField(fieldId, value) {
    if (fieldId.includes('*')) {
      // Handle wildcard fields (e.g., acc_*)
      const prefix = fieldId.replace('*', '');
      // This will be handled by the specific field logic
      return;
    }

    this.formData[fieldId] = value;
    this.saveToLocalStorage();
  }

  /**
   * Get current enriched response
   */
  getCurrentEnrichedResponse() {
    return this.currentEnrichedResponse;
  }

  /**
   * Get all form data
   */
  getFormData() {
    return {
      ...this.extractedPDFData,
      ...this.formData
    };
  }

  /**
   * Get all responses (array)
   */
  getResponses() {
    return this.responses;
  }

  /**
   * Get all responses indexed by questionId
   */
  getAllResponses() {
    const indexed = {};
    for (const response of this.responses) {
      indexed[response.questionId] = response;
    }
    return indexed;
  }

  /**
   * Get session duration
   */
  getSessionDuration() {
    if (!this.startTime) return 0;
    return Math.round((new Date() - this.startTime) / 1000);
  }

  /**
   * Save to localStorage
   */
  saveToLocalStorage() {
    const sessionData = {
      extractedPDFData: this.extractedPDFData,
      formData: this.formData,
      responses: this.responses,
      startTime: this.startTime,
      lastSaved: new Date().toISOString()
    };

    localStorage.setItem('geva_voice_session', JSON.stringify(sessionData));
  }

  /**
   * Load from localStorage
   */
  loadFromLocalStorage() {
    const saved = localStorage.getItem('geva_voice_session');
    if (saved) {
      const sessionData = JSON.parse(saved);
      this.extractedPDFData = sessionData.extractedPDFData || {};
      this.formData = sessionData.formData || {};
      this.responses = sessionData.responses || [];
      this.startTime = sessionData.startTime ? new Date(sessionData.startTime) : null;
      return true;
    }
    return false;
  }

  /**
   * Clear session
   */
  clear() {
    this.extractedPDFData = {};
    this.formData = {};
    this.responses = [];
    this.currentQuestion = null;
    this.currentEnrichedResponse = null;
    this.startTime = null;
    this.questionStartTime = null;
    localStorage.removeItem('geva_voice_session');
  }

  /**
   * Export session data
   */
  export() {
    return {
      extractedPDFData: this.extractedPDFData,
      formData: this.formData,
      responses: this.responses,
      duration: this.getSessionDuration(),
      completedAt: new Date().toISOString()
    };
  }
}
