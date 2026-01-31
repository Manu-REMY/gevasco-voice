/**
 * Voice Orchestrator
 * Main coordinator for the voice interview workflow
 */
class VoiceOrchestrator {
  constructor() {
    this.apiClient = new VoiceAPIClient();
    this.session = new VoiceSession();
    this.ui = new VoiceUI();

    // Niveau scolaire sélectionné (par défaut CP)
    this.selectedLevel = 'CP';
    this.questions = [];
    this.currentQuestionIndex = 0;

    this.mediaRecorder = null;
    this.audioChunks = [];
    this.currentAudio = null;

    // Web Speech API for local STT
    this.speechRecognition = null;
    this.localTranscript = '';

    // Session ID pour le PDF original (utilisé pour le remplissage)
    this.pdfSessionId = null;

    this.init();
  }

  /**
   * Initialize the orchestrator
   */
  async init() {
    // Initialize API Key Manager
    apiKeyManager.init();

    // Check API key first
    const hasValidApiKey = await apiKeyManager.checkAPIKeyStatus();

    if (!hasValidApiKey) {
      // Show API key modal
      apiKeyManager.showModal();
      this.ui.updateAPIStatus(false);
      return;
    }

    // Check API connection
    await this.checkAPIConnection();

    // Try to load saved session
    if (this.session.loadFromLocalStorage()) {
      console.log('Session loaded from localStorage');
    }

    // Setup event listeners
    this.setupEventListeners();

    // Show upload section
    this.ui.showSection('upload');
  }

  /**
   * Check API connection status
   */
  async checkAPIConnection() {
    const isConnected = await this.apiClient.checkHealth();
    this.ui.updateAPIStatus(isConnected);

    if (!isConnected) {
      this.ui.showError('Impossible de se connecter au serveur. Assurez-vous que le backend est démarré.');
    }

    return isConnected;
  }

  /**
   * Define interview questions (deprecated - now uses questions-config.js)
   * Kept for backwards compatibility, returns questions for selected level
   */
  defineQuestions() {
    // Utilise la configuration centralisée des questions
    return getQuestionsForLevel(this.selectedLevel);
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // PDF upload
    this.ui.elements.pdfInput?.addEventListener('change', (e) => {
      this.handlePDFUpload(e.target.files[0]);
    });

    // Start interview
    this.ui.elements.startInterviewBtn?.addEventListener('click', () => {
      this.startInterview();
    });

    // Recording controls
    this.ui.elements.startRecordingBtn?.addEventListener('click', () => {
      this.startRecording();
    });

    this.ui.elements.stopRecordingBtn?.addEventListener('click', () => {
      this.stopRecording();
    });

    this.ui.elements.repeatQuestionBtn?.addEventListener('click', () => {
      this.repeatCurrentQuestion();
    });

    // Response validation
    this.ui.elements.confirmResponseBtn?.addEventListener('click', () => {
      this.confirmResponse();
    });

    this.ui.elements.retryResponseBtn?.addEventListener('click', () => {
      this.retryResponse();
    });

    // Final validation
    this.ui.elements.readSummaryBtn?.addEventListener('click', () => {
      this.readSummary();
    });

    this.ui.elements.generatePdfBtn?.addEventListener('click', () => {
      this.generateFinalPDF();
    });
  }

  /**
   * Handle PDF upload
   */
  async handlePDFUpload(file) {
    if (!file) return;

    this.ui.showLoading('Extraction des données du PDF...');

    try {
      const result = await this.apiClient.extractPDF(file);

      if (result.success) {
        // Stocker le sessionId pour le remplissage ultérieur
        this.pdfSessionId = result.sessionId;
        console.log('PDF Session ID:', this.pdfSessionId);

        this.session.initWithPDFData(result.data);
        this.ui.displayExtractedData(result.data);
        this.ui.showToast('Données extraites avec succès', 'success');
      } else {
        throw new Error(result.error || 'Extraction failed');
      }
    } catch (error) {
      console.error('PDF extraction error:', error);
      this.ui.showError('Erreur lors de l\'extraction du PDF: ' + error.message);
    } finally {
      this.ui.hideLoading();
    }
  }

  /**
   * Start the interview
   */
  async startInterview() {
    // Récupérer le niveau sélectionné
    const levelSelect = document.getElementById('level-select');
    this.selectedLevel = levelSelect ? levelSelect.value : 'CP';

    // Charger les questions adaptées au niveau
    this.questions = getQuestionsForLevel(this.selectedLevel);

    console.log(`Démarrage de l'entretien pour le niveau: ${this.selectedLevel}`);
    console.log(`Nombre de questions: ${this.questions.length}`);

    this.currentQuestionIndex = 0;
    this.session.startInterview();
    this.session.setLevel(this.selectedLevel);
    this.ui.showSection('interview');

    // Mettre à jour le nombre total de questions dans l'UI
    const totalQuestionsEl = document.getElementById('total-questions');
    if (totalQuestionsEl) {
      totalQuestionsEl.textContent = this.questions.length;
    }

    await this.askNextQuestion();
  }

