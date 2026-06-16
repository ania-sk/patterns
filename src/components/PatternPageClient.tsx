"use client";

// Odpowiedzialność: pomost między PatternHero a QuizContext.
// Nie zarządza stanem quizu — deleguje to do useQuiz().

import PatternHero from "@/components/PatternHero";
import QuizDrawer from "@/components/QuizDrawer";
import { useQuiz } from "@/components/context/QuizContext";
import { type Pattern, type PatternGroup } from "@/lib/principles";

interface PatternPageClientProps {
  pattern: Pattern;
  group: PatternGroup;
  content: string;
  children: React.ReactNode;
}

export default function PatternPageClient({
  pattern,
  group,
  content,
  children,
}: PatternPageClientProps) {
  const { isOpen, open, close } = useQuiz();

  return (
    <>
      <PatternHero
        pattern={pattern}
        group={group}
        onQuizOpen={() => open(pattern.slug, content, "pattern")}
      />

      {children}

      <QuizDrawer
        isOpen={isOpen}
        onClose={close}
        slug={pattern.slug}
        content={content}
        type="pattern"
      />
    </>
  );
}
