import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const albumName = decodeURIComponent(id);
  const folderPath = `gallery/${albumName}`;

  try {
    const result = await cloudinary.search
      .expression(`folder:"${folderPath}"`)
      .max_results(100)
      .sort_by("created_at", "asc")
      .execute();

    const photos = (result.resources || []).map((r: { secure_url: string; public_id: string }) => ({
      url: r.secure_url,
      public_id: r.public_id,
    }));

    return NextResponse.json({ photos });
  } catch (e) {
    console.error("Album photos error:", e);
    return NextResponse.json({ photos: [] });
  }
}
