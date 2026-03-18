import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { TopicCard } from "@/components/hub";
import { TopicCardSkeleton } from "./topic-card-skeleton";
import type { VocabTopic } from "@/hooks/vocab/types";

interface SearchResultsProps {
  query: string;
  results: VocabTopic[];
  isLoading: boolean;
  bookmarkedTopics: string[];
  onBookmarkToggle: (topicId: string) => void;
  onClearSearch: () => void;
}

export function SearchResults({
  query,
  results,
  isLoading,
  bookmarkedTopics,
  onBookmarkToggle,
  onClearSearch,
}: SearchResultsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {isLoading
            ? "Searching..."
            : `Search Results for "${query}" (${results.length} found)`}
        </h2>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <TopicCardSkeleton key={i} />
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((topic) => (
            <TopicCard
              key={topic.id}
              id={topic.id}
              title={topic.title}
              description={topic.description}
              level={topic.level}
              wordCount={topic.wordCount}
              progress={topic.progress}
              href={`/vocab/${topic.id}`}
              onNotYet={() => {}}
              type="vocabulary"
              isBookmarked={bookmarkedTopics.includes(topic.id)}
              onBookmarkToggle={onBookmarkToggle}
              thumbnail={topic.thumbnail}
            />
          ))}
        </div>
      ) : (
        <Card className="p-12 rounded-3xl border-[1.4px] border-primary-200 text-center">
          <Search className="h-16 w-16 text-primary-200 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">
            No Results Found
          </h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your search terms or browse topics by category.
          </p>
          <Button
            variant="default"
            onClick={onClearSearch}
            className="cursor-pointer"
          >
            Clear Search
          </Button>
        </Card>
      )}
    </div>
  );
}
