# Temporalité, vieillissement et versionnement des données

## En bref

Les impacts du numérique ne sont pas statiques. Les équipements vieillissent, les durées de vie observées évoluent, les mix électriques changent et les bases de données sont mises à jour. La méthode doit donc être temporellement explicite : chaque évaluation doit indiquer sur quelle période elle porte, avec quelles durées de vie et à partir de quelles versions de données.

## Pourquoi la temporalité est structurante

Une évaluation réalisée en 2024 avec des facteurs électriques de 2020 ne produit pas le même résultat que la même évaluation avec des facteurs de 2024 -- le mix électrique français ayant significativement varié sur cette période. De même, un équipement amorti sur 3 ans ou sur 5 ans ne porte pas la même fraction d'impact intrinsèque annuel. Rendre ces choix explicites est une condition de comparabilité.

## Les quatre dimensions temporelles

Toute évaluation doit distinguer quatre dimensions temporelles :

| Dimension | Question | Exemple |
|---|---|---|
| **Période d'observation** | Sur quelle durée calcule-t-on ? | Année civile 2024, trimestre Q3 2024 |
| **Durée de vie / amortissement** | Comment répartit-on l'impact intrinsèque ? | Durée nominale 4 ans, durée réelle 5,2 ans |
| **Date de validité des données** | Quand les données de fond ont-elles été produites ? | Mix électrique janvier 2024, Base Empreinte 2023 |
| **Version de la méthode** | Quelle version des formules et conventions ? | Méthodologie D4B v2.0, facteurs d4b/data v3.1 |

```mermaid
flowchart LR
    A[Période<br>d'observation] --> B[Durée de vie /<br>amortissement]
    B --> C[Date de validité<br>des données]
    C --> D[Version de<br>la méthode]

    style A fill:#264653,color:#fff
    style B fill:#2a9d8f,color:#fff
    style C fill:#e9c46a,color:#000
    style D fill:#f4a261,color:#000
```

## Durées de vie

### Définitions

Le terme « durée de vie » recouvre plusieurs notions qu'il est essentiel de distinguer :

| Notion | Définition | Usage dans la méthode |
|---|---|---|
| **Âge** | Durée écoulée depuis l'entrée de l'équipement dans l'inventaire | Donnée d'entrée pour le calcul de la durée de vie réelle |
| **Durée de vie nominale** ($TL$) | Durée de vie minimum attendue, fixée par l'organisation | Utilisée pour l'amortissement quand la durée réelle n'est pas connue |
| **Durée de vie réelle** ($RL$) | Durée de vie moyenne observée sur les équipements du parc | Indicateur privilégié, reflète les pratiques réelles |

:::note[Durée nominale et amortissement]
Un équipement acheté en 2023 avec une durée nominale de 4 ans voit son empreinte intrinsèque divisée en 4, comptabilisée de 2023 à 2026. Au-delà de 2026, l'empreinte intrinsèque n'est plus comptabilisée, mais l'empreinte opérationnelle persiste tant que l'équipement consomme de l'énergie.
:::

### Correction proportionnelle TL / RL

Lorsque la durée de vie réelle $RL$ est connue et diffère de la durée de vie théorique $TL$ fournie par le référentiel, une correction proportionnelle est appliquée au facteur d'impact intrinsèque :

