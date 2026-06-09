"use client";

// components/SidebarLayout.tsx
// Layout dla sekcji /solid i /patterns.
// Odpowiedzialność: grid desktop + szuflada sidebar na mobile.
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { X, PanelLeft } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useSidebar } from "./context/SidebarContext";
import { useQuiz } from "@/components/context/QuizContext";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SIDEBAR_WIDTH = "w-[280px] xl:w-[300px]";

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const pathname = usePathname();
  const {
    isOpen: sidebarOpen,
    close: closeSidebar,
    open: openSidebar,
  } = useSidebar();
  const { dismiss } = useQuiz();

  // Zamknij szufladę i quiz po zmianie strony
  useEffect(() => {
    dismiss();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    closeSidebar();
  }, [pathname]);

  // Zablokuj scroll body gdy szuflada otwarta
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  // Zamknij na Escape
  useEffect(() => {
    if (!sidebarOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSidebar();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [sidebarOpen]);

  return (
    <div className="relative mx-auto flex min-h-[calc(100vh-56px)] w-full">
      {/* ══ DESKTOP: sidebar statyczny ══════════════════════════════════════ */}
      <aside
        className={`
          hidden lg:flex lg:flex-col
          ${SIDEBAR_WIDTH} shrink-0
          sticky top-14 h-[calc(100vh-56px)]
          border-r border-border bg-background
          overflow-y-auto
        `}
        aria-label="Nawigacja boczna"
      >
        <Sidebar />
      </aside>

      {/* ══ MOBILE: przycisk otwierający szufladę ═══════════════════════════ */}
      {/* Widoczny tylko poniżej lg */}
      <button
        onClick={openSidebar}
        className="
          fixed bottom-5 left-4 z-40
          flex items-center gap-2
          rounded-full border border-border
          bg-background px-4 py-2.5 shadow-lg
          font-mono text-xs text-text-muted
          transition-colors hover:border-accent hover:text-accent
          lg:hidden
        "
        aria-label="Otwórz nawigację"
        aria-expanded={sidebarOpen}
        aria-controls="mobile-sidebar"
      >
        <PanelLeft size={14} />
        Nawigacja
      </button>

      {/* ══ MOBILE: overlay ══════════════════════════════════════════════════ */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          aria-hidden="true"
          onClick={closeSidebar}
        />
      )}

      {/* ══ MOBILE: szuflada sidebar ════════════════════════════════════════ */}
      <aside
        id="mobile-sidebar"
        role="dialog"
        aria-label="Nawigacja boczna"
        aria-modal="true"
        className={`
          fixed inset-y-0 left-0 z-50
          ${SIDEBAR_WIDTH}
          flex flex-col
          border-r border-border bg-background
          shadow-2xl
          transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          lg:hidden
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Nagłówek szuflady */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
          <span className="font-mono text-xs font-bold text-text-muted uppercase tracking-widest">
            Nawigacja
          </span>
          <button
            onClick={closeSidebar}
            className="flex h-7 w-7 items-center justify-center rounded border border-border text-text-muted transition-colors hover:border-accent hover:text-accent"
            aria-label="Zamknij nawigację"
          >
            <X size={13} />
          </button>
        </div>

        {/* Zawartość — ten sam komponent co desktop */}
        <div className="flex-1 overflow-y-auto">
          <Sidebar />
        </div>
      </aside>

      {/* ══ GŁÓWNA TREŚĆ ══════════════════════════════════════════════════════ */}
      <main
        className="
          flex-1 min-w-0
          px-4 py-8
          sm:px-8
          lg:px-12 lg:py-10
          xl:px-16
        "
      >
        {/* Maksymalna szerokość tekstu dla czytelności */}
        <div className="mx-auto max-w-3xl">{children}</div>
      </main>
    </div>
  );
}
