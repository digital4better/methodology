# Hypothèses, valeurs par défaut et hiérarchie des sources

Une évaluation du numérique repose toujours sur un mélange de mesures, de déclarations, de littérature et de valeurs par défaut. Cette page fixe l'ordre de priorité entre ces sources, les conditions d'usage des substitutions et les règles de traçabilité des hypothèses.

## Pourquoi cette hiérarchie est nécessaire

Sans hiérarchie explicite, deux évaluateurs confrontés au même objet peuvent mobiliser des sources différentes et obtenir des résultats divergents -- non pas parce que la méthode est défaillante, mais parce que le choix des données d'entrée n'est pas normé.

## Hiérarchie des sources

La méthode distingue cinq niveaux de sources, selon un ordre de recherche préférentiel, sous réserve de compatibilité et de qualité :

```mermaid
flowchart TD
    M[1. Données mesurées et tracées<br>dans le périmètre étudié] --> P[2. Données primaires documentées<br>par un acteur directement concerné]
    P --> F[3. Données constructeurs ou fournisseurs<br>relues de façon critique]
    F --> L[4. Littérature scientifique<br>ou technique]
    L --> D[5. Forfaits et hypothèses<br>par défaut]

    class M d4b-navy
    class P d4b-blue
    class F d4b-rose
    class L d4b-sand
    class D d4b-blue
```

| Niveau | Type | Exemple concret | Quand l'utiliser |
|---|---|---|---|
| 1 | Mesurée | Relevé compteur électrique du datacenter, inventaire CMDB exhaustif | Quand elle est représentative, étalonnée et compatible |
| 2 | Primaire documentée | Déclaration du fournisseur cloud avec détail des ressources, rapport d'audit | Quand la mesure directe n'est pas possible |
| 3 | Constructeur / fournisseur | ACV produit Dell, fiche HP, rapport de durabilité Microsoft | Quand le modèle exact est connu mais la mesure non disponible |
| 4 | Littérature | Facteur IMEC NetZero, étude UNECE, article scientifique peer-reviewed | Quand aucune donnée spécifique n'est accessible |
| 5 | Forfait par défaut | Facteur Base Empreinte par famille, valeur conventionnelle d4b/data | En dernier recours, toujours documenté |

:::note[Principe directeur]
À périmètre, unités et qualité compatibles, privilégier la source la plus représentative du contexte étudié. Un compteur mal étalonné ou limité à une fraction du système n'est pas automatiquement meilleur qu'un modèle documenté. Une mesure d'électricité ne remplace pas un inventaire de fabrication. Le rang de la source ne constitue pas une note de fiabilité.
:::

## Vérifier la compatibilité

Une ACV constructeur n’est retenue que si son modèle, ses phases, ses unités et sa méthode conviennent au périmètre étudié. À défaut, un facteur plus représentatif ou une substitution documentée est nécessaire. La comparaison des sources repose sur le [contrôle de qualité](./qualite-des-donnees-et-matrice-de-robustesse).

## Référentiels de facteurs d'impacts

Sauf indication spécifique, les facteurs d'impacts mobilisés dans la méthode sont issus des référentiels suivants[^donnees-modele] :

| Référentiel | Périmètre | Données fournies | Granularité | Origine |
|---|---|---|---|---|
| Données constructeur | Équipement, hébergement | CO₂ eq., consommation électrique | Modèle | ACV produit constructeur |
| Base Empreinte (ADEME) | Équipement, hébergement | Multi-indicateurs (9) | Famille | Travaux NegaOctet [^source-5]|
| Base Empreinte (ADEME) | Réseau | Multi-indicateurs (9) | Unité fonctionnelle | Travaux NegaOctet |
| `digital4better/data` | Électricité, cloud, matériel, géographie | Facteurs, conventions | Référentiel versionné | Digital4Better [^source-3]|

### Détail des familles `digital4better/data`

Le référentiel canonique `digital4better/data` est organisé en familles de données complémentaires :

| Famille | Contenu | Fréquence de mise à jour |
|---|---|---|
| `data/factor/*` | Facteurs d'impact par technologie de production d'électricité | Mensuelle |
| `data/mix/*` | Mix électriques nationaux et régionaux | Période et fréquence à vérifier |
| `data/energy/*` | Impacts par technologie de production | Variable |
| `data/cloud/*` | Correspondances services cloud → ressources matérielles | Trimestrielle |
| `data/cloud/cpus.*`, `data/cloud/accelerators.*` | Caractéristiques CPU et accélérateurs | Variable |
| `data/equipment/*` | Facteurs d'impact par type d'équipement | Variable |
| `data/country/*` | Facteurs de distance réseau par pays | Annuelle |

Les fréquences ci-dessus décrivent des objectifs de maintenance, pas une garantie de fraîcheur. Vérifier le fichier, son commit, sa période de référence et la date de la source amont. La présence d'un facteur dans le dépôt ne valide ni son unité ni son adaptation au cas étudié.

