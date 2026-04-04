"use client";

import Link from "next/link";
import { deleteBulletin } from "./actions";

type Bulletin = {
  id: string;
  date: string;
  title: string;
  pdf_public_id: string;
  pdf_url: string;
  page_count: number;
  created_at: string;
};

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export default function BulletinList({ bulletins }: { bulletins: Bulletin[] }) {
  if (bulletins.length === 0) {
    return <p className="text-[0.85rem] text-[#999] py-8 text-center">등록된 주보가 없습니다.</p>;
  }

  async function handleDelete(id: string, date: string) {
    if (!confirm(`${date} 주보를 삭제하시겠습니까?`)) return;
    const result = await deleteBulletin(id);
    if (!result.ok) alert("삭제 실패: " + result.error);
  }

  return (
    <div className="space-y-3">
      {bulletins.map((b) => {
        const pdfUrl = `/api/admin/bulletin/${b.id}/pdf`;
        const thumb = `https://res.cloudinary.com/${cloudName}/image/upload/w_80,h_110,c_fit,pg_1/${b.pdf_public_id}.jpg`;

        return (
          <div key={b.id} className="flex items-center gap-4 p-4 bg-white border border-[#e8e8e8] rounded">
            {/* 1페이지 썸네일 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumb} alt={b.title} className="w-[50px] h-[70px] object-contain border border-[#eee] rounded flex-shrink-0" />

            <div className="flex-1 min-w-0">
              <p className="text-[0.88rem] font-medium text-[#1a1a1a]">{b.title}</p>
              <p className="text-[0.75rem] text-[#999] mt-0.5">{b.date} · {b.page_count}페이지</p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-[0.78rem] border border-[#ddd] text-[#555] rounded hover:bg-[#f5f5f5] cursor-pointer transition-colors"
              >
                PDF 보기
              </a>
              <Link
                href={`/admin/bulletin/${b.id}/edit`}
                className="px-3 py-1.5 text-[0.78rem] border border-[#ddd] text-[#555] rounded hover:bg-[#f5f5f5] cursor-pointer transition-colors"
              >
                수정
              </Link>
              <button
                onClick={() => handleDelete(b.id, b.date)}
                className="px-3 py-1.5 text-[0.78rem] border border-[#fcc] text-[#c00] rounded hover:bg-[#fff5f5] cursor-pointer transition-colors"
              >
                삭제
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
