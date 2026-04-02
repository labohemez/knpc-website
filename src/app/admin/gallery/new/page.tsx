"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "../../components/AdminShell";
import ImageUploader from "../../components/ImageUploader";

export default function NewAlbumPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [images, setImages] = useState<{ url: string; public_id: string }[]>([]);
  const [saving, setSaving] = useState(false);

  const folderName = `gallery/${date}_${title || "새앨범"}`;

  const handleSave = () => {
    if (!title.trim()) { alert("앨범 이름을 입력하세요"); return; }
    if (images.length === 0) { alert("사진을 1장 이상 업로드하세요"); return; }
    setSaving(true);
    // 이미 Cloudinary에 업로드 완료된 상태이므로 별도 저장 불필요
    // 폴더가 자동 생성됨
    router.push("/admin/gallery");
  };

  const inputClass = "w-full px-3 py-2 text-[0.85rem] border border-[#ddd] focus:border-[#294a3a] focus:ring-1 focus:ring-[#294a3a]/20 outline-none transition-colors bg-white";
  const labelClass = "block text-[0.75rem] font-medium text-[#888] mb-1";

  return (
    <AdminShell>
      <h2 className="text-[1.1rem] font-bold text-[#222] tracking-[-0.03em] mb-5">앨범 추가</h2>
      <div className="bg-white border border-[#eee] p-6">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className={labelClass}>앨범 이름 *</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} placeholder="예: 부활절예배" autoFocus />
          </div>
          <div>
            <label className={labelClass}>날짜</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} />
          </div>
        </div>

        <div className="mb-4">
          <label className={labelClass}>사진 업로드</label>
          <ImageUploader folder={folderName} images={images} onChange={setImages} />
        </div>

        <div className="flex gap-2">
          <button onClick={handleSave} disabled={saving}
            className="px-5 py-2 bg-[#294a3a] text-white text-[0.8rem] font-medium hover:bg-[#1e3a2d] disabled:opacity-50 transition-colors">
            {saving ? "저장 중..." : "앨범 저장"}
          </button>
          <button onClick={() => router.push("/admin/gallery")}
            className="px-5 py-2 border border-[#ddd] text-[0.8rem] text-[#666] hover:bg-[#f5f5f5] transition-colors">
            취소
          </button>
        </div>
      </div>
    </AdminShell>
  );
}
