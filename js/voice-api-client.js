/**
 * Voice API Client
 * Handles all communication with the backend API
 */
class VoiceAPIClient {
  constructor() {
    this.baseURL = 'http://localhost:3000/api';
  }

  /**
   * Upload and extract data from PDF
   */
  async extractPDF(pdfFile) {
    const formData = new FormData();
    formData.append('pdf', pdfFile);

    const response = await fetch(`${this.baseURL}/pdf/extract`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`PDF extraction failed: ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Transcribe audio to text using Whisper
   */
  async transcribe(audioBlob) {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');

    const response = await fetch(`${this.baseURL}/voice/transcribe`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Transcription failed: ${response.statusText}`);
    }

    const result = await response.json();
    return result.transcript;
  }

  /**
   * Enrich transcript with GPT-4
   */
  async enrichResponse(transcript, questionContext, existingData) {
    const response = await fetch(`${this.baseURL}/voice/enrich`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        transcript: transcript,
        questionContext: questionContext,
        existingData: existingData
      })
    });

    if (!response.ok) {
      throw new Error(`Enrichment failed: ${response.statusText}`);
    }

    const result = await response.json();
    return result.enriched;
  }

  /**
   * Generate speech from text using TTS
   */
  async textToSpeech(text, voice = 'nova', speed = 0.95) {
    const response = await fetch(`${this.baseURL}/voice/tts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text,
        voice: voice,
        speed: speed
      })
    });

    if (!response.ok) {
      throw new Error(`TTS failed: ${response.statusText}`);
    }

    return await response.blob();
  }

  /**
   * Generate final summary
   */
  async generateSummary(formData) {
    const response = await fetch(`${this.baseURL}/voice/summary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        formData: formData
      })
    });

    if (!response.ok) {
      throw new Error(`Summary generation failed: ${response.statusText}`);
    }

    const result = await response.json();
    return result.summary;
  }

  /**
   * Remplir le PDF original avec les données de l'entretien
   * @param {string} sessionId - ID de session du PDF uploadé
   * @param {Object} extractedData - Données extraites du PDF initial
   * @param {Object} interviewData - Réponses de l'entretien vocal
   * @returns {Blob} - Le PDF rempli
   */
  async fillPDF(sessionId, extractedData, interviewData) {
    const response = await fetch(`${this.baseURL}/pdf/fill`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sessionId: sessionId,
        extractedData: extractedData,
        interviewData: interviewData
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(`Remplissage PDF échoué: ${error.error || response.statusText}`);
    }

    return await response.blob();
  }

  /**
   * Check API health
   */
  async checkHealth() {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}
