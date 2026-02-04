---
sidebar_position: 3
---

# Cross-cutting concepts

In this section, we present concepts that will be reused in several places throughout the document.

## Converting electricity consumption into operational impact {#conversion-dune-consommation-délectricité-en-impact-opérationnel}

Whatever the subject of study, the operational component of impact is assessed from electricity consumption. This conversion from energy to operational impact is based on the following equation:

$$
\begin{align*}
&I_{operational_{i,p}} = E_{elec_p} \times IF_{i,p}\htmlClass{unit}{[U_i]}\\
Avec\\
&I_{operational_{i,p}} = \text{Operational impact for environmental indicator}\textit{ i }\text{in country}\textit{ p }\htmlClass{unit}{[U_i]}\\
&E_{elec_p} = \text{Electric energy consumed in country}\textit{ p }\htmlClass{unit}{[kWh]}\\
&IF_{i,p} = \text{Impact factor of indicator}\textit{ i }\text{in country}\textit{ p }\htmlClass{unit}{[U_i/kWh]}\\
\end{align*}
$$

Conversion factors by country are presented in the following section.

## Impact factors for electricity consumption by country

This section presents the methodology used to determine environmental impact factors for producing 1 kWh of electricity (factorXkWhCountry in the previous equation). The methodology, resources, and results are available open source here: https://github.com/digital4better/data.

We chose to build our own database in order to:
- Cover all countries and certain subdivisions into states/regions to serve our international clients
- Provide factors updated monthly to better reflect changes in national energy mixes according to weather conditions
- Integrate all environmental impact indicators
- Base our factors on studies and references more recent than those used in existing databases

### Methodology

Factors are estimated relatively based on electricity consumed in the geographic region. This approach makes it possible to account for electricity imports and exports, unlike an approach based solely on electricity produced. For the province/state dimension, national imports/exports are allocated to subdivisions in proportion to their electricity production.

The following equation presents the calculation of a country impact factor for a period:

$$
\begin{align*}
&IF_{i,p} = \frac{{\sum_{t} I_{i,t} \times E_{elec_{t,p}}}}{{\sum_{t}} E_{elec_{t,p}}}\htmlClass{unit}{[U_i/kWh]}\\
Avec\\
&IF_{i,p} = \text{Impact factor for indicator}\textit{ i }\text{for country}\textit{ p }\htmlClass{unit}{[U_i/kWh]}\\
&E_{elec_{t,p}} = \text{Electricity consumption for technology}\textit{ t }\text{for country}\textit{ p }\htmlClass{unit}{[kWh]}\\
&I_{i,t} = \text{Impact for indicator}\textit{ i }\text{linked to electricity consumption of technology}\textit{ t }\htmlClass{unit}{[U_i/kWh]}\\
\end{align*}
$$

Factors are determined by country based on the national energy mix and the environmental impacts associated with each energy production source, categorized into 9 production technologies: coal, gas, other fossil, wind, solar, bioenergy, hydro, other renewables, nuclear.

For each country, and in order to account for “renewable energy” offers from operators, we provide two factors:
- a standard factor that accounts for the country’s complete energy mix
- a renewable energy factor that accounts only for renewable energy production (wind, solar, bioenergy, other renewables, hydro)

### Resources

Impact data for each electricity production technology per kWh come from two literature sources:
- For coal, gas, wind, solar, hydro, and nuclear: “Life cycle assessment of electricity generation options,” UNECE 2021.
- For other fossil, bioenergy, and other renewables: study published in Energy Conversion and Management, “New approach for assessing and optimising the environmental performance of multinational electricity sectors: A European case study,” September 2022.

These data are Europe-based due to the scarcity of global data; an extrapolation is performed and values are generalized in our model. Sources:

National electricity mixes are extracted from the ember-climate site.
- Monthly electricity mix by country (for 85 countries): https://ember-climate.org/data-catalogue/monthly-electricity-data/
- Yearly electricity mix by country (for all countries): https://ember-climate.org/data-catalogue/yearly-electricity-data/

Additional sources are used to obtain electricity mixes at the province level for Canada and for the United States.

## Environmental impact factor reference databases

Unless specifically indicated, the environmental impact factors used in the rest of the document come from the following references:

| Reference          | Impacts concerned         | Data provided                     | Granularity        | Data origin            |
|-------------------|---------------------------|-----------------------------------|--------------------|------------------------|
| Manufacturer data | Hosting equipment          | CO2e, electricity consumption     | Model              | Manufacturer data      |
| Base Empreinte    | Equipment<br/>Hosting      | Multi-indicators                  | Family             | NegaOctet work         |
| Base Empreinte    | Network                    | Multi-indicators                  | Functional unit    | NegaOctet work         |

### Focus on ADEME’s Base Empreinte

ADEME’s Base Empreinte gathers available data and references for life cycle assessments (not only digital) and greenhouse gas emission inventories. This database has an official status in France and is maintained by ADEME.

In the context of digital LCA, the essential contribution of Base Empreinte is available as an Excel spreadsheet grouping part of the work carried out by the NegaOctet consortium. It includes multi-indicator factors established for equipment (computer, smartphone, etc.) as well as for digital services, defined by a precise functional unit (store 1 GB of data in the cloud for 1 year).

As we will see later, particular attention must be paid to the context of the factor, such as its reference quantity or the equipment lifetime considered.

Note also that some data raise questions, notably on “Water use,” where some factors are provided with a negative value due to an overestimation of end-of-life impacts.

