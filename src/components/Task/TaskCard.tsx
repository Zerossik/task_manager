import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { memo, useState } from "react";
import { IconButton } from "@ui/IconButton";
import { EditIcon, DeleteIcon } from "@ui/icons";
import { useTasks } from "@/features/tasks/useTasks";
import { ConfirmationModal } from "@/components/ConfirmationModal/ConfirmationModal";
import { UpdateTaskDialog } from "@/components/Task/UpdateTaskDialog";
import type { Task } from "@/features/tasks/taskSlice";

type TaskProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { deleteTaskById, updateTaskById } = useTasks();
  // ...

  // Обработчик удаления
  const handleDelete = () => {
    deleteTaskById(task.id);
  };

  // Обработчик обновления задачи (только для title/description)
  const handleEdit = (title: string, description: string) => {
    updateTaskById(task.id, { title, description });
  };

  // ...

  return (
    <Box sx={{ py: 3, px: 5, bgcolor: "background.paper", borderRadius: 2 }}>
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
              aria-label="Edit"
              onClick={() => setEditDialogOpen(true)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="Delete"
              onClick={() => setDeleteDialogOpen(true)}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
      {/* Диалог подтверждения удаления */}
      <ConfirmationModal
        open={deleteDialogOpen}
        message="Are you sure you want to delete this task?"
        onReject={() => setDeleteDialogOpen(false)}
        onSuccess={handleDelete}
      />
      {/* Диалог редактирования */}
      <UpdateTaskDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSubmit={handleEdit}
        task={task}
      />
    </Box>
  );
};

export default memo(TaskCard);
