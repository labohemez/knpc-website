"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const categories = ["전체", "주일설교", "수요설교", "특별집회", "새벽기도"];

const sermons = [
  {
    id: 1,
    title: "온전한 믿음이란 무엇인가",
    series: "야고보서 강해",
    scripture: "야고보서 2:14-26",
    pastor: "홍길동 목사",
    date: "2026.03.29",
    category: "주일설교",
    part: "2부",
    thumbnail: "/images/gallery-1.jpg",
    videoId: "eKtED6_4l3U",
    featured: true,
  },
  {
    id: 2,
    title: "두려움을 이기는 믿음",
    series: "야고보서 강해",
    scripture: "야고보서 1:2-8",
    pastor: "홍길동 목사",
    date: "2026.03.22",
    category: "주일설교",
    part: "2부",
    thumbnail: "/images/gallery-2.jpg",
    videoId: "",
    featured: false,
  },
  {
    id: 3,
    title: "기도하는 자의 복",
    series: "사순절 특별새벽기도",
    scripture: "마태복음 7:7-11",
    pastor: "홍길동 목사",
    date: "2026.03.18",
    category: "새벽기도",
    part: "",
    thumbnail: "/images/gallery-3.jpg",
    videoId: "",
    featured: false,
  },
  {
    id: 4,
    title: "부활의 소망으로 살라",
    series: "사순절 시리즈",
    scripture: "고린도전서 15:19-28",
    pastor: "홍길동 목사",
    date: "2026.03.15",
    category: "주일설교",
    part: "2부",
    thumbnail: "/images/gallery-4.jpg",
    videoId: "",
    featured: false,
  },
  {
    id: 5,
    title: "성령 안에서 기도하라",
    series: "기도학교",
    scripture: "에베소서 6:18-20",
    pastor: "부목사 김철수",
    date: "2026.03.11",
    category: "수요설교",
    part: "",
    thumbnail: "/images/gallery-5.jpg",
    videoId: "",
    featured: false,
  },
  {
    id: 6,
    title: "시험을 이기는 믿음",
    series: "야고보서 강해",
    scripture: "야고보서 1:12-18",
    pastor: "홍길동 목사",
    date: "2026.03.08",
    category: "주일설교",
    part: "2부",
    thumbnail: "/images/gallery-6.jpg",
    videoId: "",
    featured: false,
  },
  {
    id: 7,
    title: "말의 권세와 책임",
    series: "야고보서 강해",
    scripture: "야고보서 3:1-12",
    pastor: "홍길동 목사",
    date: "2026.03.01",
    category: "주일설교",
    part: "2부",
    thumbnail: "/images/gallery-1.jpg",
    videoId: "",
    featured: false,
  },
  {
    id: 8,
    title: "하나님께 가까이 나아가라",
    series: "수요말씀",
    scripture: "야고보서 4:7-10",
    pastor: "부목사 이영희",
    date: "2026.02.25",
    category: "수요설교",
    part: "",
    thumbnail: "/images/gallery-2.jpg",
    videoId: "",
    featured: false,
  },
  {
    id: 9,
    title: "인내로 완전하게 되는 길",
    series: "야고보서 강해",
    scripture: "야고보서 5:7-11",
    pastor: "홍길동 목사",
    date: "2026.02.22",
    category: "주일설교",
    part: "2부",
    thumbnail: "/images/gallery-3.jpg",
    videoId: "",
    featured: false,
  },
];

function PlayIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

