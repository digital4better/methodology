// Reproducible numerical review; --write updates internal reports, never public factors.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const load = require('./lib/load-model.cjs');
const hardware = load('src/hardware-models.ts');
const terminals = load('src/terminal-profiles.ts');
const scenarios = load('src/scenarios.ts');
const ai = load('src/components/ai-impact.ts');
const measured = require('../refactoring-sources/consolidation-v2/ai-measurements.json');
const old = require('../src/data/terminal-profiles.json').profiles;
const electricity = require('../src/data/electricity-factors.json').countries.FR.gwp;
const profiles = Object.entries(terminals.default.profiles).map(([key, after]) => ({key, before: old[key], after}));
const changes = ['web', 'mail', 'mobile'].map(kind => {
  const key = kind === 'web' ? 'mixed' : kind === 'mail' ? 'laptop' : 'smartphone';
  const before = key === 'mixed' ? {power: (old.mobile.power + old.computer.power)/2, embodied: (old.mobile.embodied + old.computer.embodied)/2} : old[key];
  const run = factors => scenarios.evaluateScenario(kind, scenarios.defaults(kind), [], electricity, electricity, factors);
  return {kind, before: run(before), after: run(scenarios.terminalFactors(key, 50))};
});
const componentReport = {version: hardware.HARDWARE_MODELS.version,
  scope: 'Illustrations only; not calibration or production migration',
  ddr5: {before512Gb: 1209.92, after512Gb: hardware.serverMemoryGwp(512, 'ddr5')},
  laptop: terminals.terminalConfiguration('laptop'), profiles, scenarios: changes};
const input = {model: 'meta-llama-3.1-405b-instruct', useCase: 'text-inference', hardware: 'nvidia-dgx-a100-8',
  pue: 1, region: 'fr', cache: 0, mfu: 0.4};
const longIn = ai.computeAiImpact({...input, prompt: 900, response: 100});
const longOut = ai.computeAiImpact({...input, prompt: 100, response: 900});
const modelRatio = longOut.wh.gpu / longIn.wh.gpu;
assert.ok(Number.isFinite(modelRatio));
assert.equal(modelRatio, 1);
const observedRatio = measured.phase.longOutput.gpuWh / measured.phase.longInput.gpuWh;
const measuredBatchRatio = measured.batch.single.gpuWh / (measured.batch.grouped.gpuWh / measured.batch.grouped.prompts);
const aiReport = {
  source: measured.source,
  method: 'Compare structural ratios, not absolute energy between different model/hardware configurations.',
  phase: {measuredRatio: observedRatio, constantMfuProxyRatio: modelRatio,
    conclusion: 'The proxy treats equal total token counts identically. It cannot reproduce the measured input/output asymmetry with one fixed MFU.'},
  batch: {measuredSingleToGroupedPerPromptRatio: measuredBatchRatio, constantMfuProxyRatio: 1,
    conclusion: 'Batch is not represented explicitly. A fixed MFU cannot reproduce this effect; do not apply the observed ratio universally.'},
  calibrationStatus: 'not-calibrated',
  nextEvidence: ['Phase-sensitive duration and energy traces', 'Explicit batch and concurrency', 'Matching model, precision, engine and hardware', 'Idle and whole-server boundary', 'Held-out validation data'],
};
assert.equal(observedRatio, 3.75);
assert.ok(measuredBatchRatio > 35 && measuredBatchRatio < 36);
assert.equal(hardware.serverMemoryGwp(512, 'ddr5'), hardware.memoryGwp(32, 'ddr5', 16));
const finiteTree = value => {
  if (typeof value === 'number') assert.ok(Number.isFinite(value));
  else if (value && typeof value === 'object') Object.values(value).forEach(finiteTree);
};
finiteTree(componentReport); finiteTree(aiReport);
for (const name of ['cpu', 'ram', 'storage', 'display', 'battery', 'terminal', 'server']) {
  assert.match(fs.readFileSync(`src/components/${name}-playground.tsx`, 'utf8'), /from ["']\.\.\/hardware-models["']/);
}
if (process.argv.includes('--write')) {
  fs.writeFileSync('refactoring-sources/consolidation-v2/numerical-changes.json', JSON.stringify(componentReport, null, 2)+'\n');
  fs.writeFileSync('refactoring-sources/consolidation-v2/ai-validation.json', JSON.stringify(aiReport, null, 2)+'\n');
}
console.log('Shared component models: agreement, finite results and migration deltas verified.');
console.log(`AI observations: phase ratio ${observedRatio} vs proxy ${modelRatio}; batch ratio ${measuredBatchRatio.toFixed(2)} vs fixed-MFU proxy 1. Calibration is NOT established.`);
