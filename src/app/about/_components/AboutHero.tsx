import Link from "next/link";

interface Props {
  pageName: string;
}

export default function AboutHero({ pageName }: Props) {
  return (
    <section className="relative h-[180px] lg:h-[240px] bg-[#294a3a] flex items-end pb-8 lg:pb-10 overflow-hidden">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #c69d6c 1px, transparent 0)", backgroundSize: "28px 28px" }} />

      <div className="relative mx-auto max-w-[1400px] px-5 lg:px-8 w-full">
        {/* 브레드크럼 */}
        <nav aria-label="breadcrumb" className="flex items-center gap-1.5 mb-3">
          <Link href="/" className="text-white/50 text-[0.75rem] hover:text-white/80 transition-colors">홈</Link>
          <svg className="w-3 h-3 text-white/30 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          <Link href="/about/greeting" className="text-white/50 text-[0.75rem] hover:text-white/80 transition-colors">교회소개</Link>
          <svg className="w-3 h-3 text-white/30 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          <span className="text-white/90 text-[0.75rem] font-medium">{pageName}</span>
        </nav>
        <h1 className="text-[1.8rem] lg:text-[2.4rem] font-bold text-white tracking-[-0.04em] leading-[1.15]">{pageName}</h1>
      </div>
    </section>
  );
}
