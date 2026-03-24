"use client";

import { useRef, useState, useCallback } from "react";
import { getStreamConfig, DoraraChatMessage } from "@/actions/dorara";

interface StreamState {
  /** Text accumulated so far — displayed progressively */
  streamedText: string;
  /** Whether a stream is currently active */
  isStreaming: boolean;
}

interface ParsedStructuredResponse {
  response: string;
  suggestedActions?: string[];
  vocabHighlights?: Array<{
    word: string;
    phonetic?: string;
    meaning: string;
    example?: string;
  }>;
  quizQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  } | null;
}

/**
 * Hook for streaming Dorara AI responses via SSE.
 *
 * Uses the backend `/dorara/chat/stream` endpoint which sends:
 *  - `chunk` events: raw text fragments of the Gemini JSON response
 *  - `done` event: signals completion
 *
 * The Gemini response is a JSON object with `response`, `suggestedActions`,
 * `vocabHighlights`, and `quizQuestion` fields. During streaming we extract
 * the `response` text progressively for a typing effect. On completion we
 * parse the full JSON for structured widgets.
 */
export function useDoraraStream() {
  const [state, setState] = useState<StreamState>({
    streamedText: "",
    isStreaming: false,
  });

  const abortRef = useRef<AbortController | null>(null);

  /**
   * Extract the "response" field value from a partial JSON string.
   * Handles the common case where the JSON is being streamed token-by-token.
   */
  const extractResponseText = useCallback((rawJson: string): string => {
    // Try to extract text after "response": " and before the closing quote
    const marker = '"response"';
    const idx = rawJson.indexOf(marker);
    if (idx === -1) return "";

    const afterMarker = rawJson.substring(idx + marker.length);
    // Skip whitespace and colon
    const colonIdx = afterMarker.indexOf(":");
    if (colonIdx === -1) return "";

    const afterColon = afterMarker.substring(colonIdx + 1).trimStart();

    // Find the opening quote
    if (!afterColon.startsWith('"')) return "";

    // Extract content between quotes, handling escaped quotes
    let result = "";
    let i = 1; // skip opening quote
    while (i < afterColon.length) {
      if (afterColon[i] === "\\" && i + 1 < afterColon.length) {
        const next = afterColon[i + 1];
        if (next === '"') { result += '"'; i += 2; continue; }
        if (next === "n") { result += "\n"; i += 2; continue; }
        if (next === "\\") { result += "\\"; i += 2; continue; }
        if (next === "t") { result += "\t"; i += 2; continue; }
        result += next; i += 2; continue;
      }
      if (afterColon[i] === '"') break; // closing quote
      result += afterColon[i];
      i++;
    }

    return result;
  }, []);

  /**
   * Parse the complete streamed JSON into a structured response.
   */
  const parseCompleteResponse = useCallback(
    (rawJson: string): ParsedStructuredResponse => {
      try {
        // Strip markdown code fences if present (Gemini sometimes wraps)
        let cleaned = rawJson.trim();
        if (cleaned.startsWith("```")) {
          cleaned = cleaned
            .replace(/^```(?:json)?\s*/, "")
            .replace(/\s*```$/, "");
        }
        const parsed = JSON.parse(cleaned);
        return {
          response: parsed.response || "",
          suggestedActions: parsed.suggestedActions || [],
          vocabHighlights: parsed.vocabHighlights || [],
          quizQuestion: parsed.quizQuestion || null,
        };
      } catch {
        // Fallback: treat entire text as response
        return {
          response: rawJson,
          suggestedActions: ["Tell me more", "Teach me a word"],
          vocabHighlights: [],
          quizQuestion: null,
        };
      }
    },
    []
  );

  /**
   * Start streaming a Dorara message via SSE.
   *
   * @returns A promise that resolves with the fully parsed response.
   */
  const streamMessage = useCallback(
    async (
      messages: DoraraChatMessage[],
      userMessage: string,
      currentPage: string,
      learningLanguage: string = "en"
    ): Promise<ParsedStructuredResponse> => {
      // Abort any existing stream
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setState({ streamedText: "", isStreaming: true });

      const { apiBase, token } = await getStreamConfig();
      const url = `${apiBase}/dorara/chat/stream`;

      const body = JSON.stringify({
        messages: messages.map((m) => ({
          id: m.id,
          role: m.role,
          content: m.content,
        })),
        userMessage,
        currentPage,
        targetLanguage: learningLanguage,
      });

      let rawAccumulator = "";

      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body,
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Stream request failed: ${res.status}`);
        }

        const reader = res.body?.getReader();
        if (!reader) throw new Error("No readable stream");

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          // Parse SSE events from the buffer
          const lines = buffer.split("\n");
          // Keep the last incomplete line in the buffer
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;

            // SSE format: "event: <name>\ndata: <data>"
            if (trimmed.startsWith("event:")) {
              const eventName = trimmed.slice(6).trim();
              if (eventName === "done") {
                // Stream is complete
                setState((prev) => ({ ...prev, isStreaming: false }));
                return parseCompleteResponse(rawAccumulator);
              }
              continue;
            }

            if (trimmed.startsWith("data:")) {
              const data = trimmed.slice(5).trim();
              if (data === "[DONE]") {
                setState((prev) => ({ ...prev, isStreaming: false }));
                return parseCompleteResponse(rawAccumulator);
              }

              rawAccumulator += data;

              // Progressive text extraction for typing effect
              const visibleText = extractResponseText(rawAccumulator);
              if (visibleText) {
                setState({ streamedText: visibleText, isStreaming: true });
              }
              continue;
            }
          }
        }

        // Stream ended without explicit [DONE]
        setState((prev) => ({ ...prev, isStreaming: false }));
        return parseCompleteResponse(rawAccumulator);
      } catch (error: any) {
        if (error.name === "AbortError") {
          setState((prev) => ({ ...prev, isStreaming: false }));
          return {
            response: rawAccumulator
              ? extractResponseText(rawAccumulator)
              : "",
            suggestedActions: [],
            vocabHighlights: [],
            quizQuestion: null,
          };
        }
        console.error("[useDoraraStream] Error:", error);
        setState({ streamedText: "", isStreaming: false });
        return {
          response: "",
          suggestedActions: [],
          vocabHighlights: [],
          quizQuestion: null,
          error: "Something went wrong. Please try again.",
        } as ParsedStructuredResponse & { error: string };
      }
    },
    [extractResponseText, parseCompleteResponse]
  );

  /** Cancel the current stream */
  const cancelStream = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setState((prev) => ({ ...prev, isStreaming: false }));
  }, []);

  return {
    streamedText: state.streamedText,
    isStreaming: state.isStreaming,
    streamMessage,
    cancelStream,
  };
}
