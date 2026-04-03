# Alimentation et batterie

## Résumé

Cette section couvre les batteries embarquées, blocs d'alimentation et sous-ensembles de conversion électrique qui participent directement au fonctionnement des équipements numériques. Elle modélise :

- l'impact intrinsèque de fabrication de ces sous-ensembles ;
- leur rôle dans l'impact opérationnel via le rendement, l'autonomie ou les pertes de conversion ;
- leurs règles de rattachement à un équipement complet.

Le niveau de détail varie selon que l'on connaît la capacité de batterie, le type de cellule, le rendement du bloc d'alimentation ou seulement l'archétype de l'équipement.

## Caractéristiques

| Caractéristique | Unité | Valeur par défaut | Plage ou cas typiques | Description |
| --- | --- | --- | --- | --- |
| Type de sous-ensemble | - | archétype générique | batterie embarquée, batterie externe, PSU, bloc secteur | Détermine la logique principale de modélisation |
| Capacité batterie | Wh | selon l'archétype | faible à très élevée | Variable principale pour la fabrication des batteries |
| Technologie de batterie | - | lithium-ion | variantes lithium et assimilées | Influence l'impact matériaux et la durée de vie |
| Rendement de conversion | % | valeur d'archétype | dépend de la qualité du bloc | Agit sur l'énergie réellement nécessaire en usage |
| Nombre de cycles ou durée de vie propre | cycles ou années | valeur documentée | variable selon l'équipement | Sert à juger le remplacement éventuel |
| Nombre d'unités par équipement | - | `1` | 1 à plusieurs | Utile dans les architectures particulières |

## Principe de modélisation

La méthode distingue deux objets proches mais différents :

- la `batterie`, qui porte surtout des impacts de fabrication et des enjeux de durée de vie ;
- l'`alimentation`, qui porte surtout des enjeux de rendement et de conversion électrique.

Quand les données sont connues, la méthode privilégie une approche par caractéristiques, en particulier la capacité de batterie et le rendement. Sinon, elle s'appuie sur des archétypes cohérents avec le type de terminal ou d'équipement.

## Impact intrinsèque (fabrication)

### Méthode de calcul

L'impact intrinsèque peut être estimé :

- à partir d'un facteur par `Wh` ou par famille de batterie ;
- à partir d'un facteur par type de bloc d'alimentation ou d'archétype de `PSU` ;
- ou comme sous-partie de l'équipement complet quand la décomposition détaillée n'est pas disponible.

Le modèle est généralement :

- `variable` pour les batteries, en fonction de la capacité et parfois de la technologie ;
- plus `forfaitaire` pour les alimentations, en fonction de la catégorie d'équipement.

### Complétion automatique

Quand les caractéristiques manquent, la méthode recommande de compléter dans cet ordre :

1. capacité ou référence observée ;
2. fiche technique du produit ou d'un modèle équivalent ;
3. archétype par famille d'équipement ;
4. valeur médiane documentée dans le registre d'hypothèses.

Quand la batterie ou le bloc d'alimentation ne sont pas isolés, leur impact peut être inclus dans l'équipement, à condition de l'expliciter.

### Fin de vie

La fin de vie est rarement modélisée séparément pour ces sous-ensembles. Quand des remplacements sont probables sur la durée de vie de l'équipement, cela doit être traité comme hypothèse explicite plutôt que laissé implicite.

## Impact opérationnel (usage)

### Profil de consommation

Ces sous-ensembles ne génèrent pas à eux seuls l'usage, mais ils modifient la consommation du système :

- une batterie influence le nombre de cycles, le besoin de recharge et parfois les pertes associées ;
- une alimentation influe sur le rendement entre énergie soutirée et énergie utile fournie à l'équipement.

Le profil de consommation est donc modélisé comme un correcteur appliqué à la consommation utile de l'équipement, plus que comme un poste indépendant.

### Facteurs d'ajustement

Les principaux facteurs d'ajustement sont :

- le rendement du bloc d'alimentation ;
- le nombre de cycles de charge et de décharge ;
- le remplacement éventuel de la batterie au cours de la vie de l'équipement ;
- le contexte d'usage, par exemple mobilité forte ou poste fixe.

## Allocation et annualisation

L'impact de l'alimentation et de la batterie est généralement annualisé avec celui de l'équipement. Il peut être alloué :

- selon la durée de vie de l'équipement ;
- selon les usages qui se partagent ce même équipement ;
- avec une hypothèse spécifique de remplacement si la batterie a une durée de vie plus courte.

Les règles générales sont décrites dans [Allocation et partage des impacts](../../regles/allocation-et-partage-des-impacts).

## Hypothèses & limites

### Hypothèses retenues

- la capacité de batterie est une variable plus robuste que les seules allégations marketing d'autonomie ;
- le rendement d'alimentation peut être approché par archétype quand aucune donnée mesurée n'existe ;
- les batteries sont généralement portées au niveau de l'équipement, sauf cas d'étude spécifique.

### Limitations connues

- les données sur les blocs d'alimentation sont souvent plus pauvres que sur les composants de calcul ;
- les effets de vieillissement réel de batterie sont difficiles à représenter sans données d'usage ;
- certaines batteries ou alimentations sont intégrées sans détail public suffisant pour un calcul fin.

### Perspectives

- enrichir les données D4B sur les batteries et sous-ensembles d'alimentation ;
- mieux documenter les cas de remplacement sur la durée de vie ;
- proposer un simulateur quand les paramètres utiles seront suffisamment stabilisés.

## Application

Les applications les plus utiles de ce chapitre apparaissent aujourd'hui dans :

- [Terminaux](../equipements/terminaux), pour les batteries embarquées et l'autonomie ;
- [Mobile](../../cas-d-usage/services/mobile), quand le partage entre phases d'usage et de recharge devient structurant ;
- [Serveurs](../equipements/serveurs), pour les blocs d'alimentation et rendements côté infrastructure.

## Références

### Données mobilisées

- `digital4better/data/data/hardware/devices.*`
- `digital4better/data/data/hardware/laptops.*`
- `digital4better/data/data/hardware/mobiles.*`
- gap explicite sur certaines données structurées de `PSU`

### Sources

- corpus `inputs/md`
- documentation Boavizta sur les composants d'alimentation quand elle est pertinente
