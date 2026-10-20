# Processeurs et accélérateurs

Cette section couvre les `CPU`, `GPU`, `NPU`, `TPU` et autres accélérateurs. Elle modélise leur fabrication, leur consommation en usage et la complétion des caractéristiques manquantes. Le niveau de détail dépend des données disponibles : caractéristiques documentées d'un modèle précis ou archétype de sa famille.

## Caractéristiques

| Caractéristique | Unité | Valeur par défaut | Plage ou cas typiques | Description |
| --- | --- | --- | --- | --- |
| Type de composant | - | archétype générique | `CPU`, `GPU`, `NPU`, `TPU`, accélérateur spécialisé | Détermine la famille technique et la logique de calcul principale [^source-2][^source-3]|
| Modèle ou référence | - | modèle inconnu | selon le constructeur ou la gamme | Permet de rattacher le composant à un référentiel plus précis |
| Nombre d'unités de calcul ou de cœurs | - | valeur d'archétype | selon la génération et la gamme | Sert à qualifier la capacité de calcul et la comparaison entre modèles |
| `TDP` ou puissance nominale | W | valeur constructeur ou archétype | très variable selon la gamme | Sert de base à la modélisation de la consommation en usage |
| Mémoire associée ou embarquée | Go | selon le modèle | nulle à plusieurs dizaines de Go | Particulièrement importante pour les accélérateurs |
| Surface de die (distincte du package) | mm² | non renseignée si absente | dépend de la technologie | Utile quand la modélisation remonte vers les semi-conducteurs |
| Nombre d'unités par équipement | - | `1` | 1 à plusieurs dizaines | Nécessaire pour le passage du composant à l'équipement |

## Principe de modélisation

Une approche `bottom-up` distingue les familles et générations lorsque les caractéristiques sont connues. Une représentation forfaitaire prend le relais lorsque seule la famille ou la gamme est documentée.[^donnees-modele]

| Données disponibles | Représentation retenue |
| --- | --- |
| Composant précisément identifié | Caractéristiques observées ou documentées du modèle. |
| Composant partiellement connu | Archétype compatible de même famille. |
| Composant inconnu, équipement connu | Inférence à partir du type d’équipement et du contexte d’usage. |

Cette logique complète [Semi-conducteurs](../materiaux/semi-conducteurs) et [Modélisation d’un équipement](../../modelisation/modelisation-d-un-equipement).

## Impact intrinsèque (fabrication)

:::caution[Statut des facteurs]
Les coefficients historiques GWP, ADP et énergie primaire sont documentés dans Boavizta à partir de Green Cloud Computing. Les coefficients additionnels AP, WU, PM et IR précédemment présentés comme une reconstruction EF 3.1 sont retirés du calcul de référence : le dépôt ne fournit pas les flux, compartiments, facteurs de caractérisation et étapes permettant de les reproduire. Un inventaire de CPU logique ne peut pas être transposé tel quel à la DRAM ou à la NAND. L’absence de facteur est une donnée manquante, jamais un impact nul.[^source-1]

Les densités et multiplicateurs technologiques doivent être documentés pour le composant étudié. Les paramètres des simulateurs restent des scénarios pédagogiques tant que cette calibration manque. Le libellé ADP de la source ne suffit pas à démontrer son équivalence avec l’ADPe d’un autre référentiel.
:::

### Modèle paramétrique

Le procédé de fabrication semi-conducteur structure l'impact intrinsèque. Le modèle paramétrique distingue trois caractéristiques :

<dl className="model-profiles">
  <div><dt>Surface de die</dt><dd>La surface de silicium constitue une variable structurante du modèle.</dd></div>
  <div><dt>Nœud technologique</dt><dd>Le procédé détermine les étapes de fabrication, les besoins en énergie et en eau.</dd></div>
  <div><dt>Packaging</dt><dd>L’assemblage, notamment avancé (2.5D, HBM), contribue à l’impact de fabrication final.</dd></div>
</dl>

