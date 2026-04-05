import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubNav from "../_components/SubNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "섬기는사람들 | 교회소개 | 강남교회",
  description: "강남교회 담임목사, 교역자, 전도사 소개입니다.",
};

type Person = { name: string; role: string; email: string; photo: string };

const headPastor: Person = {
  name: "고문산 목사",
  role: "담임목사",
  email: "",
  photo: "https://cdn.imweb.me/thumbnail/20240425/2fafe763174ed.jpg",
};

const pastors: Person[] = [
  { name: "서강일 목사", role: "행정/예배위원회/청장년부/제자훈련원/가정사역원", email: "seo82good@gmail.com", photo: "https://cdn.imweb.me/thumbnail/20240531/4898a26512c77.jpg" },
  { name: "황봉규 목사", role: "아동부/디렉터/기도학교/부모·교사교육/고공방", email: "saladin220@naver.com", photo: "https://cdn.imweb.me/thumbnail/20240531/53f8660f8cd68.jpg" },
  { name: "김세현 목사", role: "다솔(청년1부)/디렉터/70인전도대", email: "joyksh1987@naver.com", photo: "https://cdn.imweb.me/thumbnail/20240531/7e2b90b153010.jpg" },
  { name: "김해광 목사", role: "마을위원장/1,2마을/새가족부/장년교육", email: "mclight@hanmail.net", photo: "https://cdn.imweb.me/thumbnail/20240531/ee3d75d181e1f.jpg" },
  { name: "김부림 목사", role: "밀알부·다사랑부/전도폭발(시니어)", email: "boolimkim@naver.com", photo: "https://cdn.imweb.me/thumbnail/20240531/0a5a640d189a9.jpg" },
  { name: "이홍우 목사", role: "다드림(청년3부)/디렉터/홈페이지/비전강남", email: "thome@naver.com", photo: "https://cdn.imweb.me/thumbnail/20241227/10d3b8831da09.jpg" },
  { name: "박범수 목사", role: "5,6마을/새생명축제/예배위원회(기획)", email: "elpagio@naver.com", photo: "https://cdn.imweb.me/thumbnail/20250919/2071acce6b8b7.jpg" },
  { name: "김기락 목사", role: "3,4마을/사랑방 교안/전도폭발(장년)/피스메이커", email: "stand-up01@hanmail.net", photo: "https://cdn.imweb.me/thumbnail/20251207/05969e3d61cab.jpg" },
  { name: "이정현 목사", role: "다니엘(청년2부)/세계선교위원회", email: "jinsimura@naver.com", photo: "https://cdn.imweb.me/thumbnail/20251210/3bcd56516be68.jpg" },
  { name: "김응열 목사", role: "7,8마을/소망부·경로대학·성경파노라마", email: "powchist@naver.com", photo: "https://cdn.imweb.me/thumbnail/20251230/ad2d6bd441975.jpg" },
  { name: "김광열 목사", role: "총신대학교 신학대학원 교수 (협동목사)", email: "kykim@hanmail.net", photo: "https://cdn.imweb.me/thumbnail/20240602/c4f025d61ae40.jpg" },
];

