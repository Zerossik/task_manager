import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { CloseIcon } from "@ui/icons";
import { IconButton } from "@ui/IconButton";
import TextField from "@ui/TextField";
import Button from "@ui/Button";
import { useState, type FormEvent } from "react";
import CustomAddIcon from "@ui/icons/AddIcon";
import type { Task } from "@/features/tasks/taskSlice";
import type { TaskData } from "@/features/tasks/useTasks";

type PropsType = {
  open: boolean;
  onClose: () => void;
  onCreate?: (title: string, description: string) => void;
  onUpdate?: (data: Partial<TaskData>) => void;
  task?: Task;
};

export const TaskDialog = ({
  open,
  onClose,
  onCreate,
  onUpdate,
  task,
}: PropsType) => {
  const [title, setTitle] = useState<string>(task?.title || "");
  const [description, setDescription] = useState<string>(
    task?.description || "",
  );
  const isUpdate = task !== undefined;
  const isValidTitle = title.trim().length > 1;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isUpdate) onCreate?.(title.trim(), description.trim());
    else onUpdate?.({ title: title.trim(), description: description.trim() });
    onClose();
    setTitle("");
    setDescription("");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <DialogTitle>{isUpdate ? "Edit task" : "New task"}</DialogTitle>
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <DialogContent>
        <Stack component="form" onSubmit={onSubmit}>
          <TextField
            color="secondary"
            label="Title"
            size="small"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            color="secondary"
            label="Description"
            sx={{ maxHeight: 150, overflow: "auto" }}
            size="small"
            multiline
            minRows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            startIcon={<CustomAddIcon />}
            disabled={!isValidTitle}
          >
            {isUpdate ? "Save changes" : "Add task"}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
