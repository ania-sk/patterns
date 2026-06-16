"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSidebar } from "@/components/context/SidebarContext";
import { useQuiz } from "@/components/context/QuizContext";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { isOpen: sidebarOpen, toggle } = useSidebar();
  const {
    isActive,
    isOpen: quizOpen,
    open: openQuiz,
    slug,
    content,
    type,
  } = useQuiz();

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  const isDark = theme === "dark";
  const showReturnButton = isActive && !quizOpen;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <nav
        className="flex h-14 items-center px-4 sm:px-6 lg:px-10"
        aria-label="Główna nawigacja"
      >
        {/* Logo */}
        <Link
          href="/solid/srp"
          className="flex shrink-0 items-center gap-2 font-mono text-sm font-medium"
          aria-label="patterns — strona główna"
        >
          <span
            className="flex h-7 w-7 items-center justify-center rounded bg-accent font-mono text-xs font-bold text-background"
            aria-hidden="true"
          >
            p.
          </span>
          <span className="text-text-primary">
            patterns
            <span className="text-text-muted">.anavers.pl</span>
          </span>
        </Link>

        {/* Prawa strona: toggle + hamburger */}
        <div className="ml-auto flex shrink-0 items-center gap-2">
          {/* Przycisk powrotu do quizu — widoczny tylko gdy quiz aktywny i drawer zamknięty */}
          {showReturnButton && (
            <button
              onClick={() => openQuiz(slug, content, type)}
              className="flex items-center justify-center gap-2 rounded border border-border text-text-muted transition-colors hover:border-accent hover:bg-accent-bg hover:text-accent cursor-pointer
      h-8 w-8
      sm:w-auto sm:px-3 sm:py-1.5"
              aria-label="Powróć do aktywnego quizu"
            >
              <span
                className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-accent"
                aria-hidden="true"
              />
              <span className="hidden sm:inline font-mono text-xs">
                Powrót do quizu
              </span>
            </button>
          )}

          {/* Dark mode toggle */}
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="flex h-8 w-8 items-center justify-center rounded border border-border text-text-muted transition-colors  disabled:opacity-40 hover:border-accent hover:bg-accent-bg hover:text-accent cursor-pointer"
            aria-label={
              isDark ? "Przełącz na tryb jasny" : "Przełącz na tryb ciemny"
            }
            disabled={!mounted}
          >
            {mounted ? (
              isDark ? (
                <Sun size={15} />
              ) : (
                <Moon size={15} />
              )
            ) : (
              <Moon size={15} className="opacity-0" />
            )}
          </button>

          {/* Hamburger — tylko na mobile */}
          <button
            onClick={toggle}
            className="flex h-8 w-8 items-center justify-center rounded border border-border text-text-muted transition-colors hover:bg-surface-hover hover:text-text-primary lg:hidden"
            aria-label={sidebarOpen ? "Zamknij nawigację" : "Otwórz nawigację"}
            aria-expanded={sidebarOpen}
            aria-controls="mobile-sidebar"
          >
            {sidebarOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
