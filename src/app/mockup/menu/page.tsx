"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const menus = [
  { name: "교회소개", href: "/about" },
  { name: "새가족안내", href: "/newcomer" },
  { name: "말씀과찬양", href: "/sermons" },
  { name: "공동체", href: "/community" },
  { name: "양육", href: "/nurture" },
  { name: "훈련", href: "/training" },
  { name: "커뮤니티", href: "#" },
];

const subMenus: Record<string, { label: string; items: { name: string; href: string }[] }[]> = {
  "말씀과찬양": [
    { label: "설교", items: [
      { name: "주일예배", href: "/sermons?cat=주일예배" },
      { name: "수요예배", href: "/sermons?cat=수요예배" },
      { name: "새벽기도회", href: "/sermons?cat=새벽기도회" },
      { name: "금요기도회", href: "/sermons?cat=금요기도회" },
      { name: "특별예배", href: "/sermons?cat=특별예배" },
    ]},
    { label: "청년", items: [
      { name: "청년1부", href: "/sermons?cat=청년1부" },
      { name: "청년2,3부", href: "/sermons?cat=청년2,3부" },
    ]},
    { label: "찬양", items: [
      { name: "할렐루야", href: "/sermons?cat=찬양-할렐루야" },
      { name: "호산나", href: "/sermons?cat=찬양-호산나" },
      { name: "시온", href: "/sermons?cat=찬양-시온" },
      { name: "주일찬양", href: "/sermons?cat=찬양-주일예배" },
      { name: "금요찬양", href: "/sermons?cat=찬양-금요기도회" },
      { name: "기타", href: "/sermons?cat=찬양-기타" },
    ]},
  ],
  "교회소개": [
    { label: "", items: [
      { name: "환영인사", href: "/about#greeting" },
      { name: "교회비전", href: "/about#vision" },
      { name: "교회연혁", href: "/about#history" },
      { name: "예배시간", href: "/about#worship" },
      { name: "오시는 길", href: "/about#location" },
    ]},
  ],
};

export default function MenuMockup() {
  const [active, setActive] = useState<string | null>(null);
  const [design, setDesign] = useState<"A" | "B">("A");

  return (
    <div className="min-h-screen bg-[#f0f0f0] py-8 px-4">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-[1.2rem] font-bold text-[#333] mb-4">메뉴 목업 — 풀 와이드 메가메뉴</h1>
        <div className="flex gap-2 mb-6">
          <button onClick={() => setDesign("A")} className={`px-4 py-2 text-[0.8rem] font-medium rounded-lg ${design === "A" ? "bg-[#333] text-white" : "bg-white text-[#666] border border-[#ddd]"}`}>A — 클린 화이트</button>
          <button onClick={() => setDesign("B")} className={`px-4 py-2 text-[0.8rem] font-medium rounded-lg ${design === "B" ? "bg-[#333] text-white" : "bg-white text-[#666] border border-[#ddd]"}`}>B — 딥그린 강조</button>
        </div>

        {/* ═══ 디자인 A: 클린 화이트 ═══ */}
        {design === "A" && (
          <div className="rounded-xl overflow-hidden shadow-xl border border-[#ddd] bg-white">
            <div className="mb-1 text-[0.7rem] font-bold text-blue-600 bg-blue-50 inline-block px-3 py-1 rounded-full m-3">개선안 A — 클린 화이트 풀와이드</div>
            {/* 헤더 */}
            <div className="bg-white border-b border-[#e8e8e8]" onMouseLeave={() => setActive(null)}>
              <div className="max-w-[1400px] mx-auto px-6 flex items-center h-[70px]">
                <Image src="/images/logo.png" alt="강남교회" width={1961} height={405} className="h-[30px] w-auto object-contain" unoptimized />
                <nav className="flex items-center gap-1 ml-auto">
                  {menus.map(m => (
                    <button key={m.name} onMouseEnter={() => setActive(m.name)}
                      className={`px-4 py-2 text-[0.88rem] font-semibold tracking-[-0.02em] transition-colors cursor-pointer ${active === m.name ? "text-[#294a3a]" : "text-[#333] hover:text-[#294a3a]"}`}>
                      {m.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* 서브메뉴 — 풀 와이드 */}
              {active && subMenus[active] && (
                <div className="border-t border-[#f0f0f0] bg-white" onMouseEnter={() => {}} onMouseLeave={() => setActive(null)}>
                  <div className="max-w-[1400px] mx-auto px-6 py-6">
                    <div className="grid w-full" style={{ gridTemplateColumns: `repeat(${subMenus[active].length}, 1fr)` }}>
                      {subMenus[active].map(group => (
                        <div key={group.label} className="px-4 first:pl-0 last:pr-0">
                          {group.label && <p className="text-[0.65rem] font-bold text-[#294a3a] tracking-[0.1em] uppercase mb-3">{group.label}</p>}
                          <div className="flex flex-col gap-1">
                            {group.items.map(item => (
                              <Link key={item.name} href={item.href} className="text-[0.85rem] text-[#555] hover:text-[#294a3a] font-medium py-1 transition-colors cursor-pointer">
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 더미 콘텐츠 */}
            <div className="h-[200px] bg-[#faf8f5] flex items-center justify-center text-[#ccc]">페이지 콘텐츠</div>
          </div>
        )}

        {/* ═══ 디자인 B: 딥그린 강조 ═══ */}
        {design === "B" && (
          <div className="rounded-xl overflow-hidden shadow-xl border border-[#ddd] bg-white">
            <div className="mb-1 text-[0.7rem] font-bold text-emerald-700 bg-emerald-50 inline-block px-3 py-1 rounded-full m-3">개선안 B — 딥그린 강조 풀와이드</div>
            {/* 헤더 */}
            <div className="bg-white border-b border-[#e8e8e8]" onMouseLeave={() => setActive(null)}>
              <div className="max-w-[1400px] mx-auto px-6 flex items-center h-[70px]">
                <Image src="/images/logo.png" alt="강남교회" width={1961} height={405} className="h-[30px] w-auto object-contain" unoptimized />
                <nav className="flex items-center gap-1 ml-auto">
                  {menus.map(m => (
                    <button key={m.name} onMouseEnter={() => setActive(m.name)}
                      className={`px-4 py-2 text-[0.88rem] font-semibold tracking-[-0.02em] transition-colors cursor-pointer ${active === m.name ? "text-[#294a3a]" : "text-[#333] hover:text-[#294a3a]"}`}>
                      {m.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* 서브메뉴 — 딥그린 배경 풀 와이드 */}
              {active && subMenus[active] && (
                <div className="bg-[#294a3a]" onMouseEnter={() => {}} onMouseLeave={() => setActive(null)}>
                  <div className="max-w-[1400px] mx-auto px-6 py-6">
                    <div className="grid w-full" style={{ gridTemplateColumns: `repeat(${subMenus[active].length}, 1fr)` }}>
                      {subMenus[active].map(group => (
                        <div key={group.label} className="px-4 first:pl-0 last:pr-0">
                          {group.label && <p className="text-[0.65rem] font-bold text-[#c69d6c] tracking-[0.1em] uppercase mb-3">{group.label}</p>}
                          <div className="flex flex-col gap-1">
                            {group.items.map(item => (
                              <Link key={item.name} href={item.href} className="text-[0.85rem] text-white/70 hover:text-white font-medium py-1 transition-colors cursor-pointer">
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 더미 콘텐츠 */}
            <div className="h-[200px] bg-[#faf8f5] flex items-center justify-center text-[#ccc]">페이지 콘텐츠</div>
          </div>
        )}
      </div>
    </div>
  );
}
