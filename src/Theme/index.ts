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
  spacingConfig: {
    sectionGap: {
      mobile: 5,
    },
    containerPadding: {
      mobile: 5,
      desktop: 6,
    },
    blockGap: {
      mobile: 5,
    },
    spacingTokens: {
      spacing_8: 2,
      spacing_16: 4,
      spacing_32: 8,
      spacing_40: 10,
    },
  },
  components,
  layout: {
    sidebar: {
      desktopWidth: 260,
      mobileWidth: 225,
      tabletWidth: 240,
      padding: 3.5,
    },
    dialog: { maxWidth: "400px" },
  },
});
