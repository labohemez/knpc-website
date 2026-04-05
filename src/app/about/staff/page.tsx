import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubNav from "../_components/SubNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "섬기는사람들 | 교회소개 | 강남교회",
  description: "강남교회 담임목사, 교역자, 전도사 소개입니다.",
};

const pastors = [
  { name: "서강일 목사", email: "seo82good@gmail.com", role: "행정/예배위원회 · 청장년부 · 제자훈련원 · 가정사역원" },
  { name: "황봉규 목사", email: "saladin220@naver.com", role: "아동부 · 디렉터 · 기도학교 · 부모·교사교육 · 고공방" },
  { name: "김세현 목사", email: "joyksh1987@naver.com", role: "다솔(청년1부) · 디렉터 · 70인전도대" },
  { name: "김해광 목사", email: "mclight@hanmail.net", role: "마을위원장 · 1,2마을 · 새가족부 · 장년교육" },
  { name: "김부림 목사", email: "boolimkim@naver.com", role: "밀알부 · 다사랑부 · 전도폭발(시니어)" },
  { name: "이홍우 목사", email: "thome@naver.com", role: "다드림(청년3부) · 디렉터 · 홈페이지 · 비전강남" },
  { name: "박범수 목사", email: "elpagio@naver.com", role: "5,6마을 · 새생명축제 · 예배위원회(기획)" },
  { name: "김기락 목사", email: "stand-up01@hanmail.net", role: "3,4마을 · 사랑방 교안 · 전도폭발(장년) · 피스메이커" },
  { name: "이정현 목사", email: "jinsimura@naver.com", role: "다니엘(청년2부) · 세계선교위원회" },
  { name: "김응열 목사", email: "powchist@naver.com", role: "7,8마을 · 소망부 · 경로대학 · 성경파노라마" },
];

const cooperatingPastor = [
  { name: "김광열 목사", email: "kykim@hanmail.net", role: "총신대학교 신학대학원 교수 (협동목사)" },
];

const evangelists = [
  { name: "이대성 강도사", email: "eotjd1097@naver.com", role: "중등부 · 세계선교위원회 · 성경통신" },
];

const villageMissioners = [
  { name: "유미정 전도사", email: "hannayu@hanmail.net", role: "3,4마을 · 마을위원회" },
  { name: "김주경 전도사", email: "jookyung858@hanmail.net", role: "5,6마을 · 영접팀 · 새생명축제" },
  { name: "장혜경 전도사", email: "amosjang@hanmail.net", role: "1,2마을 · 제자훈련원" },
  { name: "황라헬 전도사", email: "rachel5069@naver.com", role: "7,8마을 · 기도학교" },
];

const eduMissioners = [
  { name: "김경성 전도사", email: "kkss2005@daum.net", role: "영아부 · 디렉터 · 아기학교 · 태아부모학교" },
  { name: "류세현 전도사", email: "troishyun@gmail.com", role: "유년부 · 피스메이커" },
  { name: "채남주 전도사", email: "coskawn05@naver.com", role: "" },
  { name: "박대연 전도사", email: "eodus4044@gmail.com", role: "청년2부" },
  { name: "서반석 전도사", email: "luvjesus0123@naver.com", role: "사랑부 · 사랑학교 · 방송실" },
  { name: "박성빈 전도사", email: "lovebin300@naver.com", role: "청년1부 · 생태계" },
  { name: "양준수 전도사", email: "didwnstn5593@naver.com", role: "고등부 · 성경파노라마" },
  { name: "정소망 전도사", email: "wjdthakd1006@naver.com", role: "" },
  { name: "김지수 전도사", email: "wltn2305@naver.com", role: "예배위원회(찬양) · 찬양사역(시냇가에 심은 나무, 셀라)" },
  { name: "김준성 전도사", email: "woom0519@gmail.com", role: "초등부 · 홈페이지" },
  { name: "김광은 전도사", email: "jacob_1010@naver.com", role: "예배위원회(찬양) · 아름다운백성 찬양팀" },
];

const interns = [
  { name: "장휘은 전도사", email: "onsarang2000@naver.com", role: "청년부 공동사역 (인턴)" },
  { name: "주찬영 전도사", email: "jooyona12@naver.com", role: "교육부 공동사역 (인턴)" },
];

function StaffSection({ title, subtitle, people }: { title: string; subtitle: string; people: { name: string; email: string; role: string }[] }) {
  return (
    <div className="mb-14">
      <div className="mb-6">
        <h3 className="text-[1.1rem] font-bold text-[#222] tracking-[-0.03em]">{title}</h3>
        {subtitle && <p className="text-[0.8rem] text-[#999] mt-0.5">{subtitle}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {people.map((p) => (
          <div key={p.email} className="border border-[#eee] p-5 bg-white hover:border-[#294a3a]/20 transition-colors">
            <p className="text-[0.95rem] font-semibold text-[#222] tracking-[-0.02em] mb-1">{p.name}</p>
            {p.role && <p className="text-[0.78rem] text-[#777] leading-[1.6] tracking-[-0.02em] mb-2">{p.role}</p>}
            {p.email && (
              <a href={`mailto:${p.email}`} className="text-[0.75rem] text-[#294a3a]/70 hover:text-[#294a3a] transition-colors">
                {p.email}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StaffPage() {
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
              <p className="text-[#c69d6c] text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-3">Our Team</p>
              <h2 className="text-[1.8rem] lg:text-[2.4rem] font-bold text-[#222] tracking-[-0.04em] leading-[1.3]">섬기는 사람들</h2>
            </div>

            {/* 담임목사 */}
            <div className="mb-14 p-8 lg:p-10 bg-[#294a3a] text-white">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-[#c69d6c] text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-2">Lead Pastor</p>
                  <p className="text-[1.5rem] lg:text-[1.8rem] font-bold tracking-[-0.03em]">고문산 목사</p>
                  <p className="mt-1 text-white/60 text-[0.88rem]">강남교회 담임목사</p>
                </div>
              </div>
            </div>

            <StaffSection title="목사" subtitle="교역자" people={pastors} />
            <StaffSection title="협동목사" subtitle="" people={cooperatingPastor} />
            <StaffSection title="강도사" subtitle="" people={evangelists} />
            <StaffSection title="마을전도사" subtitle="" people={villageMissioners} />
            <StaffSection title="교육전도사" subtitle="" people={eduMissioners} />
            <StaffSection title="인턴전도사" subtitle="" people={interns} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
