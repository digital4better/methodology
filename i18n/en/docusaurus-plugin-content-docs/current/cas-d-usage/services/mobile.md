---
sidebar_label: Native applications
---

import { MethodIllustration } from '@site/src/components/method-illustrations';

# Native applications: mobile and desktop

A [native application](../../references/glossaire#application-native) runs on a smartphone, tablet or computer. Assessment links distribution, device activity, networks and any hosting used. A reference function can be checking an account, calculating a route or producing a document, at comparable service quality.

The same framework covers installed hybrid and cross-platform applications. Their language does not determine their impact; the resources actually used do. Content executed in a web view follows [Web service](./service-web), without adding two complete assessments of the same journey.

## Prepare the data

| Activity | Required inputs |
|---|---|
| Sessions | Count, active duration, transferred bytes |
| Installations | Download count and actual downloaded size |
| Updates | Download count and size, differential where available |
| Device | Mobile or computer family, operating system, power and lifetime |
| Infrastructure | Energy and manufacture allocated to the app |

Notifications, SDKs, advertising and third-party calls belong in observed traffic or a separate inventory. Cellular share describes the network used: a smartphone on Wi-Fi follows the fixed-access path, while a computer may use a cellular connection.

<span id="understand-the-calculation" />

Transfers are `sessions × MB/session + installations × MB/installation + updates × MB/update`. Division by 1,000 gives decimal GB.

Average profiles use manufacture already allocated per second. Custom mode allocates manufacture to active time as a share of calendar lifetime. Electricity is calculated from the profile's average power. Screen activity, sensors and intensive processing may require separate profiles.

## Detailed method and special cases

### Separate distribution, sessions and background activity

For $N$ sessions, $n_i$ installations and $n_u$ updates, transferred GB are:

$$
G=\frac{N s_s+n_i s_i+n_u s_u}{1000}
$$

Sizes $s_s,s_i,s_u$ are actual downloaded MB. A differential update need not equal full package size. Users remaining on an old version do not automatically download every update.

Active time is $H=N t/3600$. The selected average profile supplies power and allocated manufacture per second. Custom profiles allocate manufacture over calendar lifetime. Separate measurements describe demanding functions: camera, GPS, 3D rendering or on-device inference. An average smartphone profile does not represent them accurately.

| Activity | Preferred measurement | Treatment |
|---|---|---|
| First launch | Download, decompression, initialization | Included in sessions or in a separate journey |
| Local cache | Actual transferred bytes, storage size and duration | Cache hits subtracted once |
| Notifications and sync | Wake-ups, bytes, CPU time and background energy | Separate activity contribution |
| SDKs and third parties | Calls, ads, telemetry, maps | Included in flows or in a separate inventory |
| Infrastructure | Allocated energy and manufacture | Idle and reserved resources included |

<MethodIllustration kind="native-app" lang="en" />

### Mobile and desktop specificities {#specificites-mobiles-et-ordinateurs}

The decomposition is shared; observations differ by platform.

| Observation | Mobile applications | Desktop applications |
|---|---|---|
| Device and display | Smartphone or tablet, brightness, screen on or off | Laptop or desktop, integrated or external screen, relevant peripherals |
| Local processing | Location, camera, sensors, rendering and on-device inference | CPU/GPU work, rendering, indexing and file processing |
| Background activity | Notifications, synchronisation and iOS/Android restrictions | Resident services, synchronisation, sleep and system power management |
| Distribution | Device-specific package, store, differential updates | Installer, store or enterprise deployment; actual downloads and cache use |

**On mobile**, radio and sensor activation and device wake-ups can contribute beyond data volume alone. Network conditions, brightness and sensor activity therefore accompany measurements.[^energie-mobile] System background restrictions affect the work actually performed: a scheduled synchronisation is not always an executed one.[^arriere-plan-android]

**On desktop**, an open application need not remain active continuously. The scenario distinguishes work, idle time, background processing and sleep; power management can throttle inactive applications.[^energie-mac] Screens and peripherals already included in the profile are counted once.

Offline operation retains local computation and storage. Only genuinely absent transfers and remote processing are excluded. Development, testing and maintenance follow the [service lifecycle](../../fondations/principes-acv-appliques-au-numerique), beyond this operational example.

### Measure a function's additional consumption and handle concurrent uses

Repeat measurements with and without the function, under comparable brightness, network, battery and thermal conditions. An energy difference measures additional consumption under that protocol; it does not automatically allocate manufacture or common device energy.

Concurrent audio, navigation and display require an allocation rule for shared resources. Application allocations must not exceed the device inventory. Background time cannot be treated as screen-on time without adjustment.

The simulator does not automatically add these activities. Where significant, their assessment forms an explicit addition to the subtotal. Hybrid applications sharing web content must not count the same journey twice.

### Audience, notifications and continuity with the historical model

The inventory distinguishes operating systems and versions: iOS and Android on mobile, Windows, macOS or Linux on computers. Countries and device families further define these groups. Session counts measure activity; user counts describe a population. Country shares of sessions only match user shares when usage frequency is comparable.

Notification traffic depends on the population that opted in, the number actually delivered and payload size. An opt-in rate already reflected in delivered counts is not applied again. Audience growth during the year also affects received updates. A device-specific package may differ from the size displayed in the store.

The historical mobile model separates distribution, sessions and hosting. Its extension to computers retains this decomposition, with hardware profiles, activities and distribution data specific to each platform. Its binary conversions and allocation of annual [TEC](../../references/glossaire#tec) differ from the decimal MB and average power used in the example below. Reusing results requires these metadata; the calculations are not presented as equivalent.

### Choose a reporting unit

The period total sums distribution, sessions and infrastructure. A per-session impact can include a distribution share, but disclose that choice. For functional comparison use a completed task with equivalent success rate, quality and availability.

## Complete the boundary

The calculation does not infer an app's actual energy use from device type alone. Prefilled values illustrate an exercise; an assessment relies on representative journey measurements. Network factors must be supplied, and unlisted third-party services remain excluded.

Varied audiences are described by distinct device profiles, networks and countries. Simultaneous uses require an allocation that does not exceed the device's total impact. The same journey remains counted once across this case and [Web service](./service-web).

<span id="rules-and-sources" />

The result is framed by [boundary and functional unit](../../fondations/perimetre-frontieres-services-tiers-et-unite-d-analyse), [allocation](../../regles/allocation-et-partage-des-impacts) and [double counting](../../regles/double-comptabilisation).

Electricity factors come from the D4B 2025 snapshot[^ref-1]. Prefilled activity and hosting values are exercise assumptions. Factors and conventions are available below the simulator.

<span id="understand-parameter-effects" />

Update size and per-session transfers contribute separately to traffic in the simulator. Shorter sessions are a comparable improvement only if they accomplish the same function.

Hosting energy remains an independent input. It does not automatically decrease with transferred bytes or screen time.

## Interactive example {#explore-your-scenario}

The device selection illustrates a mobile or desktop application. The default smartphone remains an educational scenario; switching profiles does not measure the application’s actual consumption.

Ex: 10,000 sessions at 2 MB, 1,000 installations at 50 MB and 2,000 updates at 20 MB produce **110 GB**. At three active minutes per session, device time is **500 hours**.

import { ScenarioPlayground } from '@site/src/components/scenario-playground';

<div className="inline-example">

<ScenarioPlayground kind="mobile" lang="en" />

</div>

[^ref-1]: Digital4Better, [D4B 2025 snapshot](https://github.com/digital4better/data/blob/77cae4a58fadd5deb3b8d4e5577020da08f780d8/data/factor/country-yearly.csv). Snapshot 77cae4a, 2025 data; reviewed 16 October 2026.

[^energie-mobile]: Apple, [Energy Efficiency Guide for iOS Apps, “Fundamental Concepts”](https://developer.apple.com/library/archive/documentation/Performance/Conceptual/EnergyGuide-iOS/FundamentalConcepts.html), updated 13 September 2016, “Networking operations”, “Location” and “Fixed Cost and Dynamic Cost”. Archived guide; physical principles only, with no reuse of its numerical coefficients.

[^arriere-plan-android]: Google, [Background tasks overview](https://developer.android.com/develop/background-work/background-tasks), updated 26 February 2026, “Terminology” and “Task scheduling APIs”. Execution rules depend on operating-system version.

[^energie-mac]: Apple, [Energy Efficiency Guide for Mac Apps, “Extend App Nap”](https://developer.apple.com/library/archive/documentation/Performance/Conceptual/power_efficiency_guidelines_osx/AppNap.html), updated 13 September 2016, archived guide, “What App Nap Does” and “How App Nap Works”. Example of inactivity management on macOS, not a generalisation to other systems.
