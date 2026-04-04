"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminShell from "../../../components/AdminShell";
import { deleteBulletin } from "../../actions";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

function thumbUrl(publicId: string, page: number) {
  return `https://res.cloudinary.com/${cloudName}/image/upload/w_600,pg_${page}/${publicId}.jpg`;
}

type Bulletin = {
  id: string;
  date: string;
  title: string;
  pdf_public_id: string;
  page_count: number;
};

export default function BulletinEditPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [bulletin, setBulletin] = useState<Bulletin | null>(null);
  const [loading, setLoading] = useState(true);

  // 새 PDF 업로드용 상태
  const [uploading, setUploading] = useState(false);
  const [newPublicId, setNewPublicId] = useState<string | null>(null);
  const [newPageCount, setNewPageCount] = useState(0);
  const [pages, setPages] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const dragIdx = useRef<number | null>(null);
  const fileRef = useRef<File | null>(null);

  useEffect(() => {
    fetch(`/api/admin/bulletin/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setBulletin(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    fileRef.current = file;
    setUploading(true);
    setError(null);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/admin/upload-pdf", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "업로드 실패");
      setNewPublicId(data.public_id);
      setNewPageCount(data.page_count);
      setPages(Array.from({ length: data.page_count }, (_, i) => i + 1));
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
    if (!newPublicId || !bulletin || !fileRef.current) return;
    setSaving(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", fileRef.current);
      fd.append("page_order", JSON.stringify(pages));
      fd.append("date", bulletin.date);
      fd.append("bulletin_id", bulletin.id);
      fd.append("temp_public_id", newPublicId);

      const res = await fetch("/api/admin/reorder-pdf", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "저장 실패");
      router.push("/admin/bulletin");
    } catch (e) {
      setError(String(e));
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!bulletin) return;
    if (!confirm(`${bulletin.date} 주보를 삭제하시겠습니까?`)) return;
    const result = await deleteBulletin(bulletin.id);
    if (result.ok) router.push("/admin/bulletin");
    else alert("삭제 실패: " + result.error);
  }

  if (loading) return (
    <AdminShell>
      <p className="text-[0.85rem] text-[#999]">불러오는 중...</p>
    </AdminShell>
  );

  if (!bulletin) return (
    <AdminShell>
      <p className="text-[0.85rem] text-red-600">주보를 찾을 수 없습니다.</p>
    </AdminShell>
  );

  const pdfUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${bulletin.pdf_public_id}.pdf`;

  return (
    <AdminShell>
        <div className="max-w-[900px]">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => router.back()} className="text-[0.8rem] text-[#666] hover:text-[#333] cursor-pointer">← 뒤로</button>
            <h1 className="text-[1.1rem] font-bold text-[#1a1a1a]">{bulletin.title}</h1>
          </div>

          {/* 현재 주보 페이지 미리보기 */}
          <div className="mb-7">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[0.78rem] font-medium text-[#555]">현재 주보 ({bulletin.page_count}페이지)</p>
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer"
                className="text-[0.75rem] text-[#294a3a] hover:underline cursor-pointer">
                PDF 다운로드 ↗
              </a>
            </div>
            <div className="flex flex-wrap gap-3">
              {Array.from({ length: bulletin.page_count }, (_, i) => i + 1).map((page) => (
                <div key={page} className="flex flex-col items-center gap-1">
                  <div className="border border-[#e0e0e0] rounded overflow-hidden bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={thumbUrl(bulletin.pdf_public_id, page)}
                      alt={`페이지 ${page}`}
                      className="block w-[110px] h-[155px] object-contain"
                    />
                  </div>
                  <span className="text-[0.68rem] text-[#aaa]">p.{page}</span>
                </div>
              ))}
            </div>
          </div>

          {/* PDF 교체 */}
          <div className="mb-6 p-4 bg-[#f9f9f9] border border-[#e8e8e8] rounded">
            <p className="text-[0.78rem] font-medium text-[#555] mb-3">PDF 교체 (선택사항)</p>
            <label className={`inline-flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-[#ccc] rounded cursor-pointer hover:border-[#294a3a] transition-colors text-[0.82rem] text-[#555] ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
              {uploading ? "업로드 중..." : newPublicId ? `✓ 새 파일 준비됨 (${newPageCount}페이지)` : "새 PDF 파일 선택"}
              <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
            </label>

            {newPublicId && pages.length > 0 && (
              <div className="mt-4">
                <p className="text-[0.72rem] text-[#aaa] mb-3">드래그해서 순서를 맞춰주세요</p>
                <div className="grid grid-cols-3 gap-4">
                  {pages.map((pageNum, idx) => (
                    <div
                      key={pageNum}
                      draggable
                      onDragStart={() => handleDragStart(idx)}
                      onDragOver={(e) => handleDragOver(e, idx)}
                      onDrop={() => handleDrop(idx)}
                      onDragEnd={handleDragEnd}
                      onDragLeave={() => setDragOverIdx(null)}
                      className={`flex flex-col items-center gap-2 select-none cursor-grab active:cursor-grabbing transition-transform ${dragOverIdx === idx ? "scale-[1.02]" : ""}`}
                    >
                      <div className={`w-full border-2 rounded overflow-hidden bg-white transition-colors ${dragOverIdx === idx ? "border-[#294a3a]" : "border-[#e0e0e0]"}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={thumbUrl(newPublicId!, pageNum)}
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
          </div>

          {error && <p className="mb-4 text-[0.82rem] text-red-600">{error}</p>}

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={!newPublicId || saving}
                className="px-5 py-2.5 bg-[#294a3a] text-white text-[0.85rem] font-medium rounded hover:bg-[#1e3a2c] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                {saving ? "저장 중..." : "PDF 교체 저장"}
              </button>
              <button onClick={() => router.back()} className="px-5 py-2.5 border border-[#ddd] text-[#555] text-[0.85rem] rounded hover:bg-[#f5f5f5] cursor-pointer transition-colors">
                취소
              </button>
            </div>
            <button onClick={handleDelete} className="px-4 py-2.5 border border-[#fcc] text-[#c00] text-[0.82rem] rounded hover:bg-[#fff5f5] cursor-pointer transition-colors">
              주보 삭제
            </button>
          </div>
        </div>
      </AdminShell>
  );
}
