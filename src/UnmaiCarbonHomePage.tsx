import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { ImpactCounter } from "./components/ImpactCounter";
import { SiteCta } from "./components/SiteCta";
import { SiteFooter } from "./components/SiteFooter";
import { ScrollReveal } from "./components/ScrollReveal";
import { ScheduleConsultationModal } from "./components/ScheduleConsultationModal";
import { SiteHeader } from "./components/SiteHeader";
import heroVideo from "./assets/unmai-carbon.mp4";
import { cacheHeroVideoFromUrl, getCachedHeroVideo } from "./lib/heroVideoCache";
import "./App.css";

/** Tailwind `md` breakpoint â€” hero offset matches header height only below this width. */
const MOBILE_MAX_WIDTH_PX = 767;

const HERO_SECTION_BG = "linear-gradient(148deg, black, #272727)";
// Replace this with your production HLS manifest when ready, e.g. CDN/master.m3u8.
const HERO_HLS_SRC = "/media/unmai-carbon/master.m3u8";
const HERO_MP4_FALLBACK_SRC = heroVideo;

const imgImage5 =
  "/unmai-carbon-img.png";
const imgStatIcon1 =
  "https://www.figma.com/api/mcp/asset/212b28f2-54f2-4cde-93fb-b518601ddc1c";
const imgStatIcon2 =
  "https://www.figma.com/api/mcp/asset/0b180b3b-76f4-45f5-a398-05bf7cf608b4";
const imgStatIcon3 =
  "https://www.figma.com/api/mcp/asset/e959a713-3190-4c66-85fe-479b21c2154e";
const imgStatIcon4 =
  "https://www.figma.com/api/mcp/asset/c9b15b42-3300-415f-a02c-427695a041ce";
const platformFeatures = [
  {
    title: "National Carbon Registry Systems",
    body: "Sovereign-grade registries for issuance, transfer, and retirement with full integrity controls.",
  },
  {
    title: "Digital MRV Ecosystems",
    body: "Monitoring, Reporting, and Verification infrastructure built for transparent and scalable implementation.",
  },
  {
    title: "Blockchain-Enabled Carbon Traceability",
    body: "Trusted digital traceability architecture across the full carbon credit lifecycle.",
  },
  {
    title: "NAMBn Framework",
    body: "Interoperable framework enabling governments and institutions to operationalize scalable carbon ecosystems.",
  },
] as const;

const methodologyCards = [
  {
    n: "01",
    color: "text-[#4f65e3]",
    title: "Net Zero Transition & Climate Policy Advisory",
    body: "Designing decarbonization pathways, institutional readiness frameworks, NDC alignment, and Article 6 operationalization strategies.",
  },
  {
    n: "02",
    color: "text-[#006c49]",
    title: "Climate Finance & Carbon Investment Strategy",
    body: "Structuring scalable climate finance ecosystems, carbon-linked investments, and ESG-driven capital strategies.",
  },
  {
    n: "03",
    color: "text-[#725400]",
    title: "Carbon Market Infrastructure & Governance",
    body: "Building interoperable carbon registries, digital MRV ecosystems, and blockchain-enabled trust architecture.",
  },
  {
    n: "04",
    color: "text-[#131b2e]",
    title: "Transparent Climate Governance",
    body: "Strengthening institutional transparency, standards alignment, traceability systems, and long-term climate governance mechanisms.",
  },
] as const;

const flowSteps = [
  {
    n: "01",
    title: "Carbon Market Strategy",
    body: "Strategic planning support across market design, compliance alignment, and implementation pathways.",
  },
  {
    n: "02",
    title: "Climate Finance & Investment",
    body: "Institutional structuring for climate-aligned investment mechanisms and carbon-linked financing systems.",
  },
  {
    n: "03",
    title: "International Negotiation Support",
    body: "Technical and policy support for country delegations and cross-border climate engagement.",
  },
  {
    n: "04",
    title: "Digital Carbon Infrastructure",
    body: "Sovereign-ready digital systems that strengthen transparency, interoperability, and trust.",
  },
  {
    n: "05",
    title: "Capacity Building & Institutional Readiness",
    body: "Capacity development and institutional readiness programs for governments and implementation stakeholders.",
  },
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
        preload="metadata"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
        aria-hidden="true"
      />
    </div>
  );
}

