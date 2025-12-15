import type { TypographyVariantsOptions } from "@mui/material";
import type { Palette } from "@mui/material";
import { pxToRem } from "./helpers/pxToRem";

type Typography =
  | TypographyVariantsOptions
  | ((palette: Palette) => TypographyVariantsOptions)
  | undefined;

const typography: Typography = {
  h1: {
    fontSize: pxToRem(32),
  },
  h2: { fontSize: pxToRem(28) },
  h3: { fontSize: pxToRem(24) },
  h4: { fontSize: pxToRem(20) },
  h5: { fontSize: pxToRem(18) },
  h6: { fontSize: pxToRem(16) },
  body1: { fontSize: pxToRem(16) },
  body2: { fontSize: pxToRem(14) },
  fontSize: 16,
};

export default typography;
