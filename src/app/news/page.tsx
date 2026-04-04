import { getNews, type NewsItem } from "@/lib/queries";
import { supabaseAdmin } from "@/lib/supabase";
import NewsClient from "./NewsClient";
import type { Metadata } from "next";

export type BulletinItem = {
  id: string;
  date: string;
  title: string;
  pdf_public_id: string;
  pdf_url: string;
  page_count: number;
};

export const metadata: Metadata = {
  title: "소식",
  description: "강남교회 공지사항, 교회소식, 주보를 확인하세요.",
};

/* 하드코딩 폴백 */
const fallbackNotices: NewsItem[] = [
  { _id: "n1", title: "2026년 부활절 연합예배 안내", category: "공지사항", date: "2026-04-01", isNew: true },
  { _id: "n2", title: "4월 당회 안건 공고", category: "공지사항", date: "2026-03-30", isNew: true },
  { _id: "n3", title: "교회학교 봄학기 등록 안내", category: "공지사항", date: "2026-03-25", isNew: false },
  { _id: "n4", title: "예배당 리모델링 공사 일정 안내", category: "공지사항", date: "2026-03-20", isNew: false },
  { _id: "n5", title: "2026년 사순절 특별새벽기도회 일정", category: "공지사항", date: "2026-03-10", isNew: false },
];

const fallbackNews: NewsItem[] = [
  { _id: "c1", title: "제3회 강남교회 음악회 성황리 마무리", category: "교회소식", date: "2026-03-28", isNew: false },
  { _id: "c2", title: "사순절 특별새벽기도회 은혜 나눔", category: "교회소식", date: "2026-03-20", isNew: false },
  { _id: "c3", title: "노량진 지역 섬김의 날 진행", category: "교회소식", date: "2026-03-15", isNew: false },
];

const fallbackBulletins: NewsItem[] = [
  { _id: "b1", title: "주보 2026년 4월 1일 (종려주일)", category: "교회주보", date: "2026-04-01", isNew: false },
  { _id: "b2", title: "주보 2026년 3월 29일", category: "교회주보", date: "2026-03-29", isNew: false },
  { _id: "b3", title: "주보 2026년 3월 22일", category: "교회주보", date: "2026-03-22", isNew: false },
  { _id: "b4", title: "주보 2026년 3월 15일", category: "교회주보", date: "2026-03-15", isNew: false },
  { _id: "b5", title: "주보 2026년 3월 8일", category: "교회주보", date: "2026-03-08", isNew: false },
];

export default async function NewsPage() {
  let notices: NewsItem[], churchNews: NewsItem[];
  try {
    const [n, c] = await Promise.all([getNews("공지사항", 20), getNews("교회소식", 20)]);
    notices = n.length > 0 ? n : fallbackNotices;
    churchNews = c.length > 0 ? c : fallbackNews;
  } catch {
    notices = fallbackNotices;
    churchNews = fallbackNews;
  }

  const { data } = await supabaseAdmin
    .from("bulletins")
    .select("id, date, title, pdf_public_id, pdf_url, page_count")
    .order("date", { ascending: false })
    .limit(30);

  const bulletinItems: BulletinItem[] = data ?? [];

  return <NewsClient notices={notices} churchNews={churchNews} bulletinItems={bulletinItems} />;
}
