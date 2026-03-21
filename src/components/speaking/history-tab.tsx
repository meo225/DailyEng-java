import { useState } from "react";
import dynamic from "next/dynamic";
import { BarChart3, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadarChart } from "@/components/speaking/radar-chart";
import { LearningRecordCard } from "@/components/speaking/learning-record-card";
import { Pagination } from "./pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { HistorySession, HistoryStats } from "@/hooks/speaking/types";
import { useTranslation } from "@/hooks/use-translation";

// Recharts is ~300KB — lazy-load the chart component
const PerformanceChart = dynamic(() => import("./performance-chart"), {
  ssr: false,
  loading: () => {
    // Cannot easily use hook inside loading, fallback is fine
    return (
      <Card className="p-6 rounded-3xl border-2 border-primary-100 bg-white">
        <h3 className="text-lg font-bold mb-4">Performance Overview</h3>
        <div className="animate-pulse h-64 flex flex-col justify-end gap-2">
        <div className="flex items-end gap-1 h-48">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-primary-100 rounded-t"
              style={{ height: `${30 + Math.random() * 60}%` }}
            />
          ))}
        </div>
        <div className="h-4 bg-gray-200 rounded w-full" />
      </div>
    </Card>
    );
  },
});

// ─── Types ─────────────────────────────────────────

interface HistoryTabProps {
  historySessions: HistorySession[];
  historyStats: HistoryStats | null;
  historyLoading: boolean;
  historyStatsLoading: boolean;
  historyPage: number;
  historyTotalPages: number;
  historyRatingFilter: string | null;
  onPageChange: (page: number) => void;
  onRatingFilterChange: (rating: string | null) => void;
  onSessionClick: (scenarioId: string, sessionId: string) => void;
  onDeleteSession?: (sessionId: string) => void;
}

const RATING_FILTERS = [
  { value: null, translationKey: "all" },
  { value: "Excellent", translationKey: "excellent" },
  { value: "Good", translationKey: "good" },
  { value: "Average", translationKey: "average" },
  { value: "Needs Improvement", translationKey: "needs_work" },
] as const;

// ─── Component ─────────────────────────────────────

export function HistoryTab({
  historySessions,
  historyStats,
  historyLoading,
  historyStatsLoading,
  historyPage,
  historyTotalPages,
  historyRatingFilter,
  onPageChange,
  onRatingFilterChange,
  onSessionClick,
  onDeleteSession,
}: HistoryTabProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        <PerformanceChart
          data={historyStats?.performanceData ?? []}
          isLoading={historyStatsLoading}
        />
        <CriteriaRadarChart
          stats={historyStats}
          isLoading={historyStatsLoading}
        />
      </div>

      {/* Session History */}
      <Card className="p-6 rounded-3xl border-2 border-primary-100 bg-white">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold">{t("speaking_hub.history.session_history")}</h3>
          <div className="flex gap-2 flex-wrap">
            {RATING_FILTERS.map((filter) => (
              <Button
                key={filter.translationKey}
                variant={
                  historyRatingFilter === filter.value ? "default" : "outline"
                }
                size="sm"
                onClick={() => {
                  onRatingFilterChange(filter.value);
                  onPageChange(1);
                }}
                disabled={historyRatingFilter === filter.value}
                className="cursor-pointer"
              >
                {t(`speaking_hub.history.filters.${filter.translationKey}`)}
              </Button>
            ))}
          </div>
        </div>

        <SessionList
          sessions={historySessions}
          isLoading={historyLoading}
          ratingFilter={historyRatingFilter}
          onSessionClick={onSessionClick}
          onDeleteSession={onDeleteSession}
        />

        <Pagination
          currentPage={historyPage}
          totalPages={historyTotalPages}
          onPageChange={onPageChange}
          variant="simple"
        />
      </Card>
    </div>
  );
}


// ─── Sub-components ────────────────────────────────


