# Registre des hypothèses et valeurs par défaut

Cette page centralise les hypothèses numériques et conventions transverses utilisées par la méthode. Elle constitue l'unique registre de référence pour les valeurs par défaut. Toute valeur par défaut répétée dans plusieurs pages doit apparaître ici.[^donnees-modele]

## Règles d'usage

- Toute valeur par défaut utilisée dans plusieurs chapitres doit être référencée ici.
- Les pages locales peuvent rappeler une hypothèse, mais pas recréer un registre parallèle.
- Chaque entrée doit être associée à une source, une date et un contexte d'application.
- Les révisions doivent être ponctuelles et justifiées (voir [Temporalité et versionnement](../regles/temporalite-vieillissement-et-versionnement-des-donnees)).

## Registre des hypothèses transverses

### Posture et cadre général

| Hypothèse | Valeur / Convention | Source | Contexte d'application |
|---|---|---|---|
| Posture méthodologique | Approche attributionnelle par défaut | Méthodologie Digital4Better | Toutes les évaluations ; les variantes conséquentielles sont traitées en encadrés quand utile |
| Indicateurs environnementaux | 9 indicateurs mid-point + consommation électrique | Convention D4B ; voir [Indicateurs](../fondations/indicateurs-environnementaux) | Sélection de neuf catégories ; pas un jeu PEF complet ; facteurs compatibles requis |
| Hiérarchie des sources | Mesure → primaire → fournisseur → littérature → forfait | [Hypothèses et hiérarchie des sources](../regles/hypotheses-valeurs-par-defaut-et-hierarchie-des-sources) | Choix de données pour toutes les évaluations |

### Facteurs électriques et énergie

