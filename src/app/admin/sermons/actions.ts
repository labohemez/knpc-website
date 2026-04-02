"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export type SermonFormData = {
  title: string;
  category: string;
  scripture: string;
  pastor: string;
  date: string;
  video_url: string;
};

export async function createSermon(data: SermonFormData) {
  const { error } = await supabaseAdmin.from("sermons").insert(data);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/sermons");
  revalidatePath("/sermons");
  return { ok: true };
}

export async function updateSermon(id: string, data: SermonFormData) {
  const { error } = await supabaseAdmin
    .from("sermons")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/sermons");
  revalidatePath("/sermons");
  return { ok: true };
}

export async function deleteSermon(id: string) {
  const { error } = await supabaseAdmin.from("sermons").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/sermons");
  revalidatePath("/sermons");
  return { ok: true };
}
