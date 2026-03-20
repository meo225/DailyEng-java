import { Card } from "@/components/ui/card";
import { LearningHistory } from "@/components/speaking/learning-history";
import type { LearningRecord } from "@/hooks/speaking-session/types";

interface HistoryViewProps {
  isLoading: boolean;
  records: LearningRecord[];
  onBack: () => void;
  onSelectRecord: (recordId: string) => void;
  onDeleteRecord?: (recordId: string) => void;
}

export default function HistoryView({
  isLoading,
  records,
  onBack,
  onSelectRecord,
  onDeleteRecord,
}: HistoryViewProps) {
  if (isLoading) {
    return <HistoryLoadingSkeleton />;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <LearningHistory
        records={records}
        onBack={onBack}
        onSelectRecord={onSelectRecord}
        onDeleteRecord={onDeleteRecord}
      />
    </div>
  );
}

function HistoryLoadingSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <Card className="p-6 border-[1.4px] border-primary-200 max-w-4xl mx-auto bg-white">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary-100 animate-pulse" />
            <div>
              <div className="h-7 w-48 bg-muted rounded animate-pulse mb-2" />
              <div className="h-4 w-64 bg-muted rounded animate-pulse" />
            </div>
          </div>
          <div className="h-10 w-24 bg-muted rounded animate-pulse" />
        </div>
        {/* Stats Skeleton */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-primary-100 bg-card"
            >
              <div className="h-8 w-8 rounded-lg bg-muted animate-pulse mb-2" />
              <div className="h-8 w-12 bg-muted rounded animate-pulse mb-1" />
              <div className="h-3 w-20 bg-muted rounded animate-pulse" />
            </div>
          ))}
        </div>
        {/* Section Title Skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 w-32 bg-muted rounded animate-pulse" />
          <div className="h-4 w-20 bg-muted rounded animate-pulse" />
        </div>
        {/* Records List Skeleton */}
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-primary-100 bg-card"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />
                  <div>
                    <div className="h-5 w-24 bg-muted rounded animate-pulse mb-2" />
                    <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                  </div>
                </div>
                <div className="h-8 w-16 bg-muted rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
