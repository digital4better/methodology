import { processorGwp, NODE_FACTORS, PROCESSOR_PACKAGING as PACKAGING_FACTORS, HARDWARE_MODELS } from "../hardware-models";
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

/** Historical CPU model plus explicitly exploratory process/package scenarios.
 * Accelerator profiles cover a die proxy, not a complete card inventory.
 */

const COLORS = COMPONENT_COLORS;

type Lang = "fr" | "en";

const TEXT = {
  fr: {
    fields: {
      dieSize: "Surface de die (mm²)",
      processNode: "Scénario de procédé (hypothèse)",
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
      adpe: "Ressources (ADP historique)",
      energy: "Énergie",
    },
    componentTypes: {
      cpu: "CPU",
      gpu: "Puce accélératrice (serveur)",
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
    note: "GWP de référence CPU : surface × 0,0197 + 9,14 kgCO₂e (Boavizta). Les corrections de procédé et de packaging sont exploratoires, non validées par IMEC. L’eau de fabrication n’est pas calculée faute de facteur compatible avec l’eau caractérisée de l’électricité.",
  },
  en: {
    fields: {
      dieSize: "Die size (mm²)",
      processNode: "Process scenario (assumption)",
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
      adpe: "Resources (historical ADP)",
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
    note: "CPU baseline GWP: area × 0.0197 + 9.14 kgCO₂e (Boavizta). Process and packaging adjustments are exploratory, not IMEC-validated. Manufacturing water is not calculated because physical water volumes cannot be added to characterized electricity water impacts.",
  },
} as const;

const CPU_DIE_ADPE = HARDWARE_MODELS.cpu.dieAdpe;
const CPU_BASE_ADPE = HARDWARE_MODELS.cpu.baseAdpe;

// Country electricity factors (GWP kgCO2e/kWh)
const COUNTRY_GWP = electricityFactor("gwp");

const COUNTRY_ADPE = electricityFactor("adpe");

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
  const format = (value: number | undefined, units: string[]) => formatValue(value, units, lang);

  const [componentType, setComponentType] = useState("cpu");
  const [dieSize, setDieSize] = useState("200");
  const [processNode, setProcessNode] = useState("28");
  const [units, setUnits] = useState("1");
  const [tdp, setTdp] = useState("200");
  const [usageHours, setUsageHours] = useState("24");
  const [loadFactor, setLoadFactor] = useState("50");
  const [lifetime, setLifetime] = useState("5");
  const [country, setCountry] = useState("FR");
  const [pue, setPue] = useState("1.58");

  // Parse inputs
  const dieMm2 = Math.max(1, finiteNumber(dieSize, DEFAULT_DIE[componentType]));
  const dieCm2 = dieMm2 / 100;
  const nodeFactor = NODE_FACTORS[processNode] ?? 1.0;
  const packagingFactor = PACKAGING_FACTORS[componentType] ?? 1.0;
  const numUnits = Math.floor(finiteNumber(units, 1));
  const tdpW = finiteNumber(tdp, DEFAULT_TDP[componentType]);
  const hours = Math.min(24, Math.max(0, finiteNumber(usageHours, 24)));
  const load = Math.min(100, Math.max(0, finiteNumber(loadFactor, 50))) / 100;
  const lifetimeYears = Math.max(1, finiteNumber(lifetime, 5));
  const pueVal = Math.max(1, finiteNumber(pue, 1.58));

  // Embodied impact per unit (Boavizta model: die_size * die_coeff + base, × node_factor × packaging_factor)
  const gwpEmbUnit = processorGwp(dieMm2, processNode, 1, componentType);
  const gwpEmbTotal = gwpEmbUnit * numUnits;
  const gwpEmbPerYear = gwpEmbTotal / lifetimeYears;

  const adpeEmbUnit = (dieMm2 * CPU_DIE_ADPE + CPU_BASE_ADPE) * nodeFactor * packagingFactor;
  const adpeEmbTotal = adpeEmbUnit * numUnits;
  const adpeEmbPerYear = adpeEmbTotal / lifetimeYears;

  // Operational impact per year
  const energyKwh = (tdpW * numUnits / 1000) * hours * 365.25 * load * pueVal;
  const gwpOpePerYear = energyKwh * (COUNTRY_GWP[country] ?? 0.4);
  const adpeOpePerYear = energyKwh * (COUNTRY_ADPE[country] ?? 7e-7);

  const row = (label: string, emb: number, ope: number, units: string[]) => (
    <ImpactRow lang={lang} key={label} label={label} embodied={emb} operational={ope} units={units} labels={t.results} />
  );

  const componentTypeOptions = Object.entries(t.componentTypes).map(([value, label]) => ({ value, label }));
  const processOptions = Object.entries(t.processNodes).map(([value, label]) => ({ value, label }));
  const countryOptions = Object.entries(t.countries).map(([value, label]) => ({ value, label }));

  return (
    <>
    <Stack gap={3} sx={{ my: 2 }} className="methodology-simulator">
      <Stack direction="row" gap={2} sx={{ flexWrap: "wrap" }}>
        <Input type="select" label={t.fields.componentType} options={componentTypeOptions}
          value={componentType} onChange={(v) => {
            setComponentType(v);
            setDieSize(String(DEFAULT_DIE[v] ?? 200));
            setTdp(String(DEFAULT_TDP[v] ?? 200));
          }} sx={{ flex: 1, minWidth: 150 }} />
        <Input type="number" label={t.fields.dieSize} value={dieSize} onChange={setDieSize} sx={{ flex: 0.5, minWidth: 100 }} />
        <Input type="select" label={t.fields.processNode} options={processOptions}
          value={processNode} onChange={setProcessNode} sx={{ flex: 1, minWidth: 150 }} />
        <Input type="number" label={t.fields.units} value={units} onChange={setUnits} sx={{ flex: 0.3, minWidth: 60 }} />
      </Stack>
      <details className="component-assumptions"><summary>{lang === "fr" ? "Conditions d’usage et durée de vie" : "Usage conditions and lifetime"}</summary>
      <Stack direction="row" gap={2} sx={{ flexWrap: "wrap" }}>
        <Input type="number" label={t.fields.tdp} value={tdp} onChange={setTdp} sx={{ flex: 0.5, minWidth: 100 }} />
        <Input type="number" label={t.fields.usageHours} value={usageHours} onChange={setUsageHours} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="number" label={t.fields.loadFactor} value={loadFactor} onChange={setLoadFactor} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="number" label={t.fields.lifetime} value={lifetime} onChange={setLifetime} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="select" label={t.fields.country} options={countryOptions} value={country} onChange={setCountry} sx={{ flex: 1, minWidth: 120 }} />
        <Input type="number" label={t.fields.pue} value={pue} onChange={setPue} sx={{ flex: 0.3, minWidth: 60 }} />
      </Stack>
      </details>

      <Box sx={{ typography: "h6" }}>{t.results.results}</Box>

      <Stack gap={2}>
        {row(t.results.gwp, gwpEmbPerYear, gwpOpePerYear, UNITS.gwp)}
        {row(t.results.energy, 0, energyKwh, UNITS.wh)}
        {row(t.results.adpe, adpeEmbPerYear, adpeOpePerYear, ["µg Sb eq.", "mg Sb eq.", "g Sb eq.", "kg Sb eq."])}
      </Stack>

    </Stack>
    <aside className="simulator-context">
      <p>{t.note}</p>
      <ModelNotice lang={lang} />
    </aside>
    </>
  );
};
