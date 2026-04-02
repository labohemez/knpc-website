"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const tabs = ["공지사항", "교회소식", "주보"] as const;
type Tab = (typeof tabs)[number];

const notices = [
  { id: 1, title: "2026년 부활절 연합예배 안내", date: "2026.04.01", isNew: true, important: true, excerpt: "오는 4월 20일(일) 부활절을 맞이하여 전교인 연합예배를 드립니다. 예배 후 교제 시간이 있을 예정입니다." },
  { id: 2, title: "4월 당회 안건 공고", date: "2026.03.30", isNew: true, important: false, excerpt: "2026년 4월 당회에서 다룰 안건을 미리 공지합니다. 관심 있는 교인분들은 확인 바랍니다." },
  { id: 3, title: "교회학교 봄학기 등록 안내", date: "2026.03.25", isNew: false, important: false, excerpt: "2026년 봄학기 교회학교(유·초등부, 중고등부) 등록을 받습니다. 4월 6일까지 교육부로 신청하세요." },
  { id: 4, title: "예배당 리모델링 공사 일정 안내", date: "2026.03.20", isNew: false, important: true, excerpt: "예배당 내부 리모델링 공사로 인해 3월 28일(토) ~ 4월 5일(일) 기간 중 일부 공간 이용이 제한됩니다." },
  { id: 5, title: "2026년 사순절 특별새벽기도회 일정", date: "2026.03.10", isNew: false, important: false, excerpt: "재의 수요일부터 부활절 전날까지 사순절 특별새벽기도회를 진행합니다. 많은 참여 바랍니다." },
  { id: 6, title: "청년부 수련회 안내", date: "2026.03.05", isNew: false, important: false, excerpt: "청년부 봄 수련회를 4월 18~19일(토~일) 양평 수양관에서 진행합니다. 신청 마감: 4월 7일." },
  { id: 7, title: "온라인 헌금 계좌 변경 안내", date: "2026.02.28", isNew: false, important: true, excerpt: "온라인 헌금 계좌가 변경되었습니다. 신한은행 100-024-913238 (예금주: 대한예수교장로회강남교회)" },
];

const news = [
  { id: 1, title: "제3회 강남교회 음악회 성황리 마무리", date: "2026.03.28", category: "교회소식", thumbnail: "/images/gallery-1.jpg", excerpt: "지난 3월 22일(토) 열린 제3회 강남교회 음악회에 500여 명의 성도들이 참석하여 은혜로운 시간을 가졌습니다." },
  { id: 2, title: "사순절 특별새벽기도회 은혜 나눔", date: "2026.03.20", category: "교회소식", thumbnail: "/images/gallery-2.jpg", excerpt: "40일간의 사순절 특별새벽기도회를 통해 많은 성도들이 깊은 은혜를 경험하였습니다." },
  { id: 3, title: "노량진 지역 섬김의 날 진행", date: "2026.03.15", category: "섬김", thumbnail: "/images/gallery-3.jpg", excerpt: "지역사회를 섬기는 '섬김의 날' 행사로 200여 명의 성도들이 노량진 일대에서 봉사활동을 펼쳤습니다." },
  { id: 4, title: "2025년 연간 결산 보고", date: "2026.02.20", category: "행정", thumbnail: "/images/gallery-4.jpg", excerpt: "2025년도 교회 재정 결산 보고서를 공개합니다. 투명하고 책임 있는 재정 운영에 최선을 다하겠습니다." },
];

const bulletins = [
  { id: 1, title: "주보 2026년 4월 1일 (종려주일)", date: "2026.04.01", fileSize: "2.3MB" },
  { id: 2, title: "주보 2026년 3월 29일", date: "2026.03.29", fileSize: "2.1MB" },
  { id: 3, title: "주보 2026년 3월 22일", date: "2026.03.22", fileSize: "2.0MB" },
  { id: 4, title: "주보 2026년 3월 15일", date: "2026.03.15", fileSize: "2.2MB" },
  { id: 5, title: "주보 2026년 3월 8일", date: "2026.03.08", fileSize: "1.9MB" },
  { id: 6, title: "주보 2026년 3월 1일 (삼일절 주일)", date: "2026.03.01", fileSize: "2.4MB" },
  { id: 7, title: "주보 2026년 2월 22일", date: "2026.02.22", fileSize: "2.0MB" },
  { id: 8, title: "주보 2026년 2월 15일", date: "2026.02.15", fileSize: "1.8MB" },
];

function PdfIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("공지사항");

  return (
    <>
      <Header />

      <main className="flex-1 bg-white flex flex-col gap-3 pt-[70px] lg:pt-[90px]">
        {/* ── 히어로 ── */}
        <section className="relative h-[280px] lg:h-[380px] flex items-end pb-10 lg:pb-14">
          <Image
            src="/images/gallery-4.jpg"
            alt="교회 소식"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary-dark/80" />
          <div className="relative mx-auto max-w-[1400px] px-5 lg:px-8 w-full">
            <p className="text-accent text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-2">
              News
            </p>
            <h1 className="text-[2.2rem] lg:text-[3rem] font-bold text-white tracking-[-0.04em] leading-[1.15]">
              소식
            </h1>
          </div>
        </section>

        {/* ── 탭 + 콘텐츠 ── */}
        <section className="py-[4rem] lg:py-[5rem] bg-white">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            {/* 탭 */}
            <ScrollReveal>
              <div className="flex border-b border-[#eee] mb-8 lg:mb-10">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 lg:px-8 py-4 text-[0.88rem] font-semibold tracking-[-0.02em] transition-colors duration-200 border-b-2 -mb-[2px] ${
                      activeTab === tab
                        ? "text-primary border-primary"
                        : "text-[#999] border-transparent hover:text-[#555]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            {/* 공지사항 */}
            {activeTab === "공지사항" && (
              <div>
                <ScrollReveal>
                  <div className="divide-y divide-[#f0f0f0]">
                    {notices.map((item) => (
                      <article key={item.id} className="py-5 lg:py-6 group cursor-pointer hover:bg-[#fafaf8] -mx-4 px-4 transition-colors duration-200">
                        <div className="flex items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              {item.important && (
                                <span className="text-[0.68rem] font-bold text-white bg-accent px-2 py-0.5 tracking-[-0.01em] shrink-0">중요</span>
                              )}
                              {item.isNew && (
                                <span className="text-[0.68rem] font-bold text-white bg-primary px-2 py-0.5 tracking-[-0.01em] shrink-0">NEW</span>
                              )}
                              <h3 className="text-[0.95rem] font-semibold text-[#222] tracking-[-0.03em] group-hover:text-primary transition-colors truncate">
                                {item.title}
                              </h3>
                            </div>
                            <p className="text-[0.82rem] text-[#888] tracking-[-0.02em] leading-[1.6] line-clamp-2 hidden lg:block">
                              {item.excerpt}
                            </p>
                          </div>
                          <div className="shrink-0 text-right">
                            <p className="text-[0.78rem] text-[#bbb] tracking-[-0.02em]">{item.date}</p>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </ScrollReveal>
                <ScrollReveal>
                  <div className="mt-8 text-center">
                    <button className="px-10 py-3.5 border border-[#ddd] text-[0.85rem] font-medium text-[#555] tracking-[-0.02em] hover:border-primary hover:text-primary transition-colors duration-300">
                      더 보기
                    </button>
                  </div>
                </ScrollReveal>
              </div>
            )}

            {/* 교회소식 */}
            {activeTab === "교회소식" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
                {news.map((item) => (
                  <ScrollReveal key={item.id}>
                    <article className="group cursor-pointer flex gap-5 items-start">
                      <div className="relative shrink-0 w-[120px] lg:w-[160px] aspect-[4/3] overflow-hidden bg-[#f0f0f0]">
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 min-w-0 py-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[0.68rem] font-semibold text-primary bg-primary/10 px-2 py-0.5 tracking-[-0.01em]">
                            {item.category}
                          </span>
                        </div>
                        <h3 className="text-[0.95rem] font-bold text-[#222] tracking-[-0.03em] leading-[1.4] mb-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-[0.8rem] text-[#888] tracking-[-0.02em] leading-[1.6] line-clamp-2 hidden lg:block">
                          {item.excerpt}
                        </p>
                        <p className="mt-2 text-[0.75rem] text-[#bbb] tracking-[-0.02em]">{item.date}</p>
                      </div>
                    </article>
                  </ScrollReveal>
                ))}
              </div>
            )}

            {/* 주보 */}
            {activeTab === "주보" && (
              <div>
                <ScrollReveal>
                  <div className="divide-y divide-[#f0f0f0]">
                    {bulletins.map((item) => (
                      <div key={item.id} className="py-4 lg:py-5 flex items-center gap-4 group cursor-pointer hover:bg-[#fafaf8] -mx-4 px-4 transition-colors duration-200">
                        <div className="text-accent shrink-0">
                          <PdfIcon />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[0.92rem] font-semibold text-[#222] tracking-[-0.03em] group-hover:text-primary transition-colors truncate">
                            {item.title}
                          </h3>
                          <p className="text-[0.75rem] text-[#bbb] tracking-[-0.02em] mt-0.5">{item.date} · PDF {item.fileSize}</p>
                        </div>
                        <div className="shrink-0 text-[#ccc] group-hover:text-primary transition-colors">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
                <ScrollReveal>
                  <div className="mt-8 text-center">
                    <button className="px-10 py-3.5 border border-[#ddd] text-[0.85rem] font-medium text-[#555] tracking-[-0.02em] hover:border-primary hover:text-primary transition-colors duration-300">
                      더 보기
                    </button>
                  </div>
                </ScrollReveal>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
