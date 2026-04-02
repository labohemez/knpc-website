const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const API_KEY = process.env.CLOUDINARY_API_KEY!;
const API_SECRET = process.env.CLOUDINARY_API_SECRET!;

const API_BASE = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}`;

async function cloudinaryFetch(endpoint: string) {
  const url = `${API_BASE}${endpoint}`;
  const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64");
  const res = await fetch(url, {
    headers: { Authorization: `Basic ${auth}` },
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Cloudinary API error: ${res.status}`);
  return res.json();
}

export type GalleryAlbum = {
  name: string;
  path: string;
  title: string;
  date: string;
};

export type GalleryPhoto = {
  public_id: string;
  url: string;
  width: number;
  height: number;
};

/** gallery/ 하위 폴더 목록 → 앨범 목록 */
export async function getGalleryAlbums(): Promise<GalleryAlbum[]> {
  const data = await cloudinaryFetch("/folders/gallery");
  const folders: { name: string; path: string }[] = data.folders || [];

  return folders
    .map((f) => {
      // 폴더명: "2026-04-03_테스트" → date: "2026-04-03", title: "테스트"
      const match = f.name.match(/^(\d{4}-\d{2}-\d{2})_(.+)$/);
      return {
        name: f.name,
        path: f.path,
        date: match ? match[1] : "",
        title: match ? match[2] : f.name,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** 특정 앨범(폴더)의 이미지 목록 — Search API 사용 */
export async function getAlbumPhotos(folderPath: string): Promise<GalleryPhoto[]> {
  const url = `${API_BASE}/resources/search`;
  const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64");
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
    body: JSON.stringify({ expression: `folder:"${folderPath}"`, max_results: 100 }),
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Cloudinary Search error: ${res.status}`);
  const data = await res.json();
  const resources: { public_id: string; secure_url: string; width: number; height: number }[] = data.resources || [];

  return resources.map((r) => ({
    public_id: r.public_id,
    url: r.secure_url,
    width: r.width,
    height: r.height,
  }));
}

/** Cloudinary URL에 변환 파라미터 추가 */
export function cloudinaryUrl(url: string, transforms: string) {
  return url.replace("/upload/", `/upload/${transforms}/`);
}
