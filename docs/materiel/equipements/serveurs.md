# Serveurs

## Résumé

Cette section couvre les serveurs utilisés dans les environnements d'hébergement, le cloud privé ou certains services intensifs comme l'IA. Elle modélise :

- l'impact intrinsèque de l'équipement complet ;
- l'impact opérationnel en usage ;
- la répartition des impacts entre composants, services et charges hébergées.

Le niveau de granularité varie entre une approche détaillée par composants et une approche plus forfaitaire par archétype de serveur.

## Caractéristiques

| Caractéristique | Unité | Valeur par défaut | Plage ou cas typiques | Description |
| --- | --- | --- | --- | --- |
| Type de serveur | - | archétype générique | rack, lame, serveur GPU, serveur de stockage | Détermine la famille d'équipement |
| Nombre de `CPU` | - | selon archétype | 1 à plusieurs sockets | Sert à la composition du serveur |
| Nombre de `GPU` ou accélérateurs | - | `0` | 0 à plusieurs unités | Important pour les usages intensifs |
| Capacité mémoire | Go | selon archétype | dizaines de Go à plusieurs To | Variable structurante de composition |
| Capacité de stockage | Go ou To | selon archétype | faible à très élevée | Dépend du rôle du serveur |
| Puissance ou consommation de référence | W ou kWh/an | archétype documenté | dépend de la gamme | Sert à l'impact opérationnel |
| Durée de vie de référence | années | valeur documentée | souvent 5 à 6 ans | Sert à l'annualisation |
| Nombre d'unités supportées | - | `1` | selon le contexte | Permet la consolidation d'un parc ou d'un site |

## Principe de modélisation

La méthode privilégie une approche `bottom-up` quand la composition du serveur est connue : `CPU`, mémoire, stockage, accélérateurs et éléments structurels sont alors assemblés pour produire l'impact de l'équipement.

Quand le détail manque, elle utilise des archétypes serveur, car ils restent plus crédibles qu'une reconstruction trop spéculative. Trois cas sont distingués :

- composition détaillée connue ;
- profil serveur partiellement connu ;
- simple catégorie de serveur connue, avec recours à un archétype.

Cette section s'articule directement avec [Modélisation d’un équipement](../../modelisation/modelisation-d-un-equipement) et avec les chapitres composants associés.

## Impact intrinsèque (fabrication)

### Méthode de calcul

L'impact intrinsèque d'un serveur peut être calculé :

- soit par somme de ses composants principaux ;
- soit à partir d'un facteur serveur ou d'un archétype documenté ;
- soit par un modèle hybride combinant composants connus et éléments structurels forfaitaires.

Cette approche permet de distinguer :

- les serveurs généralistes ;
- les serveurs orientés calcul ;
- les serveurs fortement accélérés ou orientés stockage.

### Complétion automatique

Quand des caractéristiques manquent, la méthode recommande :

1. de conserver les composants connus ;
2. de compléter les composants manquants à partir du type de serveur ;
3. d'utiliser un archétype de serveur si la composition reste trop incomplète ;
4. de documenter explicitement les hypothèses sur mémoire, stockage et accélérateurs.

### Fin de vie

La fin de vie est généralement intégrée dans les facteurs intrinsèques ou archétypes serveur. Quand le modèle repose sur une décomposition composant par composant, il faut vérifier si cette phase est déjà comprise dans les facteurs mobilisés pour éviter les doublons ou omissions.

## Impact opérationnel (usage)

### Profil de consommation

Le serveur présente en général trois régimes utiles à distinguer :

- un régime `idle`, rarement nul ;
- un régime de charge moyenne ;
- un régime élevé ou de pointe.

La consommation dépend :

- de la charge calcul ;
- des accélérateurs activés ;
- de la mémoire et du stockage ;
- du niveau de mutualisation et de virtualisation.

Quand les données détaillées manquent, une consommation annuelle ou une puissance de référence par archétype peut être utilisée.

### Facteurs d'ajustement

Les principaux facteurs d'ajustement sont :

- le taux de charge réel du serveur ;
- le taux d'allocation à un service ou à une application ;
- la virtualisation ou la mutualisation entre usages ;
- le `PUE` et, selon les critères retenus, `WUE` ou `REF` au niveau du site ;
- la durée de fonctionnement réelle sur la période étudiée.

## Allocation et annualisation

Les impacts d'un serveur sont presque toujours partagés entre plusieurs usages. L'allocation peut se faire :

- au prorata du temps d'usage ;
- au prorata des ressources mobilisées, par exemple `CPU`, mémoire ou `GPU` ;
- au prorata de la charge ou de la capacité réservée.

L'annualisation repose sur la durée de vie de référence du serveur. La cohérence entre annualisation du serveur et allocation des usages est essentielle pour éviter les doubles comptes.

## Hypothèses & limites

### Hypothèses retenues

- un archétype serveur documenté vaut mieux qu'une décomposition fictive ;
- la charge moyenne ou la consommation annuelle de référence peut servir de base quand aucune mesure directe n'est disponible ;
- les composants non détaillés peuvent être couverts par des éléments structurels ou un facteur système ;
- le contexte datacenter doit être traité séparément pour appliquer correctement `PUE`, `WUE` ou `REF`.

### Limitations connues

- les charges réelles sont rarement stables dans le temps ;
- les inventaires serveur sont souvent incomplets sur les composants internes ;
- la virtualisation et la mutualisation compliquent l'allocation entre services ;
- le serveur ne doit pas être interprété indépendamment de son contexte de site et de réseau.

### Perspectives

- mieux distinguer les archétypes de serveurs par usage ;
- affiner les profils de charge et les consommations en contexte réel ;
- enrichir les données D4B sur les serveurs accélérés ;
- proposer un simulateur pour les serveurs quand la composition et les hypothèses de charge seront suffisamment stabilisées.

## Application

Des applications concrètes de cette section existent déjà dans :

- [IA générative](../../cas-d-usage/services/ia-generative), pour la part serveur support des `GPU` ;
- [Infrastructure d’hébergement](../../cas-d-usage/environnements/infrastructure-d-hebergement), pour l'évaluation d'environnements maîtrisés ;
- [Cloud](../../cas-d-usage/environnements/cloud), quand des ressources facturées sont rapprochées d'archétypes serveur.

## Références

### Données mobilisées

- `digital4better/data/data/hardware/servers.*`
- `digital4better/data/data/hardware/cpus.*`
- `digital4better/data/data/hardware/memories.*`
- `digital4better/data/data/hardware/storages.*`

### Sources

- `inputs/md/green-cloud-computing-uba-2021.md`
- `inputs/md/intended-uses-and-limitations-of-the-paia-model.md`
- corpus `inputs/md`
