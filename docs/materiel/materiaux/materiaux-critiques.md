# Matériaux critiques

## Résumé

Cette section couvre les métaux et minéraux critiques qui soutiennent la fabrication des équipements numériques. Elle ne cherche pas encore à modéliser complètement chaque matière, mais à rendre visibles des dépendances souvent invisibles dans une lecture purement carbone ou purement massique.

Elle sert surtout à éclairer :

- les tensions d'approvisionnement ;
- les géographies d'extraction et de raffinage ;
- les impacts amont mal visibles dans les facteurs agrégés de composants et d'équipements ;
- le besoin de conserver une lecture multicritère.

Dans cette itération, `Matériaux critiques` reste une section explicative, pas un modèle de calcul détaillé matière par matière.

## Caractéristiques

| Caractéristique | Unité | Valeur par défaut | Plage ou cas typiques | Description |
| --- | --- | --- | --- | --- |
| Famille de matériau | - | matériau non précisé | terres rares, lithium, cobalt, indium, cuivre, autres métaux critiques | Sert à situer l'enjeu principal |
| Fonction dans le numérique | - | composant amont | batterie, aimant, écran, semi-conducteur, connectique | Relie la matière aux objets techniques |
| Zone d'extraction ou de raffinage | - | non renseignée si absente | pays ou région dominante | Sert à rendre visible la géographie d'approvisionnement |
| Niveau de criticité | - | non normalisé à ce stade | faible à très élevé | Représente surtout un enjeu de dépendance et de tension |
| Sensibilité environnementale dominante | - | non normalisée | eau, toxicité, extraction, énergie, disponibilité | Aide à conserver une lecture multicritère |

## Principe de modélisation

La méthode retient ici un rôle d'explication et de contextualisation. L'objectif n'est pas de recalculer chaque composant à partir de ses masses détaillées de matières, mais de rappeler que :

- certains matériaux ont des impacts environnementaux et géopolitiques qui dépassent largement leur masse apparente ;
- les composants et équipements reposent sur des chaînes d'approvisionnement très différenciées ;
- une lecture uniquement centrée sur le climat ne suffit pas toujours pour interpréter le numérique.

Cette section permet donc de replacer les composants et équipements dans leurs chaînes d'approvisionnement, sans promettre à ce stade une quantification homogène pour chaque matière.

Dans le corpus et dans les sources officielles complémentaires, la criticité ne renvoie pas à une seule idée. Elle combine au moins quatre dimensions :

- l'importance fonctionnelle de la matière dans l'objet technique ;
- la concentration géographique de l'extraction, du raffinage ou de la transformation ;
- la difficulté de substitution ;
- les pressions environnementales et sociales associées à la production.

Autrement dit, une matière peut être “critique” non seulement parce qu'elle a un impact élevé, mais aussi parce qu'elle est difficile à remplacer, concentrée dans peu de zones géographiques ou soumise à de fortes tensions d'approvisionnement.

## Impact intrinsèque (fabrication)

### Méthode de calcul

À ce stade, la méthode ne définit pas encore une formule canonique unique par matériau. Cette section sert plutôt à :

- expliquer pourquoi certains composants concentrent des impacts non proportionnels à leur masse ;
- justifier le maintien d'indicateurs autres que le seul `GWP` ;
- orienter les priorités d'enrichissement des facteurs de composants et d'équipements.

Quand une donnée matière est disponible, elle doit être mobilisée avec prudence et toujours replacée dans un objet technique plus large : batterie, écran, composant électronique, connectique, etc.

Le chapitre `Green Cloud Computing` est particulièrement utile ici, car il montre que les matériaux critiques n'ont pas tous la même pertinence pour le numérique. Dans son annexe sur les matières critiques, il distingue notamment les matériaux liés :

- aux semi-conducteurs et substrats ;
- aux écrans et composants optoélectroniques ;
- aux batteries et systèmes d'alimentation ;
- aux réseaux, aimants, alliages et sous-ensembles électroniques.

Cette logique est plus utile méthodologiquement qu'une simple liste générale de métaux. Elle permet de relier les matières critiques aux chapitres aval où elles pèsent réellement.

Le corpus permet aussi de retenir quelques familles particulièrement structurantes pour le numérique :

- `gallium`, `germanium`, certains gaz et matériaux spécialisés pour la chaîne semi-conducteur et certains composants électroniques ;
- `indium` pour certaines technologies d'affichage ;
- `lithium`, `cobalt`, `nickel`, `graphite` et assimilés pour les batteries ;
- `cuivre`, `or`, `étain`, argent et autres métaux de connectique, cartes électroniques et interconnexions ;
- `terres rares` pour certains aimants permanents, actionneurs et fonctions de conversion ou de motorisation.

Les sources officielles externes confirment ce point de vigilance : la Commission européenne traite la criticité comme une combinaison de valeur économique et de risque d'approvisionnement, tandis que l'IEA insiste sur la concentration géographique de nombreuses chaînes minières et de raffinage, ainsi que sur les tensions environnementales liées à l'eau, aux émissions et à la biodiversité.

