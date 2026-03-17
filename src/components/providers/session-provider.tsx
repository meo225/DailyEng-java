"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import type { ReactNode } from "react";

interface SessionProviderProps {
  children: ReactNode;
}

/**
 * Session provider — wraps children with AuthProvider.
 * Name kept as "SessionProvider" to minimize layout.tsx changes.
 */
export function SessionProvider({ children }: SessionProviderProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
