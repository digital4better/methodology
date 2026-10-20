import configurations from "../data/hardware-configurations.json";
import { processorGwp as cpuGwp, memoryGwp as ramGwp, storageGwp, displayGwp, batteryGwp, terminalPower as devicePower, STRUCTURAL_GWP } from "../hardware-models";
import { HARDWARE_COLORS, PHASE_COLORS } from "../visual-palette";
import { electricityFactor, ELECTRICITY_FACTORS } from "../electricity";
import { ModelNotice } from "./model-notice";
import { finiteNumber } from "../calculations";
import { Input } from "@site/src/components/input";
import { Bar } from "@site/src/components/bar";
import Stack from "@mui/system/Stack";
import Box from "@mui/system/Box";
import { useState } from "react";
import { format as formatValue, UNITS } from "@site/src/format";

/**
 * Terminal (device) parametric impact model — assembles components
 *
 * A terminal = CPU + RAM + Storage + Display + Battery + Structural elements
 * Each component uses its own parametric model (Boavizta coefficients).
 * The total is the sum of all component impacts.
 */

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
      energy: "Électricité annuelle d’usage",
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
    note: "Assemblage des modèles CPU, RAM et SSD historiques et de scénarios pour l’écran, la batterie et la structure. Les hypothèses de composition ne représentent pas une ACV du modèle commercial choisi.",
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
      energy: "Annual operational electricity",
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
    note: "Combines historical CPU, RAM and SSD models with display, battery and structural scenarios. Composition assumptions do not represent an LCA of the selected commercial model.",
  },
} as const;

const PRESETS: Record<string, Record<string, string>> = configurations.terminals;
const structuralGwp = (deviceType: string) => STRUCTURAL_GWP[deviceType] ?? STRUCTURAL_GWP.custom;