| Hypothèse | Valeur / Convention | Source | Contexte d'application |
|---|---|---|---|
| Facteurs d'impact électriques | Priorité aux données `digital4better/data` | `data/factor/*`, `data/energy/*` | Utiliser la granularité la plus robuste compatible avec le contexte (mensuel si disponible, annuel sinon) [^source-1]|
| Mix électrique | Basé sur la consommation (inclut import/export), pas sur la production | `digital4better/data` | Impacts opérationnels ; voir la [convention cloud pour la part renouvelable](../cas-d-usage/environnements/cloud.md#electricite-cloud) |
| Technologies de production | 9 catégories : charbon, gaz, divers fossile, vent, solaire, bioénergie, hydro, divers renouvelable, nucléaire | UNECE 2021, Energy Conversion and Management 2022 | Calcul des facteurs par pays |

### Datacenter et infrastructure

| Hypothèse | Valeur / Convention | Source | Contexte d'application |
|---|---|---|---|
| PUE par défaut | 1,58, scénario historique | Uptime Institute, référence historique ; pas une moyenne actuelle vérifiée | Quand le PUE réel n'est pas connu [^source-5]|
| Puissance RAM | 0,000392 kW/Go | Cloud Jewels / Cloud Carbon Footprint | Estimation de la consommation des composants serveur [^source-4]|
| Puissance stockage SSD | 1,2 × 10⁻³ kW/To | Cloud Jewels / Cloud Carbon Footprint | Estimation de la consommation des composants serveur |
| Puissance stockage HDD | 0,65 × 10⁻³ kW/To | Cloud Jewels / Cloud Carbon Footprint | Estimation de la consommation des composants serveur |
| Réseau inter-datacenters | Scénario 0,001 kWh/Go | Annexe I Cloud Carbon Footprint ; ambiguïté Gb/GB dans la prose à contrôler | Ne couvre pas automatiquement LAN ou accès utilisateur |

### Réseau

| Hypothèse | Valeur / Convention | Source | Contexte d'application |
|---|---|---|---|
| Facteurs réseau D4B | Facteurs par Go·km, ou par octet·km avant conversion | Convention D4B toujours utilisée ; [modèle réseau](../materiel/reseau-et-infrastructure/reseau) | Volume × distance estimée × facteur ; les illustrations par Go intègrent le trajet en amont |
| Distance réseau interne | Rayon estimé du pays : $r = \sqrt{A/\pi}$ | Wikipedia (surfaces pays), méthodologie Digital4Better | Segments réseau internes |
| Distance réseau interpays | Route orthodromique entre barycentres | Google Maps API (barycentres), formule des cosinus | Segments réseau internationaux |
| Volumétrie box | 220 Go/mois par box | Rapport ICT 2020, ADEME/ARCEP 2022 | Intégration de l'impact box dans le facteur réseau fixe |
| Taux de cache CDN | Scénarios de sensibilité 70 % à 90 % ; ancien exemple web 95 % | Hypothèses D4B, non mesurées | Hypothèse sur les flux vers l’origine ; le trafic CDN-utilisateur demeure |

### Modèles paramétriques composants (impact intrinsèque)

| Composant | Formule | Coefficients GWP | Source primaire |
|---|---|---|---|
| CPU historique (pas carte GPU complète) | $I = (die_{mm^2} \times C_{die} + C_{base}) \times F_{node} \times F_{pkg}$ | $C_{die}$ = 0,0197 kgCO₂e/mm², $C_{base}$ = 9,14 kgCO₂e | Modèle historique UBA/Boavizta ; densités et multiplicateurs D4B à calibrer |
| RAM | $I = ((cap_{Go} / densité) \times C_{die} + C_{base}) F_{pkg}$ par module | $C_{die}$ = 2,20 kgCO₂e/cm², $C_{base}$ = 5,22 kgCO₂e, densité DDR4 = 0,625 Go/cm² | Modèle historique UBA/Boavizta ; densités et multiplicateurs D4B à calibrer |
| SSD | $I = (cap_{Go} / densité_{NAND}) \times C_{die} + C_{base}$ par drive | $C_{die}$ = 2,20 kgCO₂e/cm², $C_{base}$ = 6,34 kgCO₂e, densité = 48,5 Go/cm² | Modèle historique UBA/Boavizta ; densités et multiplicateurs D4B à calibrer |
| HDD | $I = 31{,}11$ kgCO₂e par drive (forfaitaire) | 31,11 kg CO₂e/disque | Modèle historique UBA/Boavizta ; densités et multiplicateurs D4B à calibrer |
| Écran | $I = surface_{cm^2} \times C_{techno} + C_{base}$ | LCD: 0,07 kgCO₂e/cm², OLED: 0,12, base: 3,0 | Hypothèse pédagogique D4B, calibration non établie |
| Batterie | $I = cap_{kWh} \times F_{chimie}$ | LCO: 75, NMC: 65, LFP: 50 kgCO₂e/kWh | Hypothèses pédagogiques D4B, non validées par ces publications |

### Reconstruction multicritère des semi-conducteurs

**Statut : non validée au 16 octobre 2026.** Les anciennes valeurs AP, WU, PM, IR et ADPe reconstruites depuis l’inventaire Intel ne sont plus des facteurs par défaut. Pour les réintroduire, publier les flux élémentaires, leurs unités et compartiments, les facteurs LCIA versionnés, les règles de surface et de rendement, ainsi qu’un calcul reproductible. Le détail des valeurs remplacées reste conservé dans les archives de refonte.

Les modèles CPU, RAM et SSD gardent leurs coefficients historiques explicitement sourcés. L’eau physique ne doit pas être additionnée à un indicateur d’eau caractérisé en m³ équivalent.

### Pays de fabrication par défaut (impact intrinsèque)

Ces pays sont des scénarios de sensibilité, pas une localisation connue de chaque composant. Les facteurs agrégés de fabrication ne sont pas relocalisés par simple multiplication par le mix électrique. Une substitution demande un inventaire distinguant l'électricité du reste des procédés.

| Composant | Pays du scénario | Statut |
|---|---|---|
| Logique avancée | Taïwan | Hypothèse D4B ; usine à identifier |
| RAM et NAND | Corée du Sud | Hypothèse D4B ; usine à identifier |
| Assemblage, écran, batterie, PCB | Chine | Hypothèse D4B ; usine à identifier |

### Facteurs de nœud CPU/GPU : scénarios exploratoires ($F_{node}$)

Ces valeurs sont des hypothèses de sensibilité, sans calibration IMEC reproductible identifiée. Elles ne démontrent pas la performance environnementale d’une génération de puces.

| Noeud | $F_{node}$ | Source |
|---|---|---|
| 28 nm | 1,0 (référence) | Hypothèse exploratoire D4B, à calibrer |
| 14 nm | 1,2 | Hypothèse exploratoire D4B, à calibrer |
| 10 nm | 1,4 | Hypothèse exploratoire D4B, à calibrer |
| 7 nm | 1,8 | Hypothèse exploratoire D4B, à calibrer |
| 5 nm | 2,2 | Hypothèse exploratoire D4B, à calibrer |
| 4 nm | 2,5 | Hypothèse exploratoire D4B, à calibrer |
| 3 nm | 2,8 | Hypothèse exploratoire D4B, à calibrer |

### Équipements et durées de vie

| Hypothèse | Valeur / Convention | Source | Contexte d'application |
|---|---|---|---|
| Approche privilégiée | Reconstruction par composants si les données la justifient ; facteur équipement documenté sinon | Méthodologie Digital4Better | Privilégier la représentativité, pas la seule granularité |
| Données manquantes | Priorité mesure → primaire → fournisseur → littérature → forfait | [Hypothèses et hiérarchie](../regles/hypotheses-valeurs-par-defaut-et-hierarchie-des-sources) | Toute donnée absente |
| Correction durée de vie | $IF_{emb} = TIF_{emb} \times TL / RL$ | Méthodologie Digital4Better | Uniquement pour un facteur déjà normalisé au temps ; ne pas appliquer TL/RL à un impact de cycle de vie total |
| vCPU | Correspondance vCPU/thread selon offre et architecture, à documenter | Convention D4B | Calcul d'allocation par composant |

### Exclusions actuelles

| Domaine exclu | Raison | Perspective |
|---|---|---|
| Visioconférence | Hors scope de cette itération | À intégrer dans une itération future |
| Streaming vidéo | Hors scope de cette itération | À intégrer dans une itération future |
| IoT / Embarqué | Hors scope de cette itération | À intégrer dans une itération future |

### Scénarios historiques du service web

Les valeurs 69 s/34 s par vue et 59 % mobile proviennent des références historiques du chapitre web (2023). Le score historique emploie une convention distincte : 20 s et 58 % mobile. Aucune de ces valeurs n’est une moyenne actuelle garantie. Le modèle interne de répartition des vues et la conversion d’une seconde utilisateur en une vCPU-seconde ne sont pas validés hors échantillon ; ils ne remplacent pas les mesures du service. Les anciennes tables et conventions restent dans la v1 et les archives de travail. La v2 utilise des activités observées ou des hypothèses explicitement renseignées.

### Simulateurs et instantané de validation ; 16 octobre 2026

| Paramètre | Valeur / règle | Statut et provenance |
|---|---|---|
| Électricité des simulateurs | Moyennes 2025, 15 pays disponibles dans le fichier local | D4B, commit 77cae4a[^ref-1], `data/factor/country-yearly.csv` ; sélection locale dans `src/data/electricity-factors.json` |
| REF | Aucun abattement automatique du mix de référence | Sensibilité séparée seulement ; compatibilité SCI à vérifier |
| WUE | L/kWh IT × énergie IT | Eau directe physique ; ne pas confondre avec WU caractérisé |
| IR | Résultat numérique suspendu dans le simulateur équipement | Incohérence historique kg/kBq à résoudre à partir des inventaires |
| Écran 16:9 | Surface = diagonale² × 2,54² × 144/337 | Géométrie exacte, diagonale en pouces, surface en cm² |
| IA : calcul | 2P par jeton d'entrée/sortie ; 6P par jeton d'entraînement, P actif | Approximation des couches denses ; attention, mémoire et communications à calibrer |
| IA : fine-tuning | Même échelle de calcul que l'entraînement | Scénario, aucune économie déduite de la seule fraction LoRA |
| IA : MFU / PUE initial | 0,4 / 1,2 | Hypothèses de scénario, pas mesures fournisseur |
| IA : durée de vie | 5 × 365,25 × 24 heures | Allocation au temps actif du simulateur ; allocation au temps réservé à traiter séparément |
| IA : cache | Coût résiduel α = 0,1 ; taux entre 0 et 100 % | Hypothèse, appliquée avant temps et énergie ; coût mémoire non mesuré |
| IA : matériel | Puissances et fabrication par composant dans `src/data/ai-hardware-profiles.json` | Scénarios, pas ACV certifiées ; mémoire hôte B300 corrigée à 2 To |
| Batterie | Formulaire : LCO 75, NMC 65, LFP 50 ; scénario documentaire NMC 811 : 60 kg CO₂e/kWh | Scénarios ; eau/ADPe non calculés sans facteurs traçables |

Les préréglages locaux de capacité, durée, charge, densité et composition sont visibles dans chaque formulaire. Ils décrivent un exemple modifiable, pas une recommandation d'équipement. Les coefficients de procédé et de packaging restent exploratoires tant que leur calibration n'est pas publiée.

## Paramètres des illustrations par composants {#parametres-composants}

Le registre partagé porte la version `d4b-components-illustration-2026.10.19`. Il distingue les coefficients historiques des hypothèses ci-dessous. Leur centralisation assure la cohérence des exemples ; elle ne constitue pas une calibration scientifique.

| Paramètre | Valeur d’exercice | Portée |
|---|---|---|
| RAM DDR5 | Densité 1 Go/cm² ; packaging 1,1 | Même formule dans l’exemple RAM, les terminaux et les serveurs |
| HBM2e / HBM3 | Densités 0,5 / 0,8 ; packaging 3 / 3,5 | Scénarios exploratoires ; interposeur à compter une seule fois |
| Modules serveur | 32 Go par module supposé | Nombre arrondi au supérieur ; capacité totale conservée |
| Disques serveur | 2 To par SSD, 4 To par HDD supposés | Même règle ; les constantes par disque suivent le nombre de disques |
| Résiduel structurel | Smartphone 4, tablette 5, portable 8, fixe 12, serveur 50 kg CO₂e | Hypothèses sans recouvrement avec les composants détaillés |
| Puissance terminal | 50 % du TDP CPU + écran + 2 W auxiliaires | Modèle d’exercice, pas mesure moyenne d’un parc |
| Puissance serveur | TDP CPU/GPU + RAM + stockage + 50 W auxiliaires | Scénario à puissance constante, avant PUE |
| Mélange ordinateur | 60 % portable, 40 % fixe avec écran | Pondération du temps actif, pas statistique d’audience |
| Mélange mobile | 95 % smartphone, 5 % tablette | Même convention |
| Allocation des profils terminal | Fabrication calculée / durée de vie / 8 760 h/an | Le facteur par seconde est dérivé, pas repris des anciens forfaits |

Les profils de service utilisent une année de 365 jours pour le facteur par seconde. Les exemples de composants et l’IA utilisent 365,25 jours pour l’énergie annuelle ou leur allocation temporelle. Ces conventions restent explicites ; leur harmonisation modifierait les résultats et demanderait une nouvelle version.

Les configurations détaillent aussi la capacité, le nombre de composants, l’écran et la batterie. Les valeurs inconnues d’un équipement réel restent des hypothèses ou des postes non évalués. Les anciens facteurs VM et terminaux restent des références historiques ; ils ne sont plus la cible du modèle.

## Gaps du référentiel

Les sujets suivants demandent encore un enrichissement progressif :

- certaines données explicites sur les matériaux critiques.
- certaines conventions de modélisation amont pour les semi-conducteurs.
- des inventaires multicritères compatibles sur certaines couches support.
- des inventaires compatibles pour le réseau LAN, évalué lorsqu’un inventaire documenté est disponible.

## Hypothèses et limites

- Le registre couvre les paramètres partagés et les principales conventions ; la couverture multicritère reste incomplète.
- Chaque évolution d’un paramètre entraîne une révision de sa version et de ses exemples.
- Les valeurs par défaut sont des conventions de travail, pas des vérités générales. Elles doivent être remplacées dès qu'une donnée de meilleur niveau est disponible.

[^source-1]: Digital4Better, [digital4better/data](https://github.com/digital4better/data) Catalogue évolutif ; utiliser un commit pour figer les facteurs.

[^source-4]: [Cloud Carbon Footprint](https://www.cloudcarbonfootprint.org/docs/methodology/) Documentation en ligne, version non figée.

[^source-5]: [Uptime Institute](https://journal.uptimeinstitute.com/global-pues-are-they-going-anywhere/)

[^ref-1]: Digital4Better, [D4B, commit 77cae4a](https://github.com/digital4better/data/tree/77cae4a58fadd5deb3b8d4e5577020da08f780d8). Instantané 77cae4a, données 2025 ; revue du 16 octobre 2026.

[^donnees-modele]: `digital4better/data`. Pages méthodologiques du corpus. Base Empreinte / ADEME. [Digital4Better, catalogue de données, instantané 77cae4a](https://github.com/digital4better/data/tree/77cae4a58fadd5deb3b8d4e5577020da08f780d8). Références et portée : [Sources et corpus](sources-et-corpus).
