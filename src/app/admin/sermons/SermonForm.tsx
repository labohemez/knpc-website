"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = ["주일예배", "수요예배", "금요기도회", "새벽기도회", "특별예배", "청년1부", "청년2,3부",
  "찬양-할렐루야", "찬양-호산나", "찬양-시온", "찬양-주일예배", "찬양-금요기도회", "찬양-기타"];

interface Props {
  initial?: { title: string; category: string; scripture: string; pastor: string; date: string; video_url: string; audio_url: string };
  onSubmit: (data: { title: string; category: string; scripture: string; pastor: string; date: string; video_url: string; audio_url: string }) => Promise<{ ok: boolean; error?: string }>;
  submitLabel: string;
}

export default function SermonForm({ initial, onSubmit, submitLabel }: Props) {
  const router = useRouter();

  const initMediaType = initial?.audio_url ? "audio" : "video";
  const [mediaType, setMediaType] = useState<"video" | "audio">(initMediaType);
  const [title, setTitle] = useState(initial?.title || "");
  const [category, setCategory] = useState(initial?.category || "주일예배");
  const [scripture, setScripture] = useState(initial?.scripture || "");
  const [pastor, setPastor] = useState(initial?.pastor || "");
  const [date, setDate] = useState(initial?.date || new Date().toISOString().slice(0, 10));
  const [videoUrl, setVideoUrl] = useState(initial?.video_url || "");
  const [audioUrl, setAudioUrl] = useState(initial?.audio_url || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { setError("제목을 입력하세요"); return; }
    setSaving(true);
    setError("");
    const result = await onSubmit({
      title, category, scripture, pastor, date,
      video_url: mediaType === "video" ? videoUrl : "",
      audio_url: mediaType === "audio" ? audioUrl : "",
    });
    if (result.ok) {
      router.push("/admin/sermons");
    } else {
      setError(result.error || "저장 실패");
      setSaving(false);
    }
  };

  const inputClass = "w-full px-3 py-2 text-[0.85rem] border border-[#ddd] rounded focus:border-[#294a3a] focus:ring-1 focus:ring-[#294a3a]/20 outline-none transition-colors bg-white";
  const labelClass = "block text-[0.75rem] font-medium text-[#888] mb-1";

  return (
    <form onSubmit={handleSubmit} className="max-w-[680px]">

      {/* 미디어 타입 선택 */}
      <div className="mb-6">
        <label className={labelClass}>미디어 유형</label>
        <div className="flex gap-3">
          {[
            { value: "video", label: "🎬 영상 (YouTube)" },
            { value: "audio", label: "🎵 음성 (SoundCloud)" },
          ].map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setMediaType(value as "video" | "audio")}
              className={`flex-1 py-3 text-[0.85rem] font-medium rounded border-2 transition-all cursor-pointer ${
                mediaType === value
                  ? value === "video"
                    ? "border-[#294a3a] bg-[#294a3a]/5 text-[#294a3a]"
                    : "border-[#c69d6c] bg-[#c69d6c]/5 text-[#c69d6c]"
                  : "border-[#e0e0e0] text-[#aaa] hover:border-[#bbb]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

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

      {/* 미디어 URL */}
      {mediaType === "video" ? (
        <div className="mb-4 p-4 bg-[#f9f9f9] rounded border border-[#eee]">
          <label className={labelClass}>YouTube URL</label>
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className={inputClass}
            placeholder="https://www.youtube.com/watch?v=..."
          />
          {videoUrl && (
            <p className="text-[0.72rem] text-[#aaa] mt-1.5">
              입력된 URL: {videoUrl}
            </p>
          )}
        </div>
      ) : (
        <div className="mb-4 p-4 bg-[#fdf8f4] rounded border border-[#f0e8dc]">
          <label className={labelClass}>SoundCloud Embed URL</label>
          <textarea
            value={audioUrl}
            onChange={(e) => setAudioUrl(e.target.value)}
            className={`${inputClass} h-[80px] resize-none`}
            placeholder="https://w.soundcloud.com/player/?url=..."
          />
          <p className="text-[0.72rem] text-[#bbb] mt-1">SoundCloud 공유 → 임베드 코드에서 src 값을 복사하세요</p>
        </div>
      )}

      {error && <p className="text-[0.8rem] text-red-500 mb-3">{error}</p>}
      <div className="flex gap-2">
        <button type="submit" disabled={saving}
          className="px-5 py-2 bg-[#294a3a] text-white text-[0.8rem] font-medium rounded hover:bg-[#1e3a2d] disabled:opacity-50 transition-colors cursor-pointer">
          {saving ? "저장 중..." : submitLabel}
        </button>
        <button type="button" onClick={() => router.push("/admin/sermons")}
          className="px-5 py-2 border border-[#ddd] rounded text-[0.8rem] text-[#666] hover:bg-[#f5f5f5] transition-colors cursor-pointer">
          취소
        </button>
      </div>
    </form>
  );
}
