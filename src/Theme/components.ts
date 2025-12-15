import type { ThemeOptions } from "@mui/material/styles";

const brandedComponents: ThemeOptions["components"] = {
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
