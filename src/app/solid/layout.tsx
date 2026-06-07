import SolidLayout from "@/components/SolidLayout";

interface SolidSectionLayoutProps {
  children: React.ReactNode;
}

export default function SolidSectionLayout({
  children,
}: SolidSectionLayoutProps) {
  return <SolidLayout>{children}</SolidLayout>;
}
