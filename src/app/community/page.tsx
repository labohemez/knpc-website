import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "공동체",
  description: "강남교회의 다양한 공동체를 소개합니다. 구역예배, 선교회, 부서별 사역을 확인하세요.",
};

const communities = [
  {
    id: 1,
    category: "예배 부서",
    name: "유아·유치부",
    age: "0 – 6세",
    desc: "하나님 나라를 마음에 심는 첫 걸음. 성경 이야기와 찬양으로 어린 자녀들이 신앙의 씨앗을 심습니다.",
    meeting: "주일 오전 10:00",
    contact: "교육부 담당자",
    image: "/images/gallery-1.jpg",
    color: "from-green-50",
  },
  {
    id: 2,
    category: "예배 부서",
    name: "초등부",
    age: "초등학교 1 – 6학년",
    desc: "말씀과 놀이를 통해 신앙을 성장시키는 공동체. 다양한 활동으로 친구들과 함께 예수님을 배웁니다.",
    meeting: "주일 오전 10:00",
    contact: "교육부 담당자",
    image: "/images/gallery-2.jpg",
    color: "from-yellow-50",
  },
  {
    id: 3,
    category: "예배 부서",
    name: "중·고등부",
    age: "중학교 1학년 – 고등학교 3학년",
    desc: "청소년이 복음 안에서 자신의 정체성을 발견하고 세상을 바꿀 다음 세대로 세워지는 공동체입니다.",
    meeting: "주일 오전 10:00",
    contact: "교육부 담당자",
    image: "/images/gallery-3.jpg",
    color: "from-blue-50",
  },
  {
    id: 4,
    category: "청년 공동체",
    name: "청년부",
    age: "19 – 35세",
    desc: "사회 속에서 그리스도인으로 살아가는 청년들의 공동체. 예배·소그룹·수련회·봉사를 통해 함께 성장합니다.",
    meeting: "주일 오후 2:00 / 금요 모임",
    contact: "청년부 간사",
    image: "/images/gallery-4.jpg",
    color: "from-purple-50",
  },
  {
    id: 5,
    category: "구역 공동체",
    name: "구역예배 (지역별)",
    age: "전 연령",
    desc: "가정에서 드리는 소규모 예배와 교제를 통해 일상 속에서 신앙을 나누는 구역 공동체입니다.",
    meeting: "매주 평일 (구역별 상이)",
    contact: "담당 목사",
    image: "/images/gallery-5.jpg",
    color: "from-orange-50",
  },
  {
    id: 6,
    category: "선교회",
    name: "남선교회",
    age: "36세 이상 남성",
    desc: "남성 신앙인들이 함께 모여 말씀을 나누고 교회와 지역 사회를 섬기는 선교 공동체입니다.",
    meeting: "월 1회 모임",
    contact: "남선교회 회장",
    image: "/images/gallery-6.jpg",
    color: "from-slate-50",
  },
  {
    id: 7,
    category: "선교회",
    name: "여선교회",
    age: "36세 이상 여성",
    desc: "여성 신앙인들의 기도와 섬김의 공동체. 국내외 선교 지원과 교회 사역에 헌신하고 있습니다.",
    meeting: "월 1회 모임",
    contact: "여선교회 회장",
    image: "/images/gallery-1.jpg",
    color: "from-rose-50",
  },
  {
    id: 8,
    category: "특수 사역",
    name: "장애인부",
    age: "전 연령",
    desc: "장애인과 비장애인이 함께 예배하는 통합 공동체. 모두가 하나님 앞에 동등한 지체임을 고백합니다.",
    meeting: "주일 오전 10:00",
    contact: "사회복지 담당",
    image: "/images/gallery-2.jpg",
    color: "from-teal-50",
  },
];

const categoryGroups = ["전체", "예배 부서", "청년 공동체", "구역 공동체", "선교회", "특수 사역"];

