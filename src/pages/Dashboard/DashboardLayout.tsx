// import ModalHost from "@/components/ModalHost/ModalHost";
import Header from "@/components/TopBar";
import type { RootState } from "@/store/store";
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";

import { useSelector } from "react-redux";
import { Outlet } from "react-router";

const DashboardLayout = () => {
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
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          minHeight: 0,
        }}
      >
        <Outlet />
        {/* <ModalHost /> */}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
