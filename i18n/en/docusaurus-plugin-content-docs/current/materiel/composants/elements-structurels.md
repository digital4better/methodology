# Structural elements

Motherboards, casing, assembly, auxiliary boards and other residual parts are often poorly documented, but omitting them can understate equipment impacts. This chapter defines how to complete a partial inventory without duplicating known components.

## Characteristics

| Characteristic | Unit | Treatment | Purpose |
|---|---|---|---|
| Host equipment | Category | Documented archetype | Phone, laptop, desktop, server, switch |
| Inventory detail | Coverage | Explicitly assessed | Basis for the completion approach |
| Casing mass / class | g or kg | Unknown if unavailable | Support a compatible material estimate |
| Auxiliary assemblies | Count / configuration | Documented archetype if necessary | Complex equipment coverage |
| Uncovered residual | Defined inventory or share | Explicit assumption | Contributions omitted by the component model |

## Modelling principle

The aim is transparent coverage rather than artificial precision. More detailed real data take precedence over a default residual when compatible.[^model-data]

| Available evidence | Model representation |
| --- | --- |
| Mostly known inventory | Residual factor covering missing parts only. |
| Less complete configuration | Structural archetype matching the equipment family. |

## Embodied impacts

### Calculation

The residual derives from a documented equipment/category factor, or from a compatible complete inventory minus known components.

Subtraction is valid only when configuration, lifecycle stages, units and characterisation methods match. A negative residual should trigger a consistency review; arbitrarily clipping it to zero or interpreting it as an environmental credit would lack justification.

### When data are missing {#missing-data}

An inventory limited to major components may omit the casing, motherboard or assembly. A grouped estimate of these missing parts can complete the calculation only when its coverage is precisely known.

| Situation | Fictional example |
| --- | --- |
| **Starting information** | A laptop’s **CPU, RAM and SSD** are already counted. Its casing and motherboard are not. |
| **Selected reference** | A documented estimate covers **the casing and motherboard, excluding CPU, RAM and SSD**. |
| **Calculation inputs** | This estimate is added to the known components. A factor for **a complete laptop** would not be suitable: it would count the CPU, RAM and SSD again. |

If the additional estimate’s contents are unknown, adding it is not justified. Remaining gaps and the selected reference appear in the [assumptions register](../../references/registre-des-hypotheses-et-valeurs-par-defaut).

### End of life

End-of-life impacts are not necessarily isolated for structural parts. Their coverage in the selected equipment or component inventory determines any remaining gap.

## Operational impacts

<dl className="model-profiles">
  <div><dt>Passive parts</dt><dd>Casing and other passive parts have no autonomous electricity consumption.</dd></div>
  <div><dt>Active assemblies</dt><dd>Boards, auxiliary electronics and conversion losses contribute to equipment consumption.</dd></div>
</dl>

These contributions are often included in a complete equipment power measurement. Whether a separate term is required depends on equipment type, the existing measurement boundary and components already counted. A complete wall measurement already includes residual power.

## Allocation and annualisation

Structural parts follow the host equipment's retained lifetime and service-sharing rules. See [Allocation and sharing](../../regles/allocation-et-partage-des-impacts). A separately replaced assembly needs its own replacement assumption.

## Assumptions and limitations

### Working assumptions

An explicit, justified residual is preferable to silent omission. Structural contributions belong to the equipment inventory and inherit its allocation. Their evidence quality depends on available configuration data.

### Known limitations

Boards and auxiliary assemblies are not uniformly documented. The principal risk is combining a complete archetype with a component sum that covers the same parts. A residual's uncertainty cannot be inferred merely from its percentage of the total.

### Improvements

Reusable reference models require residual factors documented by equipment class, linked to complete product inventories and calibrated at compatible boundaries. A standalone validated structural simulator is not claimed here.

## Interactive example {#simulator}

The structural residual adds only items not already covered by inventoried components. The example varies this residual and shows its share of the equipment and annual allocation.

import { InlineStructureExample } from '@site/src/components/inline-structure-example';

<div className="inline-example">

<InlineStructureExample lang="en" />

</div>

## Applications

[Equipment modelling](../../modelisation/modelisation-d-un-equipement), [terminals](../equipements/terminaux), and [servers](../equipements/serveurs) with partial inventories.

[^model-data]: Compatible `data/equipment/*` records in Digital4Better data, identified product inventories, the [central assumptions register](../../references/registre-des-hypotheses-et-valeurs-par-defaut). [Digital4Better data catalogue, snapshot 77cae4a](https://github.com/digital4better/data/tree/77cae4a58fadd5deb3b8d4e5577020da08f780d8). References and scope: [Sources and corpus](../../references/sources-et-corpus).
