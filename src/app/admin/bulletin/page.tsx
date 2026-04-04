import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";
import AdminShell from "../components/AdminShell";
import BulletinList from "./BulletinList";

export const dynamic = "force-dynamic";

export default async function BulletinPage() {
  const { data: bulletins } = await supabaseAdmin
    .from("bulletins")
    .select("*")
    .order("date", { ascending: false });

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[1.1rem] font-bold text-[#1a1a1a]">주보 관리</h1>
        <Link
          href="/admin/bulletin/new"
          className="px-4 py-2 bg-[#294a3a] text-white text-[0.82rem] font-medium rounded hover:bg-[#1e3a2c] transition-colors cursor-pointer"
        >
          + 주보 등록
        </Link>
      </div>
      <BulletinList bulletins={bulletins ?? []} />
    </AdminShell>
  );
}
