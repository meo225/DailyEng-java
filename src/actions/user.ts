"use server";

import { cookies } from "next/headers";

// ============================================
// USER PROFILE ACTIONS (MIGRATED TO JAVA HTTP API)
// ============================================

export interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  phoneNumber: string | null;
  dateOfBirth: Date | null;
  gender: string | null;
  address: string | null;
  level: string | null;
  image: string | null;
}

export interface UserProfileUpdateData {
  name?: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: Date | null;
  gender?: string;
  address?: string;
  level?: string;
}

/**
 * Forward access_token cookie as Authorization header to the Java API.
 */
async function fetchJava(path: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const API_BASE =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(`${API_BASE}${path}`, { ...options, headers });
}

// Get current user's profile
export async function getUserProfile(): Promise<{
  user: UserProfile | null;
  isGoogleUser: boolean;
  error?: string;
}> {
  try {
    const res = await fetchJava("/users/me");

    if (!res.ok) {
      if (res.status === 401) {
        return { user: null, isGoogleUser: false, error: "Not authenticated" };
      }
      return { user: null, isGoogleUser: false, error: "Failed to fetch profile" };
    }

    const data = await res.json();

    return {
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
        gender: data.gender,
        address: data.address,
        level: data.level,
        image: data.image,
      },
      isGoogleUser: data.isGoogleUser ?? false,
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return { user: null, isGoogleUser: false, error: "Failed to fetch profile" };
  }
}

// Update user profile
export async function updateUserProfile(
  data: UserProfileUpdateData
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetchJava("/users/me", {
      method: "PUT",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        address: data.address,
        level: data.level,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      const errorMessage = errorData?.error || "Failed to update profile";
      return { success: false, error: errorMessage };
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return { success: false, error: "Failed to update profile" };
  }
}
