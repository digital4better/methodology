const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const vm = require('node:vm');
function load(file) {
  const exports = {};
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
  const resolve = spec => {
    const base = require('node:path').resolve(require('node:path').dirname(file), spec);
    if (base.endsWith('.json')) return {default: JSON.parse(fs.readFileSync(base))};
    return load(base + '.ts');
  };
  vm.runInNewContext(js, {exports, Intl, Math, Number, require: resolve});
  return exports;
}
const c = load('src/calculations.ts');
const f = load('src/format.ts');
const near = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-9, `${actual} ≠ ${expected}`);
// User input must preserve zero and French decimals, and never propagate Infinity.
assert.equal(c.finiteNumber('0', 24), 0);
assert.equal(c.finiteNumber('1,58', 1), 1.58);
assert.equal(c.finiteNumber('Infinity', 24), 24);
assert.equal(c.finiteNumber('', 24), 24);
assert.equal(c.finiteNumber('-1', 24), 0);
// Dimensional checks: one cubic metre is a million mL; one kg is a billion µg.
assert.equal(c.toDisplayValue(1, ['mL eq.','L eq.','m³ eq.']), 1e6);
assert.equal(c.toDisplayValue(1, ['µg Sb eq.','mg Sb eq.','g Sb eq.','kg Sb eq.']), 1e9);
assert.equal(c.toDisplayValue(1, ['µmol H+','mmol H+','mol H+']), 1e6);
// Scale should preserve negative values and very small nonzero impacts.
assert.equal(f.format(Infinity, ['Wh']), '--');
assert.notEqual(f.format(1e-8, ['CTUe']), '0 CTUe');
assert.match(f.format(-1500, ['Wh','kWh']), /kWh$/);
// Exact rectangle geometry; dimensions are in inches, areas in cm².
near(c.screenArea(27) / c.screenArea(6.5), (27 / 6.5) ** 2);
near(c.screenArea(1), 6.4516 * 144 / 337);
// Published CPU example and independent Boavizta RAM/SSD examples.
near(c.cpuEmbodiedGwp(200), 13.08);
near(c.cpuEmbodiedGwp(400, 2), 34.04);
near(c.ramEmbodiedGwp(32, 0.625), 117.86);
near(c.ssdEmbodiedGwp(1000), 51.70082474226804);
assert.equal(c.cpuEmbodiedGwp(200, 0), 0);
assert.equal(c.ramEmbodiedGwp(0, 0.625), 0);
assert.equal(c.ssdEmbodiedGwp(0), 0);
const snapshot = JSON.parse(fs.readFileSync('src/data/electricity-factors.json'));
assert.match(snapshot.commit, /^[a-f0-9]{40}$/);
for (const country of Object.values(snapshot.countries)) {
  assert.equal(country.year, 2025);
  for (const value of Object.values(country)) assert.ok(Number.isFinite(value));
}
console.log('Calculations: input boundaries, units, geometry, published examples and versioned electricity factors passed.');
// Exercise the actual AI calculation, with UI imports stubbed (no browser needed).
const path = require('node:path');
function loadAiModule(file) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS, jsx:ts.JsxEmit.ReactJSX}}).outputText;
  const localRequire = spec => {
    if (spec.endsWith('.json')) return {default: JSON.parse(fs.readFileSync(path.resolve(path.dirname(file), spec)))};
    if (spec === '../calculations') return c;
    if (spec === './ai-media-input') return loadAiModule('src/components/ai-media-input.ts');
    if (spec === '../electricity') return {ELECTRICITY_FACTORS:snapshot.countries};
    if (spec.includes('format')) return f;
    return {};
  };
  vm.runInNewContext(code, {exports, require:localRequire, Intl, Math, Number});
  return exports;
}
const {computeAiImpact: compute} = loadAiModule('src/components/ai-impact.ts');
const scenario = {model:'meta-llama-3.1-405b-instruct',useCase:'text-inference',hardware:'nvidia-dgx-h100-8',pue:1.2,region:'fr',corpus:15000,prompt:100,response:400,cache:0,images:1,width:512,height:512,steps:30};
const base = compute(scenario);
near(base.flops / 1e12, 405.87); // 2 × 405.87e9 × 500 tokens
near(base.gwp.energy.total / base.wh.total, snapshot.countries.FR.gwp); // Wh × kg/kWh = g
near(base.wh.total, Object.entries(base.wh).filter(([key])=>key!=='total').reduce((n,[,v])=>n+v,0));
const cached = compute({...scenario,cache:100});
near(cached.flops / base.flops, 0.82); // Only prompt 20% × 90% avoided
near(cached.duration / base.duration, 0.82);
near(cached.wh.total / base.wh.total, 0.82);
near(cached.gwp.embodied.total / base.gwp.embodied.total, 0.82);
near(cached.latency / base.latency, 0.1);
near(cached.throughput, base.throughput);
const higherPue = compute({...scenario,pue:1.8});
near(higherPue.wh.total / base.wh.total, 1.5);
near(higherPue.gwp.embodied.total, base.gwp.embodied.total); // PUE never multiplies manufacturing
const empty = compute({...scenario,prompt:0,response:0});
assert.equal(empty.wh.total,0);
assert.equal(empty.duration,0);
assert.equal(empty.throughput,undefined);
const invalid = compute({...scenario,prompt:-1,response:Infinity,cache:200,pue:-2});
assert.equal(invalid.wh.total,0);
for (const useCase of ['training','fine-tuning','text-inference','image-inference','video-inference']) {
 const result=compute({...scenario,useCase});
 const visit=value=>{for(const v of Object.values(value)){if(v&&typeof v==='object')visit(v);else if(typeof v==='number')assert.ok(Number.isFinite(v)&&v>=0);}};
 visit(result);
}
console.log('AI: dimensional consistency, prefix cache, PUE boundary, zero workload and all use cases passed.');

