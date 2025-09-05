import { Input } from "@site/src/components/input";
import Stack from "@mui/system/Stack";
import { useEffect, useState } from "react";
import Box from "@mui/system/Box";
import { Bar } from "@site/src/components/bar";
import { format, formatDuration, UNITS } from "@site/src/format";

const COLORS = [
  { bgcolor: "#8ecae6", color: "inherit" },
  { bgcolor: "#219ebc", color: "white" },
  { bgcolor: "#023047", color: "white" },
  { bgcolor: "#ffb703", color: "inherit" },
  { bgcolor: "#fb8500", color: "inherit" },
];

const MODELS = [
  {
    label: "LLama 3.1 405b",
    value: "llama-3.1-405",
    architecture: "dense",
    parameters: [405e9, 405e9],
  },
  {
    label: "LLama 3.1 70b",
    value: "llama-3.1-70",
    architecture: "dense",
    parameters: [70e9, 70e9],
  },
  {
    label: "LLama 3.1 8b",
    value: "llama-3.1-8",
    architecture: "dense",
    parameters: [8e9, 8e9],
  },
  {
    label: "Mistral Large 2",
    value: "mistral-large-2",
    architecture: "dense",
    parameters: [123e9, 123e9],
  },
  {
    label: "GPT-4o",
    value: "gpt-4o",
    architecture: "moe",
    parameters: [55e9, 220e9],
  },
  {
    label: "GPT-4",
    value: "gpt-4",
    architecture: "moe",
    parameters: [220e9, 1760e9],
  },
];

const USE_CASES = [
  { label: "Entrainement", value: "training" },
  { label: "Fine tuning", value: "fine-tuning" },
  { label: "Inférence de texte", value: "text-inference" },
  { label: "Inférence d'image", value: "image-inference" },
];

const HARDWARES = [
  {
    label: "NVIDIA DGX H100 (8 GPU)",
    value: "nvidia-dgx-h100-8",
    cpu_count: 2,
    cpu_power: 350,
    cpu_embodied: 25e3,
    gpu_count: 8,
    gpu_flops: 989e12, // FP32
    gpu_power: 700,
    gpu_embodied: 250e3,
    ram: 2e12,
    ram_power: 392e-12,
    ram_embodied: 533e3 / 384e9,
    ssd: 30e12,
    ssd_power: 1.2e-3 / 1e9,
    ssd_embodied: 0.16e3 / 1e9,
    enclosure_units: 8,
    enclosure_power: 0,
    enclosure_embodied: 250e3,
    mfu: 0.4,
  },
  {
    label: "NVIDIA DGX H100 (4 GPU)",
    value: "nvidia-dgx-h100-4",
    cpu_count: 2,
    cpu_power: 350,
    cpu_embodied: 25e3,
    gpu_count: 4,
    gpu_flops: 989e12, // FP32
    gpu_power: 700,
    gpu_embodied: 250e3,
    ram: 2e12,
    ram_power: 392e-12,
    ram_embodied: 533e3 / 384e9,
    ssd: 30e12,
    ssd_power: 1.2e-3 / 1e9,
    ssd_embodied: 0.16e3 / 1e9,
    enclosure_units: 8,
    enclosure_power: 0,
    enclosure_embodied: 250e3,
    mfu: 0.4,
  },
  {
    label: "NVIDIA DGX B300 (8 GPU)",
    value: "nvidia-dgx-b300-8",
    cpu_count: 2,
    cpu_power: 350,
    cpu_embodied: 25e3,
    gpu_count: 8,
    gpu_flops: 2.2e15, // FP32
    gpu_power: 1200,
    gpu_embodied: 750e3, // 288GB vs 80GB
    ram: 0, // No memory
    ram_power: 392e-12,
    ram_embodied: 533e3 / 384e9,
    ssd: 30e12,
    ssd_power: 1.2e-3 / 1e9,
    ssd_embodied: 0.16e3 / 1e9,
    enclosure_units: 10,
    enclosure_power: 0,
    enclosure_embodied: 250e3,
    mfu: 0.4,
  },
  {
    label: "NVIDIA BG300 NVL72 (72 GPU)",
    value: "nvidia-gb300-nvl72",
    cpu_count: 36,
    cpu_power: 250,
    cpu_embodied: 25e3,
    gpu_count: 72,
    gpu_flops: 2.2e15, // FP32
    gpu_power: 1200,
    gpu_embodied: 750e3, // 288GB vs 80GB
    ram: 18e12,
    ram_power: 392e-12,
    ram_embodied: 533e3 / 384e9,
    ssd: 30e12,
    ssd_power: 1.2e-3 / 1e9,
    ssd_embodied: 0.16e3 / 1e9,
    enclosure_units: 10,
    enclosure_power: 0,
    enclosure_embodied: 250e3,
    mfu: 0.4,
  },
];

