import { useEffect, useRef, useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { ElementGlyph } from "./ElementMotifs";
import { ELEMENTS } from "../lib/elements";
import heroBackground from "../assets/hero-background.png";
import heroVideo from "../assets/unmai-carbon.mp4";
import { cacheHeroVideoFromUrl, getCachedHeroVideo } from "../lib/heroVideoCache";

const HERO_HLS_SRC = "/media/unmai-carbon/master.m3u8";
const HERO_MP4_FALLBACK_SRC = heroVideo;

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
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out motion-reduce:transition-none ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        muted
        loop
        playsInline
        poster={heroBackground}
        preload="metadata"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
        aria-hidden="true"
      />
    </div>
  );
}

/**
 * The pillar rail is the five elements under their pillar names, alphabetical by pillar —
 * the same list the Five Elements band expands on further down.
 */
const HERO_PILLARS = [...ELEMENTS].sort((a, b) => a.pillar.localeCompare(b.pillar));

/** Darkens the sky behind the nav and re-seats the podium so the glass bar reads on it. */
const HERO_SCRIM =
  "linear-gradient(180deg, rgba(3,12,26,0.78) 0%, rgba(3,12,26,0.46) 30%, rgba(3,12,26,0.26) 56%, rgba(3,12,26,0.42) 82%, rgba(3,12,26,0.62) 100%)";

/** Pool of shadow directly behind the headline block, so white type never sits on sky glare. */
const HERO_HALO =
  "radial-gradient(ellipse 58% 42% at 50% 34%, rgba(3,12,26,0.55), transparent 72%)";

/** Globe-and-leaf mark that opens the lead statement. */
function GlobeLeafMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="hero-globe-face" cx="34%" cy="26%" r="80%">
          <stop offset="0%" stopColor="#a9dcff" />
          <stop offset="42%" stopColor="#2c7cc2" />
          <stop offset="100%" stopColor="#082238" />
        </radialGradient>
        <linearGradient id="hero-globe-leaf" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#3d9c45" />
          <stop offset="100%" stopColor="#e6ff80" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="24" r="21" fill="url(#hero-globe-face)" />
      <g fill="none" strokeLinecap="round">
        <circle cx="32" cy="24" r="21" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
        <g stroke="rgba(230,255,128,0.5)" strokeWidth="1">
          <ellipse cx="32" cy="24" rx="8.6" ry="21" />
          <path d="M12 17.5h40M11.2 31h41.6" />
        </g>
      </g>
      <g fill="url(#hero-globe-leaf)">
        <path d="M32 52c3-9.6 11-15 22.5-16-1.4 11.6-9.2 18.4-22.5 16z" />
        <path d="M32 52c-3-9.6-11-15-22.5-16 1.4 11.6 9.2 18.4 22.5 16z" />
      </g>
      <g stroke="rgba(8,34,24,0.4)" strokeWidth="0.9" strokeLinecap="round">
        <path d="M32 52c3.8-6.6 9.8-11 18-12.4" />
        <path d="M32 52c-3.8-6.6-9.8-11-18-12.4" />
      </g>
    </svg>
  );
}

