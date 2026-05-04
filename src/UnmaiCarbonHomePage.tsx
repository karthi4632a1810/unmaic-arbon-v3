import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ImpactCounter } from "./components/ImpactCounter";
import { ScrollReveal } from "./components/ScrollReveal";
import heroVideo from "./assets/unmai-carbon.mp4";
import "./App.css";

/** Scroll distance before nav pins full-width to the top. */
const NAV_PIN_SCROLL_PX = 150;
/** Tailwind `md` breakpoint — hero offset matches header height only below this width. */
const MOBILE_MAX_WIDTH_PX = 767;

const HERO_SECTION_BG = "linear-gradient(148deg, black, #272727)";

const imgImage5 =
  "https://www.figma.com/api/mcp/asset/7a8bc8bb-67c1-422b-9da5-e8ee11009222";
const imgImage3 =
  "https://www.figma.com/api/mcp/asset/7c8496ff-75f5-4213-aa8c-30448363189a";
const imgStatIcon1 =
  "https://www.figma.com/api/mcp/asset/212b28f2-54f2-4cde-93fb-b518601ddc1c";
const imgStatIcon2 =
  "https://www.figma.com/api/mcp/asset/0b180b3b-76f4-45f5-a398-05bf7cf608b4";
const imgStatIcon3 =
  "https://www.figma.com/api/mcp/asset/e959a713-3190-4c66-85fe-479b21c2154e";
const imgStatIcon4 =
  "https://www.figma.com/api/mcp/asset/c9b15b42-3300-415f-a02c-427695a041ce";
const imgCheckIcon =
  "https://www.figma.com/api/mcp/asset/fc82b6a7-7956-4039-8892-42ae0874ad4f";
const imgSocial1 =
  "https://www.figma.com/api/mcp/asset/4f70c1c6-3bb8-4ce2-90db-780d4c5ce09b";
const imgSocial2 =
  "https://www.figma.com/api/mcp/asset/32977066-e325-41cc-9cec-7e06af5703b9";

const navLinks = [
  { label: "Solutions", active: true },
  { label: "Technology", active: false },
  { label: "Removal", active: false },
  { label: "About", active: false },
] as const;

const platformFeatures = [
  {
    title: "National Carbon Registries",
    body: "End-to-end systems for tracking, issuance, and retirement of carbon credits with full transparency and compliance readiness.",
  },
  {
    title: "Digital MRV Systems",
    body: "Advanced Monitoring, Reporting, and Verification frameworks designed for accuracy, scalability, and real-time validation.",
  },
  {
    title: "Climate Data & Market Intelligence",
    body: "Actionable insights across carbon markets, enabling better pricing, risk assessment, and investment decisions.",
  },
  {
    title: "Trusted Infrastructure (Blockchain-Enabled)",
    body: "Secure, interoperable systems ensuring traceability and integrity across the entire carbon credit lifecycle.",
  },
] as const;

const methodologyCards = [
  {
    n: "01",
    color: "text-[#4f65e3]",
    title: "Strategy & Policy Design",
    body: "We develop robust net zero strategies, policy frameworks, and Article 6 roadmaps aligned with global standards and national priorities.",
  },
  {
    n: "02",
    color: "text-[#006c49]",
    title: "Project & Market Development",
    body: "From carbon credit project structuring to national market frameworks, we build scalable systems that enable real climate action.",
  },
  {
    n: "03",
    color: "text-[#725400]",
    title: "Digital MRV & Infrastructure",
    body: "We implement advanced Monitoring, Reporting, and Verification systems along with digital registries to ensure accuracy, transparency, and interoperability.",
  },
  {
    n: "04",
    color: "text-[#131b2e]",
    title: "Verification, Finance & Execution",
    body: "Every carbon outcome is validated, tracked, and aligned with financing mechanisms—ensuring credibility, compliance, and long-term impact.",
  },
] as const;

