// ─── Shared types for settings hooks ────────────────

export type TabType = "personal" | "password";

export interface SettingsFormData {
  name: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  gender: string;
  address: string;
  level: string;
}

export interface ToastState {
  show: boolean;
  type: "success" | "error";
  message: string;
}

// ─── Constants ─────────────────────────────────────

export const LEVEL_DISPLAY_MAP: Record<string, string> = {
  A1: "A1 - Beginner",
  A2: "A2 - Beginner",
  B1: "B1 - Intermediate",
  B2: "B2 - Intermediate",
  C1: "C1 - Advanced",
  C2: "C2 - Advanced",
};

export const SETTINGS_TABS = [
  { id: "personal" as const, label: "Personal Information" },
  { id: "password" as const, label: "Change Password" },
];

// ─── Helpers ───────────────────────────────────────

/** Parse DD/MM/YYYY string into a Date object. */
export function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const parts = dateStr.split("/");
  if (parts.length !== 3) return null;
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  return new Date(year, month, day);
}

/** Format a Date object to DD/MM/YYYY string. */
export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
