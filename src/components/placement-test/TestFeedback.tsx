"use client"

import {
  BookOpen, Lightbulb, CheckCircle, X, Mic, Trophy, ChevronRight, FileTextIcon,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { TestStep, Question, ReadingPassage } from "@/hooks/placement-test/types"
import { getTestStepIcon, getPerformanceLevel } from "@/hooks/placement-test/types"

interface TestFeedbackProps {
  testSteps: TestStep[]
  feedbackTestId: string
  testScores: Record<string, number>
  completedTests: string[]
  mockQuestions: Record<string, Question[]>
  readingPassage: ReadingPassage
  feedbackAnswers: Record<number, number | string>
  feedbackReadingAnswers: Record<number, number>
  onContinue: () => void
}

export function TestFeedback({
  testSteps, feedbackTestId, testScores, completedTests,
  mockQuestions, readingPassage,
  feedbackAnswers, feedbackReadingAnswers, onContinue,
}: TestFeedbackProps) {
  const testInfo = testSteps.find((t) => t.id === feedbackTestId)
  const TestIcon = testInfo ? getTestStepIcon(testInfo.id) : BookOpen
  const score = testScores[feedbackTestId] || 0
  const isReadingTest = feedbackTestId === "reading"

  const questions = isReadingTest ? readingPassage.questions : mockQuestions[feedbackTestId]
  const userAnswers = isReadingTest ? feedbackReadingAnswers : feedbackAnswers

  let correctCount = 0
  questions.forEach((q: any, idx: number) => {
    const userAnswer = userAnswers[idx]
    if (isReadingTest) {
      if (userAnswer === q.correctAnswer) correctCount++
    } else {
      if (q.correctAnswer !== undefined && userAnswer === q.correctAnswer) {
        correctCount++
      } else if (q.type === "fill-blank" && typeof q.correctAnswer === "string") {
        if (String(userAnswer).toLowerCase().trim() === q.correctAnswer.toLowerCase()) {
          correctCount++
        }
      }
    }
  })

  const performance = getPerformanceLevel(score)

  const getFeedback = (q: any, userAnswer: any, isCorrect: boolean) => {
    if (q.type === "speaking") return "Your speaking response has been recorded. Focus on pronunciation, fluency, and coherence."
    if (q.type === "writing") return "Your writing has been evaluated. Consider grammar, vocabulary range, and coherence in your response."
    if (isCorrect) return "Correct! Well done."
    if (q.hint) return `Incorrect. Hint: ${q.hint}`
    return "Incorrect. Review this topic for better understanding."
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className={`${performance.bg} ${performance.border} border-b px-6 py-4`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl ${performance.bg} ${performance.border} border-2 flex items-center justify-center`}>
                  <TestIcon className={`w-6 h-6 ${performance.color}`} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">{testInfo?.label} Test - Results</h1>
                  <p className="text-sm text-muted-foreground">{questions.length} questions completed</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-3xl font-bold ${performance.color}`}>{score}%</div>
                <Badge className={`${performance.bg} ${performance.color} ${performance.border} border`}>{performance.label}</Badge>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-success-50 rounded-xl">
                <div className="text-2xl font-bold text-success-600">{correctCount}</div>
                <div className="text-sm text-muted-foreground">Correct</div>
              </div>
              <div className="p-4 bg-error-50 rounded-xl">
                <div className="text-2xl font-bold text-error-600">{questions.length - correctCount}</div>
                <div className="text-sm text-muted-foreground">Incorrect</div>
              </div>
              <div className="p-4 bg-primary-50 rounded-xl">
                <div className="text-2xl font-bold text-primary-600">{questions.length}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Answers */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b bg-muted/50">
            <CardTitle className="flex items-center gap-2">
              <FileTextIcon className="w-5 h-5 text-primary-600" /> Detailed Review
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {questions.map((q: any, idx: number) => {
                const userAnswer = userAnswers[idx]
                let isCorrect = false

                if (isReadingTest) {
                  isCorrect = userAnswer === q.correctAnswer
                } else if (q.type === "speaking" || q.type === "writing") {
                  isCorrect = true
                } else if (q.type === "fill-blank" && typeof q.correctAnswer === "string") {
                  isCorrect = String(userAnswer).toLowerCase().trim() === q.correctAnswer.toLowerCase()
                } else {
                  isCorrect = userAnswer === q.correctAnswer
                }

                const feedback = getFeedback(q, userAnswer, isCorrect)

                return (
                  <div key={idx} className={`p-5 ${isCorrect ? "bg-success-50/50" : "bg-error-50/50"}`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isCorrect ? "bg-success-100 text-success-600" : "bg-error-100 text-error-600"}`}>
                        {isCorrect ? <CheckCircle className="w-5 h-5" /> : <X className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <span className="text-xs font-medium text-muted-foreground uppercase">Question {idx + 1}</span>
                          <p className="font-medium text-foreground mt-1">{q.question || q.text}</p>
                        </div>

                        {q.options && (
                          <div className="grid grid-cols-1 gap-2 mt-3">
                            {q.options.map((opt: string, optIdx: number) => {
                              const isUserAnswer = userAnswer === optIdx
                              const isCorrectAnswer = q.correctAnswer === optIdx
                              return (
                                <div key={optIdx}
                                  className={`px-4 py-2 rounded-lg text-sm flex items-center gap-3 ${isCorrectAnswer ? "bg-success-100 text-success-800 border border-success-300"
                                    : isUserAnswer && !isCorrectAnswer ? "bg-error-100 text-error-800 border border-error-300"
                                      : "bg-card text-muted-foreground border border-border"}`}>
                                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isCorrectAnswer ? "bg-success-600 text-white"
                                    : isUserAnswer && !isCorrectAnswer ? "bg-error-600 text-white" : "bg-muted text-muted-foreground"}`}>
                                    {String.fromCharCode(65 + optIdx)}
                                  </span>
                                  <span>{opt}</span>
                                  {isCorrectAnswer && <CheckCircle className="w-4 h-4 ml-auto text-success-600" />}
                                  {isUserAnswer && !isCorrectAnswer && <X className="w-4 h-4 ml-auto text-error-600" />}
                                </div>
                              )
                            })}
                          </div>
                        )}

                        {q.type === "fill-blank" && (
                          <div className="flex gap-4 mt-3">
                            <div className={`px-4 py-2 rounded-lg text-sm ${isCorrect ? "bg-success-100 text-success-800" : "bg-error-100 text-error-800"}`}>
                              <span className="text-xs uppercase font-medium opacity-70">Your answer:</span>
                              <p className="font-medium">{String(userAnswer) || "(empty)"}</p>
                            </div>
                            {!isCorrect && (
                              <div className="px-4 py-2 rounded-lg text-sm bg-success-100 text-success-800">
                                <span className="text-xs uppercase font-medium opacity-70">Correct answer:</span>
                                <p className="font-medium">{q.correctAnswer}</p>
                              </div>
                            )}
                          </div>
                        )}

                        {q.type === "writing" && (
                          <div className="mt-3 p-4 bg-card rounded-lg border border-border">
                            <span className="text-xs uppercase font-medium text-muted-foreground">Your response:</span>
                            <p className="mt-1 text-foreground whitespace-pre-wrap">{String(userAnswer) || "(No response)"}</p>
                          </div>
                        )}

                        {q.type === "speaking" && (
                          <div className="mt-3 flex items-center gap-2 text-primary-600">
                            <Mic className="w-4 h-4" /><span className="text-sm">Audio response recorded</span>
                          </div>
                        )}

                        <div className={`mt-3 p-3 rounded-lg text-sm ${isCorrect ? "bg-success-100/50 text-success-700" : "bg-warning-100/50 text-warning-700"}`}>
                          <div className="flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" /><span>{feedback}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <div className="flex justify-center pt-4">
          <Button onClick={onContinue} size="lg"
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
            {completedTests.length + 1 >= testSteps.length ? (
              <><Trophy className="w-5 h-5 mr-2" /> View Final Results</>
            ) : (
              <>Continue to Next Test <ChevronRight className="w-5 h-5 ml-2" /></>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
