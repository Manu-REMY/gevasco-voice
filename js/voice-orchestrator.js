/**
 * Voice Orchestrator
 * Main coordinator for the voice interview workflow
 */
class VoiceOrchestrator {
  constructor() {
    this.apiClient = new VoiceAPIClient();
    this.session = new VoiceSession();
    this.ui = new VoiceUI();

    this.questions = this.defineQuestions();
    this.currentQuestionIndex = 0;

    this.mediaRecorder = null;
    this.audioChunks = [];
    this.currentAudio = null;

    this.init();
  }

  /**
   * Initialize the orchestrator
   */
  async init() {
    // Check API connection
    const isConnected = await this.apiClient.checkHealth();
    this.ui.updateAPIStatus(isConnected);

    if (!isConnected) {
      this.ui.showError('Impossible de se connecter au serveur. Assurez-vous que le backend est démarré.');
    }

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
   * Define interview questions
   */
  defineQuestions() {
    return [
      {
        id: 'vue_ensemble',
        text: "Parlez-moi de cet élève de manière générale. Comment se comporte-t-il en classe? Comment se passe son année de CP? Prenez le temps de me décrire la situation globalement.",
        category: 'comportement',
        targetFields: ['eval_observations', 'comportement'],
        duration: 180
      },
      {
        id: 'comportement_detail',
        text: "Décrivez-moi plus précisément le comportement de l'élève en classe. Comment gère-t-il ses émotions? Comment sont ses relations avec les autres élèves et avec vous? Y a-t-il des situations particulières où vous observez des difficultés?",
        category: 'comportement',
        targetFields: ['comportement', 'obs_cadre1', 'obs_cadre2'],
        duration: 150
      },
      {
        id: 'lecture',
        text: "Où en est cet élève dans l'apprentissage de la lecture? Reconnaît-il les lettres? Arrive-t-il à décoder des syllabes, des mots? Y a-t-il des confusions de sons? Donnez-moi des exemples concrets de ce qu'il sait faire et de ses difficultés.",
        category: 'francais',
        targetFields: ['francais'],
        duration: 150
      },
      {
        id: 'ecriture',
        text: "Et concernant l'écriture? Comment se passe le geste graphique? L'élève respecte-t-il le lignage? Y a-t-il des difficultés particulières avec certaines lettres ou avec la tenue du crayon?",
        category: 'francais',
        targetFields: ['francais'],
        duration: 120
      },
      {
        id: 'comprehension',
        text: "Comment se passe la compréhension orale? L'élève comprend-il les consignes? Arrive-t-il à s'exprimer clairement? Participe-t-il aux échanges collectifs?",
        category: 'francais',
        targetFields: ['francais'],
        duration: 120
      },
      {
        id: 'mathematiques',
        text: "Parlons des mathématiques. Où en est l'élève dans la connaissance des nombres, le dénombrement, le calcul? A-t-il besoin de matériel de manipulation? Y a-t-il des notions qui sont acquises, d'autres en cours d'acquisition?",
        category: 'mathematiques',
        targetFields: ['mathematiques'],
        duration: 150
      },
      {
        id: 'autonomie',
        text: "Comment se débrouille l'élève au niveau de l'autonomie? Gère-t-il son matériel? Peut-il travailler seul? A-t-il besoin d'être beaucoup accompagné?",
        category: 'autonomie',
        targetFields: ['autonomie'],
        duration: 120
      },
      {
        id: 'besoins',
        text: "D'après vous, quels sont les principaux besoins de cet élève pour progresser? De quoi a-t-il besoin au quotidien?",
        category: 'besoins',
        targetFields: ['besoins'],
        duration: 120
      },
      {
        id: 'amenagements',
        text: "Quels aménagements pédagogiques avez-vous mis en place ou souhaitez-vous mettre en place? Pensez-vous qu'un accompagnement spécifique serait nécessaire? AESH, RASED, orthophoniste, autre?",
        category: 'amenagements',
        targetFields: ['amenagements', 'propositions'],
        duration: 180
      },
      {
        id: 'evolutions',
        text: "Pour finir, parlez-moi des progrès que vous avez observés depuis le début de l'année. Comment voyez-vous la suite du parcours de cet élève?",
        category: 'propositions',
        targetFields: ['obs_evolutions', 'propositions'],
        duration: 180
      }
    ];
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
    this.currentQuestionIndex = 0;
    this.session.startInterview();
    this.ui.showSection('interview');

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
   * Start recording
   */
  async startRecording() {
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
        await this.processRecording(audioBlob);

        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      this.mediaRecorder.start();
      this.ui.startRecordingAnimation();
      this.ui.setStatus('recording', 'Je vous écoute...', 'Parlez clairement');

    } catch (error) {
      console.error('Recording Error:', error);
      this.ui.showError('Erreur microphone. Vérifiez les permissions.');
      this.ui.setStatus('error', 'Erreur microphone', 'Vérifiez les permissions');
    }
  }

  /**
   * Stop recording
   */
  stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.stop();
      this.ui.stopRecordingAnimation();
      this.ui.setStatus('processing', 'Traitement en cours...', 'Veuillez patienter');
    }
  }

  /**
   * Process recording
   */
  async processRecording(audioBlob) {
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
        existingData
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
      const summary = enriched.enrichedText.substring(0, 200);
      const confirmationText = `J'ai bien compris. Voici ce que je retiens: ${summary}... Est-ce correct?`;

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
      const summary = await this.apiClient.generateSummary(formData);

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
   * Generate final PDF
   */
  generateFinalPDF() {
    try {
      const completeData = this.session.getFormData();

      // Check if pdf-generator.js is loaded
      if (typeof generatePDF === 'function') {
        generatePDF(completeData);
        this.ui.showToast('PDF généré avec succès', 'success');
      } else {
        throw new Error('Le générateur de PDF n\'est pas chargé');
      }
    } catch (error) {
      console.error('PDF generation error:', error);
      this.ui.showError('Erreur lors de la génération du PDF: ' + error.message);
    }
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  window.voiceOrchestrator = new VoiceOrchestrator();
});