export function HeroSection({ marginTop }: { marginTop?: number }) {
  return (
    <section
      className="relative isolate flex w-full flex-col overflow-hidden bg-[#03101f]"
      style={{
        clipPath: "ellipse(170% 100% at 50% 0%)",
        WebkitClipPath: "ellipse(170% 100% at 50% 0%)",
        maxHeight: "97.5vh",
        ...(marginTop != null
          ? { marginTop, minHeight: `calc(97.5vh - ${marginTop}px)` }
          : { minHeight: "min(97.5vh, 100svh)" }),
      }}
    >
      {/* Plate: the photographic background/poster plus video and legibility washes */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <img
          src={heroBackground}
          alt=""
          width={1672}
          height={941}
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
          decoding="async"
        />
        <HeroVideo />
        <div className="pointer-events-none absolute inset-0 z-1" style={{ backgroundImage: HERO_SCRIM }} />
        <div className="pointer-events-none absolute inset-0 z-1" style={{ backgroundImage: HERO_HALO }} />
      </div>

      <ScrollReveal className="relative z-10 flex min-h-0 flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col items-center justify-center gap-4 px-4 pb-8 pt-20 text-center sm:gap-5 sm:px-6 lg:gap-[clamp(0.6rem,1.9vh,1.75rem)] lg:pb-[clamp(1.25rem,4vh,3.25rem)] lg:pt-[clamp(6.5rem,13vh,8.5rem)]">
          <div className="flex items-center justify-center gap-2.5">
            <div className="mask-logo"></div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#e6ff80] xs:text-[13px] sm:text-[18px] sm:leading-5 lg:text-[21px]">
              Building
            </p>
          </div>

          <h1 className="display-head text-[1.7rem] font-bold leading-[1.02] tracking-[-0.02em] text-white xs:text-[2rem] sm:text-[3rem] md:text-[3.6rem] lg:text-[min(4.2rem,4.75vw,7.4vh)] lg:leading-[0.98] lg:tracking-[-0.035em]">
            <span className="hero-title-sheen">
              The Trust Layer <br /> For Global <br /> Carbon Markets
            </span>
            <span className="text-[#c9f74a]">.</span>
          </h1>

          <div
            className="h-px w-full max-w-[420px] bg-[linear-gradient(90deg,transparent,rgba(230,255,128,0.75),transparent)]"
            aria-hidden
          />

          {/* Lead statement: glass panel so the sentence keeps its contrast over the sunset */}
          <div className="relative w-full max-w-[580px] overflow-hidden rounded-[26px] border border-white/18 bg-[rgba(255,255,255,0.10)] px-4 py-4 text-left shadow-[0_28px_80px_-34px_rgba(0,0,0,0.8)] backdrop-blur-lg sm:rounded-[34px] sm:px-6 sm:py-5 lg:py-[clamp(0.75rem,2vh,1.3rem)]">
            <div
              className="pointer-events-none absolute inset-x-12 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)]"
              aria-hidden
            />
            <div className="flex items-center gap-4 sm:gap-5">
              <GlobeLeafMark className="size-10 shrink-0 sm:size-13" />
              <p className="text-[12px] font-semibold leading-snug text-white sm:text-[14px] lg:text-base">
                Enabling transparent climate finance, interoperable carbon systems, and trusted
                Article 6 implementation, towards{" "}
                <span className="text-white/55">Net Zero achievement.</span>
              </p>
            </div>
          </div>

          <p className="max-w-[500px] text-[11px] leading-relaxed text-white/85 [text-shadow:0_1px_14px_rgba(3,12,26,0.6)] sm:text-[12px] lg:text-[13px]">
            UNMAI Carbon Solutions supports governments, multilaterals, and corporations to
            operationalize high-integrity carbon markets through carbon advisory, carbon trading,
            climate finance frameworks and digital infrastructure.
          </p>

          {/* Pillar rail: one glyph per pillar, the motif's first appearance */}
          <div className="relative mt-1 w-full max-w-[880px] overflow-hidden rounded-[28px] border border-white/18 bg-[rgba(7,20,34,0.34)] px-3 py-4 shadow-[0_30px_90px_-40px_rgba(0,0,0,0.85)] backdrop-blur-lg sm:px-6 sm:py-5 lg:mt-[clamp(0.25rem,1.25vh,0.85rem)] lg:rounded-full lg:px-8 lg:py-[clamp(0.7rem,2vh,1.2rem)]">
            <div
              className="pointer-events-none absolute inset-x-16 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)]"
              aria-hidden
            />
            {/* The fifth pillar's name is the long one — give its column the extra width */}
            <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_1fr_1.75fr] lg:gap-x-6">
              {HERO_PILLARS.map((element) => (
                <li
                  key={element.id}
                  className="group flex flex-col items-center gap-2 last:col-span-2 sm:last:col-span-1"
                >
                  <span className="flex size-9 items-center justify-center rounded-full border border-[#e6ff80]/45 bg-[#e6ff80]/8 text-[#e6ff80] shadow-[0_0_22px_-8px_rgba(230,255,128,0.6)] transition duration-300 group-hover:border-[#e6ff80] group-hover:bg-[#e6ff80]/15 lg:size-10">
                    <ElementGlyph id={element.id} className="size-4 lg:size-5" strokeWidth={1.6} />
                  </span>
                  <span className="text-[10px] font-bold uppercase leading-[1.35] tracking-[0.1em] text-white/90">
                    {element.pillar}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
