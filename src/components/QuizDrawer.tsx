"use client";

// Odpowiedzialność: drawer z quizem wysuwany z prawej strony.
// Zarządza stanem: ładowanie pytań, nawigacja między pytaniami.
// Treść notatek MDX dostaje przez prop - wysyła ją do /api/quiz.

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import QuizQuestion, { type Question } from "@/components/QuizQuestion";

// ─── Typy ────────────────────────────────────────────────────────────────────

interface QuizDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  slug: string;
  content: string;
}

type DrawerState = "idle" | "loading" | "ready" | "error";

// ─── Komponent ───────────────────────────────────────────────────────────────

export default function QuizDrawer({
  isOpen,
  onClose,
  slug,
  content,
}: QuizDrawerProps) {
  const [state, setState] = useState<DrawerState>("idle");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  // ── Fetch pytań ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen || state !== "idle") return;

    let cancelled = false;

    async function fetch_questions() {
      setState("loading");

      try {
        const res = await fetch("/api/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug, content }),
        });

        if (!res.ok) throw new Error("API error");

        const data = await res.json();

        if (!cancelled) {
          setQuestions(data.questions);
          setState("ready");
        }
      } catch {
        if (!cancelled) setState("error");
      }
    }

    fetch_questions();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, fetchTrigger]);

  // ── Zablokuj scroll body gdy drawer otwarty ──────────────────────────────
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ── Zamknij na Escape ────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // ── Handlery ─────────────────────────────────────────────────────────────

  function handleAnswer(correct: boolean) {
    setResults((prev) => [...prev, correct]);
  }

  function handleNext() {
    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
    }
  }

  // ── Wartości pochodne ─────────────────────────────────────────────────────

  const isLastQuestion = current === questions.length - 1;
  const currentAnswered = results.length > current;
  const score = results.filter(Boolean).length;

  // ─── JSX ─────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          aria-hidden="true"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label="Quiz"
        aria-modal="true"
        className={[
          "fixed inset-y-0 right-0 z-50",
          "flex w-full flex-col sm:w-[400px]",
          "border-l border-border bg-surface",
          "shadow-2xl",
          "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* ── Nagłówek ── */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-5">
          <div>
            <p className="font-mono text-sm font-bold text-text-primary">
              Sprawdź się
            </p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-text-faint">
              {slug.toUpperCase()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded border border-border text-text-muted transition-colors hover:border-accent hover:text-accent"
            aria-label="Zamknij quiz"
          >
            <X size={13} />
          </button>
        </div>

        {/* ── Kropki postępu ── */}
        {questions.length > 0 && (
          <div className="flex gap-1.5 border-b border-border px-5 py-3">
            {questions.map((_, i) => (
              <div
                key={i}
                className={[
                  "h-1.5 flex-1 rounded-full transition-colors",
                  i < results.length
                    ? results[i]
                      ? "bg-success"
                      : "bg-bad"
                    : i === current
                      ? "bg-accent"
                      : "bg-border-hi",
                ].join(" ")}
              />
            ))}
          </div>
        )}

        {/* ── Treść ── */}
        <div className="flex-1 overflow-y-auto px-5 py-6">
          {/* Ładowanie */}
          {state === "loading" && (
            <div className="flex flex-col items-center justify-center gap-3 py-16">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              <p className="font-mono text-xs text-text-faint">
                Generuję pytania...
              </p>
            </div>
          )}

          {/* Błąd */}
          {state === "error" && (
            <div className="flex flex-col items-center gap-4 py-16">
              <p className="font-mono text-xs text-text-muted">
                Nie udało się wygenerować pytań.
              </p>
              <button
                onClick={() => setState("idle")}
                className="font-mono text-xs text-accent underline underline-offset-4"
              >
                Spróbuj ponownie
              </button>
            </div>
          )}

          {/* Pytanie */}
          {state === "ready" && !showResults && questions[current] && (
            <QuizQuestion
              key={current}
              question={questions[current]}
              index={current}
              total={questions.length}
              onAnswer={handleAnswer}
            />
          )}

          {/* Wynik końcowy */}
          {state === "ready" && showResults && (
            <div className="flex flex-col items-center gap-6 py-10">
              <div className="text-center">
                <p className="font-mono text-4xl font-bold text-text-primary">
                  {score}/{questions.length}
                </p>
                <p className="mt-1 font-mono text-xs text-text-faint">
                  {score === questions.length
                    ? "Bezbłędnie!"
                    : score >= questions.length / 2
                      ? "Dobry wynik"
                      : "Wróć do notatek"}
                </p>
              </div>

              <div className="flex flex-col gap-2 w-full">
                {/* Te same pytania — tylko reset postępu */}
                <button
                  onClick={() => {
                    setCurrent(0);
                    setResults([]);
                    setShowResults(false);
                  }}
                  className="w-full rounded border border-accent bg-accent px-4 py-2 font-mono text-xs font-bold text-background transition-opacity hover:opacity-85"
                >
                  Spróbuj ponownie
                </button>

                {/* Nowe pytania — pełny reset + nowe wywołanie API */}
                <button
                  onClick={() => {
                    setCurrent(0);
                    setResults([]);
                    setQuestions([]);
                    setShowResults(false);
                    setState("idle");
                    setFetchTrigger((n) => n + 1);
                  }}
                  className="w-full rounded border border-border px-4 py-2 font-mono text-xs text-text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  Nowy quiz
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Footer z przyciskiem Następne / Zobacz wynik ── */}
        {state === "ready" && !showResults && currentAnswered && (
          <div className="shrink-0 border-t border-border px-5 py-4">
            <button
              onClick={isLastQuestion ? () => setShowResults(true) : handleNext}
              className="w-full rounded border border-accent bg-accent px-4 py-2 font-mono text-xs font-bold text-background transition-opacity hover:opacity-85"
            >
              {isLastQuestion ? "Zobacz wynik →" : "Następne →"}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
