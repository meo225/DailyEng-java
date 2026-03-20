"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { PitchAnalyzer } from "@/lib/pitch-analyzer";
import type { WordAssessment, PronunciationScores } from "./types";

interface TranscriptionResult {
  text: string;
  azureScores: {
    accuracyScore: number;
    fluencyScore: number;
    prosodyScore: number;
    overallScore: number;
    completenessScore?: number;
    words?: WordAssessment[];
  } | null;
}

interface UseAudioRecordingOptions {
  sessionId: string | null;
  sessionMode: "scripted" | "unscripted";
  hintText: string | null;
  onTranscriptionComplete: (result: TranscriptionResult) => void;
  /** Called to cancel TTS before recording starts */
  cancelTts: () => void;
}

/**
 * Encapsulates microphone recording, MediaRecorder, Azure transcription
 * + pronunciation assessment, and pitch analysis.
 */
export function useAudioRecording({
  sessionId,
  sessionMode,
  hintText,
  onTranscriptionComplete,
  cancelTts,
}: UseAudioRecordingOptions) {
  const [isRecording, setIsRecording] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const noSpeechTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isTranscribingRef = useRef(false);

  // Speech metrics refs
  const confidenceScoresRef = useRef<number[]>([]);
  const azurePronScoresRef = useRef<{
    accuracyScore: number;
    fluencyScore: number;
    prosodyScore: number;
    overallScore: number;
    completenessScore?: number;
    words?: WordAssessment[];
  } | null>(null);
  const speechStartTimeRef = useRef<number | null>(null);
  const pauseCountRef = useRef<number>(0);
  const lastSpeechTimeRef = useRef<number | null>(null);
  const pitchAnalyzerRef = useRef<PitchAnalyzer | null>(null);

  const transcribeAudio = useCallback(
    async (audioBlob: Blob) => {
      if (isTranscribingRef.current) return;
      isTranscribingRef.current = true;

      try {
        const formData = new FormData();
        formData.append("audio", audioBlob, "recording.ogg");

        if (sessionMode === "scripted" && hintText) {
          formData.append("referenceText", hintText);
        }

        const result = await apiClient.upload<{
          text: string;
          accuracyScore: number;
          fluencyScore: number;
          prosodyScore: number;
          overallScore: number;
          completenessScore: number;
          words?: WordAssessment[];
        }>("/speaking/speech/transcribe-assess", formData);

        if (result.text && result.text.trim()) {
          azurePronScoresRef.current = {
            accuracyScore: result.accuracyScore,
            fluencyScore: result.fluencyScore,
            prosodyScore: result.prosodyScore,
            overallScore: result.overallScore,
            completenessScore: result.completenessScore,
            words: result.words,
          };

          onTranscriptionComplete({
            text: result.text.trim(),
            azureScores: azurePronScoresRef.current,
          });
        }
      } catch (error) {
        console.error("Azure transcribe+assess failed, falling back:", error);
        try {
          const formData = new FormData();
          formData.append("audio", audioBlob, "recording.ogg");
          const result = await apiClient.upload<{
            text: string;
            confidence?: number;
          }>("/speaking/speech/transcribe", formData);
          if (result.text && result.text.trim()) {
            azurePronScoresRef.current = null;
            onTranscriptionComplete({
              text: result.text.trim(),
              azureScores: null,
            });
          }
        } catch (fallbackError) {
          console.error("Fallback STT also failed:", fallbackError);
          toast.error("Failed to transcribe speech. Please try typing instead.");
        }
      } finally {
        isTranscribingRef.current = false;
        setIsRecording(false);
      }
    },
    [sessionMode, hintText, onTranscriptionComplete]
  );

  const stopMicrophone = useCallback(() => {
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }
    if (noSpeechTimeoutRef.current) {
      clearTimeout(noSpeechTimeoutRef.current);
      noSpeechTimeoutRef.current = null;
    }

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      try {
        mediaRecorderRef.current.stop();
      } catch {
        // Ignore
      }
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }

    if (pitchAnalyzerRef.current) {
      pitchAnalyzerRef.current.stop();
      pitchAnalyzerRef.current = null;
    }

    audioChunksRef.current = [];
    setIsRecording(false);
  }, []);

  const handleToggleRecording = useCallback(async () => {
    if (!sessionId) {
      toast.error("Session not started");
      return;
    }

    if (isRecording) {
      // STOP recording
      setIsRecording(false);

      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
        silenceTimeoutRef.current = null;
      }
      if (noSpeechTimeoutRef.current) {
        clearTimeout(noSpeechTimeoutRef.current);
        noSpeechTimeoutRef.current = null;
      }

      if (pitchAnalyzerRef.current) {
        pitchAnalyzerRef.current.stop();
        pitchAnalyzerRef.current = null;
      }

      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
      }

      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((t) => t.stop());
        mediaStreamRef.current = null;
      }
    } else {
      // START recording
      try {
        cancelTts();

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        mediaStreamRef.current = stream;
        audioChunksRef.current = [];
        speechStartTimeRef.current = Date.now();

        const mimeType = MediaRecorder.isTypeSupported("audio/ogg; codecs=opus")
          ? "audio/ogg; codecs=opus"
          : MediaRecorder.isTypeSupported("audio/webm; codecs=opus")
            ? "audio/webm; codecs=opus"
            : "audio/webm";

        const recorder = new MediaRecorder(stream, { mimeType });
        mediaRecorderRef.current = recorder;

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        recorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: mimeType,
          });
          audioChunksRef.current = [];

          if (audioBlob.size > 1024) {
            transcribeAudio(audioBlob);
          } else {
            setIsRecording(false);
          }
        };

        recorder.start(250);
        setIsRecording(true);

        pitchAnalyzerRef.current = new PitchAnalyzer();
        pitchAnalyzerRef.current.start().catch((err) => {
          console.warn("[PitchAnalyzer] Failed to start:", err);
        });

        noSpeechTimeoutRef.current = setTimeout(() => {
          if (
            mediaRecorderRef.current &&
            mediaRecorderRef.current.state !== "inactive"
          ) {
            mediaRecorderRef.current.stop();
          }
          if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach((t) => t.stop());
            mediaStreamRef.current = null;
          }
        }, 30000);
      } catch (e: any) {
        console.error("Failed to start recording", e);
        if (e.name === "NotAllowedError") {
          toast.error(
            "Microphone permission denied. Please allow microphone access."
          );
        } else if (e.name === "NotFoundError") {
          toast.error("No microphone found. Please connect a microphone.");
        } else {
          toast.error("Could not start microphone");
        }
      }
    }
  }, [sessionId, isRecording, cancelTts, transcribeAudio]);

  /** Returns speech metrics for the current turn and resets refs. */
  const collectSpeechMetrics = useCallback(() => {
    const pitchMetrics = pitchAnalyzerRef.current?.stop();
    pitchAnalyzerRef.current = null;
    const azureScores = azurePronScoresRef.current;

    const speakingDurationMs =
      speechStartTimeRef.current && lastSpeechTimeRef.current
        ? lastSpeechTimeRef.current - speechStartTimeRef.current
        : 0;

    const metrics = {
      confidenceScores: [...confidenceScoresRef.current],
      speakingDurationMs: Math.max(speakingDurationMs, 1000),
      pauseCount: pauseCountRef.current,
      pitchVariance: pitchMetrics?.variance ?? undefined,
      avgPitch: pitchMetrics?.avgPitch ?? undefined,
      pitchSamplesCount: pitchMetrics?.sampleCount ?? undefined,
      azureAccuracyScore: azureScores?.accuracyScore ?? undefined,
      azureFluencyScore: azureScores?.fluencyScore ?? undefined,
      azureProsodyScore: azureScores?.prosodyScore ?? undefined,
      azureOverallScore: azureScores?.overallScore ?? undefined,
      wordAssessments: azureScores?.words ?? undefined,
    };

    // Reset for next turn
    confidenceScoresRef.current = [];
    speechStartTimeRef.current = null;
    pauseCountRef.current = 0;
    lastSpeechTimeRef.current = null;
    azurePronScoresRef.current = null;

    return metrics;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
      if (noSpeechTimeoutRef.current)
        clearTimeout(noSpeechTimeoutRef.current);
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (pitchAnalyzerRef.current) {
        pitchAnalyzerRef.current.stop();
        pitchAnalyzerRef.current = null;
      }
    };
  }, [sessionId]);

  return {
    isRecording,
    handleToggleRecording,
    stopMicrophone,
    collectSpeechMetrics,
  };
}
