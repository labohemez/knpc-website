"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AdminShell from "../../../components/AdminShell";
import NewsForm from "../../NewsForm";
import { updateNews } from "../../actions";

export default function EditNewsPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<{ title: string; category: string; date: string; body: string; is_new: boolean } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("news").select("title, category, date, body, is_new").eq("id", id).single().then(({ data }) => {
      setData(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <AdminShell><p className="text-[#999] text-[0.85rem]">로딩 중...</p></AdminShell>;
  if (!data) return <AdminShell><p className="text-red-500 text-[0.85rem]">소식을 찾을 수 없습니다</p></AdminShell>;

  return (
    <AdminShell>
      <h2 className="text-[1.1rem] font-bold text-[#222] tracking-[-0.03em] mb-5">소식 수정</h2>
      <div className="bg-white border border-[#eee] p-6">
        <NewsForm initial={data} submitLabel="저장" onSubmit={(formData) => updateNews(id, formData)} />
      </div>
    </AdminShell>
  );
}
