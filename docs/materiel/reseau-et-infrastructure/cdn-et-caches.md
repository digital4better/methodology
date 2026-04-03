# CDN et caches

## Résumé

Cette section couvre les couches de distribution et de mise en cache qui modifient les flux entre l'utilisateur, les réseaux de transit et les centres de données. Elle modélise :

- l'impact des ressources supplémentaires introduites par le `CDN` et les nœuds de cache ;
- les impacts évités ou déplacés sur le réseau et l'infrastructure ;
- les paramètres structurants comme le `hit ratio` et la topologie de distribution.

Les `CDN` et caches ne suppriment pas les impacts ; ils les déplacent, les répartissent et peuvent les réduire dans certains contextes. Ils doivent donc être modélisés comme des couches de transformation des flux, pas comme une optimisation gratuite.

## Caractéristiques

| Caractéristique | Unité | Valeur par défaut | Plage ou cas typiques | Description |
| --- | --- | --- | --- | --- |
| Présence d'un `CDN` | - | absent si non documenté | absent, partiel, généralisé | Détermine s'il faut modéliser une couche de distribution |
| `Hit ratio` de cache | % | valeur documentée ou hypothèse | faible à très élevé | Variable principale pour quantifier ce qui est évité |
| Distance utilisateur -> `CDN` | km | proximité régionale | locale à internationale | Sert à décomposer les segments |
| Distance `CDN` -> datacenter | km | selon la topologie | locale à très longue | Sert à modéliser les flux résiduels |
| Type de contenu distribué | - | contenu standard | statique, média, mixte | Influence le comportement du cache |
| Ressources de cache associées | - | non détaillées si absentes | nœuds de cache, serveurs de distribution | Sert à modéliser la part d'infrastructure ajoutée |

## Principe de modélisation

Lorsqu'un [CDN](../../references/glossaire#cdn-content-delivery-network) est présent, le flux de données peut être décomposé en trois segments :

- un segment allant de l'utilisateur au point d'entrée le plus proche du `CDN` ;
- un segment allant du point d'entrée au point de sortie, qui peut être international ;
- un segment allant du point de sortie au datacenter.

L'effet du cache est de réduire la part de trafic qui poursuit son chemin jusqu'au centre de données. Un `CDN` est donc d'autant plus efficace que la distance entre l'utilisateur et le centre de données est importante et que le `hit ratio` est élevé.

## Impact intrinsèque (fabrication)

### Méthode de calcul

L'impact intrinsèque des `CDN` et caches provient principalement :

- des serveurs et équipements associés aux nœuds de cache ;
- des ressources réseau supplémentaires introduites par la distribution ;
- de la part résiduelle qui continue jusqu'au datacenter.

Quand ces ressources sont modélisées explicitement, une écriture conceptuelle du calcul peut être :

$$
\begin{align*}
&I_{embodied_{i}} = I_{cache_{i}} + I_{entry_{i}} + (1-H) \times (I_{transit_{i}} + I_{datacenter_{i}})\htmlClass{unit}{[U_i]}\\
Avec \\
&I_{embodied_{i}} = \text{Impact intrinsèque total pour l’indicateur}\textit{ i }\htmlClass{unit}{[U_i]}\\
&I_{cache_{i}} = \text{Impact intrinsèque des nœuds de cache}\htmlClass{unit}{[U_i]}\\
&I_{entry_{i}} = \text{Impact du premier segment jusqu’au CDN}\htmlClass{unit}{[U_i]}\\
&H = \text{Taux de hit cache}\htmlClass{unit}{[\%]}\\
&I_{transit_{i}} = \text{Impact du transit vers le datacenter}\htmlClass{unit}{[U_i]}\\
&I_{datacenter_{i}} = \text{Impact intrinsèque résiduel côté datacenter}\htmlClass{unit}{[U_i]}\\
\end{align*}
$$

Quand les ressources de cache ne sont pas isolées, la méthode recommande de documenter au minimum le `hit ratio` et d'évaluer les flux évités sur le réseau et l'infrastructure.

