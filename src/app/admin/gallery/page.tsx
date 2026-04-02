"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AdminShell from "../components/AdminShell";

type Album = { name: string; title: string; date: string; photoCount: number; thumbnail: string };

export default function AdminGalleryPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/gallery")
      .then((r) => r.json())
      .then((data) => { setAlbums(data.albums || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[1.1rem] font-bold text-[#222] tracking-[-0.03em]">갤러리 관리</h2>
        <Link href="/admin/gallery/new" className="px-4 py-2 bg-[#294a3a] text-white text-[0.8rem] font-medium hover:bg-[#1e3a2d] transition-colors">
          앨범 추가
        </Link>
      </div>

      {loading ? (
        <p className="text-[#999] text-[0.85rem]">로딩 중...</p>
      ) : albums.length === 0 ? (
        <p className="text-[#999] text-[0.85rem]">등록된 앨범이 없습니다. Cloudinary에 gallery/ 폴더를 만들고 사진을 업로드하세요.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {albums.map((album) => (
            <Link key={album.name} href={`/admin/gallery/${encodeURIComponent(album.name)}/edit`}
              className="group bg-white border border-[#eee] overflow-hidden hover:border-[#ccc] transition-colors">
              <div className="relative aspect-[4/3] bg-[#f0f0f0]">
                {album.thumbnail ? (
                  <Image src={album.thumbnail} alt={album.title} fill className="object-cover" sizes="300px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#ccc] text-[0.8rem]">No Image</div>
                )}
              </div>
              <div className="p-3">
                <h3 className="text-[0.85rem] font-medium text-[#222] truncate">{album.title}</h3>
                <p className="text-[0.72rem] text-[#999] mt-0.5">{album.date} · {album.photoCount}장</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
