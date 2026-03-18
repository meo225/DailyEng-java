import { Network } from "lucide-react";
import { VocabMindmap } from "@/components/hub/vocab-mindmap";
import { MOCK_MINDMAP_DATA } from "@/hooks/vocab/types";

export function MindmapTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Network className="h-6 w-6 text-primary-500" />
        <h2 className="text-xl font-bold text-foreground">
          Vocabulary Mindmap
        </h2>
        <span className="text-sm text-muted-foreground">
          Explore words organized by topic groups
        </span>
      </div>
      <VocabMindmap topicGroups={MOCK_MINDMAP_DATA} />
    </div>
  );
}
