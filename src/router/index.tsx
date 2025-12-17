import { createBrowserRouter } from "react-router";
import { RootLayout } from "./RootLayout";

import { PageLoader } from "@/components/PageLoader";
import { HomeRoute } from "./routes/Home/HomeRoute";

import { DashboardRoute } from "./routes/Dashboard/DashboardRoute";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    hydrateFallbackElement: <PageLoader />,
    children: [
      HomeRoute,
      DashboardRoute,
      {
        path: "login",
        element: <div>Login</div>,
      },
    ],
  },
]);

export default router;
