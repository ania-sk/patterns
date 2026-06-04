"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Przegląd" },
  { href: "/solid", label: "SOLID" },
  { href: "/patterns", label: "Wzorce" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  // Zamknij menu po zmianie strony
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Zablokuj scroll body gdy menu otwarte
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isDark = theme === "dark";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      {/* ── Pasek główny ── */}
      <nav
        className="flex h-14 items-center px-4 sm:px-6 lg:px-10"
        aria-label="Główna nawigacja"
      >
        {/* Logo — skrajnie po lewej */}
        <Link
          href="/"
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

        {/* Linki — wycentrowane (tylko md+) */}
        <ul
          className="hidden flex-1 items-center justify-center gap-1 md:flex"
          role="list"
        >
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={[
                  "rounded px-3 py-1.5 font-mono text-xs transition-colors",
                  isActive(href)
                    ? "bg-accent-bg text-accent"
                    : "text-text-muted hover:bg-surface-hover hover:text-text-primary",
                ].join(" ")}
                aria-current={isActive(href) ? "page" : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

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

          {/* Hamburger — tylko mobile */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-8 w-8 items-center justify-center rounded border border-border text-text-muted transition-colors hover:bg-surface-hover hover:text-text-primary md:hidden"
            aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </nav>

      {/* ── Menu mobilne ── */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-label="Menu nawigacyjne"
          className="border-t border-border bg-background md:hidden"
        >
          <ul role="list" className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={[
                    "block rounded px-3 py-2.5 font-mono text-sm transition-colors",
                    isActive(href)
                      ? "bg-accent-bg text-accent"
                      : "text-text-muted hover:bg-surface-hover hover:text-text-primary",
                  ].join(" ")}
                  aria-current={isActive(href) ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
