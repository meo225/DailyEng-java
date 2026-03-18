"use client"

import React, { useState, useEffect, useRef, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SessionChat } from "@/components/speaking/session-chat"
import { RadarChart } from "@/components/speaking/radar-chart"
import { LearningHistory } from "@/components/speaking/learning-history"
import { DetailedFeedback } from "@/components/speaking/detailed-feedback"
import PronunciationAssessmentReview from "@/components/speaking/pronunciation-assessment"
import type { AssessmentData } from "@/components/speaking/pronunciation-assessment"
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";
import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  ChevronLeft,
  Download,
  FastForward,
  Menu,
  MessageSquare,
  Play,
  RotateCcw,
  User,
  Bot,
  Volume2,
  Copy,
  Check,
  Mic,
  MoreVertical,
  RefreshCw,
  MicOff,
  Target,
  Mic2,
  AudioWaveform as Waveform,
  Zap,
  Languages,
  Sparkles,
  FileText,
  Lightbulb,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import VocabHelperChatbot from "@/components/speaking/vocab-helper-chatbot";
import {
  startSessionWithGreeting,
  submitTurn,
  analyzeAndScoreSession,
  getSessionDetailsById,
  getLearningRecordsForScenario,
  getSessionHint,
} from "@/actions/speaking";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient } from "@/lib/api-client";
import { PitchAnalyzer, PitchMetrics } from "@/lib/pitch-analyzer";

// Types
interface WordAssessment {
  word: string;
  accuracyScore: number;
  errorType: string; // None, Mispronunciation, UnexpectedBreak, MissingBreak, Monotone
  phonemes?: { phoneme: string; accuracyScore: number }[];
  syllables?: { syllable: string; accuracyScore: number }[];
}

interface PronunciationScores {
  accuracyScore: number;
  fluencyScore: number;
  prosodyScore: number;
  overallScore: number;
  completenessScore?: number;
}

interface Turn {
  id: string;
  role: "user" | "tutor";
  text: string;
  timestamp: Date;
  wordAssessments?: WordAssessment[];
  pronunciationScores?: PronunciationScores;
  scores?: {
    pronunciation?: number;
    fluency?: number;
    grammar?: number;
    content?: number;
    relevance?: number;
    intonation?: number;
  };
}

/** Memoized component: renders color-coded per-word pronunciation (react-best-practices: rerender-memo) */
const PronunciationWords = React.memo(function PronunciationWords({
  words,
  fallbackText,
}: {
  words: WordAssessment[];
  fallbackText: string;
}) {
  if (!words || words.length === 0) {
    return <span>{fallbackText}</span>;
  }

  return (
    <span className="leading-relaxed">
      {words.map((w, i) => {
        const score = w.accuracyScore;
        const isError = w.errorType !== "None";

        // Color coding: green (≥80), amber (≥50), red (<50)
        let colorClass = "text-green-100"; // Good pronunciation
        if (score < 50) {
          colorClass = "text-red-300 font-semibold";
        } else if (score < 80) {
          colorClass = "text-amber-200";
        }

        // Underline mispronounced words
        const underlineClass = isError
          ? "underline decoration-dotted decoration-red-300/70 underline-offset-2"
          : "";

        return (
          <span
            key={`${w.word}-${i}`}
            className={`${colorClass} ${underlineClass} transition-colors duration-200 cursor-default`}
            title={
              isError
                ? `${w.errorType}: ${Math.round(score)}% accuracy`
                : `${Math.round(score)}% accuracy`
            }
            aria-label={`${w.word}, accuracy ${Math.round(score)} percent${isError ? `, error: ${w.errorType}` : ""}`}
          >
            {w.word}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </span>
  );
});

/** Memoized score badge: compact inline pronunciation scores */
const PronunciationBadge = React.memo(function PronunciationBadge({
  scores,
}: {
  scores: PronunciationScores;
}) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-emerald-400";
    if (score >= 50) return "bg-amber-400";
    return "bg-red-400";
  };

  const getTextColor = (score: number) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 50) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="flex items-center gap-2 mt-1.5 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300">
      {/* Accuracy */}
      <div className="flex items-center gap-1" title={`Accuracy: ${Math.round(scores.accuracyScore)}%`}>
        <span className={`w-1.5 h-1.5 rounded-full ${getScoreColor(scores.accuracyScore)}`} />
        <span className={`text-[10px] font-semibold ${getTextColor(scores.accuracyScore)}`}>
          {Math.round(scores.accuracyScore)}
        </span>
      </div>
      <span className="text-slate-300 text-[10px]">·</span>
      {/* Fluency */}
      <div className="flex items-center gap-1" title={`Fluency: ${Math.round(scores.fluencyScore)}%`}>
        <span className={`w-1.5 h-1.5 rounded-full ${getScoreColor(scores.fluencyScore)}`} />
        <span className={`text-[10px] font-semibold ${getTextColor(scores.fluencyScore)}`}>
          {Math.round(scores.fluencyScore)}
        </span>
      </div>
      <span className="text-slate-300 text-[10px]">·</span>
      {/* Prosody */}
      <div className="flex items-center gap-1" title={`Prosody: ${Math.round(scores.prosodyScore)}%`}>
        <span className={`w-1.5 h-1.5 rounded-full ${getScoreColor(scores.prosodyScore)}`} />
        <span className={`text-[10px] font-semibold ${getTextColor(scores.prosodyScore)}`}>
          {Math.round(scores.prosodyScore)}
        </span>
      </div>
    </div>
  );
});

type ViewState =
  | "preparation"
  | "active"
  | "analyzing"
  | "complete"
  | "history"
  | "record-review"
  | "detail";

export interface LearningRecord {
  id: string;
  overallScore: number;
  grammarScore: number;
  relevanceScore: number;
  fluencyScore: number;
  pronunciationScore: number;
  intonationScore: number;
  date: Date;
}

export interface DetailedFeedbackScore {
  label: string;
  value: number;
  // Note: icon is rendered in client based on label
}

export interface ErrorCategory {
  name: string;
  count: number;
}

export interface ConversationItem {
  role: "tutor" | "user";
  text: string;
  userErrors?: Array<{
    word: string;
    correction: string;
    type: string;
  }>;
  correctedSentence?: string;
  audioUrl?: string;
}

export interface DetailedFeedbackData {
  scores: DetailedFeedbackScore[];
  errorCategories: ErrorCategory[];
  conversation: ConversationItem[];
  overallRating: string;
  tip: string;
}

export interface ScenarioData {
  id: string;
  title: string;
  description?: string;
  context?: string;
  goal?: string;
  objectives?: string[];
  // Role definitions
  userRole?: string;
  botRole?: string;
  openingLine?: string;
  image?: string;
}

export interface InitialTurn {
  id: string;
  role: "user" | "tutor";
  text: string;
  timestamp: string; // ISO string for serialization
  scores?: {
    pronunciation?: number;
    fluency?: number;
    grammar?: number;
    content?: number;
    relevance?: number;
    intonation?: number;
  };
}

export interface SpeakingSessionClientProps {
  scenarioId: string;
  scenario: ScenarioData | null;
  initialTurns: InitialTurn[];
  learningRecords: LearningRecord[];
  detailedFeedback: DetailedFeedbackData;
}

