# Cloud

import { MethodIllustration } from '@site/src/components/method-illustrations';

The calculation starts with reserved resources and provider usage data. It converts activities into energy and allocated manufacture. Financial cost is not a physical unit: discounts and taxes do not add consumption.

## Prepare the data

| Resource | Data to collect | Conversion |
|---|---|---|
| VM or container | Count, vCPU, RAM, hours | vCPU.h and GB RAM.h |
| Storage | Physical capacity and duration | GB.h, copies included once |
| Function | Runtime, invocations, reserved resources | Provider-specific documented mapping |
| Managed service | Technical units or architecture | Explicit unobservable resources |

A function can be assessed after a documented conversion into resource-time quantities; there is no universal per-invocation factor.

<span id="understand-the-calculation" />

IT energy is the sum of `resources × hours × unit power`. Multiplication by PUE and the electricity factor for the region and its renewable share gives use-phase impact, following the convention below. Prefilled powers are editable historical coefficients, not provider measurements.

Manufacture is allocated to reserved time: `manufacture attributed to the resource × hours / lifetime in hours`. The per-VM factor must already include its share of the server, excluding separately counted storage.

## Detailed method and managed services

### From billing to physical activity

Usage lines describe compute, memory, storage, network or managed services. Each line has a resource ID, region, period, quantity and unit. Billing exports help collection, but a discount or monetary line is not a physical-resource measurement.

<MethodIllustration kind="cloud-billing" lang="en" />

| Service | Useful units | Interpretation challenge |
|---|---|---|
| VMs and containers | vCPU.h, RAM GB.h, GPU.h | Host allocation, oversubscription, actual load |
| Object or block storage | GB.h, operations, replication | Logical versus physical capacity, storage class |
| Serverless | Invocations, seconds, reserved memory and CPU | Cold starts, concurrency, background capacity |
| Managed database | Resource-time, storage, I/O, backups | Hidden architecture, replication and management |
| Network | GB per path or segment | Boundary, country and included phases |

### Calculate energy and manufacture

For a group of identical VMs:

$$
E_{IT}=\frac{h}{1000}\left[n(vW_{CPU}+rW_{RAM})+sW_{SSD}+dW_{HDD}\right]
$$

$n$ is VM count, $v$ vCPU/VM, $r$ RAM GB/VM, $s,d$ total physical SSD/HDD capacity and $h$ hours. Coefficients represent average reserved power, not TDP arbitrarily multiplied by CPU load.

$$
I_{manufacture}=\frac{h}{8760L}(nM_{VM}+sM_{SSD}+dM_{HDD})
$$

$M_{VM}$ is already a server-manufacturing share allocated to one VM, excluding storage. Multiplying whole-server manufacture by VM count would create a double count. PUE subsequently applies to electricity, not manufacture.

### Managed services, regions and missing hardware mappings

A documented provider architecture enables conversion into resource-time quantities. A compatible service factor is another route, provided its covered contributions are known.

#### Unmapped services: temporary monetary fallback {#facteur-monetaire}

For a cloud service that is not yet recognised, such as a new offering, a **suitable monetary factor** provides an interim estimate until a rule maps that service to hardware capacity.

$$
I_{i,mon}=C_{eligible}\times f_{i,mon}
$$

$C_{eligible}$ is spending in the factor’s currency. For each indicator $i$, $f_{i,mon}$ is expressed in **impact units per monetary unit**. For example, USD multiplied by kg CO₂e/USD gives kg CO₂e.

This approach applies to **any indicator with a suitable factor**. Without a factor for an indicator, its impact remains unassessed. The calculation does not reconstruct hardware capacity.

<MethodIllustration kind="cloud-monetary" lang="en" />

The factor specifies its currency, year, geography and boundary. Spending follows the same monetary convention.[^mon-convention]

Excluding licences and support from this route avoids treating them as cloud hardware consumption; it does not imply zero impact.

#### Cloud-region electricity {#electricite-cloud}

For multiregion services, activity, replication, storage and electricity are allocated by region. The **Fruggr cloud convention uses D4B renewable “green” impacts for the renewable share (REF)**. This share retains the life-cycle impacts of electricity generation.[^green]

For indicator $i$, a given region and period:

$$
IF_{cloud,i}=(1-REF)\,IF_{mix,i}+REF\,IF_{green,i}
$$

$REF$ is a proportion between 0 and 1. $IF_{mix,i}$ is the consumption-mix factor and $IF_{green,i}$ its renewable-generation factor, with compatible methods and units. Use-phase impact is $E_{IT}\times PUE\times IF_{cloud,i}$. At 100% renewable electricity, the factor is **$IF_{green,i}$, not zero**. PUE is applied once.

