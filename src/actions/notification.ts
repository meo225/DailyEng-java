"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// ============================================
// NOTIFICATION ACTIONS (ĐÃ ĐƯỢC "CUỐN CHIẾU" SANG JAVA HTTP API)
// ============================================

export interface GetNotificationsOptions {
  page?: number;
  limit?: number;
  sortOrder?: "newest" | "oldest";
  searchQuery?: string;
}

export interface NotificationResult {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: Date;
}

export interface GetNotificationsResponse {
  notifications: NotificationResult[];
  total: number;
  totalPages: number;
  currentPage: number;
  unreadCount: number;
}

/**
 * Hàm bí mật: Tự động móc Token từ bánh quy (Cookie) Next.js 
 * và nối dây sang Cổng 8080 của Java.
 */
async function fetchJava(path: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    throw new Error(`Java DB Backend Failed! Status: ${res.status}`);
  }
  return res.json();
}

export async function getNotifications(
  userId: string, // Biến này giữ nguyên để hàm Frontend cũ khỏi la lối vì mất biến
  options: GetNotificationsOptions = {}
): Promise<GetNotificationsResponse> {
  const qs = new URLSearchParams();
  if (options.page) qs.append("page", String(options.page));
  if (options.limit) qs.append("limit", String(options.limit));
  if (options.sortOrder) qs.append("sortOrder", String(options.sortOrder));
  if (options.searchQuery?.trim()) qs.append("searchQuery", String(options.searchQuery));
  
  return fetchJava(`/notifications?${qs.toString()}`);
}

export async function markNotificationAsRead(notificationId: string) {
  await fetchJava(`/notifications/${notificationId}/read`, { method: "PATCH" });
  revalidatePath("/user/notifications");
  return { success: true };
}

export async function markNotificationsAsRead(notificationIds: string[]) {
  if (notificationIds.length === 0) return { success: true, count: 0 };
  const res = await fetchJava("/notifications/read-batch", {
    method: "PATCH",
    body: JSON.stringify(notificationIds)
  });
  revalidatePath("/user/notifications");
  return res;
}

export async function getUnreadNotificationCount(userId: string) {
  const count = await fetchJava("/notifications/unread-count");
  return Number(count);
}

export async function markAllNotificationsAsRead(userId: string) {
  const res = await fetchJava("/notifications/read-all", { method: "PATCH" });
  revalidatePath("/user/notifications");
  return res;
}
