# Active network equipment

This chapter covers switches, routers, access points and comparable active network appliances. It models manufacturing, operation and allocation between services, users or transported traffic.

A physical equipment inventory differs from a system factor in kWh/GB. They are alternative or complementary representations only when their boundaries do not overlap.

## Characteristics

| Characteristic | Unit | Treatment | Purpose |
|---|---|---|---|
| Equipment type | Category | Documented archetype if unknown | Switch, router, access point or appliance |
| Ports / interfaces | Count | Actual or archetype configuration | Capacity and allocation |
| Nominal throughput | Gb/s | Documented specification | Equipment-class comparison; not actual traffic |
| Reference consumption | W or kWh/year | Measured or representative estimate | Operational impact |
| Utilisation | % | Explicit load profile | Allocation and consumption interpretation |
| Lifetime | Years | Explicit retained duration | Annualisation; five-to-eight years is a scenario range |

## Modelling principle

Observable assets support a physical inventory or documented equipment archetype. A system model applies when equipment detail is unavailable and a compatible system factor exists.[^model-data][^ref-1]

For known equipment identify embodied impact, operational consumption and a justified allocation across ports, flows, services or users.

## Embodied impacts

### Calculation

| Available evidence | Model representation |
| --- | --- |
| Equipment type | Factor matching the network equipment family. |
| Known ports or throughput class | Documented archetype with comparable capacity. |
| Known assemblies | Hybrid inventory completing identified parts without overlap. |

Detailed configurations are often less accessible than for general-purpose servers, so aggregate inventories may be more defensible.

### When data are missing {#missing-data}

Unknown power can be replaced by that of a comparable reference device. Port count is insufficient: throughput, active features and any power supplied to downstream devices must also match.

| Situation | Fictional example |
| --- | --- |
| **Starting information** | A switch has **24 ports**, but no measured power is available. |
| **Selected reference** | A 24-port switch profile with matching throughput and features uses **30 W**. This power is hypothetical in this example. |
| **Calculation inputs** | Consumption is estimated from **30 W and operating duration**. The result identifies ‘reference power’, not ‘measured power’. |

A compatible specification is preferable to a generic profile. Without a sufficiently close reference, consumption remains unassessed. Source and operating conditions accompany each estimate; nominal throughput alone does not determine manufacturing impact.

### End of life

The selected factor determines end-of-life and other lifecycle coverage. Missing stages remain explicit.

## Operational impacts

### Consumption profile

<dl className="model-profiles">
  <div><dt>Low traffic</dt><dd>Power is often nonzero even at low or zero traffic.</dd></div>
  <div><dt>Load sensitivity</dt><dd>Some equipment classes draw similar power across traffic loads.</dd></div>
  <div><dt>Interfaces and features</dt><dd>Active interfaces, throughput modes and advanced functions can change power.</dd></div>
</dl>

Where no load curve is available, a representative power or annual-energy estimate provides a proxy. A traffic allocation is not evidence that marginal electricity is proportional to bytes.

### Adjustments

Consumption depends on operating duration, occupied ports, traffic/load profiles and site overhead where applicable. PUE applies only when the equipment belongs to that IT boundary and the input does not already contain overhead. PoE may include downstream device energy; separate terminal consumption applies only to energy not already covered.

## Allocation and annualisation

Embodied inventory is annualised over the retained lifetime. The assessed share depends on time, occupied interfaces, capacity, traffic or another justified rule. Reservation differs from measured traffic, and idle capacity remains explicitly allocated.

See [Allocation and sharing](../../regles/allocation-et-partage-des-impacts).

## Assumptions and limitations

### Working assumptions

A documented network archetype is preferable to speculative decomposition. Reference power can replace missing measurements if the operating assumptions are disclosed. Physical equipment and system-level LAN/WAN/RAN factors must remain distinguishable.

### Known limitations

Inventories can be incomplete, fine-grained measurements are scarce and system factors may already include the same equipment. Aggregation requires non-overlapping boundaries.

### Improvements

Further improvements involve broader equipment-class inventories, distinct load profiles and interactive models whose inputs and coefficients are sufficiently supported. No dedicated network-equipment simulator is claimed in this version.

The verified public snapshot does not contain the previously proposed `data/hardware/networks.*` catalogue.

## Applications

[LAN modelling](../reseau-et-infrastructure/reseau) uses inventoried local assets. [Hosting infrastructure](../../cas-d-usage/environnements/infrastructure-d-hebergement) covers known site equipment. [Web services](../../cas-d-usage/services/service-web) can include explicitly allocated local or enterprise network contributions.

[^ref-1]: Digital4Better, [Digital4Better equipment records](https://github.com/digital4better/data/tree/main/data/equipment).Evolving catalogue; pin a commit for reproducible factors.

[^model-data]: Sources include identified product inventories and compatible Digital4Better equipment records.  Background material includes the PAIA intended-use and limitations document. [Digital4Better data catalogue, snapshot 77cae4a](https://github.com/digital4better/data/tree/77cae4a58fadd5deb3b8d4e5577020da08f780d8). References and scope: [Sources and corpus](../../references/sources-et-corpus).
