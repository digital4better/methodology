# Semi-conducteurs

## En bref

Un processeur ne pèse que quelques grammes, mais sa fabrication mobilise des centaines de litres d'eau ultrapure, des centaines de kilowattheures d'électricité et des dizaines de gaz et produits chimiques de spécialité. Cette section explique pourquoi les procédés semi-conducteurs concentrent une part si importante des impacts intrinsèques des équipements numériques — et pourquoi la masse d'un composant ne dit presque rien sur son empreinte réelle.

## Pourquoi les semi-conducteurs pèsent autant

L'informatique paraît souvent immatérielle. Pourtant, chaque puce est le produit d'une chaîne industrielle parmi les plus intensives au monde :

- une **salle blanche** consomme autant d'énergie qu'une petite ville ;
- un wafer de 300 mm traverse **500 à 1 500 étapes de procédé** sur 2 à 3 mois ;
- chaque étape requiert de l'**eau ultrapure** (purifiée à 18,2 MΩ·cm), des gaz de spécialité, des produits chimiques et un contrôle thermique extrême.

Le résultat : un composant de quelques grammes dont l'empreinte environnementale est dominée par son procédé de fabrication, pas par sa masse.

## Ordres de grandeur de la fabrication

### Par cm² de surface de silicium

Les données ci-dessous sont des moyennes industrielles agrégées à partir des rapports de durabilité des principaux fabricants :

| Indicateur | Valeur moyenne | Unité | Source |
|---|---|---|---|
| **Consommation d'eau** | 8,22 | L / cm² | Wang et al. 2023[^1] |
| **Consommation d'énergie** | 1,15 | kWh / cm² | Wang et al. 2023[^1] |
| **Émissions GES** | 0,84 | kg CO₂ eq. / cm² | Wang et al. 2023[^1] |

