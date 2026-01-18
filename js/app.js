// Gestion de l'application GEVA-Sco

// Fonction pour ajouter une ligne de parcours
function addParcours() {
    const container = document.getElementById('parcoursContainer');
    const newRow = document.createElement('div');
    newRow.className = 'parcours-row';
    newRow.innerHTML = `
        <div class="form-group">
            <label>Années</label>
            <input type="text" class="parcours-annee" placeholder="2024-2025">
        </div>
        <div class="form-group flex-3">
            <label>Scolarisation</label>
            <input type="text" class="parcours-scolarisation" placeholder="Classe et établissement">
        </div>
        <button type="button" onclick="removeParcours(this)" class="btn-remove">✕</button>
    `;
    container.appendChild(newRow);
}

// Fonction pour supprimer une ligne de parcours
function removeParcours(button) {
    button.parentElement.remove();
}

// Fonction pour réinitialiser le formulaire
function resetForm() {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser le formulaire ? Toutes les données seront effacées.')) {
        document.querySelectorAll('input, textarea').forEach(field => {
            if (field.type === 'radio') {
                field.checked = false;
            } else {
                field.value = '';
            }
        });
        localStorage.removeItem('gevascoData');
        alert('Formulaire réinitialisé.');
    }
}

// Fonction pour sauvegarder les données
function saveData() {
    const data = collectFormData();
    localStorage.setItem('gevascoData', JSON.stringify(data));
    localStorage.setItem('gevascoSaveDate', new Date().toLocaleString('fr-FR'));

    alert('Données sauvegardées avec succès !');
}

// Fonction pour charger les données sauvegardées
function loadData() {
    const savedData = localStorage.getItem('gevascoData');
    if (savedData) {
        const data = JSON.parse(savedData);
        populateForm(data);

        const saveDate = localStorage.getItem('gevascoSaveDate');
        if (saveDate) {
            console.log('Données chargées depuis la sauvegarde du ' + saveDate);
        }
    }
}

// Fonction pour collecter toutes les données du formulaire
function collectFormData() {
    return {
        // Année scolaire
        annee1: document.getElementById('annee1')?.value || '',
        annee2: document.getElementById('annee2')?.value || '',
        dateReunion: document.getElementById('dateReunion')?.value || '',

        // Identification élève
        nomEleve: document.getElementById('nomEleve')?.value || '',
        dateNaissance: document.getElementById('dateNaissance')?.value || '',
        adresseEleve: document.getElementById('adresseEleve')?.value || '',
        villeEleve: document.getElementById('villeEleve')?.value || '',
        codePostalEleve: document.getElementById('codePostalEleve')?.value || '',
        telEleve: document.getElementById('telEleve')?.value || '',
        emailEleve: document.getElementById('emailEleve')?.value || '',

        // Parents
        civiliteP1: document.querySelector('input[name="civiliteP1"]:checked')?.value || '',
        nomP1: document.getElementById('nomP1')?.value || '',
        adresseP1: document.getElementById('adresseP1')?.value || '',
        cpP1: document.getElementById('cpP1')?.value || '',
        villeP1: document.getElementById('villeP1')?.value || '',
        telP1: document.getElementById('telP1')?.value || '',
        emailP1: document.getElementById('emailP1')?.value || '',

        civiliteP2: document.querySelector('input[name="civiliteP2"]:checked')?.value || '',
        nomP2: document.getElementById('nomP2')?.value || '',
        adresseP2: document.getElementById('adresseP2')?.value || '',
        cpP2: document.getElementById('cpP2')?.value || '',
        villeP2: document.getElementById('villeP2')?.value || '',
        telP2: document.getElementById('telP2')?.value || '',
        emailP2: document.getElementById('emailP2')?.value || '',

        civiliteP3: document.querySelector('input[name="civiliteP3"]:checked')?.value || '',
        nomP3: document.getElementById('nomP3')?.value || '',
        adresseP3: document.getElementById('adresseP3')?.value || '',
        cpP3: document.getElementById('cpP3')?.value || '',
        villeP3: document.getElementById('villeP3')?.value || '',
        telP3: document.getElementById('telP3')?.value || '',
        emailP3: document.getElementById('emailP3')?.value || '',

        // Enseignant référent
        enseignantReferent: document.getElementById('enseignantReferent')?.value || '',
        telEnseignant: document.getElementById('telEnseignant')?.value || '',
        emailEnseignant: document.getElementById('emailEnseignant')?.value || '',

        // Établissement
        etablissement: document.getElementById('etablissement')?.value || '',
        classe: document.getElementById('classe')?.value || '',
        adresseEtablissement: document.getElementById('adresseEtablissement')?.value || '',
        villeEtablissement: document.getElementById('villeEtablissement')?.value || '',
        codePostalEtablissement: document.getElementById('codePostalEtablissement')?.value || '',

        // Parcours
        parcours: collectParcours(),

        // Observations
        comportement: document.getElementById('comportement')?.value || '',
        francais: document.getElementById('francais')?.value || '',
        mathematiques: document.getElementById('mathematiques')?.value || '',
        autonomie: document.getElementById('autonomie')?.value || '',
        besoins: document.getElementById('besoins')?.value || '',
        amenagements: document.getElementById('amenagements')?.value || '',

        // Synthèse
        synthese: document.getElementById('synthese')?.value || '',
        propositions: document.getElementById('propositions')?.value || ''
    };
}

