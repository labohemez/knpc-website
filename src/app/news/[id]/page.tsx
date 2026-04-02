import { client } from "@/lib/sanity";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

type Props = { params: Promise<{ id: string }> };

/* CMS에서 단일 뉴스 가져오기 */
async function getNewsItem(id: string) {
  try {
    return await client.fetch(
      `*[_type == "news" && _id == $id][0] {
        _id, title, category, date, body, isNew,
        attachments[] { asset-> { url, originalFilename } }
      }`,
      { id }
    );
  } catch {
    return null;
  }
}

/* 폴백 데이터 */
const fallbackData: Record<string, { title: string; category: string; date: string; body: string }> = {
  n1: { title: "2026년 부활절 연합예배 안내", category: "공지사항", date: "2026-04-01", body: "오는 4월 20일(일) 부활절을 맞이하여 전교인 연합예배를 드립니다.\n\n예배 시간: 오전 10시 (1·2부 통합)\n장소: 대예배당\n\n예배 후 교제 시간이 있을 예정이오니 많은 참여 바랍니다.\n성도님들의 가정에 부활의 기쁨이 넘치시길 기도합니다." },
  n2: { title: "4월 당회 안건 공고", category: "공지사항", date: "2026-03-30", body: "2026년 4월 당회에서 다룰 안건을 미리 공지합니다.\n\n1. 상반기 재정 결산 보고\n2. 교회학교 교육 계획\n3. 하반기 선교 사업 계획\n4. 시설 보수 및 관리 안건\n\n관심 있는 교인분들은 확인 바랍니다." },
  n3: { title: "교회학교 봄학기 등록 안내", category: "공지사항", date: "2026-03-25", body: "2026년 봄학기 교회학교(유·초등부, 중고등부) 등록을 받습니다.\n\n등록 기간: 3월 25일 ~ 4월 6일\n등록 장소: 교육부 사무실\n대상: 유아(3세)~고등학생\n\n문의: 교육부 (02-814-7606)" },
  n4: { title: "예배당 리모델링 공사 일정 안내", category: "공지사항", date: "2026-03-20", body: "예배당 내부 리모델링 공사로 인해 일부 공간 이용이 제한됩니다.\n\n공사 기간: 3월 28일(토) ~ 4월 5일(일)\n해당 기간 주일예배: 교육관 대강당에서 진행\n\n불편을 드려 죄송합니다. 더 나은 예배 환경을 위한 공사이니 양해 부탁드립니다." },
  n5: { title: "2026년 사순절 특별새벽기도회 일정", category: "공지사항", date: "2026-03-10", body: "재의 수요일부터 부활절 전날까지 사순절 특별새벽기도회를 진행합니다.\n\n기간: 3월 4일(수) ~ 4월 19일(토)\n시간: 새벽 5시 30분\n장소: 대예배당\n\n주의 고난을 묵상하며 기도하는 40일이 되시길 바랍니다." },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = await getNewsItem(id);
  const fallback = fallbackData[id];
  const title = item?.title || fallback?.title || "소식";
  return { title };
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;
  const cmsItem = await getNewsItem(id);
  const fallback = fallbackData[id];

  const title = cmsItem?.title || fallback?.title || "게시글을 찾을 수 없습니다";
  const category = cmsItem?.category || fallback?.category || "";
  const date = (cmsItem?.date || fallback?.date || "").replace(/-/g, ".");
  const bodyText = fallback?.body || "";
  const hasCmsBody = cmsItem?.body && cmsItem.body.length > 0 && typeof cmsItem.body === "string";

  return (
    <>
      <Header />

      <main className="flex-1 bg-white pt-[70px] lg:pt-[90px]">
        {/* ── 히어로 ── */}
        <section className="relative h-[200px] lg:h-[280px] flex items-end pb-8 lg:pb-12">
          <Image src="/images/gallery-4.jpg" alt="소식" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-primary-dark/80" />
          <div className="relative mx-auto max-w-[1400px] px-5 lg:px-8 w-full">
            <p className="text-accent text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-2">News</p>
            <h1 className="text-[1.8rem] lg:text-[2.4rem] font-bold text-white tracking-[-0.04em] leading-[1.15]">소식</h1>
          </div>
        </section>

        {/* ── 본문 ── */}
        <section className="py-[3rem] lg:py-[4rem]">
          <div className="mx-auto max-w-[900px] px-5 lg:px-8">
            {/* 메타 정보 */}
            <div className="mb-8 pb-6 border-b border-[#eee]">
              <div className="flex items-center gap-2 mb-3">
                {category && (
                  <span className="text-[0.72rem] font-semibold text-primary bg-primary/10 px-2.5 py-1 tracking-[-0.01em]">
                    {category}
                  </span>
                )}
                {date && <span className="text-[0.78rem] text-[#999]">{date}</span>}
              </div>
              <h2 className="text-[1.4rem] lg:text-[1.8rem] font-bold text-[#222] tracking-[-0.04em] leading-[1.35]">
                {title}
              </h2>
            </div>

            {/* 본문 내용 */}
            <div className="prose prose-lg max-w-none">
              {hasCmsBody ? (
                <div
                  className="text-[0.95rem] text-[#444] leading-[2] tracking-[-0.02em] [&>p]:mb-4 [&>h1]:text-[1.5rem] [&>h1]:font-bold [&>h1]:mb-4 [&>h2]:text-[1.25rem] [&>h2]:font-bold [&>h2]:mb-3 [&>h3]:text-[1.1rem] [&>h3]:font-semibold [&>h3]:mb-2 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4 [&>blockquote]:border-l-4 [&>blockquote]:border-[#ddd] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-[#666] [&>blockquote]:mb-4 [&_img]:max-w-full [&_img]:h-auto [&_a]:text-primary [&_a]:underline"
                  dangerouslySetInnerHTML={{ __html: cmsItem.body }}
                />
              ) : (
                bodyText.split("\n").map((line, i) => (
                  <p key={i} className={`text-[0.95rem] text-[#444] leading-[2] tracking-[-0.02em] ${line === "" ? "h-4" : ""}`}>
                    {line}
                  </p>
                ))
              )}
            </div>

            {/* 목록으로 돌아가기 */}
            <div className="mt-12 pt-6 border-t border-[#eee]">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-[0.85rem] font-semibold text-[#555] hover:text-primary transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                목록으로 돌아가기
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
