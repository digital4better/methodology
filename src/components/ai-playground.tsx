import { AUDIO_INPUT_PROFILE, VISION_INPUT_PROFILE } from "./ai-media-input";
import Link from "@docusaurus/Link";
import electricity from "../data/electricity-factors.json";
import { finiteNumber } from "../calculations";
import { HARDWARE_COLORS, PHASE_COLORS } from "../visual-palette";
import { Input } from "@site/src/components/input";
import Stack from "@mui/system/Stack";
import { useEffect, useState } from "react";
import Box from "@mui/system/Box";
import { Bar } from "@site/src/components/bar";
import {
  format as formatValue,
  formatDuration as formatDurationValue,
  UNITS,
} from "@site/src/format";
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
  type AiImpactInput,
  type UseCase,
} from "@site/src/components/ai-impact";

const COLORS = [
  HARDWARE_COLORS.gpu,
  HARDWARE_COLORS.cpu,
  HARDWARE_COLORS.ram,
  HARDWARE_COLORS.storage,
  HARDWARE_COLORS.enclosure,
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
      cache: "Cache du préfixe (%)",
      corpus: "Corpus (milliard de jetons)",
      duration: "Durée à générer (s)",
      frames: "Images de la vidéo à générer",
      hardware: "Matériel",
      height: "Hauteur (px)",
      images: "Images à générer",
      model: "Modèle",
      prompt: "Prompt (jetons)",
      pue: "PUE",
      region: "Région",
      response: "Réponse texte (jetons)",
      sampleRate: "Fréquence d’échantillonnage (Hz)",
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
      "audio-inference": "Générer de l’audio",
      "image-analysis": "Analyser des images → texte",
      "video-analysis": "Analyser une vidéo → texte",
      "audio-analysis": "Transcrire un audio → texte",
      "image-inference": "Générer des images",
      training: "Entrainement",
      "text-inference": "Générer du texte",
      "video-inference": "Générer une vidéo",
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
      cache: "Prefix cache (%)",
      corpus: "Corpus (billion tokens)",
      duration: "Duration to generate (s)",
      frames: "Frames to generate",
      hardware: "Hardware",
      height: "Height (px)",
      images: "Images to generate",
      model: "Model",
      prompt: "Prompt (tokens)",
      pue: "PUE",
      region: "Region",
      response: "Text response (tokens)",
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
      "audio-inference": "Generate audio",
      "image-analysis": "Analyze images → text",
      "video-analysis": "Analyze video → text",
      "audio-analysis": "Transcribe audio → text",
      "image-inference": "Generate images",
      training: "Training",
      "text-inference": "Generate text",
      "video-inference": "Generate video",
    },
  },
} as const;

