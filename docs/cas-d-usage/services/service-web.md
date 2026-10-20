# Service web

L’évaluation d’un ensemble de pages vues sur une période distingue terminaux, réseau et hébergement. La comparaison de deux versions repose sur le même parcours utilisateur et la même fonction rendue.

## Préparer les données

| Donnée | Mesure privilégiée | Usage dans le calcul |
|---|---|---|
| Pages vues et parcours | Analytics sur une période représentative | Nombre d’unités de service |
| Temps actif | Observation du parcours | Allocation du terminal |
| Octets transférés | Mesure navigateur ou logs, cache inclus | Activité réseau |
| Hébergement | Énergie et fabrication allouées sur la période | Contribution serveur indépendante du temps de lecture |

Le profil des terminaux peut décrire un équipement ou une répartition mobile/ordinateur. Une audience mêlant plusieurs équipements ou pays se décrit par groupes, dont les résultats s’additionnent. Les transferts doivent intégrer les ressources tierces et les requêtes observées.

<span id="comprendre-le-calcul" />

Pour le terminal, l’énergie vaut `heures × puissance / 1 000`. Les profils paramétriques fournissent une fabrication déjà allouée par seconde. Le mode personnalisé répartit une fabrication unitaire sur la durée de vie calendaire. Les deux conventions sont détaillées ci-dessous.

Le [modèle réseau D4B](../../materiel/reseau-et-infrastructure/reseau) utilise des facteurs par Go·km et des distances estimées par segment. L’illustration de cette page accepte un facteur déjà ramené au trajet en kg CO₂e/Go, couvrant fabrication et usage. Sans facteur compatible, les volumes restent connus mais l’impact réseau reste non évalué. Cette simplification de saisie ne remplace pas le modèle par distance.

L’hébergement utilise son énergie IT allouée et son PUE. Les ressources réservées au repos doivent être prises en compte dans cette allocation.

## Méthode détaillée et cas particuliers

### Construire un parcours représentatif

Les pages se regroupent par fonction et comportement : lecture, recherche, transaction, vidéo ou application dynamique. Chaque groupe est décrit par ses vues, sa durée active, ses octets réellement transférés et la répartition des terminaux. La fréquence réelle des états de cache froid et chaud détermine leur poids dans l’échantillon. Une seule page d’accueil ne représente pas tout un service.

import { WebBoundaryFigure } from '@site/src/components/network-illustrations';

<WebBoundaryFigure lang="fr" />

### Allouer le terminal à l’usage

Pour un groupe de $N$ vues durant $t$ secondes, le temps cumulé vaut $H=Nt/3600$. Avec un profil paramétrique D4B, le facteur de fabrication $b$ est déjà exprimé en kg CO₂e/s : $I_{fab}=Nt\,b$. L’électricité vaut $E=H W/1000$, avec $W$ en watts.

La répartition mobile/ordinateur pondère les facteurs : $b=p b_m+(1-p)b_o$ et $W=p W_m+(1-p)W_o$. $p$ est la part du **temps actif** sur mobile. Elle équivaut à la part des vues seulement si leurs durées moyennes sont identiques. Des durées différentes nécessitent des calculs par groupe avant agrégation.

#### Profils calculés par composants {#facteurs-moyens-paramètres-personnalisés-et-exemple}

