"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "../../components/AdminShell";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

// PDF 원본 순서 → 올바른 순서 매핑 (예: 원본 1번째 페이지가 실제 1번, 원본 2번째가 실제 3번...)
// "1,4,2,6,3,5" 형식으로 입력 — 원본 PDF의 페이지 순서를 의미
const DEFAULT_PAGE_ORDER = "1,4,2,6,3,5";

function parseOrder(str: string, pageCount: number): number[] {
  const parsed = str.split(",").map((s) => parseInt(s.trim(), 10)).filter((n) => !isNaN(n) && n >= 1 && n <= pageCount);
  // 입력값 개수가 맞으면 사용, 아니면 기본순서
  return parsed.length === pageCount ? parsed : Array.from({ length: pageCount }, (_, i) => i + 1);
}

function thumbUrl(publicId: string, page: number) {
  return `https://res.cloudinary.com/${cloudName}/image/upload/w_600,pg_${page}/${publicId}.jpg`;
}

export default function BulletinNewPage() {
  const router = useRouter();
  const today = (() => {
    const d = new Date();
    const day = d.getDay(); // 0=일, 1=월 ... 6=토
    const daysUntilSunday = day === 0 ? 7 : 7 - day;
    d.setDate(d.getDate() + daysUntilSunday);
    return d.toISOString().slice(0, 10);
  })();

  const [uploading, setUploading] = useState(false);
  const [publicId, setPublicId] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [pages, setPages] = useState<number[]>([]);
  const [date, setDate] = useState(today);
  const [orderInput, setOrderInput] = useState(DEFAULT_PAGE_ORDER);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const dragIdx = useRef<number | null>(null);
  const fileRef = useRef<File | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setPublicId(null);

    fileRef.current = file; // 원본 파일 보관 (저장 시 재사용)

    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch("/api/admin/upload-pdf", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "업로드 실패");

      setPublicId(data.public_id);
      setPageCount(data.page_count);
      setPages(parseOrder(orderInput, data.page_count));
    } catch (e) {
      setError(String(e));
    } finally {
      setUploading(false);
    }
  }

  function handleDragStart(idx: number) {
    dragIdx.current = idx;
  }

  function handleDragOver(e: React.DragEvent, idx: number) {
    e.preventDefault();
    setDragOverIdx(idx);
  }

  function handleDrop(idx: number) {
    const from = dragIdx.current;
    setDragOverIdx(null);
    if (from === null || from === idx) return;
    const arr = [...pages];
    const [moved] = arr.splice(from, 1);
    arr.splice(idx, 0, moved);
    setPages(arr);
    dragIdx.current = null;
  }

  function handleDragEnd() {
    dragIdx.current = null;
    setDragOverIdx(null);
  }

  async function handleSave() {
    if (!publicId || !fileRef.current) return;
    setSaving(true);
    setError(null);

    try {
      const fd = new FormData();
      fd.append("file", fileRef.current);
      fd.append("page_order", JSON.stringify(pages));
      fd.append("date", date);
      fd.append("temp_public_id", publicId);

      const res = await fetch("/api/admin/reorder-pdf", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "저장 실패");
      router.push("/admin/bulletin");
    } catch (e) {
      setError(String(e));
      setSaving(false);
    }
  }

  const isDefaultOrder = pages.every((p, i) => p === i + 1);

  return (
    <AdminShell>
      <div>
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.back()} className="text-[0.8rem] text-[#666] hover:text-[#333] cursor-pointer">
            ← 뒤로
          </button>
          <h1 className="text-[1.1rem] font-bold text-[#1a1a1a]">주보 등록</h1>
        </div>

        {/* 날짜 + PDF 업로드 */}
        <div className="flex items-end gap-4 mb-4">
          <div>
            <label className="block text-[0.78rem] font-medium text-[#555] mb-1.5">날짜</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="px-3 py-2 border border-[#e0e0e0] rounded text-[0.85rem] focus:outline-none focus:border-[#294a3a]"
            />
          </div>
          <div>
            <label className="block text-[0.78rem] font-medium text-[#555] mb-1.5">페이지 순서 (원본 기준)</label>
            <input
              type="text"
              value={orderInput}
              onChange={(e) => setOrderInput(e.target.value)}
              placeholder="예: 1,4,2,6,3,5"
              className="px-3 py-2 border border-[#e0e0e0] rounded text-[0.85rem] focus:outline-none focus:border-[#294a3a] w-[160px]"
            />
          </div>
          <div>
            <label className="block text-[0.78rem] font-medium text-[#555] mb-1.5">PDF 파일</label>
            <label className={`inline-flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-[#ccc] rounded cursor-pointer hover:border-[#294a3a] transition-colors text-[0.82rem] text-[#555] ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
              {uploading ? "업로드 중..." : publicId ? `✓ 업로드 완료 (${pageCount}페이지) — 다른 파일 선택` : "PDF 파일 선택"}
              <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
            </label>
          </div>
        </div>

        {/* 페이지 썸네일 + 드래그 정렬 */}
        {publicId && pages.length > 0 && (
          <div className="mb-7">
            <p className="text-[0.78rem] font-medium text-[#555] mb-1">
              페이지 순서 조정
              {isDefaultOrder
                ? <span className="ml-2 text-[#aaa] font-normal">— 원본 순서 그대로</span>
                : <span className="ml-2 text-[#294a3a] font-normal">— 순서 변경됨</span>}
            </p>
            <p className="text-[0.72rem] text-[#aaa] mb-4">드래그해서 올바른 순서로 정렬하세요</p>

            <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${pages.length}, 1fr)` }}>
              {pages.map((pageNum, idx) => (
                <div
                  key={pageNum}
                  draggable
                  onDragStart={() => handleDragStart(idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDrop={() => handleDrop(idx)}
                  onDragEnd={handleDragEnd}
                  onDragLeave={() => setDragOverIdx(null)}
                  className={`flex flex-col items-center gap-2 select-none cursor-grab active:cursor-grabbing transition-transform min-w-0 ${dragOverIdx === idx ? "scale-[1.02]" : ""}`}
                >
                  <div className={`w-full border-2 rounded overflow-hidden bg-white transition-colors ${dragOverIdx === idx ? "border-[#294a3a]" : "border-[#e0e0e0]"}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={thumbUrl(publicId, pageNum)}
                      alt={`p.${pageNum}`}
                      className="block w-full aspect-[3/4] object-contain pointer-events-none"
                    />
                  </div>
                  <div className="text-center">
                    <span className="text-[0.78rem] font-bold text-[#294a3a]">{idx + 1}번째</span>
                    <span className="text-[0.72rem] text-[#bbb] ml-1.5">원본 p.{pageNum}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && <p className="mb-4 text-[0.82rem] text-red-600">{error}</p>}

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={!publicId || saving}
            className="px-5 py-2.5 bg-[#294a3a] text-white text-[0.85rem] font-medium rounded hover:bg-[#1e3a2c] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            {saving ? "저장 중..." : "저장"}
          </button>
          <button
            onClick={() => router.back()}
            className="px-5 py-2.5 border border-[#ddd] text-[#555] text-[0.85rem] rounded hover:bg-[#f5f5f5] cursor-pointer transition-colors"
          >
            취소
          </button>
        </div>
      </div>
    </AdminShell>
  );
}
