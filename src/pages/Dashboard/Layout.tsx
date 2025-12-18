import Header from "@/components/TopBar";
import type { RootState } from "@/store/store";
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";

import { useSelector } from "react-redux";
import { Outlet } from "react-router";

const Layout = () => {
  const isOpenDrawer = useSelector(
    ({ user }: RootState) => user.isDrawerOpenByDefault
  );
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("desktop"));

  return (
    <Box
      sx={{
        transition: (theme) =>
          theme.transitions.create("margin-left", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        ml: (theme) =>
          isOpenDrawer && !isMobile
            ? `${theme.layout?.sidebar.desktopWidth}px`
            : 0,
      }}
    >
      <Header />
      <Box component="main">
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
