# Datacentres

import { MethodIllustration } from '@site/src/components/method-illustrations';

A datacentre combines IT equipment, internal networking, technical infrastructure, cooling, electricity supply and geography. An assessment may cover the whole site or an explicitly allocated part, using equipment, component or system models.

The intended boundary includes embodied inventories and operational resources. Current component simulators do not establish a complete building or site LCA; omitted infrastructure must remain explicit.

## Characteristics

| Characteristic | Unit | Treatment | Purpose |
|---|---|---|---|
| Model | Approach | Equipment, components or system factor according to evidence | Calculation structure |
| PUE | Ratio | Site-period value, otherwise disclosed assumption | Total site energy relative to IT energy |
| REF | % | Unknown if undocumented | Renewable-energy information; not an automatic impact discount |
| Electricity location | Country / grid region | Actual site location | Electricity-factor selection |
| Period | Day, month, year | Observed activity period | Consistent energy and factors |
| Site configuration | Inventory | Documented archetype if unavailable | Servers, storage, network and support equipment |

## Modelling principle

A datacentre includes computing, storage, networking, cooling, security and power infrastructure.[^model-data]

| Available evidence | Model representation |
| --- | --- |
| Reliable physical inventory | Equipment approach: aggregate known equipment. |
| Known component quantities, unknown devices | Component approach: aggregate documented unit resources. |
| Compatible aggregate factor only | System approach: factor matching the assessed boundary. |

## Embodied impacts

### Calculation

