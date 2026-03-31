import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "강남교회",
    template: "%s | 강남교회",
  },
  description: "대한예수교장로회 강남교회 공식 홈페이지",
  keywords: ["강남교회", "교회", "예배", "설교", "대한예수교장로회"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`h-full ${notoSansKR.variable}`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
