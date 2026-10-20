import { FC } from "react";
import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import { format } from "@site/src/format";

export const Bar: FC<{
  values: { label: string; value: number }[];
  colors: { color: string; bgcolor: string }[];
  units: string[];
  lang?: string;
}> = ({ values, colors, units, lang = "en" }) => {
  const safeValues = values.map(item => ({ ...item, value: Number.isFinite(item.value) ? Math.max(0, item.value) : 0 }));
  const total = safeValues.reduce((sum, item) => sum + item.value, 0);
  return (
    <Stack
      direction="row"
      sx={{
        backgroundColor: "border.primary",
        height: "1.5rem",
        borderRadius: "0.5rem",
        overflow: "hidden",
      }}
    >
      {safeValues.map(({ label, value }, i) => (
        <Box
          key={i}
          title={`${label} ${format(value, units, lang)}`}
          sx={{
            flexBasis: `${total > 0 ? value * 100 / total : 0}%`,
            height: "100%",
            display: "flex",
            justifyContent: "center",
            overflow: "hidden",
            ...colors[i],
          }}
        >
          <Box
            sx={{
              fontWeight: "bold",
              display: "inline-block",
              px: 0.25,
              ":before": {
                content: "''",
                display: "inline-block",
                width: "1px",
              },
            }}
          >
            {label}
          </Box>
        </Box>
      ))}
    </Stack>
  );
};
