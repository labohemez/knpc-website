import XLSX from "xlsx";
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

// .env.local에서 환경변수 수동 로드
const envFile = readFileSync("D:/knpc/knpc-website/.env.local", "utf-8");
const env = Object.fromEntries(
  envFile.split("\n")
    .filter(l => l.includes("=") && !l.startsWith("#"))
    .map(l => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; })
);

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const wb = XLSX.readFile("D:/dn/강남교회  말씀과찬양  설교  새벽설교_2026_04_04_KR.xlsx");
const ws = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(ws, { header: 1 }).slice(1);

function parseTitle(raw) {
  const parts = raw.split("/").map(s => s.trim());
  const firstPart = parts[0] || "";
  const dateMatch = firstPart.match(/(\d{4}-\d{2}-\d{2})/);
  const date = dateMatch ? dateMatch[1] : null;
  const scripture = parts[1] || null;
  const pastor = parts[2] || null;
  return { date, scripture, pastor };
}

function extractYoutubeUrl(html) {
  const match = html.match(/youtube\.com\/embed\/([^?"&]+)/);
  return match ? `https://www.youtube.com/watch?v=${match[1]}` : null;
}

function extractSoundcloudUrl(html) {
  const match = html.match(/src="(https:\/\/w\.soundcloud\.com\/player\/[^"]+)"/);
  if (!match) return null;
  // 깔끔하게 track URL만 추출
  const trackMatch = match[1].match(/url=([^&]+)/);
  if (!trackMatch) return match[1];
  const trackUrl = decodeURIComponent(trackMatch[1]);
  return `https://w.soundcloud.com/player/?url=${encodeURIComponent(trackUrl)}&color=%23294a3a&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false`;
}

function extractThumbnail(html) {
  const match = html.match(/src="(https:\/\/cdn\.imweb\.me\/[^"]+)"/);
  return match ? match[1] : null;
}

const records = [];

for (const row of rows) {
  const titleRaw = row[1] || "";
  const content = row[2] || "";

  // Google Drive는 건너뜀
  if (content.includes("drive.google.com")) continue;
  // 내용 없으면 건너뜀
  if (!content.trim()) continue;

  const { date, scripture, pastor } = parseTitle(titleRaw);
  if (!date) continue;

  const isYoutube = content.includes("youtube.com");
  const isSoundcloud = content.includes("soundcloud.com");

  if (!isYoutube && !isSoundcloud) continue;

  const record = {
    title: titleRaw.replace(/^\[.*?\]\s*/, "").trim(), // [태그] 제거
    category: "새벽기도회",
    date,
    scripture,
    pastor,
    video_url: isYoutube ? extractYoutubeUrl(content) : null,
    audio_url: isSoundcloud ? extractSoundcloudUrl(content) : null,
    thumbnail_url: isSoundcloud ? extractThumbnail(content) : null,
  };

  records.push(record);
}

console.log(`임포트 대상: ${records.length}개`);
console.log("샘플:", JSON.stringify(records[0], null, 2));
console.log("샘플(SC):", JSON.stringify(records.find(r => r.audio_url), null, 2));

// 50개씩 배치 삽입
const BATCH = 50;
let inserted = 0;
for (let i = 0; i < records.length; i += BATCH) {
  const batch = records.slice(i, i + BATCH);
  const { error } = await supabase.from("sermons").insert(batch);
  if (error) {
    console.error(`배치 ${i}~${i + BATCH} 실패:`, error.message);
  } else {
    inserted += batch.length;
    process.stdout.write(`\r진행: ${inserted}/${records.length}`);
  }
}

console.log(`\n완료! ${inserted}개 삽입됨`);
