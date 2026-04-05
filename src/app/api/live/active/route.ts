import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type Live = {
  id: string;
  type: string;
  title: string;
  youtube_url: string;
  is_active: boolean;
  day_of_week: number | null;
  start_hour: number | null;
  start_minute: number | null;
  end_hour: number | null;
  end_minute: number | null;
  start_time: string | null;
  end_time: string | null;
};

function isRegularActive(item: Live, nowKST: Date): boolean {
  const day = nowKST.getUTCDay();
  const minutes = nowKST.getUTCHours() * 60 + nowKST.getUTCMinutes();
  const startM = (item.start_hour ?? 0) * 60 + (item.start_minute ?? 0);
  const endM = (item.end_hour ?? 0) * 60 + (item.end_minute ?? 0);
  return day === item.day_of_week && minutes >= startM && minutes <= endM;
}

// 정규 스케줄의 다음 시작 시각 (UTC ms)
function nextRegularStart(item: Live, nowMs: number): number {
  const nowKST = new Date(nowMs + 9 * 60 * 60 * 1000);
  const targetDay = item.day_of_week ?? 0;
  const startM = (item.start_hour ?? 0) * 60 + (item.start_minute ?? 0);
  const curDay = nowKST.getUTCDay();
  const curM = nowKST.getUTCHours() * 60 + nowKST.getUTCMinutes();

  let daysUntil = (targetDay - curDay + 7) % 7;
  if (daysUntil === 0 && curM >= startM) daysUntil = 7; // 오늘이지만 이미 지남

  const nextKST = new Date(nowKST);
  nextKST.setUTCDate(nextKST.getUTCDate() + daysUntil);
  nextKST.setUTCHours(item.start_hour ?? 0, item.start_minute ?? 0, 0, 0);
  return nextKST.getTime() - 9 * 60 * 60 * 1000; // UTC ms
}

export async function GET() {
  const now = new Date();
  const nowMs = now.getTime();
  const nowKST = new Date(nowMs + 9 * 60 * 60 * 1000);
  const nowISO = now.toISOString();

  const { data: all } = await supabaseAdmin
    .from("live_schedules")
    .select("id, type, title, youtube_url, is_active, day_of_week, start_hour, start_minute, end_hour, end_minute, start_time, end_time");

  const items: Live[] = (all ?? []).filter((i: Live) => i.is_active);

  // 진행중 확인
  const active =
    items.find(i => i.type === "temporary" && i.start_time && i.end_time &&
      new Date(i.start_time) <= now && now <= new Date(i.end_time)) ??
    items.find(i => i.type === "regular" && isRegularActive(i, nowKST)) ??
    null;

  // 다음 예정 (임시 중 미래인 것)
  const nextTemp = items
    .filter(i => i.type === "temporary" && i.start_time && new Date(i.start_time) > now)
    .sort((a, b) => new Date(a.start_time!).getTime() - new Date(b.start_time!).getTime())[0] ?? null;

  // 다음 정규 (가장 빨리 돌아오는 것)
  const nextRegular = items
    .filter(i => i.type === "regular")
    .sort((a, b) => nextRegularStart(a, nowMs) - nextRegularStart(b, nowMs))[0] ?? null;

  // 더 빠른 next 선택
  let next: Live | null = null;
  if (nextTemp && nextRegular) {
    const tempMs = new Date(nextTemp.start_time!).getTime();
    const regMs = nextRegularStart(nextRegular, nowMs);
    next = tempMs < regMs ? nextTemp : nextRegular;
  } else {
    next = nextTemp ?? nextRegular;
  }

  // 정규 스케줄은 오늘 기준 start_time/end_time 계산해서 붙여줌 (LiveProvider setTimeout용)
  function attachRegularTimes(item: Live): Live {
    const startMs = (() => {
      const d = new Date(nowKST);
      d.setUTCHours(item.start_hour ?? 0, item.start_minute ?? 0, 0, 0);
      return d.getTime() - 9 * 60 * 60 * 1000;
    })();
    const endMs = (() => {
      const d = new Date(nowKST);
      d.setUTCHours(item.end_hour ?? 0, item.end_minute ?? 0, 0, 0);
      return d.getTime() - 9 * 60 * 60 * 1000;
    })();
    return { ...item, start_time: new Date(startMs).toISOString(), end_time: new Date(endMs).toISOString() };
  }

  const finalActive = active && active.type === "regular" ? attachRegularTimes(active) : active;

  if (next && next.type === "regular") {
    const startMs = nextRegularStart(next, nowMs);
    const endMs = startMs + ((next.end_hour ?? 0) - (next.start_hour ?? 0)) * 60 * 60 * 1000
      + ((next.end_minute ?? 0) - (next.start_minute ?? 0)) * 60 * 1000;
    next = { ...next, start_time: new Date(startMs).toISOString(), end_time: new Date(endMs).toISOString() };
  }

  return NextResponse.json({ active: finalActive, next });
}
