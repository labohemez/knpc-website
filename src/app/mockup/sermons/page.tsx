"use client";

import { useState } from "react";

const mockSermons = [
  { id: "1", title: "소유할 것인가, 소유될 것인가", category: "주일예배", pastor: "서강일 목사", date: "2026.03.29", scripture: "베드로전서 2:9-10", thumb: "https://img.youtube.com/vi/eKtED6_4l3U/hqdefault.jpg" },
  { id: "2", title: "두려움을 이기는 믿음", category: "주일예배", pastor: "황봉규 목사", date: "2026.03.22", scripture: "야고보서 1:2-8", thumb: "https://img.youtube.com/vi/bien0n2o_Mc/hqdefault.jpg" },
  { id: "3", title: "기도하는 자의 복", category: "주일예배", pastor: "최욥 선교사", date: "2026.03.15", scripture: "마태복음 7:7-11", thumb: "https://img.youtube.com/vi/EaDJ61Qgr0k/hqdefault.jpg" },
  { id: "4", title: "부활의 소망으로 살라", category: "주일예배", pastor: "김해광 목사", date: "2026.03.08", scripture: "고린도전서 15:19-28", thumb: "https://img.youtube.com/vi/0RFj2UBQB2Q/hqdefault.jpg" },
  { id: "5", title: "성령 안에서 기도하라", category: "수요예배", pastor: "김광열 목사", date: "2026.03.01", scripture: "에베소서 6:18-20", thumb: "https://img.youtube.com/vi/5U4W7gVgHW8/hqdefault.jpg" },
  { id: "6", title: "시험을 이기는 믿음", category: "주일예배", pastor: "고문산 목사", date: "2026.02.22", scripture: "야고보서 1:12-18", thumb: "https://img.youtube.com/vi/EK_IqXl-mLA/hqdefault.jpg" },
];

const categories = ["전체", "주일예배", "수요예배", "새벽기도회"];

function PlayBtn({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
    </div>
  );
}

/* ═══════════════════════════════════════════
   A — 크림 웜톤
   ═══════════════════════════════════════════ */
