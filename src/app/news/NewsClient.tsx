"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import type { NewsItem } from "@/lib/queries";

const tabs = ["공지사항", "교회소식", "주보"] as const;
type Tab = (typeof tabs)[number];

function formatDate(d: string) {
  return d.replace(/-/g, ".");
}

function PdfIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

export default function NewsClient({
  notices,
  churchNews,
  bulletins,
}: {
  notices: NewsItem[];
  churchNews: NewsItem[];
  bulletins: NewsItem[];
}) {
  const [activeTab, setActiveTab] = useState<Tab>("공지사항");

  return (
    <>
      <Header />

      <main className="flex-1 bg-white flex flex-col gap-3 pt-[70px] lg:pt-[90px]">
        {/* ── 히어로 ── */}
        <section className="relative h-[280px] lg:h-[380px] flex items-end pb-10 lg:pb-14">
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
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-6 lg:px-8 py-4 text-[0.88rem] font-semibold tracking-[-0.02em] transition-colors duration-200 border-b-2 -mb-[2px] ${
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
                <div className="divide-y divide-[#f0f0f0]">
                  {bulletins.map((item) => (
                    <div key={item._id} className="py-4 lg:py-5 flex items-center gap-4 group cursor-pointer hover:bg-[#fafaf8] -mx-4 px-4 transition-colors duration-200">
                      <div className="text-accent shrink-0"><PdfIcon /></div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[0.92rem] font-semibold text-[#222] tracking-[-0.03em] group-hover:text-primary transition-colors truncate">{item.title}</h3>
                        <p className="text-[0.75rem] text-[#bbb] tracking-[-0.02em] mt-0.5">{formatDate(item.date)}</p>
                      </div>
                      <div className="shrink-0 text-[#ccc] group-hover:text-primary transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
