# Réseau LAN

## Résumé

Le `LAN` couvre les réseaux locaux filaires et Wi-Fi reliés à un site, un bâtiment ou une organisation. Cette section modélise :

- l'impact intrinsèque du réseau local, soit par inventaire d'équipements soit par facteur système ;
- l'impact opérationnel lié à la consommation électrique du réseau ;
- les règles de passage d'un réseau observé à un impact environnemental alloué à un service.

Selon le niveau d'observation disponible, le `LAN` peut être évalué par inventaire d'équipements ou par approche système. Cette distinction est structurante pour la qualité du résultat.

## Caractéristiques

| Caractéristique | Unité | Valeur par défaut | Plage ou cas typiques | Description |
| --- | --- | --- | --- | --- |
| Mode de modélisation | - | système si inventaire absent | équipement ou système | Détermine le calcul retenu |
| Volume de données transférées | Go ou octets | mesuré ou estimé | faible à très élevé | Variable principale de l'approche système |
| Type de réseau local | - | mixte filaire/Wi-Fi | filaire, Wi-Fi, mixte | Sert à qualifier l'architecture locale |
| Nombre ou type d'équipements | - | archétype de site | switches, routeurs, points d'accès | Utile dans l'approche inventaire |
| Période d'observation | jour, mois, année | période étudiée | courte à longue | Sert à l'interprétation des résultats |
| Part du LAN attribuable au service | % | selon le cas d'usage | marginale à dominante | Sert à l'allocation |

## Principe de modélisation

La méthode distingue deux situations :

- `approche équipement`, quand le réseau local est connu, suivi et maîtrisé ;
- `approche système`, quand le réseau est partagé, peu observable ou opéré par un tiers.

Dans l'approche équipement, l'organisation réalise l'inventaire des matériels qui composent le réseau et évalue chaque équipement conformément à [Modélisation d’un équipement](../../modelisation/modelisation-d-un-equipement#impacts-equipement). L'impact total du réseau local est alors égal à la somme des impacts des équipements qui le composent.

Dans l'approche système, le `LAN` est assimilé à un système fermé décrit à partir de facteurs par volume de données.

## Impact intrinsèque (fabrication)

### Méthode de calcul

Quand l'inventaire d'équipements est disponible, l'impact intrinsèque est évalué par somme des équipements réseau actifs inventoriés.

Quand seule l'approche système est possible, l'impact intrinsèque peut être estimé par :

$$
\begin{align*}
&I_{embodied_{i}} = V \times CF_{embodied_{i}}\htmlClass{unit}{[U_i]}\\
Avec \\
&I_{embodied_{i}} = \text{Impact intrinsèque du réseau pour l’indicateur}\textit{ i }\htmlClass{unit}{[U_i]}\\
&V = \text{Volume de données transférées dans le réseau}\htmlClass{unit}{[o]}\\
&CF_{embodied_{i}} = \text{Facteur de conversion pour l’indicateur}\textit{ i }\htmlClass{unit}{[U_i/o]}\\
\end{align*}
$$

### Complétion automatique

Quand les données manquent, la méthode recommande :

1. d'utiliser l'inventaire réel si le réseau local est maîtrisé ;
2. de rattacher les équipements inconnus à des archétypes cohérents si l'inventaire est partiel ;
3. de basculer vers une approche système si l'inventaire devient trop fragile ;
4. de documenter clairement le changement de niveau de modélisation.

### Fin de vie

Dans l'approche équipement, la fin de vie est généralement intégrée dans les facteurs intrinsèques des équipements réseau. Dans l'approche système, elle est le plus souvent absente ou déjà comprise dans les facteurs utilisés.

## Impact opérationnel (usage)

### Profil de consommation

Quand l'inventaire est connu, la consommation électrique du `LAN` est évaluée à partir des équipements réseau qui le composent.

Quand seule l'approche système est possible, la consommation électrique est estimée par :

$$
\begin{align*}
&E_{elec} = V \times CF_{elec}\htmlClass{unit}{[kWh]}\\
Avec \\
&E_{elec} = \text{Consommation électrique du réseau}\htmlClass{unit}{[kWh]}\\
&V = \text{Volume de données transférées dans le réseau}\htmlClass{unit}{[o]}\\
&CF_{elec} = \text{Facteur de conversion pour l’énergie}\htmlClass{unit}{[kWh/o]}\\
\end{align*}
$$

Par défaut, `CF_{elec}` peut être fixé à `0,001 kWh/Gb`, valeur choisie selon la méthodologie décrite par [Cloud Carbon Footprint](https://www.cloudcarbonfootprint.org/docs/methodology/#chosen-coefficient).

La conversion de la consommation électrique en impacts environnementaux se fait ensuite via [Impacts de la consommation d’énergie](../../fondations/impacts-de-la-consommation-d-energie).

### Facteurs d'ajustement

Les principaux facteurs d'ajustement sont :

- le type de réseau local, filaire ou Wi-Fi ;
- le caractère partagé ou dédié du réseau ;
- le niveau de charge et la période d'observation ;
- le contexte d'hébergement si le `LAN` fait partie d'un site ou d'un datacenter plus large.

## Allocation et annualisation

Le `LAN` est généralement partagé entre plusieurs services et usages. Son impact doit donc être :

- alloué au prorata du trafic ou de l'usage quand l'approche système est retenue ;
- annualisé via les équipements quand l'approche inventaire est retenue ;
- réparti avec prudence quand le réseau local est mutualisé entre plusieurs organisations ou services.

Les règles générales sont rappelées dans [Allocation et partage des impacts](../../regles/allocation-et-partage-des-impacts).

## Hypothèses & limites

### Hypothèses retenues

- l'approche inventaire est préférable quand le réseau local est réellement observé ;
- l'approche système est plus robuste qu'un inventaire trop incomplet ;
- le volume de données transférées reste la variable d'entrée la plus robuste dans l'approche système.

### Limitations connues

- nous ne disposons pas aujourd'hui de facteur d'impact intrinsèque suffisamment robuste pour couvrir systématiquement tous les `LAN` internes en approche système ;
- le facteur énergétique par défaut reste expérimental et plutôt orienté centre de données qu'organisation ;
- le `LAN` peut être difficile à isoler quand il est fusionné avec un périmètre bureautique ou de datacenter.

### Perspectives

- enrichir les données D4B sur les équipements et archétypes de réseaux locaux ;
- mieux distinguer les contextes `Wi-Fi`, filaires et hybrides ;
- proposer un simulateur quand les conventions d'entrée et d'allocation seront suffisamment stabilisées.

## Application

Ce chapitre est mobilisé notamment dans :

- [Infrastructure d’hébergement](../../cas-d-usage/environnements/infrastructure-d-hebergement), pour les réseaux internes maîtrisés ;
- [Service web](../../cas-d-usage/services/service-web), quand le réseau local de l'organisation est dans le périmètre ;
- [Parc informatique](../../cas-d-usage/environnements/parc-informatique), quand un réseau interne partagé fait partie de l'environnement étudié.

## Références

### Données mobilisées

- `digital4better/data/data/hardware/networks.*`
- facteurs réseau documentés

### Sources

- corpus `inputs/md`
- [Cloud Carbon Footprint](https://www.cloudcarbonfootprint.org/docs/methodology/#chosen-coefficient)
- méthodes réseau issues du corpus historique FR
