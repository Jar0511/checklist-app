// FSD의 최상층 레이어인 app에는 앱의 진입점(entry point)과 앱의 라우트 구성 등 앱 전반에 대한 구성이 포함된다.
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@/pages/root'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
