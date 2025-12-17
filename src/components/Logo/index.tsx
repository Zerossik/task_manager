import { Typography, useTheme, type TypographyProps } from "@mui/material";
import Stack, { type StackProps } from "@mui/material/Stack";
import { LogoIcon, type LogoIconType } from "./IconLogo";

type SlotType = {
  text?: TypographyProps;
  icon?: LogoIconType;
};

type PropsType = {
  slot?: SlotType;
} & Omit<StackProps, "slot">;

const Logo = ({ slot, ...props }: PropsType) => {
  const theme = useTheme();

  const iconVariant = theme.palette.mode === "dark" ? "light" : "dark";
  return (
    <Stack direction="row" gap={2} alignItems="center" {...props}>
      <LogoIcon variant={iconVariant} {...slot?.icon} />
      <Typography
        color="primary.contrastText"
        variant="body1"
        fontSize="1rem"
        fontWeight={600}
        {...slot?.text}
      >
        Task manager
      </Typography>
    </Stack>
  );
};

export default Logo;
