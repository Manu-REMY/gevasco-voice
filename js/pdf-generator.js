// Générateur PDF conforme au modèle officiel GEVA-Sco

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const data = collectAllFormData();

    // Configuration
    const margin = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let y = margin;

    // Couleurs
    const greenColor = [139, 195, 74];
    const orangeColor = [255, 152, 0];
    const grayColor = [100, 100, 100];

    // ===================== PAGE 1 =====================
    drawPage1(doc, data, margin, pageWidth);

    // ===================== PAGE 2 =====================
    doc.addPage();
    drawPage2(doc, data, margin, pageWidth);

    // ===================== PAGE 3 =====================
    doc.addPage();
    drawPage3(doc, data, margin, pageWidth);

    // ===================== PAGES 4-5 =====================
    doc.addPage();
    drawPage4(doc, data, margin, pageWidth);

    doc.addPage();
    drawPage5(doc, data, margin, pageWidth);

    // ===================== PAGE 6 =====================
    doc.addPage();
    drawPage6(doc, data, margin, pageWidth);

    // Sauvegarder
    const filename = `GEVA-Sco_${data.nomEleve.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);

    alert('PDF généré avec succès ! Le document contient 6 pages conformes au modèle officiel.');
}

// ===================== PAGE 1 =====================
function drawPage1(doc, data, margin, pageWidth) {
    let y = margin;

    // En-tête avec logo GEVA-Sco
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...[139, 195, 74]);
    doc.text('GEVA-', margin, y);
    doc.setTextColor(...[255, 152, 0]);
    doc.text('Sco', margin + 25, y);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...[139, 195, 74]);
    doc.text('Scolarisation', margin, y + 8);

    // Badge PREMIÈRE DEMANDE
    doc.setFillColor(158, 158, 158);
    doc.rect(pageWidth - 70, margin - 5, 55, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('PREMIÈRE DEMANDE', pageWidth - 67, margin + 2);

    y += 15;

    // Titre principal
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text('Éléments relatifs à un parcours de scolarisation et/ou', margin, y);
    doc.text('de formation : support de recueil d\'informations', margin, y + 5);

    y += 12;

    // Ligne année scolaire et date
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.text(`Pour l'année scolaire 20${data.annee1 || '.....'} / 20${data.annee2 || '.....'}`, margin, y);
    doc.text(`Date de réunion de l'équipe éducative ${formatDate(data.dateReunion)}`, pageWidth - 80, y);

    y += 8;

    // IDENTIFICATION
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...[139, 195, 74]);
    doc.text('Identification', margin, y);
    y += 6;

    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text(`Nom et prénom de l'élève : ${data.nomEleve || ''}`, margin, y);
    doc.text(`Date de naissance : ${formatDate(data.dateNaissance)}`, pageWidth - 60, y);
    y += 5;
    doc.text(`N° et rue : ${data.adresseEleve || ''}`, margin, y);
    y += 5;
    doc.text(`Ville : ${data.villeEleve || ''}`, margin, y);
    doc.text(`Code postal : ${data.codePostalEleve || ''}`, pageWidth - 60, y);
    y += 5;
    if (data.telEleve) {
        doc.text(`Tél. : ${data.telEleve}`, margin, y);
    }
    if (data.emailEleve) {
        doc.text(`Courriel : ${data.emailEleve}`, margin + 60, y);
    }

    y += 8;

    // COORDONNÉES DES REPRÉSENTANTS LÉGAUX
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Coordonnées des représentants légaux', margin, y);
    y += 5;

    // Tableau parents
    const tableY = y;
    const colWidth = (pageWidth - 2 * margin) / 3;

    // Bordures du tableau
    doc.rect(margin, tableY, colWidth, 40);
    doc.rect(margin + colWidth, tableY, colWidth, 40);
    doc.rect(margin + 2 * colWidth, tableY, colWidth, 40);

    // Colonnes
    doc.setFontSize(8);
    doc.setFont(undefined, 'bold');
    doc.text('Parents', margin + 2, tableY + 4);
    doc.text('Autre responsable légal', margin + 2 * colWidth + 2, tableY + 4);

    doc.setFont(undefined, 'normal');
    y = tableY + 8;

    // Parent 1
    doc.text(`${data.civiliteP1 || ''} ${data.nomP1 || ''}`, margin + 2, y);
    if (data.telP1) doc.text(`Tél. : ${data.telP1}`, margin + 2, y + 12);
    if (data.emailP1) doc.text(`${data.emailP1}`, margin + 2, y + 16);

    // Parent 2
    doc.text(`${data.civiliteP2 || ''} ${data.nomP2 || ''}`, margin + colWidth + 2, y);
    if (data.telP2) doc.text(`Tél. : ${data.telP2}`, margin + colWidth + 2, y + 12);
    if (data.emailP2) doc.text(`${data.emailP2}`, margin + colWidth + 2, y + 16);

    // Parent 3
    if (data.nomP3) {
        doc.text(`${data.civiliteP3 || ''} ${data.nomP3}`, margin + 2 * colWidth + 2, y);
        if (data.telP3) doc.text(`Tél. : ${data.telP3}`, margin + 2 * colWidth + 2, y + 12);
    }

    y = tableY + 45;

    // POINTS SAILLANTS
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...[255, 152, 0]);
    doc.text('Points saillants liés à la scolarisation', margin, y);
    y += 6;

    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text('Nom et coordonnées de l\'enseignant référent du secteur :', margin, y);
    y += 4;
    const ensLines = doc.splitTextToSize(data.enseignantReferent || '', pageWidth - 2 * margin);
    doc.text(ensLines, margin, y);
    y += ensLines.length * 4;

    doc.text(`Tél : ${data.telEnseignant || ''}`, margin, y);
    doc.text(`Courriel : ${data.emailEnseignant || ''}`, margin + 60, y);
    y += 5;

    doc.text(`Établissement scolaire fréquenté : ${data.etablissement || ''}`, margin, y);
    doc.text(`Classe fréquentée : ${data.classe || ''}`, pageWidth - 60, y);
    y += 5;
    doc.text(`N° et rue : ${data.adresseEtablissement || ''}`, margin, y);
    y += 5;
    doc.text(`Ville : ${data.villeEtablissement || ''}`, margin, y);
    doc.text(`Code postal : ${data.codePostalEtablissement || ''}`, pageWidth - 60, y);

    y += 8;

    // PARCOURS DE SCOLARISATION
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Parcours de scolarisation', margin, y);
    y += 5;

    // Tableau parcours
    doc.setFontSize(8);
    const parcoursTableY = y;
    const col1Width = 30;
    const col2Width = pageWidth - 2 * margin - col1Width;

    // En-têtes
    doc.rect(margin, parcoursTableY, col1Width, 6, 'FD');
    doc.setFillColor(240, 240, 240);
    doc.rect(margin + col1Width, parcoursTableY, col2Width, 6, 'FD');
    doc.setTextColor(0, 0, 0);
    doc.text('Années', margin + 2, parcoursTableY + 4);
    doc.text('Scolarisation', margin + col1Width + 2, parcoursTableY + 4);

    // Lignes de données
    y = parcoursTableY + 6;
    for (let i = 1; i <= 4; i++) {
        const annee = data[`parcours${i}_annee`] || '';
        const scol = data[`parcours${i}_scol`] || '';

        doc.rect(margin, y, col1Width, 6);
        doc.rect(margin + col1Width, y, col2Width, 6);
        doc.text(annee, margin + 2, y + 4);
        doc.text(scol, margin + col1Width + 2, y + 4);
        y += 6;
    }

    // Pied de page
    addFooter(doc, 1, data.nomEleve);
}

