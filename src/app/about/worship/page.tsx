import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubNav from "../_components/SubNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "예배시간 | 교회소개 | 강남교회",
  description: "강남교회 주일예배, 수요예배, 금요기도회, 새벽기도회, 교회학교 예배 시간 안내입니다.",
};

const mainServices = [
  {
    title: "주일예배",
    img: "https://cdn.imweb.me/thumbnail/20240419/f63208cf22ca2.jpg",
    times: ["1부 오전 8:00", "2부 오전 10:00", "3부 오후 12:00", "4부 오후 2:00 (청년)", "5부 오후 4:00 (청년)"],
  },
  {
    title: "수요예배",
    img: "https://cdn.imweb.me/thumbnail/20240419/f88b3ad4ddcac.jpg",
    times: ["1부 오전 11:00", "2부 오후 7:00"],
  },
  {
    title: "금요기도회",
    img: "https://cdn.imweb.me/thumbnail/20240419/edfe28208769b.jpg",
    times: ["오후 8:00"],
  },
  {
    title: "새벽기도회",
    img: "https://cdn.imweb.me/thumbnail/20240419/b15fe8179a05a.jpg",
    times: ["오전 5:30 (월–토)"],
  },
];

const schoolServices = [
  { dept: "영아부", target: "0–3세", time: "오전 10:00", place: "3-201호" },
  { dept: "유아부", target: "4–5세", time: "오전 10:00", place: "본관 106호" },
  { dept: "유치부", target: "6–7세", time: "오전 10:00", place: "3-301호" },
  { dept: "유년부", target: "초등 1–2학년", time: "오전 10:00", place: "2-205호" },
  { dept: "아동부", target: "초등 3–4학년", time: "오전 10:00", place: "2-203호" },
  { dept: "초등부", target: "초등 5–6학년", time: "오전 10:00", place: "3-B101호" },
  { dept: "중등부", target: "중학교", time: "오전 10:00", place: "3-B201호" },
  { dept: "고등부", target: "고등학교", time: "오전 10:00", place: "본관 소예배실" },
];

const deptServices = [
  { dept: "청장년부", time: "주일 오후 1:40", place: "본관 2층 소예배실", note: "매월 3,4주 주일 오후 1:30 / 3교육관 지하1층" },
  { dept: "사랑부", time: "주일 오후 12:00", place: "제3교육관 202호", note: "20세 미만 장애인 아동" },
  { dept: "다사랑부", time: "주일 오후 2:00", place: "본관 B1 다누리홀", note: "20–35세 이하 장애인 청년" },
  { dept: "밀알부", time: "주일 오전 11:30", place: "본관 B1 다누리홀", note: "36세 이상 장애인 장년" },
];

export default function WorshipPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white flex flex-col">
        {/* 히어로 */}
        <section className="relative h-[240px] lg:h-[320px] flex items-end pb-8 lg:pb-12">
          <Image
            src="https://cdn.imweb.me/thumbnail/20240419/36940a8572ecc.jpg"
            alt="예배시간"
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

        {/* 장년 예배 */}
        <section className="py-[5rem] lg:py-[7rem] bg-white">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            <div className="mb-12">
              <p className="text-[#c69d6c] text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-3">Worship</p>
              <h2 className="text-[1.8rem] lg:text-[2.4rem] font-bold text-[#222] tracking-[-0.04em]">장년 예배안내</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {mainServices.map((s) => (
                <div key={s.title} className="flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden mb-4">
                    <Image src={s.img} alt={s.title} fill className="object-cover" unoptimized />
                  </div>
                  <h3 className="text-[0.88rem] font-bold text-[#294a3a] mb-3">{s.title}</h3>
                  <div className="space-y-1.5">
                    {s.times.map((t) => (
                      <p key={t} className="text-[0.92rem] font-semibold text-[#222] tracking-[-0.02em]">{t}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 교회학교 */}
        <section className="py-[4rem] lg:py-[6rem] bg-[#f9f9f7]">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            <div className="mb-10">
              <h2 className="text-[1.4rem] lg:text-[1.8rem] font-bold text-[#222] tracking-[-0.04em]">교회학교 예배안내</h2>
              <p className="mt-2 text-[0.85rem] text-[#888]">주일 오전 10:00 각 부서별 동시 진행</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[0.88rem] min-w-[500px]">
                <thead>
                  <tr className="bg-[#294a3a] text-white">
                    <th className="text-left px-5 py-3 font-semibold">부서</th>
                    <th className="text-left px-5 py-3 font-semibold">대상</th>
                    <th className="text-left px-5 py-3 font-semibold">시간</th>
                    <th className="text-left px-5 py-3 font-semibold">장소</th>
                  </tr>
                </thead>
                <tbody>
                  {schoolServices.map((r, i) => (
                    <tr key={r.dept} className={i % 2 === 0 ? "bg-white" : "bg-[#f5f5f3]"}>
                      <td className="px-5 py-3 font-semibold text-[#222]">{r.dept}</td>
                      <td className="px-5 py-3 text-[#666]">{r.target}</td>
                      <td className="px-5 py-3 text-[#666]">{r.time}</td>
                      <td className="px-5 py-3 text-[#666]">{r.place}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 부서 예배 */}
        <section className="py-[4rem] lg:py-[6rem] bg-white">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            <div className="mb-10">
              <h2 className="text-[1.4rem] lg:text-[1.8rem] font-bold text-[#222] tracking-[-0.04em]">부서 예배안내</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {deptServices.map((s) => (
                <div key={s.dept} className="border border-[#eee] p-6">
                  <h3 className="text-[0.92rem] font-bold text-[#294a3a] mb-3">{s.dept}</h3>
                  <p className="text-[0.88rem] font-semibold text-[#222]">{s.time}</p>
                  <p className="text-[0.84rem] text-[#777] mt-1">{s.place}</p>
                  <p className="text-[0.78rem] text-[#aaa] mt-2 border-t border-[#f0f0f0] pt-2">{s.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
