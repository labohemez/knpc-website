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
  const [modal, setModal] = useState<Sermon | null>(null);

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
        <section className="relative h-[180px] lg:h-[220px] flex items-end pb-8 lg:pb-10 overflow-hidden bg-[#294a3a]">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,1) 20px, rgba(255,255,255,1) 21px)" }} />
          <div className="relative mx-auto max-w-[1400px] px-5 lg:px-8 w-full flex items-end justify-between">
            <div>
              <p className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-[#c69d6c] mb-1">
                Sermons
              </p>
              <h1 className="text-[1.6rem] lg:text-[2.2rem] font-bold text-white tracking-[-0.04em] leading-[1.15]">
                말씀과 찬양
              </h1>
            </div>
            <p className="hidden lg:block text-[0.72rem] text-white/30 tracking-[-0.01em]">
              총 {sermons.length}편의 설교
            </p>
          </div>
        </section>

        {/* ── 최신 설교 ── */}
        {featured && activeCategory === "전체" && (
          <section className="bg-[#faf8f5] py-8 lg:py-12">
            <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
              <ScrollReveal>
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
                  {/* 썸네일 */}
                  <div className="relative w-full lg:w-[480px] aspect-video rounded-lg overflow-hidden shrink-0 shadow-md group cursor-pointer" onClick={() => setModal(featured)}>
                    <Image
                      src={thumbnailUrl(featured)}
                      alt={featured.title}
                      fill
                      className="object-cover group-hover:scale-105 group-hover:brightness-90 transition-all duration-500"
                    />
                    {featured.videoUrl && (
                      <button
                        onClick={() => setModal(featured)}
                        className="absolute inset-0 flex items-center justify-center group cursor-pointer"
                        aria-label="영상 보기"
                      >
                        <div className="group-hover:scale-110 transition-all duration-300 drop-shadow-lg">
                          <svg className="w-12 h-9" viewBox="0 0 68 48">
                            <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="red"/>
                            <path d="M45 24L27 14v20" fill="white"/>
                          </svg>
                        </div>
                      </button>
                    )}
                  </div>

                  {/* 텍스트 */}
                  <div className="flex-1 flex flex-col justify-center py-2">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c69d6c]" />
                      <span className="text-[0.68rem] font-semibold text-[#c69d6c] tracking-[0.1em] uppercase">최신 설교</span>
                      <span className="text-[0.68rem] text-[#999] bg-[#f0ede8] px-2.5 py-0.5 rounded-full">{featured.category}</span>
                    </div>

                    <h2 className="text-[1.5rem] lg:text-[1.9rem] font-bold text-[#222] tracking-[-0.04em] leading-[1.3] mb-3">
                      {featured.title}
                    </h2>

                    {featured.scripture && (
                      <p className="text-[0.85rem] text-[#888] tracking-[-0.01em] mb-1">
                        {featured.scripture}
                      </p>
                    )}

                    <p className="text-[0.82rem] text-[#aaa] tracking-[-0.01em] mb-6">
                      {featured.pastor} · {formatDate(featured.date)}
                    </p>

                    {featured.videoUrl && (
                      <div>
                        <button
                          onClick={() => setModal(featured)}
                          className="inline-flex items-center gap-2 bg-[#294a3a] text-white px-6 py-2.5 text-[0.82rem] font-semibold rounded-lg hover:bg-[#1e3a2d] transition-colors duration-200 cursor-pointer"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          영상 보기
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* ── 설교 목록 ── */}
        <section className="flex-1 bg-[#faf8f5] py-8 lg:py-12">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">

            {/* 카테고리 필터 */}
            <ScrollReveal>
              <div className="flex items-center gap-2 flex-wrap mb-8 lg:mb-10">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setPage(1); }}
                    className={`px-4 py-1.5 text-[0.8rem] font-medium tracking-[-0.01em] rounded-full transition-all duration-200 ${
                      activeCategory === cat
                        ? "bg-[#294a3a] text-white"
                        : "bg-white border border-[#e0dcd6] text-[#888] hover:border-[#294a3a] hover:text-[#294a3a]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            {/* 카드 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
              {list.map((sermon) => (
                <ScrollReveal key={sermon._id}>
                  <div onClick={() => setModal(sermon)}
                    className="bg-white rounded-lg overflow-hidden border border-[#ece8e2] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer">
                    {/* 썸네일 */}
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={thumbnailUrl(sermon)}
                        alt={sermon.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
                        <div className="hover:scale-110 transition-all duration-300 drop-shadow-lg">
                          <svg className="w-10 h-7" viewBox="0 0 68 48">
                            <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="red"/>
                            <path d="M45 24L27 14v20" fill="white"/>
                          </svg>
                        </div>
                      </div>
                      <span className="absolute top-2.5 left-2.5 bg-[#294a3a]/80 text-white text-[0.65rem] font-medium px-2 py-0.5 rounded">
                        {sermon.category}
                      </span>
                    </div>

                    {/* 카드 바디 */}
                    <div className="p-4">
                      <h3 className="text-[0.88rem] font-semibold text-[#222] tracking-[-0.03em] leading-[1.45] mb-1 group-hover:text-[#294a3a] transition-colors line-clamp-2">
                        {sermon.title}
                      </h3>
                      {sermon.scripture && (
                        <p className="text-[0.72rem] text-[#aaa] tracking-[-0.01em] mb-3">
                          {sermon.scripture}
                        </p>
                      )}
                      <div className="flex items-center justify-between pt-3 border-t border-[#f0ede8]">
                        <p className="text-[0.7rem] text-[#bbb] tracking-[-0.01em]">
                          {sermon.pastor}
                        </p>
                        <p className="text-[0.7rem] text-[#ccc] tracking-[-0.01em]">
                          {formatDate(sermon.date)}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* 빈 상태 */}
            {list.length === 0 && (
              <div className="text-center py-20">
                <p className="text-[0.95rem] text-[#999]">
                  해당 카테고리의 설교가 없습니다.
                </p>
              </div>
            )}

            {/* 페이징 */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1 mt-12">
                <button
                  onClick={() => { setPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  disabled={page === 1}
                  className="px-3 py-2 text-[0.8rem] text-[#aaa] hover:text-[#555] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  ← 이전
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className={`w-9 h-9 text-[0.8rem] font-medium rounded-lg transition-all ${
                      page === p
                        ? "bg-[#294a3a] text-white"
                        : "text-[#aaa] hover:bg-[#f0ede8] hover:text-[#555]"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  disabled={page === totalPages}
                  className="px-3 py-2 text-[0.8rem] text-[#aaa] hover:text-[#555] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  다음 →
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* ── 영상 모달 ── */}
      {modal && modal.videoUrl && (
        <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <button onClick={() => setModal(null)} className="absolute top-4 right-4 lg:top-6 lg:right-6 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white z-10">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="w-full max-w-[900px]" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${extractYoutubeId(modal.videoUrl)}?autoplay=1&rel=0`}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
            <div className="mt-4">
              <h3 className="text-white text-[1.1rem] font-bold tracking-[-0.03em]">{modal.title}</h3>
              <div className="flex items-center gap-2 mt-1.5">
                {modal.scripture && <p className="text-white/50 text-[0.8rem]">{modal.scripture}</p>}
                <span className="text-white/20">·</span>
                <p className="text-white/40 text-[0.8rem]">{modal.pastor}</p>
                <span className="text-white/20">·</span>
                <p className="text-white/30 text-[0.8rem]">{formatDate(modal.date)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
