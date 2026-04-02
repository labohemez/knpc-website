"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { deleteNews } from "./actions";
import AdminShell from "../components/AdminShell";

type News = { id: string; title: string; category: string; date: string; is_new: boolean };

export default function AdminNewsPage() {
  const [items, setItems] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await supabase.from("news").select("id, title, category, date, is_new").order("date", { ascending: false });
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`"${title}" 을(를) 삭제하시겠습니까?`)) return;
    await deleteNews(id);
    load();
  };

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[1.1rem] font-bold text-[#222] tracking-[-0.03em]">소식 관리</h2>
        <Link href="/admin/news/new" className="px-4 py-2 bg-[#294a3a] text-white text-[0.8rem] font-medium hover:bg-[#1e3a2d] transition-colors">
          새 글 작성
        </Link>
      </div>

      <div className="bg-white border border-[#eee]">
        <table className="w-full text-[0.8rem]">
          <thead>
            <tr className="border-b border-[#eee] bg-[#fafafa]">
              <th className="text-left px-4 py-2.5 font-medium text-[#888]">제목</th>
              <th className="text-left px-4 py-2.5 font-medium text-[#888] w-[80px]">분류</th>
              <th className="text-left px-4 py-2.5 font-medium text-[#888] w-[100px]">날짜</th>
              <th className="text-center px-4 py-2.5 font-medium text-[#888] w-[60px]">새글</th>
              <th className="text-right px-4 py-2.5 font-medium text-[#888] w-[100px]">관리</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-[#999]">로딩 중...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-[#999]">등록된 소식이 없습니다</td></tr>
            ) : items.map((item) => (
              <tr key={item.id} className="border-b border-[#f5f5f5] hover:bg-[#fafafa] transition-colors">
                <td className="px-4 py-2.5 text-[#222]">{item.title}</td>
                <td className="px-4 py-2.5 text-[#888]">{item.category}</td>
                <td className="px-4 py-2.5 text-[#888]">{item.date}</td>
                <td className="px-4 py-2.5 text-center">{item.is_new ? <span className="text-green-600">●</span> : <span className="text-[#ddd]">○</span>}</td>
                <td className="px-4 py-2.5 text-right space-x-2">
                  <Link href={`/admin/news/${item.id}/edit`} className="text-[#294a3a] hover:underline">수정</Link>
                  <button onClick={() => handleDelete(item.id, item.title)} className="text-red-500 hover:underline">삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
