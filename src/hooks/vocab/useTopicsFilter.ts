"use client";

import { useState, useEffect } from "react";
import { getVocabTopicGroups, getVocabTopicsWithProgress } from "@/actions/vocab";
import type { TopicGroup } from "@/components/hub/topic-groups-sidebar";
import { TOPICS_PER_PAGE, type VocabTopic } from "./types";

// ─── Params ────────────────────────────────────────

interface UseTopicsFilterParams {
  userId: string;
}

// ─── Hook ──────────────────────────────────────────

export function useTopicsFilter({ userId }: UseTopicsFilterParams) {
  // Loading states
  const [topicGroupsLoading, setTopicGroupsLoading] = useState(true);
  const [topicsLoading, setTopicsLoading] = useState(true);

  // Data states
  const [topicGroups, setTopicGroups] = useState<TopicGroup[]>([]);
  const [topics, setTopics] = useState<VocabTopic[]>([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTopics, setTotalTopics] = useState(0);

  // Filters
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("All");
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  // Fetch topic groups on mount
  useEffect(() => {
    getVocabTopicGroups()
      .then((groups) => {
        setTopicGroups(groups);
        if (groups.length > 0 && !selectedGroup) {
          setSelectedGroup(groups[0].name);
        }
      })
      .finally(() => setTopicGroupsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch topics when filters change
  useEffect(() => {
    if (!selectedGroup) return;

    setTopicsLoading(true);
    getVocabTopicsWithProgress(userId || undefined, {
      page: currentPage,
      limit: TOPICS_PER_PAGE,
      category: selectedGroup,
      subcategory: selectedSubcategory,
      levels: selectedLevels.length > 0 ? selectedLevels : undefined,
    })
      .then((result) => {
        setTopics(result.topics);
        setTotalPages(result.totalPages);
        setTotalTopics(result.total);
      })
      .finally(() => setTopicsLoading(false));
  }, [userId, selectedGroup, selectedSubcategory, selectedLevels, currentPage]);

  // ── Handlers ──

  const handleGroupChange = (name: string) => {
    setSelectedGroup(name);
    setSelectedSubcategory("All");
    setCurrentPage(1);
  };

  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    setCurrentPage(1);
  };

  const toggleLevel = (level: string) => {
    if (level === "All") {
      const allLevels = ["A1", "A2", "B1", "B2", "C1", "C2"];
      setSelectedLevels((prev) =>
        prev.length === allLevels.length ? [] : allLevels
      );
    } else {
      setSelectedLevels((prev) =>
        prev.includes(level)
          ? prev.filter((l) => l !== level)
          : [...prev, level]
      );
    }
    setCurrentPage(1);
  };

  // ── Derived state ──

  const currentSubcategories =
    topicGroups.find((g) => g.name === selectedGroup)?.subcategories || [];

  return {
    // Loading
    topicGroupsLoading,
    topicsLoading,
    // Data
    topicGroups,
    topics,
    // Pagination
    currentPage,
    setCurrentPage,
    totalPages,
    totalTopics,
    // Filters
    selectedGroup,
    selectedSubcategory,
    selectedLevels,
    currentSubcategories,
    // Handlers
    handleGroupChange,
    handleSubcategoryChange,
    toggleLevel,
  };
}
