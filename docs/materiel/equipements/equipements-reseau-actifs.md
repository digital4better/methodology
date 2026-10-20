# Équipements réseau actifs

Cette section couvre les switches, routeurs, points d'accès et appliances réseau comparables. Elle modélise leur fabrication, leur consommation en usage et leur répartition entre services, utilisateurs ou volumes transportés.

Un inventaire physique se distingue d'un facteur système en `kWh/Go`. Ces représentations ne peuvent se compléter que sur des périmètres sans recouvrement.

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

Des actifs observables permettent une approche par inventaire ou archétype d'équipement.[^source-1][^donnees-modele] L'approche système intervient lorsque ce détail n'est pas disponible.

Un équipement connu associe un impact intrinsèque, une consommation en usage et une règle d'allocation entre ports, flux, services ou utilisateurs.

## Impact intrinsèque (fabrication)

### Méthode de calcul

| Données disponibles | Représentation retenue |
| --- | --- |
| Type d’équipement connu | Facteur correspondant à la famille réseau. |
| Ports ou classe de débit connus | Archétype documenté de capacité comparable. |
| Sous-ensembles identifiés | Modèle hybride complétant les éléments connus sans recouvrement. |

Les compositions détaillées étant moins souvent documentées que pour les serveurs, le calcul reste généralement plus forfaitaire.

### Quand une donnée manque {#complétion-automatique}

Une puissance inconnue peut être remplacée par celle d’un équipement de référence comparable. Le nombre de ports ne suffit pas : le débit, les fonctions actives et l’alimentation éventuelle d’autres appareils doivent aussi correspondre.

| Situation | Exemple fictif |
| --- | --- |
| **Au départ** | Un switch possède **24 ports**, mais aucune mesure de puissance n’est disponible. |
| **Référence choisie** | Un profil de switch à 24 ports, de même classe de débit et de fonctions, retient **30 W**. Cette puissance est supposée pour l’exemple. |
| **Dans le calcul** | La consommation est estimée à partir de **30 W et du temps de fonctionnement**. Le résultat indique « puissance de référence », et non « puissance mesurée ». |

Une fiche technique compatible est préférable à un profil générique. Sans référence suffisamment proche, la consommation reste non évaluée. La source et les conditions de fonctionnement accompagnent toute estimation ; le débit nominal seul ne détermine pas l’impact de fabrication.

### Fin de vie

La fin de vie est généralement intégrée dans les facteurs intrinsèques ou archétypes d'équipements réseau. Si ce n'est pas le cas, l'absence de modélisation spécifique doit être mentionnée.

## Impact opérationnel (usage)

### Profil de consommation

<dl className="model-profiles">
  <div><dt>Charge faible</dt><dd>Une consommation subsiste même lorsque le trafic est faible ou nul.</dd></div>
  <div><dt>Sensibilité au trafic</dt><dd>Certaines catégories consomment peu différemment lorsque la charge varie.</dd></div>
  <div><dt>Interfaces et fonctions</dt><dd>Les interfaces actives, le débit et les fonctions avancées peuvent modifier la puissance.</dd></div>
</dl>

En l'absence de courbe détaillée, une puissance ou une consommation annuelle de référence par archétype peut être utilisée.

### Facteurs d'ajustement

La consommation dépend du temps d'activation, de l'occupation des ports et de la charge réseau. Le `PUE` ou d'autres facteurs de site interviennent si l'équipement appartient au périmètre de l'environnement d'hébergement concerné.

## Allocation et annualisation

L'impact intrinsèque est annualisé sur la durée de vie, puis réparti selon l'objet évalué. La clé peut reposer sur le temps, les ports mobilisés, le débit, le volume transporté ou une autre convention justifiée par le cas d'usage.

Les règles générales sont décrites dans [Allocation et partage des impacts](../../regles/allocation-et-partage-des-impacts).

## Hypothèses & limites

### Hypothèses retenues

Un archétype documenté est préférable à une décomposition spéculative. Une puissance de référence peut remplacer une mesure absente si les conditions d'usage sont explicites. L'équipement physique reste distinct du réseau système à l'échelle `LAN`, `WAN` ou `RAN`.

### Limitations connues

Les inventaires sont souvent incomplets et les consommations peu documentées à une granularité fine. Un facteur réseau agrégé peut déjà couvrir les équipements inventoriés : leur addition sur un même périmètre créerait un double compte.

### Perspectives

Les améliorations portent sur des archétypes par classe d'équipement et des profils de charge mieux documentés. Un simulateur dédié ne serait pertinent qu'avec des paramètres suffisamment stabilisés.

## Application

[Réseau LAN](../reseau-et-infrastructure/reseau) utilise les actifs locaux inventoriés. [Infrastructure d’hébergement](../../cas-d-usage/environnements/infrastructure-d-hebergement) couvre les équipements réseau connus du site. [Service web](../../cas-d-usage/services/service-web) peut intégrer une contribution locale ou d'entreprise explicitement évaluée.

[^source-1]: MIT Materials Systems Laboratory / ICT Benchmarking, [Intended Uses and Limitations of the PAIA Model](https://p1-ofp.static.pub/ShareResource/social_responsibility/PAIA_Intended_Use/PAIA_Intended_Use.pdf), document non daté, sections « Limitations », « Server tool » et « Network switch tool ».

[^donnees-modele]: `data/equipment/*`. [Digital4Better, catalogue de données, instantané 77cae4a](https://github.com/digital4better/data/tree/77cae4a58fadd5deb3b8d4e5577020da08f780d8).
