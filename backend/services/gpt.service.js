const path = require('path');
const { getChatProvider } = require('./ai-providers');

// Load phrases library (multi-level support)
const { phrasesParNiveau, getPhrasesForLevel } = require(path.join(__dirname, '../../js/phrases.js'));

class GPTService {
  constructor() {
    // Provider will be resolved at runtime
    this.provider = null;
  }

  /**
   * Get the chat provider (lazy initialization)
   */
  _getProvider() {
    if (!this.provider) {
      this.provider = getChatProvider();
    }
    return this.provider;
  }

  async enrichResponse(transcript, questionContext, existingData, level = 'CP') {
    try {
      // Récupérer les phrases adaptées au niveau
      const levelPhrases = getPhrasesForLevel(level);
      const levelLabel = this._getLevelLabel(level);

      const systemPrompt = `Tu es un assistant spécialisé dans les évaluations GEVA-Sco pour élèves de ${levelLabel} en France.

Ton rôle:
- Analyser les réponses orales des enseignants
- Extraire les informations clés
- Structurer les observations de manière professionnelle
- Respecter le vocabulaire et les formulations de l'Éducation Nationale française
- Adapter le niveau de langage et les attentes au niveau scolaire (${levelLabel})
- Proposer des phrases tirées de la bibliothèque fournie quand pertinent

Formule tes réponses de manière concise, factuelle et professionnelle.
Utilise le présent de l'indicatif.
Reste factuel et évite les jugements de valeur.`;

      const phrasesCategory = levelPhrases[questionContext.category] || {};

      const userPrompt = `CONTEXTE DE LA QUESTION:
Question ID: ${questionContext.id}
Catégorie: ${questionContext.category}
Niveau scolaire: ${levelLabel}
Champs cibles: ${questionContext.targetFields.join(', ')}

DONNÉES EXISTANTES SUR L'ÉLÈVE:
${JSON.stringify(existingData, null, 2)}

BIBLIOTHÈQUE DE PHRASES DISPONIBLES (à utiliser si pertinent):
${JSON.stringify(phrasesCategory, null, 2)}

RÉPONSE ORALE DE L'ENSEIGNANT:
"${transcript}"

TÂCHE:
1. Analyse la réponse et extrais les informations clés
2. Identifie les phrases de la bibliothèque qui correspondent (si applicable)
3. Génère un texte structuré et professionnel pour le document GEVA-Sco
4. Identifie les points d'appui (éléments positifs) et les obstacles (difficultés)
5. Si la réponse est très courte ou imprécise, indique needsConfirmation: true

RETOURNE EXACTEMENT AU FORMAT JSON (pas de texte avant ou après):
{
  "enrichedText": "Texte structuré et professionnel pour le document GEVA-Sco...",
  "keyPoints": ["point clé 1", "point clé 2"],
  "suggestedPhrases": ["phrase de la bibliothèque 1", "phrase de la bibliothèque 2"],
  "pointsAppui": ["élément positif 1", "élément positif 2"],
  "obstacles": ["difficulté 1", "difficulté 2"],
  "confidence": 0.85,
  "needsConfirmation": false
}`;

      const provider = this._getProvider();
      const result = await provider.chatCompletionJSON([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ], {
        temperature: 0.3
      });

      return result;

    } catch (error) {
      throw new Error(`Text enrichment failed: ${error.message}`);
    }
  }

  /**
   * Get human-readable label for a level code
   */
  _getLevelLabel(level) {
    const labels = {
      'CP': 'CP (Cours Préparatoire)',
      'CE1': 'CE1 (Cours Élémentaire 1)',
      'CE2': 'CE2 (Cours Élémentaire 2)',
      'CM1': 'CM1 (Cours Moyen 1)',
      'CM2': 'CM2 (Cours Moyen 2)',
      '6EME': '6ème',
      '5EME': '5ème',
      '4EME': '4ème',
      '3EME': '3ème',
      'ULIS_ECOLE': 'ULIS école',
      'ULIS_COLLEGE': 'ULIS collège',
      'SEGPA': 'SEGPA',
      'IME': 'IME'
    };
    return labels[level] || level;
  }

  async generateSummary(formData, level = 'CP') {
    try {
      const levelLabel = this._getLevelLabel(level);
      const systemPrompt = `Tu es un assistant qui génère des résumés vocaux clairs et concis pour valider les informations d'un GEVA-Sco (niveau ${levelLabel}) avant génération du PDF final.`;

      const userPrompt = `Génère un résumé vocal structuré des observations pédagogiques suivantes:

${JSON.stringify(formData, null, 2)}

Le résumé doit:
- Être lisible à l'oral (phrases courtes et fluides)
- Couvrir les points principaux: comportement, français, mathématiques, autonomie, besoins, aménagements
- Permettre à l'enseignant de valider ou corriger rapidement
- Durée de lecture: environ 1-2 minutes

Format: Paragraphe naturel destiné à la synthèse vocale, avec des transitions claires entre les sections.`;

      const provider = this._getProvider();
      const result = await provider.chatCompletion([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ], {
        temperature: 0.5,
        maxTokens: 1000
      });

      return result.content;

    } catch (error) {
      throw new Error(`Summary generation failed: ${error.message}`);
    }
  }
}

module.exports = new GPTService();
