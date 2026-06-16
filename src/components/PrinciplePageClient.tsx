"use client";

// Odpowiedzialność: pomost między PrincipleHero a QuizContext.
// Nie zarządza stanem quizu — deleguje to do useQuiz().

import PrincipleHero from "@/components/PrincipleHero";
import QuizDrawer from "@/components/QuizDrawer";
import { useQuiz } from "@/components/context/QuizContext";
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
  const { isOpen, open, close } = useQuiz();

  return (
    <>
      <PrincipleHero
        principle={principle}
        onQuizOpen={() => open(principle.slug, content, "solid")}
      />

      {children}

      <QuizDrawer
        isOpen={isOpen}
        onClose={close}
        slug={principle.slug}
        content={content}
        type="solid"
      />
    </>
  );
}
