"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { type Sermon } from "@/lib/queries";

const categories = ["전체", "주일예배", "수요예배", "새벽기도회", "금요기도회", "특별예배", "청년예배"];

function PlayIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function extractYoutubeId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([^&?/]+)/);
  return match ? match[1] : null;
}

function toWatchUrl(url: string): string {
  const id = extractYoutubeId(url);
  return id ? `https://www.youtube.com/watch?v=${id}` : url;
}

function thumbnailUrl(sermon: Sermon): string {
  if (sermon.videoUrl) {
    const id = extractYoutubeId(sermon.videoUrl);
    if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }
  return "/images/gallery-1.jpg";
}

function formatDate(d: string) {
  return d.replace(/-/g, ".");
}

const PER_PAGE = 12;

export default function SermonsClient({ sermons }: { sermons: Sermon[] }) {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [page, setPage] = useState(1);

  const filtered = activeCategory === "전체"
    ? sermons
    : sermons.filter((s) => s.category === activeCategory);

  const featured = sermons[0];
  const allList = activeCategory === "전체" ? filtered.slice(1) : filtered;
  const totalPages = Math.ceil(allList.length / PER_PAGE);
  const list = allList.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <Header />

      <main className="flex-1 bg-white flex flex-col gap-3 pt-[70px] lg:pt-[90px]">
        {/* ── 히어로 ── */}
        <section className="relative h-[280px] lg:h-[380px] flex items-end pb-10 lg:pb-14">
          <Image src="/images/hero-1.jpg" alt="말씀과 찬양" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-primary-dark/80" />
          <div className="relative mx-auto max-w-[1400px] px-5 lg:px-8 w-full">
            <p className="text-accent text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-2">Sermons</p>
            <h1 className="text-[2.2rem] lg:text-[3rem] font-bold text-white tracking-[-0.04em] leading-[1.15]">말씀과 찬양</h1>
          </div>
        </section>

        {/* ── 최신 설교 ── */}
        {featured && activeCategory === "전체" && (
          <section className="bg-white py-[4rem] lg:py-[5rem]">
            <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
              <ScrollReveal>
                <p className="text-accent text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-6">Latest Sermon</p>
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                  <div className="relative w-full lg:w-[560px] aspect-video bg-[#111] overflow-hidden shrink-0">
                    <Image src={thumbnailUrl(featured)} alt={featured.title} fill className="object-cover opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {featured.videoUrl && (
                        <a href={toWatchUrl(featured.videoUrl)} target="_blank" rel="noopener noreferrer"
                          className="w-16 h-16 bg-white/20 hover:bg-accent transition-colors duration-300 flex items-center justify-center backdrop-blur-sm text-white"
                          aria-label="유튜브에서 보기">
                          <PlayIcon />
                        </a>
                      )}
                    </div>
                    <div className="absolute top-3 left-3 bg-accent px-2.5 py-1 text-[0.7rem] font-bold text-white tracking-[-0.01em]">최신</div>
                  </div>
                  <div className="flex-1 py-2">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[0.72rem] font-semibold text-primary bg-primary/10 px-2.5 py-1 tracking-[-0.01em]">{featured.category}</span>
                    </div>
                    <h2 className="text-[1.5rem] lg:text-[1.9rem] font-bold text-[#222] tracking-[-0.04em] leading-[1.3] mb-3">{featured.title}</h2>
                    {featured.scripture && <p className="text-[0.85rem] text-[#777] tracking-[-0.02em] mb-1">{featured.scripture}</p>}
                    <p className="text-[0.82rem] text-[#999] tracking-[-0.02em]">{featured.pastor} · {formatDate(featured.date)}</p>
                    {featured.videoUrl && (
                      <div className="mt-6">
                        <a href={toWatchUrl(featured.videoUrl)} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 text-[0.82rem] font-semibold tracking-[-0.02em] hover:bg-primary-dark transition-colors duration-300">
                          <PlayIcon /> 영상 보기
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* ── 설교 목록 ── */}
        <section className="py-[4rem] lg:py-[5rem] bg-[#f5f5f7]">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            <ScrollReveal>
              <div className="flex items-center gap-2 flex-wrap mb-8 lg:mb-10">
                {categories.map((cat) => (
                  <button key={cat} onClick={() => { setActiveCategory(cat); setPage(1); }}
                    className={`px-5 py-2 text-[0.82rem] font-medium tracking-[-0.02em] transition-colors duration-200 ${
                      activeCategory === cat
                        ? "bg-primary text-white"
                        : "bg-white border border-[#ddd] text-[#555] hover:border-primary hover:text-primary"
                    }`}>
                    {cat}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {list.map((sermon) => (
                <ScrollReveal key={sermon._id}>
                  <article className="bg-white group cursor-pointer">
                    <div className="relative aspect-video overflow-hidden bg-[#111]">
                      <Image src={thumbnailUrl(sermon)} alt={sermon.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                          <PlayIcon />
                        </div>
                      </div>
                      <div className="absolute top-2.5 left-2.5 bg-black/60 px-2 py-0.5 text-[0.68rem] font-medium text-white/90 tracking-[-0.01em]">{sermon.category}</div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-[0.95rem] font-bold text-[#222] tracking-[-0.03em] leading-[1.4] mb-2 group-hover:text-primary transition-colors">{sermon.title}</h3>
                      {sermon.scripture && <p className="text-[0.78rem] text-[#888] tracking-[-0.02em]">{sermon.scripture}</p>}
                      <div className="mt-3 pt-3 border-t border-[#f0f0f0] flex items-center justify-between">
                        <p className="text-[0.75rem] text-[#999] tracking-[-0.02em]">{sermon.pastor}</p>
                        <p className="text-[0.75rem] text-[#bbb] tracking-[-0.02em]">{formatDate(sermon.date)}</p>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>

            {list.length === 0 && (
              <div className="text-center py-16">
                <p className="text-[0.95rem] text-[#999]">해당 카테고리의 설교가 없습니다.</p>
              </div>
            )}

            {/* 페이징 */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1 mt-10">
                <button
                  onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  disabled={page === 1}
                  className="px-3 py-2 text-[0.8rem] text-[#888] hover:text-[#333] disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ← 이전
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className={`w-9 h-9 text-[0.8rem] font-medium transition-colors ${
                      page === p
                        ? "bg-primary text-white"
                        : "text-[#888] hover:bg-[#eee]"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  disabled={page === totalPages}
                  className="px-3 py-2 text-[0.8rem] text-[#888] hover:text-[#333] disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  다음 →
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
