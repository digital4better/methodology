# Sources and corpus

This page identifies the main source families and explains how the methodology uses them.

## Contributions from product category rules

These five documents inform the method without replacing its structure or calculation conventions. Footnotes on the relevant pages identify the passages used.

| Document reviewed | Contribution | Where the D4B difference is explained |
|---|---|---|
| Digital services PCR, June 2026[^rcp-parent] | Lifecycle, quality, sixteen EF categories | Indicators and data quality |
| Application PCR, June 2026[^rcp-app] | Whole application, software stages, third parties | Boundary and service modelling |
| Cloud PCR, June 2026[^rcp-cloud] | Nested units, allocations, GPU limitation | Cloud use case |
| Information-system PCR, November 2024[^rcp-si] | Annual system, support, professional use | Equipment fleet |
| Internet access PCR, 71-page report[^rcp-fai] | Fixed contribution and variable traffic | Network |

The application PCR cites an April 2025 cloud PCR and a November 2023 version of the Internet access PCR. The cloud report reviewed here is dated June 2026; the Internet access catalogue entry was published in 2023. These version references remain distinct. Numerical examples are not transposed without checking units, boundaries and sums.

This synthesis prioritises additions compatible with D4B. It is neither a PCR compliance statement nor a new version of the calculation engines.

## Documentary corpus {#corpus-local}

The corpus brings together scientific publications, sector methods and provider documentation. It supplements the PCR frameworks and the Digital4Better data catalogue.[^model-data]

The 19 October 2026 review focuses on boundaries, allocations, units and limitations relevant to v2. It is neither validation of every coefficient nor a systematic literature review.

### Corpus contributions and reuse decisions

| Source family examined | Use in the methodology | Reuse limitation |
|---|---|---|
| ADEME GPU 2026, *More than Carbon*, *How Hungry is AI?*, Shift Project | Hardware boundaries, GPU hours, inferred data and deployment effects | No universal per-query result or equivalence between an estimate and a measurement |
| imec.netzero v6.2, annexes and v5.1 review | Processes, packaging, yields and versions | A version-specific review does not validate subsequent versions |
| PAIA, IBM, Dell, Amazon, HPE | PCF interpretation, configurations, phases and uncertainty | No automatic product ranking; source-specific reuse conditions apply |
| UBA Green Cloud Computing, OVHcloud | Components, shared resources and cloud allocation | Reservations, activity and provider conventions remain distinct |
| Lövehagen et al., Resilio/Aguaro, Tannu/Nair and Seagate | Cross-checking data and hardware/storage comparison limits | Samples and differing boundaries prevent a universal average |
| BASF and Pathfinder v2 | PCF traceability and value-chain data | Their carbon boundaries and sector rules do not replace D4B's multicriteria LCA |

References are attached to the relevant statements in each chapter. Sample data do not become default values.

A transcription is not an independent source. Footnote markers, exponents, units and columns may be altered during extraction. An unreadable or inconsistent value remains excluded until it can be checked against the original.

## Source families

Four main families are used:

- methodological frameworks.
- scientific and technical literature.
- open data and factor datasets.
- manufacturer and provider documentation.

## Main reference sources

The principal sources are:

- `digital4better/data`, the canonical repository for data and factors.
- ADEME Base Empreinte, particularly multicriteria factors for equipment and selected digital services.
- sufficiently documented manufacturer data, reviewed critically.
- the scientific and methodological publications cited in the chapters.

## What is used from Base Empreinte

Base Empreinte brings together data and frameworks for LCA and greenhouse gas accounting. For digital assessments, it provides:

- multicriteria equipment factors.
- factors for selected digital services with defined functional units.
- an official reference for some generic estimates.

Review carefully:

- reference quantity.
- implicit lifetime.
- actual coverage.
- compatibility between factors.

## Confidence

Confidence does not depend on a source's reputation alone. It also depends on its fit to the study object, date, traceability, detail and consistency with other evidence.

## Assumptions and limitations

This page provides an overview. The dedicated register records retained values and substitutions.

## Sources

