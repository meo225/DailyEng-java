"use client"

import { BookOpen, FileText, GraduationCap, Brain, BarChart3 } from "lucide-react"
import { Card } from "@/components/ui/card"
import type { CollectionType } from "@/hooks/notebook/types"

interface WelcomeScreenProps {
  collectionTypeFilter: CollectionType
}

export function WelcomeScreen({ collectionTypeFilter }: WelcomeScreenProps) {
  return (
    <Card className="p-12 rounded-2xl border-2 border-primary-100 bg-white text-center min-h-[320px] flex items-center justify-center">
      <div className="max-w-md mx-auto">
        <div className={`h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6 ${collectionTypeFilter === "vocabulary" ? "bg-primary-100" : "bg-secondary-100"}`}>
          {collectionTypeFilter === "vocabulary" ? (
            <BookOpen className="h-10 w-10 text-primary-500" />
          ) : (
            <FileText className="h-10 w-10 text-secondary-500" />
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          {collectionTypeFilter === "vocabulary" ? "Vocabulary Notebook" : "Grammar Notebook"}
        </h2>
        <p className="text-gray-500 mb-6 min-h-[48px]">
          {collectionTypeFilter === "vocabulary"
            ? "Choose a vocabulary notebook from the sidebar to start learning. Practice words with flashcards and track your progress."
            : "Choose a grammar notebook from the sidebar to review rules. Test your knowledge with quizzes and track your mastery."}
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            {collectionTypeFilter === "vocabulary" ? <GraduationCap className="h-4 w-4" /> : <Brain className="h-4 w-4" />}
            <span>{collectionTypeFilter === "vocabulary" ? "Flashcards" : "Quizzes"}</span>
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Statistics</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
