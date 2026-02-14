import type { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import type { Column } from "./columnSlice";
import { useCallback } from "react";
import { nanoid } from "@reduxjs/toolkit";
import {
  createColumn as createNewColumn,
  updateColumn as updateExistingColumn,
  deleteById,
} from "./columnSlice";
import { useTasks } from "@/features/tasks/useTasks";

export type CreateColumnData = Omit<Column, "id">;

export const useColumns = () => {
  const dispatch = useDispatch();
  const columns = useSelector((state: RootState) => state.columns);
  const { deleteTasksByColumnId } = useTasks();

  const getColumnById = useCallback(
    (id: string) => {
      return columns.find((column) => column.id === id);
    },
    [columns],
  );

  const getColumnsByBoardId = useCallback(
    (boardId: string) => columns.filter((column) => column.boardId === boardId),
    [columns],
  );

  const createColumn = useCallback(
    (data: CreateColumnData) => {
      const id = nanoid(6);
      const column = { id, ...data };
      dispatch(createNewColumn(column));
    },
    [dispatch],
  );

  // Обновление колонки
  const updateColumn = useCallback(
    (id: string, data: CreateColumnData) => {
      dispatch(updateExistingColumn({ id, ...data }));
    },
    [dispatch],
  );

  // delete column and all tasks by Column ID
  const deleteColumn = useCallback(
    (id: string) => {
      deleteTasksByColumnId(id);
      dispatch(deleteById(id));
    },
    [dispatch, deleteTasksByColumnId],
  );

  // Удаление всех колонок по boardId
  const deleteColumnsByBoard = useCallback(
    (boardId: string) => {
      columns.forEach((column) => {
        if (column.boardId === boardId) deleteColumn(column.id);
      });
    },
    [columns, deleteColumn],
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
