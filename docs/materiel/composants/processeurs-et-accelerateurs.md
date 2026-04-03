# Processeurs et accélérateurs

## Résumé

Cette section couvre les `CPU`, `GPU`, `NPU`, `TPU` et autres accélérateurs pertinents pour les usages numériques. Elle modélise principalement :

- l'impact intrinsèque lié à la fabrication du composant ;
- l'impact opérationnel lié à sa consommation électrique en usage ;
- les règles de complétion quand toutes les caractéristiques ne sont pas connues.

Le niveau de granularité visé dépend fortement des données disponibles. Quand un modèle précis est connu, la méthode privilégie une lecture par caractéristiques. Quand seule la famille d'équipement est connue, elle s'appuie sur des archétypes.

## Caractéristiques

| Caractéristique | Unité | Valeur par défaut | Plage ou cas typiques | Description |
| --- | --- | --- | --- | --- |
| Type de composant | - | archétype générique | `CPU`, `GPU`, `NPU`, `TPU`, accélérateur spécialisé | Détermine la famille technique et la logique de calcul principale |
| Modèle ou référence | - | modèle inconnu | selon le constructeur ou la gamme | Permet de rattacher le composant à un référentiel plus précis |
| Nombre d'unités de calcul ou de cœurs | - | valeur d'archétype | selon la génération et la gamme | Sert à qualifier la capacité de calcul et la comparaison entre modèles |
| `TDP` ou puissance nominale | W | valeur constructeur ou archétype | très variable selon la gamme | Sert de base à la modélisation de la consommation en usage |
| Mémoire associée ou embarquée | Go | selon le modèle | nulle à plusieurs dizaines de Go | Particulièrement importante pour les accélérateurs |
| Surface de die ou taille de package | mm² | non renseignée si absente | dépend de la technologie | Utile quand la modélisation remonte vers les semi-conducteurs |
| Nombre d'unités par équipement | - | `1` | 1 à plusieurs dizaines | Nécessaire pour le passage du composant à l'équipement |

## Principe de modélisation

La méthode retient en priorité une approche `bottom-up` quand les caractéristiques du composant sont connues, car elle permet de mieux distinguer les différences entre familles et générations de processeurs. Elle bascule vers une approche plus forfaitaire quand seules la famille ou la gamme sont connues.

Trois cas sont distingués :

- composant précisément identifié : utilisation des caractéristiques observées ou documentées ;
- composant partiellement connu : rattachement à un archétype de même famille ;
- composant inconnu mais équipement connu : inférence à partir du type d'équipement et du contexte d'usage.

Cette logique complète les chapitres [Semi-conducteurs](../materiaux/semi-conducteurs) et [Modélisation d’un équipement](../../modelisation/modelisation-d-un-equipement).

## Impact intrinsèque (fabrication)

### Méthode de calcul

L'impact intrinsèque des processeurs et accélérateurs dépend d'abord de leur procédé de fabrication, de leur complexité et de leur densité matérielle. Quand une donnée de référence fiable existe, le calcul se fait à partir :

- d'un facteur constructeur ou d'un facteur issu du référentiel D4B ;
- ou d'un archétype par famille de composant ;
- puis d'une annualisation au niveau de l'équipement ou du service qui l'utilise.

Le modèle peut donc être :

- `variable`, quand il dépend de caractéristiques comme le type, la génération, la mémoire associée ou la surface ;
- `forfaitaire`, quand seul un facteur d'impact par composant ou par famille est disponible.

### Complétion automatique

Quand certaines caractéristiques manquent, la méthode recommande de compléter dans cet ordre :

1. modèle exact connu dans un référentiel documenté ;
2. modèle voisin de même famille et même gamme ;
3. archétype générique par type de composant ;
4. valeur médiane ou règle de prudence explicitement documentée.

La complétion doit rester visible : un accélérateur haut de gamme ne doit pas être ramené à un `CPU` standard par simple commodité.

### Fin de vie

