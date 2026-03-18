"use client"

import { usePlacementTest } from "./placement-test/usePlacementTest"
import { useReadingTest } from "./placement-test/useReadingTest"
import type { TestStep, Question, ReadingPassage } from "./placement-test/types"

// Re-export types for downstream consumers
export type {
  TestStep, Question, ReadingPassageQuestion, ReadingPassage, PlacementTestClientProps,
} from "./placement-test/types"
export { getTestStepIcon, calculateCEFRLevel, getPerformanceLevel } from "./placement-test/types"

// ─── Composer Hook ─────────────────────────────────

interface UsePlacementTestPageParams {
  testSteps: TestStep[]
  mockQuestions: Record<string, Question[]>
  readingPassage: ReadingPassage
}

export function usePlacementTestPage({
  testSteps,
  mockQuestions,
  readingPassage,
}: UsePlacementTestPageParams) {
  const reading = useReadingTest({ readingPassage })

  const test = usePlacementTest({
    testSteps,
    mockQuestions,
    readingPassage,
    readingAnswers: reading.readingAnswers,
    resetReadingState: reading.resetReadingState,
  })

  return {
    ...test,
    ...reading,
  }
}
