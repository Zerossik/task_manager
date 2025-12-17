import type { PaletteOptions } from "@mui/material";

export const darkPalette: PaletteOptions = {
  primary: {
    main: "#121212",
    contrastText: "#ffffff",
    light: "#323232",
  },
  secondary: {
    main: "#BEDBB0",
    dark: "#9DC888",
    light: "#d7eace",
    contrastText: "#161616",
  },
  text: { primary: "#ffffff", secondary: "#888888" },
  background: { default: "#1f1f1f", paper: "#121212" },
};

export const lightPalette: PaletteOptions = {
  primary: {
    main: "#ffffff",
    contrastText: "#161616",
    dark: "#fcfcfc",
  },
  secondary: {
    main: "#BEDBB0",
    dark: "#9DC888",
    light: "#d7eace",
    contrastText: "#161616",
  },
  text: { primary: "#161616", secondary: "#8b8b8b" },
  background: { default: "#f6f6f7", paper: "#ffffff" },
};
