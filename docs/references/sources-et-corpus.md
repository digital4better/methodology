# Sources et corpus

Cette page recense les principales familles de sources mobilisées par la méthode et la façon dont elles sont utilisées.

## Apports des référentiels RCP

Ces cinq documents éclairent la méthode sans remplacer son organisation ni ses conventions de calcul. Les notes des pages concernées identifient les passages utilisés.

| Document examiné | Apport retenu | Où lire la différence D4B |
|---|---|---|
| RCP services numériques, juin 2026[^rcp-parent] | Cycle de vie, qualité, seize catégories EF | Indicateurs et qualité des données |
| RCP applicatifs, juin 2026[^rcp-app] | Application complète, étapes logicielles, tiers | Périmètre et modélisation d’un service |
| RCP cloud, juin 2026[^rcp-cloud] | Unités imbriquées, allocations, limite GPU | Cas cloud |
| RCP SI, novembre 2024[^rcp-si] | SI annuel, support, usages professionnels | Parc informatique |
| RCP FAI, rapport de 71 pages[^rcp-fai] | Contribution fixe et trafic variable | Réseau |

Le RCP applicatif cite le RCP cloud d’avril 2025 et le RCP FAI comme une version de novembre 2023. Le rapport cloud examiné ici est celui de juin 2026 ; la fiche FAI porte une date de mise en ligne en 2023. Ces références de versions restent distinctes. Les exemples chiffrés ne sont pas transposés sans contrôle des unités, du périmètre et des sommes.

La synthèse privilégie des compléments compatibles avec D4B. Elle ne constitue ni une déclaration de conformité RCP ni une nouvelle version des moteurs de calcul.

## Corpus documentaire {#corpus-local}

Le corpus réunit des publications scientifiques, des méthodes sectorielles et des documentations de fournisseurs. Il complète les référentiels RCP et le catalogue de données Digital4Better.[^donnees-modele]

La relecture du 19 octobre 2026 porte sur les périmètres, allocations, unités et limites utiles à la v2. Elle ne constitue pas une validation de tous les coefficients ni une revue systématique de la littérature.

### Apports du corpus et décisions de reprise

| Famille examinée | Usage dans la méthode | Limite de reprise |
|---|---|---|
| ADEME GPU 2026, *More than Carbon*, *How Hungry is AI?*, Shift Project | Frontières matérielles, heures GPU, données inférées et effets du déploiement | Aucun résultat universel par requête ni assimilation d’une estimation à une mesure |
| imec.netzero v6.2, annexes et revue v5.1 | Procédés, packaging, rendements et versions | Une revue d’une version ne valide pas les suivantes |
| PAIA, IBM, Dell, Amazon, HPE | Lecture des PCF, configurations, phases et incertitude | Pas de classement automatique des produits ; réutilisation selon les conditions de la source |
| UBA Green Cloud Computing, OVHcloud | Composants, ressources partagées et allocation cloud | Réservations, activité et conventions fournisseur restent distinctes |
| Lövehagen et al., Resilio/Aguaro, Tannu/Nair et Seagate | Recoupement des données et limites des comparaisons matériel/stockage | Échantillons et différences de périmètre empêchent une moyenne universelle |
| BASF et Pathfinder v2 | Traçabilité des PCF et données de chaîne de valeur | Leurs frontières carbone et règles sectorielles ne remplacent pas l’ACV multicritère D4B |

Les références sont rattachées aux passages concernés dans les chapitres. Les données d’exemple ne deviennent pas des valeurs par défaut.

Une transcription n’est pas une source indépendante. Les appels de note, exposants, unités et colonnes peuvent être altérés lors de l’extraction. Un chiffre illisible ou incohérent reste écarté tant que le document original ne permet pas de le vérifier.

## Familles de sources

Les sources mobilisées se répartissent en quatre grandes familles :

- référentiels méthodologiques.
- littérature scientifique et technique.
- données ouvertes et jeux de facteurs.
- documentations constructeurs ou fournisseurs.

## Référentiels structurants

Les référentiels les plus structurants pour cette méthode sont :

- `digital4better/data`, qui constitue le référentiel canonique de données et facteurs.
- la Base Empreinte de l’ADEME, notamment pour les facteurs multicritères d’équipements et de certains services numériques.
- les données constructeurs, lorsqu’elles sont suffisamment documentées et relues de façon critique.
- les publications scientifiques et méthodologiques citées dans les chapitres.

## Ce que l’on reprend de la Base Empreinte

La Base Empreinte regroupe des données et référentiels disponibles pour réaliser des analyses de cycle de vie et des bilans d’émissions de gaz à effet de serre. Dans le cadre des ACV numériques, elle fournit notamment :

- des facteurs multi-indicateurs établis pour des équipements.
- des facteurs établis pour certains services numériques, avec une unité fonctionnelle précise.
- une base officielle utile pour cadrer certains forfaits.

Une vigilance particulière est toutefois nécessaire sur :

- la quantité de référence.
- la durée de vie implicite.
- le périmètre effectivement couvert.
- la comparabilité entre facteurs.

## Niveau de confiance

Le niveau de confiance ne dépend pas uniquement du prestige de la source. Il dépend aussi de :

- la proximité avec l’objet évalué.
- la date.
- la traçabilité.
- le niveau de détail.
- la cohérence avec les autres sources disponibles.

## Hypothèses et limites

- Cette page donne une vue d’ensemble du corpus ; le détail des substitutions et valeurs retenues se trouve dans le registre dédié.

## Sources

