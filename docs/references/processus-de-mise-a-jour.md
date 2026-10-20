# Processus de mise à jour

La reproductibilité d’une révision repose sur des changements identifiés, un état antérieur conservé, des effets mesurés sur des cas de référence et une synchronisation de la documentation, des données, des simulateurs et des traductions. Une publication récente ne remplace pas automatiquement une source plus ancienne mieux adaptée à l'objet étudié.

## Déclencheurs de révision

Une correction est nécessaire lorsqu'une erreur d'unité, de formule, de frontière ou d'allocation est constatée. Une nouvelle version de facteur, une publication pertinente ou un changement matériel de technologie déclenche une revue de pertinence. Les paramètres rapidement variables (mix électriques, configurations cloud, modèles IA) sont réexaminés au moment de l'étude ; les fondements ACV sont revus lors d'une évolution de référentiel.

La présence d'une cadence annoncée ne prouve pas qu'une source a été mise à jour. La fraîcheur dépend de la dernière période effectivement disponible. Une année incomplète ne se compare pas sans précaution à une année complète.

## Fiche de changement

Toute modification influant sur un résultat possède une fiche comprenant :

| Champ | Contenu attendu |
|---|---|
| Objet | Pages, formules, facteurs et simulateurs concernés |
| Motif | Erreur corrigée, nouvelle preuve, changement de périmètre ou de convention |
| Source | Auteur, titre, URL ou DOI, version, date de publication et date de consultation |
| Donnée | Fichier et identifiant de ligne, commit ou version, période, géographie, unité, méthode de caractérisation |
| Décision | Valeur antérieure, valeur retenue et raison ; statut mesuré, publié, dérivé ou hypothétique |
| Effet | Résultat avant/après sur un cas identique, explication de l'écart et limites restantes |
| Vérification | Commandes exécutées, résultats et contrôle visuel pertinent |
| Traductions | Pages françaises et anglaises synchronisées |
| Glossaire | Définitions des termes clés nouveaux ou modifiés, liens vers les chapitres et équivalents anglais |

Les valeurs partagées sont consignées dans le [registre des hypothèses](./registre-des-hypotheses-et-valeurs-par-defaut). Les archives de refonte conservent les passages remplacés ; elles ne constituent pas un second registre de valeurs applicables.

La revue du corpus porte sur les publications originales, leurs annexes et les formules des versions antérieures. Les transcriptions facilitent la recherche ; le document original tranche les ambiguïtés. Chaque reprise précise le passage utilisé, la décision éditoriale et les éventuels effets numériques à instruire séparément.

## Évaluer une nouvelle source

1. La revue couvre la méthode et ses limites, au-delà du résumé ou du communiqué.
2. La pertinence dépend de l’unité fonctionnelle, des frontières, de la technologie, de la géographie, de la période et de l’allocation.
3. Deux facteurs portant le même sigle ne sont combinables que si leurs méthodes de caractérisation sont compatibles.
4. La reproduction d’un exemple publié étaye la revue ; tout obstacle à cette reproduction reste explicite.
5. La décision précise si la source remplace un facteur, ajoute un scénario ou reste une piste. Une prépublication est identifiée comme telle.

Un article sur une puce donnée ne valide pas des coefficients universels par nœud de gravure. Un facteur d'équipement complet ne s'ajoute pas à ses composants. Une mesure de site ne reçoit pas une seconde fois le PUE.

## Valider avant publication

Les vérifications minimales portent sur les dimensions physiques, les conversions d'unités, les valeurs nulles et manquantes, les frontières de consommation et l'absence de double comptage. Les cas de référence doivent tester des propriétés utiles : conservation des totaux, effet du PUE sur l'usage seulement, sensibilité au facteur électrique, partage du temps et des ressources.

Dans ce dépôt, la validation repose sur `yarn test:calculations`, `yarn typecheck` et `yarn build` avec la version de Node déclarée par le projet. Les contrôles dans un navigateur couvrent les deux langues : navigation, formules, tableaux, simulateurs, saisie au clavier et écran étroit. Un build anglais réussi ne suffit pas : chaque page de la navigation doit posséder une traduction complète, sans repli silencieux sur le français.

Une correction numérique doit synchroniser l'exemple de la page et le simulateur, ou expliquer explicitement pourquoi leurs hypothèses diffèrent. Les erreurs bloquantes de liens, les formules non rendues et les résultats non finis doivent être résolus avant publication.

## Versionner et rendre les limites visibles

Un instantané immuable permet une évaluation reproductible. La période décrite par les données se distingue de leur date de consultation. Le résultat avant révision reste disponible pour les comparaisons historiques. Le suivi d’une tendance repose sur deux périodes recalculées avec une méthode commune, ou sur une estimation isolée de l’effet du changement méthodologique.

Une donnée absente reste signalée comme absente. Un indicateur suspendu faute d’unité ou d’inventaire compatible est signalé près du résultat et dans le registre. Une absence ne vaut pas zéro, et un sous-total ne constitue pas une ACV complète.

La revue scientifique et technique prépare une version ; elle ne déclenche pas automatiquement sa publication. Le journal de version indique les contrôles réellement passés et les réserves restantes.

## Intégrer une évolution de référentiel

Une nouvelle édition ne remplace pas automatiquement les conventions D4B. Chaque apport relève d’une convergence, d’un complément compatible, d’une différence à expliciter, d’une erreur démontrée ou d’un point ambigu à instruire. Une clarification éditoriale peut modifier directement la documentation. Un changement de formule, facteur, allocation ou score fait l’objet d’une proposition distincte avec un exemple avant/après et ses effets de compatibilité.

Les notes précisent l’édition citée, les pages utiles et les exclusions. Le RCP parent indique une validité maximale de cinq ans pour une étude, ramenée à trois ans pour l’IA. Ce délai ne constitue pas une fréquence de mise à jour des facteurs et ne garantit pas qu’une donnée reste représentative jusque-là.[^rcp-parent]

[^rcp-parent]: ADEME, [RCP services numériques, version 2, juin 2026](https://librairie.ademe.fr/societe-et-politiques-publiques/9418-methodologie-d-evaluation-environnementale-basee-sur-l-analyse-du-cycle-de-vie-acv-pour-un-service-numerique.html), p. 24–27.

## Méthode cible et données historiques {#methode-cible}

La v2 décrit la référence pour les développements futurs. Une implémentation peut couvrir seulement une partie de ce cadre ; le résultat indique sa version et ses postes évalués.

La transition des forfaits d’équipements vers les composants conserve les instantanés historiques pour reproduire un ancien résultat. Une nouvelle configuration ou un nouveau modèle possède sa propre version. Les tendances sont recalculées avec une méthode commune avant d’être interprétées comme une évolution des usages.
