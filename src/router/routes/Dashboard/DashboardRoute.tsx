import ProtectedRoute from "@/components/ProtectedRoute";
import { lazyRoute } from "@/lib/lazyRoute";
import { Layout } from "@/pages/Dashboard";

import { type RouteObject } from "react-router";

export const DashboardRoute: RouteObject = {
  path: "/dashboard",
  element: (
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>
  ),
  children: [
    {
      index: true,
      lazy: lazyRoute(() => import("@/pages/Dashboard"), "Dashboard"),
    },
  ],
};
