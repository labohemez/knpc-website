"use client";

import Image from "next/image";
import { useState } from "react";

const categories = ["전체", "예배", "교육부", "청년부", "행사"];

const albums = [
  { src: "/images/hero-1.jpg", title: "2026 임직감사예배", date: "2026.03.29", count: 48, category: "예배" },
  { src: "/images/gallery-6.jpg", title: "다드림 겨울 수련회", date: "2026.03.22", count: 36, category: "청년부" },
  { src: "/images/gallery-2.jpg", title: "어린이부 봄 활동", date: "2026.03.15", count: 24, category: "교육부" },
  { src: "/images/gallery-4.jpg", title: "주일 예배 전경", date: "2026.03.08", count: 18, category: "예배" },
  { src: "/images/gallery-1.jpg", title: "새가족 환영 모임", date: "2026.03.01", count: 15, category: "행사" },
  { src: "/images/hero-2.jpg", title: "2026 신년감사예배", date: "2026.02.22", count: 32, category: "예배" },
  { src: "/images/gallery-5.jpg", title: "QT 수련회", date: "2026.02.15", count: 28, category: "행사" },
  { src: "/images/gallery-1.jpg", title: "성탄축하예배", date: "2025.12.25", count: 43, category: "예배" },
];

export default function GallerySection() {
  const [activeCat, setActiveCat] = useState("전체");
  const [activeThumb, setActiveThumb] = useState(0);

  const filtered = activeCat === "전체" ? albums : albums.filter((a) => a.category === activeCat);
  const featured = filtered[0];
  const side = filtered.slice(1, 3);
  const strip = filtered.slice(0, 7);

  if (!featured) return null;

  return (
    <section className="py-[5rem] lg:py-[6rem] bg-[#f5f5f7]">
      {/* 헤더 */}
      <div className="mx-auto max-w-[1400px] px-5 lg:px-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
          <div>
            <p className="text-accent text-[0.75rem] font-semibold tracking-[0.2em] uppercase mb-3">
              Gallery
            </p>
            <h2 className="text-[1.8rem] lg:text-[2.2rem] font-bold text-[#222] tracking-[-0.04em]">
              강남교회 앨범
            </h2>
          </div>
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCat(cat); setActiveThumb(0); }}
                className={`px-4 py-2 text-[0.78rem] font-semibold tracking-[-0.02em] transition-all duration-200 ${
                  activeCat === cat
                    ? "bg-primary text-white"
                    : "bg-white text-[#666] hover:text-[#222]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 메인 그리드 — 풀와이드 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 h-auto lg:h-[38vw] lg:max-h-[600px]">
        {/* 좌측 대표 사진 3칸 */}
        <a
          href="/gallery"
          className="lg:col-span-3 relative aspect-[16/9] lg:aspect-auto overflow-hidden group bg-[#e8e8e8]"
        >
          <Image
            src={featured.src}
            alt={featured.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block px-2.5 py-1 bg-accent text-white text-[0.68rem] font-semibold">
                {featured.category}
              </span>
              <span className="text-[0.72rem] text-white/60">
                {featured.date} · 사진 {featured.count}장
              </span>
            </div>
            <h3 className="text-[1.2rem] lg:text-[1.5rem] font-bold text-white tracking-[-0.04em]">
              {featured.title}
            </h3>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="px-6 py-3 bg-white text-primary text-[0.82rem] font-semibold tracking-[-0.02em]">
              앨범 보기
            </span>
          </div>
        </a>

        {/* 우측 사이드 2칸 */}
        <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-1 gap-2">
          {side.map((album, i) => (
            <a
              key={i}
              href="/gallery"
              className="relative aspect-[4/3] lg:aspect-auto overflow-hidden group bg-[#e8e8e8]"
            >
              <Image
                src={album.src}
                alt={album.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                <span className="text-[0.65rem] text-accent font-semibold">{album.category}</span>
                <h4 className="mt-1 text-[0.88rem] lg:text-[1rem] font-bold text-white tracking-[-0.03em] leading-snug">
                  {album.title}
                </h4>
                <p className="mt-1 text-[0.68rem] text-white/50">{album.date}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* 하단 필름스트립 — 풀와이드 */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-2 mt-2">
        {strip.map((album, i) => (
          <button
            key={i}
            onClick={() => setActiveThumb(i)}
            className={`relative aspect-[3/2] overflow-hidden group bg-[#e8e8e8] transition-all duration-200 ${
              activeThumb === i ? "ring-2 ring-accent ring-offset-1" : ""
            }`}
          >
            <Image
              src={album.src}
              alt={album.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className={`absolute inset-0 transition-colors duration-200 ${
              activeThumb === i ? "bg-black/0" : "bg-black/10 group-hover:bg-black/0"
            }`} />
          </button>
        ))}
        <a
          href="/gallery"
          className="relative aspect-[3/2] bg-primary flex items-center justify-center hover:bg-primary-dark transition-colors duration-300"
        >
          <div className="text-center">
            <p className="text-[1.2rem] font-bold text-white">+43</p>
            <p className="text-[0.68rem] text-white/60 mt-0.5">더보기</p>
          </div>
        </a>
      </div>
    </section>
  );
}
