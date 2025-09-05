export const UNITS = {
  flops: ["FLOPS", "kFLOPS", "MFLOPS", "GFLOPS", "TFLOPS", "PFLOPS"],
  wh: ["Wh", "kWh", "MWh", "GWh", "TWh", "PWh"],
  gwp: ["gCO2e", "kgCO2e", "tCO2e", "ktCO2e", "MtCO2e", "GtCO2e"],
  tokens: ["tokens/s"],
};

export function format(value: number | undefined, units: string[]) {
  if (value === undefined) return "--";
  const locale = Intl.NumberFormat().resolvedOptions().locale;
  const i = Math.min(
    value >= 1 ? Math.floor(Math.log10(value) / 3) : 0,
    units.length - 1,
  );
  const formatter = new Intl.NumberFormat(locale, {
    style: "decimal",
    maximumFractionDigits: 2,
  });
  return `${formatter.format(value / Math.pow(1000, i))} ${units[i]}`;
}

export function formatDuration(seconds: number | undefined) {
  if (seconds === undefined) return "--";
  if (seconds === 0) return "0s";
  let millis = seconds * 1000;
  const years = Math.floor(millis / (365 * 86400 * 1000));
  millis %= 365 * 86400 * 1000;
  const months = Math.floor(millis / (12 * 86400 * 1000));
  millis %= 12 * 86400 * 1000;
  const days = Math.floor(millis / (86400 * 1000));
  millis %= 86400 * 1000;
  const hours = Math.floor(millis / (3600 * 1000));
  millis %= 3600 * 1000;
  const minutes = Math.floor(millis / (60 * 1000));
  millis %= 60 * 1000;
  seconds = Math.floor(millis / 1000);
  millis %= 1000;
  const parts = [];
  if (years > 0) parts.push(years + " a");
  if (months > 0) parts.push(months + " m");
  if (days > 0) parts.push(days + " j");
  if (hours > 0) parts.push(hours + " h");
  if (minutes > 0) parts.push(minutes + " min");
  if (seconds > 0) parts.push(seconds + " s");
  if (millis > 0) parts.push(Math.round(millis) + " ms");
  return parts.slice(0, 2).join(" ");
}
