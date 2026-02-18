import type { Board } from "@/features/boards/boardSlice";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

import { IconButton } from "@ui/IconButton";
import { DeleteIcon, EditIcon } from "@ui/icons";
import { useState } from "react";
import { ConfirmationModal } from "@/components/ConfirmationModal/ConfirmationModal";
import BoardDialog from "./BoardDialog";
import { useBoards } from "@/features/boards/useBoards";
import { useNavigate, useParams } from "react-router";

type PropsType = {
  board: Board;
};

export const BoardCard = ({ board }: PropsType) => {
  const [isEditDialog, setIsEditDialog] = useState<boolean>(false);
  const [isDeleteDialog, setIsDeleteDialog] = useState<boolean>(false);
  const { deleteBoardById } = useBoards();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const onDelete = () => {
    deleteBoardById(board.id);
    if (slug === board?.slug) navigate("/dashboard", { replace: true });
  };
  return (
    <>
      <Stack
        sx={(theme) => ({
          p: 0,
          color: theme.palette.text.secondary,
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1,
          "&:hover": {
            bgcolor: "transparent",
          },
        })}
      >
        <Link href={board.slug} sx={{ color: "text.secondary" }}>
          {board.title}
        </Link>

        <Box>
          <IconButton
            sx={{
              p: 1,
              "& .MuiSvgIcon-root": {
                fontSize: 24,
              },
            }}
            onClick={() => setIsEditDialog(true)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            sx={{
              p: 1,
              "& .MuiSvgIcon-root": {
                fontSize: 24,
              },
            }}
            onClick={() => setIsDeleteDialog(true)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Stack>

      <BoardDialog
        open={isEditDialog}
        board={board}
        onClose={() => setIsEditDialog(false)}
      />

      {/* Delete board modal Dialog */}
      <ConfirmationModal
        open={isDeleteDialog}
        message="are you sure?"
        onReject={() => setIsDeleteDialog(false)}
        onSuccess={() => onDelete()}
      />
    </>
  );
};
