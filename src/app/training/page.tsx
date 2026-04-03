import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "훈련",
  description: "강남교회 훈련 과정 안내. 전도훈련, 리더십훈련, 선교훈련을 통해 세상을 변화시키는 리더로 세워집니다.",
};

const programs = [
  {
    id: "evangelism",
    label: "Evangelism Training",
    title: "전도훈련",
    desc: "복음 전파의 사명을 감당할 수 있도록 훈련하는 과정입니다. 전도의 성경적 기초를 배우고, 실제 현장에서 복음을 전하는 전도 실습을 포함합니다. 하나님의 구원의 이야기를 자신의 언어로 전할 수 있는 담대한 증인으로 세워집니다.",
    info: [
      { label: "기간", value: "16주 과정 (매년 3월, 9월 개강)" },
      { label: "시간", value: "매주 수요일 오후 7:30 – 9:00" },
      { label: "대상", value: "세례교인 이상, 전도에 관심 있는 모든 성도" },
      { label: "내용", value: "전도의 성경적 기초, 개인 간증 작성, 전도 실습, 양육 방법" },
    ],
    image: "/images/gallery-1.jpg",
  },
  {
    id: "leadership",
    label: "Leadership Training",
    title: "리더십훈련",
    desc: "교회의 각 부서와 구역을 섬기는 리더로 세워지는 과정입니다. 성경적 리더십의 원리를 배우고, 섬김과 헌신의 자세를 갖추며, 공동체를 이끌어가는 실제적인 역량을 훈련합니다. 예수님의 섬기는 리더십을 본받아 교회와 세상을 변화시키는 지도자로 성장합니다.",
    info: [
      { label: "기간", value: "20주 과정 (매년 3월 개강)" },
      { label: "시간", value: "매주 토요일 오전 10:00 – 12:00" },
      { label: "대상", value: "구역장, 부서장, 리더 후보자" },
      { label: "내용", value: "성경적 리더십, 소그룹 인도법, 갈등 관리, 비전 수립" },
    ],
    image: "/images/gallery-3.jpg",
  },
  {
    id: "mission",
    label: "Mission Training",
    title: "선교훈련",
    desc: "국내외 선교를 준비하는 훈련 과정입니다. 선교의 성경적 근거와 타문화 이해, 선교 현장의 실제를 배우며, 단기선교 참여 기회를 통해 선교적 삶을 경험합니다. 강남교회 선교훈련원을 통해 세계 복음화의 비전을 품은 선교적 그리스도인으로 세워집니다.",
    info: [
      { label: "기간", value: "12주 과정 + 단기선교 (매년 상반기)" },
      { label: "시간", value: "매주 금요일 오후 7:30 – 9:00" },
      { label: "대상", value: "선교에 관심 있는 모든 성도" },
      { label: "내용", value: "선교 신학, 타문화 이해, 선교 전략, 단기선교 참여" },
    ],
    image: "/images/gallery-5.jpg",
  },
];

export default function TrainingPage() {
  return (
    <>
      <Header />

      <main className="flex-1 bg-white flex flex-col gap-3">
        {/* ── 히어로 ── */}
        <section className="relative h-[350px] lg:h-[470px] flex items-end pb-10 lg:pb-14">
          <Image
            src="/images/gallery-4.jpg"
            alt="강남교회 훈련"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary-dark/80" />
          <div className="relative mx-auto max-w-[1400px] px-5 lg:px-8 w-full">
            <p className="text-accent text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-2">
              Training
            </p>
            <h1 className="text-[2.2rem] lg:text-[3rem] font-bold text-white tracking-[-0.04em] leading-[1.15]">
              훈련
            </h1>
          </div>
        </section>

        {/* ── 소개 문구 ── */}
        <section className="py-[5rem] lg:py-[6rem] bg-white">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            <ScrollReveal>
              <div className="max-w-[680px]">
                <p className="text-accent text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-4">
                  Equipping the Saints
                </p>
                <h2 className="text-[1.8rem] lg:text-[2.4rem] font-bold text-[#222] tracking-[-0.04em] leading-[1.3] mb-6">
                  세상을 변화시키는<br />
                  리더로 세워지는 훈련
                </h2>
                <p className="text-[0.95rem] text-[#666] leading-[1.85] tracking-[-0.02em]">
                  강남교회는 모든 성도가 말씀 위에 굳건히 서서 각자의 자리에서 하나님 나라를
                  세워가도록 체계적인 훈련 과정을 운영합니다. 전도훈련, 리더십훈련, 선교훈련을
                  통해 성숙한 그리스도인으로 성장하는 여정에 함께하시기 바랍니다.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── 훈련 프로그램 ── */}
        {programs.map((program, i) => (
          <section
            key={program.id}
            id={program.id}
            className={`py-[5rem] lg:py-[7rem] ${i % 2 === 0 ? "bg-[#f5f5f7]" : "bg-white"}`}
          >
            <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
              <ScrollReveal>
                <div className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 lg:gap-16 items-start`}>
                  {/* 이미지 */}
                  <div className="w-full lg:w-[45%] shrink-0">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* 텍스트 */}
                  <div className="flex-1">
                    <p className="text-accent text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-3">
                      {program.label}
                    </p>
                    <h2 className="text-[1.8rem] lg:text-[2.4rem] font-bold text-[#222] tracking-[-0.04em] leading-[1.3] mb-6">
                      {program.title}
                    </h2>
                    <p className="text-[0.95rem] text-[#666] leading-[1.85] tracking-[-0.02em] mb-8">
                      {program.desc}
                    </p>

                    {/* 주요 정보 */}
                    <div className="border-t border-[#e5e5e5] pt-6 space-y-4">
                      {program.info.map((item) => (
                        <div key={item.label} className="flex items-start gap-4">
                          <span className="shrink-0 w-[3.5rem] text-[0.78rem] font-semibold text-accent tracking-[-0.02em]">
                            {item.label}
                          </span>
                          <span className="text-[0.88rem] text-[#555] tracking-[-0.02em] leading-[1.6]">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>
        ))}

        {/* ── CTA ── */}
        <section className="relative py-[5rem] lg:py-[6rem] overflow-hidden">
          <Image src="/images/gallery-6.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-primary-dark/85" />
          <div className="relative mx-auto max-w-[1400px] px-5 lg:px-8 text-center">
            <ScrollReveal>
              <p className="text-accent text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-4">
                Join the Training
              </p>
              <h2 className="text-[1.8rem] lg:text-[2.2rem] font-bold text-white tracking-[-0.04em] leading-[1.3] mb-4">
                훈련에 참여하고 싶으신가요?
              </h2>
              <p className="text-[0.92rem] text-white/60 leading-[1.75] tracking-[-0.02em] mb-8 max-w-[480px] mx-auto">
                각 훈련 과정에 대한 자세한 안내와 등록은 교회 사무실로
                문의해 주시기 바랍니다. 여러분의 참여를 기다립니다.
              </p>
              <div className="flex justify-center gap-3 flex-wrap">
                <a
                  href="tel:02-814-7606"
                  className="px-8 py-3.5 bg-accent text-white text-[0.85rem] font-semibold tracking-[-0.02em] hover:bg-accent-dark transition-colors duration-300"
                >
                  전화 문의 02-814-7606
                </a>
                <a
                  href="/newcomer"
                  className="px-8 py-3.5 border border-white/40 text-white text-[0.85rem] font-medium tracking-[-0.02em] hover:bg-white/10 transition-colors duration-300"
                >
                  새가족 안내
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
