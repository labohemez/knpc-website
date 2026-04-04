"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutAction } from "../login/actions";

const NAV = [
  { href: "/admin/news", label: "소식" },
  { href: "/admin/bulletin", label: "주보" },
  { href: "/admin/sermons", label: "설교" },
  { href: "/admin/gallery", label: "갤러리" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex">
      {/* 사이드바 */}
      <aside className="w-[200px] bg-[#294a3a] flex flex-col flex-shrink-0">
        <div className="px-5 py-4 border-b border-white/10">
          <h1 className="text-[0.85rem] font-bold text-white tracking-[-0.02em]">강남교회 CMS</h1>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 text-[0.8rem] rounded transition-colors ${
                  active
                    ? "bg-white/15 text-white font-medium"
                    : "text-white/60 hover:text-white hover:bg-white/8"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button
            onClick={async () => {
              await logoutAction();
              router.push("/admin/login");
            }}
            className="w-full px-3 py-2 text-[0.75rem] text-white/50 hover:text-white transition-colors text-left"
          >
            로그아웃
          </button>
        </div>
      </aside>

      {/* 메인 */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
