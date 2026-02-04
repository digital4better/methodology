---
sidebar_label: IT assets
sidebar_position: 7
slug: /assets
---

# Methodology applied to IT asset fleets

## IT asset fleet specifics

### Study perimeter

An IT asset fleet refers to all equipment that makes up an organization’s information system. The fleet can include:
- “User” equipment, i.e., equipment directly used by employees. Examples: laptops, smartphones, monitors, printers, videoconferencing equipment, tablets.
- “Network” equipment, i.e., equipment that transports data from user equipment to data storage equipment. Examples: modem/router boxes, switches, routers.
- “Server” equipment, i.e., devices used to store and process data. Examples: servers, storage arrays.
- “Specific” equipment, i.e., electrical and electronic equipment specific to the organization’s activities. Examples: payment terminals, electronic shelf labels, pads, 3D printers.

Notes:
- Virtual machines are not counted as equipment, but the hardware used to run them (computer, server, etc.) is included in the organization’s equipment inventory.
- In accordance with the PCR for information systems, the following are excluded from the assessment:
  - “Keyboards, mice, and other input peripherals of negligible mass and containing very small quantities of electronic elements (…)”
  - “Chargers and similar equipment for mobile devices”

### Equipment inventory

The existence of an IT asset fleet implies setting up fleet management to track entries/exits, assignments, and equipment characteristics. This management relies on the presence of an equipment inventory. The quality and completeness of this inventory are decisive for obtaining a credible assessment.

### Evaluation duration vs. use duration

In terms of time, two notions are involved in evaluating the impact of an IT asset fleet.
The evaluation duration corresponds to the time horizon of the analysis, the period over which the impact is calculated (example: 1 year).
The use duration corresponds to the time during which the equipment actually operated. For network equipment and servers, this use duration can be equal to the evaluation duration. For others, the use duration depends on the equipment status (equipment in stock is part of the fleet but not used). It is often estimated from the organization’s working habits (example: a computer runs 8h/day, 5 days/week).

## Environmental impact assessment of an IT asset fleet

Because the fleet is made up of equipment:
- the assessment will rely only on the formulas presented in [Environmental impacts of equipment](general.md#impacts-environnementaux-dun-équipement)
- the fleet impact will equal the sum of impacts per equipment

$$
\begin{align*}
&I_{i} = \sum_{k=1}^n EI_{k,i}\htmlClass{unit}{[U_i]}\\
Avec \\
&I_{i} = \text{Impact of the IT asset fleet composed of}\textit{ n }\text{equipment for environmental indicator}\textit{ i }\htmlClass{unit}{[U_i]}\\
&EI_{k,i} = \text{Impact}\textit{ t }\text{of equipment}\textit{ k }\text{for environmental indicator}\textit{ i }\htmlClass{unit}{[U_i]}\\
\end{align*}
$$

### Embodied impact of IT asset equipment

#### Reference embodied impact

For an IT asset equipment item, the calculation formula seen in [Embodied impact of equipment](general.md#impact-intrinsèque-dun-équipement) is applied with the following modalities:
- The equation is expressed in a time unit of “years” rather than “seconds.”
- The Evaluation Duration variable $$EP$$ is determined by equipment allocation. In the case where the studied process is the IT asset fleet, this allocation equals 1, considering that the equipment is allocated to the fleet as soon as it is used.

#### Corrected embodied impact

The previous step yields an embodied impact over the reference duration of the EmbodiedFactorXEquipment. For example, if the factor used is from Base Empreinte for a professional computer, the calculated impact corresponds to an annual impact because the reference quantity used to set this factor is 1 year.

A correction is therefore necessary to bring the impact to the evaluation duration of the IT asset fleet:

$$
\begin{align*}
&E_{elec} = E_{elec_{ref}} \times \frac{EP}{RP}\htmlClass{unit}{[kWh]}\\
Avec \\
&E_{elec} = \text{Electricity consumption of a fleet equipment item}\htmlClass{unit}{[kWh]}\\
&E_{elec_{ref}} = \text{Reference electricity consumption of a fleet equipment item}\htmlClass{unit}{[kWh]}\\
&EP = \text{Evaluation duration}\htmlClass{unit}{[years]}\\
&RP = \text{Reference duration}\htmlClass{unit}{[years]}\\
\end{align*}
$$

### Operational impact of IT asset equipment

#### Reference electricity consumption

For an IT asset equipment item, the calculation formula seen in [Operational impact of equipment](general.md#impact-opérationnel-dun-équipement) is applied with the following modalities:
- The equation is expressed in a time unit of “years” rather than “seconds.”
- The Evaluation Duration variable $$EP$$ is determined by equipment allocation. In the case where the studied process is the IT asset fleet, this allocation equals 1, considering that the equipment is allocated to the fleet as soon as it is used.

#### Corrected electricity consumption

The previous step yields an impact over the reference duration of the EnergyFactorEquipment. For example, if the factor used is provided by Base Empreinte for a professional computer, we use “Electricity required for the process (kWh),” which corresponds to 1 year of use.

A correction is therefore necessary to bring the impact to the evaluation duration of the IT asset fleet:

$$
\begin{align*}
&E_{elec} = E_{elec_{ref}} \times \frac{EP}{RP}\htmlClass{unit}{[kWh]}\\
Avec \\
&E_{elec} = \text{Electricity consumption of a fleet equipment item}\htmlClass{unit}{[kWh]}\\
&E_{elec_{ref}} = \text{Reference electricity consumption of a fleet equipment item}\htmlClass{unit}{[kWh]}\\
&EP = \text{Evaluation duration}\htmlClass{unit}{[years]}\\
&RP = \text{Reference duration}\htmlClass{unit}{[years]}\\
\end{align*}
$$

#### Conversion to operational impact

The corrected electricity consumption impact is converted to operational impact based on the formula provided in [Converting electricity consumption into operational impact](../concepts.md#conversion-dune-consommation-délectricité-en-impact-opérationnel).
