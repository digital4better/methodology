# Processors and accelerators

This chapter covers CPUs, GPUs, NPUs, TPUs and other specialised accelerators. It addresses embodied impacts, operational power and completion rules where specifications are incomplete. The model relies on observed or documented characteristics when available and clearly identified archetypes otherwise.

## Characteristics

| Characteristic | Unit | Treatment | Purpose |
|---|---|---|---|
| Component family | Category | Documented archetype | CPU, GPU or specialised accelerator |
| Model / reference | Identifier | Unknown if unavailable | Map to suitable specifications and inventories |
| Compute units / cores | Count | Model or archetype | Capacity description; not a universal impact factor |
| TDP / rated power | W | Documented specification | Scenario input, distinct from measured average power |
| Associated memory | GB | Exact configuration where possible | Material for accelerators; HBM counted once |
| Die area | mm² | Unknown if unavailable | Semiconductor model input; package area is not interchangeable |
| Component count | Units | Actual count | Scale to equipment configuration |

## Modelling principle

A component model can distinguish configuration and generation where its inputs are supported. A representative aggregate inventory may be preferable when detailed reconstruction is speculative.[^model-data]

| Available evidence | Model representation |
| --- | --- |
| Precisely identified component | Observed or documented model characteristics. |
| Partly identified component | Compatible archetype from the same family. |
| Unknown component, known host | Inference from equipment type and use context. |

See [Semiconductors](../materiaux/semi-conducteurs) and [Equipment modelling](../../modelisation/modelisation-d-un-equipement).

## Embodied impacts

:::caution[Factor status]
Historical GWP, ADP and primary-energy coefficients are documented by Boavizta from Green Cloud Computing. Earlier additional AP, WU, PM and IR coefficients described as an EF reconstruction are not retained: the repository does not establish the elementary flows, compartments, characterisation factors and reproducible calculation needed to support them. A logic-CPU inventory cannot simply be transferred to DRAM or NAND.

Missing factors are data gaps, never zero impacts. Technology and packaging multipliers remain educational scenarios until calibrated. The source's ADP label does not prove equivalence to another dataset's ADPe.
:::

### Parametric formula

<dl className="model-profiles">
  <div><dt>Die area</dt><dd>Silicon area is a key input to the manufacturing model.</dd></div>
  <div><dt>Technology node</dt><dd>The process determines manufacturing steps, energy and water requirements.</dd></div>
  <div><dt>Packaging</dt><dd>Assembly, including advanced packaging, contributes to manufacturing impacts.</dd></div>
</dl>

Technology and packaging multipliers remain scenario assumptions until calibrated. The exploratory model is:

$$
I_{emb}=(S_{die}C_{die}+C_{base})F_{node}F_{pkg}N_{units}
$$

$S_{die}$ is in mm²; $C_{die}$ is impact per mm²; $C_{base}$ is the historical fixed contribution; $F_{node}$ and $F_{pkg}$ are scenario multipliers; $N_{units}$ is component count.

| Indicator | Die coefficient per mm² | Fixed base | Unit |
|---|---|---|---|
| GWP | 1.97E-02 | 9.14 | kg CO₂ eq. |
| Historical ADP | 5.87E-09 | 2.04E-02 | kg Sb eq. |
| Primary energy | 0.265 | 156.0 | MJ |
| Toxicity indicators | No validated coefficient here | ; | Compatible inventory required |

Source: Boavizta CPU methodology[^ref-1], implementing historical Green Cloud Computing coefficients. Node and packaging multipliers below are D4B assumptions, not a verified imec coefficient table.

A multicriteria reconstruction requires a complete inventory, identified LCIA method and reproducible characterisation. It is a research direction, not existing indicator coverage.

### Exploratory node factors {#exploratory-node-factors}

| Scenario node | $F_{node}$ | Status |
|---|---|---|
| 28 nm | 1.0 | Educational reference |
| 22 nm | 1.05 | D4B assumption |
| 14 nm | 1.2 | D4B assumption |
| 10 nm | 1.4 | D4B assumption |
| 7 nm | 1.8 | D4B assumption |
| 5 nm | 2.2 | D4B assumption |
| 4 nm | 2.5 | D4B assumption |
| 3 nm | 2.8 | D4B assumption |

Node names do not fully describe a foundry process. These multipliers establish no universal mapping to EUV, FinFET or GAA. Likewise, a packaging multiplier of 1.5 for an accelerator is a scenario, not an inventory of advanced packaging.

Ex: an 800 mm² scenario with multipliers 2.2 and 1.5 gives $(800\times0.0197+9.14)\times2.2\times1.5=82.17$ kg CO₂ eq. This is not a commercial GPU LCA. The fixed term also means total impact does not scale exactly with die-area ratios.

### Manufacturing geography and electricity {#manufacturing-geography-and-electricity}

The **electricity mix at the manufacturing location** affects the impacts of electricity consumed by the processes. Each process location must come from the component’s supply chain. Countries in the [assumptions register](../../references/registre-des-hypotheses-et-valeurs-par-defaut.md) remain scenarios when this information is missing.

:::note[Example: 100 kWh of manufacturing electricity]
For a process consuming **100 kWh**, two hypothetical locations give the following climate results using D4B’s 2025 average consumption factors.[^electricite-exemple]

| Scenario location | Electricity factor (kg CO₂e/kWh) | Impact for 100 kWh |
|---|---:|---:|
| France | 0.0319271 | **3.19 kg CO₂e** |
| China | 0.589301 | **58.93 kg CO₂e** |

The calculation is **energy × electricity factor**. The 100 kWh is an illustrative assumption, not average consumption per chip. These results cover only electricity for this process, excluding materials, direct emissions and other processes.
:::

