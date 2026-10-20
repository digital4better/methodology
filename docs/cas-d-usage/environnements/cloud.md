# Cloud

import { MethodIllustration } from '@site/src/components/method-illustrations';

Le calcul part des ressources réservées et des données d’usage fournisseur. Il convertit ces activités en énergie et en fabrication allouée. Le coût financier ne constitue pas une unité physique : remises et taxes n’ajoutent pas de consommation.

## Préparer les données

| Ressource | Quantité à recueillir | Conversion |
|---|---|---|
| VM ou conteneur | Nombre, vCPU, RAM, heures | vCPU.h et Go RAM.h |
| Stockage | Capacité physique et durée | Go.h, copies incluses une seule fois |
| Fonction | Durée, invocations, ressources réservées | Selon la correspondance documentée du fournisseur |
| Service managé | Unités techniques ou architecture | Signaler les ressources non observables |

Une fonction peut être étudiée après conversion documentée en ressources-temps ; aucun forfait universel par invocation n’est appliqué.

<span id="comprendre-le-calcul" />

L’énergie IT est la somme des `ressources × heures × puissance unitaire`. Elle est ensuite multipliée par le PUE, puis par le facteur électrique retenu pour la région et sa part renouvelable, selon la convention détaillée ci-dessous. Les puissances préremplies sont des coefficients historiques modifiables, pas des mesures du fournisseur.

La fabrication est allouée au temps de réservation : `fabrication attribuée à la ressource × heures / durée de vie en heures`. Le facteur par VM doit déjà inclure sa part du serveur, hors stockage compté séparément.

## Méthode détaillée et services managés

### De la facturation à une activité physique

Chaque ligne d’usage relève du calcul, de la mémoire, du stockage, du réseau ou d’un service managé. Elle est décrite par un identifiant de ressource, une région, une période, une quantité et une unité. Les exports de facturation peuvent faciliter la collecte, mais une remise ou une ligne en euros n’est pas une mesure de ressources physiques.

<MethodIllustration kind="cloud-billing" lang="fr" />

| Service | Unités utiles | Difficulté d’interprétation |
|---|---|---|
| VM et conteneurs | vCPU.h, Go RAM.h, GPU.h | Allocation hôte, surallocation, charge réelle |
| Stockage objet ou bloc | Go.h, opérations, réplication | Capacité logique ou physique, classe de stockage |
| Serverless | Invocations, secondes, mémoire et CPU réservés | Démarrages à froid, concurrence, capacité de fond |
| Base de données managée | Ressources-temps, stockage, I/O, sauvegardes | Architecture masquée, réplication et services de gestion |
| Réseau | Go par trajet ou segment | Frontière, pays et phases du facteur |

### Calculer énergie et fabrication

Pour un lot de VM identiques :

$$
E_{IT}=\frac{h}{1000}\left[n(vW_{CPU}+rW_{RAM})+sW_{SSD}+dW_{HDD}\right]
$$

$n$ est le nombre de VM, $v$ les vCPU par VM, $r$ les Go RAM par VM, $s,d$ les capacités physiques totales SSD/HDD et $h$ les heures. Les coefficients sont des puissances moyennes réservées, pas un TDP multiplié arbitrairement par un taux CPU.

$$
I_{fab}=\frac{h}{8760L}(nM_{VM}+sM_{SSD}+dM_{HDD})
$$

$M_{VM}$ est déjà la part de fabrication d’un serveur attribuée à une VM, hors stockage. Multiplier la fabrication du serveur entier par le nombre de VM créerait un double compte. Le PUE intervient ensuite dans l’électricité ; il ne modifie pas $I_{fab}$.

### Services managés, régions et cas sans correspondance matérielle

Une architecture fournisseur documentée permet une conversion du service en ressources-temps. Un facteur de service compatible constitue une autre voie, à condition de connaître les postes déjà couverts.

#### Services non reconnus : recours temporaire à un facteur monétaire {#facteur-monetaire}

