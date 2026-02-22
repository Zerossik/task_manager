import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import { CloseIcon } from "@ui/icons";
import TextField from "@ui/TextField";
import Button from "@ui/Button";
import CustomAddIcon from "@ui/icons/AddIcon";
import { IconButton } from "@/components/ui/IconButton";
import { useState, type FormEvent } from "react";
import type { Board } from "@/features/boards/boardSlice";
import { useBoards } from "@/features/boards/useBoards";

export interface UpdateBoardProps {
  board?: Board;
  onClose: () => void;
  open: boolean;
}
const BoardDialog = ({ onClose, open, board }: UpdateBoardProps) => {
  const [title, setTitle] = useState<string>(board?.title || "");
  const [error, setError] = useState<string>("");
  const { createBoard, updateBoardById } = useBoards();

  const isValidTitle = title.trim().length > 1;
  const isUpdate = board !== undefined;

  const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isUpdate) {
      const result = createBoard(title);
      if (!result.ok) return setError(result.error);
      onClose();
      setTitle("");
      return;
    }
    const result = updateBoardById(board.id, { title: title.trim() });
    if (!result.ok) return setError(result.error);
    onClose();
    return;
  };

  const onTitleChange = (title: string) => {
    setTitle(title);
    setError("");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <DialogTitle>{isUpdate ? "Edit board" : "New board"}</DialogTitle>
        <IconButton aria-label="close" onClick={onClose} sx={{ p: 0 }}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <DialogContent>
        <Stack component="form" onSubmit={handlerSubmit}>
          <TextField
            color="secondary"
            label="title"
            size="small"
            required
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            helperText={error}
            error={Boolean(error)}
          />
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            startIcon={<CustomAddIcon />}
            disabled={!isValidTitle || Boolean(error)}
          >
            {isUpdate ? "Save changes" : "Create board"}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default BoardDialog;
