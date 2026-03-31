"use client";

import { useState } from "react";

const tabs = ["공지사항", "모임안내", "교회소식", "교회주보"];

const newsData: Record<string, { title: string; date: string; isNew?: boolean }[]> = {
  "공지사항": [
    { title: "총여전도회 바자회 안내", date: "2026.03.27", isNew: true },
    { title: "2026년 부활절 연합예배 안내", date: "2026.03.25", isNew: true },
    { title: "교회 주차장 이용 안내", date: "2026.03.20" },
  ],
  "모임안내": [
    { title: "2026년 3월 29일 모임안내", date: "2026.03.27", isNew: true },
    { title: "2026년 3월 22일 모임안내", date: "2026.03.20" },
    { title: "2026년 3월 15일 모임안내", date: "2026.03.13" },
  ],
  "교회소식": [
    { title: "2026년 3월 29일 교회소식", date: "2026.03.27", isNew: true },
    { title: "봄 수련회 참가 신청 안내", date: "2026.03.20" },
    { title: "새가족 환영 모임 일정", date: "2026.03.18" },
  ],
  "교회주보": [
    { title: "2026년 3월 29일 주보", date: "2026.03.27", isNew: true },
    { title: "2026년 3월 22일 주보", date: "2026.03.20" },
    { title: "2026년 3월 15일 주보", date: "2026.03.13" },
  ],
};

export default function NewsSection() {
  const [activeTab, setActiveTab] = useState("공지사항");

  return (
    <section className="py-[5rem] lg:py-[6rem] bg-[#f8f8f8]">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-accent text-[0.75rem] font-semibold tracking-[0.2em] uppercase mb-3">
              News
            </p>
            <h2 className="text-[1.8rem] lg:text-[2.2rem] font-bold text-[#222] tracking-[-0.04em]">
              교회 소식
            </h2>
          </div>
          <a
            href="/news"
            className="hidden sm:inline-flex items-center gap-2 text-[0.82rem] font-medium text-[#222] border border-[#222] px-5 py-2 hover:bg-[#222] hover:text-white transition-all duration-300 tracking-[-0.02em]"
          >
            전체보기
          </a>
        </div>

        {/* 탭 */}
        <div className="flex gap-0 border-b-2 border-primary mb-0">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-[0.85rem] font-semibold tracking-[-0.02em] transition-colors duration-200 ${
                activeTab === tab
                  ? "bg-primary text-white"
                  : "bg-white text-[#666] hover:text-[#222] hover:bg-[#f0f0f0]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 콘텐츠 */}
        <div className="bg-white border border-t-0 border-[#ddd]">
          {newsData[activeTab].map((news, i) => (
            <a
              key={news.title}
              href="/news"
              className="flex items-center gap-5 py-5 px-6 border-b border-[#eee] last:border-b-0 hover:bg-[#fafafa] transition-colors duration-200 group"
            >
              <span className="flex-1 text-[0.95rem] font-medium text-[#222] group-hover:text-primary transition-colors duration-200 truncate tracking-[-0.02em]">
                {news.title}
                {news.isNew && (
                  <span className="inline-block ml-2 w-[6px] h-[6px] rounded-full bg-[#D32F2F] align-middle" />
                )}
              </span>
              <span className="shrink-0 text-[0.8rem] text-[#b2b2b2] tracking-[0] hidden sm:block">
                {news.date}
              </span>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <a href="/news" className="text-[0.82rem] font-medium text-[#222] border border-[#222] px-5 py-2 hover:bg-[#222] hover:text-white transition-all duration-300">
            전체보기
          </a>
        </div>
      </div>
    </section>
  );
}
