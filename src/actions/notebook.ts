/**
 * Notebook module API client — calls Spring Boot NotebookController.
 *
 * Replaces the old Prisma-based server actions with apiClient calls.
 * All functions are plain async functions (no "use server") since they
 * run in the browser and call the backend directly via httpOnly cookies.
 *
 * Dictionary search functions remain as server actions using Prisma
 * since they don't have backend endpoints yet.
 */

import { apiClient } from "@/lib/api-client";

// ======================== Types ========================

export type NotebookData = {
  id: string;
  name: string;
  type: string;
  color: string;
  count: number;
  mastered: number;
};

export type NotebookItemData = {
  id: string;
  word: string;
  pronunciation: string | null;
  meaning: string[];
  vietnamese: string[];
  examples: { en: string; vi: string }[];
  partOfSpeech: string | null;
  level: string | null;
  note: string | null;
  tags: string[];
  notebookId: string;
  masteryLevel: number;
  isStarred?: boolean;
  lastReviewed: string | null;
  nextReview: string | null;
  createdAt?: string | null;
};

interface NotebookListResponse {
  notebooks: {
    id: string;
    name: string;
    type: string;
    color: string;
    itemCount: number;
    masteredCount: number;
  }[];
  total: number;
}

// ======================== Notebooks ========================

export async function getNotebooks(): Promise<NotebookData[]> {
  try {
    const response = await apiClient.get<NotebookListResponse>("/notebooks");
    return response.notebooks.map((nb) => ({
      id: nb.id,
      name: nb.name,
      type: nb.type,
      color: nb.color,
      count: nb.itemCount,
      mastered: nb.masteredCount,
    }));
  } catch {
    return [];
  }
}

export async function createNotebook(data: {
  name: string;
  type: string;
  color?: string;
}): Promise<{ success: boolean; error?: string; notebook?: NotebookData }> {
  try {
    const result = await apiClient.post<{
      id: string;
      name: string;
      type: string;
      color: string;
      itemCount: number;
      masteredCount: number;
    }>("/notebooks", data);
    return {
      success: true,
      notebook: {
        id: result.id,
        name: result.name,
        type: result.type,
        color: result.color,
        count: result.itemCount,
        mastered: result.masteredCount,
      },
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to create notebook";
    return { success: false, error: message };
  }
}

export async function deleteNotebook(
  notebookId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await apiClient.delete(`/notebooks/${notebookId}`);
    return { success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to delete notebook";
    return { success: false, error: message };
  }
}

export async function updateNotebook(
  notebookId: string,
  data: { name?: string; color?: string }
): Promise<{ success: boolean; error?: string }> {
  try {
    await apiClient.put(`/notebooks/${notebookId}`, data);
    return { success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to update notebook";
    return { success: false, error: message };
  }
}

// ======================== Notebook Items ========================

export async function getNotebookItems(
  notebookId: string
): Promise<NotebookItemData[]> {
  try {
    return await apiClient.get<NotebookItemData[]>(
      `/notebooks/${notebookId}/items`
    );
  } catch {
    return [];
  }
}

export async function createNotebookItem(data: {
  notebookId: string;
  word: string;
  pronunciation?: string;
  meaning: string[];
  vietnamese: string[];
  examples: { en: string; vi: string }[];
  partOfSpeech?: string;
  level?: string;
  note?: string;
  tags?: string[];
}): Promise<{ success: boolean; error?: string; item?: NotebookItemData }> {
  try {
    const item = await apiClient.post<NotebookItemData>("/notebooks/items", data);
    return { success: true, item };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to create item";
    return { success: false, error: message };
  }
}

export async function deleteNotebookItem(
  itemId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await apiClient.delete(`/notebooks/items/${itemId}`);
    return { success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to delete item";
    return { success: false, error: message };
  }
}

export async function updateNotebookItemMastery(
  itemId: string,
  masteryLevel: number
): Promise<{ success: boolean; error?: string }> {
  try {
    await apiClient.patch(`/notebooks/items/${itemId}/mastery`, { masteryLevel });
    return { success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to update mastery";
    return { success: false, error: message };
  }
}

// ======================== Cache Helpers ========================

// No-op since caching is now handled by the backend
export async function revalidateNotebookCache(): Promise<void> { }

// ======================== Dictionary Search ========================
// These remain as server-action-compatible functions using Prisma
// since the backend doesn't have dictionary search endpoints yet.

export type DictionaryWordResult = {
  id: string;
  word: string;
  pronunciation: string | null;
  meaning: string;
  vietnameseMeaning: string;
  partOfSpeech: string;
  level: string;
  exampleSentence: string;
  exampleTranslation: string;
};

export type DictionaryGrammarResult = {
  id: string;
  title: string;
  explanation: string;
  examples: { en: string; vi: string }[];
  level: string;
  category: string;
};

// Temporarily keep these as API calls that will need backend endpoints
// For now, return empty results since Prisma calls from client-side won't work  
export async function searchDictionaryWords(
  query: string,
  limit: number = 10
): Promise<DictionaryWordResult[]> {
  if (!query.trim() || query.length < 2) return [];
  try {
    const response = await apiClient.get<{ results: DictionaryWordResult[]; total: number }>(
      `/dictionary/words/search?q=${encodeURIComponent(query.trim())}&limit=${limit}`
    );
    return response.results;
  } catch {
    console.warn("[notebook] searchDictionaryWords: backend call failed");
    return [];
  }
}

export async function searchDictionaryGrammar(
  query: string,
  limit: number = 10
): Promise<DictionaryGrammarResult[]> {
  if (!query.trim() || query.length < 2) return [];
  try {
    const response = await apiClient.get<{ results: DictionaryGrammarResult[]; total: number }>(
      `/dictionary/grammar/search?q=${encodeURIComponent(query.trim())}&limit=${limit}`
    );
    return response.results;
  } catch {
    console.warn("[notebook] searchDictionaryGrammar: backend call failed");
    return [];
  }
}

