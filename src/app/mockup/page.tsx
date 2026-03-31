"use client";

import { useState } from "react";

const themes = [
  {
    id: "deep-navy",
    name: "A. 딥 네이비",
    desc: "만나교회 스타일 — 차분하고 신뢰감",
    main: "#0f4c82",
    mainDark: "#173652",
    accent: "#0f4c82",
    heroBg: "linear-gradient(135deg, #0a2540 0%, #0f4c82 100%)",
    footerBg: "#132332",
  },
  {
    id: "deep-green-gold",
    name: "B. 딥그린 + 골드",
    desc: "현재 knpc.or.kr 스타일 — 따뜻하고 격조",
    main: "#294a3a",
    mainDark: "#1e3a2d",
    accent: "#c69d6c",
    heroBg: "linear-gradient(135deg, #1a3028 0%, #294a3a 100%)",
    footerBg: "#1a2820",
  },
  {
    id: "charcoal-gold",
    name: "C. 차콜 + 골드",
    desc: "모던하고 세련된 — 고급감과 무게감",
    main: "#2c2c2c",
    mainDark: "#1a1a1a",
    accent: "#c69d6c",
    heroBg: "linear-gradient(135deg, #1a1a1a 0%, #333 100%)",
    footerBg: "#1a1a1a",
  },
];

