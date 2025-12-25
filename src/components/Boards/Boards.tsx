import { useBoards } from "@/features/boards/useBoards";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@/components/ui/IconButton";
import BoardList from "./BoardList";
import { type SxProps, type Theme } from "@mui/material";
import { memo, useCallback, useState } from "react";
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

export type DialogState =
  | { mode: null }
  | { mode: "createBoard" }
  | { mode: "updateBoard"; boardId: string }
  | { mode: "deleteBoard"; boardId: string };

const Title = memo(SectionTitle);

const Boards = () => {
  const [dialog, setDialog] = useState<DialogState>({ mode: null });
  const [boardTitle, setBoardTitle] = useState("");
  const [error, setError] = useState<string>("");
  const {
    boards,
    createBoard,
    deleteBoardById,
    getBoardById,
    updateBoardById,
  } = useBoards();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const resetState = () => {
    setDialog({ mode: null });
    setBoardTitle("");
    setError("");
  };

  const handleItemClick = useCallback(
    (dialogState: DialogState) => {
      switch (dialogState.mode) {
        case "createBoard": {
          setDialog({ mode: "createBoard" });
          return;
        }
        case "updateBoard": {
          const initialTitle = getBoardById(dialogState.boardId)?.title;
          if (initialTitle) setBoardTitle(initialTitle);
          setDialog({ mode: "updateBoard", boardId: dialogState.boardId });
          return;
        }
        case "deleteBoard": {
          setDialog({ mode: "deleteBoard", boardId: dialogState.boardId });
          return;
        }
        default: {
          resetState();
        }
      }
    },
    [getBoardById]
  );

  const onChangeTitle = (newValue: string) => {
    setBoardTitle(newValue);
    if (error) {
      setError("");
    }
  };

  const onSubmit = () => {
    switch (dialog.mode) {
      case "createBoard": {
        const result = createBoard(boardTitle);
        if (!result.ok) return setError(result.error);
        break;
      }
      case "updateBoard": {
        const result = updateBoardById(dialog.boardId, { title: boardTitle });
        if (!result.ok) return setError(result.error);
        break;
      }
      case "deleteBoard": {
        const board = getBoardById(dialog.boardId);
        deleteBoardById(dialog.boardId);
        if (slug === board?.slug) navigate("/dashboard", { replace: true });
        break;
      }
    }
    resetState();
  };

  return (
    <>
      <Title onClick={handleItemClick} />
      <BoardList boards={boards} onClick={handleItemClick} />

      {/* The code below is modal windows */}
      <CreateAndUpdateBoard
        open={dialog.mode === "createBoard" || dialog.mode === "updateBoard"}
        onClose={() => setDialog({ mode: null })}
        onSubmit={() => onSubmit()}
        onChange={(e) => onChangeTitle(e.target.value)}
        title={boardTitle}
        id={dialog.mode === "updateBoard" ? dialog.boardId : undefined}
        error={error}
      />
      <ConfirmationModal
        open={dialog.mode === "deleteBoard"}
        message="are you sure?"
        onReject={() => resetState()}
        onSuccess={() => onSubmit()}
      />
    </>
  );
};

export default Boards;

type SectionTitleType = {
  onClick: (dialogState: DialogState) => void;
};

function SectionTitle({ onClick }: SectionTitleType) {
  return (
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
        onClick={() => onClick({ mode: "createBoard" })}
      >
        <AddIcon />
      </IconButton>
    </Stack>
  );
}
