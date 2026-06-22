import type { UpdateBoardProps } from "@/components/Boards/BoardDialog";

export type ModalPayloadMap = {
  createBoard: undefined;
  updateBoard: UpdateBoardProps;
};

export type ModalTypes = keyof ModalPayloadMap;
