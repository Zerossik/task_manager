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

  return <RouterLink ref={ref} to={href} {...other} />;
});

LinkBehavior.displayName = "LinkBehavior";

const brandedComponents: ThemeOptions["components"] = {
  MuiToolbar: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },
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
    styleOverrides: {
      root: {
        display: "inline-block",
      },
    },
  },
  MuiCssBaseline: {
    styleOverrides: (theme) => ({
      "*, *::before, *::after": {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        scrollbarWidth: "thin",
        scrollbarColor: `${theme.palette.secondary.main} transparent`,
      },
      "*::-webkit-scrollbar": {
        width: "6px",
        height: "6px",
      },
      "*::-webkit-scrollbar-thumb": {
        background: theme.palette.secondary.main,
        borderRadius: "4px",
      },
      "*::-webkit-scrollbar-track": {
        background: "transparent",
        borderRadius: "2px",
      },
    }),
  },
  MuiContainer: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(5),
        [theme.breakpoints.up("desktop")]: {
          padding: theme.spacing(6),
        },
      }),
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
  MuiDialog: {
    styleOverrides: {
      paper: ({ theme }) => ({
        padding: theme.spacing(6),
        margin: 0,
        width: `clamp(300px, calc(100% - ${theme.spacing(theme.spacingConfig.containerPadding.mobile)}), 500px)`,
        flexShrink: 0,
      }),
    },
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },
  MuiDialogContent: {
    styleOverrides: {
      root: {
        // padding: `${theme.spacing(6)} 0`,
        padding: 0,
      },
    },
  },
  MuiDialogActions: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },
  MuiSvgIcon: {
    defaultProps: { fontSize: "medium" },
    styleOverrides: {
      root: ({ ownerState }) => {
        switch (ownerState.fontSize) {
          case "small":
            return { fontSize: 16 };
          case "medium":
            return { fontSize: 24 };
          case "large":
            return { fontSize: 32 };
        }
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        width: "100%",
      },
    },
  },
};

export default brandedComponents;
