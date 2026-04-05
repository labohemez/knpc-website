import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubNav from "../_components/SubNav";
import HistoryTabs from "../_components/HistoryTabs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "교회연혁 | 교회소개 | 강남교회",
  description: "1954년 창립부터 현재까지 강남교회의 발자취를 소개합니다.",
};

export default function HistoryPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white flex flex-col">
        <SubNav />

        <section className="py-[5rem] lg:py-[7rem] bg-white">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            <div className="mb-12 lg:mb-16">
              <p className="text-[#c69d6c] text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-3">History</p>
              <h2 className="text-[1.8rem] lg:text-[2.4rem] font-bold text-[#222] tracking-[-0.04em] leading-[1.3]">교회연혁</h2>
            </div>
            <HistoryTabs />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