// Explicit locale prevents server/client hydration discrepancies.
assert.equal(f.format(1500, ['Wh','kWh'], 'fr'), '1,5 kWh');
assert.equal(f.format(1500, ['Wh','kWh'], 'en'), '1.5 kWh');
// Recompute the documented decimal-capacity H100 scenario from its inputs.
const hostManufacturing = 2 * 25 + 2000 * 533 / 384 + 30000 * 0.16 + 250;
const hostPowerKw = (2 * 350 + 2000 * 0.392 + 30 * 1.2) / 1000;
const gpuHours = 6 * 405e9 * 15e12 / (989e12 * 3600 * 0.4);
const lifetimeHours = 5 * 365.25 * 24;
assert.equal(Math.round(hostManufacturing), 7876);
near(hostPowerKw, 1.52);
assert.equal(Math.round(gpuHours * (0.7 + hostPowerKw / 8) * 1.2 * 0.420 / 1000), 11480);
assert.equal(Math.round(gpuHours / lifetimeHours * (250 + hostManufacturing / 8) / 1000), 721);
console.log('Locales and documented H100 scenario arithmetic passed.');

const scenarios = load('src/scenarios.ts');
const factorFR=snapshot.countries.FR.gwp, factorIE=snapshot.countries.IE.gwp;
const evaluate=(kind,overrides={},inv=scenarios.initialInventory(kind,'fr'))=>scenarios.evaluateScenario(kind,{...scenarios.defaults(kind),...overrides},inv,factorFR,kind==='cloud'?factorIE:factorFR);
// Independent activity totals and documented numerical examples.
const fleet=evaluate('fleet');
near(fleet.energy,10607.6);near(fleet.contributions[0].kg,3795);
near(fleet.subtotal,3795+10607.6*factorFR);
const hosting=evaluate('hosting');near(hosting.energy,65437.2);near(hosting.subtotal,580+65437.2*factorFR);
const efficient=evaluate('hosting',{pue:1.2});near(efficient.energy/hosting.energy,2/3);near(efficient.contributions[0].kg,580);
const cloud=evaluate('cloud');near(cloud.energy,61.65069*1.2);near(cloud.subtotal,9.5+61.65069*1.2*factorIE);
const web=evaluate('web');near(web.activities.find(x=>x.unit==='Go / GB').value,200);near(web.subtotal,200*(100000*60/3600)/(5*8760)+(100000*60/3600*0.04+120)*factorFR+20);
assert.equal(web.contributions.filter(x=>x.kg===null).length,2);
const webKnown=evaluate('web',{fixedFactor:0.1,mobileFactor:0.2});near(webKnown.subtotal-web.subtotal,160*0.1+40*0.2);
const mail=evaluate('mail');near(mail.activities[0].value,36);assert.equal(mail.contributions[0].kg,null);
const mailKnown=evaluate('mail',{storageFactor:0.5});near(mailKnown.subtotal-mail.subtotal,18);
const mobile=evaluate('mobile');near(mobile.activities.find(x=>x.label[1]==='Transfers').value,110);near(mobile.activities.find(x=>x.unit==='h').value,500);
// Missing data differs from a known zero; fixed provisioning persists at zero traffic.
const zero=evaluate('web',{count:0});assert.equal(zero.contributions.filter(x=>x.kg===null).length,0);near(zero.subtotal,20+120*factorFR);assert.equal(zero.functionalCount,0);
assert.ok(evaluate('web',{count:null}).errors.length);assert.ok(evaluate('hosting',{pue:0}).errors.length);assert.ok(evaluate('mail',{readPct:101}).errors.length);assert.ok(evaluate('web',{count:Infinity}).errors.length);
assert.ok(evaluate('fleet',{},[{name:'invalid',quantity:1,embodied:200,life:0,energy:20}]).errors.length);
const half=evaluate('hosting',{share:50});near(half.subtotal,hosting.subtotal/2);
const longer=evaluate('fleet',{},scenarios.initialInventory('fleet','fr').map(row=>({...row,life:row.life*2})));near(longer.energy,fleet.energy);near(longer.contributions[0].kg,fleet.contributions[0].kg/2);
console.log('Six use cases: independently calculated examples, missing factors, zero activity, PUE and allocation conservation passed.');

