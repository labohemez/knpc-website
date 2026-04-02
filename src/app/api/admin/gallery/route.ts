import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    // gallery/ 하위 폴더 목록
    const foldersResult = await cloudinary.api.sub_folders("gallery");
    const folders: { name: string; path: string }[] = foldersResult.folders || [];

    const albums = await Promise.all(
      folders.map(async (f) => {
        const match = f.name.match(/^(\d{4}-\d{2}-\d{2})_(.+)$/);
        const date = match ? match[1] : "";
        const title = match ? match[2] : f.name;

        // 폴더 내 이미지 수 + 첫 번째 이미지 (썸네일)
        const search = await cloudinary.search
          .expression(`folder:"${f.path}"`)
          .max_results(1)
          .sort_by("created_at", "desc")
          .execute();

        const thumbnail = search.resources?.[0]?.secure_url || "";
        const photoCount = search.total_count || 0;

        return { name: f.name, title, date, photoCount, thumbnail };
      })
    );

    albums.sort((a, b) => b.date.localeCompare(a.date));
    return NextResponse.json({ albums });
  } catch (e) {
    console.error("Gallery API error:", e);
    return NextResponse.json({ albums: [] });
  }
}