function CriteriaRadarChart({
  stats,
  isLoading,
}: {
  stats: HistoryStats | null;
  isLoading: boolean;
}) {
  const { t } = useTranslation();

  return (
    <Card className="p-6 rounded-3xl border-2 border-primary-100 bg-white">
      <h3 className="text-lg font-bold mb-4">{t("speaking_hub.history.criteria_score")}</h3>
      <div className="h-64 w-full flex items-center justify-center">
        {isLoading ? (
          <div className="animate-pulse w-48 h-48 rounded-full bg-primary-100" />
        ) : stats && stats.totalSessions > 0 ? (
          <RadarChart
            data={[
              { label: t("speaking_hub.history.criteria.accuracy"), value: stats.criteriaAverages.accuracy, hint: "How correctly each sound is pronounced" },
              { label: t("speaking_hub.history.criteria.fluency"), value: stats.criteriaAverages.fluency, hint: "Smoothness and natural pace of speech" },
              { label: t("speaking_hub.history.criteria.prosody"), value: stats.criteriaAverages.prosody, hint: "Intonation, stress, and rhythm patterns" },
              { label: t("speaking_hub.history.criteria.grammar"), value: stats.criteriaAverages.grammar, hint: "Correctness of sentence structure" },
              { label: t("speaking_hub.history.criteria.topic"), value: stats.criteriaAverages.topic, hint: "How well responses fit the scenario" },
              { label: "Vocabulary", value: stats.criteriaAverages.vocabulary, hint: "Range and appropriateness of words used" },
            ]}
            size={300}
          />
        ) : (
          <div className="text-muted-foreground">No session data yet</div>
        )}
      </div>
    </Card>
  );
}

function SessionList({
  sessions,
  isLoading,
  ratingFilter,
  onSessionClick,
  onDeleteSession,
}: {
  sessions: HistorySession[];
  isLoading: boolean;
  ratingFilter: string | null;
  onSessionClick: (scenarioId: string, sessionId: string) => void;
  onDeleteSession?: (sessionId: string) => void;
}) {
  const { t } = useTranslation();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-3 mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse p-4 rounded-xl border border-primary-200 bg-card"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary-100" />
              <div className="flex-1 flex justify-evenly">
                {Array.from({ length: 5 }).map((_, j) => (
                  <div key={j} className="flex flex-col items-center gap-1">
                    <div className="w-4 h-4 bg-gray-200 rounded" />
                    <div className="w-6 h-4 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
              <div className="text-right">
                <div className="w-20 h-4 bg-gray-200 rounded mb-1" />
                <div className="w-16 h-3 bg-gray-100 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="space-y-3 mb-6">
        <div className="text-center py-16 rounded-xl border border-dashed border-primary-200 bg-primary-50/50">
          <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
            <BarChart3 className="h-8 w-8 text-primary-400" />
          </div>
          <p className="text-lg font-medium text-foreground mb-1">
            {t("speaking_hub.history.no_sessions")}
          </p>
          <p className="text-sm text-muted-foreground">
            {ratingFilter
              ? t("speaking_hub.history.no_sessions_filter").replace("{rating}", String(RATING_FILTERS.find(f => f.value === ratingFilter)?.translationKey ? t(`speaking_hub.history.filters.${RATING_FILTERS.find(f => f.value === ratingFilter)?.translationKey}`) : ratingFilter))
              : t("speaking_hub.history.no_sessions_desc")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3 mb-6">
        {sessions.map((session) => (
          <div key={session.id} className="relative group">
            <div
              className="cursor-pointer"
              onClick={() => onSessionClick(session.scenarioId, session.id)}
            >
              <div className="text-xs text-muted-foreground mb-1 pl-1">
                {session.scenarioTitle}
              </div>
              <LearningRecordCard
                overallScore={session.overallScore}
                grammarScore={session.grammarScore}
                topicScore={session.topicScore}
                fluencyScore={session.fluencyScore}
                accuracyScore={session.accuracyScore}
                prosodyScore={session.prosodyScore}
                vocabularyScore={session.vocabularyScore}
                date={session.createdAt}
              />
            </div>
            {onDeleteSession && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPendingDeleteId(session.id);
                }}
                title="Delete this session"
                className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 text-red-400 border border-red-100
                  opacity-0 group-hover:opacity-100 transition-opacity duration-150
                  hover:bg-red-50 hover:text-red-600 shadow-sm cursor-pointer z-10"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Confirm delete dialog */}
      <AlertDialog open={!!pendingDeleteId} onOpenChange={(open) => !open && setPendingDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this session?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the session and all its data. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (pendingDeleteId) {
                  onDeleteSession?.(pendingDeleteId);
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
    </>
  );
}
