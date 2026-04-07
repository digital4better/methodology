# Registre des hypothèses et valeurs par défaut

## En bref

Cette page centralise les hypothèses numériques et conventions transverses utilisées par la méthode. Elle constitue l'unique registre de référence pour les valeurs par défaut. Toute valeur par défaut répétée dans plusieurs pages doit apparaître ici.

## Règles d'usage

- Toute valeur par défaut utilisée dans plusieurs chapitres doit être référencée ici.
- Les pages locales peuvent rappeler une hypothèse, mais pas recréer un registre parallèle.
- Chaque entrée doit être associée à une source, une date et un contexte d'application.
- Les révisions doivent être ponctuelles et justifiées (voir [Temporalité et versionnement](../regles/temporalite-vieillissement-et-versionnement-des-donnees)).

## Registre des hypothèses transverses

### Posture et cadre général

| Hypothèse | Valeur / Convention | Source | Contexte d'application |
|---|---|---|---|
| Posture méthodologique | Approche attributionnelle par défaut | Méthodologie D4B | Toutes les évaluations ; les variantes conséquentielles sont traitées en encadrés quand utile |
| Indicateurs environnementaux | 9 indicateurs mid-point + consommation électrique | RCP mère ADEME/ARCEP | Toutes les évaluations |
| Hiérarchie des sources | Mesure → primaire → fournisseur → littérature → forfait | [Hypothèses et hiérarchie des sources](../regles/hypotheses-valeurs-par-defaut-et-hierarchie-des-sources) | Choix de données pour toutes les évaluations |

### Facteurs électriques et énergie

| Hypothèse | Valeur / Convention | Source | Contexte d'application |
|---|---|---|---|
| Facteurs d'impact électriques | Priorité aux données `digital4better/data` | `data/factor/*`, `data/energy/*` | Utiliser la granularité la plus robuste compatible avec le contexte (mensuel si disponible, annuel sinon) |
| Mix électrique | Basé sur la consommation (inclut import/export), pas sur la production | `digital4better/data` | Tous les calculs d'impact opérationnel |
| Technologies de production | 9 catégories : charbon, gaz, divers fossile, vent, solaire, bioénergie, hydro, divers renouvelable, nucléaire | UNECE 2021, Energy Conversion and Management 2022 | Calcul des facteurs par pays |

### Datacenter et infrastructure

| Hypothèse | Valeur / Convention | Source | Contexte d'application |
|---|---|---|---|
| PUE par défaut | 1,58 | Uptime Institute (moyenne mondiale) | Quand le PUE réel n'est pas connu |
| Puissance RAM | 0,000392 kW/Go | Cloud Jewels / Cloud Carbon Footprint | Estimation de la consommation des composants serveur |
| Puissance stockage SSD | 1,2 × 10⁻³ kW/To | Cloud Jewels / Cloud Carbon Footprint | Estimation de la consommation des composants serveur |
| Puissance stockage HDD | 0,65 × 10⁻³ kW/To | Cloud Jewels / Cloud Carbon Footprint | Estimation de la consommation des composants serveur |
| Facteur réseau LAN | 0,001 kWh/Gb | Cloud Carbon Footprint | Réseau interne datacenter |
| Durée de vie serveur (Base Empreinte) | 5 ans | NegaOctet / Base Empreinte | Facteurs d'impact intrinsèque des VM |

### Réseau

| Hypothèse | Valeur / Convention | Source | Contexte d'application |
|---|---|---|---|
| Distance réseau interne | Rayon estimé du pays : $r = \sqrt{A/\pi}$ | Wikipedia (surfaces pays), méthodologie D4B | Segments réseau internes |
| Distance réseau interpays | Route orthodromique entre barycentres | Google Maps API (barycentres), formule des cosinus | Segments réseau internationaux |
| Volumétrie box | 220 Go/mois par box | Rapport ICT 2020, ADEME/ARCEP 2022 | Intégration de l'impact box dans le facteur réseau fixe |
| Taux de cache CDN | 70 % à 90 % | Méthodologie D4B | Réduction du trafic après le CDN |

### Modèles paramétriques composants (impact intrinsèque GWP)

