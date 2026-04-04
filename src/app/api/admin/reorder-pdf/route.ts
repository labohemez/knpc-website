import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { PDFDocument } from "pdf-lib";
import { supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const pageOrderRaw = formData.get("page_order") as string;
    const date = formData.get("date") as string;
    const bulletinId = formData.get("bulletin_id") as string | null;
    const tempPublicId = formData.get("temp_public_id") as string | null;

    if (!file || !pageOrderRaw || !date) {
      return NextResponse.json({ error: "필수 항목 누락" }, { status: 400 });
    }

    const page_order: number[] = JSON.parse(pageOrderRaw);

    // 원본 PDF 바이트 읽기
    const pdfBytes = await file.arrayBuffer();

    // pdf-lib으로 페이지 재정렬
    const srcDoc = await PDFDocument.load(pdfBytes);
    const newDoc = await PDFDocument.create();
    const copiedPages = await newDoc.copyPages(srcDoc, page_order.map(p => p - 1));
    for (const page of copiedPages) {
      newDoc.addPage(page);
    }
    const newPdfBytes = await newDoc.save();

    // 재정렬된 PDF를 Cloudinary에 업로드
    const folder = `bulletin/${date.slice(0, 4)}`;
    const publicId = `bulletin_${date}`;
    const pdfBuffer = Buffer.from(newPdfBytes);

    function upload(buf: Buffer, options: object) {
      return new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(options, (error, result) => {
            if (error) reject(error);
            else resolve(result as { secure_url: string; public_id: string });
          })
          .end(buf);
      });
    }

    // image: pg_N 썸네일용
    const imageResult = await upload(pdfBuffer, {
      folder, public_id: `img_${publicId}`, resource_type: "image", overwrite: true,
    });
    // raw: 직접 다운로드용 (인증 불필요)
    const rawResult = await upload(pdfBuffer, {
      folder, public_id: `dl_${publicId}`, resource_type: "raw", overwrite: true,
    });

    // 공개 시각: 직접 지정 또는 자동 계산 (주일 전날 토 13:00 KST = UTC 04:00)
    const publishAtOverride = formData.get("publish_at_override") as string | null;
    const publishAt = publishAtOverride
      ? new Date(publishAtOverride)
      : (() => {
          const d = new Date(`${date}T04:00:00Z`);
          d.setUTCDate(d.getUTCDate() - 1);
          return d;
        })();

    // Supabase 저장
    const payload = {
      date,
      title: `주보 ${date}`,
      pdf_public_id: imageResult.public_id,
      pdf_url: rawResult.secure_url,
      page_count: page_order.length,
      publish_at: publishAt.toISOString(),
    };

    let dbError;
    if (bulletinId) {
      ({ error: dbError } = await supabaseAdmin
        .from("bulletins")
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq("id", bulletinId));
    } else {
      ({ error: dbError } = await supabaseAdmin
        .from("bulletins")
        .upsert(payload, { onConflict: "date" }));
    }
    if (dbError) throw dbError;

    revalidatePath("/admin/bulletin");

    // 임시 파일 삭제 (비동기, 실패 무시)
    if (tempPublicId) {
      cloudinary.uploader.destroy(tempPublicId, { resource_type: "image" }).catch(() => {});
    }

    return NextResponse.json({ ok: true, public_id: imageResult.public_id });
  } catch (e) {
    console.error("Reorder error:", e);
    return NextResponse.json({ error: "처리 실패: " + String(e) }, { status: 500 });
  }
}
