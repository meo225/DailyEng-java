"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  getSessionDetailsById,
  getLearningRecordsForScenario,
} from "@/actions/speaking";
import { useAuth } from "@/contexts/AuthContext";
import { buildDetailedFeedbackData } from "@/lib/speaking-session-utils";
import type {
  AnalysisResult,
  DetailedFeedbackData,
  LearningRecord,
  LoadedSessionData,
  ViewState,
} from "./types";

interface UseSessionFeedbackOptions {
  scenarioId: string;
  detailedFeedback: DetailedFeedbackData;
  setViewState: (state: ViewState) => void;
}

/**
 * Manages session feedback data: analysis results, dynamic records,
 * history loading, detailed feedback, and URL-based session loading.
 */
export function useSessionFeedback({
  scenarioId,
  detailedFeedback,
  setViewState,
}: UseSessionFeedbackOptions) {
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
  const [isLoadingRecords, setIsLoadingRecords] = useState(false);
  const [dynamicRecords, setDynamicRecords] = useState<LearningRecord[]>([]);
  const [dynamicFeedback, setDynamicFeedback] =
    useState<DetailedFeedbackData | null>(null);
  const [loadedSessionData, setLoadedSessionData] =
    useState<LoadedSessionData | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );

  const feedbackToUse = dynamicFeedback || detailedFeedback;

  // Auto-load session detail when navigated from History tab with ?session= param
  const sessionParamHandled = useRef(false);
  useEffect(() => {
    if (sessionParamHandled.current) return;
    const sessionParam = searchParams.get("session");
    if (sessionParam) {
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
            pronunciationScore: c.pronunciationScore ?? undefined,
            fluencyScore: c.fluencyScore ?? undefined,
            wordAssessments: c.wordAssessments ?? undefined,
          })),
        });

        setDynamicFeedback(
          buildDetailedFeedbackData({
            scores: sessionData.scores,
            errorCategories: sessionData.errorCategories,
            conversation: sessionData.conversation,
            feedbackRating: sessionData.session.feedbackRating || "N/A",
            feedbackTip: sessionData.session.feedbackTip || "Great effort!",
          })
        );
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
              pronunciationScore: c.pronunciationScore ?? undefined,
              fluencyScore: c.fluencyScore ?? undefined,
              wordAssessments: c.wordAssessments ?? undefined,
            })),
          });

          setDynamicFeedback(
            buildDetailedFeedbackData({
              scores: sessionData.scores,
              errorCategories: sessionData.errorCategories,
              conversation: sessionData.conversation,
              feedbackRating: sessionData.session.feedbackRating || "N/A",
              feedbackTip: sessionData.session.feedbackTip || "Great effort!",
            })
          );
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

  const handleViewDetailedFeedback = useCallback(() => {
    if (!analysisResult) {
      toast.error("No analysis data available");
      return;
    }

    setDynamicFeedback(
      buildDetailedFeedbackData({
        scores: analysisResult.scores,
        errorCategories: analysisResult.errorCategories,
        conversation: analysisResult.conversation,
        feedbackRating: analysisResult.sessionAnalysis.feedbackRating,
        feedbackTip: analysisResult.sessionAnalysis.feedbackTip,
      })
    );
    setViewState("detail");
  }, [analysisResult, setViewState]);

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
  }, [user?.id, scenarioId, setViewState]);

  const resetFeedbackState = useCallback(() => {
    setAnalysisResult(null);
    setDynamicFeedback(null);
    setLoadedSessionData(null);
    setSelectedRecordId(null);
  }, []);

  return {
    selectedRecordId,
    setSelectedRecordId,
    isLoadingFeedback,
    isLoadingRecords,
    dynamicRecords,
    dynamicFeedback,
    setDynamicFeedback,
    loadedSessionData,
    setLoadedSessionData,
    analysisResult,
    setAnalysisResult,
    feedbackToUse,
    handleSelectRecord,
    handleViewDetailedFeedback,
    loadLearningRecords,
    resetFeedbackState,
  };
}
