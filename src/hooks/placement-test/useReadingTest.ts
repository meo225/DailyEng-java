"use client"

import { useState, useRef, type RefObject } from "react"
import type { ReadingPassage } from "./types"

// ─── Hook ──────────────────────────────────────────

interface UseReadingTestParams {
  readingPassage: ReadingPassage
}

export interface ReadingHighlight {
  start: number
  end: number
  color: "green" | "red"
  type: "user" | "hint"
}

export function useReadingTest({ readingPassage }: UseReadingTestParams) {
  const [readingHighlights, setReadingHighlights] = useState<ReadingHighlight[]>([])
  const [isHighlightMode, setIsHighlightMode] = useState(false)
  const [readingHints, setReadingHints] = useState<Record<number, boolean>>({})
  const [showReadingHint, setShowReadingHint] = useState(false)
  const [currentReadingQuestion, setCurrentReadingQuestion] = useState(0)
  const [readingAnswers, setReadingAnswers] = useState<Record<number, number>>({})
  const [checkedReadingQuestions, setCheckedReadingQuestions] = useState<Set<number>>(new Set())
  const passageRef = useRef<HTMLDivElement>(null)

  const resetReadingState = () => {
    setCurrentReadingQuestion(0)
    setReadingAnswers({})
    setCheckedReadingQuestions(new Set())
    setReadingHighlights([])
    setIsHighlightMode(false)
    setShowReadingHint(false)
    setReadingHints({})
  }

  const handleTextSelection = () => {
    if (!isHighlightMode || !passageRef.current) return
    const selection = window.getSelection()
    if (!selection || selection.isCollapsed) return

    const range = selection.getRangeAt(0)
    const preSelectionRange = range.cloneRange()
    preSelectionRange.selectNodeContents(passageRef.current)
    preSelectionRange.setEnd(range.startContainer, range.startOffset)
    const start = preSelectionRange.toString().length
    const end = start + range.toString().length

    setReadingHighlights((prev) => [
      ...prev.filter((h) => h.type === "user" && (h.end <= start || h.start >= end)),
      { start, end, color: "green", type: "user" },
    ])
    selection.removeAllRanges()
  }

  const getHighlightedSegments = () => {
    const content = readingPassage.content
    const segments: { text: string; highlight?: ReadingHighlight }[] = []
    let lastIndex = 0

    const sortedHighlights = [...readingHighlights].sort((a, b) => a.start - b.start)

    sortedHighlights.forEach((highlight) => {
      if (highlight.start > lastIndex) {
        segments.push({ text: content.slice(lastIndex, highlight.start) })
      }
      segments.push({ text: content.slice(highlight.start, highlight.end), highlight })
      lastIndex = highlight.end
    })

    if (lastIndex < content.length) {
      segments.push({ text: content.slice(lastIndex) })
    }

    return segments
  }

  const handleReadingAnswer = (questionIdx: number, answerIdx: number) => {
    setReadingAnswers((prev) => ({ ...prev, [questionIdx]: answerIdx }))
  }

  const toggleReadingHint = (qIdx: number) => {
    setReadingHints((prev) => ({ ...prev, [qIdx]: !prev[qIdx] }))
  }

  return {
    readingHighlights, isHighlightMode, setIsHighlightMode,
    readingHints, readingAnswers, passageRef,
    currentReadingQuestion, setCurrentReadingQuestion,
    resetReadingState,
    handleTextSelection, getHighlightedSegments,
    handleReadingAnswer, toggleReadingHint,
  }
}
