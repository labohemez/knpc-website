"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export type NewsFormData = {
  title: string;
  category: string;
  date: string;
  body: string;
  is_new: boolean;
};

export async function createNews(data: NewsFormData) {
  const { error } = await supabaseAdmin.from("news").insert(data);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/news");
  revalidatePath("/news");
  return { ok: true };
}

export async function updateNews(id: string, data: NewsFormData) {
  const { error } = await supabaseAdmin
    .from("news")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/news");
  revalidatePath("/news");
  return { ok: true };
}

export async function deleteNews(id: string) {
  const { error } = await supabaseAdmin.from("news").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/news");
  revalidatePath("/news");
  return { ok: true };
}
