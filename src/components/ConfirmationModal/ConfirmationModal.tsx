import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import { Button, DialogContent } from "@mui/material";
import type { MouseEvent } from "react";

type PropsType = {
  message: string;
  open: boolean;
  onSuccess: (e: MouseEvent<HTMLButtonElement>) => void;
  onReject: (e: MouseEvent<HTMLButtonElement>) => void;
};

export const ConfirmationModal = ({
  message = "",
  open,
  onReject,
  onSuccess,
}: PropsType) => {
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="text" color="error" onClick={onReject}>
          Cancel
        </Button>
        <Button variant="contained" color="success" onClick={onSuccess}>
          Yes, I'm sure
        </Button>
      </DialogActions>
    </Dialog>
  );
};
