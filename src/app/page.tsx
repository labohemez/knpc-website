import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import HeroSlider from "@/components/HeroSlider";
import NewsSection from "@/components/NewsSection";
import SermonSlider from "@/components/SermonSlider";
import GallerySection from "@/components/GallerySection";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex-1 bg-white flex flex-col gap-3">
        {/* ── 히어로 ── */}
        <HeroSlider />



        {/* ── 2026 표어 + 예배시간 ── */}
        <section className="relative py-[5rem] lg:py-[6rem] overflow-hidden">
          <Image
            src="/images/gallery-5.jpg"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary-dark/85" />
          <div className="relative mx-auto max-w-[1400px] px-5 lg:px-8">
            <ScrollReveal>
              <div className="text-center">
                <p className="text-[3rem] lg:text-[4.5rem] font-bold text-white/10 tracking-[-0.04em] leading-none">
                  2026
                </p>
                <h2 className="mt-4 text-[1.8rem] lg:text-[2.2rem] font-bold text-white tracking-[-0.04em] leading-[1.3]">
                  온전한 믿음 성숙한 교회
                </h2>
                <div className="mt-4 mx-auto w-10 h-[2px] bg-accent" />
                <p className="mt-5 text-[0.95rem] text-white/60 leading-[1.7] tracking-[-0.02em]">
                  그리스도 안에서<br />
                  행복한 가정, 풍성한 교회, 건강한 사회
                </p>
                <p className="mt-5 text-[0.9rem] text-white/40 leading-[1.7] tracking-[-0.02em]">
                  &ldquo;네가 보거니와 믿음이 그의 행함과 함께 일하고 행함으로 믿음이 온전하게 되었느니라&rdquo;
                </p>
                <p className="mt-2 text-[0.8rem] text-accent font-medium tracking-[-0.02em]">
                  야고보서 2:22
                </p>
              </div>
            </ScrollReveal>

            {/* 예배 시간 — 한 줄 */}
            <ScrollReveal>
              <div className="mt-12 flex items-center justify-center gap-6 lg:gap-10 flex-wrap text-center">
                {[
                  { title: "주일예배", time: "1부 8:00 / 2부 10:00 / 3부 12:00" },
                  { title: "수요예배", time: "오전 11:00 · 오후 7:00" },
                  { title: "금요기도회", time: "오후 8:00" },
                  { title: "새벽기도회", time: "오전 5:30" },
                ].map((service, i) => (
                  <div key={service.title} className="flex items-center gap-3">
                    {i > 0 && <span className="hidden lg:block w-[1px] h-4 bg-white/20 -ml-3 lg:-ml-5" />}
                    <div>
                      <span className="text-[0.75rem] font-semibold text-accent tracking-[-0.02em]">{service.title}</span>
                      <span className="ml-2 text-[0.82rem] text-white/60 tracking-[-0.02em]">{service.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── 바로가기 ── */}
        <section className="py-[4rem] lg:py-[5rem] bg-[#f5f5f7]">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            <ScrollReveal>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4 lg:gap-8">
                {[
                  { name: "유튜브 채널", icon: (
                    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                      <rect x="6" y="14" width="52" height="36" rx="6" fill="#FFEAEA" stroke="#D32F2F" strokeWidth="2.5"/>
                      <path d="M25 22L41 32L25 42V22Z" fill="#D32F2F"/>
                      <rect x="25" y="22" width="16" height="20" rx="1" fill="#D32F2F" opacity="0.15"/>
                      <path d="M25 22L41 32L25 42V22Z" fill="#D32F2F"/>
                      <circle cx="52" cy="14" r="5" fill="#FF5252" stroke="white" strokeWidth="1.5"/>
                    </svg>
                  ), href: "https://youtube.com/@KNPC" },
                  { name: "실시간 예배", icon: (
                    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                      <rect x="6" y="8" width="52" height="34" rx="4" fill="#E3F2FD" stroke="#1E88E5" strokeWidth="2.5"/>
                      <rect x="10" y="12" width="44" height="26" rx="2" fill="white" stroke="#1E88E5" strokeWidth="1.5"/>
                      <path d="M28 20L38 25L28 30V20Z" fill="#1E88E5"/>
                      <path d="M22 48H42" stroke="#1E88E5" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M32 42V48" stroke="#1E88E5" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M28 42H36" stroke="#1E88E5" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="52" cy="12" r="4" fill="#D32F2F"/>
                      <circle cx="52" cy="12" r="1.5" fill="white"/>
                    </svg>
                  ), href: "/about#worship" },
                  { name: "기도요청", icon: (
                    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                      <path d="M32 10L34 4" stroke="#C69D6C" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M25 12L22 6" stroke="#C69D6C" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M39 12L42 6" stroke="#C69D6C" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M22 28L26 20C27 18 29 16 32 18C35 16 37 18 38 20L42 28" stroke="#5C4033" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18 32C18 32 20 26 24 22" stroke="#5C4033" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M46 32C46 32 44 26 40 22" stroke="#5C4033" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M18 32C18 32 15 38 18 44C21 50 26 54 32 58C38 54 43 50 46 44C49 38 46 32 46 32" fill="#FFF3E0" stroke="#C69D6C" strokeWidth="2.5" strokeLinejoin="round"/>
                      <path d="M32 38V50" stroke="#C69D6C" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
                      <path d="M26 42H38" stroke="#C69D6C" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
                    </svg>
                  ), href: "mailto:pray@knpc.or.kr" },
                  { name: "설교", icon: (
                    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                      <rect x="8" y="6" width="32" height="44" rx="3" fill="#F0FFF4" stroke="#294A3A" strokeWidth="2.5"/>
                      <path d="M15 16H34" stroke="#294A3A" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M15 24H34" stroke="#294A3A" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M15 32H28" stroke="#294A3A" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M15 39H24" stroke="#294A3A" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M22 6V1" stroke="#D32F2F" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M18 1H26" stroke="#D32F2F" strokeWidth="2.5" strokeLinecap="round"/>
                      <rect x="38" y="20" width="18" height="36" rx="3" fill="#E8F5E9" stroke="#294A3A" strokeWidth="2.5"/>
                      <path d="M43 30H51" stroke="#294A3A" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M43 36H51" stroke="#294A3A" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M43 42H49" stroke="#294A3A" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  ), href: "/sermons" },
                  { name: "온라인 헌금", icon: (
                    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                      <path d="M14 30C14 30 18 22 24 20H40C46 22 50 30 50 30V36C50 44 42 52 32 56C22 52 14 44 14 36V30Z" fill="#FFF8E1" stroke="#C69D6C" strokeWidth="2.5" strokeLinejoin="round"/>
                      <path d="M32 20V10" stroke="#C69D6C" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M26 16L32 10L38 16" stroke="#C69D6C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="32" cy="38" r="7" fill="#FFE0B2" stroke="#C69D6C" strokeWidth="2.5"/>
                      <path d="M30 35C30.5 34 33.5 34 34 35" stroke="#C69D6C" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M30 40C30.5 41 33.5 41 34 40" stroke="#C69D6C" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M32 34.5V41" stroke="#C69D6C" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  ), href: "/about" },
                  { name: "새가족 안내", icon: (
                    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                      <circle cx="24" cy="18" r="8" fill="#E8F5E9" stroke="#294A3A" strokeWidth="2.5"/>
                      <path d="M10 52C10 40 16 32 24 32C32 32 38 40 38 52" stroke="#294A3A" strokeWidth="2.5" strokeLinecap="round"/>
                      <circle cx="44" cy="20" r="6" fill="#FFF3E0" stroke="#C69D6C" strokeWidth="2.5"/>
                      <path d="M34 52C34 42 38 34 44 34C50 34 54 42 54 52" stroke="#C69D6C" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M24 16L24.5 18.5L23.5 18.5Z" fill="#294A3A" opacity="0.3"/>
                      <path d="M44 18L44.5 20.5L43.5 20.5Z" fill="#C69D6C" opacity="0.3"/>
                      <circle cx="42" cy="8" r="3" fill="none" stroke="#D32F2F" strokeWidth="2.5"/>
                      <path d="M42 5V11" stroke="#D32F2F" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M39 8H45" stroke="#D32F2F" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  ), href: "/newcomer" },
                  { name: "오시는 길", icon: (
                    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                      <path d="M32 58S50 40 50 26C50 16.1 42 8 32 8C22 8 14 16.1 14 26C14 40 32 58 32 58Z" fill="#FFEAEA" stroke="#D32F2F" strokeWidth="2.5"/>
                      <circle cx="32" cy="26" r="8" fill="white" stroke="#D32F2F" strokeWidth="2.5"/>
                      <circle cx="32" cy="26" r="3.5" fill="#D32F2F"/>
                      <path d="M32 22V30" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M28 26H36" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  ), href: "/about#location" },
                ].map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex flex-col items-center gap-3 group"
                  >
                    <div className="w-[4rem] h-[4rem] lg:w-[clamp(4.5rem,6vw,6rem)] lg:h-[clamp(4.5rem,6vw,6rem)] rounded-full bg-[#f8f8f8] p-2.5 lg:p-3 group-hover:bg-[#f0f0f0] transition-colors duration-300">
                      {item.icon}
                    </div>
                    <span className="text-[0.85rem] lg:text-[1rem] font-medium text-[#222] tracking-[-0.03em]">
                      {item.name}
                    </span>
                  </a>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── 최근 설교 ── */}
        <SermonSlider />

        {/* ── 교회 소식 ── */}
        <NewsSection />

        {/* ── 갤러리 ── */}
        <GallerySection />

        {/* ── 환영 + 비전 ── */}
        <section className="relative overflow-hidden">
          <Image
            src="/images/hero-1.jpg"
            alt="강남교회 교인들"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary-dark/80" />

          <div className="relative">
            {/* 환영 */}
            <div className="mx-auto max-w-[1400px] px-5 lg:px-8 py-[5rem] lg:py-[6rem] text-center">
              <ScrollReveal>
                <p className="text-accent text-[0.75rem] font-semibold tracking-[0.2em] uppercase mb-3">
                  Welcome
                </p>
                <h2 className="text-[1.8rem] lg:text-[2.2rem] font-bold text-white tracking-[-0.04em] leading-[1.3]">
                  강남교회에 오신 여러분을<br />주님의 이름으로 환영합니다
                </h2>
                <p className="mt-5 text-[0.92rem] text-white/50 leading-[1.75] tracking-[-0.02em] max-w-[550px] mx-auto">
                  우리 모두가 여러분을 기다리고 있습니다.
                  주일에 출입구에서 새가족임을 말씀해주시면 안내를 받으실 수 있습니다.
                </p>
                <div className="mt-8 flex justify-center gap-3">
                  <a
                    href="/newcomer"
                    className="px-7 py-3 text-[0.82rem] font-medium text-primary bg-white hover:bg-gray-100 transition-colors duration-300 tracking-[-0.02em]"
                  >
                    새가족 안내
                  </a>
                  <a
                    href="/about"
                    className="px-7 py-3 text-[0.82rem] font-medium text-white border border-white/40 hover:bg-white/10 transition-colors duration-300 tracking-[-0.02em]"
                  >
                    환영인사
                  </a>
                </div>
              </ScrollReveal>
            </div>

            {/* 비전 — 하단 바 */}
            <div className="border-t border-white/10">
              <div className="mx-auto max-w-[1400px] px-5 lg:px-8 py-8 lg:py-10">
                <ScrollReveal>
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <span className="text-accent text-[0.75rem] font-semibold tracking-[0.15em] uppercase shrink-0">Our Vision</span>
                      <span className="hidden lg:block w-[1px] h-5 bg-white/20" />
                      <div className="flex flex-wrap justify-center gap-2">
                        {[
                          "가르치는 교회",
                          "선포하는 교회",
                          "치유하는 교회",
                          "목회자를 양성하는 교회",
                          "장애인과 함께하는 교회",
                        ].map((v) => (
                          <span
                            key={v}
                            className="px-4 py-1.5 border border-white/15 text-white/60 text-[0.78rem] font-medium tracking-[-0.02em]"
                          >
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>
                    <a
                      href="/about"
                      className="text-[0.82rem] font-medium text-accent hover:text-accent-light transition-colors tracking-[-0.02em] inline-flex items-center gap-1.5 shrink-0"
                    >
                      자세히 보기
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </a>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── 헌금 · 연락처 ── */}
        <section className="py-[4rem] lg:py-[5rem] bg-[#f5f5f7]">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            <ScrollReveal>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-full bg-[#f8f8f8] flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[0.78rem] font-semibold text-[#222] tracking-[-0.02em]">온라인 헌금</p>
                    <p className="mt-1 text-[0.82rem] text-primary font-semibold tracking-[-0.02em]">신한 100-024-913238</p>
                    <p className="text-[0.72rem] text-[#999] tracking-[-0.02em]">대한예수교장로회강남교회</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-full bg-[#f8f8f8] flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[0.78rem] font-semibold text-[#222] tracking-[-0.02em]">오시는 길</p>
                    <p className="mt-1 text-[0.82rem] text-[#666] tracking-[-0.02em]">서울시 동작구 만양로 76</p>
                    <p className="text-[0.72rem] text-[#999] tracking-[-0.02em]">(노량진동)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-full bg-[#f8f8f8] flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[0.78rem] font-semibold text-[#222] tracking-[-0.02em]">연락처</p>
                    <p className="mt-1 text-[0.82rem] text-[#666] tracking-[-0.02em]">
                      <a href="tel:02-814-7606" className="hover:text-primary transition-colors">02-814-7606</a>
                    </p>
                    <p className="text-[0.72rem] text-[#999] tracking-[-0.02em]">Fax. 02-817-9571</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-full bg-[#f8f8f8] flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[0.78rem] font-semibold text-[#222] tracking-[-0.02em]">이메일</p>
                    <p className="mt-1 text-[0.82rem] text-[#666] tracking-[-0.02em]">
                      <a href="mailto:knpc91@hanmail.net" className="hover:text-primary transition-colors">knpc91@hanmail.net</a>
                    </p>
                    <p className="text-[0.72rem] text-[#999] tracking-[-0.02em]">대관·배차 문의</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
