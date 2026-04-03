# Réseau WAN

## Résumé

Le `WAN` couvre les réseaux de transit et de backbone qui relient les grands segments d'internet. Cette section modélise :

- l'impact intrinsèque de ces réseaux par une approche système ;
- l'impact opérationnel lié à la consommation électrique du transport de données ;
- les effets de la distance, de la topologie et du mix fixe/mobile.

Le `WAN` est une couche fortement mutualisée et partiellement opaque. Le calcul repose donc sur des conventions explicites plutôt que sur un inventaire direct des équipements.

## Caractéristiques

| Caractéristique | Unité | Valeur par défaut | Plage ou cas typiques | Description |
| --- | --- | --- | --- | --- |
| Volume de données transférées | Go ou octets | mesuré ou estimé | faible à très élevé | Variable d'entrée principale |
| Longueur du segment | km | facteur pays ou segment | local à intercontinental | Sert à intégrer la dimension géographique |
| Typologie de réseau | - | selon le cas d'usage | fixe, mobile, mixte | Détermine les facteurs applicables |
| Pays d'origine et de destination | - | pays dominant observé | national à multi-pays | Sert à calculer les segments |
| Type de segment | - | interne si non précisé | interne, interpays | Conditionne le facteur de distance |
| Part fixe / mobile | % | selon le cas d'usage | 0 à 100 % | Sert à combiner les facteurs |

## Principe de modélisation

L'approche `WAN` est une approche système : le périmètre réseau est assimilé à un système fermé au niveau duquel on dispose de facteurs d'impacts. La quantité de données transférées constitue la donnée d'entrée principale, l'allocation étant fondée sur les octets transférés.

La méthodologie ajoute une dimension géographique :

- segment interne : tronçon présent uniquement sur le territoire national d'un pays ; on applique alors une distance moyenne entre le barycentre du pays et sa frontière ;
- segment interpays : distance parcourue lorsqu'un réseau quitte un pays de départ pour relier un pays de destination ; on utilise alors une distance moyenne entre barycentres.