## Proposal around a single score

### Framework

Environmental impacts do not provide users with a synthetic view of results nor make it possible to compare systems with each other. We therefore also developed a reporting approach in the form of scores. These scores reflect the full life-cycle impact and integrate all environmental impact indicators presented above.

We defined a calculation rule for an environmental score that reflects all indicators and sub-scores by indicator group based on a single allocation rule. Each sub-score then groups one or more criteria:
- The first sub-score “biodiversity” corresponds to the protection area “ecosystem quality.”
- The second sub-score “environmental health,” in the human health protection area, represents the health consequences of environmental damage.
- The third sub-score “resources” refers to the protection area of the same name and groups all biotic or abiotic elements provided by nature that humans use in their economic activities.
- The fourth sub-score “climate change” represents a major environmental impact, expected and clearly perceived by users.

### Formulas and calculations for scores and sub-scores

These scores are based on the “single score EF” (environmental footprint) methodology recommended by the European Commission. Calculated with weighting factors for each indicator, this approach accounts for the relative robustness of these indicators, the associated environmental stakes, and the level of scientific consensus. The calculation of a PEF (Product Environmental Footprint) score is carried out following these operations:

Normalization of each impact to allow aggregation of different impact categories:

$$
\begin{align*}
&I_{norm_i} = \frac{I_i}{C_{norm_i}}
\end{align*}
$$

Weighting of all normalized impacts, which reflects the importance of each impact category to determine the score:

$$
\begin{align*}
&Score = \sum_i {I_{norm_i}} \times {C_{pond_i}}
\end{align*}
$$

On this basis, the European Commission (EC) established a ranking of indicators. From these findings, we determined our own allocation key, adapted to the scope of indicators we selected (see 1.2) and their association with end-point impact groups.

The table below presents the results of this reflection on normalization and weighting coefficients, with:
- Columns 1 and 2: the groups and impacts we address
- Column 3: the EC normalization coefficients
- Column 4: the weighting coefficient applied to each impact for calculating the global score, i.e., the final score of the assessment that accounts for all environmental indicators of the study. The sum of these coefficients equals 100% when you add all coefficients, regardless of their impact group.
- Column 5: the weighting coefficient applied to each impact within its group. The sum of these coefficients equals 100% when you add all coefficients within the same group.

| End-point damages                     | Mid-point impacts                | Normalization coeff.        | Global weighting coeff. | Group weighting coeff. |
|---------------------------------------|----------------------------------|-----------------------------|-------------------------|------------------------|
| Climate damage                        | Total climate change             | 8.10E+03 kg CO2e            | 33.33%                  | 100.00%                |
| Ecological damage                     | Acidification                    | 5.56E+01 mol H+eq           | 9.81%                   | 76.35%                 |
| Ecological damage                     | Freshwater ecotoxicity           | 4.27E+04 CTUe               | 3.04%                   | 23.65%                 |
| Damage to human health                | Human toxicity (non-carcinogenic)| 2.30E-04                    | 2.91%                   | 10.26%                 |
| Damage to human health                | Human toxicity (carcinogenic)    | 1.69E-05                    | 3.37%                   | 11.87%                 |
| Damage to human health                | Fine particulate matter emissions| 5.95E-04                    | 14.18%                  | 49.94%                 |
| Damage to human health                | Ionizing radiation emissions     | 4.22E+03 kBq U-235 eq       | 7.93%                   | 27.93%                 |
| Damage from resource depletion        | Water resource use               | 1.15E+04 m3                 | 13.47%                  | 52.99%                 |
| Damage from resource depletion        | Natural resource depletion       | 6.36E-02 kg Sb eq           | 11.95%                  | 47.01%                 |

The PEF score unit is the mPt (millipoint), the point being an arbitrary unit. 1 Pt is representative of the annual environmental impact of a European inhabitant (1 inhabitant for 1 Pt).

Finally, a change of scale is applied, as done in many labeling approaches. Two major methodologies are used:
- Change the reference. This approach has the advantage of expressing an impact relative to other services and enabling a score out of 100.
- Switch to a non-linear scale. The idea is to introduce non-linearity between the score scale and the display scale so that the latter can be fully used (with values across the entire range, not only at extremes).

We developed an approach that combines the advantages of these two methodologies. Care is given to the equation (introducing non-linearity) and the bounds used (construction of the reference).

Environmental scores are defined using a cumulative distribution function (CDF) presented here:

$$
\begin{align*}
&C(x) = \frac{1}{2} \times (1 - E_{rf}(\frac{ln(x)-\mu}{\sqrt{2}\times\sigma})) \\
Avec\\
&C(x) = \text{Complementary Log-Normal CDF} \\
&\mu = ln(m) = \text{Location} \\
&\sigma = \frac{\lvert ln(p_{10}) - \mu \rvert}{\sqrt{2} \times 0.9061938024368232} = \text{Shape} \\
&m = \text{Median}
\end{align*}
$$

Environmental scores are integers between 0 (bad) and 100 (excellent). The log-normal distribution is characterized by a lower limit of 0 at −∞ and an upper limit of 1 at +∞, which makes scores 0 and 100 unattainable.

The cumulative distribution function (CDF) calculates the cumulative probability for a given impact value x; that is, the probability of having a value ≤ x in our reference base.

The distribution profile is determined from two characteristic points: the median (m) and the 90th percentile (p10). The value of these points is determined from reference studies (https://httparchive.org/).
