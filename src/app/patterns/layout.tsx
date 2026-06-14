import SidebarLayout from "@/components/SidebarLayout";

export default function PatternsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
