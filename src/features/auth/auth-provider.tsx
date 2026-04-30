import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { AuthContext } from "./auth-context";
import { authStorage } from "./auth-storage";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(authStorage.getToken());

  useEffect(() => {
    const listener = () => setToken(authStorage.getToken());
    window.addEventListener("auth-changed", listener);
    return () => window.removeEventListener("auth-changed", listener);
  }, []);

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      saveToken: authStorage.setToken,
      logout: authStorage.clearToken,
    }),
    [token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
