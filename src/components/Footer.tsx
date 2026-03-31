import Link from "next/link";

const footerLinks = [
  { name: "교회소개", href: "/about" },
  { name: "새가족안내", href: "/newcomer" },
  { name: "말씀과찬양", href: "/sermons" },
  { name: "공동체", href: "/community" },
  { name: "양육", href: "/nurture" },
  { name: "훈련", href: "/training" },
  { name: "커뮤니티", href: "/board" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a2820] text-[#727a81]">
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 py-5">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[0.75rem] text-[#727a81] hover:text-white transition-colors duration-200 tracking-[-0.02em]"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div>
            <h3 className="text-[1rem] font-bold text-white mb-3 tracking-[-0.02em]">
              강남교회
            </h3>
            <p className="text-[0.78rem] text-[#727a81] leading-[1.8] tracking-[-0.02em]">
              서울시 동작구 만양로 76 (노량진동)
              <br />
              Tel. 02-814-7606 · Fax. 02-817-9571
              <br />
              Email. knpc91@hanmail.net
            </p>
          </div>
          <div className="flex items-center gap-4 text-[0.72rem]">
            <a href="#" className="text-[#727a81] hover:text-white transition-colors">
              이용약관
            </a>
            <span className="text-[#475460]">|</span>
            <a href="#" className="text-white hover:text-white/80 transition-colors font-medium">
              개인정보처리방침
            </a>
          </div>
        </div>
        <p className="mt-8 text-[0.72rem] text-[#475460] tracking-[-0.02em]">
          &copy; {new Date().getFullYear()} 강남교회 All rights reserved.
        </p>
      </div>
    </footer>
  );
}
