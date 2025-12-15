import type { RootState } from "@/store/store";
import { type ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

type PropsType = {
  children: ReactElement;
};
const ProtectedRoute = ({ children }: PropsType) => {
  const user = useSelector((state: RootState) => state.user.userName);

  return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
