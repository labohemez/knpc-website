"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LiveFormData } from "./actions";

interface Props {
  initial?: { title: string; youtube_url: string; start_time: string; end_time: string };
  onSubmit: (data: LiveFormData) => Promise<{ ok: boolean; error?: string }>;
  submitLabel: string;
}

// ISO UTC → datetime-local KST 문자열
function toLocalKST(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const kst = new Date(d.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 16);
}

// datetime-local KST → UTC ISO
function toUTC(local: string) {
  return new Date(local + ":00+09:00").toISOString();
}

export default function LiveForm({ initial, onSubmit, submitLabel }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title || "");
  const [youtubeUrl, setYoutubeUrl] = useState(initial?.youtube_url || "");
  const [startTime, setStartTime] = useState(initial?.start_time ? toLocalKST(initial.start_time) : "");
  const [endTime, setEndTime] = useState(initial?.end_time ? toLocalKST(initial.end_time) : "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const inputClass = "w-full px-3 py-2 text-[0.85rem] border border-[#ddd] rounded focus:border-[#294a3a] focus:ring-1 focus:ring-[#294a3a]/20 outline-none transition-colors bg-white";
  const labelClass = "block text-[0.75rem] font-medium text-[#888] mb-1";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { setError("제목을 입력하세요"); return; }
    if (!youtubeUrl.trim()) { setError("YouTube URL을 입력하세요"); return; }
    if (!startTime) { setError("시작 시간을 입력하세요"); return; }
    if (!endTime) { setError("종료 시간을 입력하세요"); return; }
    if (new Date(startTime) >= new Date(endTime)) { setError("종료 시간이 시작 시간보다 늦어야 합니다"); return; }
    setSaving(true);
    setError("");
    const result = await onSubmit({
      title,
      youtube_url: youtubeUrl,
      start_time: toUTC(startTime),
      end_time: toUTC(endTime),
    });
    if (result.ok) {
      router.push("/admin/live");
    } else {
      setError(result.error || "저장 실패");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-[560px]">
      <div className="mb-4">
        <label className={labelClass}>제목 *</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} className={inputClass} placeholder="예: 주일예배 실시간" autoFocus />
      </div>

      <div className="mb-4">
        <label className={labelClass}>YouTube URL *</label>
        <input type="text" value={youtubeUrl} onChange={e => setYoutubeUrl(e.target.value)} className={inputClass}
          placeholder="https://www.youtube.com/watch?v=..." />
        <p className="text-[0.72rem] text-[#aaa] mt-1">실시간 방송 URL 또는 예약된 영상 URL</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className={labelClass}>시작 시간 (KST) *</label>
          <input type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>종료 시간 (KST) *</label>
          <input type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)} className={inputClass} />
        </div>
      </div>

      {error && <p className="text-[0.8rem] text-red-500 mb-3">{error}</p>}
      <div className="flex gap-2">
        <button type="submit" disabled={saving}
          className="px-5 py-2 bg-[#294a3a] text-white text-[0.8rem] font-medium rounded hover:bg-[#1e3a2d] disabled:opacity-50 transition-colors cursor-pointer">
          {saving ? "저장 중..." : submitLabel}
        </button>
        <button type="button" onClick={() => router.push("/admin/live")}
          className="px-5 py-2 border border-[#ddd] rounded text-[0.8rem] text-[#666] hover:bg-[#f5f5f5] transition-colors cursor-pointer">
          취소
        </button>
      </div>
    </form>
  );
}
