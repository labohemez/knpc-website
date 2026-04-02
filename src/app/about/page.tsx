import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "교회소개",
  description: "대한예수교장로회 강남교회를 소개합니다. 담임목사 인사말, 교회 역사, 비전, 오시는 길 안내.",
};

const history = [
  { year: "1991", desc: "강남교회 창립 (초대 담임목사 부임)" },
  { year: "1995", desc: "현 위치(노량진동) 예배당 건축 완공" },
  { year: "2002", desc: "교육관 증축, 어린이·청소년 사역 본격화" },
  { year: "2008", desc: "선교훈련원 설립, 해외 선교 파송 시작" },
  { year: "2014", desc: "장애인부 창설, 통합예배 첫 시행" },
  { year: "2019", desc: "온라인 예배 시스템 구축 (유튜브 생중계)" },
  { year: "2023", desc: "창립 32주년, 홈페이지 리뉴얼 및 디지털 사역 확장" },
];

const visions = [
  {
    title: "가르치는 교회",
    desc: "말씀으로 신앙을 세우고 성숙한 제자를 양성합니다.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: "선포하는 교회",
    desc: "복음을 담대히 전하며 지역 사회와 열방에 증인이 됩니다.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
      </svg>
    ),
  },
  {
    title: "치유하는 교회",
    desc: "상처받은 영혼을 품고 회복과 치유의 공동체를 이룹니다.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    title: "목회자를 양성하는 교회",
    desc: "다음 세대 지도자를 발굴하고 훈련하여 파송합니다.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    title: "장애인과 함께하는 교회",
    desc: "누구나 환영받는 통합 공동체를 지향합니다.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
      </svg>
    ),
  },
];

