import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getGalleryAlbums, getAlbumPhotos, cloudinaryUrl } from "@/lib/cloudinary";
import GalleryClient from "./GalleryClient";

export default async function GalleryPage() {
  let albums: { name: string; title: string; date: string; thumbnail: string; photos: { url: string; original: string; width: number; height: number }[] }[] = [];

  try {
    const albumList = await getGalleryAlbums();
    albums = await Promise.all(
      albumList.map(async (album) => {
        const photos = await getAlbumPhotos(album.path);
        return {
          name: album.name,
          title: album.title,
          date: album.date,
          thumbnail: photos[0] ? cloudinaryUrl(photos[0].url, "w_600,h_400,c_fill,q_auto,f_auto") : "",
          photos: photos.map((p) => ({
            url: cloudinaryUrl(p.url, "w_1400,q_90,f_auto"),
            original: p.url as string,
            width: p.width,
            height: p.height,
          })),
        };
      })
    );
  } catch (e) {
    console.error("갤러리 로드 실패:", e);
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-white flex flex-col gap-3 pt-[70px] lg:pt-[90px]">
        {/* 히어로 */}
        <section className="relative h-[280px] lg:h-[380px] flex items-end pb-10 lg:pb-14">
          <Image src="/images/gallery-5.jpg" alt="강남교회 갤러리" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-primary-dark/75" />
          <div className="relative mx-auto max-w-[1400px] px-5 lg:px-8 w-full">
            <p className="text-accent text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-2">Gallery</p>
            <h1 className="text-[2.2rem] lg:text-[3rem] font-bold text-white tracking-[-0.04em] leading-[1.15]">갤러리</h1>
          </div>
        </section>

        {/* 앨범 목록 */}
        <section className="py-[4rem] lg:py-[6rem] bg-white">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            {albums.length === 0 ? (
              <p className="text-center text-[#999] py-20">등록된 앨범이 없습니다.</p>
            ) : (
              <GalleryClient albums={albums} />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
