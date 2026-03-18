"use client";

import { useState, useEffect } from "react";
import { searchVocabTopics } from "@/actions/vocab";
import type { VocabTopic } from "./types";

// ─── Params ────────────────────────────────────────

interface UseSearchParams {
  userId: string;
}

// ─── Hook ──────────────────────────────────────────

export function useSearch({ userId }: UseSearchParams) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<VocabTopic[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const isSearchMode = searchQuery.trim().length > 0;

  // Debounced search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(() => {
      setIsSearching(true);
      searchVocabTopics(searchQuery, userId || undefined)
        .then(setSearchResults)
        .finally(() => setIsSearching(false));
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, userId]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    isSearchMode,
  };
}
