"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AdminShell from "../../../components/AdminShell";
import SermonForm from "../../SermonForm";
import { updateSermon } from "../../actions";

export default function EditSermonPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<{ title: string; category: string; scripture: string; pastor: string; date: string; video_url: string; audio_url: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("sermons").select("title, category, scripture, pastor, date, video_url, audio_url").eq("id", id).single().then(({ data }) => {
      setData(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <AdminShell><p className="text-[#999] text-[0.85rem]">로딩 중...</p></AdminShell>;
  if (!data) return <AdminShell><p className="text-red-500 text-[0.85rem]">설교를 찾을 수 없습니다</p></AdminShell>;

  return (
    <AdminShell>
      <h2 className="text-[1.1rem] font-bold text-[#222] tracking-[-0.03em] mb-5">설교 수정</h2>
      <div className="bg-white border border-[#eee] p-6">
        <SermonForm initial={data} submitLabel="저장" onSubmit={(formData) => updateSermon(id, formData)} />
      </div>
    </AdminShell>
  );
}
