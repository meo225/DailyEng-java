import PronunciationAssessmentReview from "@/components/speaking/pronunciation-assessment";
import type { AssessmentData } from "@/components/speaking/pronunciation-assessment";
import type { LoadedSessionData } from "@/hooks/speaking-session/types";
import AnalyzingSpinner from "./AnalyzingSpinner";

interface RecordReviewViewProps {
  isLoading: boolean;
  loadedSessionData: LoadedSessionData | null;
  fromParam: string | null;
  backUrl: string;
  onBack: () => void;
  onRetry: () => void;
  router: { push: (url: string) => void };
  t: (key: string) => string;
}

export default function RecordReviewView({
  isLoading,
  loadedSessionData,
  fromParam,
  backUrl,
  onBack,
  onRetry,
  router,
  t,
}: RecordReviewViewProps) {
  if (isLoading) {
    return (
      <AnalyzingSpinner
        title={t("speaking_session.analyzing.loading_assessment")}
        description={t("speaking_session.analyzing.loading_desc")}
      />
    );
  }

  if (!loadedSessionData) return null;

  const assessmentData = buildRecordAssessmentData(loadedSessionData);

  return (
    <PronunciationAssessmentReview
      data={assessmentData}
      onBack={() => {
        if (fromParam === "history") {
          router.push(backUrl);
          return;
        }
        onBack();
      }}
      onRetry={onRetry}
    />
  );
}

function buildRecordAssessmentData(
  data: LoadedSessionData
): AssessmentData {
  const userConvTurns = data.conversation.filter((c) => c.role === "user");

  return {
    turns: userConvTurns.map((c) => ({
      text: c.text,
      words: (c.wordAssessments ?? []).map((w) => ({
        word: w.word,
        accuracyScore: w.accuracyScore,
        errorType: w.errorType ?? "None",
        phonemes: w.phonemes,
        syllables: w.syllables,
      })),
      accuracyScore: c.accuracyScore ?? data.scores.accuracy,
      fluencyScore: c.fluencyScore ?? data.scores.fluency,
      prosodyScore: data.scores.prosody,
      overallScore: c.accuracyScore ?? data.scores.accuracy,
    })),
    fullText: userConvTurns.map((c) => c.text).join(" "),
    pronunciationScore: data.scores.accuracy,
    accuracyScore: data.scores.accuracy,
    fluencyScore: data.scores.fluency,
    prosodyScore: data.scores.prosody,
    contentScore: Math.round(
      (data.scores.grammar + data.scores.topic) / 2
    ),
    grammarScore: data.scores.grammar,
    relevanceScore: data.scores.topic,
    vocabularyScore: data.scores.grammar,
  };
}
