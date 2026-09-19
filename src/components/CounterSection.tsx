import { useEffect, useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { LegacyCERsBrochureModal } from "./LegacyCERsBrochureModal";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Target: 31 December 2026, 23:59:59 UTC
const TARGET_DATE_MS = Date.UTC(2026, 11, 31, 23, 59, 59);

const PANEL_BG = "linear-gradient(155deg,#18181b 0%,#111113 48%,#09090b 100%)";
const PANEL_GLOW =
  "radial-gradient(ellipse 72% 95% at 100% 0%, rgba(255,255,255,0.08), transparent 64%), radial-gradient(ellipse 55% 65% at 8% 50%, rgba(255,255,255,0.04), transparent 72%)";

function calculateTimeLeft(): TimeLeft {
  const diff = Math.max(0, TARGET_DATE_MS - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/** Bespoke Chronometer & Clockwork Dial with 60 precision second ticks, reverse rings, and radar sweep. */
function ChronometerDial({ className = "" }: { className?: string }) {
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const angle = (i * 6 * Math.PI) / 180;
    const isMajor = i % 5 === 0;
    const innerR = isMajor ? 164 : 172;
    const outerR = 180;
    const x1 = 200 + innerR * Math.sin(angle);
    const y1 = 200 - innerR * Math.cos(angle);
    const x2 = 200 + outerR * Math.sin(angle);
    const y2 = 200 - outerR * Math.cos(angle);
    return { x1, y1, x2, y2, isMajor, i };
  });

  return (
    <svg viewBox="0 0 400 400" className={className} fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="chronoCoreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Central breathing pulse */}
      <circle cx="200" cy="200" r="190" fill="url(#chronoCoreGlow)" className="chrono-pulse-ambient" />

      {/* Outer calibration ring with 60 ticks - rotating clockwise */}
      <g className="chrono-spin-cw">
        <circle cx="200" cy="200" r="185" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
        <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="1" strokeOpacity="0.12" />
        {ticks.map((t) => (
          <line
            key={t.i}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke="currentColor"
            strokeWidth={t.isMajor ? "1.8" : "1"}
            strokeOpacity={t.isMajor ? "0.65" : "0.22"}
          />
        ))}
      </g>

      {/* Inner calibrated scale ring - rotating counter-clockwise */}
      <g className="chrono-spin-ccw">
        <circle
          cx="200"
          cy="200"
          r="142"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="4 8"
          strokeOpacity="0.32"
        />
        <circle
          cx="200"
          cy="200"
          r="108"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="16 14"
          strokeOpacity="0.22"
        />
        {/* Cardinal time nodes */}
        <circle cx="200" cy="58" r="2.5" fill="currentColor" fillOpacity="0.75" />
        <circle cx="342" cy="200" r="2.5" fill="currentColor" fillOpacity="0.75" />
        <circle cx="200" cy="342" r="2.5" fill="currentColor" fillOpacity="0.75" />
        <circle cx="58" cy="200" r="2.5" fill="currentColor" fillOpacity="0.75" />
      </g>

      {/* Sweeping time scanner beam */}
      <g className="chrono-sweep">
        <path
          d="M200 200 L200 20 A180 180 0 0 1 327 73 Z"
          fill="currentColor"
          fillOpacity="0.04"
        />
        <line
          x1="200"
          y1="200"
          x2="200"
          y2="20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeOpacity="0.55"
          strokeLinecap="round"
        />
      </g>

      {/* Axis crosshairs and central seconds jewel */}
      <circle cx="200" cy="200" r="48" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
      <circle cx="200" cy="200" r="14" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.45" />
      <circle cx="200" cy="200" r="4" fill="currentColor" fillOpacity="0.9" className="chrono-tick-pulse" />
      <line x1="182" y1="200" x2="218" y2="200" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
      <line x1="200" y1="182" x2="200" y2="218" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
    </svg>
  );
}

/** Bespoke Time Continuum Waveform with concentric timeline arcs and target deadline reticle. */
function TimeWaveform({ className = "" }: { className?: string }) {
  const waves = Array.from({ length: 13 }, (_, i) => i);
  return (
    <svg viewBox="0 0 560 360" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="timeWaveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="65%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Expanding timeline cadence arcs */}
      {waves.map((i) => {
        const yBase = 175 + i * 13;
        const curve = 54 + i * 7;
        return (
          <path
            key={i}
            d={`M0 ${yBase} Q 280 ${yBase - curve} 560 ${yBase + i * 3}`}
            stroke="url(#timeWaveGrad)"
            strokeWidth={i === 0 || i === 6 ? "1.5" : "1"}
            strokeDasharray={i % 3 === 0 ? "4 6" : undefined}
            opacity={0.55 - i * 0.035}
          />
        );
      })}

      {/* Target deadline reticle for year 2026 */}
      <g transform="translate(420, 110)">
        <circle
          cx="0"
          cy="0"
          r="32"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.25"
          strokeDasharray="3 3"
          className="chrono-spin-cw"
        />
        <circle cx="0" cy="0" r="18" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" />
        <circle cx="0" cy="0" r="3" fill="currentColor" fillOpacity="0.85" className="chrono-tick-pulse" />
        <line x1="-24" y1="0" x2="24" y2="0" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
        <line x1="0" y1="-24" x2="0" y2="24" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
        <text
          x="36"
          y="4"
          fill="currentColor"
          fillOpacity="0.55"
          fontSize="9"
          fontFamily="'Space Mono', monospace"
          letterSpacing="0.12em"
        >
          TARGET: 2026.12.31
        </text>
      </g>
    </svg>
  );
}

