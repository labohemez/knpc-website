"use client";

import { useLive } from "./LiveProvider";

function getYoutubeEmbedUrl(rawUrl: string) {
  try {
    // URL 앞부분만 사용 (공백 이후 쓰레기 데이터 제거)
    const clean = rawUrl.trim().split(/\s/)[0];
    const u = new URL(clean);

    // youtu.be/VIDEO_ID
    if (u.hostname.includes("youtu.be")) {
      const videoId = u.pathname.slice(1);
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }

    // /watch?v=VIDEO_ID
    const v = u.searchParams.get("v");
    if (v) return `https://www.youtube.com/embed/${v}?autoplay=1&rel=0`;

    // /live/VIDEO_ID
    const liveMatch = u.pathname.match(/\/live\/([^/]+)/);
    if (liveMatch) return `https://www.youtube.com/embed/${liveMatch[1]}?autoplay=1&rel=0`;

    // /channel/CHANNEL_ID/live  또는  /channel/CHANNEL_ID
    const channelMatch = u.pathname.match(/\/channel\/([^/]+)/);
    if (channelMatch) return `https://www.youtube.com/embed/live_stream?channel=${channelMatch[1]}&autoplay=1&rel=0`;

    return null;
  } catch {
    return null;
  }
}

export default function LiveModal() {
  const { live, dismiss } = useLive();

  if (!live) return null;

  const embedUrl = getYoutubeEmbedUrl(live.youtube_url);
  if (!embedUrl) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={dismiss} />
      <div className="relative z-10 w-full max-w-[860px] bg-black rounded-lg overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-white text-[0.82rem] font-medium">{live.title}</span>
            <span className="text-red-400 text-[0.68rem] font-bold tracking-wider">LIVE</span>
          </div>
          <button onClick={dismiss} className="text-white/50 hover:text-white transition-colors cursor-pointer text-[0.8rem]">
            닫기 ✕
          </button>
        </div>
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
