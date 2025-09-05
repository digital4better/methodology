import { FC, useId } from "react";
import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";

export const Input: FC<
  (
    | { type: "text"; options?: never; placeholder?: string }
    | {
        type: "select";
        options: { label: string; value: string }[];
        placeholder?: never;
      }
  ) & { label: string; value: string; onChange: (value: string) => void }
> = ({ type, options, placeholder, label, value, onChange }) => {
  const id = useId();
  return (
    <Stack
      sx={{
        overflow: "hidden",
        "select,input": {
          appearance: "none",
          borderRadius: 2,
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "border.primary",
          py: 1,
          px: 2,
          fontsize: "inherit",
          fontFamily: "inherit",
          color: "inherit",
        },
      }}
    >
      <Box component="label" sx={{ typography: "label" }} htmlFor={id}>
        {label}
      </Box>
      {type === "select" ? (
        <Box
          id={id}
          component="select"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          {options.map(({ label, value }) => (
            <option key={value} label={label} value={value} />
          ))}
        </Box>
      ) : (
        <Box
          id={id}
          component="input"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </Stack>
  );
};
