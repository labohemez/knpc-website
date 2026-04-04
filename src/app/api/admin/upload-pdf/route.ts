import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { PDFDocument } from "pdf-lib";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    if (!file) return NextResponse.json({ error: "파일 없음" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 페이지 수 파악
    const pdfDoc = await PDFDocument.load(buffer);
    const pageCount = pdfDoc.getPageCount();

    // Cloudinary에 업로드 (resource_type: "image" → pg_N 변환 가능)
    const result = await new Promise<{ secure_url: string; public_id: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "bulletin/temp", resource_type: "image" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result as { secure_url: string; public_id: string });
            }
          )
          .end(buffer);
      }
    );

    return NextResponse.json({ public_id: result.public_id, page_count: pageCount });
  } catch (e) {
    console.error("PDF upload error:", e);
    return NextResponse.json({ error: "업로드 실패" }, { status: 500 });
  }
}
