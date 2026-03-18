"use client"

import { useState } from "react"
import type { TestStep, Question, ReadingPassage } from "./types"

// ─── Hook ──────────────────────────────────────────

interface UsePlacementTestParams {
  testSteps: TestStep[]
  mockQuestions: Record<string, Question[]>
  readingPassage: ReadingPassage
  // Cross-hook deps for reading test integration
  readingAnswers: Record<number, number>
  resetReadingState: () => void
}

export function usePlacementTest({
  testSteps,
  mockQuestions,
  readingPassage,
  readingAnswers,
  resetReadingState,
}: UsePlacementTestParams) {
  // ── Core test state ──
  const [completedTests, setCompletedTests] = useState<string[]>([])
  const [testScores, setTestScores] = useState<Record<string, number>>({})
  const [activeTestId, setActiveTestId] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null)
  const [answers, setAnswers] = useState<Record<number, number | string>>({})
  const [writingAnswer, setWritingAnswer] = useState("")
  const [fillBlankAnswer, setFillBlankAnswer] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // ── Feedback state ──
  const [showTestFeedback, setShowTestFeedback] = useState(false)
  const [feedbackTestId, setFeedbackTestId] = useState<string | null>(null)
  const [feedbackAnswers, setFeedbackAnswers] = useState<Record<number, number | string>>({})
  const [feedbackReadingAnswers, setFeedbackReadingAnswers] = useState<Record<number, number>>({})

  // ── Derived ──
  const isStepUnlocked = (stepId: string) => {
    const stepIndex = testSteps.findIndex((s) => s.id === stepId)
    if (stepIndex === 0) return true
    const prevStep = testSteps[stepIndex - 1]
    return completedTests.includes(prevStep.id)
  }

  const isStepCompleted = (stepId: string) => completedTests.includes(stepId)
  const activeStepIndex = testSteps.findIndex((s) => s.id === activeTestId)
  const overallProgress = Math.round((completedTests.length / testSteps.length) * 100)

  const calculateOverallScore = () => {
    if (completedTests.length === 0) return 0
    const total = Object.values(testScores).reduce((a, b) => a + b, 0)
    return Math.round(total / completedTests.length)
  }

  // ── Handlers ──
  const handleStartTest = (testId: string) => {
    if (!isStepUnlocked(testId)) return
    setActiveTestId(testId)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setAnswers({})
    setWritingAnswer("")
    setFillBlankAnswer("")
    if (testId === "reading") {
      resetReadingState()
    }
  }

  const handleSelectAnswer = (answer: number | string) => {
    setSelectedAnswer(answer)
  }

  const handleNextQuestion = () => {
    const questions = mockQuestions[activeTestId!]
    const currentQ = questions[currentQuestion]

    let answerToSave: number | string | null = selectedAnswer
    if (currentQ.type === "fill-blank") answerToSave = fillBlankAnswer
    if (currentQ.type === "writing") answerToSave = writingAnswer
    if (currentQ.type === "speaking" && isRecording) answerToSave = "recorded"

    if (answerToSave !== null && answerToSave !== "") {
      const newAnswers = { ...answers, [currentQuestion]: answerToSave }
      setAnswers(newAnswers)

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setWritingAnswer("")
        setFillBlankAnswer("")
      } else {
        let correct = 0
        Object.entries(newAnswers).forEach(([qIdx, ans]) => {
          const q = questions[Number(qIdx)]
          if (q.correctAnswer !== undefined && ans === q.correctAnswer) {
            correct++
          } else if (q.type === "speaking" || q.type === "writing") {
            correct += 0.7
          } else if (q.type === "fill-blank" && typeof q.correctAnswer === "string") {
            if (String(ans).toLowerCase().trim() === q.correctAnswer.toLowerCase()) {
              correct++
            }
          }
        })
        const score = Math.round((correct / questions.length) * 100)

        setTestScores((prev) => ({ ...prev, [activeTestId!]: score }))
        setFeedbackTestId(activeTestId)
        setFeedbackAnswers(newAnswers)
        setShowTestFeedback(true)
        setActiveTestId(null)
      }
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(answers[currentQuestion - 1] ?? null)
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false)
        setSelectedAnswer("recorded")
      }, 3000)
    }
  }

  const playAudio = () => {
    setIsPlaying(true)
    setTimeout(() => setIsPlaying(false), 3000)
  }

  const handleRestartTest = () => {
    setCompletedTests([])
    setTestScores({})
    setActiveTestId(null)
    setShowResults(false)
    setCurrentQuestion(0)
    setAnswers({})
    resetReadingState()
  }

  const handleSubmitReading = () => {
    let correct = 0
    readingPassage.questions.forEach((q, idx) => {
      if (readingAnswers[idx] === q.correctAnswer) correct++
    })
    const score = Math.round((correct / readingPassage.questions.length) * 100)
    setTestScores((prev) => ({ ...prev, reading: score }))
    setFeedbackTestId("reading")
    setFeedbackReadingAnswers(readingAnswers)
    setShowTestFeedback(true)
    setActiveTestId(null)
  }

  const handleContinueFromFeedback = () => {
    if (feedbackTestId) {
      setCompletedTests((prev) => [...prev, feedbackTestId])
      const newCompleted = [...completedTests, feedbackTestId]
      if (newCompleted.length === testSteps.length) {
        setShowResults(true)
      }
    }
    setShowTestFeedback(false)
    setFeedbackTestId(null)
    setFeedbackAnswers({})
    setFeedbackReadingAnswers({})
    setAnswers({})
    setCurrentQuestion(0)
    setSelectedAnswer(null)
  }

  return {
    // State
    completedTests, testScores, activeTestId, setActiveTestId,
    currentQuestion, selectedAnswer,
    answers, writingAnswer, setWritingAnswer,
    fillBlankAnswer, setFillBlankAnswer,
    isRecording, isPlaying, showResults, setShowResults,

    // Feedback
    showTestFeedback, feedbackTestId,
    feedbackAnswers, feedbackReadingAnswers,

    // Derived
    isStepUnlocked, isStepCompleted,
    activeStepIndex, overallProgress, calculateOverallScore,

    // Handlers
    handleStartTest, handleSelectAnswer,
    handleNextQuestion, handlePreviousQuestion,
    toggleRecording, playAudio,
    handleRestartTest, handleSubmitReading,
    handleContinueFromFeedback,
  }
}
