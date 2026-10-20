/** Analytical operation counts, not measured service benchmarks.
 * Configurations: Qwen/Qwen2.5-VL-7B-Instruct and openai/whisper-base.
 * One multiply-add counts as two FLOPs. Nonlinearities, normalization,
 * file decoding, transfers, retries and beam search are outside this proxy.
 */
export type MediaInputKind = 'image-analysis' | 'video-analysis' | 'audio-analysis';
export type MediaInputWork = {
  encoder: number;
  conditioning: number;
  output: number;
  tokens: number;
  units: number;
  frames: number;
  contextExceeded: boolean;
};
export const VISION_INPUT_PROFILE = {
  patch: 14, merge: 2, temporalPatch: 2, hidden: 1280, intermediate: 3420,
  layers: 32, globalLayers: 4, windowPatches: 8, languageParameters: 7.61e9,
  languageHidden: 3584, context: 128000,
  source: 'https://huggingface.co/Qwen/Qwen2.5-VL-7B-Instruct/blob/cc594898137f460bfe9f0759e9844b3ce807cfb5/config.json',
};
export const AUDIO_INPUT_PROFILE = {
  seconds: 30, positions: 1500, hidden: 512, encoderLayers: 6, decoderLayers: 6,
  vocabulary: 51865, sampleRate: 16000, targetPositions: 448,
  source: 'https://huggingface.co/openai/whisper-base/blob/e37978b90ca9030d5170a5c07aadb050351a65bb/config.json',
};
const bounded = (x: number | undefined, max: number, fallback = 0) =>
  x === undefined ? fallback : Number.isFinite(x) ? Math.max(0, Math.min(x, max)) : 0;

export function computeMediaInput(kind: MediaInputKind, input: {
  images: number; width: number; height: number; duration?: number;
  inputFps?: number; prompt: number; response: number; cache: number;
}): MediaInputWork {
  const prompt = bounded(input.prompt, 1e6);
  const response = bounded(input.response, 1e6);
  const seconds = bounded(input.duration, 86400, 10);
  if (kind === 'audio-analysis') {
    const p = AUDIO_INPUT_PROFILE;
    const units = Math.ceil(seconds / p.seconds);
    if (!units) return {encoder:0, conditioning:0, output:0, tokens:0, units:0, frames:0, contextExceeded:false};
    const N = p.positions, d = p.hidden;
    // Fixed padded 30 s windows; transcript tokens distributed evenly.
    const T = response / units;
    const conv = 2 * 3000 * 80 * d * 3 + 2 * N * d * d * 3;
    const encoder = units * (conv + p.encoderLayers * (24 * N * d * d + 4 * N * N * d));
    // Cross-attention K/V projections once per chunk, only if decoding.
    const conditioning = T > 0 ? units * p.decoderLayers * 4 * N * d * d : 0;
    const output = units * (p.decoderLayers * (
      28 * T * d * d + 2 * d * T * (T + 1) + 4 * N * T * d
    ) + 2 * T * d * p.vocabulary);
    return {encoder, conditioning, output, tokens: units * N, units, frames:0,
      contextExceeded:T > p.targetPositions};
  }
  const p = VISION_INPUT_PROFILE;
  // Dimensions are the processed dimensions, rounded up to a multiple of 28.
  const gridW = Math.ceil(bounded(input.width, 8192) / (p.patch * p.merge)) * p.merge;
  const gridH = Math.ceil(bounded(input.height, 8192) / (p.patch * p.merge)) * p.merge;
  const N = gridW * gridH;
  const frames = kind === 'video-analysis'
    ? Math.ceil(seconds * bounded(input.inputFps, 60, 1))
    : Math.ceil(bounded(input.images, 10000));
  const units = N === 0 ? 0 : kind === 'video-analysis' ? Math.ceil(frames / p.temporalPatch) : frames;
  // Exact sum of squared window sizes, including incomplete edge windows.
  const axisSquares = (size: number) => Math.floor(size / p.windowPatches) * p.windowPatches ** 2 + (size % p.windowPatches) ** 2;
  const windowSquares = axisSquares(gridW) * axisSquares(gridH);
  const d = p.hidden;
  const patchProjection = 2 * N * (3 * p.temporalPatch * p.patch ** 2) * d;
  const linear = p.layers * N * (8 * d * d + 6 * d * p.intermediate);
  const attention = 4 * d * (p.globalLayers * N * N + (p.layers - p.globalLayers) * windowSquares);
  const merged = N / p.merge ** 2;
  const mergeWidth = d * p.merge ** 2;
  const merger = 2 * merged * (mergeWidth ** 2 + mergeWidth * p.languageHidden);
  const encoder = units * (patchProjection + linear + attention + merger);
  const tokens = units * merged;
  // Prefix reuse applies to text only; media encoding and tokens stay counted.
  const retainedText = prompt * (1 - bounded(input.cache, 100) / 100 * 0.9);
  const conditioning = 2 * p.languageParameters * (retainedText + tokens);
  const output = 2 * p.languageParameters * response;
  return {encoder, conditioning, output, tokens, units, frames,
    contextExceeded:prompt + tokens + response > p.context};
}
