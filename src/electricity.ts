import snapshot from './data/electricity-factors.json';

export const ELECTRICITY_FACTORS = snapshot.countries;
export const ELECTRICITY_SOURCE = snapshot.source;
export const electricityFactor = (indicator: keyof typeof snapshot.countries.FR) =>
  Object.fromEntries(Object.entries(snapshot.countries).map(([country, factors]) => [country, factors[indicator]]));
