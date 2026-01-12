import type { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import type { Column } from "./columnSlice";
import { useCallback } from "react";
import { nanoid } from "@reduxjs/toolkit";
import {
  createColumn as createNewColumn,
  updateColumn as updateExistingColumn,
  deleteById,
  deleteColumnsByBoardId,
} from "./columnSlice";

export type CreateColumnData = Omit<Column, "id">;

export const useColumns = () => {
  const dispatch = useDispatch();
  const columns = useSelector((state: RootState) => state.columns);

  const getColumnById = useCallback(
    (id: string) => {
      return columns.find((column) => column.id === id);
    },
    [columns]
  );

  const getColumnsByBoardId = useCallback(
    (boardId: string) => columns.filter((column) => column.boardId === boardId),
    [columns]
  );

  const createColumn = useCallback(
    (data: CreateColumnData) => {
      const id = nanoid(6);
      const column = { id, ...data };
      dispatch(createNewColumn(column));
    },
    [dispatch]
  );

  // Обновление колонки
  const updateColumn = useCallback(
    (id: string, data: CreateColumnData) => {
      dispatch(updateExistingColumn({ id, ...data }));
    },
    [dispatch]
  );

  // Удаление колонки
  const deleteColumn = useCallback(
    (id: string) => {
      dispatch(deleteById(id));
    },
    [dispatch]
  );

  // Удаление всех колонок по boardId
  const deleteColumnsByBoard = useCallback(
    (boardId: string) => {
      dispatch(deleteColumnsByBoardId(boardId));
    },
    [dispatch]
  );

  return {
    columns,
    getColumnsByBoardId,
    getColumnById,
    createColumn,
    updateColumn,
    deleteColumn,
    deleteColumnsByBoard,
  };
};
