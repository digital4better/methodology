# Serveurs

Cette section couvre les serveurs d'hébergement, de cloud privé et de services intensifs comme l'IA. Elle relie l'impact intrinsèque de l'équipement, sa consommation en usage et leur répartition entre composants, services et charges hébergées. Le niveau de détail dépend de l'inventaire disponible.

## Caractéristiques

| Caractéristique | Unité | Valeur par défaut | Plage ou cas typiques | Description |
| --- | --- | --- | --- | --- |
| Type de serveur | - | archétype générique | rack, lame, serveur GPU, serveur de stockage | Détermine la famille d'équipement |
| Nombre de `CPU` | - | selon archétype | 1 à plusieurs sockets | Sert à la composition du serveur |
| Nombre de `GPU` ou accélérateurs | - | `0` | 0 à plusieurs unités | Important pour les usages intensifs |
| Capacité mémoire | Go | selon archétype | dizaines de Go à plusieurs To | Variable structurante de composition |
| Capacité de stockage | Go ou To | selon archétype | faible à très élevée | Dépend du rôle du serveur |
| Puissance ou consommation de référence | W ou kWh/an | archétype documenté | dépend de la gamme | Sert à l'impact opérationnel |
| Durée de vie de référence | années | valeur documentée | souvent 5 à 6 ans | Sert à l'annualisation |
| Nombre d'unités supportées | - | `1` | selon le contexte | Permet la consolidation d'un parc ou d'un site |

## Principe de modélisation

La méthode privilégie une approche `bottom-up` quand la composition du serveur est connue : `CPU`, mémoire, stockage, accélérateurs et éléments structurels sont assemblés pour produire l'impact de l'équipement.[^donnees-modele]

Un archétype documenté remplace une reconstruction trop spéculative lorsque le détail manque. Cette logique suit [Modélisation d’un équipement](../../modelisation/modelisation-d-un-equipement) et les chapitres composants associés.

## Impact intrinsèque (fabrication)

### Méthode de calcul

| Données disponibles | Représentation retenue |
| --- | --- |
| Composition détaillée connue | Somme des composants principaux, avec couverture explicite des éléments structurels. |
| Composition partiellement connue | Modèle hybride : composants identifiés et complément structurel sans recouvrement. |
| Catégorie de serveur seule connue | Configuration type par composants, documentée comme hypothèse. |

Les configurations généralistes, orientées calcul, fortement accélérées ou dédiées au stockage ont des compositions distinctes.

### Quand une donnée manque {#complétion-automatique}

Quand le stockage d’un serveur n’est pas renseigné, une configuration type documentée peut fournir une hypothèse. Elle doit correspondre au rôle du serveur : calcul, stockage ou autre usage. Le nombre de CPU et la RAM ne suffisent pas, à eux seuls, à déduire ses disques.

| Situation | Exemple fictif |
| --- | --- |
| **Au départ** | L’inventaire indique **2 CPU et 64 Go de RAM**. Le stockage est inconnu. |
| **Référence choisie** | Une configuration de serveur comparable comporte **un SSD de 1 To**. Cette valeur est supposée pour l’exemple. |
| **Dans le calcul** | Les **2 CPU et 64 Go de RAM connus** sont conservés. Le **SSD de 1 To est marqué « estimé »**, avec la référence utilisée. |

Si trop de composants manquent, une configuration type complète peut remplacer la reconstruction détaillée. Sans référence adaptée, le stockage reste non évalué ; il ne devient pas nul.

### Fin de vie

La fin de vie est généralement intégrée dans les facteurs intrinsèques ou archétypes serveur. Quand le modèle repose sur une décomposition composant par composant, il faut vérifier si cette phase est déjà comprise dans les facteurs mobilisés pour éviter les doublons ou omissions.

## Impact opérationnel (usage)

### Profil de consommation

<dl className="model-profiles">
  <div><dt>Au repos (idle)</dt><dd>Le serveur reste alimenté ; sa consommation est rarement nulle.</dd></div>
  <div><dt>Charge moyenne</dt><dd>Un profil intermédiaire représente le fonctionnement courant du scénario.</dd></div>
  <div><dt>Charge élevée</dt><dd>Un profil de pointe représente les périodes de forte sollicitation.</dd></div>
</dl>

La consommation dépend de la charge de calcul, des accélérateurs activés, de la mémoire, du stockage et de la mutualisation ou virtualisation. En l'absence de mesures détaillées, une consommation annuelle ou une puissance de référence par archétype peut être utilisée.

### Facteurs d'ajustement

