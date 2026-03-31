"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const navigation = [
  { name: "교회소개", href: "/about" },
  { name: "새가족안내", href: "/newcomer" },
  { name: "말씀과찬양", href: "/sermons" },
  { name: "공동체", href: "/community" },
  { name: "양육", href: "/nurture" },
  { name: "훈련", href: "/training" },
  { name: "커뮤니티", href: "/board" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[#ddd]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
        <div className="flex h-[70px] lg:h-[90px] items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="강남교회"
              width={400}
              height={49}
              className={`h-[24px] lg:h-[28px] w-auto object-contain transition-all duration-500 ${
                scrolled ? "brightness-100" : "brightness-0 invert"
              }`}
              priority
              unoptimized
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:gap-0">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-5 py-2 text-[0.88rem] lg:text-[clamp(0.88rem,1vw,1.1rem)] font-semibold tracking-tight transition-colors duration-300 ${
                  scrolled
                    ? "text-[#222] hover:text-primary"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className={`lg:hidden p-2 -mr-2 transition-colors duration-300 ${
              scrolled ? "text-[#222]" : "text-white"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="bg-white border-t border-[#ddd] px-5 py-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-3 py-3 text-[0.95rem] font-medium text-[#222] hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
