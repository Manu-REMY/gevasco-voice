// Bibliothèque de phrases types pour les élèves de CP
const phrasesCP = {
    comportement: {
        positif: [
            "L'élève fait preuve d'une bonne adaptation au cadre scolaire.",
            "L'élève est volontaire et participe activement aux activités de classe.",
            "L'élève montre de l'intérêt pour les apprentissages proposés.",
            "L'élève respecte les règles de vie de la classe.",
            "L'élève s'intègre bien dans le groupe classe."
        ],
        attention: [
            "L'élève présente des difficultés de concentration lors des activités.",
            "L'élève a besoin d'être régulièrement recentré sur la tâche.",
            "L'élève se fatigue rapidement lors des activités demandant de la concentration.",
            "L'élève a tendance à se disperser facilement."
        ],
        relationnel: [
            "L'élève communique facilement avec ses pairs.",
            "L'élève a besoin d'être accompagné dans les relations avec ses camarades.",
            "L'élève préfère les activités en petit groupe.",
            "L'élève montre parfois des difficultés à gérer ses émotions."
        ]
    },

    francais: {
        lecture: [
            "L'élève reconnaît la plupart des lettres de l'alphabet.",
            "L'élève commence à décoder des syllabes simples.",
            "L'élève parvient à lire des mots simples.",
            "L'élève décode avec aisance les mots réguliers.",
            "L'élève présente des difficultés de décodage qui nécessitent un accompagnement renforcé.",
            "L'élève confond certains sons proches (b/d, p/q, m/n).",
            "L'élève progresse dans la fusion syllabique.",
            "L'élève a besoin de temps supplémentaire pour le décodage."
        ],
        ecriture: [
            "L'élève forme correctement les lettres en écriture cursive.",
            "L'élève présente des difficultés dans le geste graphique.",
            "L'élève a besoin d'un guidage pour respecter le lignage.",
            "L'élève écrit lentement mais avec application.",
            "L'élève nécessite un support adapté (lignage renforcé, guide-doigts).",
            "L'élève confond le sens de certaines lettres."
        ],
        comprehension: [
            "L'élève comprend les consignes simples orales.",
            "L'élève a besoin d'une reformulation des consignes.",
            "L'élève participe aux échanges oraux de la classe.",
            "L'élève s'exprime clairement à l'oral.",
            "L'élève présente des difficultés de compréhension qui nécessitent un étayage important."
        ]
    },

    mathematiques: {
        numeration: [
            "L'élève récite la comptine numérique jusqu'à 30.",
            "L'élève dénombre une collection jusqu'à 20.",
            "L'élève reconnaît l'écriture chiffrée des nombres jusqu'à 10.",
            "L'élève présente des difficultés dans la construction du nombre.",
            "L'élève a besoin de manipuler du matériel concret pour dénombrer.",
            "L'élève progresse dans la connaissance de la file numérique."
        ],
        calcul: [
            "L'élève effectue des additions simples avec support matériel.",
            "L'élève commence à calculer mentalement sur de petites quantités.",
            "L'élève a besoin de matériel de manipulation pour effectuer des calculs.",
            "L'élève progresse dans la mémorisation des décompositions du nombre 10.",
            "L'élève présente des difficultés dans la résolution de problèmes simples."
        ],
        geometrie: [
            "L'élève reconnaît les formes géométriques de base.",
            "L'élève se repère dans l'espace de la feuille.",
            "L'élève a besoin d'un accompagnement pour les activités de repérage spatial."
        ]
    },

    autonomie: [
        "L'élève gère son matériel de manière autonome.",
        "L'élève a besoin d'aide pour organiser son travail.",
        "L'élève sollicite l'adulte de manière adaptée.",
        "L'élève peut travailler seul sur une courte durée.",
        "L'élève nécessite une attention individualisée régulière.",
        "L'élève progresse dans l'acquisition de l'autonomie.",
        "L'élève a besoin d'un cadre rassurant et sécurisant."
    ],

    besoins: [
        "Un enseignement explicite et structuré.",
        "Des consignes courtes et reformulées.",
        "Du temps supplémentaire pour réaliser les activités.",
        "Un accompagnement individualisé renforcé.",
        "Un support visuel pour faciliter la compréhension.",
        "Une réduction du nombre de tâches ou d'exercices.",
        "Un environnement de travail adapté (place en classe, matériel spécifique).",
        "Des pauses régulières pour maintenir l'attention.",
        "Un renforcement de l'estime de soi et de la confiance.",
        "Un travail en petit groupe pour faciliter les apprentissages."
    ],

    amenagements: [
        "Mise en place d'un tutorat avec un pair.",
        "Utilisation d'outils d'aide à l'écriture (réglette, lignage adapté).",
        "Recours à des supports visuels (affichages, référentiels).",
        "Aménagement de la place dans la classe (proximité du tableau, isolement visuel).",
        "Adaptation des supports écrits (police adaptée, espacement des lignes).",
        "Temps majoré pour les évaluations.",
        "Fragmentation des tâches complexes.",
        "Reformulation orale systématique des consignes écrites.",
        "Valorisation régulière des réussites.",
        "Mise en place d'un plan de travail individualisé.",
        "Intervention d'un AESH (Accompagnant d'Élèves en Situation de Handicap).",
        "Collaboration avec le RASED (Réseau d'Aides Spécialisées aux Élèves en Difficulté).",
        "Suivi orthophonique en dehors du temps scolaire.",
        "Aménagement du temps scolaire si nécessaire."
    ],

    propositions: [
        "Poursuite de la scolarisation en CP avec aménagements pédagogiques.",
        "Mise en place d'un PAP (Plan d'Accompagnement Personnalisé).",
        "Demande de notification MDPH pour mise en place d'un PPS (Projet Personnalisé de Scolarisation).",
        "Attribution d'un AESH pour accompagner l'élève.",
        "Intervention du RASED pour un soutien spécialisé.",
        "Orientation vers des professionnels de santé (orthophoniste, psychomotricien, ergothérapeute).",
        "Bilan complémentaire à réaliser (orthophonique, psychologique, psychomoteur).",
        "Temps de scolarisation aménagé.",
        "Matériel pédagogique adapté (ordinateur, logiciels spécifiques)."
    ]
};

