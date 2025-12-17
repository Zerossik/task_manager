import type { ThemeOptions } from "@mui/material/styles";
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from "react-router";

import React from "react";
import type { LinkProps } from "@mui/material";

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (Material UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

const brandedComponents: ThemeOptions["components"] = {
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: "none",
      },
    },
  },
  MuiLink: {
    defaultProps: {
      component: LinkBehavior,
    } as LinkProps,
  },
  MuiCssBaseline: {
    styleOverrides: {
      "*, *::before, *::after": {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      },
    },
  },
  MuiContainer: {
    defaultProps: {
      maxWidth: "max",
    },
  },
  MuiButton: {
    styleOverrides: {
      root: { textTransform: "none" },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.spacing(1),

        "&:hover": {
          backgroundColor: "transparent",
        },
      }),
    },
  },
};

export default brandedComponents;
