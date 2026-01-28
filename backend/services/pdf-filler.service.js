const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;

/**
 * Service pour remplir les champs d'un PDF GEVA-Sco existant
 * Utilise pdf-lib pour modifier le PDF original sans le régénérer
 */
class PDFFillerService {

  /**
   * Mapping entre les clés de données de l'application et les noms des champs PDF
   */
  getFieldMapping() {
    return {
      // === PAGE 1 - IDENTIFICATION ===
      // Année scolaire
      'annee1': 'Annee-scolaire_Debut',
      'annee2': 'Anne-scolaire_Fin',

      // Date de réunion
      'dateReunionJour': 'Date-reunion_Jour',
      'dateReunionMois': 'Date-reunion_Mois',
      'dateReunionAnnee': 'Date-reunion_Annee',

      // Élève
      'nomEleve': 'Nom-eleve-bas-de-page',
      'dateNaissanceJour': 'Date-naissance_Jour',
      'dateNaissanceMois': 'Date-naissance_Mois',
      'dateNaissanceAnnee': 'Date-naissance_Annee',
      'adresseEleve': 'Numero-et-rue',
      'villeEleve': 'Ville',
      'codePostalEleve': 'Code-postal',
      'telEleve': 'Tel',
      'emailEleve': 'Courriel',

      // Représentants légaux - Personne 1
      'nomP1Ligne1': 'Personne1_Nom-ligne1',
      'nomP1Ligne2': 'Personne1_Nom-ligne2',
      'adresseP1': 'Personne1_Numero-et-rue',
      'codePostalP1': 'Personne1_Code-postal',
      'villeP1': 'Personne1_Ville',
      'telP1': 'Personne1_Telephone',
      'emailP1': 'Personne1_Courriel',

      // Représentants légaux - Personne 2
      'nomP2Ligne1': 'Personne2_Nom-ligne1',
      'nomP2Ligne2': 'Personne2_Nom-ligne2',
      'adresseP2': 'Personne2_Numero-et-rue',
      'codePostalP2': 'Personne2_Code-postal',
      'villeP2': 'Personne2_Ville',
      'telP2': 'Personne2_Telephone',
      'emailP2': 'Personne2_Courriel',

      // Représentants légaux - Personne 3
      'nomP3Ligne1': 'Personne3_Nom-ligne1',
      'nomP3Ligne2': 'Personne3_Nom-ligne2',
      'adresseP3': 'Personne3_Numero-et-rue',
      'codePostalP3': 'Personne3_Code-postal',
      'villeP3': 'Personne3_Ville',
      'telP3': 'Personne3_Telephone',
      'emailP3': 'Personne3_Courriel 1',

      // Enseignant référent
      'enseignantNom': 'Coordonnees-enseignant_Nom',
      'enseignantTel': 'Coordonnees-enseignant_Telephone',
      'enseignantEmail': 'Coordonnees-enseignant_Courriel',

      // Établissement
      'etablissement': 'Etablissement-scolaire',
      'classe': 'Classe-frequentee',
      'adresseEtablissement': 'Etablissement-scolaire_Numero-et-rue',
      'villeEtablissement': 'Etablissement-scolaire_Ville',
      'codePostalEtablissement': 'Etablissement-scolaire_Code-postal',

      // Parcours de scolarisation
      'parcoursAnnee1': 'Parcours-de-scolarisation_Annee1',
      'parcoursScol1': 'Parcours-de-scolarisation_Scolarisation1',
      'parcoursAnnee2': 'Parcours-de-scolarisation_Annee2',
      'parcoursScol2': 'Parcours-de-scolarisation_Scolarisation2',
      'parcoursAnnee3': 'Parcours-de-scolarisation_Annee3',
      'parcoursScol3': 'Parcours-de-scolarisation_Scolarisation3',
      'parcoursAnnee4': 'Parcours-de-scolarisation_Annee4',
      'parcoursScol4': 'Parcours-de-scolarisation_Scolarisation4',
      'parcoursAnnee5': 'Parcours-de-scolarisation_Annee5',
      'parcoursScol5': 'Parcours-de-scolarisation_Scolarisation5',
      'parcoursAnnee6': 'Parcours-de-scolarisation_Annee6',
      'parcoursScol6': 'Parcours-de-scolarisation_Scolarisation6',

      // === PAGE 2 - CONDITIONS DE SCOLARISATION ===
      // Plans et projets - Commentaires
      'plansCommentaires': 'Plan-projets-formalises_Commentaires',
      'accompagnementCommentaires': 'Accompagnement-soins_Commentaires',
      'conditionsCommentaires': 'Conditions-materielles_Commentaires',
      'niveauEnseignement': 'Niveau-d-enseignement-des-apprentissages',

      // === PAGE 3 - EMPLOI DU TEMPS ===
      'lundiMatin': 'Lundi-matin',
      'lundiMidi': 'Lundi-midi',
      'lundiApresMidi': 'Lundi-apres-midi',
      'mardiMatin': 'Mardi-matin',
      'mardiMidi': 'Mardi-midi',
      'mardiApresMidi': 'Mardi-apres-midi',
      'mercrediMatin': 'Mercredi-matin',
      'mercrediMidi': 'Mercredi-midi',
      'mercrediApresMidi': 'Mercredi-apres-midi',
      'jeudiMatin': 'Jeudi-matin',
      'jeudiMidi': 'Jeudi-midi',
      'jeudiApresMidi': 'Jeudi-apres-midi',
      'vendrediMatin': 'Vendredi-matin',
      'vendrediMidi': 'Vendredi-midi',
      'vendrediApresMidi': 'Vendredi-apres-midi',
      'samediMatin': 'Samedi-matin',

      // === PAGE 4 - OBSERVATION DES ACTIVITÉS ===
      // Tâches et exigences générales
      'tachesGeneralesCadre1': 'Taches-et-exigences-generales-relation-avec-autrui_Cadre1',
      'tachesGeneralesCadre2': 'Taches-et-exigences-generales-relation-avec-autrui_Cadre2',

      // Mobilité
      'mobiliteCadre1': 'Mobilite-manipulation_Cadre1',
      'mobiliteCadre2': 'Mobilite-manipulation_Cadre2',

      // Entretien personnel
      'entretienCadre1': 'Entretien-personnel_Cadre1',
      'entretienCadre2': 'Entretien-personnel_Cadre2',

      // Communication
      'communicationCadre1': 'Communication_Cadre1',
      'communicationCadre2': 'Communication_Cadre2',

      // Tâches scolaires
      'tachesScolairesCadre1': 'Taches-et-exigences-relation-scolarite_Cadre1',
      'tachesScolairesCadre2': 'Taches-et-exigences-relation-scolarite_Cadre2',

      // === PAGE 5 - ÉVOLUTIONS ET PERSPECTIVES ===
      'evolutionsPerspectives': 'Evolutions-observees-et-perspectives-projet-professionnel',

      // === PAGE 6 - REMARQUES ET PARTICIPANTS ===
      'remarquesParents': 'Remarques-eleve-parents-sur-projet-vie-projet-professionnel',
      'remarquesProfessionnels': 'Remarques-professionnels',

      // Participants (jusqu'à 15)
      'participantNom1': 'Participants_Nom-prenom',
      'participantFonction1': 'Participants_Fonction',
      'participantNom2': 'Participants_Nom-prenom1',
      'participantFonction2': 'Participants_Fonction2',
      'participantNom3': 'Participants_Nom-prenom2',
      'participantFonction3': 'Participants_Fonction3',
      'participantNom4': 'Participants_Nom-prenom3',
      'participantFonction4': 'Participants_Fonction4',
      'participantNom5': 'Participants_Nom-prenom4',
      'participantFonction5': 'Participants_Fonction5',
      'participantNom6': 'Participants_Nom-prenom5',
      'participantFonction6': 'Participants_Fonction6',
      'participantNom7': 'Participants_Nom-prenom6',
      'participantFonction7': 'Participants_Fonction7',
      'participantNom8': 'Participants_Nom-prenom7',
      'participantFonction8': 'Participants_Fonction8',
      'participantNom9': 'Participants_Nom-prenom8',
      'participantFonction9': 'Participants_Fonction9',
      'participantNom10': 'Participants_Nom-prenom9',
      'participantFonction10': 'Participants_Fonction10'
    };
  }

