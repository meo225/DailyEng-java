"use client";

import React, { useMemo } from "react";
import { X, Volume2, BookOpen, ArrowRight, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { GraphNode, GraphEdge } from "@/actions/vocab-graph";

// ─── SRS Mastery Config ────────────────────────────

function getMasteryInfo(level: number) {
  if (level === 0)
    return { color: "#94a3b8", bg: "bg-gray-100", text: "text-gray-600", label: "New", percent: 0 };
  if (level <= 25)
    return { color: "#ef4444", bg: "bg-red-50", text: "text-red-700", label: "Weak", percent: level };
  if (level <= 50)
    return { color: "#f97316", bg: "bg-orange-50", text: "text-orange-700", label: "Learning", percent: level };
  if (level <= 75)
    return { color: "#3b82f6", bg: "bg-blue-50", text: "text-blue-700", label: "Familiar", percent: level };
  return { color: "#22c55e", bg: "bg-green-50", text: "text-green-700", label: "Mastered", percent: level };
}

// ─── Component ─────────────────────────────────────

interface KnowledgeGraphDetailProps {
  node: GraphNode;
  onClose: () => void;
  onNavigate: (wordId: string) => void;
  allNodes: GraphNode[];
  edges: GraphEdge[];
}

export function KnowledgeGraphDetail({
  node,
  onClose,
  onNavigate,
  allNodes,
  edges,
}: KnowledgeGraphDetailProps) {
  const mastery = getMasteryInfo(node.masteryLevel);

  // Find connected words
  const connections = useMemo(() => {
    const synonymIds = new Set<string>();
    const antonymIds = new Set<string>();

    for (const edge of edges) {
      if (edge.source === node.id || edge.target === node.id) {
        const otherId = edge.source === node.id ? edge.target : edge.source;
        if (edge.type === "synonym") synonymIds.add(otherId);
        if (edge.type === "antonym") antonymIds.add(otherId);
      }
    }

    const nodeMap = new Map(allNodes.map((n) => [n.id, n]));

    return {
      synonyms: Array.from(synonymIds)
        .map((id) => nodeMap.get(id))
        .filter(Boolean) as GraphNode[],
      antonyms: Array.from(antonymIds)
        .map((id) => nodeMap.get(id))
        .filter(Boolean) as GraphNode[],
    };
  }, [node.id, edges, allNodes]);

  const isDue = node.nextReview && new Date(node.nextReview) <= new Date();

  return (
    <div
      className="absolute top-4 right-16 z-40 w-80 animate-in slide-in-from-right-4 fade-in duration-200"
      onClick={(e) => e.stopPropagation()}
    >
      <Card className="overflow-hidden rounded-xl border border-border shadow-2xl bg-background/95 backdrop-blur-xl">
        {/* Header */}
        <div className="p-4 pb-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-black text-foreground tracking-tight truncate">
                {node.word}
              </h3>
              <p className="text-xs text-muted-foreground font-mono mt-0.5">
                {node.pronunciation}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 -mr-1 -mt-1 rounded-full hover:bg-muted text-muted-foreground shrink-0"
              onClick={onClose}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Part of speech + Level */}
          <div className="flex items-center gap-2 mt-2">
            <span className="px-2 py-0.5 rounded bg-primary-50 text-primary-700 text-[10px] font-bold uppercase tracking-wider border border-primary-100">
              {node.partOfSpeech}
            </span>
            <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground text-[10px] font-bold uppercase tracking-wider border border-border">
              {node.level}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-border/50 text-muted-foreground">
              {node.notebookName}
            </span>
          </div>
        </div>

        {/* SRS Mastery Bar */}
        <div className="px-4 pt-3">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <Zap className="h-3 w-3" style={{ color: mastery.color }} />
              <span className={`text-xs font-bold ${mastery.text}`}>
                {mastery.label}
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground font-medium">
              {mastery.percent}%
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${mastery.percent}%`,
                backgroundColor: mastery.color,
              }}
            />
          </div>
          {isDue && (
            <div className="flex items-center gap-1 mt-1.5 text-[10px] text-warning-300 font-medium">
              <Clock className="h-3 w-3" />
              Due for review
            </div>
          )}
          {node.lastReviewed && !isDue && (
            <p className="text-[10px] text-muted-foreground mt-1">
              Last reviewed: {new Date(node.lastReviewed).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* Meaning */}
        <div className="px-4 pt-3 space-y-1.5">
          <p className="text-sm text-foreground leading-snug">{node.meaning}</p>
          <p className="text-sm text-muted-foreground italic border-l-2 border-primary-100 pl-2">
            {node.vietnameseMeaning}
          </p>
        </div>

        {/* Example */}
        {node.exampleSentence && (
          <div className="px-4 pt-2.5">
            <div className="p-2.5 bg-muted/50 rounded-lg border border-border">
              <p className="text-xs text-foreground italic leading-relaxed">
                &ldquo;{node.exampleSentence}&rdquo;
              </p>
              {node.exampleTranslation && (
                <p className="text-[11px] text-muted-foreground mt-1">
                  {node.exampleTranslation}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Connected Words */}
        {(connections.synonyms.length > 0 || connections.antonyms.length > 0) && (
          <div className="px-4 pt-3 space-y-2">
            {connections.synonyms.length > 0 && (
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
                  Synonyms
                </p>
                <div className="flex flex-wrap gap-1">
                  {connections.synonyms.map((syn) => (
                    <button
                      key={syn.id}
                      onClick={() => onNavigate(syn.id)}
                      className="px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 text-[11px] font-medium border border-primary-100 hover:bg-primary-100 transition-colors flex items-center gap-1"
                    >
                      {syn.word}
                      <ArrowRight className="h-2.5 w-2.5" />
                    </button>
                  ))}
                </div>
              </div>
            )}
            {connections.antonyms.length > 0 && (
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
                  Antonyms
                </p>
                <div className="flex flex-wrap gap-1">
                  {connections.antonyms.map((ant) => (
                    <button
                      key={ant.id}
                      onClick={() => onNavigate(ant.id)}
                      className="px-2 py-0.5 rounded-full bg-secondary-50 text-secondary-700 text-[11px] font-medium border border-secondary-100 hover:bg-secondary-100 transition-colors flex items-center gap-1"
                    >
                      {ant.word}
                      <ArrowRight className="h-2.5 w-2.5" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="p-4 pt-3 flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="h-8 text-xs flex-1 bg-background hover:bg-muted"
          >
            <Volume2 className="h-3 w-3 mr-1.5 text-primary-600" />
            Listen
          </Button>
          <Button
            size="sm"
            className="h-8 text-xs flex-1 bg-primary-600 hover:bg-primary-700 text-white shadow-sm"
          >
            <BookOpen className="h-3 w-3 mr-1.5" />
            Practice
          </Button>
        </div>
      </Card>
    </div>
  );
}
