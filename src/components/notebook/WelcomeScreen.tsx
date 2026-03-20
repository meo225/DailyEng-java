"use client"

import { BookOpen, FileText, GraduationCap, Brain, BarChart3, Sparkles } from "lucide-react"
import type { CollectionType } from "@/hooks/notebook/types"

interface WelcomeScreenProps {
  collectionTypeFilter: CollectionType
}

export function WelcomeScreen({ collectionTypeFilter }: WelcomeScreenProps) {
  const isVocab = collectionTypeFilter === "vocabulary"

  return (
    <div className="notebook-card p-8 lg:p-12 min-h-[400px] flex items-center justify-center notebook-enter">
      <div className="max-w-lg mx-auto text-center">
        {/* Illustrative icon with gradient and float */}
        <div className="relative inline-flex mb-8">
          <div className={`h-24 w-24 rounded-2xl flex items-center justify-center motion-safe:animate-float ${
            isVocab
              ? "bg-gradient-to-br from-primary-500 to-primary-400 shadow-xl shadow-primary-500/20"
              : "bg-gradient-to-br from-secondary-500 to-secondary-400 shadow-xl shadow-secondary-500/20"
          }`}>
            {isVocab ? (
              <BookOpen className="h-12 w-12 text-white" />
            ) : (
              <FileText className="h-12 w-12 text-white" />
            )}
          </div>
          <div className="absolute -top-2 -right-2 h-8 w-8 rounded-lg bg-accent-400 flex items-center justify-center shadow-md">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
        </div>

        {/* Typography hierarchy */}
        <h2 className="notebook-heading text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">
          {isVocab ? "Vocabulary Notebook" : "Grammar Notebook"}
        </h2>
        <p className="text-gray-500 mb-10 text-base lg:text-lg leading-relaxed max-w-md mx-auto">
          {isVocab
            ? "Choose a notebook from the sidebar to start your learning journey. Master words with flashcards and track your progress."
            : "Select a grammar notebook to review rules and patterns. Test your knowledge with quizzes and watch your mastery grow."}
        </p>

        {/* Feature hints as horizontal cards */}
        <div className="flex items-center justify-center gap-4">
          {[
            {
              icon: isVocab ? <GraduationCap className="h-5 w-5" /> : <Brain className="h-5 w-5" />,
              label: isVocab ? "Flashcards" : "Quizzes",
              color: "text-primary-500 bg-primary-50 border-primary-100",
            },
            {
              icon: <BarChart3 className="h-5 w-5" />,
              label: "Statistics",
              color: "text-emerald-500 bg-emerald-50 border-emerald-100",
            },
          ].map((feature) => (
            <div
              key={feature.label}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border ${feature.color} transition-all duration-200 hover:scale-105`}
            >
              {feature.icon}
              <span className="text-sm font-semibold text-gray-600">{feature.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
