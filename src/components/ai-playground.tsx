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

type CuratedModel = {
  label: string;
  value: string;
  provider: string;
  category:
    | "general"
    | "code"
    | "multimodal"
    | "open_weight"
    | "compact"
    | "reasoning";
  architecture: "dense" | "moe";
  parameters: [number, number];
  estimated: boolean;
  source: string;
};

type Lang = "fr" | "en";
type UseCase =
  | "training"
  | "fine-tuning"
  | "text-inference"
  | "image-inference"
  | "video-inference";

const TEXT = {
  fr: {
    categories: {
      compact: "compact",
      code: "code/dev",
      general: "généraliste",
      multimodal: "multimodal",
      open_weight: "open-weight",
      reasoning: "raisonnement",
    },
    fields: {
      cache: "Cache",
      corpus: "Corpus (milliard de jetons)",
      hardware: "Matériel",
      height: "Hauteur (px)",
      images: "Images",
      model: "Modèle",
      prompt: "Prompt (jetons)",
      pue: "PUE",
      region: "Région",
      response: "Réponse (jetons)",
      steps: "Étapes",
      useCase: "Cas d'usage",
      width: "Largeur (px)",
    },
    groups: {
      americas: "Amériques",
      asia: "Asie",
      europe: "Europe",
      global: "Global",
    },
    regions: {
      ca: "Canada",
      cn: "Chine",
      de: "Allemagne",
      eu: "Europe moyenne",
      fr: "France",
      ie: "Irlande",
      in: "Inde",
      no: "Norvège",
      uk: "Royaume-Uni",
      us: "États-Unis",
      world: "Monde",
    },
    results: {
      cache: "Cache",
      chassis: "Chassis",
      computeLoad: "Charge de calcul",
      cpu: "CPU",
      duration: "Durée de traitement",
      embodied: "Embodied",
      energy: "Énergie",
      emissions: "Émissions GES",
      gpu: "GPU",
      latency: "Latence",
      operational: "Operational",
      parameters: "Paramètres",
      ram: "RAM",
      results: "Résultats",
      storage: "Stockage",
      throughput: "Débit",
    },
    useCases: {
      "fine-tuning": "Fine tuning",
      "image-inference": "Inférence d'image",
      training: "Entrainement",
      "text-inference": "Inférence de texte",
      "video-inference": "Inférence de vidéo",
    },
  },
  en: {
    categories: {
      compact: "compact",
      code: "code/dev",
      general: "general",
      multimodal: "multimodal",
      open_weight: "open-weight",
      reasoning: "reasoning",
    },
    fields: {
      cache: "Cache",
      corpus: "Corpus (billion tokens)",
      hardware: "Hardware",
      height: "Height (px)",
      images: "Images",
      model: "Model",
      prompt: "Prompt (tokens)",
      pue: "PUE",
      region: "Region",
      response: "Response (tokens)",
      steps: "Steps",
      useCase: "Use case",
      width: "Width (px)",
    },
    groups: {
      americas: "Americas",
      asia: "Asia",
      europe: "Europe",
      global: "Global",
    },
    regions: {
      ca: "Canada",
      cn: "China",
      de: "Germany",
      eu: "Europe average",
      fr: "France",
      ie: "Ireland",
      in: "India",
      no: "Norway",
      uk: "United Kingdom",
      us: "United States",
      world: "World",
    },
    results: {
      cache: "Cache",
      chassis: "Chassis",
      computeLoad: "Compute load",
      cpu: "CPU",
      duration: "Processing time",
      embodied: "Embodied",
      energy: "Energy",
      emissions: "GHG emissions",
      gpu: "GPU",
      latency: "Latency",
      operational: "Operational",
      parameters: "Parameters",
      ram: "RAM",
      results: "Results",
      storage: "Storage",
      throughput: "Throughput",
    },
    useCases: {
      "fine-tuning": "Fine-tuning",
      "image-inference": "Image inference",
      training: "Training",
      "text-inference": "Text inference",
      "video-inference": "Video inference",
    },
  },
} as const;

