import { Input } from "@site/src/components/input";
import { Bar } from "@site/src/components/bar";
import Stack from "@mui/system/Stack";
import Box from "@mui/system/Box";
import { useState } from "react";
import { format, UNITS } from "@site/src/format";

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

const COLORS = [
  { bgcolor: "#023047", color: "white" },
  { bgcolor: "#219ebc", color: "white" },
];

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
    note: "Modèle paramétrique. Surface = diagonale² × 0,45 (ratio 16:9). LCD : ~0,07 kgCO₂e/cm², OLED : ~0,12 kgCO₂e/cm². Sources : Base Empreinte, Boavizta.",
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
    note: "Parametric model. Area = diagonal² × 0.45 (16:9 ratio). LCD: ~0.07 kgCO₂e/cm², OLED: ~0.12 kgCO₂e/cm². Sources: Base Empreinte, Boavizta.",
  },
} as const;

// GWP per cm² of screen area by technology
const GWP_PER_CM2: Record<string, number> = {
  lcd: 0.07,
  oled: 0.12,
  eink: 0.03,
};

// Base GWP (driver board, connectors, frame)
const GWP_BASE: Record<string, number> = {
  lcd: 3.0,
  oled: 2.5,
  eink: 1.5,
};

// Power per cm² (W)
const POWER_PER_CM2: Record<string, number> = {
  lcd: 0.003,
  oled: 0.002,
  eink: 0.0001,
};

const COUNTRY_GWP: Record<string, number> = {
  FR: 0.0355, DE: 0.377, US: 0.353, CN: 0.537, KR: 0.415,
};

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

  const [diagonal, setDiagonal] = useState("15.6");
  const [technology, setTechnology] = useState("lcd");
  const [lifetime, setLifetime] = useState("7");
  const [usageHours, setUsageHours] = useState("8");
  const [country, setCountry] = useState("FR");

  const diag = Math.max(1, parseFloat(diagonal) || 15.6);
  const areaCm2 = diag * diag * DIAGONAL_TO_AREA;
  const lifetimeY = Math.max(1, parseFloat(lifetime) || 7);
  const hours = Math.min(24, Math.max(0, parseFloat(usageHours) || 8));

  const gwpEmb = (areaCm2 * (GWP_PER_CM2[technology] ?? 0.07) + (GWP_BASE[technology] ?? 3)) / lifetimeY;
  const powerW = areaCm2 * (POWER_PER_CM2[technology] ?? 0.003);
  const energyKwh = powerW / 1000 * hours * 365.25;
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

  const techOptions = Object.entries(t.technologies).map(([v, l]) => ({ value: v, label: l }));
  const countryOptions = Object.entries(t.countries).map(([v, l]) => ({ value: v, label: l }));

  return (
    <Stack gap={3} sx={{ my: 2 }}>
      <Stack direction="row" gap={2} sx={{ flexWrap: "wrap" }}>
        <Input type="text" label={t.fields.diagonal} value={diagonal} onChange={setDiagonal} sx={{ flex: 0.5, minWidth: 100 }} />
        <Input type="select" label={t.fields.technology} options={techOptions} value={technology} onChange={setTechnology} sx={{ flex: 1, minWidth: 120 }} />
        <Input type="text" label={t.fields.lifetime} value={lifetime} onChange={setLifetime} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="text" label={t.fields.usageHours} value={usageHours} onChange={setUsageHours} sx={{ flex: 0.5, minWidth: 80 }} />
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
      <Box sx={{ typography: "caption", color: "text.secondary" }}>{t.note}</Box>
    </Stack>
  );
};
