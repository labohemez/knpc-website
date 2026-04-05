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
          <Image
            src="https://cdn.imweb.me/thumbnail/20240419/511be0402608a.jpg"
            alt="헌금안내"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-[#294a3a]/75" />
          <div className="relative mx-auto max-w-[1400px] px-5 lg:px-8 w-full">
            <p className="text-[#c69d6c] text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-2">About Us</p>
            <h1 className="text-[2rem] lg:text-[2.8rem] font-bold text-white tracking-[-0.04em] leading-[1.15]">교회소개</h1>
          </div>
        </section>

        <SubNav />

        <section className="py-[5rem] lg:py-[7rem] bg-white">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            <div className="mb-12">
              <p className="text-[#c69d6c] text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-3">Offering</p>
              <h2 className="text-[1.8rem] lg:text-[2.4rem] font-bold text-[#222] tracking-[-0.04em]">온라인 헌금안내</h2>
            </div>

            <div className="max-w-xl">
              {/* 성경 말씀 */}
              <div className="mb-10 p-8 bg-[#294a3a]">
                <p className="text-[#c69d6c] text-[0.7rem] font-semibold tracking-[0.2em] uppercase mb-4">고린도후서 9:7</p>
                <blockquote className="text-white text-[0.95rem] leading-[1.9] tracking-[-0.02em]">
                  각각 그 마음에 정한대로 할 것이요 인색함으로나 억지로 하지 말지니<br />
                  하나님은 즐겨 내는 자를 사랑하시느니라
                </blockquote>
              </div>

              {/* 헌금 이미지 */}
              <div className="mb-10 flex gap-4">
                <div className="relative flex-1 aspect-[3/2] overflow-hidden bg-[#f0ede8]">
                  <Image
                    src="https://cdn.imweb.me/thumbnail/20240326/ba7950e14a8cf.png"
                    alt="헌금 계좌"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <div className="relative flex-1 aspect-[3/2] overflow-hidden bg-[#f0ede8]">
                  <Image
                    src="https://cdn.imweb.me/thumbnail/20240326/ee8a093b2f561.png"
                    alt="헌금 안내"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>

              {/* 계좌 정보 */}
              <div className="mb-10 border border-[#eee] divide-y divide-[#f0f0f0]">
                <div className="flex items-center gap-4 px-6 py-4">
                  <span className="w-20 text-[0.78rem] font-semibold text-[#999] shrink-0">계좌번호</span>
                  <span className="text-[1rem] font-bold text-[#222] tracking-wider">100-024-913238</span>
                </div>
                <div className="flex items-center gap-4 px-6 py-4">
                  <span className="w-20 text-[0.78rem] font-semibold text-[#999] shrink-0">예금주</span>
                  <span className="text-[0.92rem] font-semibold text-[#222]">대한예수교장로회강남교회</span>
                </div>
              </div>

              {/* 온라인 기부금 영수증 */}
              <div className="mb-10">
                <a
                  href="https://knpc.or.kr/donation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#294a3a] text-[#294a3a] text-[0.85rem] font-semibold hover:bg-[#294a3a] hover:text-white transition-colors"
                >
                  온라인 기부금 영수증 신청 바로가기
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>

              {/* 주의사항 */}
              <div>
                <h3 className="text-[0.78rem] font-semibold text-[#999] tracking-[0.1em] uppercase mb-5">입금 시 주의사항</h3>
                <div className="border border-[#eee] divide-y divide-[#f5f5f5]">
                  <div className="px-6 py-5">
                    <p className="text-[0.88rem] font-semibold text-[#222] mb-2">송금표기</p>
                    <p className="text-[0.84rem] text-[#666] leading-[1.6]">
                      입금란에 <strong>[성명 + 생일 + 헌금구분]</strong> 형식으로 표기
                    </p>
                    <p className="mt-2 text-[0.8rem] text-[#999] font-mono bg-[#f9f9f7] px-3 py-2 border border-[#eee] inline-block">
                      예) 홍길동0205감사, 박문수1214십
                    </p>
                  </div>
                  <div className="px-6 py-5">
                    <p className="text-[0.88rem] font-semibold text-[#222] mb-2">마감</p>
                    <p className="text-[0.84rem] text-[#666] leading-[1.6]">
                      온라인 헌금 집계 마감은 <strong>토요일 밤 12시</strong>입니다.
                    </p>
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
