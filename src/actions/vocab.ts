/**
 * Vocab module API client — calls Spring Boot VocabController.
 *
 * Endpoints:
 *   GET /vocab/topic-groups              → getVocabTopicGroups()
 *   GET /vocab/topics                    → getVocabTopicsWithProgress()
 *   GET /vocab/topics/search?q=          → searchVocabTopics()
 *   GET /vocab/topics/{topicId}          → getVocabTopicById()
 */

import { apiClient } from "@/lib/api-client";

// ======================== Types ========================

interface TopicGroup {
  id: string;
  name: string;
  order: number;
  hubType: string;
  subcategories: string[];
}

interface VocabTopic {
  id: string;
  title: string;
  subtitle: string | null;
  description: string;
  level: string;
  wordCount: number;
  estimatedTime: number;
  thumbnail: string | null;
  category: string | null;
  subcategory: string | null;
  order: number;
  progress?: number;
}

interface VocabTopicListResponse {
  topics: VocabTopic[];
  total: number;
  totalPages: number;
  currentPage: number;
}

interface VocabItem {
  id: string;
  word: string;
  phonBr: string | null;
  phonNAm: string | null;
  meaning: string[];
  vietnamese: string[];
  partOfSpeech: string | null;
  level: string | null;
  synonyms: string[];
  antonyms: string[];
  exampleSentence: string | null;
  exampleTranslation: string | null;
}

interface VocabTopicDetail {
  id: string;
  title: string;
  subtitle: string | null;
  description: string;
  level: string;
  wordCount: number;
  estimatedTime: number;
  thumbnail: string | null;
  category: string | null;
  subcategory: string | null;
  vocab: VocabItem[];
}

// ======================== Actions ========================

/**
 * Fetch all vocab topic groups.
 */
export async function getVocabTopicGroups(): Promise<TopicGroup[]> {
  return apiClient.get<TopicGroup[]>("/vocab/topic-groups");
}

/**
 * Fetch vocab topics with optional filters and pagination.
 */
export async function getVocabTopicsWithProgress(
  _userId?: string,
  options?: {
    page?: number;
    limit?: number;
    category?: string;
    subcategory?: string;
    levels?: string[];
  }
): Promise<VocabTopicListResponse> {
  const params = new URLSearchParams();
  if (options?.page) params.append("page", String(options.page));
  if (options?.limit) params.append("limit", String(options.limit));
  if (options?.category) params.append("category", options.category);
  if (options?.subcategory && options.subcategory !== "All") {
    params.append("subcategory", options.subcategory);
  }
  if (options?.levels?.length) {
    for (const level of options.levels) {
      params.append("levels", level);
    }
  }
  const qs = params.toString();
  return apiClient.get<VocabTopicListResponse>(
    `/vocab/topics${qs ? `?${qs}` : ""}`
  );
}

/**
 * Search vocab topics by query string.
 */
export async function searchVocabTopics(
  query: string,
  _userId?: string
): Promise<VocabTopic[]> {
  return apiClient.get<VocabTopic[]>(
    `/vocab/topics/search?q=${encodeURIComponent(query)}`
  );
}

/**
 * Fetch a single vocab topic by ID with its vocab items.
 */
export async function getVocabTopicById(
  topicId: string,
  _userId?: string
): Promise<VocabTopicDetail | null> {
  try {
    return await apiClient.get<VocabTopicDetail>(`/vocab/topics/${topicId}`);
  } catch {
    return null;
  }
}
