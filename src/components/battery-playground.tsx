import { Input } from "@site/src/components/input";
import { Bar } from "@site/src/components/bar";
import Stack from "@mui/system/Stack";
import Box from "@mui/system/Box";
import { useState } from "react";
import { format, UNITS } from "@site/src/format";

/**
 * Battery parametric impact model
 *
 * Model: GWP = capacity_kWh × gwp_per_kWh_by_chemistry
 *
 * Li-ion (LCO, smartphone): ~75 kgCO2e/kWh
 * Li-ion (NMC, laptop/EV): ~65 kgCO2e/kWh
 * LiFePO4 (LFP): ~50 kgCO2e/kWh
 *
 * Sources: Kelly et al. 2021, Ellingsen et al. 2014, industry estimates
 *
 * ADPe is dominated by cobalt and lithium content
 * WU is dominated by lithium extraction (brine evaporation)
 */

const COLORS = [
  { bgcolor: "#023047", color: "white" },
  { bgcolor: "#219ebc", color: "white" },
];

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
      lco: "LiCoO₂ (LCO — smartphone)",
      nmc: "NMC (laptop, tablette)",
      lfp: "LiFePO₄ (LFP — serveur, UPS)",
    },
    note: "Modèle paramétrique. LCO : ~75 kgCO₂e/kWh, NMC : ~65, LFP : ~50. Sources : Kelly et al. 2021, Ellingsen et al. 2014. Cobalt et lithium estimés par chimie.",
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
      lco: "LiCoO₂ (LCO — smartphone)",
      nmc: "NMC (laptop, tablet)",
      lfp: "LiFePO₄ (LFP — server, UPS)",
    },
    note: "Parametric model. LCO: ~75 kgCO₂e/kWh, NMC: ~65, LFP: ~50. Sources: Kelly et al. 2021, Ellingsen et al. 2014. Cobalt and lithium estimated by chemistry.",
  },
} as const;

// GWP per kWh of battery capacity (cradle-to-gate)
const GWP_PER_KWH: Record<string, number> = {
  lco: 75,    // LiCoO2 — high cobalt, smartphone
  nmc: 65,    // NMC — balanced, laptop/EV
  lfp: 50,    // LFP — no cobalt, cheaper
};

// ADPe per kWh (kg Sb eq.)
const ADPE_PER_KWH: Record<string, number> = {
  lco: 0.005,   // High cobalt content drives ADPe
  nmc: 0.003,
  lfp: 0.001,
};

// WU per kWh (m³) — dominated by lithium extraction
const WU_PER_KWH: Record<string, number> = {
  lco: 3.0,
  nmc: 2.5,
  lfp: 2.0,
};

// Critical material content per kWh (g)
const COBALT_PER_KWH: Record<string, number> = {
  lco: 600,   // ~60% of cathode mass
  nmc: 200,   // ~20% of cathode
  lfp: 0,     // No cobalt
};

const LITHIUM_PER_KWH: Record<string, number> = {
  lco: 110,
  nmc: 90,
  lfp: 80,
};

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

  const [capacity, setCapacity] = useState("50");
  const [chemistry, setChemistry] = useState("nmc");
  const [lifetime, setLifetime] = useState("4");

  const capWh = Math.max(1, parseFloat(capacity) || 50);
  const capKwh = capWh / 1000;
  const lifetimeY = Math.max(1, parseFloat(lifetime) || 4);

  const gwpTotal = capKwh * (GWP_PER_KWH[chemistry] ?? 65);
  const gwpPerYear = gwpTotal / lifetimeY;
  const adpeTotal = capKwh * (ADPE_PER_KWH[chemistry] ?? 0.003);
  const wuTotal = capKwh * (WU_PER_KWH[chemistry] ?? 2.5);
  const cobaltG = capKwh * (COBALT_PER_KWH[chemistry] ?? 0);
  const lithiumG = capKwh * (LITHIUM_PER_KWH[chemistry] ?? 90);

  const chemOptions = Object.entries(t.chemistries).map(([v, l]) => ({ value: v, label: l }));

  return (
    <Stack gap={3} sx={{ my: 2 }}>
      <Stack direction="row" gap={2} sx={{ flexWrap: "wrap" }}>
        <Input type="text" label={t.fields.capacity} value={capacity} onChange={setCapacity} sx={{ flex: 0.5, minWidth: 100 }} />
        <Input type="select" label={t.fields.chemistry} options={chemOptions} value={chemistry} onChange={setChemistry} sx={{ flex: 1, minWidth: 200 }} />
        <Input type="text" label={t.fields.lifetime} value={lifetime} onChange={setLifetime} sx={{ flex: 0.5, minWidth: 80 }} />
      </Stack>

      <Box sx={{ typography: "h6" }}>{t.results.perYear}</Box>
      <Stack gap={1.5}>
        <Stack direction="row" gap={2} sx={{ typography: "body2" }}>
          <Box sx={{ flex: 1 }}>{t.results.gwp}: <strong>{format(gwpTotal * 1000, UNITS.gwp)}</strong> {t.results.embodied} → <strong>{format(gwpPerYear * 1000, UNITS.gwp)}</strong> {t.results.perYearLabel}</Box>
        </Stack>
        <Stack direction="row" gap={2} sx={{ typography: "body2" }}>
          <Box sx={{ flex: 1 }}>{t.results.adpe}: <strong>{(adpeTotal * 1e6).toFixed(1)} mg Sb eq.</strong> {t.results.embodied}</Box>
        </Stack>
        <Stack direction="row" gap={2} sx={{ typography: "body2" }}>
          <Box sx={{ flex: 1 }}>{t.results.wu}: <strong>{(wuTotal * 1000).toFixed(0)} L eq.</strong> {t.results.embodied}</Box>
        </Stack>
      </Stack>

      <Box sx={{ typography: "h6" }}>{t.results.materials}</Box>
      <Stack direction="row" gap={4} sx={{ typography: "body2" }}>
        <Box>{t.results.cobalt}: <strong>{cobaltG.toFixed(1)} g</strong></Box>
        <Box>{t.results.lithium}: <strong>{lithiumG.toFixed(1)} g</strong></Box>
      </Stack>

      <Box sx={{ typography: "caption", color: "text.secondary" }}>{t.note}</Box>
    </Stack>
  );
};
