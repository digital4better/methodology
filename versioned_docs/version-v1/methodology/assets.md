---
sidebar_label: Parcs informatiques
sidebar_position: 7
slug: /assets
---

# Méthodologie appliquée aux parcs informatiques

## Spécificités du parc informatique

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

## Evaluation des impacts environnementaux d’un parc informatique

Le parc informatique étant constitué d’équipements :
- l’évaluation se basera uniquement sur les formules présentées dans le paragraphe [Impacts environnementaux d’un équipement](general.md#impacts-environnementaux-dun-équipement)
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

Dans le cas d’un équipement de parc informatique, la formule de calcul vue au paragraphe [Impact intrinsèque d'un équipement](general.md#impact-intrinsèque-dun-équipement) est appliquée avec les modalités suivantes :
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

Dans le cas d’un équipement de parc informatique, la formule de calcul vue au paragraphe [Impact opérationnel d'un équipement](general.md#impact-opérationnel-dun-équipement) est appliquée avec les modalités suivantes :
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

L’impact de consommation électrique corrigé est converti en impact opérationnel sur la base de la formule fournie au paragraphe [Conversion d’une consommation d’électricité en impact opérationnel](../concepts.md#conversion-dune-consommation-délectricité-en-impact-opérationnel).
