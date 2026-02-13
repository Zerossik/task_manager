import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  deleteTaskById as deleteTask,
  updateTaskById as updateTask,
  deleteTasksByColumnId as deleteTasksByColumn,
  type Task,
} from "@/features/tasks/taskSlice";
import type { RootState } from "@/store/store";
import { nanoid } from "@reduxjs/toolkit";
import slugify from "slugify";

type Response = { ok: true; task: Task } | { ok: false; error: string };
type TaskData = Omit<Task, "id" | "created_at" | "slug">;

export const useTasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);

  const createTask = useCallback(
    (task: TaskData): Response => {
      const { title } = task;
      const trimmedTitle = title.trim();
      if (!trimmedTitle) {
        return {
          ok: false,
          error: "Task title cannot be empty.",
        };
      }
      const id = nanoid(6);
      const created_at = new Date().toISOString();
      const slug = slugify(title);
      const newTask: Task = {
        ...task,
        id,
        created_at,
        slug,
      };
      dispatch(addTask(newTask));
      return { ok: true, task: newTask };
    },
    [dispatch],
  );

  const getTaskById = useCallback(
    (id: string) => tasks.find((task) => task.id === id) || null,
    [tasks],
  );

  const getTasksByColumnId = useCallback(
    (columnId: string) => tasks.filter((task) => task.columnId === columnId),
    [tasks],
  );

  const updateTaskById = useCallback(
    (id: string, updates: Partial<Task>): Response => {
      const task = tasks.find((task) => task.id === id);
      if (!task) {
        return { ok: false, error: `Task with ID - ${id} not Found` };
      }
      const updatedTask = { ...task, ...updates };
      dispatch(updateTask(updatedTask));
      return { ok: true, task: updatedTask };
    },
    [tasks, dispatch],
  );

  const deleteTaskById = useCallback(
    (id: string) => {
      dispatch(deleteTask(id));
    },
    [dispatch],
  );

  const deleteTasksByColumnId = useCallback(
    (columnId: string) => {
      dispatch(deleteTasksByColumn(columnId));
    },
    [dispatch],
  );

  return {
    tasks,
    createTask,
    deleteTaskById,
    deleteTasksByColumnId,
    getTaskById,
    getTasksByColumnId,
    updateTaskById,
  };
};