// ===================== PAGE 2 =====================
function drawPage2(doc, data, margin, pageWidth) {
    let y = margin;

    // En-tête de page
    addPageHeader(doc, 2, data.nomEleve, margin, pageWidth);
    y = 25;

    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Conditions actuelles de scolarisation', margin, y);
    y += 7;

    // Plans formalisés
    doc.setFontSize(9);
    doc.text('Plan ou projets formalisés', margin, y);
    doc.text('Commentaires (durée de mise en œuvre, effets...)', margin + 70, y);
    y += 5;

    doc.setFont(undefined, 'normal');
    doc.setFontSize(8);

    const plans = [];
    if (data.plan_pai) plans.push('PAI');
    if (data.plan_ppre) plans.push('PPRE');
    if (data.plan_pap) plans.push('PAP');
    if (data.plan_mesures) plans.push('Mesures éducatives');
    if (data.plan_autres) plans.push('Autres');

    doc.text(plans.join(', '), margin + 2, y);
    const commentLines = doc.splitTextToSize(data.plan_commentaires || '', 110);
    doc.text(commentLines, margin + 70, y);
    y += Math.max(5, commentLines.length * 4) + 3;

    // Accompagnement et soins
    doc.setFont(undefined, 'bold');
    doc.setFontSize(9);
    doc.text('Accompagnement et soins', margin, y);
    doc.text('Commentaires, précisions', margin + 70, y);
    y += 5;

    doc.setFont(undefined, 'normal');
    doc.setFontSize(8);

    const acc = [];
    if (data.acc_rased) acc.push('RASED');
    if (data.acc_liberal) acc.push('Soins en libéral');
    if (data.acc_sessad) acc.push('SESSAD');

    doc.text(acc.join(', '), margin + 2, y);
    const accLines = doc.splitTextToSize(data.acc_commentaires || '', 110);
    doc.text(accLines, margin + 70, y);
    y += Math.max(5, accLines.length * 4) + 5;

    // Conditions matérielles
    doc.setFont(undefined, 'bold');
    doc.setFontSize(9);
    doc.text('Conditions matérielles', margin, y);
    doc.text('Commentaires, précisions', margin + 70, y);
    y += 5;

    doc.setFont(undefined, 'normal');
    doc.setFontSize(8);
    const mat = [];
    if (data.mat_amenagements) mat.push('Aménagements pédagogiques');
    doc.text(mat.join(', '), margin + 2, y);
    y += 10;

    // Évaluation de la scolarité
    doc.setFont(undefined, 'bold');
    doc.setFontSize(10);
    doc.text('Évaluation de la scolarité (à renseigner obligatoirement)', margin, y);
    y += 6;

    doc.setFont(undefined, 'normal');
    doc.setFontSize(9);
    doc.text(`Niveau d'enseignement dans les apprentissages : ${data.eval_niveau || ''}`, margin, y);
    y += 8;

    // Cases à cocher évaluation
    doc.setFontSize(8);
    const evalOptions = [
        { key: 'sans_am_ok', text: 'scolarité sans aménagements ayant permis des acquisitions comparables' },
        { key: 'sans_am_ko', text: 'scolarité sans aménagements n\'ayant pas permis d\'accéder aux acquisitions attendues' },
        { key: 'avec_am_ok', text: 'scolarité avec aménagements ayant permis les acquisitions attendues' },
        { key: 'avec_am_ko', text: 'scolarité avec aménagements n\'ayant pas permis d\'accéder aux acquisitions attendues' }
    ];

    evalOptions.forEach(opt => {
        drawCheckbox(doc, margin, y - 2, data.eval_type === opt.key);
        doc.text(opt.text, margin + 6, y);
        y += 5;
    });

    y += 5;

    // Observations détaillées
    doc.setFontSize(9);
    const obsLines = doc.splitTextToSize(data.eval_observations || '', pageWidth - 2 * margin);
    doc.rect(margin, y, pageWidth - 2 * margin, Math.min(60, obsLines.length * 4 + 4));
    doc.text(obsLines, margin + 2, y + 4);

    addFooter(doc, 2, data.nomEleve);
}

