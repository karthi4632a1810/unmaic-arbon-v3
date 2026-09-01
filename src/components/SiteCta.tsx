import { DotSphere } from "./ElementMotifs";
import { ScrollLink } from "./ScrollLink";
import { ScrollReveal } from "./ScrollReveal";
import { COMPANY_BROCHURE_URL } from "../data/siteReference";

/** Space (Aagayam) — the element that holds the other four. */

const PANEL_BG = "linear-gradient(155deg,#18181b 0%,#111113 48%,#09090b 100%)";
const PANEL_GLOW =
  "radial-gradient(ellipse 72% 95% at 100% 0%, rgba(255,255,255,0.08), transparent 64%), radial-gradient(ellipse 55% 65% at 8% 50%, rgba(255,255,255,0.04), transparent 72%)";

const ACCENT = "#e4e4e7";

const FEATURES = [
  {
    id: "integrity",
    title: "Integrity First",
    body: "High standards, transparent governance, measurable impact.",
  },
  {
    id: "expertise",
    title: "Global Expertise",
    body: "Deep regional knowledge, global perspective.",
  },
  {
    id: "impact",
    title: "Scalable Impact",
    body: "Solutions that enable markets, mobilize finance, and drive change.",
  },
] as const;

/** Current sweeping out of the lower-right corner. */
function FlowLines({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 400" className={className} fill="none" aria-hidden="true">
      {Array.from({ length: 16 }, (_, i) => (
        <path
          key={i}
          d={`M600 ${20 + i * 10} C ${450 - i * 7} ${118 + i * 9}, ${360 - i * 5} ${250 + i * 5}, ${210 - i * 9} 400`}
          stroke="currentColor"
          strokeWidth="1"
          opacity={0.3 - i * 0.015}
        />
      ))}
    </svg>
  );
}

function LeafBadge() {
  return (
    <span
      className="flex size-14 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 shadow-[0_0_34px_-6px_rgba(255,255,255,0.15)]"
      aria-hidden
    >
      <svg
        viewBox="0 0 24 24"
        className="size-7 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20.5v-7.2" />
        <path d="M12 13.3C12 9 14.6 6.2 19.4 5.2c.5 4.8-1.9 8.1-7.4 8.1z" />
        <path d="M12 13.3C12 9 9.4 6.2 4.6 5.2c-.5 4.8 1.9 8.1 7.4 8.1z" />
      </svg>
    </span>
  );
}

function HandshakeIcon({ className = "size-5" }: { className?: string }) {
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
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.9-3.9a3 3 0 0 0-4.2 0l-.9.9a1 1 0 1 1-3-3l2.8-2.8a5.8 5.8 0 0 1 7.1-.9l.5.3a2 2 0 0 0 1.4.2L21 4" />
      <path d="m21 3 1 11h-2" />
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
      <path d="M3 4h8" />
    </svg>
  );
}

const FEATURE_ICONS = {
  integrity: (
    <>
      <path d="M12 3.2 19 5.9v5.2c0 4.1-2.8 7.2-7 8.4-4.2-1.2-7-4.3-7-8.4V5.9l7-2.7z" />
      <path d="m8.7 11.9 2.3 2.3 4.3-4.5" />
    </>
  ),
  expertise: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <ellipse cx="12" cy="12" rx="3.4" ry="8.4" />
      <path d="M3.9 9.2h16.2M3.9 14.8h16.2" />
    </>
  ),
  impact: (
    <>
      <path d="M4.4 19.6h15.2" />
      <path d="M7.6 19.6v-4.4M11.4 19.6v-7M15.2 19.6v-3.2M19 19.6v-9.2" />
      <path d="m5 11.4 4.2-4 3 2.6 3.6-3.8" />
      <path d="M16.2 5.6h3.4v3.2" />
    </>
  ),
} as const;

type FeatureId = keyof typeof FEATURE_ICONS;

function FeatureIcon({ id, className = "size-5" }: { id: FeatureId; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {FEATURE_ICONS[id]}
    </svg>
  );
}

