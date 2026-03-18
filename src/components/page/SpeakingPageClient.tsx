"use client";

import { ProtectedRoute, PageIcons } from "@/components/auth/protected-route";
import { HubHero, type TopicGroup } from "@/components/hub";
import { useSpeakingPage } from "@/hooks/useSpeakingPage";
import { SessionSkeleton } from "@/components/speaking/session-skeleton";
import { SpeakingTabBar } from "@/components/speaking/tab-bar";
import { SearchResults } from "@/components/speaking/search-results";
import { CreateScenarioDialog } from "@/components/speaking/create-scenario-dialog";
import { AvailableTopicsTab } from "@/components/speaking/available-topics-tab";
import { BookmarksTab } from "@/components/speaking/bookmarks-tab";
import { CustomTopicsTab } from "@/components/speaking/custom-topics-tab";
import { HistoryTab } from "@/components/speaking/history-tab";
import { useTranslation } from "@/hooks/use-translation";

// ─── Props ─────────────────────────────────────────

export interface SpeakingPageClientProps {
  initialTopicGroups?: TopicGroup[];
  userId: string;
  initialBookmarkIds?: string[];
}

// ─── Component ─────────────────────────────────────

export default function SpeakingPageClient({
  initialTopicGroups = [],
  userId,
  initialBookmarkIds = [],
}: SpeakingPageClientProps) {
  const {
    activeTab,
    setActiveTab,
    router,
    search,
    filter,
    bookmarks,
    customTopics,
    history,
    navigatingToSessionId,
    setNavigatingToSessionId,
  } = useSpeakingPage({ initialTopicGroups, userId, initialBookmarkIds });

  const { t } = useTranslation();

  if (navigatingToSessionId) {
    return (
      <div className="min-h-screen bg-background">
        <SessionSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {customTopics.isGenerating ? (
        <SparkleLoadingOverlay message={customTopics.generatingMessage} />
      ) : null}

      <ProtectedRoute
        pageName={t("speaking_hub.page_name")}
        pageDescription={t("speaking_hub.page_description")}
        pageIcon={PageIcons.speaking}
      >
        <div className="flex flex-col mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <HubHero
            title={t("speaking_hub.title")}
            description={t("speaking_hub.description")}
            imageSrc="/hero-speaking.jpg"
            primaryAction={{ label: t("speaking_hub.build_study_plan") }}
            secondaryAction={{
              label: t("speaking_hub.random_topic"),
              onClick: customTopics.handleSurpriseMe,
            }}
            notification={{
              text: t("speaking_hub.practice_streak"),
              actionLabel: t("speaking_hub.continue"),
            }}
            decorativeWords={["speaking", "fluency", "practice"]}
          />

          <SpeakingTabBar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            searchQuery={search.searchQuery}
            onSearchChange={search.setSearchQuery}
            isSearchMode={search.isSearchMode}
          />

          <TabContent
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            router={router}
            search={search}
            filter={filter}
            bookmarks={bookmarks}
            customTopics={customTopics}
            history={history}
            navigatingToSessionId={navigatingToSessionId}
            setNavigatingToSessionId={setNavigatingToSessionId}
          />
        </div>
      </ProtectedRoute>

      <CreateScenarioDialog
        open={customTopics.isDialogOpen}
        onOpenChange={customTopics.setIsDialogOpen}
        topicPrompt={customTopics.topicPrompt}
        onTopicPromptChange={customTopics.setTopicPrompt}
        isCreating={customTopics.isCreating}
        onCreateScenario={customTopics.handleCreateScenario}
      />
    </div>
  );
}

// ─── Tab Content Router ────────────────────────────

type SpeakingPageState = ReturnType<typeof useSpeakingPage> & {
  navigatingToSessionId: string | null;
  setNavigatingToSessionId: (id: string | null) => void;
};

function TabContent({
  activeTab,
  setActiveTab,
  bookmarks,
  customTopics,
  history,
  navigatingToSessionId,
  setNavigatingToSessionId,
}: SpeakingPageState) {
  if (search.isSearchMode) {
    return (
      <SearchResults
        query={search.searchQuery}
        results={search.searchResults}
        isLoading={search.searchLoading}
        bookmarkedTopics={bookmarks.bookmarkedTopics}
        onBookmarkToggle={bookmarks.handleBookmarkToggle}
        onClearSearch={() => search.setSearchQuery("")}
        onScenarioClick={(id) => setNavigatingToSessionId(id)}
      />
    );
  }

  switch (activeTab) {
    case "available":
      return (
        <AvailableTopicsTab
          topicGroups={filter.topicGroups}
          topicGroupsLoading={filter.topicGroupsLoading}
          selectedGroup={filter.selectedGroup}
          onGroupChange={filter.handleGroupChange}
          selectedLevels={filter.selectedLevels}
          onLevelToggle={filter.toggleLevel}
          currentSubcategories={filter.currentSubcategories}
          selectedSubcategory={filter.selectedSubcategory}
          onSubcategoryChange={filter.setSelectedSubcategory}
          scenarios={filter.scenarios}
          scenariosLoading={filter.scenariosLoading}
          scenarioPage={filter.scenarioPage}
          scenarioTotalPages={filter.scenarioTotalPages}
          onPageChange={filter.setScenarioPage}
          bookmarkedTopics={bookmarks.bookmarkedTopics}
          onBookmarkToggle={bookmarks.handleBookmarkToggle}
          onScenarioClick={(id) => setNavigatingToSessionId(id)}
        />
      );

    case "bookmarks":
      return (
        <BookmarksTab
          bookmarkedTopicsList={bookmarks.bookmarkedTopicsList}
          bookmarkLoading={bookmarks.bookmarkLoading}
          bookmarkPage={bookmarks.bookmarkPage}
          bookmarkTotalPages={bookmarks.bookmarkTotalPages}
          onPageChange={bookmarks.setBookmarkPage}
          onBookmarkToggle={bookmarks.handleBookmarkToggle}
          onBrowseTopics={() => setActiveTab("available")}
          onScenarioClick={(id) => setNavigatingToSessionId(id)}
        />
      );

    case "custom":
      return (
        <CustomTopicsTab
          onFreeTalk={customTopics.handleFreeTalk}
          onOpenDialog={() => customTopics.setIsDialogOpen(true)}
          onSurpriseMe={customTopics.handleSurpriseMe}
          customScenarios={customTopics.customScenarios}
          customScenariosLoading={customTopics.customScenariosLoading}
          bookmarkedTopics={bookmarks.bookmarkedTopics}
          onBookmarkToggle={bookmarks.handleBookmarkToggle}
          onScenarioClick={(id) => setNavigatingToSessionId(id)}
        />
      );

    case "history":
      return (
        <HistoryTab
          historySessions={history.historySessions}
          historyStats={history.historyStats}
          historyLoading={history.historyLoading}
          historyStatsLoading={history.historyStatsLoading}
          historyPage={history.historyPage}
          historyTotalPages={history.historyTotalPages}
          historyRatingFilter={history.historyRatingFilter}
          onPageChange={history.setHistoryPage}
          onRatingFilterChange={history.setHistoryRatingFilter}
          onSessionClick={(scenarioId, sessionId) =>
            router.push(
              `/speaking/session/${scenarioId}?session=${sessionId}&from=history`
            )
          }
        />
      );

    default:
      return null;
  }
}