La surface de die est notée $S_{die}$, en mm², et le nœud technologique $N$. Les multiplicateurs restent des hypothèses de scénario tant que leur calibration n'est pas établie.

La formule d'impact intrinsèque est :

$$
\begin{aligned}
&I_{emb} = (S_{die} \times C_{die} + C_{base}) \times F_{node} \times F_{pkg} \times N_{units} \\
\text{avec} \\
&S_{die} = \text{Surface de die} \htmlClass{unit}{[\mathrm{mm}^2]} \\
&C_{die} = 1{,}97 \times 10^{-2} \text{ kgCO}_2\text{e/}\mathrm{mm}^2\text{ (coefficient par }\mathrm{mm}^2\text{ de die)} \\
&C_{base} = 9{,}14 \text{ kgCO}_2\text{e (base : PCB, connecteurs, assemblage)} \\
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
| **CTUe, CTUh** | Non stabilisé | ; | ; | Pertinent (chimie de procédé) mais les facteurs de caractérisation pour les émissions spécifiques semi-conducteurs (HF, solvants, photoresists) restent insuffisamment documentés |

:::note[Reconstruction multicritère]
Une reconstruction demande un inventaire complet, une méthode LCIA identifiée et un calcul reproductible. Elle constitue une piste de travail, pas une couverture acquise des indicateurs.
:::

Source des coefficients historiques GWP, ADP et énergie primaire : Green Cloud Computing (UBA 2021), implémentés dans Boavizta CPU[^ref-1]. Les multiplicateurs de nœud et de packaging ci-dessous sont des hypothèses de scénario D4B ; leur calibration n’est pas établie par une table IMEC identifiée.

### Facteurs de nœud : scénarios exploratoires {#facteurs-de-nœud--scénarios-exploratoires}

| Nœud du scénario | $F_{node}$ | Statut |
|---|---|---|
| 28 nm | 1,0 | Référence pédagogique |
| 22 nm | 1,05 | Hypothèse D4B |
| 14 nm | 1,2 | Hypothèse D4B |
| 10 nm | 1,4 | Hypothèse D4B |
| 7 nm | 1,8 | Hypothèse D4B |
| 5 nm | 2,2 | Hypothèse D4B |
| 4 nm | 2,5 | Hypothèse D4B |
| 3 nm | 2,8 | Hypothèse D4B |

Les noms de nœuds ne décrivent pas à eux seuls le procédé d'une fonderie. Ces multiplicateurs ne démontrent aucune correspondance universelle avec EUV, FinFET ou GAA.

:::note[Lecture des facteurs]
Un scénario de 800 mm² avec les multiplicateurs exploratoires 2,2 et 1,5 donne $(800 × 0,0197 + 9,14) × 2,2 × 1,5 = 82,17$ kg CO₂e. Il ne s’agit pas d’une ACV de GPU commercial. La base fixe empêche de déduire le rapport total du seul rapport des surfaces.
:::

### Pays de fabrication et impact de l'électricité {#pays-de-fabrication-et-impact-de-lélectricité}

Le **mix électrique du lieu de fabrication** influe sur les impacts de l’électricité consommée par les procédés. La localisation de chaque étape doit venir de la chaîne d’approvisionnement du composant. Les pays du [registre](../../references/registre-des-hypotheses-et-valeurs-par-defaut.md) restent des hypothèses lorsque cette information manque.

:::note[Exemple : 100 kWh d’électricité de fabrication]
Pour une étape consommant **100 kWh**, deux lieux hypothétiques donnent les résultats climatiques suivants avec les facteurs moyens de consommation D4B de 2025.[^electricite-exemple]

| Lieu du scénario | Facteur électrique (kg CO₂e/kWh) | Impact pour 100 kWh |
|---|---:|---:|
| France | 0,0319271 | **3,19 kg CO₂e** |
| Chine | 0,589301 | **58,93 kg CO₂e** |

Le calcul est **énergie × facteur électrique**. Les 100 kWh sont une hypothèse pédagogique, pas une consommation moyenne par puce. Ces résultats couvrent uniquement l’électricité de cette étape, sans les matériaux, les émissions directes ni les autres procédés.
:::

