export type Status = "done" | "in-progress" | "todo";

export interface Principle {
  slug: "srp" | "ocp" | "lsp" | "isp" | "dip";
  letter: string;
  name: string;
  fullName: string;
  tagline: string;
  status: Status;
}

export interface PatternGroup {
  label: string;
  patterns: Pattern[];
}

export interface Pattern {
  slug: string;
  name: string;
  status: Status;
}

//  Zasady SOLID
export const principles: Principle[] = [
  {
    slug: "srp",
    letter: "S",
    name: "Single Responsibility",
    fullName: "Single Responsibility Principle",
    tagline: "Jedna klasa — jeden powód do zmiany",
    status: "in-progress",
  },
  {
    slug: "ocp",
    letter: "O",
    name: "Open / Closed",
    fullName: "Open/Closed Principle",
    tagline: "Otwarte na rozszerzenie, zamknięte na modyfikację",
    status: "todo",
  },
  {
    slug: "lsp",
    letter: "L",
    name: "Liskov Substitution",
    fullName: "Liskov Substitution Principle",
    tagline: "Podklasa musi być wymienialnym zastępcą nadklasy",
    status: "todo",
  },
  {
    slug: "isp",
    letter: "I",
    name: "Interface Segregation",
    fullName: "Interface Segregation Principle",
    tagline: "Wiele małych interfejsów zamiast jednego dużego",
    status: "todo",
  },
  {
    slug: "dip",
    letter: "D",
    name: "Dependency Inversion",
    fullName: "Dependency Inversion Principle",
    tagline: "Zależności od abstrakcji, nie od konkretów",
    status: "todo",
  },
];

//Wzorce projektowe

export const patternGroups: PatternGroup[] = [
  {
    label: "Wzorce kreacyjne",
    patterns: [
      { slug: "singleton", name: "Singleton", status: "todo" },
      { slug: "builder", name: "Builder", status: "todo" },
      { slug: "factory-method", name: "Factory Method", status: "todo" },
      { slug: "abstract-factory", name: "Abstract Factory", status: "todo" },
      { slug: "prototype", name: "Prototype", status: "todo" },
    ],
  },
  {
    label: "Wzorce strukturalne",
    patterns: [
      { slug: "adapter", name: "Adapter", status: "todo" },
      { slug: "decorator", name: "Decorator", status: "todo" },
      { slug: "facade", name: "Facade", status: "todo" },
      { slug: "proxy", name: "Proxy", status: "todo" },
    ],
  },
  {
    label: "Wzorce behawioralne",
    patterns: [
      { slug: "observer", name: "Observer", status: "todo" },
      { slug: "strategy", name: "Strategy", status: "todo" },
      { slug: "command", name: "Command", status: "todo" },
      { slug: "iterator", name: "Iterator", status: "todo" },
    ],
  },
];

//  Helpery

export function getPrinciple(slug: string): Principle | undefined {
  return principles.find((p) => p.slug === slug);
}

/** Zwraca poprzednią i następną zasadę względem podanego sluga */
export function getAdjacentPrinciples(slug: string): {
  prev: Principle | null;
  next: Principle | null;
} {
  const idx = principles.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? principles[idx - 1] : null,
    next: idx < principles.length - 1 ? principles[idx + 1] : null,
  };
}

/** Etykieta statusu po polsku */
export const statusLabel: Record<Status, string> = {
  done: "ukończona",
  "in-progress": "w trakcie",
  todo: "wkrótce",
};
