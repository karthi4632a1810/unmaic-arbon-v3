import { useEffect, useRef, useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import heroVideo from "../assets/unmai-carbon.mp4";
import heroThumbnail from "../assets/hero-thumbnail.png";
import { cacheHeroVideoFromUrl, getCachedHeroVideo } from "../lib/heroVideoCache";

const HERO_SECTION_BG = "linear-gradient(148deg, black, #272727)";
// Replace this with your production HLS manifest when ready, e.g. CDN/master.m3u8.
const HERO_HLS_SRC = "/media/unmai-carbon/master.m3u8";
const HERO_MP4_FALLBACK_SRC = heroVideo;

const heroPills = [
  "Climate Finance",
  "Carbon Advisory",
  "Carbon Trading",
  "Global Carbon Interoperable Infrastructure",
  "Article 6",
] as const;

/** Hero body lines: visible on load (no delayed intro). */
const heroLine =
  "transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none translate-y-0 opacity-100";

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<{ destroy: () => void } | null>(null);
  const blobUrlRef = useRef<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let disposed = false;

    const markReady = () => {
      if (!disposed) setIsReady(true);
    };

    const attemptPlay = () => {
      const playAttempt = video.play();
      if (playAttempt !== undefined) {
        playAttempt.catch(() => {
          /* muted autoplay may still be blocked in edge cases */
        });
      }
    };

    const revokeBlobUrl = () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };

    const setVideoSrc = (src: string) => {
      video.src = src;
      video.load();
      attemptPlay();
    };

    const destroyHls = () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };

    const persistHeroVideoInBackground = () => {
      void cacheHeroVideoFromUrl(HERO_MP4_FALLBACK_SRC);
    };

    const playFromCachedBlob = async (): Promise<boolean> => {
      const cached = await getCachedHeroVideo(HERO_MP4_FALLBACK_SRC);
      if (disposed || !cached) return false;

      destroyHls();
      revokeBlobUrl();
      blobUrlRef.current = URL.createObjectURL(cached);
      setVideoSrc(blobUrlRef.current);
      return true;
    };

    const loadMp4Fallback = async () => {
      if (disposed) return;
      destroyHls();

      const fromCache = await playFromCachedBlob();
      if (fromCache || disposed) return;

      setVideoSrc(HERO_MP4_FALLBACK_SRC);
      persistHeroVideoInBackground();
    };

    const onVideoError = () => {
      if (hlsRef.current || video.src.includes(".m3u8")) {
        void loadMp4Fallback();
      }
    };

    const tryHlsPlayback = () => {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = HERO_HLS_SRC;
        video.load();
        attemptPlay();
        return;
      }

      import("hls.js")
        .then(({ default: Hls }) => {
          if (disposed) return;
          if (!Hls.isSupported()) {
            void loadMp4Fallback();
            return;
          }

          const hls = new Hls({
            enableWorker: true,
            startLevel: -1,
            capLevelToPlayerSize: true,
            maxBufferLength: 20,
            backBufferLength: 20,
          });

          hlsRef.current = hls;
          hls.loadSource(HERO_HLS_SRC);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, attemptPlay);
          hls.on(Hls.Events.ERROR, (_event, data) => {
            if (data.fatal) {
              void loadMp4Fallback();
            }
          });
        })
        .catch(() => {
          void loadMp4Fallback();
        });
    };

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    video.addEventListener("loadeddata", markReady);
    video.addEventListener("canplay", markReady);
    video.addEventListener("error", onVideoError);

    void (async () => {
      const fromCache = await playFromCachedBlob();
      if (disposed || fromCache) return;
      tryHlsPlayback();
    })();

    return () => {
      disposed = true;
      video.pause();
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("canplay", markReady);
      video.removeEventListener("error", onVideoError);
      destroyHls();
      revokeBlobUrl();
      video.removeAttribute("src");
      video.load();
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out motion-reduce:transition-none ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        muted
        loop
        playsInline
        poster={heroThumbnail}
        preload="metadata"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
        aria-hidden="true"
      />
    </div>
  );
}

