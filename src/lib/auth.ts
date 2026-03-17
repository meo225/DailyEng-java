/**
 * Server-side auth utility for Next.js Server Components and Server Actions.
 *
 * Uses the `jose` library to verify the JWT signature against the shared
 * JWT_SECRET (same key the Spring Boot backend uses to sign tokens).
 *
 * CROSS-ORIGIN NOTE:
 * In dev mode (Next.js :3000, Spring Boot :8080), httpOnly cookies are stored
 * for the backend origin and are NOT available to Next.js server-side code.
 * This function will only work when both share the same origin (production
 * behind a reverse proxy) or cookies are set with a shared domain.
 *
 * For client-side auth, use the AuthContext/useAuth() hook instead.
 */

import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || ""
);

interface AuthSession {
  user: {
    id: string;
    name?: string;
    email?: string;
    image?: string;
  };
}

/**
 * Get the current auth session from a verified JWT cookie.
 * Returns null if no valid token is found or signature verification fails.
 *
 * NOTE: In cross-origin dev mode, this will almost always return null
 * because the httpOnly cookie is not available to the Next.js server.
 * Use AuthContext/useAuth() for client-side auth checks.
 */
export async function auth(): Promise<AuthSession | null> {
  try {
    if (!process.env.JWT_SECRET) {
      // No secret configured — cannot verify tokens server-side
      return null;
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) return null;

    // Verify JWT signature + expiration using jose
    const { payload } = await jwtVerify(token, JWT_SECRET);

    const userId = payload.sub;
    if (!userId) return null;

    return {
      user: {
        id: userId,
      },
    };
  } catch {
    // Verification failed (invalid signature, expired, malformed, etc.)
    return null;
  }
}