The REF source, period and scope are explicit. This convention is distinguished from the geographical average-mix approach described in [electricity factors](../../fondations/impacts-de-la-consommation-d-energie.md#interpreting-electricity-contracts). If REF or the “green” factor is missing, fallback to the average mix is reported; missing data is not replaced by zero. The interactive example below retains this average-mix approach without applying REF.

Actual durations take precedence over 730 h/month. Stopped resources can still reserve storage or other capacity. A zero contribution requires the absence of remaining provisioned resources. GPUs require appropriate profiles, not CPU coefficients.

### Check completeness

Resource counts and periods are reconciled with provider inventory. The assessment reports unmapped activity, documented conversions and removed duplicates. A precise total for known VMs may cover only a small fraction of a largely managed platform.

## Position this calculation against the cloud PCR

D4B's resource-and-power calculation is an explicit estimate. The cloud PCR defines units for buildings and technical infrastructure, IT equipment and IaaS services. A VM factor may therefore cover contributions missing from our example.[^rcp-cloud]

The applicability of a provider factor depends on its unit, period, resources and lifecycle stages. PUE, buildings and server manufacturing already covered by the factor do not constitute additional contributions. Storage may be attached to the VM or supplied as a separate service.

### Choose a consistent calculation route

The application PCR prioritises data based on the cloud PCR. Where unavailable, it describes an alternative route and requires consistency between the study's server contexts. This D4B example does not claim to implement the cloud PCR.[^rcp-app]

The June 2026 cloud PCR does not include GPUs in its allocations. AI therefore still requires the accelerator-specific breakdown and its limitations. The application PCR cites an April 2025 cloud edition: combining these frameworks requires an explicit record of the edition actually used.

## Complete the boundary

**The example below covers VMs and their storage, not a complete cloud platform.**

| Included in the example | Add if present in the assessed service |
|---|---|
| Allocated manufacture of VMs and SSD/HDD storage, use-phase electricity and PUE | Network, GPUs, management services and building manufacture |

<span id="understand-parameter-effects" />

When interpreting the result:

- **Count each resource once.** VMs belonging to an already inventoried managed database are not added again.
- **Compare equivalent service.** Changing the country affects use-phase electricity here, not manufacture.
- **Distinguish allocation from physical reduction.** A smaller impact share does not prove that the provider consumes less.

<span id="rules-and-sources" />

Prefilled values are **illustrative assumptions**. Electricity factors come from D4B 2025[^ref-2]. Cloud Carbon Footprint documents the resource-and-power approach[^ref-1]; its coefficients depend on hardware and load and do not replace representative measurements.

Shared rules are detailed in [Boundary and functional unit](../../fondations/perimetre-frontieres-services-tiers-et-unite-d-analyse.md), [Allocation](../../regles/allocation-et-partage-des-impacts.md) and [Double counting](../../regles/double-comptabilisation.md).

## Interactive example {#explore-your-scenario}

This example applies the calculations and limitations described above. The simulator covers a group of identical VMs and SSD/HDD storage.

Ex: four VMs with 4 vCPU and 16 GB RAM each, plus 2,000 GB physical SSD and 500 GB physical HDD for 730 h, produce **61.65069 kWh IT** with the displayed coefficients. With PUE 1.2 and the Ireland 2025 factor, electricity accounts for **19.29 kg CO₂e**. The displayed manufacturing assumptions add 9.5 kg: a **28.79 kg CO₂e subtotal**.

import { ScenarioPlayground } from '@site/src/components/scenario-playground';

<div className="inline-example">

<ScenarioPlayground kind="cloud" lang="en" />

</div>

[^rcp-cloud]: ADEME, [RCP services cloud et centre de données, juin 2026](https://librairie.ademe.fr/economie-circulaire-et-dechets/6031-referentiel-par-categorie-de-produit-rcp-de-services-cloud-et-de-centre-de-donnees.html), p. 18, 26–64.

[^rcp-app]: ADEME, [RCP des applicatifs numériques, juin 2026](https://librairie.ademe.fr/economie-circulaire-et-dechets/9434-referentiel-par-categorie-de-produit-rcp-des-applicatifs-numeriques.html), p. 6, 27–35.

[^ref-1]: [Cloud Carbon Footprint](https://www.cloudcarbonfootprint.org/docs/methodology/). Online documentation, unpinned version.

[^ref-2]: Digital4Better, [D4B 2025 snapshot](https://github.com/digital4better/data/blob/77cae4a58fadd5deb3b8d4e5577020da08f780d8/data/factor/country-yearly.csv). Snapshot 77cae4a, 2025 data; reviewed 16 October 2026.

[^green]: Digital4Better, [country renewable-electricity factors](https://github.com/digital4better/data/blob/77cae4a58fadd5deb3b8d4e5577020da08f780d8/data/factor/country-yearly-green.csv), snapshot `77cae4a`.

[^mon-convention]: Taxes, discounts and currency conversions follow the convention used to construct the monetary factor. Its source, version and applied adjustments are retained.
