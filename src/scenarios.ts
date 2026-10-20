import terminalProfiles from "./terminal-profiles";
/** Scenario models use kg CO2e, kWh, decimal GB and hours. */
export type TerminalFactors = { power: number; embodied: number };
export function terminalFactors(
  profile: string,
  mobileShare = 50,
): TerminalFactors | undefined {
  if (profile === "custom") return undefined;
  if (profile !== "mixed") return terminalProfiles.profiles[profile];
  const fraction = Math.min(100, Math.max(0, mobileShare)) / 100;
  const { mobile, computer } = terminalProfiles.profiles;
  return {
    power: fraction * mobile.power + (1 - fraction) * computer.power,
    embodied: fraction * mobile.embodied + (1 - fraction) * computer.embodied,
  };
}
export type ScenarioKind =
  | "fleet"
  | "hosting"
  | "cloud"
  | "web"
  | "mail"
  | "mobile";
export type Locale = "fr" | "en";
export type Label = [string, string];
export type Values = Record<string, number | null>;
export type Field = {
  key: string;
  label: Label;
  value: number | null;
  unit: string;
  min?: number;
  max?: number;
  advanced?: boolean;
};
export type Equipment = {
  name: string;
  quantity: number;
  embodied: number;
  life: number;
  energy: number;
};
export type Contribution = { label: Label; kg: number | null; kwh?: number };
export type Activity = { label: Label; value: number; unit: string };
export type ScenarioResult = {
  contributions: Contribution[];
  activities: Activity[];
  subtotal: number;
  energy: number;
  errors: string[];
  missing: Label[];
  functionalCount: number;
  unit: Label;
};
const f = (
  key: string,
  fr: string,
  en: string,
  value: number | null,
  unit = "",
  advanced = false,
  min = 0,
  max = 1e12,
): Field => ({ key, label: [fr, en], value, unit, advanced, min, max });
const life = f(
  "life",
  "Durée de vie du terminal",
  "Device lifetime",
  5,
  "ans / years",
  true,
  0.1,
  30,
);
const device = [
  f(
    "deviceKg",
    "Fabrication du terminal",
    "Device manufacture",
    200,
    "kg CO₂e",
    true,
  ),
  life,
  f(
    "deviceW",
    "Puissance moyenne du terminal",
    "Average device power",
    40,
    "W",
    true,
  ),
];
const service = [
  f(
    "itKwh",
    "Énergie IT allouée sur la période",
    "Allocated IT energy over the period",
    100,
    "kWh",
    true,
  ),
  f(
    "hostingKg",
    "Fabrication hébergement allouée sur la période",
    "Allocated hosting manufacture over the period",
    20,
    "kg CO₂e",
    true,
  ),
  f("pue", "PUE du site", "Site PUE", 1.2, "", true, 1, 5),
  f(
    "mobilePct",
    "Part du trafic cellulaire",
    "Cellular traffic share",
    20,
    "%",
    true,
    0,
    100,
  ),
  f(
    "fixedFactor",
    "Facteur réseau fixe, trajet complet",
    "Fixed network factor, complete path",
    null,
    "kg CO₂e/Go",
    true,
  ),
  f(
    "mobileFactor",
    "Facteur réseau cellulaire, trajet complet",
    "Cellular network factor, complete path",
    null,
    "kg CO₂e/Go",
    true,
  ),
];
export const FIELDS: Record<ScenarioKind, Field[]> = {
  fleet: [
    f(
      "years",
      "Période d’évaluation",
      "Assessment period",
      1,
      "ans / years",
      false,
      0.01,
      20,
    ),
  ],
  hosting: [
    f(
      "years",
      "Période d’évaluation",
      "Assessment period",
      1,
      "ans / years",
      false,
      0.01,
      20,
    ),
    f("pue", "PUE du site", "Site PUE", 1.8, "", false, 1, 5),
    f(
      "share",
      "Part des ressources réservée au service",
      "Resource share reserved for the service",
      100,
      "%",
      false,
      0,
      100,
    ),
    f(
      "wue",
      "Eau directe consommée par kWh IT",
      "Direct water consumption per IT kWh",
      null,
      "L/kWh IT",
      true,
    ),
  ],
  cloud: [
    f("vms", "Nombre de VM identiques", "Identical VM count", 4),
    f("vcpu", "vCPU par VM", "vCPU per VM", 4),
    f("ram", "RAM par VM", "RAM per VM", 16, "Go / GB"),
    f("hours", "Durée de réservation", "Reserved duration", 730, "h"),
    f(
      "ssd",
      "SSD physique total, copies incluses",
      "Total physical SSD, copies included",
      2000,
      "Go / GB",
    ),
    f(
      "hdd",
      "HDD physique total, copies incluses",
      "Total physical HDD, copies included",
      500,
      "Go / GB",
    ),
    f("pue", "PUE du site", "Site PUE", 1.2, "", true, 1, 5),
    f(
      "cpuW",
      "Puissance moyenne par vCPU réservé",
      "Average power per reserved vCPU",
      3.54,
      "W",
      true,
    ),
    f("ramW", "Puissance par Go RAM", "Power per GB RAM", 0.392, "W/Go", true),
    f("ssdW", "Puissance par Go SSD", "Power per GB SSD", 0.0012, "W/Go", true),
    f(
      "hddW",
      "Puissance par Go HDD",
      "Power per GB HDD",
      0.00065,
      "W/Go",
      true,
    ),
    f(
      "vmKg",
      "Fabrication allouée par VM, hors stockage",
      "Allocated manufacture per VM, excluding storage",
      60,
      "kg CO₂e",
      true,
    ),
    f(
      "ssdKg",
      "Fabrication par Go SSD",
      "Manufacture per GB SSD",
      0.16,
      "kg CO₂e/Go",
      true,
    ),
    f(
      "hddKg",
      "Fabrication par Go HDD",
      "Manufacture per GB HDD",
      0.02,
      "kg CO₂e/Go",
      true,
    ),
    f(
      "life",
      "Durée de vie du matériel",
      "Hardware lifetime",
      5,
      "ans / years",
      true,
      0.1,
      30,
    ),
  ],
  web: [
    f(
      "count",
      "Pages vues sur la période",
      "Page views over the period",
      100000,
    ),
    f("seconds", "Temps actif par vue", "Active time per view", 60, "s"),
    f(
      "mb",
      "Données transférées par vue, cache inclus",
      "Transferred data per view, cache included",
      2,
      "Mo / MB",
    ),
    ...device,
    ...service,
  ],
  mail: [
    f("count", "Messages envoyés", "Messages sent", 1000),
    f("recipients", "Destinataires par message", "Recipients per message", 1),
    f(
      "mb",
      "Taille du message et des pièces jointes",
      "Message and attachment size",
      1,
      "Mo / MB",
    ),
    f(
      "months",
      "Durée de conservation",
      "Retention period",
      12,
      "mois / months",
    ),
    f(
      "copies",
      "Copies physiques stockées au total",
      "Total stored physical copies",
      3,
    ),
    f("writeMin", "Temps de rédaction", "Writing time", 2, "min", true),
    f("readMin", "Temps de lecture", "Reading time", 1, "min", true),
    f(
      "readPct",
      "Part des destinataires qui lisent",
      "Share of recipients who read",
      80,
      "%",
      true,
      0,
      100,
    ),
    f(
      "sync",
      "Téléchargements par lecteur",
      "Downloads per reader",
      1,
      "",
      true,
    ),
    f(
      "storageFactor",
      "Stockage, fabrication et usage inclus",
      "Storage, manufacture and operation included",
      null,
      "kg CO₂e/Go.mois",
      true,
    ),
    ...device,
    ...service,
  ],
  mobile: [
    f("count", "Sessions sur la période", "Sessions over the period", 10000),
    f(
      "seconds",
      "Durée active par session",
      "Active duration per session",
      180,
      "s",
    ),
    f("mb", "Données par session", "Data per session", 2, "Mo / MB"),
    f("installs", "Installations initiales", "Initial installations", 1000),
    f(
      "packageMb",
      "Poids téléchargé par installation",
      "Download size per installation",
      50,
      "Mo / MB",
    ),
    f("updates", "Téléchargements de mises à jour", "Update downloads", 2000),
    f(
      "updateMb",
      "Poids téléchargé par mise à jour",
      "Download size per update",
      20,
      "Mo / MB",
    ),
    ...device.map((x) => ({
      ...x,
      value: x.key === "deviceKg" ? 60 : x.key === "life" ? 4 : 3,
    })),
    ...service,
  ],
};
export const TITLES: Record<ScenarioKind, Label> = {
  fleet: ["Parc informatique", "IT fleet"],
  hosting: ["Hébergement", "Hosting"],
  cloud: ["Cloud", "Cloud"],
  web: ["Service web", "Web service"],
  mail: ["Mail", "Email"],
  mobile: ["Applications natives", "Native applications"],
};
export const defaults = (kind: ScenarioKind): Values =>
  Object.fromEntries(FIELDS[kind].map((x) => [x.key, x.value]));
