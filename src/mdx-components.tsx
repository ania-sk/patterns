import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import hljs from "highlight.js/lib/core";
import java from "highlight.js/lib/languages/java";

hljs.registerLanguage("java", java);

type Props = { children?: ReactNode };
type AnchorProps = { href?: string; children?: ReactNode };
type CodeProps = { children?: ReactNode; className?: string };
type TextProps = { children?: ReactNode };

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }: Props) => (
      <h1 className="mb-4 mt-10 font-mono text-2xl font-bold tracking-tight text-text-primary first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }: Props) => (
      <h2 className="mb-3 mt-8 font-mono text-lg font-bold tracking-tight text-text-primary">
        {children}
      </h2>
    ),
    h3: ({ children }: Props) => (
      <h3 className="mb-2 mt-6 font-mono text-base font-bold text-text-primary">
        {children}
      </h3>
    ),
    p: ({ children }: Props) => (
      <p className="mb-4 leading-relaxed text-text-muted">{children}</p>
    ),
    strong: ({ children }: Props) => (
      <strong className="font-bold text-text-primary">{children}</strong>
    ),
    em: ({ children }: Props) => (
      <em className="italic text-text-muted">{children}</em>
    ),
    ul: ({ children }: Props) => (
      <ul className="mb-4 ml-4 space-y-1.5 text-text-muted">{children}</ul>
    ),
    ol: ({ children }: Props) => (
      <ol className="mb-4 ml-4 list-decimal space-y-1.5 text-text-muted">
        {children}
      </ol>
    ),
    li: ({ children }: Props) => (
      <li className="flex items-start gap-2 leading-relaxed">
        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
        <span>{children}</span>
      </li>
    ),
    blockquote: ({ children }: Props) => (
      <blockquote className="my-6 border-l-2 border-[var(--plum)] bg-surface py-3 pl-4 pr-3">
        <div className="font-mono text-sm italic text-text-primary">
          {children}
        </div>
      </blockquote>
    ),
    text: ({ children }: TextProps) => (
      <div className="mb-4 leading-relaxed text-text-muted">{children}</div>
    ),
    pre: ({ children }: Props) => (
      <pre className="mb-6 overflow-x-auto rounded-lg  bg-surface p-4 text-sm">
        {children}
      </pre>
    ),

    br: () => <br />,
    code: ({ children, className }: CodeProps) => {
      const isBlock = !!className?.includes("language-");

      // bloki z jawnym językiem (java, ts, itp.)
      if (isBlock) {
        const language = className?.replace("language-", "") ?? "";
        const code = String(children).trim();

        try {
          const highlighted = hljs.getLanguage(language)
            ? hljs.highlight(code, { language }).value
            : hljs.highlightAuto(code).value;

          return (
            <code
              className={`hljs language-${language}`}
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          );
        } catch {
          return <code>{code}</code>;
        }
      }

      // bloki bez języka (``` bez suffixu) — diagramy ASCII
      if (
        !className &&
        typeof children === "string" &&
        children.includes("\n")
      ) {
        return (
          <pre className="not-prose rounded-lg overflow-x-auto p-4 my-6 text-sm font-mono leading-relaxed bg-surface-hover text-primary">
            <code>{String(children).trim()}</code>
          </pre>
        );
      }

      // inline `kod`
      return (
        <code className="rounded  bg-surface-hover px-1.5 py-0.5 font-mono text-xs text-accent">
          {children}
        </code>
      );
    },
    hr: () => <hr className="my-8 border-border" />,
    a: ({ href, children }: AnchorProps) => (
      <a
        href={href}
        className="text-accent underline underline-offset-4 transition-colors hover:text-accent-hover"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    ...components,
  };
}