### Complétion automatique

Quand les données manquent, la méthode recommande :

1. d'identifier si un `CDN` est effectivement utilisé ;
2. d'utiliser un `hit ratio` observé ou documenté ;
3. d'appliquer une hypothèse prudente de cache si aucune mesure n'est disponible ;
4. de documenter séparément les flux évités et les ressources ajoutées.

### Fin de vie

La fin de vie n'est pas modélisée séparément au niveau de la couche `CDN`. Elle est portée par les facteurs des serveurs ou équipements de cache mobilisés.

## Impact opérationnel (usage)

### Profil de consommation

Le rôle opérationnel d'un `CDN` est double :

- réduire la quantité de données circulant sur certains segments ;
- ajouter des ressources de distribution et de cache.

Une écriture conceptuelle de l'impact opérationnel peut être formulée ainsi :

$$
\begin{align*}
&E_{total} = E_{entry} + E_{cache} + (1-H) \times (E_{transit} + E_{datacenter})\htmlClass{unit}{[kWh]}\\
Avec \\
&E_{total} = \text{Consommation totale de la chaîne de distribution}\htmlClass{unit}{[kWh]}\\
&E_{entry} = \text{Consommation du segment d’accès au CDN}\htmlClass{unit}{[kWh]}\\
&E_{cache} = \text{Consommation des nœuds de cache}\htmlClass{unit}{[kWh]}\\
&H = \text{Taux de hit cache}\htmlClass{unit}{[\%]}\\
&E_{transit} = \text{Consommation des segments de transit résiduels}\htmlClass{unit}{[kWh]}\\
&E_{datacenter} = \text{Consommation résiduelle côté datacenter}\htmlClass{unit}{[kWh]}\\
\end{align*}
$$

Ce cadre met en évidence que les gains affichés doivent toujours être reliés à un périmètre clair et à une topologie documentée.

### Facteurs d'ajustement

Les principaux facteurs d'ajustement sont :

- le `hit ratio` effectif ;
- la distance entre utilisateur, `CDN` et datacenter ;
- la nature du contenu distribué ;
- la performance réelle des nœuds de cache.

## Allocation et annualisation

Les impacts des `CDN` et caches sont généralement alloués :

- au prorata des volumes distribués ;
- selon les segments réellement évités ;
- selon la part du contenu effectivement servie depuis le cache.

L'annualisation des ressources de cache se fait via les équipements ou infrastructures correspondants. Les règles générales sont rappelées dans [Allocation et partage des impacts](../../regles/allocation-et-partage-des-impacts).

## Hypothèses & limites

### Hypothèses retenues

- un `CDN` doit être lu comme une couche de transformation des flux, pas comme une réduction automatique d'impact ;
- le `hit ratio` est la variable structurante la plus importante ;
- les effets doivent être répartis entre réseau évité, datacenter évité et infrastructure ajoutée.

### Limitations connues

- les taux de hit cache et les architectures de distribution varient fortement selon les contextes ;
- les ressources réellement mobilisées par les fournisseurs de `CDN` sont rarement observables ;
- les gains affichés sont souvent difficiles à comparer d'un contexte à l'autre.

### Perspectives

- enrichir les conventions D4B sur les architectures de cache ;
- mieux relier les modèles `CDN` aux cas d'usage `web` et `mobile` ;
- proposer un simulateur quand les paramètres d'entrée les plus utiles seront stabilisés.

## Application

Cette section est mobilisée notamment dans :

- [Service web](../../cas-d-usage/services/service-web), pour les contenus distribués à grande échelle ;
- [Mobile](../../cas-d-usage/services/mobile), quand la distribution applicative ou média passe par un `CDN` ;
- [Cloud](../../cas-d-usage/environnements/cloud), quand des services de distribution managés sont utilisés.

## Références

### Données mobilisées

- données de trafic et de distribution quand elles existent
- données réseau et hébergement associées

### Sources

- corpus `inputs/md`
- références réseau et hébergement du dépôt
