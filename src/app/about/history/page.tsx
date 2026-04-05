import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubNav from "../_components/SubNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "교회연혁 | 교회소개 | 강남교회",
  description: "1951년 부활절 창립부터 현재까지 강남교회의 발자취를 소개합니다.",
};

const history = [
  { year: "1951", items: ["부활절 아침, 노량진동 강남여자고등공민학교 건물에서 16명이 모여 첫 예배—강남교회 설립"] },
  { year: "1952", items: ["교인 100명 출석 (장년 68명, 학생 23명, 청년 10명)", "김재술 전도사, 강도사 인허"] },
  { year: "1953", items: ["김재술 강도사, 목사 안수"] },
  { year: "1954", items: ["노량진동 222-73호 167평 매입, 예배당 착공"] },
  { year: "1955", items: ["현 위치 예배당 준공, 추수감사주일 입당", "김재술 목사 초대 담임목사 위임"] },
  { year: "1960년대", items: ["예배당 증축", "2차 예배당 신축"] },
  { year: "1970년대", items: ["교육관 신축", "대한예수교장로회(합동) 남서울노회 가입"] },
  { year: "1986", items: ["창립 35주년—김재술 목사 은퇴, 원로목사 추대", "이규왕 목사 제2대 담임목사 위임"] },
  { year: "1991", items: ["창립 40주년 기념"] },
  { year: "1996", items: ["송태근 목사 제3대 담임목사 부임 및 위임식"] },
  { year: "2000", items: ["강남 양평수양관 준공 및 봉헌예배"] },
  { year: "2001", items: ["창립 50주년—강남 도봉장학회 설립", "새성전 헌당과 임직예배"] },
  { year: "2006", items: ["제3교육관 기공 감사예배 및 사용승인"] },
  { year: "2010년대", items: ["강남노인복지센터 신설(삼익상가 제2교육관 2층)", "19개 여전도회를 13개 여전도회로 재편성"] },
  { year: "2019", items: ["송태근 담임목사 사임"] },
  { year: "2020", items: ["제4대 고문산 담임목사 부임 및 위임식"] },
  { year: "2021~현재", items: ["장로·집사·권사 장립·취임·은퇴 및 각 부서 성장 지속", "온라인 예배 시스템 구축, 디지털 사역 확장"] },
];

export default function HistoryPage() {
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

        {/* 연혁 */}
        <section className="py-[5rem] lg:py-[7rem] bg-white">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            <div className="mb-12 lg:mb-16">
              <p className="text-[#c69d6c] text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-3">History</p>
              <h2 className="text-[1.8rem] lg:text-[2.4rem] font-bold text-[#222] tracking-[-0.04em] leading-[1.3]">교회연혁</h2>
              <p className="mt-3 text-[0.9rem] text-[#777] tracking-[-0.02em]">
                1951년 부활절, 16명의 성도로 시작한 강남교회의 발자취입니다.
              </p>
            </div>

            {/* 타임라인 */}
            <div className="relative">
              <div className="absolute left-[5.5rem] lg:left-[8rem] top-0 bottom-0 w-[1px] bg-[#e5e5e5]" />
              <div className="space-y-0">
                {history.map((h) => (
                  <div key={h.year} className="relative flex items-start gap-6 pb-8">
                    {/* 연도 */}
                    <div className="shrink-0 w-[5.5rem] lg:w-[8rem] text-right pr-4 pt-[2px]">
                      <span className="text-[0.82rem] lg:text-[0.88rem] font-bold text-[#294a3a] tracking-[-0.02em] whitespace-nowrap">
                        {h.year}
                      </span>
                    </div>
                    {/* 도트 */}
                    <div className="absolute left-[5.5rem] lg:left-[8rem] top-[0.45rem] -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#c69d6c] border-2 border-white shrink-0" />
                    {/* 내용 */}
                    <div className="flex-1 pl-4">
                      {h.items.map((item, i) => (
                        <p key={i} className="text-[0.88rem] text-[#555] leading-[1.7] tracking-[-0.02em]">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
