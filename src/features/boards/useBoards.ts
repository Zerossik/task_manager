import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBoard,
  deleteBoardById as deleteBoard,
  updateBoardById as updateBoard,
  type Board,
} from "@/features/boards/boardSlice";
import type { RootState } from "@/store/store";

import { nanoid } from "@reduxjs/toolkit";
import slugify from "slugify";

export const useBoards = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state: RootState) => state.boards);

  const createBoard = useCallback(
    (title: string) => {
      const trimmedTitle = title.trim();
      const id = nanoid(6);
      const slug = slugify(title, { lower: true, trim: true });
      const newBoard = { id, slug, title: trimmedTitle };
      dispatch(addBoard(newBoard));
    },
    [dispatch]
  );

  const getBoardById = useCallback(
    (id: string) => boards.find((board) => board.id === id) || null,
    [boards]
  );

  const updateBoardById = useCallback(
    (id: string, updates: Partial<Board>) => {
      dispatch(updateBoard({ id, board: updates }));
    },
    [dispatch]
  );

  const deleteBoardById = useCallback(
    (id: string) => {
      dispatch(deleteBoard(id));
    },
    [dispatch]
  );

  return {
    // boards: memoizedBoards,
    boards,
    createBoard,
    deleteBoardById,
    getBoardById,
    updateBoardById,
    // updateBoard: updateBoardById,
    // deleteBoard: deleteBoardById,
  };
};
