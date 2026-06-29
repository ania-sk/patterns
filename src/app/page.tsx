import SidebarLayout from "@/components/SidebarLayout";
import { principles, patternGroups } from "@/lib/principles";

export default function HomePage() {
  const donePatterns = patternGroups
    .flatMap((g) => g.patterns)
    .filter((p) => p.status !== "todo").length;

  return (
    <SidebarLayout>
      <div className="mx-auto max-w-3xl">
        {/* ── Hero ── */}
        <div className="mb-10 border-b border-border pb-8">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-text-faint"></p>
          <h1 className="flex items-center gap-2 mb-1 font-mono text-2xl font-bold tracking-tight text-text-primary">
            <span
              className="flex h-7 w-7 items-center justify-center rounded bg-accent font-mono text-xs font-bold text-background"
              aria-hidden="true"
            >
              p.
            </span>
            <span>patterns</span>
          </h1>
          <p className="font-mono text-xs text-text-faint">
            Notatki i przykłady kodu — zasady SOLID i wzorce GoF w Javie
          </p>
        </div>

        {/* ── Definicja SOLID ── */}
        <section aria-labelledby="solid-heading" className="mb-10">
          <h2
            id="solid-heading"
            className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-text-faint"
          >
            Czym jest SOLID?
          </h2>
          <blockquote className="border-l-2 border-[var(--plum)] bg-surface py-3 pl-4 pr-3">
            <p className="font-mono text-sm leading-relaxed text-text-muted">
              <strong className="text-text-primary">SOLID</strong> to pięć zasad
              projektowania obiektowego sformułowanych przez Roberta C. Martina
              (Uncle Bob), opisanych w książce <em>Clean Architecture</em>.
              Zasady te pomagają tworzyć kod, który jest łatwiejszy do
              zrozumienia, rozwijania i testowania, szczególnie w długoterminowo
              utrzymywanych projektach.
            </p>
            <footer className="mt-3 font-mono text-[10px] tracking-wide text-text-faint">
              — Robert C. Martin,{" "}
              <cite>
                Agile Software Development, Principles, Patterns, and Practices
              </cite>
              , 2003
            </footer>
          </blockquote>
        </section>

        {/* ── Karty: SOLID i GoF ── */}
        <section aria-labelledby="notes-heading" className="mb-10">
          <h2
            id="notes-heading"
            className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-text-faint"
          >
            Notatki
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded border border-border p-5">
              <p className="mb-1 font-mono text-[8px] uppercase tracking-[0.18em] text-text-faint">
                Notatki
              </p>
              <h3 className="mb-2 font-mono text-sm font-bold text-text-primary">
                Zasady SOLID
              </h3>
              <p className="mb-4 font-mono text-xs leading-relaxed text-text-muted">
                Pięć zasad projektowania obiektowego — każda omówiona osobno z
                definicją, przykładami w Javie i quizem sprawdzającym wiedzę.
              </p>
              <p className="font-mono text-[10px] text-text-faint border-t border-border pt-3">
                <span className="text-accent">{principles.length} zasad</span>
                {" · "}Java{" · "}quiz
              </p>
            </div>

            <div className="rounded border border-border p-5">
              <p className="mb-1 font-mono text-[8px] uppercase tracking-[0.18em] text-text-faint">
                Notatki
              </p>
              <h3 className="mb-2 font-mono text-sm font-bold text-text-primary">
                Wzorce GoF
              </h3>
              <p className="mb-4 font-mono text-xs leading-relaxed text-text-muted">
                Wybrane wzorce Gang of Four — kreacyjne, strukturalne i
                behawioralne. Każdy z analogią z życia, przykładem kodu i
                diagramem ASCII.
              </p>
              <p className="font-mono text-[10px] text-text-faint border-t border-border pt-3">
                <span className="text-accent">{donePatterns} wzorców</span>
                {" · "}Java{" · "}diagramy ASCII
              </p>
            </div>
          </div>
        </section>
        {/* ── Quiz ── */}
        <section aria-labelledby="quiz-heading" className="mb-10">
          <h2
            id="quiz-heading"
            className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-text-faint"
          >
            Sprawdź się
          </h2>
          <p className="mb-3 font-mono text-xs leading-relaxed text-text-muted">
            Każda notatka zawiera quiz generowany przez AI na podstawie jej
            treści. Cztery pytania:
          </p>
          <ul className="mb-3 ml-4 flex flex-col gap-1">
            {["definicja", "analiza kodu", "zastosowanie", "edge case"].map(
              (item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 font-mono text-xs text-text-muted"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ),
            )}
          </ul>
          <p className="font-mono text-xs leading-relaxed text-text-muted">
            Pytania są inne przy każdym uruchomieniu.
          </p>
        </section>

        {/* ── Struktura notatek ── */}
        <section aria-labelledby="structure-heading">
          <h2
            id="structure-heading"
            className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-text-faint"
          >
            Co znajdziesz w każdej notatce?
          </h2>
          <p className="mb-4 font-mono text-xs leading-relaxed text-text-muted">
            Każda notatka zbudowana jest według tego samego schematu:
          </p>
          <ol className="flex flex-col gap-2">
            {[
              ["Definicja", "czym jest zasada lub wzorzec"],
              ["Przykład z życia", "analogia spoza świata kodu"],
              ["Naruszenie", "jak wygląda problem w kodzie Java"],
              ["Poprawne zastosowanie", "jak to naprawić"],
              ["Dlaczego to ważne?", "konsekwencje i korzyści"],
              ["Kiedy stosować?", "sygnały i praktyczne wskazówki"],
            ].map(([title, desc], i) => (
              <li key={i} className="flex items-baseline gap-3">
                <span className="w-4 shrink-0 font-mono text-[10px] text-text-faint">
                  {i + 1}.
                </span>
                <span className="font-mono text-xs">
                  <strong className="text-text-primary">{title}</strong>
                  <span className="text-text-faint"> — {desc}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </SidebarLayout>
  );
}
