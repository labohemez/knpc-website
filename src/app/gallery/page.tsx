import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
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
      <main className="flex-1 bg-white flex flex-col gap-3">
        <PageHero
          breadcrumbs={[{ name: "홈", href: "/" }, { name: "커뮤니티", href: "/board" }, { name: "갤러리" }]}
          title="갤러리"
        />

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
