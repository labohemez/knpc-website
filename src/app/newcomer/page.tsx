import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "새가족 안내",
  description: "강남교회에 처음 오시는 분들을 위한 새가족 안내 페이지입니다. 등록 방법과 절차를 확인하세요.",
};

const steps = [
  {
    num: "01",
    title: "주일예배 참석",
    desc: "주일 오전 10시 2부 예배를 추천드립니다. 입구에서 새가족임을 말씀해 주시면 안내를 받으실 수 있습니다.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "새가족 등록카드 작성",
    desc: "예배 후 안내 데스크에서 새가족 등록 카드를 작성해 주세요. 개인 정보는 교회 사역 목적으로만 사용됩니다.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "새가족 환영 모임 참석",
    desc: "매월 첫째 주일 오후 2시, 새가족 환영 모임을 진행합니다. 담임목사님과의 만남과 교회 소개가 있습니다.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "새가족 양육 과정",
    desc: "6주간의 새가족 양육 과정을 통해 신앙의 기초를 다지고, 교회 공동체 안에서 자리를 잡으실 수 있도록 돕겠습니다.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "소그룹 배치",
    desc: "양육 과정 수료 후 구역 또는 속회에 배치되어 긴밀한 신앙 공동체 안에서 함께 성장해 나가게 됩니다.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
];

const faqs = [
  {
    q: "교인이 아니어도 예배에 참석할 수 있나요?",
    a: "네, 누구나 환영합니다. 믿지 않는 분, 처음 교회를 오시는 분, 다른 교회에 다니시는 분 모두 자유롭게 참석하실 수 있습니다.",
  },
  {
    q: "예배 복장에 제한이 있나요?",
    a: "복장에 특별한 제한은 없습니다. 편안하게 입고 오셔도 됩니다. 중요한 것은 예배를 드리러 오신 마음입니다.",
  },
  {
    q: "주차는 가능한가요?",
    a: "교회 지하 주차장을 이용하실 수 있으며, 예배 시간 중 무료입니다. 주차 공간이 부족할 경우 인근 공영주차장을 이용하세요.",
  },
  {
    q: "자녀를 위한 프로그램이 있나요?",
    a: "유아부, 유치부, 초등부, 중고등부 등 다양한 연령대별 예배와 교육 프로그램이 주일에 함께 운영됩니다.",
  },
  {
    q: "온라인으로도 예배를 드릴 수 있나요?",
    a: "네. 주일 2부 예배를 포함한 주요 예배를 유튜브 채널(@KNPC)을 통해 실시간으로 생중계합니다.",
  },
];

export default function NewcomerPage() {
  return (
    <>
      <Header />

      <main className="flex-1 bg-white flex flex-col gap-3 ">
        {/* ── 히어로 ── */}
        <section className="relative h-[350px] lg:h-[470px] flex items-end pb-10 lg:pb-14">
          <Image
            src="/images/hero-1.jpg"
            alt="새가족 환영"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary-dark/80" />
          <div className="relative mx-auto max-w-[1400px] px-5 lg:px-8 w-full">
            <p className="text-accent text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-2">
              Welcome
            </p>
            <h1 className="text-[2.2rem] lg:text-[3rem] font-bold text-white tracking-[-0.04em] leading-[1.15]">
              새가족 안내
            </h1>
          </div>
        </section>

        {/* ── 환영 메시지 ── */}
        <section className="py-[5rem] lg:py-[7rem] bg-white">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            <ScrollReveal>
              <div className="max-w-[720px] mx-auto text-center">
                <p className="text-accent text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-4">
                  We&apos;re glad you&apos;re here
                </p>
                <h2 className="text-[1.8rem] lg:text-[2.4rem] font-bold text-[#222] tracking-[-0.04em] leading-[1.3] mb-6">
                  강남교회에 오신 것을<br />진심으로 환영합니다
                </h2>
                <p className="text-[0.95rem] text-[#666] leading-[1.85] tracking-[-0.02em] mb-4">
                  교회에 처음 오시는 것이 낯설고 어색하게 느껴지실 수도 있습니다.
                  하지만 걱정하지 마세요. 강남교회의 모든 성도들이 여러분을 기다리고 있습니다.
                </p>
                <p className="text-[0.95rem] text-[#666] leading-[1.85] tracking-[-0.02em]">
                  처음 방문하시는 분들을 위해 새가족부에서 친절하게 안내해 드리겠습니다.
                  주일 예배 후 새가족 담당 부서를 찾아 주시거나, 아래 연락처로 문의해 주세요.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── 등록 절차 ── */}
        <section className="py-[5rem] lg:py-[7rem] bg-[#f5f5f7]">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            <ScrollReveal>
              <div className="mb-10 lg:mb-14 text-center">
                <p className="text-accent text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-3">
                  Steps
                </p>
                <h2 className="text-[1.8rem] lg:text-[2.2rem] font-bold text-[#222] tracking-[-0.04em] leading-[1.3]">
                  등록 절차 안내
                </h2>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
              {steps.map((step, i) => (
                <ScrollReveal key={step.num}>
                  <div className="relative bg-white border border-[#eee] p-6 lg:p-7">
                    {/* 화살표 (마지막 제외) */}
                    {i < steps.length - 1 && (
                      <div className="hidden lg:block absolute -right-[1.15rem] top-1/2 -translate-y-1/2 z-10 text-[#ccc]">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </div>
                    )}
                    <div className="text-primary mb-4">{step.icon}</div>
                    <div className="text-[2rem] font-bold text-[#f0f0f0] tracking-[-0.04em] mb-3">{step.num}</div>
                    <h3 className="text-[0.95rem] font-bold text-[#222] tracking-[-0.03em] mb-2">{step.title}</h3>
                    <p className="text-[0.82rem] text-[#777] leading-[1.7] tracking-[-0.02em]">{step.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 예배 및 시간 안내 ── */}
        <section className="relative py-[5rem] lg:py-[6rem] overflow-hidden">
          <Image src="/images/gallery-2.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-primary-dark/85" />
          <div className="relative mx-auto max-w-[1400px] px-5 lg:px-8">
            <ScrollReveal>
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-20">
                <div className="lg:w-[320px] shrink-0">
                  <p className="text-accent text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-3">
                    For Newcomers
                  </p>
                  <h2 className="text-[1.8rem] lg:text-[2.2rem] font-bold text-white tracking-[-0.04em] leading-[1.3]">
                    처음 오신다면<br />
                    2부 예배를 권합니다
                  </h2>
                  <p className="mt-4 text-[0.88rem] text-white/60 leading-[1.75] tracking-[-0.02em]">
                    주일 오전 10시 2부 예배는 가장 활기차고 풍성한 예배입니다.
                    예배 후 새가족부 안내를 받으실 수 있습니다.
                  </p>
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "주일예배", sub: "매 주일", times: "1부 8:00 / 2부 10:00 / 3부 12:00", recommend: true },
                    { title: "수요예배", sub: "매주 수요일", times: "오전 11:00 · 오후 7:00", recommend: false },
                    { title: "금요기도회", sub: "매주 금요일", times: "오후 8:00", recommend: false },
                    { title: "새벽기도회", sub: "월~토 매일", times: "오전 5:30", recommend: false },
                  ].map((s) => (
                    <div key={s.title} className={`p-5 border ${s.recommend ? "border-accent bg-accent/10" : "border-white/15 bg-white/5"}`}>
                      {s.recommend && (
                        <span className="inline-block text-[0.65rem] font-bold text-accent border border-accent px-2 py-0.5 mb-2 tracking-[0.05em]">
                          추천
                        </span>
                      )}
                      <h3 className={`text-[0.85rem] font-semibold tracking-[-0.02em] mb-1 ${s.recommend ? "text-accent" : "text-white/70"}`}>{s.title}</h3>
                      <p className="text-[0.72rem] text-white/40 tracking-[-0.02em] mb-2">{s.sub}</p>
                      <p className="text-[1rem] font-bold text-white tracking-[-0.03em]">{s.times}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-[5rem] lg:py-[7rem] bg-white">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            <ScrollReveal>
              <div className="mb-10 lg:mb-14">
                <p className="text-accent text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-3">
                  FAQ
                </p>
                <h2 className="text-[1.8rem] lg:text-[2.2rem] font-bold text-[#222] tracking-[-0.04em] leading-[1.3]">
                  자주 묻는 질문
                </h2>
              </div>
            </ScrollReveal>
            <div className="max-w-[800px] space-y-0 divide-y divide-[#f0f0f0]">
              {faqs.map((faq) => (
                <ScrollReveal key={faq.q}>
                  <div className="py-6">
                    <div className="flex gap-4 items-start mb-3">
                      <span className="shrink-0 text-[0.82rem] font-bold text-accent">Q.</span>
                      <p className="text-[0.95rem] font-semibold text-[#222] tracking-[-0.03em]">{faq.q}</p>
                    </div>
                    <div className="flex gap-4 items-start">
                      <span className="shrink-0 text-[0.82rem] font-bold text-[#ccc]">A.</span>
                      <p className="text-[0.9rem] text-[#666] leading-[1.75] tracking-[-0.02em]">{faq.a}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 문의 CTA ── */}
        <section className="py-[4rem] lg:py-[5rem] bg-[#f5f5f7]">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            <ScrollReveal>
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-white border border-[#eee] p-8 lg:p-12">
                <div>
                  <h3 className="text-[1.3rem] font-bold text-[#222] tracking-[-0.04em] mb-2">
                    더 궁금한 점이 있으신가요?
                  </h3>
                  <p className="text-[0.88rem] text-[#777] tracking-[-0.02em]">
                    새가족부로 연락 주시면 친절하게 안내해 드리겠습니다.
                  </p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <a
                    href="tel:02-814-7606"
                    className="px-8 py-3.5 bg-primary text-white text-[0.85rem] font-semibold tracking-[-0.02em] hover:bg-primary-dark transition-colors duration-300 inline-flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    전화 문의
                  </a>
                  <a
                    href="mailto:knpc91@hanmail.net"
                    className="px-8 py-3.5 border border-[#ddd] text-[#555] text-[0.85rem] font-medium tracking-[-0.02em] hover:border-primary hover:text-primary transition-colors duration-300"
                  >
                    이메일 문의
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
