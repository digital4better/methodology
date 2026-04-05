import { Input } from "@site/src/components/input";
import { Bar } from "@site/src/components/bar";
import Stack from "@mui/system/Stack";
import Box from "@mui/system/Box";
import { useState } from "react";
import { format, UNITS } from "@site/src/format";

/**
 * Terminal (device) parametric impact model — assembles components
 *
 * A terminal = CPU + RAM + Storage + Display + Battery + Structural elements
 * Each component uses its own parametric model (Boavizta coefficients).
 * The total is the sum of all component impacts.
 */

const COLORS = [
  { bgcolor: "#264653", color: "white" },
  { bgcolor: "#2a9d8f", color: "white" },
  { bgcolor: "#e9c46a", color: "inherit" },
  { bgcolor: "#f4a261", color: "inherit" },
  { bgcolor: "#e76f51", color: "white" },
  { bgcolor: "#6c757d", color: "white" },
];

type Lang = "fr" | "en";

const TEXT = {
  fr: {
    fields: {
      preset: "Prédéfini",
      cpuDie: "CPU die (mm\u00B2)",
      cpuNode: "CPU noeud (nm)",
      cpuTdp: "CPU TDP (W)",
      ram: "RAM (Go)",
      ramType: "Type RAM",
      storage: "Stockage (Go)",
      storageType: "Type stockage",
      screenDiag: "Ecran (pouces)",
      screenTech: "Techno ecran",
      battery: "Batterie (Wh)",
      batteryChem: "Chimie batterie",
      lifetime: "Duree de vie (annees)",
      usageHours: "Usage quotidien (h)",
      country: "Pays",
    },
    results: {
      results: "Impact intrinseque total (fabrication)",
      perYear: "Par an",
      gwp: "GWP total",
      breakdown: "Repartition par composant (GWP)",
      cpu: "CPU",
      ram: "RAM",
      storage: "Stockage",
      display: "Ecran",
      battery: "Batterie",
      structural: "Structure",
      operational: "Impact operationnel annuel",
      energy: "Energie annuelle",
      total: "Total annuel (intrinseque + operationnel)",
    },
    presets: {
      smartphone: "Smartphone",
      tablet: "Tablette",
      laptop: "Laptop",
      desktop: "Desktop",
      custom: "Personnalise",
    },
    ramTypes: { ddr4: "DDR4 / LPDDR4", ddr5: "DDR5 / LPDDR5" },
    storageTypes: { ssd_nvme: "SSD NVMe", ssd_sata: "SSD SATA", hdd: "HDD" },
    screenTechs: { lcd: "LCD / IPS", oled: "OLED / AMOLED" },
    batteryChems: { lco: "LCO (smartphone)", nmc: "NMC (laptop)" },
    countries: { FR: "France", DE: "Allemagne", US: "Etats-Unis", CN: "Chine", PL: "Pologne", SE: "Suede" },
    note: "Assemblage de modeles Boavizta (CPU, RAM, SSD) + modeles parametriques (ecran, batterie, structure). L'impact total est la somme des composants.",
  },
  en: {
    fields: {
      preset: "Preset",
      cpuDie: "CPU die (mm\u00B2)",
      cpuNode: "CPU node (nm)",
      cpuTdp: "CPU TDP (W)",
      ram: "RAM (GB)",
      ramType: "RAM type",
      storage: "Storage (GB)",
      storageType: "Storage type",
      screenDiag: "Screen (inches)",
      screenTech: "Screen tech",
      battery: "Battery (Wh)",
      batteryChem: "Battery chemistry",
      lifetime: "Lifetime (years)",
      usageHours: "Daily usage (h)",
      country: "Country",
    },
    results: {
      results: "Total embodied impact (manufacturing)",
      perYear: "Per year",
      gwp: "Total GWP",
      breakdown: "Breakdown by component (GWP)",
      cpu: "CPU",
      ram: "RAM",
      storage: "Storage",
      display: "Display",
      battery: "Battery",
      structural: "Structure",
      operational: "Annual operational impact",
      energy: "Annual energy",
      total: "Annual total (embodied + operational)",
    },
    presets: {
      smartphone: "Smartphone",
      tablet: "Tablet",
      laptop: "Laptop",
      desktop: "Desktop",
      custom: "Custom",
    },
    ramTypes: { ddr4: "DDR4 / LPDDR4", ddr5: "DDR5 / LPDDR5" },
    storageTypes: { ssd_nvme: "SSD NVMe", ssd_sata: "SSD SATA", hdd: "HDD" },
    screenTechs: { lcd: "LCD / IPS", oled: "OLED / AMOLED" },
    batteryChems: { lco: "LCO (smartphone)", nmc: "NMC (laptop)" },
    countries: { FR: "France", DE: "Germany", US: "United States", CN: "China", PL: "Poland", SE: "Sweden" },
    note: "Assembly of Boavizta models (CPU, RAM, SSD) + parametric models (display, battery, structure). Total = sum of components.",
  },
} as const;

