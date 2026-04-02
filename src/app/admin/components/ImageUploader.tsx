"use client";

import { useCallback, useState } from "react";
import Image from "next/image";

interface UploadedImage {
  url: string;
  public_id: string;
}

interface Props {
  folder: string;
  images: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
}

export default function ImageUploader({ folder, images, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState("");

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);

    const newImages: UploadedImage[] = [...images];
    for (let i = 0; i < files.length; i++) {
      setProgress(`${i + 1} / ${files.length} 업로드 중...`);
      const form = new FormData();
      form.append("file", files[i]);
      form.append("folder", folder);

      try {
        const res = await fetch("/api/admin/upload", { method: "POST", body: form });
        if (res.ok) {
          const data = await res.json();
          newImages.push({ url: data.url, public_id: data.public_id });
        }
      } catch (e) {
        console.error("Upload failed:", e);
      }
    }

    onChange(newImages);
    setUploading(false);
    setProgress("");
  }, [folder, images, onChange]);

  const removeImage = (idx: number) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  return (
    <div>
      {/* 업로드된 이미지 미리보기 */}
      {images.length > 0 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-3">
          {images.map((img, idx) => (
            <div key={idx} className="relative aspect-square bg-[#f0f0f0] group">
              <Image src={img.url} alt="" fill className="object-cover" sizes="300px" />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-1 right-1 w-5 h-5 bg-black/60 text-white text-[10px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >✕</button>
            </div>
          ))}
        </div>
      )}

      {/* 업로드 영역 */}
      <label
        className={`block border border-dashed border-[#ccc] p-6 text-center cursor-pointer hover:border-[#294a3a] hover:bg-[#fafafa] transition-colors ${uploading ? "pointer-events-none opacity-50" : ""}`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
          disabled={uploading}
        />
        {uploading ? (
          <p className="text-[0.8rem] text-[#999]">{progress}</p>
        ) : (
          <>
            <p className="text-[0.85rem] text-[#666]">클릭 또는 드래그하여 사진 업로드</p>
            <p className="text-[0.72rem] text-[#bbb] mt-1">여러 장 동시 선택 가능</p>
          </>
        )}
      </label>
    </div>
  );
}
