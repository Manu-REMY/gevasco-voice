/**
 * Configuration des questions par niveau scolaire
 * Chaque niveau a ses propres questions adaptées aux compétences attendues
 */

const questionsConfig = {
    // ==================== ÉLÉMENTAIRE ====================

    CP: [
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
            text: "Comment se passe la compréhension orale? L'élève comprend-il les consignes simples? Arrive-t-il à s'exprimer clairement? Participe-t-il aux échanges collectifs?",
            category: 'francais',
            targetFields: ['francais'],
            duration: 120
        },
        {
            id: 'mathematiques',
            text: "Parlons des mathématiques. Où en est l'élève dans la connaissance des nombres jusqu'à 100, le dénombrement, le calcul? A-t-il besoin de matériel de manipulation? Y a-t-il des notions qui sont acquises, d'autres en cours d'acquisition?",
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
    ],

    CE1: [
        {
            id: 'vue_ensemble',
            text: "Parlez-moi de cet élève de CE1 de manière générale. Comment se passe son année? Comment s'est passée la transition depuis le CP?",
            category: 'comportement',
            targetFields: ['eval_observations', 'comportement'],
            duration: 180
        },
        {
            id: 'comportement_detail',
            text: "Décrivez-moi le comportement de l'élève en classe. Comment gère-t-il les situations de groupe? Comment sont ses relations avec les autres? Y a-t-il des difficultés particulières?",
            category: 'comportement',
            targetFields: ['comportement', 'obs_cadre1', 'obs_cadre2'],
            duration: 150
        },
        {
            id: 'lecture',
            text: "Où en est l'élève en lecture? Quelle est sa fluence approximative? Comprend-il ce qu'il lit? Arrive-t-il à lire des textes courts de manière autonome?",
            category: 'francais',
            targetFields: ['francais'],
            duration: 150
        },
        {
            id: 'ecriture',
            text: "Comment se passe l'écriture et la production d'écrits? L'élève peut-il copier un texte? Peut-il écrire des phrases simples de manière autonome? Comment est la qualité graphique?",
            category: 'francais',
            targetFields: ['francais'],
            duration: 120
        },
        {
            id: 'etude_langue',
            text: "Concernant l'étude de la langue, où en est l'élève? Reconnaît-il les différentes classes de mots? Commence-t-il à comprendre les accords simples?",
            category: 'francais',
            targetFields: ['francais'],
            duration: 120
        },
        {
            id: 'mathematiques',
            text: "En mathématiques, où en est l'élève? Maîtrise-t-il le calcul mental sur les petits nombres? Les additions et soustractions posées? La résolution de problèmes simples?",
            category: 'mathematiques',
            targetFields: ['mathematiques'],
            duration: 150
        },
        {
            id: 'autonomie',
            text: "Comment l'élève gère-t-il son travail en autonomie? Peut-il suivre un plan de travail? A-t-il besoin d'être guidé pour chaque activité?",
            category: 'autonomie',
            targetFields: ['autonomie'],
            duration: 120
        },
        {
            id: 'besoins',
            text: "Quels sont selon vous les principaux besoins de cet élève pour progresser cette année?",
            category: 'besoins',
            targetFields: ['besoins'],
            duration: 120
        },
        {
            id: 'amenagements',
            text: "Quels aménagements avez-vous mis en place? Quels accompagnements seraient nécessaires selon vous?",
            category: 'amenagements',
            targetFields: ['amenagements', 'propositions'],
            duration: 180
        },
        {
            id: 'evolutions',
            text: "Quels progrès avez-vous observés? Comment envisagez-vous la suite de sa scolarité?",
            category: 'propositions',
            targetFields: ['obs_evolutions', 'propositions'],
            duration: 180
        }
    ],

    CE2: [
        {
            id: 'vue_ensemble',
            text: "Parlez-moi de cet élève de CE2. Comment se passe son année? Comment s'adapte-t-il aux exigences du cycle 2?",
            category: 'comportement',
            targetFields: ['eval_observations', 'comportement'],
            duration: 180
        },
        {
            id: 'comportement_detail',
            text: "Décrivez-moi le comportement de l'élève. Comment gère-t-il son attention sur des temps de travail plus longs? Comment interagit-il avec ses pairs?",
            category: 'comportement',
            targetFields: ['comportement', 'obs_cadre1', 'obs_cadre2'],
            duration: 150
        },
        {
            id: 'lecture',
            text: "Où en est l'élève en lecture? Lit-il de manière fluide? Comprend-il les textes adaptés à son niveau? Peut-il répondre à des questions de compréhension?",
            category: 'francais',
            targetFields: ['francais'],
            duration: 150
        },
        {
            id: 'ecriture',
            text: "Comment se passe la production d'écrits? L'élève peut-il rédiger de petits textes? Comment gère-t-il l'orthographe dans ses productions?",
            category: 'francais',
            targetFields: ['francais'],
            duration: 120
        },
        {
            id: 'etude_langue',
            text: "En grammaire et conjugaison, quelles sont les acquisitions de l'élève? Maîtrise-t-il les accords de base? Le présent des verbes courants?",
            category: 'francais',
            targetFields: ['francais'],
            duration: 120
        },
        {
            id: 'mathematiques',
            text: "En mathématiques, où en est l'élève? Maîtrise-t-il les tables de multiplication? Les techniques opératoires? La résolution de problèmes à plusieurs étapes?",
            category: 'mathematiques',
            targetFields: ['mathematiques'],
            duration: 150
        },
        {
            id: 'autonomie',
            text: "Comment l'élève gère-t-il son organisation et son autonomie? Peut-il mener un travail à terme seul? Comment gère-t-il son matériel et ses cahiers?",
            category: 'autonomie',
            targetFields: ['autonomie'],
            duration: 120
        },
        {
            id: 'besoins',
            text: "Quels sont les besoins prioritaires de cet élève pour consolider ses apprentissages et préparer le cycle 3?",
            category: 'besoins',
            targetFields: ['besoins'],
            duration: 120
        },
        {
            id: 'amenagements',
            text: "Quels aménagements et accompagnements sont en place ou seraient nécessaires?",
            category: 'amenagements',
            targetFields: ['amenagements', 'propositions'],
            duration: 180
        },
        {
            id: 'evolutions',
            text: "Quels progrès constatez-vous? Comment envisagez-vous son passage en cycle 3?",
            category: 'propositions',
            targetFields: ['obs_evolutions', 'propositions'],
            duration: 180
        }
    ],

    CM1: [
        {
            id: 'vue_ensemble',
            text: "Parlez-moi de cet élève de CM1. Comment s'adapte-t-il aux exigences du cycle 3? Comment se passe son année globalement?",
            category: 'comportement',
            targetFields: ['eval_observations', 'comportement'],
            duration: 180
        },
        {
            id: 'comportement_detail',
            text: "Décrivez le comportement de l'élève en classe. Comment gère-t-il les travaux de groupe et les projets? Ses relations avec les autres?",
            category: 'comportement',
            targetFields: ['comportement', 'obs_cadre1', 'obs_cadre2'],
            duration: 150
        },
        {
            id: 'lecture',
            text: "En lecture, l'élève est-il capable de lire des textes longs? Comment se passe la compréhension fine et l'interprétation? Peut-il faire des inférences?",
            category: 'francais',
            targetFields: ['francais'],
            duration: 150
        },
        {
            id: 'ecriture',
            text: "En rédaction, l'élève peut-il produire des textes structurés? Comment gère-t-il la planification de ses écrits? Et l'orthographe grammaticale?",
            category: 'francais',
            targetFields: ['francais'],
            duration: 120
        },
        {
            id: 'etude_langue',
            text: "En étude de la langue, où en est l'élève? Maîtrise-t-il l'analyse grammaticale? La conjugaison des temps simples et composés?",
            category: 'francais',
            targetFields: ['francais'],
            duration: 120
        },
        {
            id: 'mathematiques',
            text: "En mathématiques, où en est l'élève avec les fractions et les nombres décimaux? La proportionnalité? Les problèmes complexes?",
            category: 'mathematiques',
            targetFields: ['mathematiques'],
            duration: 150
        },
        {
            id: 'autonomie',
            text: "Comment l'élève gère-t-il sa méthodologie de travail? Peut-il organiser son travail sur plusieurs jours? Prendre des notes?",
            category: 'autonomie',
            targetFields: ['autonomie'],
            duration: 120
        },
        {
            id: 'besoins',
            text: "Quels sont les besoins de cet élève pour réussir en CM1 et préparer le CM2?",
            category: 'besoins',
            targetFields: ['besoins'],
            duration: 120
        },
        {
            id: 'amenagements',
            text: "Quels aménagements sont en place? Quels accompagnements seraient bénéfiques?",
            category: 'amenagements',
            targetFields: ['amenagements', 'propositions'],
            duration: 180
        },
        {
            id: 'evolutions',
            text: "Quels progrès observez-vous? Comment voyez-vous son évolution vers le collège?",
            category: 'propositions',
            targetFields: ['obs_evolutions', 'propositions'],
            duration: 180
        }
    ],

    CM2: [
        {
            id: 'vue_ensemble',
            text: "Parlez-moi de cet élève de CM2. Comment se prépare-t-il pour l'entrée au collège? Comment se passe son année?",
            category: 'comportement',
            targetFields: ['eval_observations', 'comportement'],
            duration: 180
        },
        {
            id: 'comportement_detail',
            text: "Décrivez le comportement de l'élève. Comment gère-t-il l'autonomie croissante demandée? Ses relations sociales?",
            category: 'comportement',
            targetFields: ['comportement', 'obs_cadre1', 'obs_cadre2'],
            duration: 150
        },
        {
            id: 'lecture',
            text: "En lecture, l'élève maîtrise-t-il la lecture de textes variés et complexes? Comment se passe la compréhension et l'analyse de textes?",
            category: 'francais',
            targetFields: ['francais'],
            duration: 150
        },
        {
            id: 'ecriture',
            text: "En rédaction, l'élève peut-il produire des textes élaborés et organisés? Comment gère-t-il les différents types d'écrits?",
            category: 'francais',
            targetFields: ['francais'],
            duration: 120
        },
        {
            id: 'etude_langue',
            text: "En étude de la langue, les bases sont-elles solides pour le collège? Maîtrise-t-il l'analyse grammaticale complète? Tous les temps de conjugaison?",
            category: 'francais',
            targetFields: ['francais'],
            duration: 120
        },
        {
            id: 'mathematiques',
            text: "En mathématiques, où en est l'élève avec les décimaux, les fractions, la proportionnalité? La géométrie et les mesures? La résolution de problèmes?",
            category: 'mathematiques',
            targetFields: ['mathematiques'],
            duration: 150
        },
        {
            id: 'autonomie',
            text: "L'élève est-il prêt pour l'autonomie du collège? Gère-t-il son organisation, ses devoirs, son matériel de manière indépendante?",
            category: 'autonomie',
            targetFields: ['autonomie'],
            duration: 120
        },
        {
            id: 'besoins',
            text: "Quels sont les besoins de cet élève pour réussir sa transition vers le collège?",
            category: 'besoins',
            targetFields: ['besoins'],
            duration: 120
        },
        {
            id: 'amenagements',
            text: "Quels aménagements faudrait-il prévoir pour le collège? Quelles informations transmettre à l'équipe du collège?",
            category: 'amenagements',
            targetFields: ['amenagements', 'propositions'],
            duration: 180
        },
        {
            id: 'evolutions',
            text: "Quels progrès avez-vous constatés? Quelles sont vos préconisations pour l'entrée au collège?",
            category: 'propositions',
            targetFields: ['obs_evolutions', 'propositions'],
            duration: 180
        }
    ],

    // ==================== COLLÈGE ====================

    '6EME': [
        {
            id: 'vue_ensemble',
            text: "Parlez-moi de cet élève de 6ème. Comment s'est passée son adaptation au collège? Comment gère-t-il le changement de fonctionnement par rapport à l'école primaire?",
            category: 'comportement',
            targetFields: ['eval_observations', 'comportement'],
            duration: 180
        },
        {
            id: 'comportement_detail',
            text: "Décrivez son comportement en classe et dans l'établissement. Comment gère-t-il les différents professeurs et les déplacements? Ses relations avec les autres élèves?",
            category: 'comportement',
            targetFields: ['comportement', 'obs_cadre1', 'obs_cadre2'],
            duration: 150
        },
        {
            id: 'francais',
            text: "En français, où en est l'élève? Lecture fluide et compréhension de textes variés? Production d'écrits organisés? Maîtrise de la langue?",
            category: 'francais',
            targetFields: ['francais'],
            duration: 150
        },
        {
            id: 'mathematiques',
            text: "En mathématiques, comment se situe l'élève? Calcul, numération, géométrie, résolution de problèmes? Y a-t-il des lacunes importantes du primaire?",
            category: 'mathematiques',
            targetFields: ['mathematiques'],
            duration: 150
        },
        {
            id: 'autres_matieres',
            text: "Dans les autres matières, comment se situe l'élève? Y a-t-il des difficultés particulières dans certaines disciplines?",
            category: 'autres',
            targetFields: ['autres_matieres'],
            duration: 120
        },
        {
            id: 'organisation',
            text: "Comment l'élève gère-t-il son organisation? Utilisation de l'agenda, préparation du cartable, gestion des devoirs, arrivée à l'heure en cours?",
            category: 'autonomie',
            targetFields: ['autonomie'],
            duration: 120
        },
        {
            id: 'besoins',
            text: "Quels sont les principaux besoins de cet élève pour réussir son année de 6ème et poursuivre sereinement au collège?",
            category: 'besoins',
            targetFields: ['besoins'],
            duration: 120
        },
        {
            id: 'amenagements',
            text: "Quels aménagements sont en place? Lesquels seraient nécessaires? PAP, PAI, tiers-temps, AESH?",
            category: 'amenagements',
            targetFields: ['amenagements', 'propositions'],
            duration: 180
        },
        {
            id: 'evolutions',
            text: "Quels progrès avez-vous observés depuis la rentrée? Quelles sont vos préconisations pour la suite?",
            category: 'propositions',
            targetFields: ['obs_evolutions', 'propositions'],
            duration: 180
        }
    ],

    '5EME': [
        {
            id: 'vue_ensemble',
            text: "Parlez-moi de cet élève de 5ème. Comment se passe son année? Comment a-t-il évolué depuis la 6ème?",
            category: 'comportement',
            targetFields: ['eval_observations', 'comportement'],
            duration: 180
        },
        {
            id: 'comportement_detail',
            text: "Décrivez son comportement en classe. Comment gère-t-il les exigences croissantes du cycle 4? Ses relations avec les autres?",
            category: 'comportement',
            targetFields: ['comportement', 'obs_cadre1', 'obs_cadre2'],
            duration: 150
        },
        {
            id: 'francais',
            text: "En français, où en est l'élève? Compréhension et analyse de textes? Production d'écrits argumentés? Maîtrise de la langue écrite et orale?",
            category: 'francais',
            targetFields: ['francais'],
            duration: 150
        },
        {
            id: 'mathematiques',
            text: "En mathématiques, comment progresse l'élève? Calcul littéral, géométrie, gestion de données? Résolution de problèmes?",
            category: 'mathematiques',
            targetFields: ['mathematiques'],
            duration: 150
        },
        {
            id: 'autres_matieres',
            text: "Dans les autres disciplines, comment se situe l'élève? Histoire-géographie, sciences, langues vivantes? Y a-t-il des points forts ou des difficultés?",
            category: 'autres',
            targetFields: ['autres_matieres'],
            duration: 120
        },
        {
            id: 'autonomie',
            text: "Comment l'élève gère-t-il son travail personnel? Devoirs maison, révisions, organisation sur le long terme?",
            category: 'autonomie',
            targetFields: ['autonomie'],
            duration: 120
        },
        {
            id: 'besoins',
            text: "Quels sont les besoins de cet élève pour progresser et préparer la suite du cycle 4?",
            category: 'besoins',
            targetFields: ['besoins'],
            duration: 120
        },
        {
            id: 'amenagements',
            text: "Quels aménagements sont efficaces? Lesquels faudrait-il ajuster ou ajouter?",
            category: 'amenagements',
            targetFields: ['amenagements', 'propositions'],
            duration: 180
        },
        {
            id: 'evolutions',
            text: "Quels progrès constatez-vous? Comment envisagez-vous la suite de sa scolarité?",
            category: 'propositions',
            targetFields: ['obs_evolutions', 'propositions'],
            duration: 180
        }
    ],

    '4EME': [
        {
            id: 'vue_ensemble',
            text: "Parlez-moi de cet élève de 4ème. Comment se passe son année? Comment gère-t-il l'augmentation des exigences?",
            category: 'comportement',
            targetFields: ['eval_observations', 'comportement'],
            duration: 180
        },
        {
            id: 'comportement_detail',
            text: "Décrivez son comportement. Comment gère-t-il cette période de l'adolescence? Son investissement scolaire? Ses relations?",
            category: 'comportement',
            targetFields: ['comportement', 'obs_cadre1', 'obs_cadre2'],
            duration: 150
        },
        {
            id: 'francais',
            text: "En français, où en est l'élève? Analyse de textes, argumentation, expression écrite et orale?",
            category: 'francais',
            targetFields: ['francais'],
            duration: 150
        },
        {
            id: 'mathematiques',
            text: "En mathématiques, comment se situe l'élève? Équations, fonctions, démonstrations en géométrie?",
            category: 'mathematiques',
            targetFields: ['mathematiques'],
            duration: 150
        },
        {
            id: 'autres_matieres',
            text: "Dans les autres matières, comment progresse l'élève? Y a-t-il des difficultés particulières ou des points d'appui?",
            category: 'autres',
            targetFields: ['autres_matieres'],
            duration: 120
        },
        {
            id: 'autonomie',
            text: "L'élève est-il capable de travailler de manière autonome et méthodique? Comment prépare-t-il les évaluations? Le stage de 3ème approche, est-il en capacité de s'y préparer?",
            category: 'autonomie',
            targetFields: ['autonomie'],
            duration: 120
        },
        {
            id: 'besoins',
            text: "Quels sont les besoins de cet élève pour réussir sa 4ème et se préparer à la 3ème?",
            category: 'besoins',
            targetFields: ['besoins'],
            duration: 120
        },
        {
            id: 'amenagements',
            text: "Quels aménagements fonctionnent? Faut-il en prévoir d'autres pour l'année de 3ème et le DNB?",
            category: 'amenagements',
            targetFields: ['amenagements', 'propositions'],
            duration: 180
        },
        {
            id: 'evolutions',
            text: "Quels progrès observez-vous? Quelles sont vos recommandations pour la poursuite de sa scolarité?",
            category: 'propositions',
            targetFields: ['obs_evolutions', 'propositions'],
            duration: 180
        }
    ],

    '3EME': [
        {
            id: 'vue_ensemble',
            text: "Parlez-moi de cet élève de 3ème. Comment se passe cette année importante? Comment appréhende-t-il le DNB et l'orientation?",
            category: 'comportement',
            targetFields: ['eval_observations', 'comportement'],
            duration: 180
        },
        {
            id: 'comportement_detail',
            text: "Décrivez son comportement et son investissement. Comment gère-t-il la pression de cette année charnière? Ses relations avec les autres?",
            category: 'comportement',
            targetFields: ['comportement', 'obs_cadre1', 'obs_cadre2'],
            duration: 150
        },
        {
            id: 'francais',
            text: "En français, où en est l'élève par rapport aux attendus du DNB? Compréhension, rédaction, dictée, oral?",
            category: 'francais',
            targetFields: ['francais'],
            duration: 150
        },
        {
            id: 'mathematiques',
            text: "En mathématiques, où se situe l'élève pour le DNB? Maîtrise des compétences du programme, résolution de problèmes?",
            category: 'mathematiques',
            targetFields: ['mathematiques'],
            duration: 150
        },
        {
            id: 'autres_matieres',
            text: "Dans les autres disciplines, comment l'élève se prépare-t-il au DNB? Ses points forts et points faibles?",
            category: 'autres',
            targetFields: ['autres_matieres'],
            duration: 120
        },
        {
            id: 'orientation',
            text: "Concernant l'orientation, quel est le projet de l'élève? Est-il réaliste? Quels accompagnements sont nécessaires?",
            category: 'orientation',
            targetFields: ['orientation'],
            duration: 150
        },
        {
            id: 'besoins',
            text: "Quels sont les besoins de cet élève pour réussir son DNB et son orientation post-3ème?",
            category: 'besoins',
            targetFields: ['besoins'],
            duration: 120
        },
        {
            id: 'amenagements',
            text: "Quels aménagements sont prévus pour le DNB? Quels accompagnements pour la suite (lycée, CAP, autre)?",
            category: 'amenagements',
            targetFields: ['amenagements', 'propositions'],
            duration: 180
        },
        {
            id: 'evolutions',
            text: "Quels progrès constatez-vous? Quelles préconisations pour son orientation et sa poursuite d'études?",
            category: 'propositions',
            targetFields: ['obs_evolutions', 'propositions'],
            duration: 180
        }
    ],

    // ==================== DISPOSITIFS SPÉCIALISÉS ====================

    ULIS_ECOLE: [
        {
            id: 'vue_ensemble',
            text: "Parlez-moi de cet élève scolarisé en ULIS école. Comment se passe son inclusion dans sa classe de référence? Comment fonctionne l'alternance entre l'ULIS et la classe ordinaire?",
            category: 'comportement',
            targetFields: ['eval_observations', 'comportement'],
            duration: 180
        },
        {
            id: 'comportement_detail',
            text: "Décrivez le comportement de l'élève en ULIS et en classe de référence. Comment gère-t-il les transitions? Ses relations avec les pairs dans les deux contextes?",
            category: 'comportement',
            targetFields: ['comportement', 'obs_cadre1', 'obs_cadre2'],
            duration: 150
        },
        {
            id: 'inclusion',
            text: "Comment se passent les temps d'inclusion? Quelles matières? Avec quelles adaptations? L'élève participe-t-il aux activités avec ses camarades de la classe de référence?",
            category: 'inclusion',
            targetFields: ['inclusion'],
            duration: 150
        },
        {
            id: 'apprentissages_fondamentaux',
            text: "Où en est l'élève dans les apprentissages fondamentaux? Lecture, écriture, numération, calcul? Par rapport à ses objectifs personnalisés?",
            category: 'francais',
            targetFields: ['francais', 'mathematiques'],
            duration: 150
        },
        {
            id: 'communication',
            text: "Comment se passe la communication de l'élève? Expression orale, compréhension des consignes, interactions avec l'adulte et les pairs?",
            category: 'communication',
            targetFields: ['communication'],
            duration: 120
        },
        {
            id: 'autonomie',
            text: "Quel est le niveau d'autonomie de l'élève? Dans les gestes quotidiens, les déplacements, la gestion du matériel, le travail scolaire?",
            category: 'autonomie',
            targetFields: ['autonomie'],
            duration: 120
        },
        {
            id: 'besoins',
            text: "Quels sont les besoins prioritaires de cet élève pour progresser vers plus d'autonomie et d'inclusion?",
            category: 'besoins',
            targetFields: ['besoins'],
            duration: 120
        },
        {
            id: 'amenagements',
            text: "Quels aménagements et accompagnements sont en place? AESH, matériel adapté, temps aménagé? Lesquels fonctionnent bien?",
            category: 'amenagements',
            targetFields: ['amenagements', 'propositions'],
            duration: 180
        },
        {
            id: 'evolutions',
            text: "Quels progrès avez-vous observés cette année? Comment voyez-vous l'évolution de son parcours?",
            category: 'propositions',
            targetFields: ['obs_evolutions', 'propositions'],
            duration: 180
        }
    ],

    ULIS_COLLEGE: [
        {
            id: 'vue_ensemble',
            text: "Parlez-moi de cet élève scolarisé en ULIS collège. Comment fonctionne son organisation entre l'ULIS et ses classes d'inclusion?",
            category: 'comportement',
            targetFields: ['eval_observations', 'comportement'],
            duration: 180
        },
        {
            id: 'comportement_detail',
            text: "Décrivez le comportement de l'élève dans les différents contextes du collège. Comment gère-t-il les déplacements, les changements de salles et de professeurs?",
            category: 'comportement',
            targetFields: ['comportement', 'obs_cadre1', 'obs_cadre2'],
            duration: 150
        },
        {
            id: 'inclusion',
            text: "Comment se passent les temps d'inclusion? Dans quelles matières? L'élève participe-t-il activement? Comment interagit-il avec les autres élèves?",
            category: 'inclusion',
            targetFields: ['inclusion'],
            duration: 150
        },
        {
            id: 'competences_scolaires',
            text: "Où en est l'élève dans ses compétences scolaires? Par rapport à ses objectifs du PPS? Quelles sont ses réussites et ses difficultés persistantes?",
            category: 'francais',
            targetFields: ['francais', 'mathematiques'],
            duration: 150
        },
        {
            id: 'projet_professionnel',
            text: "Concernant l'orientation et le projet professionnel, où en est la réflexion? Des stages ont-ils été effectués? Quelles pistes sont envisagées?",
            category: 'orientation',
            targetFields: ['orientation'],
            duration: 150
        },
        {
            id: 'autonomie',
            text: "Quel est le niveau d'autonomie de l'élève au collège? Déplacements, organisation, prise d'initiatives, travail personnel?",
            category: 'autonomie',
            targetFields: ['autonomie'],
            duration: 120
        },
        {
            id: 'besoins',
            text: "Quels sont les besoins prioritaires de cet élève pour cette année et pour préparer son orientation?",
            category: 'besoins',
            targetFields: ['besoins'],
            duration: 120
        },
        {
            id: 'amenagements',
            text: "Quels aménagements fonctionnent bien? Lesquels faudrait-il ajuster? Qu'en est-il de l'accompagnement AESH?",
            category: 'amenagements',
            targetFields: ['amenagements', 'propositions'],
            duration: 180
        },
        {
            id: 'evolutions',
            text: "Quels progrès constatez-vous? Quelles préconisations pour la suite de son parcours?",
            category: 'propositions',
            targetFields: ['obs_evolutions', 'propositions'],
            duration: 180
        }
    ],

    SEGPA: [
        {
            id: 'vue_ensemble',
            text: "Parlez-moi de cet élève de SEGPA. Comment se passe son année dans la structure? Comment s'intègre-t-il dans sa classe?",
            category: 'comportement',
            targetFields: ['eval_observations', 'comportement'],
            duration: 180
        },
        {
            id: 'comportement_detail',
            text: "Décrivez le comportement de l'élève. Comment gère-t-il le cadre de la SEGPA? Son rapport aux apprentissages? Ses relations avec les autres?",
            category: 'comportement',
            targetFields: ['comportement', 'obs_cadre1', 'obs_cadre2'],
            duration: 150
        },
        {
            id: 'apprentissages_generaux',
            text: "Où en est l'élève dans les enseignements généraux? Français, mathématiques? Ses points d'appui et ses difficultés?",
            category: 'francais',
            targetFields: ['francais', 'mathematiques'],
            duration: 150
        },
        {
            id: 'ateliers',
            text: "Comment se passe l'élève dans les champs professionnels et ateliers? Montre-t-il de l'intérêt? Des compétences particulières? Comment se projette-t-il?",
            category: 'ateliers',
            targetFields: ['ateliers'],
            duration: 150
        },
        {
            id: 'estime_soi',
            text: "Comment est l'estime de soi de l'élève? Sa confiance dans ses capacités? Sa motivation scolaire et professionnelle?",
            category: 'comportement',
            targetFields: ['comportement'],
            duration: 120
        },
        {
            id: 'autonomie',
            text: "Quel est son niveau d'autonomie? Dans le travail scolaire, les ateliers, l'organisation quotidienne?",
            category: 'autonomie',
            targetFields: ['autonomie'],
            duration: 120
        },
        {
            id: 'besoins',
            text: "Quels sont les besoins de cet élève pour progresser et construire son projet professionnel?",
            category: 'besoins',
            targetFields: ['besoins'],
            duration: 120
        },
        {
            id: 'amenagements',
            text: "Quels aménagements sont en place? Fonctionnent-ils? Faut-il prévoir des accompagnements supplémentaires?",
            category: 'amenagements',
            targetFields: ['amenagements', 'propositions'],
            duration: 180
        },
        {
            id: 'evolutions',
            text: "Quels progrès avez-vous observés? Comment envisagez-vous son orientation (CAP, autre formation)?",
            category: 'propositions',
            targetFields: ['obs_evolutions', 'propositions'],
            duration: 180
        }
    ],

    IME: [
        {
            id: 'vue_ensemble',
            text: "Parlez-moi de ce jeune accueilli en IME. Comment se passe sa prise en charge globale? Son évolution générale?",
            category: 'comportement',
            targetFields: ['eval_observations', 'comportement'],
            duration: 180
        },
        {
            id: 'comportement_communication',
            text: "Décrivez son comportement et sa communication. Comment interagit-il avec les professionnels et les autres jeunes? Quels sont ses moyens de communication?",
            category: 'comportement',
            targetFields: ['comportement', 'obs_cadre1', 'obs_cadre2'],
            duration: 150
        },
        {
            id: 'autonomie_quotidienne',
            text: "Où en est le jeune dans l'autonomie des actes de la vie quotidienne? Toilette, habillage, repas, déplacements? Quelles sont ses capacités et ce qui reste à travailler?",
            category: 'autonomie',
            targetFields: ['autonomie'],
            duration: 150
        },
        {
            id: 'apprentissages',
            text: "Concernant les apprentissages scolaires, quelles sont les compétences travaillées? Lecture fonctionnelle, numération pratique, repérage dans le temps et l'espace?",
            category: 'francais',
            targetFields: ['francais', 'mathematiques'],
            duration: 150
        },
        {
            id: 'socialisation',
            text: "Comment se passe la socialisation du jeune? Ses relations avec les autres, sa participation aux activités de groupe, sa gestion des émotions?",
            category: 'comportement',
            targetFields: ['comportement'],
            duration: 120
        },
        {
            id: 'activites_prepro',
            text: "Le jeune participe-t-il à des activités préprofessionnelles ou à des ateliers? Comment se projette-t-il? Quelles sont ses appétences?",
            category: 'ateliers',
            targetFields: ['ateliers', 'orientation'],
            duration: 150
        },
        {
            id: 'besoins',
            text: "Quels sont les besoins prioritaires de ce jeune pour progresser vers plus d'autonomie et d'épanouissement?",
            category: 'besoins',
            targetFields: ['besoins'],
            duration: 120
        },
        {
            id: 'amenagements',
            text: "Quels accompagnements sont en place? Éducatif, thérapeutique, pédagogique? Qu'est-ce qui fonctionne bien? Qu'est-ce qu'il faudrait ajuster?",
            category: 'amenagements',
            targetFields: ['amenagements', 'propositions'],
            duration: 180
        },
        {
            id: 'evolutions',
            text: "Quels progrès avez-vous observés? Comment envisagez-vous la suite de son parcours (maintien IME, ESAT, autre)?",
            category: 'propositions',
            targetFields: ['obs_evolutions', 'propositions'],
            duration: 180
        }
    ]
};

