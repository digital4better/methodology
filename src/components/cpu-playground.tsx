import { Input } from "@site/src/components/input";
import { Bar } from "@site/src/components/bar";
import Stack from "@mui/system/Stack";
import Box from "@mui/system/Box";
import { useState } from "react";
import { format, UNITS } from "@site/src/format";

/**
 * CPU/Accelerator parametric impact model
 *
 * Embodied GWP model based on Boavizta methodology + IMEC NetZero scaling:
 *   GWP_emb = die_size_cm2 × (gwp_front_end + gwp_back_end) × node_factor × units
 *
 * Front-end GWP per cm² of die (base: mature node ~28nm): ~0.82 kgCO2e/cm²
 * Back-end GWP per cm² of die: ~0.16 kgCO2e/cm²
 * Source: Green Cloud Computing UBA 2021, Intel CPU reconstruction
 *
 * Node scaling factors (relative to 28nm baseline):
 * Based on IMEC publications and energy consumption scaling per process step
 *
 * Multi-indicator scaling: ratios from d4b/data equipment factors
 */

const COLORS = [
  { bgcolor: "#023047", color: "white" },
  { bgcolor: "#219ebc", color: "white" },
  { bgcolor: "#8ecae6", color: "inherit" },
  { bgcolor: "#ffb703", color: "inherit" },
];

type Lang = "fr" | "en";

const TEXT = {
  fr: {
    fields: {
      dieSize: "Surface de die (mm²)",
      processNode: "Noeud technologique",
      units: "Nombre d'unités",
      tdp: "TDP / Puissance nominale (W)",
      usageHours: "Usage quotidien (heures)",
      loadFactor: "Facteur de charge (%)",
      lifetime: "Durée de vie (années)",
      country: "Pays (mix électrique)",
      pue: "PUE",
      componentType: "Type de composant",
    },
    results: {
      results: "Résultats (par an)",
      embodied: "Intrinsèque",
      operational: "Opérationnel",
      total: "Total",
      gwp: "Climat (GWP)",
      wu: "Eau (WU)",
      adpe: "Ressources (ADPe)",
      energy: "Énergie",
    },
    componentTypes: {
      cpu: "CPU",
      gpu: "GPU datacenter",
      gpu_consumer: "GPU consumer",
    },
    processNodes: {
      "3": "3 nm (TSMC N3)",
      "4": "4 nm (TSMC N4, Samsung 4nm)",
      "5": "5 nm (TSMC N5, Samsung 5nm)",
      "7": "7 nm (TSMC N7, Samsung 7nm)",
      "10": "10 nm (Intel 7)",
      "14": "14 nm (Intel / Samsung 14nm)",
      "22": "22 nm",
      "28": "28 nm",
      "32": "32 nm et +",
    },
    countries: {
      FR: "France",
      DE: "Allemagne",
      US: "États-Unis",
      CN: "Chine",
      PL: "Pologne",
      SE: "Suède",
      TW: "Taïwan",
      KR: "Corée du Sud",
    },
    note: "Modèle paramétrique basé sur Boavizta + IMEC NetZero. Front-end: 0,82 kgCO₂e/cm², back-end: 0,16 kgCO₂e/cm² (base 28nm). Facteurs de noeud dérivés des données IMEC sur l'intensité énergétique par étape de procédé.",
  },
  en: {
    fields: {
      dieSize: "Die size (mm²)",
      processNode: "Technology node",
      units: "Number of units",
      tdp: "TDP / Nominal power (W)",
      usageHours: "Daily usage (hours)",
      loadFactor: "Load factor (%)",
      lifetime: "Lifetime (years)",
      country: "Country (electricity mix)",
      pue: "PUE",
      componentType: "Component type",
    },
    results: {
      results: "Results (per year)",
      embodied: "Embodied",
      operational: "Operational",
      total: "Total",
      gwp: "Climate (GWP)",
      wu: "Water (WU)",
      adpe: "Resources (ADPe)",
      energy: "Energy",
    },
    componentTypes: {
      cpu: "CPU",
      gpu: "GPU datacenter",
      gpu_consumer: "GPU consumer",
    },
    processNodes: {
      "3": "3 nm (TSMC N3)",
      "4": "4 nm (TSMC N4, Samsung 4nm)",
      "5": "5 nm (TSMC N5, Samsung 5nm)",
      "7": "7 nm (TSMC N7, Samsung 7nm)",
      "10": "10 nm (Intel 7)",
      "14": "14 nm (Intel / Samsung 14nm)",
      "22": "22 nm",
      "28": "28 nm",
      "32": "32 nm and older",
    },
    countries: {
      FR: "France",
      DE: "Germany",
      US: "United States",
      CN: "China",
      PL: "Poland",
      SE: "Sweden",
      TW: "Taiwan",
      KR: "South Korea",
    },
    note: "Parametric model based on Boavizta + IMEC NetZero. Front-end: 0.82 kgCO₂e/cm², back-end: 0.16 kgCO₂e/cm² (28nm baseline). Node factors derived from IMEC data on energy intensity per process step.",
  },
} as const;