  /**
   * Ask next question
   */
  async askNextQuestion() {
    if (this.currentQuestionIndex >= this.questions.length) {
      return this.finishInterview();
    }

    const question = this.questions[this.currentQuestionIndex];
    this.session.setCurrentQuestion(question);

    // Update UI
    this.ui.displayQuestion(question, this.currentQuestionIndex + 1, this.questions.length);
    this.ui.updateProgress((this.currentQuestionIndex / this.questions.length) * 100);
    this.ui.clearEnrichedResponse();

    // Generate and play TTS
    await this.speakQuestion(question.text);

    // Enable recording
    this.ui.enableRecording();
  }

  /**
   * Speak question using TTS
   */
  async speakQuestion(text) {
    try {
      this.ui.setStatus('speaking', 'Je pose la question...', 'Écoutez attentivement');

      const audioBlob = await this.apiClient.textToSpeech(text);
      await this.playAudio(audioBlob);

      this.ui.setStatus('ready', 'Prêt à écouter', 'Cliquez sur "Commencer à parler"');
    } catch (error) {
      console.error('TTS Error:', error);
      this.ui.showError('Erreur lors de la lecture de la question');
      this.ui.setStatus('error', 'Erreur de lecture', 'Cliquez sur "Répéter la question"');
    }
  }

  /**
   * Play audio
   */
  async playAudio(audioBlob) {
    return new Promise((resolve, reject) => {
      if (this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio = null;
      }

      this.currentAudio = new Audio(URL.createObjectURL(audioBlob));

      this.currentAudio.onended = () => {
        resolve();
      };

      this.currentAudio.onerror = (error) => {
        reject(error);
      };

      this.currentAudio.play().catch(reject);
    });
  }

  /**
   * Repeat current question
   */
  async repeatCurrentQuestion() {
    const question = this.questions[this.currentQuestionIndex];
    await this.speakQuestion(question.text);
  }

  /**
   * Start recording - supports both local (Web Speech API) and remote (Whisper) modes
   */
  async startRecording() {
    const sttMode = apiKeyManager.getSTTMode();

    if (sttMode === 'local') {
      await this.startLocalRecording();
    } else {
      await this.startRemoteRecording();
    }
  }

