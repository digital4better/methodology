# Semi-conducteurs

La masse d'une puce ne suffit pas à prévoir son empreinte : les salles blanches, procédés de fabrication, gaz, produits chimiques, rendements et énergie peuvent contribuer fortement. Cette section explique ces mécanismes sans transposer un inventaire moyen à toute génération de puces.[^context-1]

## Pourquoi les procédés comptent

La fabrication répète des étapes de dépôt, lithographie, gravure, dopage, nettoyage et métallisation dans un environnement contrôlé. Les besoins dépendent de la filière et de l'usine. L'eau ultrapure doit être produite et traitée ; les gaz et réactifs requièrent un inventaire incluant leurs émissions et leur abattement. Le nombre d'étapes et la durée de fabrication ne sont pas des constantes universelles.

## Ordres de grandeur de la fabrication

### Par cm² de surface de silicium

Wang et al. (2023) analysent des déclarations de 28 entreprises pour 2021. Les ratios suivants décrivent cet échantillon et ses frontières de reporting, pas une ACV complète d'un die ni un facteur WU caractérisé :

| Indicateur | Valeur moyenne | Unité | Source |
|---|---|---|---|
| **Usage d’eau déclaré** | 8,22 | L / cm² | Wang et al. 2023[^1] |
| **Consommation d'énergie** | 1,15 | kWh / cm² | Wang et al. 2023[^1] |
| **Émissions GES** | 0,84 | kg CO₂ eq. / cm² | Wang et al. 2023[^1] |

:::note[Ordres de grandeur]
Pour un wafer de 300 mm (~707 cm²), ces moyennes correspondent à environ **5 800 litres d'eau**, **810 kWh d'énergie** et **590 kg CO₂ eq.** pour une surface géométrique équivalente. Ce calcul ne corrige ni les rebuts ni le rendement et ne convertit pas l'eau déclarée en rareté. Un GPU haut de gamme (die ~800 mm²) occupe environ 1/88 de la surface géométrique de ce wafer (800 mm² = 8 cm²), avant pertes de bord et défauts.
:::

### Décomposition front-end / back-end

La fabrication d'un composant se décompose en deux grandes étapes :

```mermaid
flowchart LR
    W[Wafer substrat<br>lingot de silicium] --> FE[Front-end<br>gravure, dopage,<br>métallisation]
    FE --> BE[Back-end<br>découpe, assemblage,<br>packaging, test]
    BE --> C[Composant fini<br>CPU, GPU, mémoire]

    class W d4b-navy
    class FE d4b-blue
    class BE d4b-sand
    class C d4b-rose
```

| Étape | Part du GWP | Part de l'eau | Part de l'énergie | Ce qui pèse |
|---|---|---|---|---|
| **Front-end** | ~80 % | ~90 % | ~86 % | Gaz de procédé (SF₆, NF₃, CF₄), électricité des salles blanches, eau ultrapure |
| **Back-end** | ~20 % | ~10 % | ~14 % | Assemblage, tests, packaging, substrats |

Statut : décomposition historique indicative à reconstituer depuis l'inventaire Intel de Green Cloud Computing[^2] ; ces pourcentages ne sont pas des coefficients universels ni des valeurs validées pour tous les procédés.[^source-4][^source-6]

### Évolution par nœud technologique

Les valeurs suivantes décrivent des scénarios historiques du chantier et demandent une calibration par filière ; elles ne constituent pas une table universelle IMEC. Une désignation commerciale en nm ne détermine pas à elle seule le procédé, le rendement ou l’usage de l’EUV.[^source-5]

La table suivante conserve des hypothèses historiques à titre de scénario, sans établir une loi monotone entre nom de nœud et impacts :

| Nœud technologique | Nombre d'étapes de procédé (ordre de grandeur) | Tendance énergie/eau |
|---|---|---|
| 28 nm | ~500 | Référence |
| 14 nm (scénario) | ~700 | +30 à +50 % vs 28 nm |
| 7 nm (scénario) | ~900 | +60 à +80 % vs 28 nm |
| 5 nm | ~1 000 | ×2 vs 28 nm |
| 3 nm | ~1 200+ | ×2,5+ vs 28 nm |

