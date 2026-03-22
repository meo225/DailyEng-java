/**
 * SRS (Spaced Repetition System) API client — calls Spring Boot SrsController.
 *
 * Endpoints:
 *   POST /srs/review          → submit a vocab review (rating 1-4)
 *   GET  /srs/due             → items due for review
 *   GET  /srs/stats           → review statistics
 *   GET  /srs/session/:topic  → study session (due + new items)
 *   POST /srs/optimize        → trigger ML weight optimization
 */

import { apiClient } from "@/lib/api-client";

// ======================== Types ========================

export interface ReviewRequest {
  vocabItemId: string;
  rating: 1 | 2 | 3 | 4; // 1=Again, 2=Hard, 3=Good, 4=Easy
}

export interface ReviewResponse {
  nextReviewDate: string;
  intervalDays: number;
  stability: number;
  difficulty: number;
  retrievability: number;
  masteryLevel: number;
  srsState: string;
  xpAwarded: number;
}

export interface DueItem {
  vocabItemId: string;
  word: string;
  meaning: string;
  pronunciation: string;
  partOfSpeech: string;
  exampleSentence: string;
  retrievability: number;
  daysSinceReview: number;
  masteryLevel: number;
  srsState: string;
}

export interface ReviewStats {
  dueToday: number;
  dueThisWeek: number;
  totalReviewed: number;
  masteredCount: number;
  retentionRate: number;
  newCount: number;
}

export interface StudySession {
  items: DueItem[];
  newCount: number;
  reviewCount: number;
  totalCount: number;
}

export interface OptimizeResult {
  optimized: boolean;
  weights?: number[];
  message: string;
}

// ======================== API Functions ========================

/** Submit a vocab review with FSRS rating (1-4). */
export async function reviewVocabItem(
  vocabItemId: string,
  rating: 1 | 2 | 3 | 4
): Promise<ReviewResponse> {
  return apiClient.post<ReviewResponse>("/srs/review", { vocabItemId, rating });
}

/** Get items due for review, sorted by urgency (lowest retrievability first). */
export async function getDueItems(limit: number = 20): Promise<DueItem[]> {
  return apiClient.get<DueItem[]>(`/srs/due?limit=${limit}`);
}

/** Get review statistics overview. */
export async function getReviewStats(): Promise<ReviewStats> {
  return apiClient.get<ReviewStats>("/srs/stats");
}

/** Get a study session mixing due + new items for a specific topic. */
export async function getStudySession(
  topicId: string,
  limit: number = 20
): Promise<StudySession> {
  return apiClient.get<StudySession>(`/srs/session/${topicId}?limit=${limit}`);
}

/**
 * Trigger ML weight optimization from review history.
 * Requires 100+ reviews. Runs gradient descent to learn
 * personalized FSRS weights for the current user.
 */
export async function optimizeFsrsWeights(): Promise<OptimizeResult> {
  return apiClient.post<OptimizeResult>("/srs/optimize", {});
}
