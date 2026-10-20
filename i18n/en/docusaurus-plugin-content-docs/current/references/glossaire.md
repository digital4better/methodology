# Glossary

Definitions reflect how terms are used in this methodology. Links lead to the calculations, assumptions and sources in the relevant chapter.

## AWARE (Available WAter REmaining) {#aware}

A characterization method for potential water deprivation affecting humans and ecosystems. It weights consumed volumes by local water availability. Results use m³ world-equivalent, distinct from physical m³ consumed. [Detailed explanation](../fondations/indicateurs-environnementaux.md#indicators-under-review).[^aware]


## Actual lifetime {#duree-de-vie-reelle}

A lifetime estimated from equipment still in use and retired equipment. The final lifetime of equipment still operating remains unknown. See the [estimator and its limitations](../regles/temporalite-vieillissement-et-versionnement-des-donnees).

## Allocation {#allocation}

A rule assigning a study object its share of a shared resource's impacts. Main approaches include time, transferred volume, reserved capacity, user count and documented fixed shares. See [Allocation and sharing](../regles/allocation-et-partage-des-impacts).

## Native application {#application-native}

An application running in a device’s operating-system environment, on mobile or desktop. This chapter also covers installed hybrid and cross-platform applications: distribution, local activity and remote services are inventoried by the resources actually used. See [Native applications](../cas-d-usage/services/mobile).

## Hybrid application {#application-hybride}

An application combining native functions and embedded web content. Contributions are allocated without adding two complete inventories of the same journey. See the [application boundary](../cas-d-usage/services/mobile).

## Background activity {#arriere-plan}

Activity without direct interaction with the interface: synchronisation, notifications or deferred processing. Its duration is not equivalent to screen-on time; execution depends on the system and its restrictions. See [platform specificities](../cas-d-usage/services/mobile#specificites-mobiles-et-ordinateurs).

## Archetype {#archetype}

A documented representative configuration for an equipment or component family. It provides a reference when actual characteristics are missing. Borrowed values remain estimates; suitability depends on range, generation, features and use context. See [missing data](../modelisation/modelisation-d-un-equipement#missing-data).

## Attributional approach {#approche-attributionnelle}

An approach that assigns a system’s impacts to the products or services studied. A smaller allocated share does not by itself demonstrate physically avoided emissions. [Detailed explanation](../fondations/principes-acv-appliques-au-numerique).

## Reference barycentre {#barycentre}

Geographical point representing a country in the reference dataset. The method uses the great-circle distance between these points to estimate distance between countries. It identifies neither a router nor a data centre and does not describe routing. See the [network model](../materiel/reseau-et-infrastructure/reseau).

## Batch {#batch}

A group of inputs processed together by a model. Batch size affects memory requirements and performance; its effect depends on hardware and the execution engine. [Detailed explanation](../cas-d-usage/services/ia-generative.md).

## Boundary (system boundary) {#perimetre}

The activities, resources and life-cycle stages included in a study, with its period and exclusions. An outsourced service can remain within the boundary when it contributes to the studied function. [Detailed explanation](../fondations/perimetre-frontieres-services-tiers-et-unite-d-analyse).

## CDN (Content Delivery Network) {#cdn-content-delivery-network}

A geographically distributed server network that delivers content near users. Caching can reduce origin-server traffic and transfer distances, while the CDN's own infrastructure remains within the relevant scope.

## Characterization factor {#facteur-de-caracterisation}

A coefficient relating an inventory flow, such as an emission, to an impact indicator. It depends on the characterization method and version; it is not necessarily a whole-equipment factor. [Detailed explanation](../fondations/indicateurs-environnementaux).

## Cradle-to-gate {#cradle-to-gate}

Boundary from raw-material extraction to the product leaving the declared production stage. Downstream use and end of life are excluded; transport, packaging and infrastructure depend on the stated boundary. See [data quality](../regles/qualite-des-donnees-et-matrice-de-robustesse).

## Double counting {#double-comptabilisation}

Counting the same physical impact more than once through overlapping boundaries. See [Double counting](../regles/double-comptabilisation).

## Electricity mix {#mix-electrique}

The distribution of electricity generation sources for an area and period. Associated impact factors depend on technologies and inventories; a renewable share is not a zero-impact factor. [Detailed explanation](../fondations/impacts-de-la-consommation-d-energie).

## Embedding {#embedding}

A numerical vector representation of content, used notably to retrieve related content. Its production, storage and retrieval belong within a RAG application’s boundary. [Detailed explanation](../cas-d-usage/services/ia-generative.md).

## Embodied impact {#impact-intrinseque}

Environmental impacts of creating and disposing of hardware, including extraction, manufacturing, transport and end of life. The share assigned to a use depends on the allocation rule.

## Endpoint approach {#approche-end-point}

An indicator of potential damages, for example to human health or ecosystems. Moving from midpoints to endpoints requires additional models. Grouping indicators by theme alone is not an endpoint calculation.[^mid-end]

## Environmental footprint {#empreinte-environnementale}

An assessment of pressures associated with human activities on resources and ecosystems, expressed here through multiple midpoint indicators.

## Environmental indicator {#indicateur-environnemental}

A quantity describing an environmental effect or pressure after characterization. The nine selected indicators are distinct and cannot be added together. Their [units and methods](../fondations/indicateurs-environnementaux) determine factor compatibility.

| Acronym | Meaning |
|---|---|
| GWP | Global warming potential |
| AP | Acidification potential |
| CTUe | Freshwater ecotoxicity |
| CTUh-nc | Human toxicity, non-cancer effects |
| CTUh-c | Human toxicity, cancer effects |
| PM | Health effects of particulate matter |
| IR | Effects of ionizing radiation |
| WU | Characterized impact of water use |
| ADPe | Abiotic depletion of mineral and metal resources |

## Equipment {#equipement}

Electronic devices within the three digital tiers: user devices, network equipment and datacenter equipment. Used to display, process, store or transmit data.

## Fine-tuning {#fine-tuning}

Further training of an already trained model to adapt it to data or a task. The number of modified parameters alone does not determine computation cost. [Detailed explanation](../cas-d-usage/services/ia-generative.md).

## Fixed-share allocation {#allocation-forfaitaire}

A conventional fixed share assigned to a service when measured usage data are unavailable. Used as a documented fallback.

## FLOP and FLOP/s {#flop}

A FLOP is a floating-point operation; FLOP/s is a rate of operations per second. Workload and throughput are different quantities whose ratio can estimate a duration. [Detailed explanation](../cas-d-usage/services/ia-generative.md).

## Functional unit and analysis unit {#unite-fonctionnelle}

The functional unit describes the service delivered, its quantity and quality conditions. The analysis unit expresses the result, for example per session. A shared counting unit does not guarantee equivalent functions. [Detailed explanation](../fondations/perimetre-frontieres-services-tiers-et-unite-d-analyse).

## GPU (Graphics Processing Unit) {#gpu}

A processor suited to parallel computation, notably graphics and AI. Its assessment covers the included hardware life-cycle stages, operation and its share of server resources. [Detailed explanation](../materiel/composants/processeurs-et-accelerateurs).

## GPU-hour {#gpu-heure}

One hour on one GPU; multiple GPUs over the same duration accumulate GPU-hours. A per-GPU-hour factor specifies whether its basis is active, reserved or calendar time, and which life-cycle stages it includes. See the [AI use case](../cas-d-usage/services/ia-generative.md).

## HBM (High Bandwidth Memory) {#hbm}

High-bandwidth memory associated with some accelerators. Its manufacture and operation belong to the hardware boundary; HBM already included in a GPU factor is not added separately. [Detailed explanation](../materiel/composants/memoire-vive).

## Hypervisor {#hyperviseur}

Software that creates and manages VMs on a physical server, such as VMware ESXi, KVM, Hyper-V or Xen. It uses hardware resources and can introduce overhead.

## Impact factor {#facteur-d-impact}

Impact per reference quantity, such as a device, kWh, GB or duration. Its use requires units, life-cycle stages and a characterization method compatible with the study. [Detailed explanation](../regles/hypotheses-valeurs-par-defaut-et-hierarchie-des-sources).

## Inference {#inference}

Execution of a trained model to produce an output from an input. Depending on the task, it includes prompt or media processing and response generation. [Detailed explanation](../cas-d-usage/services/ia-generative.md).

## KV cache (Key-Value) {#cache-kv}

Retention of attention keys and values for previously processed tokens for reuse during generation. It avoids some recomputation but uses memory. [Detailed explanation](../cas-d-usage/services/ia-generative.md).

## LCA (Life Cycle Assessment) {#acv-analyse-du-cycle-de-vie}

A standardized methodology, ISO 14040/14044, for assessing environmental impacts across a product or service life cycle: raw-material extraction, manufacturing, transport, use and end of life. Its principles also inform organizational assessment.

## Life-cycle inventory {#inventaire-du-cycle-de-vie}

Inventory of flows needed for the study: materials, energy, emissions and waste within the retained boundary. It forms the basis for impact calculation and extends beyond an equipment list. [Detailed explanation](../fondations/principes-acv-appliques-au-numerique).

## LoRA (Low-Rank Adaptation) {#lora}

An adaptation method that trains low-rank matrices while keeping base weights frozen. Fewer trainable parameters do not automatically imply the same reduction in energy or operations. [Detailed explanation](../cas-d-usage/services/ia-generative.md).

## Material criticality {#criticite}

Assessment of a material’s economic importance and supply risk. It is not an environmental impact indicator and differs from ADPe. [Detailed explanation](../materiel/materiaux/materiaux-critiques).

## MFU (Model FLOPs Utilization) {#mfu}

The ratio of model-useful computational throughput to theoretical accelerator throughput under the retained conventions. It helps estimate duration; it is neither GPU activity nor a fraction of power consumption. [Detailed explanation](../cas-d-usage/services/ia-generative.md).

## Midpoint approach {#approche-mid-point}

An indicator of an intermediate environmental problem, such as climate change in kg CO₂ eq. or acidification. It characterizes emissions and resource withdrawals without estimating final damages.[^mid-end]

## Model parameters {#parametres-du-modele}

**Total** parameters are stored weights; **active** parameters participate in the current computation. **Trainable** parameters can have their values updated. A **frozen** parameter keeps its value but can still participate in computation, including gradient propagation to other layers. MoE and weight freezing therefore affect different dimensions. [Detailed explanation](../cas-d-usage/services/ia-generative.md).

## MoE (Mixture of Experts) {#moe}

An architecture that activates only some model experts for each token. Active parameters contribute to computation; stored parameters remain relevant to memory estimation. [Detailed explanation](../cas-d-usage/services/ia-generative.md).

## Nominal lifetime {#duree-de-vie-nominale}

An expected or conventional reference lifetime for equipment. It supports allocation when a better documented duration is unavailable; it is not a guaranteed minimum lifetime. See [time and aging](../regles/temporalite-vieillissement-et-versionnement-des-donnees).

## Operational impact {#impact-operationnel}

Use-phase impact, modeled here primarily from the electricity required to operate equipment.

## PAIA (Product Attributes to Impact Algorithm) {#paia}

Streamlined approach for estimating equipment footprints from product attributes. It identifies major contributions; its results and uncertainty alone are insufficient for ranking similar models. See [manufacturer report interpretation](../regles/qualite-des-donnees-et-matrice-de-robustesse).

## PCF (Product Carbon Footprint) {#pcf}

A product footprint limited to climate impact. Included stages, configuration and usage scenario are specific to each report; the acronym guarantees neither a complete life cycle nor independent verification. See [data quality](../regles/qualite-des-donnees-et-matrice-de-robustesse).

## Prefix cache {#cache-de-prefixe}

Reuse across requests of states computed for a shared prompt prefix. It reduces prefix processing without removing response computation or cache resource requirements. [Detailed explanation](../cas-d-usage/services/ia-generative.md).

## Primary data {#donnee-primaire}

Data collected directly within the study scope or provided by an actor directly involved. Secondary data come from literature or generic reference datasets.

## Prompt {#prompt}

Input supplied to a model: instructions, context and any media. Processing it and generating the response are distinct activities in the computation model. [Detailed explanation](../cas-d-usage/services/ia-generative.md).

## Proxy {#proxy}

A substitute input or model used when direct information is unavailable. Its boundary, representativeness and limitations remain explicit; using it does not turn an estimate into a measurement. [Detailed explanation](../regles/qualite-des-donnees-et-matrice-de-robustesse).

## PUE (Power Usage Effectiveness) {#pue-power-usage-effectiveness}

Total datacenter energy divided by IT-equipment energy. A PUE of 1.0 means no additional site energy beyond IT equipment, which includes compute, storage and networking. The value 1.58 is a historical fallback scenario, not a verified current global average.

## Quantization {#quantification}

Representation of model values at reduced numerical precision. It can change memory requirements, throughput and output quality; it does not automatically reduce the number of parameters. [Detailed explanation](../cas-d-usage/services/ia-generative.md).

## RAG (Retrieval-Augmented Generation) {#rag}

Generation augmented with content retrieved from a document collection. Assessment also covers embeddings, indexing, retrieval and storage, beyond the model call alone. [Detailed explanation](../cas-d-usage/services/ia-generative.md).

## Equivalent radius {#rayon-equivalent}

Radius of a disk with the same area as the country: $r=\sqrt{S/\pi}$, with $S$ in km² and $r$ in km. It estimates internal distance in the network model. The associated circle follows neither borders nor network coverage. See the [network model](../materiel/reseau-et-infrastructure/reseau).

## RCP (Product category rules) {#rcp-referentiel-par-categorie-de-produit}

Environmental assessment rules for a product or service category. Sector-specific rules extend the parent digital-services PCR. Their use here does not establish overall compliance. See [D4B’s positioning](../introduction/positionnement-par-rapport-aux-referentiels-existants).

## REF and CFE {#ref-et-cfe}

REF describes renewable energy share. CFE describes carbon-free energy under the provider's convention and may include nuclear energy. These percentages are not interchangeable and do not automatically reduce a location-based electricity factor.

## Reserved capacity {#capacite-reservee}

Resources made available to a service, even when little used. Reservation-based allocation assigns that committed capacity; it does not directly measure actual consumption. [Detailed explanation](../regles/allocation-et-partage-des-impacts).

## Resource sharing {#mutualisation}

Sharing hardware between services or users, including through virtualization or containers. It can reduce physical equipment requirements when capacity is actually consolidated.

## Robustness matrix {#matrice-de-robustesse}

A D4B documentation grid across six dimensions: boundary, geography, time, physical description, traceability and method. Each dimension receives a justified score from 1 to 5. It is not certification. See [data quality](../regles/qualite-des-donnees-et-matrice-de-robustesse).

## Robustness score {#score-de-robustesse}

The mean of the six documentation ratings in the D4B grid. Individual dimensions and blocking incompatibilities take precedence over that mean; it is neither a probability of correctness nor a confidence interval. See [data quality](../regles/qualite-des-donnees-et-matrice-de-robustesse).

## SCI and SCI-AI {#sci}

SCI (Software Carbon Intensity) describes software carbon intensity per functional unit. SCI-AI specifies its application to AI. These carbon frameworks do not replace a multi-impact assessment. [Detailed explanation](../introduction/positionnement-par-rapport-aux-referentiels-existants).

## Secondary data {#donnee-secondaire}

Data from literature, a database or a context other than direct measurement of the studied system. Suitability depends on compatibility and representativeness, not only age. [Detailed explanation](../regles/qualite-des-donnees-et-matrice-de-robustesse).

## Sensitivity analysis {#analyse-de-sensibilite}

Variation of assumptions within justified bounds to observe their effect on the result. It identifies inputs that influence the conclusion; it does not provide a statistical confidence interval. [Detailed explanation](../regles/qualite-des-donnees-et-matrice-de-robustesse).

## TDP (Thermal Design Power) {#tdp}

A component’s thermal design power under the manufacturer’s conventions. It is not a measurement of average server power or energy consumed over a period. [Detailed explanation](../materiel/composants/processeurs-et-accelerateurs).

## TEC (Typical Energy Consumption) {#tec}

Typical electricity consumption associated with a protocol and operating profile. Annual TEC includes that profile’s modes and durations; it is not measured active power for an application. See the [Native applications](../cas-d-usage/services/mobile).

## Third-party service {#service-tiers}

A service supplied by an external actor and used by the studied function, such as an API, payment, video or cloud service. Outsourcing does not justify exclusion; overlaps with other contributions still need accounting. [Detailed explanation](../fondations/perimetre-frontieres-services-tiers-et-unite-d-analyse).

## Time allocation {#allocation-temporelle}

Assigning impacts in proportion to the service's usage duration relative to equipment lifetime. A default rule for dedicated devices and servers.

## Token {#jeton}

A unit produced by a model’s text tokenization. A token is not equivalent to a word: counts depend on model, language and content. Media representations follow their own conventions. [Detailed explanation](../cas-d-usage/services/ia-generative.md).

## Training {#entrainement}

Adjustment of a model’s parameters using data. Processed volume counts every presentation of the data; experiments and preparation can also contribute to the model life cycle. [Detailed explanation](../cas-d-usage/services/ia-generative.md).

## User device {#terminal}

Electronic equipment through which a user interacts with a computing system: computers, smartphones, tablets, payment terminals, ATMs and others.

## vCPU {#vcpu}

A virtual processing unit assigned to a VM. Its relationship to physical threads and cores depends on the offering, architecture, simultaneous multithreading and oversubscription. That relationship is part of the allocation assumptions.

## Versioning {#versionnement}

Recording the versions of data, factors and methods used in an assessment to support reproducibility and comparison over time.

## VM (virtual machine) {#machine-virtuelle}

An execution environment using a share of a physical host’s resources. It is not additional hardware; its impacts derive from allocation of host resources and associated infrastructure. [Detailed explanation](../regles/prise-en-compte-des-couches-logicielles-et-de-la-virtualisation).

## Volume allocation {#allocation-volumetrique}

Assigning impacts in proportion to transferred data volume. This attribution convention does not demonstrate physical consumption proportional to bytes. See the [network model](../materiel/reseau-et-infrastructure/reseau).

## WUE (Water Usage Effectiveness) {#wue-water-usage-effectiveness}

Direct site water use divided by IT-equipment energy, usually in liters per kWh IT. Its definition identifies whether the numerator represents withdrawal or consumption, along with the period and site. Distinct from WU, a characterized water-impact indicator.

## Reference configuration {#reference-configuration}

An explicit component assembly used when an equipment’s exact composition is unknown. Characteristics are documented assumptions; impacts are recalculated with component models. A configuration is not a renamed flat impact factor.

## Calibration {#calibration}

Estimating or adjusting model parameters using independent, compatible evidence. Validation then assesses its ability to reproduce observations distinct from the fitting data.

## Derived factor {#derived-factor}

A model result normalised to a unit, such as device manufacturing per second. Reproduction requires the configuration, coefficients, boundaries and allocation convention.

## LAN {#lan}

Local network connecting devices on a site: switches, access points, cabling and supporting equipment. Its boundary differs from Internet access.

## GB·km {#go-km}

A volume in gigabytes multiplied by a distance in kilometres. In the D4B network model, 2 GB over a conventional distance of 100 km represents 200 GB·km. This is an allocation-model quantity, not a direct energy measurement. See [Network](../materiel/reseau-et-infrastructure/reseau).

## Codebook {#codebook}

A learned set of codes representing a signal in discrete form. An audio model can combine several codebooks to represent different levels of detail; their count alone does not determine actual compute cost. [Detailed explanation](../cas-d-usage/services/ia-generative.md).

## Diffusion (generative model) {#diffusion}

Generation through successive denoising steps, guided by instructions or media. DiT uses a Transformer; U-Net uses an architecture with downsampling followed by upsampling. Step count, processed positions and architecture determine the workload. [Detailed explanation](../cas-d-usage/services/ia-generative.md).

## Latent space {#espace-latent}

An internal media representation, often more compact than pixels or audio samples. Computation can operate on these latent positions. A VAE (variational autoencoder) can map between this representation and the media; decoding is a processing stage to inventory. [Detailed explanation](../cas-d-usage/services/ia-generative.md).

[^aware]: WULCA, [What is AWARE?](https://wulca-waterlca.org/what-is-aware/) and [FAQ: units](https://wulca-waterlca.org/what-is-aware/faq/). Boulay et al., 2018. Accessed 20 October 2026.

[^mid-end]: RIVM, [LCIA: the ReCiPe model](https://www.rivm.nl/en/life-cycle-assessment-lca/recipe), updated 29 October 2024.
