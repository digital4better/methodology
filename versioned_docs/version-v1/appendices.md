---
sidebar_position: 7
---

# Annexes

## Calcul des durées de vie réelles

### Définitions

Le terme « Durée de vie » est utilisé dans les organisations pour recouvrir différentes notions. Il est important de bien distinguer de quoi on parle pour comprendre les mécanismes mis en jeu et à quel moment utiliser quelle donnée.

#### L’âge

C’est la durée depuis laquelle l’équipement est présent dans l’inventaire de l’organisation, c’est-à-dire la durée écoulée depuis sa date d’entrée dans l’inventaire et la date d’aujourd’hui, ou à défaut sa date de sortie.

#### La durée de vie réelle

La durée de vie réelle représente la durée de vie moyenne observée sur les équipements qui constituent le parc. C’est bien cette durée de vie réelle qu’il est intéressant d’utiliser en tant qu’indicateur car elle illustre les bonnes ou les mauvaises pratiques de l’organisation :
- Si les équipements durent plus longtemps que la durée nominale, la durée de vie réelle s’allonge
- Si les équipements durent moins longtemps que la durée nominale (casse, perte, mauvais usage…), la durée de vie réelle diminue
     
#### La durée de vie nominale

C’est la durée de vie minimum attendue pour un équipement qui entre dans le parc de l’organisation. Elle est fixée par l’organisation en lien avec ses ambitions et peut être revue en fonction des progrès réalisés.

La durée de vie nominale peut être utilisée dans les évaluations d’impact en l’absence des durées de vies réelles et pour mettre en place un mécanisme d’amortissement de l’’impact intrinsèque.

Exemple :
- Une organisation fixe la durée de vie nominale de ses smartphones à 4 ans. 
- Un nouveau smartphone est acheté en 2023. 
- Son empreinte intrinsèque sera divisée en 4 et comptabilisée dans les empreintes 2023, 2024, 2025 et 2026 
- Si le smartphone dure au-delà de 2026 et de sa durée de vie nominale, son empreinte intrinsèque ne sera plus comptabilisée mais son empreinte opérationnelle le sera toujours car le smartphone continue de consommer de l’énergie.
 
:::note    
Les durées de vie nominales peuvent être mises à jour par l’organisation, mais cela impacte le calcul d’empreintes[^1]. Ces mises à jour doivent donc rester ponctuelles et justifiées.
[^1]: En reprenant l’exemple du smartphone : si on passe sa durée de vie nominale à 5 ans, son empreinte intrinsèque annuelle diminue mais doit être déclarée une année de plus.
:::
     
#### Equipement vivant

Équipement recensé dans l’inventaire sans date de sortie et toujours en état de fonctionnement.

#### Equipment sorti

Équipement disposant dans l’inventaire d’une date de sortie dans l’année en cours et/ou qui n’est plus en état de fonctionnement, de façon temporaire ou définitive.
     
### Calcul de la durée de vie réelle d’un équipement

#### Méthodologie
     
Selon le contexte, la durée de vie réelle est calculée par modèle, par catégorie d’équipements (laptop, smartphone…) ou sur l’ensemble du parc.
     
La méthodologie de calcul repose sur la décomposition des équipements du parc en 3 populations. Dans chacune d’elle, on applique une règle adaptée pour déterminée la durée de vie individuelle d’un équipement du parc :

|     Population    |     Profil                                                                                          | Durée   de vie prise en compte |
|-------------------|-----------------------------------------------------------------------------------------------------|--------------------------------|
|     A             |     Equipements   vivants      dont   l’âge est inférieur à la durée de vie nominale                | Durée de vie nominale[^2]      |
|     B             |     Equipements   vivants      dont   l’âge est supérieur à la durée de vie nominale                | Age                            |
|     C             |     Equipements   sortis de l’inventaire      avec   un âge inférieur à la durée de vie nominale    | Age                            |

[^2]: On suppose que les équipements de la population A auront une durée de vie réelle au moins égale à la durée de vie nominale, c’est l’ambition de l’organisation.

La durée de vie réelle sera calculée à partir d’une moyenne des durées de vie obtenues sur les 3 populations, pondérée par le volume d’équipement relevant de chaque population.

Exemple :

Le tableau ci-dessous représente l’inventaire de 4 smartphones pour lesquels la durée nominale a été fixée à 4 ans.

| Année d’achat |     Statut    |     âge (an)    |     Durée nominale (an)    |     Population    |     Durée de vie pour le calcul    |
|---------------|---------------|-----------------|----------------------------|-------------------|------------------------------------|
| 2018          |     Stock     |     6           |     4                      |     A             |     6                              |
| 2019          |     Parc      |     5           |     4                      |     A             |     5                              |
| 2021          |     Broke     |     3           |     4                      |     B             |     3                              |
| 2022          |     Parc      |     2           |     4                      |     C             |     4                              |


Durée de vie moyenne par population :
- Population A : (6+5)/2 = 5,5 ans/équipement
- Population B : 3 ans/équipement
- Population C : 4 ans/équipement

Durée de vie de la catégorie « smartphone » (moyenne des durées de vie par population, pondérée par le nombre d’équipements) : (5,5 *2 + 3*1 + 4*1) / 4 = 4,5 ans

La durée de vie réelle « smartphone » est de 4,5 ans.

#### Influence du matériel acheté en reconditionné

L’intérêt d’un achat en reconditionné est de prolonger la durée de vie de l’équipement et réduire ainsi les empreintes intrinsèques en freinant l’achat d’équipements neufs.

Pour parfaitement prendre en compte cette réduction d’impact, il est nécessaire de connaître la durée d’utilisation de l’équipement avant son arrivée dans l’organisation. Cette durée est ajoutée à la durée de vie individuelle et influencera ainsi la durée de vie finale du modèle.

Exemple :

Le tableau ci-dessous reprend l’exemple des smartphones vus précédemment en ajoutant un achat de modèle reconditionné en 2023, qui a déjà 3 ans d’existence.

Sa durée d’utilisation dans l’organisation étant inférieure à la durée nominale, on retient la durée nominale pour le calcul de la durée de vie. On y ajoute la durée d’utilisation avant arrivée dans l’organisation pour obtenir une durée de vie finale de 7 ans pour cet item.

| Année d’achat |     Statut    |     Durée d'utilisation dans l’organisation (an)    |     Durée nominale (an)    |     Durée d’utilisation avant arrivée (an)    |     Population    |     Durée de vie    |
|---------------|---------------|-----------------------------------------------------|----------------------------|-----------------------------------------------|-------------------|---------------------|
| 2018          |     Stock     |     6                                               |     4                      |     0                                         |     A             |     6               |
| 2019          |     Parc      |     5                                               |     4                      |     0                                         |     A             |     5               |
| 2021          |     Broke     |     3                                               |     4                      |     0                                         |     B             |     3               |
| 2022          |     Parc      |     2                                               |     4                      |     0                                         |     C             |     4               |
| 2023          |     Stock     |     1                                               |     4                      |     3                                         |     C             |     7               |

La durée de vie réelle « smartphone » à prendre en compte passe alors à 5 ans (moyenne des durées de vie par population, pondérée par le nombre d’équipements). 