/**
 * Obtenir les questions pour un niveau donné
 * @param {string} level - Le niveau scolaire
 * @returns {Array} - Les questions adaptées au niveau
 */
function getQuestionsForLevel(level) {
    return questionsConfig[level] || questionsConfig['CP'];
}

/**
 * Obtenir la liste des niveaux disponibles
 * @returns {Object} - Les niveaux groupés par catégorie
 */
function getAvailableLevels() {
    return {
        elementaire: ['CP', 'CE1', 'CE2', 'CM1', 'CM2'],
        college: ['6EME', '5EME', '4EME', '3EME'],
        specialise: ['ULIS_ECOLE', 'ULIS_COLLEGE', 'SEGPA', 'IME']
    };
}

/**
 * Obtenir le libellé d'un niveau
 * @param {string} level - Le code du niveau
 * @returns {string} - Le libellé complet
 */
function getLevelLabel(level) {
    const labels = {
        'CP': 'CP - Cours Préparatoire',
        'CE1': 'CE1 - Cours Élémentaire 1',
        'CE2': 'CE2 - Cours Élémentaire 2',
        'CM1': 'CM1 - Cours Moyen 1',
        'CM2': 'CM2 - Cours Moyen 2',
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

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { questionsConfig, getQuestionsForLevel, getAvailableLevels, getLevelLabel };
}
