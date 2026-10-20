# Positionnement par rapport aux référentiels existants

Cette méthode conserve une lecture par fondations, règles, modèles, matériel et cas d’usage. Les RCP précisent les exigences d’une étude sur un périmètre donné ; D4B les utilise pour améliorer son cadre et rendre ses choix explicites, sans revendiquer une conformité globale.

## Cartographie des référentiels

Le paysage des méthodologies d'évaluation environnementale du numérique est riche mais fragmenté. Le tableau ci-dessous positionne les principaux référentiels selon leur couverture[^donnees-modele] :

| Référentiel | Couverture | Forces | Limites |
|---|---|---|---|
| **ADEME / ARCEP (RCP mère)** | Services numériques FR | Cadre normatif officiel, multicritère, 3 tiers | Granularité limitée pour certains équipements, centré France |
| **Boavizta** | Matériel (composants, équipements) | Décomposition matérielle fine, open source | Couverture partielle des cas d'usage, pas de cadrage service [^source-1]|
| **GreenIT** | Sensibilisation, cas d'usage concrets | Pédagogie, sobriété numérique | Documents de nature différente selon la publication |
| **Green Software Foundation (SCI)** | Intensité carbone logicielle | Frontières explicites, unité d'analyse claire | Mono-indicateur carbone ; fabrication du matériel incluse selon allocation [^source-2]|
| **PAIA (MIT)** | Électronique grand public | Modèle paramétrique produit | Centré produit, pas de service |
| **IMEC NetZero** | Semi-conducteurs, composants | Profondeur technique sur la fabrication | Spécialisé ; accès et inventaires à vérifier [^source-5]|
| **Cloud Carbon Footprint** | Cloud (IaaS) | Coefficients de puissance par composant, open source | Mono-indicateur (carbone), centré cloud [^source-3]|
| **UBA Green Cloud Computing** | Cloud et datacenters | Allocation par ressources virtuelles, multicritère | Centré Allemagne, approche datacenter |

Cette cartographie décrit des usages complémentaires, pas un classement de précision ni une certification de conformité. La [revue datée des sources](../references/sources-et-corpus) précise notamment les apports récents de SCI for AI et des modèles composants.

## Ce que cette méthode reprend

| Référentiel | Apports repris dans la méthodologie |
|---|---|
| <span id="du-cadre-ademe--arcep" /> **ADEME / ARCEP** | Cadrage **ACV** selon ISO 14040/14044. Lecture **multicritère**, avec neuf indicateurs D4B et une [correspondance explicitée avec le RCP 2026](../fondations/indicateurs-environnementaux.md). Trois tiers : terminaux, réseaux et centres informatiques. Approche équipement ou système selon la maîtrise du périmètre. |
| <span id="de-boavizta" /> **Boavizta** | Décomposition **matériaux → composants → équipements** et calcul de l’équipement à partir de ses composants. Distinction entre modèles explicatifs et facteurs forfaitaires. Transparence des données et **open source**. |
| <span id="du-green-cloud-computing-uba" /> **UBA Green Cloud Computing** | **Allocation par ressources virtuelles** (vCPU, vDisk, vNIC). Prise en compte de l’infrastructure support, dont le refroidissement et le PUE, par une allocation composite. Lecture multicritère : GWP, ADP, CED et eau. |
| <span id="de-la-green-software-foundation-sci" /> **Green Software Foundation (SCI)** | **Frontières explicites** et unité d’analyse reliée à la fonction rendue. Relation entre usage, infrastructure et impact. |
| <span id="de-greenit" /> **GreenIT** | **Cas d’usage concrets** et parcours utilisateur. Sobriété comme levier de réduction. Explications accessibles au-delà des spécialistes ACV. |

## Ce que cette méthode adapte

| Sujet | Articulation avec les RCP | Choix D4B conservé |
|---|---|---|
| Périmètre | Application complète et période explicite | Calculs par page, session ou requête, à agréger |
| Indicateurs | Seize catégories EF dans le RCP parent 2026 | Neuf indicateurs ; couverture et manques indiqués |
| Réseau | Part fixe et part variable dans les RCP FAI/applicatif | Exemple par Go ; différence documentée |
| Cloud | Facteurs par unité de service et règles d’allocation propres | Estimation par ressources lorsque pertinente, sans équivalence automatique |
| Qualité | Six critères dans le RCP parent | Grille D4B distincte, avec correspondance expliquée |
| IA | Périmètre temporel applicatif à distinguer du cycle de vie du modèle | Entraînement, médias et limites conservés |

Ces différences sont détaillées dans les pages concernées. Un apport documentaire compatible peut être intégré directement. Un changement de formule, de facteur ou de score demande une analyse séparée de ses effets sur les résultats.[^rcp-parent][^rcp-app]

## Ce qui la différencie

1. **Architecture modulaire** conçue pour plusieurs profils de lecture (découverte, cadrage, implémentation).
2. **Registre central** d'hypothèses et de valeurs par défaut, évitant la dispersion.
3. **Lien explicite** avec le référentiel de données `digital4better/data` comme source canonique versionnée.[^ref-1]
4. **Chaîne matérielle complète** : matériaux → composants → équipements → infrastructure → service.
5. **Couches méthodologiques rendues visibles** : allocation, double comptabilisation, robustesse, temporalité.

## Hypothèses et limites

- Cette page positionne la méthode à un niveau éditorial et méthodologique ; elle ne prétend pas faire une comparaison normative exhaustive de tous les référentiels.
- Les convergences et divergences devront être enrichies au fil des révisions, notamment lorsque de nouveaux référentiels seront publiés.
- Certains référentiels (PAIA, IMEC) couvrent des périmètres très spécialisés qui ne sont que partiellement repris dans cette méthode.

[^rcp-parent]: ADEME, [RCP services numériques, version 2, juin 2026](https://librairie.ademe.fr/societe-et-politiques-publiques/9418-methodologie-d-evaluation-environnementale-basee-sur-l-analyse-du-cycle-de-vie-acv-pour-un-service-numerique.html), p. 13–25.

[^rcp-app]: ADEME, [RCP des applicatifs numériques, juin 2026](https://librairie.ademe.fr/economie-circulaire-et-dechets/9434-referentiel-par-categorie-de-produit-rcp-des-applicatifs-numeriques.html), p. 13–16, 24–35, 54.

[^source-1]: [Boavizta Documentation](https://doc.api.boavizta.org/) Documentation en ligne, version non figée.

[^source-2]: [Green Software Foundation SCI](https://sci.greensoftware.foundation/) Documentation en ligne, version non figée.

[^source-3]: [Cloud Carbon Footprint](https://www.cloudcarbonfootprint.org/docs/methodology/) Documentation en ligne, version non figée.

[^source-5]: [IMEC NetZero](https://www.imec-int.com/en/expertise/cmos-advanced/sustainable-semiconductor-technologies-and-systems-ssts) Documentation en ligne, version non figée.

[^ref-1]: Digital4Better, [`digital4better/data`](https://github.com/digital4better/data). Catalogue évolutif ; utiliser un commit pour figer les facteurs.

[^donnees-modele]: Corpus de référence : Pathfinder Framework, Green Cloud Computing (UBA, 2021) et PAIA ; documentation Boavizta et SCI. Les versions et périmètres sont détaillés dans [Sources et corpus](../references/sources-et-corpus).
