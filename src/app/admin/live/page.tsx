"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { deleteLive } from "./actions";
import AdminShell from "../components/AdminShell";

type Live = { id: string; title: string; youtube_url: string; start_time: string; end_time: string };

function statusBadge(start: string, end: string) {
  const now = new Date();
  const s = new Date(start);
  const e = new Date(end);
  if (now < s) return <span className="inline-block px-2 py-0.5 rounded text-[0.68rem] font-medium bg-blue-50 text-blue-600">예정</span>;
  if (now <= e) return <span className="inline-block px-2 py-0.5 rounded text-[0.68rem] font-medium bg-red-50 text-red-600 animate-pulse">● 진행중</span>;
  return <span className="inline-block px-2 py-0.5 rounded text-[0.68rem] font-medium bg-gray-50 text-gray-400">종료</span>;
}

function fmtKST(iso: string) {
  return new Date(iso).toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function AdminLivePage() {
  const [items, setItems] = useState<Live[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await supabase
      .from("live_schedules")
      .select("id, title, youtube_url, start_time, end_time")
      .order("start_time", { ascending: false });
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`"${title}" 을(를) 삭제하시겠습니까?`)) return;
    await deleteLive(id);
    load();
  };

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[1.1rem] font-bold text-[#222] tracking-[-0.03em]">LIVE 관리</h2>
          {!loading && <p className="text-[0.75rem] text-[#999] mt-0.5">총 {items.length}개</p>}
        </div>
        <Link href="/admin/live/new"
          className="px-4 py-2 bg-[#294a3a] text-white text-[0.8rem] font-medium rounded hover:bg-[#1e3a2d] transition-colors whitespace-nowrap">
          + LIVE 등록
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-[#eee] overflow-hidden">
        <table className="w-full text-[0.8rem] table-fixed">
          <colgroup>
            <col style={{ width: "28%" }} />
            <col style={{ width: "17%" }} />
            <col style={{ width: "17%" }} />
            <col style={{ width: "80px" }} />
            <col style={{ width: "80px" }} />
          </colgroup>
          <thead>
            <tr className="bg-[#f7f7f7] border-b border-[#eee]">
              <th className="text-center px-4 py-3 font-semibold text-[#555]">제목</th>
              <th className="text-center px-4 py-3 font-semibold text-[#555]">시작</th>
              <th className="text-center px-4 py-3 font-semibold text-[#555]">종료</th>
              <th className="text-center px-4 py-3 font-semibold text-[#555]">상태</th>
              <th className="text-center px-4 py-3 font-semibold text-[#555]">관리</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="px-4 py-10 text-center text-[#bbb]">로딩 중...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-10 text-center text-[#bbb]">등록된 일정이 없습니다</td></tr>
            ) : items.map((item) => (
              <tr key={item.id} className="border-b border-[#f5f5f5] hover:bg-[#fafafa] transition-colors">
                <td className="px-4 py-3 text-[#222] truncate text-center" title={item.title}>{item.title}</td>
                <td className="px-4 py-3 text-[#666] text-center whitespace-nowrap tabular-nums">{fmtKST(item.start_time)}</td>
                <td className="px-4 py-3 text-[#666] text-center whitespace-nowrap tabular-nums">{fmtKST(item.end_time)}</td>
                <td className="px-4 py-3 text-center">{statusBadge(item.start_time, item.end_time)}</td>
                <td className="px-4 py-3 text-center space-x-3 whitespace-nowrap">
                  <Link href={`/admin/live/${item.id}/edit`} className="text-[#294a3a] hover:underline font-medium">수정</Link>
                  <button onClick={() => handleDelete(item.id, item.title)} className="text-red-400 hover:text-red-600 hover:underline cursor-pointer">삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
