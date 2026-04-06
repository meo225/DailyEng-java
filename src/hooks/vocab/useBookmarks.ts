"use client";

import { useState, useEffect, useMemo } from "react";
import type { VocabTopic } from "./types";

// ─── Params ────────────────────────────────────────

interface UseBookmarksParams {
  topics: VocabTopic[];
}

// ─── Hook ──────────────────────────────────────────

const STORAGE_KEY = "vocab-bookmarks";

export function useBookmarks({ topics }: UseBookmarksParams) {
  const [bookmarkedTopics, setBookmarkedTopics] = useState<string[]>([]);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setBookmarkedTopics(JSON.parse(saved));
    }
  }, []);

  const handleBookmarkToggle = (topicId: string) => {
    setBookmarkedTopics((prev) => {
      const updated = prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const bookmarkedTopicsList = useMemo(() => {
    const bookmarkSet = new Set(bookmarkedTopics);
    return topics.filter((topic) => bookmarkSet.has(topic.id));
  }, [topics, bookmarkedTopics]);

  return {
    bookmarkedTopics,
    bookmarkedTopicsList,
    handleBookmarkToggle,
  };
}
