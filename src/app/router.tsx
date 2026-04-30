import { createBrowserRouter } from "react-router-dom";

import { ProtectedRoute, RootLayout } from "./route-elements";
import { AdopcionPage } from "../pages/adopcion-page";
import { AdminPage } from "../pages/admin-page";
import { HomePage } from "../pages/home-page";
import { LoginPage } from "../pages/login-page";
import { MascotaDetailPage } from "../pages/mascota-detail-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "mascotas/:id", element: <MascotaDetailPage /> },
      { path: "adopciones", element: <AdopcionPage /> },
      { path: "login", element: <LoginPage /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: "admin", element: <AdminPage /> }],
      },
    ],
  },
]);
