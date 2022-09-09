import { createTheme, ThemeProvider } from "@mui/material";
import { Colors } from "./colors";
import { Components } from "./components";
import { Typography } from "./typography";

const theme = createTheme({
  palette: {
    ...Colors,
  },
  typography: {
    ...Typography,
  },

  components: {
    ...Components
  }
});

export default function AppTheme({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
