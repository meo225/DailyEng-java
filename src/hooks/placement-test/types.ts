import {
  BookOpen, Headphones, MessageSquare, PenTool, BookMarked, FileTextIcon,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

// ─── Data Models ───────────────────────────────────

export interface TestStep {
  id: string
  label: string
  color: string
  description: string
}

export interface Question {
  id: number
  type: "multiple-choice" | "fill-blank" | "reading" | "listening" | "speaking" | "writing"
  question: string
  options?: string[]
  correctAnswer?: number | string
  passage?: string
  prompt?: string
  hint?: string
}

export interface ReadingPassageQuestion {
  question: string
  options?: string[]
  correctAnswer: number
  explanation: string
}

export interface ReadingPassage {
  title: string
  content: string
  questions: ReadingPassageQuestion[]
}

export interface PlacementTestClientProps {
  testSteps: TestStep[]
  mockQuestions: Record<string, Question[]>
  readingPassage: ReadingPassage
}

// ─── Helpers ───────────────────────────────────────

export function getTestStepIcon(stepId: string): LucideIcon {
  switch (stepId) {
    case "vocabulary": return BookMarked
    case "grammar": return BookOpen
    case "reading": return FileTextIcon
    case "listening": return Headphones
    case "speaking": return MessageSquare
    case "writing": return PenTool
    default: return BookOpen
  }
}

export function calculateCEFRLevel(score: number): { level: string; description: string; color: string } {
  if (score >= 90) return { level: "C2", description: "Proficient - Mastery", color: "text-success-600" }
  if (score >= 80) return { level: "C1", description: "Proficient - Advanced", color: "text-primary-600" }
  if (score >= 70) return { level: "B2", description: "Independent - Upper Intermediate", color: "text-info-600" }
  if (score >= 55) return { level: "B1", description: "Independent - Intermediate", color: "text-warning-600" }
  if (score >= 40) return { level: "A2", description: "Basic - Elementary", color: "text-warning-500" }
  return { level: "A1", description: "Basic - Beginner", color: "text-secondary-600" }
}

export function getPerformanceLevel(score: number) {
  if (score >= 90) return { label: "Excellent", color: "text-success-600", bg: "bg-success-50", border: "border-success-200" }
  if (score >= 70) return { label: "Good", color: "text-primary-600", bg: "bg-primary-50", border: "border-primary-200" }
  if (score >= 50) return { label: "Average", color: "text-warning-600", bg: "bg-warning-50", border: "border-warning-200" }
  return { label: "Needs Improvement", color: "text-error-600", bg: "bg-error-50", border: "border-error-200" }
}
