// Odpowiedzialność: wyświetlenie pojedynczego pytania quizowego.
"use client";

import { useState } from "react";

export interface QuizOption {
  key: string;
  text: string;
}

export interface Question {
  id: number;
  type: string;
  question: string;
  code?: string | null;
  options: QuizOption[];
  correct: string;
  explanation: string;
}

interface QuizQuestionProps {
  question: Question;
  index: number;
  total: number;
  onAnswer: (correct: boolean) => void;
}

export default function QuizQuestion({
  question,
  index,
  total,
  onAnswer,
}: QuizQuestionProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const answered = selected !== null;

  function handleSelect(key: string) {
    if (answered) return;
    setSelected(key);
    onAnswer(key === question.correct);
  }

  function optionStyle(key: string): string {
    if (!answered) {
      return "border-border text-text-muted hover:border-accent-mid hover:bg-accent-bg hover:text-text-primary";
    }
    if (key === question.correct) {
      return "border-success bg-success/10 text-success";
    }
    if (key === selected) {
      return "border-bad bg-bad/10 text-bad";
    }
    return "border-border text-text-faint opacity-50";
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Licznik pytań */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-text-faint">
          Pytanie {index + 1} z {total}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-text-faint">
          {question.type}
        </span>
      </div>

      {/* Treść pytania */}
      <p className="font-mono text-sm font-bold leading-snug text-text-primary">
        {question.question}
      </p>

      {/* Przykład kodu — widoczny tylko dla pytań typu "code" */}
      {question.code && (
        <pre className="overflow-x-auto rounded border border-border bg-[#070707] p-3 font-mono text-xs leading-relaxed text-[#d0c8b8]">
          <code>{question.code}</code>
        </pre>
      )}

      {/* Opcje */}
      <ul className="flex flex-col gap-2" role="list">
        {question.options.map((option) => (
          <li key={option.key}>
            <button
              onClick={() => handleSelect(option.key)}
              disabled={answered}
              className={[
                "flex w-full items-start gap-3 rounded border px-3 py-2.5 text-left transition-colors",
                answered ? "cursor-default" : "cursor-pointer",
                optionStyle(option.key),
              ].join(" ")}
              aria-pressed={selected === option.key}
            >
              {/* Klucz opcji */}
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-current font-mono text-[10px] font-bold">
                {option.key}
              </span>
              {/* Treść opcji */}
              <span className="font-mono text-xs leading-relaxed">
                {option.text}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* Wyjaśnienie — widoczne po odpowiedzi */}
      {answered && (
        <div className="rounded border border-accent-border bg-accent-bg px-4 py-3">
          <p className="font-mono text-xs leading-relaxed text-accent-mid">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
