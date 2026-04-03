# Impacts de la consommation d'énergie

## En bref

Quel que soit le sujet d'étude, la composante opérationnelle de l'impact s'évalue à partir d'une consommation d'électricité. Cette page explique comment convertir cette consommation en impacts environnementaux et comment sont construits les facteurs électriques de référence. La variabilité de ces facteurs selon le pays, la saison et le mix de production est un déterminant majeur des résultats.

## Conversion d'une consommation d'électricité en impact opérationnel {#conversion-consommation-electricite-impact-operationnel}

La conversion de l'énergie vers l'impact opérationnel repose sur l'équation suivante :

$$
\begin{align*}
&I_{operational_{i,p}} = E_{elec_p} \times IF_{i,p}\htmlClass{unit}{[U_i]}\\
Avec\\
&I_{operational_{i,p}} = \text{Impact opérationnel pour l'indicateur environnemental}\textit{ i }\text{dans le pays}\textit{ p }\htmlClass{unit}{[U_i]}\\
&E_{elec_p} = \text{Énergie électrique consommée dans le pays}\textit{ p }\htmlClass{unit}{[kWh]}\\
&IF_{i,p} = \text{Facteur d'impact de l'indicateur}\textit{ i }\text{dans le pays}\textit{ p }\htmlClass{unit}{[U_i/kWh]}\\
\end{align*}
$$

:::note[Formule applicable à tous les indicateurs]
Cette formule est générique : l'indice $i$ représente n'importe lequel des 9 indicateurs environnementaux retenus par la méthode. L'unité $U_i$ doit être adaptée en conséquence (kg CO₂ eq. pour le GWP, m³ eq. pour le WU, etc.).
:::

## Principe de construction des facteurs

Le schéma ci-dessous résume la chaîne de construction des facteurs d'impact électriques :

```mermaid
flowchart LR
    A[Mix électrique<br>par pays et par mois] --> B[Répartition par<br>technologie de production]
    B --> C[Facteur d'impact<br>par technologie]
    C --> D[Facteur d'impact<br>pondéré par pays]
    D --> E[Application dans<br>les calculs d'impact]

    style A fill:#264653,color:#fff
    style B fill:#2a9d8f,color:#fff
    style C fill:#e9c46a,color:#000
    style D fill:#f4a261,color:#000
    style E fill:#e76f51,color:#fff
```

## Facteurs des impacts de la consommation d'électricité par pays

La méthodologie, les ressources et les résultats sont disponibles en open source dans [`digital4better/data`](https://github.com/digital4better/data).

Le choix a été fait de construire une base dédiée afin de :

- couvrir **tous les pays** et certains découpages en États ou régions ;
- disposer de facteurs **mis à jour mensuellement** pour mieux retranscrire les évolutions du mix énergétique ;
- intégrer **l'ensemble des 9 indicateurs** d'impacts environnementaux ;
- faire reposer les facteurs sur des **études et références plus récentes** que celles de certaines bases existantes.

## Méthodologie de calcul

Les facteurs sont estimés à partir de l'électricité **consommée** dans la région géographique. Cette approche prend en compte les flux d'importation et d'exportation d'électricité, contrairement à une approche basée uniquement sur l'électricité produite.

Pour la dimension provinces ou États, les importations et exportations nationales sont ventilées sur les subdivisions au prorata de leur quantité de production d'électricité.

### Formule de calcul

$$
\begin{align*}
&IF_{i,p} = \frac{{\sum_{t} I_{i,t} \times E_{elec_{t,p}}}}{{\sum_{t}} E_{elec_{t,p}}}\htmlClass{unit}{[U_i/kWh]}\\
Avec\\
&IF_{i,p} = \text{Facteur d'impact pour l'indicateur}\textit{ i }\text{pour le pays}\textit{ p }\htmlClass{unit}{[U_i/kWh]}\\
&E_{elec_{t,p}} = \text{Consommation d'électricité pour la technologie}\textit{ t }\text{pour le pays}\textit{ p }\htmlClass{unit}{[kWh]}\\
&I_{i,t} = \text{Impact pour l'indicateur}\textit{ i }\text{lié à la consommation d'électricité de la technologie}\textit{ t }\htmlClass{unit}{[U_i/kWh]}\\
\end{align*}
$$

### Technologies de production

Les facteurs sont calculés à partir de 9 technologies de production, regroupées en deux familles :

| Famille | Technologies | Caractéristique principale |
|---|---|---|
| **Fossiles** | Charbon, gaz, divers fossile | Fort impact GWP, fort AP |
| **Bas carbone** | Vent, solaire, bioénergie, hydro, divers renouvelable, nucléaire | Faible GWP, mais impacts variables sur d'autres indicateurs (IR pour le nucléaire, ADPe pour le solaire) |

### Deux facteurs par pays

Pour chaque pays, et afin de tenir compte des offres « énergie renouvelable », deux facteurs sont proposés :

- un **facteur classique** qui prend en compte le mix énergétique complet du pays ;
- un **facteur énergie renouvelable** qui ne prend en compte que les productions dites renouvelables.

Cette distinction est utilisée dans le calcul de l'impact opérationnel des centres de données disposant d'un REF (Renewable Energy Factor). Voir [Couches logicielles et virtualisation](../regles/prise-en-compte-des-couches-logicielles-et-de-la-virtualisation) pour l'intégration du PUE et du REF.

## Variabilité géographique et temporelle

Une même quantité d'électricité peut produire des impacts très différents selon le pays, la période et le mix de production. Cette variabilité est un déterminant majeur des résultats.

### Illustration de la variabilité géographique (GWP)

| Pays | Mix dominant | Facteur GWP approximatif (g CO₂ eq./kWh) | Ordre de grandeur |
|---|---|---|---|
| France | Nucléaire (~70 %) | ~60 | Très bas carbone |
| Suède | Hydro + nucléaire | ~30 | Très bas carbone |
| Allemagne | Renouvelable + gaz + charbon | ~350 | Moyen |
| Pologne | Charbon (~70 %) | ~700 | Très carboné |
| Chine | Charbon + hydro | ~550 | Carboné |
| États-Unis | Mix varié par État | ~400 (moyenne) | Moyen à carboné |

:::note[Impact sur les conclusions]
Un serveur consommant 1 000 kWh/an émet environ 60 kg CO₂ eq. en France mais 700 kg CO₂ eq. en Pologne — un facteur 12. Le choix du facteur électrique est donc au moins aussi structurant que le choix des hypothèses de consommation.
:::

### Variabilité temporelle

Par défaut, la méthode privilégie :

- des **facteurs annuels** pour les analyses de cadrage ;
- des **facteurs mensuels** lorsque la saisonnalité change matériellement le résultat (ex. : pays à forte production hydraulique saisonnière, ou forte production solaire estivale).

La fréquence de mise à jour mensuelle de `digital4better/data` permet de capter ces variations.

## Ressources

Les données d'impacts de chaque technologie de production d'électricité par kWh proviennent de deux sources bibliographiques principales :

- pour le charbon, le gaz, le vent, le solaire, l'hydro et le nucléaire : [Life cycle assessment of electricity generation options](https://unece.org/sites/default/files/2022-04/LCA_3_FINAL%20March%202022.pdf), UNECE 2021 ;
- pour le divers fossile, la bioénergie et le divers renouvelable : [New approach for assessing and optimising the environmental performance of multinational electricity sectors: A European case study](https://www.sciencedirect.com/science/article/pii/S0196890422008159#b0530), septembre 2022.

:::note[Extrapolation européenne]
Ces données sont relatives à l'Europe. En l'absence de données mondiales suffisamment homogènes, une extrapolation est réalisée. Cette limite est documentée et les facteurs sont régulièrement confrontés aux données disponibles pour d'autres régions.
:::

Les mix électriques nationaux sont notamment extraits du site [Ember](https://ember-climate.org/) :

- mix électrique mensuel (pour ~85 pays) ;
- mix électrique annuel (pour tous les pays).

Des sources complémentaires sont utilisées pour certaines subdivisions géographiques, notamment au [Canada](https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=2510001501) et aux [États-Unis](https://www.eia.gov/electricity/data/eia923/).

## Hypothèses et limites

- Les débats entre **mix marginal et mix moyen** ne sont pas tranchés une fois pour toutes dans cette documentation. La méthode utilise par défaut le mix moyen (approche attributionnelle), cohérent avec la posture générale.
- Certaines données d'impact par technologie restent européennes et nécessitent une extrapolation pour des usages mondiaux.
- La méthode reste alignée sur les jeux de données versionnés dans `digital4better/data`. Toute évaluation doit tracer la version des facteurs utilisés (voir [Temporalité et versionnement](../regles/temporalite-vieillissement-et-versionnement-des-donnees)).
- Les facteurs « énergie renouvelable » ne doivent pas être utilisés sans vérification de la réalité contractuelle et physique de l'approvisionnement.

## Données mobilisées

- `digital4better/data` → `data/factor/*`, `data/energy/*`, `data/mix/*`

## Sources

- [digital4better/data](https://github.com/digital4better/data)
- [Ember](https://ember-climate.org/)
- [UNECE, 2021 -- Life cycle assessment of electricity generation options](https://unece.org/sites/default/files/2022-04/LCA_3_FINAL%20March%202022.pdf)
- [Energy Conversion and Management, 2022](https://www.sciencedirect.com/science/article/pii/S0196890422008159#b0530)
