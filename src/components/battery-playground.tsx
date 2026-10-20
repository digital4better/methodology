import { batteryGwp, HARDWARE_MODELS } from "../hardware-models";
import { COMPONENT_COLORS, PHASE_COLORS } from "../visual-palette";
import { finiteNumber } from "../calculations";
import { Input } from "@site/src/components/input";
import { Bar } from "@site/src/components/bar";
import Stack from "@mui/system/Stack";
import Box from "@mui/system/Box";
import { useState } from "react";
import { format as formatValue, UNITS } from "@site/src/format";

/**
 * Battery parametric impact model
 *
 * Model: GWP = capacity_kWh × gwp_per_kWh_by_chemistry
 *
 * Li-ion (LCO, smartphone): ~75 kgCO2e/kWh
 * Li-ion (NMC, laptop/EV): ~65 kgCO2e/kWh
 * LiFePO4 (LFP): ~50 kgCO2e/kWh
 *
 * Coefficients are illustrative Digital4Better scenarios, not validated study medians.
 */

const COLORS = COMPONENT_COLORS;

type Lang = "fr" | "en";

const TEXT = {
  fr: {
    fields: {
      capacity: "Capacité (Wh)",
      chemistry: "Chimie",
      lifetime: "Durée de vie (années)",
      cycles: "Cycles estimés",
    },
    results: {
      results: "Résultats (sur la durée de vie)",
      perYear: "Résultats (par an)",
      embodied: "Intrinsèque total",
      perYearLabel: "Par an",
      gwp: "Climat (GWP)",
      adpe: "Ressources (ADPe)",
      wu: "Eau (WU)",
      cobalt: "Cobalt",
      lithium: "Lithium",
      materials: "Matériaux critiques estimés",
    },
    chemistries: {
      lco: "LiCoO₂ (LCO : smartphone)",
      nmc: "NMC (laptop, tablette)",
      lfp: "LiFePO₄ (LFP : serveur, UPS)",
    },
    note: "Les coefficients par chimie sont des hypothèses D4B à calibrer sur une cellule ou un pack identifié. Les masses de cobalt et de lithium ne mesurent pas les impacts sur l’eau ou les ressources, non évalués ici.",
  },
  en: {
    fields: {
      capacity: "Capacity (Wh)",
      chemistry: "Chemistry",
      lifetime: "Lifetime (years)",
      cycles: "Estimated cycles",
    },
    results: {
      results: "Results (over lifetime)",
      perYear: "Results (per year)",
      embodied: "Total embodied",
      perYearLabel: "Per year",
      gwp: "Climate (GWP)",
      adpe: "Resources (ADPe)",
      wu: "Water (WU)",
      cobalt: "Cobalt",
      lithium: "Lithium",
      materials: "Estimated critical materials",
    },
    chemistries: {
      lco: "LiCoO₂ (LCO : smartphone)",
      nmc: "NMC (laptop, tablet)",
      lfp: "LiFePO₄ (LFP : server, UPS)",
    },
    note: "Chemistry coefficients are D4B assumptions to calibrate to an identified cell or pack. Cobalt and lithium masses do not measure water or resource impacts, which are not assessed here.",
  },
} as const;

const COBALT_PER_KWH: Record<string, number> = HARDWARE_MODELS.battery.cobaltGramsPerKwh;
const LITHIUM_PER_KWH: Record<string, number> = HARDWARE_MODELS.battery.lithiumGramsPerKwh;

const normalizeLang = (lang?: string): Lang =>
  lang?.toLowerCase().startsWith("fr") ? "fr" : "en";
const resolveLang = (lang?: string): Lang => {
  if (lang) return normalizeLang(lang);
  if (typeof navigator !== "undefined") return normalizeLang(navigator.language);
  return "en";
};

export const BatteryPlayGround = ({ lang: langProp }: { lang?: string }) => {
  const lang = resolveLang(langProp);
  const t = TEXT[lang];
  const format = (value: number | undefined, units: string[]) => formatValue(value, units, lang);

  const [capacity, setCapacity] = useState("50");
  const [chemistry, setChemistry] = useState("nmc");
  const [lifetime, setLifetime] = useState("4");

  const capWh = finiteNumber(capacity, 50);
  const capKwh = capWh / 1000;
  const lifetimeY = Math.max(1, finiteNumber(lifetime, 4));

  const gwpTotal = batteryGwp(capWh, chemistry);
  const gwpPerYear = gwpTotal / lifetimeY;
  const cobaltG = capKwh * (COBALT_PER_KWH[chemistry] ?? 0);
  const lithiumG = capKwh * (LITHIUM_PER_KWH[chemistry] ?? 90);

  const chemOptions = Object.entries(t.chemistries).map(([v, l]) => ({ value: v, label: l }));

  return (
    <>
    <Stack gap={3} sx={{ my: 2 }} className="methodology-simulator">
      <Stack direction="row" gap={2} sx={{ flexWrap: "wrap" }}>
        <Input type="number" label={t.fields.capacity} value={capacity} onChange={setCapacity} sx={{ flex: 0.5, minWidth: 100 }} />
        <Input type="select" label={t.fields.chemistry} options={chemOptions} value={chemistry} onChange={setChemistry} sx={{ flex: 1, minWidth: 200 }} />
        <Input type="number" label={t.fields.lifetime} value={lifetime} onChange={setLifetime} sx={{ flex: 0.5, minWidth: 80 }} />
      </Stack>

      <Box sx={{ typography: "h6" }}>{t.results.perYear}</Box>
      <Stack gap={1.5}>
        <Stack direction="row" gap={2} sx={{ typography: "body2", flexWrap: "wrap" }}>
          <Box sx={{ flex: 1 }}>{t.results.gwp}: <strong>{format(gwpTotal * 1000, UNITS.gwp)}</strong> {t.results.embodied} → <strong>{format(gwpPerYear * 1000, UNITS.gwp)}</strong> {t.results.perYearLabel}</Box>
        </Stack>
      </Stack>

      <Box sx={{ typography: "h6" }}>{t.results.materials}</Box>
      <Stack direction="row" gap={4} sx={{ typography: "body2", flexWrap: "wrap" }}>
        <Box>{t.results.cobalt}: <strong>{cobaltG.toFixed(1)} g</strong></Box>
        <Box>{t.results.lithium}: <strong>{lithiumG.toFixed(1)} g</strong></Box>
      </Stack>

    </Stack>
    <aside className="simulator-context"><p>{t.note}</p></aside>
    </>
  );
};
