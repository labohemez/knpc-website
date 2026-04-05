"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { label: "환영인사",    href: "/about/greeting" },
  { label: "교회비전",    href: "/about/vision" },
  { label: "교회연혁",    href: "/about/history" },
  { label: "섬기는사람들", href: "/about/staff" },
  { label: "예배시간",    href: "/about/worship" },
  { label: "헌금안내",    href: "/about/donation" },
  { label: "오시는길",    href: "/about/location" },
];

export default function SubNav() {
  const pathname = usePathname();
  return (
    <nav className="bg-white border-b border-[#eee] sticky top-0 z-20">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
        <ul className="flex gap-0 overflow-x-auto scrollbar-none">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block whitespace-nowrap px-4 py-4 text-[0.85rem] font-medium tracking-[-0.02em] border-b-2 transition-colors ${
                    active
                      ? "border-[#294a3a] text-[#294a3a] font-semibold"
                      : "border-transparent text-[#666] hover:text-[#294a3a]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
