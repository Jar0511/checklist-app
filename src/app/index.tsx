/* eslint-disable react-refresh/only-export-components */
// FSD의 최상층 레이어인 app에는 앱의 진입점(entry point)과 앱의 라우트 구성 등 앱 전반에 대한 구성이 포함된다.
import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { App } from "@/pages/root";
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  defer,
} from "react-router-dom";
import "./index.css";
import {
  LoadingFallback,
  RouteErrorFallBack,
} from "@/shared/ui";
import { AuthPage } from "@/pages/auth";
import {
  getAllChecklist,
  loadRoomList,
} from "@/pages/room";
const RoomListPage = lazy(() =>
  import("@/pages/room").then(({ RoomListPage }) => ({
    default: RoomListPage,
  }))
);
const RoomWrapper = lazy(() =>
  import("@/pages/room").then(({ RoomWrapper }) => ({
    default: RoomWrapper,
  }))
);
const BannerDashBoardPage = lazy(() =>
  import("@/pages/banner").then(
    ({ BannerDashBoardPage }) => ({
      default: BannerDashBoardPage,
    })
  )
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouteErrorFallBack root />,
    children: [
      {
        path: "auth/:action",
        element: <AuthPage />,
      },
      {
        path: "room",
        element: <Outlet />,
        children: [
          {
            path: "list",
            element: (
              <Suspense
                fallback={<LoadingFallback screen />}
              >
                <RoomListPage />
              </Suspense>
            ),
            loader: loadRoomList,
          },
          {
            path: ":room_id",
            element: (
              <Suspense
                fallback={<LoadingFallback screen />}
              >
                <RoomWrapper />
              </Suspense>
            ),
            loader: ({ params }) =>
              defer({
                checklist: getAllChecklist(
                  Number(params.room_id)
                ),
              }),
          },
        ],
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<LoadingFallback screen />}>
            <BannerDashBoardPage />
          </Suspense>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
