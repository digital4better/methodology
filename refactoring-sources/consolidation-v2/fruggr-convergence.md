# Convergence interne vers la v2

Lecture du code local Fruggr, branche `feature/12163-piloter-les-actions-environnementales`, HEAD `7e2a9630f`. Ce constat n’établit pas la version déployée. Aucun changement de code Fruggr n’est inclus ici. La méthode cible peut devancer l’implémentation.

| Priorité | État observé | Cible et évolution | Vérification attendue |
|---|---|---|---|
| P0 | `packages/it-lca/engine/lca-engine.ts`, `resolveEnergyFactor`, renvoie zéro en dernier recours | Distinguer facteur absent, estimation et résultat nul ; propager la couverture des indicateurs | Donnée absente, vrai zéro, repli explicite et agrégation partielle |
| P1 | `packages/it-lca/engine/lca-engine-1.ts`, `EMBODIED_FACTORS`, coefficients RAM, stockage, batterie, écran et châssis propres au moteur | Brancher un modèle versionné après calibration ; conserver les résultats anciens | Cas de référence par composant, assemblage et phase ; deltas avant/après |
| P1 | `packages/greenops/core/cloud.ts`, `cef = (1-ref)*factor + ref*28.85` | Utiliser le facteur D4B green versionné pour la part REF, au lieu de la constante 28,85 ; conserver une lecture géographique distincte | Pays, période et mêmes kWh ; expliquer l’écart dû à REF |
| P1 | `lca-engine.ts`, `getManufacturingMonthlyFactor`, annule l’allocation après la durée nominale ; `resolveLifetimeYears` applique les grades de reconditionnement | Formaliser la durée de service, l’historique et la convention d’allocation ; une annulation comptable n’est pas une disparition de l’impact physique | Équipement encore utilisé après sa durée nominale, seconde vie, conservation de l’impact sur la trajectoire |
| P1 | `lca-engine.ts`, `resolveUsageHoursPerMonth`, se fonde sur le temps actif | Documenter actif, veille, arrêt, heures calendaires et capacité réservée par usage | Bilan annuel et absence d’addition de clés incompatibles |
| P1 | `packages/greenops/core/utils/ai.ts`, défauts de coefficients entrée 1 et sortie 2, matériel H100/MFU 0,4 | Rendre les conventions versionnées ; confronter aux mesures par phase avant de choisir les coefficients | Prompt/génération, durée, énergie, inactivité et lot ; ne pas aligner mécaniquement sur le 2/2 de l’illustration v2 |
| P1 | Même fichier : médias estimés par FLOPs avec paramètres fixes | Préserver médias en entrée/sortie, entraînement, caches, traitements composés ; qualifier séparément chaque approximation | Scénarios média documentés et domaine de validité, pas simple cohérence dimensionnelle |
| P2 | `packages/data/sync/index.ts`, synchronisation des références depuis `main` et chemin `cloud/accelerators` | Manifeste de versions, nouveaux chemins Equipment, configurations et retour à l’historique | Reproduction d’un ancien résultat après changement du catalogue |

## Qualification des changements de coefficients

Le moteur local utilise notamment RAM `533/384` kg CO₂e/Go, SSD `0,16` kg/Go, HDD `0,02` kg/Go et batterie Li-ion `0,15` kg/Wh. Ce ne sont pas les mêmes fonctions ni nécessairement les mêmes frontières que les modèles illustratifs de la v2. Les résiduels locaux absorbent aussi des éléments non décrits.

Les remplacer directement par les chiffres des illustrations serait prématuré. La convergence porte d’abord sur le contrat de modèle, la traçabilité et les tests. Le choix de paramètres calibrés fait l’objet d’un lot distinct avec références compatibles, décomposition et écarts chiffrés.

## Livraison future

Chaque lot identifie la version méthodologique, la version du moteur et des facteurs, le périmètre des résultats concernés, les cas avant/après et la stratégie de conservation historique. Les résultats métier et les capacités réellement disponibles restent distingués de la référence cible. Aucun nom de produit ni suivi d’implémentation interne n’est ajouté aux pages publiques.

## Correction du statut du modèle réseau, 20 octobre 2026

La lecture de `packages/ecodesign/footprint/src/network.ts` confirme le maintien du modèle par octet·km (équivalent Go·km après conversion). Les coefficients de fabrication et d’énergie sont divisés par `FRANCE_RADIUS = 471.28`, puis multipliés par le volume et les distances. Les distances proviennent de `user-to-datacenter-distances.json` et `region-to-region-distances.json`, avec replis 170 et 2 800 km. Le modèle distingue segment utilisateur, interpays et hébergement ; le CDN réduit les deux derniers. Les facteurs électriques sont nationaux pour les extrémités, continentaux ou mondiaux pour l’interpays.

Le texte v2 présentant cette convention comme abandonnée ou suspendue « avant réutilisation » était incorrect. Il est corrigé. Les limites de provenance et de représentativité restent à documenter sans retirer la méthode actuelle. Les illustrations simplifiées par Go ne constituent pas une décision de migration. Aucune formule ni aucun facteur de Fruggr n’est modifié.

## Clarification cloud, 20 octobre 2026

Retours utilisateur : les services non reconnus peuvent utiliser temporairement un facteur monétaire, hors licences/support et autres coûts sans activité matérielle associée. La règle matérielle doit ensuite remplacer cette estimation, sans double compte. La page décrit cette convention sans introduire de coefficient monétaire arbitraire. Le périmètre et la provenance du coefficient opérationnel restent à identifier dans un lot de convergence.

Pour l’électricité cloud, la convention utilise `(1-REF) × IF_mix + REF × IF_green`, avec des facteurs D4B green non nuls. Le checkout Fruggr `7e2a9630f`, `packages/greenops/core/cloud.ts:311`, conserve encore une constante de 28,85 g CO₂e/kWh et un FIXME de remplacement. Ce constat local ne prouve pas l’état déployé. Le catalogue local D4B `e0335adf` contient `data/factor/country-yearly-green.csv`. Le chargement des facteurs, la compatibilité par indicateur, les replis et le versionnement des résultats devront être vérifiés avant migration.

Le démonstrateur cloud de la méthodologie reste sur le mix moyen et sans REF : son périmètre est maintenant explicite. Aucun moteur, coefficient ni résultat numérique n’est modifié dans ce lot éditorial.

Précision du recours monétaire : `I_i = C × f_i` s’applique à tout indicateur disposant d’un facteur compatible en unité d’impact/devise. La limitation au seul GWP dans la rédaction initiale était incorrecte. Aucun coefficient ni moteur n’est modifié.
