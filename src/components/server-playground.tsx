import configurations from "../data/hardware-configurations.json";
import { processorGwp, serverMemoryGwp as ramGwp, serverStorageGwp as storageGwp, HARDWARE_MODELS, STORAGE_POWER, STRUCTURAL_GWP } from "../hardware-models";
import { HARDWARE_COLORS, PHASE_COLORS } from "../visual-palette";
import { electricityFactor, ELECTRICITY_FACTORS } from "../electricity";
import { ModelNotice } from "./model-notice";
import { finiteNumber } from "../calculations";
import { Input } from "@site/src/components/input";
import { Bar } from "@site/src/components/bar";
import Stack from "@mui/system/Stack";
import Box from "@mui/system/Box";
import { useState } from "react";
import { format as formatValue, UNITS } from "@site/src/format";

/**
 * Server parametric impact model — assembles components
 *
 * A server = N×CPU + RAM + Storage + Structural (chassis, PSU, motherboard)
 * Optionally + N×GPU for accelerated servers.
 */

type Lang = "fr" | "en";

const TEXT = {
  fr: {
    fields: {
      preset: "Predefini",
      cpuCount: "Nombre de CPU",
      cpuDie: "CPU die (mm2)",
      cpuNode: "CPU noeud (nm)",
      cpuTdp: "CPU TDP (W)",
      gpuCount: "Nombre de GPU",
      gpuDie: "GPU die (mm2)",
      gpuNode: "GPU noeud (nm)",
      gpuTdp: "GPU TDP (W)",
      ram: "RAM totale (Go)",
      ramType: "Type RAM",
      storage: "Stockage total (To)",
      storageType: "Type stockage",
      lifetime: "Duree de vie (annees)",
      country: "Pays",
      pue: "PUE",
    },
    results: {
      results: "Impact intrinseque total (fabrication)",
      perYear: "Par an",
      gwp: "GWP total",
      breakdown: "Repartition par composant (GWP)",
      cpu: "CPU",
      gpu: "GPU",
      ram: "RAM",
      storage: "Stockage",
      structural: "Structure",
      operational: "Impact operationnel annuel (24h/24)",
      energy: "Électricité annuelle d’usage",
      total: "Total annuel (intrinseque + operationnel)",
    },
    presets: {
      standard_1u: "Serveur standard 1U",
      standard_2u: "Serveur standard 2U",
      gpu_4: "Serveur GPU (4x H100)",
      gpu_8: "Scénario serveur 8× H100",
      custom: "Personnalise",
    },
    ramTypes: { ddr4: "DDR4 ECC", ddr5: "DDR5 ECC" },
    storageTypes: { ssd_nvme: "SSD NVMe", ssd_sata: "SSD SATA", hdd: "HDD" },
    countries: { FR: "France", DE: "Allemagne", US: "Etats-Unis", CN: "Chine", IE: "Irlande", SE: "Suede", NO: "Norvege" },
    note: "Les coefficients CPU, RAM et SSD proviennent des modèles historiques Boavizta. Le packaging GPU et le forfait de structure sont des hypothèses d’exemple à calibrer.",
  },
  en: {
    fields: {
      preset: "Preset",
      cpuCount: "CPU count",
      cpuDie: "CPU die (mm2)",
      cpuNode: "CPU node (nm)",
      cpuTdp: "CPU TDP (W)",
      gpuCount: "GPU count",
      gpuDie: "GPU die (mm2)",
      gpuNode: "GPU node (nm)",
      gpuTdp: "GPU TDP (W)",
      ram: "Total RAM (GB)",
      ramType: "RAM type",
      storage: "Total storage (TB)",
      storageType: "Storage type",
      lifetime: "Lifetime (years)",
      country: "Country",
      pue: "PUE",
    },
    results: {
      results: "Total embodied impact (manufacturing)",
      perYear: "Per year",
      gwp: "Total GWP",
      breakdown: "Breakdown by component (GWP)",
      cpu: "CPU",
      gpu: "GPU",
      ram: "RAM",
      storage: "Storage",
      structural: "Structure",
      operational: "Annual operational impact (24/7)",
      energy: "Annual operational electricity",
      total: "Annual total (embodied + operational)",
    },
    presets: {
      standard_1u: "Standard 1U server",
      standard_2u: "Standard 2U server",
      gpu_4: "GPU server (4x H100)",
      gpu_8: "8× H100 server scenario",
      custom: "Custom",
    },
    ramTypes: { ddr4: "DDR4 ECC", ddr5: "DDR5 ECC" },
    storageTypes: { ssd_nvme: "SSD NVMe", ssd_sata: "SSD SATA", hdd: "HDD" },
    countries: { FR: "France", DE: "Germany", US: "United States", CN: "China", IE: "Ireland", SE: "Sweden", NO: "Norway" },
    note: "CPU, RAM and SSD coefficients come from historical Boavizta models. GPU packaging and the structural allowance are example assumptions requiring calibration.",
  },
} as const;

