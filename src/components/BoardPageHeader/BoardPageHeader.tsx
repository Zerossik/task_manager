import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

type PropsType = {
  title: string;
};

export const BoardPageHeader = ({ title }: PropsType) => {
  return (
    <Stack>
      <Typography variant="h1" color="textPrimary">
        {title}
      </Typography>
    </Stack>
  );
};