// Helper function to get icon based on label
function getScoreIcon(label: string): React.ReactNode {
  switch (label) {
    case "Relevance":
      return <Target className="h-4 w-4" />;
    case "Pronunciation":
      return <Mic2 className="h-4 w-4" />;
    case "Intonation & Stress":
      return <Waveform className="h-4 w-4" />;
    case "Fluency":
      return <Zap className="h-4 w-4" />;
    case "Grammar":
      return <Languages className="h-4 w-4" />;
    default:
      return <Target className="h-4 w-4" />;
  }
}

export default function SpeakingSessionClient({
  scenarioId,
  scenario,
  initialTurns,
  learningRecords,
  detailedFeedback,
}: SpeakingSessionClientProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { addFlashcard, addXP } = useAppStore();

  // Convert serialized dates back to Date objects
  const [turns, setTurns] = useState<Turn[]>(
    initialTurns.map((t) => ({ ...t, timestamp: new Date(t.timestamp) }))
  );
  const [isRecording, setIsRecording] = useState(false);
  const [hintText, setHintText] = useState<string | null>(null);
  const [isLoadingHint, setIsLoadingHint] = useState(false);
  const [sessionMode, setSessionMode] = useState<"scripted" | "unscripted">("unscripted");
  const [viewState, setViewState] = useState<ViewState>("preparation");
  const [sessionStats, setSessionStats] = useState({
    avgPronunciation: 0,
    avgFluency: 0,
    avgGrammar: 0,
    avgContent: 0,
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
  const [isLoadingRecords, setIsLoadingRecords] = useState(false);
  const [isStartingSession, setIsStartingSession] = useState(false);
  const [dynamicRecords, setDynamicRecords] = useState<LearningRecord[]>([]);
  const [dynamicFeedback, setDynamicFeedback] =
    useState<DetailedFeedbackData | null>(null);
  const [loadedSessionData, setLoadedSessionData] = useState<{
    scores: { grammar: number; relevance: number; fluency: number; pronunciation: number; intonation: number; overall: number };
    conversation: { role: string; text: string; pronunciationScore?: number; fluencyScore?: number }[];
  } | null>(null);
  const [analysisResult, setAnalysisResult] = useState<{
    scores: {
      grammar: number;
      relevance: number;
      fluency: number;
      pronunciation: number;
      intonation: number;
      overall: number;
    };
    sessionAnalysis: {
      feedbackTitle: string;
      feedbackSummary: string;
      feedbackRating: string;
      feedbackTip: string;
    };
    errorCategories: { name: string; count: number }[];
    conversation: {
      role: "user" | "tutor";
      text: string;
      turnId: string;
      userErrors?: {
        word: string;
        correction: string;
        type: string;
        startIndex: number;
        endIndex: number;
      }[];
    }[];
  } | null>(null);
  const [showQuitDialog, setShowQuitDialog] = useState(false);
  const [showFinishDialog, setShowFinishDialog] = useState(false);

  const conversationRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const noSpeechTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isTranscribingRef = useRef(false);

  // [NEW] Speech metrics refs for fluency & pronunciation scoring
  const confidenceScoresRef = useRef<number[]>([]); // Stores confidence from each final result
  const azurePronScoresRef = useRef<{
    accuracyScore: number; fluencyScore: number;
    prosodyScore: number; overallScore: number;
    completenessScore?: number;
    words?: WordAssessment[];
  } | null>(null);
  const speechStartTimeRef = useRef<number | null>(null); // When user started speaking
  const pauseCountRef = useRef<number>(0); // Count of pauses > 500ms
  const lastSpeechTimeRef = useRef<number | null>(null); // Last speech timestamp for pause detection
  const isSpeakingRef = useRef(false); // Track TTS state to prevent recording overlap
  const audioElementRef = useRef<HTMLAudioElement | null>(null); // Azure TTS audio element

  // [NEW] Ref for pitch analyzer (intonation scoring)
  const pitchAnalyzerRef = useRef<PitchAnalyzer | null>(null);

  useEffect(() => {
    calculateStats(turns);
  }, [turns]);

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [turns]);

  // DEBUG: Expose sendMessage to console for testing without microphone
  // Usage in browser console: send("Hello, I want to order a coffee")
  useEffect(() => {
    if (typeof window !== "undefined" && sessionId) {
      (window as any).send = async (text: string) => {
        if (!text) {
          console.log("Usage: send('Your message here')");
          return;
        }
        console.log("[Debug] Sending:", text);
        // We need to call handleSendMessage, but it's defined later
        // So we create a simplified version here
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

  // Send recorded audio to Azure for transcription + pronunciation assessment
  const transcribeAudio = async (audioBlob: Blob) => {
    if (isTranscribingRef.current) return;
    isTranscribingRef.current = true;

    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.ogg");

      // In scripted mode, pass the hint text as reference text for scripted assessment
      if (sessionMode === "scripted" && hintText) {
        formData.append("referenceText", hintText);
      }

      // Call combined transcribe + pronunciation assessment endpoint
      const result = await apiClient.upload<{
        text: string;
        accuracyScore: number;
        fluencyScore: number;
        prosodyScore: number;
        overallScore: number;
        completenessScore: number;
        words?: { word: string; accuracyScore: number; errorType: string; phonemes?: { phoneme: string; accuracyScore: number }[] }[];
      }>("/speaking/speech/transcribe-assess", formData);

      if (result.text && result.text.trim()) {
        // Store Azure pronunciation scores + per-word data for handleSendMessage
        azurePronScoresRef.current = {
          accuracyScore: result.accuracyScore,
          fluencyScore: result.fluencyScore,
          prosodyScore: result.prosodyScore,
          overallScore: result.overallScore,
          completenessScore: result.completenessScore,
          words: result.words,
        };

        console.log("🎤 Azure Pronunciation:", {
          accuracy: result.accuracyScore,
          fluency: result.fluencyScore,
          prosody: result.prosodyScore,
          overall: result.overallScore,
          words: result.words?.map(w => `${w.word}(${w.errorType}:${Math.round(w.accuracyScore)})`),
        });

        handleSendMessage(result.text.trim());
      } else {
        console.log("No speech detected in audio");
      }
    } catch (error) {
      console.error("Azure transcribe+assess failed, falling back to basic STT:", error);
      // Fallback to basic transcription if assessment fails
      try {
        const formData = new FormData();
        formData.append("audio", audioBlob, "recording.ogg");
        const result = await apiClient.upload<{ text: string; confidence?: number }>(
          "/speaking/speech/transcribe", formData
        );
        if (result.text && result.text.trim()) {
          azurePronScoresRef.current = null; // No Azure scores — use heuristics
          handleSendMessage(result.text.trim());
        }
      } catch (fallbackError) {
        console.error("Fallback STT also failed:", fallbackError);
        toast.error("Failed to transcribe speech. Please try typing instead.");
      }
    } finally {
      isTranscribingRef.current = false;
      setIsRecording(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
      if (noSpeechTimeoutRef.current) clearTimeout(noSpeechTimeoutRef.current);
      // Stop media recorder
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
      // Stop media stream tracks
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      }
      // Stop pitch analyzer
      if (pitchAnalyzerRef.current) {
        pitchAnalyzerRef.current.stop();
        pitchAnalyzerRef.current = null;
      }
    };
  }, [sessionId]);

  // Helper function to stop microphone and cleanup
  const stopMicrophone = () => {
    // Clear all timeouts
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }
    if (noSpeechTimeoutRef.current) {
      clearTimeout(noSpeechTimeoutRef.current);
      noSpeechTimeoutRef.current = null;
    }

    // Stop media recorder (this triggers onstop → transcribeAudio)
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {
        // Ignore
      }
    }

    // Stop media stream tracks
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }

    // Stop pitch analyzer
    if (pitchAnalyzerRef.current) {
      pitchAnalyzerRef.current.stop();
      pitchAnalyzerRef.current = null;
    }

    // Clear audio chunks
    audioChunksRef.current = [];

    // Set recording state to false
    setIsRecording(false);
  };

  const startSession = async () => {
    setIsStartingSession(true);
    try {
      // Get userId from auth session
      const userId = user?.id || "user-1"; // Fallback for dev
      const result = await startSessionWithGreeting(userId, scenarioId);
      setSessionId(result.sessionId);
      setViewState("active");

      // Display initial messages: context info + opening greeting
      const initialTurns: Turn[] = [];

      // Message 1: Context info (displayed as system message)
      if (result.contextMessage) {
        initialTurns.push({
          id: "context-info",
          role: "tutor",
          text: `📍SCENARIO: ${result.contextMessage}`,
          timestamp: new Date(),
        });
      }

      // Message 2: Opening greeting from bot
      if (result.greetingMessage && result.greetingTurnId) {
        initialTurns.push({
          id: result.greetingTurnId,
          role: "tutor",
          text: result.greetingMessage,
          timestamp: new Date(),
        });

        // Speak the opening greeting (fire-and-forget, recording start will cancel TTS)
        speakText(result.greetingMessage);
      }

      setTurns(initialTurns);

      // In scripted mode, fetch hint in parallel with TTS (don't await TTS)
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
  };

  // Reset stats when recording starts
  useEffect(() => {
    if (isRecording) {
      setSessionStats({
        avgPronunciation: 0,
        avgFluency: 0,
        avgGrammar: 0,
        avgContent: 0,
      });
    }
  }, [isRecording]);

  const calculateStats = (allTurns: Turn[]) => {
    // Find the latest user turn with scores for "Live Analysis"
    // We reverse to find the last one added
    const latestTurn = [...allTurns]
      .reverse()
      .find((t) => t.role === "user" && t.scores);

    if (latestTurn && latestTurn.scores) {
      setSessionStats({
        avgPronunciation: latestTurn.scores.pronunciation || 0,
        avgFluency: latestTurn.scores.fluency || 0,
        avgGrammar: latestTurn.scores.grammar || 0,
        avgContent: latestTurn.scores.content || 0,
      });
    }
  };

  const handleToggleRecording = async () => {
    if (!sessionId) {
      toast.error("Session not started");
      return;
    }

    if (isRecording) {
      // STOP recording
      setIsRecording(false);

      // Clear timeouts
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
        silenceTimeoutRef.current = null;
      }
      if (noSpeechTimeoutRef.current) {
        clearTimeout(noSpeechTimeoutRef.current);
        noSpeechTimeoutRef.current = null;
      }

      // Stop pitch analyzer
      if (pitchAnalyzerRef.current) {
        pitchAnalyzerRef.current.stop();
        pitchAnalyzerRef.current = null;
      }

      // Stop MediaRecorder → triggers onstop → transcribeAudio
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }

      // Stop media stream tracks
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((t) => t.stop());
        mediaStreamRef.current = null;
      }
    } else {
      // START recording
      try {
        // Cancel any ongoing TTS to prevent mic picking up speaker output
        if (audioElementRef.current) {
          audioElementRef.current.pause();
          audioElementRef.current.currentTime = 0;
          audioElementRef.current = null;
          isSpeakingRef.current = false;
        }

        // Request microphone access
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;
        audioChunksRef.current = [];

        // Track speech timing
        speechStartTimeRef.current = Date.now();

        // Choose a supported MIME type
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
          // Combine audio chunks into a single blob
          const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
          audioChunksRef.current = [];

          // Only transcribe if we have meaningful audio (> 1KB)
          if (audioBlob.size > 1024) {
            transcribeAudio(audioBlob);
          } else {
            console.log("Audio too short, skipping transcription");
            setIsRecording(false);
          }
        };

        // Start recording — collect data every 250ms for responsiveness
        recorder.start(250);
        setIsRecording(true);

        // Start pitch analyzer for intonation scoring
        pitchAnalyzerRef.current = new PitchAnalyzer();
        pitchAnalyzerRef.current.start().catch((err) => {
          console.warn("[PitchAnalyzer] Failed to start:", err);
        });

        // Set 30s max recording timeout
        noSpeechTimeoutRef.current = setTimeout(() => {
          console.log("Max recording time reached (30s), stopping");
          if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
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
          toast.error("Microphone permission denied. Please allow microphone access.");
        } else if (e.name === "NotFoundError") {
          toast.error("No microphone found. Please connect a microphone.");
        } else {
          toast.error("Could not start microphone");
        }
      }
    }
  };

  const speakText = async (text: string): Promise<void> => {
    // Stop any previously playing TTS audio
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.currentTime = 0;
      audioElementRef.current = null;
    }

    isSpeakingRef.current = true;

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
      const response = await fetch(`${API_BASE}/speaking/speech/synthesize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`TTS failed: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioElementRef.current = audio;

      return new Promise<void>((resolve) => {
        audio.onended = () => {
          isSpeakingRef.current = false;
          URL.revokeObjectURL(audioUrl);
          audioElementRef.current = null;
          resolve();
        };
        audio.onerror = () => {
          isSpeakingRef.current = false;
          URL.revokeObjectURL(audioUrl);
          audioElementRef.current = null;
          resolve();
        };
        audio.play().catch(() => {
          isSpeakingRef.current = false;
          URL.revokeObjectURL(audioUrl);
          audioElementRef.current = null;
          resolve();
        });
      });
    } catch (error) {
      console.error('[speakText] Azure TTS error:', error);
      isSpeakingRef.current = false;
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!sessionId || !text.trim()) return;

    setIsProcessing(true);

    // [NEW] Calculate speech metrics before sending
    const wordCount = text.trim().split(/\s+/).length;

    // Calculate speaking duration: from first speech to last speech event
    // NOT from start to now (which includes 5s silence timeout)
    const speakingDurationMs =
      speechStartTimeRef.current && lastSpeechTimeRef.current
        ? lastSpeechTimeRef.current - speechStartTimeRef.current
        : 0;

    // [NEW] Stop pitch analyzer and get metrics
    const pitchMetrics = pitchAnalyzerRef.current?.stop();
    pitchAnalyzerRef.current = null;

    // Get Azure pronunciation scores if available
    const azureScores = azurePronScoresRef.current;

    const speechMetrics = {
      confidenceScores: [...confidenceScoresRef.current],
      wordCount,
      speakingDurationMs: Math.max(speakingDurationMs, 1000),
      pauseCount: pauseCountRef.current,
      pitchVariance: pitchMetrics?.variance ?? undefined,
      avgPitch: pitchMetrics?.avgPitch ?? undefined,
      pitchSamplesCount: pitchMetrics?.sampleCount ?? undefined,
      // Azure Pronunciation Assessment scores (real scores from SDK)
      azureAccuracyScore: azureScores?.accuracyScore ?? undefined,
      azureFluencyScore: azureScores?.fluencyScore ?? undefined,
      azureProsodyScore: azureScores?.prosodyScore ?? undefined,
      azureOverallScore: azureScores?.overallScore ?? undefined,
    };

    console.log("[handleSendMessage] Speech metrics:", {
      wordCount,
      speakingDurationMs: speechMetrics.speakingDurationMs,
      azureScores: azureScores ? `acc=${azureScores.accuracyScore}, flu=${azureScores.fluencyScore}, pro=${azureScores.prosodyScore}` : "none (heuristic fallback)",
    });

    // Reset speech metrics refs for next turn
    confidenceScoresRef.current = [];
    speechStartTimeRef.current = null;
    pauseCountRef.current = 0;
    lastSpeechTimeRef.current = null;
    azurePronScoresRef.current = null;

    // Optimistically add user turn
    const tempId = `temp-${Date.now()}`;
    const userTurn: Turn = {
      id: tempId,
      role: "user",
      text,
      timestamp: new Date(),
      wordAssessments: azureScores?.words ?? undefined,
      pronunciationScores: azureScores ? {
        accuracyScore: azureScores.accuracyScore,
        fluencyScore: azureScores.fluencyScore,
        prosodyScore: azureScores.prosodyScore,
        overallScore: azureScores.overallScore,
        completenessScore: azureScores.completenessScore,
      } : undefined,
    };

    setTurns((prev) => [...prev, userTurn]);
    setHintText(null); // Clear hint when user submits

    try {
      // [MODIFIED] Pass speech metrics to submitTurn
      const result = await submitTurn(sessionId, text, undefined, speechMetrics);

      // Update user turn with real ID (no scores during conversation)
      setTurns((prev) =>
        prev.map((t) =>
          t.id === tempId
            ? {
                ...t,
                id: result.userTurnId,
              }
            : t
        )
      );

      // Add AI turn
      const aiTurn: Turn = {
        id: result.aiTurnId,
        role: "tutor",
        text: result.aiResponse,
        timestamp: new Date(),
      };
      setTurns((prev) => [...prev, aiTurn]);

      // Fire TTS (non-blocking) and fetch hint in parallel
      // Recording start will cancel TTS if user begins speaking while AI is still talking
      speakText(result.aiResponse);

      // In scripted mode, fetch hint immediately (runs in parallel with TTS)
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
      // Remove temp turn?
    } finally {
      setIsProcessing(false);
    }
  };

  // handleExtractWords removed - vocabulary feature not in scope

  const handleDownloadTranscript = () => {
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
  };

  const handleSelectRecord = async (recordId: string) => {
    setSelectedRecordId(recordId);
    setIsLoadingFeedback(true);
    setViewState("record-review");

    try {
      const sessionData = await getSessionDetailsById(recordId);

      if (sessionData) {
        // Store session data for the assessment review
        setLoadedSessionData({
          scores: sessionData.scores,
          conversation: sessionData.conversation.map((c) => ({
            role: c.role,
            text: c.text,
            pronunciationScore: c.pronunciationScore ?? undefined,
            fluencyScore: c.fluencyScore ?? undefined,
          })),
        });

        // Also prepare DetailedFeedbackData for when they click "Detailed Feedback"
        const generateCorrectedSentence = (
          text: string,
          errors: { word: string; correction: string; type: string }[]
        ): string => {
          if (!errors || errors.length === 0) return text;

          let corrected = text;
          const sortedErrors = [...errors].sort((a, b) => {
            const posA = text.toLowerCase().indexOf(a.word.toLowerCase());
            const posB = text.toLowerCase().indexOf(b.word.toLowerCase());
            return posB - posA;
          });

          for (const error of sortedErrors) {
            const regex = new RegExp(
              error.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
              "gi"
            );
            corrected = corrected.replace(regex, error.correction);
          }
          return corrected;
        };

        // Transform session data to DetailedFeedbackData format
        const clientData: DetailedFeedbackData = {
          scores: [
            { label: "Relevance", value: sessionData.scores.relevance },
            { label: "Pronunciation", value: sessionData.scores.pronunciation },
            {
              label: "Intonation & Stress",
              value: sessionData.scores.intonation,
            },
            { label: "Fluency", value: sessionData.scores.fluency },
            { label: "Grammar", value: sessionData.scores.grammar },
          ],
          errorCategories: sessionData.errorCategories,
          conversation: sessionData.conversation.map((c) => {
            const userErrors = c.userErrors?.map((e) => ({
              word: e.word,
              correction: e.correction,
              type: e.type,
            }));

            return {
              role: c.role as "user" | "tutor",
              text: c.text,
              userErrors,
              correctedSentence:
                c.role === "user" && userErrors && userErrors.length > 0
                  ? generateCorrectedSentence(c.text, userErrors)
                  : undefined,
            };
          }),
          overallRating: sessionData.session.feedbackRating || "N/A",
          tip: sessionData.session.feedbackTip || "Great effort!",
        };

        setDynamicFeedback(clientData);
      } else {
        toast.error("Session not found");
        setViewState("history");
      }
    } catch (error) {
      console.error("Error loading session details:", error);
      toast.error("Failed to load session details");
      setViewState("history");
    } finally {
      setIsLoadingFeedback(false);
    }
  };

  // View detailed feedback - uses stored analysisResult (no API call needed)
  const handleViewDetailedFeedback = () => {
    if (!analysisResult) {
      toast.error("No analysis data available");
      return;
    }

    // Helper function to generate corrected sentence from errors
    const generateCorrectedSentence = (
      text: string,
      errors: { word: string; correction: string; type: string }[]
    ): string => {
      if (!errors || errors.length === 0) return text;

      let corrected = text;
      // Sort errors by position to replace from end to start (to preserve indices)
      const sortedErrors = [...errors].sort((a, b) => {
        const posA = text.toLowerCase().indexOf(a.word.toLowerCase());
        const posB = text.toLowerCase().indexOf(b.word.toLowerCase());
        return posB - posA; // Sort descending
      });

      for (const error of sortedErrors) {
        const regex = new RegExp(
          error.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
          "gi"
        );
        corrected = corrected.replace(regex, error.correction);
      }
      return corrected;
    };

    // Transform analysisResult to DetailedFeedbackData format
    const clientData: DetailedFeedbackData = {
      scores: [
        { label: "Relevance", value: analysisResult.scores.relevance },
        { label: "Pronunciation", value: analysisResult.scores.pronunciation },
        {
          label: "Intonation & Stress",
          value: analysisResult.scores.intonation,
        },
        { label: "Fluency", value: analysisResult.scores.fluency },
        { label: "Grammar", value: analysisResult.scores.grammar },
      ],
      errorCategories: analysisResult.errorCategories,
      conversation: analysisResult.conversation.map((c) => {
        const userErrors = c.userErrors?.map((e) => ({
          word: e.word,
          correction: e.correction,
          type: e.type,
        }));

        return {
          role: c.role,
          text: c.text,
          userErrors,
          // Generate corrected sentence if there are errors
          correctedSentence:
            c.role === "user" && userErrors && userErrors.length > 0
              ? generateCorrectedSentence(c.text, userErrors)
              : undefined,
        };
      }),
      overallRating: analysisResult.sessionAnalysis.feedbackRating,
      tip: analysisResult.sessionAnalysis.feedbackTip,
    };

    setDynamicFeedback(clientData);
    setViewState("detail");
  };

  // Transform scores with icons for DetailedFeedback component
  const scoresWithIcons = useMemo(() => detailedFeedback.scores.map((s) => ({
    ...s,
    icon: getScoreIcon(s.label),
  })), [detailedFeedback.scores]);

  // Use dynamic feedback if available, otherwise fall back to prop
  const feedbackToUse = dynamicFeedback || detailedFeedback;

  // Build scores with icons
  const detailScoresWithIcons = useMemo(() => feedbackToUse.scores.map((s) => ({
    ...s,
    icon: getScoreIcon(s.label),
  })), [feedbackToUse.scores]);

  // Use analysisResult if available, otherwise calculate from turns (fallback)
  const scores = analysisResult?.scores || {
    grammar: 0,
    relevance: 0,
    fluency: 70,
    pronunciation: 70,
    intonation: 70,
    overall: 0,
  };

  const radarData = useMemo(() => [
    { label: "Relevance", value: scores.relevance },
    { label: "Pronunciation", value: scores.pronunciation },
    { label: "Intonation & Stress", value: scores.intonation },
    { label: "Fluency", value: scores.fluency },
    { label: "Grammar", value: scores.grammar },
  ], [scores.relevance, scores.pronunciation, scores.intonation, scores.fluency, scores.grammar]);

  // Build AssessmentData for the pronunciation review page (per-turn)
  const assessmentData: AssessmentData = useMemo(() => {
    const userTurns = turns.filter((t) => t.role === "user");

    const turnAssessments = userTurns.map((t) => ({
      text: t.text,
      words: t.wordAssessments ?? [],
      accuracyScore: t.pronunciationScores?.accuracyScore ?? scores.pronunciation,
      fluencyScore: t.pronunciationScores?.fluencyScore ?? scores.fluency,
      prosodyScore: t.pronunciationScores?.prosodyScore ?? scores.intonation,
      overallScore: t.pronunciationScores?.overallScore ?? scores.pronunciation,
      completenessScore: t.pronunciationScores?.completenessScore ?? 0,
    }));

    const fullText = userTurns.map((t) => t.text).join(" ");

    // Average across turns
    const avg = (fn: (t: typeof turnAssessments[0]) => number, fallback: number) =>
      turnAssessments.length > 0
        ? turnAssessments.reduce((sum, t) => sum + fn(t), 0) / turnAssessments.length
        : fallback;

    // Average completeness scores (only meaningful in scripted mode)
    const avgCompleteness = turnAssessments.length > 0
      ? turnAssessments.reduce((sum, t) => sum + (t.completenessScore ?? 0), 0) / turnAssessments.length
      : 0;

    return {
      turns: turnAssessments,
      fullText,
      pronunciationScore: Math.round(avg((t) => t.overallScore, scores.pronunciation)),
      accuracyScore: Math.round(avg((t) => t.accuracyScore, scores.pronunciation)),
      fluencyScore: Math.round(avg((t) => t.fluencyScore, scores.fluency)),
      prosodyScore: Math.round(avg((t) => t.prosodyScore, scores.intonation)),
      completenessScore: Math.round(avgCompleteness),
      contentScore: Math.round((scores.grammar + scores.relevance) / 2),
      grammarScore: scores.grammar,
      relevanceScore: scores.relevance,
      vocabularyScore: scores.grammar,
    };
  }, [turns, scores]);

  if (!scenario) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-96 bg-muted animate-pulse rounded-2xl" />
      </div>
    );
  }

  if (viewState === "history") {
    if (isLoadingRecords) {
      // Skeleton loading for Learning Records
      return (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
          <Card className="p-6 border-[1.4px] border-primary-200 max-w-4xl mx-auto bg-white">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-primary-100 animate-pulse" />
                <div>
                  <div className="h-7 w-48 bg-muted rounded animate-pulse mb-2" />
                  <div className="h-4 w-64 bg-muted rounded animate-pulse" />
                </div>
              </div>
              <div className="h-10 w-24 bg-muted rounded animate-pulse" />
            </div>
            {/* Stats Skeleton */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-primary-100 bg-card"
                >
                  <div className="h-8 w-8 rounded-lg bg-muted animate-pulse mb-2" />
                  <div className="h-8 w-12 bg-muted rounded animate-pulse mb-1" />
                  <div className="h-3 w-20 bg-muted rounded animate-pulse" />
                </div>
              ))}
            </div>
            {/* Section Title Skeleton */}
            <div className="flex items-center justify-between mb-4">
              <div className="h-6 w-32 bg-muted rounded animate-pulse" />
              <div className="h-4 w-20 bg-muted rounded animate-pulse" />
            </div>
            {/* Records List Skeleton */}
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-primary-100 bg-card"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />
                      <div>
                        <div className="h-5 w-24 bg-muted rounded animate-pulse mb-2" />
                        <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                      </div>
                    </div>
                    <div className="h-8 w-16 bg-muted rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      );
    }
    return (
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <LearningHistory
          records={dynamicRecords}
          onBack={() => setViewState("preparation")}
          onSelectRecord={handleSelectRecord}
        />
      </div>
    );
  }

  if (viewState === "record-review") {
    if (isLoadingFeedback) {
      return (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
          <Card className="p-16 text-center border-0 shadow-2xl bg-white rounded-[3rem] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-50 via-transparent to-transparent opacity-70" />
            <div className="relative z-10">
              <div className="relative mx-auto mb-8 w-24 h-24">
                <div className="absolute inset-0 rounded-full border-4 border-primary-100"></div>
                <div className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
                <Bot className="absolute inset-0 m-auto h-8 w-8 text-primary-500 animate-pulse" />
              </div>
              <h2 className="text-3xl font-bold mb-3 text-slate-800">
                Loading Assessment...
              </h2>
              <p className="text-lg text-slate-500 max-w-md mx-auto">
                Retrieving your pronunciation and content assessment results.
              </p>
            </div>
          </Card>
        </div>
      );
    }

    if (loadedSessionData) {
      // Build AssessmentData from loaded session
      const userConvTurns = loadedSessionData.conversation.filter(
        (c) => c.role === "user"
      );

      const recordAssessmentData: AssessmentData = {
        turns: userConvTurns.map((c) => ({
          text: c.text,
          words: [], // Per-word data not stored in DB; text is shown as-is
          accuracyScore: c.pronunciationScore ?? loadedSessionData.scores.pronunciation,
          fluencyScore: c.fluencyScore ?? loadedSessionData.scores.fluency,
          prosodyScore: loadedSessionData.scores.intonation,
          overallScore: c.pronunciationScore ?? loadedSessionData.scores.pronunciation,
        })),
        fullText: userConvTurns.map((c) => c.text).join(" "),
        pronunciationScore: loadedSessionData.scores.pronunciation,
        accuracyScore: loadedSessionData.scores.pronunciation,
        fluencyScore: loadedSessionData.scores.fluency,
        prosodyScore: loadedSessionData.scores.intonation,
        contentScore: Math.round(
          (loadedSessionData.scores.grammar + loadedSessionData.scores.relevance) / 2
        ),
        grammarScore: loadedSessionData.scores.grammar,
        relevanceScore: loadedSessionData.scores.relevance,
        vocabularyScore: loadedSessionData.scores.grammar,
      };

      return (
        <PronunciationAssessmentReview
          data={recordAssessmentData}
          onBack={() => {
            setViewState("history");
            setSelectedRecordId(null);
            setLoadedSessionData(null);
          }}
          onRetry={() => {
            setSessionId(null);
            setTurns([]);
            setAnalysisResult(null);
            setDynamicFeedback(null);
            setLoadedSessionData(null);
            setViewState("preparation");
          }}
          onDetailedFeedback={() => {
            setViewState("detail");
          }}
        />
      );
    }
  }

  if (viewState === "detail") {
    if (isLoadingFeedback) {
      return (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
          <Card className="p-16 text-center border-0 shadow-2xl bg-white rounded-[3rem] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-50 via-transparent to-transparent opacity-70" />
            <div className="relative z-10">
              <div className="relative mx-auto mb-8 w-24 h-24">
                <div className="absolute inset-0 rounded-full border-4 border-primary-100"></div>
                <div className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
                <Bot className="absolute inset-0 m-auto h-8 w-8 text-primary-500 animate-pulse" />
              </div>
              <h2 className="text-3xl font-bold mb-3 text-slate-800">
                Analyzing Your Session...
              </h2>
              <p className="text-lg text-slate-500 max-w-md mx-auto">
                AI is reviewing your conversation context, vocabulary, and
                grammar to provide detailed feedback.
              </p>
            </div>
          </Card>
        </div>
      );
    }

    // Calculate overall score from the 5 individual scores
    const overallScore =
      analysisResult?.scores.overall ||
      Math.round(
        feedbackToUse.scores.reduce((sum, s) => sum + s.value, 0) /
          feedbackToUse.scores.length
      );

    return (
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <DetailedFeedback
          scores={detailScoresWithIcons}
          errorCategories={feedbackToUse.errorCategories}
          conversation={feedbackToUse.conversation}
          overallRating={feedbackToUse.overallRating}
          overallScore={overallScore}
          tip={feedbackToUse.tip}
          onBack={() => {
            setViewState(selectedRecordId ? "record-review" : "complete");
            if (!selectedRecordId) {
              setDynamicFeedback(null);
            }
          }}
        />
      </div>
    );
  }

  // Skeleton loading when starting session
  if (isStartingSession) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 h-screen max-h-screen flex flex-col">
        {/* Header Skeleton */}
        <div className="mb-4 flex items-center justify-center relative max-w-4xl mx-auto w-full">
          <div className="absolute left-0 w-10 h-10 rounded-full bg-muted animate-pulse" />
          <div className="h-8 w-48 bg-muted rounded-lg animate-pulse" />
          <div className="absolute right-0 w-10 h-10 rounded-full bg-muted animate-pulse" />
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-1 flex justify-center min-h-0 pb-4">
          <div className="w-full max-w-4xl rounded-3xl border-2 border-border bg-primary-100 flex flex-col overflow-hidden relative shadow-lg">
            {/* Chat Messages Skeleton */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Tutor message skeleton */}
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-2xl">
                  <div className="shrink-0 w-7 h-7 rounded-full bg-muted animate-pulse" />
                  <div className="flex-1">
                    <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-md w-64">
                      <div className="h-4 bg-muted rounded animate-pulse mb-2" />
                      <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Tutor greeting skeleton */}
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-2xl">
                  <div className="shrink-0 w-7 h-7 rounded-full bg-muted animate-pulse" />
                  <div className="flex-1">
                    <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-md w-80">
                      <div className="h-4 bg-muted rounded animate-pulse mb-2" />
                      <div className="h-4 bg-muted rounded animate-pulse mb-2" />
                      <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Area Skeleton */}
            <div className="p-6 border-t border-border bg-white/80 backdrop-blur-xl">
              <div className="flex justify-center items-center">
                <div className="w-[60px] h-[60px] rounded-full bg-muted animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (viewState === "preparation") {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/speaking">
          <Button variant="outline" className="gap-2 mb-6 bg-white">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>

        {/* Two-column layout with equal heights */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <Card className="p-8 bg-white flex flex-col">
            {/* Learning Goals Section */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="h-6 w-6" />
                <h2 className="text-2xl font-bold">Learning Goals</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-400 text-white flex items-center justify-center font-semibold text-sm">
                    1
                  </span>
                  <p className="p-4 bg-primary-50 rounded-xl flex-1">
                    {scenario.goal || "Practice conversation skill"}
                  </p>
                </div>
                {scenario.objectives && scenario.objectives.length > 0 ? (
                  scenario.objectives.map((obj, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-400 text-white flex items-center justify-center font-semibold text-sm">
                        {idx + 2}
                      </span>
                      <p className="p-4 bg-primary-50 rounded-xl flex-1">
                        {obj}
                      </p>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-semibold text-sm">
                        2
                      </span>
                      <p className="p-4 bg-primary-50 rounded-xl flex-1">
                        Improve vocabulary
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-semibold text-sm">
                        3
                      </span>
                      <p className="p-4 bg-primary-50 rounded-xl flex-1">
                        Enhance fluency
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Context Section */}
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="h-5 w-5" />
                <h2 className="text-xl font-bold">Context</h2>
              </div>
              <div className="p-4 bg-primary-50 rounded-xl text-sm italic text-muted-foreground">
                {scenario.context}
              </div>
            </div>
          </Card>

          {/* Right Column */}
          <Card className="p-8 bg-white flex flex-col">
            <div className="aspect-video bg-linear-to-br from-primary-200 to-primary-300 rounded-2xl mb-6 relative overflow-hidden">
              <Image
                src={scenario.image || "/learning.png"}
                alt={scenario.title}
                fill
                className="object-cover rounded-2xl"
              />
            </div>

            <div className="flex-1 flex flex-col">
              <h1 className="text-3xl font-bold mb-4">{scenario.title}</h1>
              <p className="text-muted-foreground flex-1">
                {scenario.description || scenario.context}
              </p>

              {/* Mode Selector */}
              <div className="mt-6 mb-4">
                <p className="text-sm font-semibold text-slate-700 mb-2">Assessment Mode</p>
                <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
                  <button
                    onClick={() => setSessionMode("unscripted")}
                    className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      sessionMode === "unscripted"
                        ? "bg-white text-slate-800 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    🗣️ Free Speaking
                  </button>
                  <button
                    onClick={() => setSessionMode("scripted")}
                    className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      sessionMode === "scripted"
                        ? "bg-white text-slate-800 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    📖 Read Aloud
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-1.5">
                  {sessionMode === "scripted"
                    ? "Read the AI suggestions aloud — scored on accuracy, completeness, and pronunciation."
                    : "Speak freely using AI hints as reference — scored on accuracy, fluency, and prosody."}
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={startSession}
                  className="flex-1 gap-2 text-lg py-6"
                  size="lg"
                >
                  <Play className="h-5 w-5" />
                  Start Speaking
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-6 bg-transparent"
                  onClick={async () => {
                    setViewState("history");
                    setIsLoadingRecords(true);
                    try {
                      // Get userId from auth context
                      const userId = user?.id || "user-1"; // Fallback for dev
                      const records = await getLearningRecordsForScenario(
                        userId,
                        scenarioId
                      );
                      setDynamicRecords(
                        records.map((r) => ({
                          id: r.id,
                          overallScore: r.overallScore,
                          grammarScore: r.grammarScore,
                          relevanceScore: r.relevanceScore,
                          fluencyScore: r.fluencyScore,
                          pronunciationScore: r.pronunciationScore,
                          intonationScore: r.intonationScore,
                          date: new Date(r.date),
                        }))
                      );
                    } catch (error) {
                      console.error("Failed to fetch learning records:", error);
                      toast.error("Failed to load learning records");
                    } finally {
                      setIsLoadingRecords(false);
                    }
                  }}
                >
                  <RotateCcw className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (viewState === "active") {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 h-screen max-h-screen flex flex-col">
        {/* Options Dialog (Hamburger menu) */}
        {showQuitDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
              <h3 className="text-lg font-bold text-center mb-6">Option</h3>
              <div className="flex flex-col gap-3">
                <Button
                  className="w-full bg-[#4f46e5] hover:bg-[#4338ca]"
                  onClick={() => setShowQuitDialog(false)}
                >
                  Continue
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-2 border-primary-200 hover:bg-primary-50"
                  onClick={async () => {
                    setShowQuitDialog(false);
                    stopMicrophone(); // Stop mic before analyzing
                    setViewState("analyzing");
                    try {
                      if (sessionId) {
                        const result = await analyzeAndScoreSession(sessionId);
                        setAnalysisResult({
                          scores: result.scores,
                          sessionAnalysis: {
                            feedbackTitle: result.feedbackTitle,
                            feedbackSummary: result.feedbackSummary,
                            feedbackRating: result.feedbackRating,
                            feedbackTip: result.feedbackTip,
                          },
                          errorCategories: result.errorCategories,
                          conversation: result.conversation.map(c => ({
                            ...c,
                            role: c.role as "user" | "tutor",
                            userErrors: c.userErrors?.map(e => ({
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
                  }}
                >
                  Finish
                </Button>
                <Link
                  href="/speaking"
                  className="w-full"
                  onClick={stopMicrophone}
                >
                  <Button
                    variant="outline"
                    className="w-full border-2 border-primary-200 hover:bg-primary-50"
                  >
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Finish Confirmation Dialog (Fast Forward button) */}
        {showFinishDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
              <h3 className="text-lg font-bold text-center mb-6">
                Are you sure you want to finish this conversation?
              </h3>
              <div className="flex flex-col gap-3">
                <Button
                  className="w-full bg-[#4f46e5] hover:bg-[#4338ca]"
                  onClick={() => setShowFinishDialog(false)}
                >
                  No
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-2 border-primary-200 hover:bg-primary-50"
                  onClick={async () => {
                    setShowFinishDialog(false);
                    stopMicrophone(); // Stop mic before analyzing
                    setViewState("analyzing");
                    try {
                      if (sessionId) {
                        const result = await analyzeAndScoreSession(sessionId);
                        setAnalysisResult({
                          scores: result.scores,
                          sessionAnalysis: {
                            feedbackTitle: result.feedbackTitle,
                            feedbackSummary: result.feedbackSummary,
                            feedbackRating: result.feedbackRating,
                            feedbackTip: result.feedbackTip,
                          },
                          errorCategories: result.errorCategories,
                          conversation: result.conversation.map(c => ({
                            ...c,
                            role: c.role as "user" | "tutor",
                            userErrors: c.userErrors?.map(e => ({
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
                  }}
                >
                  Yes
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-4 flex items-center justify-center z-10 shrink-0 relative max-w-4xl mx-auto w-full">
          {/* Menu Button - with rotation animation */}
          <button
            onClick={() => setShowQuitDialog(true)}
            className={`absolute left-0 w-10 h-10 rounded-full bg-[#e0e7ff] flex items-center justify-center hover:bg-[#c7d2fe] transition-all duration-300 ${
              showQuitDialog ? "rotate-90" : "rotate-0"
            }`}
          >
            <Menu className="h-5 w-5 text-[#4b3fd4]" />
          </button>
          <h1 className="text-2xl font-bold text-center">{scenario.title}</h1>
          {/* Fast Forward Button */}
          <button
            onClick={() => setShowFinishDialog(true)}
            className="absolute right-0 w-10 h-10 rounded-full bg-[#e0e7ff] flex items-center justify-center hover:bg-[#c7d2fe] transition-all duration-300"
          >
            <FastForward className="h-5 w-5 text-[#4b3fd4]" />
          </button>
        </div>

        {/* Main Content - Centered Chat */}
        <div className="flex-1 flex justify-center min-h-0 pb-4">
          <div className="w-full max-w-4xl rounded-3xl border-2 border-border bg-primary-100 flex flex-col overflow-hidden relative shadow-lg">
            <div
              className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-none"
              ref={conversationRef}
            >
              {turns.map((turn) => (
                <div
                  key={turn.id}
                  className={`flex ${
                    turn.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="flex gap-3 max-w-2xl group">
                    {turn.role === "tutor" && (
                      <div className="shrink-0 w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-md border border-border">
                        <Bot className="h-4 w-4 text-[#4f46e5]" />
                      </div>
                    )}

                    <div className="flex-1">
                      <div
                        className={`rounded-2xl px-3 py-2 shadow-md backdrop-blur-sm text-[15px] ${
                          turn.role === "user"
                            ? "bg-[#4f46e5] text-white rounded-tr-sm"
                            : "bg-white text-foreground border border-border rounded-tl-sm"
                        }`}
                      >
                        <p className="leading-relaxed">{turn.text}</p>
                      </div>
                      <div
                        className={`flex gap-2 mt-1 px-1 ${
                          turn.role === "user" ? "justify-end" : "justify-start"
                        } opacity-0 group-hover:opacity-100 transition-opacity`}
                      >
                        <button
                          onClick={() => speakText(turn.text)}
                          className="p-1.5 hover:bg-slate-700 rounded-full text-slate-500 hover:text-blue-400 transition-colors"
                        >
                          <Volume2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {turn.role === "user" && (
                      <div className="shrink-0 w-7 h-7 rounded-full bg-[#4f46e5] flex items-center justify-center text-white shadow-md">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-3 bg-white border border-border p-3 rounded-2xl">
                    <div className="flex gap-1">
                      <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground font-medium">
                      Thinking...
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area — glassmorphism bar */}
            <div className="px-4 py-3 border-t border-border/50 bg-white/90 backdrop-blur-2xl absolute bottom-0 w-full z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
              {/* Hint display card */}
              {hintText && (
                <div className="mb-3 mx-auto max-w-lg motion-safe:animate-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-300">
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50/80 border border-amber-200/60 shadow-md shadow-amber-100/40">
                    {/* Gradient left accent */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 via-orange-400 to-amber-300" />
                    <div className="flex items-start gap-3 pl-4 pr-3 py-3">
                      <div className="shrink-0 mt-0.5 w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center shadow-sm">
                        <Lightbulb className="h-3.5 w-3.5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-amber-600/80 mb-1">
                          {sessionMode === "scripted" ? "📖 Read aloud" : "Suggested response"}
                        </p>
                        <p className="text-[14px] text-amber-950 leading-relaxed font-medium">&ldquo;{hintText}&rdquo;</p>
                      </div>
                      {sessionMode !== "scripted" && (
                        <button
                          onClick={() => setHintText(null)}
                          className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center hover:bg-amber-200/50 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                          aria-label="Dismiss hint"
                        >
                          <X className="h-3.5 w-3.5 text-amber-400" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Action buttons row */}
              <div className="flex justify-center items-center gap-5">
                {/* Hint button */}
                <button
                  onClick={async () => {
                    if (!sessionId || isLoadingHint) return;
                    setIsLoadingHint(true);
                    setHintText(null);
                    try {
                      const hint = await getSessionHint(sessionId);
                      setHintText(hint);
                    } catch (e) {
                      toast.error("Failed to get hint");
                    } finally {
                      setIsLoadingHint(false);
                    }
                  }}
                  disabled={isLoadingHint || isRecording}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 ${
                    isLoadingHint
                      ? "bg-amber-100 text-amber-500 motion-safe:animate-pulse shadow-inner"
                      : hintText
                        ? "bg-gradient-to-br from-amber-400 to-orange-400 text-white shadow-lg shadow-amber-200/50 hover:shadow-amber-300/60"
                        : "bg-amber-50 border border-amber-200/80 text-amber-500 hover:bg-amber-100 hover:border-amber-300 hover:shadow-md hover:shadow-amber-100/40 motion-safe:hover:scale-105"
                  } disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100`}
                  aria-label={isLoadingHint ? "Loading hint..." : "Get a hint for what to say"}
                >
                  <Lightbulb className="h-5 w-5" />
                </button>

                {/* Mic button — primary action */}
                <button
                  onClick={handleToggleRecording}
                  className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 ${
                    isRecording
                      ? "bg-gradient-to-br from-indigo-400 to-violet-500 shadow-xl shadow-indigo-300/40 motion-safe:scale-110 ring-4 ring-indigo-300/30"
                      : "bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg shadow-indigo-200/50 motion-safe:hover:scale-105 hover:from-indigo-600 hover:to-indigo-700 hover:shadow-xl hover:shadow-indigo-300/40"
                  } text-white`}
                  aria-label={isRecording ? "Stop recording" : "Start recording"}
                >
                  <Mic
                    className={`h-6 w-6 ${isRecording ? "motion-safe:animate-pulse" : ""}`}
                  />

                  {/* Ripple effect when recording */}
                  {isRecording && (
                    <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-20 motion-safe:animate-ping" />
                  )}
                </button>
              </div>

              {/* Helper text */}
              <p className="text-center text-[11px] text-muted-foreground/60 mt-2 select-none">
                {isRecording ? "Tap to stop recording" : "Tap mic to speak · Lightbulb for hints"}
              </p>
            </div>
            {/* Spacer for input area since it's absolute */}
            <div className="h-[140px] shrink-0" />
          </div>
        </div>

        {/* Sidebar - Commented out: Live Analysis and Vocab Helper
        <div className="lg:col-span-4 flex flex-col gap-6 h-full overflow-hidden">
          {/* Live Analysis Card */}
        {/*
          <div className="rounded-3xl border-2 border-border p-6 bg-white shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <Waveform className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-bold text-foreground">Live Analysis</h3>
            </div>
            <div className="space-y-6">
              ... Live Analysis content ...
            </div>
          </div>
          */}

        {/* Vocab Helper - Commented out */}
        {/*
          <div className="flex-1 min-h-0 rounded-3xl overflow-hidden shadow-xl bg-white border-2 border-border backdrop-blur-md">
            <VocabHelperChatbot />
          </div>
          */}
        {/* End Sidebar comment */}
      </div>
    );
  }

  // Analyzing state - show loading while AI analyzes the session
  if (viewState === "analyzing") {
    return (
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <Card className="p-16 text-center border-0 shadow-2xl bg-white rounded-[3rem] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-50 via-transparent to-transparent opacity-70" />
          <div className="relative z-10">
            <div className="relative mx-auto mb-8 w-24 h-24">
              <div className="absolute inset-0 rounded-full border-4 border-primary-100"></div>
              <div className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
              <Bot className="absolute inset-0 m-auto h-8 w-8 text-primary-500 animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold mb-3 text-slate-800">
              Analyzing Your Session...
            </h2>
            <p className="text-lg text-slate-500 max-w-md mx-auto">
              AI is reviewing your conversation, checking grammar, and
              calculating your scores. Please wait.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  if (viewState === "complete") {
    const overallScore =
      scores.overall ||
      Math.round(
        (scores.grammar +
          scores.relevance +
          scores.fluency +
          scores.pronunciation +
          scores.intonation) /
          5
      );

    // Generate summary title and description based on analysisResult or fallback
    const getSummaryTitle = () => {
      if (analysisResult?.sessionAnalysis.feedbackTitle) {
        return analysisResult.sessionAnalysis.feedbackTitle;
      }
      if (overallScore >= 90) return "Outstanding Performance!";
      if (overallScore >= 80) return "Amazing Context Understanding";
      if (overallScore >= 70) return "Great Progress!";
      if (overallScore >= 60) return "Good Effort!";
      return "Keep Practicing!";
    };

    const getSummaryDescription = () => {
      if (analysisResult?.sessionAnalysis.feedbackSummary) {
        return analysisResult.sessionAnalysis.feedbackSummary;
      }
      if (overallScore >= 90)
        return "Your speaking skills are impressive! You demonstrated excellent control over grammar and vocabulary.";
      if (overallScore >= 80)
        return "You did a great job conveying your ideas. Your pronunciation is clear, and you used good vocabulary.";
      if (overallScore >= 70)
        return "You are making steady progress. Focus on improving your sentence structure and fluency.";
      return "Don't give up! Consistency is key. Try listening to native speakers and shadowing their pronunciation.";
    };


    return (
      <PronunciationAssessmentReview
        data={assessmentData}
        mode={sessionMode}
        onBack={() => {
          router.push("/speaking");
        }}
        onRetry={() => {
          setSessionId(null);
          setTurns([]);
          setAnalysisResult(null);
          setDynamicFeedback(null);
          setViewState("preparation");
        }}
        onDetailedFeedback={handleViewDetailedFeedback}
      />
    );
  }

  return <div>Loading...</div>;
}
