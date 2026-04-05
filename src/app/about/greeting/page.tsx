import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubNav from "../_components/SubNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "환영인사 | 교회소개 | 강남교회",
  description: "강남교회 담임목사 고문산 목사님의 환영 인사말입니다.",
};

export default function GreetingPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white flex flex-col">
        {/* 히어로 */}
        <section className="relative h-[240px] lg:h-[320px] flex items-end pb-8 lg:pb-12">
          <Image src="/images/hero-2.jpg" alt="교회소개" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-[#294a3a]/80" />
          <div className="relative mx-auto max-w-[1400px] px-5 lg:px-8 w-full">
            <p className="text-[#c69d6c] text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-2">About Us</p>
            <h1 className="text-[2rem] lg:text-[2.8rem] font-bold text-white tracking-[-0.04em] leading-[1.15]">교회소개</h1>
          </div>
        </section>

        <SubNav />

        {/* 환영인사 */}
        <section className="py-[5rem] lg:py-[7rem] bg-white">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
              {/* 목사 사진 */}
              <div className="shrink-0 lg:w-[300px]">
                <div className="relative w-full lg:w-[300px] aspect-[3/4] overflow-hidden bg-[#f0ede8]">
                  <Image
                    src="/images/gallery-1.jpg"
                    alt="고문산 담임목사"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 border-l-2 border-[#c69d6c] pl-4">
                  <p className="text-[0.75rem] text-[#999] tracking-[-0.02em]">담임목사</p>
                  <p className="text-[1.1rem] font-bold text-[#222] tracking-[-0.03em]">고문산 목사</p>
                </div>
              </div>

              {/* 인사말 */}
              <div className="flex-1">
                <p className="text-[#c69d6c] text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-4">
                  Pastor&apos;s Greeting
                </p>
                <h2 className="text-[1.8rem] lg:text-[2.2rem] font-bold text-[#222] tracking-[-0.04em] leading-[1.3] mb-8">
                  강남교회에 오신 여러분을<br />
                  환영하고 축복합니다
                </h2>
                <div className="space-y-5 text-[0.92rem] text-[#555] leading-[1.85] tracking-[-0.02em]">
                  <p>
                    강남교회를 찾아주신 여러분을 주님의 이름으로 환영합니다.
                    우리 강남교회는 1951년 부활절 창립 이래 하나님의 말씀 위에 굳게 서서
                    지역 사회와 나라를 품고, 하나님의 나라와 뜻을 세우기 위해 애쓰는 교회입니다.
                  </p>
                  <p>
                    우리 교회는 다섯 가지 비전—가르치는 교회, 선포하는 교회, 치유하는 교회,
                    목회자를 양성하는 교회, 장애인과 함께하는 교회—으로 모든 세대를 품고
                    하나님 나라를 이 땅에 세워 가고 있습니다.
                  </p>
                  <p>
                    평화 자체이신 예수님께서 여러분의 삶에 들어오셔서 하늘의 평화와 신령한 기쁨이
                    넘쳐나기를 소원합니다. 여러분이 이 공동체 안에서 하나님의 사랑과 은혜를 경험하고,
                    믿음 안에서 성장하며, 서로를 섬기는 기쁨을 누리시기를 간절히 바랍니다.
                  </p>
                  <p>
                    강남교회의 문은 언제나 열려 있습니다. 오십시오, 함께 예배합시다.
                  </p>
                  <p className="pt-4 text-[#888] text-[0.85rem] font-medium">
                    강남교회 담임목사 고문산
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