const COUNTRY_GWP = electricityFactor("gwp");

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
  const format = (value: number | undefined, units: string[]) => formatValue(value, units, lang);

  const [preset, setPreset] = useState("laptop");
  const [deviceType, setDeviceType] = useState("laptop");
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
    setDeviceType(p);
    setCpuDie(v.cpuDie); setCpuNode(v.cpuNode); setCpuTdp(v.cpuTdp);
    setRam(v.ram); setRamType(v.ramType);
    setStorage(v.storage); setStorageType(v.storageType);
    setScreenDiag(v.screenDiag); setScreenTech(v.screenTech);
    setBattery(v.battery); setBatteryChem(v.batteryChem);
    setLifetime(v.lifetime); setUsageHours(v.usageHours);
  };

  const dieMm2 = finiteNumber(cpuDie, 150);
  const nodeNm = Math.floor(finiteNumber(cpuNode, 7));
  const tdpW = finiteNumber(cpuTdp, 28);
  const ramGB = finiteNumber(ram, 16);
  const storGB = finiteNumber(storage, 512);
  const diagIn = finiteNumber(screenDiag, 14);
  const batWh = finiteNumber(battery, 0);
  const years = Math.max(1, finiteNumber(lifetime, 5));
  const hours = Math.min(24, Math.max(0, finiteNumber(usageHours, 8)));

  // Component GWP (embodied, total over lifetime)
  const gwpCpu = cpuGwp(dieMm2, nodeNm);
  const gwpRam = ramGwp(ramGB, ramType);
  const gwpStor = storageGwp(storGB, storageType);
  const gwpDisp = displayGwp(diagIn, screenTech);
  const gwpBat = batWh > 0 ? batteryGwp(batWh, batteryChem) : 0;
  const gwpStruct = structuralGwp(deviceType);
  const gwpEmbTotal = gwpCpu + gwpRam + gwpStor + gwpDisp + gwpBat + gwpStruct;
  const gwpEmbPerYear = gwpEmbTotal / years;

  // Operational
  const powerW = devicePower(tdpW, diagIn, screenTech);
  const energyKwh = (powerW / 1000) * hours * 365.25;
  const gwpOpePerYear = energyKwh * (COUNTRY_GWP[country] ?? 0.4);
  const gwpTotalPerYear = gwpEmbPerYear + gwpOpePerYear;

  const COLORS = [HARDWARE_COLORS.cpu, HARDWARE_COLORS.ram, HARDWARE_COLORS.storage, HARDWARE_COLORS.display, HARDWARE_COLORS.battery, HARDWARE_COLORS.enclosure];
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
    <>
    <Stack gap={3} sx={{ my: 2 }} className="methodology-simulator">
      <Input type="select" label={t.fields.preset} options={presetOptions} value={preset} onChange={applyPreset} sx={{ maxWidth: 250 }} />
      <details className="component-assumptions"><summary>{lang === "fr" ? "Personnaliser les composants" : "Customize components"}</summary>
      <Stack direction="row" gap={2} sx={{ flexWrap: "wrap" }}>
        <Input type="number" label={t.fields.cpuDie} value={cpuDie} onChange={(v) => { setCpuDie(v); setPreset("custom"); }} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="select" label={t.fields.cpuNode} options={nodeOptions} value={cpuNode} onChange={(v) => { setCpuNode(v); setPreset("custom"); }} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="number" label={t.fields.cpuTdp} value={cpuTdp} onChange={(v) => { setCpuTdp(v); setPreset("custom"); }} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="number" label={t.fields.ram} value={ram} onChange={(v) => { setRam(v); setPreset("custom"); }} sx={{ flex: 0.5, minWidth: 60 }} />
        <Input type="select" label={t.fields.ramType} options={ramTypeOptions} value={ramType} onChange={(v) => { setRamType(v); setPreset("custom"); }} sx={{ flex: 0.5, minWidth: 100 }} />
      </Stack>
      <Stack direction="row" gap={2} sx={{ flexWrap: "wrap" }}>
        <Input type="number" label={t.fields.storage} value={storage} onChange={(v) => { setStorage(v); setPreset("custom"); }} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="select" label={t.fields.storageType} options={storTypeOptions} value={storageType} onChange={(v) => { setStorageType(v); setPreset("custom"); }} sx={{ flex: 0.5, minWidth: 100 }} />
        <Input type="number" label={t.fields.screenDiag} value={screenDiag} onChange={(v) => { setScreenDiag(v); setPreset("custom"); }} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="select" label={t.fields.screenTech} options={screenOptions} value={screenTech} onChange={(v) => { setScreenTech(v); setPreset("custom"); }} sx={{ flex: 0.5, minWidth: 100 }} />
        <Input type="number" label={t.fields.battery} value={battery} onChange={(v) => { setBattery(v); setPreset("custom"); }} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="select" label={t.fields.batteryChem} options={batOptions} value={batteryChem} onChange={(v) => { setBatteryChem(v); setPreset("custom"); }} sx={{ flex: 0.5, minWidth: 120 }} />
      </Stack>
      </details>
      <Stack direction="row" gap={2} sx={{ flexWrap: "wrap" }}>
        <Input type="number" label={t.fields.lifetime} value={lifetime} onChange={setLifetime} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="number" label={t.fields.usageHours} value={usageHours} onChange={setUsageHours} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="select" label={t.fields.country} options={countryOptions} value={country} onChange={setCountry} sx={{ flex: 1, minWidth: 120 }} />
      </Stack>

      <Box sx={{ typography: "h6" }}>{t.results.results}</Box>

      <Stack direction="row" gap={4} sx={{ typography: "body2", flexWrap: "wrap" }}>
        <Box>{t.results.gwp}: <strong>{format(gwpEmbTotal * 1000, UNITS.gwp)}</strong></Box>
        <Box>{t.results.perYear}: <strong>{format(gwpEmbPerYear * 1000, UNITS.gwp)}</strong></Box>
      </Stack>

      <Box sx={{ typography: "body2", fontWeight: "bold" }}>{t.results.breakdown}</Box>
      <Bar lang={lang} values={components.map(c => ({ ...c, value: c.value * 1000 }))} colors={COLORS} units={UNITS.gwp} />
      <Stack direction="row" gap={2} sx={{ flexWrap: "wrap", typography: "caption" }}>
        {components.map((c, i) => (
          <Box key={c.label} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: 1, bgcolor: COLORS[i].bgcolor }} />
            {c.label}: {format(c.value * 1000, UNITS.gwp)}
          </Box>
        ))}
      </Stack>

      <Box sx={{ typography: "h6" }}>{t.results.operational}</Box>
      <Stack direction="row" gap={4} sx={{ typography: "body2", flexWrap: "wrap" }}>
        <Box>{t.results.energy}: <strong>{format(energyKwh * 1000, UNITS.wh)}</strong></Box>
        <Box>GWP: <strong>{format(gwpOpePerYear * 1000, UNITS.gwp)}</strong></Box>
      </Stack>

      <Box sx={{ typography: "h6" }}>{t.results.total}</Box>
      <Stack gap={0.5}>
        <Bar lang={lang}
          values={[
            { label: lang === "fr" ? "Fabrication allouée" : "Embodied", value: gwpEmbPerYear * 1000 },
            { label: lang === "fr" ? "Usage" : "Operational", value: gwpOpePerYear * 1000 },
          ]}
          colors={PHASE_COLORS}
          units={UNITS.gwp}
        />
        <Box sx={{ typography: "body1", fontWeight: "bold" }}>
          {format(gwpTotalPerYear * 1000, UNITS.gwp)} / {lang === "fr" ? "an" : "year"}
        </Box>
      </Stack>

    </Stack>
    <aside className="simulator-context">
      <p>{t.note}</p>
      <ModelNotice lang={lang} />

    </aside>
    </>
  );
};
