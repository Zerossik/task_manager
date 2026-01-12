import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: string;
  columnId: string;
  title: string;
  created_at: string;
  deadline: string | null;
  is_completed: boolean;
}

const initialState: Task[] = [];

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, { payload }: PayloadAction<Task>) => {
      state.push(payload);
    },
    deleteTaskById: (state, { payload }: PayloadAction<string>) => {
      return state.filter((task) => task.id !== payload);
    },
    updateTaskById: (state, { payload }: PayloadAction<Task>) => {
      const index = state.findIndex((task) => task.id === payload.id);
      if (index !== -1) {
        state[index] = payload;
      }
    },
    deleteTasksByColumnId: (state, { payload }: PayloadAction<string>) => {
      return state.filter((task) => task.columnId !== payload);
    },
  },
});

export const {
  addTask,
  deleteTaskById,
  updateTaskById,
  deleteTasksByColumnId,
} = taskSlice.actions;

export default taskSlice.reducer;
