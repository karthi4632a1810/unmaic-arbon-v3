/**
 * Homepage bands. Each one takes its shape from the element that governs it:
 * Land reads as strata, Air as a connected platform, Fire as a fan, Water as a current.
 */
import { ImpactCounter } from "./ImpactCounter";
import { ScrollLink } from "./ScrollLink";
import { ScrollReveal } from "./ScrollReveal";
import type { CSSProperties } from "react";
import { Streamlines } from "./ElementMotifs";
import { PRESS_RELEASES } from "../data/news";

const SECTION = "px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12";

/* -------------------------------------------------------------------- land */

const imgStatIcon1 =
  "https://www.figma.com/api/mcp/asset/212b28f2-54f2-4cde-93fb-b518601ddc1c";
const imgStatIcon2 =
  "https://www.figma.com/api/mcp/asset/0b180b3b-76f4-45f5-a398-05bf7cf608b4";
const imgStatIcon3 =
  "https://www.figma.com/api/mcp/asset/e959a713-3190-4c66-85fe-479b21c2154e";
const imgStatIcon4 =
  "https://www.figma.com/api/mcp/asset/c9b15b42-3300-415f-a02c-427695a041ce";

export function TrustMetricsSection() {
  return (
    <section className="border-t border-black/5 px-4 py-16 sm:px-6 sm:py-24 lg:px-8 bg-white">
      <ScrollReveal>
        <div className="mx-auto flex max-w-[1300px] flex-col gap-12 lg:gap-16">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-base font-bold uppercase tracking-widest text-neutral-500">
                Trust Metrics
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-[#131b2e] sm:text-4xl">
                Trusted Across Governments, Multilaterals, Climate Institutions, NGOs and Global
                Corporates
              </h2>
            </div>
            <p className="max-w-md text-base leading-6 text-[#444654] text-justify">
              Supporting sovereign and corporate carbon market and digital infrastructure development,
              climate finance, and Article 6 implementation across Asia, Africa, and globally.
            </p>
          </div>
          <div
            className="overflow-hidden rounded-2xl border border-black/9 bg-[white] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.055)_1px,transparent_1px)] bg-size-[22px_22px]"
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
                    end: 100,
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
                    end: 800,
                    suffix: "M+",
                    label: "tCO2e project pipeline",
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
                  <div className="relative z-1 mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold uppercase leading-snug tracking-[0.14em] text-[#5c6b62] transition-colors duration-300 group-hover/stats:text-white sm:text-xs">
                    <span className="inline-flex items-center gap-1.5">
                    </span>
                    <span className="tracking-[0.14em]">{col.category}</span>
                  </div>
                  <div className="relative z-1 flex flex-1 flex-col justify-center transition-colors duration-300">
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
                  <p className="relative z-1 mt-6 max-w-56 text-[13px] font-semibold uppercase leading-snug tracking-[0.06em] text-[#5c6b62] transition-colors duration-300 group-hover/stats:text-white sm:text-sm">
                    {col.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

export function CredentialStrip() {
  return (
    <section className={`bg-[#fafafa] ${SECTION}`}>
      <div className="mx-auto max-w-[1300px]">
        <ScrollReveal>
          {/* Outer card */}
          <div className="relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-[0_4px_28px_rgba(0,0,0,0.04)]">

            {/* Faint globe watermark — top right */}
            <svg
              viewBox="0 0 300 300"
              className="pointer-events-none absolute -right-10 -top-10 h-[320px] w-[320px] opacity-[0.05]"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="150" cy="150" r="140" stroke="#18181b" strokeWidth="2" />
              <circle cx="150" cy="150" r="100" stroke="#18181b" strokeWidth="1.5" />
              <circle cx="150" cy="150" r="60" stroke="#18181b" strokeWidth="1" />
              <ellipse cx="150" cy="150" rx="50" ry="140" stroke="#18181b" strokeWidth="1.5" />
              <ellipse cx="150" cy="150" rx="100" ry="140" stroke="#18181b" strokeWidth="1" />
              <line x1="10" y1="150" x2="290" y2="150" stroke="#18181b" strokeWidth="1.2" />
              <path d="M20 100 Q150 120 280 100" stroke="#18181b" strokeWidth="1" fill="none" />
              <path d="M20 200 Q150 180 280 200" stroke="#18181b" strokeWidth="1" fill="none" />
              {[...Array(8)].map((_, row) =>
                [...Array(8)].map((_, col) => (
                  <circle
                    key={`${row}-${col}`}
                    cx={30 + col * 36}
                    cy={30 + row * 36}
                    r="2"
                    fill="#18181b"
                  />
                ))
              )}
            </svg>

            {/* Decorative leaves — bottom right */}
            <svg
              viewBox="0 0 120 100"
              className="pointer-events-none absolute bottom-0 right-12 h-24 w-28 opacity-[0.12]"
              fill="none"
              aria-hidden="true"
            >
              <path d="M20 80 C20 50, 55 20, 80 12 C80 45, 55 80, 20 80Z" fill="#52525b" />
              <path d="M20 80 C42 58, 62 36, 80 12" stroke="#52525b" strokeWidth="2" strokeLinecap="round" />
              <path d="M55 80 C55 58, 78 42, 98 36 C98 58, 78 80, 55 80Z" fill="#52525b" fillOpacity="0.7" />
              <path d="M55 80 C68 64, 82 50, 98 36" stroke="#52525b" strokeWidth="1.8" strokeLinecap="round" />
            </svg>

            <div className="flex flex-col items-stretch lg:flex-row">

              {/* ── Left: Logo panel ── */}
              <div className="relative flex shrink-0 flex-col items-center justify-center gap-4 bg-neutral-100/70 px-10 py-10 lg:w-[260px] lg:py-12">
                {/* Dot grid background */}
                <svg
                  viewBox="0 0 200 200"
                  className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
                  fill="none"
                  aria-hidden="true"
                >
                  {[...Array(8)].map((_, row) =>
                    [...Array(8)].map((_, col) => (
                      <circle key={`${row}-${col}`} cx={14 + col * 26} cy={14 + row * 26} r="2" fill="#52525b" />
                    ))
                  )}
                </svg>

                {/* Decorative leaf top-left */}
                <svg viewBox="0 0 60 60" className="absolute left-3 top-3 h-10 w-10 opacity-35" fill="none" aria-hidden="true">
                  <path d="M8 48 C8 28, 28 12, 46 8 C46 28, 28 48, 8 48Z" fill="#52525b" fillOpacity="0.6" />
                  <path d="M8 48 C24 34, 36 20, 46 8" stroke="#52525b" strokeWidth="1.5" strokeLinecap="round" />
                </svg>

                {/* UN Logo in rounded white card */}
                <div className="relative z-10 flex h-[140px] w-[140px] items-center justify-center rounded-2xl border border-neutral-200 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  <img
                    src="/un-global-compact.png"
                    alt="United Nations Global Compact Participant"
                    className="h-[120px] w-auto object-contain grayscale opacity-90 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                  />
                </div>
              </div>

              {/* ── Divider with arrow circle ── */}
              <div className="relative flex items-center justify-center lg:w-0">
                <div className="absolute hidden h-full w-px bg-neutral-200 lg:block" aria-hidden="true" />
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm lg:absolute lg:z-10">
                  <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden="true">
                    <path d="M6 4l4 4-4 4" stroke="#52525b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* ── Right: Content ── */}
              <div className="relative z-10 flex flex-1 flex-col justify-center gap-4 px-8 py-10 lg:px-12 lg:py-12">
                <h2 className="display-head text-2xl font-bold leading-tight tracking-[-0.02em] text-neutral-900 sm:text-3xl lg:text-[2rem]">
                  Our Commitment to{" "}
                  <span className="text-neutral-500">Integrity</span>
                </h2>

                {/* Badge */}
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1.5">
                  <svg viewBox="0 0 20 20" className="size-4 shrink-0" fill="none" aria-hidden="true">
                    <path d="M10 3 C10 3, 14 5, 14 10 C14 14, 10 17, 10 17 C10 17, 6 14, 6 10 C6 5, 10 3, 10 3Z" fill="#71717a" fillOpacity="0.25" stroke="#3f3f46" strokeWidth="1.5" />
                    <path d="M7 10 C7 7, 8 5, 10 4" stroke="#3f3f46" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-700">
                    UN Global Compact Participant
                  </span>
                </div>

                <p className="max-w-2xl text-[15px] leading-7 text-neutral-600">
                  As an active participant in the{" "}
                  <strong className="font-semibold text-neutral-900">United Nations Global Compact</strong>,
                  UNMAI Carbon Solutions is dedicated to upholding the highest global standards for
                  sustainable and responsible business. We believe that true climate action requires
                  measurable accountability, which is why we commit to documenting our efforts annually
                  through the UNGC Communication on Progress (CoP) framework.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- air */

const PLATFORM_LAYERS = [
  {
    title: "National Carbon Registry Systems",
    body: "Sovereign-grade, high integrity and Paris aligned registries for issuance, transfer, and retirement of domestic and international carbon credits / ITMOs with full transparent governance, traceability and accountability controls.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="size-6" aria-hidden="true">
        <rect x="2" y="2" width="24" height="24" rx="4" stroke="#ffffff" strokeWidth="1.5" fill="none" />
        <path d="M14 7v6l4 3" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 18l2 2 5-6" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Digital MRV Ecosystems",
    body: "Monitoring, Reporting, and Verification infrastructure built for transparent and scalable implementation.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="size-6" aria-hidden="true">
        <rect x="2" y="2" width="24" height="24" rx="4" stroke="#ffffff" strokeWidth="1.5" fill="none" />
        <rect x="8" y="8" width="12" height="4" rx="1" stroke="#ffffff" strokeWidth="1.5" fill="none" />
        <rect x="8" y="16" width="12" height="4" rx="1" stroke="#ffffff" strokeWidth="1.5" fill="none" />
        <line x1="14" y1="12" x2="14" y2="16" stroke="#ffffff" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Blockchain-Enabled Carbon Traceability",
    body: "Trusted digital traceability architecture across the full carbon credit lifecycle.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="size-6" aria-hidden="true">
        <rect x="2" y="2" width="24" height="24" rx="4" stroke="#ffffff" strokeWidth="1.5" fill="none" />
        <circle cx="10" cy="10" r="3" stroke="#ffffff" strokeWidth="1.5" fill="none" />
        <circle cx="18" cy="18" r="3" stroke="#ffffff" strokeWidth="1.5" fill="none" />
        <line x1="12.5" y1="12.5" x2="15.5" y2="15.5" stroke="#ffffff" strokeWidth="1.5" />
        <circle cx="18" cy="10" r="2" stroke="#ffffff" strokeWidth="1.2" fill="none" />
        <circle cx="10" cy="18" r="2" stroke="#ffffff" strokeWidth="1.2" fill="none" />
      </svg>
    ),
  },
  {
    title: "NAMBI Framework",
    body: "Interoperable carbon data framework towards achieving high-integrity carbon markets, and enabling climate finance to scale with confidence.",
    link: "https://www.nambi.earth/",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="size-6" aria-hidden="true">
        <rect x="2" y="2" width="24" height="24" rx="4" stroke="#ffffff" strokeWidth="1.5" fill="none" />
        <path d="M8 8h12M8 12h12M8 16h8M8 20h5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
] as const;

function InfraCard({
  layer,
  delayMs,
}: {
  layer: (typeof PLATFORM_LAYERS)[number];
  delayMs: number;
}) {
  const content = (
    <div className="group flex items-start gap-4">
      {/* Icon box */}
      <div className="flex shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] p-2.5">
        {layer.icon}
      </div>


      {/* Text */}
      <div className="min-w-0 flex-1">
        <h3 className="display-head inline-flex items-center gap-1.5 text-base font-bold text-white xs:text-[17px]">
          {layer.title}
          {"link" in layer && layer.link ? (
            <svg
              className="size-3.5 opacity-60"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          ) : null}
        </h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[#b0b8b2]">{layer.body}</p>
      </div>
    </div>
  );

  return (
    <ScrollReveal delayMs={delayMs} className="min-h-0">
      {"link" in layer && layer.link ? (
        <a
          href={layer.link}
          target="_blank"
          rel="noreferrer noopener"
          className="block rounded-xl border border-white/8 bg-white/[0.04] p-5 transition duration-300 hover:border-white/25 hover:bg-white/[0.07]"
        >
          {content}
        </a>
      ) : (
        <div className="rounded-xl border border-white/8 bg-white/[0.04] p-5 transition duration-300 hover:border-white/25 hover:bg-white/[0.07]">
          {content}
        </div>
      )}
    </ScrollReveal>
  );
}

export function DigitalInfrastructureSection() {
  return (
    <section className={`di-bg relative overflow-hidden ${SECTION}`}>
      <Streamlines className="pointer-events-none absolute inset-0 h-full w-full text-white/10" />

      <div className="relative mx-auto max-w-[1300px]">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left column: Text & Features */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              {/* Eyebrow with diamond + line */}
              <div className="flex items-center gap-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-neutral-400">
                  Digital Infrastructure
                </p>
                <div className="flex items-center gap-1">
                  <span className="h-px w-20 bg-white/25 sm:w-28" />
                  <svg viewBox="0 0 10 10" className="size-2.5 text-neutral-400" fill="currentColor" aria-hidden="true">
                    <rect x="5" y="0" width="7" height="7" rx="1" transform="rotate(45 5 0)" />
                  </svg>
                </div>
              </div>

              {/* Heading + description stacked */}
              <div className="mt-6">
                <h2 className="display-head text-[clamp(1.9rem,4vw,3.2rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white">
                  Building the Digital Backbone<br />
                  of <span className="text-white">Carbon Markets</span>
                </h2>
                <p className="mt-4 text-sm leading-6 text-[#c9cfc9] xs:text-[15px] xs:leading-7">
                  Mission critical and institutional-grade digital infrastructure enabling transparency,
                  interoperability, trust, and scalable climate market operations.
                </p>
              </div>
            </ScrollReveal>

            {/* Cards stacked on the left */}
            <div className="mt-8 flex flex-col gap-3.5 sm:mt-10">
              {PLATFORM_LAYERS.map((layer, i) => (
                <InfraCard key={layer.title} layer={layer} delayMs={i * 80} />
              ))}
            </div>
          </div>

          {/* Right column: Platform Visualization Image */}
          <div className="lg:col-span-5">
            <ScrollReveal delayMs={150}>
              <div className="group relative mx-auto flex aspect-square max-h-[min(90vw,520px)] w-full items-center justify-center overflow-hidden rounded-[30px] transition duration-500 ease-out lg:max-h-none">
                <img
                  src="/unmai-carbon-img.png"
                  alt="Carbon market platform visualization"
                  className="size-full object-contain transition duration-500 ease-out group-hover:scale-[0.98] motion-reduce:group-hover:scale-100"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- fire */

const SERVICE_ICONS = {
  policy: (
    <>
      <path d="M14.4 3H7.4A2.3 2.3 0 0 0 5.1 5.3v13.4A2.3 2.3 0 0 0 7.4 21h9.2a2.3 2.3 0 0 0 2.3-2.3V7.6L14.4 3z" />
      <path d="M14.2 3.2v3.3c0 .8.7 1.5 1.5 1.5h3.2" />
      <path d="M8.3 11.3h5.4M8.3 14.2h3.2" />
      <path d="M16.6 13.9c-2.7.2-4 1.9-3.9 4.5 2.7-.2 4-1.9 3.9-4.5z" />
      <path d="M12.9 18.4c.6-1.5 1.7-2.7 3.1-3.3" />
    </>
  ),
  finance: (
    <>
      <path d="M4.2 20.4h15.6" />
      <path d="M7.3 20.4v-4.9M11.1 20.4v-7.6M14.9 20.4v-3.4M18.7 20.4v-6.2" />
      <path d="M20.4 8.6c-2.9.1-4.4 1.9-4.3 4.7 2.9-.1 4.4-1.9 4.3-4.7z" />
      <path d="M15.7 13.6c.7-1.6 1.9-2.8 3.4-3.5" />
      <path d="M4.6 11.2 8.8 7l3 2.8 3.4-3.6" />
    </>
  ),
  infrastructure: (
    <>
      <circle cx="11.4" cy="11.4" r="7.6" />
      <ellipse cx="11.4" cy="11.4" rx="3.1" ry="7.6" />
      <path d="M4.2 8.8h14.4M4.2 14h14.4" />
      <path d="M20.6 14.7c-2.8.1-4.2 1.8-4.1 4.5 2.8-.1 4.2-1.8 4.1-4.5z" />
      <path d="M16.1 19.4c.6-1.5 1.8-2.7 3.2-3.4" />
    </>
  ),
  governance: (
    <>
      <path d="M12 3.1 19 5.8v5.3c0 4.1-2.8 7.2-7 8.4-4.2-1.2-7-4.3-7-8.4V5.8l7-2.7z" />
      <path d="m8.7 11.9 2.3 2.3 4.3-4.5" />
    </>
  ),
} as const;

type ServiceIconId = keyof typeof SERVICE_ICONS;

function ServiceIcon({ id, className = "size-8" }: { id: ServiceIconId; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {SERVICE_ICONS[id]}
    </svg>
  );
}

/** Bottom-right flourish: a current of lines running into a dot field, tinted by the card's accent. */
function CardFlourish({ className = "", style }: { className?: string; style?: CSSProperties }) {
  const curves = Array.from({ length: 9 }, (_, i) => i);
  const dotCols = Array.from({ length: 10 }, (_, i) => i);
  const dotRows = Array.from({ length: 6 }, (_, i) => i);

  return (
    <svg viewBox="0 0 260 150" className={className} style={style} fill="none" aria-hidden="true">
      {curves.map((i) => (
        <path
          key={i}
          d={`M-10 ${152 - i * 4} C 70 ${138 - i * 10}, 150 ${128 - i * 9}, 264 ${86 - i * 8}`}
          stroke="currentColor"
          strokeWidth="1"
          opacity={0.5 - i * 0.035}
        />
      ))}
      <g fill="currentColor">
        {dotRows.map((row) =>
          dotCols.map((col) => (
            <circle
              key={`${row}-${col}`}
              cx={162 + col * 10}
              cy={72 + row * 11}
              r="1.2"
              opacity={0.4 - row * 0.03}
            />
          )),
        )}
      </g>
    </svg>
  );
}

/**
 * Four practice lines, each carrying the hue of the element it belongs to:
 * policy rides Air, finance Land, infrastructure Fire, governance Space.
 */
const SERVICES = [
  {
    icon: "policy",
    title: "Climate Policy & Carbon Market Advisory",
    body: "Designing sectoral decarbonization pathways, Net Zero strategies, Long-term climate policy design (NDCs, LT-LEDS, CBAM readiness), Article 6 operationalization strategies, capacity building and institutional readiness programs.",
    accent: "#4a5568",
    tint: "#eceef1",
  },
  {
    icon: "finance",
    title: "Climate Finance & Investment Strategy",
    body: "Structuring results-based finance and carbon credit-linked instruments, policy and investment advisory, ESG driven capital mobilization strategies and MRV-aligned financing mechanisms.",
    accent: "#4a5568",
    tint: "#eceef1",
  },
  {
    icon: "infrastructure",
    title: "Carbon Market Infrastructure & Governance",
    body: "Designing national and subnational carbon market frameworks, building interoperable carbon registries, digital MRV ecosystems, blockchain-enabled trust architecture, climate data standardization and infrastructure governance.",
    accent: "#4a5568",
    tint: "#eceef1",
  },
  {
    icon: "governance",
    title: "Transparent Climate Governance",
    body: "Strengthening institutional transparency, standards alignment, traceability systems, and long-term climate governance mechanisms.",
    accent: "#4a5568",
    tint: "#eceef1",
  },
] as const satisfies readonly {
  icon: ServiceIconId;
  title: string;
  body: string;
  accent: string;
  tint: string;
}[];

export function StrategicServicesSection() {
  return (
    <section
      className={`relative overflow-hidden ${SECTION}`}
      style={{ backgroundImage: "linear-gradient(180deg,#f4f7fa 0%,#fbfcfd 45%,#ffffff 100%)" }}
    >
      <div className="relative mx-auto max-w-[1300px]">
        <ScrollReveal className="mx-auto max-w-[1150px] text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-neutral-500 sm:text-xs">
            Our Core Services
          </p>

          {/* Rule with the leaf sitting on it */}
          <div className="mt-4 flex items-center justify-center gap-3" aria-hidden>
            <span className="h-px w-16 bg-[#131b2e]/10 sm:w-28" />
            <svg viewBox="0 0 24 24" className="size-[18px] text-neutral-400" fill="none">
              <path
                d="M20.2 3.9c-9.2.2-13.7 4.6-13.2 13.3 9.2-.2 13.7-4.6 13.2-13.3z"
                fill="currentColor"
              />
              <path
                d="M5.6 20.6C7.2 15.4 10.8 11.5 16.4 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="h-px w-16 bg-[#131b2e]/10 sm:w-28" />
          </div>

          <h2 className="display-head mt-4 text-[clamp(1.6rem,4.4vw,3.05rem)] font-bold leading-[1.08] text-balance tracking-[-0.02em] text-[#131b2e]">
            Strategic Climate &amp; Carbon Market Services
          </h2>
          <span
            className="mx-auto mt-5 block h-1 w-24 rounded-full"
            style={{ backgroundImage: "linear-gradient(90deg,#4a5568,#71717a)" }}
            aria-hidden
          />
        </ScrollReveal>

        <div className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-7">
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.title} delayMs={i * 70} className="h-full">
              <article
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#131b2e]/6 shadow-[0_18px_48px_-30px_rgba(19,27,46,0.45)] transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_28px_66px_-30px_rgba(19,27,46,0.5)] motion-reduce:hover:translate-y-0"
                style={{
                  backgroundImage: `linear-gradient(135deg,#ffffff 68%,${service.tint} 100%)`,
                }}
              >
                <span
                  className="absolute inset-y-0 left-0 w-1.5"
                  style={{ backgroundColor: service.accent }}
                  aria-hidden
                />
                <CardFlourish
                  className="pointer-events-none absolute bottom-0 right-0 h-[150px] w-[260px] opacity-45 transition-opacity duration-300 group-hover:opacity-70"
                  style={{ color: service.accent }}
                />

                <div className="relative flex flex-1 flex-col p-6 pl-8 sm:p-8 sm:pl-10">
                  <span
                    className="display-figure pointer-events-none absolute right-5 top-4 text-[3.25rem] font-bold leading-none sm:right-7 sm:top-6 sm:text-[3.75rem]"
                    style={{ color: service.accent, opacity: 0.13 }}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="flex items-start gap-4 pr-14 sm:gap-5 sm:pr-20">
                    <span
                      className="flex size-14 shrink-0 items-center justify-center rounded-full sm:size-16"
                      style={{ backgroundColor: service.tint, color: service.accent }}
                      aria-hidden
                    >
                      <ServiceIcon id={service.icon} className="size-7 sm:size-8" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="display-head max-w-[26ch] text-balance text-lg font-bold leading-snug tracking-tight text-[#131b2e] sm:text-xl">
                        {service.title}
                      </h3>
                      <span
                        className="mt-3 block h-0.75 w-10 rounded-full"
                        style={{ backgroundColor: service.accent }}
                        aria-hidden
                      />
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-[#525c6b] sm:mt-6 sm:text-[15px]">
                    {service.body}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- water */

const PRESS_ACCENTS = [
  { line: "#4a5568", tint: "#eceef1" },
  { line: "#4a5568", tint: "#eceef1" },
  { line: "#4a5568", tint: "#eceef1" },
] as const;

const PRESS_ICONS = {
  handshake: (
    <>
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.9-3.9a3 3 0 0 0-4.2 0l-.9.9a1 1 0 1 1-3-3l2.8-2.8a5.8 5.8 0 0 1 7.1-.9l.5.3a2 2 0 0 0 1.4.2L21 4" />
      <path d="m21 3 1 11h-2" />
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
      <path d="M3 4h8" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8.2" r="3.8" />
      <path d="M4.8 20c0-3.6 3.2-5.6 7.2-5.6s7.2 2 7.2 5.6" />
    </>
  ),
  people: (
    <>
      <circle cx="9.6" cy="8.6" r="3.2" />
      <path d="M3.4 19.4c0-3.1 2.8-4.8 6.2-4.8s6.2 1.7 6.2 4.8" />
      <path d="M16.4 6.1a3.1 3.1 0 0 1 .6 6" />
      <path d="M18 14.9c1.7.5 2.8 1.7 2.8 3.4" />
    </>
  ),
  announcement: (
    <>
      <path d="M5.2 9.4h3l7-3.6v12.4l-7-3.6h-3a1.6 1.6 0 0 1-1.6-1.6v-2a1.6 1.6 0 0 1 1.6-1.6z" />
      <path d="M18.4 9.2a3.4 3.4 0 0 1 0 5.6" />
    </>
  ),
} as const;

type PressIconId = keyof typeof PRESS_ICONS;

function PressIcon({ id, className = "size-6" }: { id: PressIconId; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PRESS_ICONS[id]}
    </svg>
  );
}

function ArrowRight({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4.5 12h14" />
      <path d="m13 6.5 5.5 5.5L13 17.5" />
    </svg>
  );
}

/** Dark panel beside the list — the section's own statement of intent. */
function PressPromoCard() {
  return (
    <div
      className="relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-3xl p-7 sm:p-9"
      style={{ backgroundImage: "linear-gradient(160deg,#18181b 0%,#121215 45%,#09090b 100%)" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "13px 13px",
          maskImage: "radial-gradient(ellipse 75% 55% at 50% 30%, #000 10%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 55% at 50% 30%, #000 10%, transparent 78%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 45% at 50% 28%, rgba(255,255,255,0.06), transparent 70%)",
        }}
        aria-hidden
      />

      {/* Leaf mark in its rings */}
      <div className="relative flex flex-1 items-center justify-center py-6">
        <span
          className="flex size-32 items-center justify-center rounded-full border border-white/20 shadow-[0_0_0_18px_rgba(255,255,255,0.03)] sm:size-36"
          aria-hidden
        >
          <span
            className="flex size-24 items-center justify-center rounded-full border border-white/30 sm:size-28"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.12), rgba(255,255,255,0.02) 70%)",
              boxShadow: "0 0 36px -8px rgba(255,255,255,0.2)",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="size-11 text-white sm:size-12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20.5v-7.2" />
              <path d="M12 13.3C12 9 14.6 6.2 19.4 5.2c.5 4.8-1.9 8.1-7.4 8.1z" />
              <path d="M12 13.3C12 9 9.4 6.2 4.6 5.2c-.5 4.8 1.9 8.1 7.4 8.1z" />
            </svg>
          </span>
        </span>
      </div>

      <div className="relative">
        <p className="display-head text-[1.6rem] font-bold leading-[1.22] tracking-tight text-white sm:text-[1.85rem]">
          Driving Integrity.
          <br />
          Building Trust.
          <br />
          <span className="text-neutral-300">Creating Impact.</span>
        </p>
        <span className="mt-4 block h-1 w-12 rounded-full bg-neutral-400" aria-hidden />
        <p className="mt-4 max-w-[320px] text-sm leading-6 text-white/70">
          Stories of collaboration, innovation, and leadership in shaping a sustainable future.
        </p>
        <ScrollLink
          to="/news"
          className="group mt-7 inline-flex items-center gap-3 rounded-full border border-white/20 py-2 pl-6 pr-2 text-sm font-bold text-white transition duration-300 hover:border-white hover:bg-white/10"
        >
          View all news
          <span className="flex size-8 items-center justify-center rounded-full bg-white/15 text-white transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0">
            <ArrowRight className="size-4" />
          </span>
        </ScrollLink>
      </div>
    </div>
  );
}

export function PressReleasesSection() {
  return (
    <section
      className={`relative overflow-hidden ${SECTION}`}
      style={{ backgroundImage: "linear-gradient(180deg,#ffffff 0%,#f8fafb 40%,#f1f5f7 100%)" }}
    >
      <div className="mx-auto max-w-[1300px]">
        <ScrollReveal className="mx-auto max-w-[760px] text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-neutral-500 sm:text-xs">
            News &amp; Updates
          </p>
          <div className="mt-3 flex flex-col items-center gap-1" aria-hidden>
            <span className="h-px w-24 bg-[#131b2e]/10" />
            <svg viewBox="0 0 24 24" className="size-[17px] text-neutral-400" fill="none">
              <path
                d="M20.2 3.9c-9.2.2-13.7 4.6-13.2 13.3 9.2-.2 13.7-4.6 13.2-13.3z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h2 className="display-head mt-2 text-[clamp(1.9rem,5vw,3.2rem)] font-bold leading-[1.06] tracking-[-0.02em] text-[#131b2e]">
            Press Releases
          </h2>
          <p className="mx-auto mt-4 max-w-[620px] text-sm leading-7 text-[#4d5a63] xs:text-base">
            Stay updated with our latest announcements, partnerships, and milestones driving
            climate impact.
          </p>
        </ScrollReveal>

        <div className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-[minmax(0,0.56fr)_minmax(0,1fr)] lg:gap-x-8 lg:gap-y-6">
          <ScrollReveal className="lg:h-full">
            <PressPromoCard />
          </ScrollReveal>

          <ol className="flex flex-col gap-5">
              {PRESS_RELEASES.map((release, i) => {
                const accent = PRESS_ACCENTS[i % PRESS_ACCENTS.length];
                const [month, ...yearParts] = release.dateLabel.split(" ");
                const year = yearParts.join(" ");

                return (
                  <li key={release.id} className="list-none">
                    <ScrollReveal delayMs={i * 80}>
                      <article
                        className="group relative overflow-hidden rounded-2xl bg-white p-5 shadow-[0_16px_44px_-30px_rgba(19,27,46,0.5)] transition duration-300 hover:shadow-[0_24px_60px_-30px_rgba(19,27,46,0.55)] sm:p-6 sm:pl-8"
                      >
                        <span
                          className="absolute inset-y-0 left-0 w-1.5"
                          style={{ backgroundColor: accent.line }}
                          aria-hidden
                        />

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                          {/* Date rail and mark share a row on phones, split into columns at `sm` */}
                          <div className="flex items-center gap-4 sm:contents">
                            <div className="shrink-0 sm:w-[92px]">
                              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7a8791]">
                                {month}
                              </p>
                              <p
                                className="display-figure text-xl font-bold leading-tight"
                                style={{ color: accent.line }}
                              >
                                {year || release.dateLabel}
                              </p>
                              <span
                                className="mt-2 block h-0.75 w-7 rounded-full"
                                style={{ backgroundColor: accent.line }}
                                aria-hidden
                              />
                            </div>

                            <span
                              className="flex size-14 shrink-0 items-center justify-center rounded-full"
                              style={{ backgroundColor: accent.tint, color: accent.line }}
                              aria-hidden
                            >
                              <PressIcon id={release.icon ?? "announcement"} className="size-6" />
                            </span>
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3 className="display-head text-base font-bold leading-snug tracking-tight text-[#131b2e] sm:text-[17px]">
                              {release.title}
                            </h3>
                            <p className="mt-2 text-[13px] leading-6 text-[#5a6672]">
                              {release.summary}
                            </p>

                            <div className="mt-4 flex flex-wrap items-center gap-2.5">
                              <ScrollLink
                                to={`/news/${release.id}`}
                                className="inline-flex items-center gap-2 rounded-full border border-[#131b2e]/12 px-4 py-2 text-[13px] font-bold text-[#131b2e] transition duration-300 hover:border-[#131b2e]/30 hover:bg-[#131b2e]/4"
                              >
                                <svg
                                  viewBox="0 0 24 24"
                                  className="size-4"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.6"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  aria-hidden="true"
                                >
                                  <path d="M3.4 5.4h6a2.6 2.6 0 0 1 2.6 2.6v11a2 2 0 0 0-2-2h-6.6z" />
                                  <path d="M20.6 5.4h-6A2.6 2.6 0 0 0 12 8v11a2 2 0 0 1 2-2h6.6z" />
                                </svg>
                                Read article
                              </ScrollLink>

                              {release.pdfPath ? (
                                <a
                                  href={release.pdfPath}
                                  download
                                  className="inline-flex items-center gap-2 rounded-full border border-[#131b2e]/12 px-4 py-2 text-[13px] font-bold text-[#131b2e] transition duration-300 hover:border-[#131b2e]/30 hover:bg-[#131b2e]/4"
                                >
                                  <svg
                                    viewBox="0 0 24 24"
                                    className="size-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                  >
                                    <path d="M12 4v10" />
                                    <path d="m8.2 10.2 3.8 3.8 3.8-3.8" />
                                    <path d="M5 19h14" />
                                  </svg>
                                  Download PDF
                                </a>
                              ) : null}

                              {release.sourceUrl ? (
                                <a
                                  href={release.sourceUrl}
                                  target="_blank"
                                  rel="noreferrer noopener"
                                  className="inline-flex items-center gap-1.5 px-1 text-[13px] font-bold text-[#131b2e] transition hover:text-neutral-900"
                                >
                                  {release.sourceName ? `Source: ${release.sourceName}` : "View source"}
                                  <svg
                                    viewBox="0 0 24 24"
                                    className="size-3.5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                  >
                                    <path d="M14 4.5h5.5V10" />
                                    <path d="M19.5 4.5 11 13" />
                                    <path d="M18.4 14.6v3.9a1.6 1.6 0 0 1-1.6 1.6H5.5a1.6 1.6 0 0 1-1.6-1.6V7.2a1.6 1.6 0 0 1 1.6-1.6h3.9" />
                                  </svg>
                                </a>
                              ) : null}
                            </div>
                          </div>

                          <ScrollLink
                            to={`/news/${release.id}`}
                            aria-label={`Read: ${release.title}`}
                            className="hidden size-10 shrink-0 items-center justify-center self-center rounded-full border border-[#131b2e]/12 text-[#131b2e] transition duration-300 hover:-translate-y-0.5 lg:flex"
                            style={{ color: accent.line }}
                          >
                            <ArrowRight className="size-4" />
                          </ScrollLink>
                        </div>
                      </article>
                    </ScrollReveal>
                  </li>
                );
              })}
          </ol>

          <ScrollReveal className="flex justify-center lg:col-start-2">
              <ScrollLink
                to="/news"
                className="group inline-flex items-center gap-3 rounded-full py-2.5 pl-8 pr-3 text-[15px] font-bold text-white shadow-[0_18px_40px_-22px_rgba(0,0,0,0.6)] transition duration-300 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
                style={{ backgroundImage: "linear-gradient(120deg,#18181b,#27272a)" }}
              >
                View all press releases
                <span className="flex size-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0">
                  <ArrowRight className="size-4" />
                </span>
              </ScrollLink>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
