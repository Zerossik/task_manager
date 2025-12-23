import type { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setModalType, type Modal } from "./modalSlice";

export const useModal = () => {
  const dispatch = useDispatch();
  const { modalType, payload } = useSelector((state: RootState) => state.modal);

  // ТУТ НУЖНО РАЗДЕЛИТЬ ДАТУ И НОРМАЛЬНО ТИПИЗИРОВАТь
  const modalOpen = (data: Modal) => {
    dispatch(setModalType(data));
  };

  const modalClose = () => {
    const data = {
      modalType: null,
    };
    dispatch(setModalType(data));
  };

  return { modalType, payload, modalOpen, modalClose };
};
