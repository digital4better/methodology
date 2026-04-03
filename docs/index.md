# Vue d'ensemble et objectifs

## En bref

Cette méthodologie propose un cadre d'évaluation des impacts environnementaux du numérique conçu pour être à la fois lisible par un public non spécialiste et suffisamment robuste pour des usages d'analyse, de cadrage ou de pilotage.

Elle repose sur une posture principalement attributionnelle. Son ambition n'est pas de produire une valeur unique valable en tout contexte, mais d'expliquer comment construire une évaluation transparente, argumentée et comparable.

## Pourquoi cette méthodologie existe

Les impacts environnementaux du numérique sont souvent présentés soit sous forme de messages très simplifiés, soit sous forme de modèles opaques difficiles à relire. Entre ces deux extrêmes, il manque souvent une documentation qui :

- explicite les hypothèses ;
- distingue ce qui relève des données, des conventions et des choix de modélisation ;
- permette de passer des objets matériels à des cas d'usage concrets ;
- reste compatible avec un enrichissement progressif des données et des modèles.

Cette documentation vise à combler cet espace.

## À qui elle s'adresse

Cette méthode s'adresse principalement à trois profils, chacun pouvant suivre un parcours de lecture adapté :

### Découverte — comprendre les grands déterminants

Pour les personnes qui veulent comprendre les grands déterminants des impacts du numérique sans entrer immédiatement dans les équations :

1. Cette page (Vue d'ensemble)
2. [Principes ACV appliqués au numérique](fondations/principes-acv-appliques-au-numerique)
3. [Périmètre, frontières et unité d'analyse](fondations/perimetre-frontieres-services-tiers-et-unite-d-analyse)
4. [Vue d'ensemble du matériel](materiel/vue-d-ensemble-du-materiel)
5. Un cas d'usage au choix (ex. [IA générative](cas-d-usage/services/ia-generative))

### Cadrage — définir ou challenger une évaluation

Pour les praticiens qui doivent construire, relire ou challenger une évaluation :

1. L'ensemble des [Fondations](fondations/principes-acv-appliques-au-numerique)
2. L'ensemble des [Règles](regles/allocation-et-partage-des-impacts)
3. [Stratégies de modélisation](modelisation/strategies-de-modelisation) et [Modélisation d'un service](modelisation/modelisation-d-un-service)
4. Les chapitres [Matériel](materiel/vue-d-ensemble-du-materiel) concernés
5. Le cas d'usage cible

### Implémentation — construire un modèle ou consolider des données

Pour les équipes qui ont besoin de construire un modèle de calcul :

1. [Impacts de la consommation d'énergie](fondations/impacts-de-la-consommation-d-energie)
2. [Allocation et partage des impacts](regles/allocation-et-partage-des-impacts)
3. [Double comptabilisation](regles/double-comptabilisation)
4. [Qualité des données et matrice de robustesse](regles/qualite-des-donnees-et-matrice-de-robustesse)
5. [Hypothèses, valeurs par défaut et hiérarchie des sources](regles/hypotheses-valeurs-par-defaut-et-hierarchie-des-sources)
6. Les chapitres [Matériel](materiel/vue-d-ensemble-du-materiel) pertinents
7. Le [Registre des hypothèses et valeurs par défaut](references/registre-des-hypotheses-et-valeurs-par-defaut)

## Ce que couvre la méthodologie

Le corpus couvre :

- les fondations méthodologiques d'une ACV appliquée au numérique ;
- les règles transverses nécessaires au calcul et à l'interprétation ;
- le matériel, depuis les matériaux jusqu'aux infrastructures ;
- les principaux cas d'usage retenus pour cette première itération.

## La logique d'ensemble

La documentation est organisée du plus transversal au plus appliqué :

| Section | Rôle | Question à laquelle elle répond |
|---|---|---|
| **Fondations** | Bases conceptuelles | Que veut-on mesurer et pourquoi ? |
| **Règles** | Règles de calcul et traitement des données | Comment éviter les erreurs de calcul ou d'interprétation ? |
| **Modélisation** | Composition des équipements et services | Comment transformer un objet d'étude en modèle calculable ? |
| **Matériel** | Composants, équipements et infrastructures | Sur quels éléments physiques repose le modèle ? |
| **Cas d'usage** | Environnements et services concrets | Comment assembler le tout dans un contexte réel ? |
| **Références** | Cadre documentaire et gouvernance | Où trouver les données, les hypothèses et les sources ? |

## Conventions de lecture

Chaque page de la méthodologie suit une structure commune :

- **En bref** : résumé de l'objectif du module ;
- les concepts précèdent toujours les formules ;
- **Hypothèses et limites** : les simplifications et choix sont rendus visibles ;
- **Données mobilisées** : les référentiels de données attendus ;
- **Sources** : les textes de référence.

## Hypothèses et limites

- La méthode est volontairement modulaire. Certains chapitres restent explicatifs dans cette itération, notamment dans la section `Matériaux`.
- Les exemples et valeurs présentées ici ne remplacent pas une lecture critique des sources ni la vérification du contexte d'étude.
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
