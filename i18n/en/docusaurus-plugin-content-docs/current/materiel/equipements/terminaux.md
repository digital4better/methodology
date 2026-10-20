# End-user devices

This chapter covers smartphones, laptops, desktops, tablets and methodologically comparable user devices. It models embodied impacts, operational consumption and allocation between services or activities.

Devices can contribute substantially to consumer and office-service footprints, particularly where manufacturing exceeds operational impacts. The share depends on the scenario rather than a universal percentage.

## Characteristics

| Characteristic | Unit | Default treatment | Purpose |
|---|---|---|---|
| Device type | Category | Documented archetype | Phone, laptop, desktop, tablet |
| Lifetime | Years | Explicit archetype or observed/expected duration | Annual allocation |
| Main configuration | Component inventory | Actual or archetype values | CPU, RAM, storage, display, battery |
| Users | Count | One unless shared | Shared-device allocation |
| Assessed service share | % | Documented estimate or observation | Shared allocation prevents assigning the whole device to every service |
| Usage profile | Operating states | Explicit scenario | Low, average or intensive activity |

## Modelling principle

Representative archetypes fill gaps in detailed inventories. Component models refine them when configuration and suitable coefficients are known.[^model-data]

The model links users to suitable equipment, annualises embodied inventory over its retained lifetime and allocates the appropriate service share. This applies to web, mobile and office use cases.

## Embodied impacts

### Calculation

| Available evidence | Model representation |
| --- | --- |
| Device category or range | Documented equipment factor or archetype. |
| Known main components | Detailed component inventory. |
| Partial configuration | Known components combined with a non-overlapping structural residual. |

Manufacturing can be influential, but its dominance must be checked against actual usage and electricity assumptions.

### When data are missing {#missing-data}

A missing characteristic can be estimated from a device in the same category, range and form factor. Only the missing input is replaced; known characteristics take precedence.

| Situation | Fictional example |
| --- | --- |
| **Starting information** | The laptop has **16 GB RAM and a 512 GB SSD**. Battery capacity is unknown. |
| **Selected reference** | A documented profile for a comparable laptop gives a **50 Wh battery**. This value is hypothetical in this example. |
| **Calculation inputs** | RAM and SSD remain unchanged. The battery uses an **estimated 50 Wh**, without presenting this capacity as a measurement of the actual laptop. |

If only the ‘laptop’ category is known, the calculation can use a complete laptop profile. The profile source and substituted values remain identifiable in the result.

### End of life

Transport, assembly and end-of-life coverage depends on the equipment factor. Missing stages remain explicit where supported factors are unavailable.

## Operational impacts

### Consumption profile

Power depends on device type, workload, screen activity, compute/network use and battery charging. Without measurements, the scenario distinguishes:

<dl className="model-profiles">
  <div><dt>Standby or low activity</dt><dd>The device operates under low demand.</dd></div>
  <div><dt>Average use</dt><dd>The profile represents routine scenario activity.</dd></div>
  <div><dt>Intensive use</dt><dd>The profile represents sustained component activity.</dd></div>
</dl>

### Adjustments

The model accounts for actual operating hours, the service's share, concurrent activities and personal/professional use boundaries. Lifetime affects embodied allocation; it does not directly scale an hour's measured electricity consumption.

## Allocation and annualisation

User devices serve many activities. Embodied inventory is allocated over the retained lifetime and then to the assessed use. Concurrent services need a consistent sharing rule; simply assigning full device time to each can duplicate impacts.

See [Allocation and sharing](../../regles/allocation-et-partage-des-impacts).

<span id="annual-embodied-impacts" />
<span id="operational-scenario-eight-hours-per-day-france" />
<span id="reference-archetype-values" />

## Configuration example {#historical-reference-values}

A fictional laptop assembles the following components. This table uses the same calculation as the illustration, without reusing old equipment flat factors.

| Component | Manufacturing (kg CO₂e) |
|---|---:|
| CPU | 21.77 |
| Memory | 44.46 |
| Storage | 29.56 |
| Display | 40.82 |
| Battery | 3.64 |
| Structure | 8.00 |
| **Total** | **148.26** |

Configuration, assumptions and annual allocation are detailed in [Equipment modelling](../../modelisation/modelisation-d-un-equipement). This partial GWP result is not a validated product LCA. Other indicators remain unassessed for this assembly.

## Assumptions and limitations

### Working assumptions

A representative archetype is preferable to unsupported precision. Lifetime and allocated service share can strongly affect results. Manufacturing is often influential for low-power devices, but its share must be calculated for the assessed boundary.

### Known limitations

Concurrent activities complicate allocation, detailed device inventories are uncommon and real consumption varies with settings and behaviour.

### Improvements

Further improvements involve archetypes matched to actual use, equipment inventories linked to compatible component data, and calibration against identified product LCAs and measurements.

The verified public D4B snapshot does not contain the previously cited generic hardware-device catalogues.

## Interactive example {#simulator}

The simulator combines CPU, RAM, storage, display, battery and structural scenarios. Presets load editable example configurations. These parametric results differ from the aggregate equipment factors above and require calibration before reporting or product comparison.

import { TerminalPlayGround } from '@site/src/components/terminal-playground';

<div className="inline-example">

<TerminalPlayGround lang="en" />

</div>

## Applications

[Web services](../../cas-d-usage/services/service-web), [Native applications](../../cas-d-usage/services/mobile) and [IT fleets](../../cas-d-usage/environnements/parc-informatique).


[^model-data]: Sources include versioned `data/equipment/*`, identified product inventories and Resilio / Aguaro, [Les impacts environnementaux des équipements informatiques](https://alliancegreenit.org/media/ressource-projet-greenit/resilio-aguaro-whitepaper-rdb-vs-pcf-fr-20241025-web.pdf), October 2024. [Digital4Better data catalogue, snapshot 77cae4a](https://github.com/digital4better/data/tree/77cae4a58fadd5deb3b8d4e5577020da08f780d8). References and scope: [Sources and corpus](../../references/sources-et-corpus).
