# Critical materials

Equipment materials do not all have the same environmental impact. Contributions depend on quantities, production processes and the chosen indicator. Criticality primarily describes supply risk; it does not replace environmental assessment.

## Distinguish three questions

| Question | What it describes | What it does not establish |
|---|---|---|
| How much is present? | The product's physical inventory | Its impact contribution |
| What impacts does its production chain cause? | Extraction, processing and other included processes | Supply disruption risk |
| Is the material critical? | Economic importance and supply risk | High carbon or water impact by definition |

European criticality assessment primarily uses economic importance and supply risk. Concentration, substitution and recycling contribute to that assessment. See the European Commission[^ref-1].

## Connect materials to equipment

Copper is used in circuits and wiring, gold in some contacts, and lithium in relevant rechargeable batteries. Environmental contributions depend on the chain actually represented in the inventory. A small mass can contribute strongly to a resource indicator; it does not establish a universal impact percentage.

Ex: comparing batteries requires capacity, chemistry and compatible inventories. Substituting one material alone does not establish an overall improvement: mass, lifetime and processes may also change.

[Battery](../composants/alimentation-et-batterie), [Display](../composants/affichage) and [Structural elements](../composants/elements-structurels) connect these issues to components. A metal inventory would duplicate manufacture already included in an equipment factor.

## Select usable data

A composition must identify the product, material masses, chemical form and undescribed parts. A per-kilogram factor must specify processes, secondary-material share and allocation rules. Unverified historical illustrative compositions and GWP ranges are not v2 defaults.

ADPe describes abiotic resource depletion under a characterization method. Results depend strongly on that method and version. A factor applied to an extraction flow is not the footprint of a kilogram of purchased refined metal.

### Compare two historical ADP factor versions

These values illustrate method sensitivity. They are not product factors and must not be mixed in one assessment.

| Material | ILCD CF v1.0.10, August 2016 | ILCD CF EF-v2.0, March 2019 | Unit |
|---|---:|---:|---|
| Indium | 5.55E+02 | 6.89E-03 | kg Sb eq./kg |
| Gold | 3.60E+01 | 5.20E+01 | kg Sb eq./kg |
| Silver | 8.42E+00 | 1.18E+00 | kg Sb eq./kg |
| Tantalum | 1.15E+01 | 4.06E-05 | kg Sb eq./kg |
| Cobalt | 2.56E-02 | 1.57E-05 | kg Sb eq./kg |
| Lithium | 1.33E-02 | 1.15E-05 | kg Sb eq./kg |
| Copper | 2.50E-03 | 1.37E-03 | kg Sb eq./kg |

Source: Green Cloud Computing, UBA, 2021, annex tables for ILCD CF v1.0.10 and EF-v2.0. These characterize extraction flows. Applying them requires an exact elementary-flow match, not a refined-material mass alone.

## Interpret recycling

Collection, metal recovery and recovered-material quality describe distinct stages. Industrial separation efficiency is not the overall end-of-life recycling rate. Any credits depend on the chosen allocation convention; they are not automatically subtracted.

Calculation relies on an [equipment model](../../modelisation/modelisation-d-un-equipement) with compatible data, linked to the relevant use case. This page helps interpret results; it does not calculate material footprints from universal coefficients.

## From composition to inventory

| Family | Possible presence | Methodological question |
|---|---|---|
| Conductive metals | Copper traces and cables, gold or silver in some contacts | Mass, purity, primary or secondary production |
| Battery materials | Lithium, graphite, cobalt or nickel depending on chemistry | Cell versus pack, capacity and exact formulation |
| Semiconductors | Silicon and manufacturing-process materials | Final mass distinct from process inputs |
| Displays and magnets | Indium or rare earths depending on technology | Technology determines factor suitability |
| Structures | Steel, aluminum, glass and polymers | Mass, alloy, recycled content and transformation |

This list guides collection; it is not a universal average composition. A partial bill of materials does not describe process consumables or manufacturing losses. Final masses alone can therefore underrepresent upstream flows.

Each material has a composition reference, quantity and compatible factor. Characterized contributions add up within one method and unit. GWP, ADPe, water or toxicity may highlight different materials: neither rarity nor low mass alone predicts the dominant indicator.

Example: cable copper inventory must cover the purchased form and necessary transformations. An ore-extraction factor does not replace conductor-production impact. A cable LCA that includes those stages already covers extraction.

Nuss and Eckelman, 2014[^ref-2] synthesize metal LCAs. Green Cloud Computing, UBA[^ref-3] supplies the historical tables compared above. Selection rules are detailed in [Data quality](../../regles/qualite-des-donnees-et-matrice-de-robustesse).

[^ref-1]: [European Commission](https://single-market-economy.ec.europa.eu/sectors/raw-materials/areas-specific-interest/critical-raw-materials_en).

[^ref-2]: [Nuss and Eckelman, 2014](https://doi.org/10.1371/journal.pone.0101298).

[^ref-3]: [Green Cloud Computing, UBA](https://www.umweltbundesamt.de/publikationen/green-cloud-computing).
