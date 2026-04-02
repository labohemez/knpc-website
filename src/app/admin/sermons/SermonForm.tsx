"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = ["주일예배", "수요예배", "금요기도회", "새벽기도회", "특별예배", "청년예배"];

interface Props {
  initial?: { title: string; category: string; scripture: string; pastor: string; date: string; video_url: string };
  onSubmit: (data: { title: string; category: string; scripture: string; pastor: string; date: string; video_url: string }) => Promise<{ ok: boolean; error?: string }>;
  submitLabel: string;
}

export default function SermonForm({ initial, onSubmit, submitLabel }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title || "");
  const [category, setCategory] = useState(initial?.category || "주일예배");
  const [scripture, setScripture] = useState(initial?.scripture || "");
  const [pastor, setPastor] = useState(initial?.pastor || "");
  const [date, setDate] = useState(initial?.date || new Date().toISOString().slice(0, 10));
  const [videoUrl, setVideoUrl] = useState(initial?.video_url || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { setError("제목을 입력하세요"); return; }
    setSaving(true);
    setError("");
    const result = await onSubmit({ title, category, scripture, pastor, date, video_url: videoUrl });
    if (result.ok) {
      router.push("/admin/sermons");
    } else {
      setError(result.error || "저장 실패");
      setSaving(false);
    }
  };

  const inputClass = "w-full px-3 py-2 text-[0.85rem] border border-[#ddd] focus:border-[#294a3a] focus:ring-1 focus:ring-[#294a3a]/20 outline-none transition-colors bg-white";
  const labelClass = "block text-[0.75rem] font-medium text-[#888] mb-1";

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className={labelClass}>제목 *</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} autoFocus />
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div>
          <label className={labelClass}>분류</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>설교자</label>
          <input type="text" value={pastor} onChange={(e) => setPastor(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>날짜</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} />
        </div>
      </div>

      <div className="mb-4">
        <label className={labelClass}>성경 본문</label>
        <input type="text" value={scripture} onChange={(e) => setScripture(e.target.value)} className={inputClass} placeholder="예: 요한복음 3:16" />
      </div>

      <div className="mb-4">
        <label className={labelClass}>영상 URL</label>
        <input type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className={inputClass} placeholder="YouTube URL" />
      </div>

      {error && <p className="text-[0.8rem] text-red-500 mb-3">{error}</p>}
      <div className="flex gap-2">
        <button type="submit" disabled={saving}
          className="px-5 py-2 bg-[#294a3a] text-white text-[0.8rem] font-medium hover:bg-[#1e3a2d] disabled:opacity-50 transition-colors">
          {saving ? "저장 중..." : submitLabel}
        </button>
        <button type="button" onClick={() => router.push("/admin/sermons")}
          className="px-5 py-2 border border-[#ddd] text-[0.8rem] text-[#666] hover:bg-[#f5f5f5] transition-colors">
          취소
        </button>
      </div>
    </form>
  );
}
