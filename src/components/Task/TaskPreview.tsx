import Stack from "@mui/material/Stack";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { CloseIcon } from "@ui/icons";
import { IconButton } from "@ui/IconButton";
import TextField from "@ui/TextField";
import Button from "@ui/Button";
import { useState } from "react";
import type { Task } from "@/features/tasks/taskSlice";
import Typography from "@mui/material/Typography";
import { useColumns } from "@/features/columns/useColumns";
import type { TaskData, TaskResponse } from "@/features/tasks/useTasks";

type PropsType = {
  task: Task;
  onClose: () => void;
  onUpdate: (taskData: Partial<TaskData>) => TaskResponse;
};
export const TaskPreview = ({ task, onClose, onUpdate }: PropsType) => {
  const { getColumnById } = useColumns();
  const [title, setTitle] = useState<string>(task.title);
  const [description, setDescription] = useState<string>(task.description);
  const [isTitleEdit, setIsTitleEdit] = useState<boolean>(false);
  const [isEditDescription, setIsEditDescription] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handlerTitle = (title: string) => {
    setTitle(title);
    setError("");
  };
  const column = getColumnById(task.columnId);
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={(theme) => ({
          mx: `-${theme.spacing(theme.spacingConfig.spacingTokens.spacing_16)}`,
          mt: `-${theme.spacing(theme.spacingConfig.spacingTokens.spacing_16)}`,
          px: theme.spacing(theme.spacingConfig.spacingTokens.spacing_16),
          py: theme.spacing(theme.spacingConfig.spacingTokens.spacing_8),
          bgcolor: "secondary.main",
        })}
      >
        <Typography>{column?.title}</Typography>
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <DialogContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {!isTitleEdit ? (
            <DialogTitle
              sx={(theme) => ({
                width: "100%",
                height: "40px",
                padding: `${theme.spacing(theme.spacingConfig.spacingTokens.spacing_8)} 0`,
                "&:hover": {
                  cursor: "pointer",
                },
              })}
              onClick={() => setIsTitleEdit(true)}
            >
              {title}
            </DialogTitle>
          ) : (
            <TextField
              autoFocus
              value={title}
              size="small"
              color="secondary"
              helperText={error}
              error={Boolean(error)}
              onChange={(e) => handlerTitle(e.target.value)}
              onBlur={() => {
                const result = onUpdate({ title });
                if (!result.ok && task.title !== title)
                  return setError(result.error);
                setIsTitleEdit(false);
              }}
              sx={{ height: "40px" }}
            />
          )}
        </Stack>
        <Stack>
          {!isEditDescription ? (
            <Typography
              onClick={() => setIsEditDescription(true)}
              sx={{ width: "100%", "&:hover": { cursor: "pointer" } }}
            >
              {task.description}
            </Typography>
          ) : (
            <Stack
              sx={(theme) => ({
                gap: theme.spacing(theme.spacingConfig.spacingTokens.spacing_8),
              })}
            >
              <TextField
                autoFocus
                value={description}
                color="secondary"
                multiline
                minRows={1}
                onChange={(e) => setDescription(e.target.value)}
                sx={{
                  "& .MuiInputBase-root": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "transparent",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "transparent",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "secondary.main",
                    },
                  },
                }}
              />
              <Stack
                direction="row"
                sx={(theme) => ({
                  gap: theme.spacing(
                    theme.spacingConfig.spacingTokens.spacing_8 / 2,
                  ),
                })}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => {
                    if (description === task.description) {
                      setIsEditDescription(false);
                      return;
                    }

                    const result = onUpdate({ description });
                    if (!result.ok) {
                      setError(result.error);
                      return;
                    }
                    setIsEditDescription(false);
                  }}
                >
                  Save changes
                </Button>
                <Button
                  color="error"
                  size="small"
                  onClick={() => {
                    setIsEditDescription(false);
                    setDescription(task.description);
                  }}
                >
                  Cancel
                </Button>
              </Stack>
            </Stack>
          )}
        </Stack>
      </DialogContent>
    </>
  );
};
