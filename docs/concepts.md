---
unlisted: true
sidebar_position: 3
---

# Notions transverses

Dans cette partie, nous présentons des notions qui seront reprises à plusieurs endroits dans la suite du document.

## Définitions

### Allocation (allocation)
Une règle d’affectation des impacts. Par exemple on retrouve des facteurs d’allocations massique, économique, temporelle ou basée sur le volume de données. Ce facteur va permettre d’attribuer sa part à notre bien d’intérêt.

### Empreinte environnementale (environmental footprint) 
Un indicateur qui permet d’évaluer la pression qu'exerce l'homme ou une activité sur les ressources et les écosystèmes.

### Equipement (Equipment)
Désigne tout dispositif électronique qui composent les trois tiers (équipements utilisateurs, équipements réseaux, équipements des datacenters). Ces équipements sont utilisés pour visualiser, traiter, stocker ou transmettre des données, des informations. Cela peut inclure des ordinateurs, des serveurs, des imprimantes, des routeurs, des périphériques de stockage, ainsi que des dispositifs de communication comme les smartphones.

### Impact intrinsèque (Embodied Impact)
Les impacts qui s’opèrent lors de la création et de l’élimination d’un périphérique matériel (qui correspondent aux phases ACV : extraction des matières premières, fabrication, transport et fin de vie), ces impacts reposent sur une fraction des impacts intrinsèques totales qui doit être allouée à la quantité particulière d'utilisation.

### Impact opérationnel (Operational Impact) 
Résulte de la phase d’utilisation, cet impact repose sur la consommation d‘électricité nécessaire au fonctionnement.

### Indicateur environnemental (Environmental indicator) 
L'Agence Européenne de l'Environnement définit un indicateur comme « une valeur observée représentative d'un phénomène à étudier », ces indicateurs permettent d’évaluer l’état de l’environnement. Ces indicateurs sont un sous-ensemble des indicateurs du développement durable.

### Méthodes dites mid-point 
Cette méthode orientée « problème » permet d’estimer l'impact qui apparaît au milieu de la chaîne de causalité. Cette vision permet de quantifier les effets globaux des substances émises ou consommées. Les résultats d'inventaire ayant des effets similaires sont regroupés dans des catégories d'impact appelées catégories intermédiaires, auxquelles on associe un indicateur intermédiaire (mid-point indicator) permettant de comparer les flux des substances contribuant à la catégorie en cause.

### Méthodes dites end-point 
Cette méthode orientée « dommages » permet d’estimer l'impact qui se trouve à la fin de la chaîne de causalité. Cette approche permet d’estimer les dommages potentiels qui pourraient en résulter en allouant plusieurs catégories intermédiaires à une ou plusieurs catégories de dommages. Celles-ci sont ensuite représentées par des indicateurs de dommages (cf. 1.2 - Indicateurs pris en compte dans l’évaluation).

