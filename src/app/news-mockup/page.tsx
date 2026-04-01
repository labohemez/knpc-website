"use client";

import { useState } from "react";

const tabs = ["공지사항", "모임안내", "교회소식", "교회주보"];
const items = [
  { title: "총여전도회 바자회 안내", date: "2026.03.27", isNew: true },
  { title: "2026년 부활절 연합예배 안내", date: "2026.03.25", isNew: true },
  { title: "교회 주차장 이용 안내", date: "2026.03.20" },
  { title: "2026년 4월 사랑방 교안 배부", date: "2026.03.18" },
];

function Dot({ isNew }: { isNew?: boolean }) {
  return isNew ? <span className="inline-block ml-2 w-[6px] h-[6px] rounded-full bg-[#D32F2F] align-middle" /> : null;
}

export default function NewsMockup() {
  const [selected, setSelected] = useState(0);

  const designs = [
    // 1. 카드 그리드
    {
      name: "1. 카드 그리드",
      render: (
        <div className="bg-white p-8">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-[1.5rem] font-bold text-[#222]">교회 소식</h2>
            <span className="text-[0.8rem] text-accent">전체보기 →</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {items.map((n, i) => (
              <div key={i} className="border border-[#eee] p-5 hover:border-[#294a3a] transition-colors">
                <span className="text-[0.68rem] font-semibold text-accent">공지사항</span>
                <h3 className="mt-2 text-[0.9rem] font-bold text-[#222]">{n.title}<Dot isNew={n.isNew} /></h3>
                <p className="mt-2 text-[0.72rem] text-[#b2b2b2]">{n.date}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    // 2. 타임라인
    {
      name: "2. 타임라인",
      render: (
        <div className="bg-[#f8f8f8] p-8">
          <h2 className="text-[1.5rem] font-bold text-[#222] mb-8">교회 소식</h2>
          <div className="border-l-2 border-[#294a3a] pl-6 space-y-6">
            {items.map((n, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-white border-2 border-[#294a3a]" />
                <p className="text-[0.72rem] text-accent font-semibold">{n.date}</p>
                <h3 className="mt-1 text-[0.9rem] font-bold text-[#222]">{n.title}<Dot isNew={n.isNew} /></h3>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    // 3. 매거진 스타일
    {
      name: "3. 매거진 (넘버링)",
      render: (
        <div className="bg-white p-8">
          <h2 className="text-[1.5rem] font-bold text-[#222] mb-6">교회 소식</h2>
          {items.map((n, i) => (
            <div key={i} className="flex items-start gap-5 py-5 border-b border-[#eee]">
              <span className="text-[2rem] font-bold text-[#294a3a]/20 leading-none w-10 shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-[0.9rem] font-bold text-[#222]">{n.title}<Dot isNew={n.isNew} /></h3>
                <p className="mt-1 text-[0.72rem] text-[#b2b2b2]">{n.date}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    // 4. 아코디언 탭 (세로)
    {
      name: "4. 세로 탭 + 리스트",
      render: (
        <div className="bg-white p-8">
          <h2 className="text-[1.5rem] font-bold text-[#222] mb-6">교회 소식</h2>
          <div className="flex gap-0">
            <div className="w-[140px] shrink-0 border-r border-[#eee]">
              {tabs.map((t, i) => (
                <div key={t} className={`py-3 px-4 text-[0.82rem] font-semibold cursor-pointer ${i === 0 ? "bg-[#294a3a] text-white" : "text-[#999] hover:bg-[#f8f8f8]"}`}>{t}</div>
              ))}
            </div>
            <div className="flex-1">
              {items.map((n, i) => (
                <div key={i} className="flex items-center justify-between py-4 px-5 border-b border-[#eee]">
                  <span className="text-[0.9rem] font-medium text-[#222]">{n.title}<Dot isNew={n.isNew} /></span>
                  <span className="text-[0.72rem] text-[#b2b2b2]">{n.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    // 5. 풀와이드 스트라이프
    {
      name: "5. 스트라이프 (줄무늬)",
      render: (
        <div className="bg-white">
          <div className="p-8 pb-4">
            <h2 className="text-[1.5rem] font-bold text-[#222]">교회 소식</h2>
          </div>
          {items.map((n, i) => (
            <div key={i} className={`flex items-center justify-between py-5 px-8 ${i % 2 === 0 ? "bg-[#f8f8f8]" : "bg-white"}`}>
              <div className="flex items-center gap-4">
                <span className="text-[0.68rem] font-semibold text-accent w-[60px]">공지사항</span>
                <span className="text-[0.9rem] font-medium text-[#222]">{n.title}<Dot isNew={n.isNew} /></span>
              </div>
              <span className="text-[0.72rem] text-[#b2b2b2]">{n.date}</span>
            </div>
          ))}
        </div>
      ),
    },
    // 6. 딥그린 배경 전체
    {
      name: "6. 딥그린 전체 배경",
      render: (
        <div className="bg-[#294a3a] p-8">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-[1.5rem] font-bold text-white">교회 소식</h2>
            <span className="text-[0.8rem] text-[#c69d6c]">전체보기 →</span>
          </div>
          <div className="flex gap-2 mb-6">
            {tabs.map((t, i) => (
              <span key={t} className={`px-4 py-2 text-[0.78rem] font-semibold ${i === 0 ? "bg-white text-[#294a3a]" : "bg-white/10 text-white/60"}`}>{t}</span>
            ))}
          </div>
          {items.map((n, i) => (
            <div key={i} className="flex items-center justify-between py-4 border-b border-white/10">
              <span className="text-[0.9rem] font-medium text-white">{n.title}<Dot isNew={n.isNew} /></span>
              <span className="text-[0.72rem] text-white/40">{n.date}</span>
            </div>
          ))}
        </div>
      ),
    },
    // 7. 큰 타이포
    {
      name: "7. 큰 타이포그래피",
      render: (
        <div className="bg-white p-8">
          <h2 className="text-[1.5rem] font-bold text-[#222] mb-6">교회 소식</h2>
          <div className="space-y-4">
            {items.map((n, i) => (
              <div key={i} className="py-4 border-b border-[#eee]">
                <p className="text-[0.68rem] text-accent font-semibold mb-1">공지사항 · {n.date}</p>
                <h3 className="text-[1.2rem] font-bold text-[#222] tracking-[-0.04em]">{n.title}<Dot isNew={n.isNew} /></h3>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    // 8. 2컬럼 카테고리
    {
      name: "8. 2컬럼 카테고리",
      render: (
        <div className="bg-[#f8f8f8] p-8">
          <h2 className="text-[1.5rem] font-bold text-[#222] mb-6">교회 소식</h2>
          <div className="grid grid-cols-2 gap-6">
            {["공지사항", "교회주보"].map((cat) => (
              <div key={cat}>
                <h3 className="text-[0.82rem] font-bold text-[#294a3a] pb-3 border-b-2 border-[#294a3a] mb-3">{cat}</h3>
                {items.slice(0, 3).map((n, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5">
                    <span className="text-[0.85rem] text-[#222] truncate">{n.title}<Dot isNew={n.isNew} /></span>
                    <span className="text-[0.68rem] text-[#b2b2b2] shrink-0 ml-3">{n.date}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    // 9. 탭 + 카드 (그림자)
    {
      name: "9. 플로팅 카드",
      render: (
        <div className="bg-[#f8f8f8] p-8">
          <h2 className="text-[1.5rem] font-bold text-[#222] mb-6">교회 소식</h2>
          <div className="flex gap-2 mb-6">
            {tabs.map((t, i) => (
              <span key={t} className={`px-4 py-2 text-[0.78rem] font-semibold rounded-full ${i === 0 ? "bg-[#294a3a] text-white" : "bg-white text-[#666]"}`}>{t}</span>
            ))}
          </div>
          <div className="bg-white shadow-lg p-6 space-y-0">
            {items.map((n, i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-[#eee] last:border-0">
                <span className="text-[0.9rem] font-medium text-[#222]">{n.title}<Dot isNew={n.isNew} /></span>
                <span className="text-[0.72rem] text-[#b2b2b2]">{n.date}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    // 10. 미니멀 라인
    {
      name: "10. 미니멀 라인",
      render: (
        <div className="bg-white p-8">
          <div className="flex items-center gap-6 mb-8">
            <h2 className="text-[1.5rem] font-bold text-[#222]">교회 소식</h2>
            <div className="flex-1 h-[1px] bg-[#ddd]" />
            <span className="text-[0.8rem] text-accent">전체보기 →</span>
          </div>
          <div className="flex gap-2 mb-6">
            {tabs.map((t, i) => (
              <span key={t} className={`px-4 py-2 text-[0.78rem] font-semibold border-b-2 ${i === 0 ? "border-[#294a3a] text-[#294a3a]" : "border-transparent text-[#999]"}`}>{t}</span>
            ))}
          </div>
          {items.map((n, i) => (
            <div key={i} className="flex items-center justify-between py-4 border-b border-[#eee]">
              <span className="text-[0.9rem] font-medium text-[#222]">{n.title}<Dot isNew={n.isNew} /></span>
              <span className="text-[0.72rem] text-[#b2b2b2]">{n.date}</span>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#e8e8e8]">
      {/* 선택 탭 */}
      <div className="sticky top-0 z-50 bg-white border-b border-[#ddd] shadow-sm">
        <div className="max-w-[1200px] mx-auto px-5 py-4">
          <p className="text-[0.72rem] text-[#999] mb-3">뉴스 섹션 디자인을 선택하세요</p>
          <div className="flex gap-2 flex-wrap">
            {designs.map((d, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`px-4 py-2 text-[0.78rem] font-semibold transition-all ${
                  selected === i ? "bg-[#294a3a] text-white" : "bg-[#f8f8f8] text-[#666] hover:bg-[#eee]"
                }`}
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 미리보기 */}
      <div className="max-w-[1200px] mx-auto px-5 py-8">
        <div className="border border-[#ddd] overflow-hidden">
          {designs[selected].render}
        </div>
      </div>
    </div>
  );
}
