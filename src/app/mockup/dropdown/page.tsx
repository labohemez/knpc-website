import { Icon } from "@iconify/react";

const navItems = ["교회소개", "새가족안내", "말씀과찬양", "공동체", "양육", "훈련", "커뮤니티"];
const children = [
  { name: "새가족 환영",    icon: "solar:hand-heart-bold-duotone",     color: "text-rose-500",    bg: "bg-rose-100" },
  { name: "등록 절차",      icon: "solar:checklist-bold-duotone",      color: "text-emerald-600", bg: "bg-emerald-100" },
  { name: "자주 묻는 질문", icon: "solar:question-circle-bold-duotone",color: "text-indigo-600",  bg: "bg-indigo-100" },
  { name: "예배 시간",      icon: "solar:clock-circle-bold-duotone",   color: "text-sky-600",     bg: "bg-sky-100" },
];

function NavBar({ active }: { active: string }) {
  return (
    <div className="border-b border-[#e0e0e0] bg-white">
      <div className="flex items-center h-12 px-6 gap-1">
        {navItems.map((n) => (
          <div key={n} className="relative flex items-center">
            <span className={`px-4 py-1.5 text-[0.8rem] font-semibold tracking-tight cursor-pointer ${n === active ? "text-[#294a3a]" : "text-[#444]"}`}>
              {n}
            </span>
            {n === active && <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#294a3a]" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function Label({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <div className="mb-3">
      <span className="inline-block text-[0.65rem] font-bold text-white bg-[#294a3a] px-2 py-0.5 mb-1">#{n}</span>
      <p className="text-[0.85rem] font-bold text-[#222] tracking-tight">{title}</p>
      <p className="text-[0.72rem] text-[#999] mt-0.5">{desc}</p>
    </div>
  );
}

export default function DropdownMockupPage() {
  return (
    <div className="min-h-screen bg-[#f0f0ee] p-8">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-[1.5rem] font-bold text-[#222] mb-2 tracking-tight">드롭다운 메뉴 디자인 시안 10종</h1>
        <p className="text-[0.85rem] text-[#888] mb-10">"새가족안내" 호버 기준 · 딥그린(#294a3a) · 골드(#c69d6c)</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* ── 1. Plain + 굵은 폰트 강조 ── */}
          <div className="bg-white shadow-sm overflow-hidden">
            <Label n={1} title="Bold Text Only" desc="아이콘 없이 굵고 큰 텍스트로만 존재감" />
            <NavBar active="새가족안내" />
            <div className="border-b border-[#e0e0e0] shadow-md">
              <div className="flex flex-col py-3 pl-[168px]">
                {children.map((c) => (
                  <div key={c.name} className="px-5 py-3.5 text-[1.05rem] font-bold text-[#111] hover:text-[#294a3a] cursor-pointer whitespace-nowrap w-fit">
                    {c.name}
                  </div>
                ))}
              </div>
            </div>
            <div className="h-16 bg-[#f8f8f6]" />
          </div>

          {/* ── 2. Left accent bar ── */}
          <div className="bg-white shadow-sm overflow-hidden">
            <Label n={2} title="Left Accent Bar" desc="왼쪽 딥그린 바 + 들여쓰기" />
            <NavBar active="새가족안내" />
            <div className="border-b border-[#e0e0e0] shadow-md">
              <div className="flex flex-col py-3 pl-[168px]">
                {children.map((c) => (
                  <div key={c.name} className="flex items-center gap-0 px-5 py-3 cursor-pointer group w-fit">
                    <span className="w-[3px] h-5 bg-[#294a3a] mr-4 shrink-0" />
                    <span className="text-[0.95rem] font-semibold text-[#111] group-hover:text-[#294a3a] whitespace-nowrap">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-16 bg-[#f8f8f6]" />
          </div>

          {/* ── 3. Dot bullet ── */}
          <div className="bg-white shadow-sm overflow-hidden">
            <Label n={3} title="Dot Bullet" desc="골드 원형 도트 포인트" />
            <NavBar active="새가족안내" />
            <div className="border-b border-[#e0e0e0] shadow-md">
              <div className="flex flex-col py-3 pl-[168px]">
                {children.map((c) => (
                  <div key={c.name} className="flex items-center gap-3 px-5 py-3 cursor-pointer group w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c69d6c] shrink-0" />
                    <span className="text-[0.95rem] font-semibold text-[#111] group-hover:text-[#294a3a] whitespace-nowrap">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-16 bg-[#f8f8f6]" />
          </div>

          {/* ── 4. Icon inline (no bg) ── */}
          <div className="bg-white shadow-sm overflow-hidden">
            <Label n={4} title="Icon Inline" desc="아이콘 배경 없이 컬러 아이콘만" />
            <NavBar active="새가족안내" />
            <div className="border-b border-[#e0e0e0] shadow-md">
              <div className="flex flex-col py-3 pl-[168px]">
                {children.map((c) => (
                  <div key={c.name} className="flex items-center gap-3 px-5 py-3 cursor-pointer group w-fit">
                    <Icon icon={c.icon} width={18} height={18} className={c.color} />
                    <span className="text-[0.95rem] font-semibold text-[#111] group-hover:text-[#294a3a] whitespace-nowrap">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-16 bg-[#f8f8f6]" />
          </div>

          {/* ── 5. Icon badge (rounded square) ── */}
          <div className="bg-white shadow-sm overflow-hidden">
            <Label n={5} title="Icon Badge" desc="컬러 배경 뱃지 + 아이콘" />
            <NavBar active="새가족안내" />
            <div className="border-b border-[#e0e0e0] shadow-md">
              <div className="flex flex-col py-2 pl-[168px]">
                {children.map((c) => (
                  <div key={c.name} className="flex items-center gap-3 px-5 py-2.5 cursor-pointer group w-fit">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${c.bg} ${c.color}`}>
                      <Icon icon={c.icon} width={15} height={15} />
                    </span>
                    <span className="text-[0.95rem] font-semibold text-[#111] group-hover:text-[#294a3a] whitespace-nowrap">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-16 bg-[#f8f8f6]" />
          </div>

          {/* ── 6. Numbered ── */}
          <div className="bg-white shadow-sm overflow-hidden">
            <Label n={6} title="Numbered" desc="01 02 순번 + 텍스트" />
            <NavBar active="새가족안내" />
            <div className="border-b border-[#e0e0e0] shadow-md">
              <div className="flex flex-col py-3 pl-[168px]">
                {children.map((c, i) => (
                  <div key={c.name} className="flex items-center gap-4 px-5 py-3 cursor-pointer group w-fit">
                    <span className="text-[0.68rem] font-bold text-[#c69d6c] w-5 shrink-0 tabular-nums">0{i + 1}</span>
                    <span className="text-[0.95rem] font-semibold text-[#111] group-hover:text-[#294a3a] whitespace-nowrap">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-16 bg-[#f8f8f6]" />
          </div>

          {/* ── 7. Pill/Tag style ── */}
          <div className="bg-white shadow-sm overflow-hidden">
            <Label n={7} title="Pill Tags" desc="배경 pill 형태 버튼 나열" />
            <NavBar active="새가족안내" />
            <div className="border-b border-[#e0e0e0] shadow-md">
              <div className="flex flex-col py-4 pl-[168px]">
                <div className="flex flex-col gap-2 px-5">
                  {children.map((c) => (
                    <div key={c.name} className="inline-flex w-fit items-center gap-2 px-4 py-2 bg-[#f5f5f7] hover:bg-[#294a3a] hover:text-white cursor-pointer group transition-colors duration-150">
                      <Icon icon={c.icon} width={14} height={14} className={`${c.color} group-hover:text-white`} />
                      <span className="text-[0.85rem] font-semibold text-[#222] group-hover:text-white whitespace-nowrap">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="h-16 bg-[#f8f8f6]" />
          </div>

          {/* ── 8. Two-column grid ── */}
          <div className="bg-white shadow-sm overflow-hidden">
            <Label n={8} title="2-Column Grid" desc="2열 그리드로 공간 효율화" />
            <NavBar active="새가족안내" />
            <div className="border-b border-[#e0e0e0] shadow-md">
              <div className="py-4 pl-[168px] pr-8">
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {children.map((c) => (
                    <div key={c.name} className="flex items-center gap-2.5 px-4 py-2.5 cursor-pointer group hover:bg-[#f5f5f7]">
                      <span className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${c.bg} ${c.color}`}>
                        <Icon icon={c.icon} width={13} height={13} />
                      </span>
                      <span className="text-[0.88rem] font-semibold text-[#111] group-hover:text-[#294a3a] whitespace-nowrap">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="h-16 bg-[#f8f8f6]" />
          </div>

          {/* ── 9. Title + Description ── */}
          <div className="bg-white shadow-sm overflow-hidden">
            <Label n={9} title="Title + Description" desc="제목 + 한 줄 설명" />
            <NavBar active="새가족안내" />
            <div className="border-b border-[#e0e0e0] shadow-md">
              <div className="flex flex-col py-3 pl-[168px]">
                {[
                  { ...children[0], desc: "처음 오신 분들을 환영합니다" },
                  { ...children[1], desc: "단계별 등록 안내" },
                  { ...children[2], desc: "궁금한 점을 해결해 드립니다" },
                  { ...children[3], desc: "주일·수요·새벽 예배 시간" },
                ].map((c) => (
                  <div key={c.name} className="flex items-center gap-3 px-5 py-3 cursor-pointer group w-fit hover:bg-[#f5f5f7]">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${c.bg} ${c.color}`}>
                      <Icon icon={c.icon} width={17} height={17} />
                    </span>
                    <div>
                      <p className="text-[0.88rem] font-bold text-[#111] group-hover:text-[#294a3a] whitespace-nowrap leading-tight">{c.name}</p>
                      <p className="text-[0.72rem] text-[#aaa] whitespace-nowrap leading-tight mt-0.5">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-16 bg-[#f8f8f6]" />
          </div>

          {/* ── 10. Arrow + Gold hover ── */}
          <div className="bg-white shadow-sm overflow-hidden">
            <Label n={10} title="Arrow + Gold Accent" desc="호버 시 골드 컬러 + 화살표" />
            <NavBar active="새가족안내" />
            <div className="border-b border-[#e0e0e0] shadow-md">
              <div className="flex flex-col py-3 pl-[168px]">
                {children.map((c) => (
                  <div key={c.name} className="flex items-center justify-between gap-8 px-5 py-3 cursor-pointer group w-[280px] hover:bg-[#fdf8f2] border-b border-[#f5f5f5] last:border-0">
                    <span className="text-[0.95rem] font-semibold text-[#111] group-hover:text-[#c69d6c] whitespace-nowrap transition-colors duration-150">{c.name}</span>
                    <Icon icon="solar:arrow-right-linear" width={14} height={14} className="text-[#ddd] group-hover:text-[#c69d6c] transition-colors duration-150 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
            <div className="h-16 bg-[#f8f8f6]" />
          </div>

        </div>

        <p className="mt-12 text-center text-[0.78rem] text-[#bbb]">강남교회 드롭다운 메뉴 시안 · 마음에 드는 번호를 알려주세요</p>
      </div>
    </div>
  );
}
