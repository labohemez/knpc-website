"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "../components/RichTextEditor";

const CATEGORIES = ["공지사항", "모임안내", "교회소식", "교회주보", "교우소식"];

interface Props {
  initial?: { title: string; category: string; date: string; body: string; is_new: boolean };
  onSubmit: (data: { title: string; category: string; date: string; body: string; is_new: boolean }) => Promise<{ ok: boolean; error?: string }>;
  submitLabel: string;
}

export default function NewsForm({ initial, onSubmit, submitLabel }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title || "");
  const [category, setCategory] = useState(initial?.category || "공지사항");
  const [date, setDate] = useState(initial?.date || new Date().toISOString().slice(0, 10));
  const [body, setBody] = useState(initial?.body || "");
  const [isNew, setIsNew] = useState(initial?.is_new ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { setError("제목을 입력하세요"); return; }
    setSaving(true);
    setError("");
    const result = await onSubmit({ title, category, date, body, is_new: isNew });
    if (result.ok) {
      router.push("/admin/news");
    } else {
      setError(result.error || "저장 실패");
      setSaving(false);
    }
  };

  const inputClass = "w-full px-3 py-2 text-[0.85rem] border border-[#ddd] focus:border-[#294a3a] focus:ring-1 focus:ring-[#294a3a]/20 outline-none transition-colors bg-white";
  const labelClass = "block text-[0.75rem] font-medium text-[#888] mb-1";

  return (
    <form onSubmit={handleSubmit}>
      {/* 제목 */}
      <div className="mb-4">
        <label className={labelClass}>제목 *</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} autoFocus />
      </div>

      {/* 분류 / 날짜 / 새글 */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div>
          <label className={labelClass}>분류</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>날짜</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} />
        </div>
        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={isNew} onChange={(e) => setIsNew(e.target.checked)} className="w-4 h-4 accent-[#294a3a]" />
            <span className="text-[0.8rem] text-[#555]">새 글 표시</span>
          </label>
        </div>
      </div>

      {/* 본문 */}
      <div className="mb-4">
        <label className={labelClass}>본문</label>
        <RichTextEditor value={body} onChange={setBody} />
      </div>

      {/* 에러 + 버튼 */}
      {error && <p className="text-[0.8rem] text-red-500 mb-3">{error}</p>}
      <div className="flex gap-2">
        <button type="submit" disabled={saving}
          className="px-5 py-2 bg-[#294a3a] text-white text-[0.8rem] font-medium hover:bg-[#1e3a2d] disabled:opacity-50 transition-colors">
          {saving ? "저장 중..." : submitLabel}
        </button>
        <button type="button" onClick={() => router.push("/admin/news")}
          className="px-5 py-2 border border-[#ddd] text-[0.8rem] text-[#666] hover:bg-[#f5f5f5] transition-colors">
          취소
        </button>
      </div>
    </form>
  );
}
