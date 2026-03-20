"use client";
import { useState, useEffect, useRef } from "react";
import type { TopicGroup } from "@/components/hub/topic-groups-sidebar";
import {
  getSpeakingScenariosWithProgress,
  getSpeakingTopicGroups,
  getSpeakingBookmarkIds,
} from "@/actions/speaking";
import type { Scenario } from "./types";

// ─── Constants ─────────────────────────────────────

const SCENARIOS_PER_PAGE = 12;

// ─── Hook ──────────────────────────────────────────

interface UseScenariosFilterParams {
  initialTopicGroups: TopicGroup[];
  userId: string | undefined;
  activeTab: string;
  isSearchMode: boolean;
  onBookmarkIdsLoaded: (ids: string[]) => void;
}

export function useScenariosFilter({
  initialTopicGroups,
  userId,
  activeTab,
  isSearchMode,
  onBookmarkIdsLoaded,
}: UseScenariosFilterParams) {
  // ── Topic groups ──
  const [topicGroups, setTopicGroups] =
    useState<TopicGroup[]>(initialTopicGroups);
  const [topicGroupsLoading, setTopicGroupsLoading] = useState(
    initialTopicGroups.length === 0
  );

  // ── Scenarios ──
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [scenarioPage, setScenarioPage] = useState(1);
  const [scenarioTotalPages, setScenarioTotalPages] = useState(1);
  const [scenariosLoading, setScenariosLoading] = useState(true);

  // ── Filters ──
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>("Daily Life");
  const [selectedSubcategory, setSelectedSubcategory] =
    useState<string>("All");

  // ── Refs ──
  const initialFetchDone = useRef(false);
  const topicGroupsFetched = useRef(false);

  // ── Initial parallel fetch ──
  useEffect(() => {
    if (initialFetchDone.current) return;

    if (initialTopicGroups.length > 0) {
      topicGroupsFetched.current = true;
      setTopicGroupsLoading(false);
    }

    if (!userId) return;

    initialFetchDone.current = true;
    topicGroupsFetched.current = true;

    const groupsPromise =
      initialTopicGroups.length > 0
        ? Promise.resolve(initialTopicGroups)
        : getSpeakingTopicGroups();

    Promise.all([
      groupsPromise,
      getSpeakingScenariosWithProgress(userId, {
        page: 1,
        limit: SCENARIOS_PER_PAGE,
        category: selectedGroup,
        subcategory: "All",
      }),
      getSpeakingBookmarkIds(userId),
    ])
      .then(([groups, scenarioResult, bookmarkIds]) => {
        setTopicGroups(groups);
        if (
          groups.length > 0 &&
          !groups.find((g) => g.name === selectedGroup)
        ) {
          setSelectedGroup(groups[0].name);
        }
        setScenarios(scenarioResult.scenarios as Scenario[]);
        setScenarioTotalPages(scenarioResult.totalPages);
        onBookmarkIdsLoaded(bookmarkIds);
      })
      .finally(() => {
        setTopicGroupsLoading(false);
        setScenariosLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // ── Fetch scenarios on filter/pagination changes ──
  useEffect(() => {
    if (!userId || !initialFetchDone.current) return;
    if (activeTab !== "available" || isSearchMode) return;

    setScenariosLoading(true);
    getSpeakingScenariosWithProgress(userId, {
      page: scenarioPage,
      limit: SCENARIOS_PER_PAGE,
      category: selectedGroup,
      subcategory: selectedSubcategory,
      levels: selectedLevels.length > 0 ? selectedLevels : undefined,
    })
      .then((result) => {
        setScenarios(result.scenarios as Scenario[]);
        setScenarioTotalPages(result.totalPages);
      })
      .finally(() => setScenariosLoading(false));
  }, [
    userId,
    activeTab,
    scenarioPage,
    selectedGroup,
    selectedSubcategory,
    selectedLevels,
    isSearchMode,
  ]);

  // ── Reset to page 1 on filter change ──
  useEffect(() => {
    setScenarioPage(1);
  }, [selectedGroup, selectedSubcategory, selectedLevels]);

  // ── Derived ──
  const currentSubcategories =
    topicGroups.find((g) => g.name === selectedGroup)?.subcategories || [];

  const toggleLevel = (level: string) => {
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const handleGroupChange = (name: string) => {
    setSelectedGroup(name);
    setSelectedSubcategory("All");
  };

  return {
    topicGroups,
    topicGroupsLoading,
    scenarios,
    scenariosLoading,
    scenarioPage,
    setScenarioPage,
    scenarioTotalPages,
    selectedGroup,
    handleGroupChange,
    selectedSubcategory,
    setSelectedSubcategory,
    currentSubcategories,
    selectedLevels,
    toggleLevel,
  };
}