## Focus sur la Base Empreinte de l'ADEME

La Base Empreinte regroupe des données et référentiels pour réaliser des analyses de cycle de vie et des bilans GES. Dans le cadre des ACV numériques, une contribution importante est disponible sous la forme d'un tableur rassemblant une partie des travaux du consortium NegaOctet.

On y retrouve :
- des facteurs **multi-indicateurs** établis pour des équipements (ordinateur, smartphone, serveur...).
- des facteurs établis pour certains **services numériques**, définis par une unité fonctionnelle précise (ex. : stocker 1 Go de données dans le cloud pendant 1 an).
- une base officielle utile pour cadrer certains **forfaits**.

### Points de vigilance

| Point | Risque | Recommandation |
|---|---|---|
| Quantité de référence | Le facteur peut être exprimé pour 1 an, 1 Go, etc. | Toujours vérifier l'unité avant d'appliquer |
| Durée de vie implicite | Peut différer de la durée retenue | Corriger par $TL/RL$ uniquement un facteur déjà normalisé par unité de temps (voir [Allocation](./allocation-et-partage-des-impacts)) |
| Périmètre couvert | Certaines phases ACV sont incluses ou exclues | Vérifier la description technologique |
| Localisation | Souvent "Asie" ou "France" | Adapter la phase concernée seulement ; le pays d'usage ne relocalise pas la fabrication |
| Valeurs négatives | Water Use négatif pour certains équipements | Vérifier les crédits et conventions de fin de vie dans la source ; ne pas les supprimer ou les expliquer sans preuve |

## Règles de substitution

Quand une donnée n'est pas disponible au niveau de préférence souhaité, la substitution doit respecter quatre conditions :

1. **Être documentée** : indiquer quelle donnée a été substituée, par quoi, et pourquoi.
2. **Utiliser la source la plus proche du contexte** : un facteur pour un modèle similaire est préférable à un facteur générique.
3. **Rester cohérente avec le reste du modèle** : ne pas mélanger des facteurs ACV complets avec des facteurs carbone-seul sans le signaler.
4. **Être inscrite dans le registre central** si elle est amenée à se répéter dans d'autres évaluations.

### Exemples de substitutions courantes

| Situation | Donnée manquante | Substitution retenue | Justification |
|---|---|---|---|
| Serveur sans ACV constructeur | Facteur intrinsèque du modèle | Facteur Base Empreinte "serveur" | Seule donnée multicritère disponible |
| Pays sans mix électrique mensuel | Facteur d'impact électrique mensuel | Facteur annuel du même pays | Granularité temporelle réduite mais même périmètre |
| Segment réseau inconnu | Inventaire des équipements du segment | Facteur système fixe ou mobile compatible | Substitution du segment complet, sans ajouter ensuite les mêmes équipements |
| Durée de vie réelle inconnue | $RL$ pour la correction | Durée de vie nominale de l'organisation | Hypothèse documentée ; correction nulle seulement si durée retenue et durée du facteur sont identiques |

## Visibilité des hypothèses

Les hypothèses ne doivent jamais être cachées dans les calculs. Elles doivent apparaître :

- dans les sections **Hypothèses et limites** de chaque page locale.
- dans le [Registre des hypothèses et valeurs par défaut](../references/registre-des-hypotheses-et-valeurs-par-defaut) lorsqu'elles deviennent transverses.
- dans les métadonnées de l'évaluation quand elles conditionnent le résultat.

:::note[Registre central]
Toute valeur par défaut répétée dans plusieurs pages doit apparaître dans le registre central. Les pages locales peuvent rappeler une hypothèse, mais pas recréer un registre parallèle.
:::

## Hypothèses et limites

- Les valeurs par défaut ne sont pas des vérités générales ; elles sont des conventions de travail. Elles peuvent et doivent être remplacées dès qu'une donnée de meilleur niveau est disponible.
- Une valeur plus précise mais non traçable doit parfois être rejetée au profit d'un forfait documenté. La traçabilité prime sur la précision apparente.
- Certaines données constructeurs restent utiles mais sont peu comparables entre elles. Leur mobilisation doit rester critique et s'accompagner d'une évaluation de robustesse (voir [Qualité des données et matrice de robustesse](./qualite-des-donnees-et-matrice-de-robustesse)).

[^source-3]: Digital4Better, [digital4better/data](https://github.com/digital4better/data) Catalogue évolutif ; utiliser un commit pour figer les facteurs.

[^source-5]: Base Empreinte / ADEME Voir le [corpus documentaire](../references/sources-et-corpus).

[^donnees-modele]: [Registre des hypothèses et valeurs par défaut](../references/registre-des-hypotheses-et-valeurs-par-defaut). Référentiel `digital4better/data`. Base Empreinte / ADEME. [Digital4Better, catalogue de données, instantané 77cae4a](https://github.com/digital4better/data/tree/77cae4a58fadd5deb3b8d4e5577020da08f780d8). Références et portée : [Sources et corpus](../references/sources-et-corpus).
