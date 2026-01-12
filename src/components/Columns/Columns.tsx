import { List, ListItem, useTheme } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@ui/Button";
import AddIcon from "../ui/icons/AddIcon";
import { useState } from "react";

import { Column } from "./Column/Column";
import { useColumns } from "@/features/columns/useColumns";
import { useTasks } from "@/features/tasks/useTasks";
import { CreateColumnDialog } from "./CreateColumnDialog";
import { UpdateColumnDialog } from "./UpdateColumnDialog";
import { ConfirmationModal } from "@/components/ConfirmationModal/ConfirmationModal";

export type DialogMode =
  | { mode: null }
  | { mode: "createColumn" }
  | { mode: "updateColumn"; columnId: string }
  | { mode: "deleteColumn"; columnId: string };

type PropsType = {
  boardID: string;
};

export const Columns = ({ boardID }: PropsType) => {
  const [dialog, setDialog] = useState<DialogMode>({ mode: null });
  const theme = useTheme();
  const mode = theme.palette.mode;

  const {
    getColumnsByBoardId,
    createColumn,
    updateColumn,
    deleteColumn,
    getColumnById,
  } = useColumns();
  const { getTasksByColumnId, deleteTasksByColumnId } = useTasks();

  const columns = getColumnsByBoardId(boardID);

  const handleDialogMode = (dialogMode: DialogMode) => {
    setDialog(dialogMode);
  };

  const handleSubmit = (title: string) => {
    switch (dialog.mode) {
      case "createColumn": {
        createColumn({
          boardId: boardID,
          title: title.trim(),
        });

        break;
      }
      case "updateColumn": {
        updateColumn(dialog.columnId, {
          boardId: boardID,
          title: title.trim(),
        });
        break;
      }
      case "deleteColumn": {
        break;
      }
    }
    handleDialogMode({ mode: null });
  };

  const onDelete = () => {
    if (dialog.mode !== "deleteColumn") return;
    deleteColumn(dialog.columnId);
    deleteTasksByColumnId(dialog.columnId);

    handleDialogMode({ mode: null });
  };

  return (
    <>
      <Stack
        sx={(theme) => ({
          overflowX: "auto",
          gap: theme.spacingConfig.blockGap.mobile,
          mx: -theme.spacingConfig.containerPadding.mobile,
          px: theme.spacingConfig.containerPadding.mobile,
          [theme.breakpoints.up("desktop")]: {
            mx: -theme.spacingConfig.containerPadding.desktop,
            px: theme.spacingConfig.containerPadding.desktop,
          },
        })}
        direction="row"
        alignItems="flex-start"
        flex={1}
      >
        <Stack
          component={List}
          direction="row"
          disablePadding
          alignItems="stretch"
          sx={(theme) => ({
            height: "100%",
            gap: theme.spacing(theme.spacingConfig.blockGap.mobile),
          })}
        >
          {columns.map((column) => (
            <ListItem key={column.id} disablePadding>
              {/* Рендерим компонент Column с действиями */}
              <Column
                column={column}
                handleDialogMode={handleDialogMode}
                tasks={getTasksByColumnId(column.id)}
              />
            </ListItem>
          ))}
        </Stack>
        <Button
          variant="contained"
          color="primary"
          startIcon={
            <AddIcon
              variant={mode === "dark" ? "White" : "black"}
              width={32}
              height={32}
            />
          }
          sx={{
            width: 334,
            padding: "20px 0",
            flexShrink: 0,
            borderRadius: 2,
          }}
          onClick={() => handleDialogMode({ mode: "createColumn" })}
        >
          Add column
        </Button>
      </Stack>

      {/* Dialogs */}
      <>
        <CreateColumnDialog
          onClose={() => handleDialogMode({ mode: null })}
          open={dialog.mode === "createColumn"}
          onSubmit={handleSubmit}
        />

        {dialog.mode === "updateColumn" && (
          <UpdateColumnDialog
            onClose={() => handleDialogMode({ mode: null })}
            onSubmit={handleSubmit}
            column={getColumnById(dialog.columnId)}
          />
        )}

        {dialog.mode === "deleteColumn" && (
          <ConfirmationModal
            message="Are you sure you want to delete this column? All tasks in this column will be deleted as well."
            open={true}
            onReject={() => handleDialogMode({ mode: null })}
            onSuccess={() => onDelete()}
          />
        )}
      </>
    </>
  );
};