// ===================== PAGE 3 =====================
function drawPage3(doc, data, margin, pageWidth) {
    let y = margin;

    addPageHeader(doc, 3, data.nomEleve, margin, pageWidth);
    y = 25;

    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Emploi du temps actuel de l\'élève', margin, y);
    y += 4;
    doc.setFontSize(8);
    doc.setFont(undefined, 'normal');
    doc.text('(temps de scolarisation, activités périscolaires, accompagnement et soins, lieux...)', margin, y);
    y += 8;

    // Tableau emploi du temps
    const tableStartY = y;
    const col1 = 25;
    const col2 = 55;
    const col3 = 25;
    const col4 = 75;
    const rowHeight = 25;

    // En-têtes
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.rect(margin, y, col1, 8, 'FD');
    doc.rect(margin + col1, y, col2, 8, 'FD');
    doc.text('MATIN', margin + col1 + 15, y + 5);
    doc.rect(margin + col1 + col2, y, col3, 8, 'FD');
    doc.text('MIDI', margin + col1 + col2 + 5, y + 5);
    doc.rect(margin + col1 + col2 + col3, y, col4, 8, 'FD');
    doc.text('APRÈS-MIDI', margin + col1 + col2 + col3 + 15, y + 5);

    y += 8;

    // Jours
    const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    doc.setFont(undefined, 'normal');
    doc.setFontSize(8);

    jours.forEach(jour => {
        const jourKey = jour.toLowerCase();

        doc.rect(margin, y, col1, rowHeight);
        doc.setFont(undefined, 'bold');
        doc.text(jour, margin + 2, y + 5);
        doc.setFont(undefined, 'normal');

        doc.rect(margin + col1, y, col2, rowHeight);
        const matinText = data[`edt_${jourKey}_matin`] || '';
        const matinLines = doc.splitTextToSize(matinText, col2 - 4);
        doc.text(matinLines, margin + col1 + 2, y + 4);

        doc.rect(margin + col1 + col2, y, col3, rowHeight);
        const midiText = data[`edt_${jourKey}_midi`] || '';
        const midiLines = doc.splitTextToSize(midiText, col3 - 4);
        doc.text(midiLines, margin + col1 + col2 + 2, y + 4);

        doc.rect(margin + col1 + col2 + col3, y, col4, rowHeight);
        const apremText = data[`edt_${jourKey}_aprem`] || '';
        const apremLines = doc.splitTextToSize(apremText, col4 - 4);
        doc.text(apremLines, margin + col1 + col2 + col3 + 2, y + 4);

        y += rowHeight;
    });

    addFooter(doc, 3, data.nomEleve);
}

