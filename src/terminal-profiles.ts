import configurations from './data/hardware-configurations.json';
import { processorGwp, memoryGwp, storageGwp, displayGwp, batteryGwp, terminalPower, STRUCTURAL_GWP, HARDWARE_MODELS } from './hardware-models';

export function terminalConfiguration(key: string) {
  const c = configurations.terminals[key] as Record<string, string> | undefined;
  if (!c) throw new Error(`Unknown terminal configuration: ${key}`);
  const components = {
    cpu: processorGwp(+c.cpuDie, +c.cpuNode),
    memory: memoryGwp(+c.ram, c.ramType),
    storage: storageGwp(+c.storage, c.storageType),
    display: displayGwp(+c.screenDiag, c.screenTech),
    battery: batteryGwp(+c.battery, c.batteryChem),
    structure: STRUCTURAL_GWP[key],
  };
  const manufacturing = Object.values(components).reduce((a, b) => a + b, 0);
  return {
    components, manufacturing, life: +c.lifetime,
    power: terminalPower(+c.cpuTdp, +c.screenDiag, c.screenTech),
    embodied: manufacturing / (+c.lifetime * 8760 * 3600),
  };
}
const labels: Record<string, [string, string]> = {
  laptop: ['Portable (configuration illustrative)', 'Laptop (illustrative configuration)'],
  desktop: ['Fixe avec écran (configuration illustrative)', 'Desktop with display (illustrative configuration)'],
  smartphone: ['Smartphone (configuration illustrative)', 'Smartphone (illustrative configuration)'],
  tablet: ['Tablette (configuration illustrative)', 'Tablet (illustrative configuration)'],
};
const individual = Object.fromEntries(Object.entries(labels).map(([key, label]) => [key, { label, ...terminalConfiguration(key) }]));
function mix(a: string, b: string, weight: number, label: [string, string]) {
  return { label, power: weight * individual[a].power + (1 - weight) * individual[b].power,
    embodied: weight * individual[a].embodied + (1 - weight) * individual[b].embodied };
}
export default {
  revision: HARDWARE_MODELS.version,
  profiles: {
    computer: mix('laptop', 'desktop', 0.6, ['Ordinateur : 60 % portable, 40 % fixe', 'Computer: 60% laptop, 40% desktop']),
    mobile: mix('smartphone', 'tablet', 0.95, ['Mobile : 95 % smartphone, 5 % tablette', 'Mobile: 95% smartphone, 5% tablet']),
    ...individual,
  },
};
