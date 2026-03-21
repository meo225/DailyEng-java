"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { DoraraChatMessage } from "@/actions/dorara";
import { DoraraVocabCard } from "./dorara-vocab-card";
import { DoraraQuizWidget } from "./dorara-quiz-widget";

interface DoraraMessageRendererProps {
  message: DoraraChatMessage;
}

/**
 * Renders a Dorara tutor message with:
 * - Markdown formatting (bold, lists, code, blockquotes)
 * - Inline vocabulary cards
 * - Interactive quiz widgets
 */
export function DoraraMessageRenderer({
  message,
}: DoraraMessageRendererProps) {
  return (
    <div className="space-y-1">
      {/* Main response — rendered as markdown */}
      <div className="dorara-md text-[13px] leading-[1.65] text-gray-700">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => (
              <p className="mb-2 last:mb-0">{children}</p>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-primary-800">
                {children}
              </strong>
            ),
            em: ({ children }) => (
              <em className="text-gray-600 not-italic font-medium">
                {children}
              </em>
            ),
            ul: ({ children }) => (
              <ul className="list-none mb-2 space-y-1 pl-0">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside mb-2 space-y-1 pl-0 marker:text-primary-400 marker:font-semibold">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="text-[13px] flex items-start gap-1.5">
                <span className="text-primary-400 mt-1.5 flex-shrink-0 text-[6px] leading-none">
                  ●
                </span>
                <span className="flex-1">{children}</span>
              </li>
            ),
            code: ({ children, className }) => {
              const isInline = !className;
              return isInline ? (
                <code className="bg-primary-100/60 text-primary-700 px-1.5 py-0.5 rounded-md text-[12px] font-mono font-medium">
                  {children}
                </code>
              ) : (
                <code className={className}>{children}</code>
              );
            },
            pre: ({ children }) => (
              <pre className="bg-gray-50/80 border border-gray-200/60 rounded-xl p-3 mb-2 overflow-x-auto text-[12px] font-mono">
                {children}
              </pre>
            ),
            h1: ({ children }) => (
              <p className="font-bold text-primary-800 text-sm mb-1.5 tracking-tight">
                {children}
              </p>
            ),
            h2: ({ children }) => (
              <p className="font-bold text-primary-700 text-[13px] mb-1 tracking-tight">
                {children}
              </p>
            ),
            h3: ({ children }) => (
              <p className="font-semibold text-primary-700 text-[13px] mb-1">
                {children}
              </p>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-2 border-primary-300 pl-3 my-2 text-gray-500 text-[12.5px] italic">
                {children}
              </blockquote>
            ),
            a: ({ children, href }) => (
              <a
                href={href}
                className="text-primary-600 underline decoration-primary-300 underline-offset-2 hover:text-primary-700 hover:decoration-primary-400 transition-colors duration-150"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>

      {/* Vocab highlights — rendered as interactive cards */}
      {message.vocabHighlights && message.vocabHighlights.length > 0 && (
        <div className="mt-1">
          {message.vocabHighlights.map((vocab, i) => (
            <DoraraVocabCard key={`${vocab.word}-${i}`} vocab={vocab} />
          ))}
        </div>
      )}

      {/* Quiz question — interactive widget */}
      {message.quizQuestion && (
        <DoraraQuizWidget quiz={message.quizQuestion} />
      )}
    </div>
  );
}
