/**
 * Voice UI Controller
 * Manages all UI interactions and updates
 */
class VoiceUI {
  constructor() {
    this.elements = this.getElements();
    this.initEventListeners();
  }

  /**
   * Get all DOM elements
   */
  getElements() {
    return {
      // Sections
      uploadSection: document.getElementById('upload-section'),
      interviewSection: document.getElementById('interview-section'),
      validationSection: document.getElementById('validation-section'),

      // Workflow steps
      stepUpload: document.getElementById('step-upload'),
      stepInterview: document.getElementById('step-interview'),
      stepValidation: document.getElementById('step-validation'),

      // Upload phase
      pdfInput: document.getElementById('pdf-input'),
      uploadZone: document.getElementById('upload-zone'),
      extractionResult: document.getElementById('extraction-result'),
      extractedData: document.getElementById('extracted-data'),
      editExtractedBtn: document.getElementById('edit-extracted-btn'),
      startInterviewBtn: document.getElementById('start-interview-btn'),

      // Interview phase
      questionText: document.getElementById('question-text'),
      questionHint: document.getElementById('question-hint'),
      questionCategory: document.getElementById('question-category'),
      currentQuestion: document.getElementById('current-question'),
      currentQuestionNum: document.getElementById('current-question-num'),
      totalQuestions: document.getElementById('total-questions'),

      statusIndicator: document.getElementById('status-indicator'),
      statusText: document.getElementById('status-text'),
      statusSubtext: document.getElementById('status-subtext'),

      transcriptBox: document.getElementById('transcript-box'),
      transcriptText: document.getElementById('transcript-text'),

      startRecordingBtn: document.getElementById('start-recording-btn'),
      stopRecordingBtn: document.getElementById('stop-recording-btn'),
      repeatQuestionBtn: document.getElementById('repeat-question-btn'),

      enrichedPreview: document.getElementById('enriched-preview'),
      enrichedText: document.getElementById('enriched-text'),
      enrichedMeta: document.getElementById('enriched-meta'),
      confirmResponseBtn: document.getElementById('confirm-response-btn'),
      retryResponseBtn: document.getElementById('retry-response-btn'),

      progressFill: document.getElementById('progress-fill'),
      progressPercent: document.getElementById('progress-percent'),

      // Validation phase
      summaryText: document.getElementById('summary-text'),
      readSummaryBtn: document.getElementById('read-summary-btn'),
      editResponseBtn: document.getElementById('edit-response-btn'),
      generatePdfBtn: document.getElementById('generate-pdf-btn'),

      // Loading & toasts
      loadingOverlay: document.getElementById('loading-overlay'),
      loadingText: document.getElementById('loading-text'),
      toastContainer: document.getElementById('toast-container'),

      // API status
      apiStatus: document.getElementById('api-status')
    };
  }

  /**
   * Initialize event listeners
   */
  initEventListeners() {
    // Upload zone drag & drop
    if (this.elements.uploadZone) {
      this.elements.uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        this.elements.uploadZone.classList.add('dragover');
      });

      this.elements.uploadZone.addEventListener('dragleave', () => {
        this.elements.uploadZone.classList.remove('dragover');
      });

