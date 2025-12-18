import { createTheme } from "@mui/material/styles";
import { darkPalette, lightPalette } from "./palette";
import typography from "./typography";
import components from "./components";

export const theme = createTheme({
  colorSchemes: {
    dark: { palette: darkPalette },
    light: { palette: lightPalette },
  },
  typography,
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 768,
      desktop: 1024,
      max: 1920,
    },
  },
  spacing: 4,
  shape: {
    borderRadius: 4,
  },
  components,
  layout: {
    sidebar: {
      desktopWidth: 260,
      mobileWidth: 225,
      tabletWidth: 240,
    },
  },
});
