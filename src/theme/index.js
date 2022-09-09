import { createTheme, ThemeProvider } from "@mui/material";
import { Colors } from "./colors";
import { Typography } from "./typography";

const theme = createTheme({
  palette: {
    ...Colors,
  },
  typography: {
    ...Typography,
  },
});

export default function AppTheme({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
