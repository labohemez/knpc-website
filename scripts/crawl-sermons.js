const puppeteer = require("puppeteer");
const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://uqudbcesacckimcrblqz.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxdWRiY2VzYWNja2ltY3JibHF6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzA2NTkzMiwiZXhwIjoyMDg4NjQxOTMyfQ.Fq_QroNiFtEC4IDgKJfOrkp7DftOWbgddOVAbR4HUKk";
const MAX_PAGES = 6;

async function crawlSermons() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const allSermons = [];

  for (let pageNum = 1; pageNum <= MAX_PAGES; pageNum++) {
    const url = pageNum === 1
      ? "https://knpc.or.kr/message"
      : `https://knpc.or.kr/message?page=${pageNum}`;

    console.log(`크롤링: 페이지 ${pageNum}/${MAX_PAGES}...`);
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
    await new Promise((r) => setTimeout(r, 2000));

    const items = await page.evaluate(() => {
      const results = [];
      const text = document.body.innerText;
      const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);

      for (const line of lines) {
        const match = line.match(/^\[(.+?)\]\s*(\d{4}-\d{2}-\d{2})\s*\/\s*(.+)$/);
        if (match) {
          results.push({
            category: match[1],
            date: match[2],
            pastor: match[3].trim(),
            title: line,
          });
        }
      }
      return results;
    });

    console.log(`  → ${items.length}개 발견`);
    allSermons.push(...items);
  }

  await browser.close();

  console.log(`\n총 ${allSermons.length}개 설교\n`);
  allSermons.forEach((s) => console.log(`${s.date} | ${s.category} | ${s.pastor}`));

  // Supabase에 저장
  if (allSermons.length > 0) {
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log("\nSupabase에 저장 중...");

    const { error } = await supabase.from("sermons").insert(
      allSermons.map((s) => ({
        title: s.title,
        category: s.category,
        date: s.date,
        pastor: s.pastor,
        video_url: "",
      }))
    );

    if (error) {
      console.error("저장 실패:", error.message);
    } else {
      console.log(`${allSermons.length}개 저장 완료!`);
    }
  }
}

crawlSermons().catch(console.error);
