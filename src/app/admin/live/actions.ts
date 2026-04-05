"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export type LiveFormData =
  | {
      type: "regular";
      title: string;
      youtube_url: string;
      day_of_week: number;
      start_hour: number;
      start_minute: number;
      end_hour: number;
      end_minute: number;
    }
  | {
      type: "temporary";
      title: string;
      youtube_url: string;
      start_time: string;
      end_time: string;
    };

export async function createLive(data: LiveFormData) {
  const { error } = await supabaseAdmin.from("live_schedules").insert(data);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/live");
  return { ok: true };
}

export async function updateLive(id: string, data: LiveFormData) {
  // 타입 변경 시 반대 타입 필드 초기화
  const payload = data.type === "regular"
    ? { ...data, start_time: null, end_time: null }
    : { ...data, day_of_week: null, start_hour: null, start_minute: null, end_hour: null, end_minute: null };
  const { error } = await supabaseAdmin.from("live_schedules").update(payload).eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/live");
  return { ok: true };
}

export async function toggleLive(id: string, isActive: boolean) {
  const { error } = await supabaseAdmin.from("live_schedules").update({ is_active: isActive }).eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/live");
  return { ok: true };
}

export async function deleteLive(id: string) {
  const { error } = await supabaseAdmin.from("live_schedules").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/live");
  return { ok: true };
}