export default function UnmaiCarbonHomePage() {
  const headerRef = useRef<HTMLElement>(null);

  /** On mobile, hero `margin-top` = measured fixed header height (px). */
  const [mobileHeroMarginTop, setMobileHeroMarginTop] = useState<number | undefined>(
    undefined,
  );
  const [consultationOpen, setConsultationOpen] = useState(false);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const mobileMq = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH_PX}px)`);

    const syncHeroMargin = () => {
      const el = headerRef.current;
      if (!el) return;
      if (mobileMq.matches) {
        setMobileHeroMarginTop(el.offsetHeight);
      } else {
        setMobileHeroMarginTop(undefined);
      }
    };

    syncHeroMargin();

    const ro = new ResizeObserver(syncHeroMargin);
    ro.observe(header);
    mobileMq.addEventListener("change", syncHeroMargin);
    window.addEventListener("resize", syncHeroMargin);

    return () => {
      ro.disconnect();
      mobileMq.removeEventListener("change", syncHeroMargin);
      window.removeEventListener("resize", syncHeroMargin);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-[#191c1d] antialiased">
      {/* Outside hero <section> so z-index isnâ€™t trapped by stacking contexts â€” stays above all bands */}
      <SiteHeader ref={headerRef} />

      {/* Hero: mobile = video on top, dark content band below; md+ = 16:9 video with overlaid copy */}
      <section
        className="relative isolate w-full overflow-hidden max-md:flex max-md:flex-col md:aspect-video"
        style={{
          backgroundImage: HERO_SECTION_BG,
          ...(mobileHeroMarginTop != null
            ? { marginTop: mobileHeroMarginTop }
            : {}),
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
            className="pointer-events-none absolute inset-0 z-[1] bg-black/35 transition-opacity duration-300 ease-out motion-reduce:transition-none md:bg-black/50"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-[2] opacity-[0.12] transition-opacity duration-300 ease-out motion-reduce:transition-none md:opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 90% 60% at 50% 40%, rgba(197,197,214,0.35), transparent 55%)",
            }}
            aria-hidden
          />
        </div>

        <ScrollReveal
          className="relative z-10 flex min-h-0 w-full flex-col justify-center bg-[linear-gradient(148deg,black,#272727)] px-4 pb-12 pt-8 max-md:shrink-0 sm:px-6 md:absolute md:inset-0 md:bg-none md:bg-transparent md:px-0 md:pb-14 md:pt-24 lg:pb-16 lg:pt-28"
        >
          <div className="mx-auto flex w-full max-w-[1300px] min-h-0 flex-col justify-center lg:px-8 md:px-6">
            {/*
              Figma alignment: equal-height columns; tops align (eyebrow & headline with right body);
              bottoms align (CTAs with STRATEGIC BLUEPRINT). Buttons live in the left column.
            */}
            <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-x-12 xl:gap-x-16">
              <div className="flex min-h-0 flex-col gap-10 self-stretch lg:col-span-8 lg:justify-between lg:gap-12 xl:gap-14">
                <div className="max-w-[52rem] space-y-6">
                  <div className={heroLine}>
                    <div className="flex items-center gap-2 items-center">
                  <div className="mask-logo"></div>
                    <p className="text-base font-bold uppercase tracking-[0.25em] text-[#e6ff80] sm:text-[26px] sm:leading-6 sm:tracking-[3.2px]">
                    Building 
                    </p>
                    </div>
                  </div>
                  <div className={heroLine}>
                    <h1 className="text-5xl gradient-text font-bold tracking-[-0.02em] text-white sm:text-6xl lg:text-[80px] lg:leading-[1.01] lg:tracking-[-0.04em]">
                      <span className="gradient-text-hero">
                      The Trust Layer <br /> For Global <br /> Carbon Markets.</span>
                    </h1>
                  </div>
                </div>
                {/* <div className={`flex shrink-0 flex-wrap gap-4 ${heroLine}`}>
                  <button
                    type="button"
                    className="rounded-lg bg-[#e7e8e9] px-8 py-4 text-sm font-bold uppercase tracking-[0.1em] text-[#191c1d] shadow-md transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-white hover:shadow-xl active:translate-y-0 motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-md"
                  >
                    Explore Strategic Services
                  </button>
                  <button
                    type="button"
                    onClick={() => setConsultationOpen(true)}
                    className="rounded-lg border border-[#e6ff80] bg-black px-8 py-4 text-sm font-bold uppercase tracking-[0.1em] text-white shadow-lg shadow-black/40 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-neutral-900 hover:shadow-xl active:translate-y-0 motion-reduce:hover:translate-y-0 md:border-0"
                  >
                    Schedule Executive Consultation
                  </button>
                </div> */}
              </div>

              <div
                className={`flex min-h-0 flex-col justify-center gap-8 self-stretch border-t border-white/25 pt-8 lg:col-span-4 lg:h-full lg:gap-0 lg:border-l lg:border-t-0 lg:border-white/30 lg:pl-10 lg:pt-0 xl:pl-12 ${heroLine}`}
              >
                {/* Desktop: vertically center the two paragraphs in the band above STRATEGIC */}
                <div className="flex min-h-0 flex-col justify-center">
                  <div className="space-y-4">
                    <p className="text-base font-semibold leading-snug text-white">
                    Enabling transparent climate finance, interoperable carbon systems, and trusted Article 6 implementation.
                    </p>
                    <p className="text-sm leading-relaxed text-[#cdcdcd]">
                    UNMAI Carbon Solutions partners with governments, multilaterals, and enterprises to operationalize high-integrity carbon markets through digital infrastructure and climate finance frameworks.
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex shrink-0 items-center gap-4 lg:mt-8">
                  <span className="h-px w-12 shrink-0 bg-[#e6ff80]" aria-hidden />
                  <span className="text-sm font-bold uppercase tracking-wide text-white">
                  Global Carbon Infrastructure 
                  </span>
                </div>
                <div className="mt-6 flex shrink-0 items-center gap-4 lg:mt-2">
                  <span className="h-px w-12 shrink-0 bg-[#e6ff80]" aria-hidden />
                  <span className="text-sm font-bold uppercase tracking-wide text-white">
                    Climate Finance
                  </span>
                </div>
                <div className="mt-6 flex shrink-0 items-center gap-4 lg:mt-2">
                  <span className="h-px w-12 shrink-0 bg-[#e6ff80]" aria-hidden />
                  <span className="text-sm font-bold uppercase tracking-wide text-white">
                    Article 6
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Stats */}
      <section className="border-t border-black/5 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto flex max-w-[1300px] flex-col gap-12 lg:gap-16">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-base font-bold uppercase tracking-[0.1em] text-[#006c49]">
                Trust / Metrics
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-[#131b2e] sm:text-4xl">
                Trusted Across Governments, Multilaterals & Climate Institutions
              </h2>
            </div>
            <p className="max-w-md text-left text-base leading-6 text-[#444654] lg:text-right">
              Supporting sovereign carbon market development, climate finance systems, and Article 6 implementation across Asia, Africa, and the Middle East.
            </p>
          </div>
          <div
            className="overflow-hidden rounded-2xl border border-black/[0.09] bg-[white] [background-image:radial-gradient(circle_at_center,rgba(0,0,0,0.055)_1px,transparent_1px)] [background-size:22px_22px]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-4">
              {(
                [
                  {
                    step: "01",
                    color: "black",
                    category: "Region",
                    icon: imgStatIcon1,
                    variant: "plain" as const,
                    end: 15,
                    suffix: "+",
                    label: "Global engagement countries",
                    accentBorder: "border-[#2b6193]",
                    accentHover:
                      " focus-within:bg-emerald-500/[0.06]",
                  },
                  {
                    step: "02",
                    color: "hsl(217, 91%, 60%)",
                    category: "Expertise",
                    icon: imgStatIcon2,
                    variant: "plain" as const,
                    end: 50,
                    suffix: "+",
                    label: "Years combined experience",
                    accentBorder: "border-[#2b6193]",
                    accentHover:
                      " focus-within:bg-sky-500/[0.06]",
                  },
                  {
                    step: "03",
                    color: "hsl(34, 90%, 55%)",
                    category: "Capital",
                    icon: imgStatIcon3,
                    variant: "usd" as const,
                    end: 5,
                    suffix: "B+",
                    label: "Climate portfolio",
                    accentBorder: "border-[#2b6193]",
                    accentHover:
                      "h focus-within:bg-amber-500/[0.06]",
                  },
                  {
                    step: "04",
                    color: "hsl(257, 63%, 52%)",
                    category: "Assets",
                    icon: imgStatIcon4,
                    variant: "plain" as const,
                    end: 200,
                    suffix: "M+",
                    label: "tCOâ‚‚e project pipeline",
                    accentBorder: "",
                    accentHover:
                      " focus-within:bg-violet-500/[0.06]",
                  },
                ] as const
              ).map((col, i) => (
                <div
                  data-step={i + 1}
                  style={{ ["--accent"]: col.color } as CSSProperties}
                  key={i}
                  className={[
                    "relative stats-hover-item group/stats flex min-h-[220px] flex-col px-6 py-9 transition-colors duration-300 ease-out sm:min-h-0 sm:px-8 sm:py-10 lg:min-h-[280px]",
                    col.accentHover,
                    i < 3
                      ? `max-lg:border-b max-lg:border-dashed lg:border-b-0 lg:border-r lg:border-dashed ${col.accentBorder}`
                      : "",
                  ].join(" ")}
                >
                  <div className="relative z-[1] mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold uppercase leading-snug tracking-[0.14em] text-[#5c6b62] transition-colors duration-300 group-hover/stats:text-white sm:text-xs">
                    <span className="inline-flex items-center gap-1.5">
                      {/* <span>{col.step}</span>
                      <img
                        src={col.icon}
                        alt=""
                        className="h-4 w-auto shrink-0 object-contain opacity-85 sm:h-5"
                        aria-hidden
                      /> */}
                    </span>
                    <span className="tracking-[0.14em]">{col.category}</span>
                  </div>
                  <div className="relative z-[1] flex flex-1 flex-col justify-center transition-colors duration-300">
                    {col.variant === "usd" ? (
                      <div className="inline-flex items-center gap-2">
                        <span className="text-lg font-bold tabular-nums tracking-tight text-[#131b2e] transition-colors duration-300 group-hover/stats:text-white sm:text-xl">
                          USD
                        </span>
                        <ImpactCounter
                          end={col.end}
                          suffix={col.suffix}
                          className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-none tracking-[-0.04em] text-[#131b2e] transition-colors duration-300 group-hover/stats:text-white"
                        />
                      </div>
                    ) : (
                      <ImpactCounter
                        end={col.end}
                        suffix={col.suffix}
                        className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-none tracking-[-0.04em] text-[#131b2e] transition-colors duration-300 group-hover/stats:text-white"
                      />
                    )}
                  </div>
                  <p className="relative z-[1] mt-6 max-w-[14rem] text-[13px] font-semibold uppercase leading-snug tracking-[0.06em] text-[#5c6b62] transition-colors duration-300 group-hover/stats:text-white sm:text-sm">
                    {col.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* Platform */}
      <section className="di-bg px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto grid max-w-[1274px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e6ff80]">
              Digital Infrastructure
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-[44px] sm:leading-[48px] sm:tracking-[-1.92px]">
              Building the Digital Backbone of Carbon Markets
            </h2>
            <p className="max-w-2xl text-base leading-7 text-[#d6d6db]">
              Enterprise-grade digital infrastructure enabling transparency, interoperability, trust, and scalable climate market operations.
            </p>
            <ul className="mt-8 space-y-3">
              {platformFeatures.map((item) => (
                <li
                  key={item.title}
                  className="group flex gap-4 rounded-xl border border-transparent px-3 py-4 transition duration-300 ease-out hover:border-white/10 hover:bg-white/[0.06] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] sm:px-4"
                >
                  <div className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-md border border-[#e6ff80]/25 bg-[#e6ff80]/10 text-[#e6ff80] transition duration-300 group-hover:scale-110 group-hover:bg-[#e6ff80] group-hover:text-[#003932]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 12.5L9.2 16.5L19 7"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white transition group-hover:text-[#e6ff80]">
                      {item.title}
                    </h3>
                    <p className="text-base leading-6 text-[#dbdbdb]">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-center mx-auto group relative aspect-square max-h-[min(90vw,560px)] overflow-hidden rounded-[30px] transition duration-500 ease-out lg:max-h-none">
            <img
              src={imgImage5}
              alt="Carbon market platform visualization"
              className="size-full object-cantain transition duration-500 ease-out group-hover:scale-[0.98] motion-reduce:group-hover:scale-100"
            />
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* Precision methodology */}
      <section className="bg-[#fafbfc] px-4 py-16 sm:px-6 sm:py-24 lg:px-8 mb-30">
        <div className="mx-auto max-w-[1152px] space-y-12 lg:space-y-16">
          <ScrollReveal>
            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-[#131b2e] sm:text-5xl sm:tracking-[-1.2px]">
                Strategic Climate & Carbon Market Services
              </h2>
              <div className="h-1 w-12 rounded-full bg-[#334ac9]" aria-hidden />
            </div>
          </ScrollReveal>
          <div className="grid items-stretch gap-6 sm:grid-cols-2 sm:gap-8 lg:gap-x-14 lg:gap-y-10">
            {methodologyCards.map((card, i) => (
              <ScrollReveal
                key={card.n}
                delayMs={i * 100}
                className="h-full min-h-0 cms-section"
                
              >
                <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-gradient-to-b from-white to-slate-50/90 p-6 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition duration-300 ease-out hover:-translate-y-1 hover:border-[#334ac9]/20 hover:shadow-[0_20px_50px_-24px_rgba(51,74,201,0.18)] motion-reduce:hover:translate-y-0 sm:p-8 hover:-rotate-2">
                  <div aria-hidden className="num-masking block leading-none mb-20">
                    <ImpactCounter
                      start={i}
                      end={i + 1}
                      minIntegerDigits={2}
                      durationMs={900}
                      className={`pointer-events-none select-none font-black tabular-nums ${card.color} text-7xl leading-none opacity-[0.30] sm:text-[96px] sm:leading-none`}
                    />
                  </div>
                  <div className="relative z-[1] -mt-14 space-y-3 sm:-mt-[4.25rem]">
                    <h3 className="text-xl font-bold tracking-tight text-[#131b2e] sm:text-2xl">
                      {card.title}
                    </h3>
                    <p className="text-base leading-relaxed text-[#444654]">{card.body}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="border-t wave-bg border-black/5 px-4 pt-16 pb-28 sm:px-6 sm:pt-24 sm:pb-36 lg:px-8 lg:pb-44">
        <ScrollReveal>
          <div className="mx-auto max-w-[1300px] space-y-12">
          <div className="space-y-4 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2b6193]">
              Experience Section
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl sm:tracking-[-1.44px]">
              Climate Intelligence & Strategic Expertise
            </h2>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
            {flowSteps.map((step) => (
              <div
                key={step.n}
                className="flow-steps-item group flex flex-col gap-2 rounded-xl border border-transparent bg-white/0 p-4 transition duration-300 ease-out hover:border-[#2b6193]/15 hover:bg-white hover:shadow-lg hover:shadow-black/[0.06] motion-reduce:hover:translate-y-0"
              >
                <span className="text-3xl font-bold text-[#006c49] transition group-hover:text-[#2b6193] sm:text-4xl">
                  {step.n}
                </span>
                <h3 className="pt-2 text-base font-bold text-[#191c1d]">{step.title}</h3>
                <p className="text-sm leading-5 text-[#45464d]">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
        </ScrollReveal>
      </section>


      <SiteCta />

      <SiteFooter />
      <ScheduleConsultationModal
        open={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </div>
  );
}
