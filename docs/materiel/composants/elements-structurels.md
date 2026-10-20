# Éléments structurels

La carte mère, le boîtier, l'assemblage, les cartes auxiliaires et les autres éléments résiduels sont souvent peu décrits. Leur omission sous-estimerait l'équipement. Cette section complète les inventaires limités aux composants majeurs, sans compter deux fois les éléments connus.

## Caractéristiques

| Caractéristique | Unité | Valeur par défaut | Plage ou cas typiques | Description |
| --- | --- | --- | --- | --- |
| Type d'équipement support | - | archétype générique | smartphone, laptop, desktop, serveur, switch | Détermine le contexte de rattachement |
| Niveau de détail de la composition | - | partiel | détaillé à très incomplet | Sert à choisir le niveau de complétion |
| Masse ou catégorie d'enveloppe | g ou kg | non renseignée si absente | variable selon l'équipement | Peut aider à approximer les résiduels |
| Nombre de cartes ou sous-ensembles auxiliaires | - | valeur d'archétype | dépend du type d'équipement | Utile pour certains équipements complexes |
| Part résiduelle non couverte | % | valeur de référence | faible à significative | Représente ce qui reste hors décomposition explicite |

## Principe de modélisation

Une représentation forfaitaire couvre les sous-ensembles peu documentés, sans donner une précision artificielle au modèle.[^donnees-modele]

| Données disponibles | Représentation retenue |
| --- | --- |
| Composition largement connue | Facteur résiduel limité aux éléments manquants. |
| Composition plus incomplète | Archétype structurel de la famille d’équipement. |

## Impact intrinsèque (fabrication)

### Méthode de calcul

L'estimation repose sur un forfait documenté par catégorie, ou sur la différence entre un archétype complet et la somme des composants connus.

Cette différence exige des configurations, phases, unités et méthodes de caractérisation compatibles. Un résiduel négatif signale une incohérence à examiner ; il ne justifie ni une remise arbitraire à zéro ni un crédit environnemental.

### Quand une donnée manque {#complétion-automatique}

Un inventaire limité aux composants principaux peut oublier le boîtier, la carte mère ou l’assemblage. Une estimation groupée de ces éléments manquants peut compléter le calcul, à condition de connaître précisément ce qu’elle couvre.

| Situation | Exemple fictif |
| --- | --- |
| **Au départ** | Le **CPU, la RAM et le SSD** d’un portable sont déjà comptés. Le boîtier et la carte mère ne le sont pas. |
| **Référence choisie** | Une estimation documentée couvre **le boîtier et la carte mère, sans CPU, RAM ni SSD**. |
| **Dans le calcul** | Cette estimation est ajoutée aux composants connus. Un facteur portant sur **un portable complet** ne conviendrait pas : il compterait aussi le CPU, la RAM et le SSD une seconde fois. |

Si le contenu du complément n’est pas identifiable, son addition n’est pas justifiée. Les éléments encore manquants et la référence retenue figurent dans le [registre des hypothèses](../../references/registre-des-hypotheses-et-valeurs-par-defaut).

### Fin de vie

La fin de vie n'est généralement pas isolée au niveau des seuls éléments structurels. Elle est portée par les facteurs d'équipement ou par les hypothèses de fabrication agrégées déjà utilisées.

## Impact opérationnel (usage)

### Profil de consommation

<dl className="model-profiles">
  <div><dt>Éléments passifs</dt><dd>Le boîtier et les autres pièces passives n’ont pas de consommation autonome.</dd></div>
  <div><dt>Sous-ensembles actifs</dt><dd>La carte mère, ses pertes et les cartes auxiliaires contribuent à la consommation de l’équipement.</dd></div>
</dl>

L'architecture de l'équipement influe sur ces contributions. Elles sont généralement incluses dans la consommation de l'équipement complet plutôt que modélisées séparément.

### Facteurs d'ajustement

Le type d'équipement, les composants déjà couverts et le détail disponible sur la composition déterminent le complément nécessaire.

## Allocation et annualisation

Les éléments structurels suivent la durée de vie et les règles de partage du terminal, du serveur ou de l'équipement réseau auquel ils appartiennent. Les conventions sont décrites dans [Allocation et partage des impacts](../../regles/allocation-et-partage-des-impacts).

## Hypothèses & limites

### Hypothèses retenues

Un complément forfaitaire explicite est préférable à une omission silencieuse. Il appartient à l'inventaire de l'équipement, puis suit son allocation aux usages. Sa précision dépend du détail disponible sur la composition.

### Limitations connues

Cette estimation est plus approximative que celle des composants majeurs. Les cartes mères et sous-ensembles auxiliaires sont peu documentés de façon homogène. Le principal risque est de cumuler un archétype complet et des composants qu'il couvre déjà.

### Perspectives

Les forfaits restent à mieux documenter par type d'équipement et à relier aux inventaires complets dont ils sont issus. L’exemple ci-dessous illustre seulement la sensibilité au résiduel, sans proposer de règle d’estimation automatique.

## Exemple interactif {#simulateur}

Le complément structurel s’ajoute uniquement aux éléments non couverts par les composants déjà comptés. L’exemple fait varier ce complément, puis montre sa part dans l’équipement et son allocation annuelle.

import { InlineStructureExample } from '@site/src/components/inline-structure-example';

<div className="inline-example">

<InlineStructureExample lang="fr" />

</div>

## Application

[Modélisation d’un équipement](../../modelisation/modelisation-d-un-equipement) utilise ce complément lorsque la composition est partielle. Les pages [Terminaux](../equipements/terminaux) et [Serveurs](../equipements/serveurs) l'intègrent pour couvrir les sous-ensembles non détaillés.

[^donnees-modele]: Convention D4B, résiduels exploratoires sans calibration indépendante. Valeurs et statut dans le [registre](../../references/registre-des-hypotheses-et-valeurs-par-defaut#parametres-composants).
