# Semi-conducteurs

## Résumé

Cette section couvre les procédés amont liés à la fabrication des puces électroniques. Elle ne modélise pas encore un composant final comme un `CPU` ou un `GPU`, mais la couche industrielle qui explique une grande partie de leurs impacts intrinsèques.

Elle vise surtout à rendre visibles :

- l'intensité énergétique des procédés de fabrication ;
- la consommation d'eau ultrapure ;
- la sensibilité aux surfaces de die, aux rendements et aux technologies de gravure ;
- les limites d'une lecture purement massique des impacts.

Dans cette itération, `Semi-conducteurs` reste une section explicative adossée à la littérature. Elle ne constitue pas encore une chaîne de calcul autonome complète au niveau `wafer` ou `die`.

## Caractéristiques

| Caractéristique | Unité | Valeur par défaut | Plage ou cas typiques | Description |
| --- | --- | --- | --- | --- |
| Technologie de gravure | nm | non renseignée si absente | générations anciennes à avancées | Influence les procédés et les intensités de fabrication |
| Surface de die | mm² | inconnue si absente | faible à très élevée | Variable importante pour expliquer les impacts amont |
| Rendement industriel | % | valeur implicite dans les facteurs | variable selon la technologie | Conditionne la quantité de production utile par wafer |
| Intensité énergétique de procédé | kWh/unité ou facteur agrégé | non normalisée à ce stade | très variable selon la filière | Rend visible le poids énergétique des salles blanches |
| Intensité hydrique | L ou m3/unité | non normalisée à ce stade | très variable selon les procédés | Représente l'usage d'eau ultrapure |
| Type de puce ou famille visée | - | composant de calcul | logique, mémoire, accélérateur, SoC | Sert à relier cette couche aux composants aval |

## Principe de modélisation

La méthode retient ici un rôle essentiellement explicatif : les semi-conducteurs servent à comprendre pourquoi certains composants, surtout les processeurs et accélérateurs, concentrent autant d'impacts intrinsèques.

Trois idées structurantes sont retenues :

- les impacts ne peuvent pas être expliqués uniquement par la masse du composant final ;
- la surface, la complexité et le procédé de fabrication comptent fortement ;
- l'intensité en énergie, en eau et en chimie de process doit rester visible dans l'explication méthodologique.

Quand des données détaillées manqueront encore dans le référentiel D4B, il sera préférable d'utiliser cette couche pour éclairer les hypothèses prises au niveau des composants plutôt que de produire une précision artificielle.

Concrètement, le corpus de référence converge vers une même idée : la bonne unité d'interprétation n'est pas seulement “la puce”, mais une chaîne de production qui part du wafer, traverse le `front-end`, le `back-end`, les tests, puis parfois le packaging avancé. Cette logique explique pourquoi deux composants de masse proche peuvent avoir des impacts amont très différents.

## Impact intrinsèque (fabrication)

### Méthode de calcul

À ce stade, la méthode ne propose pas encore une formule canonique unique de calcul au niveau `wafer` ou `die`. Elle retient plutôt un cadre d'interprétation pour les facteurs déjà utilisés au niveau des composants :

- les procédés semi-conducteurs expliquent une grande partie des impacts intrinsèques des `CPU`, `GPU`, `NPU`, `TPU` et mémoires avancées ;
- une augmentation de surface, de complexité ou de sophistication de procédé tend à augmenter les impacts amont ;
- les facteurs d'impact par composant doivent être relus à la lumière de ces déterminants, même quand ils restent forfaitaires.

Cette page prépare donc les choix de modélisation employés ensuite dans [Processeurs et accélérateurs](../composants/processeurs-et-accelerateurs), [Mémoire vive](../composants/memoire-vive) et plus largement dans les équipements qui les embarquent.

Le corpus permet déjà de structurer cette lecture autour de quatre idées opératoires :

1. `Wafer` et `cm² de die` sont des unités utiles.
   Les méthodes les plus robustes du corpus, notamment `imec.netzero`, proposent des résultats par `wafer`, par `die` ou par `cm²` fonctionnel. Cette logique est précieuse parce qu'elle permet de relier un procédé industriel à un composant aval sans supposer qu'une puce se résume à son poids.

2. La quantité utile n'est pas la surface brute du wafer, mais la surface fonctionnelle livrée.
   Le rapport `Green Cloud Computing` montre bien l'importance du passage du `wafer starts` au `good die out` : la surface utile dépend à la fois de la géométrie du wafer, des pertes de bord, des rendements de ligne et des défauts. Cette étape est méthodologiquement importante, car elle transforme une capacité de production brute en surface de puce réellement livrable.

