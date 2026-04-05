import { Input } from "@site/src/components/input";
import { Bar } from "@site/src/components/bar";
import Stack from "@mui/system/Stack";
import Box from "@mui/system/Box";
import { useState } from "react";
import { format, UNITS } from "@site/src/format";

/**
 * Server parametric impact model — assembles components
 *
 * A server = N×CPU + RAM + Storage + Structural (chassis, PSU, motherboard)
 * Optionally + N×GPU for accelerated servers.
 */

const COLORS = [
  { bgcolor: "#264653", color: "white" },
  { bgcolor: "#2a9d8f", color: "white" },
  { bgcolor: "#e9c46a", color: "inherit" },
  { bgcolor: "#f4a261", color: "inherit" },
  { bgcolor: "#e76f51", color: "white" },
];

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
      energy: "Energie annuelle",
      total: "Total annuel (intrinseque + operationnel)",
    },
    presets: {
      standard_1u: "Serveur standard 1U",
      standard_2u: "Serveur standard 2U",
      gpu_4: "Serveur GPU (4x H100)",
      gpu_8: "Serveur GPU (8x H100 DGX)",
      custom: "Personnalise",
    },
    ramTypes: { ddr4: "DDR4 ECC", ddr5: "DDR5 ECC" },
    storageTypes: { ssd_nvme: "SSD NVMe", ssd_sata: "SSD SATA", hdd: "HDD" },
    countries: { FR: "France", DE: "Allemagne", US: "Etats-Unis", CN: "Chine", IE: "Irlande", SE: "Suede", NO: "Norvege" },
    note: "Assemblage Boavizta (CPU: die*0.0197+9.14, RAM: cap/density*2.20+5.22, SSD: cap/density*2.20+6.34). GPU: meme modele avec facteur packaging 1.5. Structure: forfait 50 kgCO2e (chassis, PSU, carte mere).",
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
      energy: "Annual energy",
      total: "Annual total (embodied + operational)",
    },
    presets: {
      standard_1u: "Standard 1U server",
      standard_2u: "Standard 2U server",
      gpu_4: "GPU server (4x H100)",
      gpu_8: "GPU server (8x H100 DGX)",
      custom: "Custom",
    },
    ramTypes: { ddr4: "DDR4 ECC", ddr5: "DDR5 ECC" },
    storageTypes: { ssd_nvme: "SSD NVMe", ssd_sata: "SSD SATA", hdd: "HDD" },
    countries: { FR: "France", DE: "Germany", US: "United States", CN: "China", IE: "Ireland", SE: "Sweden", NO: "Norway" },
    note: "Assembly Boavizta (CPU: die*0.0197+9.14, RAM: cap/density*2.20+5.22, SSD: cap/density*2.20+6.34). GPU: same model with packaging factor 1.5. Structure: flat 50 kgCO2e (chassis, PSU, motherboard).",
  },
} as const;

const NODE_FACTORS: Record<number, number> = { 3: 2.8, 4: 2.5, 5: 2.2, 7: 1.8, 10: 1.4, 14: 1.2, 22: 1.05, 28: 1.0 };

const cpuGwp = (dieMm2: number, nodeNm: number, count: number) => {
  const nf = NODE_FACTORS[nodeNm] ?? 1.0;
  return (dieMm2 * 0.0197 + 9.14) * nf * count;
};

const gpuGwp = (dieMm2: number, nodeNm: number, count: number) => {
  const nf = NODE_FACTORS[nodeNm] ?? 1.0;
  return (dieMm2 * 0.0197 + 9.14) * nf * 1.5 * count; // 1.5x packaging factor
};

const RAM_DENSITY: Record<string, number> = { ddr4: 0.625, ddr5: 1.0 };
const ramGwp = (capGB: number, type: string) => {
  const d = RAM_DENSITY[type] ?? 0.625;
  const modules = Math.ceil(capGB / 32);
  return ((capGB / modules) / d) * 2.20 * modules + 5.22 * modules;
};

const storageGwp = (capTB: number, type: string) => {
  if (type === "hdd") return 31.11 * Math.ceil(capTB / 4);
  const capGB = capTB * 1000;
  const drives = Math.ceil(capTB / 2);
  return ((capGB / drives) / 48.5) * 2.20 * drives + 6.34 * drives;
};

const STRUCTURAL_GWP = 50; // chassis + PSU + motherboard + cabling