// Fonction pour collecter les lignes de parcours
function collectParcours() {
    const parcours = [];
    const rows = document.querySelectorAll('#parcoursContainer .parcours-row');
    rows.forEach(row => {
        const annee = row.querySelector('.parcours-annee')?.value || '';
        const scolarisation = row.querySelector('.parcours-scolarisation')?.value || '';
        if (annee || scolarisation) {
            parcours.push({ annee, scolarisation });
        }
    });
    return parcours;
}

// Fonction pour pré-remplir le formulaire avec les données sauvegardées
function populateForm(data) {
    // Année scolaire
    if (data.annee1) document.getElementById('annee1').value = data.annee1;
    if (data.annee2) document.getElementById('annee2').value = data.annee2;
    if (data.dateReunion) document.getElementById('dateReunion').value = data.dateReunion;

    // Identification
    if (data.nomEleve) document.getElementById('nomEleve').value = data.nomEleve;
    if (data.dateNaissance) document.getElementById('dateNaissance').value = data.dateNaissance;
    if (data.adresseEleve) document.getElementById('adresseEleve').value = data.adresseEleve;
    if (data.villeEleve) document.getElementById('villeEleve').value = data.villeEleve;
    if (data.codePostalEleve) document.getElementById('codePostalEleve').value = data.codePostalEleve;
    if (data.telEleve) document.getElementById('telEleve').value = data.telEleve;
    if (data.emailEleve) document.getElementById('emailEleve').value = data.emailEleve;

    // Parents (similaire pour P1, P2, P3)
    if (data.nomP1) document.getElementById('nomP1').value = data.nomP1;
    if (data.telP1) document.getElementById('telP1').value = data.telP1;
    if (data.emailP1) document.getElementById('emailP1').value = data.emailP1;

    if (data.nomP2) document.getElementById('nomP2').value = data.nomP2;
    if (data.telP2) document.getElementById('telP2').value = data.telP2;
    if (data.emailP2) document.getElementById('emailP2').value = data.emailP2;

    // Observations
    if (data.comportement) document.getElementById('comportement').value = data.comportement;
    if (data.francais) document.getElementById('francais').value = data.francais;
    if (data.mathematiques) document.getElementById('mathematiques').value = data.mathematiques;
    if (data.autonomie) document.getElementById('autonomie').value = data.autonomie;
    if (data.besoins) document.getElementById('besoins').value = data.besoins;
    if (data.amenagements) document.getElementById('amenagements').value = data.amenagements;
    if (data.synthese) document.getElementById('synthese').value = data.synthese;
    if (data.propositions) document.getElementById('propositions').value = data.propositions;
}

