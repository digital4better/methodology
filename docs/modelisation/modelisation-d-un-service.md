# Modélisation d’un service

## Résumé

Modéliser un service numérique consiste à le décomposer en couches fonctionnelles et techniques, puis à rattacher chaque couche aux composants, équipements et infrastructures qui rendent effectivement le service.

Cette page sert de charnière entre le socle `Matériel` et les `Cas d’usage`. Elle explique comment passer d'un service observé à un modèle calculable, sans perdre de vue :

- les terminaux ;
- les réseaux ;
- l'infrastructure de calcul, de stockage ou de distribution ;
- les services tiers ;
- les règles d'allocation entre ces couches.

## Principe

Un service n'est pas évalué comme une entité abstraite isolée. Il est évalué à partir des composants, équipements et infrastructures qu'il mobilise et de la façon dont l'usage est réparti entre eux.

Cette décomposition doit répondre à trois questions :

1. Quelle fonction rend le service ?
2. Quelles couches sont nécessaires à cette fonction ?
3. Comment l'usage du service est-il alloué à ces couches ?

En général, un service est décomposé en :

- terminaux ;
- réseaux ;
- infrastructure de calcul, de stockage ou de distribution ;
- services tiers ;
- couches logicielles nécessaires à l'exécution.

## Paramètres d’entrée

Les paramètres les plus structurants sont :

- l'unité d'analyse retenue pour le service ;
- les données d'usage observées : vues, sessions, messages, tokens, volume transféré, etc. ;
- les hypothèses sur les terminaux et les usages finaux ;
- les hypothèses réseau : volumes, distances, parts fixe/mobile, présence d'un `CDN` ;
- les hypothèses d'infrastructure ou de cloud ;
- les dépendances tierces qui participent effectivement à la fonction rendue.

## Décomposition du service

### Couche terminal

Cette couche couvre les équipements utilisés par les utilisateurs finaux. Elle est généralement modélisée à partir des chapitres [Terminaux](../materiel/equipements/terminaux), [Affichage](../materiel/composants/affichage) ou [Alimentation et batterie](../materiel/composants/alimentation-et-batterie), selon le niveau de détail pertinent.

### Couche réseau

Cette couche couvre les réseaux locaux, mobiles, de transit ou de distribution nécessaires à la circulation des données. Elle s'appuie sur :

- [Réseau LAN](../materiel/reseau-et-infrastructure/reseau-lan) ;
- [Réseau d’accès mobile (RAN)](../materiel/reseau-et-infrastructure/reseau-d-acces-mobile-ran) ;
- [Réseau WAN](../materiel/reseau-et-infrastructure/reseau-wan) ;
- [CDN et caches](../materiel/reseau-et-infrastructure/cdn-et-caches).

### Couche infrastructure

Cette couche couvre les équipements et environnements qui hébergent ou exécutent le service : [Serveurs](../materiel/equipements/serveurs), [Datacenter](../materiel/reseau-et-infrastructure/datacenter), [Cloud](../cas-d-usage/environnements/cloud) ou [Infrastructure d’hébergement](../cas-d-usage/environnements/infrastructure-d-hebergement).

### Services tiers

Les dépendances externes doivent être identifiées tôt dans la modélisation, sinon :

- le périmètre devient instable ;
- les allocations deviennent incohérentes ;
- le double comptage devient difficile à éviter.

Les règles générales de frontières sont détaillées dans [Périmètre, frontières, services tiers et unité d’analyse](../fondations/perimetre-frontieres-services-tiers-et-unite-d-analyse).

## Agrégation

Une fois les couches identifiées, le service est modélisé comme une somme d'impacts alloués à chacune d'elles :

$$
\begin{align*}
&I_{service_i} = I_{terminal_i} + I_{reseau_i} + I_{infrastructure_i} + I_{tiers_i}\htmlClass{unit}{[U_i]}\\
Avec \\
&I_{service_i} = \text{Impact du service pour l’indicateur}\textit{ i }\htmlClass{unit}{[U_i]}\\
&I_{terminal_i} = \text{Impact alloué à la couche terminal}\htmlClass{unit}{[U_i]}\\
&I_{reseau_i} = \text{Impact alloué à la couche réseau}\htmlClass{unit}{[U_i]}\\
&I_{infrastructure_i} = \text{Impact alloué à la couche infrastructure}\htmlClass{unit}{[U_i]}\\
&I_{tiers_i} = \text{Impact alloué aux services tiers, quand ils sont inclus}\htmlClass{unit}{[U_i]}\\
\end{align*}
$$

Cette écriture n'impose pas que toutes les couches soient présentes dans tous les cas d'usage. Elle sert surtout à rendre explicite ce qui est inclus, exclu ou estimé.

## Application

Cette page structure directement la logique des principaux cas d'usage :

- [Service web](../cas-d-usage/services/service-web) ;
- [Mail](../cas-d-usage/services/mail) ;
- [Mobile](../cas-d-usage/services/mobile) ;
- [IA générative](../cas-d-usage/services/ia-generative) ;
- [Cloud](../cas-d-usage/environnements/cloud).

## Hypothèses & limites

### Hypothèses retenues

- une décomposition par couches rend le service plus lisible et plus traçable ;
- toutes les couches ne sont pas observables avec le même niveau de précision ;
- il vaut mieux expliciter une exclusion ou une approximation que laisser une dépendance implicite.

### Limitations connues

- une décomposition trop fine peut devenir spéculative si les données d'usage manquent ;
- une décomposition trop grossière masque les zones d'incertitude et les leviers d'action ;
- les services tiers restent souvent la partie la plus opaque du périmètre.

### Perspectives

- mieux formaliser des schémas canoniques par grande famille de service ;
- relier plus explicitement cette page aux tableaux de paramètres d'entrée des cas d'usage ;
- proposer à terme des flowcharts ou simulateurs pour certains cas d'usage stabilisés.

## Références

### Données mobilisées

- données d'usage du service
- données réseau ou infrastructure
- `digital4better/data/data/cloud/*`
- `digital4better/data/data/factor/*`
- `digital4better/data/data/equipment/*`

### Sources

- Référentiel ADEME / ARCEP
- corpus `inputs/md`
