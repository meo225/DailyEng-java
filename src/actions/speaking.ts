/**
 * Speaking module API client — calls Spring Boot SpeakingController.
 *
 * Replaces the old Prisma-based server actions with apiClient calls.
 * All functions are plain async functions (no "use server") since they
 * run in the browser and call the backend directly via httpOnly cookies.
 */

import { apiClient } from "@/lib/api-client";

// ======================== Types ========================

export interface TopicGroup {
  id: string;
  name: string;
  subcategories: string[];
}

export interface ScenarioListItem {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  level: string;
  image: string;
  sessionsCompleted: number;
  totalSessions: number;
  progress: number;
  isCustom: boolean;
}

export interface ScenarioListResponse {
  scenarios: ScenarioListItem[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface ScenarioDetail {
  id: string;
  title: string;
  description: string;
  context: string;
  goal: string;
  objectives?: string[];
  userRole?: string;
  botRole?: string;
  openingLine?: string;
  image: string;
}

export interface SessionStartResponse {
  sessionId: string;
  scenarioId: string;
  contextMessage: string;
  greetingMessage: string;
  greetingTurnId: string;
}

export interface SubmitTurnResponse {
  aiResponse: string;
  userTurnId: string;
  aiTurnId: string;
}

export interface CustomScenarioResponse {
  scenario: ScenarioDetail;
  sessionId: string;
}

export interface SpeechMetrics {
  confidenceScores?: number[];
  wordCount?: number;
  speakingDurationMs?: number;
  pauseCount?: number;
  pitchVariance?: number;
  avgPitch?: number;
  pitchSamplesCount?: number;
  // Azure Pronunciation Assessment scores (override client heuristics)
  azureAccuracyScore?: number;
  azureFluencyScore?: number;
  azureProsodyScore?: number;
  azureOverallScore?: number;
}

export interface SessionScores {
  grammar: number;
  relevance: number;
  fluency: number;
  pronunciation: number;
  intonation: number;
  overall: number;
}

export interface ErrorCategory {
  name: string;
  count: number;
}

export interface TurnError {
  word: string;
  correction: string;
  type: string;
  startIndex?: number;
  endIndex?: number;
}

export interface ConversationTurn {
  role: string;
  text: string;
  turnId: string;
  userErrors?: TurnError[];
  pronunciationScore?: number;
  fluencyScore?: number;
}

export interface SessionAnalysisResponse {
  scores: SessionScores;
  errorCategories: ErrorCategory[];
  conversation: ConversationTurn[];
  feedbackTitle: string;
  feedbackSummary: string;
  feedbackRating: string;
  feedbackTip: string;
}

export interface SessionInfo {
  id: string;
  createdAt: string;
  endedAt: string;
  duration?: number;
  overallScore?: number;
  grammarScore?: number;
  relevanceScore?: number;
  fluencyScore?: number;
  pronunciationScore?: number;
  intonationScore?: number;
  feedbackTitle?: string;
  feedbackSummary?: string;
  feedbackRating?: string;
  feedbackTip?: string;
}

export interface SessionDetailResponse {
  session: SessionInfo;
  scores: SessionScores;
  errorCategories: ErrorCategory[];
  conversation: ConversationTurn[];
}

export interface HistoryItem {
  id: string;
  title: string;
  description: string;
  score: number;
  date: string;
  level: string;
  image: string;
  progress: number;
  wordCount: number;
}

export interface HistoryGraphPoint {
  session: number;
  score: number;
}

export interface HistoryResponse {
  historyTopics: HistoryItem[];
  historyGraph: HistoryGraphPoint[];
}

export interface HistorySessionItem {
  id: string;
  scenarioId: string;
  scenarioTitle: string;
  overallScore: number;
  grammarScore: number;
  relevanceScore: number;
  fluencyScore: number;
  pronunciationScore: number;
  intonationScore: number;
  feedbackRating: string;
  createdAt: string;
}

export interface HistorySessionsResponse {
  sessions: HistorySessionItem[];
  totalPages: number;
  totalCount: number;
}

export interface CriteriaAverages {
  relevance: number;
  pronunciation: number;
  intonation: number;
  fluency: number;
  grammar: number;
}

export interface HistoryStatsResponse {
  performanceData: HistoryGraphPoint[];
  criteriaAverages: CriteriaAverages;
  totalSessions: number;
  highestScore: number;
  averageScore: number;
}

export interface LearningRecordItem {
  id: string;
  overallScore: number;
  grammarScore: number;
  relevanceScore: number;
  fluencyScore: number;
  pronunciationScore: number;
  intonationScore: number;
  date: string;
}

// ======================== Topic Groups ========================

export async function getSpeakingTopicGroups(): Promise<TopicGroup[]> {
  return apiClient.get<TopicGroup[]>("/speaking/topic-groups");
}

// ======================== Scenarios ========================

export async function getSpeakingScenariosWithProgress(
  _userId?: string,
  options?: {
    page?: number;
    limit?: number;
    category?: string;
    subcategory?: string;
    levels?: string[];
  }
): Promise<ScenarioListResponse> {
  const params = new URLSearchParams();
  if (options?.page) params.set("page", String(options.page));
  if (options?.limit) params.set("limit", String(options.limit));
  if (options?.category) params.set("category", options.category);
  if (options?.subcategory) params.set("subcategory", options.subcategory);
  if (options?.levels?.length) {
    options.levels.forEach((l) => params.append("levels", l));
  }
  const qs = params.toString();
  return apiClient.get<ScenarioListResponse>(
    `/speaking/scenarios${qs ? `?${qs}` : ""}`
  );
}

export async function searchSpeakingScenarios(
  query: string,
  _userId?: string
): Promise<ScenarioListItem[]> {
  if (!query.trim()) return [];
  return apiClient.get<ScenarioListItem[]>(
    `/speaking/scenarios/search?q=${encodeURIComponent(query)}`
  );
}

export async function getScenarioById(
  id: string
): Promise<ScenarioDetail | null> {
  try {
    return await apiClient.get<ScenarioDetail>(`/speaking/scenarios/${id}`);
  } catch {
    return null;
  }
}

export async function createCustomScenario(
  _userId: string,
  topicPrompt: string
): Promise<CustomScenarioResponse> {
  return apiClient.post<CustomScenarioResponse>("/speaking/scenarios/custom", {
    topicPrompt,
  });
}

export async function createRandomScenario(
  _userId: string
): Promise<CustomScenarioResponse> {
  return apiClient.post<CustomScenarioResponse>("/speaking/scenarios/random");
}

// ======================== Sessions ========================

export async function startSessionWithGreeting(
  _userId: string,
  scenarioId: string
): Promise<SessionStartResponse> {
  return apiClient.post<SessionStartResponse>("/speaking/sessions", {
    scenarioId,
  });
}

// Alias used by some components
export const createSession = startSessionWithGreeting;

export async function submitTurn(
  sessionId: string,
  userText: string,
  audioUrl?: string,
  speechMetrics?: SpeechMetrics
): Promise<SubmitTurnResponse> {
  return apiClient.post<SubmitTurnResponse>(
    `/speaking/sessions/${sessionId}/turns`,
    { userText, audioUrl, speechMetrics }
  );
}

export async function analyzeAndScoreSession(
  sessionId: string
): Promise<SessionAnalysisResponse> {
  return apiClient.post<SessionAnalysisResponse>(
    `/speaking/sessions/${sessionId}/end`
  );
}

export async function getSessionHint(
  sessionId: string
): Promise<string> {
  const result = await apiClient.post<{ hint: string }>(
    `/speaking/sessions/${sessionId}/hint`
  );
  return result.hint;
}

export async function getSessionDetailsById(
  sessionId: string
): Promise<SessionDetailResponse | null> {
  try {
    return await apiClient.get<SessionDetailResponse>(
      `/speaking/sessions/${sessionId}`
    );
  } catch {
    return null;
  }
}

// ======================== History ========================

export async function getUserSpeakingHistory(
  _userId: string
): Promise<HistoryResponse> {
  return apiClient.get<HistoryResponse>("/speaking/history");
}

// Alias
export const getSessionHistory = getUserSpeakingHistory;

export async function getSpeakingHistorySessions(
  _userId: string,
  options?: { page?: number; limit?: number; rating?: string }
): Promise<HistorySessionsResponse> {
  const params = new URLSearchParams();
  if (options?.page) params.set("page", String(options.page));
  if (options?.limit) params.set("limit", String(options.limit));
  if (options?.rating) params.set("rating", options.rating);
  const qs = params.toString();
  return apiClient.get<HistorySessionsResponse>(
    `/speaking/history/sessions${qs ? `?${qs}` : ""}`
  );
}

export async function getSpeakingHistoryStats(
  _userId: string
): Promise<HistoryStatsResponse> {
  return apiClient.get<HistoryStatsResponse>("/speaking/history/stats");
}

// ======================== Custom Topics ========================

export async function getCustomTopics(
  _userId: string
): Promise<ScenarioListItem[]> {
  return apiClient.get<ScenarioListItem[]>("/speaking/custom-topics");
}

// ======================== Learning Records ========================

export async function getLearningRecordsForScenario(
  _userId: string,
  scenarioId: string
): Promise<LearningRecordItem[]> {
  return apiClient.get<LearningRecordItem[]>(
    `/speaking/scenarios/${scenarioId}/records`
  );
}
