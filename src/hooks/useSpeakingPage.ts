"use client";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useScenariosFilter } from "./speaking/useScenariosFilter";
import { useBookmarks } from "./speaking/useBookmarks";
import { useSearch } from "./speaking/useSearch";
import { useCustomTopics } from "./speaking/useCustomTopics";
import { useHistory } from "./speaking/useHistory";
import type { TabType } from "./speaking/types";

// Re-export types for downstream consumers
export type { Scenario, CriteriaItem, HistorySession, HistoryStats, TabType } from "./speaking/types";

// ─── Constants ─────────────────────────────────────

export const SPEAKING_TABS = [
  { id: "available", label: "Available Topics" },
  { id: "custom", label: "Custom Topics" },
  { id: "bookmarks", label: "Bookmarks" },
  { id: "history", label: "History" },
] as const;

// ─── Composer Hook ─────────────────────────────────

interface UseSpeakingPageParams {
  initialTopicGroups?: import("@/components/hub").TopicGroup[];
  userId: string;
  initialBookmarkIds?: string[];
}

export function useSpeakingPage({
  initialTopicGroups = [],
  userId,
  initialBookmarkIds = [],
}: UseSpeakingPageParams) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const effectiveUserId = userId || user?.id || "";

  const initialTab = (searchParams.get("tab") as TabType) || "available";
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [navigatingToSessionId, setNavigatingToSessionId] = useState<string | null>(null);

  // ── Domain hooks ──
  const bookmarks = useBookmarks({
    userId: user?.id,
    activeTab,
    initialBookmarkIds,
  });

  const search = useSearch({ userId: user?.id });

  const filter = useScenariosFilter({
    initialTopicGroups,
    userId: user?.id,
    activeTab,
    isSearchMode: search.isSearchMode,
    onBookmarkIdsLoaded: bookmarks.setBookmarkIds,
  });

  const customTopics = useCustomTopics({
    userId: user?.id,
    effectiveUserId,
    activeTab,
  });

  const history = useHistory({ userId: user?.id, activeTab });

  // ── Grouped return for explicit ownership ──
  return {
    activeTab,
    setActiveTab,
    router,
    search,
    filter,
    bookmarks,
    customTopics,
    history,
    navigatingToSessionId,
    setNavigatingToSessionId,
  };
}
