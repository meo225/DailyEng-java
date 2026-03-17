/**
 * Auth API route — placeholder.
 *
 * NextAuth API route is no longer needed since auth is handled
 * by the Spring Boot backend at /api/auth/*.
 * This file is kept to prevent 404 errors if any old code
 * still references /api/auth/*.
 */

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { message: "Auth is handled by the Spring Boot backend. Use NEXT_PUBLIC_API_URL." },
    { status: 410 } // Gone
  );
}

export async function POST() {
  return NextResponse.json(
    { message: "Auth is handled by the Spring Boot backend. Use NEXT_PUBLIC_API_URL." },
    { status: 410 }
  );
}
