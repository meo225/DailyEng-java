import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware for route protection.
 *
 * IMPORTANT: In a cross-origin architecture (Next.js on :3000, Spring Boot on :8080),
 * httpOnly cookies set by the backend are stored for the backend's origin.
 * This middleware cannot read those cookies. Auth enforcement is handled by:
 *   - AuthContext (client-side) — hydrates auth state via /auth/me
 *   - ProtectedRoute component — redirects unauthenticated users
 *
 * This middleware only handles edge cases like preventing auth page access
 * for users who might have a session.
 */
export function middleware(request: NextRequest) {
  // In cross-origin cookie mode, middleware cannot reliably check auth.
  // Let all requests pass through — auth is enforced client-side by
  // AuthContext + ProtectedRoute.
  return NextResponse.next();
}

// Matcher config
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
