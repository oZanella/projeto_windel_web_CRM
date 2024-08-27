import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { App } from './App.jsx'

import './style/GlobalStyles.css'

//páginas do projeto
import { Cadastro } from './routes/Cadastro.jsx'
import { Home } from './routes/Home.jsx'
import { Guia } from "./routes/Guia.jsx" 

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Navigate to="/home" replace />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/cadastro',
        element: <Cadastro />,
      },
      {
        path: '/guia',
        element: <Guia />,
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
