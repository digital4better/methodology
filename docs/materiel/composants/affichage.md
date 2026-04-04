# Affichage

## Résumé

Cette section couvre les écrans et sous-ensembles d'affichage utilisés dans les terminaux numériques, qu'ils soient intégrés ou externes. Elle modélise principalement :

- l'impact intrinsèque lié à la fabrication des dalles et de leurs sous-ensembles ;
- l'impact opérationnel lié à la consommation électrique en usage ;
- le niveau de granularité réellement atteignable selon la technologie connue.

L'affichage est un composant souvent sous-estimé alors qu'il combine des effets matériaux importants et des consommations qui varient fortement avec la taille, la technologie et les conditions d'usage.

## Caractéristiques

| Caractéristique | Unité | Valeur par défaut | Plage ou cas typiques | Description |
| --- | --- | --- | --- | --- |
| Technologie d'affichage | - | archétype générique | `LCD`, `LED`, `OLED`, variantes proches | Détermine les matériaux dominants et le profil de consommation |
| Taille d'écran | pouces ou cm | valeur d'archétype | smartphone à grand moniteur | Variable structurante pour la fabrication et l'usage |
| Résolution | pixels | résolution standard de gamme | HD à très haute résolution | Sert à qualifier la densité et le niveau de performance |
| Luminosité d'usage | % ou nits | usage moyen | faible à très élevé | Influence directement la consommation réelle |
| Taux de rafraîchissement | Hz | valeur standard | 60 Hz à plus de 120 Hz | Peut influencer la consommation en usage |
| Nombre d'écrans par équipement | - | `1` | 1 à plusieurs | Utile pour les postes multi-écrans ou les écrans externes |

## Principe de modélisation

La méthode retient une approche mixte :

- `bottom-up` quand la technologie, la taille ou la référence d'écran sont connues ;
- plus forfaitaire quand seul un type de terminal ou une gamme d'équipement est connue.

Dans la pratique, l'impact intrinsèque est souvent corrélé à la surface, à la technologie de dalle et au niveau de performance visuelle. L'impact opérationnel dépend ensuite fortement des conditions d'usage : luminosité, durée d'allumage, fréquence de rafraîchissement et type d'équipement hôte.

Quand l'écran n'est pas documenté séparément, il est rattaché à l'archétype du terminal ou du poste de travail.

## Impact intrinsèque (fabrication)

### Méthode de calcul

L'impact intrinsèque de l'affichage peut être estimé :

- à partir d'un facteur constructeur ou d'un facteur de référence par type de dalle ;
- à partir d'un archétype combinant taille, technologie et catégorie d'équipement ;
- ou comme sous-partie de l'impact intrinsèque global du terminal quand la décomposition détaillée n'est pas disponible.

Le modèle peut donc être :

- `variable`, quand la taille, la technologie et éventuellement la résolution sont connues ;
- `forfaitaire`, quand seul un type de terminal ou d'écran est disponible.

### Complétion automatique

Quand certaines caractéristiques manquent, la méthode recommande de compléter dans cet ordre :

1. référence d'écran ou caractéristiques observées ;
2. écran voisin de même technologie et même taille ;
3. archétype de dalle cohérent avec le type d'équipement ;
4. valeur médiane documentée dans le registre d'hypothèses.

La complétion doit rester prudente, notamment quand la technologie exacte de dalle n'est pas connue.

### Fin de vie

La fin de vie est rarement modélisée isolément au niveau du seul écran. Elle est le plus souvent intégrée dans les facteurs de fabrication agrégés. Quand ce n'est pas le cas, l'absence de modélisation spécifique doit être signalée.

## Impact opérationnel (usage)

### Profil de consommation

La consommation d'usage dépend surtout :

- de la taille d'écran ;
- de la technologie de dalle ;
- de la luminosité réelle ;
- de la durée d'activation ;
- du taux de rafraîchissement quand il est élevé.

Pour un usage courant, la méthode recommande au minimum de distinguer :

- un profil sobre ou faible luminosité ;
- un profil moyen ;
- un profil soutenu, par exemple pleine luminosité ou usage vidéo prolongé.

### Facteurs d'ajustement

Les principaux facteurs d'ajustement sont :

- le temps réel d'allumage ;
- la luminosité moyenne observée ou supposée ;
- le partage entre usages quand le terminal sert à plusieurs services ;
- l'environnement d'usage, par exemple bureau fixe, mobilité ou affichage prolongé.

## Allocation et annualisation

L'affichage est en général alloué via l'équipement qui le porte, sauf dans les cas d'écran externe distinctement inventorié. Son impact est :

- annualisé sur la durée de vie de l'équipement ou de l'écran ;
- réparti entre usages selon le temps d'utilisation ou la part d'usage du terminal ;
- cohérent avec les règles d'allocation définies dans [Allocation et partage des impacts](../../regles/allocation-et-partage-des-impacts).

## Simulateur

L'impact de l'affichage se lit au niveau du terminal ou de l'écran qui l'embarque :

import { EquipmentPlayGround } from '@site/src/components/equipment-playground';

<EquipmentPlayGround lang="fr" filter={["smartphone", "tablet", "laptop", "screen"]} />

## Hypothèses & limites

### Hypothèses retenues

- la taille et la technologie sont les deux variables les plus structurantes quand la référence exacte n'est pas connue ;
- l'affichage est souvent déjà partiellement embarqué dans les facteurs de certains terminaux ;
- un archétype par gamme d'équipement est préférable à une estimation arbitraire.

### Limitations connues

- les données publiques détaillées restent inégales selon les technologies de dalle ;
- l'impact des réglages dynamiques de luminosité ou de fréquence est rarement observé finement ;
- l'affichage est souvent mal isolé dans les données constructeur des équipements complets.

### Perspectives

- mieux distinguer les technologies de dalle dans le référentiel D4B ;
- affiner les profils d'usage selon les contextes visuels ;
- proposer un simulateur quand les paramètres d'entrée les plus utiles seront stabilisés.

## Application

Les applications les plus naturelles de ce chapitre se trouvent aujourd'hui dans :

- [Terminaux](../equipements/terminaux), quand l'écran fait partie intégrante de l'équipement ;
- [Service web](../../cas-d-usage/services/service-web), quand la part terminal devient significative ;
- [Mobile](../../cas-d-usage/services/mobile), où l'écran pèse à la fois sur l'impact intrinsèque et sur l'usage.

## Références

### Données mobilisées

- `digital4better/data/data/hardware/screens.*`
- `digital4better/data/data/hardware/laptops.*`
- `digital4better/data/data/hardware/mobiles.*`

### Sources

- corpus `inputs/md`
- littérature de référence sur les écrans et displays citée dans le corpus
