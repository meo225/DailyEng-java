"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// ─── Types ─────────────────────────────────────────

export interface GraphNode {
  id: string;
  word: string;
  pronunciation: string;
  meaning: string;
  vietnameseMeaning: string;
  partOfSpeech: string;
  notebookId: string;
  notebookName: string;
  notebookColor: string;
  level: string;
  masteryLevel: number;
  nextReview: string | null;
  lastReviewed: string | null;
  synonyms: string[];
  antonyms: string[];
  exampleSentence: string;
  exampleTranslation: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: "synonym" | "antonym" | "same-notebook";
}

export interface VocabGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  notebooks: { id: string; name: string; color: string }[];
  stats: {
    totalWords: number;
    mastered: number;
    learning: number;
    unseen: number;
    dueForReview: number;
  };
}

const NOTEBOOK_COLORS = [
  "primary",
  "secondary",
  "accent",
  "success",
  "warning",
  "info",
] as const;

const EMPTY_RESULT: VocabGraphData = {
  nodes: [],
  edges: [],
  notebooks: [],
  stats: { totalWords: 0, mastered: 0, learning: 0, unseen: 0, dueForReview: 0 },
};

// ─── Main Server Action ────────────────────────────

export async function getVocabGraphData(
  options?: {
    notebookId?: string;
    limit?: number;
  }
): Promise<VocabGraphData> {
  // Get userId from session (same pattern as notebook.ts)
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return EMPTY_RESULT;

  const limit = options?.limit || 200;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = { userId };
  if (options?.notebookId) {
    where.notebookId = options.notebookId;
  }

  // Fetch notebook items (words the user has saved)
  const notebookItems = await prisma.notebookItem.findMany({
    where,
    include: { notebook: true },
    take: limit,
    orderBy: { word: "asc" },
  });

  // Fetch user's notebooks for the filter UI
  const notebooks = await prisma.notebook.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });

  // Cross-reference VocabItem for synonyms/antonyms
  const matchingVocabItems = await prisma.vocabItem.findMany({
    where: {
      word: { in: notebookItems.map((item) => item.word), mode: "insensitive" },
    },
    select: {
      word: true,
      synonyms: true,
      antonyms: true,
      exampleSentence: true,
      exampleTranslation: true,
    },
  });

  const vocabLookup = new Map<
    string,
    { synonyms: string[]; antonyms: string[]; exampleSentence: string; exampleTranslation: string }
  >();
  for (const v of matchingVocabItems) {
    vocabLookup.set(v.word.toLowerCase(), {
      synonyms: v.synonyms || [],
      antonyms: v.antonyms || [],
      exampleSentence: v.exampleSentence || "",
      exampleTranslation: v.exampleTranslation || "",
    });
  }

  // Build nodes
  const wordToNodeId = new Map<string, string>();
  const nodes: GraphNode[] = notebookItems.map((item) => {
    const vocabData = vocabLookup.get(item.word.toLowerCase());
    const notebookIndex = notebooks.findIndex((n) => n.id === item.notebookId);
    const notebookColor =
      item.notebook?.color ||
      NOTEBOOK_COLORS[Math.max(0, notebookIndex) % NOTEBOOK_COLORS.length];

    wordToNodeId.set(item.word.toLowerCase(), item.id);

    return {
      id: item.id,
      word: item.word,
      pronunciation: item.pronunciation || "",
      meaning: Array.isArray(item.meaning) ? item.meaning.join("; ") : "",
      vietnameseMeaning: Array.isArray(item.vietnamese) ? item.vietnamese.join("; ") : "",
      partOfSpeech: item.partOfSpeech || "",
      notebookId: item.notebookId,
      notebookName: item.notebook?.name || "Notebook",
      notebookColor,
      level: item.level || "",
      masteryLevel: item.masteryLevel || 0,
      nextReview: item.nextReview?.toISOString() || null,
      lastReviewed: item.lastReviewed?.toISOString() || null,
      synonyms: vocabData?.synonyms || [],
      antonyms: vocabData?.antonyms || [],
      exampleSentence: vocabData?.exampleSentence || "",
      exampleTranslation: vocabData?.exampleTranslation || "",
    };
  });

  // Build edges
  const edges: GraphEdge[] = [];
  const edgeSet = new Set<string>();

  for (const node of nodes) {
    for (const syn of node.synonyms) {
      const targetId = wordToNodeId.get(syn.toLowerCase());
      if (targetId && targetId !== node.id) {
        const edgeKey = [node.id, targetId].sort().join("-");
        if (!edgeSet.has(edgeKey)) {
          edgeSet.add(edgeKey);
          edges.push({ id: `syn-${edgeKey}`, source: node.id, target: targetId, type: "synonym" });
        }
      }
    }
    for (const ant of node.antonyms) {
      const targetId = wordToNodeId.get(ant.toLowerCase());
      if (targetId && targetId !== node.id) {
        const edgeKey = [node.id, targetId].sort().join("-");
        if (!edgeSet.has(`ant-${edgeKey}`)) {
          edgeSet.add(`ant-${edgeKey}`);
          edges.push({ id: `ant-${edgeKey}`, source: node.id, target: targetId, type: "antonym" });
        }
      }
    }
  }

  // Same-notebook edges
  const notebookMap = new Map<string, string[]>();
  for (const node of nodes) {
    const existing = notebookMap.get(node.notebookId) || [];
    existing.push(node.id);
    notebookMap.set(node.notebookId, existing);
  }
  for (const [, wordIds] of notebookMap) {
    for (let i = 0; i < wordIds.length; i++) {
      for (let j = i + 1; j < Math.min(i + 3, wordIds.length); j++) {
        const edgeKey = [wordIds[i], wordIds[j]].sort().join("-");
        if (!edgeSet.has(`nb-${edgeKey}`)) {
          edgeSet.add(`nb-${edgeKey}`);
          edges.push({ id: `nb-${edgeKey}`, source: wordIds[i], target: wordIds[j], type: "same-notebook" });
        }
      }
    }
  }

  // Stats
  const now = new Date();
  return {
    nodes,
    edges,
    notebooks: notebooks.map((nb, i) => ({
      id: nb.id,
      name: nb.name,
      color: nb.color || NOTEBOOK_COLORS[i % NOTEBOOK_COLORS.length],
    })),
    stats: {
      totalWords: nodes.length,
      mastered: nodes.filter((n) => n.masteryLevel >= 76).length,
      learning: nodes.filter((n) => n.masteryLevel > 0 && n.masteryLevel < 76).length,
      unseen: nodes.filter((n) => n.masteryLevel === 0).length,
      dueForReview: nodes.filter((n) => n.nextReview && new Date(n.nextReview) <= now).length,
    },
  };
}
