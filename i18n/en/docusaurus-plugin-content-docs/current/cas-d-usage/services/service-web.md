# Web service

Assessment of page views over a period distinguishes user devices, network and hosting. Comparisons between versions rely on the same user journey and delivered function.

## Prepare the data

| Input | Preferred measurement | Use in the calculation |
|---|---|---|
| Page views and journeys | Analytics over a representative period | Service units |
| Active time | Observed user journey | Device allocation |
| Transferred bytes | Browser measurements or logs, cache included | Network activity |
| Hosting | Energy and allocated manufacture over the period | Server contribution independent of reading time |

Device profiles can describe a device type or a mobile/computer mix. For audiences spanning different devices or countries, the total is the sum of separately calculated group results. Transfers should include observed third-party resources and requests.

<span id="understand-the-calculation" />

Device energy is `hours × power / 1,000`. Component-based profiles use manufacture already allocated per second. Custom mode allocates per-device manufacture over calendar lifetime. Both conventions are detailed below.

The [D4B network model](../../materiel/reseau-et-infrastructure/reseau) uses per-GB·km factors and estimated segment distances. This page’s illustration accepts a factor already expressed for the route in kg CO₂e/GB, including manufacture and operation. Without a compatible factor, traffic remains known and network impact remains unassessed. This input simplification does not replace the distance-based model.

Hosting uses allocated IT energy and its PUE. That allocation must account for reserved resources while idle.

## Detailed method and special cases

### Build a representative journey

Pages form groups by function and behavior: reading, search, transaction, video or dynamic application. Each group is described by views, active duration, actual transferred bytes and device distribution. Observed cold and warm cache proportions determine their representation in the sample. One home page does not represent an entire service.

import { WebBoundaryFigure } from '@site/src/components/network-illustrations';

<WebBoundaryFigure lang="en" />

### Allocate the device to usage

For $N$ views lasting $t$ seconds, cumulative time is $H=Nt/3600$. A D4B average manufacturing factor $b$ is already in kg CO₂e/s: $I_{manufacture}=Nt\,b$. Electricity is $E=H W/1000$, with $W$ in watts.

The mobile/computer mix weights factors: $b=p b_m+(1-p)b_o$ and $W=p W_m+(1-p)W_o$. $p$ is the mobile share of **active time**. It equals view share only with equal average durations. Otherwise assess groups separately and sum them.

<span id="average-factors-custom-parameters-and-worked-example" />

#### Component-based profiles {#average-factors-custom-inputs-and-example}

These profiles come from illustrative configurations, not measured averages. Manufacturing is calculated by component, then allocated over calendar lifetime. Parameters and limitations appear in the [register](../../references/registre-des-hypotheses-et-valeurs-par-defaut#component-parameters).[^component-profiles]

| Profile | Scenario power (W) | Allocated manufacturing (kg CO₂e/h) |
|---|---:|---:|
| Computer: 60% laptop, 40% desktop | 26.78 | 0.00465 |
| Mobile: 95% smartphone, 5% tablet | 4.85 | 0.00329 |
| Laptop (illustrative configuration) | 17.62 | 0.00338 |
| Desktop with display (illustrative configuration) | 40.53 | 0.00654 |
| Smartphone (illustrative configuration) | 4.73 | 0.00330 |
| Tablet (illustrative configuration) | 7.00 | 0.00297 |

Example: 100,000 views of 60 seconds, with 50% mobile time, give **26.36 kWh** and **6.61 kg CO₂e** of allocated device manufacturing. The electricity factor is then applied to energy.

Custom mode uses device manufacture $M$ and lifetime $L$: $I_{manufacture}=H M/(8760L)$. This replaces the per-second factor; it does not add to it. Electricity still uses active time, not continuous consumption.

### Network, cache, hosting and third parties

Traffic is $G=N\times MB_{view}/1000$. Fixed/cellular share is independent of device type: a phone on Wi-Fi uses the fixed path. Network impact is $G_f f_f+G_c f_c$ when factors cover the selected paths. A segment factor is not a full-path factor; estimated distances belong to the per-GB·km model and are not applied again to a route factor.

Browser caching reduces received bytes; a CDN also changes paths and uses storage and servers. Measured cached bytes include the cache effect once. Hosting uses allocated energy and manufacture over the period. Smaller pages do not demonstrate proportional reductions in those contributions.

For external video, APIs or payments, the boundary covers the delivered function and the provider inventory. Independently calculated impacts can only be added when the same networks, servers and devices are not already included.

### Extrapolate from samples to a period

Journey groups are summed: $I_{service}=\sum_j I_j+I_{shared}$. Shared resources are allocated once. Measurements remain distinct from audience projections. Per-view results require equivalent content and function for comparison; an arbitrary score out of 100 adds no physical precision.

## Limits and details

Prefilled parameters are an exercise. Historical audience prediction, equating reading time with CPU time, and the 0–100 score are not part of this calculation. Their historical versions remain available in v1.

The [Native applications](./mobile) case includes native-app installations and updates. External inference falls within [Generative AI](./ia-generative), with its hosting counted once in the boundary.

<span id="rules-and-sources" />

The result is framed by [boundary and functional unit](../../fondations/perimetre-frontieres-services-tiers-et-unite-d-analyse), [allocation](../../regles/allocation-et-partage-des-impacts) and [double counting](../../regles/double-comptabilisation).

Electricity factors come from the D4B 2025 snapshot[^ref-3]. Prefilled activity and hosting values are exercise assumptions. Factors and conventions are available below the simulator.

<span id="understand-parameter-effects" />


## Interactive example {#explore-your-scenario}

This example applies the calculations and limitations described above.

Ex: 100,000 page views transferring 2 MB each represent **200 GB**. At 60 active seconds per view, device time totals **1,666.67 hours**. This is not server CPU time.

import { ScenarioPlayground } from '@site/src/components/scenario-playground';

<div className="inline-example">

<ScenarioPlayground kind="web" lang="en" />

</div>



[^ref-3]: Digital4Better, [D4B 2025 snapshot](https://github.com/digital4better/data/blob/77cae4a58fadd5deb3b8d4e5577020da08f780d8/data/factor/country-yearly.csv). Snapshot 77cae4a, 2025 data; reviewed 16 October 2026.

[^component-profiles]: D4B convention, illustrative configurations `d4b-components-illustration-2026.10.19`; historical CPU, RAM and SSD coefficients documented by [Boavizta](https://doc.api.boavizta.org/Explanations/components/ram/), other coefficients labelled as assumptions in the register. This source does not validate the DDR5 packaging factor 1.1.
