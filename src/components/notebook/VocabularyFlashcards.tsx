"use client"

import {
  BookOpen, FileText, Zap, Volume2, Star, Check, X, Undo2, Shuffle, Mic, Square,
  ChevronLeft, ChevronRight, ArrowLeft, Brain,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { NotebookItem } from "@/hooks/notebook/types"
import { speakText } from "@/hooks/notebook/types"

// ─── Flashcard View ────────────────────────────────

interface VocabularyFlashcardsProps {
  currentItem: NotebookItem | undefined
  currentCardIndex: number
  setCurrentCardIndex: (index: number) => void
  isFlipped: boolean
  setIsFlipped: (flipped: boolean) => void
  cardAnimation: "" | "swipe-left" | "swipe-right"
  flashcardItems: NotebookItem[]
  learnedCards: Set<string>
  notLearnedCards: Set<string>
  starredItems: Set<string>
  setStarredItems: React.Dispatch<React.SetStateAction<Set<string>>>
  setVocabularyItems: React.Dispatch<React.SetStateAction<NotebookItem[]>>
  onSwipe: (direction: "left" | "right") => void
  onShadowingOpen: () => void
  onGoToList: () => void
}

export function VocabularyFlashcards({
  currentItem, currentCardIndex, setCurrentCardIndex,
  isFlipped, setIsFlipped, cardAnimation,
  flashcardItems, learnedCards, notLearnedCards,
  starredItems, setStarredItems, setVocabularyItems,
  onSwipe, onShadowingOpen, onGoToList,
}: VocabularyFlashcardsProps) {
  if (!currentItem) {
    return (
      <Card className="p-12 text-center rounded-2xl border-2 border-primary-100 bg-white">
        <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">No cards to practice</h3>
        <p className="text-gray-500 mb-6">Add some words or select items from the list view.</p>
        <Button onClick={onGoToList} className="gap-2"><ArrowLeft className="h-4 w-4" /> Go to List</Button>
      </Card>
    )
  }

  const toggleStar = (e: React.MouseEvent) => {
    e.stopPropagation()
    setStarredItems(p => { const s = new Set(p); s.has(currentItem.id) ? s.delete(currentItem.id) : s.add(currentItem.id); return s })
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Flashcard with Stats on sides */}
      <div className="flex items-center gap-6 mb-8">
        {/* Learning stat - Left side */}
        <div className="flex items-center justify-center px-6 py-3 rounded-r-full bg-warning-50 border-2 border-warning-200">
          <span className="text-2xl font-bold text-warning-700">{notLearnedCards.size}</span>
        </div>

        {/* Flashcard in center */}
        <div className="flex-1 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)} style={{ perspective: "1000px" }}>
          <div
            className={`relative w-full h-[480px] transition-transform duration-500 ${cardAnimation}`}
            style={{ transformStyle: "preserve-3d", transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
          >
            {/* Front of Card */}
            <Card className="absolute inset-0 p-8 border-2 border-gray-100 shadow-xl bg-white" style={{ backfaceVisibility: "hidden" }}>
              {cardAnimation === "swipe-left" && (
                <div className="absolute inset-0 bg-orange-100/60 flex items-center justify-center rounded-lg z-10 transition-all duration-300 animate-in fade-in">
                  <X className="h-40 w-40 text-orange-500 stroke-[4] animate-in zoom-in duration-300" />
                </div>
              )}
              {cardAnimation === "swipe-right" && (
                <div className="absolute inset-0 bg-green-100/60 flex items-center justify-center rounded-lg z-10 transition-all duration-300 animate-in fade-in">
                  <Check className="h-40 w-40 text-green-500 stroke-[4] animate-in zoom-in duration-300" />
                </div>
              )}

              <div className="absolute top-8 left-8 flex items-center gap-2">
                <Badge className="text-sm px-3 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-100 border-0">{currentItem.partOfSpeech}</Badge>
                <Badge className="text-sm px-3 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-100 border-0">{currentItem.level}</Badge>
              </div>

              <Button size="sm" variant="ghost" className="absolute top-8 right-8 h-10 w-10 rounded-full p-0 hover:bg-yellow-50" onClick={toggleStar}>
                <Star className={`h-5 w-5 ${starredItems.has(currentItem.id) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`} />
              </Button>

              <div className="flex items-center justify-center h-full">
                <h2 className="text-5xl font-bold text-gray-900">{currentItem.word}</h2>
              </div>
            </Card>

            {/* Back of Card */}
            <Card className="absolute inset-0 p-6 overflow-hidden flex flex-col border-2 border-gray-100 shadow-xl bg-white" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-xl font-bold text-gray-900">{currentItem.word}</h2>
                  <Button size="sm" variant="ghost" className="h-8 w-8 rounded-full p-0 hover:bg-yellow-50" onClick={toggleStar}>
                    <Star className={`h-4 w-4 ${starredItems.has(currentItem.id) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`} />
                  </Button>
                </div>

                <p className="text-sm text-gray-500 mb-3">{currentItem.pronunciation}</p>

                <div className="flex-1 space-y-2.5 overflow-y-auto">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="bg-primary-50 rounded-lg p-2.5">
                      <h3 className="text-xs font-bold uppercase text-primary-700 mb-1.5 flex items-center gap-1.5">
                        <BookOpen className="h-3.5 w-3.5" /> Meaning
                      </h3>
                      <div className="space-y-1">
                        {currentItem.meaning.map((m, idx) => (
                          <div key={idx} className="flex gap-1.5">
                            <div className="h-4 w-4 rounded-full bg-primary-200 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-primary-700">{idx + 1}</div>
                            <p className="text-sm leading-snug text-gray-700">{m}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-success-50 rounded-lg p-2.5">
                      <h3 className="text-xs font-bold uppercase text-success-700 mb-1.5 flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5" /> Vietnamese
                      </h3>
                      <div className="space-y-1">
                        {currentItem.vietnamese.map((v, idx) => (
                          <div key={idx} className="flex gap-1.5">
                            <div className="h-4 w-4 rounded-full bg-success-200 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-success-700">{idx + 1}</div>
                            <p className="text-sm leading-snug text-gray-700">{v}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary-50 rounded-lg p-2.5">
                    <h3 className="text-xs font-bold uppercase text-primary-700 mb-1.5 flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5" /> Examples
                    </h3>
                    <div className="space-y-1.5">
                      {currentItem.examples.map((ex, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-2 space-y-0.5 border border-gray-100">
                          <p className="text-sm italic text-gray-800">&quot;{ex.en}&quot;</p>
                          <p className="text-sm text-gray-500">&quot;{ex.vi}&quot;</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-gray-100">
                  <Button onClick={(e) => { e.stopPropagation(); onShadowingOpen() }} variant="outline" className="gap-2 bg-transparent w-full h-10 rounded-xl border-2">
                    <Mic className="h-4 w-4" /> Shadowing Practice
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Mastered stat - Right side */}
        <div className="flex items-center justify-center px-6 py-3 rounded-l-full bg-success-50 border-2 border-success-200">
          <span className="text-2xl font-bold text-success-700">{learnedCards.size}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <Button variant="outline" onClick={() => onSwipe("left")}
          className="gap-2 h-12 px-8 rounded-full border-2 border-amber-400 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:border-amber-500 shadow-[0_2px_8px_rgba(251,191,36,0.25)] hover:shadow-[0_4px_12px_rgba(251,191,36,0.35)] cursor-pointer transition-all font-semibold">
          <X className="h-5 w-5" /> Still Learning
        </Button>
        <Button onClick={() => onSwipe("right")}
          className="gap-2 h-12 px-8 rounded-full border-2 border-emerald-500 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-600 shadow-[0_2px_8px_rgba(16,185,129,0.25)] hover:shadow-[0_4px_12px_rgba(16,185,129,0.35)] cursor-pointer transition-all font-semibold">
          <Check className="h-5 w-5" /> Got it!
        </Button>
      </div>

      {/* Navigation row */}
      <div className="flex items-center gap-6">
        <div className="px-6 py-3 invisible"><span className="text-2xl font-bold">0</span></div>
        <div className="flex-1 flex justify-between items-center">
          <Button variant="ghost" className="h-10 rounded-full hover:bg-gray-100 cursor-pointer gap-2 px-4"
            onClick={() => { if (currentCardIndex > 0) { setCurrentCardIndex(currentCardIndex - 1); setIsFlipped(false) } }}
            disabled={currentCardIndex === 0}>
            <Undo2 className="h-5 w-5 text-gray-500" /><span className="text-gray-500">Back</span>
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">{currentCardIndex + 1}</span>
            <span className="text-gray-400">/</span>
            <span className="text-xl text-gray-500">{flashcardItems.length}</span>
          </div>
          <Button variant="ghost" className="h-10 rounded-full hover:bg-gray-100 cursor-pointer gap-2 px-4"
            onClick={() => { setVocabularyItems(p => [...p].sort(() => Math.random() - 0.5)); setCurrentCardIndex(0); setIsFlipped(false) }}>
            <Shuffle className="h-5 w-5 text-gray-500" /><span className="text-gray-500">Shuffle</span>
          </Button>
        </div>
        <div className="px-6 py-3 invisible"><span className="text-2xl font-bold">0</span></div>
      </div>
    </div>
  )
}