const evangelists: Person[] = [
  { name: "이대성 강도사", role: "중등부/세계선교위원회/성경통신", email: "eotjd1097@naver.com", photo: "https://cdn.imweb.me/thumbnail/20251230/5dfc586508acd.jpg" },
  { name: "유미정 전도사", role: "3,4마을/마을위원회", email: "hannayu@hanmail.net", photo: "https://cdn.imweb.me/thumbnail/20240531/9efb60939a12d.jpg" },
  { name: "김주경 전도사", role: "5,6마을/영접팀/새생명축제", email: "jookyung858@hanmail.net", photo: "https://cdn.imweb.me/thumbnail/20240531/4020997d0039c.jpg" },
  { name: "장혜경 전도사", role: "1,2마을/제자훈련원", email: "amosjang@hanmail.net", photo: "https://cdn.imweb.me/thumbnail/20251107/b16c41d601812.png" },
  { name: "황라헬 전도사", role: "7,8마을/기도학교", email: "rachel5069@naver.com", photo: "https://cdn.imweb.me/thumbnail/20241227/1cf1142747eb3.jpg" },
  { name: "김경성 전도사", role: "영아부/디렉터/아기학교/태아부모학교", email: "kkss2005@daum.net", photo: "https://cdn.imweb.me/thumbnail/20240531/db49e61f46fbd.jpg" },
  { name: "류세현 전도사", role: "유년부/피스메이커", email: "troishyun@gmail.com", photo: "https://cdn.imweb.me/thumbnail/20240531/1c3c06b9eb854.jpg" },
  { name: "채남주 전도사", role: "유치부", email: "coskawn05@naver.com", photo: "https://cdn.imweb.me/thumbnail/20241227/d8c4ea60738fa.jpg" },
  { name: "박대연 전도사", role: "청년2부", email: "eodus4044@gmail.com", photo: "https://cdn.imweb.me/thumbnail/20241227/bb08adce03056.jpg" },
  { name: "서반석 전도사", role: "사랑부/사랑학교/방송실", email: "luvjesus0123@naver.com", photo: "https://cdn.imweb.me/thumbnail/20241227/3a6b020d2d6a0.jpg" },
  { name: "박성빈 전도사", role: "청년1부/생태계", email: "lovebin300@naver.com", photo: "https://cdn.imweb.me/thumbnail/20241227/87af15fc1ccce.jpg" },
  { name: "양준수 전도사", role: "고등부/성경파노라마", email: "didwnstn5593@naver.com", photo: "https://cdn.imweb.me/thumbnail/20241227/3a7be10f05b72.jpg" },
  { name: "정소망 전도사", role: "유아부", email: "wjdthakd1006@naver.com", photo: "https://cdn.imweb.me/thumbnail/20250323/73e4483b33c67.jpg" },
  { name: "김지수 전도사", role: "예배위원회(찬양)/시냇가에 심은 나무·셀라", email: "wltn2305@naver.com", photo: "https://cdn.imweb.me/thumbnail/20250309/72ac3ba85afbc.png" },
  { name: "김준성 전도사", role: "초등부/홈페이지", email: "woom0519@gmail.com", photo: "https://cdn.imweb.me/thumbnail/20251203/0e7a7e325c359.jpg" },
  { name: "김광은 전도사", role: "예배위원회(찬양)/아름다운백성 찬양팀", email: "jacob_1010@naver.com", photo: "https://cdn.imweb.me/thumbnail/20251207/3f4b80e56f328.jpg" },
  { name: "장휘은 전도사", role: "청년부 공동사역 (인턴)", email: "onsarang2000@naver.com", photo: "https://cdn.imweb.me/thumbnail/20251207/ad41753cc75ec.jpg" },
  { name: "주찬영 전도사", role: "교육부 공동사역 (인턴)", email: "jooyona12@naver.com", photo: "https://cdn.imweb.me/thumbnail/20251219/938519928d542.jpg" },
];

function PersonCard({ person }: { person: Person }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#f0ede8] mb-3">
        <Image
          src={person.photo}
          alt={person.name}
          fill
          className="object-cover object-top"
          unoptimized
        />
      </div>
      <p className="text-[0.92rem] font-bold text-[#222] tracking-[-0.02em]">{person.name}</p>
      <p className="text-[0.75rem] text-[#888] leading-[1.5] tracking-[-0.01em] mt-1 px-1">{person.role}</p>
      {person.email && (
        <a href={`mailto:${person.email}`} className="text-[0.7rem] text-[#294a3a]/60 hover:text-[#294a3a] mt-1 transition-colors">
          {person.email}
        </a>
      )}
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
          <Image
            src="https://cdn.imweb.me/thumbnail/20240419/2f79fc0e8fe29.jpg"
            alt="교회소개"
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
            <div className="mb-12 lg:mb-16">
              <p className="text-[#c69d6c] text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-3">Our Team</p>
              <h2 className="text-[1.8rem] lg:text-[2.4rem] font-bold text-[#222] tracking-[-0.04em]">섬기는 사람들</h2>
            </div>

            {/* 담임목사 */}
            <div className="mb-16">
              <h3 className="text-[0.78rem] font-semibold text-[#999] tracking-[0.1em] uppercase mb-8 pb-3 border-b border-[#eee]">담임목사</h3>
              <div className="flex justify-center lg:justify-start">
                <div className="w-[180px]">
                  <PersonCard person={headPastor} />
                </div>
              </div>
            </div>

            {/* 목사 */}
            <div className="mb-16">
              <h3 className="text-[0.78rem] font-semibold text-[#999] tracking-[0.1em] uppercase mb-8 pb-3 border-b border-[#eee]">목사 / 협동목사</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-6">
                {pastors.map((p) => <PersonCard key={p.email} person={p} />)}
              </div>
            </div>

            {/* 전도사 */}
            <div>
              <h3 className="text-[0.78rem] font-semibold text-[#999] tracking-[0.1em] uppercase mb-8 pb-3 border-b border-[#eee]">강도사 / 전도사</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-6">
                {evangelists.map((p) => <PersonCard key={p.email} person={p} />)}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
