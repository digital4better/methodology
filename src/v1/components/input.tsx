import { FC, useId } from "react";
import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import { SxProps, Theme } from "@mui/system";

export const Input: FC<
  (
    | { type: "text"; options?: never; placeholder?: string }
    | {
        type: "select";
        options:
          | { label: string; value: string }[]
          | {
              label: string;
              options: { label: string; value: string }[];
            }[];
        placeholder?: never;
      }
  ) & {
    className?: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    sx?: SxProps<Theme>;
  }
> = ({ type, options, placeholder, label, value, onChange, sx, className }) => {
  const id = useId();
  const hasGroups =
    type === "select" &&
    options.length > 0 &&
    "options" in options[0];
  const groupedOptions = hasGroups
    ? (options as {
        label: string;
        options: { label: string; value: string }[];
      }[])
    : [];
  const flatOptions = hasGroups
    ? []
    : (options as { label: string; value: string }[]);
  return (
    <Stack
      className={className}
      sx={{
        overflow: "hidden",
        ...sx,
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
          {hasGroups
            ? groupedOptions.map(({ label, options }) => (
                <optgroup key={label} label={label}>
                  {options.map(({ label, value }) => (
                    <option key={value} label={label} value={value} />
                  ))}
                </optgroup>
              ))
            : flatOptions.map(({ label, value }) => (
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
