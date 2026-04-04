import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const now = new Date().toISOString();

  // 현재 진행중인 방송
  const { data: active } = await supabaseAdmin
    .from("live_schedules")
    .select("id, title, youtube_url, start_time, end_time")
    .lte("start_time", now)
    .gte("end_time", now)
    .order("start_time", { ascending: false })
    .limit(1)
    .maybeSingle();

  // 다음 예정 방송
  const { data: next } = await supabaseAdmin
    .from("live_schedules")
    .select("id, title, youtube_url, start_time, end_time")
    .gt("start_time", now)
    .order("start_time", { ascending: true })
    .limit(1)
    .maybeSingle();

  return NextResponse.json({ active: active ?? null, next: next ?? null });
}
