"use client";

import { useRef } from "react";
import { useAppStore } from "@/lib/store";

/**
 * Encapsulates Azure Text-to-Speech playback lifecycle.
 * Manages audio element, speaking state, and cleanup.
 */
export function useTextToSpeech() {
  const ttsVoice = useAppStore((state) => state.ttsVoice);
  const learningLanguage = useAppStore((state) => state.learningLanguage);
  const isSpeakingRef = useRef(false);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  /** Holds the resolve callback of the in-flight speakText promise. */
  const pendingResolveRef = useRef<(() => void) | null>(null);

  const stopPlayback = () => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.currentTime = 0;
      audioElementRef.current = null;
    }
    isSpeakingRef.current = false;
    // Resolve the pending speakText promise so any awaiting code can proceed
    if (pendingResolveRef.current) {
      pendingResolveRef.current();
      pendingResolveRef.current = null;
    }
  };

  const speakText = async (text: string): Promise<void> => {
    stopPlayback();
    isSpeakingRef.current = true;

    try {
      const API_BASE =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
      // Strip parenthetical English translations so TTS only reads the target language
      // Also strip furigana [Kanji](reading) syntax, keeping only the kanji surface form
      const ttsText = text
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // [駅](えき) → 駅
        .replace(/\s*\([^)]*\)\s*$/g, "")         // trailing (English) → removed
        .trim();
      const response = await fetch(`${API_BASE}/speaking/speech/synthesize?targetLanguage=${learningLanguage}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text: ttsText, voice: ttsVoice }),
      });

      if (!response.ok) {
        throw new Error(`TTS failed: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioElementRef.current = audio;

      return new Promise<void>((resolve) => {
        pendingResolveRef.current = resolve;

        const cleanup = () => {
          isSpeakingRef.current = false;
          URL.revokeObjectURL(audioUrl);
          audioElementRef.current = null;
          pendingResolveRef.current = null;
          resolve();
        };

        audio.onended = cleanup;
        audio.onerror = cleanup;
        audio.play().catch(cleanup);
      });
    } catch (error) {
      console.error("[speakText] Azure TTS error:", error);
      isSpeakingRef.current = false;
    }
  };

  return {
    speakText,
    stopPlayback,
    isSpeakingRef,
    audioElementRef,
  };
}
