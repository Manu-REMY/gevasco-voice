/**
 * Bibliothèque de phrases types par niveau scolaire
 * Utilisée pour l'enrichissement des réponses et les suggestions
 */

const phrasesParNiveau = {
    // ==================== ÉLÉMENTAIRE ====================

    CP: {
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
    },

    CE1: {
        comportement: {
            positif: [
                "L'élève s'est bien adapté au rythme du CE1.",
                "L'élève participe activement aux apprentissages.",
                "L'élève fait preuve de curiosité et d'engagement.",
                "L'élève respecte le cadre scolaire."
            ],
            attention: [
                "L'élève présente des difficultés d'attention soutenue.",
                "L'élève a besoin d'être guidé pour maintenir sa concentration.",
                "L'élève se disperse facilement lors des activités longues."
            ],
            relationnel: [
                "L'élève interagit positivement avec ses pairs.",
                "L'élève a parfois des difficultés dans la gestion des conflits.",
                "L'élève s'intègre bien dans les travaux de groupe."
            ]
        },
        francais: {
            lecture: [
                "L'élève lit avec une fluence satisfaisante pour son niveau.",
                "L'élève a besoin de temps supplémentaire pour la lecture.",
                "L'élève comprend les textes courts adaptés à son niveau.",
                "L'élève présente des difficultés de compréhension fine.",
                "L'élève progresse dans la lecture de textes plus longs."
            ],
            ecriture: [
                "L'élève copie correctement un court texte.",
                "L'élève commence à produire des phrases simples.",
                "L'élève présente des difficultés en production d'écrits.",
                "L'élève a besoin de guidance pour structurer ses phrases."
            ],
            etude_langue: [
                "L'élève reconnaît les principales classes de mots.",
                "L'élève commence à appliquer les accords simples.",
                "L'élève a des difficultés avec les règles d'orthographe.",
                "L'élève progresse dans la conjugaison du présent."
            ]
        },
        mathematiques: {
            numeration: [
                "L'élève maîtrise la numération jusqu'à 100.",
                "L'élève a besoin de manipuler pour comprendre les nombres.",
                "L'élève progresse dans la compréhension de la centaine."
            ],
            calcul: [
                "L'élève effectue les additions et soustractions posées.",
                "L'élève développe le calcul mental sur les petits nombres.",
                "L'élève a besoin de support pour les techniques opératoires.",
                "L'élève résout des problèmes simples avec aide."
            ],
            geometrie: [
                "L'élève reconnaît et nomme les figures planes de base.",
                "L'élève se repère sur un quadrillage.",
                "L'élève a des difficultés en repérage spatial."
            ]
        },
        autonomie: [
            "L'élève gère son travail de manière de plus en plus autonome.",
            "L'élève a besoin d'un accompagnement pour l'organisation.",
            "L'élève peut suivre un plan de travail simple.",
            "L'élève sollicite l'aide de l'adulte de manière adaptée."
        ],
        besoins: [
            "Un accompagnement pour la consolidation des apprentissages fondamentaux.",
            "Des exercices différenciés adaptés à son niveau.",
            "Un temps supplémentaire pour les activités de lecture et d'écriture.",
            "Un renforcement en calcul mental.",
            "Un soutien pour l'organisation du travail."
        ],
        amenagements: [
            "Adaptation des supports écrits.",
            "Temps majoré pour les évaluations.",
            "Accompagnement AESH pour certaines activités.",
            "Intervention du RASED.",
            "Suivi orthophonique.",
            "Différenciation pédagogique."
        ],
        propositions: [
            "Poursuite en CE2 avec aménagements.",
            "Mise en place ou maintien d'un PAP.",
            "Demande d'accompagnement AESH.",
            "Orientation vers un suivi spécialisé."
        ]
    },

    CE2: {
        comportement: {
            positif: [
                "L'élève fait preuve de maturité dans son comportement.",
                "L'élève est investi dans ses apprentissages.",
                "L'élève participe activement à la vie de la classe."
            ],
            attention: [
                "L'élève a des difficultés à maintenir son attention sur des temps longs.",
                "L'élève se disperse facilement lors du travail autonome.",
                "L'élève a besoin de pauses régulières."
            ],
            relationnel: [
                "L'élève a de bonnes relations avec ses pairs.",
                "L'élève coopère bien en travail de groupe.",
                "L'élève a parfois des difficultés à accepter la contradiction."
            ]
        },
        francais: {
            lecture: [
                "L'élève lit de manière fluide les textes adaptés à son niveau.",
                "L'élève comprend les informations explicites d'un texte.",
                "L'élève a des difficultés avec les inférences.",
                "L'élève progresse dans la lecture de textes variés."
            ],
            ecriture: [
                "L'élève produit des textes courts respectant la consigne.",
                "L'élève a besoin de guidance pour la rédaction.",
                "L'élève progresse dans l'organisation de ses écrits."
            ],
            etude_langue: [
                "L'élève maîtrise les accords de base en genre et nombre.",
                "L'élève a des difficultés persistantes en orthographe grammaticale.",
                "L'élève conjugue les verbes au présent et au futur.",
                "L'élève a besoin de réviser les temps de conjugaison."
            ]
        },
        mathematiques: {
            numeration: [
                "L'élève maîtrise la numération jusqu'à 1000.",
                "L'élève a besoin de consolider la valeur positionnelle des chiffres."
            ],
            calcul: [
                "L'élève maîtrise les tables de multiplication.",
                "L'élève a des difficultés avec les tables de multiplication.",
                "L'élève pose les opérations correctement.",
                "L'élève résout des problèmes à plusieurs étapes avec aide."
            ],
            geometrie: [
                "L'élève utilise les outils de géométrie.",
                "L'élève a des difficultés en construction géométrique.",
                "L'élève progresse en repérage dans l'espace."
            ]
        },
        autonomie: [
            "L'élève travaille de manière autonome sur des temps adaptés.",
            "L'élève gère son organisation avec aide.",
            "L'élève a besoin d'un cadre structuré pour travailler."
        ],
        besoins: [
            "Consolider les bases en français et mathématiques.",
            "Développer les stratégies de compréhension.",
            "Renforcer l'autonomie dans le travail.",
            "Préparer le passage en cycle 3."
        ],
        amenagements: [
            "Supports adaptés pour les évaluations.",
            "Temps majoré si besoin.",
            "Accompagnement AESH.",
            "Différenciation pédagogique.",
            "Outils d'aide à la lecture."
        ],
        propositions: [
            "Passage en CM1 avec aménagements.",
            "Maintien ou mise en place d'un PAP.",
            "Demande de PPS si nécessaire.",
            "Suivi orthophonique à poursuivre."
        ]
    },

    CM1: {
        comportement: {
            positif: [
                "L'élève s'adapte bien aux exigences du cycle 3.",
                "L'élève fait preuve de sérieux dans son travail.",
                "L'élève participe aux projets de classe."
            ],
            attention: [
                "L'élève a des difficultés à se concentrer sur la durée.",
                "L'élève est parfois distrait lors des leçons.",
                "L'élève a besoin de rappels pour rester attentif."
            ],
            relationnel: [
                "L'élève coopère bien avec ses camarades.",
                "L'élève a un bon positionnement dans le groupe.",
                "L'élève a parfois des difficultés dans les relations sociales."
            ]
        },
        francais: {
            lecture: [
                "L'élève lit des textes longs avec compréhension.",
                "L'élève a des difficultés avec les textes complexes.",
                "L'élève fait des inférences avec aide.",
                "L'élève progresse dans l'interprétation des textes."
            ],
            ecriture: [
                "L'élève rédige des textes structurés.",
                "L'élève a besoin d'aide pour planifier ses écrits.",
                "L'élève a des difficultés à développer ses idées.",
                "L'élève progresse dans la qualité de ses productions."
            ],
            etude_langue: [
                "L'élève maîtrise l'analyse grammaticale de base.",
                "L'élève a des difficultés en conjugaison des temps composés.",
                "L'élève applique les règles d'accord avec aide.",
                "L'élève a besoin de consolidation en orthographe."
            ]
        },
        mathematiques: {
            numeration: [
                "L'élève maîtrise les grands nombres.",
                "L'élève travaille sur les fractions simples.",
                "L'élève a des difficultés avec les nombres décimaux."
            ],
            calcul: [
                "L'élève effectue les quatre opérations.",
                "L'élève a des difficultés avec la division.",
                "L'élève résout des problèmes complexes avec aide.",
                "L'élève a besoin de soutien en calcul mental."
            ],
            geometrie: [
                "L'élève construit des figures avec les outils.",
                "L'élève a des difficultés en géométrie.",
                "L'élève travaille sur les programmes de construction."
            ]
        },
        autonomie: [
            "L'élève organise son travail sur plusieurs jours.",
            "L'élève a besoin d'aide pour planifier ses révisions.",
            "L'élève est autonome pour les tâches courantes.",
            "L'élève a besoin d'un accompagnement méthodologique."
        ],
        besoins: [
            "Renforcer les méthodes de travail.",
            "Consolider les compétences en français et mathématiques.",
            "Développer l'autonomie dans les apprentissages.",
            "Préparer le CM2 et la liaison avec le collège."
        ],
        amenagements: [
            "Outils numériques d'aide.",
            "Temps majoré.",
            "Supports adaptés.",
            "Accompagnement AESH.",
            "Différenciation pédagogique."
        ],
        propositions: [
            "Passage en CM2 avec aménagements.",
            "Poursuite du PAP ou PPS.",
            "Préparation de la liaison avec le collège.",
            "Bilans complémentaires si nécessaire."
        ]
    },

    CM2: {
        comportement: {
            positif: [
                "L'élève est mature et investi dans sa scolarité.",
                "L'élève se prépare activement pour le collège.",
                "L'élève participe aux projets de fin de cycle."
            ],
            attention: [
                "L'élève a parfois des difficultés de concentration.",
                "L'élève est distrait lors des activités complexes.",
                "L'élève a besoin de cadrage pour rester attentif."
            ],
            relationnel: [
                "L'élève a de bonnes relations avec ses pairs.",
                "L'élève assume des responsabilités dans la classe.",
                "L'élève coopère efficacement en groupe."
            ]
        },
        francais: {
            lecture: [
                "L'élève lit des textes variés avec compréhension.",
                "L'élève analyse les textes littéraires.",
                "L'élève a des difficultés avec les textes complexes.",
                "L'élève fait des inférences de manière autonome."
            ],
            ecriture: [
                "L'élève rédige des textes élaborés et organisés.",
                "L'élève utilise différents types d'écrits.",
                "L'élève a besoin de réviser ses productions.",
                "L'élève a des difficultés en production longue."
            ],
            etude_langue: [
                "L'élève maîtrise l'analyse grammaticale complète.",
                "L'élève conjugue les verbes aux temps étudiés.",
                "L'élève a des lacunes en orthographe grammaticale.",
                "L'élève a besoin de consolider certaines notions."
            ]
        },
        mathematiques: {
            numeration: [
                "L'élève maîtrise les décimaux et les fractions.",
                "L'élève travaille sur la proportionnalité.",
                "L'élève a des difficultés avec les fractions."
            ],
            calcul: [
                "L'élève maîtrise les quatre opérations avec décimaux.",
                "L'élève résout des problèmes complexes.",
                "L'élève a besoin de renforcement en calcul.",
                "L'élève a des difficultés en résolution de problèmes."
            ],
            geometrie: [
                "L'élève maîtrise les constructions géométriques.",
                "L'élève calcule périmètres et aires.",
                "L'élève a des difficultés en géométrie."
            ]
        },
        autonomie: [
            "L'élève est autonome dans son travail.",
            "L'élève gère son emploi du temps.",
            "L'élève a besoin d'accompagnement méthodologique.",
            "L'élève prépare seul son matériel."
        ],
        besoins: [
            "Consolider les acquis pour le collège.",
            "Développer l'autonomie.",
            "Renforcer la méthodologie.",
            "Préparer l'adaptation au collège."
        ],
        amenagements: [
            "Outils numériques.",
            "Temps majoré.",
            "Accompagnement AESH.",
            "Supports adaptés.",
            "Préparation de la transition collège."
        ],
        propositions: [
            "Passage en 6ème avec aménagements.",
            "Transmission du PAP ou PPS au collège.",
            "Visite du collège et préparation.",
            "Liaison avec l'équipe pédagogique du collège."
        ]
    },

    // ==================== COLLÈGE ====================

    '6EME': {
        comportement: {
            positif: [
                "L'élève s'adapte progressivement au rythme du collège.",
                "L'élève respecte le règlement intérieur.",
                "L'élève participe à la vie de la classe."
            ],
            attention: [
                "L'élève a des difficultés à suivre des cours de 55 minutes.",
                "L'élève est parfois distrait en classe.",
                "L'élève a besoin de rappels pour rester concentré."
            ],
            relationnel: [
                "L'élève s'intègre dans sa nouvelle classe.",
                "L'élève a parfois des difficultés d'adaptation sociale.",
                "L'élève interagit correctement avec les adultes."
            ]
        },
        francais: {
            lecture: [
                "L'élève lit les textes du programme avec compréhension.",
                "L'élève a des difficultés avec les textes littéraires.",
                "L'élève progresse dans l'analyse de textes."
            ],
            ecriture: [
                "L'élève rédige des textes organisés.",
                "L'élève a des difficultés en rédaction.",
                "L'élève développe ses compétences en expression écrite."
            ],
            etude_langue: [
                "L'élève maîtrise les bases grammaticales.",
                "L'élève a des lacunes en orthographe.",
                "L'élève progresse en conjugaison."
            ]
        },
        mathematiques: {
            calcul: [
                "L'élève maîtrise les opérations fondamentales.",
                "L'élève travaille sur le calcul littéral.",
                "L'élève a des difficultés en résolution de problèmes."
            ],
            geometrie: [
                "L'élève utilise correctement les outils de géométrie.",
                "L'élève a des difficultés en construction.",
                "L'élève progresse en géométrie plane."
            ]
        },
        organisation: [
            "L'élève apprend à gérer son emploi du temps.",
            "L'élève a des difficultés à préparer son cartable.",
            "L'élève note ses devoirs dans son agenda.",
            "L'élève a besoin d'aide pour s'organiser."
        ],
        autonomie: [
            "L'élève développe son autonomie.",
            "L'élève a besoin d'un cadrage important.",
            "L'élève gère progressivement ses déplacements."
        ],
        besoins: [
            "Un accompagnement pour l'adaptation au collège.",
            "Une aide à l'organisation.",
            "Un soutien en méthodologie.",
            "Des aménagements pour les évaluations."
        ],
        amenagements: [
            "Temps majoré pour les évaluations.",
            "Accompagnement AESH.",
            "Supports adaptés.",
            "Place stratégique en classe.",
            "Outils numériques."
        ],
        propositions: [
            "Poursuite du PAP ou PPS.",
            "Accompagnement AESH à maintenir.",
            "Suivi par le professeur principal.",
            "Bilans réguliers avec la famille."
        ]
    },

    '5EME': {
        comportement: {
            positif: [
                "L'élève est adapté au fonctionnement du collège.",
                "L'élève s'investit dans sa scolarité.",
                "L'élève participe à la vie du collège."
            ],
            attention: [
                "L'élève a des difficultés d'attention en classe.",
                "L'élève est parfois distrait.",
                "L'élève a besoin de sollicitations pour rester concentré."
            ],
            relationnel: [
                "L'élève a de bonnes relations avec ses pairs.",
                "L'élève a parfois des difficultés relationnelles.",
                "L'élève respecte les adultes de l'établissement."
            ]
        },
        francais: {
            lecture: [
                "L'élève lit et comprend les textes étudiés.",
                "L'élève développe ses compétences d'analyse.",
                "L'élève a des difficultés de compréhension."
            ],
            ecriture: [
                "L'élève rédige des textes argumentatifs simples.",
                "L'élève a des difficultés en expression écrite.",
                "L'élève progresse dans la structuration de ses écrits."
            ]
        },
        mathematiques: {
            calcul: [
                "L'élève maîtrise le calcul avec les nombres relatifs.",
                "L'élève a des difficultés en algèbre.",
                "L'élève résout des problèmes avec méthode."
            ],
            geometrie: [
                "L'élève construit des figures géométriques.",
                "L'élève a des difficultés en démonstration.",
                "L'élève progresse en géométrie."
            ]
        },
        autonomie: [
            "L'élève est autonome dans son travail.",
            "L'élève a besoin d'aide pour les devoirs.",
            "L'élève gère son organisation."
        ],
        besoins: [
            "Consolider les acquis du cycle 4.",
            "Développer la méthodologie.",
            "Renforcer l'autonomie.",
            "Préparer les échéances du collège."
        ],
        amenagements: [
            "Temps majoré.",
            "Accompagnement AESH.",
            "Supports numériques.",
            "Différenciation pédagogique."
        ],
        propositions: [
            "Poursuite des aménagements.",
            "Suivi régulier.",
            "Préparation de la 4ème."
        ]
    },

    '4EME': {
        comportement: {
            positif: [
                "L'élève est investi dans sa scolarité.",
                "L'élève fait preuve de maturité.",
                "L'élève participe activement en classe."
            ],
            attention: [
                "L'élève a des difficultés de concentration.",
                "L'élève est parfois démotivé.",
                "L'élève a besoin de soutien pour rester engagé."
            ],
            relationnel: [
                "L'élève a de bonnes relations sociales.",
                "L'élève traverse une période difficile au niveau relationnel.",
                "L'élève s'intègre bien dans le groupe."
            ]
        },
        francais: {
            lecture: [
                "L'élève analyse les textes littéraires.",
                "L'élève a des difficultés d'analyse.",
                "L'élève développe son esprit critique."
            ],
            ecriture: [
                "L'élève rédige des textes argumentatifs.",
                "L'élève a des difficultés en argumentation.",
                "L'élève progresse dans la qualité de ses écrits."
            ]
        },
        mathematiques: {
            calcul: [
                "L'élève travaille sur les équations.",
                "L'élève a des difficultés avec les équations.",
                "L'élève résout des problèmes complexes."
            ],
            geometrie: [
                "L'élève maîtrise les démonstrations.",
                "L'élève a des difficultés en raisonnement.",
                "L'élève progresse en géométrie."
            ]
        },
        orientation: [
            "L'élève réfléchit à son orientation.",
            "L'élève a besoin d'aide pour son projet.",
            "L'élève prépare son stage de 3ème."
        ],
        autonomie: [
            "L'élève est autonome dans son travail.",
            "L'élève a besoin de cadrage.",
            "L'élève prépare ses évaluations."
        ],
        besoins: [
            "Accompagnement en orientation.",
            "Soutien scolaire.",
            "Préparation du brevet.",
            "Renforcement de la méthodologie."
        ],
        amenagements: [
            "Temps majoré.",
            "Accompagnement AESH.",
            "Outils numériques.",
            "Supports adaptés."
        ],
        propositions: [
            "Poursuite des aménagements.",
            "Préparation de l'orientation.",
            "Suivi renforcé en 3ème."
        ]
    },

    '3EME': {
        comportement: {
            positif: [
                "L'élève est motivé pour son orientation.",
                "L'élève s'investit dans la préparation du brevet.",
                "L'élève fait preuve de maturité."
            ],
            attention: [
                "L'élève a des difficultés à gérer le stress.",
                "L'élève est parfois démotivé.",
                "L'élève a besoin de soutien cette année charnière."
            ],
            relationnel: [
                "L'élève a de bonnes relations.",
                "L'élève s'intègre dans le groupe.",
                "L'élève a parfois des difficultés relationnelles."
            ]
        },
        francais: {
            lecture: [
                "L'élève maîtrise l'analyse de textes.",
                "L'élève a des difficultés de compréhension.",
                "L'élève se prépare pour l'épreuve du brevet."
            ],
            ecriture: [
                "L'élève rédige des textes élaborés.",
                "L'élève a des difficultés en rédaction.",
                "L'élève progresse en vue du brevet."
            ]
        },
        mathematiques: {
            calcul: [
                "L'élève maîtrise les compétences du programme.",
                "L'élève a des lacunes à combler.",
                "L'élève se prépare pour le brevet."
            ]
        },
        orientation: [
            "L'élève a un projet d'orientation défini.",
            "L'élève a besoin d'aide pour son orientation.",
            "L'élève hésite entre plusieurs voies.",
            "L'élève prépare son dossier d'affectation."
        ],
        autonomie: [
            "L'élève est autonome.",
            "L'élève a besoin d'accompagnement.",
            "L'élève gère sa préparation aux examens."
        ],
        besoins: [
            "Préparation au brevet.",
            "Accompagnement en orientation.",
            "Aménagements pour les épreuves.",
            "Soutien psychologique si besoin."
        ],
        amenagements: [
            "Temps majoré pour le brevet.",
            "Accompagnement AESH.",
            "Secrétaire pour les épreuves.",
            "Salle à part si besoin."
        ],
        propositions: [
            "Aménagements pour le brevet.",
            "Transmission du dossier au lycée/CFA.",
            "Suivi de l'orientation.",
            "Préparation de la transition."
        ]
    },

    // ==================== DISPOSITIFS SPÉCIALISÉS ====================

    ULIS_ECOLE: {
        comportement: {
            positif: [
                "L'élève s'épanouit dans le dispositif ULIS.",
                "L'élève participe aux temps d'inclusion.",
                "L'élève progresse dans ses compétences sociales."
            ],
            attention: [
                "L'élève a des difficultés d'attention.",
                "L'élève a besoin d'un cadre structuré.",
                "L'élève se fatigue rapidement."
            ],
            relationnel: [
                "L'élève interagit avec ses pairs.",
                "L'élève a des difficultés dans les relations.",
                "L'élève progresse dans la socialisation."
            ]
        },
        inclusion: [
            "L'élève est inclus en classe ordinaire pour certaines matières.",
            "L'inclusion se passe bien avec des adaptations.",
            "L'élève a des difficultés lors des temps d'inclusion.",
            "L'inclusion est progressive et accompagnée."
        ],
        apprentissages: [
            "L'élève progresse selon ses objectifs individualisés.",
            "L'élève acquiert des compétences fonctionnelles.",
            "L'élève a besoin de manipulation pour apprendre.",
            "L'élève travaille sur des objectifs adaptés."
        ],
        communication: [
            "L'élève communique de manière adaptée.",
            "L'élève utilise des supports de communication.",
            "L'élève a des difficultés d'expression.",
            "L'élève progresse dans la communication."
        ],
        autonomie: [
            "L'élève développe son autonomie.",
            "L'élève a besoin d'accompagnement constant.",
            "L'élève gère certaines tâches seul.",
            "L'élève progresse vers plus d'autonomie."
        ],
        besoins: [
            "Maintien du dispositif ULIS.",
            "Accompagnement AESH.",
            "Adaptations pédagogiques.",
            "Temps d'inclusion adaptés.",
            "Suivi paramédical."
        ],
        amenagements: [
            "Scolarisation en ULIS avec inclusion.",
            "Accompagnement AESH.",
            "Matériel adapté.",
            "Objectifs individualisés.",
            "Temps de repos si besoin."
        ],
        propositions: [
            "Poursuite en ULIS.",
            "Augmentation des temps d'inclusion.",
            "Orientation vers ULIS collège.",
            "Maintien des accompagnements."
        ]
    },

    ULIS_COLLEGE: {
        comportement: {
            positif: [
                "L'élève s'adapte au fonctionnement du collège.",
                "L'élève participe aux temps d'inclusion.",
                "L'élève progresse dans son autonomie."
            ],
            attention: [
                "L'élève a des difficultés de concentration.",
                "L'élève a besoin de temps de pause.",
                "L'élève se fatigue lors des journées longues."
            ],
            relationnel: [
                "L'élève s'intègre dans le collège.",
                "L'élève a des difficultés relationnelles.",
                "L'élève interagit avec ses pairs."
            ]
        },
        inclusion: [
            "L'élève est inclus dans plusieurs matières.",
            "L'inclusion se passe bien avec accompagnement.",
            "L'élève a des difficultés lors des inclusions.",
            "Les temps d'inclusion sont adaptés."
        ],
        apprentissages: [
            "L'élève travaille sur ses objectifs du PPS.",
            "L'élève acquiert des compétences du socle.",
            "L'élève a des difficultés dans certains domaines.",
            "L'élève progresse à son rythme."
        ],
        orientation: [
            "L'élève réfléchit à son projet professionnel.",
            "Des stages sont organisés.",
            "L'élève découvre les champs professionnels.",
            "L'orientation est en réflexion."
        ],
        autonomie: [
            "L'élève gère ses déplacements dans le collège.",
            "L'élève a besoin d'accompagnement.",
            "L'élève progresse dans l'autonomie.",
            "L'élève organise son travail avec aide."
        ],
        besoins: [
            "Maintien en ULIS collège.",
            "Accompagnement AESH.",
            "Stages de découverte.",
            "Préparation à l'orientation.",
            "Suivi paramédical."
        ],
        amenagements: [
            "Scolarisation en ULIS avec inclusion.",
            "Accompagnement AESH.",
            "Emploi du temps adapté.",
            "Matériel spécifique.",
            "Aménagements pour les évaluations."
        ],
        propositions: [
            "Poursuite en ULIS collège.",
            "Préparation du CFG.",
            "Orientation vers ULIS lycée pro, IMPRO, ou autre.",
            "Stages en entreprise."
        ]
    },

    SEGPA: {
        comportement: {
            positif: [
                "L'élève s'investit dans la SEGPA.",
                "L'élève retrouve confiance en lui.",
                "L'élève participe aux ateliers."
            ],
            attention: [
                "L'élève a des difficultés de concentration.",
                "L'élève a besoin de cadrage.",
                "L'élève progresse dans son attention."
            ],
            relationnel: [
                "L'élève s'intègre dans le groupe.",
                "L'élève a parfois des conflits.",
                "L'élève développe ses compétences sociales."
            ]
        },
        apprentissages: [
            "L'élève consolide les fondamentaux.",
            "L'élève a des difficultés persistantes.",
            "L'élève progresse à son rythme.",
            "L'élève s'investit davantage."
        ],
        ateliers: [
            "L'élève découvre les champs professionnels.",
            "L'élève montre de l'intérêt pour les ateliers.",
            "L'élève a des difficultés en atelier.",
            "L'élève développe des compétences pratiques."
        ],
        estime_soi: [
            "L'élève retrouve confiance en ses capacités.",
            "L'élève a une faible estime de lui.",
            "L'élève se valorise par les réussites.",
            "L'élève a besoin d'encouragements."
        ],
        orientation: [
            "L'élève réfléchit à son orientation.",
            "L'élève prépare son projet professionnel.",
            "Des stages sont réalisés.",
            "L'élève hésite sur son orientation."
        ],
        autonomie: [
            "L'élève gagne en autonomie.",
            "L'élève a besoin d'accompagnement.",
            "L'élève organise son travail."
        ],
        besoins: [
            "Poursuite en SEGPA.",
            "Accompagnement vers le CFG.",
            "Stages de découverte.",
            "Soutien pour l'orientation.",
            "Renforcement de l'estime de soi."
        ],
        amenagements: [
            "Scolarisation en SEGPA.",
            "Accompagnement AESH si besoin.",
            "Aménagements pour le CFG.",
            "Stages en entreprise.",
            "Suivi individualisé."
        ],
        propositions: [
            "Poursuite en SEGPA.",
            "Préparation au CFG.",
            "Orientation vers CAP.",
            "Stages en entreprise."
        ]
    },

    IME: {
        comportement: {
            positif: [
                "Le jeune s'épanouit dans la structure.",
                "Le jeune participe aux activités proposées.",
                "Le jeune progresse dans son comportement."
            ],
            attention: [
                "Le jeune a des difficultés d'attention.",
                "Le jeune a besoin d'un cadre structurant.",
                "Le jeune se fatigue rapidement."
            ],
            relationnel: [
                "Le jeune interagit avec les autres.",
                "Le jeune a des difficultés relationnelles.",
                "Le jeune progresse dans la socialisation."
            ]
        },
        communication: [
            "Le jeune communique de manière adaptée.",
            "Le jeune utilise des supports de communication alternative.",
            "Le jeune a des difficultés d'expression.",
            "Le jeune progresse dans la communication."
        ],
        autonomie_quotidienne: [
            "Le jeune est autonome pour les actes simples.",
            "Le jeune a besoin d'aide pour la toilette.",
            "Le jeune progresse dans l'autonomie.",
            "Le jeune a besoin d'accompagnement constant."
        ],
        apprentissages: [
            "Le jeune travaille sur des compétences fonctionnelles.",
            "Le jeune acquiert des savoirs de base.",
            "Le jeune a des difficultés d'apprentissage.",
            "Le jeune progresse selon ses objectifs."
        ],
        socialisation: [
            "Le jeune s'intègre dans le groupe.",
            "Le jeune a des difficultés en groupe.",
            "Le jeune participe aux activités collectives.",
            "Le jeune progresse dans les relations."
        ],
        prepro: [
            "Le jeune découvre des activités préprofessionnelles.",
            "Le jeune montre de l'intérêt pour certains ateliers.",
            "Le jeune développe des compétences pratiques.",
            "Des stages sont envisagés."
        ],
        besoins: [
            "Maintien en IME.",
            "Accompagnement éducatif et thérapeutique.",
            "Développement de l'autonomie.",
            "Activités préprofessionnelles.",
            "Suivi paramédical."
        ],
        amenagements: [
            "Prise en charge en IME.",
            "Accompagnement individualisé.",
            "Activités adaptées.",
            "Soins thérapeutiques.",
            "Projet personnalisé."
        ],
        propositions: [
            "Maintien en IME.",
            "Orientation vers IMPRO, ESAT.",
            "Développement des compétences professionnelles.",
            "Préparation à la vie adulte."
        ]
    }
};

