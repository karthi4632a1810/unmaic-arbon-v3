import React from "react";
import * as Icons from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import type { HighlightsContent, EventBranding } from "../../types/event";

interface PublicHighlightsProps {
  content: HighlightsContent;
  branding?: EventBranding;
}

export const PublicHighlights: React.FC<PublicHighlightsProps> = ({
  content,
}) => {
  const columns = Number(content.columns) || 3;
  const layoutStyle = content.layoutStyle || "cards";
  const iconStyle = content.iconStyle || "rounded";
  const isLight = content.cardBackground === "white" || content.backgroundColor === "#ffffff";
  const isLeft = content.contentAlignment === "left";
  const showNumbers = content.showCardNumbers || layoutStyle === "numbered";

  // Calculate responsive column classes:
  // Mobile (<640px): 1 col (or 2 if explicitly set in mobileColumns)
  // Tablet (640px - 1024px): 2 cols for 2,3,4-col layouts, 1 for 1-col layout (or custom tabletColumns)
  // Desktop (>=1024px): chosen columns (1, 2, 3, or 4)
  const getColClass = () => {
    const mob = content.mobileColumns === 2 ? "grid-cols-2" : "grid-cols-1";
    let tab = "sm:grid-cols-2";
    if (content.tabletColumns === 1) tab = "sm:grid-cols-1";
    else if (content.tabletColumns === 3) tab = "sm:grid-cols-3";
    else if (columns === 1) tab = "sm:grid-cols-1";

    let desk = "lg:grid-cols-3";
    if (columns === 1) desk = "lg:grid-cols-1 max-w-3xl mx-auto";
    else if (columns === 2) desk = "lg:grid-cols-2";
    else if (columns === 4) desk = "lg:grid-cols-4";

    return `${mob} ${tab} ${desk}`;
  };

  // Card style classes
  const getCardStyleClass = () => {
    if (isLight) {
      if (layoutStyle === "glass") {
        return "bg-white/80 backdrop-blur-md border-zinc-200/80 hover:border-zinc-300 shadow-md";
      }
      if (layoutStyle === "bordered") {
        return "bg-white border-2 border-zinc-300 hover:border-black shadow-sm";
      }
      if (layoutStyle === "minimal") {
        return "bg-transparent border border-zinc-200 hover:bg-zinc-50";
      }
      return "bg-white border border-zinc-200 hover:border-zinc-400 hover:shadow-md";
    }

    // Dark styles
    switch (layoutStyle) {
      case "glass":
        return "bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-white/30 hover:bg-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]";
      case "bordered":
        return "bg-black/80 border border-white/20 hover:border-white/40 hover:shadow-[0_0_25px_rgba(255,255,255,0.06)]";
      case "minimal":
        return "bg-transparent border border-white/5 hover:border-white/20 hover:bg-white/[0.02]";
      case "bento":
        return "bg-gradient-to-b from-white/[0.06] to-white/[0.01] border border-white/10 hover:border-white/30 shadow-lg";
      case "numbered":
        return "bg-white/[0.03] border border-white/10 hover:border-white/30 hover:bg-white/[0.06] shadow-lg relative";
      case "cards":
      default:
        return "bg-white/[0.03] border border-white/10 hover:border-white/30 hover:bg-white/[0.06] shadow-lg";
    }
  };

  // Icon container style classes
  const getIconContainerClass = () => {
    if (isLight) {
      switch (iconStyle) {
        case "circle":
          return "w-11 h-11 rounded-full border border-zinc-200 bg-zinc-100 text-zinc-900";
        case "badge":
          return "w-9 h-9 rounded-lg border border-zinc-200 bg-zinc-100 text-zinc-900";
        case "glow":
          return "w-11 h-11 rounded-xl border border-zinc-300 bg-zinc-100 text-zinc-900 shadow-sm";
        case "minimal":
          return "w-7 h-7 text-zinc-900";
        case "rounded":
        default:
          return "w-11 h-11 rounded-xl border border-zinc-200 bg-zinc-100 text-zinc-900";
      }
    }

    switch (iconStyle) {
      case "circle":
        return "w-11 h-11 rounded-full border border-white/10 bg-white/[0.06] text-white";
      case "badge":
        return "w-9 h-9 rounded-lg border border-white/10 bg-white/[0.08] text-white";
      case "glow":
        return "w-11 h-11 rounded-xl border border-white/20 bg-white/[0.1] text-white shadow-[0_0_15px_rgba(255,255,255,0.15)]";
      case "minimal":
        return "w-7 h-7 text-white";
      case "rounded":
      default:
        return "w-11 h-11 rounded-xl border border-white/10 bg-white/[0.06] text-white";
    }
  };

  const sectionBgClass = isLight ? "bg-zinc-50 text-zinc-900" : "bg-black text-white";
  const sectionBorderClass = isLight ? "border-t border-zinc-200" : "border-t border-zinc-900";

  return (
    <section
      className={`py-16 sm:py-20 lg:py-24 relative overflow-hidden transition-colors duration-300 ${sectionBgClass} ${sectionBorderClass}`}
      style={content.backgroundColor ? { backgroundColor: content.backgroundColor } : undefined}
    >
      {/* Subtle tech background grid for dark theme */}
      {!isLight && (
        <div
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden
        />
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        {/* Section Header */}
        <div className={`mb-12 sm:mb-16 ${isLeft ? "text-left max-w-3xl" : "text-center max-w-2xl mx-auto"}`}>
          {content.badge && (
            <div className={`flex items-center gap-3 mb-3 ${isLeft ? "justify-start" : "justify-center"}`}>
              {!isLeft && <span className={`h-px w-10 sm:w-12 ${isLight ? "bg-zinc-300" : "bg-white/20"}`} />}
              <div
                className={`flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] font-mono ${
                  isLight ? "text-zinc-600" : "text-neutral-400"
                }`}
              >
                <span>{content.badge}</span>
                <svg viewBox="0 0 10 10" className="size-2 text-current" fill="currentColor">
                  <rect x="5" y="0" width="7" height="7" rx="1" transform="rotate(45 5 0)" />
                </svg>
              </div>
              <span className={`h-px w-10 sm:w-12 ${isLight ? "bg-zinc-300" : "bg-white/20"}`} />
            </div>
          )}

          <h2
            className={`display-head text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight uppercase ${
              isLight ? "text-zinc-900" : "text-white"
            }`}
          >
            {content.heading}
          </h2>

          {content.subtitle && (
            <p
              className={`text-sm sm:text-base mt-3 leading-relaxed ${
                isLight ? "text-zinc-600" : "text-neutral-400"
              }`}
            >
              {content.subtitle}
            </p>
          )}
        </div>

        {/* Cards Grid */}
        <div className={`grid ${getColClass()} gap-4 sm:gap-6`}>
          {content.cards.map((card, idx) => {
            const LucideIcon = (Icons as any)[card.icon] || Icons.Sparkles;
            const stepNum = String(idx + 1).padStart(2, "0");

            return (
              <div
                key={card.id || `card_${idx}`}
                className={`rounded-2xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between group ${getCardStyleClass()}`}
              >
                <div>
                  {/* Top Bar inside Card: Icon & Optional Badges / Numbers */}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    {iconStyle !== "minimal" ? (
                      <div
                        className={`${getIconContainerClass()} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shrink-0`}
                      >
                        <LucideIcon className="w-5 h-5" />
                      </div>
                    ) : (
                      <div className="transition-transform duration-300 group-hover:scale-110 mb-2">
                        <LucideIcon className="w-6 h-6 text-current" />
                      </div>
                    )}

                    <div className="flex items-center gap-1.5 shrink-0">
                      {card.badge && (
                        <span
                          className={`text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                            isLight
                              ? "bg-zinc-100 text-zinc-700 border-zinc-200"
                              : "bg-white/[0.06] text-neutral-300 border-white/10"
                          }`}
                        >
                          {card.badge}
                        </span>
                      )}

                      {showNumbers && (
                        <span
                          className={`text-xs font-mono font-bold tracking-tight opacity-50 ${
                            isLight ? "text-zinc-400" : "text-white/40"
                          }`}
                        >
                          {stepNum}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Title */}
                  <h3
                    className={`display-head text-base sm:text-lg font-bold mb-2.5 leading-snug ${
                      isLight ? "text-zinc-900" : "text-white"
                    }`}
                  >
                    {card.title}
                  </h3>

                  {/* Card Description */}
                  <p
                    className={`text-xs sm:text-[13px] leading-relaxed ${
                      isLight ? "text-zinc-600" : "text-neutral-400"
                    }`}
                  >
                    {card.description}
                  </p>
                </div>

                {/* Optional Card Action Link */}
                {card.linkUrl && (
                  <div className="mt-5 pt-3 border-t border-white/5 flex items-center">
                    <a
                      href={card.linkUrl}
                      className={`text-xs font-mono font-bold flex items-center gap-1 transition-colors ${
                        isLight ? "text-zinc-900 hover:text-black" : "text-white hover:text-zinc-300"
                      }`}
                    >
                      <span>{card.linkText || "Learn more"}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
