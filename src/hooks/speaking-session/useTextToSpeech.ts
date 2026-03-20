"use client";

import { useRef } from "react";
import { useAppStore } from "@/lib/store";

/**
 * Encapsulates Azure Text-to-Speech playback lifecycle.
 * Manages audio element, speaking state, and cleanup.
 */
export function useTextToSpeech() {
  const ttsVoice = useAppStore((state) => state.ttsVoice);
  const isSpeakingRef = useRef(false);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  const stopPlayback = () => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.currentTime = 0;
      audioElementRef.current = null;
    }
    isSpeakingRef.current = false;
  };

  const speakText = async (text: string): Promise<void> => {
    stopPlayback();
    isSpeakingRef.current = true;

    try {
      const API_BASE =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
      const response = await fetch(`${API_BASE}/speaking/speech/synthesize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text, voice: ttsVoice }),
      });

      if (!response.ok) {
        throw new Error(`TTS failed: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioElementRef.current = audio;

      return new Promise<void>((resolve) => {
        const cleanup = () => {
          isSpeakingRef.current = false;
          URL.revokeObjectURL(audioUrl);
          audioElementRef.current = null;
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
