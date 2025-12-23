import type { UpdateBoardProps } from "@/components/Boards/CreateAndUpdateBoard";

export type ModalPayloadMap = {
  createBoard: undefined;
  updateBoard: UpdateBoardProps;
};

export type ModalTypes = keyof ModalPayloadMap;
