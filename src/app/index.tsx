/* eslint-disable react-refresh/only-export-components */
// FSD의 최상층 레이어인 app에는 앱의 진입점(entry point)과 앱의 라우트 구성 등 앱 전반에 대한 구성이 포함된다.
import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@/pages/root'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import { LoadingPageFallback, RouteErrorFallBack } from '@/shared/ui'

const LoginPage = lazy(() => import('@/pages/login').then(({ LoginPage }) => ({ default: LoginPage })));
const RegisterPage = lazy(() => import('@/pages/register').then(({ RegisterPage }) => ({ default: RegisterPage })));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouteErrorFallBack root />,
    children: [
      {
        path: "auth",
        element: <Outlet />,
        children: [
          {
            path: "login",
            element:
              <Suspense fallback={<LoadingPageFallback />}>
                <LoginPage />
              </Suspense>
          },
          {
            path: "register",
            element:
              <Suspense fallback={<LoadingPageFallback />}>
                <RegisterPage />
              </Suspense>
          }
        ]
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
