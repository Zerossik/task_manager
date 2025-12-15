import { lazyRoute } from "@/lib/lazyRoute";

import { type RouteObject } from "react-router";

export const HomeRoute: RouteObject = {
  path: "/",
  lazy: lazyRoute(() => import("@/pages/HomePage"), "default"),
};
