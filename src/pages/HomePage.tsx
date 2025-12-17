import Logo from "@/components/Logo";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import type { Theme, SxProps } from "@mui/material/styles";
import startPageLogo from "@/assets/images/startPageLogo.png";
import startPageLogo2x from "@/assets/images/startPageLogo@2x.png";
import { Typography } from "@mui/material";
import StartPageNameForm from "@/components/StartPageNameForm";

const style: Record<string, SxProps<Theme>> = {
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    height: "100%",
    background: (theme) =>
      `linear-gradient(to bottom, #ffffff 20%,${theme.palette.secondary.main})`,
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 4,

    width: "clamp(300px, 100vw, 480px)",
    padding: 2.5,
  },

  formWrap: (theme) => ({
    backgroundColor: "#161616",
    color: "#ffffff",
    padding: theme.spacing(10),
    borderRadius: 2,
    width: "100%",
  }),
};

const HomePage = () => {
  return (
    <Container component="main" maxWidth={false} sx={style.mainContainer}>
      <Stack sx={style.innerContainer}>
        <picture>
          <source srcSet={`${startPageLogo} 1x, ${startPageLogo2x} 2x`} />

          <img src={startPageLogo} alt="start page logo" />
        </picture>

        <Logo slot={{ icon: { fontSize: "large" } }} />
        <Box sx={style.formWrap}>
          <Typography marginBottom={4}>
            Supercharge your productivity and take control of your tasks with
            Task manager - Don't wait, start achieving your goals now!
          </Typography>
          <StartPageNameForm />
        </Box>
      </Stack>
    </Container>
  );
};

export default HomePage;