const PRESETS: Record<string, Record<string, string>> = configurations.servers;
const gpuGwp = (die: number, node: number, count: number) => processorGwp(die, node, count, "gpu");
const cpuGwp = processorGwp;

const COUNTRY_GWP = electricityFactor("gwp");

const normalizeLang = (lang?: string): Lang =>
  lang?.toLowerCase().startsWith("fr") ? "fr" : "en";
const resolveLang = (lang?: string): Lang => {
  if (lang) return normalizeLang(lang);
  if (typeof navigator !== "undefined") return normalizeLang(navigator.language);
  return "en";
};

export const ServerPlayGround = ({ lang: langProp }: { lang?: string }) => {
  const lang = resolveLang(langProp);
  const t = TEXT[lang];
  const format = (value: number | undefined, units: string[]) => formatValue(value, units, lang);

  const [preset, setPreset] = useState("standard_2u");
  const [cpuCount, setCpuCount] = useState("2");
  const [cpuDie, setCpuDie] = useState("400");
  const [cpuNode, setCpuNode] = useState("10");
  const [cpuTdp, setCpuTdp] = useState("200");
  const [gpuCount, setGpuCount] = useState("0");
  const [gpuDie, setGpuDie] = useState("0");
  const [gpuNode, setGpuNode] = useState("5");
  const [gpuTdp, setGpuTdp] = useState("0");
  const [ram, setRam] = useState("512");
  const [ramType, setRamType] = useState("ddr5");
  const [storage, setStorage] = useState("8");
  const [storageType, setStorageType] = useState("ssd_nvme");
  const [lifetime, setLifetime] = useState("5");
  const [country, setCountry] = useState("FR");
  const [pue, setPue] = useState("1.58");

  const applyPreset = (p: string) => {
    setPreset(p);
    const v = PRESETS[p];
    if (!v) return;
    setCpuCount(v.cpuCount); setCpuDie(v.cpuDie); setCpuNode(v.cpuNode); setCpuTdp(v.cpuTdp);
    setGpuCount(v.gpuCount); setGpuDie(v.gpuDie); setGpuNode(v.gpuNode); setGpuTdp(v.gpuTdp);
    setRam(v.ram); setRamType(v.ramType);
    setStorage(v.storage); setStorageType(v.storageType);
    setLifetime(v.lifetime); setPue(v.pue);
  };

  const nCpu = Math.max(0, Math.floor(finiteNumber(cpuCount, 0)));
  const nGpu = Math.max(0, Math.floor(finiteNumber(gpuCount, 0)));
  const cDie = finiteNumber(cpuDie, 400);
  const cNode = Math.floor(finiteNumber(cpuNode, 10));
  const cTdp = finiteNumber(cpuTdp, 200);
  const gDie = finiteNumber(gpuDie, 0);
  const gNode = Math.floor(finiteNumber(gpuNode, 5));
  const gTdp = finiteNumber(gpuTdp, 0);
  const ramGB = finiteNumber(ram, 512);
  const storTB = finiteNumber(storage, 8);
  const years = Math.max(1, finiteNumber(lifetime, 5));
  const pueVal = Math.max(1, finiteNumber(pue, 1.58));

  const gwpCpuV = nCpu > 0 ? cpuGwp(cDie, cNode, nCpu) : 0;
  const gwpGpuV = nGpu > 0 ? gpuGwp(gDie, gNode, nGpu) : 0;
  const gwpRamV = ramGwp(ramGB, ramType);
  const gwpStorV = storageGwp(storTB, storageType);
  const gwpStructV = STRUCTURAL_GWP.server;
  const gwpEmbTotal = gwpCpuV + gwpGpuV + gwpRamV + gwpStorV + gwpStructV;
  const gwpEmbPerYear = gwpEmbTotal / years;

  // Operational: 24/7
  const totalPowerW = nCpu * cTdp + nGpu * gTdp + ramGB * HARDWARE_MODELS.memory.powerPerGb + storTB * (STORAGE_POWER[storageType] ?? 1.2) + HARDWARE_MODELS.powerAssumptions.serverAuxiliaryW; // +50W misc
  const energyKwh = (totalPowerW / 1000) * 8766 * pueVal;
  const gwpOpePerYear = energyKwh * (COUNTRY_GWP[country] ?? 0.4);
  const gwpTotalPerYear = gwpEmbPerYear + gwpOpePerYear;

  const COLORS = [HARDWARE_COLORS.cpu, ...(nGpu > 0 ? [HARDWARE_COLORS.gpu] : []), HARDWARE_COLORS.ram, HARDWARE_COLORS.storage, HARDWARE_COLORS.enclosure];
  const components = [
    { label: t.results.cpu, value: gwpCpuV },
    ...(nGpu > 0 ? [{ label: t.results.gpu, value: gwpGpuV }] : []),
    { label: t.results.ram, value: gwpRamV },
    { label: t.results.storage, value: gwpStorV },
    { label: t.results.structural, value: gwpStructV },
  ];

  const set = (fn: (v: string) => void) => (v: string) => { fn(v); setPreset("custom"); };

  const presetOptions = Object.entries(t.presets).map(([v, l]) => ({ value: v, label: l }));
  const nodeOptions = [3, 4, 5, 7, 10, 14, 22, 28].map(n => ({ value: String(n), label: `${n} nm` }));
  const ramTypeOptions = Object.entries(t.ramTypes).map(([v, l]) => ({ value: v, label: l }));
  const storTypeOptions = Object.entries(t.storageTypes).map(([v, l]) => ({ value: v, label: l }));
  const countryOptions = Object.entries(t.countries).map(([v, l]) => ({ value: v, label: l }));

  return (
    <>
    <Stack gap={3} sx={{ my: 2 }} className="methodology-simulator">
      <Input type="select" label={t.fields.preset} options={presetOptions} value={preset} onChange={applyPreset} sx={{ maxWidth: 300 }} />
      <details className="component-assumptions"><summary>{lang === "fr" ? "Personnaliser les composants" : "Customize components"}</summary>
      <Stack direction="row" gap={2} sx={{ flexWrap: "wrap" }}>
        <Input type="number" label={t.fields.cpuCount} value={cpuCount} onChange={set(setCpuCount)} sx={{ flex: 0.3, minWidth: 60 }} />
        <Input type="number" label={t.fields.cpuDie} value={cpuDie} onChange={set(setCpuDie)} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="select" label={t.fields.cpuNode} options={nodeOptions} value={cpuNode} onChange={set(setCpuNode)} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="number" label={t.fields.cpuTdp} value={cpuTdp} onChange={set(setCpuTdp)} sx={{ flex: 0.5, minWidth: 80 }} />
      </Stack>
      {nGpu > 0 || preset === "custom" ? (
        <Stack direction="row" gap={2} sx={{ flexWrap: "wrap" }}>
          <Input type="number" label={t.fields.gpuCount} value={gpuCount} onChange={set(setGpuCount)} sx={{ flex: 0.3, minWidth: 60 }} />
          <Input type="number" label={t.fields.gpuDie} value={gpuDie} onChange={set(setGpuDie)} sx={{ flex: 0.5, minWidth: 80 }} />
          <Input type="select" label={t.fields.gpuNode} options={nodeOptions} value={gpuNode} onChange={set(setGpuNode)} sx={{ flex: 0.5, minWidth: 80 }} />
          <Input type="number" label={t.fields.gpuTdp} value={gpuTdp} onChange={set(setGpuTdp)} sx={{ flex: 0.5, minWidth: 80 }} />
        </Stack>
      ) : null}
      <Stack direction="row" gap={2} sx={{ flexWrap: "wrap" }}>
        <Input type="number" label={t.fields.ram} value={ram} onChange={set(setRam)} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="select" label={t.fields.ramType} options={ramTypeOptions} value={ramType} onChange={set(setRamType)} sx={{ flex: 0.5, minWidth: 100 }} />
        <Input type="number" label={t.fields.storage} value={storage} onChange={set(setStorage)} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="select" label={t.fields.storageType} options={storTypeOptions} value={storageType} onChange={set(setStorageType)} sx={{ flex: 0.5, minWidth: 100 }} />
      </Stack>
      </details>
      <Stack direction="row" gap={2} sx={{ flexWrap: "wrap" }}>
        <Input type="number" label={t.fields.lifetime} value={lifetime} onChange={setLifetime} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="select" label={t.fields.country} options={countryOptions} value={country} onChange={setCountry} sx={{ flex: 1, minWidth: 120 }} />
        <Input type="number" label={t.fields.pue} value={pue} onChange={setPue} sx={{ flex: 0.3, minWidth: 60 }} />
      </Stack>

      <Box sx={{ typography: "h6" }}>{t.results.results}</Box>
      <Stack direction="row" gap={4} sx={{ typography: "body2", flexWrap: "wrap" }}>
        <Box>{t.results.gwp}: <strong>{format(gwpEmbTotal * 1000, UNITS.gwp)}</strong></Box>
        <Box>{t.results.perYear}: <strong>{format(gwpEmbPerYear * 1000, UNITS.gwp)}</strong></Box>
      </Stack>

      <Box sx={{ typography: "body2", fontWeight: "bold" }}>{t.results.breakdown}</Box>
      <Bar lang={lang} values={components.map(c => ({ ...c, value: c.value * 1000 }))} colors={COLORS} units={UNITS.gwp} />
      <Stack direction="row" gap={2} sx={{ flexWrap: "wrap", typography: "caption" }}>
        {components.map((c, i) => (
          <Box key={c.label} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: 1, bgcolor: COLORS[i].bgcolor }} />
            {c.label}: {format(c.value * 1000, UNITS.gwp)}
          </Box>
        ))}
      </Stack>

      <Box sx={{ typography: "h6" }}>{t.results.operational}</Box>
      <Stack direction="row" gap={4} sx={{ typography: "body2", flexWrap: "wrap" }}>
        <Box>{t.results.energy}: <strong>{format(energyKwh * 1000, UNITS.wh)}</strong></Box>
        <Box>GWP: <strong>{format(gwpOpePerYear * 1000, UNITS.gwp)}</strong></Box>
        <Box>{lang === "fr" ? "Puissance" : "Power"}: <strong>{totalPowerW.toFixed(0)} W</strong> (x PUE = {(totalPowerW * pueVal).toFixed(0)} W)</Box>
      </Stack>

      <Box sx={{ typography: "h6" }}>{t.results.total}</Box>
      <Stack gap={0.5}>
        <Bar lang={lang}
          values={[
            { label: lang === "fr" ? "Fabrication allouée" : "Embodied", value: gwpEmbPerYear * 1000 },
            { label: lang === "fr" ? "Usage" : "Operational", value: gwpOpePerYear * 1000 },
          ]}
          colors={PHASE_COLORS}
          units={UNITS.gwp}
        />
        <Box sx={{ typography: "body1", fontWeight: "bold" }}>
          {format(gwpTotalPerYear * 1000, UNITS.gwp)} / {lang === "fr" ? "an" : "year"}
        </Box>
      </Stack>

    </Stack>
    <aside className="simulator-context">
      {nGpu > 0 && <p>{lang === "fr"
        ? "Sous-total : les accélérateurs couvrent ici la puce et un proxy de packaging. Leur mémoire HBM, carte et refroidissement ne sont pas évalués ; la RAM affichée est celle de l’hôte."
        : "Subtotal: accelerators cover a die and packaging proxy here. Their HBM, board and cooling are unassessed; displayed RAM belongs to the host."}</p>}
      <p>{t.note}</p>
      <ModelNotice lang={lang} />

    </aside>
    </>
  );
};
