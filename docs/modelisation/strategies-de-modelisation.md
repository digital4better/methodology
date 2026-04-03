# Stratégies de modélisation

## Résumé

Tous les objets du numérique ne se modélisent pas de la même façon. Cette page explique quand choisir une approche fine par composants, quand préférer un facteur d'équipement, quand basculer vers une approche système et quand reconstruire un équivalent matériel à partir de données d'usage.

L'objectif n'est pas d'appliquer partout la méthode la plus détaillée possible, mais de choisir le niveau de modélisation le plus robuste au regard :

- des données disponibles ;
- du poids de l'objet dans le résultat ;
- de la précision réellement utile ;
- du risque de pseudo-précision.

## Principe

Le RCP mère distingue deux grandes approches pour réaliser l'évaluation d'un service numérique :

- `approche équipement` : chaque équipement utilisé par le service constitue une donnée primaire ou secondaire. Le service numérique est alors considéré comme une somme d'usages de chaque équipement, chaque usage étant défini à travers une règle d'allocation par rapport aux impacts totaux de l'équipement ;
- `approche système` : un certain nombre d'équipements peuvent être regroupés en un système physique ou virtuel, au niveau duquel les impacts environnementaux ont été déterminés. Le service numérique est alors considéré comme une somme d'usages de chaque système.

Dans la pratique, la méthode D4B utilise quatre stratégies complémentaires :

- `bottom-up composant` ;
- `facteur d’équipement` ;
- `approche système` ;
- `inférence depuis l’usage`.

Ces stratégies peuvent coexister dans une même évaluation, à condition que leur articulation soit explicite et que chaque changement de niveau de modélisation soit documenté.

## Paramètres de choix

Le choix de la stratégie dépend principalement de :

- la disponibilité des données : caractéristiques détaillées, archétypes, facteurs ou seuls usages observés ;
- le niveau de maîtrise du périmètre : matériel connu, infrastructure opérée par un tiers, système opaque ;
- la sensibilité du résultat : certains postes pèsent beaucoup plus que d'autres dans le résultat final ;
- le besoin d'interprétation : un niveau plus fin n'est utile que s'il apporte une vraie valeur de lecture ;
- le risque de double comptage ou de rupture de cohérence avec d'autres chapitres.

## Les grandes stratégies

### Bottom-up composant

Cette stratégie est adaptée quand :

- la composition matérielle est connue ou reconstruisable ;
- l'objet évalué est critique dans le résultat ;
- la granularité apporte une vraie valeur d'interprétation.

Elle est particulièrement pertinente pour :

- les [Processeurs et accélérateurs](../materiel/composants/processeurs-et-accelerateurs) ;
- la [Mémoire vive](../materiel/composants/memoire-vive) ;
- le [Stockage](../materiel/composants/stockage) ;
- certains [Serveurs](../materiel/equipements/serveurs) et cas d'[IA générative](../cas-d-usage/services/ia-generative).

### Facteur d’équipement

Cette stratégie est adaptée quand :

- l'objet est connu au niveau équipement mais pas au niveau composant ;
- des facteurs suffisamment robustes existent ;
- l'objectif est de rester lisible à coût méthodologique raisonnable.

Elle est souvent mobilisée pour :

- les [Terminaux](../materiel/equipements/terminaux) ;
- les [Équipements réseau actifs](../materiel/equipements/equipements-reseau-actifs) ;
- certains cas de [Parc informatique](../cas-d-usage/environnements/parc-informatique).

### Approche système

Cette stratégie est adaptée quand :

- le périmètre support est partagé ou opaque ;
- les ressources individuelles ne sont pas observables ;
- un facteur ou un modèle de système est plus fiable qu'une décomposition spéculative.

Elle est particulièrement utile pour :

- le [Réseau WAN](../materiel/reseau-et-infrastructure/reseau-wan) ;
- le [Réseau d’accès mobile (RAN)](../materiel/reseau-et-infrastructure/reseau-d-acces-mobile-ran) ;
- certains [Datacenter](../materiel/reseau-et-infrastructure/datacenter) ;
- certains périmètres [Cloud](../cas-d-usage/environnements/cloud).

### Inférence depuis l’usage

Cette stratégie est adaptée quand :

- on part de données d'usage, de facturation ou de télémétrie ;
- l'infrastructure physique sous-jacente n'est pas directement connue ;
- il faut reconstruire un équivalent matériel calculable.

Elle est particulièrement utile pour :

- [Cloud](../cas-d-usage/environnements/cloud) ;
- [Service web](../cas-d-usage/services/service-web) ;
- [Mobile](../cas-d-usage/services/mobile) ;
- [IA générative](../cas-d-usage/services/ia-generative), quand on part de `FLOPs`, `GPUh` ou tokens.

## Comment choisir

Le choix doit être explicite et répondre à quatre questions simples :

1. Quel est l'objet réellement observable : composant, équipement, système ou usage ?
2. Quelle est l'unité d'analyse réellement pertinente pour cet objet ?
3. Quel niveau de détail améliore réellement la qualité du résultat ?
4. À partir de quel point le raffinement devient-il spéculatif ?

En pratique :

- utiliser une approche plus fine quand elle repose sur de vraies données ;
- préférer une approche plus robuste à une précision artificielle ;
- documenter les changements de stratégie à l'intérieur d'un même chapitre ou d'un même cas d'usage ;
- vérifier que la stratégie choisie reste cohérente avec les règles d'[Allocation et partage des impacts](../regles/allocation-et-partage-des-impacts) et de [Double comptabilisation](../regles/double-comptabilisation).

## Application

Cette page sert de guide de lecture pour l'ensemble de la méthode :

- [Modélisation d’un équipement](./modelisation-d-un-equipement) traduit ces stratégies au niveau d'un objet matériel ;
- [Modélisation d’un service](./modelisation-d-un-service) montre comment les articuler dans un cas d'usage ;
- les chapitres `Matériel` et `Cas d’usage` appliquent ensuite l'une ou l'autre de ces stratégies selon le contexte.

## Hypothèses & limites

### Hypothèses retenues

- une méthode plus fine n'est pas toujours plus juste ;
- une méthode plus forfaitaire n'est pas forcément moins crédible si elle est mieux documentée ;
- plusieurs stratégies peuvent coexister dans une même évaluation, à condition de garder une traçabilité claire.

### Limitations connues

- la frontière entre approche équipement et approche système n'est pas toujours nette ;
- certains objets changent de stratégie selon la qualité des données disponibles ;
- cette page donne un cadre de choix mais ne remplace pas les règles détaillées des chapitres spécialisés.

### Perspectives

- formaliser davantage des arbres de décision par grande famille d'objet ;
- mieux relier ces stratégies au registre des hypothèses par défaut ;
- proposer à terme des aides au choix ou simulateurs de stratégie quand les conventions seront stabilisées.

## Références

### Données mobilisées

- selon les cas :
  - `digital4better/data/data/hardware/*`
  - `digital4better/data/data/equipment/*`
  - `digital4better/data/data/cloud/*`
  - `digital4better/data/data/factor/*`

### Sources

- Référentiel ADEME / ARCEP
- Boavizta
- corpus `inputs/md`, notamment `Green Cloud Computing`, `PAIA` et `imec`
