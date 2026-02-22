import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { memo, useState } from "react";
import { IconButton } from "@ui/IconButton";
import { DeleteIcon } from "@ui/icons";
import { useTasks } from "@/features/tasks/useTasks";
import { ConfirmationModal } from "@/components/ConfirmationModal/ConfirmationModal";
import type { Task } from "@/features/tasks/taskSlice";
import { Link } from "@mui/material";

type TaskProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { deleteTaskById } = useTasks();
  // ...

  // Обработчик удаления
  const handleDelete = () => {
    deleteTaskById(task.id);
  };

  // ...

  return (
    <>
      <Link href={task.id} style={{ textDecoration: "none", width: "100%" }}>
        <Box
          sx={{
            py: 3,
            px: 5,
            bgcolor: "background.paper",
            borderRadius: 2,
            width: "100%",
          }}
        >
          <Stack gap={2}>
            <Typography
              variant="h4"
              color="textPrimary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {task.title}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                minHeight: 48,
                whiteSpace: "normal",
              }}
            >
              {task.description?.trim()
                ? task.description
                : "There may be a description here"}
            </Typography>
            <Divider />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              gap={2}
            >
              <Stack direction="row"></Stack>
              <Stack direction="row">
                <IconButton
                  aria-label="Delete"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDeleteDialogOpen(true);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Link>
      {/* Диалог подтверждения удаления */}
      <ConfirmationModal
        open={deleteDialogOpen}
        message="Are you sure you want to delete this task?"
        onReject={() => setDeleteDialogOpen(false)}
        onSuccess={handleDelete}
      />
    </>
  );
};

export default memo(TaskCard);
