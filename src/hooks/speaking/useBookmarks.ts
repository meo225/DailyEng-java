"use client";
import { useState, useEffect, useTransition } from "react";
import {
  toggleSpeakingBookmark,
  getSpeakingBookmarks,
} from "@/actions/bookmark";
import { type Scenario, mapDbScenarioToScenario } from "./types";

// ─── Constants ─────────────────────────────────────

const BOOKMARKS_PER_PAGE = 8;

// ─── Hook ──────────────────────────────────────────

interface UseBookmarksParams {
  userId: string | undefined;
  activeTab: string;
  initialBookmarkIds: string[];
}

export function useBookmarks({
  userId,
  activeTab,
  initialBookmarkIds,
}: UseBookmarksParams) {
  const [isPending, startTransition] = useTransition();

  const [bookmarkedTopics, setBookmarkedTopics] =
    useState<string[]>(initialBookmarkIds);
  const [bookmarkedTopicsList, setBookmarkedTopicsList] = useState<Scenario[]>(
    []
  );
  const [bookmarkPage, setBookmarkPage] = useState(1);
  const [bookmarkTotalPages, setBookmarkTotalPages] = useState(1);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  // ── Fetch bookmarks list when tab is active ──
  useEffect(() => {
    if (userId && activeTab === "bookmarks") {
      setBookmarkLoading(true);
      getSpeakingBookmarks(userId, bookmarkPage, BOOKMARKS_PER_PAGE)
        .then((result) => {
          setBookmarkedTopicsList(
            result.bookmarks.map(mapDbScenarioToScenario)
          );
          setBookmarkTotalPages(result.totalPages);
        })
        .finally(() => setBookmarkLoading(false));
    }
  }, [userId, activeTab, bookmarkPage]);

  // ── Toggle bookmark ──
  const handleBookmarkToggle = (topicId: string) => {
    if (!userId) return;

    const wasBookmarked = bookmarkedTopics.includes(topicId);

    // Optimistic update
    setBookmarkedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );

    if (wasBookmarked && activeTab === "bookmarks") {
      setBookmarkedTopicsList((prev) =>
        prev.filter((topic) => topic.id !== topicId)
      );
    }

    startTransition(async () => {
      await toggleSpeakingBookmark(userId, topicId);
      if (activeTab === "bookmarks") {
        const result = await getSpeakingBookmarks(
          userId,
          bookmarkPage,
          BOOKMARKS_PER_PAGE
        );
        setBookmarkedTopicsList(result.bookmarks.map(mapDbScenarioToScenario));
        setBookmarkTotalPages(result.totalPages);
      }
    });
  };

  /** Called by the initial fetch to seed bookmark IDs from server */
  const setBookmarkIds = (ids: string[]) => setBookmarkedTopics(ids);

  return {
    bookmarkedTopics,
    handleBookmarkToggle,
    bookmarkedTopicsList,
    bookmarkLoading,
    bookmarkPage,
    setBookmarkPage,
    bookmarkTotalPages,
    setBookmarkIds,
  };
}
