---
sidebar_position: 2
sidebar_label: Principles
---

# Methodological principles

## A life-cycle approach

Life Cycle Assessment (LCA) is a methodology used to evaluate the environmental impacts of products, services, or organizations. LCA was chosen to frame the basis for assessing the environmental impacts of digital activities; this is referred to as “digital LCA.” The methodologies proposed by Digital4Better follow the same principles as digital LCA:

- The assessment covers the entire life cycle, from manufacturing to end of life, including the use phase.
- The methodology includes a multi-criteria analysis: a set of environmental indicators is systematically studied and corresponds to the environmental indicators recommended for digital LCA. (see [Environmental indicators](#indicateurs-pris-en-compte-dans-lévaluation))
- The assessment covers all equipment that makes up the three tiers (user equipment, network transfers, datacenters).

### Embodied impact and operational impact

The impact of a digital activity is evaluated from two components:
- Embodied impact: impacts that occur during the creation and disposal of a hardware device (corresponding to the LCA phases: raw material extraction, manufacturing, transport, and end of life). These impacts rely on a fraction of total embodied impacts that must be allocated to the specific amount of use.
- Operational impact: this impact results from the use phase and is based on the electricity consumption required for operation.

The global impact is then:

$$
\begin{align*}
&I_{global} = I_{operational} + I_{embodied}  
\end{align*}
$$

### Multi-component approach {#approche-multi-composants}

Our approach integrates all equipment and infrastructures characterized in three tiers: terminals, telecommunication networks, and data centers, in accordance with the definition of the PCR “Methodological reference for environmental assessment of digital services.”

> A digital service is an activity characterized by delivering a service or providing information that mobilizes a set of equipment, digital infrastructures, and other digital services to capture, circulate, process, analyze, render, and store data. These equipment and infrastructures are characterized in three tiers: terminals, telecommunications networks, and data centers; a set of software being used at different levels to orchestrate the physical equipment and deliver the expected service. Although this activity is linked to one or more physical products (terminals, networks, servers), it is transient, often intangible.

## Indicators considered in the assessment {#indicateurs-pris-en-compte-dans-lévaluation}

Whatever the object of study, our methodology results in the evaluation of impact in the form of environmental indicators.
These indicators were chosen in accordance with the recommendations of §7 of the parent PCR for digital services.
Both mandatory and optional indicators are taken into account.

The 9 mid-point environmental indicators are characterized in 4 impact categories: climate damage, ecological damage, damage to human health, and damage from resource depletion.

The table below describes each selected environmental impact indicator.

All of these environmental impact indicators are compatible with the impact calculations presented below.
All calculation formulas seen afterward apply to all of the environmental indicators identified here.

An additional flow indicator helps interpret results: electricity consumption.

| Mid-point impacts                 | Abbreviation | Unit              | End-point damages                       | Definition                                                                                                                                                                                                                                                                                                                                                                                               |
|-----------------------------------|--------------|-------------------|-----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Total climate change              | GWP          | kg CO2 eq.        | Climate damage                          | Climate change potential induced by greenhouse gas (GHG) emissions. GHGs are gaseous compounds that absorb infrared radiation emitted by the Earth’s surface. The increase in their concentration in the Earth’s atmosphere contributes to global warming.                                                                                                                                            |
| Acidification                     | AP           | mol H+ eq.        | Ecological damage                       | Acidification potential of environments (soils and surface waters) induced by emissions of acidifying substances. Acidification is linked to emissions of nitrogen oxides, sulfur oxides, ammonia, and hydrochloric acid that turn into acids in the presence of humidity. Their deposition can damage materials, forest ecosystems, and freshwater ecosystems.                                           |
| Freshwater ecotoxicity            | CTUe         | CTUe              | Ecological damage                       | Toxicity potential for aquatic environments (surface freshwaters) due to the release of toxic substances into the environment. Ecotoxicity destabilizes and threatens the quality and variety of ecosystems (fauna and flora).                                                                                                                                                                   |
| Human toxicity (non-carcinogenic) | CTUh-nc      | CTUh              | Damage to human health                  | Human toxicity potential induced by emissions of substances likely to cause non-carcinogenic health damage.                                                                                                                                                                                                                                                 |
| Human toxicity (carcinogenic)     | CTUh-c       | CTUh              | Damage to human health                  | Chronic toxicological effects on human health due to emissions of carcinogenic substances.                                                                                                                                                                                                                                                                       |
| Fine particulate matter emissions | PM           | disease occurrence| Damage to human health                  | The presence of small-diameter fine particles in the air—especially those smaller than 10 microns—represents a human health problem, as inhalation can cause respiratory and cardiovascular issues.                                                                                                                                                                                                |
| Ionizing radiation emissions      | IR           | kg U235 eq.       | Damage to human health                  | Effect of radioactive emissions on human health. Radionuclides can be released during several human activities. When radionuclides decay, they release ionizing radiation. Human exposure to ionizing radiation causes DNA damage, which in turn can lead to various cancers and congenital malformations.                                                                                            |
| Water resource use                | WU           | m3 eq.            | Damage from resource depletion          | Total quantity of water consumed. This is a flow indicator expressed in m3 (gross water consumption withdrawn from environments) and not an indicator of the impact of withdrawals on environments depending on their local specificity, notably the type of water withdrawn and water stress.                                                                                                        |
| Natural resource depletion        | ADPe         | kg SB eq.         | Damage from resource depletion          | Quantity of mineral and metallic resources extracted from nature as if they were antimony (SB). Industrial extraction leads to a reduction in available resources whose reserves are limited.                                                                                                                                                                                                        |

## Equipment approach and system approach {#approche-équipement-et-approche-système}

The parent PCR distinguishes two approaches for conducting the assessment of a digital service:
- Equipment approach: each piece of equipment used by the digital service constitutes a primary or secondary datum. The digital service is considered a sum of uses of each piece of equipment, each use being defined through an allocation rule relative to the total impacts of the equipment. (…)
- System approach: a number of pieces of equipment can be grouped into a physical system (example: datacenter) or virtual system (example: virtual machine), at which level the environmental impacts have been determined and which constitutes a primary or secondary datum. The digital service is considered a sum of uses of each system, each use being defined through an allocation rule relative to the total impacts of the system. (…)

The equipment approach will be more precise, but more complex to implement than the system approach.

It is recommended to use an equipment approach for the perimeter controlled by the digital service operator and a system approach for the uncontrolled perimeter.

In accordance with these principles, the methodology presented will preferentially use the equipment approach and will turn to a system approach when relevant.

## Organization of the report document

The methodologies presented in this document are used at different levels in Digital4Better’s activities, whether in client consulting activities or through our fruggr tool that automates and reports calculations. In consulting activities, we find that the course of these assessments must systematically adapt to the context of the organization being assessed.

However, common foundations exist across all these applications. This is why the present document is organized into three divisions, representing a progression from general to specific:

| Division                 | Relevant chapters                                                                                                                         | Description                                                                                                                                                  |
|--------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Cross-cutting information| [Methodological principles](principles.md)<br/>[Cross-cutting concepts](concepts.md)                                                     | This division covers the methodological foundations of our approach and the concepts common to all subsequent applications.                                 |
| General methodologies    | [Methodologies for evaluating environmental impacts](general.md)                                                                          | This division presents the general calculation formulas for each tier composing a digital service: equipment, network, data center.                          |
| Applied methodologies    | [Methodology applied to web services](methodology/web.md)<br/>[Methodology applied to IT asset fleets](methodology/assets.md)              | This division illustrates applications of the general methodologies to specific perimeters.                                                                 |

For each chapter presenting a methodology, it is presented whenever possible according to the following outline:
- Perimeter specifics
- Embodied impact assessment
- Operational impact assessment

Equations are presented in English, with their units. They are applicable regardless of the environmental indicator evaluated among the 9 mentioned in the section [Indicators considered in the assessment](#indicateurs-pris-en-compte-dans-lévaluation). This is why an “X” indicator is referenced in variables associated with these environmental indicators, with a unit in “x.” X can be replaced by any indicator among those retained in our methodology. The unit “x” should be updated with the unit of the chosen indicator.
