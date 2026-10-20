# Datacenter

import { MethodIllustration } from '@site/src/components/method-illustrations';

Un datacenter combine équipements informatiques, réseau interne, infrastructure technique, refroidissement et approvisionnement électrique. Cette section couvre l'impact intrinsèque du site et de ses équipements, ainsi que l'énergie consommée par l'IT et ses auxiliaires.

Le `PUE`, le `WUE`, le `REF` et la localisation électrique précisent le contexte du site.[^source-4] L'évaluation peut porter sur tout ou partie du centre de données, selon les informations disponibles.

## Caractéristiques

| Caractéristique | Unité | Valeur par défaut | Plage ou cas typiques | Description |
| --- | --- | --- | --- | --- |
| Mode de modélisation | - | système si inventaire absent | équipement, système, composant | Détermine le type de calcul retenu |
| `PUE` | - | valeur documentée ou valeur par défaut | proche de 1 à plus élevé | Mesure l'efficacité énergétique du site [^source-2]|
| `REF` | % | inconnu si non documenté | 0 à 100 % | Part d'énergie renouvelable prise en compte |
| Localisation électrique | pays ou région | pays du site | nationale à régionale | Sert à rattacher les facteurs d'électricité |
| Période étudiée | jour, mois, année | période observée | courte à longue | Sert à l'interprétation des consommations |
| Composition du site | - | archétype si inconnue | serveurs, stockage, réseau, refroidissement | Sert à choisir l'approche adaptée |

## Principe de modélisation

Le périmètre comprend les serveurs, le stockage, les équipements réseau et de télécommunication, ainsi que le refroidissement, la sécurisation, la gestion et l'alimentation.[^donnees-modele]

| Données disponibles | Représentation retenue |
| --- | --- |
| Inventaire matériel fiable | Approche équipement : somme des équipements connus et suivis. |
| Quantités de composants connues, équipements inconnus | Approche composant : agrégation des ressources unitaires. |
| Facteur agrégé compatible seul disponible | Approche système : facteur du périmètre évalué. |

## Impact intrinsèque (fabrication)

### Méthode de calcul

L'approche équipement suit [Modélisation d’un équipement](../../modelisation/modelisation-d-un-equipement#impacts-equipement) pour chacun des actifs, puis additionne leurs impacts sans recouvrement.

L'approche système utilise un facteur agrégé. Sa géographie, sa durée et son unité fonctionnelle limitent sa réutilisation. Certains facteurs couvrent mieux le stockage que le traitement.

L'approche composant agrège les contributions connues des `CPU`, `GPU`, de la mémoire, du stockage, du réseau et des éléments structurels.

### Quand une donnée manque {#complétion-automatique}

La précision du calcul dépend de l’inventaire disponible. Des quantités de composants permettent un calcul partiel, même sans connaître les modèles de serveurs. Elles ne révèlent pas les autres équipements ni l’efficacité énergétique du site.

| Situation | Exemple fictif |
| --- | --- |
| **Au départ** | L’hébergeur déclare **8 CPU et 512 Go de RAM**. Le stockage, le réseau et le PUE ne sont pas renseignés. |
| **Référence choisie** | Des facteurs compatibles sont disponibles **pour ces CPU et cette mémoire**. Aucune référence ne permet de compléter les autres postes. |
| **Dans le calcul** | Le calcul porte sur les **composants connus**. Le stockage, le réseau et les structures restent non évalués ; le **PUE reste inconnu**. Le résultat est un sous-total, pas l’impact complet du site. |

Un inventaire fiable des équipements reste prioritaire. Si la reconstruction par composants devient trop incertaine, un facteur global de service peut être utilisé lorsque son périmètre et son unité correspondent au cas étudié. Il remplace le calcul du même périmètre, sans s’y ajouter.

### Fin de vie

La fin de vie est généralement intégrée dans les facteurs d'équipements ou d'archétypes mobilisés. Elle n'est pas modélisée séparément au niveau du site dans cette itération.

## Impact opérationnel (usage)

### Profil de consommation {#profil-de-consommation}

