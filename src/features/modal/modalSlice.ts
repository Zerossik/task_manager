import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ModalPayloadMap, ModalTypes } from "./modal.types";

export type Modal =
  | { modalType: null; payload?: undefined }
  | {
      [K in ModalTypes]: ModalPayloadMap[K] extends undefined
        ? {
            modalType: K;
            payload?: ModalPayloadMap[K];
          }
        : {
            modalType: K;
            payload: ModalPayloadMap[K];
          };
    }[ModalTypes];

const initialState = {
  modalType: null,
  payload: undefined,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialState as Modal,
  reducers: {
    setModalType: (_state, { payload }: PayloadAction<Modal>) => {
      return payload;
    },
  },
});

export const { setModalType } = modalSlice.actions;

export default modalSlice.reducer;
// ...
