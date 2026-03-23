"use client"

import { useState, useEffect } from "react"
import FlashcardReviewClient from "@/components/page/FlashcardReviewClient"
import type { NotebookItem } from "@/components/page/NotebookPageClient"
import { getNotebooks, getNotebookItems, type NotebookItemData } from "@/actions/notebook"

function mapToNotebookItem(item: NotebookItemData): NotebookItem {
  return {
    id: item.id,
    word: item.word,
    pronunciation: item.pronunciation || "",
    meaning: item.meaning,
    vietnamese: item.vietnamese,
    examples: item.examples,
    partOfSpeech: item.partOfSpeech || "unknown",
    level: item.level || "",
    note: item.note || undefined,
    tags: item.tags,
    collectionId: item.notebookId,
    masteryLevel: item.masteryLevel,
    lastReviewed: item.lastReviewed || undefined,
  }
}

export default function FlashcardReviewPage() {
  const [items, setItems] = useState<NotebookItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchItems() {
      try {
        const notebooks = await getNotebooks()
        const allItems: NotebookItem[] = []

        for (const nb of notebooks) {
          if (nb.type === "vocabulary") {
            const nbItems = await getNotebookItems(nb.id)
            allItems.push(...nbItems.map(mapToNotebookItem))
          }
        }

        setItems(allItems)
      } catch (err) {
        console.error("Failed to load flashcard items:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchItems()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-xl font-semibold text-gray-600">No vocabulary items yet</p>
        <p className="text-gray-500">Add words to your notebook to start reviewing with flashcards.</p>
      </div>
    )
  }

  return <FlashcardReviewClient notebookItems={items} />
}

