"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { deleteLive, toggleLive } from "./actions";
import AdminShell from "../components/AdminShell";

type Live = {
  id: string;
  type: string;
  title: string;
  youtube_url: string;
  is_active: boolean;
  day_of_week: number | null;
  start_hour: number | null;
  start_minute: number | null;
  end_hour: number | null;
  end_minute: number | null;
  start_time: string | null;
  end_time: string | null;
};

const DAY_LABELS = ["주일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

function pad(n: number) { return String(n).padStart(2, "0"); }

function fmtKST(iso: string) {
  return new Date(iso).toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit",
  });
}

function scheduleLabel(item: Live) {
  if (item.type === "regular") {
    const day = item.day_of_week != null ? DAY_LABELS[item.day_of_week] : "?";
    const start = item.start_hour != null ? `${pad(item.start_hour)}:${pad(item.start_minute ?? 0)}` : "";
    const end = item.end_hour != null ? `${pad(item.end_hour)}:${pad(item.end_minute ?? 0)}` : "";
    return { start: `매주 ${day} ${start}`, end };
  }
  return {
    start: item.start_time ? fmtKST(item.start_time) : "",
    end: item.end_time ? fmtKST(item.end_time) : "",
  };
}

function statusBadge(item: Live) {
  if (item.type === "regular") {
    const nowKST = new Date(Date.now() + 9 * 60 * 60 * 1000);
    const day = nowKST.getUTCDay();
    const minutes = nowKST.getUTCHours() * 60 + nowKST.getUTCMinutes();
    const startM = (item.start_hour ?? 0) * 60 + (item.start_minute ?? 0);
    const endM = (item.end_hour ?? 0) * 60 + (item.end_minute ?? 0);
    if (day === item.day_of_week && minutes >= startM && minutes <= endM) {
      return <span className="inline-block px-2 py-0.5 rounded text-[0.68rem] font-medium bg-red-50 text-red-600 animate-pulse">● 진행중</span>;
    }
    return <span className="inline-block px-2 py-0.5 rounded text-[0.68rem] font-medium bg-green-50 text-green-600">매주 반복</span>;
  }
  const now = new Date();
  const s = item.start_time ? new Date(item.start_time) : null;
  const e = item.end_time ? new Date(item.end_time) : null;
  if (!s || !e) return null;
  if (now < s) return <span className="inline-block px-2 py-0.5 rounded text-[0.68rem] font-medium bg-blue-50 text-blue-600">예정</span>;
  if (now <= e) return <span className="inline-block px-2 py-0.5 rounded text-[0.68rem] font-medium bg-red-50 text-red-600 animate-pulse">● 진행중</span>;
  return <span className="inline-block px-2 py-0.5 rounded text-[0.68rem] font-medium bg-gray-50 text-gray-400">종료</span>;
}

export default function AdminLivePage() {
  const [items, setItems] = useState<Live[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await supabase
      .from("live_schedules")
      .select("id, type, title, youtube_url, is_active, day_of_week, start_hour, start_minute, end_hour, end_minute, start_time, end_time")
      .order("type", { ascending: true })
      .order("day_of_week", { ascending: true, nullsFirst: false });
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`"${title}" 을(를) 삭제하시겠습니까?`)) return;
    await deleteLive(id);
    load();
  };

  const handleToggle = async (id: string, current: boolean) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, is_active: !current } : i));
    await toggleLive(id, !current);
  };

  const regular = items.filter(i => i.type === "regular");
  const temporary = items.filter(i => i.type === "temporary");

  const renderTable = (rows: Live[], label: string, color: string) => (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-[0.68rem] font-bold text-white px-2 py-0.5 rounded ${color}`}>{label}</span>
      </div>
      <div className="bg-white rounded-lg border border-[#eee] overflow-hidden">
        <table className="w-full text-[0.8rem] table-fixed">
          <colgroup>
            <col style={{ width: "44px" }} />
            <col style={{ width: "22%" }} />
            <col style={{ width: "22%" }} />
            <col style={{ width: "18%" }} />
            <col style={{ width: "80px" }} />
            <col style={{ width: "80px" }} />
          </colgroup>
          <thead>
            <tr className="bg-[#f7f7f7] border-b border-[#eee]">
              <th className="px-3 py-3" />
              <th className="text-center px-4 py-3 font-semibold text-[#555]">제목</th>
              <th className="text-center px-4 py-3 font-semibold text-[#555]">시작</th>
              <th className="text-center px-4 py-3 font-semibold text-[#555]">종료</th>
              <th className="text-center px-4 py-3 font-semibold text-[#555]">상태</th>
              <th className="text-center px-4 py-3 font-semibold text-[#555]">관리</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-[#bbb]">등록된 일정이 없습니다</td></tr>
            ) : rows.map(item => {
              const { start, end } = scheduleLabel(item);
              return (
                <tr key={item.id} className={`border-b border-[#f5f5f5] transition-colors ${item.is_active ? "hover:bg-[#fafafa]" : "bg-[#fafafa] opacity-50"}`}>
                  <td className="px-3 py-3 text-center">
                    <button
                      onClick={() => handleToggle(item.id, item.is_active)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-[0.65rem] font-bold tracking-wider transition-colors cursor-pointer ${item.is_active ? "bg-[#294a3a] text-white" : "bg-[#e0e0e0] text-[#aaa]"}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${item.is_active ? "bg-white" : "bg-[#bbb]"}`} />
                      {item.is_active ? "ON" : "OFF"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-[#222] truncate text-center" title={item.title}>{item.title}</td>
                  <td className="px-4 py-3 text-[#666] text-center whitespace-nowrap">{start}</td>
                  <td className="px-4 py-3 text-[#666] text-center whitespace-nowrap tabular-nums">{end}</td>
                  <td className="px-4 py-3 text-center">{item.is_active ? statusBadge(item) : <span className="text-[0.68rem] text-[#aaa]">비활성</span>}</td>
                  <td className="px-4 py-3 text-center space-x-3 whitespace-nowrap">
                    <Link href={`/admin/live/${item.id}/edit`} className="text-[#294a3a] hover:underline font-medium">수정</Link>
                    <button onClick={() => handleDelete(item.id, item.title)} className="text-red-400 hover:text-red-600 hover:underline cursor-pointer">삭제</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[1.1rem] font-bold text-[#222] tracking-[-0.03em]">LIVE 관리</h2>
        <Link href="/admin/live/new"
          className="px-4 py-2 bg-[#294a3a] text-white text-[0.8rem] font-medium rounded hover:bg-[#1e3a2d] transition-colors whitespace-nowrap">
          + LIVE 등록
        </Link>
      </div>
      {loading ? (
        <p className="text-[#bbb] text-[0.85rem]">로딩 중...</p>
      ) : (
        <>
          {renderTable(regular, "정규예배", "bg-[#294a3a]")}
          {renderTable(temporary, "임시", "bg-[#c69d6c]")}
        </>
      )}
    </AdminShell>
  );
}
