// app/solid/[slug]/page.tsx
// Dynamiczna strona pojedynczej zasady SOLID.
// Ładuje plik MDX z content/solid/[slug].mdx i renderuje go w layoucie.

import { notFound } from "next/navigation";
import { getPrinciple, getAdjacentPrinciples } from "@/lib/principles";

import PrincipleHero from "@/components/PrincipleHero";
import PrinciplePageClient from "@/components/PrinciplePageClient";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

// ─── Typy ────────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ─── Generowanie statycznych ścieżek ─────────────────────────────────────────

export function generateStaticParams() {
  return [
    { slug: "srp" },
    { slug: "ocp" },
    { slug: "lsp" },
    { slug: "isp" },
    { slug: "dip" },
  ];
}

// ─── Metadane strony ──────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const principle = getPrinciple(slug);

  if (!principle) return { title: "Nie znaleziono" };

  return {
    title: `${principle.fullName} | patterns.anavers.pl`,
    description: principle.tagline,
  };
}

// ─── Dynamiczny import MDX ────────────────────────────────────────────────────
// Każdy plik MDX jest importowany lazy — Next.js bundluje tylko to co potrzebne.

async function getMdxContent(slug: string) {
  try {
    const { default: Content } = await import(`@/content/solid/${slug}.mdx`);
    return Content;
  } catch {
    return null;
  }
}

// ─── Strona ───────────────────────────────────────────────────────────────────

export default async function SolidPrinciplePage({ params }: PageProps) {
  const { slug } = await params;
  const principle = getPrinciple(slug);

  // Nieznany slug → 404
  if (!principle) notFound();

  // Zasada jeszcze nieomówiona (todo) → 404
  // (linki w sidebarze są wyłączone, ale ktoś może wpisać URL ręcznie)
  if (principle.status === "todo") notFound();

  const MdxContent = await getMdxContent(slug);
  const { prev, next } = getAdjacentPrinciples(slug);

  return (
    <>
      <PrinciplePageClient principle={principle}>
        {MdxContent ? (
          <article className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
            <MdxContent />
          </article>
        ) : (
          <EmptyState slug={slug} />
        )}
      </PrinciplePageClient>

      <nav
        className="mt-12 flex items-center justify-between border-t border-border pt-6"
        aria-label="Poprzednia i następna zasada"
      >
        {prev && prev.status !== "todo" ? (
          <Link
            href={`/solid/${prev.slug}`}
            className="group flex items-center gap-2 font-mono text-xs text-text-muted transition-colors hover:text-accent"
          >
            <ChevronLeft
              size={14}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            <span>
              <span className="block text-[10px] uppercase tracking-widest text-text-faint">
                Poprzednia
              </span>
              {prev.name}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {next && next.status !== "todo" ? (
          <Link
            href={`/solid/${next.slug}`}
            className="group flex items-center gap-2 font-mono text-xs text-text-muted transition-colors hover:text-accent"
          >
            <span className="text-right">
              <span className="block text-[10px] uppercase tracking-widest text-text-faint">
                Następna
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

function EmptyState({ slug }: { slug: string }) {
  return (
    <div className="rounded border border-dashed border-border px-6 py-10 text-center">
      <p className="mb-1 font-mono text-sm font-bold text-text-primary">
        Notatki w przygotowaniu
      </p>
      <p className="font-mono text-xs text-text-muted">
        Utwórz plik{" "}
        <code className="rounded bg-surface-hover px-1.5 py-0.5 text-accent">
          content/solid/{slug}.mdx
        </code>{" "}
        i zacznij pisać notatki.
      </p>
    </div>
  );
}
