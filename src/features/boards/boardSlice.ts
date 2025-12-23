import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Board {
  id: string;
  title: string;
  slug: string;
}
const initialState: Board[] = [];
const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addBoard: (state, { payload }: PayloadAction<Board>) => {
      state.push(payload);
    },

    deleteBoardById: (state, { payload }: PayloadAction<string>) => {
      const index = state.findIndex((board) => board.id === payload);
      if (index !== -1) state.splice(index, 1);
    },
    updateBoardById: (
      state,
      { payload }: PayloadAction<{ id: string; board: Partial<Board> }>
    ) => {
      const index = state.findIndex((board) => board.id === payload.id);
      const updatedBoard = { ...state[index], ...payload.board };
      state.splice(index, 1, updatedBoard);
    },
  },
});

export const { addBoard, deleteBoardById, updateBoardById } =
  boardSlice.actions;
export default boardSlice.reducer;
