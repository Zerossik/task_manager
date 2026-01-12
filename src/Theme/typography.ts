import { pxToRem } from "./helpers/pxToRem";
import { type ThemeOptions } from "@mui/material/styles";

const typography: ThemeOptions["typography"] = {
  h1: {
    fontSize: pxToRem(24),
  },
  h2: { fontSize: pxToRem(20) },
  h3: { fontSize: pxToRem(18) },
  h4: { fontSize: pxToRem(16) },
  h5: { fontSize: pxToRem(16) },
  h6: { fontSize: pxToRem(16) },
  body1: { fontSize: pxToRem(16) },
  body2: { fontSize: pxToRem(14) },
  fontSize: 16,
};

export default typography;
