import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { memo } from "react";
import type { Task } from "@/features/tasks/taskSlice";

type TaskProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskProps) => {
  return (
    <Box sx={{ py: 3, px: 5 }}>
      <Stack gap={2}>
        <Typography>{task.title}</Typography>
        <Typography
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {task.description}
        </Typography>
        <Divider />
      </Stack>
    </Box>
  );
};

export default memo(TaskCard);
