# Assumptions and defaults register

This page centralizes shared numerical assumptions and conventions. It is the single reference register for defaults. A default repeated across chapters must appear here.[^model-data]

## Usage rules

- This register records assumptions shared by multiple chapters.
- Local pages may repeat a value without creating a competing register.
- Associate entries with a source, date and application context.
- Justify revisions; see [Time and versioning](../regles/temporalite-vieillissement-et-versionnement-des-donnees).

## Shared assumptions

### General framework

| Assumption | Value/convention | Source | Application |
|---|---|---|---|
| Methodological perspective | Attributional by default | Digital4Better methodology | All assessments; consequential variants discussed where relevant |
| Environmental indicators | Nine midpoints plus electricity consumption | D4B convention; see [Indicators](../fondations/indicateurs-environnementaux) | All assessments, subject to available compatible factors |
| Source hierarchy | Measurement → primary → provider → literature → generic estimate | [Source hierarchy](../regles/hypotheses-valeurs-par-defaut-et-hierarchie-des-sources) | Selection of assessment data |

### Electricity and energy

| Assumption | Value/convention | Source | Application |
|---|---|---|---|
| Electricity factors | `digital4better/data` preferred | `data/factor/*`, `data/energy/*` | Most robust compatible time resolution; monthly where available, annual otherwise [^source-1]|
| Electricity mix | Consumption-based, including imports/exports | `digital4better/data` | Operational impacts; see the [cloud convention for the renewable share](../cas-d-usage/environnements/cloud.md#electricite-cloud) |
| Generation technologies | Coal, gas, other fossil, wind, solar, bioenergy, hydro, other renewable, nuclear | UNECE; Energy Conversion and Management, 2022 | Country-factor calculation |

### Datacenters and infrastructure

| Assumption | Value/convention | Source | Application |
|---|---|---|---|
| Default PUE | 1.58, historical scenario | Historical Uptime Institute reference; not a verified current mean | When actual PUE is unknown [^source-5]|
| RAM power | 0.000392 kW/GB | Cloud Jewels / Cloud Carbon Footprint | Server component estimate [^source-4]|
| SSD power | 1.2 × 10⁻³ kW/TB | Cloud Jewels / Cloud Carbon Footprint | Server component estimate |
| HDD power | 0.65 × 10⁻³ kW/TB | Cloud Jewels / Cloud Carbon Footprint | Server component estimate |
| Inter-datacenter network | Scenario: 0.001 kWh/GB | Cloud Carbon Footprint Appendix I; inconsistent Gb/GB notation in prose requires clarification | Does not automatically cover LAN or user access |
| Server lifetime for reference VM factors | Five years | NegaOctet / Base Empreinte | Embodied VM factors |

### Networks

| Assumption | Value/convention | Source | Application |
|---|---|---|---|
| D4B network factors | Per-GB·km factors, or per-byte·km before conversion | D4B convention still in use; [network model](../materiel/reseau-et-infrastructure/reseau) | Volume × estimated distance × factor; per-GB illustrations incorporate the route upstream |
| Within-country distance | Estimated country radius: $r=\sqrt{A/\pi}$ | Country-area data and D4B convention | Approximation of national segments |
| Between-country distance | Great-circle route between centroids | Centroid data and spherical geometry | Approximation of international segments |
| Home-router traffic | 220 GB/month | Historical ICT 2020 and ADEME/ARCEP 2022 context | Router allocation within fixed-network factors |
| CDN cache hit rate | 70–90% sensitivity scenarios; historical web example 95% | Unmeasured D4B assumptions | Reduction of traffic after the CDN, not the whole user path |

### Component embodied models

| Component | Equation | GWP coefficients | Source/status |
|---|---|---|---|
| Historical CPU, not complete GPU card | $I=(die_{mm^2}C_{die}+C_{base})F_{node}F_{pkg}$ | $C_{die}=0.0197$ kg CO₂e/mm²; $C_{base}=9.14$ kg CO₂e | Historical UBA/Boavizta coefficients; node/package factors are D4B scenarios |
| RAM | $I=((capacity_{GB}/density)C_{die}+C_{base})F_{pkg}$ per module | $C_{die}=2.20$ kg CO₂e/cm²; $C_{base}=5.22$ kg CO₂e; scenario density 0.625 GB/cm² | UBA historical model; density is not universal |
| SSD | $I=(capacity_{GB}/density_{NAND})C_{die}+C_{base}$ per drive | $C_{die}=2.20$ kg CO₂e/cm²; $C_{base}=6.34$ kg CO₂e; scenario density 48.5 GB/cm² | UBA historical model; density is technology-dependent |
| HDD | $I=31.11$ kg CO₂e per drive | Generic scenario | Green Cloud Computing, UBA, 2021 |
| Display | $I=area_{cm^2}C_{technology}+C_{base}$ | LCD 0.07 kg CO₂e/cm²; OLED 0.12; base 3.0 kg | D4B educational assumption; calibration not established |
| Battery | $I=capacity_{kWh}F_{chemistry}$ | LCO 75; NMC 65; LFP 50 kg CO₂e/kWh | D4B scenarios, not validated by the cited battery publications |

### Semiconductor multicriteria reconstruction

**Status: not validated on 16 October 2026.** Previous AP, WU, PM, IR and ADPe values reconstructed from an Intel inventory are no longer defaults. Reintroduction requires elementary flows, units and compartments, versioned LCIA factors, surface/yield rules and a reproducible calculation. Replaced values remain in refactoring archives.

CPU, RAM and SSD models retain explicitly sourced historical coefficients. Physical water cannot be added to characterized water impacts in m³ equivalents.

### Manufacturing-country scenarios

These countries are sensitivity scenarios, not known locations for every component. Aggregate manufacturing factors cannot be relocated by multiplying by an electricity-mix ratio. Substitution requires an inventory separating electricity from other processes.

| Component | Scenario country | Status |
|---|---|---|
| Advanced logic | Taiwan | D4B assumption; actual fabrication site remains to be established |
| RAM and NAND | South Korea | D4B assumption; actual fabrication site remains to be established |
| Assembly, displays, batteries, PCBs | China | D4B assumption; actual manufacturing site remains to be established |

### CPU/GPU process-node scenarios, $F_{node}$

These are sensitivity assumptions without an identified reproducible imec calibration. They do not demonstrate the environmental performance of a chip generation.

| Node | $F_{node}$ | Status |
|---|---:|---|
| 28 nm | 1.0 | D4B reference scenario |
| 14 nm | 1.2 | Exploratory D4B assumption |
| 10 nm | 1.4 | Exploratory D4B assumption |
| 7 nm | 1.8 | Exploratory D4B assumption |
| 5 nm | 2.2 | Exploratory D4B assumption |
| 4 nm | 2.5 | Exploratory D4B assumption |
| 3 nm | 2.8 | Exploratory D4B assumption |

### Equipment and lifetime

| Assumption | Value/convention | Source | Application |
|---|---|---|---|
| Preferred approach | Component reconstruction where justified by data; documented equipment factors as an alternative | Digital4Better methodology | Representativeness takes precedence over apparent detail |
| Missing data | Measurement → primary → provider → literature → generic estimate | [Source hierarchy](../regles/hypotheses-valeurs-par-defaut-et-hierarchie-des-sources) | Missing parameters |
| Lifetime adjustment | $IF_{emb}=TIF_{emb}\times TL/RL$ | D4B convention | Adjustment of a time-normalized reference factor when actual and reference lifetimes differ |
| vCPU | Relationship to hardware threads depends on offering and architecture | D4B allocation convention | Explicit mapping required for component allocation |

### Current exclusions

| Excluded topic | Reason | Future work |
|---|---|---|
| Videoconferencing | Outside this iteration | Possible later use case |
| Video streaming | Outside this iteration | Possible later use case |
| IoT / embedded systems | Outside this iteration | Possible later use case |

### Historical web-service scenarios

The 69/34 seconds per view and 59% mobile values come from historical references in the web chapter (2023). The historical score uses a different convention: 20 seconds and 58% mobile. None is a guaranteed current average. The internal view-distribution model and conversion of one user-second to one vCPU-second are not validated out of sample and do not replace service measurements. December 2023 tables remain for traceability, with method and unit qualifications.

### Simulators and validation snapshot ; 16 October 2026

| Parameter | Value/rule | Status and provenance |
|---|---|---|
| Simulator electricity | 2025 annual averages, 15 countries in local file | D4B commit 77cae4a[^ref-1], `data/factor/country-yearly.csv`; local selection in `src/data/electricity-factors.json` |
| REF | No automatic reduction of reference mix | Separate sensitivity only; SCI compatibility requires verification |
| WUE | L/kWh IT × IT energy | Physical direct water; distinct from characterized WU |
| IR | Numerical total withheld from equipment simulator | Resolve historical kg/kBq inconsistency from upstream inventories |
| 16:9 display | Area = diagonal² × 2.54² × 144/337 | Exact geometry; diagonal in inches, area in cm² |
| AI compute | 2P per input/output token; 6P per training token, active P | Dense-layer approximation; attention, memory and communication require calibration |
| AI fine-tuning | Training-scale compute scenario | No saving inferred from LoRA trainable fraction alone |
| AI MFU / initial PUE | 0.4 / 1.2 | Scenario assumptions, not provider measurements |
| AI lifetime | 5 × 365.25 × 24 hours | Simulator allocation by active time; reserved-time allocation remains separate |
| AI cache | Residual cost α = 0.1; reuse 0–100% | Assumption applied before time/energy; memory overhead not measured |
| AI hardware | Component power and manufacturing in `src/data/ai-hardware-profiles.json` | Scenarios, not certified LCAs; B300 host memory corrected to 2 TB |
| Battery | Form: LCO 75, NMC 65, LFP 50; documented NMC 811 scenario: 60 kg CO₂e/kWh | Scenarios; water/ADPe withheld without traceable factors |

Local capacity, lifetime, load, density and composition presets are visible in each form. They are editable examples, not equipment recommendations. Process and packaging coefficients remain exploratory until calibration is published.

## Dataset gaps

Further evidence is needed for:

- explicit critical-material inventories.
- upstream semiconductor modeling conventions.
- consistent multicriteria factors for some supporting layers.
- embodied LAN factors in the system approach.

## Assumptions and limitations

- The register is being consolidated and must be updated when a shared assumption changes.
- Defaults are working conventions, not universal facts. Better-matched evidence replaces them when available.
- An unavailable factor is not zero. An exploratory coefficient is not a measured value.

Background for data selection, not validation of default values.

[^source-1]: Digital4Better, [digital4better/data](https://github.com/digital4better/data)Evolving catalogue; pin a commit for reproducible factors.

[^source-4]: [Cloud Carbon Footprint](https://www.cloudcarbonfootprint.org/docs/methodology/) Online documentation, unpinned version.

[^source-5]: [Uptime Institute historical PUE discussion](https://journal.uptimeinstitute.com/global-pues-are-they-going-anywhere/)

[^ref-1]: Digital4Better, [D4B commit 77cae4a](https://github.com/digital4better/data/tree/77cae4a58fadd5deb3b8d4e5577020da08f780d8). Snapshot 77cae4a, 2025 data; reviewed 16 October 2026.

[^model-data]: `digital4better/data`. Methodological corpus. ADEME Base Empreinte. [Digital4Better data catalogue, snapshot 77cae4a](https://github.com/digital4better/data/tree/77cae4a58fadd5deb3b8d4e5577020da08f780d8). References and scope: [Sources and corpus](sources-et-corpus).

<span id="parametres-composants" />

## Component illustration parameters {#component-parameters}

The shared register is versioned `d4b-components-illustration-2026.10.19`. It separates historical coefficients from the assumptions below. Centralisation makes examples consistent; it does not establish scientific calibration.

| Parameter | Exercise value | Scope |
|---|---|---|
| DDR5 RAM | Density 1 GB/cm²; packaging 1.1 | Same formula for RAM, terminal and server examples |
| HBM2e / HBM3 | Densities 0.5 / 0.8; packaging 3 / 3.5 | Exploratory scenarios; interposer counted once |
| Server memory modules | Assumed 32 GB per module | Count rounded up; total capacity preserved |
| Server drives | Assumed 2 TB SSD, 4 TB HDD | Same rule; per-drive constants follow drive count |
| Structural residual | Smartphone 4, tablet 5, laptop 8, desktop 12, server 50 kg CO₂e | Assumptions without overlap with inventoried components |
| Device power | 50% CPU TDP + display + 2 W auxiliary | Exercise model, not measured fleet-average power |
| Server power | CPU/GPU TDP + RAM + storage + 50 W auxiliary | Constant-power scenario before PUE |
| Computer mix | 60% laptop, 40% desktop with display | Active-time weighting, not audience statistics |
| Mobile mix | 95% smartphone, 5% tablet | Same convention |
| Device profile allocation | Calculated manufacture / lifetime / 8,760 h/year | Per-second factor is derived, not copied from old flat factors |

Configurations also describe capacity, component count, display and battery. Unknown properties of actual equipment remain assumptions or unassessed items. Old VM and device factors are historical references, no longer the target model.


Service device profiles use 365 days per year for the per-second factor. Component examples and AI use 365.25 days for annual energy or time allocation. These conventions remain explicit; harmonising them would change results and require a new version.
