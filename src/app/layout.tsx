import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SidebarProvider } from "@/components/context/SidebarContext";
import "./globals.css";
import "highlight.js/styles/github-dark-dimmed.css";
import { QuizProvider } from "@/components/context/QuizContext";

export const metadata: Metadata = {
  title: {
    default: "patterns — wzorce projektowe",
    template: "%s · patterns",
  },
  description:
    "Notatnik programisty do nauki wzorców projektowych SOLID i nie tylko.",
  metadataBase: new URL("https://patterns.anavers.pl"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pl"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <QuizProvider>
              <Navbar />

              {children}

              <Footer />
            </QuizProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
