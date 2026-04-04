"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function updateBulletinDate(id: string, date: string, publishAtOverride?: string) {
  let publish_at: string;
  if (publishAtOverride) {
    publish_at = publishAtOverride;
  } else {
    const d = new Date(`${date}T04:00:00Z`);
    d.setUTCDate(d.getUTCDate() - 1);
    publish_at = d.toISOString();
  }
  const { error } = await supabaseAdmin
    .from("bulletins")
    .update({ date, publish_at })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/bulletin");
  revalidatePath("/news");
  return { ok: true };
}

export async function deleteBulletin(id: string) {
  const { error } = await supabaseAdmin.from("bulletins").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/bulletin");
  return { ok: true };
}
