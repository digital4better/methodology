# Allocation et partage des impacts

Un équipement, une infrastructure ou un service supporte souvent plusieurs usages, utilisateurs ou services en même temps. L'allocation sert à définir quelle part d'impact peut être attribuée à l'objet évalué. C'est un choix méthodologique structurant : il influe directement sur le résultat et doit donc être explicite, justifié et stable au sein d'une même famille d'évaluations.

import { InlineAllocationExample } from '@site/src/components/inline-allocation-example';

## Conventions D4B et règles RCP

Les conventions décrites ici restent celles des calculs D4B. Le RCP parent privilégie les relations physiques, puis le temps et les autres critères lorsque nécessaire ; les RCP enfants précisent ces choix selon le service.[^rcp-parent]

Pour le réseau, notre exemple par volume diffère de la séparation fixe/variable décrite dans [Réseau](../materiel/reseau-et-infrastructure/reseau). Pour le cloud, une allocation par ressources réservées ne suffit pas à reproduire toutes les allocations d’un facteur RCP. Le dénominateur d’un facteur terminal détermine aussi son usage : temps calendaire, temps d’utilisation et facteur déjà alloué par seconde ne sont pas interchangeables. La convention retenue reste explicite ; deux allocations du même poste ne se cumulent pas.

## Pourquoi l'allocation est structurante

L'allocation n'est pas un paramètre secondaire. Un même serveur physique partagé entre trois services peut voir son impact attribué à parts égales, au prorata du temps d'usage ou au prorata des ressources réservées -- et le résultat par service dépend de la règle choisie. Ce choix doit donc être :

- **explicite** : la règle d'allocation est documentée dans chaque évaluation.
- **justifié** : le critère retenu est relié à la fonction rendue ou à la ressource sollicitée.
- **stable** : au sein d'une même campagne d'évaluation, la même règle est appliquée à des objets comparables.
- **calculable** : les données nécessaires sont disponibles ou estimables de manière traçable.

:::note[Posture méthodologique]
La méthodologie privilégie des allocations simples et traçables plutôt qu'une pseudo-précision non reproductible. Lorsqu'un choix est arbitraire, il vaut mieux le documenter que le masquer dans un calcul complexe.
:::

## Principales familles d'allocation

Le tableau ci-dessous résume les familles d'allocation mobilisées dans la méthode, le contexte où elles s'appliquent et leur base physique[^donnees-modele][^source-5] :

| Famille | Base d'allocation | Contexte d'usage principal | Variable clé |
|---|---|---|---|
| **Temporelle** | Durée d'usage | Terminaux, serveurs dédiés | $D_{usage}$ |
| **Volumétrique** | Volume de données transférées | Réseau (WAN, LAN, CDN) | $V$ (en octets) |
| **Par capacité réservée** | Ressources provisionnées (vCPU, RAM, stockage) | Centres de données, Cloud, VM | $N_{vcpu}$, $N_{ram}$, $V_{storage}$ |
| **Par nombre d'utilisateurs** | Utilisateurs actifs ou déclarés | Services partagés, SaaS | $N_{users}$ |
| **Forfaitaire documentée** | Part fixe conventionnelle | Cas où aucune donnée d'usage n'est disponible | Part documentée |

## Mécanismes d'allocation {#mécanismes-dallocation}

### Allocation temporelle

L'allocation temporelle est la règle par défaut pour les équipements dont l'usage est caractérisé par une durée. Elle s'applique notamment aux terminaux et aux serveurs dédiés.

**Impact intrinsèque** -- la part d'impact de fabrication allouée à un usage est proportionnelle à la durée d'usage rapportée à la durée de vie totale de l'équipement :