const REGIONS = [
  { label: "États Unis (0.4 kgCO2e/kWh)", value: "us", gwp: 0.4 },
  { label: "France (0.04 kgCO2e/kWh)", value: "fr", gwp: 0.04 },
];

type Parts = {
  cpu: number;
  ram: number;
  storage: number;
  gpu: number;
  enclosure: number;
  total: number;
};

type Result = {
  flops: number;
  duration: number;
  latency?: number;
  throughput?: number;
  wh: Parts;
  gwp: {
    energy: Parts;
    embodied: Parts;
    total: number;
  };
};

const compute = ({
  model,
  useCase,
  hardware,
  region,
  corpus,
  prompt,
  response,
  images,
  width,
  height,
  steps,
}: {
  model: string;
  useCase: string;
  hardware: string;
  region: string;
  corpus: number;
  prompt: number;
  response: number;
  images: number;
  width: number;
  height: number;
  steps: number;
}): Result => {
  const pue = 1.2;
  const lifespan = 5 * 365.25 * 24;
  const { gwp } = REGIONS.find(({ value }) => region === value);
  const {
    architecture,
    parameters: [Pactive, Ptotal],
  } = MODELS.find(({ value }) => model === value);
  const {
    gpu_count,
    gpu_flops,
    gpu_embodied,
    gpu_power,
    cpu_count,
    cpu_power,
    cpu_embodied,
    ram,
    ram_power,
    ram_embodied,
    ssd,
    ssd_power,
    ssd_embodied,
    enclosure_power,
    enclosure_embodied,
    mfu,
  } = HARDWARES.find(({ value }) => hardware === value);

  let flops = 0;
  let latency;
  let throughput;
  if (useCase === "training") {
    flops = 6 * Ptotal * corpus * 1e9;
  }
  if (useCase === "fine-tuning") {
    const Ptunable =
      (architecture === "dense" ? Ptotal : Pactive) * (0.1 / 100); // Hypothesis: 0.1% trainable parameters
    flops = (2 * Ptotal + 4 * Ptunable) * corpus * 1e9;
  }
  if (useCase === "text-inference") {
    flops =
      (architecture === "dense" ? Ptotal : Pactive) * prompt +
      2 * (architecture === "dense" ? Ptotal : Pactive) * response;
    latency =
      ((architecture === "dense" ? Ptotal : Pactive) * prompt) /
      (gpu_flops * mfu) /
      gpu_count;
    throughput =
      response /
      ((2 * (architecture === "dense" ? Ptotal : Pactive) * response) /
        (gpu_flops * mfu) /
        gpu_count);
  }
  if (useCase === "image-inference") {
    const downscaleFactor = 8;
    const latentChannels = 4;
    const latentWidth = Math.floor(width / downscaleFactor);
    const latentHeight = Math.floor(height / downscaleFactor);
    const activations = latentWidth * latentHeight * latentChannels;
    flops =
      (architecture === "dense" ? Ptotal : Pactive) * prompt +
      images *
        (steps *
          (2 * (architecture === "dense" ? Ptotal : Pactive) * activations) +
          40e9) /* CLIP + VAE */;
    latency =
      ((architecture === "dense" ? Ptotal : Pactive) * prompt) /
      (gpu_flops * mfu) /
      gpu_count;
  }
  const gpu_seconds = flops / (gpu_flops * mfu);
  const duration = gpu_seconds / gpu_count;
  const gpu_hours = gpu_seconds / 3600;

  const wh: Parts = {
    cpu: 0,
    gpu: 0,
    ram: 0,
    storage: 0,
    enclosure: 0,
    total: 0,
  };
  wh.gpu = gpu_hours * gpu_power * pue;
  wh.cpu = ((gpu_hours * (cpu_count * cpu_power)) / gpu_count) * pue;
  wh.ram = ((gpu_hours * (ram * ram_power)) / gpu_count) * pue;
  wh.storage = ((gpu_hours * (ssd * ssd_power)) / gpu_count) * pue;
  wh.enclosure = ((gpu_hours * enclosure_power) / gpu_count) * pue;
  wh.total = wh.cpu + wh.gpu + wh.ram + wh.storage + wh.enclosure;

  const energy = {
    cpu: wh.cpu * gwp,
    gpu: wh.gpu * gwp,
    ram: wh.ram * gwp,
    storage: wh.storage * gwp,
    enclosure: wh.enclosure * gwp,
    total: wh.total * gwp,
  };
  const embodied = {
    cpu: 0,
    gpu: 0,
    ram: 0,
    storage: 0,
    enclosure: 0,
    total: 0,
  };
  embodied.gpu = (gpu_hours * gpu_embodied) / lifespan;
  embodied.cpu =
    (gpu_hours * (cpu_count * cpu_embodied)) / gpu_count / lifespan;
  embodied.ram = (gpu_hours * (ram * ram_embodied)) / gpu_count / lifespan;
  embodied.storage = (gpu_hours * (ssd * ssd_embodied)) / gpu_count / lifespan;
  embodied.enclosure = (gpu_hours * enclosure_embodied) / gpu_count / lifespan;
  embodied.total =
    embodied.cpu +
    embodied.gpu +
    embodied.ram +
    embodied.storage +
    embodied.enclosure;

  return {
    flops,
    duration,
    latency,
    throughput,
    wh,
    gwp: {
      energy,
      embodied,
      total: energy.total + embodied.total,
    },
  };
};

