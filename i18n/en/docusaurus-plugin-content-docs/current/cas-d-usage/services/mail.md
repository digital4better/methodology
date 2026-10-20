# Email

import { MethodIllustration } from '@site/src/components/method-illustrations';

Assessment of a message, campaign or email volume distinguishes writing, reading, transfers and retention. A universal per-email figure would conceal differences in size, recipients and storage duration.

## Prepare the data

| Input | Coverage |
|---|---|
| Messages, recipients and reading rate | Campaign or period activity |
| Message size | Body, attachments and actual transmitted data |
| Writing and reading durations | Device time, separate from server processing |
| Physical copies and retention | Storage, backups counted once |
| Hosting | Allocated processing, excluding separately assessed storage |

The scenario assumes average recipient behaviour. For annual email usage with an existing archive, that archive forms part of the storage inventory; new-message count does not describe it.

<span id="understand-the-calculation" />

Device time is `messages × (writing time + recipients × reading share × reading time)`. Electricity and allocated manufacture rely on duration converted to hours.

The transfer model adds one upload, one delivery per recipient and readers' downloads. This is a simplified path; measured flows replace it if synchronization or protocols differ.

## Detailed method and special cases

### Break down a message journey

| Stage | Activity | Check |
|---|---|---|
| Composition | Sender's active time | Once per composed message, not per recipient |
| Sending and delivery | Message, attachments, envelopes and recipients | Logical messages distinct from transferred bytes |
| Reading and synchronization | Reading share, duration, downloads and devices | Synchronization may occur without reading |
| Retention | Physical capacity and duration, copies and backups | Replication counted once, including any factor coverage |
| Processing | Spam filtering, antivirus, indexing, mail server | Shared-resource allocation |

For $N$ messages, $R$ recipients, reading share $l$, writing/reading minutes $t_e,t_l$ and size $s$ in MB:

$$
H_{device}=\frac{N(t_e+Rl t_l)}{60}
$$

$$
G_{network}=\frac{Ns}{1000}(1+R+Rl d),\qquad
S_{storage}=\frac{Ns}{1000}c m
$$

$d$ is downloads per reader, $c$ total physical copies and $m$ months. This synchronization model is simplified: clients downloading every message require measured bytes or an adapted journey that distinguishes reading and download shares.

Device manufacture uses the average per-second profile or, in custom mode, device manufacture divided by lifetime. The storage factor in kg CO₂e/GB.month must cover its stated phases. Hosting excludes storage when calculated separately.

### Marketing campaigns, old mail and attachments

Campaign composition forms a separate contribution or a share of time allocated among sent messages.

<MethodIllustration kind="mail-campaign" lang="en" />

Annual mailbox storage includes existing mail. Integrate capacity over time, for example monthly average capacity times duration. The simulator represents a batch retained for a fixed period; it does not reconstruct mailbox history.

A download link replaces an attachment with other transfers and remote storage. The assessment covers actual accesses, retention and the sharing service. The effect depends on reader count; no fixed saving is assumed.

### Sender, recipients and mail protocols

The historical journey distinguishes the sender device, sending server, receiving server and recipient device. Each segment may involve a different country and network. Header exchanges, IMAP synchronisation and POP downloads cannot be inferred from the reading rate alone.

Sent copies, received copies and backups may have different retention periods. Their physical capacity is tracked separately before aggregation in GB.months. The example's single retention parameter is a simplification, not a rule shared by all mailboxes.

The historical note relies on ADEME Impact CO₂'s hosting approach. The example below uses separate processing and storage inputs: it does not reproduce that generic estimate. Complete factors and their components are never added together.

### Interpret the result

Example: default inputs give 46.67 device hours, 2.8 GB transferred and 36 GB.month stored. Missing network and storage factors prevent a complete total. The result distinguishes measurements, inferences and exclusions and relates to a sent message or clearly defined campaign.

## Complete the boundary

Network and storage factors remain blank until compatible data is supplied. The subtotal does not treat them as zero. Campaign creation, CRM and analytics tools should be added if the studied function includes them.

A complete email-service factor already includes its components. Within a collaboration suite, the email share requires documented allocation. A published figure is insufficient without checking its period, boundary and unit.

<span id="rules-and-sources" />

The result is framed by [boundary and functional unit](../../fondations/perimetre-frontieres-services-tiers-et-unite-d-analyse), [allocation](../../regles/allocation-et-partage-des-impacts) and [double counting](../../regles/double-comptabilisation).

Electricity factors come from the D4B 2025 snapshot[^ref-1]. Prefilled activity and hosting values are exercise assumptions. Factors and conventions are available below the simulator.

<span id="understand-parameter-effects" />

Attachment size and retention duration affect traffic and storage differently. Deleting messages reduces an allocated quantity here; it does not prove an immediate reduction in electricity consumption on a server that remains powered on.

## Interactive example {#explore-your-scenario}

This example applies the calculations and limitations described above.

Ex: 1,000 messages of 1 MB stored as three physical copies for twelve months represent **36 GB.month**. This is activity, not a carbon footprint. The storage factor must apply to physical capacity and cover the declared phases.

import { ScenarioPlayground } from '@site/src/components/scenario-playground';

<div className="inline-example">

<ScenarioPlayground kind="mail" lang="en" />

</div>

[^ref-1]: Digital4Better, [D4B 2025 snapshot](https://github.com/digital4better/data/blob/77cae4a58fadd5deb3b8d4e5577020da08f780d8/data/factor/country-yearly.csv). Snapshot 77cae4a, 2025 data; reviewed 16 October 2026.
