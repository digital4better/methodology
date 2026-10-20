# Semiconductors

Chip mass alone cannot predict environmental impact. Cleanrooms, process energy, gases, chemicals and manufacturing yield can contribute substantially. This chapter explains those mechanisms without treating an industry average as an inventory for every chip generation.[^ref-2][^ref-6]

## Why processes matter

Manufacturing repeats deposition, lithography, etching, doping, cleaning and metallisation under controlled conditions. Requirements depend on the technology and factory. Ultrapure water must be produced and treated. Gas inventories must include emissions and abatement. Process-step count and manufacturing time are not universal constants.

## Reported manufacturing intensities

### Per square centimetre

Wang et al. analyse 2021 disclosures from 28 companies. Their reported averages are **8.22 L water, 1.15 kWh energy and 0.84 kg CO₂ eq. per cm²**. These are reporting-boundary ratios, not a complete die LCA or characterised WU factor. Wang et al., 2023[^ref-1].

For a 300 mm wafer's geometric area of approximately 707 cm², multiplication gives about 5,800 L, 810 kWh and 590 kg CO₂ eq. This arithmetic does not adjust for yield or convert physical water to scarcity impact. An 800 mm² die is 8 cm², approximately 1/88 of that geometric area before edge losses and defects.

### Front-end and back-end

```mermaid
flowchart LR
    W[Silicon substrate / wafer] --> FE[Front-end: patterning, doping, metallisation]
    FE --> BE[Back-end: cutting, assembly, packaging, testing]
    BE --> C[Finished component]
```

| Stage | Historical GWP share | Water share | Energy share | Processes |
|---|---|---|---|---|
| Front-end | About 80% | About 90% | About 86% | Process gases, cleanroom electricity, water |
| Back-end | About 20% | About 10% | About 14% | Assembly, testing, substrates and packaging |

These are historical indicative splits requiring reconstruction from the Intel inventory in Green Cloud Computing. They are not universal coefficients or validated shares for all processes.

### Technology-node scenarios

The following historical assumptions are retained for traceability, not as a universal imec table or a monotonic law connecting commercial node names to impacts.[^ref-4]

| Scenario node | Assumed process-step count | Assumed energy/water trend |
|---|---|---|
| 28 nm | About 500 | Reference |
| 14 nm | About 700 | +30–50% |
| 7 nm | About 900 | +60–80% |
| 5 nm | About 1,000 | Twice the reference |
| 3 nm | About 1,200 or more | 2.5 times or more |

EUV and multiple-patterning choices change equipment, passes, materials and energy. A source's rated power does not represent a whole scanner or fabrication line. Node name alone does not establish EUV use. A comparison requires complete inventories with matched functional units and yield assumptions.

### Advanced packaging

Chiplets, interposers, through-silicon vias and stacked memory add processes and materials. The following percentage increments are **D4B exploratory assumptions**:

| Packaging scenario | Assumed complexity | Historical assumed increment | Example context |
|---|---|---|---|
| Wire bonding | Lower | Reference | Some conventional components |
| Flip-chip | Intermediate | +10–20% | CPU/GPU packaging |
| 2.5D interposer | Higher | +30–50% | Some datacentre accelerators |
| 3D / stacked memory | Higher | +50–100% | HBM and accelerator integration |

These are not factors directly extracted from imec or the packaging publication cited below. A study of packaging supports analysing that stage separately, not transferring one percentage to every chip.

## Multicriteria interpretation

| Indicator | Relevant inventory pathways |
|---|---|
| GWP | Fluorinated process gases, their abatement and electricity |
| WU | Withdrawal, physical consumption and characterised water impact are distinct quantities |
| ADPe | Materials, substrates and upstream extraction flows |
| CTUe / CTUh | Acids, solvents and other process emissions with defined compartments |
| AP | Acidifying emissions from processes and energy supply |
| PM | Combustion and other upstream processes |
| IR | Manufacturing electricity can contribute; missing data do not prove a small impact |

Two components with similar GWP may differ on water or resource indicators. Evaluate basin, period, electricity and process separately; a country does not have a uniform water-stress level.

Packaging needs its own inventory; an integration process does not establish a universal impact multiplier.[^ref-3]

## Relationship to downstream models

This explanatory layer does not add a separate operational term on top of the component. It helps explain why low-mass components can have substantial manufacturing impacts, why a complete GPU with memory and cooling has a broader boundary than a CPU die, and why process generation and multicriteria assessment matter.[^ref-5][^model-data]

See [Processors and accelerators](../composants/processeurs-et-accelerateurs), [RAM](../composants/memoire-vive) and [Generative AI](../../cas-d-usage/services/ia-generative).

### What imec.netzero covers {#what-imecnetzero-covers-in-the-working-corpus}

Methodology v6.2 distinguishes chip manufacturing, assemblies of dies and their packaging. Results depend on the process, area, manufacturing yield and production location. Per-wafer, per-die and per-system units describe different objects; a packaged chip system is not a complete GPU card.[^corpus-imec]

The release history records the addition of sixteen EF 3.1 categories in v6.1 and process revisions in v6.2. This does not automatically provide compatible factors for D4B's nine indicators. The May 2025 review covers v5.1 and limits detailed verification to selected examples; it does not certify subsequent versions.[^corpus-imec]

These documents clarify boundaries and required data. They do not calibrate the exploratory D4B multipliers presented here.

## Assumptions and limitations

This is not an autonomous wafer-to-die calculation chain. Reported industry ratios have different boundaries from product inventories. Variation between factories, processes and device families can be substantial. No universal factor set is established by the cited studies. Yield, substrates, gases, abatement and packaging require explicit inventories.

[^ref-1]: [Wang et al., 2023](https://doi.org/10.1016/j.watcyc.2023.01.004).

[^ref-2]: Kuo et al., 2022, Assessing environmental impacts of nanoscale semiconductor manufacturing. [Assessing environmental impacts of nanoscale semiconductor manufacturing](https://doi.org/10.1016/j.resconrec.2022.106289).

[^ref-3]: Ouattara et al., 2026, Towards cleaner semiconductor packaging, for packaging context; no universal percentages claimed. [Towards cleaner semiconductor packaging](https://doi.org/10.1016/j.clwas.2025.100467).

[^ref-4]: imec Sustainable Semiconductor Technologies and Systems. [imec Sustainable Semiconductor Technologies and Systems](https://www.imec-int.com/en/expertise/cmos-advanced/sustainable-semiconductor-technologies-and-systems-ssts). Online documentation, unpinned version.

[^ref-5]: Boavizta CPU explanations. [Boavizta CPU explanations](https://doc.api.boavizta.org/Explanations/components/cpu/). Online documentation, unpinned version.

[^ref-6]: Villard et al., Drawing a chip environmental profile. [Drawing a chip environmental profile](https://doi.org/10.1016/j.jclepro.2014.08.061).

[^corpus-imec]: imec, [imec.netzero](https://netzero.imec-int.com/), *Life cycle assessment methodology*, v6.2, 30 mars 2026, § 3.2–3.3 et 5.2 ; *Annex 2, Release History*, entrées v6.1–v6.2. M. Proske et al., *LCA review*, 13 mai 2025, § 1, version revue 5.1_rev du 30 avril 2025.

[^model-data]: The model relies on versioned D4B CPU/accelerator specifications and compatible process inventories. The contextual studies are cited beside the relevant explanations. [Digital4Better data catalogue, snapshot 77cae4a](https://github.com/digital4better/data/tree/77cae4a58fadd5deb3b8d4e5577020da08f780d8).
