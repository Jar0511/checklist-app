/* eslint-disable react-refresh/only-export-components */
// FSD의 최상층 레이어인 app에는 앱의 진입점(entry point)과 앱의 라우트 구성 등 앱 전반에 대한 구성이 포함된다.
import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@/pages/root'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'

const LoginPage = lazy(() => import('@/pages/login').then(({ LoginPage }) => ({ default: LoginPage})))

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Suspense><LoginPage /></Suspense>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
