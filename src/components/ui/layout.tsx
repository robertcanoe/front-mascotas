import { Link, NavLink } from "react-router-dom";
import type { ReactNode } from "react";

import { useAuth } from "../../features/auth/use-auth";

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Saltar al contenido
      </a>
      <header className="topbar">
        <Link to="/" className="brand">
          Mascotas
        </Link>
        <nav aria-label="Main">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/adopciones">Adopcion</NavLink>
          <NavLink to="/admin">Panel admin</NavLink>
          {isAuthenticated ? (
            <button type="button" onClick={logout}>
              Logout
            </button>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </nav>
      </header>
      <main id="main-content">{children}</main>
    </div>
  );
};