const transports = [
  {
    type: "지하철",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    lines: ["1호선 노량진역 2번 출구 도보 10분", "9호선 노량진역 5번 출구 도보 8분"],
  },
  {
    type: "버스",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    lines: ["간선버스 150, 506 — 노량진역 하차", "지선버스 5536, 5714 — 만양로 하차"],
  },
  {
    type: "주차",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    lines: ["교회 지하 주차장 이용 가능 (예배 시간 무료)", "만양로 인근 공영주차장 이용 가능"],
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="flex-1 bg-white flex flex-col gap-3 pt-[70px] lg:pt-[90px]">
        {/* ── 히어로 ── */}
        <section className="relative h-[280px] lg:h-[380px] flex items-end pb-10 lg:pb-14">
          <Image
            src="/images/hero-2.jpg"
            alt="강남교회 전경"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary-dark/75" />
          <div className="relative mx-auto max-w-[1400px] px-5 lg:px-8 w-full">
            <p className="text-accent text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-2">
              About Us
            </p>
            <h1 className="text-[2.2rem] lg:text-[3rem] font-bold text-white tracking-[-0.04em] leading-[1.15]">
              교회소개
            </h1>
          </div>
        </section>

        {/* ── 담임목사 인사말 ── */}
        <section className="py-[5rem] lg:py-[7rem] bg-white">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            <ScrollReveal>
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                <div className="shrink-0 lg:w-[320px]">
                  <div className="relative w-full lg:w-[320px] aspect-[3/4] overflow-hidden bg-[#f0ede8]">
                    <Image
                      src="/images/gallery-1.jpg"
                      alt="담임목사"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-4 border-l-2 border-accent pl-4">
                    <p className="text-[0.78rem] text-[#999] tracking-[-0.02em]">담임목사</p>
                    <p className="text-[1.1rem] font-bold text-[#222] tracking-[-0.03em]">홍길동 목사</p>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-accent text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-4">
                    Pastor&apos;s Greeting
                  </p>
                  <h2 className="text-[1.8rem] lg:text-[2.2rem] font-bold text-[#222] tracking-[-0.04em] leading-[1.3] mb-8">
                    은혜와 평강이<br />
                    여러분께 가득하기를 원합니다
                  </h2>
                  <div className="space-y-5 text-[0.92rem] text-[#555] leading-[1.85] tracking-[-0.02em]">
                    <p>
                      강남교회를 찾아주신 여러분을 주님의 이름으로 환영합니다.
                      우리 강남교회는 1991년 창립 이래 &ldquo;온전한 믿음, 성숙한 교회&rdquo;의 비전을 품고
                      하나님 나라를 위해 달려온 교회입니다.
                    </p>
                    <p>
                      우리는 말씀을 중심으로 가르치고, 복음을 담대히 선포하며, 상처받은 영혼을 치유하고,
                      다음 세대 목회자를 양성하며, 장애인과 함께하는 통합 공동체를 이루어 왔습니다.
                      이 다섯 가지 비전은 우리 교회의 정체성이자 나아갈 방향입니다.
                    </p>
                    <p>
                      여러분이 이 공동체 안에서 하나님의 사랑과 은혜를 경험하고,
                      믿음 안에서 성장하며, 서로를 섬기는 기쁨을 누리시기를 간절히 바랍니다.
                      강남교회의 문은 언제나 열려 있습니다. 오십시오, 함께 예배합시다.
                    </p>
                    <p className="text-[#888] text-[0.85rem]">
                      강남교회 담임목사 홍길동
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── 교회 역사 ── */}
        <section className="py-[5rem] lg:py-[7rem] bg-[#f5f5f7]">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            <ScrollReveal>
              <div className="mb-10 lg:mb-14">
                <p className="text-accent text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-3">
                  History
                </p>
                <h2 className="text-[1.8rem] lg:text-[2.2rem] font-bold text-[#222] tracking-[-0.04em] leading-[1.3]">
                  교회 역사
                </h2>
              </div>
            </ScrollReveal>
            <div className="relative">
              {/* 세로선 */}
              <div className="absolute left-[4.5rem] lg:left-1/2 top-0 bottom-0 w-[1px] bg-[#ddd]" />
              <div className="space-y-0">
                {history.map((item, i) => (
                  <ScrollReveal key={item.year}>
                    <div className={`relative flex items-start gap-6 lg:gap-0 pb-10 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                      {/* 연도 (데스크톱: 반반) */}
                      <div className={`hidden lg:flex w-1/2 ${i % 2 === 0 ? "justify-end pr-10" : "justify-start pl-10 order-last"}`}>
                        <div className={`text-right ${i % 2 !== 0 ? "text-left" : ""}`}>
                          <span className="text-[2rem] font-bold text-primary/20 tracking-[-0.04em]">{item.year}</span>
                          <p className="text-[0.9rem] text-[#555] tracking-[-0.02em] leading-[1.6] mt-1 max-w-[280px]">{item.desc}</p>
                        </div>
                      </div>
                      {/* 닷 */}
                      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-accent rounded-full border-2 border-white top-2" />
                      {/* 모바일 레이아웃 */}
                      <div className="lg:hidden flex items-start gap-6 w-full">
                        <div className="shrink-0 w-[4rem] text-right">
                          <span className="text-[1rem] font-bold text-primary tracking-[-0.03em]">{item.year}</span>
                        </div>
                        <div className="relative flex-1 pb-0">
                          <div className="absolute -left-[1.55rem] top-[0.35rem] w-2.5 h-2.5 bg-accent rounded-full border-2 border-white" />
                          <p className="text-[0.9rem] text-[#555] tracking-[-0.02em] leading-[1.6]">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 비전 ── */}
        <section className="py-[5rem] lg:py-[7rem] bg-white">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            <ScrollReveal>
              <div className="mb-10 lg:mb-14 text-center">
                <p className="text-accent text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-3">
                  Our Vision
                </p>
                <h2 className="text-[1.8rem] lg:text-[2.2rem] font-bold text-[#222] tracking-[-0.04em] leading-[1.3]">
                  다섯 가지 비전
                </h2>
                <p className="mt-4 text-[0.92rem] text-[#777] tracking-[-0.02em]">
                  강남교회가 지향하는 공동체의 모습입니다
                </p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
              {visions.map((v, i) => (
                <ScrollReveal key={v.title}>
                  <div className="border border-[#eee] p-6 lg:p-7 bg-white hover:border-primary/30 hover:bg-[#f9f9f7] transition-colors duration-300">
                    <div className="text-primary mb-4">{v.icon}</div>
                    <h3 className="text-[0.95rem] font-bold text-[#222] tracking-[-0.03em] mb-2">
                      {v.title}
                    </h3>
                    <p className="text-[0.82rem] text-[#777] leading-[1.7] tracking-[-0.02em]">{v.desc}</p>
                    <div className="mt-5 text-[0.72rem] font-bold text-accent">0{i + 1}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 예배 안내 ── */}
        <section className="relative py-[5rem] lg:py-[6rem] overflow-hidden">
          <Image src="/images/gallery-5.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-primary-dark/85" />
          <div className="relative mx-auto max-w-[1400px] px-5 lg:px-8">
            <ScrollReveal>
              <div className="mb-10 text-center">
                <p className="text-accent text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-3">
                  Worship
                </p>
                <h2 className="text-[1.8rem] lg:text-[2.2rem] font-bold text-white tracking-[-0.04em] leading-[1.3]">
                  예배 안내
                </h2>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "주일예배", times: ["1부 오전 8:00", "2부 오전 10:00", "3부 오후 12:00"], note: "어린이·청소년 예배 동시 진행" },
                  { title: "수요예배", times: ["오전 11:00", "오후 7:00"], note: "온라인 동시 생중계" },
                  { title: "금요기도회", times: ["오후 8:00"], note: "전교인 합심 중보기도" },
                  { title: "새벽기도회", times: ["오전 5:30"], note: "월–토 매일 진행" },
                ].map((s) => (
                  <div key={s.title} className="border border-white/15 p-6 bg-white/5">
                    <h3 className="text-[0.82rem] font-semibold text-accent tracking-[-0.02em] mb-3">{s.title}</h3>
                    {s.times.map((t) => (
                      <p key={t} className="text-[1rem] font-bold text-white tracking-[-0.03em] leading-[1.5]">{t}</p>
                    ))}
                    <p className="mt-3 text-[0.75rem] text-white/40 tracking-[-0.02em]">{s.note}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── 오시는 길 ── */}
        <section className="py-[5rem] lg:py-[7rem] bg-[#f5f5f7]">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            <ScrollReveal>
              <div className="mb-10 lg:mb-14">
                <p className="text-accent text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-3">
                  Location
                </p>
                <h2 className="text-[1.8rem] lg:text-[2.2rem] font-bold text-[#222] tracking-[-0.04em] leading-[1.3]">
                  오시는 길
                </h2>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="flex flex-col lg:flex-row gap-8">
                {/* 지도 영역 */}
                <div className="lg:flex-1 min-h-[320px] lg:min-h-[420px] bg-[#ddd] overflow-hidden">
                  <iframe
                    src="https://maps.google.com/maps?q=서울시+동작구+만양로+76&output=embed&z=16"
                    className="w-full h-full min-h-[320px] lg:min-h-[420px] border-0"
                    loading="lazy"
                    title="강남교회 지도"
                  />
                </div>
                {/* 정보 */}
                <div className="lg:w-[360px] space-y-6">
                  <div>
                    <h3 className="text-[0.78rem] font-semibold text-[#999] tracking-[0.1em] uppercase mb-3">주소</h3>
                    <p className="text-[1rem] font-bold text-[#222] tracking-[-0.03em]">서울시 동작구 만양로 76</p>
                    <p className="text-[0.85rem] text-[#777] tracking-[-0.02em] mt-1">(우편번호 07034, 노량진동)</p>
                  </div>
                  <div>
                    <h3 className="text-[0.78rem] font-semibold text-[#999] tracking-[0.1em] uppercase mb-3">연락처</h3>
                    <p className="text-[0.9rem] text-[#444] tracking-[-0.02em]">
                      Tel. <a href="tel:02-814-7606" className="hover:text-primary transition-colors">02-814-7606</a>
                    </p>
                    <p className="text-[0.9rem] text-[#444] tracking-[-0.02em]">Fax. 02-817-9571</p>
                    <p className="text-[0.9rem] text-[#444] tracking-[-0.02em]">
                      Email. <a href="mailto:knpc91@hanmail.net" className="hover:text-primary transition-colors">knpc91@hanmail.net</a>
                    </p>
                  </div>
                  <div className="space-y-4">
                    {transports.map((t) => (
                      <div key={t.type}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-primary">{t.icon}</span>
                          <h3 className="text-[0.82rem] font-semibold text-[#222] tracking-[-0.02em]">{t.type}</h3>
                        </div>
                        {t.lines.map((line) => (
                          <p key={line} className="text-[0.82rem] text-[#777] tracking-[-0.02em] leading-[1.6] pl-7">{line}</p>
                        ))}
                      </div>
                    ))}
                  </div>
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
