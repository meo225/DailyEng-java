"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useAppStore } from "@/lib/store";
import { useTranslation } from "@/hooks/use-translation";
import {
  startSessionWithGreeting,
  submitTurn,
  analyzeAndScoreSession,
  getSessionHint,
} from "@/actions/speaking";
import { buildAssessmentData, buildScoresWithIcons } from "@/lib/speaking-session-utils";
import { useTextToSpeech } from "./useTextToSpeech";
import { useAudioRecording } from "./useAudioRecording";
import { useSessionFeedback } from "./useSessionFeedback";
import type {
  Turn,
  ViewState,
  SpeakingSessionClientProps,
  AnalysisResult,
  SessionScores,
} from "./types";

/**
 * Master hook orchestrating the entire speaking session lifecycle.
 * Composes useTextToSpeech, useAudioRecording, and useSessionFeedback.
 */
export function useSpeakingSession(props: SpeakingSessionClientProps) {
  const { scenarioId, scenario, initialTurns, detailedFeedback } = props;

  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const { t } = useTranslation();

  // Derive back URL
  const fromParam = searchParams.get("from");
  const backUrl =
    fromParam === "history" ? "/speaking?tab=history" : "/speaking";

  // ─── Core state ─────────────────────────────────────
  const [turns, setTurns] = useState<Turn[]>(
    initialTurns.map((t) => ({ ...t, timestamp: new Date(t.timestamp) }))
  );
  const [viewState, setViewState] = useState<ViewState>("preparation");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionMode, setSessionMode] = useState<"scripted" | "unscripted">(
    "unscripted"
  );
  const [hintText, setHintText] = useState<string | null>(null);
  const [isLoadingHint, setIsLoadingHint] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isStartingSession, setIsStartingSession] = useState(false);
  const [showQuitDialog, setShowQuitDialog] = useState(false);
  const [showFinishDialog, setShowFinishDialog] = useState(false);

  const conversationRef = useRef<HTMLDivElement>(null);

  // ─── Composed hooks ─────────────────────────────────
  const tts = useTextToSpeech();

  const feedback = useSessionFeedback({
    scenarioId,
    detailedFeedback,
    setViewState,
  });

  const handleTranscriptionComplete = useCallback(
    (result: { text: string; azureScores: any }) => {
      handleSendMessage(result.text, result.azureScores);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sessionId, sessionMode]
  );

  const recording = useAudioRecording({
    sessionId,
    sessionMode,
    hintText,
    onTranscriptionComplete: handleTranscriptionComplete,
    cancelTts: tts.stopPlayback,
  });

  // ─── Auto-scroll ────────────────────────────────────
  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [turns]);

  // ─── Debug console helper ───────────────────────────
  useEffect(() => {
    if (typeof window !== "undefined" && sessionId) {
      (window as any).send = async (text: string) => {
        if (!text) {
          console.log('Usage: send("Your message here")');
          return;
        }
        console.log("[Debug] Sending:", text);
        const { submitTurn } = await import("@/actions/speaking");

        const tempId = `temp-${Date.now()}`;
        setTurns((prev) => [
          ...prev,
          { id: tempId, role: "user", text, timestamp: new Date() },
        ]);

        try {
          const result = await submitTurn(sessionId, text);
          setTurns((prev) =>
            prev.map((t) =>
              t.id === tempId ? { ...t, id: result.userTurnId } : t
            )
          );
          setTurns((prev) => [
            ...prev,
            {
              id: result.aiTurnId,
              role: "tutor",
              text: result.aiResponse,
              timestamp: new Date(),
            },
          ]);
          console.log("[Debug] AI Response:", result.aiResponse);
        } catch (e) {
          console.error("[Debug] Error:", e);
        }
      };
      console.log(
        "🎤 Debug mode: Use send('your message') in console to test without mic"
      );
    }
    return () => {
      if (typeof window !== "undefined") {
        delete (window as any).send;
      }
    };
  }, [sessionId]);

  // ─── Session lifecycle ──────────────────────────────

  const startSession = useCallback(async () => {
    setIsStartingSession(true);
    try {
      const userId = user?.id || "user-1";
      const result = await startSessionWithGreeting(userId, scenarioId);
      setSessionId(result.sessionId);
      setViewState("active");

      const newTurns: Turn[] = [];

      if (result.contextMessage) {
        newTurns.push({
          id: "context-info",
          role: "tutor",
          text: `📍SCENARIO: ${result.contextMessage}`,
          timestamp: new Date(),
        });
      }

      if (result.greetingMessage && result.greetingTurnId) {
        newTurns.push({
          id: result.greetingTurnId,
          role: "tutor",
          text: result.greetingMessage,
          timestamp: new Date(),
        });
        tts.speakText(result.greetingMessage);
      }

      setTurns(newTurns);

      if (sessionMode === "scripted" && result.sessionId) {
        try {
          const hint = await getSessionHint(result.sessionId);
          setHintText(hint);
        } catch {
          console.error("Failed to auto-fetch hint for scripted session start");
        }
      }
    } catch (e) {
      console.error("Failed to start session", e);
      toast.error("Failed to start session");
    } finally {
      setIsStartingSession(false);
    }
  }, [user?.id, scenarioId, sessionMode, tts]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function handleSendMessage(text: string, azureScores?: any) {
    if (!sessionId || !text.trim()) return;

    setIsProcessing(true);

    const wordCount = text.trim().split(/\s+/).length;
    const speechMetrics = {
      ...recording.collectSpeechMetrics(),
      wordCount,
      azureAccuracyScore: azureScores?.accuracyScore ?? undefined,
      azureFluencyScore: azureScores?.fluencyScore ?? undefined,
      azureProsodyScore: azureScores?.prosodyScore ?? undefined,
      azureOverallScore: azureScores?.overallScore ?? undefined,
      wordAssessments: azureScores?.words ?? undefined,
    };

    const tempId = `temp-${Date.now()}`;
    const userTurn: Turn = {
      id: tempId,
      role: "user",
      text,
      timestamp: new Date(),
      wordAssessments: azureScores?.words ?? undefined,
      pronunciationScores: azureScores
        ? {
            accuracyScore: azureScores.accuracyScore,
            fluencyScore: azureScores.fluencyScore,
            prosodyScore: azureScores.prosodyScore,
            overallScore: azureScores.overallScore,
            completenessScore: azureScores.completenessScore,
          }
        : undefined,
    };

    setTurns((prev) => [...prev, userTurn]);
    setHintText(null);

    try {
      const result = await submitTurn(sessionId, text, undefined, speechMetrics);

      setTurns((prev) =>
        prev.map((t) =>
          t.id === tempId ? { ...t, id: result.userTurnId } : t
        )
      );

      setTurns((prev) => [
        ...prev,
        {
          id: result.aiTurnId,
          role: "tutor",
          text: result.aiResponse,
          timestamp: new Date(),
        },
      ]);

      tts.speakText(result.aiResponse);

      if (sessionMode === "scripted" && sessionId) {
        try {
          const hint = await getSessionHint(sessionId);
          setHintText(hint);
        } catch {
          console.error("Failed to auto-fetch hint in scripted mode");
        }
      }
    } catch (e) {
      console.error("Submit turn error", e);
      toast.error("Failed to process message");
    } finally {
      setIsProcessing(false);
    }
  }

  const finishAndAnalyze = useCallback(async () => {
    recording.stopMicrophone();
    setViewState("analyzing");
    try {
      if (sessionId) {
        const result = await analyzeAndScoreSession(sessionId);
        feedback.setAnalysisResult({
          scores: result.scores,
          sessionAnalysis: {
            feedbackTitle: result.feedbackTitle,
            feedbackSummary: result.feedbackSummary,
            feedbackRating: result.feedbackRating,
            feedbackTip: result.feedbackTip,
          },
          errorCategories: result.errorCategories,
          conversation: result.conversation.map((c) => ({
            ...c,
            role: c.role as "user" | "tutor",
            userErrors: c.userErrors?.map((e) => ({
              ...e,
              startIndex: e.startIndex ?? 0,
              endIndex: e.endIndex ?? 0,
            })),
          })),
        });
      }
      setViewState("complete");
    } catch (error) {
      console.error("Analysis failed:", error);
      toast.error("Failed to analyze session");
      setViewState("complete");
    }
  }, [sessionId, recording, feedback]);

  const requestHint = useCallback(async () => {
    if (!sessionId || isLoadingHint) return;
    setIsLoadingHint(true);
    setHintText(null);
    try {
      const hint = await getSessionHint(sessionId);
      setHintText(hint);
    } catch {
      toast.error("Failed to get hint");
    } finally {
      setIsLoadingHint(false);
    }
  }, [sessionId, isLoadingHint]);

  const handleDownloadTranscript = useCallback(() => {
    const transcript = turns
      .map((turn) => `${turn.role === "user" ? "You" : "Tutor"}: ${turn.text}`)
      .join("\n\n");
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      `data:text/plain;charset=utf-8,${encodeURIComponent(transcript)}`
    );
    element.setAttribute("download", `${scenario?.title}-transcript.txt`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }, [turns, scenario?.title]);

  const resetSession = useCallback(() => {
    setSessionId(null);
    setTurns([]);
    feedback.resetFeedbackState();
    setViewState("preparation");
  }, [feedback]);

  // ─── Derived data ───────────────────────────────────

  const scores: SessionScores = feedback.analysisResult?.scores || {
    grammar: 0,
    relevance: 0,
    fluency: 70,
    pronunciation: 70,
    intonation: 70,
    overall: 0,
  };

  const radarData = useMemo(
    () => [
      { label: "Relevance", value: scores.relevance },
      { label: "Pronunciation", value: scores.pronunciation },
      { label: "Intonation & Stress", value: scores.intonation },
      { label: "Fluency", value: scores.fluency },
      { label: "Grammar", value: scores.grammar },
    ],
    [
      scores.relevance,
      scores.pronunciation,
      scores.intonation,
      scores.fluency,
      scores.grammar,
    ]
  );

  const detailScoresWithIcons = useMemo(
    () => buildScoresWithIcons(feedback.feedbackToUse.scores),
    [feedback.feedbackToUse.scores]
  );

  const assessmentData = useMemo(
    () => buildAssessmentData(turns, scores),
    [turns, scores]
  );

  return {
    // State
    turns,
    viewState,
    setViewState,
    sessionId,
    sessionMode,
    setSessionMode,
    hintText,
    setHintText,
    isLoadingHint,
    isProcessing,
    isStartingSession,
    showQuitDialog,
    setShowQuitDialog,
    showFinishDialog,
    setShowFinishDialog,

    // Refs
    conversationRef,

    // Derived
    backUrl,
    fromParam,
    scores,
    radarData,
    detailScoresWithIcons,
    assessmentData,
    t,
    router,

    // Actions
    startSession,
    finishAndAnalyze,
    requestHint,
    handleDownloadTranscript,
    resetSession,

    // Composed hooks
    tts,
    recording,
    feedback,
  };
}
