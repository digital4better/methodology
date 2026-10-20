# Préparation de la migration Open Data

Périmètre : préparation uniquement. Dépôt local inspecté : `data-new`, HEAD `e0335ad`, avec travaux locaux préexistants. Les chemins ci-dessous sont une cible, pas des ressources déjà publiées.

## Organisation cible

| Aujourd’hui | Cible proposée | Compatibilité |
|---|---|---|
| `data/cloud/cpus.{json,csv}` | `data/equipment/cpus.{json,csv}` | Identifiants CPU conservés ; alias de chemin pendant la transition |
| `data/cloud/accelerators.{json,csv}` | `data/equipment/accelerators.{json,csv}` | Identifiants conservés ; frontière puce, module ou carte explicite |
| Paramètres dispersés | `data/equipment/models/` | Modèles immuables avec version et domaine de validité |
| Assemblages implicites | `data/equipment/configurations/` | Composants, quantités et hypothèses explicites |
| `data/cloud/*-vms.{json,csv}` | Chemins conservés | Offres liées aux configurations et clés d’allocation |
| `data/equipment/embodied.*`, `energy.*` | Archives versionnées | Anciens forfaits disponibles pour reproduire les résultats historiques |

Les catalogues de caractéristiques n’hébergent pas silencieusement des coefficients environnementaux. Un modèle référence une source et une version ; une configuration référence des composants et un modèle ; un résultat dérivé référence ces deux versions et une convention d’allocation.

## Contrat de données à instaurer

Chaque modèle porte : identifiant, version, indicateurs couverts, unités d’entrée et de sortie, frontières, phases, équation, paramètres, provenance précise, domaine de validité et statut de calibration. Chaque valeur distingue mesure, donnée secondaire, estimation et hypothèse d’illustration.

Les valeurs manquantes portent un statut explicite. Les zéros actuels des caractéristiques, par exemple une surface de puce inconnue, doivent être qualifiés individuellement ; ils ne deviennent ni une puce absente ni une donnée réelle de surface nulle. JSON et CSV expriment le même statut.

Une configuration donne les quantités physiques, la capacité par module ou disque, la présence de mémoire sur carte, l’écran intégré ou externe et les composants couverts par le résiduel. Un inventaire de carte accélératrice complète exclut l’ajout séparé de ses composants déjà couverts.

Une offre VM référence le matériel hôte, le partage CPU/RAM/stockage, la durée et la convention d’allocation. La capacité réservée et les heures actives restent distinctes. Le poste physique n’est compté qu’une fois, y compris lorsque plusieurs offres se partagent l’hôte.

## Consommateurs identifiés

| Surface | Point observé | Adaptation nécessaire |
|---|---|---|
| Générateur Open Data | `index.ts`, exports CPU et accélérateurs vers 835–865 | Lecture des nouveaux chemins et génération des alias depuis une seule source |
| Offres cloud | Catalogues AWS, Azure, GCP, Oracle, OVHcloud, Scaleway | Résolution des références matérielles, provenance des impacts dérivés |
| Site et téléchargements | `site/`, liens JSON/CSV | Nouvelle navigation Equipment, alias et descriptions de dépréciation |
| Fruggr | `packages/data/sync/index.ts`, `REFERENCE_DATA_FILES` | Synchronisation versionnée ; ajout des modèles/configurations ; remplacement du chemin accélérateurs |
| Méthodologie | Snapshots, registres et exemples dans `src/data/` | Import explicite de la version retenue, jamais consommation silencieuse de `main` |

Cet inventaire ne prouve pas l’absence d’autres consommateurs externes. Une recherche des chemins, IDs et liens de téléchargement dans les dépôts et une période de compatibilité précèdent leur suppression.

## Séquence de migration

1. Figer l’ancien catalogue et ses exports avec commit, version, sommes de contrôle et manifeste. Garantir leur accès en lecture.
2. Ajouter les schémas et les nouveaux chemins ; conserver les IDs. Séparer caractéristiques, paramètres et configurations. Publier d’abord un jeu candidat non substitué aux facteurs stables.
3. Générer les anciens chemins comme alias du même catalogue de caractéristiques. Conserver les anciens facteurs d’impact dans leur version historique, sans les remplacer sous la même version.
4. Recalculer un jeu de configurations documentées. Produire les écarts par composant, phase et indicateur ; traiter les trous de couverture avant toute qualification.
5. Migrer les consommateurs avec version explicite et possibilité de retour à la version précédente. Vérifier les imports, exports, recherches et téléchargements réels.
6. Publier la nouvelle version et sa notice de migration dans une opération distincte. Retirer les alias seulement après inventaire et période de transition définie.

## Critères de réception

IDs et références sans collision ; JSON/CSV équivalents ; résultats déterministes ; unités et frontières compatibles ; inconnues distinctes de zéro ; quantités et allocations conservées ; absence de double compte de carte, mémoire ou hôte ; anciens résultats reproductibles depuis leur version ; écarts chiffrés acceptés avant migration des consommateurs.

La réussite d’un export ou d’un test de schéma ne qualifie pas scientifiquement les coefficients. Les paramètres non calibrés restent signalés comme tels.
