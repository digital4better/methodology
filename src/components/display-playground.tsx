import { displayGwp, displayPower } from "../hardware-models";
import { COMPONENT_COLORS, PHASE_COLORS } from "../visual-palette";
import { electricityFactor, ELECTRICITY_FACTORS } from "../electricity";
import { ModelNotice } from "./model-notice";
import { ImpactRow } from "./impact-row";
import { finiteNumber, screenArea } from "../calculations";
import { Input } from "@site/src/components/input";
import { Bar } from "@site/src/components/bar";
import Stack from "@mui/system/Stack";
import Box from "@mui/system/Box";
import { useState } from "react";
import { format as formatValue, UNITS } from "@site/src/format";

/**
 * Display parametric impact model
 *
 * Model: GWP = screen_area_cm2 × gwp_per_cm2_by_tech + base
 *
 * LCD: ~0.07 kgCO2e/cm² (backlight + LC panel + glass)
 * OLED: ~0.12 kgCO2e/cm² (more complex organic deposition)
 * E-ink: ~0.03 kgCO2e/cm² (simpler process, no backlight)
 *
 * Power: proportional to area and technology
 * LCD: ~0.003 W/cm² | OLED: ~0.002 W/cm² | E-ink: ~0.0001 W/cm²
 *
 * Sources: Base Empreinte screen factors, Boavizta, manufacturer data
 */

const COLORS = COMPONENT_COLORS;

type Lang = "fr" | "en";

const TEXT = {
  fr: {
    fields: {
      diagonal: "Diagonale (pouces)",
      technology: "Technologie",
      lifetime: "Durée de vie (années)",
      usageHours: "Usage quotidien (heures)",
      country: "Pays",
    },
    results: {
      results: "Résultats (par an)",
      embodied: "Intrinsèque",
      operational: "Opérationnel",
      total: "Total",
      gwp: "Climat (GWP)",
      energy: "Énergie",
      screenArea: "Surface d'écran",
    },
    technologies: {
      lcd: "LCD / IPS",
      oled: "OLED / AMOLED",
      eink: "E-ink",
    },
    countries: { FR: "France", DE: "Allemagne", US: "États-Unis", CN: "Chine", KR: "Corée du Sud" },
    note: "Les coefficients par technologie sont exploratoires, sans calibration sur une dalle identifiée. La puissance par surface ne remplace pas une mesure à la prise.",
  },
  en: {
    fields: {
      diagonal: "Diagonal (inches)",
      technology: "Technology",
      lifetime: "Lifetime (years)",
      usageHours: "Daily usage (hours)",
      country: "Country",
    },
    results: {
      results: "Results (per year)",
      embodied: "Embodied",
      operational: "Operational",
      total: "Total",
      gwp: "Climate (GWP)",
      energy: "Energy",
      screenArea: "Screen area",
    },
    technologies: {
      lcd: "LCD / IPS",
      oled: "OLED / AMOLED",
      eink: "E-ink",
    },
    countries: { FR: "France", DE: "Germany", US: "United States", CN: "China", KR: "South Korea" },
    note: "Technology coefficients are exploratory and not calibrated to an identified panel. Area-based power does not replace a wall-power measurement.",
  },
} as const;

const COUNTRY_GWP = electricityFactor("gwp");

// 16:9 ratio: area_cm2 = diagonal_inches^2 × 2.54^2 × (16×9)/(16²+9²) ≈ diagonal^2 × 2.896
const DIAGONAL_TO_AREA = 2.896; // cm² per inch² for 16:9

const normalizeLang = (lang?: string): Lang =>
  lang?.toLowerCase().startsWith("fr") ? "fr" : "en";
const resolveLang = (lang?: string): Lang => {
  if (lang) return normalizeLang(lang);
  if (typeof navigator !== "undefined") return normalizeLang(navigator.language);
  return "en";
};

export const DisplayPlayGround = ({ lang: langProp }: { lang?: string }) => {
  const lang = resolveLang(langProp);
  const t = TEXT[lang];
  const format = (value: number | undefined, units: string[]) => formatValue(value, units, lang);

  const [diagonal, setDiagonal] = useState("15.6");
  const [technology, setTechnology] = useState("lcd");
  const [lifetime, setLifetime] = useState("7");
  const [usageHours, setUsageHours] = useState("8");
  const [country, setCountry] = useState("FR");

  const diag = finiteNumber(diagonal, 15.6);
  const areaCm2 = screenArea(diag);
  const lifetimeY = Math.max(1, finiteNumber(lifetime, 7));
  const hours = Math.min(24, Math.max(0, finiteNumber(usageHours, 8)));

  const gwpEmb = diag === 0 ? 0 : displayGwp(diag, technology) / lifetimeY;
  const powerW = displayPower(diag, technology);
  const energyKwh = powerW / 1000 * hours * 365.25;
  const gwpOpe = energyKwh * (COUNTRY_GWP[country] ?? 0.4);

  const row = (label: string, emb: number, ope: number, units: string[]) => (
    <ImpactRow lang={lang} key={label} label={label} embodied={emb} operational={ope} units={units} labels={t.results} />
  );

  const techOptions = Object.entries(t.technologies).map(([v, l]) => ({ value: v, label: l }));
  const countryOptions = Object.entries(t.countries).map(([v, l]) => ({ value: v, label: l }));

  return (
    <>
    <Stack gap={3} sx={{ my: 2 }} className="methodology-simulator">
      <Stack direction="row" gap={2} sx={{ flexWrap: "wrap" }}>
        <Input type="number" label={t.fields.diagonal} value={diagonal} onChange={setDiagonal} sx={{ flex: 0.5, minWidth: 100 }} />
        <Input type="select" label={t.fields.technology} options={techOptions} value={technology} onChange={setTechnology} sx={{ flex: 1, minWidth: 120 }} />
        <Input type="number" label={t.fields.lifetime} value={lifetime} onChange={setLifetime} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="number" label={t.fields.usageHours} value={usageHours} onChange={setUsageHours} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="select" label={t.fields.country} options={countryOptions} value={country} onChange={setCountry} sx={{ flex: 1, minWidth: 120 }} />
      </Stack>

      <Box sx={{ typography: "body2" }}>
        {t.results.screenArea}: {(areaCm2).toFixed(0)} cm² ({powerW.toFixed(1)} W)
      </Box>

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
