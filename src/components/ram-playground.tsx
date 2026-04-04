import { Input } from "@site/src/components/input";
import { Bar } from "@site/src/components/bar";
import Stack from "@mui/system/Stack";
import Box from "@mui/system/Box";
import { useState } from "react";
import { format, UNITS } from "@site/src/format";

/**
 * RAM parametric impact model
 *
 * Embodied model based on Boavizta methodology:
 *   GWP_emb = capacity_GB × gwp_per_GB × density_factor
 *
 * Boavizta reference: ~5.22 kgCO2e per 32GB DDR4 module = 0.163 kgCO2e/GB
 * DDR5: ~10-15% more impact per GB due to newer process
 * HBM: significantly more due to TSV packaging and advanced process
 *
 * Power model: ~0.375 W/GB (Boavizta) to 0.392 W/GB (Cloud Jewels)
 */

const COLORS = [
  { bgcolor: "#023047", color: "white" },
  { bgcolor: "#219ebc", color: "white" },
];

type Lang = "fr" | "en";

const TEXT = {
  fr: {
    fields: {
      capacity: "Capacité (Go)",
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
    note: "Modèle paramétrique basé sur Boavizta (5,22 kgCO₂e / module 32 Go DDR4). Puissance : 0,392 W/Go (Cloud Jewels). HBM : majoration liée au packaging TSV et au procédé avancé.",
  },
  en: {
    fields: {
      capacity: "Capacity (GB)",
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
    note: "Parametric model based on Boavizta (5.22 kgCO₂e / 32GB DDR4 module). Power: 0.392 W/GB (Cloud Jewels). HBM: surcharge for TSV packaging and advanced process.",
  },
} as const;

// GWP per GB (base DDR4)
const GWP_PER_GB: Record<string, number> = {
  ddr4: 0.163,   // 5.22 kgCO2e / 32 GB (Boavizta)
  ddr5: 0.187,   // ~15% more than DDR4 (newer process)
  hbm2e: 0.8,    // TSV packaging + advanced DRAM process + interposer
  hbm3: 1.0,     // Latest generation, most complex packaging
};

// Water per GB (m³)
const WU_PER_GB: Record<string, number> = {
  ddr4: 0.0044,
  ddr5: 0.005,
  hbm2e: 0.025,
  hbm3: 0.032,
};

// ADPe per GB (kg Sb eq.)
const ADPE_PER_GB: Record<string, number> = {
  ddr4: 5e-7,
  ddr5: 5.5e-7,
  hbm2e: 2e-6,
  hbm3: 2.5e-6,
};

// Power per GB (W)
const POWER_PER_GB = 0.000392; // kW/GB = 0.392 W/GB

const COUNTRY_GWP: Record<string, number> = {
  FR: 0.0355, DE: 0.377, US: 0.353, CN: 0.537, TW: 0.509, KR: 0.415,
};
const COUNTRY_WU: Record<string, number> = {
  FR: 0.0947, DE: 0.0511, US: 0.0673, CN: 0.038, TW: 0.05, KR: 0.04,
};

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

  const [memType, setMemType] = useState("ddr4");
  const [capacity, setCapacity] = useState("32");
  const [modules, setModules] = useState("1");
  const [lifetime, setLifetime] = useState("5");
  const [usageHours, setUsageHours] = useState("24");
  const [country, setCountry] = useState("FR");
  const [pue, setPue] = useState("1.58");

  const capGB = Math.max(1, parseFloat(capacity) || 32);
  const numModules = Math.max(1, parseInt(modules) || 1);
  const totalGB = capGB * numModules;
  const lifetimeY = Math.max(1, parseFloat(lifetime) || 5);
  const hours = Math.min(24, Math.max(0, parseFloat(usageHours) || 24));
  const pueVal = Math.max(1, parseFloat(pue) || 1.58);

  const gwpEmb = totalGB * (GWP_PER_GB[memType] ?? 0.163) / lifetimeY;
  const wuEmb = totalGB * (WU_PER_GB[memType] ?? 0.0044) / lifetimeY;
  const adpeEmb = totalGB * (ADPE_PER_GB[memType] ?? 5e-7) / lifetimeY;

  const energyKwh = POWER_PER_GB * totalGB * hours * 365.25 * pueVal;
  const gwpOpe = energyKwh * (COUNTRY_GWP[country] ?? 0.4);
  const wuOpe = energyKwh * (COUNTRY_WU[country] ?? 0.05);

  const row = (label: string, emb: number, ope: number, u: string[]) => (
    <Stack key={label} gap={0.5}>
      <Box sx={{ typography: "body2", fontWeight: "bold" }}>{label}</Box>
      <Stack direction="row" gap={2} sx={{ typography: "body2" }}>
        <Box sx={{ flex: 1 }}>{t.results.embodied}: {format(emb * 1000, u)}</Box>
        <Box sx={{ flex: 1 }}>{t.results.operational}: {format(ope * 1000, u)}</Box>
        <Box sx={{ flex: 1, fontWeight: "bold" }}>{t.results.total}: {format((emb + ope) * 1000, u)}</Box>
      </Stack>
      <Bar values={[{ label: t.results.embodied, value: Math.max(0, emb) }, { label: t.results.operational, value: Math.max(0, ope) }]} colors={COLORS} units={u} />
    </Stack>
  );

  const typeOptions = Object.entries(t.types).map(([v, l]) => ({ value: v, label: l }));
  const countryOptions = Object.entries(t.countries).map(([v, l]) => ({ value: v, label: l }));

  return (
    <Stack gap={3} sx={{ my: 2 }}>
      <Stack direction="row" gap={2} sx={{ flexWrap: "wrap" }}>
        <Input type="select" label={t.fields.type} options={typeOptions} value={memType} onChange={setMemType} sx={{ flex: 1, minWidth: 120 }} />
        <Input type="text" label={t.fields.capacity} value={capacity} onChange={setCapacity} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="text" label={t.fields.modules} value={modules} onChange={setModules} sx={{ flex: 0.3, minWidth: 60 }} />
        <Input type="text" label={t.fields.lifetime} value={lifetime} onChange={setLifetime} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="text" label={t.fields.usageHours} value={usageHours} onChange={setUsageHours} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="select" label={t.fields.country} options={countryOptions} value={country} onChange={setCountry} sx={{ flex: 1, minWidth: 120 }} />
        <Input type="text" label={t.fields.pue} value={pue} onChange={setPue} sx={{ flex: 0.3, minWidth: 60 }} />
      </Stack>
      <Box sx={{ typography: "h6" }}>{t.results.results}</Box>
      <Stack gap={2}>
        {row(t.results.gwp, gwpEmb, gwpOpe, UNITS.gwp)}
        {row(t.results.energy, 0, energyKwh, UNITS.wh)}
        {row(t.results.wu, wuEmb, wuOpe, ["mL eq.", "L eq.", "m³ eq."])}
      </Stack>
      <Box sx={{ typography: "caption", color: "text.secondary" }}>{t.note}</Box>
    </Stack>
  );
};
