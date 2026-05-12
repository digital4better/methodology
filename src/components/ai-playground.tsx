import { Input } from "@site/src/components/input";
import Stack from "@mui/system/Stack";
import { useEffect, useState } from "react";
import Box from "@mui/system/Box";
import { Bar } from "@site/src/components/bar";
import { format, formatDuration, UNITS } from "@site/src/format";
import {
  CURATED_MODELS,
  FLAT_REGIONS,
  HARDWARES,
  PUE_OPTIONS,
  PROVIDER_LABELS,
  REGION_GROUPS,
  USE_CASES,
  computeAiImpact,
  isUseCase,
  MODELS,
  type AiImpactResult,
  type UseCase,
} from "@site/src/components/ai-impact";

const COLORS = [
  { bgcolor: "#8ecae6", color: "inherit" },
  { bgcolor: "#219ebc", color: "white" },
  { bgcolor: "#023047", color: "white" },
  { bgcolor: "#ffb703", color: "inherit" },
  { bgcolor: "#fb8500", color: "inherit" },
];

type Lang = "fr" | "en";
const TEXT = {
  fr: {
    categories: {
      compact: "compact",
      code: "code/dev",
      general: "généraliste",
      image: "image",
      multimodal: "multimodal",
      open_weight: "open-weight",
      reasoning: "raisonnement",
      video: "vidéo",
      audio: "audio",
    },
    fields: {
      cache: "Cache",
      corpus: "Corpus (milliard de jetons)",
      duration: "Durée (s)",
      frames: "Frames",
      hardware: "Matériel",
      height: "Hauteur (px)",
      images: "Images",
      model: "Modèle",
      prompt: "Prompt (jetons)",
      pue: "PUE",
      region: "Région",
      response: "Réponse (jetons)",
      sampleRate: "Sample rate (Hz)",
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
      "audio-inference": "Inférence audio",
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
      image: "image",
      multimodal: "multimodal",
      open_weight: "open-weight",
      reasoning: "reasoning",
      video: "video",
      audio: "audio",
    },
    fields: {
      cache: "Cache",
      corpus: "Corpus (billion tokens)",
      duration: "Duration (s)",
      frames: "Frames",
      hardware: "Hardware",
      height: "Height (px)",
      images: "Images",
      model: "Model",
      prompt: "Prompt (tokens)",
      pue: "PUE",
      region: "Region",
      response: "Response (tokens)",
      sampleRate: "Sample rate (Hz)",
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
      "audio-inference": "Audio inference",
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

const CACHE_OPTIONS = Array.from({ length: 101 }, (_, value) => ({
  label: `${value}%`,
  value: `${value}`,
}));

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
  const [duration, setDuration] = useState(10);
  const [sampleRate, setSampleRate] = useState(24000);
  const [result, setResult] = useState<AiImpactResult>();
  const compatibleModels = CURATED_MODELS.filter((item) =>
    item.useCases.includes(useCase),
  );
  const selectedModel = CURATED_MODELS.find(({ value }) => value === model);
  const effectiveModel =
    selectedModel?.useCases.includes(useCase) === true
      ? model
      : compatibleModels[0]?.value ?? model;
  const modelOptions = Object.entries(
    compatibleModels.reduce<Record<string, { label: string; value: string }[]>>(
      (groups, item) => {
        const shortLabel = item.label.replace(/^[^-]+ - /, "");
        const option = {
          label: `${shortLabel} (${text.categories[item.category]})`,
          value: item.value,
        };
        if (!groups[item.provider]) {
          groups[item.provider] = [];
        }
        groups[item.provider].push(option);
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
  useEffect(() => {
    if (model !== effectiveModel) {
      setModel(effectiveModel);
    }
  }, [effectiveModel, model]);
  useEffect(() => {
    setResult(
      computeAiImpact({
        model: effectiveModel,
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
        duration,
        sampleRate,
      }),
    );
  }, [
    effectiveModel,
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
    duration,
    sampleRate,
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
          value={effectiveModel}
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
          useCase === "video-inference" ||
          useCase === "audio-inference") && (
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
              label={
                useCase === "video-inference"
                  ? text.fields.frames
                  : text.fields.images
              }
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
        {useCase === "audio-inference" && (
          <>
            <Input
              label={text.fields.duration}
              type="text"
              placeholder="10"
              value={`${duration}`}
              onChange={(value) => setDuration(parseInt(value) || 0)}
            />
            <Input
              label={text.fields.sampleRate}
              type="text"
              placeholder="24000"
              value={`${sampleRate}`}
              onChange={(value) => setSampleRate(parseInt(value) || 0)}
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
