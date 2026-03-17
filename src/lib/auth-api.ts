/**
 * Auth-specific API layer wrapping the Spring Boot auth endpoints.
 * All functions use the centralized apiClient which handles cookies automatically.
 */

import { apiClient, ApiError } from '@/lib/api-client';

// ======================== Types ========================

export interface AuthUser {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
}

export interface AuthResponse {
  success: boolean;
  user: AuthUser | null;
}

export type AuthResult = {
  success: boolean;
  error?: string;
};

// ======================== Auth API Functions ========================

/**
 * Login with email/password.
 * On success, backend sets httpOnly cookies automatically.
 */
export async function loginWithCredentials(email: string, password: string): Promise<AuthResult & { user?: AuthUser }> {
  try {
    const data = await apiClient.post<AuthResponse>('/auth/login', { email, password });
    return { success: data.success, user: data.user ?? undefined };
  } catch (error) {
    if (error instanceof ApiError) {
      try {
        const body = JSON.parse(error.body);
        return { success: false, error: body.message || body.error || 'Login failed' };
      } catch {
        return { success: false, error: error.body || 'Login failed' };
      }
    }
    return { success: false, error: 'An error occurred. Please try again.' };
  }
}

/**
 * Register a new user.
 * On success, backend sets httpOnly cookies automatically (auto-login).
 */
export async function registerUser(name: string, email: string, password: string): Promise<AuthResult & { user?: AuthUser }> {
  try {
    const data = await apiClient.post<AuthResponse>('/auth/register', { name, email, password });
    return { success: data.success, user: data.user ?? undefined };
  } catch (error) {
    if (error instanceof ApiError) {
      try {
        const body = JSON.parse(error.body);
        return { success: false, error: body.message || body.error || 'Registration failed' };
      } catch {
        return { success: false, error: error.body || 'Registration failed' };
      }
    }
    return { success: false, error: 'An error occurred. Please try again.' };
  }
}

/**
 * Login with Google ID token.
 * Frontend gets the idToken from Google Sign-In, sends it here.
 */
export async function loginWithGoogle(idToken: string): Promise<AuthResult & { user?: AuthUser }> {
  try {
    const data = await apiClient.post<AuthResponse>('/auth/google', { idToken });
    return { success: data.success, user: data.user ?? undefined };
  } catch (error) {
    if (error instanceof ApiError) {
      try {
        const body = JSON.parse(error.body);
        return { success: false, error: body.message || body.error || 'Google login failed' };
      } catch {
        return { success: false, error: error.body || 'Google login failed' };
      }
    }
    return { success: false, error: 'An error occurred. Please try again.' };
  }
}

/**
 * Get current user from JWT cookie.
 * Used to hydrate auth state on page load.
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const data = await apiClient.get<AuthResponse>('/auth/me');
    return data.success ? data.user : null;
  } catch {
    return null;
  }
}

/**
 * Logout — clears httpOnly cookies.
 */
export async function logout(): Promise<void> {
  try {
    await apiClient.post('/auth/logout');
  } catch {
    // Best-effort logout — even if API fails, we clear client state
  }
}

/**
 * Request password reset email.
 */
export async function requestPasswordReset(email: string): Promise<AuthResult> {
  try {
    await apiClient.post('/auth/forgot-password', { email });
    return { success: true };
  } catch (error) {
    if (error instanceof ApiError) {
      try {
        const body = JSON.parse(error.body);
        return { success: false, error: body.message || 'Failed to send reset email' };
      } catch {
        return { success: false, error: 'Failed to send reset email' };
      }
    }
    return { success: false, error: 'An error occurred. Please try again.' };
  }
}

/**
 * Reset password using token from email.
 */
export async function resetPassword(token: string, newPassword: string): Promise<AuthResult> {
  try {
    await apiClient.post('/auth/reset-password', { token, newPassword });
    return { success: true };
  } catch (error) {
    if (error instanceof ApiError) {
      try {
        const body = JSON.parse(error.body);
        return { success: false, error: body.message || 'Failed to reset password' };
      } catch {
        return { success: false, error: error.body || 'Failed to reset password' };
      }
    }
    return { success: false, error: 'An error occurred. Please try again.' };
  }
}

/**
 * Change password for authenticated user.
 */
export async function changePassword(currentPassword: string, newPassword: string): Promise<AuthResult> {
  try {
    await apiClient.put('/auth/change-password', { currentPassword, newPassword });
    return { success: true };
  } catch (error) {
    if (error instanceof ApiError) {
      try {
        const body = JSON.parse(error.body);
        return { success: false, error: body.message || 'Failed to change password' };
      } catch {
        return { success: false, error: error.body || 'Failed to change password' };
      }
    }
    return { success: false, error: 'An error occurred. Please try again.' };
  }
}
