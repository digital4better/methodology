# Parc informatique

## Résumé

Ce chapitre décrit comment évaluer l’impact environnemental d’un parc informatique à partir de l’inventaire des équipements qui le composent, de leur durée de vie et de leur durée réelle d’utilisation.

### Périmètre évalué

Ce chapitre couvre :

- les équipements utilisateurs ;
- les équipements réseau ;
- les équipements serveurs ;
- certains équipements spécifiques liés à l’activité de l’organisation.

Il porte d’abord sur le parc physique détenu ou géré par l’organisation.

## Paramètres d'entrée

- un inventaire d’équipements aussi exhaustif que possible ;
- une période d’évaluation ;
- des hypothèses de durée d’utilisation ;
- des hypothèses de durée de vie ;
- des facteurs d’impact ou archétypes applicables aux équipements.

### Dépendances tierces

Les dépendances tierces concernent surtout :

- les équipements opérés par un tiers mais inclus dans le parc étudié ;
- les environnements d’hébergement ou de virtualisation qui ne doivent pas être assimilés à des équipements supplémentaires sans justification.

### Règle d'allocation

Dans ce chapitre, l’allocation est généralement égale à `1` pour un équipement utilisé dans le parc. Des ajustements ponctuels peuvent être nécessaires, notamment pour des équipements en stock pendant une partie de la période d’évaluation.

### Risque de double comptage

Le risque principal apparaît si :

- le même équipement est compté à la fois dans le parc et dans un environnement d’hébergement déjà étudié ;
- des machines virtuelles sont comptées comme des équipements alors que leur support matériel est déjà inclus ;
- des services tiers sont ajoutés sans clarification de périmètre.

### Hypothèses temporelles

Ce chapitre dépend fortement :

- de la durée d’évaluation retenue ;
- de la durée réelle d’utilisation des équipements ;
- de la durée de vie réelle ou nominale utilisée pour annualiser les impacts.

## Principe

1. Définir le périmètre du parc et la période d’évaluation.
2. Consolider un inventaire d’équipements suffisamment fiable.
3. Associer à chaque équipement un archétype ou un facteur d’impact documenté.
4. Corriger les impacts intrinsèques et opérationnels selon la durée d’évaluation et la durée réelle d’utilisation.
5. Agréger les résultats au niveau du parc en évitant de recompter des ressources déjà évaluées ailleurs.

## Évaluation des impacts

### Périmètre d’étude

Le parc informatique désigne la globalité des équipements qui composent le système informatique d'une organisation. Le parc peut comprendre :
- Des équipements « utilisateurs », c’est-à-dire les équipements directement utilisés par des collaborateurs de l’organisation. Exemples : laptop, smartphones, écrans, imprimantes, visioconférence, tablettes...
- Des équipements « réseaux », c’est-à-dire des équipements qui permettent d’acheminer la donnée depuis un équipement utilisateur vers un équipement de stockage de données. Exemples : box, switch, routeur…
- Des équipements « serveurs », c’est-à-dire les dispositifs permettant de stocker et traiter de la donnée. Exemples : serveurs, baies de stockage…
- Des équipements « spécifiques », c’est-à-dire des équipements électriques et électroniques propres aux activités de l’organisation. Exemples : terminaux de paiement, étiquettes automatiques, pad, imprimante 3D…

Remarques :
- Les machines virtuelles ne sont pas comptabilisées comme équipement, mais les supports matériels utilisés pour les faire fonctionner (ordinateur, serveur…) rentrent en compte dans l’inventaire des équipements de l’organisation.
- Conformément au RCP Systèmes d’information, sont exclus de l’évaluation :
  - « Les claviers, souris et autres périphériques de saisie de masse négligeable et présentant de très faibles quantités d’éléments électroniques (…)
  - Les chargeurs et équipements assimilés pour les périphériques mobiles »

### Inventaire des équipements

L’existence d’un parc informatique induit la mise en place d’une gestion de ce parc pour suivre les entrées/sorties, les attributions et les caractéristiques des équipements. Cette gestion repose sur la présence d’un inventaire des équipements. La qualité et l’exhaustivité de cet inventaire sont déterminants pour obtenir une évaluation crédible. 

### Durée d’évaluation vs durée d’utilisation

En termes de temporalité, 2 notions interviennent dans l’évaluation d’un impact de parc informatique.
La durée d’évaluation correspond à la profondeur temporelle de l’analyse, la période sur laquelle l’impact est calculé (exemple : 1 an).
La durée d’utilisation correspond au temps durant lequel l’équipement a effectivement fonctionné. Pour des équipements réseaux et serveurs, cette durée d’utilisation peut être égale à la durée d’évaluation. Pour les autres, cette durée d’utilisation dépend du statut de l’équipement (les équipements en stock font partie du parc mais ne sont pas utilisés). Elle est souvent estimée à partir des habitudes de travail de l’organisation (exemple : un ordinateur tourne 8h/j, 5j/7). 

### Évaluation détaillée des impacts du parc informatique

