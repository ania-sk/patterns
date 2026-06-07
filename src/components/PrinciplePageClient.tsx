"use client";

// components/PrinciplePageClient.tsx
// Odpowiedzialność: zarządzanie stanem drawera quizu.
// Łączy PrincipleHero (przycisk) z QuizDrawer (panel).
// Treść MDX dostaje jako children — nie wie co to jest.

import { useState } from "react";
import PrincipleHero from "@/components/PrincipleHero";
import { type Principle } from "@/lib/principles";

interface PrinciplePageClientProps {
  principle: Principle;
  children: React.ReactNode;
}

export default function PrinciplePageClient({
  principle,
  children,
}: PrinciplePageClientProps) {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <>
      <PrincipleHero
        principle={principle}
        onQuizOpen={() => setQuizOpen(true)}
      />

      {/* Treść MDX */}
      {children}

      {/* QuizDrawer —  w kolejnym kroku */}
      {quizOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setQuizOpen(false)}
        >
          <div className="rounded border border-border bg-surface p-8 font-mono text-sm text-text-primary">
            Quiz — wkrótce
            <button
              className="ml-4 text-text-muted hover:text-text-primary"
              onClick={() => setQuizOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