Pour un service cloud non encore reconnu, par exemple une nouvelle offre, un **facteur monétaire adapté** permet une estimation provisoire en attendant la règle qui reliera ce service à une capacité matérielle.

$$
I_{i,mon}=C_{admissible}\times f_{i,mon}
$$

$C_{admissible}$ est la dépense dans la devise du facteur. Pour chaque indicateur $i$, $f_{i,mon}$ est exprimé en **unité d’impact par unité monétaire**. Par exemple, des USD multipliés par des kg CO₂e/USD donnent des kg CO₂e.

Cette approche s’applique à **tout indicateur disposant d’un facteur adapté**. Sans facteur pour un indicateur, son impact reste non évalué. Le calcul ne reconstitue pas de capacité matérielle.

<MethodIllustration kind="cloud-monetary" lang="fr" />

Le facteur précise sa devise, son année, sa zone et son périmètre. La dépense suit la même convention monétaire.[^mon-convention]

Exclure les licences et le support de cette voie évite de les assimiler à une consommation de matériel cloud ; cela ne signifie pas que leur impact est nul.

#### Électricité des régions cloud {#electricite-cloud}

Pour un service multirégion, l’activité, la réplication, le stockage et l’électricité sont répartis par région. La **convention cloud Fruggr utilise les impacts renouvelables « green » des données D4B pour la part renouvelable (REF)**. Cette part conserve les impacts de cycle de vie de la production électrique.[^green]

Pour un indicateur $i$, une région et une période données :

$$
IF_{cloud,i}=(1-REF)\,IF_{mix,i}+REF\,IF_{green,i}
$$

$REF$ est une proportion entre 0 et 1. $IF_{mix,i}$ est le facteur du mix de consommation et $IF_{green,i}$ celui de sa production renouvelable, avec une méthode et une unité compatibles. L’impact d’usage vaut $E_{IT}\times PUE\times IF_{cloud,i}$. À 100 % de renouvelable, le facteur est **$IF_{green,i}$, pas zéro**. Le PUE s’applique une seule fois.

