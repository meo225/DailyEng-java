"use client";

import { useState } from "react";
import { QuizQuestion } from "@/actions/dorara";
import { CheckCircle2, XCircle, Lightbulb, Trophy } from "lucide-react";

interface DoraraQuizWidgetProps {
  quiz: QuizQuestion;
}

export function DoraraQuizWidget({ quiz }: DoraraQuizWidgetProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const isCorrect = selectedIndex === quiz.correctIndex;

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelectedIndex(index);
    setShowResult(true);
  };

  const optionLetters = ["A", "B", "C", "D"];

  return (
    <div className="my-3">
      <div
        className={`
          relative overflow-hidden rounded-2xl
          bg-gradient-to-br from-white via-primary-50/40 to-white
          border border-primary-200/60
          shadow-[0_2px_12px_rgba(79,70,229,0.06)]
        `}
      >
        {/* Top gradient bar */}
        <div className="h-1 bg-gradient-to-r from-primary-500 via-secondary-400 to-primary-400" />

        {/* Question header */}
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center shadow-sm">
              <Trophy className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-bold text-primary-800 text-xs uppercase tracking-wider">
              Quick Quiz
            </span>
          </div>
          <p className="text-sm text-foreground font-medium leading-relaxed">
            {quiz.question}
          </p>
        </div>

        {/* Options */}
        <div className="px-4 pb-3 space-y-1.5">
          {quiz.options.map((option, index) => {
            let baseStyle =
              "border-primary-150 bg-white hover:bg-primary-50/60 hover:border-primary-300 cursor-pointer";
            let letterStyle =
              "bg-primary-100 text-primary-600 border-primary-200";
            let iconEl = null;

            if (showResult) {
              if (index === quiz.correctIndex) {
                baseStyle =
                  "border-green-300 bg-green-50/70 ring-1 ring-green-200 cursor-default";
                letterStyle =
                  "bg-green-500 text-white border-green-500";
                iconEl = (
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                );
              } else if (index === selectedIndex && !isCorrect) {
                baseStyle =
                  "border-red-300 bg-red-50/50 ring-1 ring-red-200 cursor-default";
                letterStyle =
                  "bg-red-500 text-white border-red-500";
                iconEl = (
                  <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                );
              } else {
                baseStyle =
                  "border-gray-150 bg-gray-50/50 opacity-50 cursor-default";
                letterStyle =
                  "bg-gray-200 text-gray-400 border-gray-200";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={showResult}
                className={`
                  w-full text-left px-3 py-2.5 rounded-xl border text-sm
                  transition-all duration-200 ease-out
                  flex items-center gap-2.5
                  ${baseStyle}
                `}
              >
                <span
                  className={`
                    flex-shrink-0 w-6 h-6 rounded-lg border
                    flex items-center justify-center
                    text-[11px] font-bold tracking-wide
                    transition-all duration-200
                    ${letterStyle}
                  `}
                >
                  {optionLetters[index]}
                </span>
                <span className="flex-1 text-gray-700">{option}</span>
                {iconEl}
              </button>
            );
          })}
        </div>

        {/* Result + Explanation */}
        {showResult && (
          <div
            className={`
              px-4 py-3 border-t
              ${
                isCorrect
                  ? "bg-gradient-to-r from-green-50 to-emerald-50/50 border-green-200"
                  : "bg-gradient-to-r from-amber-50 to-orange-50/50 border-amber-200"
              }
            `}
          >
            <div className="flex items-start gap-2.5">
              <div
                className={`
                  h-6 w-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5
                  ${isCorrect ? "bg-green-500" : "bg-amber-500"}
                `}
              >
                {isCorrect ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                ) : (
                  <Lightbulb className="h-3.5 w-3.5 text-white" />
                )}
              </div>
              <div>
                <p
                  className={`text-sm font-bold ${
                    isCorrect ? "text-green-700" : "text-amber-700"
                  }`}
                >
                  {isCorrect ? "Correct!" : "Not quite!"}
                </p>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                  {quiz.explanation}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
