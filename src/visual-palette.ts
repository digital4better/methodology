/** Shared colours for components, charts and diagram classes in custom.css. */
export const PALETTE = {
  navy: { bgcolor: "var(--d4b-viz-navy)", color: "#fff" },
  coral: { bgcolor: "var(--d4b-viz-coral)", color: "#fff" },
  blue: { bgcolor: "var(--d4b-viz-blue)", color: "#102033" },
  sand: { bgcolor: "var(--d4b-viz-sand)", color: "#102033" },
  rose: { bgcolor: "var(--d4b-viz-rose)", color: "#102033" },
  slate: { bgcolor: "var(--d4b-viz-slate)", color: "#fff" },
};
export const COMPONENT_COLORS = [
  PALETTE.navy,
  PALETTE.blue,
  PALETTE.sand,
  PALETTE.rose,
  PALETTE.slate,
  PALETTE.coral,
];
export const PHASE_COLORS = [PALETTE.navy, PALETTE.coral];

export const HARDWARE_COLORS = {
  cpu: PALETTE.navy,
  gpu: PALETTE.coral,
  ram: PALETTE.blue,
  storage: PALETTE.sand,
  enclosure: PALETTE.slate,
  display: PALETTE.rose,
  battery: PALETTE.coral,
};
