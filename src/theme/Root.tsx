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
      color: "#444444",
      fontSize: "1.25rem",
      fontWeight: "normal",
    },
    table: {
      color: "#444444",
      fontSize: "0.875rem",
    },
    body: {
      color: "#444444",
      fontSize: "0.875rem",
    },
    label: {
      color: "#888888",
      fontSize: "0.75rem",
    },
  },
  palette: {
    background: {
      primary: "#f5f5f5",
      secondary: "#003878",
      paper: "#ffffff",
    },
    border: {
      primary: "#e7e7e7",
    },
  },
});

export default function Root({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
