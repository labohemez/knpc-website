"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AdminShell from "../../../components/AdminShell";
import LiveForm from "../../LiveForm";
import { updateLive } from "../../actions";

export default function LiveEditPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<object | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("live_schedules")
      .select("type, title, youtube_url, day_of_week, start_hour, start_minute, end_hour, end_minute, start_time, end_time")
      .eq("id", id).single()
      .then(({ data }) => { setData(data); setLoading(false); });
  }, [id]);

  if (loading) return <AdminShell><p className="text-[#999] text-[0.85rem]">로딩 중...</p></AdminShell>;
  if (!data) return <AdminShell><p className="text-red-500 text-[0.85rem]">일정을 찾을 수 없습니다</p></AdminShell>;

  return (
    <AdminShell>
      <h2 className="text-[1.1rem] font-bold text-[#222] tracking-[-0.03em] mb-5">LIVE 수정</h2>
      <div className="bg-white border border-[#eee] p-6">
        <LiveForm initial={data as Parameters<typeof LiveForm>[0]["initial"]} submitLabel="저장" onSubmit={(formData) => updateLive(id, formData)} />
      </div>
    </AdminShell>
  );
}