La fin de vie n'est généralement pas modélisée séparément au niveau du processeur seul. Quand elle est prise en compte, elle est le plus souvent déjà intégrée dans le facteur d'impact intrinsèque utilisé. Si ce n'est pas le cas, l'absence de modélisation spécifique doit être explicitée.

## Impact opérationnel (usage)

### Profil de consommation

Le profil de consommation varie fortement selon la famille de composant :

- les `CPU` présentent souvent une consommation progressive entre `idle`, charge moyenne et charge élevée ;
- les `GPU` et accélérateurs présentent plus souvent des régimes de calcul soutenus, parfois proches de leur puissance nominale ;
- les accélérateurs spécialisés peuvent avoir des profils plus stables mais très dépendants du type de tâche.

Quand aucune courbe détaillée n'est disponible, la méthode utilise au minimum :

- une puissance nominale ou un `TDP` documenté ;
- un profil de charge simplifié ;
- une durée d'utilisation cohérente avec le cas d'usage.

### Facteurs d'ajustement

Les principaux facteurs d'ajustement sont :

- le taux d'utilisation réel du composant ;
- le `MFU` ou équivalent pour les accélérateurs de calcul intensif ;
- la mutualisation au niveau du serveur ou de l'équipement hôte ;
- le `PUE`, qui ne doit être appliqué qu'au bon niveau système ou datacenter, pas deux fois.

## Allocation et annualisation

Un processeur ou un accélérateur n'est presque jamais évalué isolément dans l'usage réel. Son impact est généralement :

- annualisé sur sa durée de vie ;
- porté par un équipement, puis réparti entre usages ;
- alloué selon un indicateur cohérent, par exemple `CPUh`, `GPUh`, temps d'utilisation ou part de charge.

Les règles générales d'allocation sont décrites dans [Allocation et partage des impacts](../../regles/allocation-et-partage-des-impacts).

## Hypothèses & limites

### Hypothèses retenues

- la puissance nominale et les caractéristiques constructeur sont utilisables comme base de modélisation quand elles sont bien documentées ;
- un archétype de famille est préférable à une valeur arbitraire quand le modèle exact est inconnu ;
- l'impact intrinsèque est souvent mieux documenté en `GWP` qu'en multi-critères ;
- l'impact du composant est généralement porté dans un équipement ou un serveur, puis redistribué.

### Limitations connues

- les puissances réelles varient fortement selon les charges, l'ordonnancement et la couche logicielle ;
- les données publiques sont plus riches pour certains `GPU` que pour les `CPU` ou accélérateurs spécialisés ;
- l'effet de la mémoire embarquée, du packaging avancé ou du refroidissement reste parfois mal isolé ;
- certains facteurs d'impact embarqué restent agrégés au niveau de l'équipement plutôt qu'au niveau du composant.

### Perspectives

- mieux relier les caractéristiques des composants aux chapitres `Semi-conducteurs` et `Matériaux` ;
- enrichir le référentiel D4B sur les accélérateurs spécialisés ;
- intégrer des profils de consommation plus fins selon la charge et le type d'usage ;
- proposer un simulateur quand le modèle d'entrée sera suffisamment stabilisé.

## Application

Les applications les plus pertinentes de ce chapitre apparaissent aujourd'hui dans :

- [IA générative](../../cas-d-usage/services/ia-generative), pour les `GPU` et accélérateurs ;
- [Cloud](../../cas-d-usage/environnements/cloud), pour les unités pivot de type `vCPU.h` et `GPU.h` ;
- [Serveurs](../equipements/serveurs), quand les composants sont modélisés au sein d'un équipement complet.

## Références

### Données mobilisées

- `digital4better/data/data/hardware/cpus.*`
- `digital4better/data/data/hardware/accelerators.*`

### Sources

- `inputs/md/green-cloud-computing-uba-2021.md`
- `inputs/md/acv-gp-pour-intelligence-artificielle.md`
- `inputs/md/more-than-carbon-cradle-to-grave-environmental-impacts-of-genai-training-on-the-nvidia-a100-gpu.md`
