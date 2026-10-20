import models from './data/hardware-models.json';
import { cpuEmbodiedGwp, ramEmbodiedGwp, ssdEmbodiedGwp, screenArea } from './calculations';

export const HARDWARE_MODELS = models;
export const NODE_FACTORS: Record<string, number> = models.nodeFactors;
export const PROCESSOR_PACKAGING: Record<string, number> = models.processorPackaging;
export const MEMORY_DENSITY: Record<string, number> = models.memory.density;
export const MEMORY_PACKAGING: Record<string, number> = models.memory.packaging;
export const STORAGE_POWER: Record<string, number> = models.storage.powerPerTb;
export const STRUCTURAL_GWP: Record<string, number> = models.structuralGwp;

export const processorGwp = (dieMm2: number, nodeNm: number | string, count = 1, kind = 'cpu') =>
  cpuEmbodiedGwp(dieMm2, count) * (NODE_FACTORS[nodeNm] ?? 1) * (PROCESSOR_PACKAGING[kind] ?? 1);

/** Capacity is PER MODULE; module count is explicit, including for assemblies. */
export const memoryGwp = (capacityGb: number, type: string, modules = 1) =>
  ramEmbodiedGwp(capacityGb, MEMORY_DENSITY[type] ?? 0.625, modules) * (MEMORY_PACKAGING[type] ?? 1);

/** Capacity is PER DRIVE; zero capacity denotes an absent drive in these examples. */
export const storageGwp = (capacityGb: number, type: string, drives = 1) =>
  capacityGb === 0 || drives === 0 ? 0 : type === 'hdd'
    ? models.storage.hddGwp * drives
    : ssdEmbodiedGwp(capacityGb, models.storage.density, drives);

export const displayGwp = (diagonal: number, technology: string) => diagonal === 0 ? 0 :
  screenArea(diagonal) * (models.display.gwpPerCm2[technology] ?? 0.07) + (models.display.baseGwp[technology] ?? 3);
export const displayPower = (diagonal: number, technology: string) =>
  screenArea(diagonal) * (models.display.powerPerCm2[technology] ?? 0.003);
export const batteryGwp = (capacityWh: number, chemistry: string) =>
  capacityWh / 1000 * (models.battery.gwpPerKwh[chemistry] ?? 65);
export const terminalPower = (cpuTdp: number, diagonal: number, technology: string) =>
  cpuTdp * models.powerAssumptions.terminalCpuLoad + displayPower(diagonal, technology) + models.powerAssumptions.terminalAuxiliaryW;

export function serverMemoryGwp(totalGb: number, type: string) {
  const modules = Math.ceil(totalGb / models.assemblyAssumptions.serverMemoryModuleGb);
  return modules === 0 ? 0 : memoryGwp(totalGb / modules, type, modules);
}
export function serverStorageGwp(totalTb: number, type: string) {
  const drives = Math.ceil(totalTb / (type === 'hdd' ? models.assemblyAssumptions.serverHddDriveTb : models.assemblyAssumptions.serverSsdDriveTb));
  return drives === 0 ? 0 : storageGwp(totalTb * 1000 / drives, type, drives);
}

/** A structural example changes only the residual, without reconstructing a whole device. */
export const structuralShare = (knownComponentsKg: number, residualKg: number, years: number) => ({
  total: knownComponentsKg + residualKg,
  annual: (knownComponentsKg + residualKg) / years,
  share: knownComponentsKg + residualKg === 0 ? 0 : residualKg / (knownComponentsKg + residualKg),
});
