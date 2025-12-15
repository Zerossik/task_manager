import logoIcon from "@/assets/icons/logoIcon.svg";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";

const Logo = () => {
  return (
    <Stack direction="row" gap={2} alignItems="center">
      <img src={logoIcon} alt="Logo Icon" />
      <Typography
        color="primary.contrastText"
        variant="body1"
        fontSize={32}
        fontWeight={600}
      >
        Task manager
      </Typography>
    </Stack>
  );
};

export default Logo;
