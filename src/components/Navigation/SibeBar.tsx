import Box from "@mui/material/Box";
import type { Theme } from "@mui/material/styles";
import type { SxProps } from "@mui/material/styles";
import Logo from "@/components/Logo";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { IconButton } from "@/components/ui/IconButton";
import AddIcon from "@mui/icons-material/Add";

const SIDEBAR_WIDTH = { default: "225px", desktop: "260px" };

export const a = null;

const style = {
  root: ({ breakpoints }) => ({
    width: SIDEBAR_WIDTH.default,
    [breakpoints.up("desktop")]: { width: SIDEBAR_WIDTH.desktop },
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
  addButton: {
    width: 40,
    height: 40,
    color: "secondary.contrastText",
    bgcolor: "secondary.main",

    "&:hover": {
      bgcolor: "secondary.dark",
    },
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
        <Stack
          justifyContent="space-between"
          alignItems="center"
          direction="row"
        >
          <Typography fontWeight={600}>Create a new board</Typography>
          <IconButton aria-label="add board" sx={style.addButton}>
            <AddIcon />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
};
export default SideBar;