// ===================== PAGE 4 =====================
function drawPage4(doc, data, margin, pageWidth) {
    let y = margin;

    addPageHeader(doc, 4, data.nomEleve, margin, pageWidth);
    y = 25;

    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...[0, 153, 204]);
    doc.text('Observation des activités de l\'élève', margin, y);
    y += 8;

    doc.setFontSize(8);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text('A : activité réalisée sans difficulté et seul.', margin, y);
    y += 4;
    doc.text('B : activité réalisée avec des difficultés ponctuelles et/ou une aide ponctuelle.', margin, y);
    y += 4;
    doc.text('C : activité réalisée avec des difficultés régulières et/ou une aide régulière.', margin, y);
    y += 4;
    doc.text('D : activité non réalisée.', margin, y);
    y += 10;

    doc.setFont(undefined, 'bold');
    doc.setFontSize(9);
    doc.text('Cadre 1 : OBSTACLES À LA RÉALISATION DE L\'ACTIVITÉ', margin, y);
    y += 5;

    doc.setFont(undefined, 'normal');
    doc.setFontSize(8);
    const cadre1Lines = doc.splitTextToSize(data.obs_cadre1 || '', pageWidth - 2 * margin);
    doc.rect(margin, y, pageWidth - 2 * margin, Math.min(50, cadre1Lines.length * 4 + 4));
    doc.text(cadre1Lines, margin + 2, y + 4);
    y += Math.min(50, cadre1Lines.length * 4 + 4) + 8;

    doc.setFont(undefined, 'bold');
    doc.setFontSize(9);
    doc.text('Cadre 2 : POINTS D\'APPUI ET COMMENTAIRES', margin, y);
    y += 5;

    doc.setFont(undefined, 'normal');
    doc.setFontSize(8);
    const cadre2Lines = doc.splitTextToSize(data.obs_cadre2 || '', pageWidth - 2 * margin);
    doc.rect(margin, y, pageWidth - 2 * margin, Math.min(50, cadre2Lines.length * 4 + 4));
    doc.text(cadre2Lines, margin + 2, y + 4);

    addFooter(doc, 4, data.nomEleve);
}

// ===================== PAGE 5 =====================
function drawPage5(doc, data, margin, pageWidth) {
    let y = margin;

    addPageHeader(doc, 5, data.nomEleve, margin, pageWidth);
    y = 25;

    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Évolutions observées et perspectives', margin, y);
    y += 7;

    doc.setFont(undefined, 'normal');
    doc.setFontSize(9);
    const evolLines = doc.splitTextToSize(data.obs_evolutions || '', pageWidth - 2 * margin);
    doc.rect(margin, y, pageWidth - 2 * margin, Math.min(100, evolLines.length * 4 + 4));
    doc.text(evolLines, margin + 2, y + 4);

    addFooter(doc, 5, data.nomEleve);
}