// --- Component models (simplified inline versions) ---

// CPU: Boavizta - GWP = die_mm2 * 0.0197 + 9.14, × node factor
const NODE_FACTORS: Record<number, number> = { 3: 2.8, 4: 2.5, 5: 2.2, 7: 1.8, 10: 1.4, 14: 1.2, 22: 1.05, 28: 1.0 };
const cpuGwp = (dieMm2: number, nodeNm: number) => {
  const nf = NODE_FACTORS[nodeNm] ?? 1.0;
  return (dieMm2 * 0.0197 + 9.14) * nf;
};

// RAM: Boavizta - GWP = (cap/density) * 2.20 + 5.22
const RAM_DENSITY: Record<string, number> = { ddr4: 0.625, ddr5: 1.0 };
const ramGwp = (capGB: number, type: string) => {
  const d = RAM_DENSITY[type] ?? 0.625;
  return (capGB / d) * 2.20 + 5.22;
};

// Storage: Boavizta
const storageGwp = (capGB: number, type: string) => {
  if (type === "hdd") return 31.11;
  return (capGB / 48.5) * 2.20 + 6.34;
};

// Display: area-based
const displayGwp = (diagInch: number, tech: string) => {
  const gwpCm2: Record<string, number> = { lcd: 0.07, oled: 0.12 };
  const base: Record<string, number> = { lcd: 3.0, oled: 2.5 };
  const area = diagInch * diagInch * 2.896;
  return area * (gwpCm2[tech] ?? 0.07) + (base[tech] ?? 3.0);
};

// Battery: capacity-based
const batteryGwp = (capWh: number, chem: string) => {
  const gwpKwh: Record<string, number> = { lco: 75, nmc: 65 };
  return (capWh / 1000) * (gwpKwh[chem] ?? 65);
};

// Structural: PCB, chassis, connectors
const structuralGwp = (deviceType: string) => {
  const factors: Record<string, number> = { smartphone: 4, tablet: 5, laptop: 8, desktop: 12, custom: 8 };
  return factors[deviceType] ?? 8;
};

// Power
const devicePower = (cpuTdp: number, diagInch: number, screenTech: string) => {
  const screenPower = diagInch * diagInch * 2.896 * (screenTech === "oled" ? 0.002 : 0.003);
  return cpuTdp * 0.5 + screenPower + 2;
};

// Presets
const PRESETS: Record<string, Record<string, string>> = {
  smartphone: { cpuDie: "100", cpuNode: "4", cpuTdp: "5", ram: "8", ramType: "ddr5", storage: "128", storageType: "ssd_nvme", screenDiag: "6.5", screenTech: "oled", battery: "18", batteryChem: "lco", lifetime: "3", usageHours: "4" },
  tablet: { cpuDie: "100", cpuNode: "4", cpuTdp: "8", ram: "8", ramType: "ddr5", storage: "256", storageType: "ssd_nvme", screenDiag: "11", screenTech: "lcd", battery: "30", batteryChem: "nmc", lifetime: "4", usageHours: "4" },
  laptop: { cpuDie: "150", cpuNode: "7", cpuTdp: "28", ram: "16", ramType: "ddr5", storage: "512", storageType: "ssd_nvme", screenDiag: "14", screenTech: "lcd", battery: "56", batteryChem: "nmc", lifetime: "5", usageHours: "8" },
  desktop: { cpuDie: "200", cpuNode: "10", cpuTdp: "65", ram: "32", ramType: "ddr4", storage: "1000", storageType: "ssd_nvme", screenDiag: "27", screenTech: "lcd", battery: "0", batteryChem: "nmc", lifetime: "6", usageHours: "8" },
};

const COUNTRY_GWP: Record<string, number> = {
  FR: 0.0355, DE: 0.377, US: 0.353, CN: 0.537, PL: 0.704, SE: 0.013,
};

const normalizeLang = (lang?: string): Lang =>
  lang?.toLowerCase().startsWith("fr") ? "fr" : "en";
const resolveLang = (lang?: string): Lang => {
  if (lang) return normalizeLang(lang);
  if (typeof navigator !== "undefined") return normalizeLang(navigator.language);
  return "en";
};

