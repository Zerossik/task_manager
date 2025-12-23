import Box from "@mui/material/Box";
import type { Theme } from "@mui/material/styles";
import type { SxProps } from "@mui/material/styles";
import Logo from "@/components/Logo";

import Typography from "@mui/material/Typography";
import Boards from "@/components/Boards/Boards";

export const a = null;

const style = {
  root: (theme) => ({
    width: theme.layout?.sidebar.mobileWidth,
    [theme.breakpoints.up("tablet")]: {
      width: theme.layout?.sidebar.tabletWidth,
    },
    [theme.breakpoints.up("desktop")]: {
      width: theme.layout?.sidebar.desktopWidth,
    },
  }),
  innerBox: {
    padding: 3.5,
  },
  logo: {
    mb: 15,
    "& svg": {
      width: 32,
      height: 32,
    },
  },
  boardsSectionTitle: {
    borderBottom: 1,
    mb: 3.5,
  },
} satisfies Record<string, SxProps<Theme>>;

const SideBar = () => {
  return (
    <Box sx={style.root}>
      <Box sx={style.innerBox}>
        <Logo sx={style.logo} />
        <Typography color="textSecondary" sx={style.boardsSectionTitle}>
          My boards
        </Typography>
      </Box>
      <Boards />
    </Box>
  );
};
export default SideBar;
