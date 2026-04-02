import type { Metadata } from "next";

export const metadata: Metadata = { title: "강남교회 CMS" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