// Fonction pour générer le PDF
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const data = collectFormData();

    // Configuration
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const lineHeight = 7;
    let y = margin;

    // Fonction helper pour ajouter du texte avec gestion de page
    function addText(text, fontSize = 10, isBold = false) {
        if (y > 270) {
            doc.addPage();
            y = margin;
        }
        doc.setFontSize(fontSize);
        doc.setFont(undefined, isBold ? 'bold' : 'normal');
        doc.text(text, margin, y);
        y += lineHeight;
    }

    // Fonction pour ajouter un paragraphe avec retour à la ligne
    function addParagraph(text, fontSize = 10) {
        if (y > 270) {
            doc.addPage();
            y = margin;
        }
        doc.setFontSize(fontSize);
        doc.setFont(undefined, 'normal');
        const lines = doc.splitTextToSize(text, pageWidth - 2 * margin);
        lines.forEach(line => {
            if (y > 270) {
                doc.addPage();
                y = margin;
            }
            doc.text(line, margin, y);
            y += lineHeight;
        });
    }

    // Titre
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(139, 195, 74); // Couleur verte
    doc.text('GEVA-Sco - Scolarisation', pageWidth / 2, y, { align: 'center' });
    y += 10;

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text('Support de recueil d\'informations', pageWidth / 2, y, { align: 'center' });
    y += 15;

    // Année scolaire
    addText(`Année scolaire 20${data.annee1} / 20${data.annee2}`, 10, true);
    addText(`Date de réunion: ${data.dateReunion ? new Date(data.dateReunion).toLocaleDateString('fr-FR') : ''}`, 10);
    y += 5;

    // IDENTIFICATION
    addText('IDENTIFICATION', 14, true);
    y += 2;
    addText(`Nom et prénom de l'élève: ${data.nomEleve}`, 10);
    addText(`Date de naissance: ${data.dateNaissance ? new Date(data.dateNaissance).toLocaleDateString('fr-FR') : ''}`, 10);
    addText(`Adresse: ${data.adresseEleve}`, 10);
    addText(`${data.codePostalEleve} ${data.villeEleve}`, 10);
    if (data.telEleve) addText(`Tél: ${data.telEleve}`, 10);
    if (data.emailEleve) addText(`Email: ${data.emailEleve}`, 10);
    y += 5;

    // PARENTS
    addText('COORDONNÉES DES REPRÉSENTANTS LÉGAUX', 14, true);
    y += 2;

    if (data.nomP1) {
        addText(`Parent 1: ${data.civiliteP1} ${data.nomP1}`, 10, true);
        if (data.telP1) addText(`Tél: ${data.telP1}`, 10);
        if (data.emailP1) addText(`Email: ${data.emailP1}`, 10);
        y += 3;
    }

    if (data.nomP2) {
        addText(`Parent 2: ${data.civiliteP2} ${data.nomP2}`, 10, true);
        if (data.telP2) addText(`Tél: ${data.telP2}`, 10);
        if (data.emailP2) addText(`Email: ${data.emailP2}`, 10);
        y += 3;
    }

    // POINTS SAILLANTS
    addText('POINTS SAILLANTS LIÉS À LA SCOLARISATION', 14, true);
    y += 2;

    if (data.enseignantReferent) {
        addText('Enseignant référent:', 10, true);
        addParagraph(data.enseignantReferent, 10);
        if (data.telEnseignant) addText(`Tél: ${data.telEnseignant}`, 10);
        if (data.emailEnseignant) addText(`Email: ${data.emailEnseignant}`, 10);
        y += 3;
    }

    if (data.etablissement) {
        addText(`Établissement: ${data.etablissement} - Classe: ${data.classe}`, 10, true);
        addText(`${data.adresseEtablissement}`, 10);
        addText(`${data.codePostalEtablissement} ${data.villeEtablissement}`, 10);
        y += 3;
    }

    // PARCOURS
    if (data.parcours && data.parcours.length > 0) {
        addText('Parcours de scolarisation:', 12, true);
        data.parcours.forEach(p => {
            addText(`${p.annee}: ${p.scolarisation}`, 10);
        });
        y += 5;
    }

    // OBSERVATIONS
    addText('OBSERVATIONS PÉDAGOGIQUES ET ÉDUCATIVES', 14, true);
    y += 2;

    if (data.comportement) {
        addText('Comportement et vie en classe:', 11, true);
        addParagraph(data.comportement, 10);
        y += 3;
    }

    if (data.francais) {
        addText('Apprentissages - Français:', 11, true);
        addParagraph(data.francais, 10);
        y += 3;
    }

    if (data.mathematiques) {
        addText('Apprentissages - Mathématiques:', 11, true);
        addParagraph(data.mathematiques, 10);
        y += 3;
    }

    if (data.autonomie) {
        addText('Autonomie et compétences sociales:', 11, true);
        addParagraph(data.autonomie, 10);
        y += 3;
    }

    if (data.besoins) {
        addText('Besoins identifiés:', 11, true);
        addParagraph(data.besoins, 10);
        y += 3;
    }

    if (data.amenagements) {
        addText('Aménagements et adaptations:', 11, true);
        addParagraph(data.amenagements, 10);
        y += 3;
    }

    // SYNTHÈSE
    if (data.synthese) {
        if (y > 200) {
            doc.addPage();
            y = margin;
        }
        addText('SYNTHÈSE GÉNÉRALE', 14, true);
        y += 2;
        addParagraph(data.synthese, 10);
        y += 5;
    }

    if (data.propositions) {
        if (y > 200) {
            doc.addPage();
            y = margin;
        }
        addText('PROPOSITIONS POUR LE PARCOURS', 14, true);
        y += 2;
        addParagraph(data.propositions, 10);
    }

    // Sauvegarder le PDF
    const filename = `GEVA-Sco_${data.nomEleve.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);

    alert('PDF généré avec succès !');
}

// Sauvegarder automatiquement toutes les 30 secondes
setInterval(() => {
    const data = collectFormData();
    localStorage.setItem('gevascoAutoSave', JSON.stringify(data));
}, 30000);

// Charger les données au démarrage
document.addEventListener('DOMContentLoaded', () => {
    loadData();
});
