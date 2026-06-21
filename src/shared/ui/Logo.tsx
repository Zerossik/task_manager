import type { SvgIconProps, StackProps, TypographyProps } from "@mui/material";
import type { Theme, SxProps } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { LogoIcon } from "@shared/icons";

const styles: Record<string, SxProps<Theme>> = {
  root: (theme) => ({
    "--logo-color": "#000000",
    "--icon-fill-primary": "#161616",
    "--icon-fill-secondary": "#FFFFFF",

    ...theme.applyStyles("dark", {
      "--logo-color": "#ffffff",
      "--icon-fill-primary": "#ffffff",
      "--icon-fill-secondary": "#161616",
    }),

    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(2),
  }),

  label: (theme) => ({
    color: theme.vars?.palette.text.primary,
    fontWeight: 600,
  }),

  icon: {
    width: "32px",
    height: "32px",
  },
};

type SlotType = {
  text?: TypographyProps;
  icon?: SvgIconProps;
};

type PropsType = {
  slot?: SlotType;
} & Omit<StackProps, "slot">;

const Logo = ({ slot, ...props }: PropsType) => {
  return (
    <Box sx={styles.root} {...props}>
      <LogoIcon sx={styles.icon} {...slot?.icon} />
      <Typography sx={styles.label} {...slot?.text}>
        Task manager
      </Typography>
    </Box>
  );
};

export default Logo;
