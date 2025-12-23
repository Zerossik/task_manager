import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import type { Board } from "@/features/boards/boardSlice";
import ListItemButton from "@mui/material/ListItemButton";
import { NavLink } from "react-router";
import Box from "@mui/material/Box";
import { IconButton } from "@ui/IconButton";
import { DeleteIcon, EditIcon } from "@ui/icons";
import type { SxProps } from "@mui/material";
import { theme } from "@/Theme";
import { memo } from "react";
import type { BoardsDialogMode } from "./Boards";

const style = {
  item: {
    p: theme.layout.sidebar.padding,
  },
  iconButtons: {
    p: 1,
    "& .MuiSvgIcon-root": {
      fontSize: 24,
    },
  },
  itemLink: {
    p: 0,
    color: theme.palette.text.secondary,
    "&:hover": {
      bgcolor: "transparent",
    },
  },
} satisfies Record<string, SxProps>;

interface BoardListProps {
  boards: Board[];
  onClick: (
    id: string,
    action: Exclude<BoardsDialogMode, "createBoard" | null>
  ) => void;
}

const BoardList = ({ boards, onClick }: BoardListProps) => {
  return (
    <List>
      {boards.map((board) => (
        <ListItem key={board.id} sx={style.item}>
          <ListItemButton
            sx={style.itemLink}
            component={NavLink}
            to={board.slug}
          >
            {board.title}
          </ListItemButton>
          <Box>
            <IconButton
              sx={style.iconButtons}
              onClick={() => onClick(board.id, "updateBoard")}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              sx={style.iconButtons}
              onClick={() => onClick(board.id, "deleteBoard")}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default memo(BoardList);
