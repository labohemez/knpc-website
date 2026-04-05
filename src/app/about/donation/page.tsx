import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubNav from "../_components/SubNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "헌금안내 | 교회소개 | 강남교회",
  description: "강남교회 온라인 헌금 계좌 및 헌금 안내입니다.",
};

export default function DonationPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white flex flex-col">
        {/* 히어로 */}
        <section className="relative h-[240px] lg:h-[320px] flex items-end pb-8 lg:pb-12">
          <Image src="/images/hero-2.jpg" alt="교회소개" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-[#294a3a]/80" />
          <div className="relative mx-auto max-w-[1400px] px-5 lg:px-8 w-full">
            <p className="text-[#c69d6c] text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-2">About Us</p>
            <h1 className="text-[2rem] lg:text-[2.8rem] font-bold text-white tracking-[-0.04em] leading-[1.15]">교회소개</h1>
          </div>
        </section>

        <SubNav />

        <section className="py-[5rem] lg:py-[7rem] bg-white">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            <div className="mb-12 lg:mb-16">
              <p className="text-[#c69d6c] text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-3">Offering</p>
              <h2 className="text-[1.8rem] lg:text-[2.4rem] font-bold text-[#222] tracking-[-0.04em] leading-[1.3]">헌금안내</h2>
            </div>

            <div className="max-w-2xl">
              {/* 말씀 */}
              <div className="mb-12 p-8 bg-[#294a3a] text-white">
                <p className="text-[#c69d6c] text-[0.7rem] font-semibold tracking-[0.2em] uppercase mb-4">Scripture</p>
                <blockquote className="text-[0.95rem] leading-[1.9] text-white/90 tracking-[-0.02em]">
                  "각각 그 마음에 정한대로 할 것이요 인색함으로나 억지로 하지 말지니<br />
                  하나님은 즐겨 내는 자를 사랑하시느니라"
                </blockquote>
                <p className="mt-4 text-[#c69d6c]/70 text-[0.8rem]">고린도후서 9:7</p>
              </div>

              {/* 계좌 안내 */}
              <div className="mb-10">
                <h3 className="text-[0.78rem] font-semibold text-[#999] tracking-[0.1em] uppercase mb-5">헌금 계좌</h3>
                <div className="border border-[#eee] p-6 space-y-4">
                  <div className="flex items-start gap-4 pb-4 border-b border-[#f5f5f5]">
                    <span className="shrink-0 text-[0.75rem] font-semibold text-[#999] tracking-[0.05em] w-20">예금주</span>
                    <span className="text-[0.92rem] font-semibold text-[#222]">대한예수교장로회강남교회</span>
                  </div>
                  <p className="text-[0.82rem] text-[#777] leading-[1.6]">
                    계좌번호는 교회로 직접 문의해 주시기 바랍니다.<br />
                    Tel. <a href="tel:02-814-7606" className="text-[#294a3a] hover:underline">02-814-7606</a>
                  </p>
                </div>
              </div>

              {/* 기부금 영수증 */}
              <div className="mb-10">
                <h3 className="text-[0.78rem] font-semibold text-[#999] tracking-[0.1em] uppercase mb-5">기부금 영수증</h3>
                <div className="border border-[#eee] p-6">
                  <p className="text-[0.88rem] text-[#555] leading-[1.7] mb-4">
                    온라인 기부금 영수증 신청은 교회 홈페이지를 통해 접수하시거나,
                    교회 사무실로 연락 주시면 안내해 드립니다.
                  </p>
                  <a
                    href="tel:02-814-7606"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#294a3a] text-white text-[0.82rem] font-medium hover:bg-[#1f3829] transition-colors"
                  >
                    교회 사무실 문의
                  </a>
                </div>
              </div>

              {/* 주의사항 */}
              <div>
                <h3 className="text-[0.78rem] font-semibold text-[#999] tracking-[0.1em] uppercase mb-5">입금 시 주의사항</h3>
                <div className="border border-[#eee] p-6 space-y-3">
                  <div className="flex gap-3">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-[#294a3a]/10 text-[#294a3a] text-[0.7rem] font-bold flex items-center justify-center mt-0.5">1</span>
                    <div>
                      <p className="text-[0.88rem] font-semibold text-[#222] mb-1">[송금표기]</p>
                      <p className="text-[0.84rem] text-[#666] leading-[1.6]">
                        입금란에 <strong>성명 + 생년월일(4자리) + 헌금구분</strong> 형식으로 표기해 주세요.
                      </p>
                      <p className="mt-1 text-[0.8rem] text-[#999] bg-[#f9f9f7] px-3 py-1.5 border border-[#eee] font-mono">
                        예) 홍길동0205감사 / 박문수1214십일조
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-[#294a3a]/10 text-[#294a3a] text-[0.7rem] font-bold flex items-center justify-center mt-0.5">2</span>
                    <div>
                      <p className="text-[0.88rem] font-semibold text-[#222] mb-1">[마감]</p>
                      <p className="text-[0.84rem] text-[#666] leading-[1.6]">
                        온라인 헌금 집계 마감은 <strong>토요일 밤 12시</strong>입니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
