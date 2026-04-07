# Processeurs et accélérateurs

## Résumé

Cette section couvre les `CPU`, `GPU`, `NPU`, `TPU` et autres accélérateurs pertinents pour les usages numériques. Elle modélise principalement :

- l'impact intrinsèque lié à la fabrication du composant ;
- l'impact opérationnel lié à sa consommation électrique en usage ;
- les règles de complétion quand toutes les caractéristiques ne sont pas connues.

Le niveau de granularité visé dépend fortement des données disponibles. Quand un modèle précis est connu, la méthode privilégie une lecture par caractéristiques. Quand seule la famille d'équipement est connue, elle s'appuie sur des archétypes.

## Caractéristiques

| Caractéristique | Unité | Valeur par défaut | Plage ou cas typiques | Description |
| --- | --- | --- | --- | --- |
| Type de composant | - | archétype générique | `CPU`, `GPU`, `NPU`, `TPU`, accélérateur spécialisé | Détermine la famille technique et la logique de calcul principale |
| Modèle ou référence | - | modèle inconnu | selon le constructeur ou la gamme | Permet de rattacher le composant à un référentiel plus précis |
| Nombre d'unités de calcul ou de cœurs | - | valeur d'archétype | selon la génération et la gamme | Sert à qualifier la capacité de calcul et la comparaison entre modèles |
| `TDP` ou puissance nominale | W | valeur constructeur ou archétype | très variable selon la gamme | Sert de base à la modélisation de la consommation en usage |
| Mémoire associée ou embarquée | Go | selon le modèle | nulle à plusieurs dizaines de Go | Particulièrement importante pour les accélérateurs |
| Surface de die ou taille de package | mm² | non renseignée si absente | dépend de la technologie | Utile quand la modélisation remonte vers les semi-conducteurs |
| Nombre d'unités par équipement | - | `1` | 1 à plusieurs dizaines | Nécessaire pour le passage du composant à l'équipement |

## Principe de modélisation

La méthode retient en priorité une approche `bottom-up` quand les caractéristiques du composant sont connues, car elle permet de mieux distinguer les différences entre familles et générations de processeurs. Elle bascule vers une approche plus forfaitaire quand seules la famille ou la gamme sont connues.

Trois cas sont distingués :

- composant précisément identifié : utilisation des caractéristiques observées ou documentées ;
- composant partiellement connu : rattachement à un archétype de même famille ;
- composant inconnu mais équipement connu : inférence à partir du type d'équipement et du contexte d'usage.

Cette logique complète les chapitres [Semi-conducteurs](../materiaux/semi-conducteurs) et [Modélisation d’un équipement](../../modelisation/modelisation-d-un-equipement).

## Impact intrinsèque (fabrication)

### Modèle paramétrique

L'impact intrinsèque d'un processeur ou accélérateur est dominé par son procédé de fabrication semi-conducteur. Le modèle paramétrique repose sur trois variables clés :

- la **surface de die** ($S_{die}$, en cm²) — variable la plus structurante ;
- le **noeud technologique** ($N$) — détermine l'intensité du procédé (nombre d'étapes, énergie, eau) ;
- le **type de packaging** — packaging avancé (2.5D, HBM) augmente significativement l'impact back-end.

La formule d'impact intrinsèque est :

