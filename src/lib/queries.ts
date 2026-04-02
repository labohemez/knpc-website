import { client } from "./sanity";
import imageUrlBuilder from "@sanity/image-url";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

/* ── 이미지 URL 빌더 ── */
const builder = imageUrlBuilder(client);
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/* ── 설교 ── */
export type Sermon = {
  _id: string;
  title: string;
  category: string;
  scripture?: string;
  pastor?: string;
  date: string;
  videoUrl?: string;
  thumbnail?: SanityImageSource;
  audioFile?: { asset: { url: string } };
};

export async function getSermons(category?: string, limit = 20): Promise<Sermon[]> {
  const filter = category
    ? `*[_type == "sermon" && category == $category]`
    : `*[_type == "sermon"]`;
  return client.fetch(
    `${filter} | order(date desc) [0...$limit] {
      _id, title, category, scripture, pastor, date, videoUrl,
      thumbnail, audioFile { asset-> { url } }
    }`,
    { category, limit }
  );
}

export async function getLatestSermon(): Promise<Sermon | null> {
  return client.fetch(
    `*[_type == "sermon"] | order(date desc) [0] {
      _id, title, category, scripture, pastor, date, videoUrl,
      thumbnail, audioFile { asset-> { url } }
    }`
  );
}

/* ── 소식 ── */
export type NewsItem = {
  _id: string;
  title: string;
  category: string;
  date: string;
  body?: string;
  attachments?: { asset: { url: string; originalFilename: string } }[];
  isNew?: boolean;
};

export async function getNews(category?: string, limit = 20): Promise<NewsItem[]> {
  const filter = category
    ? `*[_type == "news" && category == $category]`
    : `*[_type == "news"]`;
  return client.fetch(
    `${filter} | order(date desc) [0...$limit] {
      _id, title, category, date, body, isNew,
      attachments[] { asset-> { url, originalFilename } }
    }`,
    { category, limit }
  );
}

/* ── 갤러리 ── */
export type GalleryAlbum = {
  _id: string;
  title: string;
  date: string;
  thumbnail?: SanityImageSource;
  photos?: { asset: SanityImageSource; caption?: string }[];
};

export async function getGalleryAlbums(limit = 30): Promise<GalleryAlbum[]> {
  return client.fetch(
    `*[_type == "gallery"] | order(date desc) [0...$limit] {
      _id, title, date, thumbnail,
      photos[] { asset, caption }
    }`,
    { limit }
  );
}

/* ── 예배 안내 ── */
export type Worship = {
  _id: string;
  name: string;
  times: string[];
  location?: string;
  order?: number;
};

export async function getWorshipInfo(): Promise<Worship[]> {
  return client.fetch(
    `*[_type == "worship"] | order(order asc) {
      _id, name, times, location, order
    }`
  );
}

/* ── 사이트 설정 ── */
export type SiteSettings = {
  annualSlogan?: string;
  year?: number;
  verse?: string;
  verseRef?: string;
  subtitle?: string;
  offeringAccount?: string;
  address?: string;
  phone?: string;
  fax?: string;
  email?: string;
  prayerEmail?: string;
  youtubeUrl?: string;
};

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(
    `*[_type == "siteSettings"][0] {
      annualSlogan, year, verse, verseRef, subtitle,
      offeringAccount, address, phone, fax, email, prayerEmail, youtubeUrl
    }`
  );
}

/* ── 배너 ── */
export type Banner = {
  _id: string;
  title?: string;
  image: SanityImageSource;
  order?: number;
  isActive?: boolean;
};

export async function getBanners(): Promise<Banner[]> {
  return client.fetch(
    `*[_type == "banner" && isActive == true] | order(order asc) {
      _id, title, image, order, isActive
    }`
  );
}
