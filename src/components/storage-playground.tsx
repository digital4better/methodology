import { Input } from "@site/src/components/input";
import { Bar } from "@site/src/components/bar";
import Stack from "@mui/system/Stack";
import Box from "@mui/system/Box";
import { useState } from "react";
import { format, UNITS } from "@site/src/format";

/**
 * Storage parametric impact model
 *
 * SSD embodied: ~0.16 kgCO2e/GB (Boavizta, based on NAND die area scaling)
 * HDD embodied: ~0.025 kgCO2e/GB (Boavizta, mechanical + platters)
 *
 * SSD power: 1.2 W/TB (Cloud Jewels)
 * HDD power: 0.65 W/TB (Cloud Jewels)
 */

const COLORS = [
  { bgcolor: "#023047", color: "white" },
  { bgcolor: "#219ebc", color: "white" },
];

type Lang = "fr" | "en";

const TEXT = {
  fr: {
    fields: {
      type: "Type de stockage",
      capacity: "Capacité (To)",
      units: "Nombre d'unités",
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
      energy: "Énergie",
    },
    types: {
      ssd_sata: "SSD SATA",
      ssd_nvme: "SSD NVMe",
      hdd: "HDD",
    },
    countries: { FR: "France", DE: "Allemagne", US: "États-Unis", CN: "Chine", SE: "Suède" },
    note: "SSD intrinsèque : ~0,16 kgCO₂e/Go (Boavizta). HDD : ~0,025 kgCO₂e/Go. Puissance SSD : 1,2 W/To, HDD : 0,65 W/To (Cloud Jewels).",
  },
  en: {
    fields: {
      type: "Storage type",
      capacity: "Capacity (TB)",
      units: "Number of units",
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
      energy: "Energy",
    },
    types: {
      ssd_sata: "SSD SATA",
      ssd_nvme: "SSD NVMe",
      hdd: "HDD",
    },
    countries: { FR: "France", DE: "Germany", US: "United States", CN: "China", SE: "Sweden" },
    note: "SSD embodied: ~0.16 kgCO₂e/GB (Boavizta). HDD: ~0.025 kgCO₂e/GB. Power SSD: 1.2 W/TB, HDD: 0.65 W/TB (Cloud Jewels).",
  },
} as const;

// GWP per TB embodied
const GWP_PER_TB: Record<string, number> = {
  ssd_sata: 160,   // 0.16 kgCO2e/GB × 1000
  ssd_nvme: 160,
  hdd: 25,          // 0.025 kgCO2e/GB × 1000
};

// Power per TB (W)
const POWER_PER_TB: Record<string, number> = {
  ssd_sata: 1.2,
  ssd_nvme: 1.2,
  hdd: 0.65,
};

const LIFETIME: Record<string, number> = {
  ssd_sata: 5,
  ssd_nvme: 5,
  hdd: 5,
};

const COUNTRY_GWP: Record<string, number> = {
  FR: 0.0355, DE: 0.377, US: 0.353, CN: 0.537, SE: 0.013,
};

const normalizeLang = (lang?: string): Lang =>
  lang?.toLowerCase().startsWith("fr") ? "fr" : "en";
const resolveLang = (lang?: string): Lang => {
  if (lang) return normalizeLang(lang);
  if (typeof navigator !== "undefined") return normalizeLang(navigator.language);
  return "en";
};

export const StoragePlayGround = ({ lang: langProp }: { lang?: string }) => {
  const lang = resolveLang(langProp);
  const t = TEXT[lang];

  const [storageType, setStorageType] = useState("ssd_nvme");
  const [capacity, setCapacity] = useState("1");
  const [units, setUnits] = useState("1");
  const [lifetime, setLifetime] = useState("5");
  const [usageHours, setUsageHours] = useState("24");
  const [country, setCountry] = useState("FR");
  const [pue, setPue] = useState("1.58");

  const capTB = Math.max(0.1, parseFloat(capacity) || 1);
  const numUnits = Math.max(1, parseInt(units) || 1);
  const totalTB = capTB * numUnits;
  const lifetimeY = Math.max(1, parseFloat(lifetime) || (LIFETIME[storageType] ?? 5));
  const hours = Math.min(24, Math.max(0, parseFloat(usageHours) || 24));
  const pueVal = Math.max(1, parseFloat(pue) || 1.58);

  const gwpEmb = totalTB * (GWP_PER_TB[storageType] ?? 160) / lifetimeY;
  const energyKwh = (POWER_PER_TB[storageType] ?? 1.2) * totalTB / 1000 * hours * 365.25 * pueVal;
  const gwpOpe = energyKwh * (COUNTRY_GWP[country] ?? 0.4);

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
        <Input type="select" label={t.fields.type} options={typeOptions} value={storageType} onChange={setStorageType} sx={{ flex: 1, minWidth: 120 }} />
        <Input type="text" label={t.fields.capacity} value={capacity} onChange={setCapacity} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="text" label={t.fields.units} value={units} onChange={setUnits} sx={{ flex: 0.3, minWidth: 60 }} />
        <Input type="text" label={t.fields.lifetime} value={lifetime} onChange={setLifetime} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="text" label={t.fields.usageHours} value={usageHours} onChange={setUsageHours} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="select" label={t.fields.country} options={countryOptions} value={country} onChange={setCountry} sx={{ flex: 1, minWidth: 120 }} />
        <Input type="text" label={t.fields.pue} value={pue} onChange={setPue} sx={{ flex: 0.3, minWidth: 60 }} />
      </Stack>
      <Box sx={{ typography: "h6" }}>{t.results.results}</Box>
      <Stack gap={2}>
        {row(t.results.gwp, gwpEmb, gwpOpe, UNITS.gwp)}
        {row(t.results.energy, 0, energyKwh, UNITS.wh)}
      </Stack>
      <Box sx={{ typography: "caption", color: "text.secondary" }}>{t.note}</Box>
    </Stack>
  );
};
