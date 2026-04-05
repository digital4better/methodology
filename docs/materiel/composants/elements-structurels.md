# Éléments structurels

## Résumé

Cette section couvre les sous-ensembles d'un équipement qui sont rarement décrits en détail mais dont les impacts ne peuvent pas être ignorés. Elle concerne notamment :

- la carte mère ;
- le boîtier ;
- l'assemblage ;
- les cartes auxiliaires ;
- les résiduels non explicitement modélisés autrement.

Cette section joue un rôle de complétion méthodologique : elle évite de sous-estimer les équipements quand seuls les composants majeurs sont connus.

## Caractéristiques

| Caractéristique | Unité | Valeur par défaut | Plage ou cas typiques | Description |
| --- | --- | --- | --- | --- |
| Type d'équipement support | - | archétype générique | smartphone, laptop, desktop, serveur, switch | Détermine le contexte de rattachement |
| Niveau de détail de la composition | - | partiel | détaillé à très incomplet | Sert à choisir le niveau de complétion |
| Masse ou catégorie d'enveloppe | g ou kg | non renseignée si absente | variable selon l'équipement | Peut aider à approximer les résiduels |
| Nombre de cartes ou sous-ensembles auxiliaires | - | valeur d'archétype | dépend du type d'équipement | Utile pour certains équipements complexes |
| Part résiduelle non couverte | % | valeur de référence | faible à significative | Représente ce qui reste hors décomposition explicite |

## Principe de modélisation

La méthode accepte ici une modélisation plus forfaitaire que pour les composants majeurs, parce que les données détaillées sont souvent absentes. L'objectif n'est pas de créer une précision artificielle, mais de couvrir proprement ce qui manquerait autrement dans l'équipement.

Deux logiques sont privilégiées :

- un facteur résiduel quand une composition détaillée existe déjà en grande partie ;
- un archétype structurel par famille d'équipement quand la composition est plus incomplète.

## Impact intrinsèque (fabrication)

### Méthode de calcul

L'impact intrinsèque des éléments structurels est généralement estimé :

- par un facteur forfaitaire par équipement ou par catégorie ;
- ou par différence entre un archétype complet d'équipement et la somme des composants explicitement connus.

Cette section est donc avant tout une logique de complétion pour éviter les oublis dans une modélisation partielle.

### Complétion automatique

Quand les données manquent, la méthode recommande :

1. de conserver la composition explicite disponible ;
2. d'évaluer la part résiduelle manquante ;
3. d'utiliser un forfait structurel par type d'équipement ;
4. de tracer clairement l'hypothèse retenue dans le registre des hypothèses.

Le recours au forfait ne doit jamais masquer une donnée réellement disponible.

### Fin de vie

La fin de vie n'est généralement pas isolée au niveau des seuls éléments structurels. Elle est portée par les facteurs d'équipement ou par les hypothèses de fabrication agrégées déjà utilisées.

## Impact opérationnel (usage)

### Profil de consommation

Les éléments structurels ont peu d'impact opérationnel autonome, mais ils conditionnent certains profils de consommation via :

- la carte mère et ses pertes ;
- les cartes auxiliaires actives ;
- l'architecture générale de l'équipement.

Dans la plupart des cas, cet impact est absorbé au niveau de l'équipement complet plutôt que modélisé séparément.

### Facteurs d'ajustement

Les principaux facteurs d'ajustement sont :

- le type d'équipement ;
- la part effectivement couverte par d'autres composants déjà modélisés ;
- le niveau de détail disponible sur la composition réelle.

## Allocation et annualisation

Les éléments structurels sont annualisés avec l'équipement auquel ils appartiennent. Leur allocation suit donc :

- la durée de vie du terminal, du serveur ou de l'équipement réseau ;
- les règles de partage d'usage applicables à cet équipement ;
- les conventions définies dans [Allocation et partage des impacts](../../regles/allocation-et-partage-des-impacts).

## Simulateur

L'impact des elements structurels se lit au niveau de l'equipement complet. Le simulateur ci-dessous montre la part de chaque composant, y compris la structure :

import { TerminalPlayGround } from '@site/src/components/terminal-playground';

<TerminalPlayGround lang="fr" />

## Hypothèses & limites

### Hypothèses retenues

- une complétion forfaitaire explicite vaut mieux qu'une omission silencieuse ;
- les éléments structurels sont portés par l'équipement complet, pas par un cas d'usage isolé ;
- la précision de cette section dépend du niveau de détail réellement disponible sur la composition.

### Limitations connues

- cette partie est, par nature, plus approximative que les composants majeurs ;
- les cartes mères et sous-ensembles auxiliaires sont rarement documentés de manière uniforme ;
- le risque principal est la double prise en compte si un archétype complet et une somme partielle sont utilisés ensemble.

### Perspectives

- mieux documenter les forfaits structurels par type d'équipement ;
- améliorer la traçabilité entre archétypes complets et résiduels structurels ;
- proposer un simulateur uniquement si les règles de complétion deviennent suffisamment stabilisées, ce qui n'est pas encore le cas.

## Application

Cette section est surtout mobilisée dans :

- [Modélisation d’un équipement](../../modelisation/modelisation-d-un-equipement), quand la composition est partielle ;
- [Terminaux](../equipements/terminaux), pour couvrir les sous-ensembles non détaillés ;
- [Serveurs](../equipements/serveurs), quand seuls les composants majeurs sont explicitement inventoriés.

## Références

### Données mobilisées

- `digital4better/data/data/equipment/*`
- `digital4better/data/data/hardware/*`
- forfaits du [Registre des hypothèses et valeurs par défaut](../../references/registre-des-hypotheses-et-valeurs-par-defaut) lorsque nécessaire

### Sources

- corpus `inputs/md`
