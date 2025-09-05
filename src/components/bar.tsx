import { FC } from "react";
import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import { format } from "@site/src/format";

export const Bar: FC<{
  values: { label: string; value: number }[];
  colors: { color: string; bgcolor: string }[];
  units: string[];
}> = ({ values, colors, units }) => {
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
      {values.map(({ label, value }, i) => (
        <Box
          key={i}
          title={`${label} ${format(value, units)}}`}
          sx={{
            flexBasis: `${(value * 100) / values.reduce((a, { value }) => a + value, 0)}%`,
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
