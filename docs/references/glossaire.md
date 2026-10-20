# Glossaire

Les définitions reprennent le sens des termes dans cette méthodologie. Les liens renvoient aux calculs, hypothèses et sources du chapitre concerné.

## ACV (Analyse du Cycle de Vie)

Méthodologie normalisée (ISO 14040/14044) d’évaluation des impacts d’un produit ou service sur son cycle de vie : extraction, fabrication, transport, usage et fin de vie. Ses principes éclairent aussi l’évaluation d’une organisation. Voir les [principes ACV](../fondations/principes-acv-appliques-au-numerique).

## Allocation

Règle d'affectation qui permet d'attribuer à un objet d'étude sa part des impacts d'une ressource partagée. Les principales familles d'allocation sont : temporelle, volumétrique, par capacité réservée, par nombre d'utilisateurs ou forfaitaire documentée. Voir [Allocation et partage des impacts](../regles/allocation-et-partage-des-impacts).

## Allocation forfaitaire

Part fixe conventionnelle attribuée à un service en l'absence de données d'usage mesurées. Utilisée en dernier recours et toujours documentée.

## Allocation temporelle

Affectation des impacts proportionnellement à la durée d'usage du service par rapport à la durée de vie totale de l'équipement. Règle par défaut pour les terminaux et serveurs dédiés.

## Allocation volumétrique

Affectation des impacts proportionnellement au volume de données transférées. Cette convention d’attribution ne démontre pas une consommation physique proportionnelle aux octets. Voir le [modèle réseau](../materiel/reseau-et-infrastructure/reseau).

## Analyse de sensibilité {#analyse-de-sensibilite}

Variation d’hypothèses dans des bornes justifiées pour observer leur effet sur le résultat. Elle montre quelles données influencent la conclusion ; elle ne constitue pas un intervalle de confiance statistique. [Explication détaillée](../regles/qualite-des-donnees-et-matrice-de-robustesse).

## Application native {#application-native}

Application exécutée dans l’environnement du système d’exploitation d’un terminal, sur mobile ou ordinateur. Dans ce chapitre, le périmètre couvre aussi les applications installées hybrides ou multiplateformes : distribution, activité locale et services distants restent inventoriés selon leurs ressources réelles. Voir [Applications natives](../cas-d-usage/services/mobile).

## Application hybride {#application-hybride}

Application associant des fonctions natives et du contenu web embarqué. Les contributions sont réparties sans additionner deux inventaires complets du même parcours. Voir le [périmètre des applications](../cas-d-usage/services/mobile).

## Archétype {#archetype}