// Fonction pour charger les suggestions dans l'interface
function loadSuggestions() {
    const container = document.getElementById('suggestionsCP');
    if (!container) return;

    // Comportement
    container.innerHTML += '<div class="category-header">Comportement</div>';
    addSuggestionButtons(container, phrasesCP.comportement.positif, 'comportement');
    addSuggestionButtons(container, phrasesCP.comportement.attention, 'comportement');
    addSuggestionButtons(container, phrasesCP.comportement.relationnel, 'comportement');

    // Français
    container.innerHTML += '<div class="category-header">Français</div>';
    addSuggestionButtons(container, phrasesCP.francais.lecture, 'francais');
    addSuggestionButtons(container, phrasesCP.francais.ecriture, 'francais');
    addSuggestionButtons(container, phrasesCP.francais.comprehension, 'francais');

    // Mathématiques
    container.innerHTML += '<div class="category-header">Mathématiques</div>';
    addSuggestionButtons(container, phrasesCP.mathematiques.numeration, 'mathematiques');
    addSuggestionButtons(container, phrasesCP.mathematiques.calcul, 'mathematiques');
    addSuggestionButtons(container, phrasesCP.mathematiques.geometrie, 'mathematiques');

    // Autonomie
    container.innerHTML += '<div class="category-header">Autonomie</div>';
    addSuggestionButtons(container, phrasesCP.autonomie, 'autonomie');

    // Besoins
    container.innerHTML += '<div class="category-header">Besoins</div>';
    addSuggestionButtons(container, phrasesCP.besoins, 'besoins');

    // Aménagements
    container.innerHTML += '<div class="category-header">Aménagements</div>';
    addSuggestionButtons(container, phrasesCP.amenagements, 'amenagements');
}

// Fonction helper pour ajouter des boutons de suggestion
function addSuggestionButtons(container, phrases, targetFieldId) {
    phrases.forEach(phrase => {
        const btn = document.createElement('button');
        btn.className = 'suggestion-btn';
        btn.textContent = phrase.length > 60 ? phrase.substring(0, 60) + '...' : phrase;
        btn.title = phrase; // Tooltip avec le texte complet
        btn.onclick = () => insertSuggestion(targetFieldId, phrase);
        container.appendChild(btn);
    });
}

// Fonction pour insérer une suggestion dans un champ
function insertSuggestion(fieldId, text) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    const currentValue = field.value.trim();

    if (currentValue === '') {
        field.value = text;
    } else {
        // Ajoute un espace ou un retour à la ligne selon le cas
        if (currentValue.endsWith('.') || currentValue.endsWith('!') || currentValue.endsWith('?')) {
            field.value = currentValue + ' ' + text;
        } else {
            field.value = currentValue + '. ' + text;
        }
    }

    // Feedback visuel
    field.style.backgroundColor = '#e8f5e9';
    setTimeout(() => {
        field.style.backgroundColor = '';
    }, 500);
}

// Export for Node.js backend
if (typeof module !== 'undefined' && module.exports) {
    module.exports = phrasesCP;
}

// Charger les suggestions au chargement de la page (browser only)
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', loadSuggestions);
}
