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
import { useColumns } from "@/features/columns/useColumns";

type Response = { ok: true; board: Board } | { ok: false; error: string };

type UpdateData = Partial<Board>;

export const useBoards = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state: RootState) => state.boards);
  const { deleteColumnsByBoard } = useColumns();

  const createBoard = useCallback(
    (title: string): Response => {
      const trimmedTitle = title.trim();
      const isExists = boards.some(
        (board) => board.title.toLowerCase() === trimmedTitle.toLowerCase(),
      );
      if (isExists)
        return {
          ok: false,
          error: `Board with title "${trimmedTitle}" already exists.`,
        };
      const id = nanoid(6);
      const slug = slugify(title, { lower: true, trim: true });
      const newBoard = { id, slug, title: trimmedTitle };
      dispatch(addBoard(newBoard));
      return { ok: true, board: newBoard };
    },
    [boards, dispatch],
  );

  const getBoardById = useCallback(
    (id: string) => boards.find((board) => board.id === id) || null,
    [boards],
  );

  const getBoardBySlug = useCallback(
    (slug: string) => boards.find((board) => board.slug === slug) || null,
    [boards],
  );

  const updateBoardById = useCallback(
    (id: string, updates: UpdateData): Response => {
      const board = boards.find((board) => board.id === id);
      if (!board)
        return { ok: false, error: `Board with ID - ${id} not Found` };
      const isExist = boards.some(
        (board) => board.title.toLowerCase() === updates.title?.toLowerCase(),
      );
      if (isExist)
        return {
          ok: false,
          error: `Board with title "${updates.title}" already exists.`,
        };
      const updatedBoard = { ...board, ...updates };
      dispatch(updateBoard(updatedBoard));
      return { ok: true, board: updatedBoard };
    },
    [boards, dispatch],
  );

  const deleteBoardById = useCallback(
    (id: string) => {
      deleteColumnsByBoard(id);
      dispatch(deleteBoard(id));
    },
    [deleteColumnsByBoard, dispatch],
  );

  return {
    boards,
    createBoard,
    deleteBoardById,
    getBoardById,
    getBoardBySlug,
    updateBoardById,
  };
};