  /**
   * Mapping des cases à cocher
   */
  getCheckboxMapping() {
    return {
      // Représentants légaux
      'personne1': 'Personne1',
      'personne2': 'Personne2',
      'personne3': 'Personne3',

      // Plans et projets formalisés
      'planPAI': 'PAI',
      'planPPRE': 'PPRE',
      'planPAP': 'PAP',
      'planMesuresEducatives': 'Mesures-educatives',
      'planAutres': 'Autres-plan-ou-projet-formalises',

      // Accompagnement et soins
      'accRASED': 'RASED',
      'accSAPAD': 'SAPAD',
      'accCNED': 'CNED',
      'accSoinsHospitaliers': 'Soins-hospitaliers',
      'accCAMPS': 'CAMPS',
      'accCMP': 'CMP',
      'accCMPP': 'CMPP',
      'accEMS': 'EMS',
      'accSESSAD': 'SESSAD',
      'accSoinsLiberal': 'Soins-en-liberal',
      'accAutres': 'Autres-accompagnements-et-soins',

      // Conditions matérielles
      'matAmenagements': 'Amenagements-adaptations-pedagogiques',
      'matOutilsCommunication': 'Outils-communication',
      'matInformatique': 'Materiel-informatique-audiovisuel',
      'matDeficienceAuditive': 'Materiel-deficience-auditive',
      'matDeficienceVisuelle': 'Materiel-deficience-visuelle',
      'matMobilier': 'Mobilier-et-petits-materiels',
      'matTransport': 'Transport',
      'matAutres': 'Autres-coditions-materielles',

      // Évaluation scolarité
      'evalScolarite': 'Scolarite',

      // Observation des activités - Tâches générales
      'obsOrientationTemps': 'Orientation-dans-le-temps',
      'obsOrientationEspace': 'Orientation-dans-l-espace',
      'obsFixerAttention': 'Fixer-son-attention',
      'obsMemoriser': 'Memoriser',
      'obsGererSecurite': 'Gerer-sa-securite',
      'obsRespecterRegles': 'Respecter-les-regles-de-vie',
      'obsRelationsAutrui': 'Relations-avec-autrui',
      'obsMaitriserComportement': 'Maitriser-son-comportement',

      // Mobilité
      'obsFaireTransferts': 'Faire-ses-transferts',
      'obsAccessibiliteBati': 'Accessibilite-du-bati',
      'obsSeDeplacer': 'Se-deplacer',
      'obsTransportsCommuns': 'Utiliser-les-transports-communs',
      'obsMotricite': 'Activites-de-motricite',

      // Entretien personnel
      'obsElimination': 'Assurer-l-elimination',
      'obsHabiller': 'S-habiller-se-deshabiller',
      'obsRepas': 'Prendre-ses-repas',
      'obsSoinsSante': 'Prendre-soin-de-sa-sante',

      // Communication
      'obsParler': 'Parler',
      'obsComprendreParole': 'Comprendre-la-parole',
      'obsComprendrePhraseSimple': 'Comprendre-une-phrase-simple',
      'obsMessagesNonVerbaux': 'Produire-recevoir-des-messages-non-verbaux',

      // Tâches scolaires
      'obsLire': 'Lire',
      'obsEcrire': 'Ecrire',
      'obsCalculer': 'Calculer',
      'obsOrganiserTravail': 'Organiser-son-travail',
      'obsAccepterConsignes': 'Accepter-des-consignes',
      'obsSuivreConsignes': 'Suivre-des-consignes',
      'obsInstallerClasse': 'S-installer-dans-la-classe',
      'obsUtiliserSupports': 'Utiliser-des-supports-pedagogiques',
      'obsUtiliserMaterielAdapte': 'Utiliser-du-materiel-adapte-a-son-handicap',
      'obsPrendreNotes': 'Prendre-des-notes',
      'obsControlerTravail': 'Controler-son-travail',
      'obsParticiperSorties': 'Participer-a-des-sorties-scolaires'
    };
  }

