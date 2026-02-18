import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Column as ColumnType } from "@/features/columns/columnSlice";
import { IconButton } from "@ui/IconButton";
import { EditIcon, DeleteIcon } from "@ui/icons";
import { memo, useState } from "react";
import { useTasks } from "@/features/tasks/useTasks";
import List from "@mui/material/List";
import Button from "@ui/Button";
import AddIcon from "@/components/ui/icons/AddIcon";
import TaskCard from "@/components/Task/TaskCard";
import { useColumns } from "@/features/columns/useColumns";
import { ConfirmationModal } from "@/components/ConfirmationModal/ConfirmationModal";
import { CreateTaskDialog } from "@/components/Task";
import { ColumnDialog } from "../ColumnDialog";

type ColumnProps = {
  column: ColumnType;
};

const Column = ({ column }: ColumnProps) => {
  const [dialogMode, setDialogMode] = useState<
    "updateColumn" | "deleteColumn" | "createTask" | null
  >(null);
  const { getTasksByColumnId, createTask } = useTasks();
  const { updateColumn, deleteColumn } = useColumns();

  const tasks = getTasksByColumnId(column.id);

  const onUpdateColumn = (title: string) => {
    updateColumn(column.id, {
      boardId: column.boardId,
      title: title.trim(),
    });
  };

  const onDeleteColumn = () => {
    deleteColumn(column.id);
  };

  const isNotEmptyTasks = tasks.length > 0;
  return (
    <>
      <Stack
        sx={{
          width: 334,
          height: "100%",
          overflow: "hidden",
          gap: 3,
        }}
      >
        {/* Заголовок колонки */}

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ bgcolor: "background.paper", borderRadius: 2, p: 5 }}
        >
          <Typography color="textPrimary" variant="h3">
            {column.title}
          </Typography>

          {/* Кнопки действий */}
          <Stack direction="row">
            <IconButton
              onClick={() => setDialogMode("updateColumn")}
              aria-label="Edit column"
              sx={{ p: 1 }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => setDialogMode("deleteColumn")}
              aria-label="Delete column"
              sx={{ p: 1 }}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Stack>

        {/* Область для задач с прокруткой */}

        <Stack
          sx={(theme) => ({
            gap: theme.spacingConfig.blockGap.mobile,
          })}
        >
          {isNotEmptyTasks && (
            <List disablePadding>
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </List>
          )}
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            startIcon={<AddIcon />}
            onClick={() => setDialogMode("createTask")}
          >
            add new task
          </Button>
        </Stack>
      </Stack>
      <>
        {dialogMode === "updateColumn" && (
          <ColumnDialog
            open={true}
            onClose={() => setDialogMode(null)}
            onUpdate={onUpdateColumn}
            column={column}
          />
        )}

        {dialogMode === "deleteColumn" && (
          <ConfirmationModal
            message="Are you sure you want to delete this column? All tasks in this column will be deleted as well."
            open={true}
            onReject={() => setDialogMode(null)}
            onSuccess={() => onDeleteColumn()}
          />
        )}
        {dialogMode === "createTask" && (
          <CreateTaskDialog
            open={true}
            onClose={() => setDialogMode(null)}
            onSubmit={(title, description) =>
              createTask({
                title,
                description,
                columnId: column.id,
                deadline: null,
                is_completed: false,
              })
            }
          />
        )}
      </>
    </>
  );
};

export default memo(Column);