export default function CommunityPage() {
  return (
    <>
      <Header />

      <main className="flex-1 bg-white flex flex-col gap-3 pt-[70px] lg:pt-[90px]">
        {/* ── 히어로 ── */}
        <section className="relative h-[280px] lg:h-[380px] flex items-end pb-10 lg:pb-14">
          <Image
            src="/images/gallery-3.jpg"
            alt="강남교회 공동체"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary-dark/80" />
          <div className="relative mx-auto max-w-[1400px] px-5 lg:px-8 w-full">
            <p className="text-accent text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-2">
              Community
            </p>
            <h1 className="text-[2.2rem] lg:text-[3rem] font-bold text-white tracking-[-0.04em] leading-[1.15]">
              공동체
            </h1>
          </div>
        </section>

        {/* ── 소개 문구 ── */}
        <section className="py-[5rem] lg:py-[6rem] bg-white">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            <ScrollReveal>
              <div className="max-w-[680px]">
                <p className="text-accent text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-4">
                  Together in Christ
                </p>
                <h2 className="text-[1.8rem] lg:text-[2.4rem] font-bold text-[#222] tracking-[-0.04em] leading-[1.3] mb-6">
                  함께하는 공동체,<br />
                  함께 성장하는 신앙
                </h2>
                <p className="text-[0.95rem] text-[#666] leading-[1.85] tracking-[-0.02em]">
                  강남교회는 연령과 세대, 상황에 관계없이 모든 지체가 하나님 안에서 연결되는
                  다양한 공동체를 운영합니다. 예배 부서, 구역 모임, 선교회, 그리고 특수 사역을 통해
                  혼자가 아닌 함께 믿음을 키워 나가시기 바랍니다.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── 공동체 목록 ── */}
        <section className="py-[4rem] lg:py-[5rem] bg-[#f5f5f7]">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            {/* 카테고리별 그룹 */}
            {["예배 부서", "청년 공동체", "구역 공동체", "선교회", "특수 사역"].map((cat) => {
              const items = communities.filter((c) => c.category === cat);
              return (
                <div key={cat} className="mb-12 lg:mb-16">
                  <ScrollReveal>
                    <div className="flex items-center gap-4 mb-6">
                      <h3 className="text-[0.72rem] font-semibold text-[#999] tracking-[0.15em] uppercase">
                        {cat}
                      </h3>
                      <div className="flex-1 h-[1px] bg-[#e5e5e5]" />
                    </div>
                  </ScrollReveal>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                    {items.map((item) => (
                      <ScrollReveal key={item.id}>
                        <article className="bg-white border border-[#eee] group hover:border-primary/30 hover:shadow-sm transition-all duration-300 overflow-hidden">
                          <div className="relative aspect-[16/9] overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                            />
                            <div className="absolute top-3 left-3 bg-primary/80 backdrop-blur-sm px-3 py-1 text-[0.68rem] font-semibold text-white tracking-[-0.01em]">
                              {item.category}
                            </div>
                          </div>
                          <div className="p-5 lg:p-6">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h4 className="text-[1rem] font-bold text-[#222] tracking-[-0.03em]">{item.name}</h4>
                              <span className="shrink-0 text-[0.7rem] text-accent font-medium tracking-[-0.01em] mt-0.5">{item.age}</span>
                            </div>
                            <p className="text-[0.82rem] text-[#777] leading-[1.7] tracking-[-0.02em] mb-4">
                              {item.desc}
                            </p>
                            <div className="border-t border-[#f0f0f0] pt-4 space-y-1.5">
                              <div className="flex items-center gap-2 text-[0.78rem] text-[#999] tracking-[-0.02em]">
                                <svg className="w-3.5 h-3.5 text-[#ccc] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {item.meeting}
                              </div>
                              <div className="flex items-center gap-2 text-[0.78rem] text-[#999] tracking-[-0.02em]">
                                <svg className="w-3.5 h-3.5 text-[#ccc] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                                {item.contact}
                              </div>
                            </div>
                          </div>
                        </article>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative py-[5rem] lg:py-[6rem] overflow-hidden">
          <Image src="/images/hero-2.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-primary-dark/85" />
          <div className="relative mx-auto max-w-[1400px] px-5 lg:px-8 text-center">
            <ScrollReveal>
              <p className="text-accent text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-4">
                Join Us
              </p>
              <h2 className="text-[1.8rem] lg:text-[2.2rem] font-bold text-white tracking-[-0.04em] leading-[1.3] mb-4">
                어떤 공동체에 속할지 고민되세요?
              </h2>
              <p className="text-[0.92rem] text-white/60 leading-[1.75] tracking-[-0.02em] mb-8 max-w-[480px] mx-auto">
                담당 부서로 문의하시면 맞는 공동체를 안내해 드립니다.
                새가족이시라면 새가족 안내 페이지를 먼저 확인해 주세요.
              </p>
              <div className="flex justify-center gap-3 flex-wrap">
                <a
                  href="/newcomer"
                  className="px-8 py-3.5 bg-accent text-white text-[0.85rem] font-semibold tracking-[-0.02em] hover:bg-accent-dark transition-colors duration-300"
                >
                  새가족 안내
                </a>
                <a
                  href="tel:02-814-7606"
                  className="px-8 py-3.5 border border-white/40 text-white text-[0.85rem] font-medium tracking-[-0.02em] hover:bg-white/10 transition-colors duration-300"
                >
                  전화 문의
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