export const initialInventory = (
  kind: ScenarioKind,
  lang: Locale,
): Equipment[] =>
  kind === "hosting"
    ? [
        {
          name: lang === "fr" ? "Serveurs" : "Servers",
          quantity: 10,
          embodied: 275,
          life: 5,
          energy: 3504,
        },
        { name: "Switches", quantity: 5, embodied: 30, life: 5, energy: 262.8 },
      ]
    : [
        {
          name: lang === "fr" ? "Ordinateurs portables" : "Laptops",
          quantity: 50,
          embodied: 200,
          life: 5,
          energy: 70.4,
        },
        {
          name: lang === "fr" ? "Écrans" : "Displays",
          quantity: 30,
          embodied: 140,
          life: 7,
          energy: 35.2,
        },
        { name: "Smartphones", quantity: 50, embodied: 60, life: 4, energy: 5 },
        { name: "Switches", quantity: 3, embodied: 90, life: 6, energy: 175.2 },
        {
          name: lang === "fr" ? "Serveurs" : "Servers",
          quantity: 2,
          embodied: 1000,
          life: 5,
          energy: 2628,
        },
      ];
export function evaluateScenario(
  kind: ScenarioKind,
  v: Values,
  inventory: Equipment[],
  userFactor: number,
  siteFactor: number,
  terminal?: TerminalFactors,
): ScenarioResult {
  const r: ScenarioResult = {
    contributions: [],
    activities: [],
    subtotal: 0,
    energy: 0,
    errors: [],
    missing: [],
    functionalCount: 1,
    unit: ["scénario", "scenario"],
  };
  for (const field of FIELDS[kind]) {
    if (
      terminal &&
      ["deviceW", "deviceKg", "life"].includes(field.key) &&
      ["web", "mail", "mobile"].includes(kind)
    )
      continue;
    const value = v[field.key];
    if (value === null && field.value === null) continue;
    if (
      value === null ||
      !Number.isFinite(value) ||
      value < (field.min ?? 0) ||
      value > (field.max ?? 1e12)
    )
      r.errors.push(field.key);
  }
  if (![userFactor, siteFactor].every((x) => Number.isFinite(x) && x >= 0))
    r.errors.push("electricity");
  if (kind === "fleet" || kind === "hosting")
    inventory.forEach((row, i) => {
      if (
        ![row.quantity, row.embodied, row.life, row.energy].every(
          (x) => Number.isFinite(x) && x >= 0 && x <= 1e12,
        ) ||
        row.life <= 0
      )
        r.errors.push(`inventory-${i}`);
    });
  if (
    terminal &&
    ![terminal.power, terminal.embodied].every(
      (x) => Number.isFinite(x) && x >= 0,
    )
  )
    r.errors.push("terminal");
  if (r.errors.length) return r;
  const n = (key: string) => v[key] as number;
  const add = (label: Label, kg: number | null, kwh?: number) =>
    r.contributions.push({ label, kg, kwh });
  const activity = (label: Label, value: number, unit: string) =>
    r.activities.push({ label, value, unit });
  const missing = (label: Label) => r.missing.push(label);
  if (kind === "fleet" || kind === "hosting") {
    const share = kind === "hosting" ? n("share") / 100 : 1;
    let embodied = 0,
      energy = 0;
    for (const row of inventory) {
      embodied +=
        ((row.quantity * row.embodied) / row.life) * n("years") * share;
      energy += row.quantity * row.energy * n("years") * share;
    }
    const totalEnergy = energy * (kind === "hosting" ? n("pue") : 1);
    add(["Fabrication allouée", "Allocated manufacture"], embodied);
    add(
      ["Électricité d’usage", "Use-phase electricity"],
      totalEnergy * (kind === "hosting" ? siteFactor : userFactor),
      totalEnergy,
    );
    activity(["Énergie des équipements", "Equipment energy"], energy, "kWh");
    r.functionalCount = n("years");
    r.unit = ["an", "year"];
    if (kind === "hosting") {
      if (v.wue !== null)
        activity(
          [
            "Eau directe, hors eau de l’électricité",
            "Direct water, excluding electricity water",
          ],
          energy * n("wue"),
          "L",
        );
      else missing(["Eau directe non renseignée", "Direct water not provided"]);
      missing([
        "Bâtiment, refroidissement et secours : fabrication non incluse",
        "Building, cooling and backup: manufacture excluded",
      ]);
    } else
      missing([
        "Refroidissement et équipements absents de l’inventaire",
        "Cooling and equipment absent from the inventory",
      ]);
  } else if (kind === "cloud") {
    const hours = n("hours"),
      cpu = n("vms") * n("vcpu") * hours,
      ram = n("vms") * n("ram") * hours;
    const it =
      (cpu * n("cpuW") +
        ram * n("ramW") +
        n("ssd") * hours * n("ssdW") +
        n("hdd") * hours * n("hddW")) /
      1000;
    const emb =
      ((n("vms") * n("vmKg") + n("ssd") * n("ssdKg") + n("hdd") * n("hddKg")) *
        hours) /
      (n("life") * 8760);
    add(["Fabrication allouée", "Allocated manufacture"], emb);
    add(
      ["Électricité du site", "Site electricity"],
      it * n("pue") * siteFactor,
      it * n("pue"),
    );
    activity(["Calcul réservé", "Reserved compute"], cpu, "vCPU.h");
    activity(["Mémoire réservée", "Reserved memory"], ram, "Go.h / GB.h");
    activity(["Énergie IT", "IT energy"], it, "kWh");
    r.functionalCount = cpu;
    r.unit = ["vCPU.h", "vCPU.h"];
    missing([
      "Réseau, services managés non inventoriés et fabrication du bâtiment",
      "Network, unlisted managed services and building manufacture",
    ]);
  } else {
    const count = n("count");
    let hours = 0,
      gb = 0;
    if (kind === "mail") {
      hours =
        (count *
          (n("writeMin") +
            ((n("recipients") * n("readPct")) / 100) * n("readMin"))) /
        60;
      gb =
        ((count * n("mb")) / 1000) *
        (1 +
          n("recipients") +
          ((n("recipients") * n("readPct")) / 100) * n("sync"));
      const storage = ((count * n("mb")) / 1000) * n("copies") * n("months");
      activity(
        ["Stockage physique cumulé", "Cumulative physical storage"],
        storage,
        "Go.mois / GB.month",
      );
      add(
        ["Stockage conservé", "Retained storage"],
        storage === 0
          ? 0
          : v.storageFactor === null
            ? null
            : storage * n("storageFactor"),
      );
      if (storage > 0 && v.storageFactor === null)
        missing(["Facteur de stockage absent", "Missing storage factor"]);
    } else {
      hours = (count * n("seconds")) / 3600;
      gb = (count * n("mb")) / 1000;
      if (kind === "mobile") {
        const distribution =
          (n("installs") * n("packageMb") + n("updates") * n("updateMb")) /
          1000;
        gb += distribution;
        activity(
          ["Distribution de l’application", "App distribution"],
          distribution,
          "Go / GB",
        );
      }
    }
    const terminalKwh = (hours * (terminal?.power ?? n("deviceW"))) / 1000;
    add(
      ["Terminal : fabrication allouée", "Device: allocated manufacture"],
      terminal
        ? hours * 3600 * terminal.embodied
        : (hours / (n("life") * 8760)) * n("deviceKg"),
    );
    add(
      ["Terminal : électricité", "Device: electricity"],
      terminalKwh * userFactor,
      terminalKwh,
    );
    const cellular = (gb * n("mobilePct")) / 100,
      fixed = gb - cellular;
    add(
      ["Réseau fixe", "Fixed network"],
      fixed === 0
        ? 0
        : v.fixedFactor === null
          ? null
          : fixed * n("fixedFactor"),
    );
    add(
      ["Réseau cellulaire", "Cellular network"],
      cellular === 0
        ? 0
        : v.mobileFactor === null
          ? null
          : cellular * n("mobileFactor"),
    );
    if (fixed > 0 && v.fixedFactor === null)
      missing(["Facteur réseau fixe absent", "Missing fixed network factor"]);
    if (cellular > 0 && v.mobileFactor === null)
      missing([
        "Facteur réseau cellulaire absent",
        "Missing cellular network factor",
      ]);
    add(
      ["Hébergement : fabrication allouée", "Hosting: allocated manufacture"],
      n("hostingKg"),
    );
    add(
      ["Hébergement : électricité", "Hosting: electricity"],
      n("itKwh") * n("pue") * siteFactor,
      n("itKwh") * n("pue"),
    );
    activity(["Temps terminal cumulé", "Cumulative device time"], hours, "h");
    activity(["Transferts", "Transfers"], gb, "Go / GB");
    r.functionalCount = count;
    r.unit =
      kind === "mail"
        ? ["message envoyé", "sent message"]
        : kind === "web"
          ? ["page vue", "page view"]
          : ["session", "session"];
    missing([
      "Services tiers non inventoriés et fabrication du bâtiment",
      "Unlisted third-party services and building manufacture",
    ]);
  }
  r.subtotal = r.contributions.reduce((sum, c) => sum + (c.kg ?? 0), 0);
  r.energy = r.contributions.reduce((sum, c) => sum + (c.kwh ?? 0), 0);
  return r;
}
