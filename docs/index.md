# Évaluer un service numérique

Cette méthodologie relie les usages numériques aux équipements, à l’énergie et aux impacts environnementaux qu’ils mobilisent. Elle explique comment construire un calcul, vérifier ses hypothèses et interpréter ses limites.

## Comment se construit une évaluation {#passer-dune-question-à-un-résultat}

L’[unité fonctionnelle](./references/glossaire.md#unite-fonctionnelle) précise le service rendu, sa quantité et la qualité attendue. Le calcul relie ce service aux ressources mobilisées, puis additionne leurs impacts pour chaque indicateur. Le résultat dépend des postes couverts et des hypothèses retenues.

<figure className="assessment-example">
<figcaption>Exemple : les consultations d’un site pendant un mois</figcaption>
<ol>
<li><strong>L’usage étudié</strong><div><p><b>100 000 consultations d’une minute.</b> L’exemple porte sur les terminaux et l’hébergement, pendant cette période.</p></div></li>
<li><strong>Les ressources associées</strong><div><p>Ces consultations représentent <b>1 666,67 heures d’usage des terminaux</b>. Le scénario suppose aussi 100 kWh d’électricité informatique alloués à l’hébergement. Le modèle tient compte de la fabrication des équipements et de l’électricité consommée.</p></div></li>
<li><strong>Le résultat et ses limites</strong><div><p className="assessment-example-result"><b>33,57 <span>kg CO₂e</span></b><span>Sous-total pour le mois étudié</span></p><p>Ce résultat illustre l’indicateur climat avec les hypothèses de l’exemple. <b>Le réseau et les services tiers ne sont pas évalués</b> : ce n’est pas l’empreinte complète du service.</p></div></li>
</ol>
</figure>

Les paramètres de cet exemple sont détaillés dans [le calcul reproductible d’un service](./modelisation/modelisation-d-un-service#exemple-reproductible). Ils ne constituent pas des valeurs par défaut.

L’approche est principalement **attributionnelle** : elle répartit des impacts entre des usages. Elle ne prédit pas automatiquement les conséquences physiques d’une décision. Une comparaison demande la même fonction, une qualité de service comparable et des frontières cohérentes.

## Trouver la bonne explication

| Section | Quand la consulter |
|---|---|
| [Fondations](./fondations/principes-acv-appliques-au-numerique) | Définir ce que l’on mesure, les phases du cycle de vie et les indicateurs |
| [Règles](./regles/allocation-et-partage-des-impacts) | Partager les impacts, éviter les doubles comptes, qualifier les données |
| [Modélisation](./modelisation/modelisation-d-un-service) | Assembler les contributions d’un équipement ou d’un service |
| [Matériel](./materiel/vue-d-ensemble-du-materiel) | Comprendre les facteurs et les modèles physiques |
| [Références](./references/sources-et-corpus) | Retrouver les sources, versions et hypothèses |

Les pages conceptuelles donnent le principe et un exemple. Les modèles techniques détaillent les entrées et les équations. Les cas d’usage permettent de les appliquer. Les formules, hypothèses et exemples restent visibles dans le fil de lecture.

## Lire un résultat correctement

Un résultat doit conserver son unité, sa période, son périmètre et ses sources. **Un poste non évalué n’est pas nul.** Les simulateurs de cas d’usage calculent actuellement le climat ; les autres indicateurs du référentiel demandent des facteurs compatibles avant agrégation.

Les données électriques utilisées sont versionnées dans [Digital4Better Open Data](https://digital4better.github.io/data/). Le choix d’autres facteurs repose sur la [qualité des données](./regles/qualite-des-donnees-et-matrice-de-robustesse). Les points restant à documenter figurent dans le [registre des hypothèses](./references/registre-des-hypotheses-et-valeurs-par-defaut).

## Parcours de lecture {#choisir-votre-point-de-départ}

Les cas d’usage constituent des points d’entrée selon l’activité étudiée. Chaque page présente le périmètre, les données, les calculs et leurs limites, puis les illustre par des exemples.

import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

<div className="case-cards">
<Link to={useBaseUrl('v2-beta/cas-d-usage/environnements/parc-informatique')}><strong>Parc informatique</strong><span>Inventaire, consommation et durée de vie.</span></Link>
<Link to={useBaseUrl('v2-beta/cas-d-usage/environnements/infrastructure-d-hebergement')}><strong>Hébergement</strong><span>Serveurs, mutualisation et fonctionnement du site.</span></Link>
<Link to={useBaseUrl('v2-beta/cas-d-usage/environnements/cloud')}><strong>Cloud</strong><span>Ressources réservées, stockage et région.</span></Link>
<Link to={useBaseUrl('v2-beta/cas-d-usage/services/service-web')}><strong>Service web</strong><span>Parcours, transferts et hébergement.</span></Link>
<Link to={useBaseUrl('v2-beta/cas-d-usage/services/mail')}><strong>Mail</strong><span>Envoi, lecture et conservation.</span></Link>
<Link to={useBaseUrl('v2-beta/cas-d-usage/services/mobile')}><strong>Applications natives</strong><span>Mobile et ordinateur : sessions, installations et mises à jour.</span></Link>
<Link to={useBaseUrl('v2-beta/cas-d-usage/services/ia-generative')}><strong>IA générative</strong><span>Entraînement, texte, image, vidéo et audio.</span></Link>
</div>
