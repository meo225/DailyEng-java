import React from "react"
import { BookOpen, FileText } from "lucide-react"

// ─── Mastery ───────────────────────────────────────

export type MasteryLevel = "new" | "learning" | "familiar" | "confident" | "mastered"
export type CollectionType = "vocabulary" | "grammar"
export type ViewMode = "list" | "flashcards" | "statistics"

export const MASTERY_LEVELS = [
  { value: "new", label: "New", color: "bg-red-500", textColor: "text-red-700", bgLight: "bg-red-50" },
  { value: "learning", label: "Learning", color: "bg-orange-500", textColor: "text-orange-700", bgLight: "bg-orange-50" },
  { value: "familiar", label: "Familiar", color: "bg-yellow-500", textColor: "text-yellow-700", bgLight: "bg-yellow-50" },
  { value: "confident", label: "Confident", color: "bg-lime-500", textColor: "text-lime-700", bgLight: "bg-lime-50" },
  { value: "mastered", label: "Mastered", color: "bg-green-500", textColor: "text-green-700", bgLight: "bg-green-50" },
] as const

// ─── Data Models ───────────────────────────────────

export interface NotebookItem {
  id: string; word: string; pronunciation: string; meaning: string[]; vietnamese: string[]
  examples: { en: string; vi: string }[]; partOfSpeech: string; level: string
  note?: string; tags: string[]; collectionId: string; masteryLevel: number
  lastReviewed?: string; nextReview?: string
}

export interface GrammarItem {
  id: string; title: string; rule: string; explanation: string
  examples: { en: string; vi: string }[]; level: string; category: string
  collectionId: string; masteryLevel: number; lastReviewed?: string
}

export interface CollectionData {
  id: string; name: string; count: number; mastered: number; color: string; type: CollectionType
}

export interface CollectionWithIcon extends CollectionData {
  icon: React.ReactNode
}

// ─── Props ─────────────────────────────────────────

export interface NotebookPageClientProps {
  collections: CollectionData[]
  vocabularyItems: NotebookItem[]
  grammarItems: GrammarItem[]
  dueCount: number
}

// ─── Helpers ───────────────────────────────────────

export function getCollectionIcon(type: CollectionType): React.ReactNode {
  return type === "vocabulary"
    ? React.createElement(BookOpen, { className: "h-5 w-5" })
    : React.createElement(FileText, { className: "h-5 w-5" })
}

export function getMasteryCategory(masteryLevel: number): MasteryLevel {
  if (masteryLevel < 20) return "new"
  if (masteryLevel < 40) return "learning"
  if (masteryLevel < 60) return "familiar"
  if (masteryLevel < 80) return "confident"
  return "mastered"
}

export function getMasteryConfig(masteryLevel: number) {
  return MASTERY_LEVELS.find(m => m.value === getMasteryCategory(masteryLevel)) || MASTERY_LEVELS[0]
}

export function speakText(text: string) {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "en-US"
    utterance.rate = 0.9
    window.speechSynthesis.speak(utterance)
  }
}
