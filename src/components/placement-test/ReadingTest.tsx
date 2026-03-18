"use client"

import { Highlighter, Lightbulb } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ReadingPassage } from "@/hooks/placement-test/types"
import type { ReadingHighlight } from "@/hooks/placement-test/useReadingTest"
import type { RefObject } from "react"

interface ReadingTestProps {
  readingPassage: ReadingPassage
  readingAnswers: Record<number, number>
  readingHints: Record<number, boolean>
  readingHighlights: ReadingHighlight[]
  isHighlightMode: boolean
  passageRef: RefObject<HTMLDivElement>
  onHighlightModeToggle: () => void
  onTextSelection: () => void
  onReadingAnswer: (questionIdx: number, answerIdx: number) => void
  onToggleHint: (qIdx: number) => void
  onSubmit: () => void
  getHighlightedSegments: () => { text: string; highlight?: ReadingHighlight }[]
}

export function ReadingTest({
  readingPassage, readingAnswers, readingHints, readingHighlights,
  isHighlightMode, passageRef,
  onHighlightModeToggle, onTextSelection, onReadingAnswer, onToggleHint,
  onSubmit, getHighlightedSegments,
}: ReadingTestProps) {
  const userHighlights = readingHighlights.filter((h) => h.type === "user")
  const segments = getHighlightedSegments()

  return (
    <div className="w-full max-w-7xl mx-auto px-8 py-8">
      <div className="grid lg:grid-cols-5 gap-8 items-start">
        {/* Passage Panel */}
        <Card className="lg:col-span-3 p-8 space-y-4 lg:sticky lg:top-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">{readingPassage.title}</h2>
            <Button variant={isHighlightMode ? "default" : "outline"} size="sm" onClick={onHighlightModeToggle} className="gap-2">
              <Highlighter className="h-4 w-4" /> {isHighlightMode ? "Highlighting" : "Highlight"}
            </Button>
          </div>

          <div
            ref={passageRef}
            onMouseUp={onTextSelection}
            className={cn("prose prose-base max-w-none", isHighlightMode ? "cursor-text select-text" : "select-none")}
          >
            <p className="text-base leading-relaxed text-foreground whitespace-pre-wrap">
              {segments.map((segment, idx) => {
                if (segment.highlight) {
                  return (
                    <mark key={idx} className={cn("px-0.5 rounded",
                      segment.highlight.color === "green" ? "bg-success-200 text-success-900" : "bg-error-200 text-error-900")}>
                      {segment.text}
                    </mark>
                  )
                }
                return <span key={idx}>{segment.text}</span>
              })}
            </p>
          </div>

          {userHighlights.length > 0 && (
            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">{userHighlights.length} highlight(s) saved</p>
            </div>
          )}
        </Card>

        {/* Questions Panel */}
        <Card className="lg:col-span-2 p-6 space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h3 className="font-bold text-lg text-foreground">Questions</h3>
            <span className="text-sm text-muted-foreground">
              {Object.keys(readingAnswers).length} of {readingPassage.questions.length} answered
            </span>
          </div>

          <div className="space-y-8">
            {readingPassage.questions.map((q, qIdx) => (
              <div key={qIdx} className="space-y-3 pb-6 border-b border-border last:border-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {qIdx + 1}
                    </div>
                    <p className="text-sm font-medium text-foreground pt-0.5">{q.question}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => onToggleHint(qIdx)} className="text-xs text-muted-foreground hover:text-primary-600 flex-shrink-0">
                    <Lightbulb className="h-3.5 w-3.5 mr-1" /> Hint
                  </Button>
                </div>

                {readingHints[qIdx] && (
                  <div className="ml-10 p-3 rounded-lg bg-warning-50 border border-warning-200 text-sm text-warning-800">
                    <p>{q.explanation}</p>
                  </div>
                )}

                <div className="ml-10 space-y-2">
                  {q.options?.map((option, optIdx) => (
                    <button key={optIdx} onClick={() => onReadingAnswer(qIdx, optIdx)}
                      className={cn(
                        "w-full text-left p-3 rounded-lg border transition-all text-sm flex items-center gap-3",
                        readingAnswers[qIdx] === optIdx
                          ? "border-primary-500 bg-primary-50 ring-1 ring-primary-500"
                          : "border-border hover:border-primary-300 hover:bg-muted/50",
                      )}>
                      <span className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0",
                        readingAnswers[qIdx] === optIdx ? "bg-primary-600 text-white" : "bg-muted text-muted-foreground",
                      )}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="text-foreground">{option}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-border">
            <Button onClick={onSubmit} disabled={Object.keys(readingAnswers).length < readingPassage.questions.length}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-50">
              Submit All Answers
            </Button>
            {Object.keys(readingAnswers).length < readingPassage.questions.length && (
              <p className="text-xs text-center text-muted-foreground mt-2">Please answer all questions before submitting</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
