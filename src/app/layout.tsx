import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/layout/Navbar";
import Foooter from "@/components/layout/Footer";
import "./globals.css";

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
          <Navbar />
          <main className=" max-w-6xl px-6 py-10">{children}</main>
          <Foooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
