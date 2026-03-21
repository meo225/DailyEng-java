"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  getSessionDetailsById,
  getLearningRecordsForScenario,
  deleteSession,
} from "@/actions/speaking";
import { useAuth } from "@/contexts/AuthContext";
import type {
  AnalysisResult,
  LearningRecord,
  LoadedSessionData,
  ViewState,
} from "./types";

interface UseSessionFeedbackOptions {
  scenarioId: string;
  setViewState: (state: ViewState) => void;
}

/**
 * Manages session feedback data: analysis results, dynamic records,
 * history loading, and URL-based session loading.
 */
export function useSessionFeedback({
  scenarioId,
  setViewState,
}: UseSessionFeedbackOptions) {
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
  const [isLoadingRecords, setIsLoadingRecords] = useState(false);
  const [dynamicRecords, setDynamicRecords] = useState<LearningRecord[]>([]);
  const [loadedSessionData, setLoadedSessionData] =
    useState<LoadedSessionData | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );

  // Auto-load session detail ONLY when navigated from History tab (?session=...&from=history)
  // Without from=history, ?session= is a newly-created active session and should be ignored here
  const sessionParamHandled = useRef(false);
  useEffect(() => {
    if (sessionParamHandled.current) return;
    const sessionParam = searchParams.get("session");
    const fromParam = searchParams.get("from");
    if (sessionParam && fromParam === "history") {
      sessionParamHandled.current = true;
      loadSessionFromUrl(sessionParam);
    }
  }, [searchParams]);

  const loadSessionFromUrl = async (sessionParam: string) => {
    setSelectedRecordId(sessionParam);
    setIsLoadingFeedback(true);
    setViewState("record-review");
    try {
      const sessionData = await getSessionDetailsById(sessionParam);
      if (sessionData) {
        setLoadedSessionData({
          scores: sessionData.scores,
          conversation: sessionData.conversation.map((c) => ({
            role: c.role,
            text: c.text,
            accuracyScore: c.accuracyScore ?? undefined,
            fluencyScore: c.fluencyScore ?? undefined,
            wordAssessments: c.wordAssessments ?? undefined,
          })),
        });
      } else {
        setViewState("preparation");
      }
    } catch (error) {
      console.error("Error loading session from URL:", error);
      setViewState("preparation");
    } finally {
      setIsLoadingFeedback(false);
    }
  };

  const handleSelectRecord = useCallback(
    async (recordId: string) => {
      setSelectedRecordId(recordId);
      setIsLoadingFeedback(true);
      setViewState("record-review");

      try {
        const sessionData = await getSessionDetailsById(recordId);

        if (sessionData) {
          setLoadedSessionData({
            scores: sessionData.scores,
            conversation: sessionData.conversation.map((c) => ({
              role: c.role,
              text: c.text,
              accuracyScore: c.accuracyScore ?? undefined,
              fluencyScore: c.fluencyScore ?? undefined,
              wordAssessments: c.wordAssessments ?? undefined,
            })),
          });
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
    },
    [setViewState]
  );

  const handleDeleteRecord = useCallback(
    async (recordId: string) => {
      // Optimistic removal
      setDynamicRecords((prev) => prev.filter((r) => r.id !== recordId));
      try {
        await deleteSession(recordId);
      } catch (error) {
        console.error("Failed to delete session:", error);
        toast.error("Failed to delete session");
        // Restore by re-fetching
        const userId = user?.id || "user-1";
        const records = await getLearningRecordsForScenario(userId, scenarioId);
        setDynamicRecords(
          records.map((r) => ({
            id: r.id,
            overallScore: r.overallScore,
            grammarScore: r.grammarScore,
            topicScore: r.topicScore,
            fluencyScore: r.fluencyScore,
            accuracyScore: r.accuracyScore,
            prosodyScore: r.prosodyScore,
            vocabularyScore: r.vocabularyScore ?? 0,
            date: new Date(r.date),
          }))
        );
      }
    },
    [scenarioId, user?.id]
  );

  const loadLearningRecords = useCallback(async () => {
    setViewState("history");
    setIsLoadingRecords(true);
    try {
      const userId = user?.id || "user-1";
      const records = await getLearningRecordsForScenario(userId, scenarioId);
      setDynamicRecords(
        records.map((r) => ({
          id: r.id,
          overallScore: r.overallScore,
          grammarScore: r.grammarScore,
          topicScore: r.topicScore,
          fluencyScore: r.fluencyScore,
          accuracyScore: r.accuracyScore,
          prosodyScore: r.prosodyScore,
          vocabularyScore: r.vocabularyScore ?? 0,
          date: new Date(r.date),
        }))
      );
    } catch (error) {
      console.error("Failed to fetch learning records:", error);
      toast.error("Failed to load learning records");
    } finally {
      setIsLoadingRecords(false);
    }
  }, [user?.id, scenarioId, setViewState]);

  const resetFeedbackState = useCallback(() => {
    setAnalysisResult(null);
    setLoadedSessionData(null);
    setSelectedRecordId(null);
  }, []);

  return {
    selectedRecordId,
    setSelectedRecordId,
    isLoadingFeedback,
    isLoadingRecords,
    dynamicRecords,
    loadedSessionData,
    setLoadedSessionData,
    analysisResult,
    setAnalysisResult,
    handleSelectRecord,
    handleDeleteRecord,
    loadLearningRecords,
    resetFeedbackState,
  };
}
