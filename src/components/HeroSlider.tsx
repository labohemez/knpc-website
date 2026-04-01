"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const slides = [
  {
    src: "/images/hero-2.jpg",
    alt: "강남교회 예배 전경",
    category: "주일설교",
    title: "소유할 것인가? 소유될 것인가?",
    scripture: "베드로전서 2:9~10",
    pastor: "서강일 목사",
  },
  {
    src: "/images/hero-1.jpg",
    alt: "강남교회 교인들",
    category: "수요예배",
    title: "내가 만든 하나님",
    scripture: "사사기 17:1-13",
    pastor: "황봉규 목사",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative h-screen bg-black overflow-hidden">
      {/* 슬라이드 이미지 */}
      {slides.map((s, i) => (
        <div
          key={s.src}
          className="absolute inset-0"
          style={{
            opacity: i === current ? 1 : 0,
            transition: "opacity 3s ease-in-out",
          }}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            className="object-cover"
            priority={i === 0}
            quality={90}
          />
        </div>
      ))}

      {/* 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />

      {/* 재생 버튼 — 중앙 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <a
          href="/sermons"
          className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center hover:bg-white/25 hover:scale-110 transition-all duration-500"
        >
          <svg className="w-8 h-8 lg:w-10 lg:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
          </svg>
        </a>
      </div>

      {/* 상단 좌측 — 로고/교회명 영역은 Header가 담당 */}

      {/* 하단 — 설교 정보 */}
      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
        <div className="mx-auto max-w-[1400px] flex items-end justify-between">
          <div>
            <span className="inline-block px-3 py-1 bg-accent text-white text-[0.72rem] font-semibold tracking-[-0.02em] mb-3">
              {slide.category}
            </span>
            <h2 className="text-[1.4rem] lg:text-[clamp(1.6rem,2.2vw,2.2rem)] font-bold text-white tracking-[-0.04em] leading-snug">
              {slide.title}
            </h2>
            <p className="mt-2 text-[0.85rem] lg:text-[0.95rem] text-white/60 tracking-[-0.02em]">
              {slide.scripture} · {slide.pastor}
            </p>
          </div>

          {/* 슬라이드 인디케이터 */}
          <div className="hidden sm:flex items-center gap-2.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`슬라이드 ${i + 1}`}
                className={`w-3 h-3 rounded-full border-2 transition-all duration-500 ${
                  i === current ? "bg-white border-white" : "bg-transparent border-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