// ===================== PAGE 6 =====================
function drawPage6(doc, data, margin, pageWidth) {
    let y = margin;

    addPageHeader(doc, 6, data.nomEleve, margin, pageWidth);
    y = 25;

    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Remarques de l\'élève et/ou de ses parents', margin, y);
    y += 5;

    doc.setFont(undefined, 'normal');
    doc.setFontSize(8);
    const remParentsLines = doc.splitTextToSize(data.remarques_parents || '', pageWidth - 2 * margin);
    doc.rect(margin, y, pageWidth - 2 * margin, 30);
    doc.text(remParentsLines, margin + 2, y + 4);
    y += 35;

    doc.setFont(undefined, 'bold');
    doc.setFontSize(10);
    doc.text('Remarques des professionnels', margin, y);
    y += 5;

    doc.setFont(undefined, 'normal');
    doc.setFontSize(8);
    const remProLines = doc.splitTextToSize(data.remarques_pro || '', pageWidth - 2 * margin);
    doc.rect(margin, y, pageWidth - 2 * margin, 30);
    doc.text(remProLines, margin + 2, y + 4);
    y += 35;

    // Tableau participants
    doc.setFont(undefined, 'bold');
    doc.setFontSize(10);
    doc.text('Participants à la réunion', margin, y);
    y += 6;

    const col1Width = (pageWidth - 2 * margin) / 2;
    const col2Width = (pageWidth - 2 * margin) / 2;

    // En-têtes
    doc.setFontSize(9);
    doc.rect(margin, y, col1Width, 6, 'FD');
    doc.rect(margin + col1Width, y, col2Width, 6, 'FD');
    doc.text('Nom-Prénom', margin + 2, y + 4);
    doc.text('Fonction', margin + col1Width + 2, y + 4);
    y += 6;

    // Lignes
    doc.setFont(undefined, 'normal');
    doc.setFontSize(8);
    for (let i = 1; i <= 10; i++) {
        doc.rect(margin, y, col1Width, 6);
        doc.rect(margin + col1Width, y, col2Width, 6);

        const nom = data[`part${i}_nom`] || '';
        const fonction = data[`part${i}_fonction`] || '';
        doc.text(nom, margin + 2, y + 4);
        doc.text(fonction, margin + col1Width + 2, y + 4);

        y += 6;
    }

    addFooter(doc, 6, data.nomEleve);
}

// ===================== FONCTIONS UTILITAIRES =====================

function addPageHeader(doc, pageNum, nomEleve, margin, pageWidth) {
    doc.setFontSize(8);
    doc.setFont(undefined, 'bold');
    doc.text('PREMIÈRE DEMANDE', margin, 10);
    doc.text(`NOM DE L'ÉLÈVE : ${nomEleve || ''}`, margin + 50, 10);
    doc.text(`${pageNum}/6`, pageWidth - margin - 10, 10);

    // Ligne de séparation
    doc.setLineWidth(0.5);
    doc.line(margin, 12, pageWidth - margin, 12);
}

function addFooter(doc, pageNum, nomEleve) {
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(7);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(100, 100, 100);

    // Logo GEVA-Sco
    doc.setFontSize(10);
    doc.setTextColor(...[139, 195, 74]);
    doc.text('GEVA-', margin, pageHeight - 10);
    doc.setTextColor(...[255, 152, 0]);
    doc.text('Sco', margin + 10, pageHeight - 10);

    // Texte pied de page
    doc.setFontSize(8);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'bold');
    doc.text('PREMIÈRE DEMANDE', pageWidth / 2 - 20, pageHeight - 10);
    doc.text(`NOM DE L'ÉLÈVE : ${nomEleve || ''}`, pageWidth / 2 + 10, pageHeight - 10);
    doc.text(`${pageNum}/6`, pageWidth - margin - 10, pageHeight - 10);
}

function drawCheckbox(doc, x, y, checked) {
    doc.rect(x, y, 3, 3);
    if (checked) {
        doc.setFont(undefined, 'bold');
        doc.text('✓', x + 0.5, y + 2.5);
        doc.setFont(undefined, 'normal');
    }
}

function formatDate(dateStr) {
    if (!dateStr) return '_____ / _____ / _________';
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day} / ${month} / ${year}`;
}

function collectAllFormData() {
    const data = {};

    // Collecter tous les champs du formulaire
    document.querySelectorAll('input, textarea, select').forEach(field => {
        if (field.type === 'radio') {
            if (field.checked) {
                data[field.name] = field.value;
            }
        } else if (field.type === 'checkbox') {
            data[field.id] = field.checked;
        } else {
            data[field.id] = field.value || '';
        }
    });

    return data;
}
