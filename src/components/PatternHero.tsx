// Hero sekcja pojedynczego wzorca projektowego.
// Odpowiedzialność: wyświetlenie nazwy, kategorii, statusu
// i przycisku otwierającego drawer z quizem.
// Logikę drawera otrzymuje przez prop onQuizOpen — nie zarządza nią samodzielnie.

import { type Pattern, type PatternGroup, statusLabel } from "@/lib/principles";

interface PatternHeroProps {
  pattern: Pattern;
  group: PatternGroup;
  onQuizOpen: () => void;
}

const statusStyles = {
  done: "border-success/30 bg-success/10 text-success",
  "in-progress": "border-accent-border bg-accent-bg text-accent",
  todo: "border-border bg-surface-hover text-text-faint",
};

export default function PatternHero({
  pattern,
  group,
  onQuizOpen,
}: PatternHeroProps) {
  const { name, status } = pattern;

  return (
    <div className="mb-10 flex items-start gap-5 border-b border-border pb-8">
      <div className="flex-1 pt-1">
        <h1 className="mb-1 font-mono text-xl font-bold leading-tight tracking-tight text-text-primary sm:text-2xl">
          {name}
        </h1>

        <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-text-faint">
          {group.label}
        </p>

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
              hover:border-accent hover:bg-accent-bg hover:text-accent cursor-pointer
              focus-visible:outline-accent
            "
            aria-label="Otwórz quiz do tego wzorca"
          >
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
