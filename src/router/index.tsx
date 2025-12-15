import { createBrowserRouter, Outlet } from "react-router";
import { RootLayout } from "./RootLayout";
import { lazyRoute } from "@/lib/lazyRoute";
import { PageLoader } from "@/components/PageLoader";
import { HomeRoute } from "./routes/Home/HomeRoute";
import ProtectedRoute from "@/components/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    hydrateFallbackElement: <PageLoader />,
    children: [
      HomeRoute,
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            lazy: lazyRoute(() => import("@/pages/Dashboard"), "default"),
          },
        ],
      },
      {
        path: "login",
        element: <div>Login</div>,
      },
    ],
  },
]);

export default router;