Selon ces principes, Digital4Better calcule des facteurs de distance par pays et par type de segment, disponibles dans [`digital4better/data`](https://github.com/digital4better/data/tree/main/data/country).

## Impact intrinsèque (fabrication)

### Méthode de calcul

Les facteurs d'impact distinguent deux typologies principales :

- réseaux mobiles : `2G`, `3G`, `4G`, `5G` ;
- réseaux fixes : `xDSL`, `FFTx`.

Dans le cas d'un réseau mixte, le facteur d'impact environnemental est une combinaison des facteurs réseau fixe et réseau mobile :

$$
\begin{align*}
&CF_{embodied_{i}} = \sum_{e \in \{mobile, desktop\}} P_e \times \left( \sum_{n \in \{fixed, cellular\}} P_{e,n} \times CF_{embodied_{e,n,i}} \right) \htmlClass{unit}{[U_i/o/km]}\\
Avec \\
&CF_{embodied_{i}} = \text{Facteur de conversion pour l'indicateur}\textit{ i }\htmlClass{unit}{[U_i/o/km]}\\
&P_e = \text{Pourcentage d'usage d'équipement}\textit{ e }\\
&P_{e,n} = \text{Pourcentage d'usage de réseau}\textit{ n }\text{ pour l'équipement }\textit{ e }\\
&CF_{embodied_{e,n,i}} = \text{Facteur de conversion pour l'indicateur}\textit{ i }\text{ pour le réseau }\textit{ n }\text{ et l'équipement }\textit{ e }\htmlClass{unit}{[U_i/o/km]}\\
\end{align*}
$$

L'impact intrinsèque d'un segment réseau s'évalue ensuite par :

$$
\begin{align*}
&SI_{embodied_{i}} = V \times L \times CF_{embodied_{i}}\htmlClass{unit}{[U_i]}\\
Avec \\
&SI_{embodied_{i}} = \text{Impact intrinsèque du segment pour l’indicateur}\textit{ i }\htmlClass{unit}{[U_i]}\\
&V = \text{Volume de données transférées dans le réseau}\htmlClass{unit}{[o]}\\
&L = \text{Longueur du segment de réseau}\htmlClass{unit}{[km]}\\
&CF_{embodied_{i}} = \text{Facteur de conversion pour l’indicateur}\textit{ i }\htmlClass{unit}{[U_i/o/km]}\\
\end{align*}
$$

### Complétion automatique

Quand certaines caractéristiques manquent, la méthode recommande :

1. d'identifier le pays d'origine et de destination ;
2. d'utiliser les facteurs de distance D4B pour les segments internes et interpays ;
3. de choisir la typologie réseau fixe, mobile ou mixte la plus plausible ;
4. d'appliquer une hypothèse conservatrice documentée si la part fixe/mobile est inconnue.

### Fin de vie

La fin de vie n'est pas modélisée séparément au niveau du `WAN`. Elle est portée implicitement par les facteurs système utilisés.

## Impact opérationnel (usage)

### Profil de consommation

Les facteurs initiaux proviennent de la Base Empreinte ADEME. Pour les rendre cohérents avec une modélisation par distance, ils sont ajustés afin d'obtenir des facteurs par kilomètre. Une box est également intégrée au réseau fixe, avec une volumétrie de référence de `220 Go` par mois et par box.

L'impact opérationnel d'un segment réseau s'évalue par :

$$
\begin{align*}
&SE_{elec_n} = V \times L \times CF_{elec_n}\htmlClass{unit}{[kWh]}\\
Avec \\
&SE_{elec_n} = \text{Consommation d’électricité du segment de réseau}\textit{ n }\htmlClass{unit}{[kWh]}\\
&V = \text{Volume de données transférées dans le réseau}\htmlClass{unit}{[o]}\\
&L = \text{Longueur du segment de réseau}\htmlClass{unit}{[km]}\\
&CF_{elec_n} = \text{Facteur de conversion pour l’énergie du segment de réseau}\textit{ n }\htmlClass{unit}{[kWh/o/km]}\\
\end{align*}
$$

La conversion de cette consommation électrique en impacts environnementaux se fait ensuite via [Impacts de la consommation d’énergie](../../fondations/impacts-de-la-consommation-d-energie).

### Facteurs d'ajustement

Les principaux facteurs d'ajustement sont :

- la longueur des segments ;
- le mix fixe/mobile ;
- la présence d'une box côté fixe ;
- la répartition entre segments internes et interpays.

Le tableau suivant résume les principaux facteurs historiques issus de cette construction :

| Réseau | Fixe + Box | _Fixe_ | _Box_ | Mobile |
| --- | --- | --- | --- | --- |
| Quantité d'électricité nécessaire pour le procédé (kWh/Go) | 1,03E-01 | _6,87E-02_ | _3,43E-02_ | 2,36E-01 |
| Impact énergie en kWh/octet/km | 2,30E-13 |  |  | 5,28E-13 |
| PEF-ADPe (kg SB eq./octet/km) | 3,82E-19 | _3,75E-19_ | _7,45E-21_ | 2,41E-18 |
| PEF-AP (mol H+ eq./octet/km) | 7,58E-17 | _4,55E-17_ | _3,03E-17_ | 4,51E-17 |
| PEF-CTUe (CTUe/octet/km) | -7,08E-14 | _-6,36E-14_ | _-7,23E-15_ | -4,58E-13 |
| PEF-CTUh-c (CTUh/octet/km) | 2,83E-23 | _1,21E-23_ | _1,62E-23_ | -1,50E-23 |
| PEF-CTUh-nc (CTUh/octet/km) | -2,06E-22 | _-1,50E-22_ | _-5,55E-23_ | -7,70E-22 |
| PEF-GWP (kg CO2 eq./octet/km) | 1,60E-14 | _9,89E-15_ | _6,10E-15_ | 1,78E-14 |
| PEF-IR (kg U235 eq./octet/km) | 6,18E-14 | _3,91E-14_ | _2,27E-14_ | 7,66E-14 |
| PEF-PM (Disease occurrence/octet/km) | 6,07E-22 | _3,93E-22_ | _2,14E-22_ | 6,20E-22 |
| PEF-WU (m3 eq./octet/km) | -2,52E-13 | _-1,81E-13_ | _-7,13E-14_ | -9,93E-13 |

## Allocation et annualisation

Le réseau `WAN` est décomposé en un ou plusieurs segments, eux-mêmes composés de réseaux mixtes et/ou fixes selon la nature des connexions.

L'impact total du réseau s'évalue par la somme des impacts de chaque segment :

$$
\begin{align*}
&I_{i} = \sum_{t \in \{operational, embodied\}} \sum_{k=1}^n SI_{t_{k,i}}\htmlClass{unit}{[U_i]}\\
Avec \\
&I_{i} = \text{Impact du réseau composé de}\textit{ n }\text{ segments pour l’indicateur environnemental }\textit{ i }\htmlClass{unit}{[U_i]}\\
&SI_{t_{k,i}} = \text{Impact }\textit{ t }\text{ du segment }\textit{ k }\text{ pour l’indicateur environnemental }\textit{ i }\htmlClass{unit}{[U_i]}\\
\end{align*}
$$

L'allocation repose donc principalement sur les octets transférés, puis sur la décomposition géographique des segments. Les règles transverses sont rappelées dans [Allocation et partage des impacts](../../regles/allocation-et-partage-des-impacts).

## Hypothèses & limites

### Hypothèses retenues

- la quantité de données transférées constitue la donnée d'entrée la plus robuste ;
- l'introduction d'une distance moyenne améliore la cohérence géographique du modèle ;
- les réseaux mixtes doivent être distingués des réseaux fixes purs.

### Limitations connues

- le `WAN` reste une couche fortement mutualisée et opaque ;
- les modèles `kWh/Go` restent utiles pour rendre le calcul possible, mais ne doivent pas être lus comme des constantes universelles ;
- les hypothèses de distance, de topologie et de typologie fixe/mobile doivent toujours être documentées.

### Perspectives

- enrichir les facteurs D4B par pays et segments ;
- mieux relier les hypothèses de transit international aux réalités observées des services ;
- proposer un simulateur une fois les conventions géographiques stabilisées.

## Application

Ce chapitre est mobilisé notamment dans :

- [Service web](../../cas-d-usage/services/service-web), pour la circulation des données entre utilisateur et hébergement ;
- [Mail](../../cas-d-usage/services/mail), pour le transport des messages et pièces jointes ;
- [Mobile](../../cas-d-usage/services/mobile), quand le service combine accès fixe, mobile et transit longue distance.

## Références

### Données mobilisées

- facteurs réseau issus du corpus et du référentiel D4B quand disponibles
- `digital4better/data/data/country/*`
- `digital4better/data/data/factor/*`

### Sources

- `inputs/md/green-cloud-computing-uba-2021.md`
- corpus historique FR
- Base Empreinte / ADEME
