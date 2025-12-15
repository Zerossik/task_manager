import NProgress from "nprogress";
import { useEffect } from "react";
import "nprogress/nprogress.css";
import GlobalStyles from "@mui/material/GlobalStyles";
import type { Interpolation, Theme } from "@mui/material";

const style: Interpolation<Theme> = {
  "#nprogress .bar": {
    height: "4px",
  },
};

export const PageLoader = () => {
  NProgress.configure({ showSpinner: false });

  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);

  return <GlobalStyles styles={style} />;
};