const flowSteps = [
  {
    n: "01",
    title: "Assess",
    body: "Evaluate carbon baselines, policy environments, and market readiness to identify high-impact opportunities.",
  },
  {
    n: "02",
    title: "Design",
    body: "Develop tailored carbon market frameworks, project pipelines, and net zero transition strategies.",
  },
  {
    n: "03",
    title: "Structure Finance",
    body: "Align projects with climate finance mechanisms, carbon credit models, and investment pathways.",
  },
  {
    n: "04",
    title: "Build & Deploy",
    body: "Implement digital MRV systems, registries, and governance frameworks for operational execution.",
  },
  {
    n: "05",
    title: "Monitor & Optimize",
    body: "Continuously track performance, ensure compliance, and refine systems for long-term market efficiency.",
  },
] as const;

/** Hero body lines: visible on load (no delayed intro). */
const heroLine =
  "transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none translate-y-0 opacity-100";

export default function UnmaiCarbonHomePage() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const [navDocked, setNavDocked] = useState(false);
  /** On mobile, hero `margin-top` = measured fixed header height (px). */
  const [mobileHeroMarginTop, setMobileHeroMarginTop] = useState<number | undefined>(
    undefined,
  );

  useEffect(() => {
    const el = heroVideoRef.current;
    if (!el) return;
    el.muted = true;
    const playAttempt = el.play();
    if (playAttempt !== undefined) {
      playAttempt.catch(() => {
        /* autoplay blocked until interaction — muted usually succeeds */
      });
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setNavDocked(window.scrollY >= NAV_PIN_SCROLL_PX);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      {/* Outside hero <section> so z-index isn’t trapped by stacking contexts — stays above all bands */}
      <header
        ref={headerRef}
        className={[
          "fixed left-1/2 z-[99] -translate-x-1/2 backdrop-blur-md transition-[top,width,border-radius,padding,box-shadow,background-color,border-color,border-width] duration-500 ease-in-out motion-reduce:transition-none",
          // Mobile: always full-width bar at top (matches scrolled/desktop docked look).
          "top-0 w-screen rounded-none border-0 border-b border-black/10 bg-white/95 px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.08)] sm:px-6",
          // md+: floating pill until scroll threshold; when docked, base classes stay.
          !navDocked
            ? "md:top-6 md:w-[min(1280px,calc(100%-2rem))] md:rounded-[60px] md:border md:border-black/5 md:bg-white md:px-8 md:py-4 md:shadow-md"
            : "",
        ].join(" ")}
      >
        <nav
          className="mx-auto flex max-w-[1280px] flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6"
          aria-label="Primary"
        >
          <div className="flex items-center justify-between gap-4">
            <a
              href="#"
              className="text-xl font-bold tracking-tight text-[#0f172a] transition hover:text-[#006c49]"
            >
              Unmai Carbon
            </a>
            <button
              type="button"
              className="rounded-[44px] bg-black px-5 py-2 text-sm font-semibold text-white shadow-md transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg active:translate-y-0 motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-md md:hidden"
            >
              Get Started
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:flex-1 md:justify-center">
            {navLinks.map(({ label, active }) => (
              <a
                key={label}
                href="#"
                className={`text-sm font-medium tracking-tight transition-colors duration-200 hover:text-[#191c1d] ${
                  active
                    ? "border-b-2 border-[#191c1d] pb-0.5 text-[#191c1d]"
                    : "text-[#475569]"
                }`}
              >
                {label}
              </a>
            ))}
          </div>
          <button
            type="button"
            className="hidden shrink-0 rounded-[44px] bg-black px-6 py-2 text-sm font-semibold text-white shadow-md transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg active:translate-y-0 motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-md md:inline-flex"
          >
            Get Started
          </button>
        </nav>
      </header>

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
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <video
              ref={heroVideoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src={heroVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden
            >
              <source src={heroVideo} type="video/mp4" />
            </video>
          </div>
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
          <div className="mx-auto flex w-full max-w-[1280px] min-h-0 flex-col justify-center lg:px-8 md:px-6">
            {/*
              Figma alignment: equal-height columns; tops align (eyebrow & headline with right body);
              bottoms align (CTAs with STRATEGIC BLUEPRINT). Buttons live in the left column.
            */}
            <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-x-12 xl:gap-x-16">
              <div className="flex min-h-0 flex-col gap-10 self-stretch lg:col-span-8 lg:justify-between lg:gap-12 xl:gap-14">
                <div className="max-w-[52rem] space-y-6">
                  <div className={heroLine}>
                    <p className="text-base font-bold uppercase tracking-[0.25em] text-[#e6ff80] sm:text-[26px] sm:leading-6 sm:tracking-[3.2px]">
                      We Don’t Just
                    </p>
                  </div>
                  <div className={heroLine}>
                    <h1 className="text-4xl font-bold tracking-[-0.02em] text-white sm:text-6xl lg:text-[75px] lg:leading-[1.01] lg:tracking-[-0.04em]">
                      <span className="block whitespace-normal">
                        Talk About <span className="text-[#e6ff80]">Net Zero</span>.
                      </span>
                      <span className="mt-1 block">
                        We <span className="text-[#8b8b95]">Build</span> It.
                      </span>
                    </h1>
                  </div>
                </div>
                <div className={`flex shrink-0 flex-wrap gap-4 ${heroLine}`}>
                  <button
                    type="button"
                    className="rounded-lg bg-[#e7e8e9] px-8 py-4 text-sm font-bold uppercase tracking-[0.1em] text-[#191c1d] shadow-md transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-white hover:shadow-xl active:translate-y-0 motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-md"
                  >
                    Explore Our Approach
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-[#e6ff80] bg-black px-8 py-4 text-sm font-bold uppercase tracking-[0.1em] text-white shadow-lg shadow-black/40 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-neutral-900 hover:shadow-xl active:translate-y-0 motion-reduce:hover:translate-y-0 md:border-0"
                  >
                    Book a Consultation
                  </button>
                </div>
              </div>

              <div
                className={`flex min-h-0 flex-col justify-center gap-8 self-stretch border-t border-white/25 pt-8 lg:col-span-4 lg:h-full lg:gap-0 lg:border-l lg:border-t-0 lg:border-white/30 lg:pl-10 lg:pt-0 xl:pl-12 ${heroLine}`}
              >
                {/* Desktop: vertically center the two paragraphs in the band above STRATEGIC */}
                <div className="flex min-h-0 flex-col justify-center">
                  <div className="space-y-4">
                    <p className="text-base font-semibold leading-snug text-white">
                      Where policy, finance, and technology stop arguing and start working together.
                    </p>
                    <p className="text-base leading-relaxed text-[#cdcdcd]">
                      Unmai Carbon aligns global incentives to accelerate deployment of carbon infrastructure at scale.
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex shrink-0 items-center gap-4 lg:mt-8">
                  <span className="h-px w-12 shrink-0 bg-[#e6ff80]" aria-hidden />
                  <span className="text-sm font-bold uppercase tracking-wide text-white">
                    Strategic Blueprint 2024
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
          <div className="mx-auto flex max-w-[1280px] flex-col gap-12 lg:gap-16">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-base font-bold uppercase tracking-[0.1em] text-[#006c49]">
                Real-world impact
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-[#131b2e] sm:text-4xl">
                Global Carbon Intelligence
              </h2>
            </div>
            <p className="max-w-md text-left text-base leading-6 text-[#444654] lg:text-right">
              Powering carbon markets, policy, and climate finance across continents with measurable outcomes.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
            {(
              [
                {
                  icon: imgStatIcon1,
                  end: 200,
                  suffix: "M+",
                  label: "tCO₂e reduction pipeline",
                },
                {
                  icon: imgStatIcon2,
                  end: 5,
                  prefix: "$",
                  suffix: "B+",
                  label: "Climate project value",
                },
                {
                  icon: imgStatIcon3,
                  end: 15,
                  suffix: "+",
                  label: "Countries engaged",
                },
                {
                  icon: imgStatIcon4,
                  end: 50,
                  suffix: "+",
                  label: "Combined expertise",
                  showYears: true,
                },
              ] as const
            ).map((col, i) => (
              <div
                key={i}
                className="flex flex-col gap-6 border border-dashed border-black/15 bg-white px-8 py-10 transition duration-300 ease-out hover:-translate-y-1 hover:border-[#006c49]/25 hover:shadow-[0_12px_40px_-12px_rgba(0,108,73,0.15)] motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none sm:px-10"
              >
                <div className="relative h-6 w-full">
                  <img src={col.icon} alt="" className="h-full w-auto object-contain object-left" />
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold tracking-tight text-[#131b2e] sm:text-[60px] sm:leading-none sm:tracking-[-3px]">
                    {"showYears" in col && col.showYears ? (
                      <span className="inline-flex flex-wrap items-baseline gap-x-1">
                        <ImpactCounter
                          end={col.end}
                          suffix="+ "
                          className="text-5xl tracking-tight sm:text-6xl"
                        />
                        <span className="text-xl sm:text-2xl">Years</span>
                      </span>
                    ) : (
                      <ImpactCounter
                        end={col.end}
                        prefix={"prefix" in col && col.prefix ? col.prefix : undefined}
                        suffix={col.suffix}
                      />
                    )}
                  </div>
                  <p className="text-base uppercase leading-6 text-[#444654]">{col.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* Platform */}
      <section className="bg-[#191c1d] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto grid max-w-[1274px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e6ff80]">
              The Platform
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-[44px] sm:leading-[48px] sm:tracking-[-1.92px]">
              Powering Carbon Markets
              <br />
              with Data and Intelligence.
            </h2>
            <ul className="mt-8 space-y-3">
              {platformFeatures.map((item) => (
                <li
                  key={item.title}
                  className="group flex gap-4 rounded-xl border border-transparent px-3 py-4 transition duration-300 ease-out hover:border-white/10 hover:bg-white/[0.06] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] sm:px-4"
                >
                  <div className="mt-1 shrink-0 transition duration-300 group-hover:scale-110">
                    <img src={imgCheckIcon} alt="" className="size-5" />
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
          <div className="group relative aspect-square max-h-[min(90vw,560px)] overflow-hidden rounded-[30px] shadow-2xl shadow-black/40 ring-1 ring-white/10 transition duration-500 ease-out hover:shadow-[0_25px_80px_-20px_rgba(230,255,128,0.12)] hover:ring-white/20 lg:max-h-none">
            <img
              src={imgImage5}
              alt="Carbon market platform visualization"
              className="size-full object-cover transition duration-500 ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
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
                Precision Methodology
              </h2>
              <div className="h-1 w-12 rounded-full bg-[#334ac9]" aria-hidden />
            </div>
          </ScrollReveal>
          <div className="grid items-stretch gap-6 sm:grid-cols-2 sm:gap-8 lg:gap-x-14 lg:gap-y-10">
            {methodologyCards.map((card, i) => (
              <ScrollReveal
                key={card.n}
                delayMs={i * 100}
                className="h-full min-h-0"
              >
                <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-gradient-to-b from-white to-slate-50/90 p-6 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition duration-300 ease-out hover:-translate-y-1 hover:border-[#334ac9]/20 hover:shadow-[0_20px_50px_-24px_rgba(51,74,201,0.18)] motion-reduce:hover:translate-y-0 sm:p-8">
                  <div aria-hidden className="block leading-none mb-20">
                    <ImpactCounter
                      start={i}
                      end={i + 1}
                      minIntegerDigits={2}
                      durationMs={900}
                      className={`pointer-events-none select-none font-black tabular-nums ${card.color} text-7xl leading-none opacity-[0.14] sm:text-[96px] sm:leading-none`}
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
      <section className="border-t wave-bg border-black/5 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-[1280px] space-y-12">
          <div className="space-y-4 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2b6193]">
              The Methodology
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl sm:tracking-[-1.44px]">
              Strategic Execution Flow
            </h2>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
            {flowSteps.map((step) => (
              <div
                key={step.n}
                className="group flex flex-col gap-2 rounded-xl border border-transparent bg-white/0 p-4 transition duration-300 ease-out hover:-translate-y-1 hover:border-[#2b6193]/15 hover:bg-white hover:shadow-lg hover:shadow-black/[0.06] motion-reduce:hover:translate-y-0"
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

      {/* Results */}
      <section className="px-4 py-30 sm:px-6 sm:py-40 lg:px-8 lg:py-60">
        <ScrollReveal>
          <div className="mx-auto grid max-w-[1216px] items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)] lg:gap-16">
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2b6193]">
              Our Impact
            </p>
            <h2 className="font-display max-w-sm text-2xl font-bold leading-tight tracking-tight text-black sm:text-[31px] sm:leading-[45px] sm:tracking-[-1.44px]">
              Scale Measured in Results, Not Just Ambition.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
            <div className="space-y-2 rounded-xl border border-transparent bg-white/0 p-6 transition duration-300 ease-out hover:-translate-y-1 hover:border-[#2b6193]/20 hover:bg-white hover:shadow-xl hover:shadow-[#2b6193]/10 motion-reduce:hover:translate-y-0">
              <p className="text-4xl font-bold tracking-tight text-[#2b6193] sm:text-[60px] sm:leading-none sm:tracking-[-3px]">
                <ImpactCounter end={15} suffix="+" />
              </p>
              <p className="text-sm font-bold uppercase tracking-wider text-[#45464d]">
                Countries engaged
              </p>
            </div>
            <div className="space-y-2 rounded-xl border border-transparent bg-white/0 p-6 transition duration-300 ease-out hover:-translate-y-1 hover:border-[#c96b14]/25 hover:bg-white hover:shadow-xl hover:shadow-[#c96b14]/10 motion-reduce:hover:translate-y-0">
              <p className="text-4xl font-bold tracking-tight text-[#c96b14] sm:text-[60px] sm:leading-none sm:tracking-[-3px]">
                <ImpactCounter end={5} prefix="$" suffix="B+" />
              </p>
              <p className="text-sm font-bold uppercase tracking-wider text-[#45464d]">
                Climate project value
              </p>
            </div>
            <div className="space-y-2 rounded-xl border border-transparent bg-white/0 p-6 transition duration-300 ease-out hover:-translate-y-1 hover:border-[#2b6193]/20 hover:bg-white hover:shadow-xl hover:shadow-[#2b6193]/10 motion-reduce:hover:translate-y-0">
              <p className="text-4xl font-bold tracking-tight text-[#2b6193] sm:text-[60px] sm:leading-none sm:tracking-[-3px]">
                <ImpactCounter end={200} suffix="M+" />
              </p>
              <p className="text-sm font-bold uppercase tracking-wider text-[#45464d]">
                tCO₂e reduction pipeline
              </p>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* Final CTA */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <ScrollReveal>
          <div className="relative mx-auto max-w-[1216px] overflow-hidden rounded-[32px] bg-black px-8 py-16 text-center shadow-2xl shadow-black/30 transition duration-300 ease-out hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute inset-0 opacity-10" aria-hidden>
            <div className="absolute inset-y-0 left-[25%] w-px bg-white" />
            <div className="absolute inset-y-0 right-[25%] w-px bg-white" />
            <div className="absolute left-0 right-0 top-[28%] h-px bg-white" />
          </div>
          <div className="relative mx-auto flex max-w-3xl flex-col gap-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-none sm:tracking-[-1.92px]">
              Start Building Your Carbon Strategy Today.
            </h2>
            <p className="text-base leading-7 text-white/70 sm:text-lg">
              From ambition to execution. Partner with the architects of the carbon future.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button
                type="button"
                className="rounded-lg bg-white px-8 py-4 text-sm font-bold text-black shadow-lg shadow-black/20 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-neutral-100 hover:shadow-xl active:translate-y-0 motion-reduce:hover:translate-y-0"
              >
                Book a Consultation
              </button>
              <button
                type="button"
                className="rounded-lg border border-white/20 bg-white/10 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-black/30 backdrop-blur-sm transition duration-200 ease-out hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/20 hover:shadow-xl active:translate-y-0 motion-reduce:hover:translate-y-0"
              >
                Contact Our Team
              </button>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="bg-[#f9f9f9]">
        <ScrollReveal>
          <div className="mx-auto max-w-[1020px] px-6 pb-8 pt-16">
          <div className="grid gap-12 border-b border-black/10 pb-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center overflow-hidden rounded-md bg-black">
                  <img src={imgImage3} alt="Unmai Carbon mark" className="h-9 w-auto object-contain" />
                </div>
                <span className="text-2xl font-bold tracking-tight text-black">UNMAI Carbon</span>
              </div>
              <p className="text-sm text-black">Truth · Transparency · Traceability · Integrity</p>
              <p className="text-xs leading-relaxed text-black">
                10, Sim Lim Tower, Jalan Besar #10-10,
                <br />
                Singapore 208787
              </p>
              <div className="flex gap-2 pt-2">
                <a
                  href="#"
                  className="flex size-8 items-center justify-center rounded-md border border-black/10 bg-black/5 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-black/20 hover:bg-black/10 hover:shadow-md active:translate-y-0 motion-reduce:hover:translate-y-0"
                  aria-label="Social"
                >
                  <img src={imgSocial1} alt="" className="size-3.5" />
                </a>
                <a
                  href="#"
                  className="flex size-8 items-center justify-center rounded-md border border-black/10 bg-black/5 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-black/20 hover:bg-black/10 hover:shadow-md active:translate-y-0 motion-reduce:hover:translate-y-0"
                  aria-label="Social"
                >
                  <img src={imgSocial2} alt="" className="size-3.5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-[11px] font-bold uppercase tracking-wider text-black">
                What we offer
              </h3>
              <ul className="space-y-2.5 text-sm text-black">
                {[
                  "Net Zero Advisory",
                  "Climate Finance",
                  "Carbon Market Frameworks",
                  "Digital Infrastructure",
                  "Capacity Building",
                  "Carbon Credit Projects",
                ].map((t) => (
                  <li key={t}>
                    <a
                      href="#"
                      className="inline-block transition duration-200 ease-out hover:text-[#006c49] hover:underline"
                    >
                      {t}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-[11px] font-bold uppercase tracking-wider text-black">
                Engagements
              </h3>
              <ul className="space-y-2.5 text-sm text-black">
                {["About", "Assignments", "Experience", "Memberships", "Partnerships"].map((t) => (
                  <li key={t}>
                    <a
                      href="#"
                      className="inline-block transition duration-200 ease-out hover:text-[#006c49] hover:underline"
                    >
                      {t}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-[11px] font-bold uppercase tracking-wider text-black">
                Contact
              </h3>
              <ul className="space-y-2.5 text-sm text-black">
                {["Get in Touch", "LinkedIn", "Email Us"].map((t) => (
                  <li key={t}>
                    <a
                      href="#"
                      className="inline-block transition duration-200 ease-out hover:text-[#006c49] hover:underline"
                    >
                      {t}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        </ScrollReveal>
        <div className="bg-[#45464d] px-6 py-6">
          <div className="mx-auto flex max-w-[1020px] flex-col items-start justify-between gap-4 text-xs text-white sm:flex-row sm:items-center">
            <p>© 2026 UNMAI Carbon Solutions Pte Ltd. All rights reserved.</p>
            <p>Confidential — Not for Circulation</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
