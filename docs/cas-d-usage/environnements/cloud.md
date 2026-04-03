# Cloud

## Résumé

Ce chapitre sert à évaluer un périmètre cloud quand les ressources physiques sous-jacentes ne sont pas directement visibles. Il transforme des usages fournisseur en ressources matérielles ou en unités techniques comparables, puis en impacts environnementaux.

### Périmètre évalué

Le périmètre couvre :

- l'IaaS, comme les machines virtuelles, volumes de stockage et trafic réseau
- le PaaS quand il peut être relié à des unités techniques explicites
- les services managés lorsqu'une règle de correspondance vers des ressources matérielles équivalentes peut être documentée

Ce cas d’usage ne suppose pas un accès au matériel réel, mais il exige de rendre explicites les conventions utilisées pour passer d'un service cloud à un inventaire environnemental.

## Paramètres d'entrée

- Un export d'usage ou de facturation fournisseur
- Le type de service consommé
- Des quantités d'usage exploitables, par exemple vCPU.h, GPU.h, Go.mois, Go transférés, requêtes ou temps d'exécution
- La région ou la zone d'exécution quand elle est connue
- Les règles de correspondance nécessaires pour les services managés

### Dépendances tierces

Ce cas d’usage dépend fortement des fournisseurs cloud, car ils définissent les unités de facturation, la visibilité disponible et une partie des hypothèses régionales. Les services tiers consommés au-dessus du cloud, comme certaines APIs SaaS, doivent être traités séparément dans le périmètre du service évalué.

### Règle d'allocation

L'allocation est généralement implicite dans les unités cloud facturées : temps d'instance, quantité de stockage, volume transféré, nombre de requêtes. Pour les services managés, la difficulté vient du partage interne des ressources entre plusieurs clients et plusieurs usages. La méthode recommande d'utiliser l'unité la plus directement liée à la capacité réellement mobilisée, puis de documenter le niveau d'incertitude.

### Risque de double comptage

Le double comptage apparaît quand une même ressource est comptée à la fois via un service managé et via des ressources d'infrastructure déjà incluses dans la facture. Il faut éviter d'additionner un service logique et son support physique lorsque le premier incorpore déjà le second dans son prix et dans sa description technique.

### Hypothèses temporelles

Les résultats dépendent de la période couverte par les exports cloud, de la région effectivement utilisée et de la date de validité des facteurs régionaux. Les infrastructures cloud évoluent vite ; les correspondances fournisseur doivent donc être versionnées.

## Principe

Ce cas d’usage suit cinq étapes.

1. Classer les services consommés par famille technique.
2. Transformer les unités fournisseur en unités pivot comparables.
3. Associer ces unités pivot à des ressources matérielles ou à des facteurs environnementaux documentés.
4. Calculer les impacts d'usage en tenant compte du contexte énergétique régional et des paramètres de site.
5. Ajouter, quand la méthode le permet, une part d'impact embarqué imputable aux ressources mobilisées.

## Évaluation des impacts

### Typologie des services cloud

Pour rester lisible et comparable d'un fournisseur à l'autre, ce cas d'usage distingue d'abord quelques grandes familles de services :

- les services de calcul, comme les machines virtuelles, conteneurs, fonctions ou traitements batch
- les services de stockage, comme les volumes bloc, le stockage objet, les snapshots ou les sauvegardes
- les services de réseau et de distribution, comme le transit, les load balancers, les adresses IP, les DNS, les passerelles et les CDN
- les services de données, comme les bases de données managées, caches, moteurs de recherche ou files de messages
- les services applicatifs ou spécialisés, par exemple observabilité, IA managée, ou plateformes plus abstraites

Cette typologie ne sert pas à décrire l'offre commerciale des fournisseurs. Elle sert à choisir une règle de modélisation cohérente et à éviter de mélanger des unités qui n'ont pas le même sens physique.

### Unités pivot retenues

Le cloud exprime souvent les usages dans des unités de facturation hétérogènes. La méthode recommande donc de ramener ces usages vers un petit nombre d'unités pivot comparables :

- `vCPU.h` pour la capacité CPU mobilisée
- `GPU.h` pour les accélérateurs
- `Go RAM.h` pour la mémoire vive
- `Go SSD.h` et `Go HDD.h` pour le stockage
- `Go transférés` pour le trafic réseau
- `heures d'exécution` quand seule une durée d'activation est connue

Ces unités pivot jouent le rôle d'interface entre l'usage fournisseur, les données techniques et les facteurs environnementaux. Elles permettent aussi de comparer des services différents qui reposent pourtant sur des ressources matérielles proches.

### Paramètres régionaux et de site

La régionalisation est souvent déterminante dans le cloud. Quand elle est connue, la région d'exécution sert à rattacher l'usage à des paramètres de site et à des facteurs d'électricité plus représentatifs.

Les paramètres les plus utiles sont :

