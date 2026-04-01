"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

const sermons = [
  { category: "주일예배", title: "소유할 것인가? 소유될 것인가?", scripture: "베드로전서 2:9~10", pastor: "서강일 목사", thumb: "/images/hero-2.jpg" },
  { category: "주일예배", title: "너희는 나를 누구라 하느냐", scripture: "마태복음 16:13-20", pastor: "김해광 목사", thumb: "/images/hero-1.jpg" },
  { category: "수요예배", title: "내가 만든 하나님", scripture: "사사기 17:1-13", pastor: "황봉규 목사", thumb: "/images/gallery-4.jpg" },
  { category: "금요기도회", title: "안식에 들어가기를 힘쓸지니", scripture: "히브리서 4:1-11", pastor: "김광열 목사", thumb: "/images/hero-2.jpg" },
  { category: "주일예배", title: "나보다 옳도다", scripture: "창세기 38:12-30", pastor: "고문산 목사", thumb: "/images/hero-1.jpg" },
  { category: "선교주일", title: "예수님의 마음으로만 보이는 선교", scripture: "마태복음 25:31-46", pastor: "최옵 선교사", thumb: "/images/gallery-4.jpg" },
];

export default function SermonSlider() {
  return (
    <section className="py-[5rem] lg:py-[6rem] bg-[#f5f5f7]">
      {/* 헤더 */}
      <div className="mx-auto max-w-[1400px] px-5 lg:px-8 mb-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-accent text-[0.75rem] font-semibold tracking-[0.2em] uppercase mb-3">
              Sermons
            </p>
            <h2 className="text-[1.8rem] lg:text-[2.2rem] font-bold text-[#222] tracking-[-0.04em]">
              말씀과 찬양
            </h2>
          </div>
          <a
            href="/sermons"
            className="hidden sm:inline-flex items-center gap-2 text-[0.82rem] font-medium text-[#222] border border-[#222] px-5 py-2 hover:bg-[#222] hover:text-white transition-all duration-300 tracking-[-0.02em]"
          >
            전체보기
          </a>
        </div>
      </div>

      {/* Swiper 캐러셀 — 풀와이드 */}
      <div>
        <Swiper
          modules={[FreeMode, Mousewheel]}
          freeMode={{ enabled: true, sticky: false }}
          mousewheel={{ forceToAxis: true }}
          slidesPerView="auto"
          spaceBetween={3}
          grabCursor
          className=""
        >
          {sermons.map((sermon, i) => (
            <SwiperSlide
              key={i}
              className="!w-[75vw] sm:!w-[45vw] lg:!w-[30vw]"
            >
              <a href="/sermons" className="block group">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={sermon.thumb}
                    alt={sermon.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="pt-4 pb-2">
                  <span className="text-[0.7rem] font-semibold text-accent tracking-[-0.02em]">
                    {sermon.category}
                  </span>
                  <h4 className="mt-1.5 text-[1rem] lg:text-[1.1rem] font-bold text-[#222] tracking-[-0.04em] group-hover:text-primary transition-colors duration-200 leading-snug">
                    {sermon.title}
                  </h4>
                  <p className="mt-1.5 text-[0.78rem] text-[#999] tracking-[-0.02em]">
                    {sermon.scripture} · {sermon.pastor}
                  </p>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mt-8 text-center sm:hidden">
        <a href="/sermons" className="text-[0.82rem] font-medium text-[#222] border border-[#222] px-5 py-2 hover:bg-[#222] hover:text-white transition-all duration-300">
          전체보기
        </a>
      </div>
    </section>
  );
}
