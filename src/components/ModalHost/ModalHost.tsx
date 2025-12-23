// import { useModal } from "@/features/modal/useModal";
// import Dialog from "@mui/material/Dialog";
// import CreateAndUpdateBoard from "@/components/Boards/CreateAndUpdateBoard";
// import type { ModalTypes } from "@/features/modal/modal.types";
// import type { ComponentType } from "react";

// const componentMap: Record<ModalTypes, ComponentType<object>> = {
//   createBoard: CreateAndUpdateBoard,
//   updateBoard: CreateAndUpdateBoard,
// };
// const ModalHost = () => {
//   const { modalType, modalClose, payload } = useModal();
//   const isOpen = Boolean(modalType);

//   const Component = modalType ? componentMap[modalType] : null;

//   return (
//     <Dialog open={isOpen} onClose={modalClose}>
//       {Component && <Component {...payload} />}
//     </Dialog>
//   );
// };

// export default ModalHost;
