"use client";

import { useState } from "react";
import { useTopicsFilter } from "./vocab/useTopicsFilter";
import { useBookmarks } from "./vocab/useBookmarks";
import { useSearch } from "./vocab/useSearch";
import { useDictionary } from "./vocab/useDictionary";
import type { TabType } from "./vocab/types";

// Re-export types for downstream consumers
export type { VocabTopic, DictionaryWord, TabType } from "./vocab/types";
export { VOCAB_TABS } from "./vocab/types";

// ─── Params ────────────────────────────────────────

interface UseVocabPageParams {
  userId: string;
}

// ─── Composer Hook ─────────────────────────────────

export function useVocabPage({ userId }: UseVocabPageParams) {
  const [activeTab, setActiveTab] = useState<TabType>("topics");

  const filter = useTopicsFilter({ userId });
  const bookmarks = useBookmarks({ topics: filter.topics });
  const search = useSearch({ userId });
  const dictionary = useDictionary();

  return {
    activeTab,
    setActiveTab,
    filter,
    bookmarks,
    search,
    dictionary,
  };
}
