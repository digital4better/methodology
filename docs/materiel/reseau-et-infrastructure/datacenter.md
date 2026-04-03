# Datacenter

## Résumé

Le datacenter n'est pas qu'un lieu d'hébergement. C'est une couche système qui combine équipements informatiques, réseau interne, infrastructure technique, refroidissement, approvisionnement électrique et contraintes géographiques.

Cette section modélise :

- l'impact intrinsèque du site et des équipements qu'il héberge ;
- l'impact opérationnel lié à l'énergie consommée par les équipements et par les infrastructures support ;
- les paramètres spécifiques comme `PUE`, `WUE`, `REF` et la localisation électrique.

Selon le cas d'usage, l'évaluation peut porter sur tout ou partie du centre de données, avec une approche équipement, système ou composant.

## Caractéristiques

| Caractéristique | Unité | Valeur par défaut | Plage ou cas typiques | Description |
| --- | --- | --- | --- | --- |
| Mode de modélisation | - | système si inventaire absent | équipement, système, composant | Détermine le type de calcul retenu |
| `PUE` | - | valeur documentée ou valeur par défaut | proche de 1 à plus élevé | Mesure l'efficacité énergétique du site |
| `REF` | % | `0` si inconnu | 0 à 100 % | Part d'énergie renouvelable prise en compte |
| Localisation électrique | pays ou région | pays du site | nationale à régionale | Sert à rattacher les facteurs d'électricité |
| Période étudiée | jour, mois, année | période observée | courte à longue | Sert à l'interprétation des consommations |
| Composition du site | - | archétype si inconnue | serveurs, stockage, réseau, refroidissement | Sert à choisir l'approche adaptée |

## Principe de modélisation

Un centre de données regroupe les équipements permettant d'organiser, stocker et traiter de grandes quantités de données : serveurs, baies de stockage, équipements réseau et de télécommunication, etc. Il inclut également les infrastructures de refroidissement, de sécurisation, de gestion et d'alimentation.

La méthode distingue trois approches :

- `approche équipement`, lorsque le matériel qui compose le centre de données est connu, suivi et maîtrisé ;
- `approche système`, lorsqu'on ne connaît pas les équipements et que l'on dispose seulement de facteurs agrégés ;
- `approche composant`, si l'inventaire des équipements n'est pas connu mais que la quantité de composants unitaires utilisés l'est.

## Impact intrinsèque (fabrication)

### Méthode de calcul

