import React from "react";
import {
  Target,
  Mic2,
  AudioWaveform as Waveform,
  Zap,
  Languages,
} from "lucide-react";
import type {
  DetailedFeedbackData,
  DetailedFeedbackScore,
  Turn,
  WordAssessment,
} from "@/hooks/speaking-session/types";
import type { AssessmentData } from "@/components/speaking/pronunciation-assessment";

// ─── Corrected sentence generation (was duplicated 3×) ──

/**
 * Replaces erroneous words with their corrections, processing
 * from end-to-start to preserve string indices.
 */
export function generateCorrectedSentence(
  text: string,
  errors: { word: string; correction: string; type: string }[]
): string {
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
}

// ─── Score icon mapping ─────────────────────────────

export function getScoreIcon(label: string): React.ReactNode {
  switch (label) {
    case "Topic":
      return React.createElement(Target, { className: "h-4 w-4" });
    case "Accuracy":
      return React.createElement(Mic2, { className: "h-4 w-4" });
    case "Prosody":
      return React.createElement(Waveform, { className: "h-4 w-4" });
    case "Fluency":
      return React.createElement(Zap, { className: "h-4 w-4" });
    case "Grammar":
      return React.createElement(Languages, { className: "h-4 w-4" });
    case "Vocabulary":
      return React.createElement(Languages, { className: "h-4 w-4" });
    default:
      return React.createElement(Target, { className: "h-4 w-4" });
  }
}

// ─── Build DetailedFeedbackData from API response ───

interface SessionDataForFeedback {
  scores: {
    grammar: number;
    topic: number;
    fluency: number;
    accuracy: number;
    prosody: number;
    vocabulary: number;
  };
  errorCategories: { name: string; count: number }[];
  conversation: {
    role: string;
    text: string;
    userErrors?: { word: string; correction: string; type: string }[];
  }[];
  feedbackRating: string;
  feedbackTip: string;
}

export function buildDetailedFeedbackData(
  data: SessionDataForFeedback
): DetailedFeedbackData {
  return {
    scores: [
      { label: "Accuracy", value: data.scores.accuracy },
      { label: "Fluency", value: data.scores.fluency },
      { label: "Prosody", value: data.scores.prosody },
      { label: "Grammar", value: data.scores.grammar },
      { label: "Topic", value: data.scores.topic },
      { label: "Vocabulary", value: data.scores.vocabulary },
    ],
    errorCategories: data.errorCategories,
    conversation: data.conversation.map((c) => {
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
    overallRating: data.feedbackRating,
    tip: data.feedbackTip,
  };
}

// ─── Build scores array with icons ──────────────────

export function buildScoresWithIcons(
  scores: DetailedFeedbackScore[]
): (DetailedFeedbackScore & { icon: React.ReactNode })[] {
  return scores.map((s) => ({
    ...s,
    icon: getScoreIcon(s.label),
  }));
}

// ─── Build AssessmentData from turns ────────────────

interface ScoresInput {
  accuracy: number;
  fluency: number;
  prosody: number;
  grammar: number;
  topic: number;
  vocabulary: number;
}

export function buildAssessmentData(
  turns: Turn[],
  scores: ScoresInput
): AssessmentData {
  const userTurns = turns.filter((t) => t.role === "user");

  const turnAssessments = userTurns.map((t) => ({
    text: t.text,
    words: t.wordAssessments ?? [],
    accuracyScore:
      t.pronunciationScores?.accuracyScore ?? scores.accuracy,
    fluencyScore: t.pronunciationScores?.fluencyScore ?? scores.fluency,
    prosodyScore: t.pronunciationScores?.prosodyScore ?? scores.prosody,
    overallScore:
      t.pronunciationScores?.overallScore ?? scores.accuracy,
    completenessScore: t.pronunciationScores?.completenessScore ?? 0,
  }));

  const fullText = userTurns.map((t) => t.text).join(" ");

  const avg = (
    fn: (t: (typeof turnAssessments)[0]) => number,
    fallback: number
  ) =>
    turnAssessments.length > 0
      ? turnAssessments.reduce((sum, t) => sum + fn(t), 0) /
        turnAssessments.length
      : fallback;

  const avgCompleteness =
    turnAssessments.length > 0
      ? turnAssessments.reduce(
          (sum, t) => sum + (t.completenessScore ?? 0),
          0
        ) / turnAssessments.length
      : 0;

  return {
    turns: turnAssessments,
    fullText,
    pronunciationScore: Math.round(
      avg((t) => t.overallScore, scores.accuracy)
    ),
    accuracyScore: Math.round(
      avg((t) => t.accuracyScore, scores.accuracy)
    ),
    fluencyScore: Math.round(avg((t) => t.fluencyScore, scores.fluency)),
    prosodyScore: Math.round(avg((t) => t.prosodyScore, scores.prosody)),
    completenessScore: Math.round(avgCompleteness),
    contentScore: Math.round((scores.grammar + scores.topic + scores.vocabulary) / 3),
    grammarScore: scores.grammar,
    relevanceScore: scores.topic,
    vocabularyScore: scores.vocabulary,
  };
}
