"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";

type LiveSchedule = {
  id: string;
  title: string;
  youtube_url: string;
  start_time: string;
  end_time: string;
};

type LiveContextValue = {
  live: LiveSchedule | null;
  isLive: boolean;
  liveUrl: string | null;
  dismiss: () => void;
};

const LiveContext = createContext<LiveContextValue>({ live: null, isLive: false, liveUrl: null, dismiss: () => {} });

export function useLive() {
  return useContext(LiveContext);
}

export default function LiveProvider({ children }: { children: React.ReactNode }) {
  const [live, setLive] = useState<LiveSchedule | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const schedule = (ms: number, fn: () => void) => {
    if (ms <= 0) { fn(); return; }
    timers.current.push(setTimeout(fn, ms));
  };

  useEffect(() => {
    fetch("/api/live/active")
      .then(r => r.json())
      .then(({ active, next }: { active: LiveSchedule | null; next: LiveSchedule | null }) => {
        const now = Date.now();

        if (active) {
          setLive(active);
          const msToEnd = new Date(active.end_time).getTime() - now;
          schedule(msToEnd, () => setLive(null));
        } else if (next) {
          const msToStart = new Date(next.start_time).getTime() - now;
          const msToEnd = new Date(next.end_time).getTime() - now;
          schedule(msToStart, () => { setLive(next); setDismissed(false); });
          schedule(msToEnd, () => setLive(null));
        }
      })
      .catch(() => {});

    return () => clearTimers();
  }, []);

  const dismiss = () => {
    if (live) sessionStorage.setItem(`live_dismissed_${live.id}`, "1");
    setDismissed(true);
  };

  // 세션에서 닫은 항목이면 모달은 숨기되 isLive는 유지 (헤더 표시등용)
  const modalLive = live && !dismissed && !sessionStorage.getItem(`live_dismissed_${live?.id}`) ? live : null;

  return (
    <LiveContext.Provider value={{ live: modalLive, isLive: !!live, liveUrl: live?.youtube_url ?? null, dismiss }}>
      {children}
    </LiveContext.Provider>
  );
}
