import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Button from "@/shared/ui/Button";
import TextField from "@/shared/ui/TextField";
import AddIcon from "@ui/icons/AddIcon";
import { IconButton } from "@/shared/ui/IconButton";
import { CloseIcon } from "@ui/icons";
import { useState, type FormEvent } from "react";
import type { Column } from "@/features/columns/columnSlice";

type PropsType = {
  onClose: () => void;
  onSubmit: (title: string) => void;
  column: Column | undefined;
};

export const UpdateColumnDialog = ({
  onClose,
  onSubmit,
  column,
}: PropsType) => {
  const [title, setTitle] = useState(column?.title || "");
  console.log(title);
  const isValidTitle = title.trim().length > 1;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidTitle) return;
    onSubmit(title.trim());
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
      >
        <DialogTitle>{"Edit column"}</DialogTitle>
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
            Save changes
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
