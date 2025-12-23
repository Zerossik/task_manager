import { useBoards } from "@/features/boards/useBoards";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@/components/ui/IconButton";
import BoardList from "./BoardList";
import { type SxProps, type Theme } from "@mui/material";
import { useCallback, useState } from "react";
import CreateAndUpdateBoard from "./CreateAndUpdateBoard";
import { ConfirmationModal } from "../ConfirmationModal/ConfirmationModal";
import { useNavigate, useParams } from "react-router";

const style = {
  sectionTitle: (theme) => ({ p: theme?.layout.sidebar.padding }),
  addButton: {
    width: 40,
    height: 40,
    color: "secondary.contrastText",
    bgcolor: "secondary.main",
    "&:hover": {
      bgcolor: "secondary.dark",
    },
  },
} satisfies Record<string, SxProps<Theme>>;

export type BoardsDialogMode =
  | "createBoard"
  | "updateBoard"
  | "deleteBoard"
  | null;

const Boards = () => {
  const [mode, setMode] = useState<BoardsDialogMode>(null);
  const [boardTitle, setBoardTitle] = useState("");
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const {
    boards,
    createBoard,
    deleteBoardById,
    getBoardById,
    updateBoardById,
  } = useBoards();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const onCreateBoard = () => {
    createBoard(boardTitle);
    resetState();
  };

  const onDeleteBoard = () => {
    if (!selectedId) return;
    const board = getBoardById(selectedId);
    deleteBoardById(selectedId);
    if (slug === board?.slug) navigate("/dashboard", { replace: true });

    resetState();
  };

  const onUpdateBoard = () => {
    if (!selectedId || !boardTitle) return;
    updateBoardById(selectedId, { title: boardTitle });
  };

  const handleItemClick = useCallback(
    (id: string, action: Exclude<BoardsDialogMode, "createBoard" | null>) => {
      setSelectedId(id);
      if (action === "deleteBoard") setMode("deleteBoard");
      else {
        const initialTitle = getBoardById(id)?.title;
        setMode("updateBoard");
        if (initialTitle) setBoardTitle(initialTitle);
      }
    },
    [getBoardById]
  );

  function resetState() {
    setMode(null);
    setBoardTitle("");
    setSelectedId(undefined);
  }

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={style.sectionTitle}
      >
        <Typography fontWeight={600}>Create a new board</Typography>
        <IconButton
          aria-label="add board"
          sx={style.addButton}
          onClick={() => setMode("createBoard")}
        >
          <AddIcon />
        </IconButton>
      </Stack>

      <BoardList boards={boards} onClick={handleItemClick} />

      <CreateAndUpdateBoard
        open={mode === "createBoard"}
        onClose={resetState}
        onSubmit={() => onCreateBoard()}
        onTitleChange={setBoardTitle}
        title={boardTitle}
      />
      <CreateAndUpdateBoard
        open={mode === "updateBoard"}
        onClose={resetState}
        onSubmit={() => onUpdateBoard()}
        onTitleChange={setBoardTitle}
        title={boardTitle}
        id={selectedId}
      />

      <ConfirmationModal
        open={mode === "deleteBoard"}
        message="are you sure?"
        onReject={resetState}
        onSuccess={onDeleteBoard}
      />
    </>
  );
};

export default Boards;
