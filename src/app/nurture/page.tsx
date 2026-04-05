import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "양육",
  description: "강남교회 양육과 훈련 프로그램을 안내합니다. 새가족 양육, 제자훈련, 성경공부, QT 나눔 과정을 확인하세요.",
};

const programs = [
  {
    id: "newcomer",
    label: "New Family",
    title: "새가족 양육",
    desc: "강남교회에 처음 오신 분들을 위한 기초 신앙 과정입니다. 기독교 핵심 교리와 교회 생활의 기초를 배우며, 강남교회 공동체에 자연스럽게 정착할 수 있도록 돕습니다. 담당 목사와 양육위원이 1:1로 돌보며 소그룹 교제를 통해 교회 가족이 되어 갑니다.",
    info: [
      { label: "기간", value: "12주 과정" },
      { label: "시간", value: "매주 주일 예배 후 (12:30 – 14:00)" },
      { label: "대상", value: "새가족 등록 후 1년 이내" },
      { label: "장소", value: "교육관 301호" },
    ],
    image: "/images/gallery-1.jpg",
  },
  {
    id: "disciple",
    label: "Discipleship",
    title: "제자훈련",
    desc: "그리스도의 제자로 세워지는 심화 훈련 과정입니다. 체계적인 성경 공부와 실천 훈련을 통해 신앙의 깊이를 더하고, 삶의 현장에서 복음을 증거하는 성숙한 그리스도인으로 성장합니다. 소그룹 나눔과 멘토링을 통해 서로를 격려하며 훈련합니다.",
    info: [
      { label: "기간", value: "24주 과정 (상·하반기 각 12주)" },
      { label: "시간", value: "매주 수요일 오후 7:30 – 9:30" },
      { label: "대상", value: "새가족 양육 수료자" },
      { label: "장소", value: "교육관 201호" },
    ],
    image: "/images/gallery-2.jpg",
  },
  {
    id: "bible",
    label: "Bible Study",
    title: "성경공부",
    desc: "구약과 신약을 체계적으로 공부하는 말씀 훈련 과정입니다. 소그룹 형태로 진행되며 강해와 토론을 통해 성경의 맥락을 이해하고 말씀을 삶에 적용하는 힘을 기릅니다. 초급부터 심화까지 다양한 반이 개설되어 자신에게 맞는 과정을 선택할 수 있습니다.",
    info: [
      { label: "기간", value: "학기별 운영 (봄·가을 각 16주)" },
      { label: "시간", value: "매주 목요일 오전 10:00 / 오후 7:30" },
      { label: "대상", value: "전 교인 (반별 수준 구분)" },
      { label: "장소", value: "본당 소예배실 및 교육관" },
    ],
    image: "/images/gallery-3.jpg",
  },
  {
    id: "qt",
    label: "Quiet Time",
    title: "QT 나눔",
    desc: "매일 큐티(Quiet Time) 묵상을 생활화하고, 정기적인 나눔 모임을 통해 말씀 묵상의 은혜를 나누는 과정입니다. 하나님과의 개인적인 교제를 깊이 있게 훈련하며, 서로의 묵상을 나눔으로써 말씀이 삶 속에 뿌리내리도록 돕습니다.",
    info: [
      { label: "기간", value: "연중 상시 운영" },
      { label: "시간", value: "매주 화요일 오전 10:00 / 토요일 오전 7:00" },
      { label: "대상", value: "전 교인 (누구나 참여 가능)" },
      { label: "장소", value: "교육관 세미나실" },
    ],
    image: "/images/gallery-4.jpg",
  },
];