$$
\begin{aligned}
&I_{emb} = (S_{die} \times C_{die} + C_{base}) \times F_{node} \times F_{pkg} \times N_{units} \\
\text{avec} \\
&S_{die} = \text{Surface de die} \htmlClass{unit}{[mm²]} \\
&C_{die} = 1{,}97 \times 10^{-2} \text{ kgCO₂e/mm² (coefficient par mm² de die)} \\
&C_{base} = 9{,}14 \text{ kgCO₂e (base : PCB, connecteurs, assemblage)} \\
&F_{node} = \text{Facteur de noeud technologique (voir tableau ci-dessous)} \\
&F_{pkg} = \text{Facteur de packaging (1,0 standard ; 1,5 GPU datacenter)} \\
&N_{units} = \text{Nombre d'unités}
\end{aligned}
$$

Pour les autres indicateurs, les coefficients par mm² de die et par unité (base) sont :

| Indicateur | $C_{die}$ (/mm²) | $C_{base}$ | Unité | Source |
|---|---|---|---|---|
| **GWP** | 1,97E-02 | 9,14 | kgCO₂ eq. | Green Cloud Computing (UBA 2021) |
| **ADPe** | 5,87E-09 | 2,04E-02 | kg Sb eq. | Green Cloud Computing (UBA 2021) |
| **PE** | 0,265 | 156,0 | MJ | Green Cloud Computing (UBA 2021) |
| **AP** | 1,40E-05 | — | mol H+ eq. | Reconstruction depuis LCI Green Cloud Computing[^2] |
| **WU** | 1,32E-03 | — | m³ eq. | Reconstruction depuis LCI Green Cloud Computing[^2] (eau process + eau électricité) |
| **PM** | 2,54E-07 | — | disease occ. | Reconstruction depuis LCI Green Cloud Computing[^2] (NOx process + électricité) |
| **IR** | 1,66E-04 | — | kg U235 eq. | Via l'électricité de fabrication (dépend du mix du pays) |
| **CTUe, CTUh** | Non stabilisé | — | — | Pertinent (chimie de procédé) mais les facteurs de caractérisation pour les émissions spécifiques semi-conducteurs (HF, solvants, photoresists) restent insuffisamment documentés |

[^2]: Reconstruction à partir de l'inventaire du cycle de vie (LCI) publié dans Green Cloud Computing (UBA 2021, Tables 23 et 25), données Intel Irlande 14nm. Les émissions directes (NOx, HF, SF₆, NF₃, N₂O) sont converties en indicateurs mid-point avec les facteurs de caractérisation EF 3.1.

:::note[Indicateurs reconstructibles vs non reconstructibles]
Les indicateurs GWP, AP, WU, PM et IR sont reconstructibles à partir de l'inventaire Green Cloud Computing car les flux physiques (émissions de gaz, consommation d'eau et d'électricité) sont documentés. Les indicateurs CTUe et CTUh nécessiteraient des données sur les flux de solvants et de produits chimiques vers l'environnement, qui ne sont pas suffisamment publiés à ce niveau de détail.
:::

Source primaire des coefficients GWP, ADPe, PE : Green Cloud Computing (UBA 2021), implémentés dans [Boavizta CPU](https://doc.api.boavizta.org/Explanations/components/cpu/). Facteurs de noeud dérivés des publications IMEC NetZero.

### Facteurs de noeud technologique

| Noeud | $F_{node}$ | Justification |
|---|---|---|
| 28 nm | 1,0 | Référence |
| 22 nm | 1,05 | Légère augmentation du nombre d'étapes |
| 14 nm | 1,2 | Introduction du FinFET |
| 10 nm | 1,4 | Multi-patterning intensif |
| 7 nm | 1,8 | Introduction de l'EUV partiel |
| 5 nm | 2,2 | EUV généralisé |
| 4 nm | 2,5 | EUV + high-NA en préparation |
| 3 nm | 2,8 | GAA transistors, complexité maximale |

:::note[Lecture des facteurs]
Un GPU datacenter (die 800 mm², 5 nm, packaging 2.5D) aura un impact intrinsèque environ **2,2 × 1,5 = 3,3 fois** plus élevé par cm² qu'un CPU 28 nm standard. Combiné à une surface 4 fois plus grande, l'impact total est ~13 fois plus élevé.
:::

### Ordres de grandeur

| Composant | Surface de die | Noeud | Impact intrinsèque total (GWP) |
|---|---|---|---|
| CPU serveur standard (Xeon) | ~200 mm² | 10 nm | ~3,9 kg CO₂ eq. |
| CPU AMD EPYC (chiplets) | ~8 × 74 mm² | 7 nm | ~11,5 kg CO₂ eq. |
| GPU NVIDIA H100 | 814 mm² | 5 nm | ~25 kg CO₂ eq. |
| GPU NVIDIA B200 | ~1 000 mm² | 4 nm | ~38 kg CO₂ eq. |
| CPU laptop (mobile) | ~100 mm² | 7 nm | ~2,1 kg CO₂ eq. |

### Couverture des indicateurs

| Indicateur | Pertinence pour CPU/GPU | Couverture actuelle |
|---|---|---|
| **GWP** | Très forte — gaz de procédé (SF₆, NF₃) + énergie salle blanche | Modélisé (coefficient par mm² + node factor) |
| **ADPe** | Forte — matériaux de spécialité (gallium, germanium) et substrats | Modélisé (coefficient par mm²) |
| **PE** | Forte — énergie primaire cumulée des procédés | Modélisé (coefficient par mm²) |
| **WU** | Très forte — eau ultrapure (5 000 à 10 000 L/wafer) | Estimable via Wang et al. 2023 (~8,22 L/cm²) |
| **AP** | Modérée — gaz acides des procédés de gravure et nettoyage | Couvert via les facteurs d'équipement `digital4better/data` |
| **PM** | Modérée — procédés de combustion et abattement | Couvert via les facteurs d'équipement D4B |
| **IR** | Faible à ce niveau — dominé par le mix électrique du pays de fabrication | Couvert via les facteurs pays |
| **CTUe, CTUh** | Pertinent (chimie de procédé intensive) mais peu stabilisé | Les études récentes (Kuo et al. 2022) confirment la pertinence ; les données restent hétérogènes |

### Complétion automatique

Quand certaines caractéristiques manquent, la méthode recommande de compléter dans cet ordre :

1. modèle exact connu dans un référentiel documenté ;
2. modèle voisin de même famille et même gamme ;
3. archétype générique par type de composant ;
4. valeur médiane ou règle de prudence explicitement documentée.

La complétion doit rester visible : un accélérateur haut de gamme ne doit pas être ramené à un CPU standard par simple commodité.

### Fin de vie

La fin de vie n'est généralement pas modélisée séparément au niveau du processeur seul. Quand elle est prise en compte, elle est le plus souvent déjà intégrée dans le facteur d'impact intrinsèque utilisé.

## Impact opérationnel (usage)

### Profil de consommation

Le profil de consommation varie fortement selon la famille de composant :

- les `CPU` présentent souvent une consommation progressive entre `idle`, charge moyenne et charge élevée ;
- les `GPU` et accélérateurs présentent plus souvent des régimes de calcul soutenus, parfois proches de leur puissance nominale ;
- les accélérateurs spécialisés peuvent avoir des profils plus stables mais très dépendants du type de tâche.

Quand aucune courbe détaillée n'est disponible, la méthode utilise au minimum :

- une puissance nominale ou un `TDP` documenté ;
- un profil de charge simplifié ;
- une durée d'utilisation cohérente avec le cas d'usage.

### Facteurs d'ajustement

Les principaux facteurs d'ajustement sont :

- le taux d'utilisation réel du composant ;
- le `MFU` ou équivalent pour les accélérateurs de calcul intensif ;
- la mutualisation au niveau du serveur ou de l'équipement hôte ;
- le `PUE`, qui ne doit être appliqué qu'au bon niveau système ou datacenter, pas deux fois.

## Allocation et annualisation

Un processeur ou un accélérateur n'est presque jamais évalué isolément dans l'usage réel. Son impact est généralement :

- annualisé sur sa durée de vie ;
- porté par un équipement, puis réparti entre usages ;
- alloué selon un indicateur cohérent, par exemple `CPUh`, `GPUh`, temps d'utilisation ou part de charge.

Les règles générales d'allocation sont décrites dans [Allocation et partage des impacts](../../regles/allocation-et-partage-des-impacts).

## Simulateur

import { CpuPlayGround } from '@site/src/components/cpu-playground';

<CpuPlayGround lang="fr" />

## Hypothèses & limites

### Hypothèses retenues

- la puissance nominale et les caractéristiques constructeur sont utilisables comme base de modélisation quand elles sont bien documentées ;
- un archétype de famille est préférable à une valeur arbitraire quand le modèle exact est inconnu ;
- l'impact intrinsèque est souvent mieux documenté en `GWP` qu'en multi-critères ;
- l'impact du composant est généralement porté dans un équipement ou un serveur, puis redistribué.

### Limitations connues

- les puissances réelles varient fortement selon les charges, l'ordonnancement et la couche logicielle ;
- les données publiques sont plus riches pour certains `GPU` que pour les `CPU` ou accélérateurs spécialisés ;
- l'effet de la mémoire embarquée, du packaging avancé ou du refroidissement reste parfois mal isolé ;
- certains facteurs d'impact embarqué restent agrégés au niveau de l'équipement plutôt qu'au niveau du composant.

### Perspectives

- mieux relier les caractéristiques des composants aux chapitres `Semi-conducteurs` et `Matériaux` ;
- enrichir le référentiel D4B sur les accélérateurs spécialisés ;
- intégrer des profils de consommation plus fins selon la charge et le type d'usage ;
- proposer un simulateur quand le modèle d'entrée sera suffisamment stabilisé.

## Application

Les applications les plus pertinentes de ce chapitre apparaissent aujourd'hui dans :

- [IA générative](../../cas-d-usage/services/ia-generative), pour les `GPU` et accélérateurs ;
- [Cloud](../../cas-d-usage/environnements/cloud), pour les unités pivot de type `vCPU.h` et `GPU.h` ;
- [Serveurs](../equipements/serveurs), quand les composants sont modélisés au sein d'un équipement complet.

## Références

### Données mobilisées

- `digital4better/data/data/hardware/cpus.*`
- `digital4better/data/data/hardware/accelerators.*`

### Sources

- `inputs/md/green-cloud-computing-uba-2021.md`
- `inputs/md/acv-gp-pour-intelligence-artificielle.md`
- `inputs/md/more-than-carbon-cradle-to-grave-environmental-impacts-of-genai-training-on-the-nvidia-a100-gpu.md`
