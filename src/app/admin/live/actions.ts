"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export type LiveFormData = {
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
  const { error } = await supabaseAdmin.from("live_schedules").update(data).eq("id", id);
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
