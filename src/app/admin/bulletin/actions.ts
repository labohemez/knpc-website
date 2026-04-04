"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function deleteBulletin(id: string) {
  const { error } = await supabaseAdmin.from("bulletins").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/bulletin");
  return { ok: true };
}
