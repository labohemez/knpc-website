"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LiveFormData } from "./actions";

const DAYS = [
  { value: 0, label: "주일" },
  { value: 1, label: "월요일" },
  { value: 2, label: "화요일" },
  { value: 3, label: "수요일" },
  { value: 4, label: "목요일" },
  { value: 5, label: "금요일" },
  { value: 6, label: "토요일" },
];

function toLocalKST(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const kst = new Date(d.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 16);
}

function toUTC(local: string) {
  return new Date(local + ":00+09:00").toISOString();
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

interface InitialData {
  type?: string;
  title?: string;
  youtube_url?: string;
  day_of_week?: number | null;
  start_hour?: number | null;
  start_minute?: number | null;
  end_hour?: number | null;
  end_minute?: number | null;
  start_time?: string | null;
  end_time?: string | null;
}

interface Props {
  initial?: InitialData;
  onSubmit: (data: LiveFormData) => Promise<{ ok: boolean; error?: string }>;
  submitLabel: string;
}

export default function LiveForm({ initial, onSubmit, submitLabel }: Props) {
  const router = useRouter();
  const [type, setType] = useState<"regular" | "temporary">(
    (initial?.type as "regular" | "temporary") ?? "regular"
  );
  const [title, setTitle] = useState(initial?.title || "");
  const [youtubeUrl, setYoutubeUrl] = useState(initial?.youtube_url || "");

  // 정규예배 필드
  const [dayOfWeek, setDayOfWeek] = useState(initial?.day_of_week ?? 0);
  const [startTime, setStartTime] = useState(
    initial?.start_hour != null
      ? `${pad(initial.start_hour)}:${pad(initial.start_minute ?? 0)}`
      : ""
  );
  const [endTime, setEndTime] = useState(
    initial?.end_hour != null
      ? `${pad(initial.end_hour)}:${pad(initial.end_minute ?? 0)}`
      : ""
  );

  // 임시 필드
  const [startDateTime, setStartDateTime] = useState(
    initial?.start_time ? toLocalKST(initial.start_time) : ""
  );
  const [endDateTime, setEndDateTime] = useState(
    initial?.end_time ? toLocalKST(initial.end_time) : ""
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const inputClass = "w-full px-3 py-2 text-[0.85rem] border border-[#ddd] rounded focus:border-[#294a3a] focus:ring-1 focus:ring-[#294a3a]/20 outline-none transition-colors bg-white";
  const labelClass = "block text-[0.75rem] font-medium text-[#888] mb-1";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { setError("제목을 입력하세요"); return; }
    if (!youtubeUrl.trim()) { setError("YouTube URL을 입력하세요"); return; }

    let data: LiveFormData;

    if (type === "regular") {
      if (!startTime || !endTime) { setError("시작/종료 시간을 입력하세요"); return; }
      const [sh, sm] = startTime.split(":").map(Number);
      const [eh, em] = endTime.split(":").map(Number);
      if (sh * 60 + sm >= eh * 60 + em) { setError("종료 시간이 시작 시간보다 늦어야 합니다"); return; }
      data = { type: "regular", title, youtube_url: youtubeUrl, day_of_week: dayOfWeek, start_hour: sh, start_minute: sm, end_hour: eh, end_minute: em };
    } else {
      if (!startDateTime || !endDateTime) { setError("시작/종료 일시를 입력하세요"); return; }
      if (new Date(startDateTime) >= new Date(endDateTime)) { setError("종료 시간이 시작 시간보다 늦어야 합니다"); return; }
      data = { type: "temporary", title, youtube_url: youtubeUrl, start_time: toUTC(startDateTime), end_time: toUTC(endDateTime) };
    }

    setSaving(true);
    setError("");
    const result = await onSubmit(data);
    if (result.ok) {
      router.push("/admin/live");
    } else {
      setError(result.error || "저장 실패");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-[560px]">
      {/* 타입 선택 */}
      <div className="mb-5">
        <label className={labelClass}>분류</label>
        <div className="flex gap-3">
          {[
            { value: "regular", label: "📅 정규예배", desc: "매주 반복" },
            { value: "temporary", label: "📌 임시", desc: "날짜 직접 지정" },
          ].map(({ value, label, desc }) => (
            <button
              key={value}
              type="button"
              onClick={() => setType(value as "regular" | "temporary")}
              className={`flex-1 py-3 text-left px-4 rounded border-2 transition-all cursor-pointer ${
                type === value
                  ? "border-[#294a3a] bg-[#294a3a]/5"
                  : "border-[#e0e0e0] hover:border-[#bbb]"
              }`}
            >
              <div className={`text-[0.85rem] font-medium ${type === value ? "text-[#294a3a]" : "text-[#555]"}`}>{label}</div>
              <div className="text-[0.72rem] text-[#aaa] mt-0.5">{desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className={labelClass}>제목 *</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} className={inputClass} placeholder="예: 주일예배 실시간" autoFocus />
      </div>

      <div className="mb-4">
        <label className={labelClass}>YouTube URL *</label>
        <input type="text" value={youtubeUrl} onChange={e => setYoutubeUrl(e.target.value)} className={inputClass}
          placeholder="https://www.youtube.com/channel/.../live" />
        <p className="text-[0.72rem] text-[#aaa] mt-1">채널 라이브 URL 또는 특정 영상 URL</p>
      </div>

      {type === "regular" ? (
        <>
          <div className="mb-4">
            <label className={labelClass}>요일</label>
            <select value={dayOfWeek} onChange={e => setDayOfWeek(Number(e.target.value))} className={inputClass}>
              {DAYS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className={labelClass}>시작 시간 (KST) *</label>
              <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>종료 시간 (KST) *</label>
              <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className={inputClass} />
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className={labelClass}>시작 일시 (KST) *</label>
            <input type="datetime-local" value={startDateTime} onChange={e => setStartDateTime(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>종료 일시 (KST) *</label>
            <input type="datetime-local" value={endDateTime} onChange={e => setEndDateTime(e.target.value)} className={inputClass} />
          </div>
        </div>
      )}

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
