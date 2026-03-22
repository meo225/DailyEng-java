/**
 * Topic Groups API client — calls Spring Boot controllers.
 *
 * Replaces the old Prisma-based server actions with apiClient calls.
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

interface Topic {
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
  topicGroupId: string | null;
}

// ======================== Actions ========================

/**
 * Get all topic groups for a specific hub type (speaking, grammar, or vocab)
 */
export async function getTopicGroups(hubType: string): Promise<TopicGroup[]> {
  // Each hub has its own controller with /topic-groups
  return apiClient.get<TopicGroup[]>(`/${hubType}/topic-groups`);
}

/**
 * Get grammar topics by group name and optional subcategory
 */
export async function getGrammarTopicsByGroup(
  groupName: string,
  subcategory?: string
): Promise<Topic[]> {
  const params = new URLSearchParams({ groupName });
  if (subcategory) params.append("subcategory", subcategory);
  return apiClient.get<Topic[]>(`/grammar/topics?${params.toString()}`);
}