function DesignA() {
  const f = mockSermons[0];
  return (
    <div>
      <div className="mb-3 text-[0.7rem] font-bold text-[#294a3a] bg-[#294a3a]/10 inline-block px-3 py-1 rounded-full">개선안 A — 크림 웜톤</div>
      {/* 히어로 */}
      <div className="relative h-[200px] flex items-end pb-6 overflow-hidden bg-[#294a3a]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(" + f.thumb + ")", backgroundSize: "cover", filter: "blur(20px)" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#294a3a] to-[#294a3a]/70" />
        <div className="relative px-6 w-full">
          <p className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-white/40 mb-1">Sermons</p>
          <h1 className="text-[1.6rem] font-bold text-white tracking-[-0.04em]">말씀과 찬양</h1>
        </div>
      </div>

      {/* 최신 설교 */}
      <div className="bg-[#faf8f5] p-5">
        <div className="flex gap-5 items-start">
          <div className="relative w-[280px] aspect-video rounded-lg overflow-hidden shrink-0 shadow-md">
            <img src={f.thumb} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[#294a3a]/80 hover:bg-[#294a3a] transition-colors flex items-center justify-center">
                <PlayBtn className="text-white" />
              </div>
            </div>
          </div>
          <div className="flex-1 py-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c69d6c]" />
              <span className="text-[0.65rem] font-semibold text-[#c69d6c] tracking-[0.1em] uppercase">최신 설교</span>
              <span className="text-[0.65rem] text-[#999] bg-[#f0ede8] px-2 py-0.5 rounded-full">{f.category}</span>
            </div>
            <h2 className="text-[1.3rem] font-bold text-[#222] tracking-[-0.03em] mb-2">{f.title}</h2>
            <p className="text-[0.78rem] text-[#888] mb-1">{f.scripture}</p>
            <p className="text-[0.75rem] text-[#aaa]">{f.pastor} · {f.date}</p>
            <a href="#" className="inline-flex items-center gap-2 mt-4 bg-[#294a3a] text-white px-5 py-2 text-[0.78rem] font-semibold rounded-lg hover:bg-[#1e3a2d] transition-colors">
              <PlayBtn className="text-white w-4 h-4" /> 영상 보기
            </a>
          </div>
        </div>
      </div>

      {/* 카테고리 + 카드 */}
      <div className="bg-[#faf8f5] px-5 pb-6">
        <div className="flex gap-2 mb-5">
          {categories.map((c, i) => (
            <button key={c} className={`px-3.5 py-1.5 text-[0.75rem] font-medium rounded-full transition-colors ${i === 0 ? "bg-[#294a3a] text-white" : "bg-white border border-[#e0dcd6] text-[#888] hover:border-[#294a3a] hover:text-[#294a3a]"}`}>{c}</button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {mockSermons.slice(1, 4).map(s => (
            <div key={s.id} className="bg-white rounded-lg overflow-hidden border border-[#ece8e2] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer">
              <div className="relative aspect-video overflow-hidden">
                <img src={s.thumb} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                  <div className="w-10 h-10 rounded-full bg-[#294a3a]/80 text-white"><PlayBtn className="w-full h-full" /></div>
                </div>
                <span className="absolute top-2 left-2 bg-[#294a3a]/80 text-white text-[0.62rem] font-medium px-2 py-0.5 rounded">{s.category}</span>
              </div>
              <div className="p-3.5">
                <h3 className="text-[0.82rem] font-semibold text-[#222] mb-1 tracking-[-0.02em]">{s.title}</h3>
                <p className="text-[0.7rem] text-[#aaa] mb-2">{s.scripture}</p>
                <div className="flex justify-between pt-2 border-t border-[#f0ede8] text-[0.68rem] text-[#bbb]">
                  <span>{s.pastor}</span><span>{s.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   B — 클린 화이트
   ═══════════════════════════════════════════ */
function DesignB() {
  const f = mockSermons[0];
  return (
    <div>
      <div className="mb-3 text-[0.7rem] font-bold text-blue-600 bg-blue-50 inline-block px-3 py-1 rounded-full">개선안 B — 클린 화이트</div>
      {/* 히어로 */}
      <div className="relative h-[200px] flex items-end pb-6 overflow-hidden">
        <img src={f.thumb} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="relative px-6 w-full">
          <p className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-white/50 mb-1">Sermons</p>
          <h1 className="text-[1.6rem] font-bold text-white tracking-[-0.04em]">말씀과 찬양</h1>
        </div>
      </div>

      {/* 최신 설교 */}
      <div className="bg-white p-5 border-b border-[#f0f0f0]">
        <div className="flex gap-5 items-start">
          <div className="relative w-[280px] aspect-video rounded-xl overflow-hidden shrink-0 shadow-lg">
            <img src={f.thumb} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[56px] h-[40px] bg-red-600 rounded-xl flex items-center justify-center shadow-lg"><PlayBtn className="text-white" /></div>
            </div>
          </div>
          <div className="flex-1 py-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[0.65rem] font-semibold text-[#999] tracking-[0.1em] uppercase">최신 설교</span>
            </div>
            <h2 className="text-[1.3rem] font-bold text-[#111] tracking-[-0.03em] mb-2">{f.title}</h2>
            <p className="text-[0.78rem] text-[#888] mb-1">{f.scripture}</p>
            <p className="text-[0.75rem] text-[#bbb]">{f.pastor} · {f.date}</p>
            <a href="#" className="inline-flex items-center gap-2 mt-4 bg-[#111] text-white px-5 py-2 text-[0.78rem] font-semibold rounded-lg hover:bg-[#333] transition-colors">
              <PlayBtn className="text-white w-4 h-4" /> 영상 보기
            </a>
          </div>
        </div>
      </div>

      {/* 카테고리 + 카드 */}
      <div className="bg-[#f8f8f8] px-5 py-5">
        <div className="flex gap-2 mb-5">
          {categories.map((c, i) => (
            <button key={c} className={`px-3.5 py-1.5 text-[0.75rem] font-medium rounded-full transition-colors ${i === 0 ? "bg-[#111] text-white" : "bg-white border border-[#e5e5e5] text-[#777] hover:border-[#111] hover:text-[#111]"}`}>{c}</button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {mockSermons.slice(1, 4).map(s => (
            <div key={s.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
              <div className="relative aspect-video overflow-hidden">
                <img src={s.thumb} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-[48px] h-[34px] bg-red-600 rounded-xl text-white shadow-lg"><PlayBtn className="w-full h-full" /></div>
                </div>
              </div>
              <div className="p-4">
                <span className="text-[0.62rem] font-medium text-[#999] bg-[#f5f5f5] px-2 py-0.5 rounded">{s.category}</span>
                <h3 className="text-[0.85rem] font-semibold text-[#111] mt-2 mb-1 tracking-[-0.02em]">{s.title}</h3>
                <p className="text-[0.72rem] text-[#bbb] mb-2">{s.scripture}</p>
                <div className="flex justify-between text-[0.68rem] text-[#ccc]">
                  <span>{s.pastor}</span><span>{s.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   C — 딥그린 엘레강트
   ═══════════════════════════════════════════ */
function DesignC() {
  const f = mockSermons[0];
  return (
    <div>
      <div className="mb-3 text-[0.7rem] font-bold text-emerald-700 bg-emerald-50 inline-block px-3 py-1 rounded-full">개선안 C — 딥그린 엘레강트</div>
      {/* 히어로 */}
      <div className="relative h-[200px] flex items-end pb-6 overflow-hidden bg-[#294a3a]">
        <div className="absolute inset-0 bg-[url('/images/hero-1.jpg')] bg-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#294a3a] to-[#294a3a]/60" />
        <div className="relative px-6 w-full">
          <p className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-[#c69d6c] mb-1">Sermons</p>
          <h1 className="text-[1.6rem] font-bold text-white tracking-[-0.04em]">말씀과 찬양</h1>
        </div>
      </div>

      {/* 최신 설교 — 풀 와이드 배경 */}
      <div className="relative overflow-hidden">
        <img src={f.thumb} alt="" className="absolute inset-0 w-full h-full object-cover opacity-8" style={{ filter: "blur(40px)" }} />
        <div className="absolute inset-0 bg-white/95" />
        <div className="relative p-5 flex gap-5 items-start">
          <div className="relative w-[280px] aspect-video rounded overflow-hidden shrink-0 border border-[#294a3a]/10">
            <img src={f.thumb} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[#294a3a] text-white hover:bg-[#1e3a2d] transition-colors"><PlayBtn className="w-full h-full" /></div>
            </div>
          </div>
          <div className="flex-1 py-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[0.65rem] font-bold text-[#c69d6c] tracking-[0.1em] uppercase">최신 설교</span>
              <span className="w-px h-3 bg-[#ddd]" />
              <span className="text-[0.65rem] text-[#999]">{f.category}</span>
            </div>
            <h2 className="text-[1.3rem] font-bold text-[#222] tracking-[-0.03em] mb-2">{f.title}</h2>
            <p className="text-[0.78rem] text-[#888] mb-1">{f.scripture}</p>
            <p className="text-[0.75rem] text-[#bbb]">{f.pastor} · {f.date}</p>
            <a href="#" className="inline-flex items-center gap-2 mt-4 bg-[#294a3a] text-white px-5 py-2 text-[0.78rem] font-semibold hover:bg-[#1e3a2d] transition-colors">
              <PlayBtn className="text-white w-4 h-4" /> 영상 보기
            </a>
          </div>
        </div>
      </div>

      {/* 카테고리 + 카드 */}
      <div className="bg-white px-5 py-5 border-t border-[#f0f0f0]">
        <div className="flex gap-2 mb-5">
          {categories.map((c, i) => (
            <button key={c} className={`px-3.5 py-1.5 text-[0.75rem] font-medium transition-colors ${i === 0 ? "bg-[#294a3a] text-white" : "border border-[#ddd] text-[#888] hover:border-[#294a3a] hover:text-[#294a3a]"}`}>{c}</button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {mockSermons.slice(1, 4).map(s => (
            <div key={s.id} className="group cursor-pointer border border-[#eee] hover:border-[#294a3a]/20 hover:shadow-sm transition-all duration-300">
              <div className="relative aspect-video overflow-hidden">
                <img src={s.thumb} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#294a3a]/10">
                  <div className="w-10 h-10 rounded-full bg-[#294a3a] text-white"><PlayBtn className="w-full h-full" /></div>
                </div>
              </div>
              <div className="p-3.5">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[0.62rem] font-semibold text-[#294a3a]">{s.category}</span>
                  <span className="text-[0.62rem] text-[#ccc]">{s.date}</span>
                </div>
                <h3 className="text-[0.82rem] font-semibold text-[#222] mb-1 tracking-[-0.02em] group-hover:text-[#294a3a] transition-colors">{s.title}</h3>
                <p className="text-[0.7rem] text-[#aaa]">{s.scripture}</p>
                <p className="text-[0.68rem] text-[#ccc] mt-2">{s.pastor}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SermonsMockup() {
  const [active, setActive] = useState<"A" | "B" | "C">("A");
  return (
    <div className="min-h-screen bg-[#f0f0f0] py-8 px-4">
      <div className="max-w-[1000px] mx-auto">
        <h1 className="text-[1.2rem] font-bold text-[#333] mb-4">설교 페이지 라이트 테마 목업</h1>
        <div className="flex gap-2 mb-6">
          {(["A", "B", "C"] as const).map(v => (
            <button key={v} onClick={() => setActive(v)}
              className={`px-4 py-2 text-[0.8rem] font-medium rounded-lg transition-colors ${active === v ? "bg-[#333] text-white" : "bg-white text-[#666] border border-[#ddd]"}`}>
              {v === "A" ? "크림 웜톤" : v === "B" ? "클린 화이트" : "딥그린 엘레강트"}
            </button>
          ))}
        </div>
        <div className="rounded-xl overflow-hidden shadow-xl border border-[#ddd]">
          {active === "A" && <DesignA />}
          {active === "B" && <DesignB />}
          {active === "C" && <DesignC />}
        </div>
      </div>
    </div>
  );
}
