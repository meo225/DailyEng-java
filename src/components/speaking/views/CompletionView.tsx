import PronunciationAssessmentReview from "@/components/speaking/pronunciation-assessment";
import type { AssessmentData } from "@/components/speaking/pronunciation-assessment";

interface CompletionViewProps {
  assessmentData: AssessmentData;
  sessionMode?: "scripted" | "unscripted";
  backUrl: string;
  onRetry: () => void;
  router: { push: (url: string) => void };
}

export default function CompletionView({
  assessmentData,
  sessionMode,
  backUrl,
  onRetry,
  router,
}: CompletionViewProps) {
  return (
    <PronunciationAssessmentReview
      data={assessmentData}
      mode={sessionMode}
      onBack={() => router.push(backUrl)}
      onRetry={onRetry}
    />
  );
}