export default function MockupPage() {
  const [selected, setSelected] = useState(0);
  const t = themes[selected];

  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      {/* 테마 선택 탭 */}
      <div className="sticky top-0 z-50 bg-white border-b border-[#ddd] shadow-sm">
        <div className="max-w-[1200px] mx-auto px-5 py-4">
          <p className="text-[0.75rem] text-[#999] mb-3 tracking-[-0.02em]">
            컬러 테마를 선택해서 비교해보세요
          </p>
          <div className="flex gap-3 flex-wrap">
            {themes.map((theme, i) => (
              <button
                key={theme.id}
                onClick={() => setSelected(i)}
                className={`flex items-center gap-3 px-5 py-3 border transition-all duration-200 text-left ${
                  selected === i
                    ? "border-[#222] bg-[#fafafa]"
                    : "border-[#ddd] hover:border-[#999]"
                }`}
              >
                <div className="flex gap-1.5">
                  <div
                    className="w-5 h-5 rounded-full"
                    style={{ background: theme.main }}
                  />
                  {theme.accent !== theme.main && (
                    <div
                      className="w-5 h-5 rounded-full"
                      style={{ background: theme.accent }}
                    />
                  )}
                </div>
                <div>
                  <p className="text-[0.82rem] font-semibold text-[#222] tracking-[-0.02em]">
                    {theme.name}
                  </p>
                  <p className="text-[0.7rem] text-[#999] tracking-[-0.02em]">
                    {theme.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 목업 미리보기 */}
      <div className="max-w-[1200px] mx-auto px-5 py-8">
        <div className="bg-white border border-[#ddd] overflow-hidden">
          {/* 헤더 */}
          <div
            className="flex items-center justify-between px-8 py-5 border-b"
            style={{ borderColor: "#ddd" }}
          >
            <span
              className="text-[1.1rem] font-bold tracking-[-0.03em]"
              style={{ color: t.main }}
            >
              강남교회
            </span>
            <div className="flex gap-6 text-[0.8rem] text-[#222] font-medium tracking-[-0.02em]">
              <span>교회소개</span>
              <span>새가족안내</span>
              <span>말씀과찬양</span>
              <span className="hidden sm:inline">공동체</span>
              <span className="hidden md:inline">양육</span>
              <span className="hidden md:inline">훈련</span>
              <span className="hidden lg:inline">커뮤니티</span>
            </div>
          </div>

          {/* 히어로 */}
          <div
            className="relative py-28 text-center"
            style={{ background: t.heroBg }}
          >
            <p className="text-[0.7rem] font-medium tracking-[0.25em] uppercase mb-4 text-white/50">
              대한예수교장로회
            </p>
            <h1 className="text-[2.5rem] font-bold text-white tracking-[-0.04em] leading-[1.2]">
              강남교회
            </h1>
            <p className="mt-4 text-[0.95rem] text-white/60 tracking-[-0.02em]">
              그리스도 예수 안에서 행복한 가정, 풍성한 교회, 건강한 사회
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <span className="px-6 py-2.5 text-[0.8rem] font-medium bg-white tracking-[-0.02em]" style={{ color: t.main }}>
                예배 안내
              </span>
              <span className="px-6 py-2.5 text-[0.8rem] font-medium text-white border border-white/30 tracking-[-0.02em]">
                교회 소개
              </span>
            </div>
          </div>

          {/* 예배 안내 바 */}
          <div className="py-4 text-center text-white text-[0.82rem] font-medium tracking-[-0.02em]" style={{ background: t.main }}>
            주일예배 1부 8:00 / 2부 10:00 / 3부 12:00
          </div>

          {/* 표어 */}
          <div className="py-16 text-center bg-white">
            <p className="text-[0.7rem] font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: t.accent }}>
              2026
            </p>
            <h2 className="text-[1.5rem] font-bold text-[#222] tracking-[-0.04em]">
              온전한 믿음 성숙한 교회
            </h2>
            <p className="mt-3 text-[0.85rem] text-[#666] tracking-[-0.02em]">
              그리스도 안에서 행복한 가정, 풍성한 교회, 건강한 사회
            </p>
            <p className="mt-4 text-[0.8rem] text-[#999] italic tracking-[-0.02em]">
              &ldquo;믿음이 그의 행함과 함께 일하고 행함으로 믿음이 온전하게 되었느니라&rdquo;
            </p>
            <p className="mt-1 text-[0.72rem] font-medium tracking-[-0.02em]" style={{ color: t.accent }}>
              야고보서 2:22
            </p>
          </div>

          {/* 예배 시간 */}
          <div className="py-16 bg-[#f8f8f8]">
            <div className="text-center mb-10">
              <p className="text-[0.7rem] font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: t.accent }}>
                Worship
              </p>
              <h2 className="text-[1.5rem] font-bold text-[#222] tracking-[-0.04em]">
                예배 시간
              </h2>
            </div>
            <div className="grid grid-cols-4 gap-[1px] bg-[#ddd] mx-8">
              {["주일예배", "수요예배", "금요기도회", "새벽기도회"].map((name) => (
                <div key={name} className="bg-white p-6 text-center">
                  <p className="text-[0.85rem] font-bold text-[#222] tracking-[-0.03em]">{name}</p>
                  <p className="mt-2 text-[0.78rem] text-[#666] tracking-[-0.02em]">시간</p>
                </div>
              ))}
            </div>
          </div>

          {/* 최근 설교 */}
          <div className="py-16 bg-white px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[0.7rem] font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: t.accent }}>
                  Sermons
                </p>
                <h2 className="text-[1.5rem] font-bold text-[#222] tracking-[-0.04em]">
                  최근 설교
                </h2>
              </div>
              <span className="text-[0.78rem] font-medium px-4 py-1.5 border border-[#222] text-[#222] tracking-[-0.02em]">
                전체보기
              </span>
            </div>
            <div className="relative aspect-[21/9] bg-[#e8e8e8] mb-0 flex items-center justify-center"
              style={{ background: t.heroBg }}
            >
              <div className="w-14 h-14 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] border-l-white ml-1" />
              </div>
            </div>
            <div className="border border-t-0 border-[#ddd] p-6">
              <span className="text-[0.72rem] font-semibold tracking-[-0.02em]" style={{ color: t.accent }}>
                주일설교
              </span>
              <h3 className="mt-1.5 text-[1.15rem] font-bold text-[#222] tracking-[-0.04em]">
                소유할 것인가? 소유될 것인가?
              </h3>
              <p className="mt-1.5 text-[0.78rem] text-[#999] tracking-[-0.02em]">
                베드로전서 2:9~10 · 서강일 목사
              </p>
            </div>
          </div>

          {/* 소식 */}
          <div className="py-16 bg-white px-8">
            <div className="mb-8">
              <p className="text-[0.7rem] font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: t.accent }}>
                News
              </p>
              <h2 className="text-[1.5rem] font-bold text-[#222] tracking-[-0.04em]">
                교회 소식
              </h2>
            </div>
            <div className="border-t-2" style={{ borderColor: t.main }}>
              {["총여전도회 바자회 안내", "2026년 3월 29일 모임안내", "2026년 3월 29일 교회소식"].map((title) => (
                <div key={title} className="flex items-center gap-4 py-4 border-b border-[#ddd] px-2">
                  <span className="text-[0.72rem] font-semibold w-[60px] shrink-0 tracking-[-0.02em]" style={{ color: t.accent }}>
                    공지사항
                  </span>
                  <span className="text-[0.85rem] text-[#222] font-medium flex-1 tracking-[-0.02em]">{title}</span>
                  <span className="text-[0.72rem] text-[#b2b2b2]">2026.03.27</span>
                </div>
              ))}
            </div>
          </div>

          {/* 비전 */}
          <div className="py-16 text-center text-white" style={{ background: t.heroBg }}>
            <p className="text-[0.7rem] font-semibold tracking-[0.2em] uppercase mb-2 text-white/50">
              Our Vision
            </p>
            <h2 className="text-[1.5rem] font-bold tracking-[-0.04em]">
              이 놀라운 강남교회로 여러분을 초대합니다
            </h2>
            <div className="mt-6 flex flex-wrap justify-center gap-2 px-8">
              {["가르치는 교회", "선포하는 교회", "치유하는 교회", "목회자를 양성하는 교회", "장애인과 함께하는 교회"].map((v) => (
                <span key={v} className="px-4 py-2 border border-white/20 text-white/80 text-[0.78rem] font-medium tracking-[-0.02em]">
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* 푸터 */}
          <div className="px-8 py-8" style={{ background: t.footerBg }}>
            <p className="text-[0.9rem] font-bold text-white mb-2 tracking-[-0.02em]">강남교회</p>
            <p className="text-[0.72rem] text-white/40 leading-[1.8] tracking-[-0.02em]">
              서울시 동작구 만양로 76 (노량진동) · Tel. 02-814-7606
            </p>
            <p className="mt-4 text-[0.65rem] text-white/20 tracking-[-0.02em]">
              &copy; 2026 강남교회 All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
