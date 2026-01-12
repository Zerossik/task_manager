import type { UpdateBoardProps } from "@/components/Navigation/SidebarBoards/CreateAndUpdateBoard";

export type ModalPayloadMap = {
  createBoard: undefined;
  updateBoard: UpdateBoardProps;
};

export type ModalTypes = keyof ModalPayloadMap;
