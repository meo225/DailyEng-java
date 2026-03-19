import { DetailedFeedback } from "@/components/speaking/detailed-feedback";
import type { DetailedFeedbackData, DetailedFeedbackScore, AnalysisResult } from "@/hooks/speaking-session/types";
import AnalyzingSpinner from "./AnalyzingSpinner";
import { buildScoresWithIcons } from "@/lib/speaking-session-utils";

interface DetailViewProps {
  isLoading: boolean;
  feedbackToUse: DetailedFeedbackData;
  analysisResult: AnalysisResult | null;
  selectedRecordId: string | null;
  fromParam: string | null;
  backUrl: string;
  onBack: () => void;
  router: { push: (url: string) => void };
  t: (key: string) => string;
}

export default function DetailView({
  isLoading,
  feedbackToUse,
  analysisResult,
  selectedRecordId,
  fromParam,
  backUrl,
  onBack,
  router,
  t,
}: DetailViewProps) {
  if (isLoading) {
    return (
      <AnalyzingSpinner
        title={t("speaking_session.analyzing.title")}
        description={t("speaking_session.analyzing.desc")}
      />
    );
  }

  const overallScore =
    analysisResult?.scores.overall ||
    Math.round(
      feedbackToUse.scores.reduce((sum, s) => sum + s.value, 0) /
        feedbackToUse.scores.length
    );

  const scoresWithIcons = buildScoresWithIcons(feedbackToUse.scores);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
      <DetailedFeedback
        scores={scoresWithIcons}
        errorCategories={feedbackToUse.errorCategories}
        conversation={feedbackToUse.conversation}
        overallRating={feedbackToUse.overallRating}
        overallScore={overallScore}
        tip={feedbackToUse.tip}
        onBack={() => {
          if (fromParam === "history" && selectedRecordId) {
            router.push(backUrl);
            return;
          }
          onBack();
        }}
      />
    </div>
  );
}
