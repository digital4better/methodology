import { Input } from "@site/src/components/input";
import { Bar } from "@site/src/components/bar";
import Stack from "@mui/system/Stack";
import Box from "@mui/system/Box";
import { useEffect, useState } from "react";
import { format, UNITS } from "@site/src/format";

const COLORS = [
  { bgcolor: "#023047", color: "white" },
  { bgcolor: "#219ebc", color: "white" },
  { bgcolor: "#8ecae6", color: "inherit" },
  { bgcolor: "#ffb703", color: "inherit" },
  { bgcolor: "#fb8500", color: "inherit" },
];

type Lang = "fr" | "en";

const TEXT = {
  fr: {
    fields: {
      equipment: "Type d'équipement",
      lifetime: "Durée de vie (années)",
      usageHours: "Usage quotidien (heures)",
      country: "Pays (mix électrique)",
      pue: "PUE",
    },
    results: {
      results: "Résultats (par an)",
      embodied: "Intrinsèque",
      operational: "Opérationnel",
      total: "Total",
      energy: "Énergie",
      gwp: "Climat (GWP)",
      adpe: "Ressources (ADPe)",
      ap: "Acidification (AP)",
      wu: "Eau (WU)",
      ir: "Ionisant (IR)",
      pm: "Particules (PM)",
      ctue: "Ecotoxicité (CTUe)",
      breakdown: "Répartition intrinsèque / opérationnel",
    },
    equipments: {
      smartphone: "Smartphone",
      tablet: "Tablette",
      laptop: "Laptop",
      desktop_personal: "Desktop (personnel)",
      desktop_professional: "Desktop (professionnel)",
      screen: "Écran",
      computer: "Ordinateur (laptop + desktop + écran)",
      vm_small: "VM petite (1 vCPU, 4 Go)",
      vm_medium: "VM moyenne (8 vCPU, 32 Go)",
      vm_large: "VM grande (48 vCPU, 192 Go)",
    },
    countries: {
      FR: "France",
      DE: "Allemagne",
      US: "États-Unis",
      GB: "Royaume-Uni",
      CN: "Chine",
      IN: "Inde",
      PL: "Pologne",
      SE: "Suède",
      NO: "Norvège",
      JP: "Japon",
      BR: "Brésil",
      AU: "Australie",
    },
  },
  en: {
    fields: {
      equipment: "Equipment type",
      lifetime: "Lifetime (years)",
      usageHours: "Daily usage (hours)",
      country: "Country (electricity mix)",
      pue: "PUE",
    },
    results: {
      results: "Results (per year)",
      embodied: "Embodied",
      operational: "Operational",
      total: "Total",
      energy: "Energy",
      gwp: "Climate (GWP)",
      adpe: "Resources (ADPe)",
      ap: "Acidification (AP)",
      wu: "Water (WU)",
      ir: "Ionizing (IR)",
      pm: "Particulate (PM)",
      ctue: "Ecotoxicity (CTUe)",
      breakdown: "Embodied / Operational breakdown",
    },
    equipments: {
      smartphone: "Smartphone",
      tablet: "Tablet",
      laptop: "Laptop",
      desktop_personal: "Desktop (personal)",
      desktop_professional: "Desktop (professional)",
      screen: "Screen",
      computer: "Computer (laptop + desktop + screen)",
      vm_small: "VM small (1 vCPU, 4 GB)",
      vm_medium: "VM medium (8 vCPU, 32 GB)",
      vm_large: "VM large (48 vCPU, 192 GB)",
    },
    countries: {
      FR: "France",
      DE: "Germany",
      US: "United States",
      GB: "United Kingdom",
      CN: "China",
      IN: "India",
      PL: "Poland",
      SE: "Sweden",
      NO: "Norway",
      JP: "Japan",
      BR: "Brazil",
      AU: "Australia",
    },
  },
} as const;

// Embodied impacts per second (from d4b/data equipment/embodied.csv)
const EQUIPMENT_EMBODIED: Record<
  string,
  {
    gwp: number;
    ap: number;
    ctue: number;
    "ctuh-c": number;
    ir: number;
    "ctuh-nc": number;
    pm: number;
    wu: number;
    adpe: number;
  }
