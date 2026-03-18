"use client";
import { useState, useEffect, useRef } from "react";
import {
  getSpeakingHistorySessions,
  getSpeakingHistoryStats,
} from "@/actions/speaking";
import type { HistorySession, HistoryStats } from "./types";

// ─── Hook ──────────────────────────────────────────

interface UseHistoryParams {
  userId: string | undefined;
  activeTab: string;
}

export function useHistory({ userId, activeTab }: UseHistoryParams) {
  const [historySessions, setHistorySessions] = useState<HistorySession[]>([]);
  const [historyStats, setHistoryStats] = useState<HistoryStats | null>(null);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyStatsLoading, setHistoryStatsLoading] = useState(false);
  const [historyTotalPages, setHistoryTotalPages] = useState(1);
  const [historyPage, setHistoryPage] = useState(1);
  const [historyRatingFilter, setHistoryRatingFilter] = useState<string | null>(
    null
  );
  const historyFetched = useRef(false);

  // ── Lazy-load history stats (once) ──
  useEffect(() => {
    if (!userId || activeTab !== "history" || historyFetched.current) return;

    historyFetched.current = true;
    setHistoryStatsLoading(true);
    getSpeakingHistoryStats(userId)
      .then((stats) => setHistoryStats(stats))
      .finally(() => setHistoryStatsLoading(false));
  }, [userId, activeTab]);

  // ── Fetch history sessions ──
  useEffect(() => {
    if (!userId || activeTab !== "history") return;

    setHistoryLoading(true);
    getSpeakingHistorySessions(userId, {
      page: historyPage,
      limit: 10,
      rating: historyRatingFilter || undefined,
    })
      .then((result) => {
        setHistorySessions(
          result.sessions.map((s) => ({
            ...s,
            createdAt: new Date(s.createdAt),
          }))
        );
        setHistoryTotalPages(result.totalPages);
      })
      .finally(() => setHistoryLoading(false));
  }, [userId, activeTab, historyPage, historyRatingFilter]);

  return {
    historySessions,
    historyStats,
    historyLoading,
    historyStatsLoading,
    historyTotalPages,
    historyPage,
    setHistoryPage,
    historyRatingFilter,
    setHistoryRatingFilter,
  };
}