export default function NurturePage() {
  return (
    <>
      <Header />

      <main className="flex-1 bg-white flex flex-col gap-3">
        <PageHero
          breadcrumbs={[{ name: "홈", href: "/" }, { name: "양육" }]}
          title="양육"
        />

        {/* ── 소개 문구 ── */}
        <section className="py-[5rem] lg:py-[6rem] bg-white">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            <ScrollReveal>
              <div className="max-w-[680px]">
                <p className="text-accent text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-4">
                  Growing in Faith
                </p>
                <h2 className="text-[1.8rem] lg:text-[2.4rem] font-bold text-[#222] tracking-[-0.04em] leading-[1.3] mb-6">
                  양육과 훈련을 통해<br />
                  성숙한 그리스도인으로 성장합니다
                </h2>
                <p className="text-[0.95rem] text-[#666] leading-[1.85] tracking-[-0.02em]">
                  강남교회는 새가족 양육부터 제자훈련, 성경공부, QT 나눔까지
                  단계별 양육 과정을 통해 성도들이 말씀 위에 굳건히 서고,
                  삶의 현장에서 그리스도를 닮아가도록 돕습니다.
                  각 과정은 소그룹 중심으로 운영되며, 함께 배우고 나누는 가운데 깊은 교제가 이루어집니다.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── 양육 과정별 섹션 ── */}
        {programs.map((program, index) => (
          <section
            key={program.id}
            id={program.id}
            className={`py-[5rem] lg:py-[7rem] ${index % 2 === 0 ? "bg-[#f5f5f7]" : "bg-white"}`}
          >
            <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
              <ScrollReveal>
                <div className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 lg:gap-16 items-start`}>
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

                    {/* 정보 테이블 */}
                    <div className="border-t border-[#eee]">
                      {program.info.map((item) => (
                        <div
                          key={item.label}
                          className="flex items-start gap-4 py-3.5 border-b border-[#f0f0f0]"
                        >
                          <span className="shrink-0 w-[60px] text-[0.78rem] font-semibold text-[#999] tracking-[-0.02em]">
                            {item.label}
                          </span>
                          <span className="text-[0.9rem] text-[#444] tracking-[-0.02em]">
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

        {/* ── 양육 과정 한눈에 보기 ── */}
        <section className="py-[5rem] lg:py-[7rem] bg-white">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            <ScrollReveal>
              <div className="mb-10 lg:mb-14 text-center">
                <p className="text-accent text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-3">
                  Nurture Path
                </p>
                <h2 className="text-[1.8rem] lg:text-[2.4rem] font-bold text-[#222] tracking-[-0.04em] leading-[1.3]">
                  양육 과정 한눈에 보기
                </h2>
                <p className="mt-4 text-[0.92rem] text-[#777] tracking-[-0.02em]">
                  단계별로 성장하는 강남교회 양육 로드맵
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                {[
                  {
                    step: "01",
                    title: "새가족 양육",
                    period: "12주",
                    desc: "기독교 기초 교리와 교회 생활 안내",
                    href: "#newcomer",
                  },
                  {
                    step: "02",
                    title: "제자훈련",
                    period: "24주",
                    desc: "심화 성경 공부와 실천 훈련",
                    href: "#disciple",
                  },
                  {
                    step: "03",
                    title: "성경공부",
                    period: "학기별 16주",
                    desc: "구약·신약 체계적 말씀 공부",
                    href: "#bible",
                  },
                  {
                    step: "04",
                    title: "QT 나눔",
                    period: "상시 운영",
                    desc: "매일 묵상과 정기 나눔 모임",
                    href: "#qt",
                  },
                ].map((item, i) => (
                  <a
                    key={item.step}
                    href={item.href}
                    className="group border border-[#eee] p-6 lg:p-7 bg-white hover:border-primary/30 hover:bg-[#f9f9f7] transition-colors duration-300 block"
                  >
                    <div className="text-[0.72rem] font-bold text-accent mb-4">{item.step}</div>
                    <h3 className="text-[1rem] font-bold text-[#222] tracking-[-0.03em] mb-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[0.78rem] text-accent font-medium tracking-[-0.01em] mb-3">
                      {item.period}
                    </p>
                    <p className="text-[0.82rem] text-[#777] leading-[1.7] tracking-[-0.02em]">
                      {item.desc}
                    </p>
                  </a>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative py-[5rem] lg:py-[6rem] overflow-hidden">
          <Image src="/images/gallery-6.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-primary-dark/85" />
          <div className="relative mx-auto max-w-[1400px] px-5 lg:px-8 text-center">
            <ScrollReveal>
              <p className="text-accent text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-4">
                Join Us
              </p>
              <h2 className="text-[1.8rem] lg:text-[2.2rem] font-bold text-white tracking-[-0.04em] leading-[1.3] mb-4">
                양육 과정에 참여하고 싶으신가요?
              </h2>
              <p className="text-[0.92rem] text-white/60 leading-[1.75] tracking-[-0.02em] mb-8 max-w-[480px] mx-auto">
                어떤 과정이든 언제든지 문의해 주세요.
                담당 교역자가 적합한 양육 과정을 안내해 드립니다.
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
