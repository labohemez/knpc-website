"use client";

import { useEffect, useRef, useState } from "react";

export default function PdfViewer({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    container.innerHTML = "";
    setLoading(true);
    setError(false);

    async function render() {
      try {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        const pdf = await pdfjsLib.getDocument({ url }).promise;

        for (let i = 1; i <= pdf.numPages; i++) {
          if (cancelled) break;

          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2.5 });

          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.width = "100%";
          canvas.style.display = "block";

          if (!cancelled && containerRef.current) containerRef.current.appendChild(canvas);

          const ctx = canvas.getContext("2d")!;
          await page.render({ canvasContext: ctx, canvas, viewport }).promise;
        }

        if (!cancelled) setLoading(false);
      } catch {
        if (!cancelled) { setError(true); setLoading(false); }
      }
    }

    render();

    return () => {
      cancelled = true;
      container.innerHTML = "";
    };
  }, [url]);

  return (
    <div className="relative">
      {loading && (
        <div className="flex items-center justify-center py-16 text-[0.85rem] text-[#999]">
          불러오는 중...
        </div>
      )}
      {error && (
        <div className="flex items-center justify-center py-16 text-[0.85rem] text-red-400">
          PDF를 불러올 수 없습니다.
        </div>
      )}
      <div ref={containerRef} className="flex flex-col" />
    </div>
  );
}
