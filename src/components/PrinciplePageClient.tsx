"use client";

// Odpowiedzialność: zarządzanie stanem drawera quizu.
// Łączy PrincipleHero (przycisk) z QuizDrawer (panel).
// Treść MDX dostaje jako children — nie wie co to jest.

import { useState } from "react";
import PrincipleHero from "@/components/PrincipleHero";
import QuizDrawer from "@/components/QuizDrawer";
import { type Principle } from "@/lib/principles";

interface PrinciplePageClientProps {
  principle: Principle;
  content: string;
  children: React.ReactNode;
}

export default function PrinciplePageClient({
  principle,
  content,
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

      {/* Quiz Drawer */}
      <QuizDrawer
        isOpen={quizOpen}
        onClose={() => setQuizOpen(false)}
        slug={principle.slug}
        content={content}
      />
    </>
  );
}
