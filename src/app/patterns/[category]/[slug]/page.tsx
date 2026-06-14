// app/patterns/[category]/[slug]/page.tsx
// Dynamiczna strona pojedynczego wzorca projektowego.
// Ładuje plik MDX z content/patterns/[category]/[slug].mdx

import { notFound } from "next/navigation";
import {
  getPattern,
  getAdjacentPatterns,
  getCategorySlug,
} from "@/lib/principles";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

// ─── Surowa treść MDX dla quizu ──────────────────────────────────────────────

function getMdxRawContent(category: string, slug: string): string {
  try {
    const filePath = path.join(
      process.cwd(),
      "src/content/patterns",
      category,
      `${slug}.mdx`,
    );
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return "";
  }
}

// ─── Statyczne parametry dla buildu ──────────────────────────────────────────

export function generateStaticParams() {
  return [
    { category: "creational", slug: "singleton" },
    { category: "creational", slug: "builder" },
    { category: "creational", slug: "factory-method" },
    { category: "creational", slug: "abstract-factory" },
    { category: "creational", slug: "prototype" },
    { category: "structural", slug: "adapter" },
    { category: "structural", slug: "decorator" },
    { category: "structural", slug: "facade" },
    { category: "structural", slug: "proxy" },
    { category: "behavioral", slug: "observer" },
    { category: "behavioral", slug: "strategy" },
    { category: "behavioral", slug: "command" },
    { category: "behavioral", slug: "iterator" },
  ];
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const result = getPattern(category, slug);

  if (!result) return { title: "Nie znaleziono" };

  return {
    title: `${result.pattern.name} | patterns.anavers.pl`,
    description: `Wzorzec projektowy ${result.pattern.name} — notatki i przykłady kodu.`,
  };
}

// ─── Dynamiczny import MDX ────────────────────────────────────────────────────

async function getMdxContent(category: string, slug: string) {
  try {
    const { default: Content } = await import(
      `@/content/patterns/${category}/${slug}.mdx`
    );
    return Content;
  } catch {
    return null;
  }
}

// ─── Strona ───────────────────────────────────────────────────────────────────

export default async function PatternPage({ params }: PageProps) {
  const { category, slug } = await params;
  const result = getPattern(category, slug);

  if (!result) notFound();

  const { pattern } = result;

  if (pattern.status === "todo") notFound();

  const content = getMdxRawContent(category, slug);
  const MdxContent = await getMdxContent(category, slug);
  const { prev, next } = getAdjacentPatterns(category, slug);

  return (
    <>
      {/* Hero */}
      <div className="mb-10 border-b border-border pb-8">
        <h1 className="mb-1 font-mono text-xl font-bold leading-tight tracking-tight text-text-primary sm:text-2xl">
          {pattern.name}
        </h1>
        <p className="font-mono text-[10px] uppercase tracking-widest text-text-faint">
          {result.group.label}
        </p>
      </div>

      {/* Treść MDX */}
      {MdxContent ? (
        <article className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
          <MdxContent />
        </article>
      ) : (
        <EmptyState category={category} slug={slug} />
      )}

      {/* Nawigacja prev/next */}
      <nav
        className="mt-12 flex items-center justify-between border-t border-border pt-6"
        aria-label="Poprzedni i następny wzorzec"
      >
        {prev && prev.status !== "todo" ? (
          <Link
            href={`/patterns/${category}/${prev.slug}`}
            className="group flex items-center gap-2 font-mono text-xs text-text-muted transition-colors hover:text-accent"
          >
            <ChevronLeft
              size={14}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            <span>
              <span className="block text-[10px] uppercase tracking-widest text-text-faint">
                Poprzedni
              </span>
              {prev.name}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {next && next.status !== "todo" ? (
          <Link
            href={`/patterns/${category}/${next.slug}`}
            className="group flex items-center gap-2 font-mono text-xs text-text-muted transition-colors hover:text-accent"
          >
            <span className="text-right">
              <span className="block text-[10px] uppercase tracking-widest text-text-faint">
                Następny
              </span>
              {next.name}
            </span>
            <ChevronRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </>
  );
}

// ─── Placeholder gdy brak pliku MDX ──────────────────────────────────────────

function EmptyState({ category, slug }: { category: string; slug: string }) {
  return (
    <div className="rounded border border-dashed border-border px-6 py-10 text-center">
      <p className="mb-1 font-mono text-sm font-bold text-text-primary">
        Notatki w przygotowaniu
      </p>
      <p className="font-mono text-xs text-text-muted">
        Utwórz plik{" "}
        <code className="rounded bg-surface-hover px-1.5 py-0.5 text-accent">
          content/patterns/{category}/{slug}.mdx
        </code>{" "}
        i zacznij pisać notatki.
      </p>
    </div>
  );
}
