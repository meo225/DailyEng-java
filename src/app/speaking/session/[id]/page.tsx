import SpeakingSessionClient from "@/components/page/SpeakingSessionClient";
import type {
  InitialTurn,
  DetailedFeedbackData,
  LearningRecord,
} from "@/components/page/SpeakingSessionClient";
import {
  getScenarioById,
} from "@/actions/speaking";

// Mock data for fallback or initial props
const mockDetailedFeedback: DetailedFeedbackData = {
  scores: [
    { label: "Relevance", value: 0 },
    { label: "Pronunciation", value: 0 },
    { label: "Intonation & Stress", value: 0 },
    { label: "Fluency", value: 0 },
    { label: "Grammar", value: 0 },
  ],
  errorCategories: [],
  conversation: [],
  overallRating: "N/A",
  tip: "Start speaking to get feedback!",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SpeakingSessionPage({ params }: PageProps) {
  const { id } = await params;

  // Fetch real scenario from database (public data, no auth needed)
  const scenario = await getScenarioById(id);
  const initialTurns: InitialTurn[] = [];

  // Learning records will be fetched client-side using userId from useAuth()
  // Server-side auth() can't read cross-origin httpOnly cookies

  return (
    <SpeakingSessionClient
      scenario={scenario}
      initialTurns={initialTurns}
      learningRecords={[]}
      detailedFeedback={mockDetailedFeedback}
      scenarioId={scenario ? scenario.id : id}
    />
  );
}
