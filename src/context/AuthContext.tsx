"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/**
 * DEMO auth only. This runs entirely in the browser, so these
 * credentials are visible in the client bundle — this is NOT real
 * security. A production store needs a backend with hashed passwords
 * and server-side sessions.
 */
const ADMIN_EMAIL = "dhoniacademy@gmail.com";
const ADMIN_PASSWORD = "Mm@Sports@2026";
const STORAGE_KEY = "mmsports-auth-v1";

export interface AuthUser {
  email: string;
  isAdmin: boolean;
}

interface AuthApi {
  user: AuthUser | null;
  isAdmin: boolean;
  ready: boolean;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthApi | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, [user, ready]);

  const login = useCallback((emailRaw: string, password: string) => {
    const email = emailRaw.trim().toLowerCase();
    if (!email || !password) return { ok: false, error: "Enter your email and password." };

    if (email === ADMIN_EMAIL) {
      if (password !== ADMIN_PASSWORD) return { ok: false, error: "Incorrect password." };
      setUser({ email, isAdmin: true });
      return { ok: true };
    }

    // Any other email is treated as a demo customer login.
    if (password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };
    setUser({ email, isAdmin: false });
    return { ok: true };
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const value = useMemo<AuthApi>(
    () => ({ user, isAdmin: !!user?.isAdmin, ready, login, logout }),
    [user, ready, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthApi {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
