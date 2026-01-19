const OpenAI = require('openai');
const path = require('path');

// Load phrases library
const phrasesCP = require(path.join(__dirname, '../../js/phrases-cp.js'));

class GPTService {
  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }
    this.client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async enrichResponse(transcript, questionContext, existingData) {
    try {
      const systemPrompt = `Tu es un assistant spécialisé dans les évaluations GEVA-Sco pour élèves de CP en France.

Ton rôle:
- Analyser les réponses orales des enseignants
- Extraire les informations clés
- Structurer les observations de manière professionnelle
- Respecter le vocabulaire et les formulations de l'Éducation Nationale française
- Proposer des phrases tirées de la bibliothèque fournie quand pertinent

Formule tes réponses de manière concise, factuelle et professionnelle.
Utilise le présent de l'indicatif.
Reste factuel et évite les jugements de valeur.`;

      const phrasesCategory = phrasesCP[questionContext.category] || {};

      const userPrompt = `CONTEXTE DE LA QUESTION:
Question ID: ${questionContext.id}
Catégorie: ${questionContext.category}
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

      const response = await this.client.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.3
      });

      const result = JSON.parse(response.choices[0].message.content);
      return result;

    } catch (error) {
      throw new Error(`GPT-4 enrichment failed: ${error.message}`);
    }
  }

  async generateSummary(formData) {
    try {
      const systemPrompt = `Tu es un assistant qui génère des résumés vocaux clairs et concis pour valider les informations d'un GEVA-Sco avant génération du PDF final.`;

      const userPrompt = `Génère un résumé vocal structuré des observations pédagogiques suivantes:

${JSON.stringify(formData, null, 2)}

Le résumé doit:
- Être lisible à l'oral (phrases courtes et fluides)
- Couvrir les points principaux: comportement, français, mathématiques, autonomie, besoins, aménagements
- Permettre à l'enseignant de valider ou corriger rapidement
- Durée de lecture: environ 1-2 minutes

Format: Paragraphe naturel destiné à la synthèse vocale, avec des transitions claires entre les sections.`;

      const response = await this.client.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.5,
        max_tokens: 1000
      });

      return response.choices[0].message.content;

    } catch (error) {
      throw new Error(`Summary generation failed: ${error.message}`);
    }
  }
}

module.exports = new GPTService();