Les profils ci-dessous proviennent de configurations illustratives, pas de moyennes mesurées. La fabrication est calculée par composants puis répartie sur la durée de vie calendaire. Les paramètres et leurs limites figurent dans le [registre](../../references/registre-des-hypotheses-et-valeurs-par-defaut#parametres-composants).[^profils-composants]

| Profil | Puissance du scénario (W) | Fabrication allouée (kg CO₂e/h) |
|---|---:|---:|
| Ordinateur : 60 % portable, 40 % fixe | 26,78 | 0,00465 |
| Mobile : 95 % smartphone, 5 % tablette | 4,85 | 0,00329 |
| Portable (configuration illustrative) | 17,62 | 0,00338 |
| Fixe avec écran (configuration illustrative) | 40,53 | 0,00654 |
| Smartphone (configuration illustrative) | 4,73 | 0,00330 |
| Tablette (configuration illustrative) | 7,00 | 0,00297 |

Exemple : 100 000 vues de 60 secondes, avec 50 % du temps mobile, donnent **26,36 kWh** et **6,61 kg CO₂e** de fabrication allouée aux terminaux. Le facteur électrique s’applique ensuite à l’énergie.

Le mode personnalisé repose sur une fabrication unitaire $M$ et une durée de vie $L$ : $I_{fab}=H M/(8760L)$. Ce calcul remplace le facteur par seconde, il ne s’y ajoute pas. Il ne suppose pas que le terminal consomme en permanence ; l’électricité reste calculée sur le temps actif.

### Réseau, cache, hébergement et tiers

Le trafic vaut $G=N\times Mo_{vue}/1000$. Sa répartition fixe/cellulaire est indépendante du terminal : un mobile en Wi-Fi relève du trajet fixe. L’impact réseau vaut $G_f f_f+G_c f_c$ si les facteurs couvrent les trajets retenus. Un facteur de segment ne peut pas être traité comme un trajet complet ; les distances estimées appartiennent au modèle par Go·km et ne s’appliquent pas une seconde fois au facteur de trajet.

Le cache navigateur réduit les octets reçus ; un CDN modifie aussi le trajet et mobilise du stockage et des serveurs. Les octets déjà corrigés par mesure sont comptés une seule fois. L’hébergement se calcule à partir d’une énergie et d’une fabrication allouées sur la période. Une baisse du poids des pages ne démontre pas une baisse proportionnelle de ces postes.

Pour une vidéo, une API ou un paiement externe, la frontière inclut la fonction rendue et l’inventaire du service tiers. Des impacts calculés séparément s’additionnent seulement si les mêmes réseaux, serveurs et terminaux ne sont pas déjà inclus.

### Passer d’un échantillon à une période

Les groupes de parcours s’additionnent : $I_{service}=\sum_j I_j+I_{commun}$. Les ressources communes sont allouées une seule fois. Les données mesurées restent distinctes des extrapolations d’audience. Un résultat par page vue ne se compare à un autre qu’à contenu et fonction équivalents ; un score arbitraire sur 100 n’ajoute pas de précision physique.

## Limites et détails

Les paramètres préremplis sont un exercice. La prédiction historique d’audience, l’équivalence entre temps de lecture et temps CPU, et le score sur 100 ne font pas partie de ce calcul. Leurs versions historiques restent consultables dans la v1.

Le cas [Applications natives](./mobile) inclut les installations et mises à jour d’une application native. Une inférence externe relève de l’[IA générative](./ia-generative) ; son hébergement reste compté une seule fois dans le périmètre.

<span id="règles-et-sources" />

Pour cadrer le résultat : [périmètre et unité d’analyse](../../fondations/perimetre-frontieres-services-tiers-et-unite-d-analyse), [allocation](../../regles/allocation-et-partage-des-impacts) et [double comptage](../../regles/double-comptabilisation).

Les facteurs électriques sont issus de l’instantané D4B 2025[^ref-3]. Les activités et données d’hébergement préremplies sont des hypothèses de l’exercice. Les facteurs et conventions sont consultables sous le simulateur.

<span id="lire-leffet-des-paramètres" />


## Exemple interactif {#simuler-votre-situation}

Cet exemple met en application les calculs et les limites présentés ci-dessus.

Ex: 100 000 pages vues de 2 Mo représentent **200 Go transférés**. À 60 secondes actives par vue, le temps terminal atteint **1 666,67 h**. Ce temps ne représente pas du temps CPU serveur.

import { ScenarioPlayground } from '@site/src/components/scenario-playground';

<div className="inline-example">

<ScenarioPlayground kind="web" lang="fr" />

</div>



[^ref-3]: Digital4Better, [instantané D4B 2025](https://github.com/digital4better/data/blob/77cae4a58fadd5deb3b8d4e5577020da08f780d8/data/factor/country-yearly.csv). Instantané 77cae4a, données 2025 ; revue du 16 octobre 2026.

[^profils-composants]: Convention D4B, configurations illustratives `d4b-components-illustration-2026.10.19` ; coefficients historiques documentés par Boavizta pour le [CPU](https://doc.api.boavizta.org/Explanations/components/cpu/), la [RAM](https://doc.api.boavizta.org/Explanations/components/ram/) et le [SSD](https://doc.api.boavizta.org/Explanations/components/ssd/), autres coefficients identifiés comme hypothèses dans le registre. Le packaging DDR5 1,1 n’est pas validé par cette source.
