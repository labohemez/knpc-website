"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  url: string;
  pageCount: number;
}

export default function PdfViewer({ url, pageCount }: Props) {
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [rendered, setRendered] = useState<boolean[]>(Array(pageCount).fill(false));
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setRendered(Array(pageCount).fill(false));
    setError(false);

    async function render() {
      try {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        const pdf = await pdfjsLib.getDocument({ url }).promise;

        for (let i = 0; i < pdf.numPages; i++) {
          if (cancelled) break;

          const page = await pdf.getPage(i + 1);
          const viewport = page.getViewport({ scale: 2.5 });

          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.width = "100%";
          canvas.style.display = "block";

          const ctx = canvas.getContext("2d")!;
          await page.render({ canvasContext: ctx, canvas, viewport }).promise;

          if (!cancelled && slotRefs.current[i]) {
            slotRefs.current[i]!.innerHTML = "";
            slotRefs.current[i]!.appendChild(canvas);
            setRendered((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }
        }
      } catch {
        if (!cancelled) setError(true);
      }
    }

    render();

    return () => { cancelled = true; };
  }, [url, pageCount]);

  if (error) {
    return (
      <div className="flex items-center justify-center py-16 text-[0.85rem] text-red-400">
        PDF를 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {Array.from({ length: pageCount }, (_, i) => (
        <div key={i} className="relative w-full">
          {/* 스켈레톤 */}
          {!rendered[i] && (
            <div className="w-full aspect-[3/4] bg-[#f0f0f0] animate-pulse flex items-center justify-center">
              <span className="text-[0.78rem] text-[#bbb]">{i + 1} / {pageCount}</span>
            </div>
          )}
          {/* 캔버스 슬롯 */}
          <div
            ref={(el) => { slotRefs.current[i] = el; }}
            className={rendered[i] ? "block" : "hidden"}
          />
        </div>
      ))}
    </div>
  );
}
