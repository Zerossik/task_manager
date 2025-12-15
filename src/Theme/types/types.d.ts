import "@mui/material";

declare module "@mui/material/IconButton" {
  interface IconButtonOwnProps {
    variant?: "contained";
  }
}

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
