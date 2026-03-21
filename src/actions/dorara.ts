"use server";

import { cookies } from "next/headers";

export interface DoraraChatMessage {
  id: string;
  role: "user" | "tutor";
  content: string;
}

export interface DoraraChatResponse {
  response: string;
  error?: string;
}

/**
 * Hàm bí mật: Tự động móc Token từ Cookie Next.js và nối dây sang Cổng 8080 của Java.
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

/**
 * Send a message to Dorara and get a response
 * @param messages - Current conversation history (for context)
 * @param userMessage - The new message from the user
 * @param currentPage - The current page path for context
 */
export async function sendDoraraMessage(
  messages: DoraraChatMessage[],
  userMessage: string,
  currentPage: string
): Promise<DoraraChatResponse> {
  try {
    const res = await fetchJava("/dorara/chat", {
      method: "POST",
      body: JSON.stringify({
        messages,
        userMessage,
        currentPage,
      }),
    });
    return { response: res.response || "" };
  } catch (error) {
    console.error("[sendDoraraMessage] Error:", error);
    return {
      response: "",
      error: "Something went wrong. Please try again. Or please login to use Dorara.",
    };
  }
}
