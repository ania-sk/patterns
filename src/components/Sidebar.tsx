"use client";

// components/SolidSidebar.tsx
// Sidebar z listą zasad SOLID i grupami wzorców projektowych.
// Jednotkowa odpowiedzialność: nawigacja i wyświetlanie statusów.
// Nie zawiera logiki otwierania/zamykania — to robi SolidLayout.

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  principles,
  patternGroups,
  statusLabel,
  type Status,
} from "@/lib/principles";

//  Status badge

const statusStyles: Record<Status, string> = {
  done: "bg-success/15 text-success",
  "in-progress": "bg-accent-bg text-accent border border-accent-border",
  todo: "bg-surface-hover text-text-faint",
};

function StatusBadge({ status }: { status: Status }) {
  if (status === "todo") return null; // "wkrótce" pokazujemy tylko przy wzorcach

  return (
    <span
      className={`shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] font-bold leading-none tracking-wide ${statusStyles[status]}`}
    >
      {statusLabel[status]}
    </span>
  );
}

//  Sekcja label

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-4 pb-1.5 pt-5 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-text-faint first:pt-3">
      {children}
    </p>
  );
}

// Główny komponent

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Nawigacja boczna"
      className="flex h-full flex-col overflow-y-auto py-2"
    >
      {/* ── Zasady SOLID ── */}
      <SectionLabel>SOLID</SectionLabel>
      <ul role="list">
        {principles.map(({ slug, letter, name, tagline, status }) => {
          const href = `/solid/${slug}`;
          const active = pathname === href;
          const disabled = status === "todo";

          return (
            <li key={slug}>
              {disabled ? (
                // Zasada jeszcze nieomówiona — nieaktywna pozycja
                <div
                  className="flex cursor-not-allowed items-start gap-3 border-l-2 border-transparent px-4 py-2 opacity-40"
                  aria-disabled="true"
                  title="Ta zasada jeszcze nie została omówiona"
                >
                  <span className="w-4 shrink-0 font-mono text-[15px] font-bold leading-snug text-text-faint">
                    {letter}
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] text-text-muted">
                      {name}
                    </p>
                    <p className="font-mono text-[10px] text-text-faint">
                      {tagline}
                    </p>
                  </div>
                </div>
              ) : (
                <Link
                  href={href}
                  className={[
                    "flex items-start gap-3 border-l-2 px-4 py-2 transition-colors",
                    active
                      ? "border-accent bg-accent-bg"
                      : "border-transparent hover:bg-surface-hover",
                  ].join(" ")}
                  aria-current={active ? "page" : undefined}
                >
                  <span
                    className={[
                      "w-4 shrink-0 font-mono text-[15px] font-bold leading-snug transition-colors",
                      active ? "text-accent" : "text-text-primary",
                    ].join(" ")}
                  >
                    {letter}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <p
                        className={[
                          "font-mono text-[11px] transition-colors",
                          active ? "text-accent" : "text-text-muted",
                        ].join(" ")}
                      >
                        {name}
                      </p>
                      <StatusBadge status={status} />
                    </div>
                    <p className="font-mono text-[10px] text-text-faint">
                      {tagline}
                    </p>
                  </div>
                </Link>
              )}
            </li>
          );
        })}
      </ul>

      {/* ── Wzorce projektowe ── */}
      {patternGroups.map(({ label, categorySlug, patterns }) => (
        <div key={label}>
          <SectionLabel>{label}</SectionLabel>
          <ul role="list">
            {patterns.map(({ slug, name, status }) => {
              const href = `/patterns/${categorySlug}/${slug}`;
              const active = pathname === href;
              const disabled = status === "todo";

              return (
                <li key={slug}>
                  {disabled ? (
                    <div className="flex cursor-not-allowed items-center gap-3 px-4 py-1.5 opacity-40">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-border-hi" />
                      <span className="flex-1 font-mono text-[11px] text-text-faint">
                        {name}
                      </span>
                      <span className="shrink-0 rounded bg-surface-hover px-1.5 py-0.5 font-mono text-[9px] text-text-faint">
                        wkrótce
                      </span>
                    </div>
                  ) : (
                    <Link
                      href={href}
                      className={[
                        "flex items-center gap-3 border-l-2 px-4 py-1.5 transition-colors",
                        active
                          ? "border-accent bg-accent-bg"
                          : "border-transparent hover:bg-surface-hover",
                      ].join(" ")}
                      aria-current={active ? "page" : undefined}
                    >
                      <span
                        className={[
                          "h-1.5 w-1.5 shrink-0 rounded-full transition-colors",
                          active ? "bg-accent" : "bg-border-hi",
                        ].join(" ")}
                      />
                      <span
                        className={[
                          "flex-1 font-mono text-[11px] transition-colors",
                          active ? "text-accent" : "text-text-muted",
                        ].join(" ")}
                      >
                        {name}
                      </span>
                      <StatusBadge status={status} />
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
