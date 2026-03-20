// ─── Shared types for speaking hooks ────────────────

export interface Scenario {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  image: string;
  sessionsCompleted: number;
  totalSessions: number;
  progress: number;
  isCustom?: boolean;
  subcategory?: string;
}

export interface CriteriaItem {
  title: string;
  score: number;
}

export interface HistorySession {
  id: string;
  scenarioId: string;
  scenarioTitle: string;
  overallScore: number;
  grammarScore: number;
  topicScore: number;
  fluencyScore: number;
  accuracyScore: number;
  prosodyScore: number;
  feedbackRating: string;
  createdAt: Date;
}

export interface HistoryStats {
  performanceData: { session: number; score: number }[];
  criteriaAverages: {
    topic: number;
    accuracy: number;
    prosody: number;
    fluency: number;
    grammar: number;
  };
  totalSessions: number;
  highestScore: number;
  averageScore: number;
}

export type TabType = "available" | "custom" | "history" | "bookmarks";

// ─── Helpers ───────────────────────────────────────

export function mapDbScenarioToScenario(dbScenario: {
  id: string;
  title: string;
  description: string;
  category: string | null;
  difficulty: string | null;
  image: string | null;
  isCustom: boolean;
  subcategory: string | null;
}): Scenario {
  return {
    id: dbScenario.id,
    title: dbScenario.title,
    description: dbScenario.description,
    category: dbScenario.category || "Daily Life",
    level: dbScenario.difficulty || "A2",
    image: dbScenario.image || "/learning.png",
    sessionsCompleted: 0,
    totalSessions: 10,
    progress: 0,
    isCustom: dbScenario.isCustom,
    subcategory: dbScenario.subcategory || undefined,
  };
}
