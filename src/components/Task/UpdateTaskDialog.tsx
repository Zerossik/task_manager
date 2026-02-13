import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Button from "@ui/Button";
import TextField from "@ui/TextField";
import AddIcon from "@ui/icons/AddIcon";
import { IconButton } from "@ui/IconButton";
import { CloseIcon } from "@ui/icons";
import { useState, type FormEvent } from "react";
import type { Task } from "@/features/tasks/taskSlice";

type PropsType = {
  open: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string) => void;
  task: Task;
};

export const UpdateTaskDialog = ({
  open,
  onClose,
  onSubmit,
  task,
}: PropsType) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [titleError, setTitleError] = useState("");

  const isValidTitle = title.trim().length > 1;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidTitle) return;

    onSubmit(title.trim(), description.trim());
    setTitleError("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
      >
        <DialogTitle>{"Edit task"}</DialogTitle>
        <IconButton onClick={onClose} sx={{ p: 0 }}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <DialogContent>
        <Stack
          onSubmit={handleSubmit}
          component="form"
          gap={6}
          sx={{ pt: 6, minWidth: "290px" }}
        >
          <TextField
            label="title"
            color="secondary"
            variant="outlined"
            size="small"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={Boolean(titleError)}
            helperText={titleError}
          />
          <TextField
            label="description"
            color="secondary"
            variant="outlined"
            size="small"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
          />
          <Button
            startIcon={<AddIcon />}
            color="secondary"
            variant="contained"
            type="submit"
            disabled={!isValidTitle || Boolean(titleError)}
          >
            Save changes
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
