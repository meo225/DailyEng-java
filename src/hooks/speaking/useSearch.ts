"use client";
import { useState, useEffect } from "react";
import { searchSpeakingScenarios } from "@/actions/speaking";
import type { Scenario } from "./types";

// ─── Hook ──────────────────────────────────────────

interface UseSearchParams {
  userId: string | undefined;
}

export function useSearch({ userId }: UseSearchParams) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Scenario[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const isSearchMode = searchQuery.trim().length > 0;

  // ── Debounced search ──
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(() => {
      setSearchLoading(true);
      searchSpeakingScenarios(searchQuery, userId)
        .then((results) => setSearchResults(results as Scenario[]))
        .finally(() => setSearchLoading(false));
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, userId]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    searchLoading,
    isSearchMode,
  };
}