### PUE (Power Usage Effectiveness) 
Le PUE est un indicateur permettant de mesurer l'efficacité énergétique d'un datacenter. Le PUE évalue le rendement du datacenter, en faisant un ratio de l’énergie globale (somme de la consommation des équipements informatiques et de la consommation de l'infrastructure du centre informatique) qu’il utilise, sur l’énergie utilisée uniquement par les équipements informatiques.

### Référentiel par catégorie de produit ou RCP (Product Category Rules or PCR)
Un RCP décrit les principes généraux pour l'affichage environnemental des produits de grande consommation en France. Dans notre contexte, nous nous intéressons aux RCP dédiés aux services numériques, qui donnent un cadre pour l’évaluation des impacts environnementaux des services numériques dans le cadre de l’affichage environnemental. Un référentiel commun, dit « mère » : « Référentiel méthodologique d'évaluation environnementale des services numériques »  intègre un ensemble de règles communes pour la déclinaison en PCR « filles » plus spécialisés.

### Terminal (Terminal) 
Un terminal désigne un équipement électronique qui permet à un utilisateur d'interagir avec un système informatique. Les terminaux intègrent divers équipements comme les ordinateurs, les smartphones, les tablettes, les terminaux de paiement, les guichets automatiques bancaires, etc. Ils servent généralement à saisir, traiter et afficher des données, ainsi qu'à exécuter des applications logicielles. Les terminaux sont le point final de la communication et l'interaction avec les systèmes informatiques et les réseaux.

## Conversion d’une consommation d’électricité en impact opérationnel

Quel que soit le sujet d’étude, la composante opérationnelle de l’impact s’évalue à partir d’une consommation d’électricité. Cette conversion de l’énergie vers l’impact opérationnel repose sur l’équation suivante : 

$$
\begin{align*}
&I_{ope_{i,p}} = E_{elec_p} * FI_{i,p}\htmlClass{unit}{[U_i]}\\
Avec\\
&I_{ope_{i,p}} = \text{Impact opérationnel pour l’indicateur environnemental}\textit{ i }\text{dans le pays}\textit{ p }\htmlClass{unit}{[U_i]}\\
&E_{elec_p} = \text{Energie électrique consommée dans le pays}\textit{ p }\htmlClass{unit}{[kWh]}\\
&FI_{i,p} = \text{Facteur d'impact de l'indicateur}\textit{ i }\text{dans le pays}\textit{ p }\htmlClass{unit}{[U_i/kWh]}\\
\end{align*}
$$

Les facteurs de conversion par pays sont présentés dans la section suivante.

## Facteurs des impacts de la consommation d’électricité par pays
Ce paragraphe présente la méthodologie appliquée pour déterminer les facteurs d’impact environnementaux de la production de 1kwh d'électricité (factorXkWhCountry dans l’équation précédente). La méthodologie, les ressources et les résultats sont disponibles en OpenSource ici : https://github.com/digital4better/data.

Le choix a été fait de construire notre propre base de données pour :
- Couvrir tous les pays et certains découpages en Etats/régions pour répondre à nos clients internationaux 
- Disposer de facteurs mis à jour mensuellement pour mieux retranscrire les évolutions du mix énergétique des pays selon les conditions météorologiques 
- Intégrer l’ensemble des indicateurs d’impacts environnementaux 
- Faire reposer nos facteurs sur des études et références plus récentes que celles utilisées dans les autres bases de données existantes

### Méthodologie
Les facteurs sont estimés de façon relative à partir de la consommation d’électricité consommée dans la région géographique.  Cette approche permet la prise en compte des flux d’importation et d’exportation d’électricité, contrairement à une approche basée uniquement sur l’électricité produite. Pour la dimension provinces/états, les importations/exportations nationales sont ventilées sur les subdivisions au prorata de leur quantité de production d’électricité.

L’équation suivante présente le calcul d’un facteur d’impact par pays pour une période :

$$
\begin{align*}
&FI_{i,p} = \frac{{\sum_{t} I_{i,t} \times E_{elec_{t,p}}}}{{\sum_{t}} E_{elec_{t,p}}}\htmlClass{unit}{[U_i/kWh]}\\
Avec\\
&FI_{i,p} = \text{Facteur d’impact pour l'indicateur}\textit{ i }\text{pour le pays}\textit{ p }\htmlClass{unit}{[U_i/kWh]}\\
&E_{elec_{t,p}} = \text{La consommation d'électricité pour la technologie}\textit{ t }\text{pour le pays}\textit{ p }\htmlClass{unit}{[kWh]}\\
&I_{i,t} = \text{Impact pour l'indicateur}\textit{ i }\text{lié à la consommation d'électricité de la technologie}\textit{ t }\htmlClass{unit}{[U_i/kWh]}\\
\end{align*}
$$

Les facteurs sont déterminés par pays, en fonction du mix énergétique national et des impacts environnementaux associés à chacune des sources de production d’énergie, catégorisées en 9 technologies de production : charbon, gaz, divers fossile, vent, solaire, bioénergie, hydro, divers renouvelable, nucléaire.

Pour chaque pays, et afin de tenir compte des offres « énergie renouvelable » des opérateurs, nous disposons de 2 facteurs :
- un facteur classique, qui prend en compte le mix énergétique complet du pays 
- un facteur énergie renouvelable, qui prend en compte uniquement les productions d’énergie dites renouvelable (vent, solaire, bioénergie, divers renouvelable, hydro)

### Ressources

Les données d’impacts de chaque technologie de production d’électricité par kWh proviennent de 2 sources bibliographiques :
- Pour le charbon, le gaz, le vent, le solaire, l’hydro et le nucléaire : Life cycle assessment of electricity generation options, UNECE 2021 
- Pour le divers fossile, la bioénergie et le divers renouvelable : étude publiée dans Energy Conversion and Management en septembre 2022 : « New approach for assessing and optimising the environmental performance of multinational electricity sectors: A European case study »,  septembre 2022  

Ces données sont relatives à l’Europe, dû à la rareté de ces données dans un scope mondiale, une extrapolation est réalisée et ces valeurs sont généralisées dans notre modèle. Sources :

Les mix électriques nationaux sont extraits du site [ember-climate](https://ember-climate.org/).
-	Mix électrique mensuel par pays (pour 85 pays) : https://ember-climate.org/data-catalogue/monthly-electricity-data/
-	Mix électrique annuel par pays (pour tous les pays) : https://ember-climate.org/data-catalogue/yearly-electricity-data/
     
Des sources complémentaires sont utilisées pour obtenir les mix électriques au niveau des provinces du [Canada](https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=2510001501&pickMembers%5B0%5D=1.7&pickMembers%5B1%5D=2.2&cubeTimeFrame.startMonth=01&cubeTimeFrame.startYear=2023&cubeTimeFrame.endMonth=12&cubeTimeFrame.endYear=2023&referencePeriods=20230101%2C20231201) et des [Etats-Unis](https://www.eia.gov/electricity/data/eia923/). 

## Référentiels de facteurs d’impacts environnementaux
Sauf indication spécifique, les facteurs d’impacts environnementaux utilisés dans la suite du document sont issus des référentiels suivants : 

| Référentiel          | Impacts concernés          | Données fournies               | Granularité         | Origine de la donnée  |
|----------------------|----------------------------|--------------------------------|---------------------|-----------------------|
| Données constructeur | Equipement Hébergement     | CO2eq, consommation électrique | Modèle              | Données constructeurs |
| Base Empreinte       | Equipement<br/>Hébergement | Multi-indicateurs              | Famille             | Travaux NegaOctet     |
| Base Empreinte       | Réseau                     | Multi-indicateurs              | Unité fonctionnelle | Travaux NegaOctet     |

### Focus sur la Base Empreinte de l’ADEME

La Base Empreinte de l’ADEME regroupe les données et référentiels disponibles pour réaliser des analyses de cycle de vie (pas uniquement numérique) et des bilans d’émissions de gaz à effet de serre. Cette base revêt un caractère officiel en France en étant alimentée et gérée par l’ADEME.

Dans le cadre des ACV numériques, la contribution essentielle de la Base Empreinte est disponible sous la forme d’un tableur Excel  regroupant une partie des travaux réalisés par le consortium NegaOctet. On y retrouve des facteurs multi-indicateurs établis pour des équipements (ordinateur, smartphone…) mais aussi pour des services numériques, définis par une unité fonctionnelle précise (stocker 1 Go de données dans le cloud pendant 1 an).

Comme on le verra ultérieurement, une attention particulière doit être posée sur le contexte du facteur, par exemple sa quantité de référence ou la durée de vie des équipements prise en compte.

A noter également que certaines données portent interrogation, notamment sur « Water use » où certains facteurs sont fournis avec une valeur négative compte-tenu d’une estimation majorante des impacts de fin de vie.  

## Proposition autour du single score

### Cadre

Les impacts environnementaux ne permettent pas à l’utilisateur d’avoir une information synthétique des résultats, ni de comparer les systèmes entre eux. Nous avons donc élaboré en complément une restitution sous la forme de scores. Ces scores reflètent l’impact complet du cycle de vie et intègrent l’ensemble des indicateurs d’impacts environnementaux présentés précédemment.

Nous avons défini une règle de calcul d’un score environnemental qui reflète l’ensemble des indicateurs et des sous-scores par groupe d’indicateurs basé sur une règle de l’affectation unique.  Chaque sous-score regroupe alors un ou plusieurs critères : 
- Le premier sous-score « biodiversité » correspond à l’aire de protection « qualité des écosystèmes ». 
- Le second sous-score « santé environnementale », de l’aire de protection santé humaine, représente les conséquences sur la santé des atteintes aux milieux. 
- Le troisième sous-score « ressources » renvoie à l’aire de protection du même nom et regroupe tous les éléments biotiques ou abiotiques fournis par la nature qu’utilise l’Homme dans ses activités économiques. 
- Le quatrième sous-score « changement climatique », représente un impact environnemental de premier plan, attendu et clairement perçu par les utilisateurs.

### Formules et calculs des scores et sous-scores 

Ces scores se basent sur la méthodologie du « single score EF » (environnemental footprint), recommandé par la Commission européenne. Calculé avec des facteurs de pondération pour chaque indicateur, cette approche tient compte à la fois de la robustesse relative de ces indicateurs, des enjeux environnementaux associés et du niveau de consensus scientifique des indicateurs. Le calcul d'un score PEF (Product Environmental Footprint) est réalisé, à la suite des opérations suivantes :

Normalisation de chacun des impacts pour permettre l'agrégation de différentes catégories d'impact :

$$
\begin{align*}
&I_{norm_i} = \frac{I_i}{C_{norm_i}}
\end{align*}
$$

Pondération de l’ensemble des impacts normalisés qui reflète l'importance de chaque catégorie d'impact pour déterminer le score :

$$
\begin{align*}
&Score = \sum_i {I_{norm_i}} \times {C_{pond_i}}
\end{align*}
$$

Sur cette base, la Commission Européenne (CE) a établi un classement des indicateurs . A partir de ces connaissances, nous avons déterminé notre propre clef de répartition, adaptée au périmètre d’indicateurs que nous avons sélectionnés (cf. 1.2) et à leur rattachement en groupe d’impact end-point.

Le tableau ci-dessous présente les résultats de cette réflexion sur les coefficients de normalisation et de pondération avec :
- Colonnes 1 et 2 : les groupes et impacts que nous adressons 
- Colonne 3 : les coefficients de normalisation CE 
- Colonne 4 : le coefficient de pondération appliqué à chaque impact pour le calcul du score global, c’est-à-dire le score final de l’évaluation qui rend compte de tous les indicateurs environnementaux de l’étude. La somme de ces coefficients est égale à 100% lorsqu’on cumule tous les coefficients, quels que soient leur groupe d’impact 
- Colonne 5 : le coefficient de pondération appliqué à chaque impact à l’intérieur de son groupe. La somme de ces coefficients est égale à 100% lorsqu’on cumule tous les coefficients des impacts d’un même groupe

| Dommages<br/>"end-point"                 | Impacts<br/>"mid-point"              | Coeff de normalisation        | Coef de pondération global | Coef de pondération groupe |
|------------------------------------------|--------------------------------------|-------------------------------|----------------------------|----------------------------|
| Dommage climatique                       | Changement climatique total          | 8,10E+03 kg CO2e              | 33,33%                     | 100,00%                    |
| Dommage écologique                       | Acidification                        | 5,56E+01 mol H+eq             | 9,81%                      | 76,35%                     |
| Dommage écologique                       | Ecotoxicité des eaux douces          | 4,27E+04 CTUe                 | 3,04%                      | 23,65%                     |
| Dommage sur la santé humaine             | Toxicité humaine (non-cancérigène)   | 2,30E-04                      | 2,91%                      | 10,26%                     |
| Dommage sur la santé humaine             | Toxicité humaine (cancérigène)       | 1,69E-05                      | 3,37%                      | 11,87%                     |
| Dommage sur la santé humaine             | Emissions de particules fines        | 5,95E-04                      | 14,18%                     | 49,94%                     |
| Dommage sur la santé humaine             | Emissions de substances ionisantes   | 4,22E+03 kBq U-235 eq         | 7,93%                      | 27,93%                     |
| Dommage sur la diminution des ressources | Utilisation de la ressource en eau   | 1,15E+04 m3                   | 13,47%                     | 52,99%                     |
| Dommage sur la diminution des ressources | Épuisement des ressources naturelles | 6,36E-02 kg Sb eq             | 11,95%                     | 47,01%                     |

Le score PEF a pour unité le mPt (millipoint), le point étant une unité arbitraire. 1 Pt est représentatif de l’impact environnemental annuel d'un habitant européen (1 habitant pour 1 Pt).

Pour finir, on effectue un changement d’échelle, comme réalisé dans de nombreuses approches d’affichage. Deux grandes méthodologies sont utilisées :
- Changer de référentiel. Cette approche a pour avantage de pouvoir exprimer un impact relativement à d’autres services et de permettre l’affichage d’une note sur 100.
- Passer à une échelle non linéaire. L’idée est alors d’introduire une non-linéarité entre l’échelle du score et l’échelle de l’affichage, pour que cette dernière puisse être pleinement utilisée (avec des valeurs tout au long de la gamme de variation et non pas qu’aux extrêmes).

Nous avons développé une approche qui combine les avantages de ces 2 méthodologies. Une attention est apportée à l’équation (introduction de la non-linéarité) et aux bornes utilisées (construction de la référence).

Les scores environnementaux sont définis à l’aide d’une fonction de distribution cumulative (CDF) présentée ici :

$$
\begin{align*}
&C(x) = \frac{1}{2} \times (1 - E_{rf}(\frac{ln(x)-\mu}{\sqrt{2}\times\sigma})) \\
Avec\\
&C(x) = \text{Complementary Log-Normal CDF} \\
&\mu = ln(m) = \text{Location} \\
&\sigma = \frac{\lvert ln(p_{10}) - \mu \rvert}{\sqrt{2} \times 0.9061938024368232} = \text{Shape} \\
&m = \text{Médiane}
\end{align*}
$$

Les scores environnementaux sont des entiers compris entre 0 (mauvais) et 100 (excellent). La distribution de type log-normale se caractérise par sa limite nulle en -∞ et sa limite à 1 en +∞, ce qui permet de rendre les scores 0 et 100 inatteignables.

La fonction de distribution cumulative (CDF) calcule la probabilité cumulative pour une valeur d’impact x donnée, c’est-à-dire qu’on associe la probabilité d’avoir une valeur < ou = à x dans notre base de référence.  

Le profil de distribution est déterminé à partir des 2 points caractéristiques que sont la médiane (m) et le 90 percentile (p10). La valeur de ces points se détermine à partir d’études de référence (https://httparchive.org/). 
