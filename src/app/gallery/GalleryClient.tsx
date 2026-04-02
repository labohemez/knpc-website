"use client";

import { useState } from "react";
import Image from "next/image";

type Album = {
  name: string;
  title: string;
  date: string;
  thumbnail: string;
  photos: { url: string; original: string; width: number; height: number }[];
};

export default function GalleryClient({ albums }: { albums: Album[] }) {
  const [openAlbum, setOpenAlbum] = useState<Album | null>(null);
  const [lightbox, setLightbox] = useState<{ url: string; idx: number } | null>(null);

  return (
    <>
      {/* 앨범 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        {albums.map((album) => (
          <button
            key={album.name}
            onClick={() => setOpenAlbum(album)}
            className="group relative w-full aspect-[4/3] overflow-hidden bg-[#f0ede8] block cursor-pointer text-left"
          >
            {album.thumbnail ? (
              <Image src={album.thumbnail} alt={album.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
            ) : (
              <div className="w-full h-full bg-[#e5e5e5] flex items-center justify-center text-[#999]">No Image</div>
            )}
            <div className="absolute inset-0 bg-primary-dark/0 group-hover:bg-primary-dark/50 transition-colors duration-300 flex items-end">
              <div className="p-5 lg:p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-white text-[1rem] lg:text-[1.1rem] font-bold tracking-[-0.03em]">{album.title}</h3>
                <p className="text-white/50 text-[0.78rem] mt-1">{album.date.replace(/-/g, ".")} · {album.photos.length}장</p>
              </div>
            </div>
            {/* 항상 보이는 하단 정보 */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 group-hover:opacity-0 transition-opacity">
              <h3 className="text-white text-[0.9rem] font-bold tracking-[-0.03em]">{album.title}</h3>
              <p className="text-white/60 text-[0.72rem] mt-0.5">{album.date.replace(/-/g, ".")} · {album.photos.length}장</p>
            </div>
          </button>
        ))}
      </div>

      {/* 앨범 상세 모달 */}
      {openAlbum && (
        <div className="fixed inset-0 z-[9998] bg-white overflow-auto">
          <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-[#eee] z-10">
            <div className="mx-auto max-w-[1400px] px-5 lg:px-8 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-[1.2rem] font-bold text-[#222] tracking-[-0.03em]">{openAlbum.title}</h2>
                <p className="text-[0.8rem] text-[#999]">{openAlbum.date.replace(/-/g, ".")} · {openAlbum.photos.length}장</p>
              </div>
              <button onClick={() => setOpenAlbum(null)} className="w-10 h-10 flex items-center justify-center text-[#999] hover:text-[#333] transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8 py-6">
            <div className="max-w-[900px] mx-auto space-y-3">
              {openAlbum.photos.map((photo, idx) => (
                <button key={idx} onClick={() => setLightbox({ url: photo.original, idx })}
                  className="relative w-full overflow-hidden bg-[#f0f0f0] cursor-pointer group block"
                  style={{ aspectRatio: `${photo.width}/${photo.height}` }}>
                  <Image src={photo.url} alt={`${openAlbum.title} ${idx + 1}`} fill className="object-cover group-hover:brightness-95 transition-all duration-300" sizes="900px" unoptimized />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 라이트박스 */}
      {lightbox && openAlbum && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center text-white/70 hover:text-white z-10">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {/* 이전/다음 */}
          {lightbox.idx > 0 && (
            <button onClick={(e) => { e.stopPropagation(); setLightbox({ url: openAlbum.photos[lightbox.idx - 1].original, idx: lightbox.idx - 1 }); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-white/70 hover:text-white">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </button>
          )}
          {lightbox.idx < openAlbum.photos.length - 1 && (
            <button onClick={(e) => { e.stopPropagation(); setLightbox({ url: openAlbum.photos[lightbox.idx + 1].original, idx: lightbox.idx + 1 }); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-white/70 hover:text-white">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </button>
          )}
          <div className="relative w-full max-w-[1000px] h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <Image src={lightbox.url} alt="" fill className="object-contain" sizes="100vw" />
          </div>
          <p className="absolute bottom-6 text-white/50 text-[0.8rem]">{lightbox.idx + 1} / {openAlbum.photos.length}</p>
        </div>
      )}
    </>
  );
}
