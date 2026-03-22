/**
 * XP System API client — calls Spring Boot XpController.
 *
 * Endpoints:
 *   GET  /xp/stats        → user's XP overview (level, streak, scores)
 *   GET  /xp/history      → daily activity history
 *   GET  /xp/leaderboard  → ranked leaderboard
 */

import { apiClient } from "@/lib/api-client";

// ======================== Types ========================

export interface XpStats {
  totalXp: number;
  level: number;
  xpForCurrentLevel: number;
  xpForNextLevel: number;
  streak: number;
  coins: number;
  vocabScore: number;
  grammarScore: number;
  speakingScore: number;
  listeningScore: number;
  readingScore: number;
  writingScore: number;
  badges: string[];
}

export interface ActivityDay {
  date: string;
  xpEarned: number;
  lessonsCount: number;
  minutesSpent: number;
  wordsLearned: number;
}

export interface ActivityHistory {
  days: ActivityDay[];
  totalXp: number;
  totalDays: number;
}

export interface LeaderboardItem {
  rank: number;
  userId: string;
  userName: string;
  userImage: string | null;
  xp: number;
}

export interface LeaderboardData {
  entries: LeaderboardItem[];
  currentUser: LeaderboardItem | null;
  period: string;
  type: string;
}

// ======================== API Functions ========================

/**
 * Fetch the current user's XP stats overview.
 */
export async function getXpStats(): Promise<XpStats> {
  return apiClient.get<XpStats>("/xp/stats");
}

/**
 * Fetch daily activity history for the past N days.
 */
export async function getActivityHistory(
  days: number = 365
): Promise<ActivityHistory> {
  return apiClient.get<ActivityHistory>(`/xp/history?days=${days}`);
}

/**
 * Fetch leaderboard rankings.
 */
export async function getLeaderboard(
  period: string = "weekly",
  type: string = "xp",
  limit: number = 20
): Promise<LeaderboardData> {
  return apiClient.get<LeaderboardData>(
    `/xp/leaderboard?period=${period}&type=${type}&limit=${limit}`
  );
}
