import Header from "@/components/TopBar";
import type { RootState } from "@/store/store";
import { theme } from "@/Theme";

import { Stack, useMediaQuery } from "@mui/material";

import { useSelector } from "react-redux";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  const isOpenDrawer = useSelector(
    ({ user }: RootState) => user.isDrawerOpenByDefault,
  );
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("desktop"));

  return (
    <Stack
      sx={{
        transition: (theme) =>
          theme.transitions.create("margin-left", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        ml: (theme) =>
          isOpenDrawer && !isMobile
            ? `${theme.layout.sidebar.desktopWidth}px`
            : 0,
        height: "100vh",
        overflow: "hidden",
        gap: theme.spacing(theme.spacingConfig.sectionGap.mobile),
      }}
    >
      <Header />
      <Stack
        component="main"
        sx={{ flex: 1, overflow: "hidden", minHeight: 0 }}
      >
        <Outlet />
      </Stack>
    </Stack>
  );
};

export default DashboardLayout;
