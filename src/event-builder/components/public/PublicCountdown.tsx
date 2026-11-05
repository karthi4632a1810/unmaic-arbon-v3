import React, { useState, useEffect } from "react";
import { ArrowRight, Clock } from "lucide-react";
import type { CountdownContent, EventBranding } from "../../types/event";

interface PublicCountdownProps {
  content: CountdownContent;
  branding?: EventBranding;
  eventStartDate: string;
  onCtaClick?: () => void;
}

interface TimeLeft {
  totalHours: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

// Default Target: 31 December 2026, 23:59:59 UTC (CDM Registry Closure)
const DEFAULT_TARGET_MS = Date.UTC(2026, 11, 31, 23, 59, 59);

const PANEL_BG = "linear-gradient(155deg,#18181b 0%,#111113 48%,#09090b 100%)";
const PANEL_GLOW =
  "radial-gradient(ellipse 72% 95% at 100% 0%, rgba(255,255,255,0.08), transparent 64%), radial-gradient(ellipse 55% 65% at 8% 50%, rgba(255,255,255,0.04), transparent 72%)";

/** Helper to determine if a color is perceptually dark */
const isDarkColor = (color?: string, fallbackDark: boolean = true): boolean => {
  if (!color || color === "transparent") return fallbackDark;
  if (color.startsWith("#")) {
    let hex = color.replace("#", "");
    if (hex.length === 3) {
      hex = hex.split("").map((c) => c + c).join("");
    }
    const r = parseInt(hex.substring(0, 2), 16) || 0;
    const g = parseInt(hex.substring(2, 4), 16) || 0;
    const b = parseInt(hex.substring(4, 6), 16) || 0;
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
  }
  return fallbackDark;
};

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
        <radialGradient id="chronoCoreGlowModal" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Central breathing pulse */}
      <circle cx="200" cy="200" r="190" fill="url(#chronoCoreGlowModal)" className="chrono-pulse-ambient" />

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
        <circle cx="200" cy="58" r="2.5" fill="currentColor" fillOpacity="0.75" />
        <circle cx="342" cy="200" r="2.5" fill="currentColor" fillOpacity="0.75" />
        <circle cx="200" cy="342" r="2.5" fill="currentColor" fillOpacity="0.75" />
        <circle cx="58" cy="200" r="2.5" fill="currentColor" fillOpacity="0.75" />
      </g>

      {/* Sweeping time scanner beam */}
      <g className="chrono-sweep">
        <path d="M200 200 L200 20 A180 180 0 0 1 327 73 Z" fill="currentColor" fillOpacity="0.04" />
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
        <linearGradient id="timeWaveGradCountdown" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="65%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {waves.map((i) => {
        const yBase = 175 + i * 13;
        const curve = 54 + i * 7;
        return (
          <path
            key={i}
            d={`M0 ${yBase} Q 280 ${yBase - curve} 560 ${yBase + i * 3}`}
            stroke="url(#timeWaveGradCountdown)"
            strokeWidth={i === 0 || i === 6 ? "1.5" : "1"}
            strokeDasharray={i % 3 === 0 ? "4 6" : undefined}
            opacity={0.55 - i * 0.035}
          />
        );
      })}

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
      <svg viewBox="0 0 44 44" className="absolute inset-0 size-full chrono-spin-cw text-white" fill="none">
        <circle cx="22" cy="22" r="20" stroke="currentColor" strokeWidth="1" strokeOpacity="0.28" strokeDasharray="2 4" />
      </svg>
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
        <line x1="16" y1="16" x2="16" y2="10" strokeWidth="2" strokeOpacity="0.9" />
        <line x1="16" y1="16" x2="21" y2="16" strokeWidth="1.5" strokeOpacity="0.8" />
        <g className="chrono-sweep-fast" style={{ transformOrigin: "16px 16px" }}>
          <line x1="16" y1="16" x2="16" y2="5" strokeWidth="1" stroke="white" strokeOpacity="0.95" />
          <circle cx="16" cy="5" r="1" fill="white" />
        </g>
        <circle cx="16" cy="16" r="1.5" fill="white" />
      </svg>
    </span>
  );
}

