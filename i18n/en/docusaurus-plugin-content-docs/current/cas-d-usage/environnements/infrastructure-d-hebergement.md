# Hosting infrastructure

This case covers servers, storage and internal networking at a site with a known inventory. The assessment can cover the whole site or resources reserved for a service. The [Cloud](./cloud) case covers public resources whose physical hardware is unknown.

## Prepare the data

| Input | Unit | Boundary |
|---|---|---|
| Inventory and manufacture | Devices, kg CO₂e | Storage and networking equipment included |
| Annual IT energy | kWh | Before site cooling and power losses |
| PUE | Dimensionless | Same site and period as IT energy |
| Resource share reserved for the service | % | Documented allocation, distinct from CPU load |
| Direct water consumption | L/kWh IT | Optional; unknown unless provided |

<span id="understand-the-calculation" />

Total site energy is `IT energy × PUE`. PUE does not multiply manufacture or user-device energy. A whole-site meter already includes auxiliary energy; applying PUE again would count it twice.

## Detailed method from site to service

### Consolidate the physical inventory

The inventory distinguishes servers, storage, network equipment and site installations. Each group has a quantity, period IT energy and per-device manufacture with lifetime. Redundant and standby equipment belongs to provided capacity even with little activity.

$$
I_{service}=a\left[PUE\,f_{electricity}\sum_i q_i E_iT+\sum_i q_iM_i\frac{T}{L_i}\right]
$$

$a$ is a uniform reserved-resource share here. Heterogeneous infrastructure may need separate keys for CPU, RAM, storage and network. Allocations must not exceed total inventory; vacant capacity should remain identifiable.

| Available data | Correct conversion |
|---|---|
| IT equipment energy | Multiplication by compatible site PUE |
| Total site energy | Direct use without another PUE multiplier |
| Power and duration by state | Sum of watts × hours, converted to kWh |
| Service reservation share | Documented key, distinct from CPU utilization |

### Water and other installations

If WUE means liters consumed per IT kWh, $V_{water}=E_{IT}\times WUE$. Interpretation depends on whether the source describes consumption or withdrawal and covers a full year or a season. Direct site water does not replace the water footprint of electricity or manufacture.

### Colocation, sharing and availability

In colocation, a meter may cover a rack, room or entire site. Its boundary must match PUE and the relevant service shares. Low CPU load does not imply zero power: memory, fans, storage and power supplies keep operating.

Reservation-time allocation suits dedicated capacity. Shared capacity requires explicit resource keys and idle allocation. Redundancy ensuring availability belongs to the benefiting service.

Building, UPS and cooling manufacture requires separate inventories and lifetimes. PUE covers their effect on operational electricity, not their manufacture; it does not implicitly include those contributions.

### Check consistency

Reconciliation relates IT totals to meters and site totals to billed consumption, with documented boundaries. Differences in periods or units can explain a discrepancy without an efficiency gain. [Cloud](./cloud) and [virtualization rules](../../regles/prise-en-compte-des-couches-logicielles-et-de-la-virtualisation) describe virtualized hardware.

## Complete the boundary

Manufacture of the building, cooling and backup systems requires a separate inventory. Direct water remains in litres; it cannot be added to a characterized water indicator in equivalent cubic metres. See [Datacenter](../../materiel/reseau-et-infrastructure/datacenter).

<span id="rules-and-sources" />

The result is framed by [boundary and functional unit](../../fondations/perimetre-frontieres-services-tiers-et-unite-d-analyse), [allocation](../../regles/allocation-et-partage-des-impacts) and [double counting](../../regles/double-comptabilisation).

Electricity factors come from the D4B 2025 snapshot[^ref-1]. Prefilled activity and hosting values are exercise assumptions. Factors and conventions are available below the simulator.

<span id="understand-parameter-effects" />

Changing PUE from 1.8 to 1.2 reduces site energy by one third at constant IT energy. Manufacture stays unchanged. A reduction in CPU load alone does not justify a proportional reduction in energy or allocation.

## Interactive example {#explore-your-scenario}

This example applies the calculations and limitations described above.

The prefilled scenario contains ten servers and five switches. Energy and manufacturing values are exercise assumptions.

Ex: ten 400 W servers and five 30 W switches consume `(10 × 0.4 + 5 × 0.03) × 8,760 = 36,354 kWh IT/year`. With PUE 1.8, site consumption is **65,437.2 kWh/year**.

The exercise assumes 275 kg CO₂e manufacture per server, 30 kg per switch and a five-year lifetime. Allocated manufacture is 580 kg/year. With the France 2025 factor, the subtotal is **2,669.22 kg CO₂e/year**.

import { ScenarioPlayground } from '@site/src/components/scenario-playground';

<div className="inline-example">

<ScenarioPlayground kind="hosting" lang="en" />

</div>

[^ref-1]: Digital4Better, [D4B 2025 snapshot](https://github.com/digital4better/data/blob/77cae4a58fadd5deb3b8d4e5577020da08f780d8/data/factor/country-yearly.csv). Snapshot 77cae4a, 2025 data; reviewed 16 October 2026.
