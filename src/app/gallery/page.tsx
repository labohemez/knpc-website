"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const categories = ["전체", "예배", "행사", "교육", "선교"] as const;

const galleryItems = [
  { id: 1, title: "2024 부활절 예배", date: "2024.03.31", category: "예배", image: "/images/gallery-1.jpg" },
  { id: 2, title: "2024 봄 바자회", date: "2024.04.15", category: "행사", image: "/images/gallery-2.jpg" },
  { id: 3, title: "주일학교 여름성경학교", date: "2024.07.22", category: "교육", image: "/images/gallery-3.jpg" },
  { id: 4, title: "필리핀 단기선교", date: "2024.08.05", category: "선교", image: "/images/gallery-4.jpg" },
  { id: 5, title: "2024 추수감사절 예배", date: "2024.11.17", category: "예배", image: "/images/gallery-5.jpg" },
  { id: 6, title: "성탄절 축하공연", date: "2024.12.22", category: "행사", image: "/images/gallery-6.jpg" },
  { id: 7, title: "새벽기도회 특별집회", date: "2024.01.08", category: "예배", image: "/images/gallery-3.jpg" },
  { id: 8, title: "청년부 수련회", date: "2024.05.03", category: "교육", image: "/images/gallery-1.jpg" },
  { id: 9, title: "캄보디아 선교보고", date: "2024.09.15", category: "선교", image: "/images/gallery-5.jpg" },
  { id: 10, title: "교회 창립기념 예배", date: "2024.10.06", category: "예배", image: "/images/gallery-2.jpg" },
  { id: 11, title: "장애인부 체육대회", date: "2024.06.10", category: "행사", image: "/images/gallery-4.jpg" },
  { id: 12, title: "교사 세미나", date: "2024.03.09", category: "교육", image: "/images/gallery-6.jpg" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("전체");
  const [lightboxItem, setLightboxItem] = useState<(typeof galleryItems)[number] | null>(null);

  const filtered =
    activeCategory === "전체"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <>
      <Header />

      <main className="flex-1 bg-white flex flex-col gap-3 pt-[70px] lg:pt-[90px]">
        {/* ── 히어로 ── */}
        <section className="relative h-[280px] lg:h-[380px] flex items-end pb-10 lg:pb-14">
          <Image
            src="/images/gallery-5.jpg"
            alt="강남교회 갤러리"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary-dark/75" />
          <div className="relative mx-auto max-w-[1400px] px-5 lg:px-8 w-full">
            <p className="text-accent text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-2">
              Gallery
            </p>
            <h1 className="text-[2.2rem] lg:text-[3rem] font-bold text-white tracking-[-0.04em] leading-[1.15]">
              갤러리
            </h1>
          </div>
        </section>

        {/* ── 카테고리 필터 + 갤러리 ── */}
        <section className="py-[4rem] lg:py-[6rem] bg-white">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            <ScrollReveal>
              <div className="mb-10 lg:mb-14">
                <p className="text-accent text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-3">
                  Photo Gallery
                </p>
                <h2 className="text-[1.8rem] lg:text-[2.4rem] font-bold text-[#222] tracking-[-0.04em] leading-[1.3]">
                  교회 사진
                </h2>
              </div>
            </ScrollReveal>

            {/* 카테고리 탭 */}
            <ScrollReveal>
              <div className="flex flex-wrap gap-2 mb-10">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2.5 text-[0.85rem] font-semibold tracking-[-0.02em] transition-colors duration-200 ${
                      activeCategory === cat
                        ? "bg-primary text-white"
                        : "bg-[#f5f5f7] text-[#666] hover:bg-[#eee] hover:text-[#333]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            {/* 사진 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {filtered.map((item) => (
                <ScrollReveal key={item.id}>
                  <button
                    onClick={() => setLightboxItem(item)}
                    className="group relative w-full aspect-[4/3] overflow-hidden bg-[#f0ede8] block cursor-pointer"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* 호버 오버레이 */}
                    <div className="absolute inset-0 bg-primary-dark/0 group-hover:bg-primary-dark/50 transition-colors duration-300 flex items-end">
                      <div className="p-5 lg:p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <p className="text-accent text-[0.72rem] font-semibold tracking-[0.15em] uppercase mb-1">
                          {item.category}
                        </p>
                        <h3 className="text-white text-[1rem] lg:text-[1.1rem] font-bold tracking-[-0.03em]">
                          {item.title}
                        </h3>
                        <p className="text-white/50 text-[0.78rem] mt-1 tracking-[-0.02em]">
                          {item.date}
                        </p>
                      </div>
                    </div>
                  </button>
                </ScrollReveal>
              ))}
            </div>

            {/* 필터 결과 없음 */}
            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-[#999] text-[0.95rem] tracking-[-0.02em]">
                  해당 카테고리의 사진이 없습니다.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* ── 라이트박스 모달 ── */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 lg:p-10"
          onClick={() => setLightboxItem(null)}
        >
          {/* 닫기 버튼 */}
          <button
            onClick={() => setLightboxItem(null)}
            className="absolute top-5 right-5 lg:top-8 lg:right-8 w-11 h-11 flex items-center justify-center text-white/70 hover:text-white transition-colors z-10"
            aria-label="닫기"
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* 이미지 */}
          <div
            className="relative w-full max-w-[1000px] max-h-[80vh] aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxItem.image}
              alt={lightboxItem.title}
              fill
              className="object-contain"
              sizes="(max-width: 1000px) 100vw, 1000px"
            />
          </div>

          {/* 하단 정보 */}
          <div
            className="absolute bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-accent text-[0.72rem] font-semibold tracking-[0.15em] uppercase mb-1">
              {lightboxItem.category}
            </p>
            <h3 className="text-white text-[1.1rem] lg:text-[1.3rem] font-bold tracking-[-0.03em]">
              {lightboxItem.title}
            </h3>
            <p className="text-white/40 text-[0.82rem] mt-1 tracking-[-0.02em]">
              {lightboxItem.date}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
