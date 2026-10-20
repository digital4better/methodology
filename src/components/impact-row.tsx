import { PHASE_COLORS } from "../visual-palette";
import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import { Bar } from './bar';
import { format } from '../format';
import { toDisplayValue } from '../calculations';

export function ImpactRow({ label, embodied, operational, units, labels, lang = "en" }: {
  lang?: string; label: string; embodied: number; operational: number; units: string[];
  labels: { embodied: string; operational: string; total: string };
}) {
  const emb = toDisplayValue(embodied, units);
  const ope = toDisplayValue(operational, units);
  // Electricity is an operational inventory flow; no manufacturing electricity
  // is inventoried here. Do not display an invented embodied zero or total.
  if (units[0] === 'Wh') return <Stack gap={0.75} className="impact-row">
    <Box sx={{ fontWeight: 650 }}>{lang.startsWith('fr') ? 'Électricité d’usage' : 'Operational electricity'}</Box>
    <Box className="impact-values"><strong>{format(ope, units, lang)}</strong></Box>
  </Stack>;
  return <Stack gap={0.75} className="impact-row">
    <Box sx={{ fontWeight: 650 }}>{label}</Box>
    <Box className="impact-values">
      <span>{labels.embodied}: {format(emb, units, lang)}</span>
      <span>{labels.operational}: {format(ope, units, lang)}</span>
      <strong>{labels.total}: {format(emb + ope, units, lang)}</strong>
    </Box>
    <Bar lang={lang} values={[
      { label: labels.embodied, value: Math.max(0, emb) },
      { label: labels.operational, value: Math.max(0, ope) },
    ]} units={units} colors={PHASE_COLORS} />
  </Stack>;
}
