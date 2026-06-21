import { Box, Stack, Typography } from "@mui/material";
import type { Theme, SxProps } from "@mui/material/styles";
import { Link, Logo } from "@shared/ui";

const styles: Record<string, SxProps<Theme>> = {
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100dvh",
  },

  content: {
    justifyContent: "center",
    alignItems: "center",
    width: (theme) =>
      `clamp(280px, calc(100% - ${theme.spacing(theme.spacingConfig.containerPadding.mobile)}), 480px)`,
    gap: "14px",
  },

  logoIcon: (theme) => ({
    width: "40px",
    height: "40px",

    [theme.breakpoints.up("desktop")]: {
      width: "48px",
      height: "48px",
    },
  }),

  description: {
    width: "100%",
    maxWidth: 335,
    textAlign: "center",
  },

  registrationButton: (theme) => ({
    width: "100%",
    maxWidth: "300px",
    py: "14px",
    mt: 3.5,
    backgroundColor: theme.vars?.palette.primary.main,
    textAlign: "center",
    color: theme.vars?.palette.text.primary,
    borderRadius: "8px",

    "&:hover": {
      textDecoration: "none",
    },
  }),

  loginLink: (theme) => ({
    color: theme.vars?.palette.text.primary,
    textDecoration: "none",
  }),
};

const StartPage = () => {
  return (
    <Box component="main" sx={styles.root}>
      <Stack sx={styles.content}>
        <picture>
          <source srcSet="/startPageLogo.png 1x, /startPageLogo@2x.png 2x" />
          <img src="/startPageLogo.png" alt="Task Pro logo" />
        </picture>

        <Logo
          slot={{ icon: { sx: styles.logoIcon }, text: { variant: "h1" } }}
        />

        <Typography sx={styles.description}>
          Supercharge your productivity and take control of your tasks with Task
          Pro - Don't wait, start achieving your goals now!
        </Typography>

        <Link href="/signup" sx={styles.registrationButton}>
          Registration
        </Link>

        <Link href="/signin" sx={styles.loginLink}>
          Log In
        </Link>
      </Stack>
    </Box>
  );
};

export default StartPage;
