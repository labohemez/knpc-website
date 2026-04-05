import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubNav from "../_components/SubNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "환영인사 | 교회소개 | 강남교회",
  description: "강남교회 담임목사 고문산 목사님의 환영 인사말입니다.",
};

const visions = [
  {
    title: "가르치는 교회",
    desc: "다음 세대에 평화를 가르치며 온 세대를 피스메이커로 세우고자 합니다. 평화 자체이신 예수님께서 들어오셔서 하늘의 평화와 신령한 기쁨이 넘쳐나는 삶을 살고, 마음에 임한 예수님의 평화가 자신과 이웃을 살리는 기쁨이 되는 피스메이커로 세워지도록 인도하고자 합니다.",
  },
  {
    title: "선포하는 교회",
    desc: "지역 사회 복음화와 북한 및 세계 열방으로 나아가고자 합니다. 부르심을 받은 삶의 모든 영역에서 언약의 말씀과 예수의 능력에 의지하여 꺾이지 않는 하나님 나라를 세워가고자 합니다.",
  },
  {
    title: "치유하는 교회",
    desc: "영육의 건강함을 위한 온전한 치유와 이웃을 섬김의 모습을 세우고자 합니다. 말씀과 기도 안에서 영적인 회복과 삶의 변화를 추구하고 개인을 넘어 지역사회 치유를 위해 나가고자 합니다. 어려움에 처한 이웃을 위한 사역과 호스피스 사역을 통하여 이웃 섬김과 사랑의 실천을 이루어 가고자 합니다.",
  },
  {
    title: "목회자를 양성하는 교회",
    desc: "전문성을 가지며 건강한 교회를 세우는 목회자를 양성하고자 합니다. 여러 교육과정을 받을 수 있도록 지원하고 다양한 경험을 갖게 하여 공동체를 바로 세울 수 있는 건강한 목회자로 양성하고자 합니다.",
  },
  {
    title: "장애인과 함께하는 교회",
    desc: "열린 예배와 장애 유형 및 세대별로 교육을 확대하고자 합니다. 장애인 부서를 세분화하여 세대별 예배를 드리고, 장애인들을 단지 보호와 격리 대상이 아닌 하나님의 형상을 따라 창조된 귀한 동역자로 함께하고자 합니다.",
  },
];

export default function GreetingPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white flex flex-col">
        <SubNav />

        {/* 담임목사 인사 */}
        <section className="py-[5rem] lg:py-[7rem] bg-white">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
              {/* 목사 사진 */}
              <div className="shrink-0 lg:w-[280px]">
                <div className="relative w-full lg:w-[280px] aspect-[3/4] overflow-hidden bg-[#f0ede8]">
                  <Image
                    src="https://cdn.imweb.me/thumbnail/20240425/2fafe763174ed.jpg"
                    alt="고문산 담임목사"
                    fill
                    className="object-cover object-top"
                    unoptimized
                  />
                </div>
                <div className="mt-4 border-l-2 border-[#c69d6c] pl-4">
                  <p className="text-[0.75rem] text-[#999] tracking-[-0.02em]">담임목사</p>
                  <p className="text-[1.1rem] font-bold text-[#222] tracking-[-0.03em]">고문산 목사</p>
                </div>
              </div>

              {/* 비전 목록 */}
              <div className="flex-1">
                <p className="text-[#c69d6c] text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-4">Pastor&apos;s Greeting</p>
                <h2 className="text-[1.6rem] lg:text-[2rem] font-bold text-[#222] tracking-[-0.04em] leading-[1.3] mb-10">
                  강남교회에 오신 여러분을<br />환영하고 축복합니다
                </h2>
                <div className="space-y-8">
                  {visions.map((v, i) => (
                    <div key={v.title} className="flex gap-5">
                      <span className="shrink-0 text-[1.6rem] font-bold text-[#294a3a]/15 leading-none tracking-[-0.05em] mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-[0.95rem] font-bold text-[#222] tracking-[-0.03em] mb-1.5">{v.title}</h3>
                        <p className="text-[0.88rem] text-[#666] leading-[1.8] tracking-[-0.02em]">{v.desc}</p>
                      </div>
                    </div>
                  ))}
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
