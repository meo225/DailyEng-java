"use client"

import { GraduationCap, CheckCircle2, XCircle, RotateCcw, ArrowLeft } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import type { GrammarItem } from "@/hooks/notebook/types"

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
      <div className="max-w-3xl mx-auto">
        <Card className="p-12 text-center rounded-2xl border-2 border-primary-100 bg-white">
          <GraduationCap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Grammar Rules</h3>
          <p className="text-gray-500 mb-6">Add some grammar rules to start quizzing.</p>
          <Button onClick={onGoToList} variant="outline" className="gap-2 bg-transparent"><ArrowLeft className="h-4 w-4" /> Back to Rules</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="p-6 rounded-2xl border-2 border-primary-100 bg-white">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Grammar Quiz</h2>
          <Badge variant="secondary">{filteredGrammarItems.length} questions</Badge>
        </div>

        {!quizSubmitted ? (
          <div className="space-y-6">
            {filteredGrammarItems.map((item, idx) => (
              <div key={item.id} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-6 w-6 rounded-full bg-primary-500 text-white text-xs font-bold flex items-center justify-center">{idx + 1}</span>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <Badge className="bg-gray-100 text-gray-600 border-0 ml-auto">{item.level}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{item.explanation}</p>
                <div className="bg-white p-3 rounded-lg border border-gray-200 mb-3">
                  <p className="text-sm font-mono text-primary-700">{item.rule}</p>
                </div>
                {item.examples.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Fill in the blank:</p>
                    <p className="text-sm text-gray-600 italic">Vietnamese: {item.examples[0].vi}</p>
                    <Input
                      placeholder="Type your answer in English..."
                      value={quizAnswers[item.id] || ""}
                      onChange={(e) => onQuizAnswer(item.id, e.target.value)}
                      className="h-10 rounded-xl border-2"
                    />
                  </div>
                )}
              </div>
            ))}
            <Button onClick={onSubmitQuiz} className="w-full h-12 rounded-xl gap-2" disabled={Object.keys(quizAnswers).length === 0}>
              <CheckCircle2 className="h-5 w-5" /> Submit Quiz
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center p-6 bg-primary-50 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h3>
              <p className="text-gray-600">Review your answers below</p>
            </div>
            {filteredGrammarItems.map((item) => {
              const userAnswer = quizAnswers[item.id] || ""
              const correctAnswer = item.examples[0]?.en || ""
              const isCorrect = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
              return (
                <div key={item.id} className={`p-4 rounded-xl border-2 ${isCorrect ? "bg-success-100 border-success-200" : "bg-red-50 border-red-200"}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {isCorrect ? <CheckCircle2 className="h-5 w-5 text-success-300" /> : <XCircle className="h-5 w-5 text-red-500" />}
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Your answer: <span className={isCorrect ? "text-success-300 font-medium" : "text-red-500 font-medium"}>{userAnswer || "(empty)"}</span></p>
                  {!isCorrect && <p className="text-sm text-gray-600">Correct answer: <span className="text-success-300 font-medium">{correctAnswer}</span></p>}
                </div>
              )
            })}
            <div className="flex gap-3">
              <Button onClick={onResetSession} variant="outline" className="flex-1 h-12 rounded-xl gap-2 bg-transparent"><RotateCcw className="h-5 w-5" /> Try Again</Button>
              <Button onClick={onGoToList} className="flex-1 h-12 rounded-xl gap-2"><ArrowLeft className="h-5 w-5" /> Back to Rules</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
