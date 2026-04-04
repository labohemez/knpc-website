"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import type { NewsItem } from "@/lib/queries";
import type { BulletinItem } from "./page";

const PdfViewer = dynamic(() => import("@/components/PdfViewer"), { ssr: false });

const tabs = ["공지사항", "교회소식", "주보"] as const;
type Tab = (typeof tabs)[number];

function formatDate(d: string) {
  return d.replace(/-/g, ".");
}

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;



export default function NewsClient({
  notices,
  churchNews,
  bulletinItems,
}: {
  notices: NewsItem[];
  churchNews: NewsItem[];
  bulletinItems: BulletinItem[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get("tab") as Tab | null;
  const [activeTab, setActiveTab] = useState<Tab>(tabs.includes(tabParam as Tab) ? tabParam! : "공지사항");
  const [selectedBulletin, setSelectedBulletin] = useState<BulletinItem | null>(null);

  function handleTabChange(tab: Tab) {
    setActiveTab(tab);
    router.replace(`?tab=${encodeURIComponent(tab)}`, { scroll: false });
  }

  return (
    <>
      <Header />

      <main className="flex-1 bg-white flex flex-col gap-3">
        {/* ── 히어로 ── */}
        <section className="relative h-[350px] lg:h-[470px] flex items-end pb-10 lg:pb-14">
          <Image src="/images/gallery-4.jpg" alt="교회 소식" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-primary-dark/80" />
          <div className="relative mx-auto max-w-[1400px] px-5 lg:px-8 w-full">
            <p className="text-accent text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-2">News</p>
            <h1 className="text-[2.2rem] lg:text-[3rem] font-bold text-white tracking-[-0.04em] leading-[1.15]">소식</h1>
          </div>
        </section>

        {/* ── 탭 + 콘텐츠 ── */}
        <section className="py-[4rem] lg:py-[5rem] bg-white">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            <ScrollReveal>
              <div className="flex border-b border-[#eee] mb-8 lg:mb-10">
                {tabs.map((tab) => (
                  <button key={tab} onClick={() => handleTabChange(tab)}
                    className={`px-6 lg:px-8 py-4 text-[0.88rem] font-semibold tracking-[-0.02em] transition-colors duration-200 border-b-2 -mb-[2px] cursor-pointer ${
                      activeTab === tab ? "text-primary border-primary" : "text-[#999] border-transparent hover:text-[#555]"
                    }`}>
                    {tab}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            {/* 공지사항 */}
            {activeTab === "공지사항" && (
              <ScrollReveal>
                <div className="divide-y divide-[#f0f0f0]">
                  {notices.map((item) => (
                    <Link key={item._id} href={`/news/${item._id}`} className="block py-5 lg:py-6 group hover:bg-[#fafaf8] -mx-4 px-4 transition-colors duration-200">
                      <div className="flex items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            {item.isNew && <span className="text-[0.68rem] font-bold text-white bg-primary px-2 py-0.5 tracking-[-0.01em] shrink-0">NEW</span>}
                            <h3 className="text-[0.95rem] font-semibold text-[#222] tracking-[-0.03em] group-hover:text-primary transition-colors truncate">{item.title}</h3>
                          </div>
                        </div>
                        <p className="shrink-0 text-[0.78rem] text-[#bbb] tracking-[-0.02em]">{formatDate(item.date)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </ScrollReveal>
            )}

            {/* 교회소식 */}
            {activeTab === "교회소식" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                {churchNews.map((item) => (
                  <ScrollReveal key={item._id}>
                    <Link href={`/news/${item._id}`} className="block group">
                      <h3 className="text-[0.95rem] font-bold text-[#222] tracking-[-0.03em] leading-[1.4] mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-[0.75rem] text-[#bbb] tracking-[-0.02em]">{formatDate(item.date)}</p>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            )}

            {/* 주보 */}
            {activeTab === "주보" && (
              <ScrollReveal>
                {bulletinItems.length === 0 ? (
                  <p className="text-[0.88rem] text-[#bbb] py-12 text-center">등록된 주보가 없습니다.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 lg:gap-7">
                    {bulletinItems.map((item) => {
                      const thumb = `https://res.cloudinary.com/${cloudName}/image/upload/w_400,pg_1/${item.pdf_public_id}.jpg`;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setSelectedBulletin(item)}
                          className="group flex flex-col cursor-pointer text-left"
                        >
                          <div className="border border-[#e8e8e8] rounded overflow-hidden mb-2.5 shadow-sm group-hover:shadow-md transition-shadow duration-200 bg-white w-full">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={thumb}
                              alt={item.title}
                              className="w-full aspect-[3/4] object-contain"
                            />
                          </div>
                          <p className="text-[0.82rem] font-semibold text-[#333] group-hover:text-primary transition-colors text-center w-full tracking-[-0.02em]">
                            {formatDate(item.date)}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                )}
              </ScrollReveal>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* 주보 모달 */}
      {selectedBulletin && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 overflow-y-auto py-8 px-4"
          onClick={() => setSelectedBulletin(null)}
        >
          <div
            className="relative w-full max-w-[900px] bg-white rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 헤더 */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#eee] sticky top-0 bg-white z-10">
              <p className="text-[0.92rem] font-bold text-[#222] tracking-[-0.02em]">
                {selectedBulletin.title}
              </p>
              <button
                onClick={() => setSelectedBulletin(null)}
                className="p-1.5 text-[#999] hover:text-[#333] transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* PDF 직접 렌더링 */}
            <PdfViewer url={`/api/bulletin/${selectedBulletin.id}/pdf`} pageCount={selectedBulletin.page_count} />
          </div>
        </div>
      )}
    </>
  );
}