An equipment approach sums non-overlapping inventories following [Equipment modelling](../../modelisation/modelisation-d-un-equipement#impacts-equipement).

System factors describe a defined boundary, often with specific geography, duration and functional units. Some cover storage more readily than computation; none should be extended to another function without justification.

A component approach combines CPU, GPU, memory, storage, network and structural contributions. Building, cooling equipment and electrical infrastructure require separate inventories when not already included. PUE does not account for their manufacturing.[^ref-1]

### When data are missing {#missing-inputs}

Calculation detail depends on the available inventory. Component quantities support a partial calculation even without server model references. They do not reveal the remaining equipment or site energy efficiency.

| Situation | Fictional example |
| --- | --- |
| **Starting information** | The provider reports **8 CPUs and 512 GB RAM**. Storage, networking and PUE are undocumented. |
| **Selected reference** | Compatible factors are available **for these CPUs and memory**. No reference supports completing the other contributions. |
| **Calculation inputs** | The calculation covers **known components**. Storage, networking and structures remain unassessed; **PUE remains unknown**. The result is a subtotal, not a complete site footprint. |

A reliable equipment inventory takes precedence. If component reconstruction is too uncertain, a compatible aggregate service factor can be used for the assessed boundary and unit. It replaces the calculation of that same boundary rather than being added to it. Unknown PUE, WUE and REF are not replaced with zero.[^ref-2]

### End of life

Coverage depends on each equipment or system factor. This iteration has no separate complete site end-of-life model; that gap remains explicit where relevant.

## Operational impacts

### PUE boundary

[Power Usage Effectiveness](../../references/glossaire#pue-power-usage-effectiveness) is:

$$
PUE=\frac{E_{datacentre}}{E_{IT}}
$$

Both energies refer to the same site boundary and period. IT includes all relevant computing, storage and networking equipment, not servers alone.

When the input excludes site overhead:

$$
E_{site}=E_{IT}\times PUE
$$

A total site-meter reading or a factor already including overhead requires no further PUE multiplier.

<MethodIllustration kind="pue" lang="en" />

### Component electricity {#component-electricity}

$$
E_{IT}=E_{components}+E_{network}
$$

For a simplified component model:

$$
\begin{aligned}
E_{components}&=D_{usage}(P_{cpu}+P_{gpu}+P_{ram}+P_{storage})\\
P_{cpu}&=N_{vcpu}\left(P_{cpu,min}+\tfrac12(P_{cpu,max}-P_{cpu,min})\right)\\
P_{gpu}&=N_{gpu}\left(P_{gpu,min}+\tfrac12(P_{gpu,max}-P_{gpu,min})\right)\\
P_{ram}&=N_{ram}\times0.000392\\
P_{storage}&=\begin{cases}1.2\times10^{-3}V_{storage}&\text{SSD}\\0.65\times10^{-3}V_{storage}&\text{HDD}\end{cases}
\end{aligned}
$$

Power in kW multiplied by duration in hours gives kWh. $N_{ram}$ is decimal GB and $V_{storage}$ decimal TB. CPU coefficients must represent the physical share per vCPU. The midpoint CPU/GPU equations assume 50% load and are not measured profiles. Historical average power coefficients do not represent every device.

Missing power supplies, fans and boards complete partial estimates; a complete AC measurement already includes them. Electricity conversion relies on compatible [electricity impact factors](../../fondations/impacts-de-la-consommation-d-energie).

### Site parameters and renewable-energy claims {#site-parameters-and-renewable-energy-claims}

PUE, electricity geography, load, resource sharing and supplier reporting periods affect interpretation. WUE describes a separate water quantity. REF must be interpreted within its documented supply boundary.

The reference result uses the site's average consumption electricity mix. REF does not automatically reduce it. The historical interpolation below is only a **separate sensitivity scenario**, requiring complementary supply shares and compatible factors:[^ref-3]

$$
I_{operational_{i,p}}=E_{elec_p}\left(REF\times RIF_{i,p}+(1-REF)\times IF_{i,p}\right)
$$

$E_{elec_p}$ is kWh in location $p$; factors are in $U_i/\text{kWh}$. REF is a fraction from zero to one: 80% means 0.8. Unknown remains unknown.

A national mix already contains renewables. Interpolating it with a renewable-only mix does not establish a verified physical supply mix. This sensitivity is not an SCI calculation. Purchase certificates do not justify zero factors or automatic reductions across all indicators.

### Direct water and electricity-related water

For site WUE in litres per IT kWh:

$$
V_{direct}\,[L]=WUE\,[L/kWh_{IT}]\times E_{IT}\,[kWh]
$$

Direct water uses IT energy without another PUE multiplier. Electricity-related water depends on total site energy. Aggregation into WU requires characterisation compatible with the method and geography.

<MethodIllustration kind="water" lang="en" />

## Allocation and annualisation

Shared site impacts can be allocated by reserved capacity, consumed resources or a suitable functional quantity. These choices require explicit treatment of idle capacity and supporting resources.

Annualisation uses equipment lifetimes and the assessed period. See [Allocation and sharing](../../regles/allocation-et-partage-des-impacts).

## Assumptions and limitations

### Working assumptions

A representative observed PUE is preferable to an undocumented generic value. Component reconstruction is useful only with defensible inputs. A datacentre is broader than a single server or application.

### Known limitations

PUE, WUE and REF may be disclosed at different geographic and temporal scales. Review supplier statements against their actual boundaries. A detailed component model cannot compensate for missing building or technical-infrastructure inventories.

### Improvements

Expand site data and archetypes and reconcile equipment, component and system approaches with consistent boundaries.

## Interactive example {#simulator}

This exploratory simulator models a **physical server configuration** and electricity overhead through PUE and the usage-country mix. It does not calculate a whole datacentre inventory or automatically allocate a VM share.

import { ScenarioPlayground } from '@site/src/components/scenario-playground';

<div className="inline-example">

<ScenarioPlayground kind="hosting" lang="en" />

</div>

## Applications

[Hosting infrastructure](../../cas-d-usage/environnements/infrastructure-d-hebergement), [cloud](../../cas-d-usage/environnements/cloud), and [generative AI](../../cas-d-usage/services/ia-generative).

[^ref-1]: The Green Grid PUE definition. [The Green Grid PUE definition](https://www.thegreengrid.org/node/372).

[^ref-2]: The Green Grid WUE paper. [The Green Grid WUE paper](https://www.thegreengrid.org/system/files/store/WUE_v1.pdf).

[^ref-3]: SCI specification for electricity and allocation boundaries. [SCI specification](https://sci.greensoftware.foundation/). Online documentation, unpinned version.

[^model-data]: Versioned `data/cloud/*`, `data/factor/*`, `data/energy/*` and identified site inventories; publications including Green Cloud Computing and the OVHcloud environmental-impact tracker methodology. [Digital4Better data catalogue, snapshot 77cae4a](https://github.com/digital4better/data/tree/77cae4a58fadd5deb3b8d4e5577020da08f780d8). References and scope: [Sources and corpus](../../references/sources-et-corpus).
