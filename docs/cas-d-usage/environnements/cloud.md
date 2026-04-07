# Cloud

## Résumé

Ce chapitre évalue un périmètre cloud quand les ressources physiques sous-jacentes ne sont pas directement visibles. La méthode transforme les données de facturation ou d'usage fournisseur en **unités pivot matérielles** (vCPU.h, Go RAM.h, Go SSD.h, Go transférés), puis calcule les impacts environnementaux via les modèles paramétriques composants.

### Périmètre évalué

- **IaaS** : machines virtuelles, volumes de stockage, trafic réseau
- **PaaS** : quand il peut être relié à des unités techniques explicites
- **Services managés** : quand une règle de correspondance vers des ressources matérielles peut être documentée

Le cloud maîtrisé (on-premise, salle serveur) est traité dans [Infrastructure d'hébergement](./infrastructure-d-hebergement).

## Pipeline d'évaluation

Le calcul suit une pipeline en 5 étapes :

```mermaid
flowchart LR
    A[Données fournisseur<br>facturation, billing,<br>export FOCUS] --> B[Classification<br>par famille de service]
    B --> C[Inférence matérielle<br>unités pivot :<br>vCPU.h, Go.h, Go]
    C --> D[Calcul énergie<br>unités pivot ×<br>coefficients]
    D --> E[Calcul impacts<br>énergie × PUE ×<br>facteur élec pays]
    E --> F[Agrégation<br>opérationnel +<br>intrinsèque]

    style A fill:#264653,color:#fff
    style B fill:#2a9d8f,color:#fff
    style C fill:#e9c46a,color:#000
    style D fill:#f4a261,color:#000
    style E fill:#e76f51,color:#fff
    style F fill:#6c757d,color:#fff
```

## Étape 1 : classification des services

Les services cloud sont classés en familles selon leur nature physique :

| Famille | Exemples | Unité pivot |
|---|---|---|
| **Calcul** | VM, conteneurs, fonctions, batch | vCPU.h, GPU.h |
| **Stockage** | Volumes bloc, stockage objet, snapshots, sauvegardes | Go SSD.h ou Go HDD.h |
| **Réseau** | Transit, CDN, load balancers | Go transférés |
| **Données** | Bases managées, caches, moteurs de recherche | Combinaison calcul + stockage |
| **IA** | Inférence managée, fine-tuning | GPU.h, tokens |

Les services purement logiques (DNS, IAM, monitoring sans stockage) sont exclus car leur empreinte matérielle est négligeable ou non attribuable.

## Étape 2 : inférence matérielle (unités pivot)

### Principe

Chaque SKU de facturation est converti en **unités pivot** — des grandeurs physiques indépendantes du fournisseur :

| Unité pivot | Ce qu'elle représente | Exemple |
|---|---|---|
| **vCPU.h** | Temps de calcul CPU | 4 vCPU × 730 h/mois = 2 920 vCPU.h |
| **GPU.h** | Temps d'accélération GPU | 1 GPU × 100 h = 100 GPU.h |
| **Go RAM.h** | Mémoire active | 16 Go × 730 h = 11 680 Go.h |
| **Go SSD.h** | Stockage SSD actif | 100 Go × 730 h = 73 000 Go.h |
| **Go HDD.h** | Stockage HDD actif | 1 000 Go × 730 h = 730 000 Go.h |
| **Go** | Volume réseau transféré | 500 Go sortants |

### Correspondance service → unités pivot

| Service | Données d'entrée | Unités pivot |
|---|---|---|
| **VM (EC2, Compute Engine, Azure VM)** | Type d'instance, heures | vCPU.h + Go RAM.h + Go SSD.h (via specs instance) |
| **Stockage bloc (EBS, Persistent Disk)** | Go.mois | Go SSD.h ou Go HDD.h |
| **Stockage objet (S3, GCS, Blob)** | Go.mois | Go HDD.h (pour le stockage froid) |
| **Base de données managée (RDS, CloudSQL)** | Type d'instance, Go stockage | vCPU.h + Go RAM.h + Go SSD.h |
| **Fonctions (Lambda, Cloud Functions)** | Invocations × durée × mémoire | vCPU.h + Go RAM.h (reconstitué) |
| **Conteneurs (ECS, GKE, AKS)** | vCPU, mémoire, heures | vCPU.h + Go RAM.h |
| **Réseau (Transit, CDN, NAT)** | Go transférés | Go réseau |
| **IA managée (Bedrock, Vertex AI)** | Tokens, GPU.h | GPU.h ou tokens → GPU.h |

:::note[Specs d'instance]
Pour les VM, les specs (vCPU, RAM, stockage) proviennent du référentiel `digital4better/data/cloud/{provider}-vms.csv`. Chaque type d'instance (ex: `m5.xlarge`) est relié à ses caractéristiques physiques (4 vCPU, 16 Go RAM, etc.).
:::

## Étape 3 : calcul de l'énergie

Les unités pivot sont converties en consommation électrique via des coefficients par composant :

$$
\begin{aligned}
&E_{cloud} = E_{vcpu} + E_{gpu} + E_{ram} + E_{ssd} + E_{hdd} + E_{network} \\
\text{avec} \\
&E_{vcpu} = vCPU.h \times 0{,}00354 \htmlClass{unit}{[kWh]} \\
&E_{gpu} = GPU.h \times 0{,}7 \htmlClass{unit}{[kWh]} \\
&E_{ram} = Go.h \times 0{,}000392 \htmlClass{unit}{[kWh]} \\
&E_{ssd} = Go.h \times 1{,}2 \times 10^{-6} \htmlClass{unit}{[kWh]} \\
&E_{hdd} = Go.h \times 6{,}5 \times 10^{-7} \htmlClass{unit}{[kWh]} \\
&E_{network} = Go \times 0{,}001 \htmlClass{unit}{[kWh]}
\end{aligned}
$$

| Composant | Coefficient | Unité | Source |
|---|---|---|---|
| vCPU | 0,00354 | kWh / vCPU.h | Cloud Jewels (3,54 W moyen par vCPU) |
| GPU | 0,7 | kWh / GPU.h | Basé sur TDP H100 (700 W) |
| RAM | 0,000392 | kWh / Go.h | Cloud Carbon Footprint |
| SSD | 1,2E-06 | kWh / Go.h | Cloud Carbon Footprint |
| HDD | 6,5E-07 | kWh / Go.h | Cloud Carbon Footprint |
| Réseau | 0,001 | kWh / Go | Cloud Carbon Footprint |

## Étape 4 : calcul des impacts

### Impact opérationnel

L'énergie est convertie en impact via les paramètres régionaux du datacenter :

$$
\begin{aligned}
&I_{ope_{i}} = E_{cloud} \times PUE \times \left( (1 - REF) \times IF_{i,pays} + REF \times IF^{renouv}_{i,pays} \right) \\
\text{avec} \\
&PUE = \text{Power Usage Effectiveness du site} \\
&REF = \text{Part d'énergie renouvelable déclarée} \\
&IF_{i,pays} = \text{Facteur d'impact du mix électrique du pays}
\end{aligned}
$$

Le **CUE** (Carbon Usage Effectiveness) synthétise PUE × facteur électrique :

$$
CUE = PUE \times \left( (1 - REF) \times IF_{GWP,pays} + REF \times IF^{renouv}_{GWP,pays} \right)
$$

### Impact intrinsèque (embodied)

L'impact de fabrication est calculé pour chaque composant en proportion de la durée d'usage :

$$
\begin{aligned}
&I_{emb}^{vm} = \frac{scope3_{instance} \times heures}{durée\_vie \times 365 \times 24} \\
&I_{emb}^{ssd} = 0{,}16 \times Go_{SSD} \times \frac{heures}{durée\_vie \times 365 \times 24} \\
&I_{emb}^{hdd} = 0{,}02 \times Go_{HDD} \times \frac{heures}{durée\_vie \times 365 \times 24}
\end{aligned}
$$

Où :
- $scope3_{instance}$ est l'empreinte carbone de fabrication du serveur sous-jacent (kgCO₂e), quand elle est connue via les données constructeur ou le référentiel D4B
- $0{,}16$ kgCO₂e/Go est le SEF moyen des SSD (Tannu & Nair 2023)
- $0{,}02$ kgCO₂e/Go est le SEF moyen des HDD
- $durée\_vie$ est la durée de vie des équipements datacenter (5 ans par défaut)

### Paramètres régionaux

Les paramètres PUE, WUE et REF proviennent du référentiel `digital4better/data/cloud/{provider}-regions.csv` :

| Paramètre | Description | Source | Défaut si inconnu |
|---|---|---|---|
| **PUE** | Efficacité énergétique du site | Déclaration fournisseur | 1,58 (moyenne mondiale) |
| **WUE** | Consommation d'eau du refroidissement (L/kWh) | Déclaration fournisseur | 0 (non documenté) |
| **REF** | Part d'énergie renouvelable | Déclaration fournisseur | 0 (conservateur) |
| **Pays** | Mix électrique | Localisation du datacenter | Mix mondial |

:::note[Transparence fournisseur]
La qualité des données régionales varie fortement. AWS publie PUE et WUE par région. Azure publie des fiches par datacenter. Google publie un CFE% (carbon-free energy) par région. OVHcloud et Scaleway publient des KPIs de durabilité. Ces données sont collectées dans `digital4better/data/cloud/`.
:::

## Services managés

Les services managés ne donnent pas toujours accès à une machine identifiable. La méthode distingue trois cas :

| Cas | Principe | Exemple |
|---|---|---|
| **Unité technique exposée** | Utiliser directement l'unité la plus proche d'une ressource physique | Base RDS : type d'instance → vCPU.h + Go RAM.h + Go SSD.h |
| **Archétype technique** | Rapprocher le service d'une config type connue | Fonction Lambda : invocations × durée × mémoire → vCPU.h + Go RAM.h |
| **Service opaque** | Documenter comme gap, utiliser un forfait provisoire | Service applicatif sans unité technique visible |

### Logiques de modélisation

| Logique | Quand l'appliquer | Unités pivot |
|---|---|---|
| **Calcul** | Le service expose du temps CPU/GPU ou de la mémoire | vCPU.h, GPU.h, Go RAM.h |
| **Stockage** | L'unité principale est une capacité stockée × durée | Go SSD.h, Go HDD.h |
| **Réseau** | L'usage est décrit par des volumes transférés | Go réseau |
| **Hybride** | Le service combine plusieurs couches | Décomposer en calcul + stockage + réseau |

## Application concrète

**Cas : infrastructure cloud d'un service SaaS (AWS, région eu-west-1, Irlande)**

| Ressource | Quantité mensuelle | Unités pivot | Énergie (kWh) |
|---|---|---|---|
| 4 × m5.xlarge (4 vCPU, 16 Go) | 4 × 730 h | 11 680 vCPU.h + 46 720 Go RAM.h | 41,3 + 18,3 = 59,6 |
| 1 × p4d.24xlarge (8 A100 GPU) | 200 h | 1 600 GPU.h | 1 120 |
| 2 To EBS gp3 | 730 h | 1 460 000 Go SSD.h | 1,8 |
| 500 Go S3 | 730 h | 365 000 Go HDD.h | 0,2 |
| 1 To transit sortant | — | 1 000 Go | 1,0 |
| **Total énergie IT** | | | **1 183 kWh/mois** |

| Impact | Calcul | Valeur |
|---|---|---|
| Énergie avec PUE (1,2) | 1 183 × 1,2 | 1 419 kWh/mois |
| GWP opérationnel | 1 419 × 0,25 kgCO₂e/kWh (Irlande) | **355 kgCO₂e/mois** |
| GWP intrinsèque (4 serveurs + GPU) | (4×60 + 1×250) × (730 / 43 800) | **9 kgCO₂e/mois** |
| **Total GWP** | | **364 kgCO₂e/mois** |

:::note[Le GPU domine]
Dans cet exemple, les 200 h de GPU (A100) consomment 95 % de l'énergie IT. Les VM standard sont marginales. C'est un pattern fréquent pour les services utilisant de l'IA : le calcul GPU domine très largement le profil d'impact.
:::

## Hypothèses et limites

- Le cloud est le domaine où l'écart entre données observées et données reconstruites est le plus fort.
- Un même service managé peut changer d'architecture sans changement visible dans la facture.
- Certaines unités fournisseur sont commerciales avant d'être techniques (ex: "unités de capacité" Amazon DynamoDB).
- La part d'impact intrinsèque dans le cloud est souvent plus incertaine que la part opérationnelle.
- Les comparaisons entre fournisseurs ne sont robustes que si les règles de correspondance restent homogènes.
- La durée de vie des équipements datacenter (5 ans par défaut) est une hypothèse forte ; certains hyperscalers conservent leur matériel plus longtemps.

## Données mobilisées

- `digital4better/data` → `data/cloud/{provider}-vms.csv` (specs instances)
- `digital4better/data` → `data/cloud/{provider}-regions.csv` (PUE, WUE, REF)
- `digital4better/data` → `data/factor/*` (mix électrique par pays/mois)
- Exports fournisseur : AWS Cost and Usage Report, Azure Billing, GCP Cloud Billing, format FOCUS

## Sources

- Green Cloud Computing, UBA, 2021 (coefficients par composant)
- Cloud Carbon Footprint (coefficients énergie par composant)
- Tannu & Nair, 2023. The Dirty Secret of SSDs (SEF SSD/HDD)
- Documentations fournisseurs : [AWS](https://sustainability.aboutamazon.com/), [Azure](https://datacenters.microsoft.com/sustainability/), [GCP](https://cloud.google.com/sustainability/region-carbon), [OVHcloud](https://corporate.ovhcloud.com/), [Scaleway](https://www.scaleway.com/en/docs/environmental-footprint/)
- [digital4better/data](https://github.com/digital4better/data)