Changer le pays d’usage ne change pas le lieu de fabrication. Adapter un bilan de fabrication à un autre pays nécessite d’isoler sa consommation électrique dans l’inventaire : le rapport entre deux facteurs électriques ne s’applique pas à l’impact total du composant. La [méthode de conversion de l’électricité en impacts](../../fondations/impacts-de-la-consommation-d-energie.md#conversion-consommation-electricite-impact-operationnel) détaille ce calcul pour chaque indicateur. Les unités des facteurs IR doivent être vérifiées avant agrégation.

### Exemples de calcul reproductibles

Sans correction technologique ($F_{node}=F_{pkg}=1$), le modèle historique donne :

| Surface de die | Quantité | Calcul GWP | Total de fabrication |
|---|---|---|---|
| 100 mm² | 1 | 100 × 0,0197 + 9,14 | 11,11 kg CO₂e |
| 200 mm² | 1 | 200 × 0,0197 + 9,14 | 13,08 kg CO₂e |
| 400 mm² | 2 | (400 × 0,0197 + 9,14) × 2 | 34,04 kg CO₂e |

Ces résultats illustrent le modèle, sans représenter un modèle commercial. Une carte GPU complète inclut aussi mémoire, carte électronique, refroidissement et transport. La méthode GPU de Boavizta[^ref-2] propose désormais cette décomposition ; appliquer simplement un multiplicateur au modèle CPU ne la remplace pas.

### Couverture des indicateurs

| Indicateur | Couverture actuelle |
|---|---|
| **GWP** | Modèle historique CPU ; facteurs de nœud et packaging exploratoires |
| **ADP historique** | Coefficients du modèle source ; ne pas assimiler sans contrôle à un autre ADPe |
| **PE** | Énergie primaire du modèle historique ; distincte de l'électricité finale |
| **WU** | Pas de facteur composant caractérisé validé ; eau physique et WU ne sont pas additionnables |
| **AP, PM, IR, CTUe, CTUh** | Une ACV ou un inventaire compatible est requis ; un facteur d'équipement ne prouve pas leur répartition entre composants |

### Quand une donnée manque {#complétion-automatique}

La référence exacte du composant est recherchée en premier. À défaut, une caractéristique peut être empruntée à un modèle voisin de même famille, génération et gamme. Ce choix demande une justification : un nombre de cœurs identique ne prouve pas que deux puces sont équivalentes.

| Situation | Exemple fictif |
| --- | --- |
| **Au départ** | Le CPU possède **16 cœurs** et sa génération est connue. Sa référence exacte et sa surface de silicium restent inconnues. |
| **Référence choisie** | Un CPU comparable présente une surface de **200 mm²**. Cette surface est supposée pour l’exemple. |
| **Dans le calcul** | La formule utilise **200 mm² estimés** pour la surface de die. Les 16 cœurs restent une donnée connue ; ils n’ont pas servi à calculer cette surface. |

Si aucun modèle voisin ne convient, un profil type de la famille peut servir, puis une valeur médiane ou une hypothèse prudente documentée en dernier recours. Sans justification, la donnée reste manquante. Un profil de CPU ne remplace pas celui d’un GPU.

### Fin de vie

La fin de vie n'est généralement pas modélisée séparément au niveau du processeur seul. Quand elle est prise en compte, elle est le plus souvent déjà intégrée dans le facteur d'impact intrinsèque utilisé.

## Impact opérationnel (usage)

### Profil de consommation

<dl className="model-profiles">
  <div><dt>CPU</dt><dd>La consommation évolue souvent entre repos, charge moyenne et charge élevée.</dd></div>
  <div><dt>GPU</dt><dd>Le calcul soutenu peut rapprocher la consommation de la puissance nominale.</dd></div>
  <div><dt>Accélérateurs spécialisés</dt><dd>Le profil peut être plus stable, mais reste fortement dépendant de la tâche.</dd></div>
</dl>

Sans courbe détaillée, le scénario associe une puissance nominale ou un `TDP` documenté, un profil de charge simplifié et une durée d'utilisation cohérente. Le TDP n'est pas une mesure de puissance moyenne à la prise.

### Facteurs d'ajustement

Le taux d'utilisation et la mutualisation au niveau de l'équipement hôte précisent l'usage du composant. Le `MFU` représente le rapport entre calcul utile et débit théorique ; il ne correspond pas directement à une fraction du TDP.

Le `PUE` s'applique une seule fois, au niveau système ou datacenter approprié.

## Allocation et annualisation

Le composant appartient généralement à un équipement. Son impact intrinsèque est annualisé sur sa durée de vie, puis réparti entre usages selon une clé cohérente : `CPUh`, `GPUh`, temps d'utilisation ou part de charge.

Les conventions sont décrites dans [Allocation et partage des impacts](../../regles/allocation-et-partage-des-impacts).

## Hypothèses & limites

### Hypothèses retenues

Les caractéristiques constructeur et la puissance nominale documentées peuvent fonder un scénario. Un archétype de famille est préférable à une valeur arbitraire quand le modèle exact manque.

L'impact intrinsèque est souvent mieux documenté en `GWP` qu'en multicritères. Il est généralement porté par l'équipement hôte, puis réparti entre usages.

### Limitations connues

Les puissances réelles varient selon la charge, l'ordonnancement et la couche logicielle. Les données publiques sont plus riches pour certains `GPU` que pour les `CPU` ou les accélérateurs spécialisés.

La mémoire embarquée, le packaging avancé et le refroidissement restent parfois mal isolés. Certains facteurs décrivent l'équipement complet plutôt que le composant.

### Perspectives

Les améliorations concernent le lien entre caractéristiques, semi-conducteurs et matériaux, les données sur les accélérateurs spécialisés et les profils de consommation par usage. Le simulateur exploratoire reste à calibrer sur des inventaires et mesures identifiés.

## Exemple interactif {#simulateur}

import { CpuPlayGround } from '@site/src/components/cpu-playground';

<div className="inline-example">

<CpuPlayGround lang="fr" />

</div>

## Application

[IA générative](../../cas-d-usage/services/ia-generative) mobilise les `GPU` et accélérateurs. [Cloud](../../cas-d-usage/environnements/cloud) utilise notamment les unités pivot `vCPU.h` et `GPU.h`. [Serveurs](../equipements/serveurs) intègre ces composants à l'équipement complet.

[^source-1]: UBA, [Green Cloud Computing](https://www.umweltbundesamt.de/publikationen/green-cloud-computing), 2021. Voir le [corpus documentaire](../../references/sources-et-corpus).

[^source-2]: Lees-Perasso et al., ADEME, [Analyses de cycle de vie de GPU pour l’intelligence artificielle](https://librairie.ademe.fr/economie-circulaire-et-dechets/9103-analyse-de-cycle-de-vie-de-gpu-cartes-graphiques-pour-l-intelligence-artificielle.html), mars 2026, 93 p.

[^source-3]: Falk et al., [More than Carbon](https://arxiv.org/abs/2509.00093), 2025. Voir le [corpus documentaire](../../references/sources-et-corpus).

[^ref-1]: [Boavizta CPU](https://doc.api.boavizta.org/Explanations/components/cpu/). Documentation en ligne, version non figée.

[^ref-2]: [méthode GPU de Boavizta](https://doc.api.boavizta.org/Explanations/components/gpu/). Documentation en ligne, version non figée.

[^donnees-modele]: `data/cloud/cpus.*`. `data/cloud/accelerators.*`. [Digital4Better, catalogue de données, instantané 77cae4a](https://github.com/digital4better/data/tree/77cae4a58fadd5deb3b8d4e5577020da08f780d8).

[^electricite-exemple]: Digital4Better, [facteurs électriques par pays, année 2025](https://github.com/digital4better/data/blob/77cae4a58fadd5deb3b8d4e5577020da08f780d8/data/factor/country-yearly.csv), instantané `77cae4a`, GWP, FR / CN.
