# Update process

Reproducibility requires explicit changes, a preserved previous state, an assessment of consequences on reference cases, and synchronized documentation, data, simulators and translations. A recent publication does not automatically supersede an older source that better matches the study object.

## Revision triggers

A correction is required when an error in units, equations, boundaries or allocation is found. A new factor version, relevant publication or material technological change triggers a relevance review. Rapidly changing parameters, such as electricity mixes, cloud configurations and AI models, are reviewed when a study is undertaken. LCA foundations are reviewed when their reference framework changes.

An announced update frequency does not prove that a source has been updated. Freshness depends on the latest period actually available. An incomplete year cannot be compared with a complete year without qualification.

## Change record

Every modification affecting a result has a record containing:

| Field | Expected content |
|---|---|
| Object | Affected pages, equations, factors and simulators |
| Reason | Correction, new evidence, scope change or revised convention |
| Source | Author, title, URL or DOI, version, publication date and access date |
| Data | File and row identifier, commit or version, period, geography, unit and characterization method |
| Decision | Previous and retained values, justification, and measured, published, derived or assumed status |
| Effect | Before/after result for an identical case, explanation of the difference and remaining limitations |
| Verification | Commands executed, outcomes and relevant visual checks |
| Translations | Synchronized French and English pages |
| Glossary | Definitions of new or revised key terms, chapter links and French equivalents |

Shared values belong in the [Assumptions register](./registre-des-hypotheses-et-valeurs-par-defaut). Refactoring archives preserve replaced passages; they are not a second register of applicable defaults.

Corpus reviews cover original publications, their annexes and formulas from earlier versions. Transcriptions support searches; originals resolve ambiguities. Each reused contribution records its source passage, editorial decision and any numerical effects requiring separate assessment.

## Assess a new source

1. The review covers the method and limitations, beyond the abstract or press release.
2. Suitability depends on functional unit, boundaries, technology, geography, period and allocation.
3. Factors sharing an acronym can be combined only if their characterization methods are compatible.
4. A reproduced published example supports the review; any obstacle to reproduction remains explicit.
5. The decision specifies whether the source replaces a factor, adds a scenario or remains a research lead. Preprints are identified as such.

A paper about a particular chip does not validate universal coefficients by process node. A whole-device factor must not be added to its component factors. A site-level measurement must not receive PUE a second time.

## Validate before publication

Minimum checks cover physical dimensions, unit conversions, zero and missing values, consumption boundaries and double counting. Reference cases should test useful properties: conservation of totals, PUE affecting use only, electricity-factor sensitivity, and time/resource sharing.

In this repository, validation relies on `yarn test:calculations`, `yarn typecheck` and `yarn build` with the project's declared Node version. Browser checks cover both languages: navigation, equations, tables, simulators, keyboard input and narrow screens. A successful English build is insufficient: every navigation page must have a complete translation without silently falling back to French.

A numerical correction must synchronize the page example and simulator, or explicitly explain why their assumptions differ. Blocking link errors, unrendered equations and non-finite results must be resolved before publication.

## Versioning and visible limitations

An immutable snapshot supports reproducibility. The period described by the data differs from the access date. Preserved pre-revision results support historical comparison. A trend assessment relies on both periods recalculated with a common method or on an isolated estimate of the methodological change.

Missing data remains explicit. An indicator withheld because a compatible unit or inventory is unavailable is identified next to the result and in the register. Missing data is not zero, and a subtotal is not a complete LCA.

Scientific and technical review prepares a version; it does not automatically publish it. The version record identifies checks actually passed and remaining qualifications.

## Incorporating a framework revision

A new edition does not automatically replace D4B conventions. Each finding is classified as convergence, compatible addition, difference to explain, demonstrated error or ambiguity to investigate. Editorial clarifications can update the documentation directly. Formula, factor, allocation or score changes require a separate proposal with a before/after example and compatibility impacts.

Footnotes identify the cited edition, relevant pages and exclusions. The parent PCR sets a maximum study validity of five years, reduced to three for AI. This is not a factor refresh schedule and does not guarantee that data remains representative until then.[^rcp-parent]

[^rcp-parent]: ADEME, [RCP services numériques, version 2, juin 2026](https://librairie.ademe.fr/societe-et-politiques-publiques/9418-methodologie-d-evaluation-environnementale-basee-sur-l-analyse-du-cycle-de-vie-acv-pour-un-service-numerique.html), p. 24–27.

## Target method and historical data {#target-method}

V2 describes the reference for future development. An implementation may cover only part of this framework; results identify the version and assessed items.

Transitioning from flat equipment factors to component models preserves historical snapshots for reproduction. New configurations and models have their own versions. Trends are recalculated with a common method before being interpreted as changes in use.
