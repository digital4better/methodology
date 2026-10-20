import createTheme from "@mui/system/createTheme";
import ThemeProvider from "@mui/system/ThemeProvider";

const theme = createTheme({
  typography: {
    header: {
      color: "white",
      fontSize: "1.25rem",
      lineHeight: "1.75rem",
    },
    title: {
      fontWeight: "bold",
      fontSize: "2.25rem",
      lineHeight: "2.5rem",
    },
    subtitle: {
      color: "var(--ifm-font-color-base)",
      fontSize: "1.25rem",
      fontWeight: "normal",
    },
    table: {
      color: "var(--ifm-font-color-base)",
      fontSize: "0.875rem",
    },
    body: {
      color: "var(--ifm-font-color-base)",
      fontSize: "0.875rem",
    },
    label: {
      color: "var(--ifm-color-emphasis-700)",
      fontSize: "0.75rem",
    },
  },
  palette: {
    background: {
      primary: "var(--ifm-background-color)",
      secondary: "#173b73",
      paper: "var(--ifm-background-surface-color)",
    },
    border: {
      primary: "var(--ifm-color-emphasis-300)",
    },
  },
});

export default function Root({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
