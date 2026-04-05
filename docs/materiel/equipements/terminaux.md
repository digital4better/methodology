# Terminaux

## Résumé

Cette section couvre les terminaux utilisés par les utilisateurs finaux, notamment :

- smartphones ;
- laptops ;
- desktops ;
- tablettes ;
- autres terminaux courants quand ils sont méthodologiquement proches.

Elle modélise à la fois :

- l'impact intrinsèque de l'équipement complet ;
- l'impact opérationnel lié à son usage ;
- la répartition des impacts entre plusieurs services ou usages.

Les terminaux concentrent souvent une part importante des impacts dans les usages grand public et bureautiques, en particulier lorsque leur fabrication domine la phase d'usage.

## Caractéristiques

| Caractéristique | Unité | Valeur par défaut | Plage ou cas typiques | Description |
| --- | --- | --- | --- | --- |
| Type de terminal | - | archétype générique | smartphone, laptop, desktop, tablette | Détermine la famille d'équipement |
| Durée de vie de référence | années | valeur d'archétype | variable selon la catégorie | Sert à l'annualisation |
| Capacité ou composition principale | - | selon l'archétype | CPU, mémoire, stockage, écran, batterie | Sert à détailler ou non l'équipement |
| Nombre d'utilisateurs | - | `1` | individuel à partagé | Utile pour les équipements mutualisés |
| Part d'usage du service étudié | % | valeur documentée ou estimée | faible à dominante | Variable essentielle pour l'allocation |
| Profil d'utilisation | - | usage moyen | faible, moyen, intensif | Sert à l'impact opérationnel |

## Principe de modélisation

La méthode privilégie une approche par archétypes de terminaux quand l'inventaire détaillé n'est pas disponible, car elle correspond à la réalité des données souvent accessibles. Quand la composition est connue, elle peut être raffinée à partir des chapitres composants.

Le calcul repose sur trois idées :

- rattacher l'utilisateur à un type de terminal cohérent ;
- annualiser l'impact intrinsèque sur la durée de vie ;
- allouer seulement la part du terminal effectivement mobilisée par le service étudié.

Cette logique est centrale pour les services web, mobiles ou les usages bureautiques.

## Impact intrinsèque (fabrication)

### Méthode de calcul

L'impact intrinsèque d'un terminal peut être estimé :

- à partir d'un archétype documenté de smartphone, laptop, desktop ou tablette ;
- à partir d'une composition détaillée si les principaux composants sont connus ;
- ou via un modèle hybride mêlant composants identifiés et forfait structurel.

Dans la plupart des usages, la fabrication du terminal représente une part importante, voire dominante, du résultat final.

### Complétion automatique

Quand les données manquent, la méthode recommande :

1. de rattacher le terminal à une catégorie cohérente ;
2. d'utiliser un archétype par gamme ou par profil d'usage ;
3. de compléter les composants manquants par des valeurs d'archétype ;
4. de documenter explicitement le niveau de confiance.

### Fin de vie

La fin de vie est généralement intégrée dans les facteurs intrinsèques des terminaux ou de leurs archétypes. Quand ce n'est pas le cas, cette absence doit être documentée, sans tenter de la recréer artificiellement à partir de données trop fragiles.

## Impact opérationnel (usage)

### Profil de consommation

Le profil de consommation dépend :

- du type de terminal ;
- de l'intensité d'usage ;
- du temps d'activation de l'écran ;
- des composants sollicités, notamment calcul, réseau et batterie.

Quand aucune mesure directe n'existe, un profil simplifié peut distinguer au minimum :

- veille ou faible activité ;
- usage moyen ;
- usage intensif.

### Facteurs d'ajustement

Les principaux facteurs d'ajustement sont :

- la part d'usage du service étudié sur le terminal ;
- le nombre d'heures d'utilisation réelles ;
- le partage entre usages personnels et professionnels ;
- les hypothèses de renouvellement ou de prolongation de durée de vie.

## Allocation et annualisation

Les terminaux sont des équipements fortement mutualisés entre usages. Leur impact doit donc être :

- annualisé sur leur durée de vie ;
- alloué selon la part d'usage réellement attribuable au service étudié ;
- cohérent avec les règles générales décrites dans [Allocation et partage des impacts](../../regles/allocation-et-partage-des-impacts).