Dans l'approche équipement, l'impact intrinsèque du centre de données est évalué par somme des équipements qui le composent, chacun étant modélisé conformément à [Modélisation d’un équipement](../../modelisation/modelisation-d-un-equipement#impacts-equipement).

Dans l'approche système, le datacenter est assimilé à un système fermé au niveau duquel on dispose de facteurs d'impacts. Ces facteurs présentent toutefois plusieurs limites :

- ils sont souvent localisés sur un pays donné ;
- ils couvrent plus facilement le stockage que le traitement ;
- ils sont disponibles pour des durées et unités fonctionnelles fixes.

Dans l'approche composant, l'impact intrinsèque repose sur l'agrégation des composants unitaires connus : `CPU`, `GPU`, mémoire, stockage, réseau et éléments structurels.

### Complétion automatique

Quand les données manquent, la méthode recommande :

1. de privilégier l'approche équipement si l'inventaire est fiable ;
2. de recourir à l'approche composant si les équipements sont inconnus mais que les quantités unitaires le sont ;
3. de basculer vers une approche système si la reconstitution devient trop spéculative ;
4. de documenter explicitement les paramètres de site manquants, notamment `PUE` et `REF`.

### Fin de vie

La fin de vie est généralement intégrée dans les facteurs d'équipements ou d'archétypes mobilisés. Elle n'est pas modélisée séparément au niveau du site dans cette itération.

## Impact opérationnel (usage)

### Profil de consommation

L'efficacité énergétique d'un centre de données est définie par le ratio entre l'énergie totale consommée par le centre de données et l'énergie réellement consommée par les équipements délivrant le service informatique. Ce ratio est le [PUE](../../references/glossaire#pue-power-usage-effectiveness).

$$
\begin{align*}
&PUE = \frac{E_{datacenter}}{E_{servers}}\\
Avec \\
&PUE = \text{Efficacité énergétique}\\
&E_{datacenter} = \text{Énergie totale consommée par le centre de données}\htmlClass{unit}{[kWh]}\\
&E_{servers} = \text{Énergie consommée par les serveurs}\htmlClass{unit}{[kWh]}\\
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

Si le datacenter est modélisé par composants, la consommation électrique associée aux équipements de stockage et traitement est calculée en dissociant les types de composants :

$$
\begin{align*}
&E_{datacenter} = E_{components} + E_{network}\htmlClass{unit}{[kWh]}\\
Avec\\
&E_{datacenter} = \text{Consommation d’électricité des équipements informatiques}\htmlClass{unit}{[kWh]}\\
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

La conversion de cette consommation en impacts environnementaux se fait ensuite via [Impacts de la consommation d’énergie](../../fondations/impacts-de-la-consommation-d-energie).

### Facteurs d'ajustement

Les principaux facteurs d'ajustement sont :

- le `PUE` ;
- le `REF` et, selon les critères retenus, `WUE` ;
- la localisation électrique du site ;
- le niveau de charge et de mutualisation ;
- la période de validité des déclarations fournisseur.

Quand un ratio d'énergie renouvelable est documenté, la conversion de la consommation électrique en impact opérationnel peut intégrer un ajustement du facteur utilisé :

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

## Allocation et annualisation

Les impacts du datacenter sont presque toujours partagés entre plusieurs services. L'allocation peut se faire :

- au prorata des ressources consommées ;
- au prorata de la capacité réservée ;
- ou à partir d'unités pivot cohérentes avec le service étudié.

L'annualisation s'appuie sur la durée de vie des équipements et sur la période d'exploitation étudiée. Les règles générales sont rappelées dans [Allocation et partage des impacts](../../regles/allocation-et-partage-des-impacts).

## Hypothèses & limites

### Hypothèses retenues

- un `PUE` observé vaut mieux qu'une valeur moyenne générique ;
- l'approche composant n'est pertinente que si les hypothèses de reconstitution sont suffisamment solides ;
- le datacenter doit être distingué du seul serveur ou du seul service applicatif.

### Limitations connues

- les valeurs de `PUE`, `WUE` ou `REF` ne sont pas toujours observables au même niveau de précision ;
- les déclarations fournisseurs doivent être relues avec attention et comparées au référentiel canonique de données ;
- une approche composant ne vaut que si la qualité des hypothèses de reconstitution est suffisante.

### Perspectives

- enrichir les données D4B sur les paramètres de site et archétypes de datacenter ;
- mieux relier les approches système, équipement et composant ;
- proposer un simulateur quand les paramètres d'entrée prioritaires seront suffisamment stabilisés.

## Application

Cette section est mobilisée directement dans :

- [Infrastructure d’hébergement](../../cas-d-usage/environnements/infrastructure-d-hebergement), pour les environnements maîtrisés ;
- [Cloud](../../cas-d-usage/environnements/cloud), quand les ressources facturées sont reliées à un site d'exécution ;
- [IA générative](../../cas-d-usage/services/ia-generative), quand la consommation des accélérateurs doit être replacée dans un contexte de site.

## Références

### Données mobilisées

- `digital4better/data/data/cloud/*`
- `digital4better/data/data/factor/*`
- `digital4better/data/data/energy/*`

### Sources

- `inputs/md/green-cloud-computing-uba-2021.md`
- `inputs/md/méthodologie-du-tracker-d-impact-environnemental-d-ovhcloud.md`
- corpus `inputs/md`
