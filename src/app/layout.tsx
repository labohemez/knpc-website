import type { Metadata } from "next";
import MobileNav from "@/components/MobileNav";
import "./globals.css";

import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

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
    <html lang="ko" className="h-full">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        {/* YouTube IFrame API 미리 로드 */}
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <script src="https://www.youtube.com/iframe_api" async />
      </head>
      <body className="min-h-full flex flex-col pb-16 lg:pb-0">
        {children}
        <MobileNav />
      </body>
    </html>
  );
}
