"use server";

/**
 * Auth server actions — thin wrappers around the auth-api layer.
 *
 * These are kept as Server Actions so existing frontend components
 * can continue to import from '@/actions/auth' without changes.
 * Under the hood, they now call the Spring Boot backend via API.
 */

import {
  loginWithCredentials,
  registerUser as apiRegisterUser,
  loginWithGoogle,
  logout as apiLogout,
  requestPasswordReset as apiRequestPasswordReset,
  resetPassword as apiResetPassword,
  changePassword as apiChangePassword,
  type AuthResult,
} from "@/lib/auth-api";

export type { AuthResult };

/**
 * Register a new user with email and password
 */
export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<AuthResult> {
  return apiRegisterUser(name, email, password);
}

/**
 * Sign in with credentials (email/password)
 */
export async function signInWithCredentials(
  email: string,
  password: string
): Promise<AuthResult> {
  return loginWithCredentials(email, password);
}

/**
 * Sign in with Google OAuth
 * Note: The frontend now needs to get the Google ID token first
 * and pass it to this function, instead of using NextAuth's redirect flow.
 */
export async function signInWithGoogle(idToken: string): Promise<AuthResult> {
  return loginWithGoogle(idToken);
}

/**
 * Sign out the current user
 */
export async function signOutUser() {
  await apiLogout();
}

/**
 * Request password reset - sends email with reset link
 */
export async function requestPasswordReset(email: string): Promise<AuthResult> {
  return apiRequestPasswordReset(email);
}

/**
 * Reset password using token from email
 */
export async function resetPassword(
  token: string,
  newPassword: string
): Promise<AuthResult> {
  return apiResetPassword(token, newPassword);
}

/**
 * Change password for logged-in user
 */
export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<AuthResult> {
  return apiChangePassword(currentPassword, newPassword);
}