const PRESETS: Record<string, Record<string, string>> = {
  standard_1u: { cpuCount: "1", cpuDie: "400", cpuNode: "10", cpuTdp: "200", gpuCount: "0", gpuDie: "0", gpuNode: "5", gpuTdp: "0", ram: "128", ramType: "ddr4", storage: "2", storageType: "ssd_nvme", lifetime: "5", pue: "1.58" },
  standard_2u: { cpuCount: "2", cpuDie: "400", cpuNode: "10", cpuTdp: "200", gpuCount: "0", gpuDie: "0", gpuNode: "5", gpuTdp: "0", ram: "512", ramType: "ddr5", storage: "8", storageType: "ssd_nvme", lifetime: "5", pue: "1.58" },
  gpu_4: { cpuCount: "2", cpuDie: "400", cpuNode: "10", cpuTdp: "200", gpuCount: "4", gpuDie: "814", gpuNode: "5", gpuTdp: "700", ram: "1024", ramType: "ddr5", storage: "16", storageType: "ssd_nvme", lifetime: "5", pue: "1.3" },
  gpu_8: { cpuCount: "2", cpuDie: "400", cpuNode: "10", cpuTdp: "350", gpuCount: "8", gpuDie: "814", gpuNode: "5", gpuTdp: "700", ram: "2048", ramType: "ddr5", storage: "30", storageType: "ssd_nvme", lifetime: "5", pue: "1.2" },
};

