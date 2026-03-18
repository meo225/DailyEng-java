"use client";

import { useState, useMemo } from "react";
import { MOCK_DICTIONARY_WORDS, DICT_ITEMS_PER_PAGE } from "./types";

// ─── Hook ──────────────────────────────────────────

export function useDictionary() {
  const [dictionarySearch, setDictionarySearch] = useState("");
  const [selectedAlphabet, setSelectedAlphabet] = useState<string | null>(null);
  const [selectedDictLevels, setSelectedDictLevels] = useState<string[]>([]);
  const [dictPage, setDictPage] = useState(1);

  const filteredDictionaryWords = useMemo(() => {
    const lowerSearch = dictionarySearch.toLowerCase();
    return MOCK_DICTIONARY_WORDS.filter((word) => {
      const matchesSearch =
        word.word.toLowerCase().includes(lowerSearch) ||
        word.meaning.toLowerCase().includes(lowerSearch);
      const matchesAlphabet =
        !selectedAlphabet || word.word.toUpperCase().startsWith(selectedAlphabet);
      const matchesLevel =
        selectedDictLevels.length === 0 ||
        selectedDictLevels.includes(word.level);
      return matchesSearch && matchesAlphabet && matchesLevel;
    });
  }, [dictionarySearch, selectedAlphabet, selectedDictLevels]);

  const dictTotalPages = Math.ceil(
    filteredDictionaryWords.length / DICT_ITEMS_PER_PAGE
  );

  const paginatedWords = useMemo(
    () =>
      filteredDictionaryWords.slice(
        (dictPage - 1) * DICT_ITEMS_PER_PAGE,
        dictPage * DICT_ITEMS_PER_PAGE
      ),
    [filteredDictionaryWords, dictPage]
  );

  const toggleDictLevel = (level: string) => {
    setSelectedDictLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
    setDictPage(1);
  };

  const clearDictLevels = () => {
    setSelectedDictLevels([]);
    setDictPage(1);
  };

  return {
    dictionarySearch,
    setDictionarySearch,
    selectedAlphabet,
    setSelectedAlphabet,
    selectedDictLevels,
    dictPage,
    setDictPage,
    filteredDictionaryWords,
    paginatedWords,
    dictTotalPages,
    toggleDictLevel,
    clearDictLevels,
  };
}