$$
\begin{aligned}
&IF_{emb_{i}} = TIF_{emb_{i}} \times \frac{TL}{RL} \\
\text{avec} \\
&IF_{emb_{i}} = \text{Facteur d'impact intrinsèque corrigé} \htmlClass{unit}{[U_i/an]} \\
&TIF_{emb_{i}} = \text{Facteur d'impact théorique du référentiel} \htmlClass{unit}{[U_i/an]} \\
&TL = \text{Durée de vie théorique du référentiel} \htmlClass{unit}{[an]} \\
&RL = \text{Durée de vie réelle observée} \htmlClass{unit}{[an]}
\end{aligned}
$$

**Interprétation** :
- Si $RL > TL$ : l'équipement dure plus longtemps que prévu → le facteur annuel diminue → impact intrinsèque annuel réduit.
- Si $RL < TL$ : l'équipement dure moins longtemps que prévu → le facteur annuel augmente → impact intrinsèque annuel accru.

### Calcul de la durée de vie réelle

La méthodologie de calcul repose sur la décomposition des équipements du parc en trois populations :

| Population | Profil | Durée de vie retenue |
|---|---|---|
| **A** | Équipements vivants dont l'âge dépasse la durée nominale | Âge réel |
| **B** | Équipements sortis avant la durée nominale | Âge réel |
| **C** | Équipements vivants dont l'âge est inférieur à la durée nominale | Durée nominale[^1] |

[^1]: On suppose que ces équipements atteindront au minimum la durée nominale, conformément à l'ambition de l'organisation.

La durée de vie réelle est la moyenne pondérée des durées individuelles sur les trois populations :

$$
\begin{aligned}
&RL = \frac{\sum_{k \in A} age_k + \sum_{k \in B} age_k + \sum_{k \in C} TL}{|A| + |B| + |C|}
\end{aligned}
$$

### Application concrète

**Exemple : parc de 4 smartphones, durée nominale = 4 ans**

| Année d'achat | Statut | Âge (an) | Population | Durée retenue |
|---|---|---|---|---|
| 2018 | En stock | 6 | A | 6 |
| 2019 | En parc | 5 | A | 5 |
| 2021 | Cassé | 3 | B | 3 |
| 2022 | En parc | 2 | C | 4 |

Calcul :

$$
RL = \frac{6 + 5 + 3 + 4}{4} = 4{,}5 \text{ ans}
$$

La durée de vie réelle est de **4,5 ans**, supérieure à la durée nominale (4 ans), ce qui reflète un parc plutôt bien entretenu.

### Prise en compte du reconditionné

Un équipement reconditionné prolonge la durée de vie totale du matériel. La durée d'utilisation avant arrivée dans l'organisation est ajoutée à la durée de vie individuelle :

| Année d'achat | Statut | Âge dans l'orga (an) | Durée avant arrivée (an) | Population | Durée de vie totale |
|---|---|---|---|---|---|
| 2018 | Stock | 6 | 0 | A | 6 |
| 2019 | Parc | 5 | 0 | A | 5 |
| 2021 | Cassé | 3 | 0 | B | 3 |
| 2022 | Parc | 2 | 0 | C | 4 |
| 2023 | Stock | 1 | 3 | C | 7 |

La durée de vie réelle passe à **5 ans** avec l'ajout du reconditionné, ce qui diminue le facteur d'impact intrinsèque annuel.

:::note[Mise à jour des durées nominales]
Les durées de vie nominales peuvent être révisées par l'organisation, mais cela impacte le calcul d'empreinte. Par exemple, passer de 4 à 5 ans réduit l'empreinte intrinsèque annuelle mais prolonge la période d'amortissement. Ces révisions doivent rester ponctuelles et justifiées.
:::

## Versionnement des données

### Pourquoi versionner

Les données de fond évoluent :
- les mix électriques nationaux sont mis à jour mensuellement dans `digital4better/data` ;
- les facteurs Base Empreinte peuvent être révisés lors de nouvelles campagnes NegaOctet ;
- les données constructeurs sont mises à jour à chaque génération de produit ;
- la méthode elle-même peut évoluer.

Une évaluation réalisée à deux dates différentes avec les mêmes usages mais des données de fond différentes produira des résultats différents. Cette variation n'est pas une erreur ; elle reflète l'évolution des connaissances. Mais elle doit être traçable.

### Règles de versionnement

| Élément | Information à tracer | Où la documenter |
|---|---|---|
| Facteurs d'impact électriques | Version `d4b/data`, mois de référence | Métadonnées de l'évaluation |
| Facteurs d'impact intrinsèques | Source (constructeur, Base Empreinte), date | Métadonnées de l'évaluation |
| Durées de vie | Nominales, réelles, date de calcul | [Registre des hypothèses](../references/registre-des-hypotheses-et-valeurs-par-defaut) |
| Méthode | Version de la documentation méthodologique | En-tête du rapport d'évaluation |

### Impact du versionnement sur la comparabilité

Pour comparer deux évaluations dans le temps :

```mermaid
flowchart TD
    A[Deux évaluations<br>à comparer] --> B{Mêmes versions<br>de données ?}
    B -- oui --> C[Comparaison directe<br>des résultats]
    B -- non --> D{Peut-on recalculer<br>avec les mêmes versions ?}
    D -- oui --> E[Recalculer puis comparer]
    D -- non --> F[Comparer avec réserve :<br>documenter l'écart de versions]
```

## Hypothèses et limites

- Une évaluation comparée sur plusieurs années doit documenter les évolutions de données et pas seulement les évolutions d'usage. Un changement de mix électrique peut masquer ou amplifier un progrès réel.
- Les valeurs par défaut peuvent devenir obsolètes plus vite que la structure méthodologique elle-même.
- Le calcul de la durée de vie réelle suppose un inventaire suffisamment complet et historisé. En l'absence d'historique, la durée nominale est utilisée par défaut.
- La fréquence de mise à jour des données varie selon les familles : mensuelle pour les mix électriques, annuelle ou plus pour les facteurs matériel.

## Données mobilisées

- `digital4better/data` (versions et historiques)
- [Registre des hypothèses et valeurs par défaut](../references/registre-des-hypotheses-et-valeurs-par-defaut)
- Inventaires matériels des organisations évaluées

## Sources

- ISO 14040 / ISO 14044
- [digital4better/data](https://github.com/digital4better/data)
- [Annexes techniques -- Calcul des durées de vie réelles](../references/annexes-techniques)
- Corpus `inputs/md`
