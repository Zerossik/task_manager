import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Column as ColumnType } from "@/features/columns/columnSlice";
import { IconButton } from "@/shared/ui/IconButton";
import { EditIcon, DeleteIcon } from "@ui/icons";
import type { DialogMode } from "../Columns";
import { memo } from "react";
import { useTasks } from "@/features/tasks/useTasks";
import List from "@mui/material/List";
import Button from "@/shared/ui/Button";
import AddIcon from "@/components/ui/icons/AddIcon";
import TaskCard from "@/components/Task/TaskCard";

type ColumnProps = {
  column: ColumnType;
  handleDialogMode: (mode: DialogMode) => void;
};

const Column = ({ column, handleDialogMode }: ColumnProps) => {
  const { getTasksByColumnId } = useTasks();

  const tasks = getTasksByColumnId(column.id);
  const isNotEmptyTasks = tasks.length > 0;
  return (
    <Stack
      sx={(theme) => ({
        width: 334,
        height: "100%",
        gap: theme.spacing(theme.spacingConfig.blockGap.mobile),
      })}
    >
      {/* Заголовок колонки */}

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ bgcolor: "background.paper", borderRadius: 2, p: 5 }}
      >
        <Typography color="textPrimary">{column.title}</Typography>

        {/* Кнопки действий */}
        <Stack direction="row">
          <IconButton
            onClick={() =>
              handleDialogMode({ mode: "updateColumn", columnId: column.id })
            }
            aria-label="Edit column"
            sx={{ p: 1 }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() =>
              handleDialogMode({ mode: "deleteColumn", columnId: column.id })
            }
            aria-label="Delete column"
            sx={{ p: 1 }}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Stack>

      {/* Область для задач с прокруткой */}

      <Stack sx={(theme) => ({ gap: theme.spacingConfig.blockGap.mobile })}>
        {isNotEmptyTasks && (
          <List>
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
        >
          add new task
        </Button>
      </Stack>
    </Stack>
  );
};

export default memo(Column);
