"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";

// 유튜브 배경 영상 설정
const backgroundVideo = {
  videoId: "eKtED6_4l3U",
  poster: "/images/hero-2.jpg",
  segmentStart: "half",  // 재생시간의 반부터
  segmentDuration: 30,   // 30초간 재생
  posterDuration: 10000,
};

// 설교 정보 (주일예배만)
const sermon = {
  category: "주일설교",
  title: "소유할 것인가? 소유될 것인가?",
  scripture: "베드로전서 2:9~10",
  pastor: "서강일 목사",
};

// YouTube IFrame API 타입
interface YTPlayer {
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getCurrentTime(): number;
  getDuration(): number;
  playVideo(): void;
  pauseVideo(): void;
  mute(): void;
  unMute(): void;
  isMuted(): boolean;
  setVolume(volume: number): void;
  getVolume(): number;
  getIframe(): HTMLIFrameElement;
  destroy(): void;
}

interface YTPlayerEvent {
  target: YTPlayer;
  data: number;
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: string | HTMLElement,
        config: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (e: YTPlayerEvent) => void;
            onStateChange?: (e: YTPlayerEvent) => void;
          };
        }
      ) => YTPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

const FADE_DURATION = 2000;
const VOLUME_FADE_SECS = 3;
const PRELOAD_OFFSET = 3;
const INITIAL_DELAY = 0; // 버퍼링 완료 즉시 재생
const PLAYER_ID = "hero-yt-player";

