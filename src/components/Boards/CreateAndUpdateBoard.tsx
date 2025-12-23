import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import { CloseIcon } from "@ui/icons";
import TextField from "@ui/TextField";
import Button from "@ui/Button";
import CustomAddIcon from "@ui/icons/AddIcon";
import { IconButton } from "@/components/ui/IconButton";
import type { SxProps, Theme } from "@mui/material";
import type { FormEvent } from "react";

const style = {
  dialogClose: {
    p: 0,
  },
} satisfies Record<string, SxProps<Theme>>;

export interface UpdateBoardProps {
  id?: string;
  title: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onTitleChange: (title: string) => void;
  onClose: () => void;
  open: boolean;
}
const CreateAndUpdateBoard = ({
  id,
  title,
  onTitleChange,
  onSubmit,
  onClose,
  open,
}: UpdateBoardProps) => {
  const isValidTitle = title.trim().length > 1;

  const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
    onClose();
  };

  return (
    <Dialog open={open}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <DialogTitle>{id ? "Edit board" : "New board"}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => onClose()}
          sx={style.dialogClose}
        >
          <CloseIcon />
        </IconButton>
      </Stack>
      <DialogContent>
        <form onSubmit={handlerSubmit}>
          <TextField
            color="secondary"
            label="title"
            sx={{ width: 300 }}
            size="small"
            required
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
          />
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            startIcon={<CustomAddIcon />}
            disabled={!isValidTitle}
          >
            {id ? "Edit" : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAndUpdateBoard;