| Composant | Formule | Coefficients | Source primaire |
|---|---|---|---|
| CPU/GPU | $I = (die_{mm^2} \times C_{die} + C_{base}) \times F_{node} \times F_{pkg}$ | $C_{die}$ = 0,0197 kgCO₂e/mm², $C_{base}$ = 9,14 kgCO₂e | Green Cloud Computing (UBA 2021) |
| RAM | $I = (cap_{Go} / densité) \times C_{die} + C_{base}$ par module | $C_{die}$ = 2,20 kgCO₂e/cm², $C_{base}$ = 5,22 kgCO₂e, densité DDR4 = 0,625 Go/cm² | Green Cloud Computing (UBA 2021) |
| SSD | $I = (cap_{Go} / densité_{NAND}) \times C_{die} + C_{base}$ par drive | $C_{die}$ = 2,20 kgCO₂e/cm², $C_{base}$ = 6,34 kgCO₂e, densité = 48,5 Go/cm² | Green Cloud Computing (UBA 2021) |
| HDD | $I = 31{,}11$ kgCO₂e par drive (forfaitaire) | — | Green Cloud Computing (UBA 2021) |
| Écran | $I = surface_{cm^2} \times C_{techno} + C_{base}$ | LCD: 0,07 kgCO₂e/cm², OLED: 0,12, base: 3,0 | Base Empreinte, rapports PCF constructeurs |
| Batterie | $I = cap_{kWh} \times F_{chimie}$ | LCO: 75, NMC: 65, LFP: 50 kgCO₂e/kWh | Kelly et al. 2021, Ellingsen et al. 2014 |

### Facteurs de noeud technologique CPU/GPU ($F_{node}$)

| Noeud | $F_{node}$ | Source |
|---|---|---|
| 28 nm | 1,0 (référence) | IMEC NetZero |
| 14 nm | 1,2 | IMEC NetZero |
| 10 nm | 1,4 | IMEC NetZero |
| 7 nm | 1,8 | IMEC NetZero |
| 5 nm | 2,2 | IMEC NetZero |
| 4 nm | 2,5 | IMEC NetZero |
| 3 nm | 2,8 | IMEC NetZero |

### Équipements et durées de vie

| Hypothèse | Valeur / Convention | Source | Contexte d'application |
|---|---|---|---|
| Approche privilégiée | Bottom-up par composant (somme des modèles paramétriques) | Méthodologie D4B | Toutes les évaluations ; facteurs forfaitaires en dernier recours |
| Données manquantes | Priorité mesure → primaire → fournisseur → littérature → forfait | [Hypothèses et hiérarchie](../regles/hypotheses-valeurs-par-defaut-et-hierarchie-des-sources) | Toute donnée absente |
| Correction durée de vie | $IF_{emb} = TIF_{emb} \times TL / RL$ | Méthodologie D4B | Quand la durée de vie réelle diffère de la durée théorique du référentiel |
| vCPU | 1 vCPU = 1 thread d'un CPU physique | Convention D4B | Calcul d'allocation par composant |

### Exclusions actuelles

| Domaine exclu | Raison | Perspective |
|---|---|---|
| Visioconférence | Hors scope de cette itération | À intégrer dans une itération future |
| Streaming vidéo | Hors scope de cette itération | À intégrer dans une itération future |
| IoT / Embarqué | Hors scope de cette itération | À intégrer dans une itération future |

## Gaps du référentiel

Les sujets suivants demandent encore un enrichissement progressif :

- certaines données explicites sur les matériaux critiques ;
- certaines conventions de modélisation amont pour les semi-conducteurs ;
- des forfaits multicritères homogènes sur certaines couches support ;
- des facteurs d'impact intrinsèque pour le réseau LAN (actuellement exclu) ;
- des configurations de référence VM intermédiaires (entre les 3 tailles Base Empreinte).

## Hypothèses et limites

- Ce registre est initialisé dans cette itération mais n'est pas encore exhaustif.
- Il doit être complété à mesure que les chapitres sont approfondis.
- Les valeurs par défaut sont des conventions de travail, pas des vérités générales. Elles doivent être remplacées dès qu'une donnée de meilleur niveau est disponible.

## Données mobilisées

- `digital4better/data`
- Pages méthodologiques du corpus
- Base Empreinte / ADEME

## Sources

- [digital4better/data](https://github.com/digital4better/data)
- ISO 14040 / ISO 14044
- Référentiel ADEME / ARCEP
- [Cloud Carbon Footprint](https://www.cloudcarbonfootprint.org/docs/methodology/)
- [Uptime Institute](https://journal.uptimeinstitute.com/global-pues-are-they-going-anywhere/)
- Corpus `inputs/md`
