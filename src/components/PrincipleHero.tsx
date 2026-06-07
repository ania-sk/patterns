// components/PrincipleHero.tsx
// Hero sekcja pojedynczej zasady SOLID.
// Odpowiedzialność: wyświetlenie litery, nazwy, tagline, statusu
// i przycisku otwierającego drawer z quizem.
// Logikę drawera otrzymuje przez prop onQuizOpen — nie zarządza nią samodzielnie.

import { type Principle, statusLabel } from "@/lib/principles";

interface PrincipleHeroProps {
  principle: Principle;
  onQuizOpen: () => void;
}

// Kolor dekoracyjnej litery — różny per zasada dla charakteru wizualnego
const letterColors: Record<string, string> = {
  srp: "text-[#6B4A4B]",
  ocp: "text-[#4A5E6B]",
  lsp: "text-[#4B6B4A]",
  isp: "text-[#6B5E4A]",
  dip: "text-[#5A4A6B]",
};

const statusStyles = {
  done: "border-success/30 bg-success/10 text-success",
  "in-progress": "border-accent-border bg-accent-bg text-accent",
  todo: "border-border bg-surface-hover text-text-faint",
};

export default function PrincipleHero({
  principle,
  onQuizOpen,
}: PrincipleHeroProps) {
  const { slug, letter, fullName, tagline, status } = principle;

  return (
    <div className="mb-10 flex items-start gap-5 border-b border-border pb-8">
      {/* Duża litera dekoracyjna */}
      <span
        className={`
          hidden select-none font-mono text-[72px] font-bold leading-[0.85]
          tracking-tighter sm:block
          ${letterColors[slug] ?? "text-text-faint"}
        `}
        aria-hidden="true"
      >
        {letter}
      </span>

      {/* Meta */}
      <div className="flex-1 pt-1">
        <h1 className="mb-1 font-mono text-xl font-bold leading-tight tracking-tight text-text-primary sm:text-2xl">
          {fullName}
        </h1>

        <p className="mb-4 font-mono text-xs tracking-wide text-text-faint">
          {tagline}
        </p>

        {/* Dolny rząd: badge statusu + przycisk quizu */}
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`
              rounded border px-2 py-0.5
              font-mono text-[10px] font-bold uppercase tracking-[0.1em]
              ${statusStyles[status]}
            `}
          >
            {statusLabel[status]}
          </span>

          <button
            onClick={onQuizOpen}
            className="
              flex items-center gap-2 rounded border border-border
              bg-transparent px-3 py-1.5
              font-mono text-xs text-text-muted
              transition-colors
              hover:border-accent hover:bg-accent-bg hover:text-accent
              focus-visible:outline-accent
            "
            aria-label="Otwórz quiz do tej zasady"
          >
            {/* Pulsująca kropka — sygnalizuje interaktywność */}
            <span
              className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-accent"
              aria-hidden="true"
            />
            Sprawdź się
          </button>
        </div>
      </div>
    </div>
  );
}
