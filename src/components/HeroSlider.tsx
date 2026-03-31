"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const slides = [
  { src: "/images/hero-2.jpg", alt: "강남교회 예배 전경" },
  { src: "/images/hero-1.jpg", alt: "강남교회 교인들" },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center bg-black overflow-hidden">
      {/* 슬라이드 이미지 */}
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0"
          style={{
            opacity: i === current ? 1 : 0,
            transition: "opacity 3s ease-in-out",
            transform: "scale(1)",
          }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={i === 0}
            quality={90}
          />
        </div>
      ))}

      {/* 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/45 to-black/40" />

      {/* 텍스트 콘텐츠 */}
      <div className="relative mx-auto max-w-[1400px] px-5 lg:px-8 w-full text-center">
        <p className="animate-fade-up text-white/80 text-[0.9rem] lg:text-[1rem] font-medium tracking-[0.15em] mb-5">
          대한예수교장로회
        </p>
        <h1 className="animate-fade-up-delay-1 text-[2.8rem] sm:text-[3.5rem] lg:text-[clamp(3.5rem,5vw,5rem)] font-bold text-white leading-[1.1] tracking-[-0.04em]">
          강남교회
        </h1>
        <p className="animate-fade-up-delay-2 mt-5 text-[1rem] lg:text-[clamp(1rem,1.2vw,1.25rem)] text-white/80 leading-relaxed tracking-[-0.02em]">
          그리스도 예수 안에서 행복한 가정, 풍성한 교회, 건강한 사회
        </p>
        <div className="animate-fade-up-delay-3 mt-10 flex justify-center gap-4">
          <a
            href="/worship"
            className="px-8 py-3.5 text-[0.85rem] font-semibold text-primary bg-white hover:bg-gray-100 transition-colors duration-300 tracking-[-0.02em]"
          >
            예배 안내
          </a>
          <a
            href="/about"
            className="px-8 py-3.5 text-[0.85rem] font-semibold text-white border border-white/40 hover:bg-white/10 transition-colors duration-300 tracking-[-0.02em]"
          >
            교회 소개
          </a>
        </div>
      </div>

      {/* 슬라이드 인디케이터 */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`슬라이드 ${i + 1}`}
            className={`h-[2px] transition-all duration-700 ${
              i === current ? "w-8 bg-white" : "w-4 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