[^1]: Wang et al., 2023. [Environmental data and facts in the semiconductor manufacturing industry: An unexpected high water and energy consumption situation](https://doi.org/10.1016/j.watcyc.2023.01.004). Water Cycle, 4, 47-54.

:::note[Ordres de grandeur]
Pour un wafer de 300 mm (~707 cm²), ces moyennes correspondent à environ **5 800 litres d'eau**, **810 kWh d'énergie** et **590 kg CO₂ eq.** par wafer. Un seul GPU haut de gamme (die ~800 mm²) occupe environ 1/9 de ce wafer.
:::

### Décomposition front-end / back-end

La fabrication d'un composant se décompose en deux grandes étapes :

```mermaid
flowchart LR
    W[Wafer substrat<br>lingot de silicium] --> FE[Front-end<br>gravure, dopage,<br>métallisation]
    FE --> BE[Back-end<br>découpe, assemblage,<br>packaging, test]
    BE --> C[Composant fini<br>CPU, GPU, mémoire]

    style W fill:#264653,color:#fff
    style FE fill:#2a9d8f,color:#fff
    style BE fill:#e9c46a,color:#000
    style C fill:#f4a261,color:#000
```

| Étape | Part du GWP | Part de l'eau | Part de l'énergie | Ce qui pèse |
|---|---|---|---|---|
| **Front-end** | ~80 % | ~90 % | ~86 % | Gaz de procédé (SF₆, NF₃, CF₄), électricité des salles blanches, eau ultrapure |
| **Back-end** | ~20 % | ~10 % | ~14 % | Assemblage, tests, packaging, substrats |

Source : reconstruction à partir des données Green Cloud Computing (UBA, 2021) pour des processeurs Intel[^2].

[^2]: Green Cloud Computing, UBA, 2021. Orientierendes Ökobilanzmodell für IT-Komponenten.

### Évolution par nœud technologique

Plus la gravure est fine, plus les procédés sont intensifs :

| Nœud technologique | Nombre d'étapes de procédé (ordre de grandeur) | Tendance énergie/eau |
|---|---|---|
| 28 nm | ~500 | Référence |
| 14 nm (FinFET) | ~700 | +30 à +50 % vs 28 nm |
| 7 nm (EUV) | ~900 | +60 à +80 % vs 28 nm |
| 5 nm | ~1 000 | ×2 vs 28 nm |
| 3 nm | ~1 200+ | ×2,5+ vs 28 nm |

:::note[Lithographie EUV]
L'introduction de la lithographie EUV (Extreme Ultraviolet) à partir du 7 nm augmente significativement la consommation électrique des équipements de lithographie eux-mêmes (~40 kW par source EUV), mais réduit le nombre de passes de multi-patterning nécessaires.
:::

### Packaging avancé

Le packaging n'est plus un simple emballage. Les architectures modernes (chiplets, interposeurs, TSV, HBM) combinent plusieurs dies et ajoutent une couche d'impact significative :

| Type de packaging | Complexité | Impact additionnel | Cas d'usage |
|---|---|---|---|
| **Wire bonding** | Faible | Référence | Composants standards |
| **Flip-chip** | Moyenne | +10 à +20 % | CPU, GPU classiques |
| **2.5D (interposeur)** | Élevée | +30 à +50 % | GPU datacenter (H100, MI300) |
| **3D (TSV, HBM)** | Très élevée | +50 à +100 % | Mémoire HBM, accélérateurs IA |

Source : estimations basées sur IMEC NetZero et Ouattara et al. 2026[^3].

[^3]: Ouattara et al., 2026. [Towards cleaner semiconductor packaging: Life cycle assessment of material and location decisions on carbon and water scarcity footprints](https://doi.org/10.1016/j.clwas.2025.100467).

## Lecture par indicateur environnemental

Les procédés semi-conducteurs impactent plusieurs indicateurs, pas seulement le carbone :

| Indicateur | Pertinence | Pourquoi |
|---|---|---|
| **GWP** | Très forte | Gaz fluorés (SF₆, NF₃, CF₄) à très fort potentiel de réchauffement + électricité des salles blanches |
| **WU** | Très forte | L'eau ultrapure est un poste structurant : 5 000 à 10 000 litres par wafer selon le nœud |
| **ADPe** | Forte | Matériaux de spécialité (gallium, germanium, indium) et substrats |
| **CTUe, CTUh** | Forte mais moins stabilisée | Chimie de procédé intensive (acides, solvants, photoresists) |
| **AP** | Modérée | Émissions acides des procédés de gravure et de nettoyage |
| **PM** | Modérée | Processus de combustion et d'abattement des gaz |
| **IR** | Faible à ce niveau | Principalement porté par le mix électrique du pays de fabrication |

:::note[Pourquoi pas seulement le carbone]
Deux composants peuvent avoir un GWP comparable mais des profils très différents sur l'eau ou les ressources. Un composant fabriqué à Taïwan (mix carboné modéré mais stress hydrique élevé) n'a pas le même profil qu'un composant fabriqué en Europe. La lecture multicritère est essentielle à ce niveau.
:::

## Rôle dans les impacts aval

Les semi-conducteurs n'ont pas d'impact opérationnel autonome, mais ils expliquent :

- pourquoi certains composants ont un impact intrinsèque **très supérieur** à ce que suggère leur masse ;
- pourquoi un **GPU datacenter** (H100 : die ~800 mm², packaging 2.5D avec HBM) a un impact intrinsèque bien plus élevé qu'un CPU standard ;
- pourquoi la **génération technologique** influence fortement les impacts amont ;
- pourquoi une **lecture multicritère** est indispensable pour les composants de calcul.

Cette section sert de clé d'interprétation pour [Processeurs et accélérateurs](../composants/processeurs-et-accelerateurs), [Mémoire vive](../composants/memoire-vive) et [IA générative](../../cas-d-usage/services/ia-generative).

## Hypothèses et limites

- Cette page reste une section explicative. Elle ne constitue pas encore une chaîne de calcul autonome au niveau wafer ou die dans le référentiel D4B.
- Les valeurs par cm² sont des moyennes industrielles ; la variabilité entre fabricants, nœuds et familles de puces est importante.
- Les indicateurs autres que GWP et WU sont moins stabilisés dans la littérature à ce niveau de granularité.
- Les données récentes (Kuo et al. 2022, Wang et al. 2023) confirment la pertinence d'une lecture multicritère mais ne fournissent pas encore un jeu de facteurs universels simple.

## Données mobilisées

- `digital4better/data` → `data/hardware/cpus.*`, `data/hardware/accelerators.*`
- Corpus de littérature semi-conducteur

## Sources

- Wang et al., 2023. [Environmental data and facts in the semiconductor manufacturing industry](https://doi.org/10.1016/j.watcyc.2023.01.004). Water Cycle, 4, 47-54.
- Kuo et al., 2022. [Assessing environmental impacts of nanoscale semi-conductor manufacturing](https://doi.org/10.1016/j.resconrec.2022.106289). Resources, Conservation and Recycling.
- Ouattara et al., 2026. [Towards cleaner semiconductor packaging](https://doi.org/10.1016/j.clwas.2025.100467).
- Green Cloud Computing, UBA, 2021.
- [IMEC NetZero](https://www.imec-int.com/en/expertise/netzero)
- [Boavizta CPU explanations](https://doc.api.boavizta.org/Explanations/components/cpu/)
- Villard et al., 2015. [Drawing a chip environmental profile](https://doi.org/10.1016/j.jclepro.2014.08.061). Journal of Cleaner Production.
