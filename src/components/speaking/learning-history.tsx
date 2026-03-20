"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LearningRecordCard } from "./learning-record-card"
import { History, ArrowLeft, Trophy, Target, TrendingUp, Calendar, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface LearningRecord {
  id: string;
  overallScore: number;
  grammarScore: number;
  topicScore: number;
  fluencyScore: number;
  accuracyScore: number;
  prosodyScore: number;
  date: Date;
}

interface LearningHistoryProps {
  records: LearningRecord[];
  onBack: () => void;
  onSelectRecord?: (recordId: string) => void;
  onDeleteRecord?: (recordId: string) => void;
}

export function LearningHistory({ records, onBack, onSelectRecord, onDeleteRecord }: LearningHistoryProps) {
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  // Calculate statistics
  const totalSessions = records.length;
  const averageScore =
    totalSessions > 0
      ? Math.round(
          records.reduce((sum, r) => sum + r.overallScore, 0) / totalSessions
        )
      : 0;
  const highestScore =
    totalSessions > 0 ? Math.max(...records.map((r) => r.overallScore)) : 0;
  const recentTrend =
    records.length >= 2 ? records[0].overallScore - records[1].overallScore : 0;

  const stats = [
    {
      icon: Target,
      label: "Total Sessions",
      value: totalSessions.toString(),
      color: "text-primary-500",
      bg: "bg-primary-100",
    },
    {
      icon: Trophy,
      label: "Highest Score",
      value: highestScore.toString(),
      color: "text-warning-500",
      bg: "bg-warning-100",
    },
    {
      icon: Calendar,
      label: "Average Score",
      value: averageScore.toString(),
      color: "text-secondary-500",
      bg: "bg-secondary-100",
    },
    {
      icon: TrendingUp,
      label: "Recent Trend",
      value: recentTrend >= 0 ? `+${recentTrend}` : `${recentTrend}`,
      color: recentTrend >= 0 ? "text-success-500" : "text-error-500",
      bg: recentTrend >= 0 ? "bg-success-100" : "bg-error-100",
    },
  ];

  return (
    <Card className="p-6 border-[1.4px] border-primary-200 max-w-4xl mx-auto bg-white">
      {/* Header - Go back on LEFT, icon + title on RIGHT */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          onClick={onBack}
          className="gap-2 bg-transparent"
        >
          <ArrowLeft className="h-4 w-4" />
          Go back
        </Button>
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold text-foreground text-right">
              Learning Records
            </h1>
            <p className="text-sm text-muted-foreground text-right">
              Track your speaking progress over time
            </p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-primary-100 flex items-center justify-center">
            <History className="h-6 w-6 text-primary-500" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      {totalSessions > 0 && (
        <div className="grid grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-primary-100 bg-card"
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`h-8 w-8 rounded-lg ${stat.bg} flex items-center justify-center`}
                >
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Horizontal Line */}
      <div className="border-t border-primary-200 mb-4" />

      {/* Records List */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto overflow-x-visible px-1 -mx-1 pr-3">
        {records.length > 0 ? (
          records.map((record) => (
            <div
              key={record.id}
              className="relative group"
            >
              <div
                onClick={() => onSelectRecord?.(record.id)}
                className={onSelectRecord ? "cursor-pointer transition-transform duration-150 hover:scale-[1.01] active:scale-[0.99]" : ""}
                role={onSelectRecord ? "button" : undefined}
                tabIndex={onSelectRecord ? 0 : undefined}
                onKeyDown={(e) => {
                  if (onSelectRecord && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    onSelectRecord(record.id);
                  }
                }}
              >
                <LearningRecordCard
                  overallScore={record.overallScore}
                  grammarScore={record.grammarScore}
                  topicScore={record.topicScore}
                  fluencyScore={record.fluencyScore}
                  accuracyScore={record.accuracyScore}
                  prosodyScore={record.prosodyScore}
                  date={record.date}
                />
              </div>
              {/* Delete button — shown on hover */}
              {onDeleteRecord && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPendingDeleteId(record.id);
                  }}
                  title="Delete this session"
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 text-red-400 border border-red-100
                    opacity-0 group-hover:opacity-100 transition-opacity duration-150
                    hover:bg-red-50 hover:text-red-600 shadow-sm z-10"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-16 rounded-xl border border-dashed border-primary-200 bg-primary-50/50">
            <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
              <History className="h-8 w-8 text-primary-400" />
            </div>
            <p className="text-lg font-medium text-foreground mb-1">
              No learning records yet
            </p>
            <p className="text-sm text-muted-foreground">
              Complete a speaking session to see your history
            </p>
          </div>
        )}
      </div>

      {/* Confirm delete */}
      <AlertDialog open={!!pendingDeleteId} onOpenChange={(open) => !open && setPendingDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this session?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the session and all its assessment data. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (pendingDeleteId) {
                  onDeleteRecord?.(pendingDeleteId);
                  setPendingDeleteId(null);
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