  /**
   * Start local recording using Web Speech API
   */
  async startLocalRecording() {
    try {
      // Check Web Speech API support
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        // Fallback to remote if not supported
        this.ui.showToast('Web Speech API non supportée. Passage en mode distant.', 'info');
        apiKeyManager.setSTTMode('remote');
        apiKeyManager.updateSTTModeUI(true);
        await this.startRemoteRecording();
        return;
      }

      this.speechRecognition = new SpeechRecognition();
      this.speechRecognition.lang = 'fr-FR';
      this.speechRecognition.continuous = true;
      this.speechRecognition.interimResults = true;
      this.speechRecognition.maxAlternatives = 1;

      this.localTranscript = '';
      let interimTranscript = '';

      this.speechRecognition.onresult = (event) => {
        interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            this.localTranscript += result[0].transcript + ' ';
          } else {
            interimTranscript += result[0].transcript;
          }
        }
        // Show real-time transcript
        this.ui.displayTranscript(this.localTranscript + interimTranscript);
      };

      this.speechRecognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'no-speech') {
          this.ui.showToast('Aucune parole détectée. Parlez plus fort.', 'info');
        } else if (event.error === 'not-allowed') {
          this.ui.showError('Accès au microphone refusé. Vérifiez les permissions.');
          this.ui.setStatus('error', 'Accès refusé', 'Autorisez le microphone');
        }
      };

      this.speechRecognition.onend = () => {
        // Recognition ended - will be handled by stopRecording
      };

      this.speechRecognition.start();
      this.ui.startRecordingAnimation();
      this.ui.setStatus('recording', 'Je vous écoute...', '🌐 Mode navigateur - Audio traité par Google');

    } catch (error) {
      console.error('Local recording error:', error);
      this.ui.showError('Erreur de reconnaissance vocale locale');
      this.ui.setStatus('error', 'Erreur', 'Réessayez ou passez en mode distant');
    }
  }

  /**
   * Start remote recording using MediaRecorder (for Whisper API)
   */
  async startRemoteRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      });

      // Check for supported MIME types
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : 'audio/webm';

      this.mediaRecorder = new MediaRecorder(stream, { mimeType });
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(this.audioChunks, { type: mimeType });
        await this.processRemoteRecording(audioBlob);

        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      this.mediaRecorder.start();
      this.ui.startRecordingAnimation();
      this.ui.setStatus('recording', 'Je vous écoute...', '☁️ Mode distant - Audio envoyé à OpenAI');

    } catch (error) {
      console.error('Recording Error:', error);
      this.ui.showError('Erreur microphone. Vérifiez les permissions.');
      this.ui.setStatus('error', 'Erreur microphone', 'Vérifiez les permissions');
    }
  }

  /**
   * Stop recording - handles both local and remote modes
   */
  stopRecording() {
    const sttMode = apiKeyManager.getSTTMode();

    if (sttMode === 'local' && this.speechRecognition) {
      this.speechRecognition.stop();
      this.ui.stopRecordingAnimation();
      this.ui.setStatus('processing', 'Traitement en cours...', 'Veuillez patienter');

      // Process local transcript
      setTimeout(() => {
        this.processLocalRecording(this.localTranscript.trim());
      }, 100);

    } else if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.stop();
      this.ui.stopRecordingAnimation();
      this.ui.setStatus('processing', 'Traitement en cours...', 'Veuillez patienter');
    }
  }

  /**
   * Process local recording (Web Speech API transcript)
   */
  async processLocalRecording(transcriptText) {
    try {
      if (!transcriptText || transcriptText.length < 5) {
        this.ui.showError('Transcription trop courte. Veuillez reformuler.');
        this.ui.enableRecording();
        this.ui.setStatus('ready', 'Prêt à écouter', 'Reformulez votre réponse');
        return;
      }

      this.ui.displayTranscript(transcriptText);

      // Enrichissement via GPT-4
      this.ui.setStatus('processing', 'Enrichissement IA...', 'Structuration de votre réponse');

      const question = this.questions[this.currentQuestionIndex];
      const existingData = this.session.getFormData();

      const enriched = await this.apiClient.enrichResponse(
        transcriptText,
        question,
        existingData,
        this.selectedLevel
      );

      // Save to session
      this.session.saveEnrichedResponse(question.id, transcriptText, enriched);

      // Display enriched response
      this.ui.displayEnrichedResponse(enriched);

      // TTS confirmation
      await this.speakConfirmation(enriched);

      // Enable validation buttons
      this.ui.enableValidationButtons();
      this.ui.setStatus('ready', 'Validation requise', 'Validez ou reformulez votre réponse');

    } catch (error) {
      console.error('Processing Error:', error);
      this.ui.showError('Erreur de traitement: ' + error.message);
      this.ui.setStatus('error', 'Erreur de traitement', 'Cliquez sur "Commencer à parler" pour réessayer');
      this.ui.enableRecording();
    }
  }

  /**
   * Process remote recording (Whisper API)
   */
  async processRemoteRecording(audioBlob) {
    try {
      // 1. Transcription via Whisper
      this.ui.setStatus('processing', 'Transcription...', 'Conversion de la parole en texte');
      const transcript = await this.apiClient.transcribe(audioBlob);

      this.ui.displayTranscript(transcript.text || transcript);

      // 2. Enrichissement via GPT-4
      this.ui.setStatus('processing', 'Enrichissement IA...', 'Structuration de votre réponse');

      const question = this.questions[this.currentQuestionIndex];
      const existingData = this.session.getFormData();

      const enriched = await this.apiClient.enrichResponse(
        transcript.text || transcript,
        question,
        existingData,
        this.selectedLevel
      );

      // 3. Save to session
      this.session.saveEnrichedResponse(question.id, transcript.text || transcript, enriched);

      // 4. Display enriched response
      this.ui.displayEnrichedResponse(enriched);

      // 5. TTS confirmation
      await this.speakConfirmation(enriched);

      // 6. Enable validation buttons
      this.ui.enableValidationButtons();
      this.ui.setStatus('ready', 'Validation requise', 'Validez ou reformulez votre réponse');

    } catch (error) {
      console.error('Processing Error:', error);
      this.ui.showError('Erreur de traitement: ' + error.message);
      this.ui.setStatus('error', 'Erreur de traitement', 'Cliquez sur "Commencer à parler" pour réessayer');
      this.ui.enableRecording();
    }
  }

  /**
   * Speak confirmation
   */
  async speakConfirmation(enriched) {
    try {
      // Utiliser les points clés pour la relecture vocale
      let keyPointsText = '';
      if (enriched.keyPoints && enriched.keyPoints.length > 0) {
        keyPointsText = enriched.keyPoints.join('. ');
      } else {
        // Fallback sur le texte enrichi si pas de points clés
        keyPointsText = enriched.enrichedText;
      }
      const confirmationText = `J'ai bien compris. Voici les points clés: ${keyPointsText}. Est-ce correct?`;

      const audioBlob = await this.apiClient.textToSpeech(confirmationText);
      await this.playAudio(audioBlob);
    } catch (error) {
      console.error('Confirmation TTS Error:', error);
      // Non-blocking error, continue
    }
  }

  /**
   * Confirm response and move to next question
   */
  confirmResponse() {
    const question = this.questions[this.currentQuestionIndex];
    const enriched = this.session.getCurrentEnrichedResponse();

    if (!enriched) {
      this.ui.showError('Aucune réponse à valider');
      return;
    }

    // Save to form data
    question.targetFields.forEach(fieldId => {
      if (!fieldId.includes('*')) {
        this.session.updateField(fieldId, enriched.enrichedText);
      }
    });

    // Next question
    this.currentQuestionIndex++;
    this.ui.showToast('Réponse validée', 'success');
    this.askNextQuestion();
  }

  /**
   * Retry response
   */
  retryResponse() {
    this.ui.clearEnrichedResponse();
    this.ui.enableRecording();
    this.ui.setStatus('ready', 'Prêt à écouter', 'Reformulez votre réponse');
  }

  /**
   * Finish interview
   */
  async finishInterview() {
    this.ui.showSection('validation');
    this.ui.updateProgress(100);
    this.ui.showLoading('Génération du résumé...');

    try {
      const formData = this.session.getFormData();
      const summary = await this.apiClient.generateSummary(formData, this.selectedLevel);

      this.ui.displaySummary(summary);
      this.ui.showToast('Entretien terminé avec succès', 'success');
    } catch (error) {
      console.error('Summary generation error:', error);
      this.ui.showError('Erreur lors de la génération du résumé');
      this.ui.displaySummary('Résumé non disponible. Veuillez générer le PDF pour voir les données collectées.');
    } finally {
      this.ui.hideLoading();
    }
  }

  /**
   * Read summary aloud
   */
  async readSummary() {
    const summaryText = this.ui.elements.summaryText?.textContent;
    if (!summaryText) {
      this.ui.showError('Aucun résumé à lire');
      return;
    }

    try {
      this.ui.showLoading('Génération audio...');
      const audioBlob = await this.apiClient.textToSpeech(summaryText);
      this.ui.hideLoading();
      await this.playAudio(audioBlob);
    } catch (error) {
      console.error('Read summary error:', error);
      this.ui.showError('Erreur lors de la lecture du résumé');
      this.ui.hideLoading();
    }
  }

  /**
   * Generate final PDF - Remplit le PDF original avec les données collectées
   */
  async generateFinalPDF() {
    if (!this.pdfSessionId) {
      this.ui.showError('Session PDF expirée. Veuillez recharger le PDF original.');
      return;
    }

    this.ui.showLoading('Remplissage du PDF en cours...');

    try {
      const formData = this.session.getFormData();

      // Préparer les données de l'entretien pour le remplissage
      const interviewData = this.prepareInterviewDataForPDF();

      // Appeler l'API pour remplir le PDF
      const pdfBlob = await this.apiClient.fillPDF(
        this.pdfSessionId,
        formData,
        interviewData
      );

      // Télécharger le PDF rempli
      const nomEleve = formData.nomEleve || 'eleve';
      const date = new Date().toISOString().split('T')[0];
      const filename = `GEVA-Sco_${nomEleve.replace(/\s+/g, '_')}_${date}.pdf`;

      const downloadUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

      this.ui.showToast('PDF complété et téléchargé avec succès', 'success');

    } catch (error) {
      console.error('PDF fill error:', error);
      this.ui.showError('Erreur lors du remplissage du PDF: ' + error.message);
    } finally {
      this.ui.hideLoading();
    }
  }

  /**
   * Prépare les données de l'entretien pour le mapping PDF
   */
  prepareInterviewDataForPDF() {
    const responses = this.session.getAllResponses();
    const interviewData = {};

    // Mapper les réponses des questions vers les clés attendues par le service
    const questionMapping = {
      'vue_ensemble': 'question1',
      'comportement_detail': 'question2',
      'lecture': 'question3',
      'ecriture': 'question4',
      'comprehension': 'question5',
      'mathematiques': 'question6',
      'autonomie': 'question7',
      'besoins': 'question8',
      'amenagements': 'question9',
      'evolutions': 'question10'
    };

    for (const [questionId, mappedKey] of Object.entries(questionMapping)) {
      if (responses[questionId] && responses[questionId].enriched) {
        interviewData[mappedKey] = responses[questionId].enriched.enrichedText || responses[questionId].enriched;
      }
    }

    // Ajouter le résumé final
    const summaryText = this.ui.elements.summaryText?.textContent;
    if (summaryText) {
      interviewData.summary = summaryText;
    }

    return interviewData;
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  window.voiceOrchestrator = new VoiceOrchestrator();
});