export const AIPlayGround = () => {
  const [model, setModel] = useState(MODELS[0]?.value);
  const [useCase, setUseCase] = useState(USE_CASES[0]?.value);
  const [hardware, setHardware] = useState(HARDWARES[0]?.value);
  const [region, setRegion] = useState(REGIONS[0]?.value);
  const [corpus, setCorpus] = useState(15000);
  const [prompt, setPrompt] = useState(100);
  const [response, setResponse] = useState(400);
  const [images, setImages] = useState(1);
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [steps, setSteps] = useState(30);
  const [result, setResult] = useState<Result>();
  useEffect(() => {
    setResult(
      compute({
        model,
        useCase,
        hardware,
        region,
        corpus,
        prompt,
        response,
        images,
        width,
        height,
        steps,
      }),
    );
  }, [
    model,
    useCase,
    hardware,
    region,
    corpus,
    prompt,
    response,
    images,
    width,
    height,
    steps,
  ]);
  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        appearance: "none",
        borderRadius: 2,
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "border.primary",
        py: 2,
        px: 2,
        mb: 6,
        ".group>*": { flex: 1 },
      }}
    >
      <Box sx={{ typography: "subtitle" }}>Paramètres</Box>
      <Stack className="group" direction="row" spacing={2}>
        <Input
          label="Cas d'usage"
          type="select"
          options={USE_CASES}
          value={useCase}
          onChange={(value) => setUseCase(value)}
        />
        <Input
          label="Modèle"
          type="select"
          options={MODELS}
          value={model}
          onChange={(value) => setModel(value)}
        />
        <Input
          label="Matériel"
          type="select"
          options={HARDWARES}
          value={hardware}
          onChange={(value) => setHardware(value)}
        />
        <Input
          label="Région"
          type="select"
          options={REGIONS}
          value={region}
          onChange={(value) => setRegion(value)}
        />
      </Stack>
      <Stack className="group" direction="row" spacing={2}>
        {(useCase === "training" || useCase === "fine-tuning") && (
          <Input
            label="Corpus (milliard de jetons)"
            type="text"
            placeholder="15000"
            value={`${corpus}`}
            onChange={(value) => setCorpus(parseInt(value) || 0)}
          />
        )}
        {(useCase === "text-inference" || useCase === "image-inference") && (
          <Input
            label="Prompt (jetons)"
            type="text"
            placeholder="100"
            value={`${prompt}`}
            onChange={(value) => setPrompt(parseInt(value) || 0)}
          />
        )}
        {useCase === "text-inference" && (
          <Input
            label="Réponse (jetons)"
            type="text"
            placeholder="400"
            value={`${response}`}
            onChange={(value) => setResponse(parseInt(value) || 0)}
          />
        )}
        {useCase === "image-inference" && (
          <>
            <Input
              label="Images"
              type="text"
              placeholder="1"
              value={`${images}`}
              onChange={(value) => setImages(parseInt(value) || 0)}
            />
            <Input
              label="Largeur (px)"
              type="text"
              placeholder="512"
              value={`${width}`}
              onChange={(value) => setWidth(parseInt(value) || 0)}
            />
            <Input
              label="Hauteur (px)"
              type="text"
              placeholder="512"
              value={`${height}`}
              onChange={(value) => setHeight(parseInt(value) || 0)}
            />
            <Input
              label="Étapes"
              type="text"
              placeholder="30"
              value={`${steps}`}
              onChange={(value) => setSteps(parseInt(value) || 0)}
            />
          </>
        )}
      </Stack>
      <Box
        sx={{
          typography: "subtitle",
          borderTopWidth: "1px",
          borderTopStyle: "solid",
          borderTopColor: "border.primary",
          pt: 1,
        }}
      >
        Résultats
      </Box>
      <Stack
        sx={{
          typography: "body",
          borderTopStyle: "solid",
          borderTopWidth: "1px",
          borderTopColor: "border.primary",
          pt: 1,
        }}
        spacing={1}
      >
        <Stack className="group" direction="row" spacing={1}>
          <Box>
            Charge de calcul{" : "}
            <Box component="span" sx={{ fontWeight: "bold" }}>
              {format(result?.flops, UNITS.flops)}
            </Box>
          </Box>
          <Box>
            Latence :{" "}
            <Box component="span" sx={{ fontWeight: "bold" }}>
              {formatDuration(result?.latency)}
            </Box>
          </Box>
        </Stack>
        <Stack className="group" direction="row" spacing={1}>
          <Box>
            Durée de traitement :{" "}
            <Box component="span" sx={{ fontWeight: "bold" }}>
              {formatDuration(result?.duration)}
            </Box>
          </Box>
          <Box>
            Débit :{" "}
            <Box component="span" sx={{ fontWeight: "bold" }}>
              {format(result?.throughput, UNITS.tokens)}
            </Box>
          </Box>
        </Stack>
        <Box
          sx={{
            borderTopStyle: "solid",
            borderTopWidth: "1px",
            borderTopColor: "border.primary",
            pt: 1,
          }}
        >
          Énergie :{" "}
          <Box component="span" sx={{ fontWeight: "bold" }}>
            {format(result?.wh.total, UNITS.wh)}
          </Box>
        </Box>
        <Bar
          colors={COLORS}
          units={UNITS.wh}
          values={[
            { label: "GPU", value: result?.wh.gpu },
            { label: "CPU", value: result?.wh.cpu },
            { label: "RAM", value: result?.wh.ram },
            { label: "Stockage", value: result?.wh.storage },
            { label: "Chassis", value: result?.wh.enclosure },
          ]}
        />
        <Box>
          Émissions GES :{" "}
          <Box component="span" sx={{ fontWeight: "bold" }}>
            {format(result?.gwp.total, UNITS.gwp)}
          </Box>
        </Box>
        <Bar
          colors={COLORS}
          units={UNITS.gwp}
          values={[
            {
              label: "GPU",
              value: result?.gwp.energy.gpu + result?.gwp.embodied.gpu,
            },
            {
              label: "CPU",
              value: result?.gwp.energy.cpu + result?.gwp.embodied.cpu,
            },
            {
              label: "RAM",
              value: result?.gwp.energy.ram + result?.gwp.embodied.ram,
            },
            {
              label: "Stockage",
              value: result?.gwp.energy.storage + result?.gwp.embodied.storage,
            },
            {
              label: "Chassis",
              value:
                result?.gwp.energy.enclosure + result?.gwp.embodied.enclosure,
            },
          ]}
        />
        <Bar
          colors={COLORS}
          units={UNITS.gwp}
          values={[
            {
              label: "Operational",
              value: result?.gwp.energy.total,
            },
            {
              label: "Embodied",
              value: result?.gwp.embodied.total,
            },
          ]}
        />
      </Stack>
    </Stack>
  );
};
