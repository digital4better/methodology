import { storageGwp, STORAGE_POWER } from "../hardware-models";
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

/**
 * Storage parametric impact model
 *
 * SSD embodied: (GB / density) × 2.2 + 6.34 kgCO2e per drive.
 * HDD embodied: historical Boavizta 31.11 kgCO2e per drive.
 *
 * SSD power: 1.2 W/TB (Cloud Jewels)
 * HDD power: 0.65 W/TB (Cloud Jewels)
 */

const COLORS = COMPONENT_COLORS;

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
    note: "SSD : modèle Boavizta (capacité/densité × 2,20 kgCO₂e/cm² + 6,34 kgCO₂e base). HDD : 31,11 kgCO₂e forfaitaire. Puissance SSD : 1,2 W/To, HDD : 0,65 W/To (Cloud Jewels).",
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
    note: "SSD: Boavizta model (capacity/density × 2.20 kgCO₂e/cm² + 6.34 kgCO₂e base). HDD: 31.11 kgCO₂e flat. Power SSD: 1.2 W/TB, HDD: 0.65 W/TB (Cloud Jewels).",
  },
} as const;

const LIFETIME: Record<string, number> = {
  ssd_sata: 5,
  ssd_nvme: 5,
  hdd: 5,
};

const COUNTRY_GWP = electricityFactor("gwp");

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
  const format = (value: number | undefined, units: string[]) => formatValue(value, units, lang);

  const [storageType, setStorageType] = useState("ssd_nvme");
  const [capacity, setCapacity] = useState("1");
  const [units, setUnits] = useState("1");
  const [lifetime, setLifetime] = useState("5");
  const [usageHours, setUsageHours] = useState("24");
  const [country, setCountry] = useState("FR");
  const [pue, setPue] = useState("1.58");

  const capTB = finiteNumber(capacity, 1);
  const numUnits = Math.floor(finiteNumber(units, 1));
  const totalTB = capTB * numUnits;
  const lifetimeY = Math.max(1, finiteNumber(lifetime, LIFETIME[storageType] ?? 5));
  const hours = Math.min(24, Math.max(0, finiteNumber(usageHours, 24)));
  const pueVal = Math.max(1, finiteNumber(pue, 1.58));

  const gwpEmb = storageGwp(capTB * 1000, storageType, numUnits) / lifetimeY;
  const energyKwh = (STORAGE_POWER[storageType] ?? 1.2) * totalTB / 1000 * hours * 365.25 * pueVal;
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
        <Input type="select" label={t.fields.type} options={typeOptions} value={storageType} onChange={setStorageType} sx={{ flex: 1, minWidth: 120 }} />
        <Input type="number" label={t.fields.capacity} value={capacity} onChange={setCapacity} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="number" label={t.fields.units} value={units} onChange={setUnits} sx={{ flex: 0.3, minWidth: 60 }} />
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
