"use client";

import Image from "next/image";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubNav from "../_components/SubNav";
import AboutHero from "../_components/AboutHero";

type Person = { name: string; role: string; email: string; photo: string };

const headPastor: Person = {
  name: "고문산 목사",
  role: "담임목사",
  email: "",
  photo: "/images/staff/head-pastor.jpg",
};

const pastors: Person[] = [
  { name: "서강일 목사", role: "행정/예배위원회(정)/청장년부/제자훈련원(정)/교역자·직원 멘토링/가정사역원", email: "seo82good@gmail.com", photo: "/images/staff/seo-gang-il.jpg" },
  { name: "황봉규 목사", role: "아동부/디렉터/기도학교(정)/부모·교사교육/고공방", email: "saladin220@naver.com", photo: "/images/staff/hwang-bong-gyu.jpg" },
  { name: "김세현 목사", role: "다솔(청년 1부)/디렉터/70인전도대", email: "joyksh1987@naver.com", photo: "/images/staff/kim-se-hyeon.jpg" },
  { name: "김해광 목사", role: "마을위원장/1,2마을/새가족부/장년교육", email: "mclight@hanmail.net", photo: "/images/staff/kim-hae-gwang.jpg" },
  { name: "김부림 목사", role: "밀알부, 다사랑부/전도폭발(시니어)", email: "boolimkim@naver.com", photo: "/images/staff/kim-bu-rim.jpg" },
  { name: "이홍우 목사", role: "다드림(청년 3부)/디렉터/홈페이지(정)/비전강남", email: "thome@naver.com", photo: "/images/staff/lee-hong-u.jpg" },
  { name: "박범수 목사", role: "5,6마을/새생명축제(정)/예배위원회(기획)", email: "elpagio@naver.com", photo: "/images/staff/park-beom-su.jpg" },
  { name: "김기락 목사", role: "3,4마을/사랑방 교안/전도폭발(장년)/피스메이커(정)", email: "stand-up01@hanmail.net", photo: "/images/staff/kim-gi-rak.jpg" },
  { name: "이정현 목사", role: "다니엘(청년2부)/세계선교위원회(정)", email: "jinsimura@naver.com", photo: "/images/staff/lee-jeong-hyeon.jpg" },
  { name: "김응열 목사", role: "7,8마을/소망부, 경로대학, 성경파노라마(정)", email: "powchist@naver.com", photo: "/images/staff/kim-eung-yeol.jpg" },
];

const associatePastor: Person = {
  name: "김광열 목사",
  role: "총신대학교 신학대학원 교수",
  email: "kykim@hanmail.net",
  photo: "/images/staff/kim-gwang-yeol.jpg",
};

const deacons: Person[] = [
  { name: "이대성 강도사", role: "중등부/세계선교위원회(부)/성경통신", email: "eotjd1097@naver.com", photo: "/images/staff/lee-dae-seong.jpg" },
];

const villageEvangelists: Person[] = [
  { name: "유미정 전도사", role: "3,4마을/마을위원회(부)", email: "hannayu@hanmail.net", photo: "/images/staff/yoo-mi-jeong.jpg" },
  { name: "김주경 전도사", role: "5,6마을/영접팀/새생명축제(부)", email: "jookyung858@hanmail.net", photo: "/images/staff/kim-ju-gyeong.jpg" },
  { name: "장혜경 전도사", role: "1,2마을/제자훈련원(부)", email: "amosjang@hanmail.net", photo: "/images/staff/jang-hye-gyeong.png" },
  { name: "황라헬 전도사", role: "7,8마을/기도학교(부)", email: "rachel5069@naver.com", photo: "/images/staff/hwang-ra-hel.jpg" },
];

