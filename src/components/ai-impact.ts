export type ModelArchitecture =
  | "dense"
  | "moe"
  | "unet"
  | "dit"
  | "hybrid"
  | "audio";

export type UseCase =
  | "training"
  | "fine-tuning"
  | "text-inference"
  | "image-inference"
  | "video-inference"
  | "audio-inference";

export type ImageProfile = {
  spatialPatch: number;
  hiddenSize: number;
  layers: number;
};

export type VideoProfile = {
  spatialPatch: number;
  temporalCompression: number;
  hiddenSize: number;
  layers: number;
  frameBucket?: number;
};

export type AudioProfile = {
  sampleRate: number;
  temporalDownscale: number;
  steps: number;
  codebooks?: number;
  hiddenSize?: number;
  layers?: number;
};

export type CuratedModel = {
  label: string;
  value: string;
  provider: string;
  category:
    | "general"
    | "code"
    | "multimodal"
    | "open_weight"
    | "compact"
    | "reasoning"
    | "image"
    | "video"
    | "audio";
  architecture: ModelArchitecture;
  parameters: [number, number];
  estimated: boolean;
  source: string;
  useCases: UseCase[];
  promptModel?: string;
  image?: ImageProfile;
  video?: VideoProfile;
  audio?: AudioProfile;
};

type RawCuratedModel = Omit<CuratedModel, "useCases"> & {
  useCases?: UseCase[];
};

export type Parts = {
  cpu: number;
  ram: number;
  storage: number;
  gpu: number;
  enclosure: number;
  total: number;
};

