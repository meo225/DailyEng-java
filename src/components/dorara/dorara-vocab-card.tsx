"use client";

import { useState } from "react";
import { VocabHighlight } from "@/actions/dorara";
import { ChevronDown, ChevronUp, Volume2 } from "lucide-react";

interface DoraraVocabCardProps {
  vocab: VocabHighlight;
}

export function DoraraVocabCard({ vocab }: DoraraVocabCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="my-2.5 group">
      {/* Card container — glassmorphic with brand depth */}
      <div
        className={`
          relative overflow-hidden rounded-2xl
          bg-gradient-to-br from-white via-primary-50/60 to-white
          border border-primary-200/70
          shadow-[0_2px_8px_rgba(79,70,229,0.06)]
          transition-all duration-200 ease-out
          hover:shadow-[0_4px_16px_rgba(79,70,229,0.1)]
          hover:border-primary-300/60
        `}
      >
        {/* Accent strip */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-primary-400 rounded-l-2xl" />

        {/* Header — always visible */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between pl-4 pr-3 py-3 text-left cursor-pointer group/btn"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Icon circle */}
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center flex-shrink-0 shadow-sm">
              <Volume2 className="h-3.5 w-3.5 text-white" />
            </div>
            {/* Word + phonetic */}
            <div className="min-w-0">
              <span className="font-bold text-primary-800 text-sm tracking-tight block truncate">
                {vocab.word}
              </span>
              {vocab.phonetic && (
                <span className="text-[11px] text-primary-400 font-mono leading-none">
                  {vocab.phonetic}
                </span>
              )}
            </div>
          </div>
          <div
            className={`
              h-6 w-6 rounded-lg flex items-center justify-center flex-shrink-0
              bg-primary-100/60 text-primary-500
              group-hover/btn:bg-primary-200/80
              transition-all duration-200
            `}
          >
            {expanded ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </div>
        </button>

        {/* Expanded content */}
        {expanded && (
          <div className="pl-4 pr-3 pb-3 space-y-2 border-t border-primary-100/60 pt-2.5 ml-1">
            <p className="text-sm text-foreground leading-relaxed">
              <span className="font-semibold text-primary-700 text-xs uppercase tracking-wider">
                Meaning{" "}
              </span>
              <br />
              <span className="text-gray-700">{vocab.meaning}</span>
            </p>
            {vocab.example && (
              <div className="bg-primary-50/50 rounded-xl px-3 py-2 border border-primary-100/50">
                <p className="text-[11px] font-semibold text-primary-500 uppercase tracking-wider mb-0.5">
                  Example
                </p>
                <p className="text-sm text-gray-600 italic leading-relaxed">
                  &ldquo;{vocab.example}&rdquo;
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