  /**
   * Remplit un PDF GEVA-Sco avec les données fournies
   * @param {Buffer} pdfBuffer - Le PDF original
   * @param {Object} data - Les données à insérer
   * @returns {Buffer} - Le PDF rempli
   */
  async fillPDF(pdfBuffer, data) {
    try {
      // Charger le PDF
      const pdfDoc = await PDFDocument.load(pdfBuffer, {
        ignoreEncryption: true
      });

      const form = pdfDoc.getForm();
      const textMapping = this.getFieldMapping();
      const checkboxMapping = this.getCheckboxMapping();

      // Remplir les champs texte
      for (const [dataKey, pdfFieldName] of Object.entries(textMapping)) {
        if (data[dataKey] !== undefined && data[dataKey] !== null && data[dataKey] !== '') {
          try {
            const field = form.getTextField(pdfFieldName);
            field.setText(String(data[dataKey]));
          } catch (err) {
            console.warn(`Champ texte non trouvé: ${pdfFieldName}`);
          }
        }
      }

      // Remplir les cases à cocher
      for (const [dataKey, pdfFieldName] of Object.entries(checkboxMapping)) {
        if (data[dataKey] === true || data[dataKey] === 'true' || data[dataKey] === 1) {
          try {
            const field = form.getCheckBox(pdfFieldName);
            field.check();
          } catch (err) {
            console.warn(`Case à cocher non trouvée: ${pdfFieldName}`);
          }
        }
      }

      // Aplatir le formulaire pour figer les valeurs (optionnel)
      // form.flatten();

      // Sauvegarder le PDF modifié
      const pdfBytes = await pdfDoc.save();
      return Buffer.from(pdfBytes);

    } catch (error) {
      console.error('Erreur lors du remplissage du PDF:', error);
      throw new Error(`Échec du remplissage PDF: ${error.message}`);
    }
  }