3. Le `front-end` domine souvent, mais le `back-end` n'est pas négligeable.
   Dans `Green Cloud Computing`, les ordres de grandeur reconstruits pour des CPU Intel indiquent que les procédés `front-end` représentent la plus grande part des impacts, mais que l'assemblage, les tests et le `back-end` ajoutent encore une contribution significative. Pour un ordre de grandeur reconstruit dans cette source, le `back-end` représente environ 10 % du besoin en eau, 14 % du besoin énergétique cumulé et 19 % du `GWP` du couple `front-end + back-end`.

4. Le packaging avancé devient une partie du problème.
   `imec.netzero` insiste sur le fait qu'il ne suffit plus de modéliser un die isolé : certaines architectures combinent plusieurs dies, interposeurs, empilements `TSV`, mémoires avancées et substrats. Dans ces cas, les impacts amont doivent être lus au niveau d'un système de puces et de packaging, pas seulement au niveau d'un die unique.

### Repères chiffrés utiles par indicateur

Les tableaux suivants ne sont pas encore des facteurs canoniques du référentiel D4B. Ce sont des repères de littérature utiles pour interpréter les indicateurs environnementaux les plus sensibles au niveau semi-conducteur.

#### Wafer-substrat : ordre de grandeur par cm²

| Périmètre | Indicateur | Valeur indicative | Unité | Intérêt méthodologique |
| --- | --- | --- | --- | --- |
| Wafer-substrat, moyenne pondérée 2016 (`Siltronic` + `SUMCO`) | `GWP` | 3,32E-02 | kg CO₂e / cm² de wafer | Rend visible le poids climatique d'une étape encore en amont du composant final |
| Wafer-substrat, moyenne pondérée 2016 (`Siltronic` + `SUMCO`) | `WU` | 1,23E-03 | m³ / cm² de wafer | Met en évidence l'intensité hydrique des procédés de purification et de préparation |
| Wafer-substrat, moyenne pondérée 2016 (`Siltronic` + `SUMCO`) | `CED` | 2,54E-01 | MJ / cm² de wafer | Repère énergétique utile, même si `CED` n'est pas un indicateur final retenu dans la méthode |

#### Front-end et back-end CPU : ordre de grandeur par cm² de die

| Périmètre reconstruit | Indicateur | Front-end | Back-end | Part du back-end | Unité |
| --- | --- | --- | --- | --- | --- |
| CPU Intel | `GWP` | 8,21E-01 | 1,56E-01 | 19 % | kg CO₂e / cm² de die |
| CPU Intel | `WU` | 1,40E-02 | 1,00E-03 | 10 % | m³ / cm² de die |
| CPU Intel | `CED` | 8,13 | 1,10 | 14 % | MJ / cm² de die |

#### Lecture des indicateurs de la méthode

| Indicateur de la méthode | Pertinence au niveau semi-conducteur | Pourquoi |
| --- | --- | --- |
| `GWP` | Très forte | Les gaz de procédé, l'électricité et les utilités de salle blanche pèsent fortement sur le climat |
| `WU` | Très forte | L'eau ultrapure est un poste structurant de la chaîne `wafer -> front-end -> back-end` |
| `ADPe` | Forte | Les matériaux et procédés amont contribuent à la pression sur les ressources, même si les facteurs restent encore hétérogènes |
| `CTUe`, `CTUh-nc`, `CTUh-c` | Forte mais moins robuste | La chimie de procédé rend ces indicateurs méthodologiquement importants, mais moins stabilisés aujourd'hui dans le référentiel |

Ces repères servent surtout à comprendre pourquoi un `CPU`, un `GPU` ou une mémoire avancée peuvent concentrer une part très élevée des impacts intrinsèques d'un équipement, sans que la masse seule l'explique.

#### Niveau de robustesse des indicateurs à ce stade

Les sources récentes renforcent la légitimité d'une lecture multicritère des semi-conducteurs, mais elles ne fournissent pas encore un jeu simple et homogène de facteurs universels pour tous les indicateurs.