> = {
  smartphone: {
    gwp: 1.01e-6,
    ap: 4.74e-9,
    ctue: 1.14e-5,
    "ctuh-c": 1.27e-16,
    ir: 1.8e-7,
    "ctuh-nc": 4.33e-15,
    pm: 4.54e-14,
    wu: 1.69e-6,
    adpe: 3.59e-11,
  },
  tablet: {
    gwp: 8.9e-7,
    ap: 5.69e-9,
    ctue: 1.7e-5,
    "ctuh-c": 1.67e-16,
    ir: 3.38e-7,
    "ctuh-nc": 6.42e-15,
    pm: 4.23e-14,
    wu: 1.81e-6,
    adpe: 4.73e-11,
  },
  laptop: {
    gwp: 1.18e-6,
    ap: 7.2e-9,
    ctue: 2.55e-5,
    "ctuh-c": 2.93e-16,
    ir: 4.75e-7,
    "ctuh-nc": 1.35e-14,
    pm: 4.08e-14,
    wu: 5.28e-6,
    adpe: 6.03e-11,
  },
  desktop_personal: {
    gwp: 1.42e-6,
    ap: 9.65e-9,
    ctue: 3.63e-5,
    "ctuh-c": 5.34e-16,
    ir: 5.54e-6,
    "ctuh-nc": 2.54e-14,
    pm: 5.5e-14,
    wu: 1.14e-5,
    adpe: 1.16e-10,
  },
  desktop_professional: {
    gwp: 1.12e-6,
    ap: 7.64e-9,
    ctue: 3.15e-5,
    "ctuh-c": 4.3e-16,
    ir: 2.92e-6,
    "ctuh-nc": 2.21e-14,
    pm: 4.47e-14,
    wu: 1.13e-5,
    adpe: 1.04e-10,
  },
  screen: {
    gwp: 3.67e-7,
    ap: 2.44e-9,
    ctue: 1.1e-5,
    "ctuh-c": 2.68e-16,
    ir: 7.62e-7,
    "ctuh-nc": 8.54e-15,
    pm: 1.22e-14,
    wu: 3.89e-6,
    adpe: 6.17e-11,
  },
  computer: {
    gwp: 1.36e-6,
    ap: 8.81e-9,
    ctue: 3.15e-5,
    "ctuh-c": 4.39e-16,
    ir: 2.28e-6,
    "ctuh-nc": 2.12e-14,
    pm: 5.07e-14,
    wu: 9.26e-6,
    adpe: 1.05e-10,
  },
  vm_small: {
    gwp: 1.19e-7,
    ap: 6.81e-10,
    ctue: 2.23e-6,
    "ctuh-c": 2.62e-17,
    ir: 1.8e-7,
    "ctuh-nc": 1.34e-15,
    pm: 4.4e-15,
    wu: 5.01e-7,
    adpe: 2.86e-12,
  },
  vm_medium: {
    gwp: 9.52e-7,
    ap: 5.44e-9,
    ctue: 1.79e-5,
    "ctuh-c": 2.1e-16,
    ir: 1.41e-6,
    "ctuh-nc": 1.07e-14,
    pm: 3.52e-14,
    wu: 3.9e-6,
    adpe: 2.23e-11,
  },
  vm_large: {
    gwp: 5.71e-6,
    ap: 3.17e-8,
    ctue: 9.17e-5,
    "ctuh-c": 1.16e-15,
    ir: 8.47e-6,
    "ctuh-nc": 5.7e-14,
    pm: 2.1e-13,
    wu: 2.35e-5,
    adpe: 1.34e-10,
  },
};

// Power consumption in watts (from d4b/data equipment/energy.csv)
const EQUIPMENT_POWER: Record<string, number> = {
  smartphone: 1,
  tablet: 7.5,
  laptop: 75,
  desktop_personal: 175,
  desktop_professional: 175,
  screen: 55,
  computer: 137,
  vm_small: 4,
  vm_medium: 31.4,
  vm_large: 185.7,
};

// Default lifetimes in years
const EQUIPMENT_LIFETIME: Record<string, number> = {
  smartphone: 3,
  tablet: 4,
  laptop: 5,
  desktop_personal: 6,
  desktop_professional: 5,
  screen: 7,
  computer: 5,
  vm_small: 5,
  vm_medium: 5,
  vm_large: 5,
};

// Yearly electricity impact factors per country (from d4b/data factor/country-yearly.csv, latest year)
const COUNTRY_FACTORS: Record<
  string,
  { gwp: number; ap: number; ctue: number; ir: number; pm: number; wu: number; adpe: number }
