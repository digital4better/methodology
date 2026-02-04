---
sidebar_position: 7
---

# Appendices

## Calculating real lifetimes

### Definitions

The term “lifetime” is used in organizations to refer to different notions. It is important to distinguish what is meant to understand the mechanisms involved and when to use which data.

#### Age

The duration since the equipment has been present in the organization’s inventory; that is, the time elapsed between its entry date in the inventory and today’s date, or failing that, its exit date.

#### Real lifetime

The real lifetime represents the average observed lifetime of the equipment in the fleet. This is the lifetime worth using as an indicator because it reflects good or bad organizational practices:
- If equipment lasts longer than the nominal lifetime, the real lifetime increases.
- If equipment lasts less than the nominal lifetime (breakage, loss, misuse, etc.), the real lifetime decreases.

#### Nominal lifetime

This is the minimum expected lifetime for equipment entering the organization’s fleet. It is set by the organization in line with its ambitions and can be revised depending on progress made.

The nominal lifetime can be used in impact assessments when real lifetimes are unavailable and to set up an amortization mechanism for embodied impact.

Example:
- An organization sets the nominal lifetime of its smartphones to 4 years.
- A new smartphone is purchased in 2023.
- Its embodied footprint will be divided by 4 and accounted for in the 2023, 2024, 2025, and 2026 footprints.
- If the smartphone lasts beyond 2026 and its nominal lifetime, its embodied footprint will no longer be counted, but its operational footprint will still be counted because the smartphone continues to consume energy.

:::note
Nominal lifetimes can be updated by the organization, but this impacts footprint calculations. These updates should therefore remain occasional and justified.
:::

#### Active equipment

Equipment listed in the inventory with no exit date and still in working condition.

#### Retired equipment

Equipment listed in the inventory with an exit date during the current year and/or that is no longer in working condition, temporarily or permanently.

### Calculating the real lifetime of equipment

#### Methodology

Depending on the context, real lifetime is calculated by model, by equipment category (laptop, smartphone, etc.), or for the entire fleet.

The calculation methodology is based on splitting the fleet into three populations. In each, a rule adapted to determine the individual lifetime of a fleet item is applied:

| Population | Profile                                                                                           | Lifetime used |
|-----------|----------------------------------------------------------------------------------------------------|---------------|
| A         | Active equipment with age below the nominal lifetime                                               | Nominal lifetime |
| B         | Active equipment with age above the nominal lifetime                                               | Age |
| C         | Equipment retired from inventory with age below the nominal lifetime                               | Age |

The real lifetime is calculated from the average lifetimes obtained in the three populations, weighted by the number of items in each population.

Example:

The table below represents the inventory of 4 smartphones for which the nominal lifetime was set to 4 years.

| Purchase year | Status | Age (years) | Nominal lifetime (years) | Population | Lifetime for calculation |
|--------------|--------|-------------|--------------------------|------------|--------------------------|
| 2018         | Stock  | 6           | 4                        | A          | 6                        |
| 2019         | Fleet  | 5           | 4                        | A          | 5                        |
| 2021         | Broke  | 3           | 4                        | B          | 3                        |
| 2022         | Fleet  | 2           | 4                        | C          | 4                        |

Average lifetime per population:
- Population A: (6+5)/2 = 5.5 years/equipment
- Population B: 3 years/equipment
- Population C: 4 years/equipment

Lifetime for the “smartphone” category (average of population lifetimes, weighted by number of items): (5.5 * 2 + 3 * 1 + 4 * 1) / 4 = 4.5 years

The “smartphone” real lifetime is 4.5 years.

#### Influence of refurbished purchases

The value of buying refurbished equipment is to extend the equipment’s lifetime and thus reduce embodied footprints by slowing the purchase of new equipment.

To properly account for this reduction in impact, it is necessary to know the duration of use before the equipment arrives in the organization. This duration is added to the individual lifetime and will therefore influence the final lifetime of the model.

Example:

The table below reuses the smartphone example above, adding a refurbished model purchased in 2023 that already has 3 years of existence.

Because its use within the organization is shorter than the nominal lifetime, the nominal lifetime is retained for the lifetime calculation. We add the use time before arrival in the organization to obtain a final lifetime of 7 years for this item.

| Purchase year | Status | Use duration in organization (years) | Nominal lifetime (years) | Use duration before arrival (years) | Population | Lifetime |
|--------------|--------|--------------------------------------|--------------------------|-------------------------------------|------------|----------|
| 2018         | Stock  | 6                                    | 4                        | 0                                   | A          | 6        |
| 2019         | Fleet  | 5                                    | 4                        | 0                                   | A          | 5        |
| 2021         | Broke  | 3                                    | 4                        | 0                                   | B          | 3        |
| 2022         | Fleet  | 2                                    | 4                        | 0                                   | C          | 4        |
| 2023         | Stock  | 1                                    | 4                        | 3                                   | C          | 7        |

The “smartphone” real lifetime to consider then becomes 5 years (average of population lifetimes, weighted by the number of items).
