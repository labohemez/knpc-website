import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data } = await supabaseAdmin
    .from("bulletins")
    .select("pdf_url, date, title")
    .eq("id", id)
    .single();

  if (!data?.pdf_url) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const res = await fetch(data.pdf_url);
  if (!res.ok) return NextResponse.json({ error: "PDF 로드 실패" }, { status: 502 });

  const bytes = await res.arrayBuffer();
  const filename = encodeURIComponent(`주보_${data.date}.pdf`);

  return new NextResponse(bytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename*=UTF-8''${filename}`,
    },
  });
}