| Indicateur de la méthode | Niveau de robustesse actuel | Ce que confirment les sources récentes |
| --- | --- | --- |
| `GWP` | Fort | Confirmé de manière récurrente par le corpus historique, `imec.netzero`, les travaux récents sur les procédés nanoscale et les études IA basées sur données primaires |
| `WU` | Fort à intermédiaire | Confirmé par `Green Cloud Computing`, par les travaux récents sur les procédés nanoscale et par les études récentes sur le packaging ; la pondération locale du stress hydrique reste plus variable |
| `ADPe` | Intermédiaire | Pertinent et régulièrement cité, mais encore sensible aux méthodes LCIA retenues et aux bases mobilisées |
| `CTUe`, `CTUh-nc`, `CTUh-c` | Intermédiaire à faible | Les procédés chimiques rendent ces indicateurs méthodologiquement pertinents, mais les facteurs restent moins homogènes et moins transparents selon les études |
| `PM` | Intermédiaire | Confirmé comme catégorie pertinente par des études récentes de procédés, mais rarement avec des facteurs facilement transposables dans un référentiel simplifié |
| `AP`, `IR` | Faible à ce niveau | Peu documentés directement à l'échelle semi-conducteur comme couche autonome ; ils restent surtout portés par les bases d'arrière-plan et les mix énergétiques |

Autrement dit, les sources récentes confirment bien que `GWP` et `WU` ne suffisent pas à eux seuls, mais elles ne permettent pas encore de figer sereinement un tableau opérationnel unique pour tous les indicateurs de la méthode.

#### Ce que les publications récentes apportent

Le corpus historique était déjà solide sur l'énergie, l'eau et la distinction `front-end / back-end`. Les publications plus récentes apportent surtout trois compléments utiles :

1. Une confirmation explicite de la lecture multicritère au niveau procédé.
   L'article de Kuo et al. (2022) sur la fabrication de mémoires `20 / 30 / 40 nm` traite explicitement le changement climatique, l'usage de l'eau, les particules et l'usage de ressources minérales et métalliques. C'est important, car cela confirme qu'une lecture élargie au-delà du seul climat est pertinente au niveau même de la fabrication des puces.

2. Une confirmation que le packaging a ses propres signaux environnementaux.
   Les travaux récents sur le packaging semi-conducteur confirment que les choix de matériaux, de technologie d'encapsulation et surtout de localisation de production font varier sensiblement au moins le carbone et les impacts liés à l'eau. Cela renforce l'idée que le packaging ne doit plus être traité comme un simple détail de fin de chaîne.

3. Une confirmation que les autres catégories bougent davantage que le carbone quand les données s'améliorent.
   Les travaux récents basés sur données primaires, notamment sur le `NVIDIA A100`, montrent que l'amélioration de la qualité de données change parfois modérément le `GWP`, mais peut modifier beaucoup plus fortement les catégories liées aux ressources minérales et métalliques. Cela justifie une prudence particulière avant de transformer ces résultats en facteurs génériques.

### Complétion automatique

Quand les données détaillées sur les semi-conducteurs manquent, la méthode recommande :

1. d'utiliser en priorité un facteur documenté au niveau composant ;
2. de rattacher le composant à une famille technique cohérente ;
3. de signaler que la couche semi-conducteur est couverte indirectement par le facteur aval ;
4. d'éviter de reconstruire un impact semi-conducteur détaillé à partir d'indices trop incomplets.

Quand on cherche malgré tout à améliorer l'interprétation sans reconstruire tout le procédé, les variables les plus utiles à collecter sont, dans cet ordre :

- la famille technologique de la puce ;
- la surface de die ou un proxy de surface ;
- la génération de procédé ou le nœud technologique ;
- le type de packaging ;
- le niveau de confiance sur le rendement ou la maturité technologique.

### Fin de vie

La fin de vie n'est pas modélisée séparément au niveau des seuls semi-conducteurs. Elle est généralement absorbée dans les facteurs de composants ou d'équipements mobilisés en aval, quand elle est couverte.

Pour autant, plusieurs sources du corpus rappellent que se limiter au climat masque une partie des enjeux de fin de vie et de composition matière, en particulier pour les métaux, la toxicité et certains impacts locaux. Cet enjeu est traité plus explicitement dans [Matériaux critiques](./materiaux-critiques).

## Rôle dans les impacts aval

Les semi-conducteurs n'ont pas d'impact opérationnel autonome au sens d'un équipement en usage, mais ils jouent un rôle majeur dans les impacts aval :

- ils expliquent pourquoi certains composants ont un impact intrinsèque bien supérieur à ce que suggère leur masse ;
- ils éclairent la forte sensibilité des processeurs et accélérateurs à la génération technologique ;
- ils justifient une lecture multicritère, notamment sur l'eau et certaines ressources.

Cette section doit donc être lue comme une clé d'interprétation des chapitres composants, pas comme un poste d'usage séparé.

Le papier `More than Carbon` sur le `NVIDIA A100` renforce ce point : les estimations carbone peuvent rester relativement stables d'une étude à l'autre, alors que les catégories liées aux ressources minérales, aux métaux ou à certaines toxicités sont beaucoup plus sensibles à la qualité des données primaires. Autrement dit, une lecture “semi-conducteurs” n'est pas utile seulement pour mieux expliquer le `GWP`, mais surtout pour éviter une vision trop étroite des impacts.

