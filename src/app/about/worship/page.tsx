import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubNav from "../_components/SubNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "예배시간 | 교회소개 | 강남교회",
  description: "강남교회 주일예배, 수요예배, 금요기도회, 새벽기도회, 교회학교 예배 시간 안내입니다.",
};

export default function WorshipPage() {
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

        {/* 장년 예배 */}
        <section className="py-[5rem] lg:py-[7rem] bg-white">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            <div className="mb-12 lg:mb-16">
              <p className="text-[#c69d6c] text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-3">Worship Schedule</p>
              <h2 className="text-[1.8rem] lg:text-[2.4rem] font-bold text-[#222] tracking-[-0.04em] leading-[1.3]">예배시간 안내</h2>
            </div>

            {/* 장년 예배 */}
            <div className="mb-16">
              <h3 className="text-[0.78rem] font-semibold text-[#999] tracking-[0.1em] uppercase mb-6 border-b border-[#eee] pb-4">
                장년 예배
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    title: "주일예배",
                    times: ["1부 오전 8:00", "2부 오전 10:00", "3부 오후 12:00", "4부 오후 2:00 (청년)", "5부 오후 4:00 (청년)"],
                  },
                  {
                    title: "수요예배",
                    times: ["1부 오전 11:00", "2부 오후 7:00"],
                  },
                  {
                    title: "금요기도회",
                    times: ["오후 8:00"],
                  },
                  {
                    title: "새벽기도회",
                    times: ["오전 5:30 (월–토)"],
                  },
                ].map((s) => (
                  <div key={s.title} className="border border-[#eee] p-6 bg-white">
                    <h4 className="text-[0.8rem] font-semibold text-[#c69d6c] tracking-[-0.01em] mb-4 pb-3 border-b border-[#f0f0f0]">
                      {s.title}
                    </h4>
                    <div className="space-y-2">
                      {s.times.map((t) => (
                        <p key={t} className="text-[0.92rem] font-semibold text-[#222] tracking-[-0.02em]">{t}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 교회학교 */}
            <div className="mb-16">
              <h3 className="text-[0.78rem] font-semibold text-[#999] tracking-[0.1em] uppercase mb-6 border-b border-[#eee] pb-4">
                교회학교 예배 (주일 오전 10:00)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-[0.88rem]">
                  <thead>
                    <tr className="bg-[#294a3a] text-white">
                      <th className="text-left px-5 py-3 font-semibold tracking-[-0.02em]">부서</th>
                      <th className="text-left px-5 py-3 font-semibold tracking-[-0.02em]">대상</th>
                      <th className="text-left px-5 py-3 font-semibold tracking-[-0.02em]">시간 / 장소</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { dept: "영아부", target: "0–3세", info: "오전 10:00 / 3-201호" },
                      { dept: "유아부", target: "4–5세", info: "오전 10:00 / 본관 106호" },
                      { dept: "유치부", target: "6–7세", info: "오전 10:00 / 3-301호" },
                      { dept: "유년부", target: "초등 1–2학년", info: "오전 10:00 / 2-205호" },
                      { dept: "아동부", target: "초등 3–4학년", info: "오전 10:00 / 2-203호" },
                      { dept: "초등부", target: "초등 5–6학년", info: "오전 10:00 / 3-B101호" },
                    ].map((r, i) => (
                      <tr key={r.dept} className={i % 2 === 0 ? "bg-white" : "bg-[#f9f9f7]"}>
                        <td className="px-5 py-3 font-medium text-[#222]">{r.dept}</td>
                        <td className="px-5 py-3 text-[#666]">{r.target}</td>
                        <td className="px-5 py-3 text-[#666]">{r.info}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 부서 예배 */}
            <div>
              <h3 className="text-[0.78rem] font-semibold text-[#999] tracking-[0.1em] uppercase mb-6 border-b border-[#eee] pb-4">
                부서 예배
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: "청장년부",
                    items: [
                      "매주 주일 오후 1:40 / 본관 2층 소예배실",
                      "매월 3,4주 주일 오후 1:30 / 3교육관 지하1층",
                    ],
                  },
                  {
                    title: "사랑부 (20세 미만 장애)",
                    items: ["주일 오후 12:00 / 제3교육관 202호"],
                  },
                  {
                    title: "다사랑부 (20–35세 장애)",
                    items: ["주일 오후 2:00 / 본관 B1 다누리홀"],
                  },
                  {
                    title: "밀알부 (36세 이상 장애)",
                    items: ["주일 오전 11:30 / 본관 B1 다누리홀"],
                  },
                ].map((s) => (
                  <div key={s.title} className="border border-[#eee] p-5">
                    <h4 className="text-[0.88rem] font-bold text-[#294a3a] mb-3">{s.title}</h4>
                    {s.items.map((item) => (
                      <p key={item} className="text-[0.84rem] text-[#666] leading-[1.7]">{item}</p>
                    ))}
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