const educationEvangelists: Person[] = [
  { name: "김경성 전도사", role: "영아부/디렉터/아기학교/태아부모학교/구립어린이집", email: "kkss2005@daum.net", photo: "/images/staff/kim-gyeong-seong.jpg" },
  { name: "류세현 전도사", role: "유년부/피스메이커(부)", email: "troishyun@gmail.com", photo: "/images/staff/ryu-se-hyeon.jpg" },
  { name: "채남주 전도사", role: "유치부", email: "coskawn05@naver.com", photo: "/images/staff/chae-nam-ju.jpg" },
  { name: "박대연 전도사", role: "청년2부", email: "eodus4044@gmail.com", photo: "/images/staff/park-dae-yeon.jpg" },
  { name: "서반석 전도사", role: "사랑부/사랑학교/방송실", email: "luvjesus0123@naver.com", photo: "/images/staff/seo-ban-seok.jpg" },
  { name: "박성빈 전도사", role: "청년1부/생태계(부)", email: "lovebin300@naver.com", photo: "/images/staff/park-seong-bin.jpg" },
  { name: "양준수 전도사", role: "고등부/성경파노라마(부)", email: "didwnstn5593@naver.com", photo: "/images/staff/yang-jun-su.jpg" },
  { name: "정소망 전도사", role: "유아부", email: "wjdthakd1006@naver.com", photo: "/images/staff/jeong-so-mang.jpg" },
  { name: "김지수 전도사", role: "예배위원회(찬양)/찬양사역(시냇가에 심은 나무, 셀라)", email: "wltn2305@naver.com", photo: "/images/staff/kim-ji-su.png" },
  { name: "김준성 전도사", role: "초등부/홈페이지(부)", email: "woom0519@gmail.com", photo: "/images/staff/kim-jun-seong.jpg" },
  { name: "김광은 전도사", role: "예배위원회(찬양)/아름다운백성 찬양팀", email: "jacob_1010@naver.com", photo: "/images/staff/kim-gwang-eun.jpg" },
];

const internEvangelists: Person[] = [
  { name: "장휘은 전도사", role: "청년부 공동사역", email: "onsarang2000@naver.com", photo: "/images/staff/jang-hwi-eun.jpg" },
  { name: "주찬영 전도사", role: "교육부 공동사역", email: "jooyona12@naver.com", photo: "/images/staff/ju-chan-yeong.jpg" },
];

const eldersEmeritusKorea: Person[] = [
  { name: "김도식 장로", role: "", email: "", photo: "/images/elders/김도식.jpg" },
  { name: "임석규 장로", role: "", email: "", photo: "/images/elders/임석규.jpg" },
  { name: "심현식 장로", role: "", email: "", photo: "/images/elders/심현식.jpg" },
  { name: "남차원 장로", role: "", email: "", photo: "/images/elders/남차원.jpg" },
  { name: "안성철 장로", role: "", email: "", photo: "/images/elders/안성철.jpg" },
];

const eldersRetired: Person[] = [
  { name: "이균상 장로", role: "", email: "", photo: "/images/elders/이균상.jpg" },
  { name: "박기영 장로", role: "", email: "", photo: "/images/elders/박기영.jpg" },
  { name: "김증석 장로", role: "", email: "", photo: "/images/elders/김증석.jpg" },
  { name: "심갑식 장로", role: "", email: "", photo: "/images/elders/심갑식.jpg" },
  { name: "홍성길 장로", role: "", email: "", photo: "/images/elders/홍성길.jpg" },
  { name: "임병관 장로", role: "", email: "", photo: "/images/elders/임병관.jpg" },
  { name: "오중수 장로", role: "", email: "", photo: "/images/elders/오중수.jpg" },
  { name: "이덕근 장로", role: "", email: "", photo: "/images/elders/이덕근.jpg" },
  { name: "박기선 장로", role: "", email: "", photo: "/images/elders/박기선.jpg" },
  { name: "이세열 장로", role: "", email: "", photo: "/images/elders/이세열.jpg" },
  { name: "신창남 장로", role: "", email: "", photo: "/images/elders/신창남.jpg" },
  { name: "우성룡 장로", role: "", email: "", photo: "/images/elders/우성룡.jpg" },
  { name: "오해정 장로", role: "", email: "", photo: "/images/elders/오해정.jpg" },
  { name: "김정규 장로", role: "", email: "", photo: "/images/elders/김정규.jpg" },
  { name: "김광철 장로", role: "", email: "", photo: "/images/elders/김광철.jpg" },
  { name: "윤갑식 장로", role: "", email: "", photo: "/images/elders/윤갑식.jpg" },
  { name: "최일규 장로", role: "", email: "", photo: "/images/elders/최일규.jpg" },
  { name: "장우택 장로", role: "", email: "", photo: "/images/elders/장우택.jpg" },
  { name: "이정근 장로", role: "", email: "", photo: "/images/elders/이정근.jpg" },
  { name: "최동진 장로", role: "", email: "", photo: "/images/elders/최동진.jpg" },
  { name: "김규명 장로", role: "", email: "", photo: "/images/elders/김규명.jpg" },
  { name: "이계원 장로", role: "", email: "", photo: "/images/elders/이계원.jpg" },
  { name: "정상문 장로", role: "", email: "", photo: "/images/elders/정상문.jpg" },
  { name: "이희성 장로", role: "", email: "", photo: "/images/elders/이희성.jpg" },
  { name: "박영철 장로", role: "", email: "", photo: "/images/elders/박영철.jpg" },
  { name: "박종우 장로", role: "", email: "", photo: "/images/elders/박종우.jpg" },
  { name: "한광희 장로", role: "", email: "", photo: "/images/elders/한광희.jpg" },
  { name: "김신원 장로", role: "", email: "", photo: "/images/elders/김신원.jpg" },
  { name: "이기석 장로", role: "", email: "", photo: "/images/elders/이기석.jpg" },
  { name: "서우덕 장로", role: "", email: "", photo: "/images/elders/서우덕.jpg" },
  { name: "박석주 장로", role: "", email: "", photo: "/images/elders/박석주.jpg" },
];

