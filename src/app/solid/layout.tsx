import SidebarLayout from "@/components/SidebarLayout";

export default function SolidLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