export function HeroSection({ marginTop }: { marginTop?: number }) {
  return (
    <section
      className="relative isolate w-full overflow-hidden max-md:flex max-md:flex-col md:aspect-video"
      style={{
        backgroundImage: HERO_SECTION_BG,
        ...(marginTop != null ? { marginTop } : {}),
      }}
    >
      {/* Video layer (fills hero on md+; fixed 16:9 strip on mobile) */}
      <div className="relative aspect-video w-full shrink-0 overflow-hidden md:absolute md:inset-0 md:aspect-auto md:h-full md:w-full">
        <div
          className="absolute inset-0 z-0"
          style={{ backgroundImage: HERO_SECTION_BG }}
          aria-hidden
        />
        <HeroVideo />
        <div
          className="pointer-events-none absolute inset-0 z-1 bg-black/35 transition-opacity duration-300 ease-out motion-reduce:transition-none md:bg-black/50"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-2 opacity-[0.12] transition-opacity duration-300 ease-out motion-reduce:transition-none md:opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 90% 60% at 50% 40%, rgba(197,197,214,0.35), transparent 55%)",
          }}
          aria-hidden
        />
      </div>

      <ScrollReveal className="relative z-10 flex min-h-0 w-full flex-col justify-center bg-[linear-gradient(148deg,black,#272727)] px-4 pb-12 pt-8 max-md:shrink-0 sm:px-6 md:absolute md:inset-0 md:bg-none md:bg-transparent md:px-0 md:pb-14 md:pt-24 lg:pb-16 lg:pt-28">
        <div className="mx-auto flex w-full max-w-[1300px] min-h-0 flex-col justify-center md:px-6 lg:px-8">
          {/*
            Figma alignment: equal-height columns; tops align (eyebrow & headline with right body);
            bottoms align (CTAs with STRATEGIC BLUEPRINT). Buttons live in the left column.
          */}
          <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-x-12 xl:gap-x-16">
            <div className="flex min-h-0 flex-col gap-10 self-stretch lg:col-span-8 lg:justify-between lg:gap-12 xl:gap-14">
              <div className="max-w-208 space-y-6">
                <div className={heroLine}>
                  <div className="flex items-center gap-2">
                    <div className="mask-logo"></div>
                    <p className="text-base font-bold uppercase tracking-[0.25em] text-neutral-300 sm:text-[26px] sm:leading-6 sm:tracking-[3.2px]">
                      Building
                    </p>
                  </div>
                </div>
                <div className={heroLine}>
                  <h1 className="text-5xl font-bold tracking-[-0.02em] text-white sm:text-6xl lg:text-[80px] lg:leading-[1.01] lg:tracking-[-0.04em]">
                    <span className="gradient-text-hero">
                      The Trust Layer <br /> For Global <br /> Carbon Markets.
                    </span>
                  </h1>
                </div>
              </div>
            </div>

            <div
              className={`flex min-h-0 flex-col justify-center gap-8 self-stretch border-t border-white/25 pt-8 lg:col-span-4 lg:h-full lg:gap-0 lg:border-l lg:border-t-0 lg:border-white/30 lg:pl-10 lg:pt-0 xl:pl-12 ${heroLine}`}
            >
              {/* Desktop: vertically center the two paragraphs in the band above STRATEGIC */}
              <div className="flex min-h-0 flex-col justify-center">
                <div className="space-y-4">
                  <p className="text-base font-semibold leading-snug text-white">
                    Enabling transparent climate finance, interoperable carbon systems, and trusted
                    Article 6 implementation, towards Net Zero achievement.
                  </p>
                  <p className="text-sm leading-relaxed text-[#cdcdcd]">
                    UNMAI Carbon Solutions supports governments, multilaterals, and corporations to
                    operationalize high-integrity carbon markets through carbon advisory, carbon
                    trading, climate finance frameworks and digital infrastructure.
                  </p>
                </div>
              </div>
              {heroPills.map((pill, index) => (
                <div
                  key={pill}
                  className={`flex shrink-0 items-center gap-4 ${
                    index === 0 ? "mt-6 lg:mt-8" : "mt-6 lg:mt-2"
                  }`}
                >
                  <span className="h-px w-12 shrink-0 bg-neutral-400" aria-hidden />
                  <span className="text-sm font-bold uppercase tracking-wide text-white">
                    {pill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