/** Interactive Chronometer Crown Badge with live sweeping second hand. */
function ChronoBadge() {
  return (
    <span
      className="relative flex size-14 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 shadow-[0_0_34px_-6px_rgba(255,255,255,0.2)]"
      aria-hidden
    >
      {/* Outer rotating second calibration track */}
      <svg
        viewBox="0 0 44 44"
        className="absolute inset-0 size-full chrono-spin-cw text-white"
        fill="none"
      >
        <circle cx="22" cy="22" r="20" stroke="currentColor" strokeWidth="1" strokeOpacity="0.28" strokeDasharray="2 4" />
      </svg>

      {/* Chronograph clock face with live sweeping second hand */}
      <svg
        viewBox="0 0 32 32"
        className="size-7 sm:size-8 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="16" cy="16" r="13" strokeOpacity="0.75" />
        {/* Hour hand */}
        <line x1="16" y1="16" x2="16" y2="10" strokeWidth="2" strokeOpacity="0.9" />
        {/* Minute hand */}
        <line x1="16" y1="16" x2="21" y2="16" strokeWidth="1.5" strokeOpacity="0.8" />
        {/* Sweeping second hand moving continuously */}
        <g className="chrono-sweep-fast" style={{ transformOrigin: "16px 16px" }}>
          <line x1="16" y1="16" x2="16" y2="5" strokeWidth="1" stroke="white" strokeOpacity="0.95" />
          <circle cx="16" cy="5" r="1" fill="white" />
        </g>
        {/* Center pivot */}
        <circle cx="16" cy="16" r="1.5" fill="white" />
      </svg>
    </span>
  );
}

export interface CounterSectionProps {
  standalone?: boolean;
}

