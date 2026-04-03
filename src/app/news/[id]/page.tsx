import { getNewsById } from "@/lib/queries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = await getNewsById(id);
  return { title: item?.title || "소식" };
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;
  const item = await getNewsById(id);

  if (!item) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-white pt-[100px] lg:pt-[120px]">
          <div className="mx-auto max-w-[900px] px-5 lg:px-8 py-20 text-center">
            <p className="text-[#999] text-[1rem]">게시글을 찾을 수 없습니다</p>
            <Link href="/news" className="inline-block mt-4 text-primary text-[0.85rem] hover:underline">목록으로 돌아가기</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const date = item.date.replace(/-/g, ".");

  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <section className="relative h-[280px] lg:h-[370px] flex items-end pb-8 lg:pb-12">
          <Image src="/images/gallery-4.jpg" alt="소식" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-primary-dark/80" />
          <div className="relative mx-auto max-w-[1400px] px-5 lg:px-8 w-full">
            <p className="text-accent text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-2">News</p>
            <h1 className="text-[1.8rem] lg:text-[2.4rem] font-bold text-white tracking-[-0.04em] leading-[1.15]">소식</h1>
          </div>
        </section>

        <section className="py-[3rem] lg:py-[4rem]">
          <div className="mx-auto max-w-[900px] px-5 lg:px-8">
            <div className="mb-8 pb-6 border-b border-[#eee]">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[0.72rem] font-semibold text-primary bg-primary/10 px-2.5 py-1 tracking-[-0.01em]">{item.category}</span>
                <span className="text-[0.78rem] text-[#999]">{date}</span>
              </div>
              <h2 className="text-[1.4rem] lg:text-[1.8rem] font-bold text-[#222] tracking-[-0.04em] leading-[1.35]">{item.title}</h2>
            </div>

            <div className="prose prose-lg max-w-none">
              {item.body ? (
                <div
                  className="text-[0.95rem] text-[#444] leading-[2] tracking-[-0.02em] [&>p]:mb-4 [&>h1]:text-[1.5rem] [&>h1]:font-bold [&>h1]:mb-4 [&>h2]:text-[1.25rem] [&>h2]:font-bold [&>h2]:mb-3 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4 [&>blockquote]:border-l-4 [&>blockquote]:border-[#ddd] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-[#666] [&>blockquote]:mb-4 [&_img]:max-w-full [&_img]:h-auto [&_a]:text-primary [&_a]:underline [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-[#ddd] [&_td]:px-2 [&_td]:py-1 [&_th]:border [&_th]:border-[#ddd] [&_th]:px-2 [&_th]:py-1 [&_th]:bg-[#f5f5f5]"
                  dangerouslySetInnerHTML={{ __html: item.body }}
                />
              ) : (
                <p className="text-[0.95rem] text-[#999]">내용이 없습니다.</p>
              )}
            </div>

            <div className="mt-12 pt-6 border-t border-[#eee]">
              <Link href="/news" className="inline-flex items-center gap-2 text-[0.85rem] font-semibold text-[#555] hover:text-primary transition-colors">
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
