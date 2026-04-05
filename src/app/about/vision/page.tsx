import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubNav from "../_components/SubNav";
import AboutHero from "../_components/AboutHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "교회비전 | 교회소개 | 강남교회",
  description: "강남교회의 5대 비전: 가르치는 교회, 선포하는 교회, 치유하는 교회, 목회자를 양성하는 교회, 장애인과 함께하는 교회.",
};

const visions = [
  "가르치는 교회",
  "선포하는 교회",
  "치유하는 교회",
  "목회자를\n양성하는 교회",
  "장애인과\n함께하는 교회",
];

const INFOGRAPHIC_1 = "/images/vision-infographic-1.jpg"; // 현재→70주년 발전 도표
const INFOGRAPHIC_2 = "/images/vision-infographic-2.jpg"; // 비전 구조도

export default function VisionPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white flex flex-col">
        <AboutHero pageName="교회비전" />
        <SubNav />

        {/* ── 메인 히어로: 목사님 배경 + 5대 비전 버튼 ── */}
        <section className="relative flex flex-col items-center justify-center min-h-screen text-center">
          <Image
            src="https://cdn.imweb.me/thumbnail/20241206/61bf958b25a70.jpg"
            alt="강남교회 5대 비전"
            fill
            className="object-cover object-top"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-black/35" />

          <div className="relative px-5 lg:px-8 max-w-[1000px] mx-auto w-full">
            <h2 className="text-[1.8rem] lg:text-[2.4rem] font-bold text-white tracking-[-0.03em] leading-[1.2] mb-4">
              강남교회 5대 비전
            </h2>
            {/* 구분선 */}
            <div className="w-full h-px bg-white/30 mb-6" />

            <p className="text-white/80 text-[0.82rem] lg:text-[0.92rem] leading-[1.8] tracking-[-0.01em] whitespace-nowrap">
              &ldquo;예수께서 모든 도시와 마을에 두루 다니사 그들의 회당에서 가르치시며 전국 복음을 전파하시며 모든 병과 모든 약한 것을 고치시니라&rdquo;
            </p>
            <p className="text-[#c69d6c] text-[0.8rem] mt-1 mb-10">(마태복음 9:35)</p>

            {/* 5대 비전 버튼 */}
            <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
              {visions.map((v, i) => (
                <div
                  key={i}
                  className="bg-[#c69d6c]/80 text-white px-5 py-3 lg:px-6 lg:py-3.5 text-[0.82rem] lg:text-[0.88rem] font-semibold text-center rounded whitespace-pre-line leading-[1.5] backdrop-blur-sm"
                >
                  {i + 1}. {v}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5대 비전 콘텐츠 ── */}
        <section className="py-[4rem] lg:py-[6rem] bg-white">
          <div className="mx-auto max-w-[860px] px-5 lg:px-8">

            {/* 섹션 타이틀 */}
            <div className="text-center mb-10">
              <h2 className="text-[1.5rem] lg:text-[1.8rem] font-bold text-[#222] tracking-[-0.03em]">5대 비전</h2>
              <div className="w-2 h-2 rounded-full bg-[#c69d6c] mx-auto mt-3" />
            </div>

            {/* 설명 텍스트 */}
            <div className="mb-8 p-6 border border-[#eee] bg-[#fafaf8]">
              <p className="text-[0.88rem] font-bold text-[#222] mb-2">강남교회 5대비전</p>
              <p className="text-[0.86rem] text-[#555] leading-[1.8] tracking-[-0.02em]">
                강남교회는 5대비전(가르치는 교회, 선포하는 교회, 치유하는 교회, 목회자를 양성하는 교회, 장애인과 함께하는 교회)으로
                지역사회와 나라를 품고, 하나님의 나라와 뜻을 세우기 위해 애쓰는 교회입니다.
              </p>
            </div>

            {/* 인포그래픽 1: 현재→70주년 발전 도표 */}
            <div className="mb-4">
              <Image
                src={INFOGRAPHIC_1}
                alt="강남교회 5대 비전 발전 도표 (현재 → 70주년 이후)"
                width={820}
                height={520}
                className="w-full"
                unoptimized
              />
            </div>

            {/* 인포그래픽 2: 비전 구조도 */}
            <div>
              <Image
                src={INFOGRAPHIC_2}
                alt="강남교회 목회철학·미션·5대 비전 구조도"
                width={820}
                height={560}
                className="w-full"
                unoptimized
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
