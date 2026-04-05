import { supabase } from "./supabase";

/* ── 설교 ── */
export type Sermon = {
  _id: string;
  title: string;
  category: string;
  scripture?: string;
  pastor?: string;
  date: string;
  videoUrl?: string;
  audioUrl?: string;
  thumbnailUrl?: string;
};

export async function getSermons(category?: string, limit = 20): Promise<Sermon[]> {
  let query = supabase.from("sermons").select("id, title, category, scripture, pastor, date, video_url, audio_url, thumbnail_url").order("date", { ascending: false }).limit(limit);
  if (category) query = query.eq("category", category);
  const { data } = await query;
  return (data || []).map((r) => ({
    _id: r.id,
    title: r.title,
    category: r.category,
    scripture: r.scripture,
    pastor: r.pastor,
    date: r.date,
    videoUrl: r.video_url,
    audioUrl: r.audio_url,
    thumbnailUrl: r.thumbnail_url,
  }));
}

export async function getLatestSermon(): Promise<Sermon | null> {
  const { data } = await supabase.from("sermons").select("id, title, category, scripture, pastor, date, video_url, audio_url, thumbnail_url").order("date", { ascending: false }).limit(1).single();
  if (!data) return null;
  return {
    _id: data.id,
    title: data.title,
    category: data.category,
    scripture: data.scripture,
    pastor: data.pastor,
    date: data.date,
    videoUrl: data.video_url,
    audioUrl: data.audio_url,
    thumbnailUrl: data.thumbnail_url,
  };
}

export async function getLatestSundaySermon(): Promise<Sermon | null> {
  const { data } = await supabase.from("sermons").select("id, title, category, scripture, pastor, date, video_url, audio_url, thumbnail_url").eq("category", "주일예배").order("date", { ascending: false }).limit(1).single();
  if (!data) return null;
  return {
    _id: data.id,
    title: data.title,
    category: data.category,
    scripture: data.scripture,
    pastor: data.pastor,
    date: data.date,
    videoUrl: data.video_url,
    audioUrl: data.audio_url,
    thumbnailUrl: data.thumbnail_url,
  };
}

/* ── 소식 ── */
export type NewsItem = {
  _id: string;
  title: string;
  category: string;
  date: string;
  body?: string;
  isNew?: boolean;
};

export async function getNews(category?: string, limit = 20): Promise<NewsItem[]> {
  let query = supabase.from("news").select("id, title, category, date, body, is_new").order("date", { ascending: false }).limit(limit);
  if (category) query = query.eq("category", category);
  const { data } = await query;
  return (data || []).map((r) => ({
    _id: r.id,
    title: r.title,
    category: r.category,
    date: r.date,
    body: r.body,
    isNew: r.is_new,
  }));
}

export async function getNewsById(id: string) {
  const { data } = await supabase.from("news").select("id, title, category, date, body, is_new").eq("id", id).single();
  if (!data) return null;
  return {
    _id: data.id,
    title: data.title,
    category: data.category,
    date: data.date,
    body: data.body,
    isNew: data.is_new,
  };
}
