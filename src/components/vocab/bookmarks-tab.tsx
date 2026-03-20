import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { TopicCard } from "@/components/hub";
import type { VocabTopic } from "@/hooks/vocab/types";

interface BookmarksTabProps {
  bookmarkedTopicsList: VocabTopic[];
  onBookmarkToggle: (topicId: string) => void;
  onBrowseTopics: () => void;
}

export function BookmarksTab({
  bookmarkedTopicsList,
  onBookmarkToggle,
  onBrowseTopics,
}: BookmarksTabProps) {
  return (
    <div className="space-y-6">
      {bookmarkedTopicsList.length > 0 ? (
        <>
          <div className="flex items-center gap-3 mb-6">
            <Bookmark className="h-6 w-6 text-primary-500 fill-primary-500" />
            <h2 className="text-xl font-bold text-foreground">
              Your Bookmarked Topics ({bookmarkedTopicsList.length})
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bookmarkedTopicsList.map((topic) => (
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
                isBookmarked={true}
                onBookmarkToggle={onBookmarkToggle}
                thumbnail={topic.thumbnail}
              />
            ))}
          </div>
        </>
      ) : (
        <Card className="p-12 rounded-3xl border-[1.4px] border-primary-200 text-center bg-white">
          <Bookmark className="h-16 w-16 text-primary-200 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">
            No Bookmarks Yet
          </h3>
          <p className="text-muted-foreground mb-6">
            Click the bookmark icon on any topic card to save it here for quick
            access.
          </p>
          <Button
            variant="default"
            onClick={onBrowseTopics}
            className="cursor-pointer"
          >
            Browse Topics
          </Button>
        </Card>
      )}
    </div>
  );
}