export default function HeroSlider() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [muted, setMuted] = useState(true);
  const [pageReady, setPageReady] = useState(false);

  const playerRef = useRef<YTPlayer | null>(null);
  const watcherRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const posterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bufferCheckRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resolvedStart = useRef(0);
  const resolvedEnd = useRef(0);
  const playReady = useRef(false);
  const posterDone = useRef(false);
  const savedVolume = useRef(100);
  const fadingVolume = useRef(false);
  const mutedRef = useRef(true);
  const transitioning = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrolledAway = useRef(false);
  const scrollVolumeFadeRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedTime = useRef<number | null>(null);

  // muted state를 ref에 동기화 (dependency 체인 방지)
  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  // 스크롤 감지: 히어로가 2/3 이상 벗어나면 볼륨 페이드 아웃 → 일시정지
  // 다시 전부 보이면 재생 재개 + 볼륨 페이드 인
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const ratio = entry.intersectionRatio;

        if (ratio < 0.33 && !scrolledAway.current) {
          // 화면 2/3 이상 벗어남 → 볼륨 페이드 아웃 후 일시정지
          scrolledAway.current = true;
          if (!playerRef.current) return;

          const startVol = mutedRef.current ? 0 : (playerRef.current.getVolume() || 0);
          let step = 0;
          const totalSteps = 10;
          if (scrollVolumeFadeRef.current) clearInterval(scrollVolumeFadeRef.current);
          scrollVolumeFadeRef.current = setInterval(() => {
            step++;
            if (!playerRef.current) return;
            const vol = Math.round(startVol * (1 - step / totalSteps));
            playerRef.current.setVolume(Math.max(0, vol));
            if (step >= totalSteps) {
              if (scrollVolumeFadeRef.current) clearInterval(scrollVolumeFadeRef.current);
              playerRef.current.setVolume(0);
              pausedTime.current = playerRef.current.getCurrentTime();
              playerRef.current.pauseVideo();
            }
          }, 80);
        } else if (ratio > 0.5 && scrolledAway.current) {
          // 화면 전부 보임 → 재생 재개 + 볼륨 페이드 인
          scrolledAway.current = false;
          if (!playerRef.current) return;
          if (scrollVolumeFadeRef.current) clearInterval(scrollVolumeFadeRef.current);

          // 마지막 재생 지점으로 복귀
          if (pausedTime.current !== null) {
            playerRef.current.seekTo(pausedTime.current, true);
            pausedTime.current = null;
          }
          playerRef.current.playVideo();
          const targetVol = mutedRef.current ? 0 : savedVolume.current;
          let step = 0;
          const totalSteps = 10;
          scrollVolumeFadeRef.current = setInterval(() => {
            step++;
            if (!playerRef.current) return;
            const vol = Math.round(targetVol * (step / totalSteps));
            playerRef.current.setVolume(vol);
            if (step >= totalSteps) {
              if (scrollVolumeFadeRef.current) clearInterval(scrollVolumeFadeRef.current);
              playerRef.current.setVolume(targetVol);
            }
          }, 80);
        }
      },
      { threshold: [0, 0.1, 0.2, 0.33, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] }
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      if (scrollVolumeFadeRef.current) clearInterval(scrollVolumeFadeRef.current);
    };
  }, []);

  const { videoId, segmentStart, segmentDuration, posterDuration } = backgroundVideo;

  // 재생 재개 + 음소거 복원 + 페이드 인
  const showAfterReady = useCallback(() => {
    if (!playerRef.current) return;
    if (mutedRef.current) {
      playerRef.current.mute();
    } else {
      playerRef.current.unMute();
      playerRef.current.setVolume(savedVolume.current);
    }
    playerRef.current.playVideo();
    setShowVideo(true);
    // 첫 재생 시 로딩 화면 제거
    if (!pageReady) setPageReady(true);
  }, [pageReady]);

  // 숨긴 채로 구간 시작 전부터 미리 재생 (강제 음소거)
  const preloadSegment = useCallback(() => {
    if (!playerRef.current) return;
    playReady.current = false;
    fadingVolume.current = false;
    playerRef.current.mute();
    playerRef.current.setVolume(0);
    const preloadPoint = Math.max(0, resolvedStart.current - PRELOAD_OFFSET);
    playerRef.current.seekTo(preloadPoint, true);
    playerRef.current.playVideo();

    if (bufferCheckRef.current) clearInterval(bufferCheckRef.current);
    bufferCheckRef.current = setInterval(() => {
      if (!playerRef.current) return;
      const time = playerRef.current.getCurrentTime();
      if (time >= resolvedStart.current - 0.5) {
        playReady.current = true;
        if (bufferCheckRef.current) clearInterval(bufferCheckRef.current);
        playerRef.current.seekTo(resolvedStart.current, true);
        playerRef.current.pauseVideo();
        if (posterDone.current) {
          showAfterReady();
        }
      }
    }, 100);
  }, [showAfterReady]);

  // 포스터 시간 끝 → 영상 준비됐으면 재개
  const showWhenReady = useCallback(() => {
    posterDone.current = true;
    if (playReady.current) {
      showAfterReady();
    }
  }, [showAfterReady]);

  // 영상 → 포스터 → 영상 사이클
  const startCycle = useCallback(() => {
    posterDone.current = false;
    preloadSegment();

    // 첫 재생은 INITIAL_DELAY 후: 그 사이 버퍼링 완료
    setTimeout(() => {
      posterDone.current = true;
      if (playReady.current) showAfterReady();
    }, INITIAL_DELAY);

    if (watcherRef.current) clearInterval(watcherRef.current);
    watcherRef.current = setInterval(() => {
      if (!playerRef.current || !playReady.current || transitioning.current) return;
      const time = playerRef.current.getCurrentTime();
      const remaining = resolvedEnd.current - time;

      // 볼륨 페이드아웃 (구간 끝 VOLUME_FADE_SECS초 전부터)
      if (!mutedRef.current && remaining <= VOLUME_FADE_SECS && !fadingVolume.current) {
        fadingVolume.current = true;
        savedVolume.current = playerRef.current.getVolume() || 100;
      }
      if (fadingVolume.current) {
        const ratio = Math.max(0, remaining / VOLUME_FADE_SECS);
        playerRef.current.setVolume(Math.round(savedVolume.current * ratio));
      }

      if (remaining <= 0.3) {
        // 즉시 정지 + 음소거
        transitioning.current = true;
        playerRef.current.setVolume(0);
        playerRef.current.pauseVideo();
        fadingVolume.current = false;
        setShowVideo(false);
        posterDone.current = false;
        playReady.current = false;

        // 페이드 아웃 후 미리 seek
        setTimeout(() => {
          preloadSegment();
        }, FADE_DURATION);

        // posterDuration 후 페이드 인
        posterTimerRef.current = setTimeout(() => {
          transitioning.current = false;
          showWhenReady();
        }, posterDuration + FADE_DURATION);
      }
    }, 200);
  }, [preloadSegment, showWhenReady, showAfterReady, posterDuration]);

  // YouTube IFrame API 로드
  useEffect(() => {
    let destroyed = false;

    const initPlayer = () => {
      if (!window.YT || destroyed) return;
      const el = document.getElementById(PLAYER_ID);
      if (!el) return;

      playerRef.current = new window.YT.Player(PLAYER_ID, {
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          showinfo: 0,
          rel: 0,
          playsinline: 1,
          modestbranding: 1,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0,
          cc_load_policy: 0,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (e: YTPlayerEvent) => {
            if (destroyed) return;
            const iframe = e.target.getIframe();
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            iframe.style.border = "none";
            iframe.style.pointerEvents = "none";

            const duration = e.target.getDuration();
            if (segmentStart === "half") {
              resolvedStart.current = Math.floor(duration / 2);
            } else {
              const ss = segmentStart as unknown as number;
              resolvedStart.current = ss < 0 ? Math.max(0, duration + ss) : ss;
            }
            resolvedEnd.current = resolvedStart.current + segmentDuration;

            setVideoLoaded(true);
            startCycle();
          },
          onStateChange: (e: YTPlayerEvent) => {
            if (destroyed) return;
            if (e.data === 0) {
              posterDone.current = true;
              preloadSegment();
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const existing = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]'
      );
      if (!existing) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      destroyed = true;
      if (watcherRef.current) clearInterval(watcherRef.current);
      if (posterTimerRef.current) clearTimeout(posterTimerRef.current);
      if (bufferCheckRef.current) clearInterval(bufferCheckRef.current);
      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch { /* noop */ }
      }
    };
  }, [videoId, segmentStart, segmentDuration, startCycle, preloadSegment]);

  return (
    <section ref={sectionRef} className="relative h-screen bg-white overflow-hidden">
      {/* 포스터 이미지 */}
      <Image
        src={backgroundVideo.poster}
        alt="강남교회 예배"
        fill
        className="object-cover"
        priority
        quality={90}
      />

      {/* 유튜브 배경 영상
           130vh × 16/9 = 231.11vh 로 30% 확대 → 상단 여백이 뷰포트 위로 올라가 워터마크 숨김
           하단도 뷰포트 아래로 내려가 빈 틈 없음 */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          opacity: videoLoaded && showVideo ? 1 : 0,
          transition: `opacity ${FADE_DURATION}ms ease-in-out`,
        }}
      >
        <div
          className="absolute top-1/2 left-1/2"
          style={{
            width: "max(231.11vh, 100vw)",
            height: "max(56.25vw, 130vh)",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div id={PLAYER_ID} style={{ width: "100%", height: "100%" }} />
        </div>
      </div>

      {/* 오버레이 */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>


      {/* 좌측 하단 — 설교 정보 + CTA (넷플릭스 스타일) */}
      <div className="absolute left-0 right-0 z-[3]" style={{ bottom: "32vh" }}>
        <div className="w-full px-4 lg:px-6">
          <div className="max-w-[1400px]">
            <div className="animate-fade-up" style={{ maxWidth: "620px" }}>
              <span className="inline-block px-3 py-1 bg-accent text-white font-semibold tracking-[-0.02em] mb-4" style={{ fontSize: "12px" }}>
                {sermon.category}
              </span>
              <h2 className="font-bold text-white tracking-[-0.04em] leading-tight" style={{ fontSize: "clamp(28px, 2.5vw, 42px)" }}>
                {sermon.title}
              </h2>
              <p className="mt-3 text-white/70 tracking-[-0.02em]" style={{ fontSize: "clamp(14px, 1.1vw, 17px)" }}>
                {sermon.scripture} · {sermon.pastor}
              </p>

              <div className="flex items-center gap-3 mt-6">
                <a
                  href="/sermons"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-[0.9rem] font-semibold hover:bg-white/85 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
                  </svg>
                  설교 보기
                </a>
                <a
                  href="/sermons"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white text-[0.9rem] font-semibold backdrop-blur-sm hover:bg-white/30 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                  </svg>
                  설교 목록
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 우측 하단 — 음소거 토글 */}
      <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 z-[3]">
        <button
          onClick={() => {
            if (!playerRef.current) return;
            if (muted) {
              playerRef.current.unMute();
              playerRef.current.setVolume(savedVolume.current);
              setMuted(false);
            } else {
              savedVolume.current = playerRef.current.getVolume();
              playerRef.current.mute();
              setMuted(true);
            }
          }}
          aria-label={muted ? "소리 켜기" : "소리 끄기"}
          className="w-10 h-10 lg:w-11 lg:h-11 rounded-full border border-white/50 flex items-center justify-center text-white hover:bg-white/15 transition-colors"
        >
          {muted ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-3.15a.75.75 0 011.28.53v13.74a.75.75 0 01-1.28.53L6.75 14.25H3.75a.75.75 0 01-.75-.75v-3a.75.75 0 01.75-.75h3z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-3.15a.75.75 0 011.28.53v12.74a.75.75 0 01-1.28.53L6.75 15.75H3.75a.75.75 0 01-.75-.75v-6a.75.75 0 01.75-.75h3z" />
            </svg>
          )}
        </button>
      </div>

      {/* 로딩 오버레이 — 영상 준비될 때까지 표시 */}
      {!pageReady && (
        <div
          className="absolute inset-0 z-[10] bg-[#294a3a] flex flex-col items-center justify-center transition-opacity duration-700"
          style={{ opacity: pageReady ? 0 : 1 }}
        >
          <p className="text-white/90 text-[1.2rem] font-bold tracking-[-0.03em] mb-3">강남교회</p>
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
        </div>
      )}
    </section>
  );
}
