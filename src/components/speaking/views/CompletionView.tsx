import PronunciationAssessmentReview from "@/components/speaking/pronunciation-assessment";
import type { AssessmentData } from "@/components/speaking/pronunciation-assessment";

interface CompletionViewProps {
  assessmentData: AssessmentData;
  sessionMode?: "scripted" | "unscripted";
  language?: string;
  backUrl: string;
  onRetry: () => void;
  router: { push: (url: string) => void };
}

export default function CompletionView({
  assessmentData,
  sessionMode,
  language,
  backUrl,
  onRetry,
  router,
}: CompletionViewProps) {
  return (
    <PronunciationAssessmentReview
      data={assessmentData}
      mode={sessionMode}
      language={language}
      onBack={() => router.push(backUrl)}
      onRetry={onRetry}
    />
  );
}
