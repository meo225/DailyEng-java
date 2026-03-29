"use client"

import { useMemo } from "react"
import {
  BookOpen, Zap, Award, Flame, Target, BarChart3, Lightbulb, Crosshair, TrendingUp,
} from "lucide-react"
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
  // ⚡ Bolt: Memoize grouped item counts to prevent O(N * Levels) filtering operations on every render
  const levelCounts = useMemo(() => {
    const counts: Record<string, number> = {
      "A1": 0, "A2": 0, "B1": 0, "B2": 0, "C1": 0, "C2": 0
    };

    if (currentCollectionType === "vocabulary") {
      for (const item of vocabularyItems) {
        if (item.collectionId === selectedCollection && item.level) {
          counts[item.level] = (counts[item.level] || 0) + 1;
        }
      }
    } else {
      for (const item of grammarItems) {
        if (item.collectionId === selectedCollection && item.level) {
          counts[item.level] = (counts[item.level] || 0) + 1;
        }
      }
    }

    return counts;
  }, [currentCollectionType, vocabularyItems, grammarItems, selectedCollection]);

  return (
    <div className="space-y-5 notebook-enter">
      {/* Due for review Banner */}
      {dueCount > 0 && currentCollectionType === "vocabulary" && (
        <div className="notebook-card p-5 !border-primary-200/80 bg-gradient-to-r from-primary-50/80 via-white to-primary-50/80">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="notebook-heading text-lg font-bold text-gray-900">Ready to Practice!</h2>
              <p className="text-sm text-gray-500">You have <span className="font-bold text-primary-600">{dueCount} words</span> ready for review today.</p>
            </div>
            <Button onClick={onStartReview}
              className="gap-2 h-10 px-5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 shadow-md shadow-primary-500/20 cursor-pointer font-semibold">
              <Zap className="h-4 w-4" /> Start Review
            </Button>
          </div>
        </div>
      )}

      {/* Overview Stats */}
      <div className="notebook-card p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 bg-primary-50 rounded-full flex items-center justify-center border border-primary-100">
            <BarChart3 className="w-4 h-4 text-primary-500" />
          </div>
          <h3 className="notebook-heading text-lg font-bold text-gray-900">Learning Overview</h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: <BookOpen className="h-4 w-4" />, value: stats.total, label: `Total ${currentCollectionType === "vocabulary" ? "Words" : "Rules"}`, gradient: "from-primary-500 to-primary-400", bg: "bg-primary-50/60", border: "border-primary-100/60", textColor: "text-primary-600" },
            { icon: <Award className="h-4 w-4" />, value: stats.mastered, label: "Mastered", gradient: "from-emerald-500 to-emerald-400", bg: "bg-emerald-50/60", border: "border-emerald-100/60", textColor: "text-emerald-600" },
            { icon: <Flame className="h-4 w-4" />, value: stats.learning, label: "Learning", gradient: "from-amber-500 to-amber-400", bg: "bg-amber-50/60", border: "border-amber-100/60", textColor: "text-amber-600" },
            { icon: <Target className="h-4 w-4" />, value: `${stats.avgMastery}%`, label: "Avg. Mastery", gradient: "from-violet-500 to-violet-400", bg: "bg-violet-50/60", border: "border-violet-100/60", textColor: "text-violet-600" },
          ].map((stat) => (
            <div key={stat.label} className={`rounded-xl ${stat.bg} border ${stat.border} p-4 text-center transition-all duration-200 hover:shadow-sm`}>
              <div className={`w-8 h-8 bg-gradient-to-br ${stat.gradient} rounded-lg flex items-center justify-center mx-auto mb-2 text-white shadow-sm`}>
                {stat.icon}
              </div>
              <p className={`text-xl font-extrabold ${stat.textColor} notebook-heading`}>{stat.value}</p>
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-gradient-to-r from-primary-50/60 to-blue-50/40 rounded-xl border border-primary-100/40 flex items-center gap-2 justify-center">
          <Lightbulb className="h-4 w-4 text-primary-400 flex-shrink-0" />
          <p className="text-sm text-gray-500">Practice daily to maintain your mastery. Consistency is key!</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Learning Status - Donut Chart */}
        <div className="notebook-card p-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100">
              <Crosshair className="w-4 h-4 text-emerald-500" />
            </div>
            <h3 className="notebook-heading text-lg font-bold text-gray-900">Learning Status</h3>
          </div>
          <div className="flex items-center justify-center gap-8 py-2">
            <div className="relative">
              <svg width="120" height="120" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="60" fill="none" stroke="#f1f5f9" strokeWidth="14" />
                <circle cx="80" cy="80" r="60" fill="none" stroke="#10b981" strokeWidth="14"
                  strokeDasharray={`${(stats.mastered / Math.max(stats.total, 1)) * 377} 377`} strokeDashoffset="94.25" strokeLinecap="round" />
                <circle cx="80" cy="80" r="60" fill="none" stroke="#f59e0b" strokeWidth="14"
                  strokeDasharray={`${(stats.learning / Math.max(stats.total, 1)) * 377} 377`}
                  strokeDashoffset={`${94.25 - (stats.mastered / Math.max(stats.total, 1)) * 377}`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="notebook-heading text-2xl font-extrabold text-gray-900">{stats.total > 0 ? Math.round((stats.mastered / stats.total) * 100) : 0}%</span>
                <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Mastered</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs font-semibold text-gray-600">{stats.mastered} Mastered</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-xs font-semibold text-gray-600">{stats.learning} Learning</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-gray-300" />
                <span className="text-xs font-semibold text-gray-600">{stats.newItems} New</span>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-gradient-to-r from-emerald-50/60 to-teal-50/40 rounded-xl border border-emerald-100/40 flex items-center gap-2 justify-center">
            <Crosshair className="h-4 w-4 text-emerald-400 flex-shrink-0" />
            <p className="text-sm text-emerald-600 font-medium">Goal: reach 80% mastery! Keep practicing!</p>
          </div>
        </div>

        {/* Level Distribution */}
        <div className="notebook-card p-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 bg-violet-50 rounded-full flex items-center justify-center border border-violet-100">
              <TrendingUp className="w-4 h-4 text-violet-500" />
            </div>
            <h3 className="notebook-heading text-lg font-bold text-gray-900">Level Distribution</h3>
          </div>
          <div className="space-y-2.5 py-1">
            {["A1", "A2", "B1", "B2", "C1", "C2"].map((level) => {
              const count = levelCounts[level] || 0;
              const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0
              const barGradient = level.startsWith("A") ? "from-teal-400 to-teal-500"
                : level.startsWith("B") ? "from-primary-400 to-primary-500"
                : "from-violet-400 to-violet-500"
              return (
                <div key={level} className="flex items-center gap-2.5">
                  <span className="w-8 text-xs font-bold text-white bg-gradient-to-r from-gray-500 to-gray-600 rounded-md px-1.5 py-0.5 text-center">{level}</span>
                  <div className="flex-1 h-5 bg-gray-100 rounded-lg overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${barGradient} rounded-lg flex items-center justify-end pr-2 transition-all duration-500`}
                      style={{ width: `${Math.max(percentage, count > 0 ? 8 : 0)}%` }}
                    >
                      {percentage > 15 && <span className="text-[10px] font-bold text-white">{count}</span>}
                    </div>
                  </div>
                  {percentage <= 15 && <span className="text-xs font-bold text-gray-400 w-5 text-right">{count}</span>}
                </div>
              )
            })}
          </div>
          <div className="mt-4 p-3 bg-gradient-to-r from-violet-50/60 to-purple-50/40 rounded-xl border border-violet-100/40 flex items-center gap-2 justify-center">
            <BarChart3 className="h-4 w-4 text-violet-400 flex-shrink-0" />
            <p className="text-sm text-violet-600 font-medium">CEFR: A1-A2 (Basic) → B1-B2 (Intermediate) → C1-C2 (Advanced)</p>
          </div>
        </div>
      </div>
    </div>
  )
}
