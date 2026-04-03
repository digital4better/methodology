# Vue d’ensemble et objectifs

## En bref

Cette méthodologie propose un cadre d’évaluation des impacts environnementaux du numérique conçu pour être à la fois lisible par un public non spécialiste et suffisamment robuste pour des usages d’analyse, de cadrage ou de pilotage.

Elle repose sur une posture principalement attributionnelle. Son ambition n’est pas de produire une valeur unique valable en tout contexte, mais d’expliquer comment construire une évaluation transparente, argumentée et comparable.

## Pourquoi cette méthodologie existe

Les impacts environnementaux du numérique sont souvent présentés soit sous forme de messages très simplifiés, soit sous forme de modèles opaques difficiles à relire. Entre ces deux extrêmes, il manque souvent une documentation qui :

- explicite les hypothèses ;
- distingue ce qui relève des données, des conventions et des choix de modélisation ;
- permette de passer des objets matériels à des cas d’usage concrets ;
- reste compatible avec un enrichissement progressif des données et des modèles.

Cette documentation vise à combler cet espace.

## À qui elle s’adresse

Cette méthode s’adresse principalement à trois profils :

- les personnes qui veulent comprendre les grands déterminants des impacts du numérique sans entrer immédiatement dans les équations ;
- les praticiens qui doivent construire, relire ou challenger une évaluation ;
- les équipes qui ont besoin d’un cadre commun pour discuter des données, des hypothèses et des limites d’un résultat.

## Ce que couvre la méthodologie

Le corpus couvre :

- les fondations méthodologiques d’une ACV appliquée au numérique ;
- les règles transverses nécessaires au calcul et à l’interprétation ;
- le matériel, depuis les matériaux jusqu’aux infrastructures ;
- les principaux cas d’usage retenus pour cette première itération.

## La logique d’ensemble

La documentation est organisée du plus transversal au plus appliqué :

- `Fondations` : les bases conceptuelles ;
- `Règles` : les règles de calcul et de traitement des données ;
- `Modélisation` : la manière de composer équipements et services ;
- `Matériel` : les composants, équipements et infrastructures ;
- `Cas d’usage` : l’application à des environnements et services concrets ;
- `Références` : le cadre documentaire, les hypothèses et la gouvernance.

## Hypothèses et limites

- La méthode est volontairement modulaire. Certains chapitres restent explicatifs dans cette itération, notamment dans la section `Matériaux`.
- Les exemples et valeurs présentées ici ne remplacent pas une lecture critique des sources ni la vérification du contexte d’étude.
- Les résultats produits avec cette méthode doivent toujours être lus avec leur périmètre, leur qualité de données et leurs hypothèses.

## Données mobilisées

- Référentiel canonique : [`digital4better/data`](https://github.com/digital4better/data)
- Familles de données les plus mobilisées dans cette méthode :
  - `data/factor/*`
  - `data/energy/*`
  - `data/cloud/*`
  - `data/hardware/*`
  - `data/equipment/*`

## Sources

- ISO 14040/14044
- Référentiel ADEME / ARCEP sur les services numériques
- Corpus documentaire converti dans `inputs/md`
- [digital4better/data](https://github.com/digital4better/data)
