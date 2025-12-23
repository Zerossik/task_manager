import Typography from "@mui/material/Typography";

import type { SxProps } from "@mui/material";

const style = {
  root: {
    m: "auto",
    p: 3.5,
    maxWidth: "500px",
    textAlign: "center",
  },
} satisfies Record<string, SxProps>;

const Dashboard = () => {
  return (
    <Typography sx={style.root} color="textSecondary">
      Before starting your project, it is essential to create a board to
      visualize and track all the necessary tasks and milestones. This board
      serves as a powerful tool to organize the workflow and ensure effective
      collaboration among team members.
    </Typography>
  );
};

export default Dashboard;