$$
\begin{aligned}
&I_{emb_{i}} = D_{usage} \times IF_{emb_{i}} \\
\text{avec} \\
&I_{emb_{i}} = \text{Impact intrinsèque alloué pour l'indicateur } i \htmlClass{unit}{[U_i]} \\
&D_{usage} = \text{Durée d'usage dédiée au service évalué} \htmlClass{unit}{[s]} \\
&IF_{emb_{i}} = \text{Facteur d'impact intrinsèque pour l'indicateur } i \htmlClass{unit}{[U_i/s]}
\end{aligned}
$$

Lorsque le facteur d'impact est fourni pour une durée de vie théorique $TL$ qui diffère de la durée de vie réelle $RL$ de l'équipement, une correction proportionnelle est appliquée au facteur déjà normalisé par unité de temps, et non à un inventaire de fabrication total :

$$
\begin{aligned}
&IF_{emb_{i}} = TIF_{emb_{i}} \times \frac{TL}{RL} \\
\text{avec} \\
&TIF_{emb_{i}} = \text{Facteur d'impact théorique} \htmlClass{unit}{[U_i/s]} \\
&TL = \text{Durée de vie théorique du référentiel} \htmlClass{unit}{[s]} \\
&RL = \text{Durée de vie réelle observée} \htmlClass{unit}{[s]}
\end{aligned}
$$

:::note[Unités de temps]
Les formules sont données en secondes par convention. En pratique, on travaille souvent en heures ou en années selon le contexte. Voir [Temporalité, vieillissement et versionnement](./temporalite-vieillissement-et-versionnement-des-donnees) pour le détail du calcul des durées de vie réelles.
:::

**Impact opérationnel** -- l'énergie consommée est directement proportionnelle à la durée d'usage :

$$
\begin{aligned}
&E_{elec} = D_{usage} \times P_{elec} \\
\text{avec} \\
&E_{elec} = \text{Consommation électrique} \htmlClass{unit}{[kWh]} \\
&D_{usage} = \text{Durée d'usage} \htmlClass{unit}{[h]} \\
&P_{elec} = \text{Puissance moyenne de l'équipement} \htmlClass{unit}{[kW]}
\end{aligned}
$$

Pour une fabrication totale connue, l’allocation annuelle correspond à cette fabrication divisée par la durée de vie retenue. L’exemple suivant illustre cette relation, hors impacts d’usage.

<InlineAllocationExample lang="fr" />

### Allocation volumétrique

L'allocation volumétrique est la règle de référence pour les réseaux, en tant que convention d'attribution moyenne au trafic.

L'impact d'un segment réseau est calculé par :

$$
\begin{aligned}
&SI_{emb_{i}} = V \times L \times CF_{emb_{i}} \\
\text{avec} \\
&V = \text{Volume de données transférées} \htmlClass{unit}{[o]} \\
&L = \text{Longueur du segment réseau} \htmlClass{unit}{[km]} \\
&CF_{emb_{i}} = \text{Facteur de conversion pour l'indicateur } i \htmlClass{unit}{[U_i/o/km]}
\end{aligned}
$$

Cette approche attribue une part moyenne d'une infrastructure partagée au trafic. Elle ne démontre pas que l'énergie marginale varie linéairement avec les octets ou la distance : les équipements ont une consommation fixe et des capacités par paliers. N'introduire $L$ que si le facteur est effectivement exprimé par octet et par kilomètre ; un facteur par Go ne doit pas être multiplié à nouveau par une distance.

### Allocation par capacité réservée

Lorsque l'inventaire physique d'un centre de données n'est pas accessible mais que les ressources provisionnées sont connues (vCPU, RAM, stockage), l'allocation repose sur les composants :

$$
\begin{aligned}
&E_{components} = D_{usage} \times (P_{cpu} + P_{gpu} + P_{ram} + P_{storage}) \\
\text{avec} \\
&P_{cpu} = N_{vcpu} \times \left(P_{cpu_{min}} + \tfrac{1}{2}(P_{cpu_{max}} - P_{cpu_{min}})\right) \\
&P_{ram} = N_{ram} \times 0{,}000392 \htmlClass{unit}{[kW]} \\
&P_{storage} = \begin{cases}
1{,}2 \times 10^{-3} \times V_{storage} & \text{si SSD} \\
0{,}65 \times 10^{-3} \times V_{storage} & \text{si HDD}
\end{cases}
\end{aligned}
$$

:::note[vCPU et hyperthreading]
Un vCPU peut représenter un thread matériel, mais la correspondance dépend de l'offre et de l'architecture. Huit vCPU ne correspondent à quatre cœurs que si le fournisseur documente deux threads par cœur. Les puissances CPU doivent être exprimées par vCPU pour cette formule ; $N_{ram}$ est en Go et $V_{storage}$ en To décimaux. Les coefficients sont des modèles historiques de Cloud Carbon Footprint, à remplacer par des mesures compatibles quand elles existent. Le point médian CPU suppose une charge de 50 %, pas une charge observée.[^source-3]
:::

Pour l'impact intrinsèque, les ressources provisionnées sont rapprochées de configurations de référence (machines virtuelles petite, moyenne, grande de la Base Empreinte ou base Cloud Carbon Footprint).

## Arbre de décision

Le choix de la règle d'allocation dépend de la couche évaluée et des données disponibles :

```mermaid
flowchart TD
    A[Quel objet évalue-t-on ?] --> B{Terminal ou<br>serveur dédié ?}
    A --> C{Réseau<br>WAN / LAN ?}
    A --> D{Centre de données<br>ou Cloud ?}
    B -- oui --> E[Allocation temporelle<br>D_usage / durée de vie]
    C -- oui --> F[Allocation volumétrique<br>volume × facteur compatible]
    D -- oui --> G{Inventaire physique<br>disponible ?}
    G -- oui --> H[Approche équipement<br>allocation temporelle<br>par serveur]
    G -- non --> I{Composants connus<br>vCPU, RAM, stockage ?}
    I -- oui --> J[Allocation par<br>capacité réservée]
    I -- non --> K[Approche système<br>forfait Base Empreinte<br>ou Cloud provider]
```

## Application concrète

**Cas : un service web hébergé sur un serveur partagé**

Un serveur physique est partagé entre deux services A et B. On connaît les éléments suivants :

| Paramètre | Valeur |
|---|---|
| Impact intrinsèque total du serveur (GWP) | 1 200 kg CO₂ eq. sur 5 ans |
| Durée d'utilisation du serveur | 5 ans |
| Service A : durée d'usage annuelle | 4 380 h/an (50 % du temps) |
| Service B : durée d'usage annuelle | 2 190 h/an (25 % du temps) |
| Serveur inactif | 2 190 h/an (25 % du temps) |

Avec une **allocation temporelle au prorata du temps actif** :

| | Service A | Service B |
|---|---|---|
| Part du temps actif | 50 / 75 = 66,7 % | 25 / 75 = 33,3 % |
| Impact intrinsèque annuel (GWP) | 240 × 0,667 = **160 kg CO₂ eq.** | 240 × 0,333 = **80 kg CO₂ eq.** |

:::note[Temps inactif]
La normalisation sur le temps actif répartit ici **la totalité des 240 kg annuels**, y compris la part d'inactivité, entre A et B. Une allocation sur le temps calendaire donnerait au contraire 120 kg à A, 60 kg à B et 60 kg à une catégorie « capacité non allouée ». Les deux conventions répondent à des questions différentes ; ne pas présenter la première comme excluant l'inactivité. L'exemple suppose des créneaux exclusifs ; des services simultanés nécessitent également une part de ressources.
:::

## Principes de choix

Une bonne règle d'allocation doit :

1. être **reliée à la fonction rendue** par l'équipement ou le service.
2. rester **compréhensible** pour un relecteur non spécialiste.
3. être **calculable** avec les données effectivement disponibles.
4. **limiter les effets arbitraires** -- une allocation simple est souvent préférable à une pseudo-précision non traçable.
5. être **cohérente** avec les allocations utilisées dans les autres couches de la même évaluation.

### Effet du dénominateur sur l’allocation {#denominateurs-allocation}

Pour un équipement fictif de 1 000 kg CO₂e sur cinq ans, un service de 100 heures reçoit :

| Convention du scénario | Calcul | Fabrication allouée |
|---|---|---:|
| Temps calendaire | 1 000 × 100 / (5 × 8 760) | 2,28 kg CO₂e |
| Temps utile de 2 000 h/an | 1 000 × 100 / (5 × 2 000) | 10 kg CO₂e |
| Capacité réservée à 10 % pendant un an | 1 000 × 1/5 × 10 % | 20 kg CO₂e |

Ces valeurs répondent à des questions différentes. La première ne réattribue pas les périodes inactives au service ; la deuxième répartit toute la fabrication entre les heures utiles ; la troisième inclut la part réservée, même inutilisée. Elles ne s’additionnent pas. La convention et le traitement des capacités restantes accompagnent le résultat.

## Hypothèses et limites

- Les allocations mixtes sont parfois nécessaires, notamment pour les services qui combinent temps d'usage, stockage et flux réseau. Dans ce cas, chaque couche peut avoir sa propre règle d'allocation, à condition que l'ensemble reste documenté.
- L'allocation par capacité réservée attribue la capacité rendue indisponible aux autres usages, même lorsqu'elle est peu utilisée. Elle n'est pas une mesure de consommation réelle. Une allocation à la consommation répond à une autre question et doit répartir explicitement le socle à vide et les ressources de support.
- Les anciens forfaits VM sont obsolètes pour la méthode cible. Une configuration intermédiaire est calculée par composants, puis allouée ; elle n’est pas obtenue par interpolation de ces forfaits.
- L'allocation forfaitaire ne doit être utilisée qu'en dernier recours, lorsque aucune donnée d'usage n'est disponible.

Les durées de vie reposent sur les inventaires historisés et les hypothèses du registre ; aucun catalogue public `data/hardware` n’est présent dans l’instantané vérifié.

[^rcp-parent]: ADEME, [RCP services numériques, version 2, juin 2026](https://librairie.ademe.fr/societe-et-politiques-publiques/9418-methodologie-d-evaluation-environnementale-basee-sur-l-analyse-du-cycle-de-vie-acv-pour-un-service-numerique.html), p. 16–19.

[^source-3]: [Cloud Carbon Footprint -- Methodology](https://www.cloudcarbonfootprint.org/docs/methodology/) Documentation en ligne, version non figée.

[^source-5]: Digital4Better, [digital4better/data](https://github.com/digital4better/data) Catalogue évolutif ; utiliser un commit pour figer les facteurs.

[^donnees-modele]: Facteurs d'impact intrinsèques : `digital4better/data` → `data/equipment/*`, `data/factor/*`. Facteurs réseau : Base Empreinte ADEME (services numériques, lignes réseau fixe et mobile). Coefficients de puissance composants : Cloud Jewels, Cloud Carbon Footprint. Durées de vie : inventaires historisés et hypothèses du registre. Données d'usage mesurées quand elles existent ; à défaut, hypothèses documentées dans le [Registre des hypothèses et valeurs par défaut](../references/registre-des-hypotheses-et-valeurs-par-defaut). [Digital4Better, catalogue de données, instantané 77cae4a](https://github.com/digital4better/data/tree/77cae4a58fadd5deb3b8d4e5577020da08f780d8). Références et portée : [Sources et corpus](../references/sources-et-corpus).
