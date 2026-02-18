import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { CloseIcon } from "@ui/icons";
import { IconButton } from "@ui/IconButton";
import type { Column } from "@/features/columns/columnSlice";
import TextField from "@ui/TextField";
import Button from "@ui/Button";
import { useState, type FormEvent } from "react";
import CustomAddIcon from "@ui/icons/AddIcon";

type PropsType = {
  open: boolean;
  onClose: () => void;
  onCreate?: (title: string) => void;
  onUpdate?: (title: string) => void;
  column?: Column;
};

export const ColumnDialog = ({
  open,
  onClose,
  onCreate,
  onUpdate,
  column,
}: PropsType) => {
  const [title, setTitle] = useState<string>(column?.title || "");
  const isUpdate = column !== undefined;
  const isValidTitle = title.trim().length > 1;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isUpdate) onCreate?.(title.trim());
    else onUpdate?.(title.trim());
    onClose();
    setTitle("");
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <DialogTitle>{isUpdate ? "Edit column" : "New column"}</DialogTitle>
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <DialogContent>
        <Stack
          component="form"
          onSubmit={onSubmit}
          sx={{ gap: 2, paddingTop: 2 }}
        >
          <TextField
            color="secondary"
            label="title"
            sx={{ width: 300 }}
            size="small"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            startIcon={<CustomAddIcon />}
            disabled={!isValidTitle}
          >
            {isUpdate ? "Save changes" : "Create column"}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
