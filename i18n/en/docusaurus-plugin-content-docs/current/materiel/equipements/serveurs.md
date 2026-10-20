# Servers

This chapter covers servers in hosting infrastructure, private cloud and intensive services such as AI. It models embodied impacts, operational electricity and allocation between components and hosted workloads. Available evidence determines whether a component inventory, a documented server archetype or a hybrid is suitable.

## Characteristics

| Characteristic | Unit | Default treatment | Typical cases / purpose |
|---|---|---|---|
| Server type | Category | Documented archetype | Rack, blade, accelerated or storage server |
| CPU count | Units / sockets | Archetype configuration | One or several sockets |
| GPU / accelerator count | Units | Zero only when absent | Material for accelerated workloads |
| Memory | GB | Archetype if unknown | Tens of GB to several TB |
| Storage | GB or TB | Documented capacity and technology | Depends on server role |
| Reference power / energy | W or kWh/year | Compatible measured or modelled value | Operational calculation |
| Lifetime | Years | Explicit retained duration | Five-to-six-year values are scenarios, not universal lifetimes |
| Number of servers | Units | One | Fleet/site consolidation |

## Modelling principle

Known configurations and suitable factors support a combined inventory of CPU, memory, storage, accelerators and structures. With partial evidence, known components are completed by a documented residual. A representative archetype or product inventory replaces speculative decomposition.[^model-data]

See [Equipment modelling](../../modelisation/modelisation-d-un-equipement) and the specialised component chapters. A detailed model is not automatically more accurate than a well-matched aggregate inventory.

## Embodied impacts

### Calculation

| Available evidence | Model representation |
| --- | --- |
| Detailed configuration | Sum of compatible component inventories with an explicit residual. |
| Partial configuration | Known components combined with a non-overlapping structural estimate. |
| Server category only | Component-based reference configuration, documented as an assumption. |

General-purpose, compute-intensive, accelerated and storage-heavy configurations have distinct inventories.

### When data are missing {#completing-missing-data}

When server storage is undocumented, a documented reference configuration can supply an assumption. It must match the server’s role, such as compute or storage. CPU count and RAM alone do not determine its drives.

| Situation | Fictional example |
| --- | --- |
| **Starting information** | The inventory lists **2 CPUs and 64 GB RAM**. Storage is unknown. |
| **Selected reference** | A comparable server configuration contains **one 1 TB SSD**. This value is hypothetical in this example. |
| **Calculation inputs** | The **known 2 CPUs and 64 GB RAM** are retained. The **1 TB SSD is labelled ‘estimated’**, with its reference. |

If too many components are missing, a complete reference configuration can replace detailed reconstruction. Without a suitable reference, storage remains unassessed rather than zero.

### End of life

End of life, transport and assembly coverage varies by inventory. Component factors do not necessarily share a boundary. Compatible data can complete missing stages, with each stage counted only once.

## Operational impacts

### Consumption profile

<dl className="model-profiles">
  <div><dt>Idle</dt><dd>The server remains powered; consumption is generally nonzero.</dd></div>
  <div><dt>Intermediate load</dt><dd>A representative profile describes routine scenario operation.</dd></div>
  <div><dt>Peak load</dt><dd>A high-load profile describes periods of intensive use.</dd></div>
</dl>

Consumption depends on compute load, active accelerators, memory, storage, cooling within the server, and resource sharing.

A documented average power or annual-energy scenario can be used when representative measurements are unavailable. TDP is not automatically measured average wall power.

### Adjustments

Actual operating duration and load determine consumption. Service allocation follows reserved or consumed resources consistently. PUE applies to IT electricity only when site overhead is absent from the input. WUE describes direct water separately; REF is metadata and does not automatically reduce the physical electricity mix.

## Allocation and annualisation

Servers commonly support multiple workloads. Allocation relies on time and suitable CPU, memory, GPU or reserved-capacity shares. Consumption-based and reservation-based models answer different questions and require explicit treatment of idle capacity.

Embodied inventories are annualised over the retained lifetime, then allocated once by observation period and resource share. Server-level and service-level totals remain reconcilable.

## Assumptions and limitations

### Working assumptions

A documented archetype is preferable to invented detail. A representative average profile can replace absent measurements if labelled as an estimate. Residual structures may cover unmodelled components, but require defined boundaries. Datacentre overhead belongs in a separate, consistent site model.

### Known limitations

Loads vary over time, component inventories are often incomplete, and virtualisation complicates allocation. Server results cannot be interpreted independently of their electricity supply, site and network boundaries.

### Improvements

Further improvements involve workload-specific archetypes, measured load profiles and more complete accelerated-server inventories. These are evidence improvements, not grounds to claim current scenarios are validated.

The public snapshot does not contain a generic `data/hardware` catalogue.

## VM configurations {#historical-vm-archetypes}

The old Open Data small, medium and large VM factors are obsolete for the target method. A VM represents an allocated share of a physical server; it has no independent manufacturing inventory.

| Available information | Representation |
|---|---|
| Known host and configuration | Host component inventory, then allocation to mobilised resources |
| Documented provider offering | Mapping of CPU, accelerators, memory and storage to the host or an explicit configuration |
| Unknown physical configuration | A reference configuration labelled as an assumption, with unassessed items visible |

Small or large profiles may simplify an illustration, but their impacts are recalculated with the same component models. Shared resources and idle capacity are allocated once. Reservation and actual use are different allocation conventions.[^vm-allocation]

[^vm-allocation]: ADEME, [Cloud and data centre PCR](https://librairie.ademe.fr/economie-circulaire-et-dechets/6031-referentiel-par-categorie-de-produit-rcp-de-services-cloud-et-de-centre-de-donnees.html), June 2026, p. 26–64, functional-unit and cloud-service allocation sections. Accelerators require additional modelling.

:::note[PUE]
PUE applies only to IT energy excluding site overhead. The historical 1.58 default is an assumption, not a verified current average.
:::

## Interactive example {#simulator}

The simulator assembles component scenarios and lets users change configuration. Four- and eight-H100 presets are illustrative server configurations, not complete validated DGX LCAs. GPU die estimates do not establish the footprint of a complete accelerator card or system.

import { ServerPlayGround } from '@site/src/components/server-playground';

<div className="inline-example">

<ServerPlayGround lang="en" />

</div>

## Applications

[Generative AI](../../cas-d-usage/services/ia-generative) uses server support resources alongside accelerators; [hosting infrastructure](../../cas-d-usage/environnements/infrastructure-d-hebergement) covers inventoried environments; [cloud](../../cas-d-usage/environnements/cloud) maps billed resources to physical equivalents.

[^model-data]: Sources include versioned `data/cloud/cpus.*`, `data/cloud/accelerators.*`, cloud VM mappings and `data/equipment/*` in Digital4Better data, plus identified product inventories. Background sources include Green Cloud Computing (UBA, 2021), the PAIA intended-use and limitations document. [Digital4Better data catalogue, snapshot 77cae4a](https://github.com/digital4better/data/tree/77cae4a58fadd5deb3b8d4e5577020da08f780d8). References and scope: [Sources and corpus](../../references/sources-et-corpus).
