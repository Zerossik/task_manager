import Logo from "@/components/Logo";

import Boards from "@/components/Navigation/SidebarBoards/Boards";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";

export const a = null;

const SideBar = () => {
  return (
    <Stack
      sx={(theme) => ({
        width: theme.layout?.sidebar.mobileWidth,
        [theme.breakpoints.up("tablet")]: {
          width: theme.layout?.sidebar.tabletWidth,
        },
        [theme.breakpoints.up("desktop")]: {
          width: theme.layout?.sidebar.desktopWidth,
        },
        gap: theme.spacingConfig.blockGap.mobile,
        p: theme.layout.sidebar.padding,
      })}
    >
      <Link href="/dashboard" sx={{ alignSelf: "flex-start" }}>
        <Logo
          sx={{
            "& svg": {
              width: 32,
              height: 32,
            },
          }}
        />
      </Link>

      <Boards />
    </Stack>
  );
};
export default SideBar;
