"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useCallback, useLayoutEffect } from "react";
import { Icon } from "@iconify/react";
const navigation = [
  {
    name: "교회소개",
    href: "/about",
    children: [
      { name: "담임목사 인사말", href: "/about#greeting" },
      { name: "교회 역사",      href: "/about#history"  },
      { name: "비전과 사명",    href: "/about#vision"   },
      { name: "예배 안내",      href: "/about#worship"  },
      { name: "오시는 길",      href: "/about#location" },
    ],
  },
  {
    name: "새가족안내",
    href: "/newcomer",
    children: [
      { name: "새가족 환영",    href: "/newcomer"         },
      { name: "등록 절차",      href: "/newcomer#steps"   },
      { name: "자주 묻는 질문", href: "/newcomer#faq"     },
      { name: "예배 시간",      href: "/newcomer#worship" },
    ],
  },
  {
    name: "말씀과찬양",
    href: "/sermons",
    children: [
      { name: "주일설교", href: "/sermons?cat=주일설교" },
      { name: "수요설교", href: "/sermons?cat=수요설교" },
      { name: "새벽기도", href: "/sermons?cat=새벽기도" },
      { name: "특별집회", href: "/sermons?cat=특별집회" },
    ],
  },
  {
    name: "공동체",
    href: "/community",
    children: [
      { name: "유아·유치·초등부", href: "/community#children"    },
      { name: "중·고등부",        href: "/community#youth"       },
      { name: "청년부",            href: "/community#young-adult" },
      { name: "구역예배",          href: "/community#small-group" },
      { name: "선교회",            href: "/community#mission"     },
      { name: "장애인부",          href: "/community#special"     },
    ],
  },
  {
    name: "양육",
    href: "/nurture",
    children: [
      { name: "새가족 양육", href: "/nurture#newcomer" },
      { name: "제자훈련",    href: "/nurture#disciple" },
      { name: "성경공부",    href: "/nurture#bible"    },
      { name: "QT 나눔",     href: "/nurture#qt"       },
    ],
  },
  {
    name: "훈련",
    href: "/training",
    children: [
      { name: "전도훈련",   href: "/training#evangelism" },
      { name: "리더십훈련", href: "/training#leadership" },
      { name: "선교훈련",   href: "/training#mission"    },
    ],
  },
  {
    name: "커뮤니티",
    href: "/board",
    children: [
      { name: "공지사항", href: "/news"              },
      { name: "교회소식", href: "/news?tab=교회소식" },
      { name: "주보",     href: "/news?tab=주보"     },
      { name: "갤러리",   href: "/gallery"           },
    ],
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [itemViewportLeft, setItemViewportLeft] = useState(0);

  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navItemRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const dropdownContentRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback((name: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    const navItem = navItemRefs.current.get(name);
    if (navItem) {
      const rect = navItem.getBoundingClientRect();
      setItemViewportLeft(Math.max(0, rect.left));
    }
    setActiveMenu(name);
  }, []);

  // DOM 업데이트 후 페인트 전에 실제 우측 경계 초과분을 측정해서 보정
  useLayoutEffect(() => {
    if (activeMenu && dropdownContentRef.current) {
      const contentRect = dropdownContentRef.current.getBoundingClientRect();
      const overflow = contentRect.right - window.innerWidth + 16;
      if (overflow > 0) {
        setItemViewportLeft((prev) => Math.max(0, prev - overflow));
      }
    }
  }, [activeMenu]);

  const handleMouseLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setActiveMenu(null), 100);
  }, []);

  const cancelLeave = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  }, []);

  const activeItem = navigation.find((n) => n.name === activeMenu);

  return (
    <header className="fixed top-0 left-0 right-0 z-50" onMouseLeave={handleMouseLeave}>

      {/* 헤더 바 */}
      <div className="bg-white border-b border-[#e0e0e0]">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
          <div className="flex h-[70px] lg:h-[90px] items-center justify-between">
            <Link href="/" className="flex items-center shrink-0">
              <Image src="/images/logo.png" alt="강남교회" width={1053} height={209}
                className="h-[30px] lg:h-[36px] w-auto object-contain" priority unoptimized />
            </Link>

            <nav className="hidden lg:flex items-center h-full">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  ref={(el) => { if (el) navItemRefs.current.set(item.name, el); }}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                >
                  <Link
                    href={item.href}
                    className={`px-5 text-[clamp(0.83rem,0.93vw,1.02rem)] font-semibold tracking-tight transition-colors duration-150 ${
                      activeMenu === item.name ? "text-primary" : "text-[#1d1d1f] hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </Link>
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-accent rounded-full transition-all duration-300 ${
                    activeMenu === item.name ? "w-5 opacity-100" : "w-0 opacity-0"
                  }`} />
                </div>
              ))}
            </nav>

            <button type="button" className="lg:hidden p-2 -mr-2 text-[#1d1d1f]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"} aria-expanded={mobileMenuOpen}>
              {mobileMenuOpen
                ? <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                : <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
              }
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Dropdown — Apple 스타일 풀너비 패널 */}
      <div
        className={`hidden lg:block absolute left-0 right-0 bg-white border-b border-[#e8e8e8] shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-200 ${
          activeMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onMouseEnter={cancelLeave}
      >
        {/* 상단 딥그린 액센트 라인 */}
        <div className="h-[2px] bg-primary" />

        <div
          className="py-3 flex"
          style={{ paddingLeft: `${itemViewportLeft}px` }}
        >
          <div className="flex flex-col shrink-0" ref={dropdownContentRef}>
            {activeItem?.children.map((child) => (
              <Link
                key={child.name}
                href={child.href}
                onClick={() => setActiveMenu(null)}
                className="relative flex items-center justify-between gap-6 pl-4 pr-5 py-[0.65rem] border-b border-[#f2f2f2] last:border-b-0 hover:bg-[#fdf8f2] group transition-colors duration-150 min-w-[180px] overflow-hidden"
              >
                {/* 호버 시 왼쪽 골드 액센트 바 */}
                <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-center" />
                <span className="text-[0.9rem] font-semibold text-[#222] group-hover:text-[#c69d6c] whitespace-nowrap transition-colors duration-150 tracking-[-0.02em]">
                  {child.name}
                </span>
                <Icon icon="solar:arrow-right-linear" width={12} height={12} className="text-[#ccc] group-hover:text-[#c69d6c] transition-colors duration-150 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 bg-white border-t border-[#e0e0e0] ${
        mobileMenuOpen ? "max-h-[80vh] opacity-100 overflow-y-auto" : "max-h-0 opacity-0"
      }`}>
        <nav>
          {navigation.map((item) => (
            <div key={item.name} className="border-b border-[#f0f0f0] last:border-0">
              <div className="flex items-center">
                <Link href={item.href}
                  className="flex-1 px-5 py-4 text-[0.95rem] font-semibold text-[#1d1d1f] hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}>
                  {item.name}
                </Link>
                <button className="px-4 py-4 text-[#bbb]"
                  onClick={() => setMobileExpanded(mobileExpanded === item.name ? null : item.name)}
                  aria-label="하위 메뉴">
                  <svg className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === item.name ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              </div>
              <div className={`overflow-hidden transition-all duration-200 ${mobileExpanded === item.name ? "max-h-[400px]" : "max-h-0"}`}>
                <div className="bg-[#f8f8f6] px-5 py-2">
                  {item.children.map((child) => (
                    <Link key={child.name} href={child.href}
                      className="block py-3 text-[0.9rem] font-medium text-[#333] hover:text-primary transition-colors tracking-[-0.02em] border-b border-[#efefef] last:border-0"
                      onClick={() => setMobileMenuOpen(false)}>
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
