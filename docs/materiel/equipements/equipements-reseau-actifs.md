# Équipements réseau actifs

## Résumé

Cette section couvre les équipements réseau actifs utilisés pour faire circuler, aiguiller ou distribuer les données, notamment :

- switches ;
- routeurs ;
- points d'accès ;
- appliances réseau actives comparables.

Elle modélise :

- l'impact intrinsèque de fabrication de ces équipements ;
- leur impact opérationnel en usage ;
- leur répartition entre usages, services ou volumes transportés.

Ces équipements doivent être distingués des approches purement systémiques en `kWh/Go` lorsqu'un inventaire physique, une composition type ou une topologie réseau est disponible.

## Caractéristiques

| Caractéristique | Unité | Valeur par défaut | Plage ou cas typiques | Description |
| --- | --- | --- | --- | --- |
| Type d'équipement réseau | - | archétype générique | switch, routeur, point d'accès, appliance | Détermine la famille de modélisation |
| Nombre de ports ou interfaces | - | selon l'archétype | faible à très élevé | Sert à qualifier la capacité de l'équipement |
| Débit nominal | Gb/s | valeur d'archétype | selon la gamme | Utile pour les comparaisons entre classes d'équipement |
| Consommation de référence | W ou kWh/an | valeur documentée | variable selon la capacité | Sert à l'impact opérationnel |
| Taux d'utilisation | % | profil moyen | faible à soutenu | Sert à l'allocation entre usages |
| Durée de vie de référence | années | valeur d'archétype | souvent 5 à 8 ans | Sert à l'annualisation |

## Principe de modélisation

La méthode privilégie :

- une approche par inventaire ou archétype d'équipement réseau quand les actifs sont observables ;
- une approche plus systémique au niveau réseau seulement quand la granularité des équipements n'est pas disponible.

Quand l'équipement est connu, il est préférable de le modéliser comme un équipement à part entière, avec :

- un impact intrinsèque de fabrication ;
- une consommation de référence en usage ;
- une règle d'allocation entre ports, flux, services ou utilisateurs.

## Impact intrinsèque (fabrication)

### Méthode de calcul

L'impact intrinsèque peut être estimé :

- à partir d'un facteur par type d'équipement réseau ;
- à partir d'un archétype par classe de débit ou de nombre de ports ;
- ou par un modèle hybride si certains sous-ensembles sont connus.

Dans la plupart des cas, l'approche reste plus forfaitaire que pour un serveur, car les compositions détaillées sont moins souvent documentées.

### Complétion automatique

Quand les caractéristiques manquent, la méthode recommande :

1. d'identifier la famille d'équipement ;
2. de rattacher l'équipement à une classe cohérente de ports ou de débit ;
3. d'utiliser un archétype réseau documenté ;
4. de consigner explicitement le niveau de confiance.

### Fin de vie

La fin de vie est généralement intégrée dans les facteurs intrinsèques ou archétypes d'équipements réseau. Si ce n'est pas le cas, l'absence de modélisation spécifique doit être mentionnée.

## Impact opérationnel (usage)

### Profil de consommation

Les équipements réseau actifs présentent souvent :

- une consommation non nulle même à faible charge ;
- une faible élasticité à la charge pour certaines catégories ;
- des écarts plus sensibles quand le nombre d'interfaces actives, le débit ou certaines fonctions avancées augmentent.

Quand aucune courbe détaillée n'est disponible, une consommation annuelle ou une puissance de référence par archétype peut être utilisée.

### Facteurs d'ajustement

Les principaux facteurs d'ajustement sont :

- le temps d'activation réel ;
- le taux d'occupation des ports ou interfaces ;
- le niveau de charge réseau ;
- le `PUE` ou autres facteurs de site si l'équipement est hébergé dans un environnement maîtrisé.

## Allocation et annualisation

L'impact des équipements réseau actifs est annualisé sur leur durée de vie, puis alloué selon l'objet évalué. L'allocation peut reposer :

- sur le temps d'usage ;
- sur le nombre de ports ou interfaces mobilisés ;
- sur le débit ou le volume transporté ;
- sur une clé simplifiée cohérente avec le cas d'usage.

Les règles générales sont décrites dans [Allocation et partage des impacts](../../regles/allocation-et-partage-des-impacts).

## Hypothèses & limites

### Hypothèses retenues

- un archétype réseau documenté est préférable à une décomposition spéculative ;
- la consommation d'usage peut être approchée à partir d'une puissance de référence quand aucune mesure directe n'est disponible ;
- l'équipement réseau doit être distingué du réseau systémique modélisé à l'échelle `LAN`, `WAN` ou `RAN`.

### Limitations connues

- les inventaires d'équipements réseau sont souvent incomplets hors contextes spécialisés ;
- les consommations réelles sont peu documentées à granularité fine ;
- il existe un risque de double comptage si un même périmètre combine à la fois des équipements inventoriés et un facteur réseau agrégé.

### Perspectives

- enrichir les archétypes D4B par classe d'équipement réseau ;
- mieux distinguer les consommations selon les profils de charge ;
- proposer un simulateur pour certains équipements réseau quand les paramètres utiles seront suffisamment stabilisés.

## Application

Cette section est mobilisée directement dans :

- [Réseau LAN](../reseau-et-infrastructure/reseau-lan), quand le réseau local est modélisé par inventaire ;
- [Infrastructure d’hébergement](../../cas-d-usage/environnements/infrastructure-d-hebergement), quand les équipements réseau du site sont connus ;
- [Service web](../../cas-d-usage/services/service-web), quand une part réseau locale ou d'entreprise est évaluée explicitement.

## Références

### Données mobilisées

- `digital4better/data/data/hardware/networks.*`
- `digital4better/data/data/equipment/*`

### Sources

- `inputs/md/intended-uses-and-limitations-of-the-paia-model.md`
- corpus `inputs/md`
