/** @deprecated Historical flat-factor illustration. Not used by v2 pages; retained for traceability. */
import { COMPONENT_COLORS, PHASE_COLORS } from "../visual-palette";
import equipmentSnapshot from '../data/equipment-factors.json';
import { electricityFactor, ELECTRICITY_FACTORS } from "../electricity";
import { ModelNotice } from "./model-notice";
import { ImpactRow } from "./impact-row";
import { finiteNumber } from "../calculations";
import { Input } from "@site/src/components/input";
import { Bar } from "@site/src/components/bar";
import Stack from "@mui/system/Stack";
import Box from "@mui/system/Box";
import { useEffect, useState } from "react";
import { format as formatValue, UNITS } from "@site/src/format";

const COLORS = COMPONENT_COLORS;

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

// Versioned public factors; IR is retained in the source snapshot but not displayed.
const EQUIPMENT_EMBODIED: Record<string, Record<string, number>> = equipmentSnapshot.equipment;

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
const COUNTRY_FACTORS = ELECTRICITY_FACTORS;

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

  pm: ["disease occ."],
  ctue: ["CTUe"],
};

const isVm = (eq: string) => eq.startsWith("vm_");

export const EquipmentPlayGround = ({ lang: langProp, filter }: { lang?: string; filter?: string[] }) => {
  const lang = resolveLang(langProp);
  const t = TEXT[lang];
  const format = (value: number | undefined, units: string[]) => formatValue(value, units, lang);

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

  const lifetimeYears = Math.max(1, finiteNumber(lifetime, 1));
  const hoursPerDay = Math.min(24, Math.max(0, finiteNumber(usageHours, 8)));
  const pueValue = Math.max(1, finiteNumber(pue, 1));
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

  // Operational: energy * country factor * PUE
  const energyKwh = (power / 1000) * hoursPerYear * pueValue;
  const operationalGwp = energyKwh * factors.gwp;
  const operationalAdpe = energyKwh * factors.adpe;
  const operationalAp = energyKwh * factors.ap;
  const operationalWu = energyKwh * factors.wu;

  const totalGwp = embodiedGwp + operationalGwp;

  const equipmentOptions = equipmentList.map((eq) => ({
    label: t.equipments[eq] ?? eq,
    value: eq,
  }));

  const countryOptions = Object.keys(COUNTRY_FACTORS).map((c) => ({
    label: t.countries[c] ?? c,
    value: c,
  }));

  const row = (label: string, emb: number, ope: number, units: string[]) => (
    <ImpactRow lang={lang} key={label} label={label} embodied={emb} operational={ope} units={units} labels={t.results} />
  );

  return (
    <>
    <Stack gap={3} sx={{ my: 2 }} className="methodology-simulator">
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
          type="number"
          label={t.fields.lifetime}
          value={lifetime}
          onChange={setLifetime}
          sx={{ flex: 0.5, minWidth: 100 }}
        />
        <Input
          type="number"
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
            type="number"
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
          embodiedAdpe,
          operationalAdpe,
          INDICATOR_UNITS.adpe,
        )}
        {row(t.results.ap, embodiedAp, operationalAp, INDICATOR_UNITS.ap)}
        {row(t.results.wu, embodiedWu, operationalWu, INDICATOR_UNITS.wu)}
      </Stack>

    </Stack>
    <aside className="simulator-context">
      <ModelNotice lang={lang} />
      <p className="model-notice">{lang === "fr" ? "Fabrication : " : "Embodied factors: "}
        <a href={equipmentSnapshot.source}>{lang === "fr" ? "instantané public D4B versionné" : "versioned public D4B snapshot"}</a>.
        {lang === "fr" ? " Facteurs de fabrication par seconde annualisés. IR non affiché : correspondance d’unité kg/kBq non résolue. Les durées de référence restent des hypothèses à vérifier avec l’inventaire amont." : " Manufacture factors annualized from per-second values. IR is withheld: the historical kg/kBq unit mapping is unresolved. Reference lifetimes remain assumptions to verify against the upstream inventory."}
      </p>
    </aside>
    </>
  );
};
