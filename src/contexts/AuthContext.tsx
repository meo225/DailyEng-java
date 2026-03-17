"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  type AuthUser,
  getCurrentUser,
  loginWithCredentials as apiLoginWithCredentials,
  registerUser as apiRegisterUser,
  loginWithGoogle as apiLoginWithGoogle,
  logout as apiLogout,
} from "@/lib/auth-api";

// ======================== Types ========================

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface AuthContextType {
  /** Current authenticated user, or null */
  user: AuthUser | null;
  /** Auth loading state */
  status: AuthStatus;
  /** Login with email/password */
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  /** Register with name/email/password */
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  /** Login with Google ID token */
  loginWithGoogle: (idToken: string) => Promise<{ success: boolean; error?: string }>;
  /** Logout and clear cookies */
  logout: () => Promise<void>;
  /** Refresh user data from server */
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ======================== Provider ========================

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [mounted, setMounted] = useState(false);

  // Mark as mounted AFTER the first client render (hydration pass)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Hydrate auth state on mount by calling /auth/me
  // Uses sessionStorage for instant re-hydration on page refresh
  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      // Instant hydration from sessionStorage cache
      try {
        const cached = sessionStorage.getItem("auth_user");
        if (cached && !cancelled) {
          const userData = JSON.parse(cached) as AuthUser;
          setUser(userData);
          setStatus("authenticated");
        }
      } catch { /* ignore parse errors */ }

      // Background re-validate via /auth/me
      try {
        const userData = await getCurrentUser();
        if (!cancelled) {
          setUser(userData);
          setStatus(userData ? "authenticated" : "unauthenticated");
          if (userData) {
            sessionStorage.setItem("auth_user", JSON.stringify(userData));
          } else {
            sessionStorage.removeItem("auth_user");
          }
        }
      } catch {
        if (!cancelled) {
          setUser(null);
          setStatus("unauthenticated");
          sessionStorage.removeItem("auth_user");
        }
      }
    }

    hydrate();
    return () => { cancelled = true; };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const result = await apiLoginWithCredentials(email, password);
    if (result.success && result.user) {
      setUser(result.user);
      setStatus("authenticated");
    }
    return { success: result.success, error: result.error };
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const result = await apiRegisterUser(name, email, password);
    if (result.success && result.user) {
      setUser(result.user);
      setStatus("authenticated");
    }
    return { success: result.success, error: result.error };
  }, []);

  const loginWithGoogleFn = useCallback(async (idToken: string) => {
    const result = await apiLoginWithGoogle(idToken);
    if (result.success && result.user) {
      setUser(result.user);
      setStatus("authenticated");
    }
    return { success: result.success, error: result.error };
  }, []);

  const logout = useCallback(async () => {
    await apiLogout();
    setUser(null);
    setStatus("unauthenticated");
    sessionStorage.removeItem("auth_user");
  }, []);

  const refreshUser = useCallback(async () => {
    const userData = await getCurrentUser();
    setUser(userData);
    setStatus(userData ? "authenticated" : "unauthenticated");
  }, []);

  // During SSR and first client render (hydration), expose "loading" + null
  // to guarantee server and client render identical HTML.
  const value = useMemo<AuthContextType>(() => ({
    user: mounted ? user : null,
    status: mounted ? status : "loading",
    login,
    register,
    loginWithGoogle: loginWithGoogleFn,
    logout,
    refreshUser,
  }), [mounted, user, status, login, register, loginWithGoogleFn, logout, refreshUser]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ======================== Hook ========================

/**
 * Hook to access auth state and actions.
 * Replaces NextAuth's useSession().
 *
 * Migration guide:
 *   const { data: session, status } = useSession()  → const { user, status } = useAuth()
 *   session?.user?.id  → user?.id
 *   session?.user?.name → user?.name
 *   status === "loading" → status === "loading"
 *   status === "authenticated" → status === "authenticated"
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