const COUNTRY_GWP: Record<string, number> = {
  FR: 0.0355, DE: 0.377, US: 0.353, CN: 0.537, IE: 0.25, SE: 0.013, NO: 0.009,
};

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

  const nCpu = Math.max(0, parseInt(cpuCount) || 0);
  const nGpu = Math.max(0, parseInt(gpuCount) || 0);
  const cDie = parseFloat(cpuDie) || 400;
  const cNode = parseInt(cpuNode) || 10;
  const cTdp = parseFloat(cpuTdp) || 200;
  const gDie = parseFloat(gpuDie) || 0;
  const gNode = parseInt(gpuNode) || 5;
  const gTdp = parseFloat(gpuTdp) || 0;
  const ramGB = parseFloat(ram) || 512;
  const storTB = parseFloat(storage) || 8;
  const years = Math.max(1, parseFloat(lifetime) || 5);
  const pueVal = Math.max(1, parseFloat(pue) || 1.58);

  const gwpCpuV = nCpu > 0 ? cpuGwp(cDie, cNode, nCpu) : 0;
  const gwpGpuV = nGpu > 0 ? gpuGwp(gDie, gNode, nGpu) : 0;
  const gwpRamV = ramGwp(ramGB, ramType);
  const gwpStorV = storageGwp(storTB, storageType);
  const gwpStructV = STRUCTURAL_GWP;
  const gwpEmbTotal = gwpCpuV + gwpGpuV + gwpRamV + gwpStorV + gwpStructV;
  const gwpEmbPerYear = gwpEmbTotal / years;

  // Operational: 24/7
  const totalPowerW = nCpu * cTdp + nGpu * gTdp + ramGB * 0.392 + storTB * 1000 * 0.0012 + 50; // +50W misc
  const energyKwh = (totalPowerW / 1000) * 8766 * pueVal;
  const gwpOpePerYear = energyKwh * (COUNTRY_GWP[country] ?? 0.4);
  const gwpTotalPerYear = gwpEmbPerYear + gwpOpePerYear;

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
    <Stack gap={3} sx={{ my: 2 }}>
      <Input type="select" label={t.fields.preset} options={presetOptions} value={preset} onChange={applyPreset} sx={{ maxWidth: 300 }} />

      <Stack direction="row" gap={2} sx={{ flexWrap: "wrap" }}>
        <Input type="text" label={t.fields.cpuCount} value={cpuCount} onChange={set(setCpuCount)} sx={{ flex: 0.3, minWidth: 60 }} />
        <Input type="text" label={t.fields.cpuDie} value={cpuDie} onChange={set(setCpuDie)} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="select" label={t.fields.cpuNode} options={nodeOptions} value={cpuNode} onChange={set(setCpuNode)} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="text" label={t.fields.cpuTdp} value={cpuTdp} onChange={set(setCpuTdp)} sx={{ flex: 0.5, minWidth: 80 }} />
      </Stack>
      {nGpu > 0 || preset === "custom" ? (
        <Stack direction="row" gap={2} sx={{ flexWrap: "wrap" }}>
          <Input type="text" label={t.fields.gpuCount} value={gpuCount} onChange={set(setGpuCount)} sx={{ flex: 0.3, minWidth: 60 }} />
          <Input type="text" label={t.fields.gpuDie} value={gpuDie} onChange={set(setGpuDie)} sx={{ flex: 0.5, minWidth: 80 }} />
          <Input type="select" label={t.fields.gpuNode} options={nodeOptions} value={gpuNode} onChange={set(setGpuNode)} sx={{ flex: 0.5, minWidth: 80 }} />
          <Input type="text" label={t.fields.gpuTdp} value={gpuTdp} onChange={set(setGpuTdp)} sx={{ flex: 0.5, minWidth: 80 }} />
        </Stack>
      ) : null}
      <Stack direction="row" gap={2} sx={{ flexWrap: "wrap" }}>
        <Input type="text" label={t.fields.ram} value={ram} onChange={set(setRam)} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="select" label={t.fields.ramType} options={ramTypeOptions} value={ramType} onChange={set(setRamType)} sx={{ flex: 0.5, minWidth: 100 }} />
        <Input type="text" label={t.fields.storage} value={storage} onChange={set(setStorage)} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="select" label={t.fields.storageType} options={storTypeOptions} value={storageType} onChange={set(setStorageType)} sx={{ flex: 0.5, minWidth: 100 }} />
      </Stack>
      <Stack direction="row" gap={2} sx={{ flexWrap: "wrap" }}>
        <Input type="text" label={t.fields.lifetime} value={lifetime} onChange={setLifetime} sx={{ flex: 0.5, minWidth: 80 }} />
        <Input type="select" label={t.fields.country} options={countryOptions} value={country} onChange={setCountry} sx={{ flex: 1, minWidth: 120 }} />
        <Input type="text" label={t.fields.pue} value={pue} onChange={setPue} sx={{ flex: 0.3, minWidth: 60 }} />
      </Stack>

      <Box sx={{ typography: "h6" }}>{t.results.results}</Box>
      <Stack direction="row" gap={4} sx={{ typography: "body2" }}>
        <Box>{t.results.gwp}: <strong>{format(gwpEmbTotal * 1000, UNITS.gwp)}</strong></Box>
        <Box>{t.results.perYear}: <strong>{format(gwpEmbPerYear * 1000, UNITS.gwp)}</strong></Box>
      </Stack>

      <Box sx={{ typography: "body2", fontWeight: "bold" }}>{t.results.breakdown}</Box>
      <Bar values={components} colors={COLORS} units={UNITS.gwp} />
      <Stack direction="row" gap={2} sx={{ flexWrap: "wrap", typography: "caption" }}>
        {components.map((c, i) => (
          <Box key={c.label} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: 1, bgcolor: COLORS[i].bgcolor }} />
            {c.label}: {format(c.value * 1000, UNITS.gwp)}
          </Box>
        ))}
      </Stack>

      <Box sx={{ typography: "h6" }}>{t.results.operational}</Box>
      <Stack direction="row" gap={4} sx={{ typography: "body2" }}>
        <Box>{t.results.energy}: <strong>{format(energyKwh * 1000, UNITS.wh)}</strong></Box>
        <Box>GWP: <strong>{format(gwpOpePerYear * 1000, UNITS.gwp)}</strong></Box>
        <Box>Power: <strong>{totalPowerW.toFixed(0)} W</strong> (x PUE = {(totalPowerW * pueVal).toFixed(0)} W)</Box>
      </Stack>

      <Box sx={{ typography: "h6" }}>{t.results.total}</Box>
      <Stack gap={0.5}>
        <Bar
          values={[
            { label: "Embodied", value: gwpEmbPerYear },
            { label: "Operational", value: gwpOpePerYear },
          ]}
          colors={[{ bgcolor: "#023047", color: "white" }, { bgcolor: "#219ebc", color: "white" }]}
          units={UNITS.gwp}
        />
        <Box sx={{ typography: "body1", fontWeight: "bold" }}>
          {format(gwpTotalPerYear * 1000, UNITS.gwp)} / an
        </Box>
      </Stack>

      <Box sx={{ typography: "caption", color: "text.secondary" }}>{t.note}</Box>
    </Stack>
  );
};
