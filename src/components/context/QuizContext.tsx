"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface QuizContextValue {
  isOpen: boolean;
  isActive: boolean;
  slug: string;
  open: (slug: string, content: string) => void;
  close: () => void;
  dismiss: () => void; // zamknij i dezaktywuj — koniec quizu
  content: string;
}

const QuizContext = createContext<QuizContextValue | null>(null);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");

  const open = useCallback((newSlug: string, newContent: string) => {
    setSlug(newSlug);
    setContent(newContent);
    setIsActive(true);
    setIsOpen(true);
  }, []);

  // Zamknij drawer, ale zostaw isActive — przycisk "Powrót do quizu" zostaje
  const close = useCallback(() => setIsOpen(false), []);

  // Zakończ quiz całkowicie — przycisk znika
  const dismiss = useCallback(() => {
    setIsOpen(false);
    setIsActive(false);
    setSlug("");
    setContent("");
  }, []);

  return (
    <QuizContext.Provider
      value={{ isOpen, isActive, slug, content, open, close, dismiss }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used within QuizProvider");
  return ctx;
}
