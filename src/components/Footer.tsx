import Link from "next/link";
import { Globe, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex h-13 max-w-6xl items-center justify-between px-6 py-4">
        <span className="font-mono text-xs text-text-muted">
          patterns.anavers.pl
        </span>

        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/ania-sk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-xs text-text-muted transition-colors hover:text-text-primary"
            aria-label="GitHub — ania-ska"
          >
            <Github size={14} aria-hidden="true" />
            ania-ska
          </Link>

          <div className="h-3.5 w-px bg-border" aria-hidden="true" />

          <Link
            href="https://anavers.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-xs text-text-muted transition-colors hover:text-text-primary"
            aria-label="Portfolio — anavers.pl"
          >
            <Globe size={14} aria-hidden="true" />
            anavers.pl
          </Link>
        </div>
      </div>
    </footer>
  );
}