> = {
  FR: { gwp: 0.0355, ap: 1.17e-4, ctue: 0.0417, ir: 0.0107, pm: 2.01e-6, wu: 0.0947, adpe: 4.82e-7 },
  DE: { gwp: 0.377, ap: 9.72e-4, ctue: 0.180, ir: 0.00545, pm: 3.1e-5, wu: 0.0511, adpe: 9.23e-7 },
  US: { gwp: 0.353, ap: 5.81e-4, ctue: 0.148, ir: 0.00845, pm: 1.28e-5, wu: 0.0673, adpe: 8.0e-7 },
  GB: { gwp: 0.166, ap: 2.95e-4, ctue: 0.0727, ir: 0.00711, pm: 6.52e-6, wu: 0.0593, adpe: 6.08e-7 },
  CN: { gwp: 0.537, ap: 1.08e-3, ctue: 0.216, ir: 0.00380, pm: 3.04e-5, wu: 0.0380, adpe: 7.76e-7 },
  IN: { gwp: 0.633, ap: 1.83e-3, ctue: 0.372, ir: 0.00278, pm: 5.55e-5, wu: 0.0327, adpe: 8.06e-7 },
  PL: { gwp: 0.704, ap: 1.44e-3, ctue: 0.323, ir: 0.00751, pm: 2.28e-5, wu: 0.0843, adpe: 7.77e-7 },
  SE: { gwp: 0.0129, ap: 4.85e-5, ctue: 0.0175, ir: 0.00808, pm: 6.14e-7, wu: 0.0578, adpe: 4.12e-7 },
  NO: { gwp: 0.00875, ap: 2.06e-5, ctue: 0.00742, ir: 0.00171, pm: 2.55e-7, wu: 0.0119, adpe: 2.59e-7 },
  JP: { gwp: 0.438, ap: 5.76e-4, ctue: 0.121, ir: 0.00406, pm: 1.15e-5, wu: 0.0532, adpe: 7.29e-7 },
  BR: { gwp: 0.0611, ap: 1.43e-4, ctue: 0.0478, ir: 0.00132, pm: 3.38e-6, wu: 0.0117, adpe: 3.60e-7 },
  AU: { gwp: 0.488, ap: 1.07e-3, ctue: 0.279, ir: 0.00338, pm: 2.21e-5, wu: 0.0414, adpe: 7.79e-7 },
};

const normalizeLang = (lang?: string): Lang =>
  lang?.toLowerCase().startsWith("fr") ? "fr" : "en";

const resolveLang = (lang?: string): Lang => {
  if (lang) return normalizeLang(lang);
  if (typeof navigator !== "undefined") return normalizeLang(navigator.language);
  return "en";
};

const INDICATOR_UNITS: Record<string, string[]> = {
  gwp: UNITS.gwp,
  energy: UNITS.wh,
  adpe: ["µg Sb eq.", "mg Sb eq.", "g Sb eq.", "kg Sb eq."],
  ap: ["µmol H+", "mmol H+", "mol H+"],
  wu: ["mL eq.", "L eq.", "m³ eq."],
  ir: ["g U235", "kg U235", "t U235"],
  pm: ["disease occ."],
  ctue: ["CTUe"],
};

const isVm = (eq: string) => eq.startsWith("vm_");

