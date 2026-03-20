"use client"

import { usePlacementTestPage } from "@/hooks/usePlacementTestPage"
import type { PlacementTestClientProps } from "@/hooks/usePlacementTestPage"

// Re-export types for downstream consumers
export type { TestStep, Question, ReadingPassageQuestion, ReadingPassage, PlacementTestClientProps } from "@/hooks/usePlacementTestPage"

import { TestDashboard } from "@/components/placement-test/TestDashboard"
import { TestContent } from "@/components/placement-test/TestContent"
import { ReadingTest } from "@/components/placement-test/ReadingTest"
import { TestFeedback } from "@/components/placement-test/TestFeedback"
import { TestResults } from "@/components/placement-test/TestResults"

export default function PlacementTestClient({
  testSteps,
  mockQuestions,
  readingPassage,
}: PlacementTestClientProps) {
  const state = usePlacementTestPage({ testSteps, mockQuestions, readingPassage })

  // Test Feedback View
  if (state.showTestFeedback && state.feedbackTestId) {
    return (
      <TestFeedback
        testSteps={testSteps}
        feedbackTestId={state.feedbackTestId}
        testScores={state.testScores}
        completedTests={state.completedTests}
        mockQuestions={mockQuestions}
        readingPassage={readingPassage}
        feedbackAnswers={state.feedbackAnswers}
        feedbackReadingAnswers={state.feedbackReadingAnswers}
        onContinue={state.handleContinueFromFeedback}
      />
    )
  }

  // Active Test View
  if (state.activeTestId) {
    if (state.activeTestId === "reading") {
      return (
        <ReadingTest
          readingPassage={readingPassage}
          readingAnswers={state.readingAnswers}
          readingHints={state.readingHints}
          readingHighlights={state.readingHighlights}
          isHighlightMode={state.isHighlightMode}
          passageRef={state.passageRef}
          onHighlightModeToggle={() => state.setIsHighlightMode(!state.isHighlightMode)}
          onTextSelection={state.handleTextSelection}
          onReadingAnswer={state.handleReadingAnswer}
          onToggleHint={state.toggleReadingHint}
          onSubmit={state.handleSubmitReading}
          getHighlightedSegments={state.getHighlightedSegments}
        />
      )
    }

    return (
      <TestContent
        testSteps={testSteps}
        activeTestId={state.activeTestId}
        mockQuestions={mockQuestions}
        currentQuestion={state.currentQuestion}
        selectedAnswer={state.selectedAnswer}
        writingAnswer={state.writingAnswer}
        fillBlankAnswer={state.fillBlankAnswer}
        isRecording={state.isRecording}
        isPlaying={state.isPlaying}
        onExit={() => state.setActiveTestId(null)}
        onSelectAnswer={state.handleSelectAnswer}
        onNext={state.handleNextQuestion}
        onPrevious={state.handlePreviousQuestion}
        onToggleRecording={state.toggleRecording}
        onPlayAudio={state.playAudio}
        onWritingChange={(v) => state.setWritingAnswer(v)}
        onFillBlankChange={(v) => state.setFillBlankAnswer(v)}
      />
    )
  }

  // Results View
  if (state.showResults) {
    return (
      <TestResults
        testSteps={testSteps}
        testScores={state.testScores}
        overallScore={state.calculateOverallScore()}
        onRestart={state.handleRestartTest}
      />
    )
  }

  // Dashboard View (default)
  return (
    <TestDashboard
      testSteps={testSteps}
      completedTests={state.completedTests}
      testScores={state.testScores}
      overallProgress={state.overallProgress}
      isStepUnlocked={state.isStepUnlocked}
      isStepCompleted={state.isStepCompleted}
      onStartTest={state.handleStartTest}
      onShowResults={() => state.setShowResults(true)}
    />
  )
}