export const TerminalPlayGround = ({ lang: langProp }: { lang?: string }) => {
  const lang = resolveLang(langProp);
  const t = TEXT[lang];

  const [preset, setPreset] = useState("laptop");
  const [cpuDie, setCpuDie] = useState("150");
  const [cpuNode, setCpuNode] = useState("7");
  const [cpuTdp, setCpuTdp] = useState("28");
  const [ram, setRam] = useState("16");
  const [ramType, setRamType] = useState("ddr5");
  const [storage, setStorage] = useState("512");
  const [storageType, setStorageType] = useState("ssd_nvme");
  const [screenDiag, setScreenDiag] = useState("14");
  const [screenTech, setScreenTech] = useState("lcd");
  const [battery, setBattery] = useState("56");
  const [batteryChem, setBatteryChem] = useState("nmc");
  const [lifetime, setLifetime] = useState("5");
  const [usageHours, setUsageHours] = useState("8");
  const [country, setCountry] = useState("FR");

  const applyPreset = (p: string) => {
    setPreset(p);
    const v = PRESETS[p];
    if (!v) return;
    setCpuDie(v.cpuDie); setCpuNode(v.cpuNode); setCpuTdp(v.cpuTdp);
    setRam(v.ram); setRamType(v.ramType);
    setStorage(v.storage); setStorageType(v.storageType);
    setScreenDiag(v.screenDiag); setScreenTech(v.screenTech);
    setBattery(v.battery); setBatteryChem(v.batteryChem);
    setLifetime(v.lifetime); setUsageHours(v.usageHours);
  };

  const dieMm2 = parseFloat(cpuDie) || 150;
  const nodeNm = parseInt(cpuNode) || 7;
  const tdpW = parseFloat(cpuTdp) || 28;
  const ramGB = parseFloat(ram) || 16;
  const storGB = parseFloat(storage) || 512;
  const diagIn = parseFloat(screenDiag) || 14;
  const batWh = parseFloat(battery) || 0;
  const years = Math.max(1, parseFloat(lifetime) || 5);
  const hours = Math.min(24, Math.max(0, parseFloat(usageHours) || 8));

  // Component GWP (embodied, total over lifetime)
  const gwpCpu = cpuGwp(dieMm2, nodeNm);
  const gwpRam = ramGwp(ramGB, ramType);
  const gwpStor = storageGwp(storGB, storageType);
  const gwpDisp = displayGwp(diagIn, screenTech);
  const gwpBat = batWh > 0 ? batteryGwp(batWh, batteryChem) : 0;
  const gwpStruct = structuralGwp(preset);
  const gwpEmbTotal = gwpCpu + gwpRam + gwpStor + gwpDisp + gwpBat + gwpStruct;
  const gwpEmbPerYear = gwpEmbTotal / years;

  // Operational
  const powerW = devicePower(tdpW, diagIn, screenTech);
  const energyKwh = (powerW / 1000) * hours * 365.25;
  const gwpOpePerYear = energyKwh * (COUNTRY_GWP[country] ?? 0.4);
  const gwpTotalPerYear = gwpEmbPerYear + gwpOpePerYear;

  const components = [
    { label: t.results.cpu, value: gwpCpu },
    { label: t.results.ram, value: gwpRam },
    { label: t.results.storage, value: gwpStor },
    { label: t.results.display, value: gwpDisp },
    { label: t.results.battery, value: Math.max(0, gwpBat) },
    { label: t.results.structural, value: gwpStruct },
  ];

  const presetOptions = Object.entries(t.presets).map(([v, l]) => ({ value: v, label: l }));
  const nodeOptions = [3, 4, 5, 7, 10, 14, 22, 28].map(n => ({ value: String(n), label: `${n} nm` }));
  const ramTypeOptions = Object.entries(t.ramTypes).map(([v, l]) => ({ value: v, label: l }));
  const storTypeOptions = Object.entries(t.storageTypes).map(([v, l]) => ({ value: v, label: l }));
  const screenOptions = Object.entries(t.screenTechs).map(([v, l]) => ({ value: v, label: l }));
  const batOptions = Object.entries(t.batteryChems).map(([v, l]) => ({ value: v, label: l }));
  const countryOptions = Object.entries(t.countries).map(([v, l]) => ({ value: v, label: l }));

  return (
    <Stack gap={3} sx={{ my: 2 }}>
      <Input type="select" label={t.fields.preset} options={presetOptions} value={preset} onChange={applyPreset} sx={{ maxWidth: 250 }} />

      <Stack direction="row" gap={2} sx={{ flexWrap: "wrap" }}>
        <Input type="text" label={t.fields.cpuDie} value={cpuDie} onChange={(v) => { setCpuDie(v); setPreset("custom"); }} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="select" label={t.fields.cpuNode} options={nodeOptions} value={cpuNode} onChange={(v) => { setCpuNode(v); setPreset("custom"); }} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="text" label={t.fields.cpuTdp} value={cpuTdp} onChange={(v) => { setCpuTdp(v); setPreset("custom"); }} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="text" label={t.fields.ram} value={ram} onChange={(v) => { setRam(v); setPreset("custom"); }} sx={{ flex: 0.5, minWidth: 60 }} />
        <Input type="select" label={t.fields.ramType} options={ramTypeOptions} value={ramType} onChange={(v) => { setRamType(v); setPreset("custom"); }} sx={{ flex: 0.5, minWidth: 100 }} />
      </Stack>
      <Stack direction="row" gap={2} sx={{ flexWrap: "wrap" }}>
        <Input type="text" label={t.fields.storage} value={storage} onChange={(v) => { setStorage(v); setPreset("custom"); }} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="select" label={t.fields.storageType} options={storTypeOptions} value={storageType} onChange={(v) => { setStorageType(v); setPreset("custom"); }} sx={{ flex: 0.5, minWidth: 100 }} />
        <Input type="text" label={t.fields.screenDiag} value={screenDiag} onChange={(v) => { setScreenDiag(v); setPreset("custom"); }} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="select" label={t.fields.screenTech} options={screenOptions} value={screenTech} onChange={(v) => { setScreenTech(v); setPreset("custom"); }} sx={{ flex: 0.5, minWidth: 100 }} />
        <Input type="text" label={t.fields.battery} value={battery} onChange={(v) => { setBattery(v); setPreset("custom"); }} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="select" label={t.fields.batteryChem} options={batOptions} value={batteryChem} onChange={(v) => { setBatteryChem(v); setPreset("custom"); }} sx={{ flex: 0.5, minWidth: 120 }} />
      </Stack>
      <Stack direction="row" gap={2} sx={{ flexWrap: "wrap" }}>
        <Input type="text" label={t.fields.lifetime} value={lifetime} onChange={setLifetime} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="text" label={t.fields.usageHours} value={usageHours} onChange={setUsageHours} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="select" label={t.fields.country} options={countryOptions} value={country} onChange={setCountry} sx={{ flex: 1, minWidth: 120 }} />
      </Stack>

      <Box sx={{ typography: "h6" }}>{t.results.results}</Box>

      <Stack direction="row" gap={4} sx={{ typography: "body2" }}>
        <Box>{t.results.gwp}: <strong>{format(gwpEmbTotal * 1000, UNITS.gwp)}</strong></Box>
        <Box>{t.results.perYear}: <strong>{format(gwpEmbPerYear * 1000, UNITS.gwp)}</strong></Box>
      </Stack>

      <Box sx={{ typography: "body2", fontWeight: "bold" }}>{t.results.breakdown}</Box>
      <Bar values={components} colors={COLORS} units={UNITS.gwp} />
      <Stack direction="row" gap={2} sx={{ flexWrap: "wrap", typography: "caption" }}>
        {components.map((c, i) => (
          <Box key={c.label} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: 1, bgcolor: COLORS[i].bgcolor }} />
            {c.label}: {format(c.value * 1000, UNITS.gwp)}
          </Box>
        ))}
      </Stack>

      <Box sx={{ typography: "h6" }}>{t.results.operational}</Box>
      <Stack direction="row" gap={4} sx={{ typography: "body2" }}>
        <Box>{t.results.energy}: <strong>{format(energyKwh * 1000, UNITS.wh)}</strong></Box>
        <Box>GWP: <strong>{format(gwpOpePerYear * 1000, UNITS.gwp)}</strong></Box>
      </Stack>

      <Box sx={{ typography: "h6" }}>{t.results.total}</Box>
      <Stack gap={0.5}>
        <Bar
          values={[
            { label: "Embodied", value: gwpEmbPerYear },
            { label: "Operational", value: gwpOpePerYear },
          ]}
          colors={[{ bgcolor: "#023047", color: "white" }, { bgcolor: "#219ebc", color: "white" }]}
          units={UNITS.gwp}
        />
        <Box sx={{ typography: "body1", fontWeight: "bold" }}>
          {format(gwpTotalPerYear * 1000, UNITS.gwp)} / an
        </Box>
      </Stack>

      <Box sx={{ typography: "caption", color: "text.secondary" }}>{t.note}</Box>
    </Stack>
  );
};