Changing the country of use does not change the manufacturing location. Adapting a manufacturing inventory to another country requires separating its electricity consumption: the ratio between two electricity factors does not apply to the component’s total impact. The [electricity impact calculation](../../fondations/impacts-de-la-consommation-d-energie.md#conversion-consommation-electricite-impact-operationnel) describes this calculation for each indicator. IR factor units must be verified before aggregation.

### Reproducible base-model examples

With $F_{node}=F_{pkg}=1$:

| Die area | Count | Calculation | Total embodied GWP |
|---|---|---|---|
| 100 mm² | 1 | $100\times0.0197+9.14$ | 11.11 kg CO₂ eq. |
| 200 mm² | 1 | $200\times0.0197+9.14$ | 13.08 kg CO₂ eq. |
| 400 mm² | 2 | $(400\times0.0197+9.14)\times2$ | 34.04 kg CO₂ eq. |

These illustrate the model rather than commercial products. A full graphics card also contains memory, board, cooling and other assemblies and lifecycle stages. The current Boavizta GPU methodology[^ref-2] models a broader decomposition; a CPU multiplier is not a substitute for it.

### Coverage

| Indicator | Current treatment |
|---|---|
| GWP | Historical CPU model plus exploratory multipliers |
| Historical ADP | Source coefficients; aggregation requires compatibility with other methods |
| Primary energy | Historical model, distinct from final electricity |
| WU | No validated characterised component factor; physical water is not directly additive |
| AP, PM, IR, CTUe, CTUh | Compatible product LCA or inventory needed; whole-equipment factors do not prove a component split |

### When data are missing {#completing-missing-specifications}

The exact component reference is sought first. If unavailable, a characteristic may be borrowed from a neighbouring model in the same family, generation and range. This choice needs justification: matching core counts do not prove that two chips are equivalent.

| Situation | Fictional example |
| --- | --- |
| **Starting information** | The CPU has **16 cores** and a known generation. Its exact reference and silicon area are unknown. |
| **Selected reference** | A comparable CPU has a die area of **200 mm²**. This area is hypothetical in this example. |
| **Calculation inputs** | The formula uses an **estimated 200 mm²** die area. The 16 cores remain known data; they were not used to calculate that area. |

If no neighbouring model is suitable, a documented family profile can be used, followed by a documented median or precautionary assumption as a last resort. Without justification, the input remains missing. A CPU profile cannot replace a GPU profile.

### End of life

End-of-life coverage depends on the selected embodied inventory. It is not separately established for every processor here. Historical component factors do not necessarily share the same lifecycle boundary.

## Operational impacts

### Power profile

<dl className="model-profiles">
  <div><dt>CPU</dt><dd>Power often varies between idle, intermediate and high-load operation.</dd></div>
  <div><dt>GPU</dt><dd>Sustained computation can bring power closer to the rated value.</dd></div>
  <div><dt>Specialised accelerators</dt><dd>Profiles may be steadier but remain strongly task-dependent.</dd></div>
</dl>

Power varies by workload, scheduling and power state. Where no representative curve is available, the scenario identifies the rated-power proxy, load assumptions and operating duration. TDP is not a measured wall-power average.

### Adjustments

The assessment covers utilisation, workload efficiency, host-resource sharing and site overhead. MFU relates model arithmetic work to theoretical throughput; it is not directly a fraction of TDP. PUE applies once at the correct IT/site boundary; quantities already containing it require no further multiplier.

## Allocation and annualisation

Processors normally belong to a host device and support multiple workloads. Manufacturing allocation depends on retained lifetime, observation time and resource share. CPU-hours, GPU-hours or reserved capacity can provide suitable allocation quantities, but their meanings must remain consistent.

See [Allocation and sharing](../../regles/allocation-et-partage-des-impacts).

## Assumptions and limitations

Documented specifications can support a scenario; they do not validate every environmental coefficient. Representative archetypes are preferable to arbitrary values. Real power varies with software and load. Embedded memory, advanced packaging and cooling may be poorly isolated, and some inventories remain whole-equipment aggregates.

Further work should connect component specifications to process inventories, improve specialised-accelerator data, measure workload power profiles and calibrate the existing exploratory simulator.

## Interactive example {#simulator}

import { CpuPlayGround } from '@site/src/components/cpu-playground';

<div className="inline-example">

<CpuPlayGround lang="en" />

</div>

## Applications

[Generative AI](../../cas-d-usage/services/ia-generative), [cloud](../../cas-d-usage/environnements/cloud), and [servers](../equipements/serveurs).

[^ref-1]: [Boavizta CPU methodology](https://doc.api.boavizta.org/Explanations/components/cpu/). Online documentation, unpinned version.

[^ref-2]: [Boavizta GPU methodology](https://doc.api.boavizta.org/Explanations/components/gpu/). Online documentation, unpinned version.

[^model-data]: Versioned `data/cloud/cpus.*` and `data/cloud/accelerators.*` in Digital4Better data; Boavizta methods cited above; publications including Green Cloud Computing, GPU LCA material and the multicriteria A100 lifecycle study. [Digital4Better data catalogue, snapshot 77cae4a](https://github.com/digital4better/data/tree/77cae4a58fadd5deb3b8d4e5577020da08f780d8). References and scope: [Sources and corpus](../../references/sources-et-corpus).

[^electricite-exemple]: Digital4Better, [country electricity factors, year 2025](https://github.com/digital4better/data/blob/77cae4a58fadd5deb3b8d4e5577020da08f780d8/data/factor/country-yearly.csv), snapshot `77cae4a`, GWP, FR / CN.
