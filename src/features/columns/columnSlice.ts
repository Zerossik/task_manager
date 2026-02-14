import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Column = {
  id: string;
  boardId: string;
  title: string;
};

const columnSlice = createSlice({
  name: "columns",
  initialState: [] as Column[],
  reducers: {
    createColumn: (state, { payload }: PayloadAction<Column>) => {
      state.push(payload);
    },

    updateColumn: (
      state,
      { payload }: PayloadAction<Omit<Column, "boardId">>,
    ) => {
      const { id, ...data } = payload;
      const columnIndex = state.findIndex((board) => board.id === id);

      if (columnIndex !== -1) {
        const updatedColumn = Object.assign(state[columnIndex], data);
        state.splice(columnIndex, 1, updatedColumn);
      }
    },

    deleteById: (state, { payload }: PayloadAction<string>) => {
      const columnIndex = state.findIndex((board) => board.id === payload);
      if (columnIndex !== -1) state.splice(columnIndex, 1);
    },
  },
});

export const { createColumn, updateColumn, deleteById } = columnSlice.actions;

export default columnSlice.reducer;
