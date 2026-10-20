# Parc informatique

import { MethodIllustration } from '@site/src/components/method-illustrations';

Évaluer un parc consiste à additionner les équipements présents sur une période, leur fabrication allouée et leur électricité d’usage. L’inventaire physique en constitue la base : une machine virtuelle ne constitue pas un équipement supplémentaire.

## Préparer les données

| Donnée | Où la trouver | Point à vérifier |
|---|---|---|
| Nombre et modèle d’équipements | Inventaire, CMDB | Présence sur la période, équipements partagés |
| Fabrication par équipement | ACV produit ou modèle documenté | Phases et indicateurs couverts |
| Durée de vie | Suivi des renouvellements | Durée observée ou hypothèse explicite |
| Électricité annuelle | Mesure ou puissance × durée | Actif, veille et arrêt |

<span id="comprendre-le-calcul" />

Pour chaque famille :

- fabrication allouée = nombre × fabrication unitaire × période / durée de vie.
- électricité = nombre × consommation annuelle unitaire × période.
- impact d’usage = électricité × facteur électrique du pays.

## Méthode détaillée d’inventaire et d’allocation

L’inventaire distingue famille, quantité, localisation d’usage, date de mise en service, durée de vie et données d’énergie. Un même groupe réunit uniquement des équipements dont les facteurs sont compatibles. Une donnée produit spécifique peut remplacer une moyenne de famille après vérification de ses phases et de son unité.

Pour une période $T$ en années et des groupes $i$ :

$$
I_{parc}=\sum_i q_i\left(M_i\frac{T_i}{L_i}+E_iT_i f_i\right)
$$

$q_i$ est la quantité, $M_i$ la fabrication par unité, $L_i$ la durée de vie, $E_i$ l’énergie annuelle et $T_i$ le temps de présence sur la période. Le simulateur suppose tous les groupes présents pendant la même durée $T$ ; des dates différentes nécessitent des inventaires séparés.

| Situation | Traitement |
|---|---|
| Équipement ajouté en cours d’année | Proratiser la présence et l’énergie ou utiliser la consommation mesurée |
| Équipement stocké ou de secours | Conserver sa part de fabrication ; adapter l’énergie à son état réel |
| Reconditionné | Documenter première vie, remise en état et convention de transfert ; ne pas présumer une fabrication nulle |
| Écran externe | Ajouter séparément uniquement si le facteur du poste ne l’inclut pas |
| Serveur ou réseau partagé | Allouer sa contribution une seule fois entre les services |

### États de fonctionnement et renouvellement

Sans mesure annuelle, $E=\sum_s W_s h_s/1000$ additionne les consommations des états actif, veille et arrêt. Les durées couvrent toute la période ; les puissances décrivent chaque état, plutôt que la seule puissance nominale.

<MethodIllustration kind="operating-states" lang="fr" />

Un allongement de durée de vie réduit la fabrication annualisée dans une comptabilité attributionnelle. Il ne mesure pas à lui seul une fabrication physiquement évitée. Pour étudier un renouvellement, comparer les services rendus sur une même durée, en incluant consommation, réparation et éventuelles différences de performance.

Cette allocation diffère d’une comptabilité des achats de l’année, qui attribue la fabrication au moment de l’acquisition. Les deux répondent à des questions différentes et ne doivent pas être additionnées.

La fin de vie, le transport et la maintenance se traitent selon le périmètre des facteurs. Une absence de données doit rester visible. Les indicateurs environnementaux s’interprètent séparément ; la fabrication et l’usage n’ont pas les mêmes contributions selon le mix électrique et l’indicateur.

## Du parc au système d’information

Le parc matériel est une partie du SI. Le RCP SI étudie le système d’information de l’organisation sur un an, avec ses services externalisés et ses moyens de support. Il inclut notamment des déplacements des personnes contribuant au SI. Les services destinés aux clients relèvent d’une étude distincte : leur périmètre ne se confond pas avec celui du SI interne.[^rcp-si]

Le simulateur reste un exemple de parc. L’élargissement de l’étude au SI inclut cloud, logiciels, réseaux et support, après exclusion des recouvrements avec les équipements déjà comptés. Les exclusions propres au RCP SI ne s’appliquent pas automatiquement à une application ou à un service web.

### Équipements partagés et réemploi

Le RCP SI propose des parts professionnelles de 57 % pour le BYOD et 85 % pour le COPE ; le second taux est présenté comme une convention incitative. Ces valeurs ne sont pas des mesures physiques universelles et ne deviennent pas des défauts D4B. L’usage professionnel retenu et sa source font partie des hypothèses documentées.

Pour le reconditionné, une première vie documentée peut entrer dans la durée totale. Une éventuelle vie future nécessite des justificatifs : un réemploi supposé ne suffit pas à réduire la fabrication allouée.

## Périmètre à compléter

Le refroidissement de la salle serveur n’est pas inclus. Le cas [Hébergement](./infrastructure-d-hebergement) décrit cette partie ; les mêmes serveurs restent comptés une seule fois. Pour un équipement présent six mois, la période ou la part d’allocation reflète ce temps de présence. Le stockage sans usage ne supprime pas sa fabrication.

<span id="règles-et-sources" />

Pour cadrer le résultat : [périmètre et unité d’analyse](../../fondations/perimetre-frontieres-services-tiers-et-unite-d-analyse), [allocation](../../regles/allocation-et-partage-des-impacts) et [double comptage](../../regles/double-comptabilisation).

Les facteurs électriques sont issus de l’instantané D4B 2025[^ref-1]. Les activités et données d’hébergement préremplies sont des hypothèses de l’exercice. Les facteurs et conventions sont consultables sous le simulateur.

<span id="lire-leffet-des-paramètres" />

Lorsque la durée de vie des portables augmente, la fabrication allouée par an diminue ; l’électricité ne change pas si l’usage reste identique. Ce calcul décrit une allocation sur la durée de vie. Il ne mesure pas, à lui seul, les émissions évitées par un achat reporté.

import { InlineAllocationExample } from '@site/src/components/inline-allocation-example';

<InlineAllocationExample lang="fr" />

## Exemple interactif {#simuler-votre-situation}

Cet exemple met en application les calculs et les limites présentés ci-dessus.

Le simulateur reprend une PME fictive : 50 portables, 30 écrans, 50 smartphones, trois switches et deux serveurs. Les valeurs de fabrication sont des entrées d’exercice, pas des facteurs recommandés.

Ex: 50 portables à 200 kg CO₂e de fabrication, conservés cinq ans, représentent `50 × 200 / 5 = 2 000 kg CO₂e/an` de fabrication allouée. À 70,4 kWh par portable et par an, leur consommation vaut `3 520 kWh/an`.

Avec l’inventaire prérempli et le facteur France 2025, le sous-total atteint **4 133,67 kg CO₂e/an** : 3 795 kg de fabrication allouée et 338,67 kg d’usage.

import { ScenarioPlayground } from '@site/src/components/scenario-playground';

<div className="inline-example">

<ScenarioPlayground kind="fleet" lang="fr" />

</div>

[^rcp-si]: ADEME, [RCP des systèmes d’information, mise à jour novembre 2024](https://librairie.ademe.fr/consommer-autrement/6649-referentiel-par-categorie-de-produit-rcp-des-systemes-d-information.html), p. 8–14.

[^ref-1]: Digital4Better, [instantané D4B 2025](https://github.com/digital4better/data/blob/77cae4a58fadd5deb3b8d4e5577020da08f780d8/data/factor/country-yearly.csv). Instantané 77cae4a, données 2025 ; revue du 16 octobre 2026.