- [digital4better/data](https://github.com/digital4better/data)
- ADEME Base Empreinte

## Targeted review of 16 October 2026

This review addresses topics affecting the models published here. It is not an exhaustive systematic literature review. The review date is an access date; each source's publication date remains separate.

| Source and status | Contribution | Consequence for the methodology |
|---|---|---|
| [SCI for AI, GSF specification](https://github.com/Green-Software-Foundation/sci-ai/blob/main/SPEC.md), ratified December 2025 | Provider/consumer boundaries and AI life cycle | Development, experiments, orchestration and reserved resources included, with consistent functional units |
| [GSF Reference Implementations](https://greensoftware.foundation/articles/introducing-gsf-reference-implementations/), 28 May 2026 | Educational SCI for AI implementation | Implementation and verification resource, not simulator certification |
| [Falk et al., More than Carbon](https://arxiv.org/abs/2509.00093), version 3, December 2025 | Multicriteria LCA of an A100 accelerator | Manufacturing and cross-indicator tradeoffs retained; results specific to the assessed GPU |
| [López-Rauhut et al., Moshi research footprint](https://arxiv.org/abs/2604.11154), preprint, April 2026 | Research activities in a multimodal model's boundary | Experiments and preparation included in model life cycle studies |
| [Boavizta CPU](https://doc.api.boavizta.org/Explanations/components/cpu/), [RAM](https://doc.api.boavizta.org/Explanations/components/ram/), [SSD](https://doc.api.boavizta.org/Explanations/components/ssd/) | Documented parametric equations and coefficients | Explicit surface units, per-module constants and densities; no support for undocumented process-node factors |
| [Boavizta GPU](https://doc.api.boavizta.org/Explanations/components/gpu/) | Accelerator-card decomposition | A complete card cannot be reduced to the historical CPU model; its inventory includes memory, board, cooling and covered life cycle stages |
| [imec SSTS](https://www.imec-int.com/en/expertise/cmos-advanced/sustainable-semiconductor-technologies-and-systems-ssts) | Semiconductor manufacturing process modeling | Simplified D4B multipliers remain assumptions; the presentation does not establish universal process-node calibration |
| [D4B snapshot 77cae4a](https://github.com/digital4better/data/tree/77cae4a58fadd5deb3b8d4e5577020da08f780d8) | Annual electricity factors available for 2025 | Versioned local country snapshot; data year distinct from access date |

Older sources remain useful when they precisely describe an inventory or equation. Their age is a representativeness limitation to document, not an automatic reason for removal. Unreproducible exploratory coefficients are distinguished from published values in the [Assumptions register](./registre-des-hypotheses-et-valeurs-par-defaut).

### Verified public data tree

The tree at commit `77cae4a58fadd5deb3b8d4e5577020da08f780d8` was checked on 16 October 2026. Existing families include `data/ai`, `data/cloud`, `data/country`, `data/energy`, `data/equipment`, `data/facility`, `data/factor`, `data/mix` and `data/transport`. The previously cited `data/hardware` directory does not exist in this snapshot. CPU/accelerator characteristics are under `data/cloud`; detailed terminal inventories and lifetimes need identified sources rather than assumed paths.

[^rcp-parent]: ADEME, [RCP services numériques, version 2, juin 2026](https://librairie.ademe.fr/societe-et-politiques-publiques/9418-methodologie-d-evaluation-environnementale-basee-sur-l-analyse-du-cycle-de-vie-acv-pour-un-service-numerique.html), p. 13–25.

[^rcp-app]: ADEME, [RCP des applicatifs numériques, juin 2026](https://librairie.ademe.fr/economie-circulaire-et-dechets/9434-referentiel-par-categorie-de-produit-rcp-des-applicatifs-numeriques.html), p. 6, 13–16, 54.

[^rcp-cloud]: ADEME, [RCP services cloud et centre de données, juin 2026](https://librairie.ademe.fr/economie-circulaire-et-dechets/6031-referentiel-par-categorie-de-produit-rcp-de-services-cloud-et-de-centre-de-donnees.html), p. 18, 26–64.

[^rcp-si]: ADEME, [RCP des systèmes d’information, mise à jour novembre 2024](https://librairie.ademe.fr/consommer-autrement/6649-referentiel-par-categorie-de-produit-rcp-des-systemes-d-information.html), p. 8–14.

[^rcp-fai]: ADEME, [RCP de la fourniture d’accès Internet, rapport de 71 pages diffusé par l’ADEME (fiche publiée en 2023)](https://librairie.ademe.fr/industrie-et-production-durable/6008-referentiel-par-categorie-de-produit-rcp-de-la-fourniture-d-acces-internet-fai.html), p. 7, 17, 31–32.

[^model-data]: Digital4Better, documentary corpus listed on this page (reviewed 19 October 2026) and [data catalogue, snapshot 77cae4a](https://github.com/digital4better/data/tree/77cae4a58fadd5deb3b8d4e5577020da08f780d8).