const eldersActive: Person[] = [
  { name: "유병선 장로", role: "", email: "", photo: "/images/elders/유병선.jpg" },
  { name: "노학주 장로", role: "", email: "", photo: "/images/elders/노학주.jpg" },
  { name: "유창수 장로", role: "", email: "", photo: "/images/elders/유창수.jpg" },
  { name: "하덕상 장로", role: "", email: "", photo: "/images/elders/하덕상.jpg" },
  { name: "이영수 장로", role: "", email: "", photo: "/images/elders/이영수.jpg" },
  { name: "정용근 장로", role: "", email: "", photo: "/images/elders/정용근.jpg" },
  { name: "이용석 장로", role: "", email: "", photo: "/images/elders/이용석.jpg" },
  { name: "김대현 장로", role: "", email: "", photo: "/images/elders/김대현.jpg" },
  { name: "윤경현 장로", role: "", email: "", photo: "/images/elders/윤경현.jpg" },
  { name: "곽병호 장로", role: "", email: "", photo: "/images/elders/곽병호.jpg" },
  { name: "김명수 장로", role: "", email: "", photo: "/images/elders/김명수.jpg" },
  { name: "강인원 장로", role: "", email: "", photo: "/images/elders/강인원.jpg" },
  { name: "김용인 장로", role: "", email: "", photo: "/images/elders/김용인.jpg" },
  { name: "조문현 장로", role: "", email: "", photo: "/images/elders/조문현.jpg" },
  { name: "박종식 장로", role: "", email: "", photo: "/images/elders/박종식.jpg" },
  { name: "홍문의 장로", role: "", email: "", photo: "/images/elders/홍문의.jpg" },
  { name: "정태범 장로", role: "", email: "", photo: "/images/elders/정태범.jpg" },
  { name: "심재천 장로", role: "", email: "", photo: "/images/elders/심재천.jpg" },
  { name: "안성환 장로", role: "", email: "", photo: "/images/elders/안성환.jpg" },
  { name: "신용원 장로", role: "", email: "", photo: "/images/elders/신용원.jpg" },
  { name: "신경호 장로", role: "", email: "", photo: "/images/elders/신경호.jpg" },
  { name: "이원재 장로", role: "", email: "", photo: "/images/elders/이원재.jpg" },
  { name: "박호성 장로", role: "", email: "", photo: "/images/elders/박호성.jpg" },
  { name: "허장민 장로", role: "", email: "", photo: "/images/elders/허장민.jpg" },
  { name: "유현국 장로", role: "", email: "", photo: "/images/elders/유현국.jpg" },
  { name: "박광민 장로", role: "", email: "", photo: "/images/elders/박광민.jpg" },
  { name: "김성은 장로", role: "", email: "", photo: "/images/elders/김성은.jpg" },
  { name: "성일현 장로", role: "", email: "", photo: "/images/elders/성일현.jpg" },
  { name: "박승일 장로", role: "", email: "", photo: "/images/elders/박승일.jpg" },
  { name: "정국창 장로", role: "", email: "", photo: "/images/elders/정국창.jpg" },
  { name: "김지태 장로", role: "", email: "", photo: "/images/elders/김지태.jpg" },
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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[0.78rem] font-semibold text-[#999] tracking-[0.1em] uppercase mb-8 pb-3 border-b border-[#eee]">
      {children}
    </h3>
  );
}

