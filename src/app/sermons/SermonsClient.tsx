"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { type Sermon } from "@/lib/queries";

const sermonCategories = ["주일예배", "수요예배", "금요기도회", "새벽기도회", "특별예배", "청년1부", "청년2,3부"];
const praiseCategories = ["찬양-할렐루야", "찬양-호산나", "찬양-시온", "찬양-주일예배", "찬양-금요기도회", "찬양-기타"];

function extractYoutubeId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([^&?/]+)/);
  return match ? match[1] : null;
}

function toWatchUrl(url: string): string {
  const id = extractYoutubeId(url);
  return id ? `https://www.youtube.com/watch?v=${id}` : url;
}

function thumbnailUrl(sermon: Sermon): string {
  if (sermon.thumbnailUrl) return sermon.thumbnailUrl;
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

export default function WorshipClient({ sermons }: { sermons: Sermon[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const catParam = searchParams.get("cat");
  const [activeCategory, setActiveCategory] = useState(catParam || "주일예배");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<Sermon | null>(null);
  const [praiseOpen, setPraiseOpen] = useState(false);
  const praiseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (praiseRef.current && !praiseRef.current.contains(e.target as Node)) {
        setPraiseOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setActiveCategory(catParam || "주일예배");
    setPage(1);
  }, [catParam]);

  const filtered = sermons.filter((s) => s.category === activeCategory);

  const featured = activeCategory === "전체" ? sermons[0] : filtered[0];
  const allList = featured ? filtered.filter(s => s._id !== featured._id) : filtered;
  const totalPages = Math.ceil(allList.length / PER_PAGE);
  const list = allList.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <Header />

      <main className="flex-1 flex flex-col">

        <PageHero
          breadcrumbs={[
            { name: "홈", href: "/" },
            { name: "말씀과찬양", href: "/sermons" },
            { name: activeCategory },
          ]}
          title="말씀과 찬양"
        />

        {/* ── SubNav ── */}
        <div className="sticky top-0 z-20 bg-white border-b border-[#eee] shadow-sm">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            <div className="flex overflow-x-auto scrollbar-hide">
              {/* 설교 그룹 */}
              {sermonCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setPage(1); router.replace(`?cat=${encodeURIComponent(cat)}`, { scroll: false }); }}
                  className={`shrink-0 px-4 lg:px-5 py-4 text-[0.86rem] border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                    activeCategory === cat
                      ? "border-[#294a3a] text-[#294a3a] font-semibold"
                      : "border-transparent text-[#666] hover:text-[#294a3a]"
                  }`}
                >
                  {cat}
                </button>
              ))}
              {/* 구분선 */}
              <div className="shrink-0 flex items-center px-2">
                <div className="w-px h-4 bg-[#ddd]" />
              </div>
              {/* 찬양 드롭다운 탭 */}
              <div ref={praiseRef} className="relative shrink-0">
                <button
                  onClick={() => setPraiseOpen((o) => !o)}
                  className={`flex items-center gap-1 px-4 lg:px-5 py-4 text-[0.86rem] border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                    praiseCategories.includes(activeCategory)
                      ? "border-[#c69d6c] text-[#c69d6c] font-semibold"
                      : "border-transparent text-[#666] hover:text-[#c69d6c]"
                  }`}
                >
                  {praiseCategories.includes(activeCategory)
                    ? activeCategory.replace("찬양-", "")
                    : "찬양"}
                  <svg className={`w-3 h-3 transition-transform duration-200 ${praiseOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {praiseOpen && (
                  <div className="absolute top-full left-0 mt-0 bg-white border border-[#eee] shadow-lg z-30 min-w-[120px]">
                    {praiseCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setActiveCategory(cat);
                          setPage(1);
                          setPraiseOpen(false);
                          router.replace(`?cat=${encodeURIComponent(cat)}`, { scroll: false });
                        }}
                        className={`block w-full text-left px-4 py-2.5 text-[0.84rem] whitespace-nowrap transition-colors cursor-pointer ${
                          activeCategory === cat
                            ? "bg-[#f5f0e8] text-[#c69d6c] font-semibold"
                            : "text-[#555] hover:bg-[#faf8f5] hover:text-[#c69d6c]"
                        }`}
                      >
                        {cat.replace("찬양-", "")}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── 최신 설교 ── */}
        {featured && (
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


            {/* 카드 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
              {list.map((sermon) => (
                <ScrollReveal key={sermon._id}>
                  <div onClick={() => setModal(sermon)}
                    className="bg-white rounded-lg overflow-hidden border border-[#ece8e2] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer">
                    {/* 썸네일 */}
                    <div className="relative aspect-video overflow-hidden">
                      {sermon.audioUrl && !sermon.videoUrl ? (
                        <>
                          <Image src="/images/dawn-bg.png" alt="새벽기도회" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                          {sermon.scripture && (
                            <div className="absolute inset-0 flex items-center justify-end pr-8 -translate-y-3">
                              <span className="text-black/70 text-[1.2rem] font-light drop-shadow">{sermon.scripture.split(" ")[0]}</span>
                            </div>
                          )}
                        </>
                      ) : (
                        <Image
                          src={thumbnailUrl(sermon)}
                          alt={sermon.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
                        <div className="hover:scale-110 transition-all duration-300 drop-shadow-lg">
                          {sermon.audioUrl ? (
                            <svg className="w-10 h-10 text-white drop-shadow" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/>
                            </svg>
                          ) : (
                            <svg className="w-10 h-7" viewBox="0 0 68 48">
                              <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="red"/>
                              <path d="M45 24L27 14v20" fill="white"/>
                            </svg>
                          )}
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
                  className="px-3 py-2 text-[0.8rem] text-[#aaa] hover:text-[#555] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                  ← 이전
                </button>
                {(() => {
                  const delta = 4;
                  const start = Math.max(1, page - delta);
                  const end = Math.min(totalPages, page + delta);
                  const pages: (number | "...")[] = [];
                  if (start > 1) { pages.push(1); if (start > 2) pages.push("..."); }
                  for (let i = start; i <= end; i++) pages.push(i);
                  if (end < totalPages) { if (end < totalPages - 1) pages.push("..."); pages.push(totalPages); }
                  return pages.map((p, idx) =>
                    p === "..." ? (
                      <span key={`ellipsis-${idx}`} className="px-1 text-[0.8rem] text-[#aaa]">…</span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => { setPage(p as number); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className={`w-9 h-9 text-[0.8rem] font-medium rounded-lg cursor-pointer transition-all ${
                          page === p
                            ? "bg-[#294a3a] text-white"
                            : "text-[#aaa] hover:bg-[#f0ede8] hover:text-[#555]"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  );
                })()}
                <button
                  onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  disabled={page === totalPages}
                  className="px-3 py-2 text-[0.8rem] text-[#aaa] hover:text-[#555] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                  다음 →
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* ── 영상/오디오 모달 ── */}
      {modal && (modal.videoUrl || modal.audioUrl) && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 lg:p-8" style={{ backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }} onClick={() => setModal(null)}>
          <div className="w-full max-w-[820px] relative" onClick={(e) => e.stopPropagation()}>
            {/* 닫기 버튼 */}
            <button onClick={() => setModal(null)} className="absolute -top-11 right-0 flex items-center gap-1.5 text-white/50 hover:text-white text-[0.78rem] transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              닫기
            </button>

            {modal.videoUrl ? (
              <>
                <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                  <iframe
                    src={`https://www.youtube.com/embed/${extractYoutubeId(modal.videoUrl)}?autoplay=1&rel=0`}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                </div>
                <div className="mt-4 px-1">
                  <h3 className="text-white text-[1.05rem] font-bold tracking-[-0.03em]">{modal.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {modal.scripture && <span className="text-white/50 text-[0.78rem]">{modal.scripture}</span>}
                    {modal.scripture && modal.pastor && <span className="text-white/20 text-[0.7rem]">·</span>}
                    {modal.pastor && <span className="text-white/40 text-[0.78rem]">{modal.pastor}</span>}
                    <span className="text-white/20 text-[0.7rem]">·</span>
                    <span className="text-white/30 text-[0.78rem]">{formatDate(modal.date)}</span>
                  </div>
                </div>
              </>
            ) : modal.audioUrl ? (
              <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: "#1a2e24" }}>
                {/* 정보 */}
                <div className="px-6 pt-6 pb-2">
                  <span className="inline-block text-[0.68rem] font-semibold tracking-widest text-[#c69d6c] uppercase mb-2">새벽기도회</span>
                  <h3 className="text-white text-[1.1rem] font-bold tracking-[-0.03em] leading-snug">{modal.title}</h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    {modal.scripture && <span className="text-white/50 text-[0.78rem]">{modal.scripture}</span>}
                    {modal.scripture && modal.pastor && <span className="text-white/20">·</span>}
                    {modal.pastor && <span className="text-white/40 text-[0.78rem]">{modal.pastor}</span>}
                    <span className="text-white/20">·</span>
                    <span className="text-white/30 text-[0.78rem]">{formatDate(modal.date)}</span>
                  </div>
                </div>
                {/* 플레이어 */}
                <div className="px-6 pb-6 pt-4">
                  <div className="rounded-xl overflow-hidden">
                    <iframe
                      src={modal.audioUrl}
                      width="100%"
                      height="166"
                      scrolling="no"
                      allow="autoplay"
                      style={{ display: "block", border: "none" }}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
