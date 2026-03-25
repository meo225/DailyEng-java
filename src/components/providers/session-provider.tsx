"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { ReactNode } from "react";

interface SessionProviderProps {
  children: ReactNode;
}

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

/**
 * Session provider — wraps children with AuthProvider and GoogleOAuthProvider.
 * Name kept as "SessionProvider" to minimize layout.tsx changes.
 */
export function SessionProvider({ children }: SessionProviderProps) {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID || "dummy"}>
      <AuthProvider>{children}</AuthProvider>
    </GoogleOAuthProvider>
  );
}