:::note[Lithographie EUV]
L'EUV et le multi-patterning modifient les équipements, le nombre de passes, les matériaux et l'énergie. La puissance d'une source ne suffit pas à représenter celle d'un scanner ou d'une ligne ; un nom de nœud ne prouve pas l'utilisation de l'EUV. Comparer des inventaires complets par unité fonctionnelle et rendement.
:::

### Packaging avancé

Le packaging n'est plus un simple emballage. Les architectures modernes (chiplets, interposeurs, TSV, HBM) combinent plusieurs dies et ajoutent une couche d'impact significative :

| Type de packaging | Complexité | Impact additionnel | Cas d'usage |
|---|---|---|---|
| **Wire bonding** | Faible | Référence | Composants standards |
| **Flip-chip** | Moyenne | +10 à +20 % | CPU, GPU classiques |
| **2.5D (interposeur)** | Élevée | +30 à +50 % | GPU datacenter (H100, MI300) |
| **3D (TSV, HBM)** | Très élevée | +50 à +100 % | Mémoire HBM, accélérateurs IA |

Ces majorations sont des hypothèses exploratoires D4B, pas des facteurs extraits directement d’IMEC ou de Ouattara et al. La publication sur le packaging[^3] justifie l’analyse séparée de cette étape ; elle ne valide pas ces pourcentages pour toute puce.[^3]

## Lecture par indicateur environnemental

Les procédés semi-conducteurs impactent plusieurs indicateurs, pas seulement le carbone :

| Indicateur | Pertinence | Pourquoi |
|---|---|---|
| **GWP** | Très forte | Gaz fluorés (SF₆, NF₃, CF₄) à très fort potentiel de réchauffement + électricité des salles blanches |
| **WU** | Très forte | L'eau ultrapure est un poste structurant : distinguer prélèvement, consommation physique et eau caractérisée |
| **ADPe** | Forte | Matériaux de spécialité (gallium, germanium, indium) et substrats |
| **CTUe, CTUh** | Forte mais moins stabilisée | Chimie de procédé intensive (acides, solvants, photoresists) |
| **AP** | Modérée | Émissions acides des procédés de gravure et de nettoyage |
| **PM** | Modérée | Processus de combustion et d'abattement des gaz |
| **IR** | À quantifier | L’électricité de fabrication peut contribuer ; aucune faiblesse ne se déduit des données manquantes |

:::note[Pourquoi pas seulement le carbone]
Deux composants peuvent avoir un GWP comparable mais des profils très différents sur l'eau ou les ressources. La localisation du bassin, la période, le mix électrique et les procédés doivent être étudiés séparément ; un pays entier n'a pas un niveau uniforme de stress hydrique. La lecture multicritère est essentielle à ce niveau.
:::

## Rôle dans les impacts aval

Les semi-conducteurs n'ont pas d'impact opérationnel autonome, mais ils expliquent[^donnees-modele] :

- pourquoi certains composants ont un impact intrinsèque **très supérieur** à ce que suggère leur masse.
- pourquoi un GPU avec mémoire, interposeur et refroidissement exige une frontière plus large qu'un die CPU seul.
- pourquoi la **génération technologique** influence fortement les impacts amont.
- pourquoi une **lecture multicritère** est indispensable pour les composants de calcul.

Cette section sert de clé d'interprétation pour [Processeurs et accélérateurs](../composants/processeurs-et-accelerateurs), [Mémoire vive](../composants/memoire-vive) et [IA générative](../../cas-d-usage/services/ia-generative).

### Ce que couvre imec.netzero dans le corpus