- le `PUE`, qui reflète le surcoût énergétique de l'infrastructure de datacenter
- le `WUE`, qui documente l'intensité en eau du site ou de son mode de refroidissement
- le `REF`, qui renseigne la part d'électricité recyclée ou renouvelable explicitement attribuée par le fournisseur
- le `CUE`, ou indicateur carbone dérivé, qui aide à traduire les consommations électriques en impact climatique

Quand la région est inconnue, la méthode recommande d'utiliser un repli explicite :

1. région fournisseur documentée
2. pays ou zone géographique connue
3. valeur par défaut du fournisseur
4. hypothèse générique temporaire, à signaler comme moins robuste

L'important n'est pas de prétendre connaître la région exacte à tout prix, mais de documenter clairement le niveau de précision retenu.

### Méthode pour les services managés

Les services managés ne donnent pas toujours accès à une machine, à un disque ou à une carte accélératrice identifiables. La méthode recommande alors de distinguer trois cas :

1. Le fournisseur expose une unité technique suffisamment proche d'une ressource physique.
   Exemple : capacité mémoire, temps CPU, GPU.h, volume stocké.
2. Le service peut être rapproché d'un archétype technique connu.
   Exemple : base de données gérée rapprochée d'un serveur, d'un stockage et d'un trafic réseau.
3. Le service reste opaque.
   Dans ce cas, il faut utiliser un facteur forfaitaire provisoire, clairement marqué comme `gap du référentiel D4B` s'il n'existe pas encore dans `digital4better/data`.

Dans la pratique, cela revient souvent à choisir entre quatre logiques :

- une logique `calcul`, quand le service expose du temps de calcul, des vCPU, des GPU ou de la mémoire
- une logique `stockage`, quand l'unité principale est une capacité stockée sur une durée
- une logique `réseau`, quand l'usage est surtout décrit par des volumes transférés, des requêtes ou une durée d'activation
- une logique `hybride`, quand le service combine plusieurs couches, par exemple calcul, stockage et trafic

### Cas fréquents de correspondance

| Famille de service | Unités fournisseur fréquentes | Unités pivot recommandées | Principe de modélisation |
| --- | --- | --- | --- |
| Machines virtuelles, conteneurs, nœuds managés | heure, minute, vCPU, mémoire, GPU | `vCPU.h`, `GPU.h`, `Go RAM.h`, parfois `Go SSD.h` | Rapprocher le service d'une instance ou d'un profil de calcul |
| Volumes bloc, stockage objet, snapshots, sauvegardes | `Go.mois`, `Go.h`, `Go stockés` | `Go SSD.h` ou `Go HDD.h` | Convertir la capacité stockée sur la durée observée |
| Bases de données managées, caches, moteurs de recherche | heure d'instance, `Go.mois`, unité fournisseur spécifique | combinaison calcul + mémoire + stockage | Rattacher le service à un archétype technique ou à ses unités visibles |
| Réseau, load balancers, DNS, CDN, passerelles | `Go`, `requêtes`, `heures`, adresses actives | `Go transférés`, heures d'activation | Modéliser le réseau dominant et éviter de recompter l'infrastructure déjà incluse |
| Fonctions, jobs, services événementiels | invocation, `ms`, `vCPU.s`, `Go.s` | durée d'exécution, `vCPU.h`, `Go RAM.h` | Ramener les événements à une capacité effectivement mobilisée |

Cette table ne remplace pas une table de correspondance détaillée par fournisseur. Elle fixe le principe général : partir de l'unité la plus proche d'une capacité physique, puis documenter toute simplification intermédiaire.

## Hypothèses & limites

### Hypothèses retenues

Le cloud est le domaine où l'écart entre données observées et données reconstruites est le plus fort. La robustesse du calcul dépend de la qualité des exports fournisseur, de la stabilité des correspondances entre services et ressources matérielles, et du niveau de transparence régional.

### Limitations connues

Quelques limites sont particulièrement importantes :

- un même service managé peut changer d'architecture sans changement visible dans la facture
- certaines unités fournisseur sont commerciales avant d'être techniques
- la part d'impact embarqué imputable au cloud reste souvent plus incertaine que la part d'usage
- les comparaisons entre fournisseurs ne sont robustes que si les règles de correspondance restent homogènes

## Références

### Données mobilisées

- `digital4better/data`: familles `data/cloud/*`, `data/energy/*`, `data/factor/*`, `data/hardware/*`, `data/equipment/*`
- Exports fournisseur ou format FOCUS
- Table de correspondance service cloud -> unités pivot -> ressources matérielles
- Données régionales de type `PUE`, `WUE`, `REF` et facteurs d'électricité associés

### Sources

- Green Software Foundation, SCI
- Littérature et méthodologies cloud du corpus `inputs/md`
- Documentations fournisseurs cloud
- [digital4better/data](https://github.com/digital4better/data)