La charge réelle et la durée de fonctionnement déterminent la consommation. La part du service, la virtualisation et la mutualisation déterminent ensuite son allocation.

Le `PUE` couvre les auxiliaires électriques au niveau du site ; le `WUE` décrit séparément l'eau directe. Le `REF` reste une métadonnée, sans réduction automatique du mix électrique physique.

## Allocation et annualisation

L'impact intrinsèque est annualisé sur la durée de vie de référence, puis réparti entre usages. La clé peut reposer sur le temps, les ressources mobilisées (`CPU`, mémoire, `GPU`), la charge ou la capacité réservée. Ces conventions doivent rester cohérentes entre le serveur et les services pour éviter les doubles comptes.

## Hypothèses & limites

### Hypothèses retenues

Un archétype documenté est préférable à une décomposition fictive. Une charge moyenne ou une consommation annuelle de référence peut remplacer une mesure absente, avec un statut d'estimation explicite.

Les éléments structurels ou un facteur système couvrent les composants non détaillés. Le contexte datacenter reste traité séparément pour appliquer correctement `PUE`, `WUE` et `REF`.

### Limitations connues

Les charges varient dans le temps et les inventaires sont souvent incomplets sur les composants internes.[^source-1] La virtualisation et la mutualisation compliquent l'allocation. Le résultat dépend aussi des frontières retenues pour le site et le réseau.

### Perspectives

Les améliorations portent sur des archétypes par usage, des profils de charge mesurés en contexte réel et des inventaires plus complets de serveurs accélérés.

## Configurations de VM {#ordres-de-grandeur-machines-virtuelles}

Les anciens forfaits « petite, moyenne, grande VM » du référentiel Open Data sont obsolètes pour la méthode cible. Une VM représente une part des ressources d’un serveur physique ; elle n’a pas de fabrication indépendante.

| Information disponible | Représentation |
|---|---|
| Hôte et configuration connus | Inventaire des composants de l’hôte, puis allocation aux ressources mobilisées |
| Offre fournisseur documentée | Correspondance CPU, accélérateurs, mémoire et stockage avec l’hôte ou une configuration explicite |
| Configuration physique inconnue | Configuration type déclarée comme hypothèse ; les postes non documentés restent visibles |

Un profil « petit » ou « grand » peut faciliter l’illustration, mais son impact est recalculé avec les mêmes modèles de composants. Les ressources communes et la capacité inactive sont allouées une seule fois. La réservation et l’usage effectif ne sont pas des clés interchangeables.[^vm-allocation]

[^vm-allocation]: ADEME, [RCP services cloud et centre de données](https://librairie.ademe.fr/economie-circulaire-et-dechets/6031-referentiel-par-categorie-de-produit-rcp-de-services-cloud-et-de-centre-de-donnees.html), juin 2026, p. 26–64, sections relatives aux unités fonctionnelles et à l’allocation des services cloud. Les accélérateurs nécessitent une modélisation complémentaire.

:::note[PUE]
Appliquer le PUE uniquement à une consommation IT qui n'inclut pas déjà les auxiliaires. La valeur 1,58 est une hypothèse historique, pas une moyenne actuelle vérifiée. Le simulateur ci-dessous permet de faire varier ce paramètre.
:::

## Exemple interactif {#simulateur}

Le simulateur ci-dessous assemble les modèles paramétriques de chaque composant pour calculer l'impact total d'un serveur. Les prédéfinis incluent des serveurs standards et des scénarios de serveurs à 4 ou 8 GPU H100, sans prétendre reproduire une ACV DGX complète.

import { ServerPlayGround } from '@site/src/components/server-playground';

<div className="inline-example">

<ServerPlayGround lang="fr" />

</div>

## Application

[IA générative](../../cas-d-usage/services/ia-generative) mobilise les ressources serveur support des `GPU`. [Infrastructure d’hébergement](../../cas-d-usage/environnements/infrastructure-d-hebergement) traite les environnements maîtrisés, et [Cloud](../../cas-d-usage/environnements/cloud) rapproche les ressources facturées d'archétypes serveur.

[^source-1]: UBA, [Green Cloud Computing](https://www.umweltbundesamt.de/publikationen/green-cloud-computing), 2021. Voir le [corpus documentaire](../../references/sources-et-corpus).


[^donnees-modele]: `data/cloud/cpus.*`. [Digital4Better, catalogue de données, instantané 77cae4a](https://github.com/digital4better/data/tree/77cae4a58fadd5deb3b8d4e5577020da08f780d8).