### Repères utiles par indicateur

Les tableaux ci-dessous ne sont pas encore des facteurs opérationnels complets pour recalculer chaque composant à partir de ses matières. Ils servent à rendre visibles les indicateurs sur lesquels certaines familles de matériaux pèsent particulièrement.

#### Familles de matières à surveiller par indicateur

| Famille de matière | Objets numériques concernés | Indicateurs de la méthode à regarder en priorité | Pourquoi |
| --- | --- | --- | --- |
| Lithium, cobalt, nickel, graphite | Batteries, alimentation embarquée | `ADPe`, `WU`, `CTUe`, `GWP` | Extraction et raffinage intensifs, fortes tensions d'approvisionnement, impacts eau et toxicité |
| Indium, gallium, germanium | Écrans, optoélectronique, certaines chaînes semi-conducteurs | `ADPe`, `CTUe`, `CTUh-nc`, `GWP` | Masses faibles mais forte sensibilité ressources et procédés |
| Or, argent, cuivre, étain, tantale | Cartes électroniques, interconnexions, connectique | `ADPe`, `CTUe`, `CTUh-c`, `GWP` | Métaux structurants des cartes et sous-ensembles, avec effets ressources et toxicité |
| Terres rares | Aimants, actionneurs, moteurs, certains sous-systèmes électroniques | `ADPe`, `CTUe`, `WU` | Faibles quantités mais dépendances géographiques et impacts amont marqués |

#### Exemples de facteurs de caractérisation `ADPe`

Le corpus `Green Cloud Computing` reprend des facteurs de caractérisation `ADPe` issus de méthodes ILCD/CML. Ce ne sont pas des facteurs d'impact “par équipement”, mais des coefficients utiles pour comprendre pourquoi certaines matières pèsent fortement dans l'indicateur `ADPe`.

| Matière | ADPe ILCD/CML historique | ADPe EF v2.0 | Unité | Lecture prudente |
| --- | --- | --- | --- | --- |
| Indium | 5,55E+02 | 6,89E-03 | kg Sb eq. / kg | Très sensible à la méthode de caractérisation retenue |
| Or | 3,60E+01 | 5,20E+01 | kg Sb eq. / kg | Métal à fort poids ressources malgré des masses faibles |
| Argent | 8,42E+00 | 1,18E+00 | kg Sb eq. / kg | Important dans certaines cartes et interconnexions |
| Tantale | 1,15E+01 | 4,06E-05 | kg Sb eq. / kg | L'écart entre méthodes rappelle qu'il faut documenter la méthode utilisée |
| Cobalt | 2,56E-02 | 1,57E-05 | kg Sb eq. / kg | Pertinent pour batteries, mais la lecture dépend fortement du référentiel LCIA |
| Lithium | 1,33E-02 | 1,15E-05 | kg Sb eq. / kg | À lire surtout en combinaison avec la chaîne batterie et les autres indicateurs |
| Cuivre | 2,50E-03 | 1,37E-03 | kg Sb eq. / kg | Structurant par les volumes mobilisés |
| Terres rares (agrégées) | 5,69E-04 | non disponible | kg Sb eq. / kg | Groupe très hétérogène à lire avec prudence |

#### Ce que cette couche aide à interpréter

| Indicateur | Apport de la section `Matériaux critiques` |
| --- | --- |
| `ADPe` | Explique pourquoi de très faibles masses peuvent peser fortement dans l'épuisement des ressources |
| `WU` | Rend visibles des tensions eau souvent absentes d'une lecture purement carbone |
| `CTUe`, `CTUh-nc`, `CTUh-c` | Aide à garder visibles les impacts liés à l'extraction, au raffinage et à la chimie des matériaux |
| `GWP` | Rappelle que le climat ne résume pas à lui seul les enjeux matière du numérique |

### Complétion automatique

Quand les données détaillées sur les matériaux critiques manquent, la méthode recommande :

1. d'utiliser en priorité les facteurs documentés au niveau composant ou équipement ;
2. de signaler explicitement que la couche matière est couverte indirectement ;
3. de documenter les enjeux matière comme éléments d'interprétation, pas comme pseudo-précision de calcul ;
4. d'identifier les gaps du référentiel D4B pour les enrichissements futurs.

Quand on souhaite enrichir l'interprétation sans entrer dans une modélisation matière complète, les variables les plus utiles à documenter sont :

- la famille de composant concernée ;
- la fonction de la matière dans ce composant ;
- la présence ou non d'un enjeu de substitution ;
- la zone dominante d'extraction ou de raffinage quand elle est connue ;
- le niveau de confiance sur cette information.

### Fin de vie

La fin de vie n'est pas encore modélisée séparément par matériau dans cette section. Les enjeux de recyclage, de récupération et de criticité doivent toutefois être mentionnés quand ils influencent fortement l'interprétation du résultat.

Pour certaines matières, la question clé n'est pas seulement “est-ce recyclé ?”, mais aussi :

- avec quel rendement réel ;
- dans quelle qualité de matière récupérée ;
- et avec quelle dépendance persistante à des approvisionnements primaires.

