"use client";

import { useEffect, useState } from "react";
import { Network } from "lucide-react";
import { KnowledgeGraph } from "@/components/vocab/knowledge-graph";
import {
  getVocabGraphData,
  type VocabGraphData,
} from "@/actions/vocab-graph";

export function KnowledgeGraphTab() {
  const [data, setData] = useState<VocabGraphData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      try {
        const result = await getVocabGraphData({ limit: 200 });
        if (!cancelled) setData(result);
      } catch (err) {
        console.error("Failed to load graph data:", err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const emptyData: VocabGraphData = {
    nodes: [],
    edges: [],
    notebooks: [],
    stats: { totalWords: 0, mastered: 0, learning: 0, unseen: 0, dueForReview: 0 },
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Network className="h-6 w-6 text-primary-500" />
        <h2 className="text-xl font-bold text-foreground">Knowledge Graph</h2>
        <span className="text-sm text-muted-foreground">
          Explore vocabulary connections and track mastery
        </span>
      </div>
      <KnowledgeGraph data={data || emptyData} isLoading={isLoading} />
    </div>
  );
}