export function CounterSection({ standalone = false }: CounterSectionProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);
  const [brochureOpen, setBrochureOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <>
      <section className={standalone ? "w-full py-2 sm:py-4" : "px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12 bg-white"}>
        <ScrollReveal>
          <div
            className={`relative mx-auto max-w-[1216px] overflow-hidden rounded-3xl px-5 py-10 shadow-[0_36px_90px_-48px_rgba(0,0,0,0.8)] xs:px-8 sm:rounded-[32px] sm:px-12 sm:py-14 border border-white/10 ${
              standalone ? "border-white/15 shadow-[0_0_80px_-20px_rgba(255,255,255,0.08)]" : ""
            }`}
            style={{ backgroundImage: PANEL_BG }}
          >
            {/* Ambient background glow */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{ backgroundImage: PANEL_GLOW }}
              aria-hidden
            />

            {/* Custom Chronometer Dial on the left (ticking, reverse rotating, radar beam) */}
            <ChronometerDial className="pointer-events-none absolute -left-44 sm:-left-36 lg:-left-24 top-1/2 h-[440px] w-[440px] -translate-y-1/2 text-white opacity-25 lg:h-[540px] lg:w-[540px]" />

            {/* Custom Time Continuum Waveform on the right with deadline reticle */}
            <TimeWaveform className="pointer-events-none absolute -bottom-6 -right-16 h-[380px] w-[580px] text-white opacity-20 lg:h-[480px] lg:w-[680px]" />

            <div className="relative flex flex-col items-center text-center">
              {/* Crown chronometer badge with calibrated timeline rules */}
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
                <ChronoBadge />
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

              {/* Top Status Monospace Ribbon */}
              <div className="mt-5 flex w-full max-w-[820px] items-center justify-between font-['Space_Mono',monospace] text-[9px] sm:text-[10px] tracking-wider text-white/50 select-none">
                <div className="flex items-center gap-2 sm:gap-4">
                  <span className="inline-block size-1.5 rounded-full bg-white animate-pulse" />
                  <span>MRV · VERIFIED</span>
                  <span className="hidden xs:inline">· ARTICLE 6 · READINESS FRAMEWORK</span>
                </div>
                <div className="text-right flex items-center gap-1.5">
                  <span className="inline-block size-1.5 rounded-full bg-white/60" />
                  <span>CLIMATE FINANCE: ACTIVE</span>
                </div>
              </div>

              {/* Client Headline & Subtext */}
              <div className="mt-6 max-w-[860px] space-y-3">
                <h3 className="display-head text-2xl xs:text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-white tracking-tight leading-[1.18] uppercase">
                  Your CERs Have a Deadline. <br className="hidden sm:inline" />
                  Your Next Move Matters.
                </h3>
                <p className="text-sm sm:text-base text-white/70 font-normal max-w-xl mx-auto">
                  Know your options before the CDM Registry closes.
                </p>
              </div>

              {/* Center Counter Grid with Glass Time Capsules */}
              <div className="w-full max-w-[820px] my-7">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full">
                  {/* DAYS */}
                  <div className="group/unit relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-5 sm:px-6 sm:py-7 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]">
                    <span className="display-figure font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-none text-white tracking-tight">
                      {pad(timeLeft.days)}
                    </span>
                    <span className="font-semibold text-[9px] sm:text-[10px] tracking-[2.5px] uppercase text-white/45 mt-2 sm:mt-3 font-['Space_Mono',monospace]">
                      DAYS
                    </span>
                  </div>

                  {/* HOURS */}
                  <div className="group/unit relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-5 sm:px-6 sm:py-7 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]">
                    <span className="display-figure font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-none text-white tracking-tight">
                      {pad(timeLeft.hours)}
                    </span>
                    <span className="font-semibold text-[9px] sm:text-[10px] tracking-[2.5px] uppercase text-white/45 mt-2 sm:mt-3 font-['Space_Mono',monospace]">
                      HOURS
                    </span>
                  </div>

                  {/* MINUTES */}
                  <div className="group/unit relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-5 sm:px-6 sm:py-7 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]">
                    <span className="display-figure font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-none text-white tracking-tight">
                      {pad(timeLeft.minutes)}
                    </span>
                    <span className="font-semibold text-[9px] sm:text-[10px] tracking-[2.5px] uppercase text-white/45 mt-2 sm:mt-3 font-['Space_Mono',monospace]">
                      MINUTES
                    </span>
                  </div>

                  {/* SECONDS with Live Second Indicator */}
                  <div className="group/unit relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-5 sm:px-6 sm:py-7 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]">
                    {/* Pulsing live second beacon */}
                    <span className="absolute right-2.5 top-2.5 flex size-2 items-center justify-center sm:right-3.5 sm:top-3.5">
                      <span className="absolute size-full rounded-full bg-white/40 animate-ping" />
                      <span className="relative size-1.5 rounded-full bg-white" />
                    </span>
                    <span className="display-figure font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-none text-white tracking-tight">
                      {pad(timeLeft.seconds)}
                    </span>
                    <span className="font-semibold text-[9px] sm:text-[10px] tracking-[2.5px] uppercase text-white/45 mt-2 sm:mt-3 font-['Space_Mono',monospace]">
                      SECONDS
                    </span>
                  </div>
                </div>
              </div>

              {/* Target Date Note & Interactive CTA Button */}
              <div className="flex flex-col items-center gap-3.5 mt-2">
                <button
                  type="button"
                  onClick={() => setBrochureOpen(true)}
                  className="group relative inline-flex items-center gap-3 rounded-full px-8 py-3.5 text-sm sm:text-base font-bold text-neutral-900 shadow-[0_0_34px_-6px_rgba(255,255,255,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_46px_-6px_rgba(255,255,255,0.5)] active:translate-y-0 active:scale-[0.98] cursor-pointer"
                  style={{
                    backgroundImage: "linear-gradient(180deg, #ffffff 0%, #e4e4e7 100%)",
                    border: "1px solid rgba(255,255,255,0.85)",
                  }}
                >
                  <span>Find Out What’s Next</span>
                  <span
                    className="inline-flex size-6 items-center justify-center rounded-full bg-neutral-900/10 text-xs transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden
                  >
                    →
                  </span>
                </button>
                <span className="font-['Space_Mono',monospace] text-[10px] sm:text-[11px] text-white/45 tracking-wider">
                  Countdown to CDM Registry Closure: 31 December 2026
                </span>
              </div>

              {/* Bottom Footer Info */}
              <div className="w-full max-w-[820px] pt-7 mt-5 border-t border-white/10">
                <div className="flex w-full items-center justify-between font-['Space_Mono',monospace] text-[9px] sm:text-[10px] tracking-wider text-white/35 select-none">
                  <span>UNMAI CARBON · SINGAPORE</span>
                  <span>UNMAICARBON.EARTH</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Smooth Animated Brochure Infographic Modal */}
      <LegacyCERsBrochureModal
        open={brochureOpen}
        onClose={() => setBrochureOpen(false)}
      />
    </>
  );
}

export default CounterSection;