export const PublicCountdown: React.FC<PublicCountdownProps> = ({
  content,
  branding,
  eventStartDate,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    totalHours: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  const [viewMode, setViewMode] = useState<"standard" | "total-hours">(
    content.defaultViewMode || "standard"
  );

  // Sync defaultViewMode if updated
  useEffect(() => {
    setViewMode(content.defaultViewMode === "total-hours" ? "total-hours" : "standard");
  }, [content.defaultViewMode]);

  useEffect(() => {
    const calculate = () => {
      let targetMs = DEFAULT_TARGET_MS;
      if (content.targetDate) {
        const parsed = new Date(content.targetDate).getTime();
        if (!isNaN(parsed)) targetMs = parsed;
      } else if (eventStartDate) {
        const parsed = new Date(eventStartDate).getTime();
        if (!isNaN(parsed)) targetMs = parsed;
      }

      const now = Date.now();
      const diff = Math.max(0, targetMs - now);

      if (diff <= 0) {
        setTimeLeft({
          totalHours: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
        return;
      }

      const totalHours = Math.floor(diff / (1000 * 60 * 60));
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ totalHours, days, hours, minutes, seconds, isExpired: false });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [content.targetDate, eventStartDate]);

  const pad = (n: number) => n.toString().padStart(2, "0");

  const layoutStyle = content.layoutStyle || "radar";
  const isMinimal = layoutStyle === "minimal";
  const isCompact = layoutStyle === "compact";
  const isSplit = layoutStyle === "split";
  const isRadar = layoutStyle === "radar";
  const isCards = layoutStyle === "cards";

  // Visibility flags (with clean defaults)
  const showTitle = content.showTitle !== false && Boolean(content.title);
  const showSubtitle = content.showSubtitle !== false && Boolean(content.subtitle);
  const showCta = content.showCta !== false && Boolean(content.ctaText);
  const showChronoBadge = content.showChronoBadge === true || (content.showChronoBadge !== false && isRadar);
  const showTopRibbon = content.showTopRibbon === true || (content.showTopRibbon !== false && isRadar);
  const showDecorativeGraphics = content.showDecorativeGraphics === true || (content.showDecorativeGraphics !== false && isRadar);
  const showModeToggle = content.showModeToggle === true || (content.showModeToggle !== false && isRadar);
  const showFootnote = content.showFootnote === true || (content.showFootnote !== false && isRadar);
  const showFooterStrip = content.showFooterStrip === true || (content.showFooterStrip !== false && isRadar);

  // Editable strings with intelligent fallbacks
  const topRibbonLeft = content.topRibbonLeft || "MRV · VERIFIED · ARTICLE 6 · READINESS FRAMEWORK";
  const topRibbonRight = content.topRibbonRight || "CLIMATE FINANCE: ACTIVE";
  const footnoteText = content.footnote || "Countdown to CDM Registry Closure: 31 December 2026";
  const footerStripLeft = content.footerStripLeft || "UNMAI CARBON · SINGAPORE";
  const footerStripRight = content.footerStripRight || "UNMAICARBON.EARTH";

  // Card theme styling
  const cardTheme = content.cardBackground || "dark";
  const isWhiteCard = cardTheme === "white";
  const isGlassCard = cardTheme === "glass";
  const isCustomCard = Boolean(content.customCardBgColor);
  const isCardDark = isCustomCard
    ? isDarkColor(content.customCardBgColor, true)
    : !isWhiteCard;

  const cardContainerClasses = isWhiteCard
    ? "bg-white text-zinc-900 border border-zinc-200/90 shadow-xl"
    : isGlassCard
    ? "bg-zinc-950/70 backdrop-blur-xl border border-white/10 text-white shadow-2xl"
    : "border border-white/10 text-white shadow-[0_36px_90px_-48px_rgba(0,0,0,0.8)]";

  const cardContainerStyle: React.CSSProperties = {
    ...(isWhiteCard
      ? { backgroundColor: "#ffffff" }
      : isCustomCard
      ? { backgroundColor: content.customCardBgColor }
      : isGlassCard
      ? undefined
      : { backgroundImage: PANEL_BG }),
  };

  const handleCta = (e: React.MouseEvent) => {
    const effectiveLink =
      content.ctaTargetType === "section" && content.ctaSectionTarget
        ? `#${content.ctaSectionTarget}`
        : content.ctaLink;

    // External link -> always open in new tab, never a popup
    if (effectiveLink && !effectiveLink.startsWith("#")) {
      e.preventDefault();
      window.open(effectiveLink, "_blank", "noopener,noreferrer");
      return;
    }

    if (effectiveLink?.startsWith("#")) {
      e.preventDefault();
      const targetId = effectiveLink.substring(1);
      const el =
        document.getElementById(targetId) ||
        document.querySelector(`[data-section-id="${targetId}"]`) ||
        document.getElementById(`sec_${targetId}`) ||
        document.querySelector(`[id*="${targetId}"]`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      e.preventDefault();
    }
  };

  return (
    <>
      <section
        id="countdown"
        data-section="countdown"
        data-custom-bg={Boolean(content.backgroundColor) ? "true" : undefined}
        className="w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 transition-colors"
        style={{ backgroundColor: content.backgroundColor || undefined }}
      >
        <div
          className={`relative mx-auto max-w-[1216px] overflow-hidden rounded-3xl transition-all duration-300 ${cardContainerClasses} ${
            isCompact ? "p-6 sm:p-8 rounded-2xl" : "px-5 py-8 xs:px-8 sm:rounded-[32px] sm:px-12 sm:py-12"
          }`}
          style={cardContainerStyle}
        >
          {/* Ambient background glow (only on dark/radar) */}
          {!isWhiteCard && !isMinimal && (
            <div
              className="pointer-events-none absolute inset-0"
              style={{ backgroundImage: PANEL_GLOW }}
              aria-hidden
            />
          )}

          {/* Decorative Chronometer Dial & Waveform (if enabled) */}
          {showDecorativeGraphics && (
            <>
              <ChronometerDial className="pointer-events-none absolute -left-44 sm:-left-36 lg:-left-24 top-1/2 h-[440px] w-[440px] -translate-y-1/2 text-white opacity-25 lg:h-[540px] lg:w-[540px]" />
              <TimeWaveform className="pointer-events-none absolute -bottom-6 -right-16 h-[380px] w-[580px] text-white opacity-20 lg:h-[480px] lg:w-[680px]" />
            </>
          )}

          <div className="relative flex flex-col items-center text-center">
            {/* Crown Chronometer Badge (Toggleable) */}
            {showChronoBadge && (
              <div className="flex w-full max-w-[880px] items-center justify-center gap-4 mb-2">
                <span className="hidden flex-1 items-center gap-2 sm:flex">
                  <span className={`size-1.5 rounded-full ${isCardDark ? "bg-white/40" : "bg-zinc-400"}`} />
                  <span
                    className="h-px flex-1"
                    style={{
                      backgroundImage: isCardDark
                        ? "linear-gradient(90deg,rgba(255,255,255,0.05),rgba(255,255,255,0.4))"
                        : "linear-gradient(90deg,rgba(0,0,0,0.05),rgba(0,0,0,0.3))",
                    }}
                  />
                </span>
                <ChronoBadge />
                <span className="hidden flex-1 items-center gap-2 sm:flex">
                  <span
                    className="h-px flex-1"
                    style={{
                      backgroundImage: isCardDark
                        ? "linear-gradient(90deg,rgba(255,255,255,0.4),rgba(255,255,255,0.05))"
                        : "linear-gradient(90deg,rgba(0,0,0,0.3),rgba(0,0,0,0.05))",
                    }}
                  />
                  <span className={`size-1.5 rounded-full ${isCardDark ? "bg-white/40" : "bg-zinc-400"}`} />
                </span>
              </div>
            )}

            {/* Top Status Monospace Ribbon (Toggleable & Editable) */}
            {showTopRibbon && (
              <div
                className={`mt-3 flex w-full max-w-[820px] items-center justify-between font-mono text-[9px] sm:text-[10px] tracking-wider select-none ${
                  isCardDark ? "text-white/50" : "text-zinc-500"
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-4">
                  <span className={`inline-block size-1.5 rounded-full ${isCardDark ? "bg-white animate-pulse" : "bg-black animate-pulse"}`} />
                  <span>{topRibbonLeft}</span>
                </div>
                <div className="text-right flex items-center gap-1.5">
                  <span className={`inline-block size-1.5 rounded-full ${isCardDark ? "bg-white/60" : "bg-black/60"}`} />
                  <span>{topRibbonRight}</span>
                </div>
              </div>
            )}

            {/* Headline & Subtitle (Toggleable & Editable) */}
            {(showTitle || showSubtitle) && (
              <div className={`mt-5 max-w-[860px] space-y-2.5 ${isSplit ? "text-left w-full" : "text-center"}`}>
                {showTitle && (
                  <h2
                    className={`display-head font-extrabold tracking-tight leading-[1.18] uppercase ${
                      isCompact
                        ? "text-xl sm:text-2xl"
                        : "text-2xl xs:text-3xl sm:text-4xl lg:text-[2.65rem]"
                    } ${isCardDark ? "text-white" : "text-zinc-900"}`}
                    style={{ fontFamily: branding?.font || "inherit" }}
                  >
                    {content.title}
                  </h2>
                )}
                {showSubtitle && (
                  <p
                    className={`text-sm sm:text-base leading-relaxed ${
                      isSplit ? "max-w-xl" : "max-w-2xl mx-auto"
                    } ${isCardDark ? "text-white/70" : "text-zinc-600"}`}
                  >
                    {content.subtitle}
                  </p>
                )}
              </div>
            )}

            {/* View Mode Toggle (Standard vs Total Hour Counter) */}
            {showModeToggle && !isCompact && (
              <div
                className={`mt-4 flex items-center justify-center gap-1 p-1 rounded-full border ${
                  isCardDark
                    ? "border-white/10 bg-white/[0.04]"
                    : "border-zinc-200 bg-zinc-100"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setViewMode("standard")}
                  className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full transition cursor-pointer ${
                    viewMode === "standard"
                      ? isCardDark
                        ? "bg-white text-black shadow-sm"
                        : "bg-black text-white shadow-sm"
                      : isCardDark
                      ? "text-white/60 hover:text-white"
                      : "text-zinc-600 hover:text-black"
                  }`}
                >
                  Days · Hours · Sec
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("total-hours")}
                  className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full transition flex items-center gap-1.5 cursor-pointer ${
                    viewMode === "total-hours"
                      ? isCardDark
                        ? "bg-white text-black shadow-sm"
                        : "bg-black text-white shadow-sm"
                      : isCardDark
                      ? "text-white/60 hover:text-white"
                      : "text-zinc-600 hover:text-black"
                  }`}
                >
                  <Clock className="size-3" />
                  <span>Hour Counter ({timeLeft.totalHours.toLocaleString()}h)</span>
                </button>
              </div>
            )}

            {/* Center Counter Grid */}
            {timeLeft.isExpired ? (
              <div
                className={`my-7 p-6 rounded-2xl border font-bold font-mono text-base sm:text-lg ${
                  isCardDark
                    ? "bg-white/[0.04] border-white/20 text-white"
                    : "bg-zinc-100 border-zinc-300 text-zinc-900"
                }`}
              >
                {content.expiredMessage || "The transition window has concluded."}
              </div>
            ) : viewMode === "total-hours" ? (
              /* Dedicated Total Hour Counter View */
              <div className="w-full max-w-[680px] my-6">
                <div
                  className={`group/unit relative flex flex-col items-center justify-center rounded-2xl border px-6 py-8 sm:py-10 transition-all duration-300 ${
                    isCardDark
                      ? "border-white/20 bg-white/[0.04] hover:border-white/30 hover:bg-white/[0.08]"
                      : "border-zinc-200 bg-zinc-50 hover:border-zinc-300 hover:bg-zinc-100/70"
                  }`}
                >
                  <span
                    className={`font-semibold text-[10px] sm:text-xs tracking-[3px] uppercase mb-3 font-mono ${
                      isCardDark ? "text-white/50" : "text-zinc-500"
                    }`}
                  >
                    PRECISION REMAINING HOUR COUNTER
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`display-figure font-bold text-5xl sm:text-7xl md:text-8xl leading-none tracking-tight font-mono ${
                        isCardDark ? "text-white" : "text-zinc-900"
                      }`}
                    >
                      {timeLeft.totalHours.toLocaleString()}
                    </span>
                    <span
                      className={`text-xl sm:text-3xl font-bold font-mono ${
                        isCardDark ? "text-white/50" : "text-zinc-400"
                      }`}
                    >
                      HOURS
                    </span>
                  </div>
                  <div
                    className={`mt-4 flex items-center gap-4 text-xs font-mono ${
                      isCardDark ? "text-white/60" : "text-zinc-600"
                    }`}
                  >
                    <span>{pad(timeLeft.minutes)} MIN</span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <span className={`size-1.5 rounded-full ${isCardDark ? "bg-white" : "bg-black"} animate-pulse`} />
                      <span>{pad(timeLeft.seconds)} SEC</span>
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              /* Time Capsules (Minimal / Standard / Cards / Compact) */
              <div
                className={`w-full ${
                  isCompact
                    ? "max-w-[560px] my-4"
                    : isMinimal
                    ? "max-w-[760px] my-6"
                    : "max-w-[820px] my-6"
                }`}
              >
                <div
                  className={`grid gap-3 sm:gap-4 w-full ${
                    isCompact ? "grid-cols-4" : "grid-cols-2 sm:grid-cols-4"
                  }`}
                >
                  {/* DAYS */}
                  {content.showDays !== false && (
                    <div
                      className={`group/unit relative flex flex-col items-center justify-center rounded-2xl border transition-all duration-300 ${
                        isCompact
                          ? "px-2 py-3 sm:px-4 sm:py-4 rounded-xl"
                          : "px-3 py-5 sm:px-6 sm:py-7"
                      } ${
                        isCards
                          ? isCardDark
                            ? "bg-zinc-900/90 border-zinc-700/80 shadow-lg hover:border-zinc-500"
                            : "bg-zinc-50 border-zinc-200/90 shadow-sm hover:border-zinc-400"
                          : isCardDark
                          ? "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                          : "border-zinc-200 bg-zinc-50/80 hover:border-zinc-300 hover:bg-zinc-100"
                      }`}
                    >
                      <span
                        className={`display-figure font-bold leading-none tracking-tight font-mono ${
                          isCompact
                            ? "text-2xl sm:text-3xl"
                            : "text-4xl sm:text-5xl md:text-6xl lg:text-[68px]"
                        } ${isCardDark ? "text-white" : "text-zinc-900"}`}
                      >
                        {pad(timeLeft.days)}
                      </span>
                      <span
                        className={`font-semibold tracking-[2.5px] uppercase mt-2 font-mono ${
                          isCompact ? "text-[8px]" : "text-[9px] sm:text-[10px]"
                        } ${isCardDark ? "text-white/45" : "text-zinc-500"}`}
                      >
                        DAYS
                      </span>
                    </div>
                  )}

                  {/* HOURS */}
                  {content.showHours !== false && (
                    <div
                      className={`group/unit relative flex flex-col items-center justify-center rounded-2xl border transition-all duration-300 ${
                        isCompact
                          ? "px-2 py-3 sm:px-4 sm:py-4 rounded-xl"
                          : "px-3 py-5 sm:px-6 sm:py-7"
                      } ${
                        isCards
                          ? isCardDark
                            ? "bg-zinc-900/90 border-zinc-700/80 shadow-lg hover:border-zinc-500"
                            : "bg-zinc-50 border-zinc-200/90 shadow-sm hover:border-zinc-400"
                          : isCardDark
                          ? "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                          : "border-zinc-200 bg-zinc-50/80 hover:border-zinc-300 hover:bg-zinc-100"
                      }`}
                    >
                      <span
                        className={`display-figure font-bold leading-none tracking-tight font-mono ${
                          isCompact
                            ? "text-2xl sm:text-3xl"
                            : "text-4xl sm:text-5xl md:text-6xl lg:text-[68px]"
                        } ${isCardDark ? "text-white" : "text-zinc-900"}`}
                      >
                        {pad(timeLeft.hours)}
                      </span>
                      <span
                        className={`font-semibold tracking-[2.5px] uppercase mt-2 font-mono ${
                          isCompact ? "text-[8px]" : "text-[9px] sm:text-[10px]"
                        } ${isCardDark ? "text-white/45" : "text-zinc-500"}`}
                      >
                        HOURS
                      </span>
                    </div>
                  )}

                  {/* MINUTES */}
                  {content.showMinutes !== false && (
                    <div
                      className={`group/unit relative flex flex-col items-center justify-center rounded-2xl border transition-all duration-300 ${
                        isCompact
                          ? "px-2 py-3 sm:px-4 sm:py-4 rounded-xl"
                          : "px-3 py-5 sm:px-6 sm:py-7"
                      } ${
                        isCards
                          ? isCardDark
                            ? "bg-zinc-900/90 border-zinc-700/80 shadow-lg hover:border-zinc-500"
                            : "bg-zinc-50 border-zinc-200/90 shadow-sm hover:border-zinc-400"
                          : isCardDark
                          ? "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                          : "border-zinc-200 bg-zinc-50/80 hover:border-zinc-300 hover:bg-zinc-100"
                      }`}
                    >
                      <span
                        className={`display-figure font-bold leading-none tracking-tight font-mono ${
                          isCompact
                            ? "text-2xl sm:text-3xl"
                            : "text-4xl sm:text-5xl md:text-6xl lg:text-[68px]"
                        } ${isCardDark ? "text-white" : "text-zinc-900"}`}
                      >
                        {pad(timeLeft.minutes)}
                      </span>
                      <span
                        className={`font-semibold tracking-[2.5px] uppercase mt-2 font-mono ${
                          isCompact ? "text-[8px]" : "text-[9px] sm:text-[10px]"
                        } ${isCardDark ? "text-white/45" : "text-zinc-500"}`}
                      >
                        MINUTES
                      </span>
                    </div>
                  )}

                  {/* SECONDS */}
                  {content.showSeconds !== false && (
                    <div
                      className={`group/unit relative flex flex-col items-center justify-center rounded-2xl border transition-all duration-300 ${
                        isCompact
                          ? "px-2 py-3 sm:px-4 sm:py-4 rounded-xl"
                          : "px-3 py-5 sm:px-6 sm:py-7"
                      } ${
                        isCards
                          ? isCardDark
                            ? "bg-zinc-900/90 border-zinc-700/80 shadow-lg hover:border-zinc-500"
                            : "bg-zinc-50 border-zinc-200/90 shadow-sm hover:border-zinc-400"
                          : isCardDark
                          ? "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                          : "border-zinc-200 bg-zinc-50/80 hover:border-zinc-300 hover:bg-zinc-100"
                      }`}
                    >
                      {/* Pulsing live second beacon */}
                      <span className="absolute right-2.5 top-2.5 flex size-2 items-center justify-center sm:right-3.5 sm:top-3.5">
                        <span className={`absolute size-full rounded-full ${isCardDark ? "bg-white/40" : "bg-black/40"} animate-ping`} />
                        <span className={`relative size-1.5 rounded-full ${isCardDark ? "bg-white" : "bg-black"}`} />
                      </span>
                      <span
                        className={`display-figure font-bold leading-none tracking-tight font-mono ${
                          isCompact
                            ? "text-2xl sm:text-3xl"
                            : "text-4xl sm:text-5xl md:text-6xl lg:text-[68px]"
                        } ${isCardDark ? "text-white" : "text-zinc-900"}`}
                      >
                        {pad(timeLeft.seconds)}
                      </span>
                      <span
                        className={`font-semibold tracking-[2.5px] uppercase mt-2 font-mono ${
                          isCompact ? "text-[8px]" : "text-[9px] sm:text-[10px]"
                        } ${isCardDark ? "text-white/45" : "text-zinc-500"}`}
                      >
                        SECONDS
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Target Date Note & CTA Button (Toggleable & Customizable) */}
            {(showCta || showFootnote) && (
              <div className="flex flex-col items-center gap-3 mt-2">
                {showCta && (
                  <a
                    href={
                      content.ctaTargetType === "section" && content.ctaSectionTarget
                        ? `#${content.ctaSectionTarget}`
                        : content.ctaLink || "#about"
                    }
                    onClick={handleCta}
                    className={`group relative inline-flex items-center gap-3 rounded-full px-8 py-3.5 text-sm sm:text-base font-bold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer shadow-lg ${
                      isWhiteCard
                        ? "bg-black text-white hover:bg-zinc-800"
                        : "text-neutral-900 shadow-[0_0_34px_-6px_rgba(255,255,255,0.3)] hover:shadow-[0_0_46px_-6px_rgba(255,255,255,0.5)]"
                    }`}
                    style={
                      isWhiteCard
                        ? undefined
                        : {
                            backgroundImage: "linear-gradient(180deg, #ffffff 0%, #e4e4e7 100%)",
                            border: "1px solid rgba(255,255,255,0.85)",
                          }
                    }
                  >
                    <span>{content.ctaText || "Find Out What’s Next"}</span>
                    <span
                      className={`inline-flex size-6 items-center justify-center rounded-full text-xs transition-transform duration-200 group-hover:translate-x-1 ${
                        isWhiteCard ? "bg-white/20 text-white" : "bg-neutral-900/10 text-neutral-900"
                      }`}
                      aria-hidden
                    >
                      <ArrowRight className="size-3.5" />
                    </span>
                  </a>
                )}

                {showFootnote && (
                  <span
                    className={`font-mono text-[10px] sm:text-[11px] tracking-wider ${
                      isCardDark ? "text-white/45" : "text-zinc-500"
                    }`}
                  >
                    {footnoteText}
                  </span>
                )}
              </div>
            )}

            {/* Bottom Footer Info Strip (Toggleable & Editable) */}
            {showFooterStrip && (
              <div
                className={`w-full max-w-[820px] pt-6 mt-5 border-t ${
                  isCardDark ? "border-white/10 text-white/35" : "border-zinc-200 text-zinc-400"
                }`}
              >
                <div className="flex w-full items-center justify-between font-mono text-[9px] sm:text-[10px] tracking-wider select-none">
                  <span>{footerStripLeft}</span>
                  <span>{footerStripRight}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

    </>
  );
};
