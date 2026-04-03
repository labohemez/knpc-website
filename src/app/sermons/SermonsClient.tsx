"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { type Sermon } from "@/lib/queries";

const categories = ["전체", "주일예배", "수요예배", "새벽기도회", "금요기도회", "특별예배", "청년예배"];

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

  const filtered =
    activeCategory === "전체"
      ? sermons
      : sermons.filter((s) => s.category === activeCategory);

  const featured = sermons[0];
  const allList = activeCategory === "전체" ? filtered.slice(1) : filtered;
  const totalPages = Math.ceil(allList.length / PER_PAGE);
  const list = allList.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <Header />

      <main className="flex-1 flex flex-col">

        {/* ── 히어로 배너 ── */}
        <section className="relative h-[310px] lg:h-[410px] flex items-end pb-8 lg:pb-12 overflow-hidden bg-[#0d0d0d]">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,0.04) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,0.04) 40px)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/60 to-transparent" />
          <div className="relative mx-auto max-w-[1400px] px-5 lg:px-8 w-full">
            <p className="text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-white/40 mb-2">
              Sermons
            </p>
            <h1 className="text-[2rem] lg:text-[2.8rem] font-bold text-white tracking-[-0.04em] leading-[1.15]">
              말씀과 찬양
            </h1>
          </div>
        </section>

        {/* ── 최신 설교 히어로 카드 ── */}
        {featured && activeCategory === "전체" && (
          <section className="bg-[#0d0d0d] pb-10 lg:pb-14">
            <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
              <ScrollReveal>
                <div className="relative rounded-xl overflow-hidden border border-white/8">
                  <div className="absolute inset-0">
                    <Image
                      src={thumbnailUrl(featured)}
                      alt={featured.title}
                      fill
                      className="object-cover opacity-20 blur-sm scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/90 to-[#0d0d0d]/50" />
                  </div>

                  <div className="relative flex flex-col lg:flex-row gap-8 p-6 lg:p-10 items-start">
                    <div className="relative w-full lg:w-[420px] aspect-video rounded-lg overflow-hidden shrink-0 bg-white/5 border border-white/10">
                      <Image
                        src={thumbnailUrl(featured)}
                        alt={featured.title}
                        fill
                        className="object-cover opacity-85"
                      />
                      {featured.videoUrl && (
                        <a
                          href={toWatchUrl(featured.videoUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 flex items-center justify-center group"
                          aria-label="유튜브에서 보기"
                        >
                          <div className="w-14 h-14 rounded-full bg-white/15 border border-white/30 flex items-center justify-center group-hover:bg-white/25 group-hover:scale-110 transition-all duration-300">
                            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </a>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-center py-2">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="flex items-center gap-1.5 text-[0.68rem] font-semibold tracking-[0.12em] uppercase text-white/50">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                          최신 설교
                        </span>
                        <span className="text-[0.72rem] font-medium text-white/30 bg-white/8 px-2.5 py-0.5 rounded-full">
                          {featured.category}
                        </span>
                      </div>

                      <h2 className="text-[1.6rem] lg:text-[2rem] font-bold text-white tracking-[-0.04em] leading-[1.3] mb-3">
                        {featured.title}
                      </h2>

                      {featured.scripture && (
                        <p className="text-[0.85rem] text-white/50 tracking-[-0.01em] mb-1.5">
                          {featured.scripture}
                        </p>
                      )}

                      <p className="text-[0.82rem] text-white/35 tracking-[-0.01em] mb-8">
                        {featured.pastor} · {formatDate(featured.date)}
                      </p>

                      {featured.videoUrl && (
                        <div className="flex items-center gap-3">
                          <a
                            href={toWatchUrl(featured.videoUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white text-[#0d0d0d] px-6 py-2.5 text-[0.82rem] font-semibold tracking-[-0.02em] rounded-lg hover:bg-white/90 transition-colors duration-200"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                            영상 보기
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* ── 설교 목록 ── */}
        <section className="flex-1 bg-[#0f0f0f] py-10 lg:py-14">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">

            <ScrollReveal>
              <div className="flex items-center gap-2 flex-wrap mb-8 lg:mb-10">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setPage(1); }}
                    className={`px-4 py-1.5 text-[0.8rem] font-medium tracking-[-0.01em] rounded-full transition-all duration-200 ${
                      activeCategory === cat
                        ? "bg-white text-[#0d0d0d]"
                        : "bg-white/8 border border-white/12 text-white/50 hover:bg-white/12 hover:text-white/70"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
              {list.map((sermon) => (
                <ScrollReveal key={sermon._id}>
                  <article className="group cursor-pointer rounded-lg overflow-hidden bg-white/5 border border-white/8 hover:border-white/18 transition-all duration-300 hover:-translate-y-0.5">
                    <div className="relative aspect-video overflow-hidden bg-[#1a1a2e]">
                      <Image
                        src={thumbnailUrl(sermon)}
                        alt={sermon.title}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-11 h-11 rounded-full bg-white/20 border border-white/40 flex items-center justify-center backdrop-blur-sm">
                          <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute top-2.5 left-2.5 bg-black/55 backdrop-blur-sm px-2 py-0.5 text-[0.68rem] font-medium text-white/85 rounded">
                        {sermon.category}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-[0.9rem] font-semibold text-white/90 tracking-[-0.03em] leading-[1.45] mb-1.5 group-hover:text-white transition-colors line-clamp-2">
                        {sermon.title}
                      </h3>
                      {sermon.scripture && (
                        <p className="text-[0.75rem] text-white/40 tracking-[-0.01em] mb-3">
                          {sermon.scripture}
                        </p>
                      )}
                      <div className="flex items-center justify-between pt-3 border-t border-white/8">
                        <p className="text-[0.72rem] text-white/40 tracking-[-0.01em]">
                          {sermon.pastor}
                        </p>
                        <p className="text-[0.72rem] text-white/25 tracking-[-0.01em]">
                          {formatDate(sermon.date)}
                        </p>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>

            {list.length === 0 && (
              <div className="text-center py-20">
                <p className="text-[0.95rem] text-white/30">
                  해당 카테고리의 설교가 없습니다.
                </p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1 mt-12">
                <button
                  onClick={() => { setPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  disabled={page === 1}
                  className="px-3 py-2 text-[0.8rem] text-white/40 hover:text-white/70 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                >
                  ← 이전
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className={`w-9 h-9 text-[0.8rem] font-medium rounded-lg transition-all ${
                      page === p
                        ? "bg-white text-[#0d0d0d]"
                        : "text-white/40 hover:bg-white/10 hover:text-white/70"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  disabled={page === totalPages}
                  className="px-3 py-2 text-[0.8rem] text-white/40 hover:text-white/70 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