const ai=loadAiModule('src/components/ai-impact.ts');
for(const useCase of ['image-inference','video-inference','audio-inference']){
 const model=ai.CURATED_MODELS.find(m=>m.useCases.includes(useCase)&&!m.estimated) ?? ai.CURATED_MODELS.find(m=>m.useCases.includes(useCase));
 const input={...scenario,model:model.value,useCase,duration:10,sampleRate:24000};
 const a=compute(input),b=compute({...input,cache:100});
 assert.ok(a.flops>0&&Number.isFinite(a.gwp.total));assert.ok(b.flops<a.flops);near(a.wh.total/b.wh.total,a.duration/b.duration);
}
const moe=compute({...scenario,model:'deepseek-v3',useCase:'training',corpus:1});near(moe.flops,6*37e9*1e9);
near(compute({...scenario,mfu:0.2}).duration/base.duration,2);
near(compute({...scenario,lifetimeYears:10}).gwp.embodied.total/base.gwp.embodied.total,0.5);
console.log('Main integration: image, video and audio, prefix reuse, MoE active parameters, MFU and lifetime passed.');

// Device mix must conserve per-profile impacts, without allocating per-second factors twice.
const mixed=scenarios.terminalFactors('mixed',50);
const hardware = load('src/hardware-models.ts');
const terminals = load('src/terminal-profiles.ts');
const laptop = terminals.terminalConfiguration('laptop'), desktop = terminals.terminalConfiguration('desktop');
near(mixed.power, 0.5 * scenarios.terminalFactors('mobile').power + 0.5 * scenarios.terminalFactors('computer').power);
const webByProfile=(profile,share)=>scenarios.evaluateScenario('web',scenarios.defaults('web'),[],factorFR,factorFR,scenarios.terminalFactors(profile,share));
const allMobile=webByProfile('mixed',100),allComputer=webByProfile('mixed',0),halfDevices=webByProfile('mixed',50);
near(allMobile.subtotal,webByProfile('mobile').subtotal);
near(allComputer.subtotal,webByProfile('computer').subtotal);
near(halfDevices.subtotal,(allMobile.subtotal+allComputer.subtotal)/2);
near(halfDevices.contributions[0].kg, 6000000 * mixed.embodied);
near(halfDevices.contributions[1].kwh, 100000 * 60 / 3600 * mixed.power / 1000);
near(scenarios.terminalFactors('desktop').power, desktop.power);
near(scenarios.terminalFactors('desktop').embodied, desktop.manufacturing / (desktop.life * 8760 * 3600));
// Independent assembly checks: same module, drive and display in every illustration.
near(hardware.memoryGwp(32, 'ddr5', 16), 1330.912);
near(hardware.serverMemoryGwp(512, 'ddr5'), hardware.memoryGwp(32, 'ddr5', 16));
near(laptop.components.memory, 44.462);
near(hardware.serverStorageGwp(8, 'ssd_nvme'), hardware.storageGwp(2000, 'ssd_nvme', 4));
near(laptop.components.cpu, hardware.processorGwp(150, 7));
near(laptop.components.display, hardware.displayGwp(14, 'lcd'));
near(laptop.components.battery, hardware.batteryGwp(56, 'nmc'));
near(hardware.serverMemoryGwp(0, 'ddr5'), 0);
near(hardware.serverStorageGwp(0, 'hdd'), 0);
near(hardware.structuralShare(140, 8, 5).total, 148);
near(hardware.structuralShare(0, 0, 5).share, 0);
console.log('Device profiles: weighted endpoints, impact conservation, per-second allocation and desktop/display composition passed.');

