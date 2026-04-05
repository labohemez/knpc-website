import Link from "next/link";

interface Breadcrumb {
  name: string;
  href?: string;
}

interface Props {
  breadcrumbs: Breadcrumb[];
  title: string;
  subtitle?: string;
}

const Chevron = () => (
  <svg className="w-3 h-3 text-white/30 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

export default function PageHero({ breadcrumbs, title, subtitle }: Props) {
  return (
    <section className="relative h-[180px] lg:h-[240px] bg-[#294a3a] flex items-end pb-8 lg:pb-10 overflow-hidden">
      {/* 배경 도트 패턴 */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #c69d6c 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 lg:px-8 w-full">
        {/* 브레드크럼 */}
        <nav aria-label="breadcrumb" className="flex items-center gap-1.5 mb-3 flex-wrap">
          {breadcrumbs.map((crumb, i) => {
            const isLast = i === breadcrumbs.length - 1;
            return (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <Chevron />}
                {isLast || !crumb.href ? (
                  <span className={`text-[0.75rem] ${isLast ? "text-white/90 font-medium" : "text-white/50"}`}>
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.href} className="text-white/50 text-[0.75rem] hover:text-white/80 transition-colors">
                    {crumb.name}
                  </Link>
                )}
              </span>
            );
          })}
        </nav>

        <h1 className="text-[1.8rem] lg:text-[2.4rem] font-bold text-white tracking-[-0.04em] leading-[1.15]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/50 text-[0.9rem] mt-2 tracking-[-0.01em]">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
