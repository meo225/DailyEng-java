"use client"

import { GraduationCap, CheckCircle2, XCircle, RotateCcw, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import type { GrammarItem } from "@/hooks/notebook/types"

function getLevelBadgeClass(level: string): string {
  const l = level.toLowerCase()
  if (l === "a1" || l === "a2") return "level-badge-a1"
  if (l === "b1" || l === "b2") return "level-badge-b1"
  if (l === "c1" || l === "c2") return "level-badge-c1"
  return "bg-gray-100 text-gray-600"
}

interface GrammarQuizProps {
  filteredGrammarItems: GrammarItem[]
  quizAnswers: Record<string, string>
  quizSubmitted: boolean
  onQuizAnswer: (itemId: string, answer: string) => void
  onSubmitQuiz: () => void
  onResetSession: () => void
  onGoToList: () => void
}

export function GrammarQuiz({
  filteredGrammarItems, quizAnswers, quizSubmitted,
  onQuizAnswer, onSubmitQuiz, onResetSession, onGoToList,
}: GrammarQuizProps) {
  if (filteredGrammarItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto notebook-enter">
        <div className="notebook-card p-12 text-center">
          <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center mx-auto mb-5">
            <GraduationCap className="h-10 w-10 text-primary-300" />
          </div>
          <h3 className="notebook-heading text-xl font-bold text-gray-900 mb-2">No Grammar Rules</h3>
          <p className="text-gray-400 mb-6">Add some grammar rules to start quizzing.</p>
          <Button onClick={onGoToList} variant="outline" className="gap-2 rounded-full px-6 cursor-pointer bg-transparent border-primary-200 text-primary-600 hover:bg-primary-50 font-semibold">
            <ArrowLeft className="h-4 w-4" /> Back to Rules
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto notebook-enter">
      <div className="notebook-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="notebook-heading text-xl font-bold text-gray-900">Grammar Quiz</h2>
          <Badge className="bg-primary-50 text-primary-600 border border-primary-200 font-semibold">{filteredGrammarItems.length} questions</Badge>
        </div>

        {!quizSubmitted ? (
          <div className="space-y-5 notebook-enter-stagger">
            {filteredGrammarItems.map((item, idx) => (
              <div key={item.id} className="p-5 bg-primary-50/30 rounded-xl border border-primary-100/60">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="h-7 w-7 rounded-full bg-gradient-to-br from-primary-600 to-primary-500 text-white text-xs font-bold flex items-center justify-center shadow-sm">{idx + 1}</span>
                  <h3 className="notebook-heading font-bold text-gray-900">{item.title}</h3>
                  <Badge className={`text-[10px] font-bold px-2 py-0.5 rounded-md border-0 ml-auto ${getLevelBadgeClass(item.level)}`}>{item.level}</Badge>
                </div>
                <p className="text-sm text-gray-500 mb-3 leading-relaxed">{item.explanation}</p>
                <div className="bg-white/80 p-3 rounded-lg border border-primary-100/40 mb-3">
                  <p className="text-sm font-mono font-semibold text-primary-700">{item.rule}</p>
                </div>
                {item.examples.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-600">Fill in the blank:</p>
                    <p className="text-sm text-gray-400 italic">Vietnamese: {item.examples[0].vi}</p>
                    <Input
                      placeholder="Type your answer in the target language..."
                      value={quizAnswers[item.id] || ""}
                      onChange={(e) => onQuizAnswer(item.id, e.target.value)}
                      className="h-10 rounded-xl border-primary-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                    />
                  </div>
                )}
              </div>
            ))}
            <Button onClick={onSubmitQuiz}
              className="w-full h-12 rounded-xl gap-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 shadow-md shadow-primary-500/20 cursor-pointer font-semibold"
              disabled={Object.keys(quizAnswers).length === 0}>
              <CheckCircle2 className="h-5 w-5" /> Submit Quiz
            </Button>
          </div>
        ) : (
          <div className="space-y-5 notebook-enter-stagger">
            <div className="text-center p-6 bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-xl border border-primary-200/60">
              <h3 className="notebook-heading text-2xl font-extrabold text-gray-900 mb-2">Quiz Complete!</h3>
              <p className="text-gray-500">Review your answers below</p>
            </div>
            {filteredGrammarItems.map((item) => {
              const userAnswer = quizAnswers[item.id] || ""
              const correctAnswer = item.examples[0]?.en || ""
              const isCorrect = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
              return (
                <div key={item.id} className={`p-4 rounded-xl border-2 transition-all ${isCorrect ? "bg-emerald-50/60 border-emerald-200" : "bg-red-50/60 border-red-200"}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {isCorrect ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <XCircle className="h-5 w-5 text-red-500" />}
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Your answer: <span className={isCorrect ? "text-emerald-600 font-semibold" : "text-red-500 font-semibold"}>{userAnswer || "(empty)"}</span></p>
                  {!isCorrect && <p className="text-sm text-gray-600">Correct answer: <span className="text-emerald-600 font-semibold">{correctAnswer}</span></p>}
                </div>
              )
            })}
            <div className="flex gap-3">
              <Button onClick={onResetSession} variant="outline" className="flex-1 h-12 rounded-xl gap-2 bg-transparent border-primary-200 text-primary-600 hover:bg-primary-50 font-semibold cursor-pointer">
                <RotateCcw className="h-5 w-5" /> Try Again
              </Button>
              <Button onClick={onGoToList} className="flex-1 h-12 rounded-xl gap-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 shadow-md shadow-primary-500/20 font-semibold cursor-pointer">
                <ArrowLeft className="h-5 w-5" /> Back to Rules
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
