"use client";

import { useState } from "react";

/* ── 인라인 SVG 아이콘 ── */
function MenuIcon({ name, className = "" }: { name: string; className?: string }) {
  const p: Record<string, React.ReactNode> = {
    person:   <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />,
    clock:    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
    star:     <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />,
    mapPin:   <><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></>,
    heart:    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />,
    check:    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
    question: <><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" /></>,
    book:     <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />,
  };
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      {p[name] ?? p.star}
    </svg>
  );
}

const sampleNav = ["교회소개", "새가족안내", "말씀과찬양", "공동체", "양육", "훈련", "커뮤니티"];

const sampleChildren = [
  { name: "담임목사 인사말", desc: "목사님의 환영 인사를 전합니다",   icon: "person" },
  { name: "교회 역사",      desc: "강남교회의 발자취를 소개합니다",   icon: "clock" },
  { name: "비전과 사명",    desc: "하나님 나라를 이 땅에 세우는 비전", icon: "star" },
  { name: "예배 안내",      desc: "주일·수요·새벽 예배 시간과 장소",  icon: "clock" },
  { name: "오시는 길",      desc: "교회 위치와 교통편 안내",          icon: "mapPin" },
];

function Label({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <div className="mb-4">
      <span className="inline-block text-[0.65rem] font-bold text-white bg-[#294a3a] px-2 py-0.5 mb-1">#{n}</span>
      <p className="text-[0.9rem] font-bold text-[#222] tracking-tight">{title}</p>
      <p className="text-[0.72rem] text-[#999] mt-0.5">{desc}</p>
    </div>
  );
}

