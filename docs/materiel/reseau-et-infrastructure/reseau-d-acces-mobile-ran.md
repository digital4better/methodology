# Réseau d’accès mobile (RAN)

## Résumé

Cette section couvre le réseau d'accès mobile qui relie les terminaux au reste de l'infrastructure numérique. Elle modélise :

- l'impact intrinsèque du réseau mobile lorsqu'il est représenté par des facteurs système ;
- l'impact opérationnel associé à la consommation électrique du réseau ;
- les conventions nécessaires pour passer d'un trafic mobile à un impact environnemental.

Les résultats dépendent fortement de la génération réseau, de la densité du maillage, de la charge et de la géographie. Le `RAN` est donc une couche très sensible aux hypothèses de contexte.

## Caractéristiques

| Caractéristique | Unité | Valeur par défaut | Plage ou cas typiques | Description |
| --- | --- | --- | --- | --- |
| Génération réseau | - | génération dominante observée | `2G`, `3G`, `4G`, `5G` | Détermine la famille de facteurs ou d'archétypes retenus |
| Volume de données transférées | Go ou octets | mesuré ou estimé | faible à très élevé | Variable d'entrée principale |
| Période observée | jour, mois, année | période étudiée | session à période longue | Sert à l'allocation et à l'interprétation |
| Localisation ou pays | - | pays dominant d'usage | national à multi-pays | Sert à rattacher le réseau à un contexte de facteurs |
| Profil de densité ou de charge | - | profil moyen | urbain dense, périurbain, rural | Influence fortement l'interprétation des facteurs |
| Part de trafic mobile dans le service | % | selon le cas d'usage | marginale à dominante | Sert à relier le `RAN` au service évalué |

## Principe de modélisation

Le `RAN` est modélisé principalement par une approche système, car il est rare de disposer d'un inventaire exploitable des stations de base, antennes et équipements opérateur réellement mobilisés par un service.

La méthode peut s'appuyer :

- sur des facteurs par volume de données et par génération réseau ;
- sur des modèles système plus fins quand un contexte opérateur ou infrastructurel est documenté ;
- sur des hypothèses explicites de mix technologique quand plusieurs générations coexistent.

Le `RAN` doit rester distinct du `WAN` : il couvre la partie d'accès radio, pas le transit longue distance.

## Impact intrinsèque (fabrication)

### Méthode de calcul

Quand des facteurs d'impact intrinsèque par volume de données ou par génération réseau sont disponibles, l'impact intrinsèque peut être estimé sous la forme :

$$
\begin{align*}
&I_{embodied_{i}} = V \times CF_{embodied_{i}}\htmlClass{unit}{[U_i]}\\
Avec \\
&I_{embodied_{i}} = \text{Impact intrinsèque du RAN pour l’indicateur}\textit{ i }\htmlClass{unit}{[U_i]}\\
&V = \text{Volume de données transférées dans le réseau mobile}\htmlClass{unit}{[o]}\\
&CF_{embodied_{i}} = \text{Facteur de conversion pour l’indicateur}\textit{ i }\htmlClass{unit}{[U_i/o]}\\
\end{align*}
$$

Quand le niveau de détail est insuffisant, la méthode recommande d'utiliser un facteur système documenté plutôt qu'une reconstitution artificielle des antennes ou stations de base.

### Complétion automatique

Quand certaines caractéristiques manquent, la méthode recommande :

1. de documenter la génération réseau dominante ;
2. d'utiliser un facteur de référence cohérent avec cette génération ;
3. de basculer vers une valeur moyenne documentée si la génération est inconnue ;
4. de signaler explicitement le niveau d'incertitude, notamment en cas de mix `4G/5G`.

### Fin de vie

La fin de vie n'est généralement pas modélisée isolément au niveau du `RAN`. Elle est le plus souvent intégrée dans les facteurs système ou laissée hors périmètre explicite.

## Impact opérationnel (usage)

### Profil de consommation

L'impact opérationnel repose sur la consommation électrique du réseau mobile associée au volume de données transférées. Quand un facteur énergétique est disponible, on peut écrire :

$$
\begin{align*}
&E_{elec} = V \times CF_{elec}\htmlClass{unit}{[kWh]}\\
Avec \\
&E_{elec} = \text{Consommation électrique du RAN}\htmlClass{unit}{[kWh]}\\
&V = \text{Volume de données transférées dans le réseau mobile}\htmlClass{unit}{[o]}\\
&CF_{elec} = \text{Facteur de conversion pour l’énergie}\htmlClass{unit}{[kWh/o]}\\
\end{align*}
$$

Ce facteur dépend fortement de la génération réseau, du taux de charge et du contexte d'exploitation. Il ne doit donc jamais être présenté comme une constante universelle.

La conversion de la consommation électrique en impacts environnementaux se fait ensuite via [Impacts de la consommation d’énergie](../../fondations/impacts-de-la-consommation-d-energie).

### Facteurs d'ajustement

Les principaux facteurs d'ajustement sont :

- la génération réseau effectivement utilisée ;
- la densité du réseau et du territoire ;
- le taux de charge réel ou supposé ;
- la part de trafic mobile attribuable au service étudié ;
- la période de validité des facteurs.

## Allocation et annualisation

Le `RAN` est une infrastructure fortement mutualisée. Son impact est généralement :

- alloué au prorata du volume de données transférées ;
- réparti selon la part mobile du service évalué ;
- interprété sur une période cohérente avec les données d'entrée.

L'annualisation ne se fait pas directement au niveau de l'utilisateur final mais au travers des facteurs système mobilisés. Les règles générales sont rappelées dans [Allocation et partage des impacts](../../regles/allocation-et-partage-des-impacts).

## Hypothèses & limites

### Hypothèses retenues

- un facteur par génération réseau vaut mieux qu'une moyenne non qualifiée ;
- le trafic mobile constitue l'unité d'entrée la plus robuste quand l'infrastructure opérateur n'est pas observable ;
- le `RAN` doit être traité séparément du terminal et du `WAN`.

### Limitations connues

- les controverses méthodologiques sur les facteurs par `Go` restent fortes ;
- les comparaisons entre générations exigent de documenter le contexte de charge et de densité ;
- les données publiques sont rarement suffisantes pour une modélisation physique fine par site radio.

### Perspectives

- enrichir le référentiel D4B sur les facteurs `RAN` par génération et contexte d'usage ;
- mieux documenter l'impact de la densité de réseau et de la charge ;
- proposer un simulateur lorsque les hypothèses de mix technologique seront suffisamment stabilisées.

## Application

Ce chapitre est mobilisé directement dans :

- [Mobile](../../cas-d-usage/services/mobile), pour la part réseau cellulaire des applications natives ;
- [Service web](../../cas-d-usage/services/service-web), quand une part mobile significative est connue ;
- [IA générative](../../cas-d-usage/services/ia-generative), quand l'usage final passe par un accès mobile.

## Références

### Données mobilisées

- `digital4better/data/data/factor/*`
- facteurs réseau du corpus et, si besoin, données provisoires documentées comme gaps

### Sources

- `inputs/md/green-cloud-computing-uba-2021.md`
- corpus réseau du dépôt
