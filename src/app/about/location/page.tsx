import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubNav from "../_components/SubNav";
import AboutHero from "../_components/AboutHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "오시는길 | 교회소개 | 강남교회",
  description: "강남교회 본당(서울시 동작구 만양로 76)과 양평수양관 오시는 길 안내입니다.",
};

export default function LocationPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white flex flex-col">
        <AboutHero pageName="오시는길" />
        <SubNav />

        {/* 본당 */}
        <section className="py-[5rem] lg:py-[7rem] bg-white">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            <div className="mb-12">
              <p className="text-[#c69d6c] text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-3">Location</p>
              <h2 className="text-[1.8rem] lg:text-[2.4rem] font-bold text-[#222] tracking-[-0.04em]">오시는 길</h2>
            </div>

            {/* 강남교회 본당 */}
            <div className="mb-16">
              <h3 className="text-[1rem] font-bold text-[#222] tracking-[-0.03em] mb-6 pb-4 border-b border-[#eee]">강남교회 본당</h3>
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:flex-1 min-h-[320px] lg:min-h-[420px] overflow-hidden">
                  <iframe
                    src="https://map.kakao.com/link/map/강남교회,37.507100,126.942800/embed"
                    className="w-full min-h-[320px] lg:min-h-[420px] border-0"
                    loading="lazy"
                    title="강남교회 본당 지도"
                    style={{ height: "420px" }}
                  />
                </div>
                <div className="lg:w-[360px] space-y-6">
                  <div>
                    <h4 className="text-[0.75rem] font-semibold text-[#999] tracking-[0.1em] uppercase mb-2">주소</h4>
                    <p className="text-[1rem] font-bold text-[#222]">서울시 동작구 만양로 76</p>
                    <p className="text-[0.84rem] text-[#777] mt-1">(노량진동)</p>
                  </div>
                  <div>
                    <h4 className="text-[0.75rem] font-semibold text-[#999] tracking-[0.1em] uppercase mb-2">연락처</h4>
                    <p className="text-[0.9rem] text-[#444]">Tel. <a href="tel:02-814-7606" className="hover:text-[#294a3a] transition-colors">02-814-7606</a></p>
                    <p className="text-[0.9rem] text-[#444]">Email. <a href="mailto:knpc91@hanmail.net" className="hover:text-[#294a3a] transition-colors">knpc91@hanmail.net</a></p>
                  </div>

                  <div>
                    <h4 className="text-[0.75rem] font-semibold text-[#999] tracking-[0.1em] uppercase mb-3">지하철 이용</h4>
                    <div className="space-y-1.5 text-[0.84rem] text-[#555] leading-[1.6]">
                      <p>· 1호선 노량진역 하차 — 도보 5분</p>
                      <p>· 7호선 상도역 하차 3번출구 — 마을버스 1번 이용</p>
                      <p>· 9호선 노량진역 하차 3번출구</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[0.75rem] font-semibold text-[#999] tracking-[0.1em] uppercase mb-3">버스 이용</h4>
                    <div className="space-y-1.5 text-[0.84rem] text-[#555] leading-[1.6]">
                      <p>· 노량진역/사육신묘 하차: 150, 152, 360, 361, 462, 500, 504, 507, 605, 641, 751, 752, 5516, 5517, 5531, 5535, 5536, 6211, 6411, 9408</p>
                      <p>· 상도2동 대림아파트 하차 후 마을버스 1번 환승: 641, 650</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[0.75rem] font-semibold text-[#999] tracking-[0.1em] uppercase mb-3">주차 안내</h4>
                    <div className="space-y-1.5 text-[0.84rem] text-[#555] leading-[1.6]">
                      <p>· 방문 시 대중교통 이용을 부탁드립니다.</p>
                      <p>· 장시간 주차는 어바니엘한강 주차장을 이용해 주세요.</p>
                      <p>· 도로변 주차는 단속되니 지정된 주차장을 이용해 주세요.</p>
                      <p>· 차량부 차량등록 후 스티커 부착 차량만 교회 주차장 이용 가능합니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 양평수양관 */}
            <div>
              <h3 className="text-[1rem] font-bold text-[#222] tracking-[-0.03em] mb-6 pb-4 border-b border-[#eee]">강남 양평수양관</h3>
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:flex-1 overflow-hidden">
                  <iframe
                    src="https://map.kakao.com/link/map/강남수양관,37.592500,127.682500/embed"
                    className="w-full border-0"
                    loading="lazy"
                    title="양평수양관 지도"
                    style={{ height: "320px" }}
                  />
                </div>
                <div className="lg:w-[360px] space-y-6">
                  <div>
                    <h4 className="text-[0.75rem] font-semibold text-[#999] tracking-[0.1em] uppercase mb-2">주소</h4>
                    <p className="text-[0.95rem] font-bold text-[#222]">경기도 양평군 청운면 삼백골길 114</p>
                    <p className="text-[0.84rem] text-[#777] mt-1">(도원리 603)</p>
                  </div>
                  <div>
                    <h4 className="text-[0.75rem] font-semibold text-[#999] tracking-[0.1em] uppercase mb-2">연락처</h4>
                    <p className="text-[0.9rem] text-[#444]">Tel/Fax. <a href="tel:031-771-4869" className="hover:text-[#294a3a] transition-colors">031-771-4869</a></p>
                  </div>
                  <div>
                    <h4 className="text-[0.75rem] font-semibold text-[#999] tracking-[0.1em] uppercase mb-3">지하철 이용</h4>
                    <p className="text-[0.84rem] text-[#555] leading-[1.6]">· 1호선 용문역 하차 — 용문축협 정류장 이동(도보 8분)</p>
                  </div>
                  <div>
                    <h4 className="text-[0.75rem] font-semibold text-[#999] tracking-[0.1em] uppercase mb-3">버스 이용</h4>
                    <p className="text-[0.84rem] text-[#555] leading-[1.6]">· 일반2-4 승차 → 용두리터미널 하차 → 강남수양관 도보 17분</p>
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