const tabs = ["교역자", "장로", "직원"] as const;
type Tab = (typeof tabs)[number];

export default function StaffPage() {
  const [activeTab, setActiveTab] = useState<Tab>("교역자");

  return (
    <>
      <Header />
      <main className="flex-1 bg-white flex flex-col">
        <AboutHero pageName="섬기는사람들" />
        <SubNav />

        <section className="py-[5rem] lg:py-[7rem] bg-white">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            {/* 페이지 타이틀 */}
            <div className="text-center mb-10">
              <h2 className="text-[1.8rem] lg:text-[2.4rem] font-bold text-[#222] tracking-[-0.04em]">섬기는 사람들</h2>
              <div className="flex items-center gap-0 mt-4">
                <div className="flex-1 h-px bg-[#eee]" />
                <div className="w-2 h-2 rounded-full bg-[#c69d6c] mx-3" />
                <div className="flex-1 h-px bg-[#eee]" />
              </div>
            </div>

            {/* 탭 */}
            <div className="flex justify-center gap-2 mb-12">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 text-[0.88rem] font-medium tracking-[-0.02em] rounded-full border transition-colors duration-200 cursor-pointer ${
                    activeTab === tab
                      ? "border-[#294a3a] text-[#294a3a] bg-white"
                      : "border-transparent text-[#999] hover:text-[#555]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* 교역자 탭 */}
            {activeTab === "교역자" && (
              <>
                <div className="mb-16">
                  <SectionTitle>담임목사</SectionTitle>
                  <div className="flex justify-center lg:justify-start">
                    <div className="w-[180px]">
                      <PersonCard person={headPastor} />
                    </div>
                  </div>
                </div>

                <div className="mb-16">
                  <SectionTitle>목사</SectionTitle>
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-6">
                    {pastors.map((p) => <PersonCard key={p.email} person={p} />)}
                  </div>
                </div>

                <div className="mb-16">
                  <SectionTitle>협동목사</SectionTitle>
                  <div className="flex justify-start">
                    <div className="w-[180px]">
                      <PersonCard person={associatePastor} />
                    </div>
                  </div>
                </div>

                <div className="mb-16">
                  <SectionTitle>강도사</SectionTitle>
                  <div className="flex justify-start">
                    <div className="w-[180px]">
                      <PersonCard person={deacons[0]} />
                    </div>
                  </div>
                </div>

                <div className="mb-16">
                  <SectionTitle>마을전도사</SectionTitle>
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-6">
                    {villageEvangelists.map((p) => <PersonCard key={p.email} person={p} />)}
                  </div>
                </div>

                <div className="mb-16">
                  <SectionTitle>교육전도사</SectionTitle>
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-6">
                    {educationEvangelists.map((p) => <PersonCard key={p.email} person={p} />)}
                  </div>
                </div>

                <div>
                  <SectionTitle>인턴전도사</SectionTitle>
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-6">
                    {internEvangelists.map((p) => <PersonCard key={p.email} person={p} />)}
                  </div>
                </div>
              </>
            )}

            {/* 장로 탭 */}
            {activeTab === "장로" && (
              <>
                <div className="mb-16">
                  <SectionTitle>원로장로</SectionTitle>
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-6">
                    {eldersEmeritusKorea.map((p) => <PersonCard key={p.name} person={p} />)}
                  </div>
                </div>
                <div className="mb-16">
                  <SectionTitle>은퇴장로</SectionTitle>
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-6">
                    {eldersRetired.map((p) => <PersonCard key={p.name} person={p} />)}
                  </div>
                </div>
                <div>
                  <SectionTitle>시무장로</SectionTitle>
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-6">
                    {eldersActive.map((p) => <PersonCard key={p.name} person={p} />)}
                  </div>
                </div>
              </>
            )}

            {/* 직원 탭 */}
            {activeTab === "직원" && (
              <p className="text-center text-[0.88rem] text-[#bbb] py-20">준비 중입니다.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
