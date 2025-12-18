import "@mui/material";

declare module "@mui/material/IconButton" {
  interface IconButtonOwnProps {
    variant?: "contained";
  }
}

// change breakpoint names
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    desktop: true;
    max: true;
  }
}

// add custom properties to the theme object
declare module "@mui/material/styles" {
  interface Theme {
    layout: {
      sidebar: {
        desktopWidth: number;
        mobileWidth: number;
        tabletWidth: number;
      };
    };
  }
  // allow configuration using `createTheme()`
  interface ThemeOptions {
    layout?: {
      sidebar?: {
        desktopWidth: number;
        mobileWidth: number;
        tabletWidth: number;
      };
    };
  }
}