export default function SermonsPage() {
  const [activeCategory, setActiveCategory] = useState("전체");

  const filtered = activeCategory === "전체"
    ? sermons
    : sermons.filter((s) => s.category === activeCategory);

  const featured = sermons.find((s) => s.featured);
  const list = filtered.filter((s) => !s.featured);

  return (
    <>
      <Header />

      <main className="flex-1 bg-white flex flex-col gap-3 pt-[70px] lg:pt-[90px]">
        {/* ── 히어로 ── */}
        <section className="relative h-[280px] lg:h-[380px] flex items-end pb-10 lg:pb-14">
          <Image
            src="/images/hero-1.jpg"
            alt="말씀과 찬양"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary-dark/80" />
          <div className="relative mx-auto max-w-[1400px] px-5 lg:px-8 w-full">
            <p className="text-accent text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-2">
              Sermons
            </p>
            <h1 className="text-[2.2rem] lg:text-[3rem] font-bold text-white tracking-[-0.04em] leading-[1.15]">
              말씀과 찬양
            </h1>
          </div>
        </section>

        {/* ── 최신 설교 (Featured) ── */}
        {featured && activeCategory === "전체" && (
          <section className="bg-white py-[4rem] lg:py-[5rem]">
            <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
              <ScrollReveal>
                <p className="text-accent text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-6">
                  Latest Sermon
                </p>
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                  <div className="relative w-full lg:w-[560px] aspect-video bg-[#111] overflow-hidden shrink-0">
                    <Image
                      src={featured.thumbnail}
                      alt={featured.title}
                      fill
                      className="object-cover opacity-80"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <a
                        href={`https://www.youtube.com/watch?v=${featured.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-16 h-16 bg-white/20 hover:bg-accent transition-colors duration-300 flex items-center justify-center backdrop-blur-sm"
                        aria-label="유튜브에서 보기"
                      >
                        <PlayIcon />
                      </a>
                    </div>
                    <div className="absolute top-3 left-3 bg-accent px-2.5 py-1 text-[0.7rem] font-bold text-white tracking-[-0.01em]">
                      최신
                    </div>
                  </div>
                  <div className="flex-1 py-2">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[0.72rem] font-semibold text-primary bg-primary/10 px-2.5 py-1 tracking-[-0.01em]">
                        {featured.category}
                      </span>
                      {featured.part && (
                        <span className="text-[0.72rem] text-[#999] tracking-[-0.01em]">{featured.part}</span>
                      )}
                    </div>
                    <h2 className="text-[1.5rem] lg:text-[1.9rem] font-bold text-[#222] tracking-[-0.04em] leading-[1.3] mb-3">
                      {featured.title}
                    </h2>
                    <p className="text-[0.85rem] text-primary font-medium tracking-[-0.02em] mb-1">{featured.series}</p>
                    <p className="text-[0.85rem] text-[#777] tracking-[-0.02em] mb-1">{featured.scripture}</p>
                    <p className="text-[0.82rem] text-[#999] tracking-[-0.02em]">{featured.pastor} · {featured.date}</p>
                    <div className="mt-6 flex gap-3">
                      <a
                        href={`https://www.youtube.com/watch?v=${featured.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 text-[0.82rem] font-semibold tracking-[-0.02em] hover:bg-primary-dark transition-colors duration-300"
                      >
                        <PlayIcon />
                        영상 보기
                      </a>
                      <button className="inline-flex items-center gap-2 border border-[#ddd] text-[#555] px-5 py-3 text-[0.82rem] font-medium tracking-[-0.02em] hover:border-primary hover:text-primary transition-colors duration-300">
                        <DownloadIcon />
                        음성 파일
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* ── 설교 목록 ── */}
        <section className="py-[4rem] lg:py-[5rem] bg-[#f5f5f7]">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            {/* 필터 탭 */}
            <ScrollReveal>
              <div className="flex items-center gap-2 flex-wrap mb-8 lg:mb-10">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 text-[0.82rem] font-medium tracking-[-0.02em] transition-colors duration-200 ${
                      activeCategory === cat
                        ? "bg-primary text-white"
                        : "bg-white border border-[#ddd] text-[#555] hover:border-primary hover:text-primary"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            {/* 설교 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {(activeCategory === "전체" ? list : filtered).map((sermon) => (
                <ScrollReveal key={sermon.id}>
                  <article className="bg-white group cursor-pointer">
                    <div className="relative aspect-video overflow-hidden bg-[#111]">
                      <Image
                        src={sermon.thumbnail}
                        alt={sermon.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                          <PlayIcon />
                        </div>
                      </div>
                      <div className="absolute top-2.5 left-2.5 bg-black/60 px-2 py-0.5 text-[0.68rem] font-medium text-white/90 tracking-[-0.01em]">
                        {sermon.category}
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-[0.75rem] text-accent font-medium tracking-[-0.01em] mb-1.5">{sermon.series}</p>
                      <h3 className="text-[0.95rem] font-bold text-[#222] tracking-[-0.03em] leading-[1.4] mb-2 group-hover:text-primary transition-colors">
                        {sermon.title}
                      </h3>
                      <p className="text-[0.78rem] text-[#888] tracking-[-0.02em]">{sermon.scripture}</p>
                      <div className="mt-3 pt-3 border-t border-[#f0f0f0] flex items-center justify-between">
                        <p className="text-[0.75rem] text-[#999] tracking-[-0.02em]">{sermon.pastor}</p>
                        <p className="text-[0.75rem] text-[#bbb] tracking-[-0.02em]">{sermon.date}</p>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>

            {/* 더 보기 */}
            <ScrollReveal>
              <div className="mt-10 text-center">
                <button className="px-10 py-3.5 border border-[#ddd] text-[0.85rem] font-medium text-[#555] tracking-[-0.02em] hover:border-primary hover:text-primary transition-colors duration-300">
                  더 보기
                </button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