- [digital4better/data](https://github.com/digital4better/data)
- Base Empreinte / ADEME

## Revue ciblée du 16 octobre 2026

Cette revue porte sur les sujets affectant les modèles publiés ici. Elle n'est pas une revue systématique exhaustive de toute la littérature. La date ci-dessous est celle de la consultation ; la date de chaque publication reste distincte.

| Source et statut | Apport retenu | Conséquence pour la méthode |
|---|---|---|
| [SCI for AI, spécification GSF](https://github.com/Green-Software-Foundation/sci-ai/blob/main/SPEC.md), ratifiée en décembre 2025 | Frontières fournisseur/consommateur et cycle de vie de l'IA | Compléter le périmètre avec développement, essais, orchestration et ressources réservées ; harmoniser l'unité fonctionnelle |
| [GSF Reference Implementations](https://greensoftware.foundation/articles/introducing-gsf-reference-implementations/), 28 mai 2026 | Exemple pédagogique d'application du SCI for AI | Source d'implémentation et de vérification ; ne constitue pas une certification d'un simulateur |
| [Falk et al., More than Carbon](https://arxiv.org/abs/2509.00093), version 3, décembre 2025 | ACV multicritère d'un accélérateur A100 | Conserver les contributions de fabrication et les transferts entre indicateurs ; ne pas extrapoler les résultats à tout GPU |
| [López-Rauhut et al., empreinte de recherche de Moshi](https://arxiv.org/abs/2604.11154), prépublication, avril 2026 | Périmètre incluant les activités de recherche d'un modèle multimodal | Inclure les essais et travaux préparatoires dans une étude de cycle de vie de modèle |
| [Boavizta CPU](https://doc.api.boavizta.org/Explanations/components/cpu/), [RAM](https://doc.api.boavizta.org/Explanations/components/ram/), [SSD](https://doc.api.boavizta.org/Explanations/components/ssd/) | Formules et coefficients paramétriques documentés | Vérifier les unités de surface, les constantes par module et les densités ; ne pas attribuer à ces sources des facteurs de nœud non documentés |
| [Boavizta GPU](https://doc.api.boavizta.org/Explanations/components/gpu/) | Décomposition spécifique d'une carte accélératrice | Une carte complète ne se réduit pas au modèle CPU historique : intégrer mémoire, carte, refroidissement et autres étapes couvertes |
| [imec SSTS](https://www.imec-int.com/en/expertise/cmos-advanced/sustainable-semiconductor-technologies-and-systems-ssts) | Modélisation des procédés de fabrication | Les multiplicateurs simplifiés D4B restent des hypothèses ; aucune calibration universelle par nœud n'est déduite de cette présentation |
| [D4B, instantané 77cae4a](https://github.com/digital4better/data/tree/77cae4a58fadd5deb3b8d4e5577020da08f780d8) | Facteurs électriques annuels disponibles pour 2025 | Instantané local versionné des pays utilisés ; ne pas confondre année des données et date de consultation |

Les sources anciennes restent utiles lorsqu'elles décrivent précisément un inventaire ou une formule. Leur ancienneté devient une limite de représentativité à documenter, pas un motif de suppression automatique. Les coefficients exploratoires non reproductibles sont distingués des valeurs publiées dans le [registre](./registre-des-hypotheses-et-valeurs-par-defaut).

### Arborescence publique vérifiée

L’arborescence du commit `77cae4a58fadd5deb3b8d4e5577020da08f780d8` a été vérifiée le 16 octobre 2026. Les familles existantes incluent `data/ai`, `data/cloud`, `data/country`, `data/energy`, `data/equipment`, `data/facility`, `data/factor`, `data/mix` et `data/transport`. Le dossier `data/hardware` cité dans des versions antérieures n’existe pas dans cet instantané. Les caractéristiques CPU/accélérateurs sont sous `data/cloud` ; les inventaires détaillés de terminaux et durées de vie doivent provenir de sources identifiées, pas d’un chemin supposé.

[^rcp-parent]: ADEME, [RCP services numériques, version 2, juin 2026](https://librairie.ademe.fr/societe-et-politiques-publiques/9418-methodologie-d-evaluation-environnementale-basee-sur-l-analyse-du-cycle-de-vie-acv-pour-un-service-numerique.html), p. 13–25.

[^rcp-app]: ADEME, [RCP des applicatifs numériques, juin 2026](https://librairie.ademe.fr/economie-circulaire-et-dechets/9434-referentiel-par-categorie-de-produit-rcp-des-applicatifs-numeriques.html), p. 6, 13–16, 54.

[^rcp-cloud]: ADEME, [RCP services cloud et centre de données, juin 2026](https://librairie.ademe.fr/economie-circulaire-et-dechets/6031-referentiel-par-categorie-de-produit-rcp-de-services-cloud-et-de-centre-de-donnees.html), p. 18, 26–64.

[^rcp-si]: ADEME, [RCP des systèmes d’information, mise à jour novembre 2024](https://librairie.ademe.fr/consommer-autrement/6649-referentiel-par-categorie-de-produit-rcp-des-systemes-d-information.html), p. 8–14.

[^rcp-fai]: ADEME, [RCP de la fourniture d’accès Internet, rapport de 71 pages diffusé par l’ADEME (fiche publiée en 2023)](https://librairie.ademe.fr/industrie-et-production-durable/6008-referentiel-par-categorie-de-produit-rcp-de-la-fourniture-d-acces-internet-fai.html), p. 7, 17, 31–32.

[^donnees-modele]: Digital4Better, corpus documentaire recensé dans cette page (revue du 19 octobre 2026) et [catalogue de données, instantané 77cae4a](https://github.com/digital4better/data/tree/77cae4a58fadd5deb3b8d4e5577020da08f780d8).
