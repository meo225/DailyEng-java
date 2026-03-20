"use client"

import { useState, useEffect, useMemo, useTransition } from "react"
import { createNotebook, deleteNotebook, createNotebookItem, deleteNotebookItem } from "@/actions/notebook"
import type {
  NotebookItem, GrammarItem, CollectionData, CollectionWithIcon, CollectionType,
} from "./types"
import { getCollectionIcon } from "./types"

// ─── Hook ──────────────────────────────────────────

interface UseNotebookDataParams {
  collectionsData: CollectionData[]
  initialVocab: NotebookItem[]
  initialGrammar: GrammarItem[]
}

export function useNotebookData({
  collectionsData,
  initialVocab,
  initialGrammar,
}: UseNotebookDataParams) {
  // ── Data state ──
  const [vocabularyItems, setVocabularyItems] = useState<NotebookItem[]>(initialVocab)
  const [grammarItems, setGrammarItems] = useState<GrammarItem[]>(initialGrammar)
  const [collections, setCollections] = useState<CollectionWithIcon[]>(
    collectionsData.map(c => ({ ...c, icon: getCollectionIcon(c.type) }))
  )

  const [isPending, startTransition] = useTransition()

  // ── Update collection counts when items change ──
  useEffect(() => {
    setCollections(prev => prev.map(c => {
      if (c.type === "vocabulary") {
        const items = vocabularyItems.filter(i => i.collectionId === c.id)
        return { ...c, count: items.length, mastered: items.filter(i => i.masteryLevel >= 80).length }
      }
      const items = grammarItems.filter(i => i.collectionId === c.id)
      return { ...c, count: items.length, mastered: items.filter(i => i.masteryLevel >= 80).length }
    }))
  }, [vocabularyItems, grammarItems])

  // ── Due count ──
  const dueCount = useMemo(() => {
    const now = new Date()
    return vocabularyItems.filter(item => item.nextReview && new Date(item.nextReview) <= now).length
  }, [vocabularyItems])

  // ── Stats ──
  const getStats = (collectionType: CollectionType, selectedCollection: string) => {
    const items = collectionType === "vocabulary"
      ? vocabularyItems.filter(i => i.collectionId === selectedCollection)
      : grammarItems.filter(i => i.collectionId === selectedCollection)
    const total = items.length
    const mastered = items.filter(i => i.masteryLevel >= 80).length
    const learning = items.filter(i => i.masteryLevel >= 20 && i.masteryLevel < 80).length
    const newItems = items.filter(i => i.masteryLevel < 20).length
    const avgMastery = total > 0 ? Math.round(items.reduce((sum, i) => sum + i.masteryLevel, 0) / total) : 0
    return { total, mastered, learning, newItems, avgMastery }
  }

  // ── CRUD Handlers ──

  const handleAddCollection = async (
    name: string,
    type: CollectionType,
    onSuccess: () => void,
  ) => {
    if (!name.trim()) return

    startTransition(async () => {
      const result = await createNotebook({ name, type, color: "primary" })

      if (result.success && result.notebook) {
        setCollections(prev => [...prev, {
          ...result.notebook!,
          type: result.notebook!.type as CollectionType,
          icon: getCollectionIcon(result.notebook!.type as CollectionType),
        }])
      } else {
        const newId = `${type}-${Date.now()}`
        setCollections(prev => [...prev, {
          id: newId, name, count: 0, mastered: 0, color: "primary",
          type, icon: getCollectionIcon(type),
        }])
      }
      onSuccess()
    })
  }

  const handleAddItem = async (
    selectedCollection: string,
    newItem: {
      word: string; pronunciation: string; meaning: string; vietnamese: string
      example: string; exampleVi: string; partOfSpeech: string; level: string
      note: string; tags: string
    },
    onSuccess: () => void,
  ) => {
    if (!newItem.word.trim()) return

    const meaningArr = newItem.meaning.split("\n").filter(Boolean)
    const vietnameseArr = newItem.vietnamese.split("\n").filter(Boolean)
    const examplesArr = newItem.example ? [{ en: newItem.example, vi: newItem.exampleVi }] : []
    const tagsArr = newItem.tags.split(",").map(t => t.trim()).filter(Boolean)

    startTransition(async () => {
      const result = await createNotebookItem({
        notebookId: selectedCollection,
        word: newItem.word,
        pronunciation: newItem.pronunciation || "/.../",
        meaning: meaningArr,
        vietnamese: vietnameseArr,
        examples: examplesArr,
        partOfSpeech: newItem.partOfSpeech,
        level: newItem.level,
        note: newItem.note || undefined,
        tags: tagsArr,
      })

      if (result.success && result.item) {
        const item: NotebookItem = {
          id: result.item.id,
          word: result.item.word,
          pronunciation: result.item.pronunciation || "/.../",
          meaning: result.item.meaning,
          vietnamese: result.item.vietnamese,
          examples: result.item.examples,
          partOfSpeech: result.item.partOfSpeech || "noun",
          level: result.item.level || "A2",
          note: result.item.note || undefined,
          tags: result.item.tags,
          collectionId: result.item.notebookId,
          masteryLevel: result.item.masteryLevel,
          nextReview: result.item.nextReview || undefined,
        }
        setVocabularyItems(prev => [...prev, item])
      } else {
        const item: NotebookItem = {
          id: `v${Date.now()}`, word: newItem.word, pronunciation: newItem.pronunciation || "/.../",
          meaning: meaningArr, vietnamese: vietnameseArr, examples: examplesArr,
          partOfSpeech: newItem.partOfSpeech, level: newItem.level, note: newItem.note,
          tags: tagsArr, collectionId: selectedCollection, masteryLevel: 0,
          nextReview: new Date().toISOString(),
        }
        setVocabularyItems(prev => [...prev, item])
      }
      onSuccess()
    })
  }

  const handleAddGrammar = (
    selectedCollection: string,
    newGrammar: {
      title: string; rule: string; explanation: string; category: string
      level: string; exampleEn: string; exampleVi: string
    },
    onSuccess: () => void,
  ) => {
    if (!newGrammar.title.trim()) return
    const item: GrammarItem = {
      id: `g${Date.now()}`, title: newGrammar.title, rule: newGrammar.rule,
      explanation: newGrammar.explanation, category: newGrammar.category, level: newGrammar.level,
      examples: newGrammar.exampleEn ? [{ en: newGrammar.exampleEn, vi: newGrammar.exampleVi }] : [],
      collectionId: selectedCollection, masteryLevel: 0,
    }
    setGrammarItems(prev => [...prev, item])
    onSuccess()
  }

  const handleEditItem = (editingItem: NotebookItem | null, onSuccess: () => void) => {
    if (!editingItem) return
    setVocabularyItems(prev => prev.map(item => item.id === editingItem.id ? editingItem : item))
    onSuccess()
  }

  const handleDeleteItem = async (itemId: string | null, onSuccess: () => void) => {
    if (!itemId) return

    startTransition(async () => {
      await deleteNotebookItem(itemId)
      setVocabularyItems(prev => prev.filter(item => item.id !== itemId))
      setGrammarItems(prev => prev.filter(item => item.id !== itemId))
      onSuccess()
    })
  }

  const handleDeleteNotebook = async (notebookId: string | null, onSuccess: () => void) => {
    if (!notebookId) return

    startTransition(async () => {
      await deleteNotebook(notebookId)
      setVocabularyItems(prev => prev.filter(item => item.collectionId !== notebookId))
      setGrammarItems(prev => prev.filter(item => item.collectionId !== notebookId))
      setCollections(prev => prev.filter(c => c.id !== notebookId))
      onSuccess()
    })
  }

  return {
    vocabularyItems,
    setVocabularyItems,
    grammarItems,
    setGrammarItems,
    collections,
    isPending,
    dueCount,
    getStats,
    handleAddCollection,
    handleAddItem,
    handleAddGrammar,
    handleEditItem,
    handleDeleteItem,
    handleDeleteNotebook,
  }
}