// GWP per cm² of die at 28nm baseline (Green Cloud Computing UBA 2021)
const GWP_FRONTEND_PER_CM2 = 0.82; // kgCO2e/cm²
const GWP_BACKEND_PER_CM2 = 0.16; // kgCO2e/cm²

// Water per cm² of die at 28nm baseline
const WU_FRONTEND_PER_CM2 = 0.014; // m³/cm² (14 L/cm²)
const WU_BACKEND_PER_CM2 = 0.001; // m³/cm²

// ADPe per cm² of die at 28nm baseline (estimated from d4b ratios)
const ADPE_PER_CM2 = 3e-6; // kgSb eq./cm²

// Node scaling factors (relative to 28nm = 1.0)
// Based on IMEC publications: process step count and energy intensity scaling
const NODE_FACTORS: Record<string, number> = {
  "3": 2.8,
  "4": 2.5,
  "5": 2.2,
  "7": 1.8,
  "10": 1.4,
  "14": 1.2,
  "22": 1.05,
  "28": 1.0,
  "32": 0.95,
};

// Component type multipliers for back-end (packaging complexity)
const PACKAGING_FACTORS: Record<string, number> = {
  cpu: 1.0,
  gpu: 1.5, // datacenter GPU with advanced packaging (2.5D interposer, HBM)
  gpu_consumer: 1.1,
};

// Country electricity factors (GWP kgCO2e/kWh)
const COUNTRY_GWP: Record<string, number> = {
  FR: 0.0355,
  DE: 0.377,
  US: 0.353,
  CN: 0.537,
  PL: 0.704,
  SE: 0.013,
  TW: 0.509,
  KR: 0.415,
};

const COUNTRY_WU: Record<string, number> = {
  FR: 0.0947,
  DE: 0.0511,
  US: 0.0673,
  CN: 0.038,
  PL: 0.0843,
  SE: 0.0578,
  TW: 0.05,
  KR: 0.04,
};

const COUNTRY_ADPE: Record<string, number> = {
  FR: 4.82e-7,
  DE: 9.23e-7,
  US: 8.0e-7,
  CN: 7.76e-7,
  PL: 7.77e-7,
  SE: 4.12e-7,
  TW: 7.5e-7,
  KR: 6.5e-7,
};

const DEFAULT_DIE: Record<string, number> = {
  cpu: 200,
  gpu: 600,
  gpu_consumer: 300,
};

const DEFAULT_TDP: Record<string, number> = {
  cpu: 200,
  gpu: 700,
  gpu_consumer: 250,
};

const normalizeLang = (lang?: string): Lang =>
  lang?.toLowerCase().startsWith("fr") ? "fr" : "en";

const resolveLang = (lang?: string): Lang => {
  if (lang) return normalizeLang(lang);
  if (typeof navigator !== "undefined") return normalizeLang(navigator.language);
  return "en";
};

