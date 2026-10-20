# Terminaux

Cette section couvre les smartphones, ordinateurs portables et de bureau, tablettes et terminaux comparables. Elle relie l'impact intrinsèque de l'équipement, sa consommation en usage et leur répartition entre services.

Les terminaux peuvent représenter une part importante des impacts des usages grand public et bureautiques, notamment lorsque la fabrication domine l'usage énergétique. Cette part dépend du scénario étudié.

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

Une configuration type calculée par composants représente le terminal lorsque l’inventaire détaillé manque. Une composition connue permet d'affiner le calcul à partir des chapitres composants.[^source-2][^donnees-modele]

Le calcul rattache l'utilisateur à un type de terminal, annualise son impact intrinsèque sur sa durée de vie, puis attribue la part mobilisée par le service. Cette logique s'applique aux usages web, mobiles et bureautiques.

## Impact intrinsèque (fabrication)

### Méthode de calcul

| Données disponibles | Représentation retenue |
| --- | --- |
| Catégorie ou gamme connue | Archétype documenté de smartphone, ordinateur portable, ordinateur de bureau ou tablette. |
| Principaux composants connus | Inventaire détaillé des composants du terminal. |
| Composition partielle | Modèle hybride : composants identifiés et forfait structurel sans recouvrement. |

La fabrication représente souvent une part importante du résultat. Sa dominance dépend toutefois de l'usage et du mix électrique retenus.

### Quand une donnée manque {#complétion-automatique}

Une caractéristique absente peut être estimée à partir d’un terminal de même catégorie, gamme et format. Seule la donnée manquante est remplacée ; les caractéristiques déjà connues restent prioritaires.

| Situation | Exemple fictif |
| --- | --- |
| **Au départ** | Le portable possède **16 Go de RAM et un SSD de 512 Go**. La capacité de sa batterie est inconnue. |
| **Référence choisie** | Un profil documenté de portable comparable indique **50 Wh de batterie**. Cette valeur est supposée pour l’exemple. |
| **Dans le calcul** | La RAM et le SSD restent inchangés. La batterie est modélisée avec **50 Wh estimés**, sans présenter cette capacité comme une caractéristique mesurée du portable. |

Si seule la catégorie « portable » est connue, le calcul peut reposer sur un profil complet de portable. La source du profil et les valeurs remplacées restent identifiables dans le résultat.

### Fin de vie

La couverture du transport, de l’assemblage et de la fin de vie dépend de chaque inventaire. Le modèle de fabrication ne garantit pas leur inclusion. Sans facteur compatible, ces phases restent explicitement non évaluées.

## Impact opérationnel (usage)

### Profil de consommation

La consommation dépend du terminal, de la charge de travail, du temps d'écran et des composants sollicités, notamment le calcul, le réseau et la batterie. Sans mesure directe, un profil simplifié distingue :

<dl className="model-profiles">
  <div><dt>Veille ou faible activité</dt><dd>Le terminal reste peu sollicité.</dd></div>
  <div><dt>Usage moyen</dt><dd>Le profil représente l’activité courante du scénario.</dd></div>
  <div><dt>Usage intensif</dt><dd>Le profil représente une sollicitation soutenue des composants.</dd></div>
</dl>

### Facteurs d'ajustement

Les heures d'utilisation et la part du service déterminent la consommation attribuée. Le partage entre activités personnelles et professionnelles précise le périmètre. Les hypothèses de renouvellement ou de prolongation de vie influencent l'allocation de l'impact intrinsèque.

## Allocation et annualisation

L'impact intrinsèque du terminal est annualisé sur sa durée de vie, puis alloué à la part d'usage attribuable au service. Cette répartition suit [Allocation et partage des impacts](../../regles/allocation-et-partage-des-impacts). Une mauvaise attribution entre activités peut fortement fausser le résultat.

<span id="impact-intrinsèque-annuel-fabrication-transport-fin-de-vie" />
<span id="impact-opérationnel-annuel-usage-8hjour-france" />

## Exemple de configuration {#ordres-de-grandeur}

Un portable fictif assemble les composants suivants. Le tableau utilise le même calcul que l’illustration, sans reprendre les anciens forfaits d’équipement.

| Composant | Fabrication (kg CO₂e) |
|---|---:|
| CPU | 21,77 |
| Mémoire | 44,46 |
| Stockage | 29,56 |
| Écran | 40,82 |
| Batterie | 3,64 |
| Structure | 8,00 |
| **Total** | **148,26** |

La configuration, les hypothèses et l’annualisation sont détaillées dans [Modélisation d’un équipement](../../modelisation/modelisation-d-un-equipement). Ce résultat partiel GWP n’est pas une ACV produit validée. Les autres indicateurs restent non évalués pour cet assemblage.

## Hypothèses & limites

### Hypothèses retenues

Un archétype représentatif est préférable à une précision fictive. La durée de vie et la part d'usage sont souvent déterminantes. La fabrication pèse fréquemment davantage que l'énergie d'usage directe, mais cette part reste à évaluer dans le scénario étudié.

### Limitations connues

Les activités simultanées compliquent l'attribution des impacts. Les inventaires détaillés sont rares et les consommations varient selon les comportements et les réglages.

### Perspectives

Les améliorations portent sur des archétypes adaptés aux profils d'usage, leur lien avec les composants détaillés et la calibration du simulateur sur des inventaires et mesures identifiés.

## Exemple interactif {#simulateur}

Le simulateur ci-dessous assemble les modèles paramétriques de chaque composant (CPU, RAM, stockage, écran, batterie, structure) pour calculer l'impact total d'un terminal. Les prédéfinis (smartphone, laptop, desktop...) chargent des configurations types modifiables.

import { TerminalPlayGround } from '@site/src/components/terminal-playground';

<div className="inline-example">

<TerminalPlayGround lang="fr" />

</div>

## Application

[Service web](../../cas-d-usage/services/service-web) utilise la part terminal des usages web ; [Applications natives](../../cas-d-usage/services/mobile), celle des applications natives. [Parc informatique](../../cas-d-usage/environnements/parc-informatique) consolide les impacts d'un ensemble de terminaux.

[^source-2]: Resilio / Aguaro, [Les impacts environnementaux des équipements informatiques](https://alliancegreenit.org/media/ressource-projet-greenit/resilio-aguaro-whitepaper-rdb-vs-pcf-fr-20241025-web.pdf), octobre 2024. Voir le [corpus documentaire](../../references/sources-et-corpus).


[^donnees-modele]: Convention D4B, configurations illustratives `d4b-components-illustration-2026.10.19`. Paramètres, frontières et sources dans le [registre](../../references/registre-des-hypotheses-et-valeurs-par-defaut#parametres-composants). Les anciens forfaits ne sont pas utilisés pour ce calcul.
