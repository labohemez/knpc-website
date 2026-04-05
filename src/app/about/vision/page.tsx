import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubNav from "../_components/SubNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "교회비전 | 교회소개 | 강남교회",
  description: "강남교회의 5대 비전: 가르치는 교회, 선포하는 교회, 치유하는 교회, 목회자를 양성하는 교회, 장애인과 함께하는 교회.",
};

const visions = [
  {
    num: "01",
    title: "가르치는 교회",
    sub: "다음세대에 평화를 가르치며 온 세대를 피스메이커로 세움",
    desc: "다음 세대에 평화를 가르치며 온 세대를 피스메이커로 세우고자 합니다. 평화 자체이신 예수님께서 들어오셔서 하늘의 평화와 신령한 기쁨이 넘쳐나는 삶을 살고, 마음에 임한 예수님의 평화가 자신과 이웃을 살리는 기쁨이 되는 피스메이커로 세워지도록 인도하고자 합니다.",
    img: "https://cdn.imweb.me/thumbnail/20260228/5493c1f5eed5c.jpg",
  },
  {
    num: "02",
    title: "선포하는 교회",
    sub: "지역사회 복음화와 북한 및 세계 열방으로 나아가는 선교",
    desc: "지역 사회 복음화와 북한 및 세계 열방으로 나아가고자 합니다. 부르심을 받은 삶의 모든 영역에서 언약의 말씀과 예수의 능력에 의지하여 꺾이지 않는 하나님 나라를 세워가고자 합니다.",
    img: "https://cdn.imweb.me/thumbnail/20260301/29994c3b35b63.jpg",
  },
  {
    num: "03",
    title: "치유하는 교회",
    sub: "영육의 건강함을 위한 온전한 치유와 이웃 섬김",
    desc: "영육의 건강함을 위한 온전한 치유와 이웃을 섬김의 모습을 세우고자 합니다. 말씀과 기도 안에서 영적인 회복과 삶의 변화를 추구하고 개인을 넘어 지역사회 치유를 위해 나가고자 합니다. 어려움에 처한 이웃을 위한 사역과 호스피스 사역을 통하여 이웃 섬김과 사랑의 실천을 이루어 가고자 합니다.",
    img: "https://cdn.imweb.me/thumbnail/20240618/d2d945781bd64.png",
  },
  {
    num: "04",
    title: "목회자를 양성하는 교회",
    sub: "전문성을 가지며 건강한 교회를 세우는 목회자 양성",
    desc: "전문성을 가지며 건강한 교회를 세우는 목회자를 양성하고자 합니다. 여러 교육과정을 받을 수 있도록 지원하고 다양한 경험을 갖게 하여 공동체를 바로 세울 수 있는 건강한 목회자로 양성하고자 합니다.",
    img: "https://cdn.imweb.me/thumbnail/20260301/48b43fa893645.jpg",
  },
  {
    num: "05",
    title: "장애인과 함께하는 교회",
    sub: "열린 예배와 장애 유형 및 세대별 교육 확대",
    desc: "열린 예배와 장애 유형 및 세대별로 교육을 확대하고자 합니다. 장애인 부서를 세분화하여 세대별 예배를 드리고, 장애인들을 단지 보호와 격리 대상이 아닌 하나님의 형상을 따라 창조된 귀한 동역자로 함께하고자 합니다.",
    img: "https://cdn.imweb.me/thumbnail/20250105/c7e7b2f35c260.jpg",
  },
];

export default function VisionPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white flex flex-col">
        {/* 히어로 */}
        <section className="relative h-[240px] lg:h-[320px] flex items-end pb-8 lg:pb-12">
          <Image
            src="https://cdn.imweb.me/thumbnail/20241206/61bf958b25a70.jpg"
            alt="교회소개"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-[#294a3a]/75" />
          <div className="relative mx-auto max-w-[1400px] px-5 lg:px-8 w-full">
            <p className="text-[#c69d6c] text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-2">About Us</p>
            <h1 className="text-[2rem] lg:text-[2.8rem] font-bold text-white tracking-[-0.04em] leading-[1.15]">교회소개</h1>
          </div>
        </section>

        <SubNav />

        {/* 성경 말씀 */}
        <section className="py-14 lg:py-16 bg-[#294a3a]">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8 text-center">
            <p className="text-[#c69d6c] text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-5">Vision Scripture</p>
            <blockquote className="text-white text-[0.95rem] lg:text-[1.1rem] leading-[1.9] tracking-[-0.02em] max-w-2xl mx-auto">
              "예수께서 모든 도시와 마을에 두루다니사 그들의 회당에서 가르치시며 천국복음을 전파하시며 모든 병과 모든 약한 것을 고치시니라"
            </blockquote>
            <p className="mt-4 text-[#c69d6c]/70 text-[0.82rem] tracking-[0.1em]">마태복음 9:35</p>
          </div>
        </section>

        {/* 5대 비전 소개 */}
        <section className="py-12 lg:py-16 bg-[#f9f9f7]">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            <p className="text-[0.92rem] text-[#555] leading-[1.8] tracking-[-0.02em] text-center max-w-3xl mx-auto">
              강남교회는 <strong>5대 비전</strong>(가르치는 교회, 선포하는 교회, 치유하는 교회, 목회자를 양성하는 교회, 장애인과 함께하는 교회)으로
              지역사회와 나라를 품고, 하나님의 나라와 뜻을 세우기 위해 애쓰는 교회입니다.
            </p>
          </div>
        </section>

        {/* 5대 비전 상세 */}
        <section className="py-[4rem] lg:py-[6rem] bg-white">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            <div className="space-y-16 lg:space-y-20">
              {visions.map((v, i) => (
                <div key={v.num} className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-16 items-center`}>
                  {/* 이미지 */}
                  <div className="w-full lg:w-[480px] shrink-0">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={v.img}
                        alt={v.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </div>
                  {/* 텍스트 */}
                  <div className="flex-1">
                    <span className="text-[3rem] lg:text-[4.5rem] font-bold text-[#294a3a]/10 leading-none tracking-[-0.05em]">{v.num}</span>
                    <h3 className="text-[1.3rem] lg:text-[1.6rem] font-bold text-[#222] tracking-[-0.04em] mt-2 mb-3">{v.title}</h3>
                    <p className="text-[0.9rem] font-semibold text-[#c69d6c] tracking-[-0.02em] mb-4">{v.sub}</p>
                    <p className="text-[0.9rem] text-[#666] leading-[1.85] tracking-[-0.02em]">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
