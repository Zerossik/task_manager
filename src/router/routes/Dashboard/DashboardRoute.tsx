import ProtectedRoute from "@/components/ProtectedRoute";
import { lazyRoute } from "@/lib/lazyRoute";
import { DashboardLayout } from "@/pages/Dashboard";
import { TaskPage } from "@/pages/Task/TaskPage";

import type { RouteObject } from "react-router";

export const DashboardRoute: RouteObject = {
  path: "/dashboard",
  element: (
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      index: true,
      lazy: lazyRoute(() => import("@/pages/Dashboard"), "Dashboard"),
    },
    {
      path: ":slug",
      lazy: lazyRoute(() => import("@/pages/Dashboard"), "BoardPage"),
      children: [{ path: ":id", element: <TaskPage /> }],
    },
  ],
};
