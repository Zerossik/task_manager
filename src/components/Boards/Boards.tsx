import { useBoards } from "@/features/boards/useBoards";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@/components/ui/IconButton";
import { List, ListItem } from "@mui/material";
import { memo, useState } from "react";
import BoardDialog from "./BoardDialog";
import { BoardCard } from "./BoardCard";

const Title = memo(SectionTitle);

const Boards = () => {
  const { boards } = useBoards();

  // const resetState = () => {
  //   setDialog({ mode: null });
  //   setBoardTitle("");
  //   setError("");
  // };

  // const handleItemClick = useCallback(
  //   (dialogState: DialogState) => {
  //     switch (dialogState.mode) {
  //       case "createBoard": {
  //         setDialog({ mode: "createBoard" });
  //         return;
  //       }
  //       case "updateBoard": {
  //         const initialTitle = getBoardById(dialogState.boardId)?.title;
  //         if (initialTitle) setBoardTitle(initialTitle);
  //         setDialog({ mode: "updateBoard", boardId: dialogState.boardId });
  //         return;
  //       }
  //       case "deleteBoard": {
  //         setDialog({ mode: "deleteBoard", boardId: dialogState.boardId });
  //         return;
  //       }
  //       default: {
  //         resetState();
  //       }
  //     }
  //   },
  //   [getBoardById],
  // );

  // const onSubmit = () => {
  //   switch (dialog.mode) {
  //     case "createBoard": {
  //       const result = createBoard(boardTitle);
  //       if (!result.ok) return setError(result.error);
  //       break;
  //     }
  //     case "updateBoard": {
  //       const result = updateBoardById(dialog.boardId, { title: boardTitle });
  //       if (!result.ok) return setError(result.error);
  //       break;
  //     }
  //     case "deleteBoard": {
  //       const board = getBoardById(dialog.boardId);
  //       deleteBoardById(dialog.boardId);
  //       if (slug === board?.slug) navigate("/dashboard", { replace: true });
  //       break;
  //     }
  //   }
  //   resetState();
  // };

  return (
    <>
      <Title />
      <List
        disablePadding
        sx={(theme) => ({ mx: -theme.layout.sidebar.padding })}
      >
        {boards.map((board) => (
          <ListItem
            key={board.id}
            sx={(theme) => ({ p: theme.layout.sidebar.padding })}
          >
            <BoardCard board={board} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Boards;

function SectionTitle() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (
    <>
      <Stack gap={(theme) => theme.spacingConfig.blockGap.mobile}>
        <Typography color="textSecondary" borderBottom={1}>
          My boards
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography fontWeight={600}>Create a new board</Typography>
          <IconButton
            aria-label="add board"
            sx={{
              width: 40,
              height: 40,
              color: "secondary.contrastText",
              bgcolor: "secondary.main",
              "&:hover": {
                bgcolor: "secondary.dark",
              },
            }}
            onClick={() => setOpenDialog(true)}
          >
            <AddIcon />
          </IconButton>
        </Stack>
      </Stack>

      <BoardDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </>
  );
}