const normalizeLang = (lang?: string): Lang =>
  lang?.toLowerCase().startsWith("fr") ? "fr" : "en";

const resolveLang = (lang?: string): Lang => {
  if (lang) {
    return normalizeLang(lang);
  }
  if (typeof navigator !== "undefined") {
    return normalizeLang(navigator.language);
  }
  return "en";
};

const formatCarbonIntensity = (value: number, locale: Lang) => {
  const formatter = new Intl.NumberFormat(locale, {
    style: "decimal",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
  return `${formatter.format(value)} kgCO2e / kWh`;
};

const CURATED_MODELS: CuratedModel[] = [
  {
    label: "Anthropic - Claude Haiku 4.5",
    value: "claude-haiku-4-5-20251001",
    provider: "anthropic",
    category: "general",
    architecture: "dense",
    parameters: [22.5e9, 22.5e9],
    estimated: true,
    source: "https://docs.anthropic.com/en/docs/about-claude/models/overview",
  },
  {
    label: "Anthropic - Claude Opus 4.5",
    value: "claude-opus-4-5-20251101",
    provider: "anthropic",
    category: "general",
    architecture: "moe",
    parameters: [133.5e9, 670e9],
    estimated: true,
    source: "https://docs.anthropic.com/en/docs/about-claude/models/overview",
  },
  {
    label: "Anthropic - Claude Sonnet 4.5",
    value: "claude-sonnet-4-5-20250929",
    provider: "anthropic",
    category: "general",
    architecture: "moe",
    parameters: [88e9, 440e9],
    estimated: true,
    source: "https://docs.anthropic.com/en/docs/about-claude/models/overview",
  },
  {
    label: "DeepSeek - DeepSeek-V3",
    value: "deepseek-v3",
    provider: "deepseek",
    category: "general",
    architecture: "moe",
    parameters: [37e9, 671e9],
    estimated: false,
    source: "https://huggingface.co/docs/transformers/en/model_doc/deepseek_v3",
  },
  {
    label: "Google - CodeGemma 7B",
    value: "codegemma-7b-it",
    provider: "google",
    category: "code",
    architecture: "dense",
    parameters: [8.54e9, 8.54e9],
    estimated: false,
    source: "https://huggingface.co/google/codegemma-7b-it",
  },
  {
    label: "Google - Gemini 3.1 Flash Image",
    value: "gemini-3.1-flash-image-preview",
    provider: "google",
    category: "multimodal",
    architecture: "moe",
    parameters: [240e9, 1200e9],
    estimated: true,
    source: "https://ai.google.dev/gemini-api/docs/models",
  },
  {
    label: "Google - Gemini 3.1 Pro",
    value: "gemini-3.1-pro-preview",
    provider: "google",
    category: "general",
    architecture: "moe",
    parameters: [240e9, 1200e9],
    estimated: true,
    source: "https://ai.google.dev/gemini-api/docs/models",
  },
  {
    label: "Google - Gemma 3 27B",
    value: "gemma-3-27b-it",
    provider: "google",
    category: "open_weight",
    architecture: "dense",
    parameters: [27.4e9, 27.4e9],
    estimated: false,
    source: "https://ai.google.dev/gemini-api/docs/models",
  },
  {
    label: "Google - Gemma 3 4B",
    value: "gemma-3-4b-it",
    provider: "google",
    category: "compact",
    architecture: "dense",
    parameters: [4.3e9, 4.3e9],
    estimated: false,
    source: "https://ai.google.dev/gemini-api/docs/models",
  },
  {
    label: "Google - Gemma 3n E4B",
    value: "gemma-3n-e4b-it",
    provider: "google",
    category: "compact",
    architecture: "dense",
    parameters: [7.85e9, 7.85e9],
    estimated: false,
    source: "https://ai.google.dev/gemini-api/docs/models",
  },
  {
    label: "Meta - Llama 3.1 70B",
    value: "meta-llama-3.1-70b-instruct",
    provider: "meta",
    category: "open_weight",
    architecture: "dense",
    parameters: [70.55e9, 70.55e9],
    estimated: false,
    source: "https://huggingface.co/meta-llama/Meta-Llama-3.1-70B-Instruct",
  },
  {
    label: "Meta - Llama 3.1 405B",
    value: "meta-llama-3.1-405b-instruct",
    provider: "meta",
    category: "open_weight",
    architecture: "dense",
    parameters: [405.87e9, 405.87e9],
    estimated: false,
    source:
      "https://huggingface.co/meta-llama/Meta-Llama-3.1-405B-Instruct-FP8",
  },
  {
    label: "Meta - Llama 4",
    value: "llama-4-maverick",
    provider: "meta",
    category: "multimodal",
    architecture: "moe",
    parameters: [17e9, 400e9],
    estimated: false,
    source: "https://ai.meta.com/blog/llama-4-multimodal-intelligence/",
  },
  {
    label: "Mistral - Codestral",
    value: "codestral-latest",
    provider: "mistral",
    category: "code",
    architecture: "dense",
    parameters: [22.2e9, 22.2e9],
    estimated: false,
    source: "https://docs.mistral.ai/getting-started/models/models_overview",
  },
  {
    label: "Mistral - Devstral Medium 1.0",
    value: "devstral-medium-latest",
    provider: "mistral",
    category: "code",
    architecture: "dense",
    parameters: [95e9, 95e9],
    estimated: true,
    source: "https://docs.mistral.ai/getting-started/models/models_overview",
  },
  {
    label: "Mistral - Devstral Small",
    value: "devstral-small-latest",
    provider: "mistral",
    category: "code",
    architecture: "dense",
    parameters: [23.6e9, 23.6e9],
    estimated: false,
    source: "https://docs.mistral.ai/getting-started/models/models_overview",
  },
  {
    label: "Mistral - Magistral Medium 1.2",
    value: "magistral-medium-latest",
    provider: "mistral",
    category: "reasoning",
    architecture: "dense",
    parameters: [95e9, 95e9],
    estimated: true,
    source: "https://docs.mistral.ai/getting-started/models/models_overview",
  },
  {
    label: "Mistral - Ministral 8B",
    value: "ministral-8b-latest",
    provider: "mistral",
    category: "compact",
    architecture: "dense",
    parameters: [8.02e9, 8.02e9],
    estimated: false,
    source: "https://docs.mistral.ai/getting-started/models/models_overview",
  },
  {
    label: "Mistral - Mistral Medium 3.1",
    value: "mistral-medium-latest",
    provider: "mistral",
    category: "general",
    architecture: "dense",
    parameters: [95e9, 95e9],
    estimated: true,
    source: "https://docs.mistral.ai/models/mistral-medium-3-1-25-08",
  },
  {
    label: "Mistral - Pixtral Large",
    value: "pixtral-large-latest",
    provider: "mistral",
    category: "multimodal",
    architecture: "dense",
    parameters: [123e9, 123e9],
    estimated: false,
    source: "https://docs.mistral.ai/getting-started/models/models_overview",
  },
  {
    label: "OpenAI - GPT-5",
    value: "gpt-5",
    provider: "openai",
    category: "general",
    architecture: "moe",
    parameters: [60e9, 300e9],
    estimated: true,
    source: "https://platform.openai.com/docs/models",
  },
  {
    label: "OpenAI - GPT-5 mini",
    value: "gpt-5-mini",
    provider: "openai",
    category: "compact",
    architecture: "dense",
    parameters: [47.5e9, 47.5e9],
    estimated: true,
    source: "https://platform.openai.com/docs/models",
  },
  {
    label: "OpenAI - GPT-5.1 Codex",
    value: "gpt-5.1-codex",
    provider: "openai",
    category: "code",
    architecture: "moe",
    parameters: [60e9, 300e9],
    estimated: true,
    source: "https://platform.openai.com/docs/models/gpt-5.1-codex",
  },
  {
    label: "OpenAI - GPT-OSS 120B",
    value: "gpt-oss-120b",
    provider: "openai",
    category: "open_weight",
    architecture: "moe",
    parameters: [5.1e9, 117e9],
    estimated: false,
    source: "https://platform.openai.com/docs/models/gpt-oss-120b",
  },
  {
    label: "OpenAI - GPT-OSS 20B",
    value: "gpt-oss-20b",
    provider: "openai",
    category: "open_weight",
    architecture: "moe",
    parameters: [3.6e9, 21e9],
    estimated: false,
    source: "https://platform.openai.com/docs/models/gpt-oss-120b",
  },
  {
    label: "OpenAI - o4-mini",
    value: "o4-mini",
    provider: "openai",
    category: "reasoning",
    architecture: "dense",
    parameters: [18e9, 18e9],
    estimated: true,
    source: "https://platform.openai.com/docs/models",
  },
  {
    label: "Qwen - Qwen3 32B",
    value: "qwen3-32b",
    provider: "qwen",
    category: "open_weight",
    architecture: "dense",
    parameters: [32.8e9, 32.8e9],
    estimated: false,
    source: "https://huggingface.co/Qwen/Qwen3-32B",
  },
];

const MODELS = CURATED_MODELS.map(
  ({ label, value, architecture, parameters }) => ({
    label,
    value,
    architecture,
    parameters,
  }),
);

const PROVIDER_LABELS: Record<string, string> = {
  anthropic: "Anthropic",
  deepseek: "DeepSeek",
  google: "Google",
  meta: "Meta",
  mistral: "Mistral",
  openai: "OpenAI",
  qwen: "Qwen",
};

const USE_CASES = [
  { value: "training" },
  { value: "fine-tuning" },
  { value: "text-inference" },
  { value: "image-inference" },
  { value: "video-inference" },
] as const satisfies ReadonlyArray<{ value: UseCase }>;

const isUseCase = (value: string): value is UseCase =>
  USE_CASES.some((useCase) => useCase.value === value);

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
    ram_embodied: 533e3 / 384e9, // Or 546e3 / 640e9 (cf. NVidia PCFs)
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

const REGION_GROUPS = [
  {
    key: "europe",
    options: [
      { key: "eu", value: "eu", gwp: 0.25 },
      { key: "de", value: "de", gwp: 0.3316 },
      { key: "fr", value: "fr", gwp: 0.04179 },
      { key: "ie", value: "ie", gwp: 0.3 },
      { key: "no", value: "no", gwp: 0.0291 },
      { key: "uk", value: "uk", gwp: 0.21709 },
    ],
  },
  {
    key: "americas",
    options: [
      { key: "ca", value: "ca", gwp: 0.12 },
      { key: "us", value: "us", gwp: 0.4 },
    ],
  },
  {
    key: "asia",
    options: [
      { key: "cn", value: "cn", gwp: 0.5554 },
      { key: "in", value: "in", gwp: 0.70745 },
    ],
  },
  {
    key: "global",
    options: [{ key: "world", value: "world", gwp: 0.47184 }],
  },
];

const FLAT_REGIONS = REGION_GROUPS.flatMap((group) => group.options);
const PUE_OPTIONS = Array.from({ length: 11 }, (_, index) => {
  const value = (1 + index / 10).toFixed(1);
  return { label: value, value };
});
const CACHE_OPTIONS = Array.from({ length: 101 }, (_, value) => ({
  label: `${value}%`,
  value: `${value}`,
}));
const CACHE_ALPHA = 0.1;

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
  pue,
  region,
  corpus,
  prompt,
  response,
  cache,
  images,
  width,
  height,
  steps,
}: {
  model: string;
  useCase: UseCase;
  hardware: string;
  pue: number;
  region: string;
  corpus: number;
  prompt: number;
  response: number;
  images: number;
  width: number;
  height: number;
  steps: number;
  cache: number;
}): Result => {
  const lifespan = 5 * 365.25 * 24;
  const selectedRegion =
    FLAT_REGIONS.find(({ value }) => region === value) ?? FLAT_REGIONS[0];
  const { gwp } = selectedRegion;
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
  let promptFlops = 0;
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
    promptFlops = (architecture === "dense" ? Ptotal : Pactive) * prompt;
    flops =
      promptFlops +
      2 * (architecture === "dense" ? Ptotal : Pactive) * response;
    latency = promptFlops / (gpu_flops * mfu) / gpu_count;
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
    promptFlops = (architecture === "dense" ? Ptotal : Pactive) * prompt;
    flops =
      promptFlops +
      images *
        (steps *
          (2 * (architecture === "dense" ? Ptotal : Pactive) * activations) +
          40e9) /* CLIP + VAE */;
    latency = promptFlops / (gpu_flops * mfu) / gpu_count;
  }
  if (useCase === "video-inference") {
    const downscaleFactor = 8;
    const hiddenSize = 2048;
    const latentChannels = 4;
    const latentWidth = Math.floor(width / downscaleFactor);
    const latentHeight = Math.floor(height / downscaleFactor);
    const activations = latentWidth * latentHeight * latentChannels;
    promptFlops = (architecture === "dense" ? Ptotal : Pactive) * prompt;
    flops =
      promptFlops +
      images *
        (steps *
          (2 * (architecture === "dense" ? Ptotal : Pactive) * activations) +
          40e9) /* CLIP + VAE */ +
      steps *
        2 *
        Math.pow(images * latentWidth * latentHeight, 2) *
        4 * // MLP
        32 * // Couches
        hiddenSize;
    latency = promptFlops / (gpu_flops * mfu) / gpu_count;
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

  if (
    cache > 0 &&
    promptFlops > 0 &&
    (useCase === "text-inference" ||
      useCase === "image-inference" ||
      useCase === "video-inference")
  ) {
    const reuseRate = cache / 100;
    const promptShare = Math.min(promptFlops / flops, 1);
    const promptImpactFactor = 1 - reuseRate + CACHE_ALPHA * reuseRate;
    const totalImpactFactor =
      1 - promptShare + promptShare * promptImpactFactor;

    wh.cpu *= totalImpactFactor;
    wh.gpu *= totalImpactFactor;
    wh.ram *= totalImpactFactor;
    wh.storage *= totalImpactFactor;
    wh.enclosure *= totalImpactFactor;
    wh.total *= totalImpactFactor;

    energy.cpu *= totalImpactFactor;
    energy.gpu *= totalImpactFactor;
    energy.ram *= totalImpactFactor;
    energy.storage *= totalImpactFactor;
    energy.enclosure *= totalImpactFactor;
    energy.total *= totalImpactFactor;

    embodied.cpu *= totalImpactFactor;
    embodied.gpu *= totalImpactFactor;
    embodied.ram *= totalImpactFactor;
    embodied.storage *= totalImpactFactor;
    embodied.enclosure *= totalImpactFactor;
    embodied.total *= totalImpactFactor;
  }

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

export const AIPlayGround = ({
  embedded = false,
  lang,
}: {
  embedded?: boolean;
  lang?: string;
}) => {
  const [locale, setLocale] = useState<Lang>(() => resolveLang(lang));
  useEffect(() => {
    setLocale(resolveLang(lang));
  }, [lang]);
  const text = TEXT[locale];
  const modelOptions = Object.entries(
    CURATED_MODELS.reduce<Record<string, { label: string; value: string }[]>>(
      (groups, model) => {
        const shortLabel = model.label.replace(/^[^-]+ - /, "");
        const option = {
          label: `${shortLabel} (${text.categories[model.category]})`,
          value: model.value,
        };
        if (!groups[model.provider]) {
          groups[model.provider] = [];
        }
        groups[model.provider].push(option);
        return groups;
      },
      {},
    ),
  )
    .sort(([providerA], [providerB]) =>
      PROVIDER_LABELS[providerA].localeCompare(
        PROVIDER_LABELS[providerB],
        locale,
      ),
    )
    .map(([provider, options]) => ({
      label: PROVIDER_LABELS[provider],
      options: options.sort((a, b) => a.label.localeCompare(b.label, locale)),
    }));
  const regionOptions = REGION_GROUPS.map((group) => ({
    label: text.groups[group.key],
    options: group.options.map((region) => ({
      label: `${text.regions[region.key]} (${formatCarbonIntensity(
        region.gwp,
        locale,
      )})`,
      value: region.value,
    })),
  }));
  const useCaseOptions = USE_CASES.map(({ value }) => ({
    label: text.useCases[value],
    value,
  }));
  const [model, setModel] = useState(
    MODELS.find(({ value }) => value === "meta-llama-3.1-405b-instruct")
      ?.value ?? MODELS[0]?.value,
  );
  const [useCase, setUseCase] = useState<UseCase>(USE_CASES[0]?.value);
  const [hardware, setHardware] = useState(HARDWARES[0]?.value);
  const [pue, setPue] = useState(1.2);
  const [region, setRegion] = useState(
    FLAT_REGIONS.find(({ value }) => value === "us")?.value ??
      FLAT_REGIONS[0]?.value,
  );
  const [corpus, setCorpus] = useState(15000);
  const [prompt, setPrompt] = useState(100);
  const [response, setResponse] = useState(400);
  const [cache, setCache] = useState(0);
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
        pue,
        region,
        corpus,
        prompt,
        response,
        cache,
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
    pue,
    region,
    corpus,
    prompt,
    response,
    cache,
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
        borderStyle: embedded ? "none" : "solid",
        borderWidth: embedded ? 0 : "1px",
        borderColor: embedded ? "transparent" : "border.primary",
        py: embedded ? 0 : 2,
        px: embedded ? 0 : 2,
        mb: embedded ? 0 : 6,
        ".group>*": { flex: "1 1 0" },
        ".group>*.compact": { flex: "0 0 75px" },
      }}
    >
      <Box sx={{ typography: "subtitle" }}>{text.results.parameters}</Box>
      <Stack className="group" direction="row" spacing={2}>
        <Input
          label={text.fields.useCase}
          type="select"
          options={useCaseOptions}
          value={useCase}
          onChange={(value) => {
            if (isUseCase(value)) {
              setUseCase(value);
            }
          }}
        />
        <Input
          label={text.fields.model}
          type="select"
          options={modelOptions}
          value={model}
          onChange={(value) => setModel(value)}
        />
        <Input
          label={text.fields.hardware}
          type="select"
          options={HARDWARES}
          value={hardware}
          onChange={(value) => setHardware(value)}
        />
        <Input
          className="compact"
          label={text.fields.pue}
          type="select"
          options={PUE_OPTIONS}
          value={`${pue.toFixed(1)}`}
          onChange={(value) => setPue(parseFloat(value) || 1.2)}
        />
        <Input
          label={text.fields.region}
          type="select"
          options={regionOptions}
          value={region}
          onChange={(value) => setRegion(value)}
        />
      </Stack>
      <Stack className="group" direction="row" spacing={2}>
        {(useCase === "training" || useCase === "fine-tuning") && (
          <Input
            label={text.fields.corpus}
            type="text"
            placeholder="15000"
            value={`${corpus}`}
            onChange={(value) => setCorpus(parseInt(value) || 0)}
          />
        )}
        {(useCase === "text-inference" ||
          useCase === "image-inference" ||
          useCase === "video-inference") && (
          <>
            <Input
              label={text.fields.prompt}
              type="text"
              placeholder="100"
              value={`${prompt}`}
              onChange={(value) => setPrompt(parseInt(value) || 0)}
            />
            <Input
              className="compact"
              label={text.fields.cache}
              type="select"
              options={CACHE_OPTIONS}
              value={`${cache}`}
              onChange={(value) => setCache(parseInt(value) || 0)}
            />
          </>
        )}
        {useCase === "text-inference" && (
          <Input
            label={text.fields.response}
            type="text"
            placeholder="400"
            value={`${response}`}
            onChange={(value) => setResponse(parseInt(value) || 0)}
          />
        )}
        {(useCase === "image-inference" || useCase === "video-inference") && (
          <>
            <Input
              label={text.fields.images}
              type="text"
              placeholder="1"
              value={`${images}`}
              onChange={(value) => setImages(parseInt(value) || 0)}
            />
            <Input
              label={text.fields.width}
              type="text"
              placeholder="512"
              value={`${width}`}
              onChange={(value) => setWidth(parseInt(value) || 0)}
            />
            <Input
              label={text.fields.height}
              type="text"
              placeholder="512"
              value={`${height}`}
              onChange={(value) => setHeight(parseInt(value) || 0)}
            />
            <Input
              label={text.fields.steps}
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
        {text.results.results}
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
            {text.results.computeLoad}
            {" : "}
            <Box component="span" sx={{ fontWeight: "bold" }}>
              {format(result?.flops, UNITS.flops)}
            </Box>
          </Box>
          <Box>
            {text.results.latency}
            {" : "}
            <Box component="span" sx={{ fontWeight: "bold" }}>
              {formatDuration(result?.latency)}
            </Box>
          </Box>
        </Stack>
        <Stack className="group" direction="row" spacing={1}>
          <Box>
            {text.results.duration}
            {" : "}
            <Box component="span" sx={{ fontWeight: "bold" }}>
              {formatDuration(result?.duration)}
            </Box>
          </Box>
          <Box>
            {text.results.throughput}
            {" : "}
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
          {text.results.energy}
          {" : "}
          <Box component="span" sx={{ fontWeight: "bold" }}>
            {format(result?.wh.total, UNITS.wh)}
          </Box>
        </Box>
        <Bar
          colors={COLORS}
          units={UNITS.wh}
          values={[
            { label: text.results.gpu, value: result?.wh.gpu },
            { label: text.results.cpu, value: result?.wh.cpu },
            { label: text.results.ram, value: result?.wh.ram },
            { label: text.results.storage, value: result?.wh.storage },
            { label: text.results.chassis, value: result?.wh.enclosure },
          ]}
        />
        <Box>
          {text.results.emissions}
          {" : "}
          <Box component="span" sx={{ fontWeight: "bold" }}>
            {format(result?.gwp.total, UNITS.gwp)}
          </Box>
        </Box>
        <Bar
          colors={COLORS}
          units={UNITS.gwp}
          values={[
            {
              label: text.results.gpu,
              value: result?.gwp.energy.gpu + result?.gwp.embodied.gpu,
            },
            {
              label: text.results.cpu,
              value: result?.gwp.energy.cpu + result?.gwp.embodied.cpu,
            },
            {
              label: text.results.ram,
              value: result?.gwp.energy.ram + result?.gwp.embodied.ram,
            },
            {
              label: text.results.storage,
              value: result?.gwp.energy.storage + result?.gwp.embodied.storage,
            },
            {
              label: text.results.chassis,
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
              label: text.results.operational,
              value: result?.gwp.energy.total,
            },
            {
              label: text.results.embodied,
              value: result?.gwp.embodied.total,
            },
          ]}
        />
      </Stack>
    </Stack>
  );
};
