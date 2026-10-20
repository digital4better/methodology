# Impacts de la consommation d'énergie

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

    class A d4b-navy
    class B d4b-blue
    class C d4b-sand
    class D d4b-rose
    class E d4b-coral
```

## Facteurs des impacts de la consommation d'électricité par pays

La méthodologie, les ressources et les résultats sont disponibles en open source dans `digital4better/data`.[^source-1]

Le choix a été fait de construire une base dédiée afin de :

- couvrir **tous les pays** et certains découpages en États ou régions.
- disposer de facteurs **annuels ou mensuels selon la couverture disponible** pour mieux retranscrire les évolutions du mix énergétique.
- intégrer **l'ensemble des 9 indicateurs** d'impacts environnementaux.
- faire reposer les facteurs sur des **études et références plus récentes** que celles de certaines bases existantes.

### Méthodologie de calcul {#méthodologie-de-calcul}

Les facteurs sont estimés à partir de l'électricité **consommée** dans la région géographique. Cette approche prend en compte les flux d'importation et d'exportation d'électricité, contrairement à une approche basée uniquement sur l'électricité produite.

Pour la dimension provinces ou États, les importations et exportations nationales sont ventilées sur les subdivisions au prorata de leur quantité de production d'électricité.

#### Formule de calcul

$$
\begin{align*}
&IF_{i,p} = \frac{{\sum_{t} I_{i,t} \times E_{elec_{t,p}}}}{{\sum_{t}} E_{elec_{t,p}}}\htmlClass{unit}{[U_i/kWh]}\\
Avec\\
&IF_{i,p} = \text{Facteur d'impact pour l'indicateur}\textit{ i }\text{pour le pays}\textit{ p }\htmlClass{unit}{[U_i/kWh]}\\
&E_{elec_{t,p}} = \text{Consommation d'électricité pour la technologie}\textit{ t }\text{pour le pays}\textit{ p }\htmlClass{unit}{[kWh]}\\
&I_{i,t} = \text{Impact pour l'indicateur}\textit{ i }\text{lié à la consommation d'électricité de la technologie}\textit{ t }\htmlClass{unit}{[U_i/kWh]}\\
\end{align*}
$$

#### Technologies de production

Les facteurs sont calculés à partir de 9 technologies de production, regroupées en deux familles :

| Famille | Technologies | Caractéristique principale |
|---|---|---|
| **Fossiles** | Charbon, gaz, divers fossile | Fort impact GWP, fort AP |
| **Bas carbone** | Vent, solaire, bioénergie, hydro, divers renouvelable, nucléaire | Faible GWP, mais impacts variables sur d'autres indicateurs (IR pour le nucléaire, ADPe pour le solaire) |

#### Deux facteurs par pays

Pour chaque pays, et afin de tenir compte des offres « énergie renouvelable », deux facteurs sont proposés :

<dl className="model-profiles">
  <div>
    <dt>Facteur classique</dt>
    <dd>

Prend en compte le mix énergétique complet du pays.

    </dd>
  </div>
  <div>
    <dt>Facteur énergie renouvelable</dt>
    <dd>

Ne prend en compte que les productions dites renouvelables.

    </dd>
  </div>
</dl>

Le calcul de référence reste fondé sur le mix moyen complet. Le facteur renouvelable sert à une sensibilité séparée : un REF contractuel ne permet pas, à lui seul, de reconstituer le mix physique ni de réduire un score SCI. Voir [Couches logicielles et virtualisation](../regles/prise-en-compte-des-couches-logicielles-et-de-la-virtualisation) pour l'intégration du PUE et du REF.

## Variabilité géographique et temporelle

Une même quantité d'électricité peut produire des impacts très différents selon le pays, la période et le mix de production. Cette variabilité est un déterminant majeur des résultats.

### Illustration de la variabilité géographique (GWP)

| Pays | Année | Facteur GWP (g CO₂e/kWh) |
|---|---:|---:|
| France | 2025 | 31.93 |
| Suède | 2025 | 12.82 |
| Allemagne | 2025 | 329.63 |
| Pologne | 2025 | 644.15 |
| Chine | 2025 | 589.30 |
| États-Unis | 2025 | 354.80 |

Valeurs du jeu D4B versionné[^ref-1], consulté le 16 octobre 2026, également utilisé par les simulateurs. Ex: 1 000 kWh donnent 31,93 kg CO₂e en France et 644,15 kg en Pologne, à consommation et périmètre électrique identiques. Ces valeurs ne représentent pas l’empreinte complète du serveur.

### Variabilité temporelle

Par défaut, la méthode privilégie :

<dl className="model-profiles">
  <div>
    <dt>Facteurs annuels</dt>
    <dd>

Pour les analyses de cadrage.

    </dd>
  </div>
  <div>
    <dt>Facteurs mensuels</dt>
    <dd>

Lorsque la saisonnalité change matériellement le résultat (ex. : pays à forte production hydraulique saisonnière, ou forte production solaire estivale).

    </dd>
  </div>
</dl>

#### Illustration de la variabilité temporelle (GWP)

À pays identique, le facteur varie aussi d’un mois à l’autre. Les valeurs ci-dessous sont exprimées en **g CO₂e/kWh** et proviennent du même instantané D4B que les exemples géographiques.[^facteurs-mensuels]

| Pays | Janvier 2025 | Juillet 2025 |
|---|---:|---:|
| France | 42,66 | 26,36 |
| Allemagne | 372,63 | 317,31 |
| Brésil | 53,46 | 83,13 |

Pour **1 000 kWh**, l’impact électrique est de **42,66 kg CO₂e en janvier contre 26,36 kg en juillet** en France. Au Brésil, il passe de **53,46 à 83,13 kg CO₂e**. Ces deux mois illustrent une variation observée, pas une règle saisonnière valable chaque année.

Une évaluation mensuelle applique le facteur de chaque mois à la consommation correspondante, puis additionne les impacts. Lorsque la consommation varie, le facteur moyen est pondéré par les kWh de chaque mois. Les moyennes mensuelles ne décrivent pas les variations horaires.

La fraîcheur des données dépend de la dernière période effectivement disponible dans le fichier. Une fréquence mensuelle prévue ne prouve ni l'actualité ni la complétude d'un jeu de données. Les simulateurs utilisent ici une année complète (2025), pas une extrapolation des mois disponibles de 2026.

## Lecture des contrats d’électricité

Le **Référentiel par catégorie de produit (RCP) des services numériques de l’ADEME, version 2 de juin 2026**, retient le mix de consommation géographique, imports compris. Les garanties d’origine et compensations ne réduisent pas ce résultat. Il prévoit un traitement spécifique de la production sur site, avec son cycle de vie complet et des conditions sur les certificats ; un contrat renouvelable distant ne remplace pas le mix local.[^rcp-parent]

D4B conserve le facteur de consommation par pays pour la lecture géographique. Le facteur « renouvelable » permet une analyse de sensibilité distincte. Son utilisation pour la part REF du cloud est décrite dans la [convention cloud](../cas-d-usage/environnements/cloud.md#electricite-cloud), avec ses données et ses limites propres.

## Ressources

Les données d'impacts de chaque technologie de production d'électricité par kWh proviennent de deux sources bibliographiques principales :

- pour le charbon, le gaz, le vent, le solaire, l'hydro et le nucléaire : Life cycle assessment of electricity generation options[^source-3], UNECE 2021.
- pour le divers fossile, la bioénergie et le divers renouvelable : New approach for assessing and optimising the environmental performance of multinational electricity sectors: A European case study[^source-4], septembre 2022.

:::note[Extrapolation européenne]
Ces données sont relatives à l'Europe. En l'absence de données mondiales suffisamment homogènes, une extrapolation est réalisée. Cette limite est documentée et les facteurs sont régulièrement confrontés aux données disponibles pour d'autres régions.
:::

Les mix électriques nationaux sont notamment extraits du site Ember[^source-2] :

- mix électrique mensuel (pour ~85 pays).
- mix électrique annuel (pour tous les pays).

Des sources complémentaires sont utilisées pour certaines subdivisions géographiques, notamment au Canada[^ref-2] et aux États-Unis[^ref-3].

## Hypothèses et limites

- Les débats entre **mix marginal et mix moyen** ne sont pas tranchés une fois pour toutes dans cette documentation. La méthode utilise par défaut le mix moyen (approche attributionnelle), cohérent avec la posture générale.
- Certaines données d'impact par technologie restent européennes et nécessitent une extrapolation pour des usages mondiaux.
- La méthode reste alignée sur les jeux de données versionnés dans `digital4better/data`. Toute évaluation doit tracer la version des facteurs utilisés (voir [Temporalité et versionnement](../regles/temporalite-vieillissement-et-versionnement-des-donnees)).
- Les facteurs « énergie renouvelable » ne doivent pas être utilisés sans vérification de la réalité contractuelle et physique de l'approvisionnement.

[^rcp-parent]: ADEME, [RCP services numériques, version 2, juin 2026](https://librairie.ademe.fr/societe-et-politiques-publiques/9418-methodologie-d-evaluation-environnementale-basee-sur-l-analyse-du-cycle-de-vie-acv-pour-un-service-numerique.html), p. 22.

[^source-1]: Digital4Better, [digital4better/data](https://github.com/digital4better/data) Catalogue évolutif ; utiliser un commit pour figer les facteurs. Répertoires : `data/factor/*`, `data/energy/*`, `data/mix/*`.

[^source-2]: [Ember](https://ember-climate.org/) Documentation en ligne, version non figée.

[^source-3]: [UNECE, 2021 -- Life cycle assessment of electricity generation options](https://unece.org/sites/default/files/2022-04/LCA_3_FINAL%20March%202022.pdf)

[^source-4]: [Energy Conversion and Management, 2022](https://www.sciencedirect.com/science/article/pii/S0196890422008159#b0530)

[^ref-1]: Digital4Better, [jeu D4B versionné](https://raw.githubusercontent.com/digital4better/data/77cae4a58fadd5deb3b8d4e5577020da08f780d8/data/factor/country-yearly.csv). Instantané 77cae4a, données 2025 ; revue du 16 octobre 2026.

[^ref-2]: [Canada](https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=2510001501).

[^ref-3]: [États-Unis](https://www.eia.gov/electricity/data/eia923/).

[^facteurs-mensuels]: Digital4Better, [facteurs électriques mensuels par pays](https://raw.githubusercontent.com/digital4better/data/77cae4a58fadd5deb3b8d4e5577020da08f780d8/data/factor/country-monthly.csv), instantané 77cae4a ; lignes FR, DE et BR, périodes 2025-01 et 2025-07, colonne `gwp` en kg CO₂e/kWh, convertie ici en g CO₂e/kWh. Consultation du 19 octobre 2026.
