/**
 * Bookmark module API client — calls Spring Boot BookmarkController.
 *
 * Replaces the old Prisma-based server actions with apiClient calls.
 * All functions are plain async functions (no "use server") since they
 * run in the browser and call the backend directly via httpOnly cookies.
 */

import { apiClient } from "@/lib/api-client";

// ======================== Types ========================

interface BookmarkItem {
  id: string;
  topicId: string;
  title: string;
  description: string;
  level: string;
  image: string | null;
  category: string | null;
  createdAt: string | null;
}

// ============================================
// VOCABULARY BOOKMARKS
// ============================================

export async function toggleVocabBookmark(
  _userId: string,
  topicId: string
): Promise<{ bookmarked: boolean }> {
  return apiClient.post<{ bookmarked: boolean }>("/bookmarks/vocab/toggle", {
    topicId,
  });
}

export async function getVocabBookmarks(
  _userId: string,
  _page: number = 1,
  _limit: number = 8
): Promise<{
  bookmarks: BookmarkItem[];
  bookmarkIds: string[];
  total: number;
  totalPages: number;
  currentPage: number;
}> {
  const bookmarks = await apiClient.get<BookmarkItem[]>("/bookmarks/vocab");
  const bookmarkIds = bookmarks.map((b) => b.topicId);
  return {
    bookmarks,
    bookmarkIds,
    total: bookmarks.length,
    totalPages: 1,
    currentPage: 1,
  };
}

export async function getVocabBookmarkIds(_userId: string): Promise<string[]> {
  return apiClient.get<string[]>("/bookmarks/vocab/ids");
}

// ============================================
// GRAMMAR BOOKMARKS
// ============================================

export async function toggleGrammarBookmark(
  _userId: string,
  topicId: string
): Promise<{ bookmarked: boolean }> {
  return apiClient.post<{ bookmarked: boolean }>("/bookmarks/grammar/toggle", {
    topicId,
  });
}

export async function getGrammarBookmarks(
  _userId: string,
  _page: number = 1,
  _limit: number = 8
): Promise<{
  bookmarks: BookmarkItem[];
  bookmarkIds: string[];
  total: number;
  totalPages: number;
  currentPage: number;
}> {
  const bookmarks = await apiClient.get<BookmarkItem[]>("/bookmarks/grammar");
  const bookmarkIds = bookmarks.map((b) => b.topicId);
  return {
    bookmarks,
    bookmarkIds,
    total: bookmarks.length,
    totalPages: 1,
    currentPage: 1,
  };
}

export async function getGrammarBookmarkIds(
  _userId: string
): Promise<string[]> {
  return apiClient.get<string[]>("/bookmarks/grammar/ids");
}