La provenance, la période et l’échelle du REF sont explicitées. Cette convention est distinguée de la lecture géographique au mix moyen décrite dans les [facteurs électriques](../../fondations/impacts-de-la-consommation-d-energie.md#lecture-des-contrats-délectricité). Si le REF ou le facteur « green » manque, le repli sur le mix moyen est signalé ; la donnée manquante n’est pas remplacée par zéro. L’exemple interactif ci-dessous conserve cette lecture au mix moyen, sans appliquer de REF.

Les durées réelles priment sur 730 h/mois. Les ressources arrêtées peuvent encore réserver du stockage ou d’autres capacités. Une contribution nulle suppose l’absence de ressources encore provisionnées. Un GPU nécessite un profil propre ; les coefficients CPU ne le décrivent pas.

### Contrôler l’exhaustivité

Le nombre de ressources et les périodes sont rapprochés de l’inventaire fournisseur. La restitution précise la part des activités sans correspondance, les conversions documentées et les doublons exclus. Un total précis sur les VM connues peut couvrir une faible part d’une plateforme largement managée.

## Situer ce calcul par rapport au RCP cloud

Le calcul D4B par ressources et puissances est une estimation explicite. Le RCP cloud définit des unités pour le bâtiment et ses équipements techniques, les équipements informatiques et les services IaaS. Un facteur de VM peut donc déjà couvrir des postes absents de notre exemple.[^rcp-cloud]

L’utilisation d’un facteur fournisseur dépend de son unité, de sa période, de ses ressources et des phases incluses. Un PUE, un bâtiment ou une fabrication de serveur déjà couverts ne s’ajoutent pas au facteur. Le stockage peut être attaché à la VM ou constituer un service distinct.

### Choisir une voie de calcul cohérente

Le RCP applicatif privilégie les données issues du RCP cloud. À défaut, il décrit une voie alternative ; il demande une voie cohérente entre les contextes serveurs de l’étude. Le présent exemple D4B ne se présente pas comme un calcul conforme au RCP cloud.[^rcp-app]

Le RCP cloud de juin 2026 ne prend pas les GPU en compte dans ses allocations. Pour l’IA, la décomposition spécifique des accélérateurs et ses limites restent donc nécessaires. Le RCP applicatif cite une édition cloud d’avril 2025 : leur articulation suppose d’identifier explicitement l’édition effectivement utilisée.

## Périmètre à compléter

**L’exemple ci-dessous couvre les VM et leur stockage, pas une plateforme cloud complète.**

| Dans l’exemple | À ajouter si présent dans le service étudié |
|---|---|
| Fabrication allouée des VM et du stockage SSD/HDD, électricité d’usage et PUE | Réseau, GPU, services de gestion et fabrication du bâtiment |

<span id="lire-leffet-des-paramètres" />

Pour interpréter le résultat :

- **Compter chaque ressource une seule fois.** Les VM d’une base managée déjà inventoriées ne sont pas ajoutées à nouveau.
- **Comparer le même service rendu.** Changer le pays modifie ici l’électricité d’usage, pas la fabrication.
- **Distinguer allocation et réduction physique.** Une part d’impact plus faible ne prouve pas que le fournisseur consomme moins.

<span id="règles-et-sources" />

Les valeurs préremplies sont des **hypothèses d’illustration**. Les facteurs électriques proviennent de D4B 2025[^ref-2]. Cloud Carbon Footprint documente l’approche par ressources et puissances[^ref-1] ; ses coefficients dépendent du matériel et de la charge et ne remplacent pas une mesure représentative.

Les règles communes sont détaillées dans [Périmètre et unité d’analyse](../../fondations/perimetre-frontieres-services-tiers-et-unite-d-analyse.md), [Allocation](../../regles/allocation-et-partage-des-impacts.md) et [Double comptage](../../regles/double-comptabilisation.md).

## Exemple interactif {#simuler-votre-situation}

Cet exemple met en application les calculs et les limites présentés ci-dessus. Le simulateur couvre un lot de VM identiques et du stockage SSD/HDD.

Ex: quatre VM de 4 vCPU et 16 Go RAM, avec 2 000 Go SSD et 500 Go HDD physiques pendant 730 h, donnent **61,65069 kWh IT** avec les coefficients affichés. Avec PUE 1,2 et le facteur Irlande 2025, l’usage vaut **19,29 kg CO₂e**. Les hypothèses de fabrication affichées ajoutent 9,5 kg : **28,79 kg CO₂e de sous-total**.

import { ScenarioPlayground } from '@site/src/components/scenario-playground';

<div className="inline-example">

<ScenarioPlayground kind="cloud" lang="fr" />

</div>

[^rcp-cloud]: ADEME, [RCP services cloud et centre de données, juin 2026](https://librairie.ademe.fr/economie-circulaire-et-dechets/6031-referentiel-par-categorie-de-produit-rcp-de-services-cloud-et-de-centre-de-donnees.html), p. 18, 26–64.

[^rcp-app]: ADEME, [RCP des applicatifs numériques, juin 2026](https://librairie.ademe.fr/economie-circulaire-et-dechets/9434-referentiel-par-categorie-de-produit-rcp-des-applicatifs-numeriques.html), p. 6, 27–35.

[^ref-1]: [Cloud Carbon Footprint](https://www.cloudcarbonfootprint.org/docs/methodology/). Documentation en ligne, version non figée.

[^ref-2]: Digital4Better, [instantané D4B 2025](https://github.com/digital4better/data/blob/77cae4a58fadd5deb3b8d4e5577020da08f780d8/data/factor/country-yearly.csv). Instantané 77cae4a, données 2025 ; revue du 16 octobre 2026.

[^green]: Digital4Better, [facteurs électriques renouvelables par pays](https://github.com/digital4better/data/blob/77cae4a58fadd5deb3b8d4e5577020da08f780d8/data/factor/country-yearly-green.csv), instantané `77cae4a`.

[^mon-convention]: Taxes, remises et conversions de devise suivent la convention utilisée pour construire le facteur monétaire. La source, la version et les ajustements appliqués sont conservés.
