import { createBrowserRouter } from "react-router";
import { RootLayout } from "./RootLayout";

import { PageLoader } from "@/components/PageLoader";
import { HomeRoute } from "./routes/Home/HomeRoute";

import { DashboardRoute } from "./routes/Dashboard/DashboardRoute";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    hydrateFallbackElement: <PageLoader />,
    errorElement: <div>This is error Page</div>,
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