function NavBar({ active }: { active: string }) {
  return (
    <div className="border-b border-[#e0e0e0] bg-white">
      <div className="flex items-center h-12 px-6 gap-1">
        {sampleNav.map((n) => (
          <div key={n} className="relative flex items-center">
            <span className={`flex items-center gap-1 px-3 py-1.5 text-[0.78rem] font-semibold tracking-tight cursor-pointer ${
              n === active ? "text-[#294a3a]" : "text-[#555]"
            }`}>
              {n}
              <svg className={`w-2.5 h-2.5 transition-transform ${n === active ? "rotate-180 text-[#294a3a]" : "text-[#bbb]"}`}
                fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </span>
            {n === active && <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-[#294a3a] rounded-full" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MenuMockupPage() {
  const [hoveredDesign, setHoveredDesign] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#f0f0ee] p-8">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-[1.5rem] font-bold text-[#222] mb-2 tracking-tight">드롭다운 메뉴 디자인 시안</h1>
        <p className="text-[0.85rem] text-[#888] mb-10">"교회소개" 호버 기준 · 딥그린(#294a3a) · 골드(#c69d6c)</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* ── 1. 다크 카드 그리드 (레퍼런스 스타일) ── */}
          <div className="bg-white shadow-sm overflow-hidden">
            <Label n={1} title="Dark Card Grid" desc="딥그린 배경 + 골드 아이콘 · 2열 카드 그리드" />
            <NavBar active="교회소개" />
            <div className="relative bg-[#f8f8f6] min-h-[320px]">
              <div className="absolute top-0 left-[40px] z-10 w-[420px]">
                <div className="bg-[#294a3a] p-3 shadow-2xl">
                  <div className="grid grid-cols-2 gap-[1px] bg-[#1e3a2d]">
                    {sampleChildren.slice(0, 4).map((c) => (
                      <div key={c.name} className="bg-[#294a3a] hover:bg-[#1e3a2d] p-4 cursor-pointer group transition-colors duration-150">
                        <div className="w-9 h-9 rounded-full bg-[#c69d6c]/20 flex items-center justify-center mb-2.5">
                          <MenuIcon name={c.icon} className="w-[18px] h-[18px] text-[#c69d6c]" />
                        </div>
                        <p className="text-[0.85rem] font-bold text-white tracking-[-0.02em] mb-1">{c.name}</p>
                        <p className="text-[0.7rem] text-white/50 leading-[1.5]">{c.desc}</p>
                      </div>
                    ))}
                  </div>
                  {/* 5번째 항목 풀너비 */}
                  <div className="mt-[1px] bg-[#1e3a2d]">
                    <div className="bg-[#294a3a] hover:bg-[#1e3a2d] p-4 cursor-pointer flex items-center gap-3 transition-colors duration-150">
                      <div className="w-9 h-9 rounded-full bg-[#c69d6c]/20 flex items-center justify-center shrink-0">
                        <MenuIcon name={sampleChildren[4].icon} className="w-[18px] h-[18px] text-[#c69d6c]" />
                      </div>
                      <div>
                        <p className="text-[0.85rem] font-bold text-white tracking-[-0.02em]">{sampleChildren[4].name}</p>
                        <p className="text-[0.7rem] text-white/50">{sampleChildren[4].desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 2. 다크 카드 + 라운드 아이콘 (그린 원형) ── */}
          <div className="bg-white shadow-sm overflow-hidden">
            <Label n={2} title="Dark Rounded Icons" desc="딥그린 배경 + 그린 원형 아이콘 뱃지" />
            <NavBar active="교회소개" />
            <div className="relative bg-[#f8f8f6] min-h-[320px]">
              <div className="absolute top-0 left-[40px] z-10 w-[420px]">
                <div className="bg-[#1a2f25] rounded-lg p-4 shadow-2xl">
                  <div className="grid grid-cols-2 gap-3">
                    {sampleChildren.slice(0, 4).map((c) => (
                      <div key={c.name} className="bg-[#243d30] hover:bg-[#2d4d3a] rounded-lg p-4 cursor-pointer transition-colors duration-150">
                        <div className="w-10 h-10 rounded-full bg-[#3a6b4a] flex items-center justify-center mb-3">
                          <MenuIcon name={c.icon} className="w-[20px] h-[20px] text-[#8bc99b]" />
                        </div>
                        <p className="text-[0.85rem] font-bold text-white tracking-[-0.02em] mb-1">{c.name}</p>
                        <p className="text-[0.68rem] text-white/40 leading-[1.5]">{c.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 3. 다크 + 골드 라인 구분 ── */}
          <div className="bg-white shadow-sm overflow-hidden">
            <Label n={3} title="Dark + Gold Dividers" desc="다크 배경 + 골드 구분선 · 세로 리스트" />
            <NavBar active="교회소개" />
            <div className="relative bg-[#f8f8f6] min-h-[320px]">
              <div className="absolute top-0 left-[40px] z-10 w-[340px]">
                <div className="bg-[#294a3a] shadow-2xl overflow-hidden">
                  <div className="h-[2px] bg-[#c69d6c]" />
                  {sampleChildren.map((c, i) => (
                    <div key={c.name} className={`flex items-center gap-3.5 px-5 py-4 cursor-pointer hover:bg-[#1e3a2d] transition-colors duration-150 ${
                      i < sampleChildren.length - 1 ? "border-b border-white/10" : ""
                    }`}>
                      <div className="w-8 h-8 rounded-lg bg-[#c69d6c]/15 flex items-center justify-center shrink-0">
                        <MenuIcon name={c.icon} className="w-4 h-4 text-[#c69d6c]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[0.85rem] font-semibold text-white tracking-[-0.02em]">{c.name}</p>
                        <p className="text-[0.68rem] text-white/40 leading-[1.4] mt-0.5">{c.desc}</p>
                      </div>
                      <svg className="w-3.5 h-3.5 text-[#c69d6c]/40 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── 4. 다크 + 오른쪽 이미지 카드 ── */}
          <div className="bg-white shadow-sm overflow-hidden">
            <Label n={4} title="Dark + Image Card" desc="다크 카드 그리드 + 오른쪽 교회 사진" />
            <NavBar active="교회소개" />
            <div className="relative bg-[#f8f8f6] min-h-[320px]">
              <div className="absolute top-0 left-[40px] z-10 w-[560px]">
                <div className="bg-[#294a3a] shadow-2xl flex overflow-hidden">
                  <div className="flex-1 p-3">
                    <div className="grid grid-cols-2 gap-[1px] bg-[#1e3a2d]">
                      {sampleChildren.slice(0, 4).map((c) => (
                        <div key={c.name} className="bg-[#294a3a] hover:bg-[#1e3a2d] p-4 cursor-pointer transition-colors duration-150">
                          <div className="w-8 h-8 rounded-full bg-[#c69d6c]/20 flex items-center justify-center mb-2">
                            <MenuIcon name={c.icon} className="w-4 h-4 text-[#c69d6c]" />
                          </div>
                          <p className="text-[0.8rem] font-bold text-white tracking-[-0.02em] mb-0.5">{c.name}</p>
                          <p className="text-[0.65rem] text-white/40 leading-[1.4]">{c.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-[200px] bg-[#1e3a2d] flex flex-col justify-end p-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#294a3a] to-[#1e3a2d]" />
                    <div className="relative">
                      <p className="text-[0.65rem] text-[#c69d6c] font-semibold tracking-[0.1em] uppercase mb-1">교회소개</p>
                      <p className="text-[0.82rem] font-bold text-white leading-snug mb-3">강남교회에<br />오신 것을<br />환영합니다</p>
                      <span className="inline-flex items-center gap-1 text-[0.68rem] text-white/60 font-medium">
                        자세히 보기
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 5. 글래스모피즘 다크 ── */}
          <div className="bg-white shadow-sm overflow-hidden">
            <Label n={5} title="Glassmorphism Dark" desc="반투명 글래스 효과 + 다크 배경" />
            <NavBar active="교회소개" />
            <div className="relative bg-[#f8f8f6] min-h-[320px]">
              <div className="absolute top-0 left-[40px] z-10 w-[420px]">
                <div className="bg-[#294a3a]/95 backdrop-blur-xl rounded-xl p-4 shadow-2xl border border-white/10">
                  <div className="grid grid-cols-2 gap-2.5">
                    {sampleChildren.slice(0, 4).map((c) => (
                      <div key={c.name} className="bg-white/5 hover:bg-white/10 rounded-lg p-4 cursor-pointer transition-colors duration-150 border border-white/5">
                        <div className="w-9 h-9 rounded-xl bg-[#c69d6c]/20 flex items-center justify-center mb-2.5">
                          <MenuIcon name={c.icon} className="w-[18px] h-[18px] text-[#c69d6c]" />
                        </div>
                        <p className="text-[0.82rem] font-bold text-white tracking-[-0.02em] mb-1">{c.name}</p>
                        <p className="text-[0.67rem] text-white/40 leading-[1.5]">{c.desc}</p>
                      </div>
                    ))}
                  </div>
                  {/* 5번째 항목 */}
                  <div className="mt-2.5 bg-white/5 hover:bg-white/10 rounded-lg p-3.5 cursor-pointer flex items-center gap-3 border border-white/5 transition-colors duration-150">
                    <div className="w-9 h-9 rounded-xl bg-[#c69d6c]/20 flex items-center justify-center shrink-0">
                      <MenuIcon name={sampleChildren[4].icon} className="w-[18px] h-[18px] text-[#c69d6c]" />
                    </div>
                    <div>
                      <p className="text-[0.82rem] font-bold text-white tracking-[-0.02em]">{sampleChildren[4].name}</p>
                      <p className="text-[0.67rem] text-white/40">{sampleChildren[4].desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 6. 라이트 + 컬러 아이콘 (현재 스타일 발전형) ── */}
          <div className="bg-white shadow-sm overflow-hidden">
            <Label n={6} title="Light Premium" desc="라이트 배경 유지 + 컬러풀 아이콘 뱃지" />
            <NavBar active="교회소개" />
            <div className="relative bg-[#f8f8f6] min-h-[320px]">
              <div className="absolute top-0 left-[40px] z-10 w-[420px]">
                <div className="bg-white border border-[#e8e8e8] shadow-xl overflow-hidden">
                  <div className="h-[2px] bg-[#294a3a]" />
                  <div className="grid grid-cols-2 gap-[1px] bg-[#f0f0f0] p-[1px]">
                    {sampleChildren.slice(0, 4).map((c) => (
                      <div key={c.name} className="bg-white hover:bg-[#fdf8f2] p-4 cursor-pointer transition-colors duration-150">
                        <div className="w-9 h-9 rounded-xl bg-[#f3f1ed] flex items-center justify-center mb-2.5">
                          <MenuIcon name={c.icon} className="w-[18px] h-[18px] text-[#294a3a]" />
                        </div>
                        <p className="text-[0.85rem] font-bold text-[#222] tracking-[-0.02em] mb-1">{c.name}</p>
                        <p className="text-[0.68rem] text-[#999] leading-[1.5]">{c.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-[#f0f0f0] px-[1px] pb-[1px]">
                    <div className="bg-white hover:bg-[#fdf8f2] p-4 cursor-pointer flex items-center gap-3 transition-colors duration-150">
                      <div className="w-9 h-9 rounded-xl bg-[#f3f1ed] flex items-center justify-center shrink-0">
                        <MenuIcon name={sampleChildren[4].icon} className="w-[18px] h-[18px] text-[#294a3a]" />
                      </div>
                      <div>
                        <p className="text-[0.85rem] font-bold text-[#222] tracking-[-0.02em]">{sampleChildren[4].name}</p>
                        <p className="text-[0.68rem] text-[#999]">{sampleChildren[4].desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 7. Compound 원형 아이콘 (사진 대신) ── */}
          <div className="bg-white shadow-sm overflow-hidden">
            <Label n={7} title="Compound Style — Circle Icons" desc="원형 아이콘 뱃지 + 2열 리스트 · 라이트 배경" />
            <NavBar active="교회소개" />
            <div className="relative bg-[#f8f8f6] min-h-[340px]">
              <div className="absolute top-0 left-[40px] z-10 w-[520px]">
                <div className="bg-white border border-[#e8e8e8] shadow-xl p-6">
                  <p className="text-[0.68rem] font-bold text-[#294a3a] tracking-[0.12em] uppercase mb-1">교회소개</p>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-0">
                    {sampleChildren.map((c) => (
                      <div key={c.name} className="flex items-center gap-3.5 py-3.5 cursor-pointer group border-b border-[#f2f2f2] last:border-0">
                        <div className="w-11 h-11 rounded-full bg-[#f3f1ed] flex items-center justify-center shrink-0 group-hover:bg-[#294a3a] transition-colors duration-200">
                          <MenuIcon name={c.icon} className="w-5 h-5 text-[#294a3a] group-hover:text-white transition-colors duration-200" />
                        </div>
                        <div>
                          <p className="text-[0.85rem] font-bold text-[#222] group-hover:text-[#294a3a] tracking-[-0.02em] transition-colors">{c.name}</p>
                          <p className="text-[0.7rem] text-[#aaa] leading-[1.4] mt-0.5">{c.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 8. Compound + 카테고리 그룹 ── */}
          <div className="bg-white shadow-sm overflow-hidden">
            <Label n={8} title="Compound + Category Groups" desc="카테고리 헤더로 그룹핑 + 원형 아이콘" />
            <NavBar active="교회소개" />
            <div className="relative bg-[#f8f8f6] min-h-[340px]">
              <div className="absolute top-0 left-[40px] z-10 w-[560px]">
                <div className="bg-white border border-[#e8e8e8] shadow-xl p-6">
                  <div className="grid grid-cols-2 gap-x-10">
                    {/* 좌측 그룹 */}
                    <div>
                      <p className="text-[0.68rem] font-medium text-[#bbb] tracking-[0.05em] uppercase mb-2">소개</p>
                      {sampleChildren.slice(0, 3).map((c) => (
                        <div key={c.name} className="flex items-center gap-3 py-3 cursor-pointer group border-b border-[#f5f5f5] last:border-0">
                          <div className="w-10 h-10 rounded-full bg-[#294a3a]/8 flex items-center justify-center shrink-0 group-hover:bg-[#294a3a] transition-colors duration-200">
                            <MenuIcon name={c.icon} className="w-[18px] h-[18px] text-[#294a3a] group-hover:text-white transition-colors duration-200" />
                          </div>
                          <div>
                            <p className="text-[0.82rem] font-bold text-[#222] tracking-[-0.02em]">{c.name}</p>
                            <p className="text-[0.68rem] text-[#aaa] leading-[1.4] mt-0.5">{c.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* 우측 그룹 */}
                    <div>
                      <p className="text-[0.68rem] font-medium text-[#bbb] tracking-[0.05em] uppercase mb-2">안내</p>
                      {sampleChildren.slice(3).map((c) => (
                        <div key={c.name} className="flex items-center gap-3 py-3 cursor-pointer group border-b border-[#f5f5f5] last:border-0">
                          <div className="w-10 h-10 rounded-full bg-[#c69d6c]/10 flex items-center justify-center shrink-0 group-hover:bg-[#c69d6c] transition-colors duration-200">
                            <MenuIcon name={c.icon} className="w-[18px] h-[18px] text-[#c69d6c] group-hover:text-white transition-colors duration-200" />
                          </div>
                          <div>
                            <p className="text-[0.82rem] font-bold text-[#222] tracking-[-0.02em]">{c.name}</p>
                            <p className="text-[0.68rem] text-[#aaa] leading-[1.4] mt-0.5">{c.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 9. Compound + 다크 하이브리드 ── */}
          <div className="bg-white shadow-sm overflow-hidden">
            <Label n={9} title="Compound Dark Hybrid" desc="다크 배경 + 원형 골드 아이콘 + 이미지 영역" />
            <NavBar active="교회소개" />
            <div className="relative bg-[#f8f8f6] min-h-[340px]">
              <div className="absolute top-0 left-[40px] z-10 w-[580px]">
                <div className="bg-[#294a3a] shadow-2xl flex overflow-hidden">
                  {/* 왼쪽: 리스트 */}
                  <div className="flex-1 p-5">
                    <p className="text-[0.65rem] font-semibold text-[#c69d6c] tracking-[0.12em] uppercase mb-3">교회소개</p>
                    <div className="flex flex-col gap-0.5">
                      {sampleChildren.map((c) => (
                        <div key={c.name} className="flex items-center gap-3.5 py-3 px-2 -mx-2 cursor-pointer group hover:bg-white/5 rounded-lg transition-colors duration-150">
                          <div className="w-10 h-10 rounded-full bg-[#c69d6c]/15 flex items-center justify-center shrink-0 group-hover:bg-[#c69d6c]/25 transition-colors duration-200">
                            <MenuIcon name={c.icon} className="w-[18px] h-[18px] text-[#c69d6c]" />
                          </div>
                          <div>
                            <p className="text-[0.82rem] font-bold text-white tracking-[-0.02em] group-hover:text-[#c69d6c] transition-colors">{c.name}</p>
                            <p className="text-[0.67rem] text-white/35 leading-[1.4] mt-0.5">{c.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* 오른쪽: 정보 */}
                  <div className="w-[200px] bg-[#1e3a2d] flex flex-col justify-end p-5 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#294a3a] to-[#1e3a2d]" />
                    <div className="relative">
                      <p className="text-[0.65rem] text-[#c69d6c] font-semibold tracking-[0.1em] uppercase mb-1.5">교회소개</p>
                      <p className="text-[0.88rem] font-bold text-white leading-snug tracking-[-0.02em] mb-3">강남교회에<br />오신 것을<br />환영합니다</p>
                      <span className="inline-flex items-center gap-1 text-[0.68rem] text-white/50 font-medium">
                        자세히 보기
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <p className="mt-12 text-center text-[0.78rem] text-[#bbb]">강남교회 드롭다운 메뉴 시안 · 마음에 드는 번호를 알려주세요</p>
      </div>
    </div>
  );
}
