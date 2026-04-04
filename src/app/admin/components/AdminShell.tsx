"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { logoutAction } from "../login/actions";

type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

const NAV: NavItem[] = [
  { href: "/admin/news", label: "소식" },
  { href: "/admin/bulletin", label: "주보" },
  {
    href: "/admin/sermons",
    label: "설교",
    children: [
      { href: "/admin/sermons?cat=주일예배",   label: "주일예배" },
      { href: "/admin/sermons?cat=수요예배",   label: "수요예배" },
      { href: "/admin/sermons?cat=금요기도회", label: "금요기도회" },
      { href: "/admin/sermons?cat=새벽기도회", label: "새벽기도회" },
      { href: "/admin/sermons?cat=특별예배",   label: "특별예배" },
      { href: "/admin/sermons?cat=청년1부",    label: "청년1부" },
      { href: "/admin/sermons?cat=청년2,3부",  label: "청년2,3부" },
    ],
  },
  {
    href: "/admin/sermons?cat=찬양",
    label: "찬양",
    children: [
      { href: "/admin/sermons?cat=찬양-할렐루야",   label: "할렐루야" },
      { href: "/admin/sermons?cat=찬양-호산나",     label: "호산나" },
      { href: "/admin/sermons?cat=찬양-시온",       label: "시온" },
      { href: "/admin/sermons?cat=찬양-주일예배",   label: "주일예배" },
      { href: "/admin/sermons?cat=찬양-금요기도회", label: "금요기도회" },
      { href: "/admin/sermons?cat=찬양-기타",       label: "기타" },
    ],
  },
  { href: "/admin/live", label: "LIVE" },
  { href: "/admin/gallery", label: "갤러리" },
];

function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");
  const getInitialOpen = () => {
    if (!catParam) return [];
    if (catParam.startsWith("찬양-")) return ["/admin/sermons?cat=찬양"];
    return ["/admin/sermons"];
  };
  const [open, setOpen] = useState<string[]>(getInitialOpen);

  useEffect(() => {
    if (!catParam) return;
    const parentHref = catParam.startsWith("찬양-") ? "/admin/sermons?cat=찬양" : "/admin/sermons";
    setOpen(prev => prev.includes(parentHref) ? prev : [...prev, parentHref]);
  }, [catParam]);

  const isPraiseActive = (catParam?.startsWith("찬양-")) ?? false;

  const isParentActive = (item: NavItem) => {
    if (!pathname.startsWith(item.href.split("?")[0])) return false;
    if (item.href === "/admin/sermons") return !isPraiseActive;
    if (item.href.includes("찬양")) return isPraiseActive;
    return true;
  };

  const isChildActive = (href: string) => {
    const [path, query] = href.split("?");
    if (!query) return pathname === path;
    const cat = new URLSearchParams(query).get("cat");
    return pathname === path && catParam === cat;
  };

  const toggleOpen = (href: string) => {
    setOpen(prev => prev.includes(href) ? prev.filter(h => h !== href) : [...prev, href]);
  };

  return (
    <aside className="w-[200px] bg-[#294a3a] flex flex-col flex-shrink-0">
      <div className="px-5 py-4 border-b border-white/10">
        <h1 className="text-[0.85rem] font-bold text-white tracking-[-0.02em]">강남교회 CMS</h1>
      </div>
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {NAV.map((item) => {
          const active = isParentActive(item);
          const isExpanded = open.includes(item.href);

          return (
            <div key={item.href}>
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleOpen(item.href)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-[0.8rem] rounded transition-colors cursor-pointer ${
                      active ? "bg-white/15 text-white font-medium" : "text-white/60 hover:text-white hover:bg-white/8"
                    }`}
                  >
                    <span>{item.label}</span>
                    <svg className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isExpanded && (
                    <div className="mt-0.5 mb-1 space-y-0.5">
                      {item.children.map((child) => {
                        const childActive = isChildActive(child.href);
                        return (
                          <Link key={child.href} href={child.href}
                            className={`flex items-center gap-2 pl-7 pr-3 py-1.5 text-[0.75rem] rounded transition-colors ${
                              childActive ? "text-white font-medium" : "text-white/45 hover:text-white/80"
                            }`}
                          >
                            <span className={`w-1 h-1 rounded-full flex-shrink-0 ${childActive ? "bg-[#c69d6c]" : "bg-white/20"}`} />
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <Link href={item.href}
                  className={`block px-3 py-2 text-[0.8rem] rounded transition-colors ${
                    active ? "bg-white/15 text-white font-medium" : "text-white/60 hover:text-white hover:bg-white/8"
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
      <div className="p-3 border-t border-white/10">
        <button
          onClick={async () => { await logoutAction(); router.push("/admin/login"); }}
          className="w-full px-3 py-2 text-[0.75rem] text-white/50 hover:text-white transition-colors text-left cursor-pointer"
        >
          로그아웃
        </button>
      </div>
    </aside>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7f7f7] flex">
      <Suspense fallback={<aside className="w-[200px] bg-[#294a3a]" />}>
        <Sidebar />
      </Suspense>
      <main className="flex-1 overflow-auto">
        <div className="p-6 w-full">{children}</div>
      </main>
    </div>
  );
}