const CASE_LIMITS: Record<UseCase, [string, string]> = {
  training: ["Le proxy 6PT couvre un traitement ; préparation des données, essais abandonnés et évaluations sont à ajouter.", "The 6PT proxy covers one run; add data preparation, discarded runs and evaluations."],
  "fine-tuning": ["Le proxy 6PT suppose une rétropropagation complète. Aucun gain LoRA n’est appliqué sans mesure.", "The 6PT proxy assumes full backpropagation. No LoRA saving is applied without measurement."],
  "text-inference": ["Le proxy 2PT simplifie l’attention longue et le routage MoE. Le cache de préfixe réduit le prompt seulement.", "The 2PT proxy simplifies long-context attention and MoE routing. Prefix caching reduces the prompt only."],
  "image-inference": ["Profil de génération exploratoire ; décodage VAE et traitements de sortie non détaillés. Pas d’édition d’image en entrée.", "Exploratory generation profile; VAE decoding and output processing are not detailed. No input-image editing."],
  "video-inference": ["Profil de génération exploratoire ; les images temporelles ne sont pas des vidéos. Décodage et piste audio non détaillés.", "Exploratory generation profile; frames are not videos. Decoding and audio track are not detailed."],
  "audio-inference": ["Profil audio à calibrer ; codecs, traitements de sortie et exécution réelle des codebooks ne sont pas détaillés.", "Audio profile needs calibration; codecs, output processing and actual codebook execution are not detailed."],
  "image-analysis": ["Qwen2.5-VL : résolution déjà redimensionnée, attention longue du langage simplifiée. Le contrôle de contexte ne vérifie pas la mémoire GPU.", "Qwen2.5-VL: already-resized resolution, simplified long-context language attention. Context checks do not validate GPU memory."],
  "video-analysis": ["Échantillonnage visuel uniquement, sans piste audio. L’encodage des fichiers et la faisabilité mémoire ne sont pas évalués.", "Visual sampling only, without audio. File decoding and memory feasibility are not assessed."],
  "audio-analysis": ["Whisper : blocs complétés de 30 s, transcription répartie également. Recherche en faisceau, essais et détection de silence exclus.", "Whisper: padded 30 s chunks, evenly distributed transcript. Beam search, retries and silence detection excluded."],
};

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
  methodologyHref,
}: {
  embedded?: boolean;
  lang?: string;
  methodologyHref?: string;
}) => {
  const [locale, setLocale] = useState<Lang>(() => resolveLang(lang));
  useEffect(() => {
    setLocale(resolveLang(lang));
  }, [lang]);
  const text = TEXT[locale];
  const format = (value: number, units: string[]) =>
    formatValue(value, units, locale);
  const formatDuration = (value: number) => formatDurationValue(value, locale);
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
  const [useCase, setUseCase] = useState<UseCase>("text-inference");
  const isAnalysis = useCase.endsWith("analysis");
  const [inputImages, setInputImages] = useState(1);
  const [inputResolution, setInputResolution] = useState(448);
  const [inputSeconds, setInputSeconds] = useState(30);
  const [inputFps, setInputFps] = useState(1);
  const [transcriptTokens, setTranscriptTokens] = useState(100);
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
  const [mfu, setMfu] = useState(0.4);
  const [lifetimeYears, setLifetimeYears] = useState(5);
  const compatibleModels = CURATED_MODELS.filter((item) =>
    item.useCases.includes(useCase),
  );
  const selectedModel = CURATED_MODELS.find(({ value }) => value === model);
  const effectiveModel =
    selectedModel?.useCases.includes(useCase) === true
      ? model
      : (compatibleModels.find((item) => !item.estimated)?.value ??
        compatibleModels[0]?.value ??
        model);
  const modelOptions = Object.entries(
    compatibleModels.reduce<Record<string, { label: string; value: string }[]>>(
      (groups, item) => {
        const shortLabel = item.label.replace(/^[^-]+ - /, "");
        const option = {
          label: `${shortLabel} (${text.categories[item.category]}${item.estimated ? (locale === "fr" ? ", paramètres supposés" : ", assumed parameters") : ""})`,
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
    const profile = CURATED_MODELS.find(
      (item) => item.value === effectiveModel,
    )?.audio;
    if (useCase === "audio-inference" && profile)
      setSampleRate(profile.sampleRate);
  }, [effectiveModel, useCase]);
  const input: AiImpactInput = {
    model: effectiveModel,
    useCase,
    hardware,
    pue,
    region,
    corpus,
    prompt,
    response: useCase === "audio-analysis" ? transcriptTokens : response,
    cache: useCase === "audio-analysis" ? 0 : cache,
    images: isAnalysis ? inputImages : images,
    width: isAnalysis ? inputResolution : width,
    height: isAnalysis ? inputResolution : height,
    steps,
    duration: isAnalysis ? inputSeconds : duration,
    inputFps,
    sampleRate,
    mfu,
    lifetimeYears,
  };
  const result = computeAiImpact(input);
  const outsideContext = result.mediaInput?.contextExceeded ?? false;
  const profileModel = CURATED_MODELS.find((m) => m.value === effectiveModel);
  const profileHardware = HARDWARES.find((h) => h.value === hardware);
  const parameterNames: Record<string, [string, string]> = {
    gpu_count: ["GPU par serveur", "GPUs per server"],
    gpu_flops: ["Débit par GPU (TFLOP/s)", "Throughput per GPU (TFLOP/s)"],
    gpu_power: ["Puissance par GPU (W)", "Power per GPU (W)"],
    gpu_embodied: [
      "Fabrication par GPU (kg CO₂e)",
      "Manufacture per GPU (kg CO₂e)",
    ],
    cpu_count: ["CPU par serveur", "CPUs per server"],
    cpu_power: ["Puissance par CPU (W)", "Power per CPU (W)"],
    cpu_embodied: [
      "Fabrication par CPU (kg CO₂e)",
      "Manufacture per CPU (kg CO₂e)",
    ],
    ram: ["RAM (Go)", "RAM (GB)"],
    ram_power: ["Puissance RAM (W/Go)", "RAM power (W/GB)"],
    ram_embodied: [
      "Fabrication RAM (kg CO₂e/Go)",
      "RAM manufacture (kg CO₂e/GB)",
    ],
    ssd: ["SSD (Go)", "SSD (GB)"],
    ssd_power: ["Puissance SSD (W/Go)", "SSD power (W/GB)"],
    ssd_embodied: [
      "Fabrication SSD (kg CO₂e/Go)",
      "SSD manufacture (kg CO₂e/GB)",
    ],
    enclosure_power: ["Puissance auxiliaire (W)", "Auxiliary power (W)"],
    enclosure_embodied: [
      "Fabrication châssis (kg CO₂e)",
      "Enclosure manufacture (kg CO₂e)",
    ],
    spatialPatch: ["Côté du patch spatial", "Spatial patch size"],
    hiddenSize: ["Dimension cachée", "Hidden size"],
    layers: ["Couches", "Layers"],
    temporalCompression: ["Compression temporelle", "Temporal compression"],
    frameBucket: ["Regroupement d’images", "Frame bucket"],
    sampleRate: ["Échantillonnage du profil (Hz)", "Profile sample rate (Hz)"],
    temporalDownscale: ["Réduction temporelle", "Temporal downscale"],
    steps: ["Étapes du profil", "Profile steps"],
    codebooks: ["Codebooks", "Codebooks"],
  };
  const fr = locale === "fr";
  const number = (value: number) => new Intl.NumberFormat(locale, {
    maximumSignificantDigits: 6,
  }).format(value);
  type ParameterRow = [string, string | number];
  const modelRows: ParameterRow[] = [
    ["Architecture", profileModel?.architecture ?? ""],
    [fr ? "Paramètres actifs" : "Active parameters",
      `${number((profileModel?.parameters[0] ?? 0) / 1e9)} ${fr ? "milliards" : "billion"}`],
    [fr ? "Paramètres totaux" : "Total parameters",
      `${number((profileModel?.parameters[1] ?? 0) / 1e9)} ${fr ? "milliards" : "billion"}`],
    ...(profileModel?.promptModel ? [[
      fr ? "Modèle du prompt" : "Prompt model",
      CURATED_MODELS.find((m) => m.value === profileModel.promptModel)?.label ?? profileModel.promptModel,
    ] as ParameterRow] : []),
  ];
  const rowsFor = (profile: object): ParameterRow[] => Object.entries(profile)
    .filter(([key]) => parameterNames[key])
    .map(([key, value]) => [parameterNames[key][fr ? 0 : 1],
      typeof value === "number" ? value * ({
        gpu_flops: 1e-12, ram: 1e-9, ssd: 1e-9,
        ram_power: 1e9, ssd_power: 1e9,
        ram_embodied: 1e6, ssd_embodied: 1e6,
        cpu_embodied: 0.001, gpu_embodied: 0.001, enclosure_embodied: 0.001,
      }[key] ?? 1) : value]);
  const modalityProfile = useCase === "image-inference" ? profileModel?.image
    : useCase === "video-inference" ? profileModel?.video
    : useCase === "audio-inference" ? profileModel?.audio : undefined;
  const hardwareRows = rowsFor(profileHardware ?? {});
  const contextRows: ParameterRow[] = [
    [fr ? "Région électrique" : "Electricity region", text.regions[region] ?? region],
    [fr ? "Facteur électrique" : "Electricity factor",
      `${number(FLAT_REGIONS.find((r) => r.value === region)?.gwp ?? 0)} kg CO₂e/kWh`],
    ["PUE", pue],
    [fr ? "Débit théorique utilisé (MFU)" : "Theoretical throughput used (MFU)", `${number(mfu * 100)} %`],
    [fr ? "Durée de vie du matériel" : "Hardware lifetime", `${number(lifetimeYears)} ${fr ? "ans" : "years"}`],
  ];
  const parameterList = (rows: ParameterRow[]) => (
    <dl className="ai-config-values">
      {rows.map(([label, value]) => <div key={label}>
        <dt>{label.includes("MFU") ? <Link to={"/v2-beta/references/glossaire#mfu"}>{label}</Link> : label}</dt><dd>{typeof value === "number" ? number(value) : value}</dd>
      </div>)}
    </dl>
  );

  return (
    <>
      <Stack
        className="scenario ai-scenario"
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
        </Stack>
        <Stack className="group" direction="row" spacing={2}>
          {(useCase === "training" || useCase === "fine-tuning") && (
            <Input
              label={text.fields.corpus}
              type="number"
              placeholder="15000"
              value={`${corpus}`}
              onChange={(value) => setCorpus(finiteNumber(value, 0))}
            />
          )}
          {(useCase === "text-inference" ||
            useCase === "image-inference" ||
            useCase === "video-inference" ||
            useCase === "audio-inference" ||
            useCase === "image-analysis" || useCase === "video-analysis") && (
            <>
              <Input
                label={text.fields.prompt}
                type="number"
                placeholder="100"
                value={`${prompt}`}
                onChange={(value) => setPrompt(finiteNumber(value, 0))}
              />
              <Input
                className="compact"
                label={text.fields.cache}
                type="select"
                options={CACHE_OPTIONS}
                value={`${cache}`}
                onChange={(value) => setCache(finiteNumber(value, 0))}
              />
            </>
          )}
          {(useCase === "text-inference" || useCase === "image-analysis" || useCase === "video-analysis") && (
            <Input
              label={text.fields.response}
              type="number"
              placeholder="400"
              value={`${response}`}
              onChange={(value) => setResponse(finiteNumber(value, 0))}
            />
          )}
          {isAnalysis && <>
            {useCase === "image-analysis" && <Input label={fr ? "Images en entrée" : "Input images"} type="number" value={`${inputImages}`} onChange={v => setInputImages(Math.min(10000, Math.ceil(finiteNumber(v, 0))))} />}
            {useCase !== "audio-analysis" && <Input label={fr ? "Résolution traitée par image" : "Processed resolution per frame"} type="select" value={`${inputResolution}`} options={[224,448,896].map(n=>({label:`${n} × ${n} px`,value:`${n}`}))} onChange={v=>setInputResolution(Number(v))} />}
            {useCase !== "image-analysis" && <Input label={fr ? "Durée du média en entrée (s)" : "Input media duration (s)"} type="number" value={`${inputSeconds}`} onChange={v=>setInputSeconds(Math.min(86400,finiteNumber(v,0)))} />}
            {useCase === "video-analysis" && <Input label={fr ? "Images analysées par seconde" : "Analyzed frames per second"} type="select" value={`${inputFps}`} options={[0.5,1,2,4].map(n=>({label:`${n}`,value:`${n}`}))} onChange={v=>setInputFps(Number(v))} />}
            {useCase === "audio-analysis" && <Input label={fr ? "Transcription totale (jetons)" : "Total transcript (tokens)"} type="number" value={`${transcriptTokens}`} onChange={v=>setTranscriptTokens(finiteNumber(v,0))} />}
          </>}
          {(useCase === "image-inference" || useCase === "video-inference") && (
            <>
              <Input
                label={
                  useCase === "video-inference"
                    ? text.fields.frames
                    : text.fields.images
                }
                type="number"
                placeholder="1"
                value={`${images}`}
                onChange={(value) => setImages(finiteNumber(value, 0))}
              />
              <Input
                label={text.fields.width}
                type="number"
                placeholder="512"
                value={`${width}`}
                onChange={(value) => setWidth(finiteNumber(value, 0))}
              />
              <Input
                label={text.fields.height}
                type="number"
                placeholder="512"
                value={`${height}`}
                onChange={(value) => setHeight(finiteNumber(value, 0))}
              />
              <Input
                label={text.fields.steps}
                type="number"
                placeholder="30"
                value={`${steps}`}
                onChange={(value) => setSteps(finiteNumber(value, 0))}
              />
            </>
          )}
          {useCase === "audio-inference" && (
            <>
              <Input
                label={text.fields.duration}
                type="number"
                placeholder="10"
                value={`${duration}`}
                onChange={(value) => setDuration(finiteNumber(value, 0))}
              />
              <Input
                label={text.fields.sampleRate}
                type="number"
                placeholder="24000"
                value={`${sampleRate}`}
                onChange={(value) => setSampleRate(finiteNumber(value, 0))}
              />
            </>
          )}
        </Stack>
        <details>
          <summary>
            {locale === "fr"
              ? "Hypothèses de calcul"
              : "Calculation assumptions"}
          </summary>
          <div className="scenario-fields">
            {" "}
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
              onChange={(value) =>
                setPue(Math.max(1, finiteNumber(value, 1.2)))
              }
            />
            <Input
              label={text.fields.region}
              type="select"
              options={regionOptions}
              value={region}
              onChange={(value) => setRegion(value)}
            />
            <Input
              label={
                locale === "fr"
                  ? "MFU : fraction du débit théorique (0,01 à 1)"
                  : "MFU: fraction of theoretical throughput (0.01 to 1)"
              }
              labelHref={"/v2-beta/references/glossaire#mfu"}
              type="number"
              value={`${mfu}`}
              onChange={(v) =>
                setMfu(Math.min(1, Math.max(0.01, finiteNumber(v, 0.4))))
              }
            />
            <Input
              label={
                locale === "fr" ? "Durée de vie (années)" : "Lifetime (years)"
              }
              type="number"
              value={`${lifetimeYears}`}
              onChange={(v) =>
                setLifetimeYears(
                  Math.min(30, Math.max(0.1, finiteNumber(v, 5))),
                )
              }
            />
          </div>
        </details>
        {outsideContext && <p role="status" className="ai-media-notice">{fr
          ? "Ce volume dépasse le contexte du profil. Un volume d’images, une résolution, un échantillonnage ou une sortie plus faibles, ou un traitement fractionné, permettent de respecter cette limite. Aucun impact n’est affiché pour cette configuration."
          : "This volume exceeds the profile context. Fewer images, lower resolution, sampling or output, or a split task can fit within this limit. No impact is shown for this configuration."}</p>}
        <div className="scenario-result" aria-live="polite">
          <div>
            <span>
              {locale === "fr" ? "Serveur : climat" : "Server: climate impact"}
            </span>
            <strong>{outsideContext ? (fr ? "Hors limites" : "Out of bounds") : format(result.gwp.total, UNITS.gwp)}</strong>
          </div>
          <div>
            <span>
              {locale === "fr"
                ? "Électricité, PUE inclus"
                : "Electricity, including PUE"}
            </span>
            <strong>{outsideContext ? "…" : format(result.wh.total, UNITS.wh)}</strong>
          </div>
        </div>
        {result.mediaInput && <p className="ai-media-summary">{fr ? "Entrée comptée : " : "Counted input: "}{number(result.mediaInput.tokens)} {fr ? "positions" : "positions"} · {useCase === "audio-analysis" ? (fr ? "blocs de 30 s : " : "30 s chunks: ") : (fr ? "unités visuelles : " : "visual units: ")}{number(result.mediaInput.units)}</p>}
        <section className="ai-config">
          <h3>
            {fr ? "Configuration utilisée pour ce calcul" : "Configuration used for this calculation"}
            <span className="ai-config-selection">{profileModel?.label} · {profileHardware?.label}</span>
          </h3>
          <p className="ai-config-intro">
            {fr
              ? "Ces valeurs déterminent le résultat ci-dessus et reflètent le modèle sélectionné. La section « Hypothèses de calcul » regroupe les réglages du matériel et des conditions d’utilisation."
              : "These values determine the result above and reflect the selected model. “Calculation assumptions” groups the hardware and operating-condition settings."}
          </p>
          <div className="ai-config-grid">
            <section className="ai-config-section">
              <h4>{fr ? "Modèle sélectionné" : "Selected model"}</h4>
              <p className="ai-config-name">{profileModel?.label}</p>
              <p className="ai-config-note">{profileModel?.estimated
                ? (fr ? "Architecture et taille supposées" : "Assumed architecture and size")
                : (fr ? "Architecture et taille référencées" : "Referenced architecture and size")}</p>
              {parameterList(modelRows)}
              {isAnalysis && <p className="ai-config-note">{useCase === "audio-analysis"
                ? (fr ? "Encodeur 6 couches, décodeur 6 couches, dimension 512 ; 1 500 positions par bloc."
                  : "6 encoder and 6 decoder layers, width 512; 1,500 positions per chunk.")
                : (fr ? "Encodeur visuel : 32 couches, dimension 1 280, patches 14 px, fusion 2 × 2 ; cœur langage ≈ 7,61 milliards de paramètres."
                  : "Visual encoder: 32 layers, width 1,280, 14 px patches, 2 × 2 merge; language core ≈ 7.61 billion parameters.")}
                {" "}<a href={useCase === "audio-analysis" ? AUDIO_INPUT_PROFILE.source : VISION_INPUT_PROFILE.source}>{fr ? "Configuration source" : "Source configuration"}</a>
              </p>}
              {modalityProfile && <section className="ai-config-technical">
                <h5>{fr ? "Profil de la modalité" : "Modality profile"}</h5>
                {parameterList(rowsFor(modalityProfile))}
              </section>}
              <a href={profileModel?.source}>{fr ? "Source du modèle" : "Model source"}</a>
            </section>
            <section className="ai-config-section">
              <h4>{fr ? "Serveur sélectionné" : "Selected server"}</h4>
              <p className="ai-config-name">{profileHardware?.label}</p>
              <p className="ai-config-note">{fr ? "Profil matériel utilisé comme proxy" : "Hardware profile used as a proxy"}</p>
              {parameterList(hardwareRows.filter(([label]) => ["gpu_count", "gpu_flops", "cpu_count", "ram", "ssd"].some(key => parameterNames[key][fr ? 0 : 1] === label)))}
              <section className="ai-config-technical">
                <h5>{fr ? "Puissance et fabrication" : "Power and manufacture"}</h5>
                {parameterList(hardwareRows.filter(([label]) => !["gpu_count", "gpu_flops", "cpu_count", "ram", "ssd"].some(key => parameterNames[key][fr ? 0 : 1] === label)))}
              </section>
            </section>
            <section className="ai-config-section ai-config-conditions">
              <h4>{fr ? "Conditions d’utilisation" : "Operating conditions"}</h4>
              {parameterList(contextRows)}
              <a href={electricity.source}>{fr ? "Facteurs électriques D4B, instantané 2025" : "D4B electricity factors, 2025 snapshot"}</a>
            </section>
          </div>
        </section>
        {!outsideContext && <section className="ai-calculation-breakdown">
          <h3>
            {locale === "fr"
              ? "Détail du calcul et répartition"
              : "Calculation and breakdown"}
          </h3>
          {result.mediaInput && <div className="ai-media-breakdown">{parameterList([
            [fr ? "Encodage du média" : "Media encoding", format(result.mediaInput.encoder, UNITS.flops)],
            [fr ? "Lecture du contexte / attention croisée" : "Context processing / cross-attention", format(result.mediaInput.conditioning, UNITS.flops)],
            [fr ? "Production du texte" : "Text production", format(result.mediaInput.output, UNITS.flops)],
          ])}</div>}
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
              lang={locale}
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
              lang={locale}
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
                  value:
                    result?.gwp.energy.storage + result?.gwp.embodied.storage,
                },
                {
                  label: text.results.chassis,
                  value:
                    result?.gwp.energy.enclosure +
                    result?.gwp.embodied.enclosure,
                },
              ]}
            />
            <Bar
              lang={locale}
              colors={[PHASE_COLORS[1], PHASE_COLORS[0]]}
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
        </section>}
      </Stack>
      <section className="simulator-context ai-result-assumptions" aria-label={fr ? "Hypothèses et limites du résultat" : "Result assumptions and limitations"}>
        <h3>{fr ? "Hypothèses et limites du résultat" : "Result assumptions and limitations"}</h3>
      {isAnalysis && <p >{useCase === "audio-analysis"
        ? (fr ? "Audio en entrée : transcription avec Whisper base, blocs de 30 s à 16 kHz. Le résumé et la synthèse vocale sont des traitements séparés."
          : "Audio input: Whisper base transcription, 30 s chunks at 16 kHz. Summarization and speech generation are separate tasks.")
        : (fr ? "Images ou vidéo en entrée : encodage visuel Qwen2.5-VL puis réponse texte. La résolution désigne l’image après redimensionnement. La piste audio des vidéos n’est pas incluse."
          : "Image or video input: Qwen2.5-VL visual encoding followed by a text response. Resolution means the image after resizing. Video audio tracks are excluded.")}</p>}
        <p><strong>{fr ? "Hypothèses actives : " : "Active assumptions: "}</strong>
          <Link to={"/v2-beta/references/glossaire#mfu"}>MFU</Link> {number(mfu * 100)} % · PUE {number(pue)} · {fr ? "durée de vie " : "lifetime "}{number(lifetimeYears)} {fr ? "ans" : "years"}.
          {" "}{fr ? "Puissances constantes et fabrication issues des profils, allocation au temps actif." : "Constant profile power and manufacturing factors, allocated by active time."}
        </p>
        <p><strong>{fr ? "Limite du cas choisi : " : "Selected case limitation: "}</strong>{CASE_LIMITS[useCase][fr ? 0 : 1]}</p>
        <p><strong>{fr ? "Non inclus : " : "Not included: "}</strong>{fr
          ? "terminaux, réseau externe, capacité inactive, bâtiment et services applicatifs. L’entraînement n’est pas automatiquement réparti sur l’inférence."
          : "devices, external networks, idle capacity, buildings and application services. Training is not automatically allocated to inference."}</p>
        <p>{fr ? "Estimation partielle à calibrer sur des mesures de durée et d’énergie." : "Partial estimate to calibrate against duration and energy measurements."}
          {methodologyHref && <> {" "}<a href={methodologyHref}>{fr ? "Toutes les hypothèses et limites" : "All assumptions and limitations"}</a></>}
        </p>
      </section>
    </>
  );
};