      this.elements.uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        this.elements.uploadZone.classList.remove('dragover');

        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type === 'application/pdf') {
          this.elements.pdfInput.files = files;
          this.elements.pdfInput.dispatchEvent(new Event('change'));
        }
      });
    }
  }

  /**
   * Show specific section
   */
  showSection(sectionName) {
    // Hide all sections
    this.elements.uploadSection?.classList.remove('active');
    this.elements.interviewSection?.classList.remove('active');
    this.elements.validationSection?.classList.remove('active');

    // Update workflow steps
    this.elements.stepUpload?.classList.remove('active');
    this.elements.stepInterview?.classList.remove('active');
    this.elements.stepValidation?.classList.remove('active');

    // Show requested section
    switch (sectionName) {
      case 'upload':
        this.elements.uploadSection?.classList.add('active');
        this.elements.stepUpload?.classList.add('active');
        break;
      case 'interview':
        this.elements.interviewSection?.classList.add('active');
        this.elements.stepInterview?.classList.add('active');
        break;
      case 'validation':
        this.elements.validationSection?.classList.add('active');
        this.elements.stepValidation?.classList.add('active');
        break;
    }
  }

  /**
   * Display extracted PDF data
   */
  displayExtractedData(data) {
    if (!this.elements.extractedData) return;

    const fields = [
      { label: 'Nom et prénom', value: data.nomEleve },
      { label: 'Date de naissance', value: data.dateNaissance },
      { label: 'Classe', value: data.classe },
      { label: 'École', value: data.etablissement },
      { label: 'Parent', value: data.nomP1 },
      { label: 'Enseignant référent', value: data.enseignantReferent }
    ];

    let html = '<div class="extracted-fields">';
    fields.forEach(field => {
      if (field.value) {
        html += `
          <div class="extracted-field">
            <span class="field-label">${field.label}:</span>
            <span class="field-value">${field.value}</span>
          </div>
        `;
      }
    });
    html += '</div>';

    this.elements.extractedData.innerHTML = html;
    this.elements.extractionResult.style.display = 'block';
  }

  /**
   * Display question
   */
  displayQuestion(question, currentNum, totalNum) {
    if (this.elements.questionText) {
      this.elements.questionText.textContent = question.text;
    }

    if (this.elements.questionCategory) {
      this.elements.questionCategory.textContent = this.getCategoryLabel(question.category);
    }

    if (this.elements.currentQuestion) {
      this.elements.currentQuestion.textContent = currentNum;
    }

    if (this.elements.currentQuestionNum) {
      this.elements.currentQuestionNum.textContent = currentNum;
    }

    if (this.elements.totalQuestions) {
      this.elements.totalQuestions.textContent = totalNum;
    }

    // Show hint if available
    if (this.elements.questionHint && question.hint) {
      this.elements.questionHint.textContent = question.hint;
      this.elements.questionHint.style.display = 'block';
    } else if (this.elements.questionHint) {
      this.elements.questionHint.style.display = 'none';
    }
  }

  /**
   * Get category label
   */
  getCategoryLabel(category) {
    const labels = {
      'comportement': 'Comportement',
      'francais': 'Français',
      'mathematiques': 'Mathématiques',
      'autonomie': 'Autonomie',
      'besoins': 'Besoins',
      'amenagements': 'Aménagements',
      'propositions': 'Propositions'
    };
    return labels[category] || category;
  }

  /**
   * Set status
   */
  setStatus(status, text, subtext = '') {
    if (!this.elements.statusIndicator) return;

    // Remove all status classes
    this.elements.statusIndicator.className = 'status-indicator';

    // Add new status class
    this.elements.statusIndicator.classList.add(`status-${status}`);

    if (this.elements.statusText) {
      this.elements.statusText.textContent = text;
    }

    if (this.elements.statusSubtext) {
      this.elements.statusSubtext.textContent = subtext;
    }
  }

  /**
   * Display transcript
   */
  displayTranscript(text) {
    if (this.elements.transcriptText) {
      this.elements.transcriptText.textContent = text;
    }
    if (this.elements.transcriptBox) {
      this.elements.transcriptBox.style.display = 'block';
    }
  }

  /**
   * Display enriched response
   */
  displayEnrichedResponse(enriched) {
    if (this.elements.enrichedText) {
      this.elements.enrichedText.textContent = enriched.enrichedText;
    }

    // Display metadata
    if (this.elements.enrichedMeta && enriched.keyPoints) {
      let metaHtml = '<div class="enriched-meta-content">';

      if (enriched.keyPoints.length > 0) {
        metaHtml += '<div class="meta-section"><strong>Points clés:</strong><ul>';
        enriched.keyPoints.forEach(point => {
          metaHtml += `<li>${point}</li>`;
        });
        metaHtml += '</ul></div>';
      }

      if (enriched.suggestedPhrases && enriched.suggestedPhrases.length > 0) {
        metaHtml += '<div class="meta-section"><strong>Phrases suggérées:</strong>';
        metaHtml += `<span class="meta-info">${enriched.suggestedPhrases.length} phrases de la bibliothèque</span></div>`;
      }

      metaHtml += '</div>';
      this.elements.enrichedMeta.innerHTML = metaHtml;
    }

    if (this.elements.enrichedPreview) {
      this.elements.enrichedPreview.style.display = 'block';
    }
  }

  /**
   * Clear enriched response
   */
  clearEnrichedResponse() {
    if (this.elements.enrichedPreview) {
      this.elements.enrichedPreview.style.display = 'none';
    }
    if (this.elements.transcriptBox) {
      this.elements.transcriptBox.style.display = 'none';
    }
  }

  /**
   * Enable/disable recording buttons
   */
  enableRecording() {
    if (this.elements.startRecordingBtn) {
      this.elements.startRecordingBtn.disabled = false;
    }
    if (this.elements.stopRecordingBtn) {
      this.elements.stopRecordingBtn.disabled = true;
      this.elements.stopRecordingBtn.style.display = 'none';
    }
    if (this.elements.startRecordingBtn) {
      this.elements.startRecordingBtn.style.display = 'block';
    }
  }

  /**
   * Start recording animation
   */
  startRecordingAnimation() {
    if (this.elements.startRecordingBtn) {
      this.elements.startRecordingBtn.style.display = 'none';
    }
    if (this.elements.stopRecordingBtn) {
      this.elements.stopRecordingBtn.disabled = false;
      this.elements.stopRecordingBtn.style.display = 'block';
    }
  }

  /**
   * Stop recording animation
   */
  stopRecordingAnimation() {
    this.enableRecording();
  }

  /**
   * Enable validation buttons
   */
  enableValidationButtons() {
    if (this.elements.confirmResponseBtn) {
      this.elements.confirmResponseBtn.disabled = false;
    }
    if (this.elements.retryResponseBtn) {
      this.elements.retryResponseBtn.disabled = false;
    }
  }

  /**
   * Update progress
   */
  updateProgress(percent) {
    if (this.elements.progressFill) {
      this.elements.progressFill.style.width = `${percent}%`;
    }
    if (this.elements.progressPercent) {
      this.elements.progressPercent.textContent = `${Math.round(percent)}%`;
    }
  }

  /**
   * Display summary
   */
  displaySummary(summary) {
    if (this.elements.summaryText) {
      this.elements.summaryText.textContent = summary;
    }
  }

  /**
   * Show loading overlay
   */
  showLoading(text = 'Traitement en cours...') {
    if (this.elements.loadingText) {
      this.elements.loadingText.textContent = text;
    }
    if (this.elements.loadingOverlay) {
      this.elements.loadingOverlay.style.display = 'flex';
    }
  }

  /**
   * Hide loading overlay
   */
  hideLoading() {
    if (this.elements.loadingOverlay) {
      this.elements.loadingOverlay.style.display = 'none';
    }
  }

  /**
   * Show toast notification
   */
  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    this.elements.toastContainer?.appendChild(toast);

    // Animate in
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /**
   * Show error
   */
  showError(message) {
    this.showToast(message, 'error');
  }

  /**
   * Update API status
   */
  updateAPIStatus(isConnected) {
    if (!this.elements.apiStatus) return;

    const statusDot = this.elements.apiStatus.querySelector('.status-dot');
    const statusLabel = this.elements.apiStatus.querySelector('.status-label');

    if (isConnected) {
      statusDot?.classList.add('connected');
      if (statusLabel) statusLabel.textContent = 'API connectée';
    } else {
      statusDot?.classList.remove('connected');
      if (statusLabel) statusLabel.textContent = 'API déconnectée';
    }
  }
}