/**
 * Obtenir les phrases pour un niveau donné
 * @param {string} level - Le niveau scolaire
 * @returns {Object} - Les phrases adaptées au niveau
 */
function getPhrasesForLevel(level) {
    return phrasesParNiveau[level] || phrasesParNiveau['CP'];
}

/**
 * Obtenir toutes les phrases d'une catégorie pour un niveau
 * @param {string} level - Le niveau scolaire
 * @param {string} category - La catégorie (comportement, francais, etc.)
 * @returns {Array|Object} - Les phrases de la catégorie
 */
function getPhrasesByCategory(level, category) {
    const phrases = getPhrasesForLevel(level);
    return phrases[category] || [];
}

// Alias pour la compatibilité avec l'ancien code
const phrasesCP = phrasesParNiveau.CP;

// Fonction pour charger les suggestions dans l'interface
function loadSuggestions() {
    const container = document.getElementById('suggestionsCP');
    if (!container) return;

    // Récupérer le niveau actuel (si disponible)
    const levelSelect = document.getElementById('level-select');
    const currentLevel = levelSelect ? levelSelect.value : 'CP';
    const phrases = getPhrasesForLevel(currentLevel);

    container.innerHTML = '';

    // Comportement
    if (phrases.comportement) {
        container.innerHTML += '<div class="category-header">Comportement</div>';
        if (phrases.comportement.positif) addSuggestionButtons(container, phrases.comportement.positif, 'comportement');
        if (phrases.comportement.attention) addSuggestionButtons(container, phrases.comportement.attention, 'comportement');
        if (phrases.comportement.relationnel) addSuggestionButtons(container, phrases.comportement.relationnel, 'comportement');
    }

    // Français
    if (phrases.francais) {
        container.innerHTML += '<div class="category-header">Français</div>';
        if (phrases.francais.lecture) addSuggestionButtons(container, phrases.francais.lecture, 'francais');
        if (phrases.francais.ecriture) addSuggestionButtons(container, phrases.francais.ecriture, 'francais');
        if (phrases.francais.comprehension) addSuggestionButtons(container, phrases.francais.comprehension, 'francais');
        if (phrases.francais.etude_langue) addSuggestionButtons(container, phrases.francais.etude_langue, 'francais');
    }

    // Mathématiques
    if (phrases.mathematiques) {
        container.innerHTML += '<div class="category-header">Mathématiques</div>';
        if (phrases.mathematiques.numeration) addSuggestionButtons(container, phrases.mathematiques.numeration, 'mathematiques');
        if (phrases.mathematiques.calcul) addSuggestionButtons(container, phrases.mathematiques.calcul, 'mathematiques');
        if (phrases.mathematiques.geometrie) addSuggestionButtons(container, phrases.mathematiques.geometrie, 'mathematiques');
    }

    // Autonomie
    if (phrases.autonomie) {
        container.innerHTML += '<div class="category-header">Autonomie</div>';
        addSuggestionButtons(container, phrases.autonomie, 'autonomie');
    }

    // Besoins
    if (phrases.besoins) {
        container.innerHTML += '<div class="category-header">Besoins</div>';
        addSuggestionButtons(container, phrases.besoins, 'besoins');
    }

    // Aménagements
    if (phrases.amenagements) {
        container.innerHTML += '<div class="category-header">Aménagements</div>';
        addSuggestionButtons(container, phrases.amenagements, 'amenagements');
    }
}

// Fonction helper pour ajouter des boutons de suggestion
function addSuggestionButtons(container, phrases, targetFieldId) {
    if (!Array.isArray(phrases)) return;

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

// Export pour Node.js backend
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { phrasesParNiveau, getPhrasesForLevel, getPhrasesByCategory, phrasesCP };
}

// Charger les suggestions au chargement de la page (browser only)
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', loadSuggestions);
}
