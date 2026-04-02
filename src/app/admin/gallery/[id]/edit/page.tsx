"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import AdminShell from "../../../components/AdminShell";
import ImageUploader from "../../../components/ImageUploader";

type Photo = { url: string; public_id: string };

export default function EditAlbumPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const albumName = decodeURIComponent(id);
  const match = albumName.match(/^(\d{4}-\d{2}-\d{2})_(.+)$/);
  const title = match ? match[2] : albumName;
  const date = match ? match[1] : "";

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/gallery/${encodeURIComponent(albumName)}`)
      .then((r) => r.json())
      .then((data) => { setPhotos(data.photos || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [albumName]);

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[1.1rem] font-bold text-[#222] tracking-[-0.03em]">{title}</h2>
          <p className="text-[0.8rem] text-[#999]">{date} · {photos.length}장</p>
        </div>
        <button onClick={() => router.push("/admin/gallery")}
          className="px-4 py-2 border border-[#ddd] text-[0.8rem] text-[#666] hover:bg-[#f5f5f5] transition-colors">
          목록으로
        </button>
      </div>

      <div className="bg-white border border-[#eee] p-6">
        {loading ? (
          <p className="text-[#999] text-[0.85rem]">로딩 중...</p>
        ) : (
          <>
            {/* 기존 사진 */}
            {photos.length > 0 && (
              <div className="mb-4">
                <p className="text-[0.75rem] font-medium text-[#888] mb-2">현재 사진</p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {photos.map((p, idx) => (
                    <div key={idx} className="relative aspect-square bg-[#f0f0f0]">
                      <Image src={p.url} alt="" fill className="object-cover" sizes="300px" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 추가 업로드 */}
            <div>
              <p className="text-[0.75rem] font-medium text-[#888] mb-2">사진 추가</p>
              <ImageUploader
                folder={`gallery/${albumName}`}
                images={[]}
                onChange={(newImages) => {
                  setPhotos([...photos, ...newImages]);
                }}
              />
            </div>
          </>
        )}
      </div>
    </AdminShell>
  );
}