// Input media: independently counted positions, padding, caching boundary and integration.
const media = loadAiModule('src/components/ai-media-input.ts');
const imageInput = {...scenario, model:'qwen2.5-vl-7b-input', useCase:'image-analysis', width:448, height:448};
const imageWork = media.computeMediaInput('image-analysis', imageInput);
assert.equal(imageWork.tokens, 256); // 32 × 32 patches, then merge 2 × 2.
assert.equal(imageWork.units, 1);
near(imageWork.conditioning, 2 * 7.61e9 * (100 + 256));
near(imageWork.output, 2 * 7.61e9 * 400);
// 32 layers: QKV+output and SwiGLU; 4 global and 28 window attention layers.
const expectedVision = 2*1024*(3*2*14*14)*1280
  +32*1024*(8*1280**2+6*1280*3420)
  +4*1280*(4*1024**2+28*16*64**2)
  +2*256*(5120**2+5120*3584);
near(imageWork.encoder, expectedVision);
const img = compute(imageInput);
near(img.flops, expectedVision + 2*7.61e9*(100+256+400));
const imgCached = compute({...imageInput,cache:100});
near(imgCached.mediaInput.encoder, img.mediaInput.encoder);
near((img.flops-imgCached.flops)/1e9, 2*7.61*90); // Text only; never discard image work.
near(imgCached.mediaInput.output, img.mediaInput.output);
const video = compute({...imageInput,useCase:'video-analysis',duration:30,inputFps:1});
assert.equal(video.mediaInput.frames,30);assert.equal(video.mediaInput.units,15);
assert.equal(video.mediaInput.tokens,3840);near(video.mediaInput.encoder,15*expectedVision);
const sparseVideo = compute({...imageInput,useCase:'video-analysis',duration:1,inputFps:1});
assert.equal(sparseVideo.mediaInput.units,1); // Odd frame repeated for temporal pairing.
const audioInput={...scenario,model:'whisper-base-input',useCase:'audio-analysis',duration:30,response:100};
const aud = compute(audioInput);
const expectedAudioEncoder=2*3000*80*512*3+2*1500*512**2*3+6*(24*1500*512**2+4*1500**2*512);
near(aud.mediaInput.encoder,expectedAudioEncoder);
near(aud.mediaInput.conditioning,6*4*1500*512**2);
near(aud.mediaInput.output,6*(28*100*512**2+2*512*100*101+4*1500*100*512)+2*100*512*51865);
near(compute({...audioInput,duration:1}).flops,aud.flops); // Padded fixed window.
near(compute({...audioInput,duration:31}).mediaInput.encoder,2*expectedAudioEncoder);
near(compute({...audioInput,cache:100,prompt:1e5}).flops,aud.flops); // No prefix control in transcription.
assert.equal(compute({...audioInput,duration:0}).flops,0);
assert.equal(compute({...audioInput,response:449}).mediaInput.contextExceeded,true);
assert.equal(compute({...imageInput,images:1000}).mediaInput.contextExceeded,true);
for(const useCase of ['image-analysis','video-analysis','audio-analysis']) {
 const result=compute({...imageInput,useCase,images:Infinity,width:-1,duration:NaN,inputFps:Infinity});
 assert.ok(Number.isFinite(result.flops)&&result.flops>=0);
}
console.log('Media inputs: vision operation counts, spatial/temporal merging, Whisper chunks, prefix boundaries and context guards passed.');
