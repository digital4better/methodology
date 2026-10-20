import models from './data/hardware-models.json';

/** Numeric input in either French or English notation; zero is a valid value. */
export function finiteNumber(value: string, fallback: number): number {
  const normalized = value.trim().replace(',', '.');
  const number = normalized === '' ? NaN : Number(normalized);
  return Number.isFinite(number) ? Math.max(0, number) : fallback;
}

/** Inputs use kg CO2e, kWh, m3, mol H+ or kg Sb eq., respectively. */
export function toDisplayValue(value: number, units: string[]): number {
  const multipliers: Record<string, number> = {
    gCO2e: 1e3, Wh: 1e3, 'mL eq.': 1e6, 'µmol H+': 1e6,
    'µg Sb eq.': 1e9,
  };
  return value * (multipliers[units[0]] ?? 1);
}

export const screenArea = (diagonalInches: number) =>
  diagonalInches ** 2 * 2.54 ** 2 * (16 * 9) / (16 ** 2 + 9 ** 2);

/** Historical CPU model, with no unverified technology-node multiplier. */
export const cpuEmbodiedGwp = (dieMm2: number, units = 1) =>
  units === 0 ? 0 : (dieMm2 * models.cpu.dieGwp + models.cpu.baseGwp) * units;

export const ramEmbodiedGwp = (capacityGb: number, density: number, modules = 1) =>
  capacityGb === 0 || modules === 0 ? 0 : (capacityGb / density * models.memory.dieGwp + models.memory.baseGwp) * modules;

export const ssdEmbodiedGwp = (capacityGb: number, density = models.storage.density, drives = 1) =>
  capacityGb === 0 || drives === 0 ? 0 : (capacityGb / density * models.storage.dieGwp + models.storage.baseGwp) * drives;