## Rôle dans les impacts aval

Les matériaux critiques n'ont pas d'impact opérationnel autonome, mais ils jouent un rôle important dans les impacts aval :

- ils éclairent la fabrication des batteries, écrans, cartes électroniques et composants de calcul ;
- ils justifient l'usage d'une lecture multicritère au-delà du seul carbone ;
- ils permettent de qualifier certaines vulnérabilités d'approvisionnement ou de dépendance géographique.

Cette section doit donc être lue comme une couche d'interprétation des chapitres composants et équipements.

Cette couche est particulièrement utile pour comprendre :

- pourquoi certains écrans ou composants électroniques ont des impacts non intuitifs au regard de leur masse ;
- pourquoi les batteries concentrent à la fois des enjeux de climat, de ressources, d'eau et de chaîne d'approvisionnement ;
- pourquoi les équipements numériques ne doivent pas être lus uniquement à travers leur consommation électrique ;
- pourquoi certains résultats multicritères peuvent diverger fortement d'une lecture purement carbone.

Les travaux récents sur le matériel IA vont dans le même sens : lorsque l'on passe de données secondaires à des données primaires de composition, les résultats carbone bougent parfois peu, alors que les catégories liées aux ressources minérales et métalliques évoluent beaucoup plus fortement. Cela renforce l'intérêt de garder cette couche matière visible dans la méthode.

## Hypothèses & limites

### Hypothèses retenues

- certains métaux et minéraux critiques ont des effets environnementaux et géopolitiques très supérieurs à ce que suggère leur masse apparente ;
- les chaînes d'approvisionnement sont une dimension méthodologique utile, même quand elles ne sont pas encore pleinement quantifiées ;
- les données matière doivent être lues avec prudence et replacées dans des objets techniques cohérents.
- la criticité ne se réduit ni au carbone ni à la seule rareté géologique ; elle dépend aussi de la concentration industrielle, de la substituabilité et des tensions d'accès.

### Limitations connues

- `Matériaux critiques` est ici une section explicative, pas un modèle de calcul détaillé ;
- les appellations de type “terres rares” ou “métaux critiques” recouvrent des situations très diverses ;
- le référentiel D4B documente déjà utilement composants, équipements, facteurs électriques et données cloud, mais reste encore partiel sur les données structurées à l'échelle de certaines matières.
- les listes officielles de matières critiques évoluent dans le temps et selon les cadres institutionnels ; elles doivent donc être lues comme des repères, pas comme des vérités universelles et figées.

### Perspectives

- enrichir le référentiel D4B sur certains matériaux critiques particulièrement structurants ;
- mieux relier les chapitres `Batterie`, `Affichage`, `Semi-conducteurs` et `Éléments structurels` à cette couche amont ;
- documenter progressivement des conventions plus robustes d'interprétation ou de quantification quand les données le permettront.
- distinguer à terme les enjeux de criticité d'approvisionnement, de criticité environnementale et de criticité sociale si le référentiel devient assez riche.

## Application

Cette section sert principalement à éclairer :

- [Alimentation et batterie](../composants/alimentation-et-batterie), pour les matériaux de batteries ;
- [Affichage](../composants/affichage), pour certaines matières critiques des dalles ;
- [Éléments structurels](../composants/elements-structurels), pour les cartes électroniques et sous-ensembles support.

## Références

### Données mobilisées

- gap explicite sur des jeux de données amont structurées à l'échelle matière
- données indirectes via `digital4better/data/data/hardware/*`
- données indirectes via `digital4better/data/data/equipment/*`

### Repères chiffrés utiles

| Type de donnée | Indicateurs couverts | Niveau de maturité méthodologique |
| --- | --- | --- |
| Facteurs de caractérisation matière repris par `Green Cloud Computing` | principalement `ADPe` | Repère de littérature, utile pour interpréter l'indicateur ressources |
| Listes de matières critiques et familles d'usage numérique | surtout `ADPe`, `WU`, `CTUe`, `CTUh`, `GWP` par interprétation | Repère qualitatif fort, pas facteur de calcul direct |
| Données matière détaillées composant par composant | variable | Encore très partielles dans le référentiel D4B actuel |

### Sources

- `inputs/md/green-cloud-computing-uba-2021.md`
- `inputs/md/les-impacts-environnementaux-des-equipements-informatiques.md`
- `inputs/md/more-than-carbon-cradle-to-grave-environmental-impacts-of-genai-training-on-the-nvidia-a100-gpu.md`
- corpus `inputs/md`
- [Study on the Critical Raw Materials for the EU 2023 - Final Report](https://single-market-economy.ec.europa.eu/publications/study-critical-raw-materials-eu-2023-final-report_en)
- [Sustainable and Responsible Critical Mineral Supply Chains](https://www.iea.org/reports/sustainable-and-responsible-critical-mineral-supply-chains)
- [Broader view on energy-related strategic minerals: What risks to anticipate?](https://www.iea.org/reports/global-critical-minerals-outlook-2025/broader-view-on-energy-related-strategic-minerals-what-risks-to-anticipate)
