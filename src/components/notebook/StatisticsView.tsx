"use client"

import {
  BookOpen, Zap, Award, Flame, Target, BarChart3,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { NotebookItem, GrammarItem, CollectionType } from "@/hooks/notebook/types"

interface StatisticsViewProps {
  currentCollectionType: CollectionType
  selectedCollection: string
  vocabularyItems: NotebookItem[]
  grammarItems: GrammarItem[]
  stats: { total: number; mastered: number; learning: number; newItems: number; avgMastery: number }
  dueCount: number
  onStartReview: () => void
}

export function StatisticsView({
  currentCollectionType, selectedCollection,
  vocabularyItems, grammarItems,
  stats, dueCount, onStartReview,
}: StatisticsViewProps) {
  return (
    <div className="space-y-6">
      {/* Due for review Banner */}
      {dueCount > 0 && currentCollectionType === "vocabulary" && (
        <Card className="p-5 rounded-2xl border-2 border-primary-200 shadow-md bg-gradient-to-r from-primary-50 via-white to-primary-50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-md">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-slate-800">Ready to Practice!</h2>
              <p className="text-sm text-slate-600">You have <span className="font-bold text-primary-600">{dueCount} words</span> ready for review today.</p>
            </div>
            <Button onClick={onStartReview} className="gap-2 h-10 px-5 rounded-xl bg-primary-500 hover:bg-primary-600 shadow-sm">
              <Zap className="h-4 w-4" /> Start Review
            </Button>
          </div>
        </Card>
      )}

      {/* Overview Stats */}
      <Card className="p-5 rounded-2xl border-2 border-primary-200 shadow-md bg-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-primary-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Learning Overview</h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="rounded-xl border-2 border-primary-100 bg-primary-50/50 p-4 text-center">
            <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <BookOpen className="h-4 w-4 text-primary-600" />
            </div>
            <p className="text-xl font-bold text-primary-700">{stats.total}</p>
            <p className="text-xs text-slate-600 font-medium">Total {currentCollectionType === "vocabulary" ? "Words" : "Rules"}</p>
          </div>
          <div className="rounded-xl border-2 border-success-100 bg-success-50/50 p-4 text-center">
            <div className="w-9 h-9 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Award className="h-4 w-4 text-success-600" />
            </div>
            <p className="text-xl font-bold text-success-700">{stats.mastered}</p>
            <p className="text-xs text-slate-600 font-medium">Mastered</p>
          </div>
          <div className="rounded-xl border-2 border-warning-100 bg-warning-50/50 p-4 text-center">
            <div className="w-9 h-9 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Flame className="h-4 w-4 text-warning-600" />
            </div>
            <p className="text-xl font-bold text-warning-700">{stats.learning}</p>
            <p className="text-xs text-slate-600 font-medium">Learning</p>
          </div>
          <div className="rounded-xl border-2 border-secondary-100 bg-secondary-50/50 p-4 text-center">
            <div className="w-9 h-9 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Target className="h-4 w-4 text-secondary-600" />
            </div>
            <p className="text-xl font-bold text-secondary-700">{stats.avgMastery}%</p>
            <p className="text-xs text-slate-600 font-medium">Avg. Mastery</p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl border border-primary-100">
          <p className="text-sm text-slate-600 text-center">
            💡 Practice daily to maintain your mastery. Consistency is key!
          </p>
        </div>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Learning Status - Donut Chart */}
        <Card className="p-5 rounded-2xl border-2 border-primary-200 shadow-md bg-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-success-100 rounded-full flex items-center justify-center">
              <Target className="w-5 h-5 text-success-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Learning Status</h3>
          </div>
          <div className="flex items-center justify-center gap-6 py-2">
            <div className="relative">
              <svg width="120" height="120" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="60" fill="none" stroke="#f1f5f9" strokeWidth="14" />
                <circle cx="80" cy="80" r="60" fill="none" stroke="#22c55e" strokeWidth="14"
                  strokeDasharray={`${(stats.mastered / Math.max(stats.total, 1)) * 377} 377`} strokeDashoffset="94.25" strokeLinecap="round" />
                <circle cx="80" cy="80" r="60" fill="none" stroke="#f59e0b" strokeWidth="14"
                  strokeDasharray={`${(stats.learning / Math.max(stats.total, 1)) * 377} 377`}
                  strokeDashoffset={`${94.25 - (stats.mastered / Math.max(stats.total, 1)) * 377}`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-slate-800">{stats.total > 0 ? Math.round((stats.mastered / stats.total) * 100) : 0}%</span>
                <span className="text-[10px] text-slate-500">Mastered</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-success-500" /><span className="text-xs font-medium text-slate-700">{stats.mastered} Mastered</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-warning-500" /><span className="text-xs font-medium text-slate-700">{stats.learning} Learning</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-slate-300" /><span className="text-xs font-medium text-slate-700">{stats.newItems} New</span></div>
            </div>
          </div>
          <div className="mt-3 p-3 bg-gradient-to-r from-success-50 to-emerald-50 rounded-xl border border-success-100">
            <p className="text-sm text-success-700 text-center">🎯 Goal: reach 80% mastery! Keep practicing! 💪</p>
          </div>
        </Card>

        {/* Level Distribution */}
        <Card className="p-5 rounded-2xl border-2 border-primary-200 shadow-md bg-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-secondary-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Level Distribution</h3>
          </div>
          <div className="space-y-2 py-1">
            {["A1", "A2", "B1", "B2", "C1", "C2"].map((level) => {
              const items = currentCollectionType === "vocabulary"
                ? vocabularyItems.filter(i => i.collectionId === selectedCollection && i.level === level)
                : grammarItems.filter(i => i.collectionId === selectedCollection && i.level === level)
              const count = items.length
              const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0
              return (
                <div key={level} className="flex items-center gap-2">
                  <span className="w-8 text-xs font-bold text-slate-600 bg-slate-100 rounded px-1.5 py-0.5 text-center">{level}</span>
                  <div className="flex-1 h-5 bg-slate-100 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-400 to-primary-500 rounded-lg flex items-center justify-end pr-2 transition-all duration-500"
                      style={{ width: `${Math.max(percentage, 5)}%` }}
                    >
                      {percentage > 15 && <span className="text-[10px] font-bold text-white">{count}</span>}
                    </div>
                  </div>
                  {percentage <= 15 && <span className="text-xs font-bold text-slate-500 w-5 text-right">{count}</span>}
                </div>
              )
            })}
          </div>
          <div className="mt-3 p-3 bg-gradient-to-r from-secondary-50 to-purple-50 rounded-xl border border-secondary-100">
            <p className="text-sm text-secondary-700 text-center">📊 CEFR: A1-A2 (Basic) → B1-B2 (Intermediate) → C1-C2 (Advanced)</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
