import { memoryGwp, HARDWARE_MODELS } from "../hardware-models";
import { COMPONENT_COLORS, PHASE_COLORS } from "../visual-palette";
import { electricityFactor, ELECTRICITY_FACTORS } from "../electricity";
import { ModelNotice } from "./model-notice";
import { ImpactRow } from "./impact-row";
import { finiteNumber } from "../calculations";
import { Input } from "@site/src/components/input";
import { Bar } from "@site/src/components/bar";
import Stack from "@mui/system/Stack";
import Box from "@mui/system/Box";
import { useState } from "react";
import { format as formatValue, UNITS } from "@site/src/format";

/** Historical Boavizta die-area model; density and packaging are explicit scenarios.
 * Power proxy: 0.392 W/GB (Cloud Jewels), not a workload-dependent power measurement. */

const COLORS = COMPONENT_COLORS;

type Lang = "fr" | "en";

const TEXT = {
  fr: {
    fields: {
      capacity: "Capacité par module (Go)",
      type: "Type de mémoire",
      modules: "Nombre de modules",
      lifetime: "Durée de vie (années)",
      usageHours: "Usage quotidien (heures)",
      country: "Pays",
      pue: "PUE",
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
    types: {
      ddr4: "DDR4",
      ddr5: "DDR5",
      hbm2e: "HBM2e",
      hbm3: "HBM3",
    },
    countries: { FR: "France", DE: "Allemagne", US: "États-Unis", CN: "Chine", TW: "Taïwan", KR: "Corée du Sud" },
    note: "Modèle paramétrique basé sur Boavizta (2,20 × surface de die en cm² + 5,22 kgCO₂e par module). Puissance : 0,392 W/Go (Cloud Jewels). Densités et majorations HBM : hypothèses exploratoires non calibrées.",
  },
  en: {
    fields: {
      capacity: "Capacity per module (GB)",
      type: "Memory type",
      modules: "Number of modules",
      lifetime: "Lifetime (years)",
      usageHours: "Daily usage (hours)",
      country: "Country",
      pue: "PUE",
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
    types: {
      ddr4: "DDR4",
      ddr5: "DDR5",
      hbm2e: "HBM2e",
      hbm3: "HBM3",
    },
    countries: { FR: "France", DE: "Germany", US: "United States", CN: "China", TW: "Taiwan", KR: "South Korea" },
    note: "Parametric model based on Boavizta (2.20 × die area in cm² + 5.22 kgCO₂e per module). Power: 0.392 W/GB (Cloud Jewels). Densities and HBM multipliers are uncalibrated exploratory assumptions.",
  },
} as const;

const POWER_PER_GB = HARDWARE_MODELS.memory.powerPerGb / 1000;

const COUNTRY_GWP = electricityFactor("gwp");

const normalizeLang = (lang?: string): Lang =>
  lang?.toLowerCase().startsWith("fr") ? "fr" : "en";
const resolveLang = (lang?: string): Lang => {
  if (lang) return normalizeLang(lang);
  if (typeof navigator !== "undefined") return normalizeLang(navigator.language);
  return "en";
};

export const RamPlayGround = ({ lang: langProp }: { lang?: string }) => {
  const lang = resolveLang(langProp);
  const t = TEXT[lang];
  const format = (value: number | undefined, units: string[]) => formatValue(value, units, lang);

  const [memType, setMemType] = useState("ddr4");
  const [capacity, setCapacity] = useState("32");
  const [modules, setModules] = useState("1");
  const [lifetime, setLifetime] = useState("5");
  const [usageHours, setUsageHours] = useState("24");
  const [country, setCountry] = useState("FR");
  const [pue, setPue] = useState("1.58");

  const capGB = finiteNumber(capacity, 32);
  const numModules = Math.floor(finiteNumber(modules, 1));
  const totalGB = capGB * numModules;
  const lifetimeY = Math.max(1, finiteNumber(lifetime, 5));
  const hours = Math.min(24, Math.max(0, finiteNumber(usageHours, 24)));
  const pueVal = Math.max(1, finiteNumber(pue, 1.58));

  // Boavizta model: (capacity / density) * die_coeff + base, per module × pkg_factor
  const gwpEmbPerModule = memoryGwp(capGB, memType);
  const gwpEmb = gwpEmbPerModule * numModules / lifetimeY;

  const energyKwh = POWER_PER_GB * totalGB * hours * 365.25 * pueVal;
  const gwpOpe = energyKwh * (COUNTRY_GWP[country] ?? 0.4);

  const row = (label: string, emb: number, ope: number, units: string[]) => (
    <ImpactRow lang={lang} key={label} label={label} embodied={emb} operational={ope} units={units} labels={t.results} />
  );

  const typeOptions = Object.entries(t.types).map(([v, l]) => ({ value: v, label: l }));
  const countryOptions = Object.entries(t.countries).map(([v, l]) => ({ value: v, label: l }));

  return (
    <>
    <Stack gap={3} sx={{ my: 2 }} className="methodology-simulator">
      <Stack direction="row" gap={2} sx={{ flexWrap: "wrap" }}>
        <Input type="select" label={t.fields.type} options={typeOptions} value={memType} onChange={setMemType} sx={{ flex: 1, minWidth: 120 }} />
        <Input type="number" label={t.fields.capacity} value={capacity} onChange={setCapacity} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="number" label={t.fields.modules} value={modules} onChange={setModules} sx={{ flex: 0.3, minWidth: 60 }} />
        <Input type="number" label={t.fields.lifetime} value={lifetime} onChange={setLifetime} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="number" label={t.fields.usageHours} value={usageHours} onChange={setUsageHours} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="select" label={t.fields.country} options={countryOptions} value={country} onChange={setCountry} sx={{ flex: 1, minWidth: 120 }} />
        <Input type="number" label={t.fields.pue} value={pue} onChange={setPue} sx={{ flex: 0.3, minWidth: 60 }} />
      </Stack>
      <Box sx={{ typography: "h6" }}>{t.results.results}</Box>
      <Stack gap={2}>
        {row(t.results.gwp, gwpEmb, gwpOpe, UNITS.gwp)}
        {row(t.results.energy, 0, energyKwh, UNITS.wh)}
      </Stack>
    </Stack>
    <aside className="simulator-context">
      <p>{t.note}</p>
      <ModelNotice lang={lang} />
    </aside>
    </>
  );
};
