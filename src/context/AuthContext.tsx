"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  authService,
  type AuthResult,
  type AuthUser,
} from "@/lib/services/auth";

/**
 * Local profile state.
 *
 * This is NOT authentication — no credential is verified and nothing here
 * grants privileges. It remembers who is using this device so the bag and
 * order history can be attributed. Swap lib/services/auth for a real backend
 * and this provider keeps working.
 */
const STORAGE_KEY = "oneup-profile-v1";
const LEGACY_KEY = "oneup-auth-v1";

interface AuthApi {
  user: AuthUser | null;
  ready: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  register: (input: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<AuthResult>;
  updateProfile: (patch: Partial<AuthUser>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthApi | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      // The old key stored an isAdmin flag from the removed demo login.
      localStorage.removeItem(LEGACY_KEY);
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* storage unavailable */
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

  const signIn = useCallback(async (email: string, password: string) => {
    const res = await authService.signIn(email, password);
    if (res.ok) setUser(res.user);
    return res;
  }, []);

  const register = useCallback(
    async (input: { name: string; email: string; phone: string; password: string }) => {
      const res = await authService.register(input);
      if (res.ok) setUser(res.user);
      return res;
    },
    [],
  );

  const updateProfile = useCallback((patch: Partial<AuthUser>) => {
    setUser((u) => (u ? { ...u, ...patch } : u));
  }, []);

  const logout = useCallback(() => {
    void authService.signOut();
    setUser(null);
  }, []);

  const value = useMemo<AuthApi>(
    () => ({ user, ready, signIn, register, updateProfile, logout }),
    [user, ready, signIn, register, updateProfile, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthApi {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export type { AuthUser };
