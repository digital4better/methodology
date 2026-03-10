export const UNITS = {
  flops: [
    "FLOPS",
    "kFLOPS",
    "MFLOPS",
    "GFLOPS",
    "TFLOPS",
    "PFLOPS",
    "EFLOPS",
    "ZFLOPS",
    "YFLOPS",
  ],
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
  const yearMs = 365.25 * 86400 * 1000;
  const monthMs = yearMs / 12;
  const dayMs = 86400 * 1000;
  const hourMs = 3600 * 1000;
  const minuteMs = 60 * 1000;
  const years = Math.floor(millis / yearMs);
  millis %= yearMs;
  const months = Math.floor(millis / monthMs);
  millis %= monthMs;
  const days = Math.floor(millis / dayMs);
  millis %= dayMs;
  const hours = Math.floor(millis / hourMs);
  millis %= hourMs;
  const minutes = Math.floor(millis / minuteMs);
  millis %= minuteMs;
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
