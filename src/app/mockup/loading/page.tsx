"use client";

import { useEffect, useState } from "react";

/* ── 1. 골드 라인 확장 ── */
function GoldLine() {
  return (
    <div className="relative w-full h-full bg-[#294a3a] flex flex-col items-center justify-center gap-4">
      <img src="/images/logo.png" alt="강남교회" className="h-8 w-auto brightness-0 invert opacity-90" />
      <div className="relative h-[1px] w-0 bg-[#c69d6c] animate-[goldline_1.8s_ease-in-out_infinite]" />
      <style>{`
        @keyframes goldline {
          0% { width: 0; opacity: 1; }
          60% { width: 120px; opacity: 1; }
          100% { width: 120px; opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ── 2. 십자가 드로잉 ── */
function CrossDraw() {
  return (
    <div className="w-full h-full bg-[#294a3a] flex items-center justify-center">
      <svg width="60" height="80" viewBox="0 0 60 80">
        <line x1="30" y1="0" x2="30" y2="80" stroke="#c69d6c" strokeWidth="4" strokeLinecap="round"
          style={{ strokeDasharray: 80, strokeDashoffset: 80, animation: "drawV 0.7s ease forwards" }} />
        <line x1="5" y1="25" x2="55" y2="25" stroke="#c69d6c" strokeWidth="4" strokeLinecap="round"
          style={{ strokeDasharray: 50, strokeDashoffset: 50, animation: "drawH 0.5s ease 0.7s forwards" }} />
      </svg>
      <style>{`
        @keyframes drawV { to { stroke-dashoffset: 0; } }
        @keyframes drawH { to { stroke-dashoffset: 0; } }
      `}</style>
    </div>
  );
}

/* ── 3. 말씀 카드 ── */
const verses = ["주는 나의 목자시니 내게 부족함이 없으리로다 — 시편 23:1", "내가 곧 길이요 진리요 생명이니 — 요한복음 14:6"];
function VerseCard() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(i => (i + 1) % verses.length); setVisible(true); }, 600);
    }, 3000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="w-full h-full bg-[#1e3a2d] flex items-center justify-center p-6">
      <p className={`text-center text-white/80 text-[0.8rem] leading-relaxed font-light tracking-wide transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}>
        {verses[idx]}
      </p>
    </div>
  );
}

/* ── 4. 숨쉬는 원 ── */
function BreathingCircle() {
  return (
    <div className="w-full h-full bg-[#294a3a] flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        <div className="w-14 h-14 rounded-full border-2 border-[#c69d6c]/30 absolute animate-[breathe_2.4s_ease-in-out_infinite]" />
        <div className="w-8 h-8 rounded-full border-2 border-[#c69d6c]/60 absolute animate-[breathe_2.4s_ease-in-out_infinite_0.4s]" />
        <div className="w-3 h-3 rounded-full bg-[#c69d6c]" />
      </div>
      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.5); opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}

/* ── 5. 로고 페이드인 ── */
function LogoFade() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1500);
    const t3 = setTimeout(() => setPhase(0), 2800);
    const loop = setInterval(() => {
      setPhase(0);
      setTimeout(() => setPhase(1), 300);
      setTimeout(() => setPhase(2), 1500);
    }, 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearInterval(loop); };
  }, []);
  return (
    <div className="w-full h-full bg-[#1a2e24] flex flex-col items-center justify-center gap-3">
      <img src="/images/logo.png" alt="강남교회"
        className={`h-7 w-auto brightness-0 invert transition-all duration-700 ${phase >= 1 ? "opacity-90 translate-y-0" : "opacity-0 translate-y-2"}`} />
      <p className={`text-[#c69d6c] text-[0.65rem] tracking-[0.3em] uppercase transition-all duration-700 delay-300 ${phase >= 2 ? "opacity-70" : "opacity-0"}`}>
        강남교회
      </p>
    </div>
  );
}

/* ── 6. 프로그레스 바 ── */
function ProgressBar() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const steps = [10, 30, 55, 70, 88, 100];
    let i = 0;
    const t = setInterval(() => {
      setWidth(steps[i]);
      i++;
      if (i >= steps.length) { i = 0; setTimeout(() => setWidth(0), 400); }
    }, 500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="w-full h-full bg-[#294a3a] flex flex-col items-center justify-center gap-4">
      <img src="/images/logo.png" alt="강남교회" className="h-7 w-auto brightness-0 invert opacity-80" />
      <div className="w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-[#c69d6c] rounded-full transition-all duration-500 ease-out" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

const OPTIONS = [
  { id: 1, label: "골드 라인 확장", component: <GoldLine /> },
  { id: 2, label: "십자가 드로잉", component: <CrossDraw /> },
  { id: 3, label: "말씀 카드", component: <VerseCard /> },
  { id: 4, label: "숨쉬는 원", component: <BreathingCircle /> },
  { id: 5, label: "로고 페이드인", component: <LogoFade /> },
  { id: 6, label: "프로그레스 바", component: <ProgressBar /> },
];

export default function LoadingMockupPage() {
  return (
    <div className="min-h-screen bg-[#f0f0f0] p-8">
      <h1 className="text-[1.1rem] font-bold text-[#222] mb-1">로딩 애니메이션 목업</h1>
      <p className="text-[0.8rem] text-[#999] mb-8">메인 페이지 영상 로딩 중 표시될 화면 옵션</p>
      <div className="grid grid-cols-3 gap-6">
        {OPTIONS.map(({ id, label, component }) => (
          <div key={id} className="flex flex-col gap-2">
            <div className="rounded-lg overflow-hidden shadow-md" style={{ height: 200 }}>
              {component}
            </div>
            <p className="text-[0.8rem] font-medium text-[#444]">
              <span className="text-[#294a3a] font-bold mr-1">{id}.</span>{label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