export type AiImpactResult = {
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

export type AiImpactInput = {
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
  duration?: number;
  sampleRate?: number;
  cache: number;
};

export type RegionGroupKey = "europe" | "americas" | "asia" | "global";

export type RegionKey =
  | "eu"
  | "de"
  | "fr"
  | "ie"
  | "no"
  | "uk"
  | "ca"
  | "us"
  | "cn"
  | "in"
  | "world";

export type RegionOption = {
  key: RegionKey;
  value: string;
  gwp: number;
};

export type RegionGroup = {
  key: RegionGroupKey;
  options: RegionOption[];
};

const TEXT_USE_CASES: UseCase[] = [
  "training",
  "fine-tuning",
  "text-inference",
];

const useCasesForModel = (model: RawCuratedModel): UseCase[] => {
  if (model.useCases) {
    return model.useCases;
  }
  if (model.category === "image") {
    return ["image-inference"];
  }
  if (model.category === "video") {
    return ["video-inference"];
  }
  if (model.category === "audio") {
    return ["audio-inference"];
  }
  return TEXT_USE_CASES;
};

const RAW_CURATED_MODELS: RawCuratedModel[] = [
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
    category: "image",
    architecture: "dit",
    parameters: [16e9, 16e9],
    estimated: true,
    source: "https://ai.google.dev/gemini-api/docs/models",
    promptModel: "gemini-3.1-pro-preview",
    image: {
      spatialPatch: 2,
      hiddenSize: 3072,
      layers: 40,
    },
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
  {
    label: "Qwen - Qwen-Image",
    value: "qwen-image",
    provider: "qwen",
    category: "image",
    architecture: "dit",
    parameters: [20e9, 20e9],
    estimated: false,
    source: "https://huggingface.co/Qwen/Qwen-Image/blob/refs%2Fpr%2F42/transformer/config.json",
    image: {
      spatialPatch: 2,
      hiddenSize: 3072,
      layers: 60,
    },
  },
  {
    label: "OpenAI - GPT Image 1.5",
    value: "gpt-image-1.5",
    provider: "openai",
    category: "image",
    architecture: "dit",
    parameters: [30e9, 30e9],
    estimated: true,
    source: "https://platform.openai.com/docs/guides/image-generation",
    promptModel: "gpt-5-mini",
    image: {
      spatialPatch: 2,
      hiddenSize: 4096,
      layers: 60,
    },
  },
  {
    label: "OpenAI - GPT Image 1",
    value: "gpt-image-1",
    provider: "openai",
    category: "image",
    architecture: "dit",
    parameters: [30e9, 30e9],
    estimated: true,
    source: "https://platform.openai.com/docs/guides/image-generation",
    promptModel: "gpt-5-mini",
    image: {
      spatialPatch: 2,
      hiddenSize: 4096,
      layers: 60,
    },
  },
  {
    label: "OpenAI - GPT Image mini",
    value: "gpt-image-mini",
    provider: "openai",
    category: "image",
    architecture: "dit",
    parameters: [4e9, 4e9],
    estimated: true,
    source: "https://platform.openai.com/docs/guides/image-generation",
    promptModel: "gpt-5-mini",
    image: {
      spatialPatch: 2,
      hiddenSize: 1536,
      layers: 24,
    },
  },
  {
    label: "Google - Imagen 4",
    value: "imagen-4",
    provider: "google",
    category: "image",
    architecture: "dit",
    parameters: [30e9, 30e9],
    estimated: true,
    source: "https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/imagen-api",
    promptModel: "gemini-3.1-pro-preview",
    image: {
      spatialPatch: 2,
      hiddenSize: 4096,
      layers: 60,
    },
  },
  {
    label: "Stability - Stable Diffusion XL",
    value: "stable-diffusion-xl",
    provider: "stability",
    category: "image",
    architecture: "unet",
    parameters: [2.6e9, 2.6e9],
    estimated: true,
    source: "https://arxiv.org/abs/2307.01952",
  },
  {
    label: "Stability - Stable Diffusion 3.5 Large",
    value: "stable-diffusion-3.5-large",
    provider: "stability",
    category: "image",
    architecture: "dit",
    parameters: [8e9, 8e9],
    estimated: true,
    source: "https://stability.ai/news/introducing-stable-diffusion-3-5",
    image: {
      spatialPatch: 2,
      hiddenSize: 2048,
      layers: 30,
    },
  },
  {
    label: "Black Forest Labs - FLUX.1",
    value: "flux-1",
    provider: "blackforest",
    category: "image",
    architecture: "dit",
    parameters: [12e9, 12e9],
    estimated: true,
    source: "https://blackforestlabs.ai/flux-1/",
    image: {
      spatialPatch: 2,
      hiddenSize: 3072,
      layers: 30,
    },
  },
  {
    label: "Midjourney - V7",
    value: "midjourney-v7",
    provider: "midjourney",
    category: "image",
    architecture: "dit",
    parameters: [30e9, 30e9],
    estimated: true,
    source: "https://docs.midjourney.com/",
    promptModel: "gpt-5-mini",
    image: {
      spatialPatch: 2,
      hiddenSize: 4096,
      layers: 60,
    },
  },
  {
    label: "Stability - Stable Video Diffusion",
    value: "stable-video-diffusion",
    provider: "stability",
    category: "video",
    architecture: "unet",
    parameters: [1.5e9, 1.5e9],
    estimated: true,
    source: "video benchmark preset",
    video: {
      spatialPatch: 1,
      temporalCompression: 1,
      hiddenSize: 0,
      layers: 0,
    },
  },
  {
    label: "Pika - Pika 1.0",
    value: "pika-1",
    provider: "pika",
    category: "video",
    architecture: "unet",
    parameters: [1.5e9, 1.5e9],
    estimated: true,
    source: "video benchmark preset",
    video: {
      spatialPatch: 1,
      temporalCompression: 1,
      hiddenSize: 0,
      layers: 0,
    },
  },
  {
    label: "THUDM - CogVideoX-2B",
    value: "cogvideox-2b",
    provider: "thudm",
    category: "video",
    architecture: "hybrid",
    parameters: [2e9, 2e9],
    estimated: true,
    source: "video benchmark preset",
    video: {
      spatialPatch: 2,
      temporalCompression: 4,
      hiddenSize: 1920,
      layers: 30,
      frameBucket: 49,
    },
  },
  {
    label: "THUDM - CogVideoX-5B",
    value: "cogvideox-5b",
    provider: "thudm",
    category: "video",
    architecture: "hybrid",
    parameters: [5e9, 5e9],
    estimated: true,
    source: "video benchmark preset",
    video: {
      spatialPatch: 2,
      temporalCompression: 4,
      hiddenSize: 1920,
      layers: 30,
      frameBucket: 49,
    },
  },
  {
    label: "Alibaba - WAN 2.1 T2V 1.3B",
    value: "wan-2.1-t2v-1.3b",
    provider: "alibaba",
    category: "video",
    architecture: "dit",
    parameters: [1.3e9, 1.3e9],
    estimated: true,
    source: "video benchmark preset",
    video: {
      spatialPatch: 2,
      temporalCompression: 4,
      hiddenSize: 1536,
      layers: 30,
    },
  },
  {
    label: "Alibaba - WAN 2.1 T2V 14B",
    value: "wan-2.1-t2v-14b",
    provider: "alibaba",
    category: "video",
    architecture: "dit",
    parameters: [14e9, 14e9],
    estimated: true,
    source: "video benchmark preset",
    video: {
      spatialPatch: 2,
      temporalCompression: 4,
      hiddenSize: 5120,
      layers: 40,
    },
  },
  {
    label: "Genmo - Mochi 1",
    value: "mochi-1",
    provider: "genmo",
    category: "video",
    architecture: "dit",
    parameters: [10e9, 10e9],
    estimated: true,
    source: "video benchmark preset",
    video: {
      spatialPatch: 2,
      temporalCompression: 1,
      hiddenSize: 2048,
      layers: 30,
    },
  },
  {
    label: "OpenAI - Sora",
    value: "sora",
    provider: "openai",
    category: "video",
    architecture: "dit",
    parameters: [10e9, 10e9],
    estimated: true,
    source: "video benchmark preset",
    video: {
      spatialPatch: 2,
      temporalCompression: 1,
      hiddenSize: 2048,
      layers: 30,
    },
  },
  {
    label: "OpenAI - GPT-4o mini TTS",
    value: "gpt-4o-mini-tts",
    provider: "openai",
    category: "audio",
    architecture: "audio",
    parameters: [4e9, 4e9],
    estimated: true,
    source: "https://platform.openai.com/docs/guides/text-to-speech",
    promptModel: "gpt-5-mini",
    audio: {
      sampleRate: 24000,
      temporalDownscale: 320,
      steps: 1,
      codebooks: 8,
    },
  },
  {
    label: "Audio - AudioLDM2 Large",
    value: "audioldm2-large",
    provider: "audio",
    category: "audio",
    architecture: "unet",
    parameters: [1.5e9, 1.5e9],
    estimated: true,
    source: "https://arxiv.org/abs/2308.05734",
    audio: {
      sampleRate: 16000,
      temporalDownscale: 320,
      steps: 200,
    },
  },
  {
    label: "Stability - Stable Audio Open",
    value: "stable-audio-open",
    provider: "stability",
    category: "audio",
    architecture: "dit",
    parameters: [1.2e9, 1.2e9],
    estimated: true,
    source: "https://arxiv.org/abs/2407.14358",
    audio: {
      sampleRate: 44100,
      temporalDownscale: 2048,
      steps: 100,
      hiddenSize: 1536,
      layers: 24,
    },
  },
  {
    label: "Meta - MusicGen Large",
    value: "musicgen-large",
    provider: "meta",
    category: "audio",
    architecture: "audio",
    parameters: [3.3e9, 3.3e9],
    estimated: false,
    source: "https://arxiv.org/abs/2306.05284",
    audio: {
      sampleRate: 32000,
      temporalDownscale: 640,
      steps: 1,
      codebooks: 4,
    },
  },
  {
    label: "Suno - Suno",
    value: "suno",
    provider: "suno",
    category: "audio",
    architecture: "audio",
    parameters: [10e9, 10e9],
    estimated: true,
    source: "https://suno.com/",
    promptModel: "gpt-5-mini",
    audio: {
      sampleRate: 44100,
      temporalDownscale: 512,
      steps: 1,
      codebooks: 8,
    },
  },
  {
    label: "Udio - Udio",
    value: "udio",
    provider: "udio",
    category: "audio",
    architecture: "audio",
    parameters: [10e9, 10e9],
    estimated: true,
    source: "https://www.udio.com/",
    promptModel: "gpt-5-mini",
    audio: {
      sampleRate: 44100,
      temporalDownscale: 512,
      steps: 1,
      codebooks: 8,
    },
  },
];

export const CURATED_MODELS: CuratedModel[] = RAW_CURATED_MODELS.map(
  (model) => ({
    ...model,
    useCases: useCasesForModel(model),
  }),
);

export const MODELS = CURATED_MODELS.map(
  ({
    label,
    value,
    architecture,
    parameters,
    useCases,
    promptModel,
    image,
    video,
    audio,
  }) => ({
    label,
    value,
    architecture,
    parameters,
    useCases,
    promptModel,
    image,
    video,
    audio,
  }),
);

export const PROVIDER_LABELS: Record<string, string> = {
  alibaba: "Alibaba",
  anthropic: "Anthropic",
  deepseek: "DeepSeek",
  genmo: "Genmo",
  google: "Google",
  blackforest: "Black Forest Labs",
  meta: "Meta",
  midjourney: "Midjourney",
  mistral: "Mistral",
  openai: "OpenAI",
  pika: "Pika",
  qwen: "Qwen",
  stability: "Stability AI",
  suno: "Suno",
  thudm: "THUDM",
  udio: "Udio",
  video: "Video",
  audio: "Audio",
};

export const USE_CASES = [
  { value: "training" },
  { value: "fine-tuning" },
  { value: "text-inference" },
  { value: "image-inference" },
  { value: "video-inference" },
  { value: "audio-inference" },
] as const satisfies ReadonlyArray<{ value: UseCase }>;

export const isUseCase = (value: string): value is UseCase =>
  USE_CASES.some((useCase) => useCase.value === value);

export const HARDWARES = [
  {
    label: "NVIDIA DGX H100 (8 GPU)",
    value: "nvidia-dgx-h100-8",
    cpu_count: 2,
    cpu_power: 350,
    cpu_embodied: 25e3,
    gpu_count: 8,
    gpu_flops: 989e12,
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
    label: "NVIDIA DGX A100 (8 GPU)",
    value: "nvidia-dgx-a100-8",
    cpu_count: 2,
    cpu_power: 225,
    cpu_embodied: 25e3,
    gpu_count: 8,
    gpu_flops: 312e12,
    gpu_power: 400,
    gpu_embodied: 143e3,
    ram: 1e12,
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
    label: "NVIDIA A100 SXM4 (1 GPU)",
    value: "nvidia-a100-sxm4-1",
    cpu_count: 1,
    cpu_power: 250,
    cpu_embodied: 25e3,
    gpu_count: 1,
    gpu_flops: 312e12,
    gpu_power: 400,
    gpu_embodied: 143e3,
    ram: 128e9,
    ram_power: 392e-12,
    ram_embodied: 533e3 / 384e9,
    ssd: 2e12,
    ssd_power: 1.2e-3 / 1e9,
    ssd_embodied: 0.16e3 / 1e9,
    enclosure_units: 1,
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
    gpu_flops: 989e12,
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
    gpu_flops: 2.2e15,
    gpu_power: 1200,
    gpu_embodied: 750e3,
    ram: 0,
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
    gpu_flops: 2.2e15,
    gpu_power: 1200,
    gpu_embodied: 750e3,
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

export const REGION_GROUPS: RegionGroup[] = [
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

export const FLAT_REGIONS: RegionOption[] = REGION_GROUPS.flatMap(
  (group) => group.options,
);

export const PUE_OPTIONS = Array.from({ length: 11 }, (_, index) => {
  const value = (1 + index / 10).toFixed(1);
  return { label: value, value };
});

export const CACHE_ALPHA = 0.1;

export const DEFAULT_VIDEO_PROFILE: VideoProfile = {
  spatialPatch: 1,
  temporalCompression: 1,
  hiddenSize: 2048,
  layers: 30,
  frameBucket: 1,
};

export const DEFAULT_IMAGE_PROFILE: ImageProfile = {
  spatialPatch: 1,
  hiddenSize: 2048,
  layers: 30,
};

export const DEFAULT_AUDIO_PROFILE: AudioProfile = {
  sampleRate: 24000,
  temporalDownscale: 320,
  steps: 50,
  codebooks: 1,
  hiddenSize: 1024,
  layers: 24,
};

const effectiveParameters = (
  architecture: ModelArchitecture,
  Pactive: number,
  Ptotal: number,
) => (architecture === "dense" ? Ptotal : Pactive);

const parametersForModel = (model: (typeof MODELS)[number]) => {
  const {
    architecture,
    parameters: [Pactive, Ptotal],
  } = model;
  return effectiveParameters(architecture, Pactive, Ptotal);
};

export const computeAiImpact = ({
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
  duration: audioDuration = 10,
  sampleRate,
}: AiImpactInput): AiImpactResult => {
  const lifespan = 5 * 365.25 * 24;
  const selectedRegion = FLAT_REGIONS.find(({ value }) => region === value) ??
    FLAT_REGIONS[0] ?? { key: "world", value: "world", gwp: 0.47184 };
  const { gwp } = selectedRegion;
  const selectedModel =
    MODELS.find(({ value }) => model === value) ?? MODELS[0];
  const {
    architecture,
    parameters: [Pactive, Ptotal],
  } = selectedModel;
  const selectedPromptModel = selectedModel.promptModel
    ? MODELS.find(({ value }) => selectedModel.promptModel === value)
    : undefined;
  const selectedHardware =
    HARDWARES.find(({ value }) => hardware === value) ?? HARDWARES[0];
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
  } = selectedHardware;
  const Pcompute = effectiveParameters(architecture, Pactive, Ptotal);
  const Pprompt = selectedPromptModel
    ? parametersForModel(selectedPromptModel)
    : Pcompute;

  let flops = 0;
  let promptFlops = 0;
  let latency;
  let throughput;
  if (useCase === "training") {
    flops = 6 * Ptotal * corpus * 1e9;
  }
  if (useCase === "fine-tuning") {
    const Ptunable = Pcompute * (0.1 / 100); // Hypothesis: 0.1% trainable parameters
    flops = (2 * Ptotal + 4 * Ptunable) * corpus * 1e9;
  }
  if (useCase === "text-inference") {
    promptFlops = Pcompute * prompt;
    flops = promptFlops + 2 * Pcompute * response;
    latency = promptFlops / (gpu_flops * mfu) / gpu_count;
    throughput =
      response / ((2 * Pcompute * response) / (gpu_flops * mfu) / gpu_count);
  }
  if (useCase === "image-inference") {
    const downscaleFactor = 8;
    const latentWidth = Math.floor(width / downscaleFactor);
    const latentHeight = Math.floor(height / downscaleFactor);
    const latentSites = latentWidth * latentHeight;
    promptFlops = Pprompt * prompt;
    if (architecture === "dit" || architecture === "hybrid") {
      const imageProfile = selectedModel.image ?? DEFAULT_IMAGE_PROFILE;
      const spatialPatch = Math.max(imageProfile.spatialPatch, 1);
      const imageTokens =
        Math.ceil(latentWidth / spatialPatch) *
        Math.ceil(latentHeight / spatialPatch);
      flops =
        promptFlops +
        images *
          steps *
          (2 * Pcompute * imageTokens +
            4 *
              imageProfile.layers *
              Math.pow(imageTokens, 2) *
              imageProfile.hiddenSize);
    } else {
      flops = promptFlops + images * steps * 2 * Pcompute * latentSites;
    }
    latency = promptFlops / (gpu_flops * mfu) / gpu_count;
  }
  if (useCase === "video-inference") {
    const downscaleFactor = 8;
    const latentWidth = Math.floor(width / downscaleFactor);
    const latentHeight = Math.floor(height / downscaleFactor);
    const latentSites = latentWidth * latentHeight;
    const videoProfile = selectedModel.video ?? DEFAULT_VIDEO_PROFILE;
    const frameBucket =
      architecture === "hybrid" ? videoProfile.frameBucket ?? 49 : 1;
    const effectiveFrames =
      frameBucket > 1 ? Math.ceil(images / frameBucket) * frameBucket : images;
    promptFlops = Pprompt * prompt;
    if (architecture === "dit" || architecture === "hybrid") {
      const spatialPatch = Math.max(videoProfile.spatialPatch, 1);
      const temporalCompression = Math.max(
        videoProfile.temporalCompression,
        1,
      );
      const latentFrames =
        Math.floor((effectiveFrames - 1) / temporalCompression) + 1;
      const videoTokens =
        latentFrames *
        Math.ceil(latentWidth / spatialPatch) *
        Math.ceil(latentHeight / spatialPatch);
      flops =
        promptFlops +
        steps *
          (2 * Pcompute * videoTokens +
            4 *
              videoProfile.layers *
              Math.pow(videoTokens, 2) *
              videoProfile.hiddenSize);
    } else {
      flops =
        promptFlops +
        effectiveFrames * steps * 2 * Pcompute * latentSites;
    }
    latency = promptFlops / (gpu_flops * mfu) / gpu_count;
  }
  if (useCase === "audio-inference") {
    const audioProfile = selectedModel.audio ?? DEFAULT_AUDIO_PROFILE;
    const effectiveSampleRate = sampleRate ?? audioProfile.sampleRate;
    const temporalDownscale = Math.max(audioProfile.temporalDownscale, 1);
    const audioTokens = Math.ceil(
      (audioDuration * effectiveSampleRate) / temporalDownscale,
    );
    promptFlops = Pprompt * prompt;
    if (architecture === "audio") {
      const codebooks = Math.max(audioProfile.codebooks ?? 1, 1);
      flops = promptFlops + 2 * Pcompute * audioTokens * codebooks;
    } else {
      const hiddenSize = audioProfile.hiddenSize ?? DEFAULT_AUDIO_PROFILE.hiddenSize;
      const layers = audioProfile.layers ?? DEFAULT_AUDIO_PROFILE.layers;
      flops =
        promptFlops +
        audioProfile.steps *
          (2 * Pcompute * audioTokens +
            4 * layers * Math.pow(audioTokens, 2) * hiddenSize);
    }
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
