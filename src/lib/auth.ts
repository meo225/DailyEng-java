/**
 * Server-side auth utility for Next.js Server Components and Server Actions.
 *
 * CROSS-ORIGIN NOTE:
 * In dev mode (Next.js :3000, Spring Boot :8080), httpOnly cookies are stored
 * for the backend origin and are NOT available to Next.js server-side code.
 *
 * This function will only work when:
 * - Both frontend and backend share the same origin (production behind a reverse proxy)
 * - Or cookies are set with a shared domain
 *
 * For client-side auth, use the AuthContext/useAuth() hook instead.
 */

import { cookies } from "next/headers";

interface AuthSession {
  user: {
    id: string;
    name?: string;
    email?: string;
    image?: string;
  };
}

/**
 * Get the current auth session from JWT cookie.
 * Returns null if no valid token is found.
 *
 * NOTE: In cross-origin dev mode, this will almost always return null.
 * Use AuthContext/useAuth() for client-side auth checks.
 */
export async function auth(): Promise<AuthSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) return null;

    // Decode JWT payload (no signature verification)
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = JSON.parse(
      Buffer.from(parts[1], "base64url").toString("utf-8")
    );

    // Check if token has expired
    if (payload.exp) {
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp < now) return null;
    }

    // The JWT subject is the user ID
    const userId = payload.sub;
    if (!userId) return null;

    return {
      user: {
        id: userId,
      },
    };
  } catch {
    return null;
  }
}
