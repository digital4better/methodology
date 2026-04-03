# Impacts de la consommation d’énergie

## En bref

Quel que soit le sujet d’étude, la composante opérationnelle de l’impact s’évalue à partir d’une consommation d’électricité. Cette page explique comment convertir cette consommation en impacts environnementaux, et comment sont construits les facteurs électriques de référence.

## Conversion d’une consommation d’électricité en impact opérationnel {#conversion-consommation-electricite-impact-operationnel}

Cette conversion de l’énergie vers l’impact opérationnel repose sur l’équation suivante :

$$
\begin{align*}
&I_{operational_{i,p}} = E_{elec_p} \times IF_{i,p}\htmlClass{unit}{[U_i]}\\
Avec\\
&I_{operational_{i,p}} = \text{Impact opérationnel pour l’indicateur environnemental}\textit{ i }\text{dans le pays}\textit{ p }\htmlClass{unit}{[U_i]}\\
&E_{elec_p} = \text{Énergie électrique consommée dans le pays}\textit{ p }\htmlClass{unit}{[kWh]}\\
&IF_{i,p} = \text{Facteur d’impact de l’indicateur}\textit{ i }\text{dans le pays}\textit{ p }\htmlClass{unit}{[U_i/kWh]}\\
\end{align*}
$$

Les facteurs de conversion par pays sont présentés dans les sections suivantes.

## Facteurs des impacts de la consommation d’électricité par pays

La méthodologie, les ressources et les résultats sont disponibles en open source dans [`digital4better/data`](https://github.com/digital4better/data).

Le choix a été fait de construire une base dédiée afin de :

- couvrir tous les pays et certains découpages en États ou régions ;
- disposer de facteurs mis à jour mensuellement pour mieux retranscrire les évolutions du mix énergétique ;
- intégrer l’ensemble des indicateurs d’impacts environnementaux ;
- faire reposer les facteurs sur des études et références plus récentes que celles de certaines bases existantes.

## Méthodologie

Les facteurs sont estimés de façon relative à partir de l’électricité consommée dans la région géographique. Cette approche permet la prise en compte des flux d’importation et d’exportation d’électricité, contrairement à une approche basée uniquement sur l’électricité produite.

Pour la dimension provinces ou États, les importations et exportations nationales sont ventilées sur les subdivisions au prorata de leur quantité de production d’électricité.

L’équation suivante présente le calcul d’un facteur d’impact par pays pour une période :

$$
\begin{align*}
&IF_{i,p} = \frac{{\sum_{t} I_{i,t} \times E_{elec_{t,p}}}}{{\sum_{t}} E_{elec_{t,p}}}\htmlClass{unit}{[U_i/kWh]}\\
Avec\\
&IF_{i,p} = \text{Facteur d’impact pour l’indicateur}\textit{ i }\text{pour le pays}\textit{ p }\htmlClass{unit}{[U_i/kWh]}\\
&E_{elec_{t,p}} = \text{Consommation d'électricité pour la technologie}\textit{ t }\text{pour le pays}\textit{ p }\htmlClass{unit}{[kWh]}\\
&I_{i,t} = \text{Impact pour l’indicateur}\textit{ i }\text{lié à la consommation d'électricité de la technologie}\textit{ t }\htmlClass{unit}{[U_i/kWh]}\\
\end{align*}
$$

Les facteurs sont déterminés par pays en fonction du mix énergétique national et des impacts environnementaux associés aux différentes sources de production, regroupées en 9 technologies : charbon, gaz, divers fossile, vent, solaire, bioénergie, hydro, divers renouvelable, nucléaire.

Pour chaque pays, et afin de tenir compte des offres « énergie renouvelable », deux facteurs sont proposés :

- un facteur classique qui prend en compte le mix énergétique complet du pays ;
- un facteur énergie renouvelable qui ne prend en compte que les productions dites renouvelables.

## Variabilité géographique et temporelle

Une même quantité d’électricité peut produire des impacts très différents selon :

- le pays ou la région ;
- la période considérée ;
- la composition du mix électrique ;
- la méthode retenue pour traduire ce mix en facteur d’impact.

Par défaut, la méthode privilégie :

- des facteurs annuels pour les analyses de cadrage ;
- des facteurs mensuels lorsque la saisonnalité change matériellement le résultat.

## Ressources

Les données d’impacts de chaque technologie de production d’électricité par kWh proviennent de deux sources bibliographiques principales :

- pour le charbon, le gaz, le vent, le solaire, l’hydro et le nucléaire : [Life cycle assessment of electricity generation options](https://unece.org/sites/default/files/2022-04/LCA_3_FINAL%20March%202022.pdf), UNECE 2021 ;
- pour le divers fossile, la bioénergie et le divers renouvelable : [New approach for assessing and optimising the environmental performance of multinational electricity sectors: A European case study](https://www.sciencedirect.com/science/article/pii/S0196890422008159#b0530), septembre 2022.

Les mix électriques nationaux sont notamment extraits du site [Ember](https://ember-climate.org/) :

- mix électrique mensuel par pays ;
- mix électrique annuel par pays.

Des sources complémentaires sont utilisées pour certaines subdivisions géographiques, notamment au Canada et aux États-Unis.

## Hypothèses et limites

- Les débats sur les mix marginaux versus moyens existent et ne sont pas tranchés une fois pour toutes dans cette documentation.
- Certaines données d’impact par technologie restent européennes et nécessitent une extrapolation pour des usages mondiaux.
- Par défaut, la méthode reste alignée sur les jeux de données versionnés dans `digital4better/data`.

## Données mobilisées

- `digital4better/data/data/factor/*`
- `digital4better/data/data/energy/*`
- `digital4better/data/data/mix/*`

## Sources

- [digital4better/data](https://github.com/digital4better/data)
- Ember
- UNECE
- littérature méthodologique documentée dans le repo de données
