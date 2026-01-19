const pdfParse = require('pdf-parse');

class PDFParserService {
  async extractData(pdfBuffer) {
    try {
      const data = await pdfParse(pdfBuffer);
      const text = data.text;

      // Extract fields using regex patterns
      const extracted = this.parseGevaScoFields(text);

      return {
        success: true,
        data: extracted,
        rawText: text,
        pageCount: data.numpages
      };
    } catch (error) {
      throw new Error(`PDF parsing failed: ${error.message}`);
    }
  }

  parseGevaScoFields(text) {
    const extracted = {};

    // Patterns d'extraction pour GEVA-Sco
    const patterns = {
      // Page 1 - Identification
      nomEleve: /Nom et prénom de l'élève\s*:?\s*([A-ZÀ-ÿ\s'-]+(?:\s+[A-ZÀ-ÿ\s'-]+)?)/i,
      dateNaissance: /Date de naissance\s*:?\s*(\d{1,2}\s*\/?\s*\d{1,2}\s*\/?\s*\d{2,4})/i,
      adresseEleve: /N°\s*et\s*rue\s*:?\s*([^\n]+)/i,
      villeEleve: /Ville\s*:?\s*([A-ZÀ-ÿ][A-ZÀ-ÿ\s'-]+?)(?=\s+Code postal|$)/i,
      codePostalEleve: /Code postal\s*:?\s*(\d{5})/i,
      telEleve: /Tél\.?\s*:?\s*([\d\s.]+)/i,
      emailEleve: /Courriel\s*:?\s*([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i,

      // Parents
      nomP1: /(?:Mme|M\.?)\s*\/?\s*(?:Mme|M\.?)?\s*:?\s*([A-ZÀ-ÿ][A-ZÀ-ÿ\s'-]+(?:\s+[A-ZÀ-ÿ][A-ZÀ-ÿ\s'-]+)?)/i,
      telP1: /(?:Parent|Mme|M\.).*?Tél\.?\s*:?\s*([\d\s.]{10,})/i,
      emailP1: /(?:Parent|Mme|M\.).*?Courriel\s*:?\s*([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i,

      // Enseignant référent
      enseignantReferent: /enseignant référent(?:\s+du secteur)?\s*:?\s*([^\n]+)/i,
      telEnseignant: /enseignant.*?Tél\.?\s*:?\s*([\d\s.]{10,})/is,
      emailEnseignant: /enseignant.*?Courriel\s*:?\s*([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/is,

      // Établissement
      etablissement: /Établissement scolaire fréquenté\s*:?\s*([^\n]+?)(?=\s+Classe|$)/i,
      classe: /Classe fréquentée\s*:?\s*([A-Z0-9]+)/i,
      adresseEtablissement: /Établissement.*?N°\s*et\s*rue\s*:?\s*([^\n]+)/is,
      villeEtablissement: /Établissement.*?Ville\s*:?\s*([A-ZÀ-ÿ][A-ZÀ-ÿ\s'-]+?)(?=\s+Code postal|$)/is,
      codePostalEtablissement: /Établissement.*?Code postal\s*:?\s*(\d{5})/is,

      // Année scolaire
      annee1: /année scolaire\s+20(\d{2})/i,
      annee2: /année scolaire\s+20\d{2}\s*\/\s*20(\d{2})/i,
      dateReunion: /Date de réunion.*?(\d{1,2}\s*\/?\s*\d{1,2}\s*\/?\s*20\d{2})/i
    };

    // Extract each field
    for (const [key, pattern] of Object.entries(patterns)) {
      const match = text.match(pattern);
      if (match && match[1]) {
        extracted[key] = match[1].trim();
      }
    }

    // Clean up and format specific fields
    if (extracted.dateNaissance) {
      extracted.dateNaissance = this.formatDate(extracted.dateNaissance);
    }
    if (extracted.dateReunion) {
      extracted.dateReunion = this.formatDate(extracted.dateReunion);
    }
    if (extracted.telEleve) {
      extracted.telEleve = this.formatPhone(extracted.telEleve);
    }
    if (extracted.telP1) {
      extracted.telP1 = this.formatPhone(extracted.telP1);
    }
    if (extracted.telEnseignant) {
      extracted.telEnseignant = this.formatPhone(extracted.telEnseignant);
    }

    // Extract parcours (table data)
    extracted.parcours = this.extractParcours(text);

    return extracted;
  }

  extractParcours(text) {
    const parcours = [];

    // Pattern pour le tableau parcours
    const parcoursPattern = /(\d{4}-\d{4})\s+([^\n]+)/g;
    let match;

    while ((match = parcoursPattern.exec(text)) !== null) {
      parcours.push({
        annee: match[1],
        scolarisation: match[2].trim()
      });
    }

    return parcours;
  }

  formatDate(dateStr) {
    // Convert various date formats to YYYY-MM-DD
    const cleaned = dateStr.replace(/\s+/g, '');

    // Try DD/MM/YYYY or DD/MM/YY
    const match = cleaned.match(/(\d{1,2})\/(\d{1,2})\/(\d{2,4})/);
    if (match) {
      let [, day, month, year] = match;
      day = day.padStart(2, '0');
      month = month.padStart(2, '0');

      // Convert 2-digit year to 4-digit
      if (year.length === 2) {
        year = parseInt(year) < 50 ? `20${year}` : `19${year}`;
      }

      return `${year}-${month}-${day}`;
    }

    return dateStr;
  }

  formatPhone(phoneStr) {
    // Clean and format phone number
    const cleaned = phoneStr.replace(/[^\d]/g, '');

    if (cleaned.length === 10) {
      // Format as XX XX XX XX XX
      return cleaned.match(/.{1,2}/g).join(' ');
    }

    return phoneStr.trim();
  }
}

module.exports = new PDFParserService();
