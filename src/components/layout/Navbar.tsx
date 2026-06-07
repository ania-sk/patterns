"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSidebar } from "@/components/context/SidebarContext";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { isOpen, toggle } = useSidebar();

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  const isDark = theme === "dark";

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
          {/* Dark mode toggle */}
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="flex h-8 w-8 items-center justify-center rounded border border-border text-text-muted transition-colors hover:bg-surface-hover hover:text-text-primary disabled:opacity-40"
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

          {/* Hamburger — tylko na mobile (lg: sidebar zawsze widoczny) */}
          <button
            onClick={toggle}
            className="flex h-8 w-8 items-center justify-center rounded border border-border text-text-muted transition-colors hover:bg-surface-hover hover:text-text-primary lg:hidden"
            aria-label={isOpen ? "Zamknij nawigację" : "Otwórz nawigację"}
            aria-expanded={isOpen}
            aria-controls="mobile-sidebar"
          >
            {isOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