  /**
   * Transforme les données de l'entretien vocal vers le format attendu par fillPDF
   * @param {Object} extractedData - Données extraites du PDF initial
   * @param {Object} interviewData - Réponses de l'entretien vocal
   * @returns {Object} - Données formatées pour le remplissage
   */
  transformInterviewData(extractedData, interviewData) {
    const transformed = { ...extractedData };

    // Transformer les dates
    if (extractedData.dateNaissance) {
      const [year, month, day] = extractedData.dateNaissance.split('-');
      transformed.dateNaissanceJour = day;
      transformed.dateNaissanceMois = month;
      transformed.dateNaissanceAnnee = year;
    }

    if (extractedData.dateReunion) {
      const [year, month, day] = extractedData.dateReunion.split('-');
      transformed.dateReunionJour = day;
      transformed.dateReunionMois = month;
      transformed.dateReunionAnnee = year;
    }

    // Mapper les réponses de l'entretien vocal vers les champs PDF
    // Question 1: Vue d'ensemble → Évolutions et perspectives
    if (interviewData.question1) {
      transformed.evolutionsPerspectives = interviewData.question1;
    }

    // Question 2: Comportement → Tâches générales Cadre 1
    if (interviewData.question2) {
      transformed.tachesGeneralesCadre1 = interviewData.question2;
    }

    // Question 3: Lecture → Tâches scolaires Cadre 1
    if (interviewData.question3) {
      transformed.tachesScolairesCadre1 = interviewData.question3;
    }

    // Question 4: Écriture → Tâches scolaires Cadre 1 (ajout)
    if (interviewData.question4) {
      transformed.tachesScolairesCadre1 =
        (transformed.tachesScolairesCadre1 || '') + '\n\n' + interviewData.question4;
    }

    // Question 5: Communication → Communication Cadre 1
    if (interviewData.question5) {
      transformed.communicationCadre1 = interviewData.question5;
    }

    // Question 6: Mathématiques → Tâches scolaires Cadre 1 (ajout)
    if (interviewData.question6) {
      transformed.tachesScolairesCadre1 =
        (transformed.tachesScolairesCadre1 || '') + '\n\n' + interviewData.question6;
    }

    // Question 7: Autonomie → Entretien personnel Cadre 1
    if (interviewData.question7) {
      transformed.entretienCadre1 = interviewData.question7;
    }

    // Question 8: Besoins identifiés → Tâches générales Cadre 2
    if (interviewData.question8) {
      transformed.tachesGeneralesCadre2 = interviewData.question8;
    }

    // Question 9: Aménagements → Conditions matérielles commentaires
    if (interviewData.question9) {
      transformed.conditionsCommentaires = interviewData.question9;
    }

    // Question 10: Évolutions → Évolutions et perspectives (ajout)
    if (interviewData.question10) {
      transformed.evolutionsPerspectives =
        (transformed.evolutionsPerspectives || '') + '\n\n' + interviewData.question10;
    }

    // Résumé final → Remarques professionnels
    if (interviewData.summary) {
      transformed.remarquesProfessionnels = interviewData.summary;
    }

    return transformed;
  }

  /**
   * Liste tous les champs disponibles dans un PDF
   * @param {Buffer} pdfBuffer - Le PDF à analyser
   * @returns {Object} - Liste des champs texte et cases à cocher
   */
  async listFields(pdfBuffer) {
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const form = pdfDoc.getForm();
    const fields = form.getFields();

    const textFields = [];
    const checkboxes = [];

    fields.forEach((field) => {
      const type = field.constructor.name;
      const name = field.getName();

      if (type === 'PDFTextField') {
        textFields.push(name);
      } else if (type === 'PDFCheckBox') {
        checkboxes.push(name);
      }
    });

    return { textFields, checkboxes, total: fields.length };
  }
}

module.exports = new PDFFillerService();