Configuration type documentée d’une famille d’équipements ou de composants. Elle sert de référence lorsque les caractéristiques réelles manquent. Les valeurs empruntées restent des estimations ; leur pertinence dépend de la gamme, de la génération, des fonctions et du contexte d’usage. Voir la [gestion des données manquantes](../modelisation/modelisation-d-un-equipement#gestion-des-données-manquantes).

## Arrière-plan {#arriere-plan}

Activité exécutée sans interaction directe avec l’interface : synchronisation, notification ou traitement différé. Sa durée n’équivaut pas à un temps d’écran allumé ; son exécution dépend du système et de ses restrictions. Voir les [spécificités des plateformes](../cas-d-usage/services/mobile#specificites-mobiles-et-ordinateurs).

## Approche attributionnelle {#approche-attributionnelle}

Approche qui répartit les impacts d’un système entre les produits ou services étudiés. Une réduction de la part allouée ne démontre pas, à elle seule, des émissions physiquement évitées. [Explication détaillée](../fondations/principes-acv-appliques-au-numerique).

## Approche end-point {#approche-end-point}

Indicateur de dommages potentiels, par exemple sur la santé humaine ou les écosystèmes. Le passage des mid-point aux end-point nécessite des modèles supplémentaires. Un simple regroupement d’indicateurs par thème ne constitue pas un calcul end-point.[^mid-end]

## Approche mid-point {#approche-mid-point}

Indicateur d’un problème environnemental intermédiaire, comme le changement climatique en kg CO₂ eq. ou l’acidification. Il caractérise les émissions et les prélèvements sans aller jusqu’à une estimation des dommages finaux.[^mid-end]

## AWARE (Available WAter REmaining) {#aware}

Méthode de caractérisation du risque de privation d’eau pour les humains et les écosystèmes. Elle pondère les volumes consommés selon la disponibilité locale de l’eau. Le résultat s’exprime en m³ équivalent monde, distincts des m³ physiques consommés. [Explication détaillée](../fondations/indicateurs-environnementaux.md#indicateurs-en-veille).[^aware]

## Barycentre de référence {#barycentre}

Point géographique représentant un pays dans le référentiel. La méthode utilise la distance orthodromique entre ces points pour estimer la distance interpays. Il ne localise ni un routeur ni un centre de données et ne décrit pas le routage. Voir le [modèle réseau](../materiel/reseau-et-infrastructure/reseau).

## Batch (lot de traitement) {#batch}

Lot d’entrées regroupées pour le traitement par un modèle. La taille du lot influence la mémoire et les performances ; son effet dépend du matériel et du moteur d’exécution. [Explication détaillée](../cas-d-usage/services/ia-generative.md).

## Cache de préfixe {#cache-de-prefixe}

Réutilisation, entre requêtes, des états calculés pour un début de prompt commun. Elle réduit le traitement de ce préfixe, sans supprimer le calcul de la réponse ni les ressources du cache. [Explication détaillée](../cas-d-usage/services/ia-generative.md).

## Cache KV (Key-Value) {#cache-kv}

Conservation des clés et valeurs d’attention des jetons déjà traités pour les réutiliser pendant la génération. Ce mécanisme évite une partie des recalculs mais mobilise de la mémoire. [Explication détaillée](../cas-d-usage/services/ia-generative.md).

## Capacité réservée {#capacite-reservee}

Ressources mises à disposition d’un service, même lorsqu’il les utilise peu. Une allocation par réservation attribue cette capacité immobilisée ; elle ne mesure pas directement la consommation réelle. [Explication détaillée](../regles/allocation-et-partage-des-impacts).

## CDN (Content Delivery Network)

Réseau de diffusion de contenu constitué de serveurs répartis géographiquement qui coopèrent pour mettre à disposition du contenu au plus près des utilisateurs. Le CDN réduit la distance de transfert et met en cache une partie des données, réduisant la charge sur le serveur d'origine.

## Cradle-to-gate {#cradle-to-gate}

Périmètre allant de l’extraction des matières premières à la sortie du produit de l’étape de production déclarée. L’usage et la fin de vie en aval sont exclus ; transport, emballage et infrastructures dépendent de la frontière annoncée. Voir la [qualité des données](../regles/qualite-des-donnees-et-matrice-de-robustesse).

## Criticité d’un matériau {#criticite}

Appréciation de l’importance économique d’un matériau et du risque pesant sur son approvisionnement. Elle ne constitue pas un indicateur d’impact environnemental et ne se confond pas avec l’ADPe. [Explication détaillée](../materiel/materiaux/materiaux-critiques).

## Donnée primaire

Donnée collectée directement dans le périmètre d'étude ou fournie par un acteur directement concerné. Se distingue d'une donnée secondaire (issue de la littérature ou d'un référentiel générique).

## Donnée secondaire {#donnee-secondaire}

Donnée issue de la littérature, d’une base ou d’un autre contexte que la mesure directe du système étudié. Sa pertinence dépend de sa compatibilité et de sa représentativité, pas seulement de son ancienneté. [Explication détaillée](../regles/qualite-des-donnees-et-matrice-de-robustesse).

## Double comptabilisation

Erreur méthodologique consistant à compter le même impact physique plusieurs fois dans des périmètres d'évaluation qui se superposent. Voir [Double comptabilisation](../regles/double-comptabilisation).

## Durée de vie nominale

Durée de référence attendue ou conventionnelle pour un équipement. Elle sert d’hypothèse d’allocation lorsqu’une durée mieux documentée manque ; ce n’est pas une durée minimale garantie. Voir la [temporalité](../regles/temporalite-vieillissement-et-versionnement-des-donnees).

## Durée de vie réelle

Durée estimée à partir des équipements encore utilisés et de ceux sortis du parc. La durée finale des équipements encore en service reste inconnue. Voir l’[estimateur et ses limites](../regles/temporalite-vieillissement-et-versionnement-des-donnees).

## Embedding (représentation vectorielle) {#embedding}

Représentation numérique d’un contenu sous forme de vecteur, notamment pour rechercher des contenus proches. Sa production, son stockage et sa recherche font partie du périmètre d’une application RAG. [Explication détaillée](../cas-d-usage/services/ia-generative.md).

## Empreinte environnementale

Indicateur qui permet d'évaluer la pression qu'exerce l'homme ou une activité sur les ressources et les écosystèmes. Exprimée au travers de plusieurs indicateurs mid-point.

## Entraînement {#entrainement}

Phase d’ajustement des paramètres d’un modèle à partir de données. Le volume traité compte toutes les présentations des données ; les essais et la préparation peuvent aussi contribuer au cycle de vie du modèle. [Explication détaillée](../cas-d-usage/services/ia-generative.md).

## Équipement

Tout dispositif électronique qui compose les trois tiers du numérique : terminaux utilisateurs, équipements réseau, équipements des datacenters. Utilisé pour visualiser, traiter, stocker ou transmettre des données.

## Facteur de caractérisation {#facteur-de-caracterisation}

Coefficient reliant un flux d’inventaire, par exemple une émission, à un indicateur d’impact. Il dépend de la méthode de caractérisation et de sa version ; il n’est pas nécessairement un facteur d’équipement complet. [Explication détaillée](../fondations/indicateurs-environnementaux).

## Facteur d’impact {#facteur-d-impact}

Impact rapporté à une quantité de référence : équipement, kWh, Go ou durée, par exemple. Son utilisation suppose une unité, des phases du cycle de vie et une méthode de caractérisation compatibles avec l’étude. [Explication détaillée](../regles/hypotheses-valeurs-par-defaut-et-hierarchie-des-sources).

## Fine-tuning (adaptation d’un modèle) {#fine-tuning}

Entraînement complémentaire d’un modèle déjà entraîné pour l’adapter à des données ou à une tâche. Le nombre de paramètres modifiés ne suffit pas à déterminer le coût de calcul. [Explication détaillée](../cas-d-usage/services/ia-generative.md).

## FLOP et FLOP/s {#flop}

Un FLOP est une opération en virgule flottante ; FLOP/s désigne un débit d’opérations par seconde. Une charge de calcul et un débit sont des grandeurs différentes, dont le rapport permet d’estimer une durée. [Explication détaillée](../cas-d-usage/services/ia-generative.md).

## GPU (Graphics Processing Unit) {#gpu}

Processeur adapté au calcul parallèle, utilisé notamment pour les traitements graphiques et l’IA. Son évaluation comprend les phases matérielles couvertes et son usage, ainsi que sa part des ressources du serveur. [Explication détaillée](../materiel/composants/processeurs-et-accelerateurs).

## GPU·h (heure GPU) {#gpu-heure}

Une heure mobilisée sur un GPU ; plusieurs GPU pendant la même durée cumulent leurs heures. Un facteur par GPU·h précise s’il repose sur des heures actives, réservées ou calendaires, et les phases incluses. Voir le [cas IA](../cas-d-usage/services/ia-generative.md).

## HBM (High Bandwidth Memory) {#hbm}

Mémoire à haute bande passante associée à certains accélérateurs. Sa fabrication et son usage appartiennent au périmètre du matériel ; une HBM déjà incluse dans un facteur GPU ne s’ajoute pas séparément. [Explication détaillée](../materiel/composants/memoire-vive).

## Hyperviseur

Couche logicielle qui permet de créer et gérer des machines virtuelles sur un serveur physique. Exemples : VMware ESXi, KVM, Hyper-V, Xen. Introduit un overhead de consommation de ressources.

## Impact intrinsèque

Impacts environnementaux liés à la création et à l'élimination d'un équipement matériel, correspondant aux phases ACV d'extraction des matières premières, fabrication, transport et fin de vie. La part attribuée à un usage donné dépend de la règle d'allocation retenue.

## Impact opérationnel

Impact résultant de la phase d'utilisation d'un équipement, reposant sur la consommation d'électricité nécessaire à son fonctionnement.

## Indicateur environnemental

Grandeur décrivant un effet ou une pression environnementale après caractérisation. Les neuf indicateurs retenus sont distincts et ne s’additionnent pas entre eux. Leurs [unités et méthodes](../fondations/indicateurs-environnementaux) déterminent la compatibilité des facteurs.

| Sigle | Signification |
|---|---|
| GWP | Potentiel de changement climatique |
| AP | Potentiel d’acidification |
| CTUe | Écotoxicité des eaux douces |
| CTUh-nc | Toxicité humaine, effets non cancérigènes |
| CTUh-c | Toxicité humaine, effets cancérigènes |
| PM | Effets sanitaires des particules fines |
| IR | Effets des rayonnements ionisants |
| WU | Impact lié à l’utilisation de l’eau, après caractérisation |
| ADPe | Épuisement des ressources abiotiques minérales et métalliques |

## Inférence {#inference}

Exécution d’un modèle entraîné pour produire une sortie à partir d’une entrée. Elle inclut le traitement du prompt ou des médias et la production de la réponse, selon la tâche. [Explication détaillée](../cas-d-usage/services/ia-generative.md).

## Inventaire du cycle de vie {#inventaire-du-cycle-de-vie}

Recensement des flux nécessaires à l’étude : matières, énergie, émissions et déchets dans le périmètre retenu. Il constitue la base du calcul des impacts et dépasse la seule liste des équipements. [Explication détaillée](../fondations/principes-acv-appliques-au-numerique).

## Jeton (token) {#jeton}

Unité produite par le découpage du texte d’un modèle. Un jeton n’équivaut pas à un mot : le nombre dépend du modèle, de la langue et du contenu. Les représentations des médias suivent des conventions propres. [Explication détaillée](../cas-d-usage/services/ia-generative.md).

## LoRA (Low-Rank Adaptation) {#lora}

Méthode d’adaptation qui entraîne des matrices de faible rang en conservant les poids de base gelés. La réduction des paramètres entraînables ne correspond pas automatiquement à la même réduction d’énergie ou d’opérations. [Explication détaillée](../cas-d-usage/services/ia-generative.md).

## Matrice de robustesse

Grille D4B de documentation selon six dimensions : périmètre, géographie, temporalité, description physique, traçabilité et méthode. Chaque dimension est notée de 1 à 5 avec justification. Elle ne constitue pas une certification. Voir la [qualité des données](../regles/qualite-des-donnees-et-matrice-de-robustesse).

## MFU (Model FLOPs Utilization) {#mfu}

Rapport entre le débit de calcul utile au modèle et le débit théorique des accélérateurs, selon les conventions retenues. Il sert à estimer une durée ; il ne représente ni un taux d’activité GPU ni une fraction de sa puissance. [Explication détaillée](../cas-d-usage/services/ia-generative.md).

## Mix électrique {#mix-electrique}

Répartition des sources de production de l’électricité pour une zone et une période. Les facteurs d’impact associés dépendent des technologies et des inventaires retenus ; une part renouvelable n’est pas un facteur d’impact nul. [Explication détaillée](../fondations/impacts-de-la-consommation-d-energie).

## MoE (Mixture of Experts) {#moe}

Architecture dans laquelle une partie seulement des experts du modèle est activée pour chaque jeton. Les paramètres actifs interviennent dans le calcul ; les paramètres stockés restent nécessaires pour estimer la mémoire. [Explication détaillée](../cas-d-usage/services/ia-generative.md).

## Mutualisation

Partage de ressources matérielles entre plusieurs services ou utilisateurs via la virtualisation ou la conteneurisation, permettant de réduire le nombre d'équipements physiques nécessaires.

## PAIA (Product Attributes to Impact Algorithm) {#paia}

Approche simplifiée d’estimation de l’empreinte des équipements à partir de leurs caractéristiques. Elle aide à repérer les principales contributions ; ses résultats et leur incertitude ne suffisent pas à classer des modèles proches. Voir la [lecture des fiches constructeur](../regles/qualite-des-donnees-et-matrice-de-robustesse).

## Paramètres du modèle {#parametres-du-modele}

Les paramètres **totaux** sont les poids stockés ; les paramètres **actifs** sont ceux sollicités par le traitement considéré. Les paramètres **entraînables** sont ceux dont la valeur peut être mise à jour. Un paramètre **gelé** conserve sa valeur mais peut rester actif dans le calcul, y compris lors de la propagation des gradients vers d’autres couches. MoE et gel des poids agissent donc sur des dimensions différentes. [Explication détaillée](../cas-d-usage/services/ia-generative.md).

## PCF (Product Carbon Footprint) {#pcf}

Empreinte carbone d’un produit, limitée à l’indicateur climatique. Les phases incluses, la configuration et le scénario d’usage sont propres à la fiche ; le sigle ne garantit ni un cycle de vie complet ni une vérification indépendante. Voir la [qualité des données](../regles/qualite-des-donnees-et-matrice-de-robustesse).

## Périmètre (frontière du système) {#perimetre}

Ensemble des activités, ressources et phases du cycle de vie incluses dans l’étude. Il précise aussi la période et les exclusions. Un service externalisé peut rester dans le périmètre s’il contribue à la fonction étudiée. [Explication détaillée](../fondations/perimetre-frontieres-services-tiers-et-unite-d-analyse).

## Prompt {#prompt}

Entrée soumise à un modèle : consignes, contexte et éventuels médias. Son traitement et la génération de la réponse constituent des activités distinctes dans le modèle de calcul. [Explication détaillée](../cas-d-usage/services/ia-generative.md).

## Proxy {#proxy}

Donnée ou modèle de substitution utilisé lorsque l’information directe manque. Sa frontière, sa représentativité et ses limites restent explicites ; son utilisation ne transforme pas une estimation en mesure. [Explication détaillée](../regles/qualite-des-donnees-et-matrice-de-robustesse).

## PUE (Power Usage Effectiveness)

Indicateur mesurant l'efficacité énergétique d'un datacenter. Il rapporte l'énergie totale consommée par le centre à l'énergie utilisée uniquement par les équipements informatiques. Un PUE de 1,0 signifie l'absence d'énergie additionnelle de site au-delà des équipements IT (calcul, stockage et réseau). La valeur 1,58 est un scénario historique de remplacement, pas une moyenne mondiale actuelle vérifiée.

## Quantification numérique {#quantification}

Représentation de valeurs du modèle avec une précision numérique réduite. Elle peut modifier la mémoire, le débit et la qualité des sorties ; elle ne réduit pas automatiquement le nombre de paramètres. [Explication détaillée](../cas-d-usage/services/ia-generative.md).

## RAG (Retrieval-Augmented Generation) {#rag}

Génération enrichie par des contenus recherchés dans une base documentaire. L’évaluation couvre aussi les embeddings, l’indexation, la recherche et le stockage, au-delà du seul appel au modèle. [Explication détaillée](../cas-d-usage/services/ia-generative.md).

## Rayon équivalent {#rayon-equivalent}

Rayon d’un disque de même surface que le pays : $r=\sqrt{S/\pi}$, avec $S$ en km² et $r$ en km. Il sert à estimer la distance interne dans le modèle réseau. Le cercle associé ne suit pas les frontières et ne représente pas une couverture réseau. Voir le [modèle réseau](../materiel/reseau-et-infrastructure/reseau).

## RCP (Référentiel par Catégorie de Produit)

Règles d’évaluation environnementale propres à une catégorie de produits ou services. Le RCP parent des services numériques est précisé par des RCP sectoriels. Leur utilisation ici ne vaut pas conformité globale. Voir le [positionnement D4B](../introduction/positionnement-par-rapport-aux-referentiels-existants).

## REF et CFE

Le REF décrit une part d'énergie renouvelable. Le CFE décrit une part d'énergie sans carbone opérationnel selon la convention fournisseur et peut inclure le nucléaire. Ces pourcentages ne sont pas interchangeables et ne réduisent pas automatiquement un facteur électrique location-based.

## SCI et SCI-AI {#sci}

SCI (Software Carbon Intensity) décrit une intensité carbone logicielle rapportée à une unité fonctionnelle. SCI-AI en précise l’application à l’IA. Ces cadres carbone ne remplacent pas une évaluation multicritère. [Explication détaillée](../introduction/positionnement-par-rapport-aux-referentiels-existants).

## Score de robustesse

Moyenne des six notes de documentation de la grille D4B. Le détail des dimensions et les incompatibilités bloquantes priment sur cette moyenne ; elle n’est ni une probabilité d’exactitude ni un intervalle de confiance. Voir la [qualité des données](../regles/qualite-des-donnees-et-matrice-de-robustesse).

## Service tiers {#service-tiers}

Service fourni par un acteur externe et mobilisé par la fonction étudiée : API, paiement, vidéo ou cloud, par exemple. Son externalisation ne justifie pas son exclusion ; les recouvrements avec les autres postes restent à traiter. [Explication détaillée](../fondations/perimetre-frontieres-services-tiers-et-unite-d-analyse).

## TDP (Thermal Design Power) {#tdp}

Puissance de référence thermique indiquée pour un composant selon les conventions du constructeur. Elle ne constitue pas une mesure de la consommation moyenne du serveur ni de son énergie sur une période. [Explication détaillée](../materiel/composants/processeurs-et-accelerateurs).

## TEC (Typical Energy Consumption) {#tec}

Consommation électrique typique associée à un protocole et à un profil de fonctionnement. Une TEC annuelle inclut les modes et durées de ce profil ; elle n’est pas une puissance active mesurée pour une application. Voir le [Applications natives](../cas-d-usage/services/mobile).

## Terminal

Équipement électronique permettant à un utilisateur d'interagir avec un système informatique : ordinateurs, smartphones, tablettes, terminaux de paiement, guichets automatiques, etc.

## Unité fonctionnelle et unité d’analyse {#unite-fonctionnelle}

L’unité fonctionnelle décrit le service rendu, sa quantité et ses conditions de qualité. L’unité d’analyse exprime le résultat, par exemple par session. Une même unité de comptage ne garantit pas deux fonctions équivalentes. [Explication détaillée](../fondations/perimetre-frontieres-services-tiers-et-unite-d-analyse).

## vCPU

Unité de processeur virtuel attribuée à une machine virtuelle. Sa correspondance avec les threads et cœurs physiques dépend de l'offre, de l'architecture, du SMT et du surengagement ; elle doit être documentée.

## Versionnement

Pratique consistant à tracer la version des données, facteurs et méthodes utilisés dans une évaluation, afin de garantir la reproductibilité et la comparabilité des résultats dans le temps.

## VM (machine virtuelle) {#machine-virtuelle}

Environnement d’exécution utilisant une part des ressources d’un hôte physique. Il ne constitue pas un équipement matériel supplémentaire ; ses impacts proviennent de l’allocation des ressources de l’hôte et des infrastructures associées. [Explication détaillée](../regles/prise-en-compte-des-couches-logicielles-et-de-la-virtualisation).

## WUE (Water Usage Effectiveness)

Rapport entre l'eau directe utilisée par le site et l'énergie des équipements IT, généralement en litres par kWh IT. Documenter prélèvement ou consommation, période et site. Ne pas confondre avec WU, indicateur d'impact caractérisé lié à l'eau.

## Configuration de référence {#configuration-reference}

Assemblage explicite de composants utilisé pour représenter un équipement lorsque sa composition exacte est inconnue. Ses caractéristiques sont des hypothèses documentées ; ses impacts sont recalculés par les modèles de composants. Une configuration n’est pas un ancien forfait d’impact renommé.

## Calibration {#calibration}

Estimation ou ajustement des paramètres d’un modèle à partir de données indépendantes et compatibles. La validation vérifie ensuite sa capacité à reproduire des observations distinctes de celles utilisées pour l’ajustement.

## Facteur dérivé {#facteur-derive}

Résultat d’un modèle ramené à une unité, par exemple la fabrication par seconde d’un terminal. Sa reproduction exige la configuration, les coefficients, les frontières et la convention d’allocation.

## LAN {#lan}

Réseau local reliant les équipements d’un site : switches, points d’accès, câblage et équipements de support. Sa frontière est distincte du réseau d’accès Internet.

## Go·km {#go-km}

Produit d’un volume en gigaoctets par une distance en kilomètres. Dans le modèle réseau D4B, 2 Go parcourant une distance conventionnelle de 100 km représentent 200 Go·km. Ce produit est une grandeur du modèle d’allocation, pas une mesure directe d’énergie. Voir [Réseau](../materiel/reseau-et-infrastructure/reseau).

## Codebook {#codebook}

Ensemble de codes appris permettant de représenter un signal sous forme discrète. Un modèle audio peut en combiner plusieurs pour représenter différents niveaux de détail ; leur nombre ne suffit pas à déduire le coût réel du calcul. [Explication détaillée](../cas-d-usage/services/ia-generative.md).

## Diffusion (modèle génératif) {#diffusion}

Génération par étapes successives de débruitage, guidées par une consigne ou un média. DiT utilise un Transformer ; U-Net une architecture organisée en réduction puis reconstruction de résolution. Nombre d’étapes, positions traitées et architecture déterminent la charge. [Explication détaillée](../cas-d-usage/services/ia-generative.md).

## Espace latent {#espace-latent}

Représentation interne d’un média, souvent plus compacte que ses pixels ou ses échantillons audio. Le calcul peut porter sur ces positions latentes. Un VAE (autoencodeur variationnel) permet notamment de passer entre cette représentation et le média ; son décodage constitue un traitement à inventorier. [Explication détaillée](../cas-d-usage/services/ia-generative.md).

[^aware]: WULCA, [What is AWARE?](https://wulca-waterlca.org/what-is-aware/) et [FAQ: units](https://wulca-waterlca.org/what-is-aware/faq/). Boulay et al., 2018. Consultées le 20 octobre 2026.

[^mid-end]: RIVM, [LCIA: the ReCiPe model](https://www.rivm.nl/en/life-cycle-assessment-lca/recipe), mise à jour du 29 octobre 2024.
