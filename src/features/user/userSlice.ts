import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  userName: string;
  isDrawerOpenByDefault: boolean;
}

const initialState: User = {
  userName: "",
  isDrawerOpenByDefault: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    toggleDrawer: (state) => {
      state.isDrawerOpenByDefault = !state.isDrawerOpenByDefault;
    },
  },
});

export const { setUserName, toggleDrawer } = userSlice.actions;

export default userSlice.reducer;
