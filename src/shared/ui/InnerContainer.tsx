import { styled, type BoxProps } from "@mui/material";
import Box from "@mui/material/Box";
import type { ElementType, JSX } from "react";

export const InnerContainer = styled(Box)(({ theme }) => ({
  padding: `0 ${theme.spacing(theme.spacingConfig.containerPadding.mobile)}`,
  [theme.breakpoints.up("desktop")]: {
    padding: `0 ${theme.spacing(theme.spacingConfig.containerPadding.desktop)}`,
  },
})) as <C extends ElementType>(
  props: BoxProps<C, { component?: C }>
) => JSX.Element;
