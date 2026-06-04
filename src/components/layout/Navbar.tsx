"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Przegląd" },
  { href: "/solid", label: "SOLID" },
  { href: "/patterns", label: "Wzorce" },
  { href: "/progress", label: "Postęp" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <nav
        className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-6"
        aria-label="Główna nawigacja"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-mono text-sm font-medium"
          aria-label="patterns — strona główna"
        >
          <span
            className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-xs font-medium text-white"
            aria-hidden="true"
          >
            p.
          </span>
          <span className="text-text-primary">
            patterns
            <span className="text-text-muted">.anavers.pl</span>
          </span>
        </Link>

        {/* Linki — wycentrowane */}
        <ul
          className="flex flex-1 items-center justify-center gap-1"
          role="list"
        >
          {navLinks.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={[
                    "rounded-md px-3 py-1.5 font-mono text-xs transition-colors",
                    isActive
                      ? "bg-surface-hover text-accent"
                      : "text-text-muted hover:bg-surface-hover hover:text-text-primary",
                  ].join(" ")}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Dark mode toggle */}
        <div className="shrink-0">
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-text-muted transition-colors hover:bg-surface-hover hover:text-text-primary"
            aria-label={
              isDark ? "Przełącz na tryb jasny" : "Przełącz na tryb ciemny"
            }
            disabled={!mounted}
          >
            {mounted ? (
              isDark ? (
                <Sun size={16} />
              ) : (
                <Moon size={16} />
              )
            ) : (
              <Moon size={16} className="opacity-0" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
