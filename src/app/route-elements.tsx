import { Navigate, Outlet } from "react-router-dom";

import { AppLayout } from "../components/ui/layout";
import { useAuth } from "../features/auth/use-auth";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export const RootLayout = () => (
  <AppLayout>
    <Outlet />
  </AppLayout>
);
