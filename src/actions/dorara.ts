"use server";

import { cookies } from "next/headers";

// ── Types ───────────────────────────────────────────────────────────────

export interface DoraraChatMessage {
  id: string;
  role: "user" | "tutor";
  content: string;
  /** Structured data from AI — only present on tutor messages */
  suggestedActions?: string[];
  vocabHighlights?: VocabHighlight[];
  quizQuestion?: QuizQuestion | null;
}

export interface VocabHighlight {
  word: string;
  phonetic?: string;
  meaning: string;
  example?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DoraraChatResponse {
  response: string;
  suggestedActions?: string[];
  vocabHighlights?: VocabHighlight[];
  quizQuestion?: QuizQuestion | null;
  error?: string;
}

// ── Server-side fetch helper ────────────────────────────────────────────

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

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    throw new Error(`Java Backend Failed! Status: ${res.status}`);
  }
  return res.json();
}

// ── Send message (non-streaming, structured response) ───────────────────

export async function sendDoraraMessage(
  messages: DoraraChatMessage[],
  userMessage: string,
  currentPage: string
): Promise<DoraraChatResponse> {
  try {
    const res = await fetchJava("/dorara/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: messages.map((m) => ({
          id: m.id,
          role: m.role,
          content: m.content,
        })),
        userMessage,
        currentPage,
      }),
    });
    return {
      response: res.response || "",
      suggestedActions: res.suggestedActions || [],
      vocabHighlights: res.vocabHighlights || [],
      quizQuestion: res.quizQuestion || null,
    };
  } catch (error) {
    console.error("[sendDoraraMessage] Error:", error);
    return {
      response: "",
      error:
        "Something went wrong. Please try again. Or please login to use Dorara.",
    };
  }
}

// ── Build streaming URL (used by client-side fetch) ─────────────────────

export async function getStreamConfig(): Promise<{
  apiBase: string;
  token: string | undefined;
}> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const apiBase =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
  return { apiBase, token };
}