export const CpuPlayGround = ({ lang: langProp }: { lang?: string }) => {
  const lang = resolveLang(langProp);
  const t = TEXT[lang];

  const [componentType, setComponentType] = useState("cpu");
  const [dieSize, setDieSize] = useState("200");
  const [processNode, setProcessNode] = useState("7");
  const [units, setUnits] = useState("1");
  const [tdp, setTdp] = useState("200");
  const [usageHours, setUsageHours] = useState("24");
  const [loadFactor, setLoadFactor] = useState("50");
  const [lifetime, setLifetime] = useState("5");
  const [country, setCountry] = useState("TW");
  const [pue, setPue] = useState("1.58");

  // Parse inputs
  const dieMm2 = Math.max(1, parseFloat(dieSize) || DEFAULT_DIE[componentType]);
  const dieCm2 = dieMm2 / 100;
  const nodeFactor = NODE_FACTORS[processNode] ?? 1.0;
  const packagingFactor = PACKAGING_FACTORS[componentType] ?? 1.0;
  const numUnits = Math.max(1, parseInt(units) || 1);
  const tdpW = Math.max(1, parseFloat(tdp) || DEFAULT_TDP[componentType]);
  const hours = Math.min(24, Math.max(0, parseFloat(usageHours) || 24));
  const load = Math.min(100, Math.max(0, parseFloat(loadFactor) || 50)) / 100;
  const lifetimeYears = Math.max(1, parseFloat(lifetime) || 5);
  const pueVal = Math.max(1, parseFloat(pue) || 1.58);

  // Embodied impact per unit
  const gwpFrontend = dieCm2 * GWP_FRONTEND_PER_CM2 * nodeFactor;
  const gwpBackend = dieCm2 * GWP_BACKEND_PER_CM2 * packagingFactor * nodeFactor;
  const gwpEmbTotal = (gwpFrontend + gwpBackend) * numUnits;
  const gwpEmbPerYear = gwpEmbTotal / lifetimeYears;

  const wuFrontend = dieCm2 * WU_FRONTEND_PER_CM2 * nodeFactor;
  const wuBackend = dieCm2 * WU_BACKEND_PER_CM2 * packagingFactor;
  const wuEmbTotal = (wuFrontend + wuBackend) * numUnits;
  const wuEmbPerYear = wuEmbTotal / lifetimeYears;

  const adpeEmbTotal = dieCm2 * ADPE_PER_CM2 * nodeFactor * numUnits;
  const adpeEmbPerYear = adpeEmbTotal / lifetimeYears;

  // Operational impact per year
  const energyKwh = (tdpW * numUnits / 1000) * hours * 365.25 * load * pueVal;
  const gwpOpePerYear = energyKwh * (COUNTRY_GWP[country] ?? 0.4);
  const wuOpePerYear = energyKwh * (COUNTRY_WU[country] ?? 0.05);
  const adpeOpePerYear = energyKwh * (COUNTRY_ADPE[country] ?? 7e-7);

  const row = (label: string, emb: number, ope: number, unitArr: string[]) => {
    const total = emb + ope;
    return (
      <Stack key={label} gap={0.5}>
        <Box sx={{ typography: "body2", fontWeight: "bold" }}>{label}</Box>
        <Stack direction="row" gap={2} sx={{ typography: "body2" }}>
          <Box sx={{ flex: 1 }}>{t.results.embodied}: {format(emb * 1000, unitArr)}</Box>
          <Box sx={{ flex: 1 }}>{t.results.operational}: {format(ope * 1000, unitArr)}</Box>
          <Box sx={{ flex: 1, fontWeight: "bold" }}>{t.results.total}: {format(total * 1000, unitArr)}</Box>
        </Stack>
        <Bar
          values={[
            { label: t.results.embodied, value: Math.max(0, emb) },
            { label: t.results.operational, value: Math.max(0, ope) },
          ]}
          colors={COLORS}
          units={unitArr}
        />
      </Stack>
    );
  };

  const componentTypeOptions = Object.entries(t.componentTypes).map(([value, label]) => ({ value, label }));
  const processOptions = Object.entries(t.processNodes).map(([value, label]) => ({ value, label }));
  const countryOptions = Object.entries(t.countries).map(([value, label]) => ({ value, label }));

  return (
    <Stack gap={3} sx={{ my: 2 }}>
      <Stack direction="row" gap={2} sx={{ flexWrap: "wrap" }}>
        <Input type="select" label={t.fields.componentType} options={componentTypeOptions}
          value={componentType} onChange={(v) => {
            setComponentType(v);
            setDieSize(String(DEFAULT_DIE[v] ?? 200));
            setTdp(String(DEFAULT_TDP[v] ?? 200));
          }} sx={{ flex: 1, minWidth: 150 }} />
        <Input type="text" label={t.fields.dieSize} value={dieSize} onChange={setDieSize} sx={{ flex: 0.5, minWidth: 100 }} />
        <Input type="select" label={t.fields.processNode} options={processOptions}
          value={processNode} onChange={setProcessNode} sx={{ flex: 1, minWidth: 150 }} />
        <Input type="text" label={t.fields.units} value={units} onChange={setUnits} sx={{ flex: 0.3, minWidth: 60 }} />
      </Stack>
      <Stack direction="row" gap={2} sx={{ flexWrap: "wrap" }}>
        <Input type="text" label={t.fields.tdp} value={tdp} onChange={setTdp} sx={{ flex: 0.5, minWidth: 100 }} />
        <Input type="text" label={t.fields.usageHours} value={usageHours} onChange={setUsageHours} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="text" label={t.fields.loadFactor} value={loadFactor} onChange={setLoadFactor} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="text" label={t.fields.lifetime} value={lifetime} onChange={setLifetime} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="select" label={t.fields.country} options={countryOptions} value={country} onChange={setCountry} sx={{ flex: 1, minWidth: 120 }} />
        <Input type="text" label={t.fields.pue} value={pue} onChange={setPue} sx={{ flex: 0.3, minWidth: 60 }} />
      </Stack>

      <Box sx={{ typography: "h6" }}>{t.results.results}</Box>

      <Stack gap={2}>
        {row(t.results.gwp, gwpEmbPerYear, gwpOpePerYear, UNITS.gwp)}
        {row(t.results.energy, 0, energyKwh, UNITS.wh)}
        {row(t.results.wu, wuEmbPerYear, wuOpePerYear, ["mL eq.", "L eq.", "m³ eq."])}
        {row(t.results.adpe, adpeEmbPerYear * 1e6, adpeOpePerYear * 1e6, ["µg Sb eq.", "mg Sb eq.", "g Sb eq.", "kg Sb eq."])}
      </Stack>

      <Box sx={{ typography: "caption", color: "text.secondary" }}>{t.note}</Box>
    </Stack>
  );
};
