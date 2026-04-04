import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data } = await supabaseAdmin
    .from("bulletins")
    .select("pdf_url, date")
    .eq("id", id)
    .single();

  if (!data?.pdf_url) {
    return new NextResponse("Not found", { status: 404 });
  }

  const res = await fetch(data.pdf_url);
  if (!res.ok) return new NextResponse("PDF fetch failed", { status: 502 });

  const buf = await res.arrayBuffer();
  const date = data.date ?? "주보";

  return new NextResponse(buf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename*=UTF-8''${encodeURIComponent(`주보_${date}`)}.pdf`,
      "Cache-Control": "public, max-age=86400",
    },
  });
}
