# Qualification et calibration des modèles

La centralisation supprime des divergences de calcul. Elle ne valide ni les multiplicateurs de gravure et packaging, ni les facteurs écran, batterie et structure.

## État des preuves

| Famille | État | Condition avant évolution |
|---|---|---|
| CPU, RAM, SSD historiques | Coefficients documentés, représentativité technologique à réexaminer | Procédés et frontières compatibles avec les équipements visés |
| Gravure et packaging | Multiplicateurs exploratoires | Données indépendantes par technologie et assemblage |
| Écran et batterie | Hypothèses par technologie/chimie | Surface ou capacité, frontière de module/pack et procédés documentés |
| Structure | Résiduel illustratif | Inventaire explicite des éléments non couverts par les autres composants |
| Carte accélératrice | Puce seule dans le modèle composant ; proxy agrégé distinct en IA | Puce, HBM, carte, alimentation et refroidissement sans chevauchement |
| IA | Formules dimensionnellement cohérentes ; limites empiriques identifiées | Mesures de durée, puissance et énergie par phase et configuration |

## Protocole matériel

Chaque cas de référence conserve le rapport produit accessible, sa version, la nomenclature, les quantités, l’indicateur, la méthode LCIA, les phases et les exclusions. Une ACV complète comprenant l’usage ne se compare pas directement à une somme de fabrication.

Le jeu d’ajustement et le jeu de validation restent distincts. Pour chaque modification proposée : équation et domaine, coefficient avant/après, incertitude disponible, impact sur les configurations de référence, décomposition des écarts et biais résiduels. Aucune modification exploratoire ne remplace la version précédente sans ce dossier.

Une donnée manquante ne donne pas un coefficient nul. Une ACV produit représentative peut servir directement d’inventaire spécifique compatible ; son total ne s’ajoute pas à ses propres composants.

## Confrontation IA reproductible

Le [préprint Caravaca et al., v1, sections III-B et IV-A/B](https://arxiv.org/html/2511.05597v1) fournit deux contre-exemples utiles : inversion des longueurs entrée/sortie et regroupement des requêtes. Les points rapportés sont conservés dans `ai-measurements.json` avec matériel et frontière GPU. Le script compare des rapports, sans assimiler des configurations différentes.

Le proxy à MFU constant ne représente pas ces variations. Ces observations ne permettent pas de choisir un coefficient universel entrée/sortie ou un multiplicateur de lot. Elles ne mesurent pas non plus toute l’infrastructure.

Le prochain jeu de qualification doit couvrir modèle, précision, moteur, matériel, longueur du prompt, génération, cache, taille de lot, concurrence, puissance de repos et serveur complet. Les traces distinguent durée, puissance intégrée et énergie ; les ressources réservées mais inactives reçoivent une allocation explicite. Les paramètres supposés de modèles propriétaires restent des scénarios.

Pour les médias, une validation séparée doit couvrir résolution, durée, fréquence, étapes et encodeurs d’entrée. La [méthodologie vidéo EcoLogits](https://ecologits.ai/latest/methodology/video_generation/) constitue une approche indépendante à confronter, pas un coefficient de remplacement automatique.

## Statut

Aucune calibration scientifique nouvelle n’est achevée dans ce lot. Les rapports chiffrés établissent les conséquences des corrections et les limites du proxy. Les mesures indépendantes manquantes sont une condition de la calibration future, pas un motif pour inventer des facteurs.