La méthode v6.2 distingue la fabrication d’une puce, les assemblages de puces et leur packaging. Le résultat dépend du procédé, de la surface, du rendement de fabrication et du lieu de production. Les unités par wafer, par die et par système ne décrivent pas le même objet ; un système de puces encapsulées n’est pas une carte GPU complète.[^corpus-imec]

L’annexe de versions signale l’ajout des seize catégories EF 3.1 en v6.1 et des révisions de procédés en v6.2. Cela ne fournit pas automatiquement des facteurs compatibles pour les neuf indicateurs D4B. Le rapport de revue de mai 2025 couvre la v5.1 et limite les vérifications détaillées à certains exemples ; il ne certifie pas les versions ultérieures.[^corpus-imec]

Ces documents précisent les frontières et les données à recueillir. Ils ne calibrent pas les multiplicateurs exploratoires D4B présentés ici.

## Hypothèses et limites

- Cette page reste une section explicative. Elle ne constitue pas encore une chaîne de calcul autonome au niveau wafer ou die dans le référentiel D4B.
- Les valeurs par cm² sont des moyennes industrielles ; la variabilité entre fabricants, nœuds et familles de puces est importante.
- Les indicateurs autres que GWP et WU sont moins stabilisés dans la littérature à ce niveau de granularité.
- Les données récentes (Kuo et al. 2022, Wang et al. 2023) confirment la pertinence d'une lecture multicritère mais ne fournissent pas encore un jeu de facteurs universels simple.

[^1]: Wang et al., 2023. [Environmental data and facts in the semiconductor manufacturing industry: An unexpected high water and energy consumption situation](https://doi.org/10.1016/j.watcyc.2023.01.004). Water Cycle, 4, 47-54.

[^2]: UBA, [Green Cloud Computing](https://www.umweltbundesamt.de/publikationen/green-cloud-computing), 2021. Orientierendes Ökobilanzmodell für IT-Komponenten.

[^3]: Ouattara et al., 2026. [Towards cleaner semiconductor packaging: Life cycle assessment of material and location decisions on carbon and water scarcity footprints](https://doi.org/10.1016/j.clwas.2025.100467).

[^source-4]: UBA, [Green Cloud Computing](https://www.umweltbundesamt.de/publikationen/green-cloud-computing), 2021. Voir le [corpus documentaire](../../references/sources-et-corpus).

[^source-5]: [IMEC NetZero](https://www.imec-int.com/en/expertise/cmos-advanced/sustainable-semiconductor-technologies-and-systems-ssts) Documentation en ligne, version non figée.

[^source-6]: [Boavizta CPU explanations](https://doc.api.boavizta.org/Explanations/components/cpu/) Documentation en ligne, version non figée.

[^context-1]: Wang et al., 2023. [Environmental data and facts in the semiconductor manufacturing industry: An unexpected high water and energy consumption situation](https://doi.org/10.1016/j.watcyc.2023.01.004). Water Cycle, 4, 47-54. Kuo et al., 2022. [Assessing environmental impacts of nanoscale semi-conductor manufacturing](https://doi.org/10.1016/j.resconrec.2022.106289). Resources, Conservation and Recycling. Villard et al., 2015. [Drawing a chip environmental profile](https://doi.org/10.1016/j.jclepro.2014.08.061). Journal of Cleaner Production.

[^corpus-imec]: imec, [imec.netzero](https://netzero.imec-int.com/), *Life cycle assessment methodology*, v6.2, 30 mars 2026, § 3.2–3.3 et 5.2 ; *Annex 2, Release History*, entrées v6.1–v6.2. M. Proske et al., *LCA review*, 13 mai 2025, § 1, version revue 5.1_rev du 30 avril 2025.

[^donnees-modele]: `digital4better/data` → `data/cloud/cpus.*`, `data/cloud/accelerators.*`. Corpus de littérature semi-conducteur. [Digital4Better, catalogue de données, instantané 77cae4a](https://github.com/digital4better/data/tree/77cae4a58fadd5deb3b8d4e5577020da08f780d8). Références et portée : [Sources et corpus](../../references/sources-et-corpus).
