# Mémoire vive

## Résumé

Cette section couvre la mémoire vive système et les mémoires utilisées pour le calcul intensif, notamment `RAM`, `VRAM` et `HBM`. Elle modélise :

- l'impact intrinsèque de fabrication ;
- la consommation électrique en usage ;
- les règles de rattachement à un équipement ou à un serveur.

Le niveau de granularité dépend du type de mémoire connu et de la capacité installée. Dans la plupart des cas, la capacité reste la variable structurante la plus robuste.

## Caractéristiques

| Caractéristique | Unité | Valeur par défaut | Plage ou cas typiques | Description |
| --- | --- | --- | --- | --- |
| Type de mémoire | - | archétype générique | `RAM`, `VRAM`, `HBM`, autres variantes | Détermine la famille technique et le profil d'usage |
| Capacité installée | Go | capacité d'archétype | quelques Go à plusieurs To | Variable principale de modélisation |
| Nombre de modules ou puces | - | selon l'archétype | dépend de l'équipement | Utile pour passer de la capacité à la structure physique |
| Bande passante ou performance mémoire | Go/s | non renseignée si absente | dépend du type | Sert surtout dans les cas intensifs |
| Mémoire dédiée à un accélérateur | Go | selon le modèle | nulle à plusieurs dizaines de Go | Important pour les cas IA et GPU |
| Nombre d'unités par équipement | - | selon l'archétype | 1 à plusieurs dizaines | Sert au rattachement à l'équipement |

## Principe de modélisation

La méthode privilégie une modélisation par capacité, car c'est la donnée la plus souvent disponible et la plus exploitable. Elle devient plus fine quand le type exact de mémoire est connu, notamment pour distinguer :

- une mémoire système standard ;
- une mémoire graphique ou dédiée ;
- une mémoire hautes performances de type `HBM`.

Quand le détail manque, la mémoire est reconstruite à partir de l'archétype de l'équipement ou du serveur.

## Impact intrinsèque (fabrication)

### Méthode de calcul

L'impact intrinsèque est généralement estimé à partir :

- d'un facteur par Go de mémoire ;
- ou d'un facteur par module quand cette information est plus robuste ;
- puis d'une annualisation sur la durée de vie de l'équipement qui embarque cette mémoire.

La capacité reste donc la variable principale, mais le type de mémoire peut justifier des facteurs différents.

### Complétion automatique

Quand les caractéristiques manquent, la méthode recommande :

1. d'utiliser la capacité observée si elle est connue ;
2. d'inférer le type de mémoire à partir de l'équipement ou de l'accélérateur associé ;
3. de recourir à un archétype de capacité et de type documenté ;
4. de signaler explicitement les cas où la mémoire n'est connue qu'indirectement.

### Fin de vie

Comme pour beaucoup de composants, la fin de vie est rarement isolée au niveau de la mémoire seule. Elle est généralement incluse dans le facteur embarqué utilisé, ou sinon laissée implicite avec mention de cette limite.

## Impact opérationnel (usage)

### Profil de consommation

La consommation de la mémoire dépend en premier lieu :

- de la capacité installée ;
- du type de mémoire ;
- du niveau d'activité et de sollicitation ;
- du contexte d'intégration, par exemple terminal, serveur ou accélérateur.

La mémoire présente souvent un profil moins directement corrélé à la charge que le calcul pur. Une partie de sa consommation reste liée à la simple présence de capacité active, même hors pic de calcul.

### Facteurs d'ajustement

Les ajustements les plus utiles sont :

- le temps réel d'activation ou d'utilisation ;
- la part de mémoire effectivement mobilisée par l'usage étudié ;
- la mutualisation dans un serveur ou un équipement partagé ;
- les facteurs de site comme le `PUE`, appliqués au bon niveau système.

## Allocation et annualisation

La mémoire est souvent allouée :

- au prorata de la capacité effectivement mobilisée ;
- ou au prorata du temps d'utilisation de l'équipement qui la porte ;
- ou via une unité technique comme le `Go.h` dans certains contextes d'infrastructure.

L'annualisation se fait au niveau du composant ou de l'équipement selon la qualité des données disponibles.

## Simulateur

L'impact de la mémoire vive se lit au niveau de l'équipement qui l'embarque :

import { EquipmentPlayGround } from '@site/src/components/equipment-playground';

<EquipmentPlayGround lang="fr" filter={["laptop", "desktop_professional", "vm_small", "vm_medium", "vm_large"]} />

## Hypothèses & limites

### Hypothèses retenues

- la capacité est la variable la plus robuste pour modéliser la mémoire ;
- le type de mémoire affine le calcul quand il est connu ;
- les facteurs d'impact peuvent différer entre mémoire standard et mémoire dédiée aux accélérateurs ;
- la mémoire est le plus souvent évaluée dans le cadre d'un équipement ou d'un serveur complet.

### Limitations connues

- les données publiques restent hétérogènes selon les technologies mémoire ;
- les cas de haute performance sont mieux documentés que les cas bureautiques intermédiaires ;
- l'usage réel de la mémoire est rarement observé avec assez de finesse pour une allocation parfaite ;
- la frontière entre mémoire embarquée dans un accélérateur et mémoire système n'est pas toujours triviale.

### Perspectives

- enrichir les données D4B sur `VRAM` et `HBM` ;
- mieux distinguer la capacité installée de la capacité réellement mobilisée ;
- relier plus finement mémoire et accélérateurs dans les cas IA ;
- proposer un simulateur lorsque les paramètres d'entrée seront stabilisés.

## Application

Les usages les plus représentatifs de ce chapitre se retrouvent aujourd'hui dans :

- [IA générative](../../cas-d-usage/services/ia-generative), pour la mémoire des serveurs et des accélérateurs ;
- [Serveurs](../equipements/serveurs), quand la mémoire fait partie d'une composition complète ;
- [Cloud](../../cas-d-usage/environnements/cloud), quand la mémoire est ramenée à des unités de type `Go RAM.h`.

## Références

### Données mobilisées

- `digital4better/data/data/hardware/memories.*`
- `digital4better/data/data/hardware/accelerators.*`
- `digital4better/data/data/hardware/servers.*`

### Sources

- `inputs/md/green-cloud-computing-uba-2021.md`
- corpus `inputs/md`
