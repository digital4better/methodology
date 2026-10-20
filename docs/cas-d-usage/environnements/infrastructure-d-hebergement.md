# Infrastructure d’hébergement

Ce cas couvre les serveurs, le stockage et le réseau interne d’un site dont l’inventaire est connu. Il permet d’évaluer le site entier ou une part réservée à un service. Le cas [Cloud](./cloud) traite des ressources publiques dont le matériel est inconnu.

## Préparer les données

| Donnée | Unité | Frontière |
|---|---|---|
| Inventaire et fabrication | Équipements, kg CO₂e | Inclure les équipements de stockage et réseau |
| Énergie IT annuelle | kWh | Avant refroidissement et pertes du site |
| PUE | Sans unité | Même site et même période que l’énergie IT |
| Part réservée au service | % | Allocation documentée, distincte de la charge CPU |
| Eau directe consommée | L/kWh IT | Facultative ; inconnue si non mesurée |

<span id="comprendre-le-calcul" />

L’énergie totale vaut `énergie IT × PUE`. Le PUE ne multiplie ni la fabrication, ni l’énergie des terminaux utilisateurs. Un compteur couvrant déjà tout le site inclut les auxiliaires ; une seconde application du PUE les compterait deux fois.

## Méthode détaillée du site au service

### Consolider l’inventaire physique

L’inventaire distingue serveurs, stockage, équipements réseau et installations du site. Chaque groupe est décrit par sa quantité, son énergie IT sur la période et sa fabrication unitaire avec sa durée de vie. Les équipements de redondance et de secours font partie de la capacité mise à disposition, même s’ils travaillent peu.

$$
I_{service}=a\left[PUE\,f_{électricité}\sum_i q_i E_iT+\sum_i q_iM_i\frac{T}{L_i}\right]
$$

$a$ représente ici une part uniforme des ressources réservées. Dans une infrastructure hétérogène, des clés distinctes peuvent être nécessaires pour CPU, RAM, stockage et réseau. La somme des parts allouées ne doit pas excéder l’inventaire total ; les capacités vacantes doivent rester identifiables.

| Donnée disponible | Conversion correcte |
|---|---|
| Énergie des équipements IT | Multiplier par le PUE compatible du site |
| Énergie totale du site | Utiliser directement, sans nouveau PUE |
| Puissances et temps par état | Additionner watts × heures, puis convertir en kWh |
| Part réservée au service | Appliquer la clé documentée, distincte de l’utilisation CPU |

### Eau et autres installations

Si le WUE représente des litres d’eau consommée par kWh IT, $V_{eau}=E_{IT}\times WUE$. L’interprétation dépend de la grandeur décrite par la source, consommation ou prélèvement, et de sa période, année entière ou saison. L’eau directe du site ne remplace pas l’empreinte hydrique de l’électricité ou de la fabrication.

### Colocation, mutualisation et disponibilité

En colocation, le compteur peut inclure un rack, une salle ou le site entier. Sa frontière doit correspondre à celle du PUE et à la part des services concernés. Une charge CPU faible n’implique pas une puissance nulle : mémoire, ventilateurs, stockage et alimentation continuent à fonctionner.

L’allocation au temps de réservation convient à une capacité dédiée. Pour une capacité mutualisée, les clés par ressource et la répartition du repos sont explicites. Une redondance destinée à garantir la disponibilité doit être incluse dans le service qui en bénéficie.

La fabrication du bâtiment, des onduleurs et du refroidissement nécessite des inventaires et des durées propres. Le PUE couvre leur effet sur l’électricité d’exploitation, pas leur fabrication. Ces inventaires ne sont donc pas inclus dans un PUE.

### Vérifier la cohérence

La cohérence du calcul s’apprécie par rapprochement du total IT avec les compteurs et du total site avec la consommation facturée, à frontières documentées. Des périodes ou unités différentes peuvent expliquer un écart sans gain d’efficacité. Le cas [Cloud](./cloud) et les règles de [virtualisation](../../regles/prise-en-compte-des-couches-logicielles-et-de-la-virtualisation) précisent le traitement du matériel virtualisé.

## Périmètre à compléter

La fabrication du bâtiment, des groupes froids et des dispositifs de secours nécessite un inventaire distinct. L’eau directe reste exprimée en litres ; elle ne s’additionne pas à un indicateur d’eau caractérisé en m³ équivalents. Voir [Datacenter](../../materiel/reseau-et-infrastructure/datacenter).

<span id="règles-et-sources" />

Pour cadrer le résultat : [périmètre et unité d’analyse](../../fondations/perimetre-frontieres-services-tiers-et-unite-d-analyse), [allocation](../../regles/allocation-et-partage-des-impacts) et [double comptage](../../regles/double-comptabilisation).

Les facteurs électriques sont issus de l’instantané D4B 2025[^ref-1]. Les activités et données d’hébergement préremplies sont des hypothèses de l’exercice. Les facteurs et conventions sont consultables sous le simulateur.

<span id="lire-leffet-des-paramètres" />

Un passage du PUE de 1,8 à 1,2 diminue d’un tiers l’énergie de site, à énergie IT constante. La fabrication reste identique. Une baisse de charge CPU ne justifie pas, à elle seule, une baisse proportionnelle de l’énergie ou de l’allocation.

## Exemple interactif {#simuler-votre-situation}

Cet exemple met en application les calculs et les limites présentés ci-dessus.

Le scénario prérempli comporte dix serveurs et cinq switches. Les consommations et fabrications sont supposées pour l’exercice.

Ex: dix serveurs à 400 W et cinq switches à 30 W consomment `(10 × 0,4 + 5 × 0,03) × 8 760 = 36 354 kWh IT/an`. Avec un PUE de 1,8, le site consomme **65 437,2 kWh/an**.

L’exercice suppose 275 kg CO₂e de fabrication par serveur, 30 kg par switch et cinq ans de vie. La fabrication allouée vaut 580 kg/an. Avec le facteur France 2025, le sous-total est **2 669,22 kg CO₂e/an**.

import { ScenarioPlayground } from '@site/src/components/scenario-playground';

<div className="inline-example">

<ScenarioPlayground kind="hosting" lang="fr" />

</div>

[^ref-1]: Digital4Better, [instantané D4B 2025](https://github.com/digital4better/data/blob/77cae4a58fadd5deb3b8d4e5577020da08f780d8/data/factor/country-yearly.csv). Instantané 77cae4a, données 2025 ; revue du 16 octobre 2026.
