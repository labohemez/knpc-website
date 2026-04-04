"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { deleteSermon } from "./actions";
import AdminShell from "../components/AdminShell";

type Sermon = { id: string; title: string; category: string; pastor: string; date: string };

const CATEGORY_COLORS: Record<string, string> = {
  "주일예배":   "bg-blue-50 text-blue-700",
  "수요예배":   "bg-purple-50 text-purple-700",
  "금요기도회": "bg-orange-50 text-orange-700",
  "새벽기도회": "bg-sky-50 text-sky-700",
  "특별예배":   "bg-red-50 text-red-700",
  "청년1부":    "bg-green-50 text-green-700",
  "청년2,3부":  "bg-teal-50 text-teal-700",
};

const ALL = "";

function AdminSermonsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const catParam = searchParams.get("cat");
  const [items, setItems] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string | null>(catParam);
  const [search, setSearch] = useState("");
  const [searchPastor, setSearchPastor] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 20;

  const load = async () => {
    const { data } = await supabase.from("sermons").select("id, title, category, pastor, date").order("date", { ascending: false });
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);
  useEffect(() => { setFilter(catParam); setPage(1); }, [catParam]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`"${title}" 을(를) 삭제하시겠습니까?`)) return;
    await deleteSermon(id);
    load();
  };

  const SERMON_ORDER = ["주일예배", "수요예배", "금요기도회", "새벽기도회", "특별예배", "청년1부", "청년2,3부"];
  const PRAISE_ORDER  = ["찬양-할렐루야", "찬양-호산나", "찬양-시온", "찬양-주일예배", "찬양-금요기도회", "찬양-기타"];
  const allCats = Array.from(new Set(items.map(i => i.category)));
  const sermonCats = SERMON_ORDER.filter(c => allCats.includes(c));
  const praiseCats = PRAISE_ORDER.filter(c => allCats.includes(c));
  const filtered = items
    .filter(i => filter ? i.category === filter : true)
    .filter(i => search.trim() ? i.title.includes(search.trim()) : true)
    .filter(i => searchPastor.trim() ? (i.pastor || "").includes(searchPastor.trim()) : true)
    .filter(i => dateFrom ? i.date >= dateFrom : true)
    .filter(i => dateTo ? i.date <= dateTo : true);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <AdminShell>
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[1.1rem] font-bold text-[#222] tracking-[-0.03em]">설교 관리</h2>
          {!loading && <p className="text-[0.75rem] text-[#999] mt-0.5">총 {items.length}개 · 검색결과 {filtered.length}개</p>}
        </div>
        <Link href="/admin/sermons/new" className="px-4 py-2 bg-[#294a3a] text-white text-[0.8rem] font-medium rounded hover:bg-[#1e3a2d] transition-colors whitespace-nowrap">
            + {filter?.startsWith("찬양-") ? "찬양 등록" : "설교 등록"}
          </Link>
      </div>

      {/* 검색 */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <div className="relative">
          <input type="text" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="제목 검색"
            className="pl-8 pr-3 py-2 text-[0.8rem] border border-[#ddd] rounded focus:border-[#294a3a] outline-none w-[200px]" />
          <svg className="w-3.5 h-3.5 text-[#aaa] absolute left-2.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
        </div>
        <div className="relative">
          <input type="text" value={searchPastor} onChange={e => { setSearchPastor(e.target.value); setPage(1); }}
            placeholder="설교자 검색"
            className="pl-8 pr-3 py-2 text-[0.8rem] border border-[#ddd] rounded focus:border-[#294a3a] outline-none w-[160px]" />
          <svg className="w-3.5 h-3.5 text-[#aaa] absolute left-2.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>
        <input type="date" value={dateFrom} onChange={e => { setDateFrom(e.target.value); setPage(1); }}
          className="px-3 py-2 text-[0.8rem] border border-[#ddd] rounded focus:border-[#294a3a] outline-none" />
        <span className="text-[#aaa] text-[0.8rem]">~</span>
        <input type="date" value={dateTo} onChange={e => { setDateTo(e.target.value); setPage(1); }}
          className="px-3 py-2 text-[0.8rem] border border-[#ddd] rounded focus:border-[#294a3a] outline-none" />
        {(search || searchPastor || dateFrom || dateTo) && (
          <button onClick={() => { setSearch(""); setSearchPastor(""); setDateFrom(""); setDateTo(""); setPage(1); }}
            className="px-3 py-2 text-[0.75rem] text-[#999] hover:text-[#555] border border-[#ddd] rounded transition-colors cursor-pointer">
            초기화
          </button>
        )}
      </div>

      {/* 카테고리 필터 */}
      {!loading && (() => {
        const isP = filter?.startsWith("찬양-") ?? false;
        const { label, cats, color } = isP
          ? { label: "찬양", cats: praiseCats, color: "bg-[#c69d6c] border-[#c69d6c]" }
          : { label: "설교", cats: sermonCats, color: "bg-[#294a3a] border-[#294a3a]" };
        return (
          <div className="flex items-center gap-1.5 flex-wrap mb-5">
            <span className={`text-[0.68rem] font-bold text-white px-2 py-0.5 rounded ${color.split(" ")[0]}`}>{label}</span>
            {cats.map(cat => (
              <button
                key={cat}
                onClick={() => { setFilter(cat); router.replace(`?cat=${encodeURIComponent(cat)}`, { scroll: false }); setPage(1); }}
                className={`px-3 py-1 text-[0.72rem] font-medium rounded-full border transition-colors cursor-pointer ${
                  filter === cat
                    ? `${color} text-white`
                    : "bg-white text-[#888] border-[#e0e0e0] hover:text-[#294a3a] hover:border-[#294a3a]"
                }`}
              >
                {cat.replace("찬양-", "")} ({items.filter(i => i.category === cat).length})
              </button>
            ))}
          </div>
        );
      })()}

      {/* 테이블 */}
      <div className="bg-white rounded-lg border border-[#eee] overflow-hidden">
        <table className="w-full text-[0.8rem] table-fixed">
          <colgroup>
            <col style={{ width: "40%" }} />
            <col style={{ width: "120px" }} />
            <col style={{ width: "120px" }} />
            <col style={{ width: "110px" }} />
            <col style={{ width: "80px" }} />
          </colgroup>
          <thead>
            <tr className="bg-[#f7f7f7] border-b border-[#eee]">
              <th className="text-center px-4 py-3 font-semibold text-[#555]">제목</th>
              <th className="text-center px-4 py-3 font-semibold text-[#555]">분류</th>
              <th className="text-center px-4 py-3 font-semibold text-[#555]">설교자</th>
              <th className="text-center px-4 py-3 font-semibold text-[#555]">날짜</th>
              <th className="text-center px-4 py-3 font-semibold text-[#555]">관리</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="px-4 py-10 text-center text-[#bbb]">로딩 중...</td></tr>
            ) : paged.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-10 text-center text-[#bbb]">등록된 설교가 없습니다</td></tr>
            ) : paged.map((item) => (
              <tr key={item.id} className="border-b border-[#f5f5f5] hover:bg-[#fafafa] transition-colors group">
                <td className="px-4 py-3 text-[#222] text-center truncate" title={item.title}>{item.title}</td>
                <td className="px-4 py-3 text-center whitespace-nowrap">
                  <span className={`inline-block px-2 py-0.5 rounded text-[0.68rem] font-medium ${CATEGORY_COLORS[item.category] ?? "bg-gray-50 text-gray-600"}`}>
                    {item.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#666] text-center whitespace-nowrap">{item.pastor || "—"}</td>
                <td className="px-4 py-3 text-[#999] text-center tabular-nums whitespace-nowrap">{item.date}</td>
                <td className="px-4 py-3 text-center space-x-3 whitespace-nowrap">
                  <Link href={`/admin/sermons/${item.id}/edit`} className="text-[#294a3a] hover:underline font-medium">수정</Link>
                  <button onClick={() => handleDelete(item.id, item.title)} className="text-red-400 hover:text-red-600 hover:underline cursor-pointer">삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 mt-4">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 text-[0.75rem] border border-[#ddd] rounded text-[#666] hover:bg-[#f5f5f5] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            ← 이전
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-1.5 text-[0.75rem] border rounded transition-colors cursor-pointer ${
                page === p
                  ? "bg-[#294a3a] text-white border-[#294a3a]"
                  : "border-[#ddd] text-[#666] hover:bg-[#f5f5f5]"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 text-[0.75rem] border border-[#ddd] rounded text-[#666] hover:bg-[#f5f5f5] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            다음 →
          </button>
        </div>
      )}
    </AdminShell>
  );
}

export default function AdminSermonsPage() {
  return (
    <Suspense>
      <AdminSermonsContent />
    </Suspense>
  );
}
