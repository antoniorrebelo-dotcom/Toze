import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { apiFetch } from "./api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // user: undefined = a verificar, null = sem sessão, string = nome do utilizador
  const [user, setUser] = useState(undefined);

  const refresh = useCallback(async () => {
    try {
      const r = await apiFetch("session");
      const j = await r.json();
      setUser(j.authenticated ? j.user : null);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    refresh();
    const onExpired = () => setUser(null);
    window.addEventListener("auth:expired", onExpired);
    return () => window.removeEventListener("auth:expired", onExpired);
  }, [refresh]);

  const login = async (username, password) => {
    const r = await apiFetch("login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    let j = {};
    try {
      j = await r.json();
    } catch {
      /* resposta inválida */
    }
    if (r.ok && j.success) {
      setUser(j.user);
      return { ok: true };
    }
    return { ok: false, error: j.error || "Não foi possível entrar." };
  };

  const logout = async () => {
    try {
      await apiFetch("logout", { method: "POST" });
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
