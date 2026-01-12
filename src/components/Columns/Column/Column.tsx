import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Column as ColumnType } from "@/features/columns/columnSlice";
import { IconButton } from "@ui/IconButton";
import { EditIcon, DeleteIcon } from "@ui/icons";
import type { Task } from "@/features/tasks/taskSlice";
import type { DialogMode } from "../Columns";

type ColumnProps = {
  column: ColumnType;
  handleDialogMode: (mode: DialogMode) => void;
  tasks: Task[];
};

export const Column = ({ column, handleDialogMode }: ColumnProps) => {
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
      <Stack
        sx={{
          flex: 1,
          overflowY: "auto",
          gap: 2,
        }}
      >
        {/* Временная заглушка для задач */}
        <>Tasks will be here</>
      </Stack>
    </Stack>
  );
};
