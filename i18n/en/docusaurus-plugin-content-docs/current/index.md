# Assess a digital service

This methodology connects digital activity to the equipment, energy and environmental impacts it relies on. It explains how to construct a calculation, check its assumptions and interpret its limitations.

## How an assessment is built {#move-from-a-question-to-a-result}

The [functional unit](./references/glossaire.md#unite-fonctionnelle) specifies the service delivered, its quantity and the expected quality. The calculation connects this service to the resources involved, then adds their impacts for each indicator. The result depends on the contributions covered and the assumptions made.

<figure className="assessment-example">
<figcaption>Example: visits to a website over one month</figcaption>
<ol>
<li><strong>The use being assessed</strong><div><p><b>100,000 one-minute page views.</b> The example covers user devices and hosting during this period.</p></div></li>
<li><strong>The resources involved</strong><div><p>These views represent <b>1,666.67 hours of device use</b>. The scenario also assumes 100 kWh of IT electricity allocated to hosting. The model accounts for equipment manufacturing and electricity consumption.</p></div></li>
<li><strong>The result and its limits</strong><div><p className="assessment-example-result"><b>33.57 <span>kg CO₂e</span></b><span>Subtotal for the month assessed</span></p><p>This result illustrates climate impact under the example’s assumptions. <b>Networks and third-party services are not assessed</b>: this is not the service’s complete footprint.</p></div></li>
</ol>
</figure>

The parameters are detailed in [the reproducible service calculation](./modelisation/modelisation-d-un-service#reproducible-example). They are not default values.

The approach is mainly **attributional**: it distributes impacts between uses. It does not automatically predict the physical consequences of a decision. A comparison requires the same function, comparable service quality and consistent boundaries.

## Find the relevant explanation

| Section | When to use it |
|---|---|
| [Foundations](./fondations/principes-acv-appliques-au-numerique) | Define what is measured, life-cycle phases and indicators |
| [Rules](./regles/allocation-et-partage-des-impacts) | Share impacts, avoid double counting and assess data quality |
| [Modelling](./modelisation/modelisation-d-un-service) | Assemble equipment or service contributions |
| [Hardware](./materiel/vue-d-ensemble-du-materiel) | Understand factors and physical models |
| [References](./references/sources-et-corpus) | Locate sources, versions and assumptions |

Concept pages give the principle and an example. Technical models describe inputs and equations. Use cases apply them. Formulas, assumptions and examples remain visible in the reading flow.

## Read a result correctly

A result must retain its unit, period, boundary and sources. **An unassessed contribution is not zero.** Use-case simulators currently calculate climate impact; other indicators in the framework require compatible factors before aggregation.

Electricity data is versioned in [Digital4Better Open Data](https://digital4better.github.io/data/). To select other factors, see [Data quality](./regles/qualite-des-donnees-et-matrice-de-robustesse). Open documentation issues are recorded in the [Assumptions register](./references/registre-des-hypotheses-et-valeurs-par-defaut).

## Choose a starting point

Each use case presents the boundary, required data, calculations and limitations, followed by examples.

import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

<div className="case-cards">
<Link to={useBaseUrl('v2-beta/cas-d-usage/environnements/parc-informatique')}><strong>IT fleet</strong><span>Inventory, electricity and lifetime.</span></Link>
<Link to={useBaseUrl('v2-beta/cas-d-usage/environnements/infrastructure-d-hebergement')}><strong>Hosting</strong><span>Servers, sharing and site operations.</span></Link>
<Link to={useBaseUrl('v2-beta/cas-d-usage/environnements/cloud')}><strong>Cloud</strong><span>Reserved resources, storage and region.</span></Link>
<Link to={useBaseUrl('v2-beta/cas-d-usage/services/service-web')}><strong>Web service</strong><span>Journeys, transfers and hosting.</span></Link>
<Link to={useBaseUrl('v2-beta/cas-d-usage/services/mail')}><strong>Email</strong><span>Sending, reading and retention.</span></Link>
<Link to={useBaseUrl('v2-beta/cas-d-usage/services/mobile')}><strong>Native applications</strong><span>Mobile and desktop: sessions, installations and updates.</span></Link>
<Link to={useBaseUrl('v2-beta/cas-d-usage/services/ia-generative')}><strong>Generative AI</strong><span>Training, text, image, video and audio.</span></Link>
</div>