L'efficacité énergétique d'un centre de données est définie par le ratio entre l'énergie totale consommée par le centre de données et l'énergie réellement consommée par les équipements délivrant le service informatique. Ce ratio est le [PUE](../../references/glossaire#pue-power-usage-effectiveness).

$$
\begin{align*}
&PUE = \frac{E_{datacenter}}{E_{IT}}\\
Avec \\
&PUE = \text{Efficacité énergétique}\\
&E_{datacenter} = \text{Énergie totale consommée par le centre de données}\htmlClass{unit}{[kWh]}\\
&E_{IT} = \text{Énergie consommée par tous les équipements IT}\htmlClass{unit}{[kWh]}\\
\end{align*}
$$

Quand la consommation électrique est évaluée à partir des équipements, un calcul complémentaire est nécessaire pour prendre en compte l'énergie consommée pour les activités annexes du centre de données :

$$
\begin{align*}
&E_{elec} = E_{usage} \times PUE\htmlClass{unit}{[kWh]}\\
Avec \\
&E_{elec} = \text{Énergie totale consommée par le centre de données}\htmlClass{unit}{[kWh]}\\
&E_{usage} = \text{Énergie consommée par les équipements}\htmlClass{unit}{[kWh]}\\
&PUE = \text{Efficacité énergétique}\\
\end{align*}
$$

<MethodIllustration kind="pue" lang="fr" />

Si le datacenter est modélisé par composants, la consommation électrique associée aux équipements de stockage et traitement est calculée en dissociant les types de composants :

$$
\begin{align*}
&E_{IT} = E_{components} + E_{network}\htmlClass{unit}{[kWh]}\\
Avec\\
&E_{IT} = \text{Consommation d’électricité des équipements informatiques}\htmlClass{unit}{[kWh]}\\
&E_{components} = \text{Consommation d’électricité des équipements de stockage et de traitement}\htmlClass{unit}{[kWh]}\\
&E_{network} = \text{Consommation d’électricité des équipements réseaux}\htmlClass{unit}{[kWh]}\\
\end{align*}
$$

$$
\begin{align*}
&E_{components} = D_{usage} \times (P_{cpu} + P_{gpu} + P_{ram} + P_{storage})\htmlClass{unit}{[kWh]}\\
Avec\\
&D_{usage} = \text{Durée d’utilisation des équipements}\htmlClass{unit}{[h]}\\
&P_{cpu} = N_{vcpu} \times (P_{cpu_{min}} + \frac{1}{2} \times (P_{cpu_{max}} - P_{cpu_{min}}))\htmlClass{unit}{[kW]}\\
&P_{gpu} = N_{gpu} \times (P_{gpu_{min}} + \frac{1}{2} \times (P_{gpu_{max}} - P_{gpu_{min}}))\htmlClass{unit}{[kW]}\\
&P_{ram} = N_{ram} \times 0,000392\htmlClass{unit}{[kW]}\\
&P_{storage} = \begin{cases}
1,2\cdot10^{-3} \times V_{storage} &\text{si } Stockage SSD \\
0,65\cdot10^{-3} \times V_{storage} &\text{si } Stockage HDD
\end{cases}\htmlClass{unit}{[kW]}\\
\end{align*}
$$

La consommation des composants n’inclut pas nécessairement les alimentations, ventilateurs et cartes mères. Ces postes complètent un calcul partiel ; une mesure AC complète les couvre déjà.

Dans ce modèle simplifié, `N_ram` est une capacité en Go et `V_storage` une capacité en To. Le CPU représente la part physique allouée à chaque vCPU. Les coefficients moyens ne sont pas des mesures de tous les matériels.[^source-1]

La conversion de cette consommation en impacts environnementaux se fait ensuite via [Impacts de la consommation d’énergie](../../fondations/impacts-de-la-consommation-d-energie).

### Facteurs d'ajustement {#facteurs-dajustement}

Le `PUE` et la localisation électrique déterminent le traitement de l'énergie. Le `WUE` décrit l'eau directe, tandis que le `REF` renseigne l'approvisionnement renouvelable. La charge, la mutualisation et la période de validité des déclarations fournisseur précisent l'interprétation.

Le résultat de référence utilise le mix électrique moyen de consommation du site. Le REF décrit un approvisionnement ; il ne réduit pas automatiquement ce résultat. La formule historique ci-dessous peut servir à une **analyse de sensibilité distincte**, uniquement si les deux facteurs représentent des parts complémentaires sans double comptage. Le mix national inclut déjà des renouvelables : l'interpoler avec un mix renouvelable ne reconstitue pas un approvisionnement physique vérifié. Cette variante n'est pas un calcul SCI.[^source-5]

$$
\begin{align*}
&I_{operational_{i,p}} = E_{elec_p} \times (REF \times RIF_{i,p} + (1 - REF) \times IF_{i,p})\htmlClass{unit}{[U_i]}\\
Avec\\
&I_{operational_{i,p}} = \text{Impact opérationnel pour l’indicateur environnemental}\textit{ i }\text{ dans le pays }\textit{ p }\htmlClass{unit}{[U_i]}\\
&E_{elec_p} = \text{Énergie électrique consommée dans le pays}\textit{ p }\htmlClass{unit}{[kWh]}\\
&IF_{i,p} = \text{Facteur d'impact standard}\htmlClass{unit}{[U_i/kWh]}\\
&RIF_{i,p} = \text{Facteur d'impact énergie renouvelable}\htmlClass{unit}{[U_i/kWh]}\\
\end{align*}
$$

Dans cette formule, `REF` est une fraction entre 0 et 1 (80 % → 0,8). Une donnée inconnue reste inconnue. Un certificat d'achat ne justifie ni un facteur nul ni une baisse automatique des neuf indicateurs.

### Eau directe et eau liée à l'électricité

Pour un WUE de site en litres par kWh IT, le volume direct vaut :

$$
V_{direct}\,[L] = WUE\,[L/kWh_{IT}] \times E_{IT}\,[kWh]
$$

L’eau directe utilise l’énergie IT sans nouveau multiplicateur PUE. L’eau liée à l’électricité dépend de l’énergie totale du site. L’agrégation en WU demande une caractérisation compatible avec la méthode et la géographie.

<MethodIllustration kind="water" lang="fr" />

## Allocation et annualisation

Les impacts partagés sont répartis selon les ressources consommées, la capacité réservée ou une unité pivot cohérente avec le service. L'annualisation dépend de la durée de vie des équipements et de la période étudiée.

Les conventions sont décrites dans [Allocation et partage des impacts](../../regles/allocation-et-partage-des-impacts).

## Hypothèses & limites

### Hypothèses retenues

Un `PUE` observé et représentatif est préférable à une moyenne générique. La reconstruction par composants n'est pertinente qu'avec des hypothèses suffisamment solides. Le datacenter reste un périmètre plus large qu'un serveur ou un service applicatif.

### Limitations connues

Les valeurs de `PUE`, `WUE` et `REF` ne sont pas toujours disponibles à la même précision. Les déclarations fournisseurs nécessitent une confrontation au référentiel canonique de données. Le détail d'un modèle par composants ne compense pas la fragilité de ses hypothèses de reconstruction.

### Perspectives

Les améliorations portent sur les paramètres de site et les archétypes D4B, ainsi que sur la cohérence des périmètres entre les approches système, équipement et composant.

## Exemple interactif {#simulateur}

Le simulateur exploratoire ci-dessous évalue une **configuration de serveur physique** et ses auxiliaires électriques via le PUE. Il ne calcule ni l'ACV complète du datacenter ni une allocation automatique à une VM. Les bâtiments, équipements de refroidissement et infrastructures électriques nécessitent des inventaires séparés lorsqu'ils ne sont pas déjà inclus ; le PUE ne couvre pas leur fabrication.

import { ScenarioPlayground } from '@site/src/components/scenario-playground';

<div className="inline-example">

<ScenarioPlayground kind="hosting" lang="fr" />

</div>

## Application

[Infrastructure d’hébergement](../../cas-d-usage/environnements/infrastructure-d-hebergement) couvre les environnements maîtrisés. [Cloud](../../cas-d-usage/environnements/cloud) relie les ressources facturées à un site d'exécution. [IA générative](../../cas-d-usage/services/ia-generative) replace la consommation des accélérateurs dans ce contexte.

[^source-1]: UBA, [Green Cloud Computing](https://www.umweltbundesamt.de/publikationen/green-cloud-computing), 2021. Voir le [corpus documentaire](../../references/sources-et-corpus).

[^source-2]: OVHcloud, [Méthodologie du Tracker d’impact environnemental](https://www.ovhcloud.com/fr/about-us/environmental-impact-tracker/), version 2.0 du 4 juin 2025.

[^source-4]: [The Green Grid ; PUE](https://www.thegreengrid.org/node/372) et [WUE](https://www.thegreengrid.org/system/files/store/WUE_v1.pdf).

[^source-5]: [Software Carbon Intensity ; facteurs électriques et exclusions](https://sci.greensoftware.foundation/). Documentation en ligne, version non figée.

[^donnees-modele]: `data/cloud/*`. `data/factor/*`. `data/energy/*`. [Digital4Better, catalogue de données, instantané 77cae4a](https://github.com/digital4better/data/tree/77cae4a58fadd5deb3b8d4e5577020da08f780d8).
