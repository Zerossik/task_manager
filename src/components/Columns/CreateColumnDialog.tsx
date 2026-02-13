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
type PropsType = {
  open: boolean;
  onClose: () => void;
  onSubmit: (title: string) => void;
};

export const CreateColumnDialog = ({ open, onClose, onSubmit }: PropsType) => {
  const [title, setTitle] = useState("");

  const isValidTitle = title.trim().length > 1;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidTitle) return;
    onSubmit(title.trim());
    setTitle("");
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
        <DialogTitle>{"New column"}</DialogTitle>
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
          />
          <Button
            startIcon={<AddIcon />}
            color="secondary"
            variant="contained"
            type="submit"
            disabled={!isValidTitle}
          >
            Add column
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