Une mauvaise allocation des terminaux peut fausser fortement le résultat d'un cas d'usage.

## Ordres de grandeur

Les tableaux ci-dessous présentent les impacts intrinsèques annualisés et la consommation électrique des principaux types de terminaux, issus du référentiel `digital4better/data`.

### Impact intrinsèque annuel (fabrication, transport, fin de vie)

| Terminal | GWP (kg CO₂ eq./an) | ADPe (mg Sb eq./an) | WU (m³ eq./an) | AP (mol H+ eq./an) | Puissance (W) |
|---|---|---|---|---|---|
| **Smartphone** | 31,9 | 1,13 | 53 | 0,15 | 1 |
| **Tablette** | 28,1 | 1,49 | 57 | 0,18 | 7,5 |
| **Laptop** | 37,2 | 1,90 | 167 | 0,23 | 75 |
| **Desktop (personnel)** | 44,8 | 3,66 | 360 | 0,30 | 175 |
| **Desktop (professionnel)** | 35,3 | 3,28 | 357 | 0,24 | 175 |
| **Écran** | 11,6 | 1,95 | 123 | 0,08 | 55 |

Source : `digital4better/data/equipment/embodied.csv`, facteurs par seconde annualisés (×365,25×86 400).

:::note[Lecture]
Ces valeurs correspondent à l'impact intrinsèque annualisé sur la durée de vie de référence du référentiel. Si la durée de vie réelle diffère, une correction proportionnelle $TL/RL$ doit être appliquée (voir [Temporalité et vieillissement](../../regles/temporalite-vieillissement-et-versionnement-des-donnees)).
:::

### Impact opérationnel annuel (usage 8h/jour, France)

| Terminal | Énergie (kWh/an) | GWP opérationnel (kg CO₂ eq./an) | Part intrinsèque dans le total |
|---|---|---|---|
| **Smartphone** | 2,9 | 0,1 | ~99 % |
| **Tablette** | 21,9 | 0,8 | ~97 % |
| **Laptop** | 219 | 7,8 | ~83 % |
| **Desktop + écran** | 672 | 23,8 | ~60 % |

:::note[Dominance de l'intrinsèque]
Pour les terminaux mobiles (smartphone, tablette), l'impact intrinsèque domine très largement (&gt;95 %). Pour les desktops, l'impact opérationnel devient significatif, surtout dans les pays à mix carboné élevé.
:::

## Simulateur

Le simulateur ci-dessous assemble les modeles parametriques de chaque composant (CPU, RAM, stockage, ecran, batterie, structure) pour calculer l'impact total d'un terminal. Les predefinis (smartphone, laptop, desktop...) chargent des configurations types modifiables.

import { TerminalPlayGround } from '@site/src/components/terminal-playground';

<TerminalPlayGround lang="fr" />

## Hypothèses & limites

### Hypothèses retenues

- un archétype de terminal bien choisi est préférable à une précision fictive ;
- la durée de vie et la part d'usage sont souvent les variables les plus structurantes ;
- la fabrication du terminal pèse fréquemment davantage que l'usage énergétique direct.

### Limitations connues

- les usages sont difficiles à attribuer précisément quand un même terminal sert à plusieurs activités ;
- les inventaires détaillés sont rares en pratique ;
- les données de consommation réelle varient fortement selon les comportements et les réglages.

### Perspectives

- affiner les archétypes terminaux par profil d'usage ;
- mieux lier les facteurs terminal aux composants détaillés ;
- proposer un simulateur pour certains terminaux ou profils d'usage quand les paramètres d'entrée seront suffisamment stabilisés.

## Application

Cette section est mobilisée directement dans :

- [Service web](../../cas-d-usage/services/service-web), pour la part terminal des usages web ;
- [Mobile](../../cas-d-usage/services/mobile), pour les applications natives ;
- [Parc informatique](../../cas-d-usage/environnements/parc-informatique), pour l'évaluation d'un ensemble de terminaux.

## Références

### Données mobilisées

- `digital4better/data/data/hardware/devices.*`
- `digital4better/data/data/hardware/laptops.*`
- `digital4better/data/data/hardware/mobiles.*`
- `digital4better/data/data/equipment/*`

### Sources

- corpus `inputs/md`
- `inputs/md/les-impacts-environnementaux-des-equipements-informatiques.md`
