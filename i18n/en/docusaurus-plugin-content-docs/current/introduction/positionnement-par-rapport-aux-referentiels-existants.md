# Positioning against existing frameworks

This method retains its foundations, rules, models, hardware and use-case structure. PCRs specify assessment requirements for a defined boundary; D4B uses them to improve its framework and make its choices explicit, without claiming overall compliance.[^source-2]

## Framework map

Digital environmental assessment includes several complementary approaches[^model-data]:

| Framework | Coverage | Strengths | Boundaries and limitations |
|---|---|---|---|
| **ADEME / ARCEP product category rules** | French digital services | Official framework, multiple indicators, three tiers | Limited granularity for some equipment; French context |
| **Boavizta** | Hardware components and equipment | Detailed decomposition, open source | Partial use-case coverage; service scope needs additional definition [^source-1]|
| **GreenIT** | Awareness and practical use cases | Accessible explanations and digital sufficiency | Document types and methods vary by publication |
| **Green Software Foundation SCI** | Software carbon intensity | Explicit boundaries and functional unit | Carbon only; hardware manufacturing included through allocation |
| **PAIA, MIT** | Consumer electronics | Parametric product modeling | Product-centered rather than service-centered |
| **imec NetZero** | Semiconductors and components | Manufacturing process detail | Specialized; applicability depends on access and available inventories [^source-5]|
| **Cloud Carbon Footprint** | Cloud infrastructure | Component energy coefficients, open source | Carbon-centered and cloud-focused [^source-3]|
| **UBA Green Cloud Computing** | Cloud and datacenters | Virtual-resource allocation, multiple indicators | German and datacenter context |

This map describes complementary uses, not a precision ranking or certification of compliance. The [dated source review](../references/sources-et-corpus) identifies recent contributions including SCI for AI and component models.

## What is adopted

| Framework | Contributions adopted in this methodology |
|---|---|
| <span id="from-ademe--arcep" /> **ADEME / ARCEP** | **LCA framing** based on ISO 14040/14044. A **multicriteria** perspective, with nine D4B indicators and an [explicit mapping to the 2026 PCR](../fondations/indicateurs-environnementaux.md). Three tiers: user devices, networks and computing centres. Equipment or system approaches according to control over the scope. |
| <span id="from-boavizta" /> **Boavizta** | **Materials → components → equipment** decomposition and component-to-equipment modelling. Distinction between explanatory models and generic factors. Transparent data and **open source**. |
| <span id="from-uba-green-cloud-computing" /> **UBA Green Cloud Computing** | **Virtual-resource allocation** using vCPU, vDisk and vNIC. Supporting infrastructure, including cooling and PUE, accounted for through documented allocation. Multiple indicators: GWP, ADP, cumulative energy demand and water. |
| <span id="from-the-green-software-foundation-sci" /> **Green Software Foundation (SCI)** | **Explicit boundaries** and a unit of analysis related to the function delivered. Connection between usage, infrastructure and impact. |
| <span id="from-greenit" /> **GreenIT** | **Practical use cases** and user journeys. Sufficiency as a reduction strategy. Explanations accessible beyond LCA specialists. |

## What is adapted

| Topic | Relationship with the PCRs | D4B choice retained |
|---|---|---|
| Boundary | Whole application and explicit study period | Page, session or request calculations, to be aggregated |
| Indicators | Sixteen EF categories in the 2026 parent PCR | Nine indicators, with coverage and gaps stated |
| Network | Fixed and variable contributions in Internet access/application PCRs | Per-GB example; difference documented |
| Cloud | Service-unit factors and specific allocation rules | Resource estimates where appropriate, without automatic equivalence |
| Quality | Six criteria in the parent PCR | Separate D4B grid with an explicit mapping |
| AI | Application time boundary differs from model lifecycle | Training, media and limitations retained |

These differences are detailed on the relevant pages. Compatible documentation additions can be incorporated directly. Changes to formulas, factors or scores require a separate analysis of their effects on results.[^rcp-parent][^rcp-app]

## Distinctive organization

1. A modular architecture for discovery, scoping and implementation.
2. One central assumptions and defaults register.
3. An explicit link to the versioned canonical `digital4better/data` repository.[^ref-1]
4. A hardware chain from materials to components, equipment, infrastructure and services.
5. Visible allocation, double-counting, robustness and time conventions.

## Assumptions and limitations

- This is an editorial and methodological positioning, not an exhaustive normative comparison.
- Convergences and differences should be revisited as frameworks evolve.
- Specialized frameworks such as PAIA and imec are only partially reflected here.

[^rcp-parent]: ADEME, [RCP services numériques, version 2, juin 2026](https://librairie.ademe.fr/societe-et-politiques-publiques/9418-methodologie-d-evaluation-environnementale-basee-sur-l-analyse-du-cycle-de-vie-acv-pour-un-service-numerique.html), p. 13–25.

[^rcp-app]: ADEME, [RCP des applicatifs numériques, juin 2026](https://librairie.ademe.fr/economie-circulaire-et-dechets/9434-referentiel-par-categorie-de-produit-rcp-des-applicatifs-numeriques.html), p. 13–16, 24–35, 54.

[^source-1]: [Boavizta documentation](https://doc.api.boavizta.org/) Online documentation, unpinned version.

[^source-2]: [Green Software Foundation SCI](https://sci.greensoftware.foundation/) Online documentation, unpinned version.

[^source-3]: [Cloud Carbon Footprint](https://www.cloudcarbonfootprint.org/docs/methodology/) Online documentation, unpinned version.

[^source-5]: [imec SSTS](https://www.imec-int.com/en/expertise/cmos-advanced/sustainable-semiconductor-technologies-and-systems-ssts) Online documentation, unpinned version.

[^ref-1]: Digital4Better, [`digital4better/data`](https://github.com/digital4better/data).Evolving catalogue; pin a commit for reproducible factors.

[^model-data]: Reference corpus: Pathfinder Framework, Green Cloud Computing (UBA, 2021) and PAIA; Boavizta and SCI documentation. Versions and boundaries are detailed in [Sources and corpus](../references/sources-et-corpus).
