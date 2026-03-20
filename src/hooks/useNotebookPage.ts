"use client"

import { useMemo } from "react"
import { useNotebookData } from "./notebook/useNotebookData"
import { useNotebookUI } from "./notebook/useNotebookUI"
import { useFlashcards } from "./notebook/useFlashcards"
import type { CollectionData, NotebookItem, GrammarItem } from "./notebook/types"

// Re-export types for downstream consumers
export type {
  MasteryLevel, CollectionType, ViewMode,
  NotebookItem, GrammarItem, CollectionData, CollectionWithIcon,
  NotebookPageClientProps,
} from "./notebook/types"
export { MASTERY_LEVELS, getMasteryCategory, getMasteryConfig, speakText, getCollectionIcon } from "./notebook/types"

// ─── Composer Hook ─────────────────────────────────

interface UseNotebookPageParams {
  collectionsData: CollectionData[]
  initialVocab: NotebookItem[]
  initialGrammar: GrammarItem[]
}

export function useNotebookPage({
  collectionsData,
  initialVocab,
  initialGrammar,
}: UseNotebookPageParams) {
  const data = useNotebookData({ collectionsData, initialVocab, initialGrammar })

  const ui = useNotebookUI({
    collections: data.collections,
    vocabularyItems: data.vocabularyItems,
    grammarItems: data.grammarItems,
  })

  const flashcards = useFlashcards({
    currentCollectionType: ui.currentCollectionType,
    filteredVocabItems: ui.filteredVocabItems,
    filteredGrammarItems: ui.filteredGrammarItems,
    selectedItems: ui.selectedItems,
    vocabularyItems: data.vocabularyItems,
    setVocabularyItems: data.setVocabularyItems,
    setGrammarItems: data.setGrammarItems,
    sessionCompleteOpen: ui.sessionCompleteOpen,
    setSessionCompleteOpen: ui.setSessionCompleteOpen,
    setIsReviewModalOpen: ui.setIsReviewModalOpen,
    setSelectedItems: ui.setSelectedItems,
  })

  const stats = useMemo(
    () => data.getStats(ui.currentCollectionType, ui.selectedCollection),
    [data.getStats, ui.currentCollectionType, ui.selectedCollection]
  )

  const startPractice = () => {
    flashcards.resetSession()
    ui.setViewMode("flashcards")
  }

  return {
    ...data,
    ...ui,
    ...flashcards,
    stats,
    startPractice,
  }
}