Le parc informatique étant constitué d’équipements :
- l’évaluation se basera uniquement sur les formules présentées dans [Modélisation d’un équipement](../../modelisation/modelisation-d-un-equipement.md#impacts-equipement)
- l’impact du parc sera égal à la somme des impacts par équipement

$$
\begin{align*}
&I_{i} = \sum_{k=1}^n EI_{k,i}\htmlClass{unit}{[U_i]}\\
Avec \\
&I_{i} = \text{Impact du parc informatique composé de}\textit{ n }\text{équipements pour l’indicateur environnemental}\textit{ i }\htmlClass{unit}{[U_i]}\\
&EI_{k,i} = \text{Impact}\textit{ t }\text{de l'équipement}\textit{ k }\text{pour l’indicateur environnemental}\textit{ i }\htmlClass{unit}{[U_i]}\\
\end{align*}
$$

### Impact intrinsèque d’un équipement de parc informatique

#### Impact intrinsèque de référence

Dans le cas d’un équipement de parc informatique, la formule de calcul vue dans [Modélisation d’un équipement](../../modelisation/modelisation-d-un-equipement.md#impact-intrinseque-d-un-equipement) est appliquée avec les modalités suivantes :
- L’équation est ramenée dans une unité de temps « années » plutôt que « secondes »
- La variable Durée d'évaluation $$EP$$ est déterminée par l’allocation de l’équipement. Dans le cas où le procédé étudié est le parc informatique, cette allocation est égale à 1, considérant que l’équipement est alloué au parc informatique dès lors qu’il est utilisé [^1]

#### Impact intrinsèque corrigé

L’étape précédente permet d’obtenir un impact intrinsèque sur la durée de référence du facteur EmbodiedFactorXEquipment. Par exemple, si le facteur utilisé est celui issu de la base empreinte pour un ordinateur professionnel, l’impact calculé correspond à un impact annuel car la quantité de référence utilisée pour fixer ce facteur est de 1 an.

Une correction est donc nécessaire pour ramener l’impact à la durée d’évaluation du parc informatique : 

$$
\begin{align*}
&E_{elec} = E_{elec_{ref}} \times \frac{EP}{RP}\htmlClass{unit}{[kWh]}\\
Avec \\
&E_{elec} = \text{Consommation électrique d'un équipement du parc}\htmlClass{unit}{[kWh]}\\
&E_{elec_{ref}} = \text{Consommation électrique de référence d'un équipement du parc}\htmlClass{unit}{[kWh]}\\
&EP = \text{Durée d’évaluation}\htmlClass{unit}{[années]}\\
&RP = \text{Durée de référence}\htmlClass{unit}{[années]}\\
\end{align*}
$$

### Impact opérationnel d’un équipement de parc informatique

#### Consommation électrique de référence

Dans le cas d’un équipement de parc informatique, la formule de calcul vue dans [Modélisation d’un équipement](../../modelisation/modelisation-d-un-equipement.md#impact-operationnel-d-un-equipement) est appliquée avec les modalités suivantes :
-	L’équation est ramenée dans une unité de temps « années » plutôt que « secondes »
-	La variable Durée d'évaluation $$EP$$ est déterminée par l’allocation de l’équipement. Dans le cas où le procédé étudié est le parc informatique, cette allocation est égale à 1, considérant que l’équipement est alloué au parc informatique dès lors qu’il est utilisé[^1]

#### Consommation électrique corrigée

L’étape précédente permet d’obtenir un impact sur la durée de référence du facteur EnergyFactorEquipment. Par exemple, si le facteur utilisé est celui fourni par la Base Empreinte pour un ordinateur professionnel, on utilise la « Quantité d'électricité nécessaire pour le procédé (kWh) » et celle-ci correspond à 1 an d’utilisation.

Une correction est donc nécessaire pour ramener l’impact à la durée d’évaluation du parc informatique : 

$$
\begin{align*}
&E_{elec} = E_{elec_{ref}} \times \frac{EP}{RP}\htmlClass{unit}{[kWh]}\\
Avec \\
&E_{elec} = \text{Consommation électrique d'un équipement du parc}\htmlClass{unit}{[kWh]}\\
&E_{elec_{ref}} = \text{Consommation électrique de référence d'un équipement du parc}\htmlClass{unit}{[kWh]}\\
&EP = \text{Durée d’évaluation}\htmlClass{unit}{[années]}\\
&RP = \text{Durée de référence}\htmlClass{unit}{[années]}\\
\end{align*}
$$

[^1]: Dans le cas d’équipements en stock durant tout ou partie de la durée d’évaluation, une décision sera prise au cas par cas d’ajuster ou non cette allocation en fonction du contexte d’étude (par exemple, un équipement resté en stock 6 mois sur 12 pourrait obtenir une allocation de 0,5).

#### Conversion en impact opérationnel

L’impact de consommation électrique corrigé est converti en impact opérationnel sur la base de la formule fournie dans [Impacts de la consommation d’énergie](../../fondations/impacts-de-la-consommation-d-energie.md#conversion-consommation-electricite-impact-operationnel).

## Hypothèses & limites

### Hypothèses retenues

La méthode suppose un inventaire de parc suffisamment fiable pour affecter chaque équipement à une catégorie pertinente, ainsi qu’une durée de vie et une durée d’utilisation documentées ou justifiables.

### Limitations connues

- la qualité du résultat dépend directement de l’exhaustivité de l’inventaire ;
- les équipements mutualisés ou fortement virtualisés peuvent être mal représentés si leurs supports matériels sont mal connus ;
- les équipements en stock, en réserve ou très faiblement utilisés demandent des règles d’allocation explicites ;
- certains petits périphériques peuvent être exclus par convention méthodologique, ce qui doit rester visible.

## Références

### Données mobilisées

- `digital4better/data/data/hardware/*`
- `digital4better/data/data/equipment/*`
- `digital4better/data/data/factor/*`
- inventaire du parc et données de gestion de flotte

### Sources

- RCP Systèmes d’information ;
- corpus `inputs/md` ;
- [digital4better/data](https://github.com/digital4better/data)
