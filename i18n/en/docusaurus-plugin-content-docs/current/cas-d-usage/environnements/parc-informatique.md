# IT fleet

import { MethodIllustration } from '@site/src/components/method-illustrations';

A fleet assessment adds the equipment present over a period, its allocated manufacturing impact and its electricity consumption. The physical inventory forms the basis: a virtual machine is not an additional device.

## Prepare the data

| Input | Where to find it | What to check |
|---|---|---|
| Device count and model | Inventory, CMDB | Presence over the period, shared equipment |
| Manufacture per device | Product LCA or documented model | Covered phases and indicators |
| Lifetime | Replacement records | Observed duration or explicit assumption |
| Annual electricity | Metering or power × time | Active, standby and off states |

<span id="understand-the-calculation" />

For each equipment family:

- allocated manufacture = count × manufacture per device × period / lifetime.
- electricity = count × annual energy per device × period.
- use-phase impact = electricity × country electricity factor.

## Detailed inventory and allocation method

The inventory describes family, quantity, use location, commissioning date, lifetime and energy data. Each group contains devices with compatible factors. Product-specific data may replace a family average after checking included phases and units.

For a period $T$ in years and groups $i$:

$$
I_{fleet}=\sum_i q_i\left(M_i\frac{T_i}{L_i}+E_iT_i f_i\right)
$$

$q_i$ is quantity, $M_i$ manufacture/device, $L_i$ lifetime, $E_i$ annual energy and $T_i$ time present in the period. The simulator assumes every group is present for the same $T$; different dates require separate inventories.

| Situation | Treatment |
|---|---|
| Device introduced during the year | Prorate presence and energy or use measured consumption |
| Stored or standby device | Manufacturing remains allocated; energy depends on actual state |
| Refurbished device | Explicit first life, refurbishment and transfer convention; manufacture is not assumed zero |
| External display | Separate contribution only when excluded from the workstation factor |
| Shared server or network | One allocation among benefiting services |

### Operating states and replacement

Without annual measurements, $E=\sum_s W_s h_s/1000$ adds active, standby and off-state consumption. Durations cover the whole period; powers describe each state rather than just nominal power.

<MethodIllustration kind="operating-states" lang="en" />

Longer lifetime reduces annualized manufacture in attributional accounting. It does not itself measure physically avoided production. A replacement assessment covers an equal service period, including consumption, repair and potential performance differences.

This allocation differs from annual purchasing accounts, which assign manufacture at acquisition. They answer different questions and should not be added together.

Factor boundaries determine the treatment of end of life, transport and maintenance. Missing data remains visible. Indicators have distinct interpretations: manufacturing and use contributions vary by electricity mix and impact category.

## From the equipment fleet to the information system

The equipment fleet is one part of the information system. The information-system PCR assesses an organisation's system over one year, including outsourced services and support resources. It includes travel by people contributing to the system. Customer-facing services require a separate assessment: their boundary differs from the internal information system.[^rcp-si]

The simulator remains a fleet example. Widening the study includes cloud, software, networks and support in the inventory, with overlaps removed for equipment already counted. Exclusions specific to the information-system PCR do not automatically apply to an application or web service.

### Shared devices and reuse

The information-system PCR proposes professional-use shares of 57% for BYOD and 85% for COPE; the latter is described as an incentive convention. These are not universal physical measurements and do not become D4B defaults. The professional-use share and its source form part of the documented assumptions.

For refurbished equipment, a documented first life can contribute to total lifetime. A possible future life needs supporting evidence: assumed reuse is insufficient to reduce allocated manufacturing.

## Complete the boundary

Server room cooling is excluded. The [Hosting](./infrastructure-d-hebergement) case covers that contribution, with each server counted once. For equipment present for six months, the assessment period or allocation share reflects that presence. Storage without use does not remove its allocated manufacture.

<span id="rules-and-sources" />

The result is framed by [boundary and functional unit](../../fondations/perimetre-frontieres-services-tiers-et-unite-d-analyse), [allocation](../../regles/allocation-et-partage-des-impacts) and [double counting](../../regles/double-comptabilisation).

Electricity factors come from the D4B 2025 snapshot[^ref-1]. Prefilled activity and hosting values are exercise assumptions. Factors and conventions are available below the simulator.

<span id="understand-parameter-effects" />

Increasing laptop lifetime decreases annual allocated manufacture; electricity stays unchanged if usage is identical. This is a lifetime allocation calculation. It does not, by itself, measure emissions avoided by postponing a purchase.

import { InlineAllocationExample } from '@site/src/components/inline-allocation-example';

<InlineAllocationExample lang="en" />

## Interactive example {#explore-your-scenario}

This example applies the calculations and limitations described above.

The simulator starts with a fictional business: 50 laptops, 30 displays, 50 smartphones, three switches and two servers. Manufacturing values are exercise inputs, not recommended factors.

Ex: 50 laptops with 200 kg CO₂e manufacturing impact and a five-year lifetime account for `50 × 200 / 5 = 2,000 kg CO₂e/year`. At 70.4 kWh per laptop per year, electricity consumption is `3,520 kWh/year`.

With the prefilled inventory and the France 2025 factor, the subtotal is **4,133.67 kg CO₂e/year**: 3,795 kg allocated manufacture and 338.67 kg electricity.

import { ScenarioPlayground } from '@site/src/components/scenario-playground';

<div className="inline-example">

<ScenarioPlayground kind="fleet" lang="en" />

</div>

[^rcp-si]: ADEME, [RCP des systèmes d’information, mise à jour novembre 2024](https://librairie.ademe.fr/consommer-autrement/6649-referentiel-par-categorie-de-produit-rcp-des-systemes-d-information.html), p. 8–14.

[^ref-1]: Digital4Better, [D4B 2025 snapshot](https://github.com/digital4better/data/blob/77cae4a58fadd5deb3b8d4e5577020da08f780d8/data/factor/country-yearly.csv). Snapshot 77cae4a, 2025 data; reviewed 16 October 2026.