export function SiteCta() {
  return (
    <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <ScrollReveal>
        <div
          className="relative mx-auto max-w-[1216px] overflow-hidden rounded-3xl px-5 py-10 shadow-[0_36px_90px_-48px_rgba(0,0,0,0.8)] xs:px-8 sm:rounded-[32px] sm:px-12 sm:py-14"
          style={{ backgroundImage: PANEL_BG }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: PANEL_GLOW }}
            aria-hidden
          />
          <DotSphere className="pointer-events-none absolute -left-56 top-1/2 h-[460px] w-[460px] -translate-y-1/2 text-white opacity-20 sm:-left-52 lg:-left-56 lg:h-[560px] lg:w-[560px]" />
          <FlowLines className="pointer-events-none absolute -bottom-6 -right-20 h-[420px] w-[620px] text-white opacity-15 lg:h-[520px] lg:w-[720px]" />

          <div className="relative flex flex-col items-center text-center">
            {/* Leaf badge riding a rule, as the crown of the panel */}
            <div className="flex w-full max-w-[880px] items-center justify-center gap-4">
              <span className="hidden flex-1 items-center gap-2 sm:flex">
                <span className="size-1.5 rounded-full bg-white/40" />
                <span
                  className="h-px flex-1"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg,rgba(255,255,255,0.05),rgba(255,255,255,0.4))",
                  }}
                />
              </span>
              <LeafBadge />
              <span className="hidden flex-1 items-center gap-2 sm:flex">
                <span
                  className="h-px flex-1"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg,rgba(255,255,255,0.4),rgba(255,255,255,0.05))",
                  }}
                />
                <span className="size-1.5 rounded-full bg-white/40" />
              </span>
            </div>

            <h2 className="display-head mt-7 max-w-[900px] text-[1.65rem] font-bold leading-[1.16] tracking-tight text-white xs:text-3xl sm:text-4xl lg:text-[2.9rem]">
              Partner to Achieve <br className="hidden sm:inline" />
              <span style={{ color: ACCENT }}>High-Integrity</span> Carbon Markets{" "}
              <br className="hidden sm:inline" />
              and Scale Climate Ambition.
            </h2>

            <p className="mt-5 max-w-[720px] text-sm leading-6 text-white/70 xs:text-base xs:leading-7">
              Bridging climate policy, carbon finance, and digital innovation through
              institutional-grade advisory and interoperable carbon infrastructure.
            </p>

            <div className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
              <ScrollLink
                to="/contact"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-xl px-9 py-4.5 text-base font-bold text-neutral-900 shadow-[0_0_38px_-8px_rgba(255,255,255,0.35)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_46px_-6px_rgba(255,255,255,0.5)] motion-reduce:hover:translate-y-0 sm:w-auto"
                style={{
                  backgroundImage: "linear-gradient(180deg,#ffffff 0%,#e4e4e7 100%)",
                  border: "1px solid rgba(255,255,255,0.8)",
                }}
              >
                <HandshakeIcon className="size-5" />
                Partner With Us
                <span
                  className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
                  aria-hidden
                >
                  →
                </span>
              </ScrollLink>

              <a
                href={COMPANY_BROCHURE_URL}
                download
                className="inline-flex w-full items-center justify-center gap-3 rounded-xl border border-white/25 px-9 py-4.5 text-base font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/10 motion-reduce:hover:translate-y-0 sm:w-auto"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3.5v11" />
                  <path d="m7.8 10.4 4.2 4.2 4.2-4.2" />
                  <path d="M4.6 19.5h14.8" />
                </svg>
                Download Brochure
              </a>
            </div>

            {/* Three proof points, divided as in the reference */}
            <ul className="mt-10 grid w-full max-w-[1000px] gap-6 text-left sm:mt-12 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-white/12">
              {FEATURES.map((feature) => (
                <li key={feature.id} className="flex items-start gap-3.5 sm:px-5 lg:px-7">
                  <span
                    className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white"
                    aria-hidden
                  >
                    <FeatureIcon id={feature.id} className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[15px] font-bold leading-6 text-white">{feature.title}</p>
                    <p className="mt-1 text-[13px] leading-5 text-white/60">{feature.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
