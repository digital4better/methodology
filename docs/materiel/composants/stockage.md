# Stockage

## Résumé

Cette section couvre les principales technologies de stockage mobilisées dans les équipements et infrastructures numériques : `SSD`, `NVMe`, `eMMC`, stockage flash embarqué et `HDD`. Elle modélise :

- l'impact intrinsèque lié à la fabrication et à la capacité ;
- l'impact opérationnel lié à la consommation électrique ;
- les règles de passage du composant à l'usage, notamment en contexte d'hébergement.

Le niveau de granularité dépend de la technologie connue, de la capacité et du contexte d'usage.

## Caractéristiques

| Caractéristique | Unité | Valeur par défaut | Plage ou cas typiques | Description |
| --- | --- | --- | --- | --- |
| Technologie de stockage | - | archétype générique | `SSD`, `NVMe`, `eMMC`, `HDD`, flash embarqué | Détermine la logique de modélisation principale |
| Capacité installée | Go ou To | capacité d'archétype | quelques Go à plusieurs To | Variable centrale du calcul |
| Type d'intégration | - | intégré à l'équipement | embarqué, remplaçable, stockage serveur | Sert à qualifier le contexte |
| Nombre d'unités | - | `1` | 1 à plusieurs dizaines | Utile pour les serveurs ou baies |
| Redondance ou réplication | - | non renseignée | aucune à multiple | Très importante en infrastructure |
| Taux de remplissage | % | selon hypothèse documentée | 0 à 100 % | Influe sur l'allocation dans les services partagés |

## Principe de modélisation

La méthode distingue d'abord les technologies, car un `SSD` et un `HDD` n'ont ni les mêmes impacts de fabrication, ni les mêmes profils de consommation. Elle privilégie une approche par capacité et par technologie, puis affine selon le contexte :

- stockage embarqué d'un terminal ;
- stockage d'un serveur ;
- stockage mutualisé d'une infrastructure ou d'un service.

Quand les données sont trop pauvres, elle recourt à des facteurs forfaitaires par Go et par technologie, en gardant visible le niveau d'incertitude.

## Impact intrinsèque (fabrication)

### Méthode de calcul

L'impact intrinsèque du stockage est généralement estimé en fonction :

- de la technologie ;
- de la capacité ;
- éventuellement du type d'intégration ou de l'usage professionnel / serveur.

Dans les cas les plus simples, un facteur d'impact par Go est utilisé. Dans les cas plus détaillés, des archétypes ou facteurs spécifiques par type de stockage sont mobilisés.

### Complétion automatique

Quand toutes les caractéristiques ne sont pas connues, la méthode recommande :

1. de conserver la technologie observée si elle est connue ;
2. d'inférer la capacité ou l'archétype depuis l'équipement support ;
3. d'utiliser un facteur générique par Go pour la bonne technologie ;
4. de documenter explicitement les hypothèses de redondance quand le stockage est mutualisé.

### Fin de vie

La fin de vie est généralement incluse dans les facteurs intrinsèques disponibles. Quand ce n'est pas le cas, elle reste rarement modélisée séparément au niveau du composant seul.

## Impact opérationnel (usage)

### Profil de consommation

Le profil de consommation dépend fortement de la technologie :

- les stockages flash et `SSD` ont souvent une consommation plus faible mais non nulle, liée à la capacité et à l'activité ;
- les `HDD` présentent des profils différents, avec une sensibilité plus visible aux régimes d'activité mécanique ;
- en contexte mutualisé, le temps d'activation et le niveau de réplication influencent fortement le résultat.

Quand aucune télémétrie précise n'existe, le modèle s'appuie sur une consommation moyenne liée à la capacité, à la durée d'utilisation et au contexte d'hébergement.

### Facteurs d'ajustement

Les ajustements les plus fréquents sont :

- la durée d'occupation ou de stockage ;
- le taux de remplissage ;
- la redondance, la réplication ou les sauvegardes ;
- le `PUE` du site d'hébergement si le stockage est en datacenter.

## Allocation et annualisation

Le stockage se prête bien à une allocation par capacité et par durée. Selon les cas, l'impact peut être réparti :

- au prorata de la capacité occupée ;
- au prorata de la durée de conservation ;
- ou au prorata d'un volume répliqué quand des copies sont maintenues.

L'annualisation reste indispensable pour éviter de comparer un stockage persistant de long terme à un usage ponctuel sans base commune.

## Simulateur

import { StoragePlayGround } from '@site/src/components/storage-playground';

<StoragePlayGround lang="fr" />

## Hypothèses & limites

### Hypothèses retenues

- la technologie et la capacité sont les variables les plus structurantes ;
- les facteurs forfaitaires par Go restent utiles quand la granularité est faible ;
- le contexte d'usage, notamment la redondance, peut modifier fortement le résultat ;
- un stockage mutualisé ne doit pas être alloué comme un disque dédié si ce n'est pas le cas.

### Limitations connues

- les forfaits par Go ne capturent pas toutes les différences de génération ou de gamme ;
- les stratégies de réplication et de sauvegarde sont souvent mal documentées ;
- le lien entre capacité installée et capacité réellement utile peut être incertain ;
- certaines infrastructures masquent les caractéristiques réelles du stockage sous-jacent.

### Perspectives

- enrichir les données D4B selon les technologies de stockage ;
- mieux traiter les cas de stockage mutualisé et multi-répliqué ;
- préciser les profils d'usage pour les contextes cloud et datacenter ;
- proposer un simulateur lorsque les paramètres d'entrée les plus utiles auront été stabilisés.

## Application

Les applications les plus immédiates de ce chapitre se trouvent dans :

- [Cloud](../../cas-d-usage/environnements/cloud), pour les unités de type `Go SSD.h` ou `Go HDD.h` ;
- [Serveurs](../equipements/serveurs), quand le stockage fait partie d'une composition serveur ;
- [Mail](../../cas-d-usage/services/mail), quand le stockage persistant des messages devient significatif.

## Références

### Données mobilisées

- `digital4better/data/data/hardware/storages.*`
- `digital4better/data/data/hardware/servers.*`
- `digital4better/data/data/equipment/*`

### Sources

- `inputs/md/the-dirty-secret-of-ssds-embodied-carbon.md`
- `inputs/md/green-cloud-computing-uba-2021.md`
- corpus `inputs/md`