export const EquipmentPlayGround = ({ lang: langProp, filter }: { lang?: string; filter?: string[] }) => {
  const lang = resolveLang(langProp);
  const t = TEXT[lang];

  const equipmentList = filter
    ? Object.keys(EQUIPMENT_EMBODIED).filter((k) => filter.includes(k))
    : Object.keys(EQUIPMENT_EMBODIED);

  const [equipment, setEquipment] = useState(equipmentList[0]);
  const [lifetime, setLifetime] = useState(String(EQUIPMENT_LIFETIME[equipmentList[0]]));
  const [usageHours, setUsageHours] = useState(isVm(equipmentList[0]) ? "24" : "8");
  const [country, setCountry] = useState("FR");
  const [pue, setPue] = useState("1.0");

  useEffect(() => {
    setLifetime(String(EQUIPMENT_LIFETIME[equipment] ?? 5));
    setUsageHours(isVm(equipment) ? "24" : "8");
    setPue(isVm(equipment) ? "1.58" : "1.0");
  }, [equipment]);

  const lifetimeYears = Math.max(1, parseFloat(lifetime) || 1);
  const hoursPerDay = Math.min(24, Math.max(0, parseFloat(usageHours) || 8));
  const pueValue = Math.max(1, parseFloat(pue) || 1);
  const secondsPerYear = 365.25 * 24 * 3600;
  const hoursPerYear = hoursPerDay * 365.25;

  const emb = EQUIPMENT_EMBODIED[equipment];
  const power = EQUIPMENT_POWER[equipment];
  const factors = COUNTRY_FACTORS[country];

  // Embodied: impact per year = factor_per_second * seconds_per_year
  // But we also apply lifetime correction if user changes it
  const defaultLifetime = EQUIPMENT_LIFETIME[equipment] ?? 5;
  const lifetimeCorrection = defaultLifetime / lifetimeYears;

  const embodiedGwp = emb.gwp * secondsPerYear * lifetimeCorrection;
  const embodiedAdpe = emb.adpe * secondsPerYear * lifetimeCorrection;
  const embodiedAp = emb.ap * secondsPerYear * lifetimeCorrection;
  const embodiedWu = emb.wu * secondsPerYear * lifetimeCorrection;
  const embodiedIr = emb.ir * secondsPerYear * lifetimeCorrection;

  // Operational: energy * country factor * PUE
  const energyKwh = (power / 1000) * hoursPerYear * pueValue;
  const operationalGwp = energyKwh * factors.gwp;
  const operationalAdpe = energyKwh * factors.adpe;
  const operationalAp = energyKwh * factors.ap;
  const operationalWu = energyKwh * factors.wu;
  const operationalIr = energyKwh * factors.ir;

  const totalGwp = embodiedGwp + operationalGwp;

  const equipmentOptions = equipmentList.map((eq) => ({
    label: t.equipments[eq] ?? eq,
    value: eq,
  }));

  const countryOptions = Object.keys(COUNTRY_FACTORS).map((c) => ({
    label: t.countries[c] ?? c,
    value: c,
  }));

  const row = (label: string, emb: number, ope: number, units: string[]) => {
    const total = emb + ope;
    return (
      <Stack key={label} gap={0.5}>
        <Box sx={{ typography: "body2", fontWeight: "bold" }}>{label}</Box>
        <Stack direction="row" gap={2} sx={{ typography: "body2" }}>
          <Box sx={{ flex: 1 }}>
            {t.results.embodied}: {format(emb * 1000, units)}
          </Box>
          <Box sx={{ flex: 1 }}>
            {t.results.operational}: {format(ope * 1000, units)}
          </Box>
          <Box sx={{ flex: 1, fontWeight: "bold" }}>
            {t.results.total}: {format(total * 1000, units)}
          </Box>
        </Stack>
        <Bar
          values={[
            { label: t.results.embodied, value: Math.max(0, emb) },
            { label: t.results.operational, value: Math.max(0, ope) },
          ]}
          colors={COLORS}
          units={units}
        />
      </Stack>
    );
  };

  return (
    <Stack gap={3} sx={{ my: 2 }}>
      <Stack direction="row" gap={2} sx={{ flexWrap: "wrap" }}>
        <Input
          type="select"
          label={t.fields.equipment}
          options={equipmentOptions}
          value={equipment}
          onChange={setEquipment}
          sx={{ flex: 1, minWidth: 200 }}
        />
        <Input
          type="text"
          label={t.fields.lifetime}
          value={lifetime}
          onChange={setLifetime}
          sx={{ flex: 0.5, minWidth: 100 }}
        />
        <Input
          type="text"
          label={t.fields.usageHours}
          value={usageHours}
          onChange={setUsageHours}
          sx={{ flex: 0.5, minWidth: 100 }}
        />
        <Input
          type="select"
          label={t.fields.country}
          options={countryOptions}
          value={country}
          onChange={setCountry}
          sx={{ flex: 1, minWidth: 150 }}
        />
        {isVm(equipment) && (
          <Input
            type="text"
            label={t.fields.pue}
            value={pue}
            onChange={setPue}
            sx={{ flex: 0.5, minWidth: 80 }}
          />
        )}
      </Stack>

      <Box sx={{ typography: "h6" }}>{t.results.results}</Box>

      <Stack gap={2}>
        {row(t.results.gwp, embodiedGwp, operationalGwp, UNITS.gwp)}
        {row(
          t.results.energy,
          0,
          energyKwh,
          UNITS.wh,
        )}
        {row(
          t.results.adpe,
          embodiedAdpe * 1e6,
          operationalAdpe * 1e6,
          INDICATOR_UNITS.adpe,
        )}
        {row(t.results.ap, embodiedAp, operationalAp, INDICATOR_UNITS.ap)}
        {row(t.results.wu, embodiedWu, operationalWu, INDICATOR_UNITS.wu)}
      </Stack>

      <Box sx={{ typography: "caption", color: "text.secondary" }}>
        {lang === "fr"
          ? "Données : digital4better/data. Facteurs intrinsèques par seconde annualisés. Mix électrique annuel le plus récent."
          : "Data: digital4better/data. Embodied factors annualized from per-second values. Latest annual electricity mix."}
      </Box>
    </Stack>
  );
};