Cette lecture amont aide particulièrement à interpréter :

- les composants de calcul fortement accélérés ;
- les mémoires avancées et le packaging haute densité ;
- les écarts entre approches constructeur, approches base de données et reconstructions par archétypes.

## Hypothèses & limites

### Hypothèses retenues

- les procédés semi-conducteurs occupent une place disproportionnée dans les impacts amont du numérique ;
- la surface de die, le rendement et la finesse de gravure sont des variables explicatives structurantes ;
- les données amont sont aujourd'hui mieux mobilisées comme cadre explicatif que comme modèle de calcul complet.
- l'eau, l'énergie, les utilités et l'infrastructure de salle blanche doivent être considérées ensemble, pas séparément, pour comprendre les procédés.

### Limitations connues

- cette page n'introduit pas encore une chaîne de calcul autonome complète au niveau `wafer` ou `die` ;
- les données disponibles dans la littérature restent hétérogènes selon les familles de puces ;
- le référentiel D4B est aujourd'hui plus avancé sur les familles de composants et d'équipements que sur les procédés semi-conducteurs eux-mêmes.
- les résultats varient sensiblement selon les bases d'arrière-plan, les hypothèses de rendement, les périmètres `front-end / back-end / packaging` et le niveau de données primaires disponible.
- les études récentes confirment bien la pertinence d'indicateurs comme `WU`, `ADPe` ou `PM`, mais pas encore sous une forme suffisamment homogène pour figer un facteur universel simple dans la méthode.

### Perspectives

- enrichir le référentiel D4B sur les procédés amont semi-conducteurs ;
- mieux relier les caractéristiques de procédés aux archétypes de composants ;
- stabiliser une modélisation plus explicite pour certaines familles de puces si les données deviennent suffisantes.
- intégrer à terme une lecture plus explicite par `wafer`, `die`, `cm² fonctionnel` et type de packaging quand le référentiel de données sera prêt.

## Application

Cette section sert principalement à éclairer :

- [Processeurs et accélérateurs](../composants/processeurs-et-accelerateurs), pour les composants de calcul ;
- [Mémoire vive](../composants/memoire-vive), quand des mémoires avancées comme la `HBM` sont mobilisées ;
- [IA générative](../../cas-d-usage/services/ia-generative), quand l'intensité matérielle des accélérateurs doit être expliquée.

## Références

### Données mobilisées

- `digital4better/data/data/hardware/cpus.*`
- `digital4better/data/data/hardware/accelerators.*`
- gap explicite sur des données amont semi-conducteurs plus détaillées

### Repères chiffrés utiles

| Type de donnée | Indicateurs couverts | Niveau de maturité méthodologique |
| --- | --- | --- |
| Données `wafer-substrat` par cm² issues de `Green Cloud Computing` | `GWP`, `WU`, `CED` | Repère de littérature, pas encore facteur canonique D4B |
| Reconstruction Intel `front-end / back-end` par cm² de die | `GWP`, `WU`, `CED` | Repère de littérature, utile pour interpréter les facteurs composants |
| Données de procédés et gaz de spécialité `imec.netzero` | surtout `GWP`, potentiellement autres impacts via LCIA | Base de travail avancée, pas encore intégrée telle quelle dans D4B |

### Sources

- `inputs/md/green-cloud-computing-uba-2021.md`
- `inputs/md/acv-gp-pour-intelligence-artificielle.md`
- `inputs/md/imec-netzero-life-cycle-assessment-methodology-v6-2.md`
- `inputs/md/imec-netzero-life-cycle-assessment-methodology-annex-1-v6-2.md`
- `inputs/md/more-than-carbon-cradle-to-grave-environmental-impacts-of-genai-training-on-the-nvidia-a100-gpu.md`
- `inputs/md/intended-uses-and-limitations-of-the-paia-model.md`
- [Boavizta CPU explanations](https://doc.api.boavizta.org/Explanations/components/cpu/)
- [Kuo et al., 2022, Assessing environmental impacts of nanoscale semi-conductor manufacturing from the life cycle assessment perspective](https://doi.org/10.1016/j.resconrec.2022.106289)
- [Ouattara et al., 2026, Towards cleaner semiconductor packaging: Life cycle assessment of material and location decisions on carbon and water scarcity footprints](https://doi.org/10.1016/j.clwas.2025.100467)
- [Villard et al., 2015, Drawing a chip environmental profile: environmental indicators for the semiconductor industry](https://doi.org/10.1016/j.jclepro.2014.08.061)
