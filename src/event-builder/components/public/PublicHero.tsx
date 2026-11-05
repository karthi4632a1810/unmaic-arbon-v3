import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import type { HeroContent, HeroCTAButton, EventBranding } from "../../types/event";

interface PublicHeroProps {
  content: HeroContent;
  branding: EventBranding;
  onCtaClick?: () => void;
}

export const PublicHero: React.FC<PublicHeroProps> = ({
  content,
  branding,
  onCtaClick,
}) => {
  const alignClass =
    content.contentAlignment === "left"
      ? "text-left items-start"
      : content.contentAlignment === "right"
      ? "text-right items-end ml-auto"
      : "text-center items-center mx-auto";

  const verticalClass =
    content.verticalPosition === "top"
      ? "pt-12 pb-10 justify-start"
      : content.verticalPosition === "bottom"
      ? "pt-16 pb-10 justify-end"
      : "py-12 sm:py-16 md:py-20 justify-center";

  const widthClass =
    content.contentWidth === "small"
      ? "max-w-2xl"
      : content.contentWidth === "large"
      ? "max-w-5xl"
      : "max-w-3xl";

  const animationClass =
    content.animation === "fade-in"
      ? "animate-in fade-in duration-700"
      : content.animation === "fade-up"
      ? "animate-in fade-in slide-in-from-bottom-6 duration-700"
      : content.animation === "zoom-in"
      ? "animate-in zoom-in-95 duration-700"
      : content.animation === "slide-up"
      ? "animate-in slide-in-from-bottom-10 duration-700"
      : "";

  // Helper to determine if color is light
  const isColorLight = (hex: string) => {
    let clean = (hex || "#000000").replace("#", "");
    if (clean.length === 3) clean = clean.split("").map((c) => c + c).join("");
    if (clean.length !== 6) return false;
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    return lum > 170;
  };

  // Helper to convert hex to rgba
  const hexToRgba = (hex: string, opacity: number) => {
    let clean = (hex || "#000000").replace("#", "");
    if (clean.length === 3) clean = clean.split("").map((c) => c + c).join("");
    if (clean.length !== 6) return `rgba(0, 0, 0, ${opacity / 100})`;
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(100, opacity)) / 100})`;
  };

  // Overlay styles
  const overlayStrength = typeof content.overlayStrength === "number" ? content.overlayStrength : 60;
  const overlayColorHex = content.overlayColor || (content.overlay === "light" ? "#ffffff" : "#000000");
  const overlayStyle: React.CSSProperties = {
    backgroundColor: hexToRgba(overlayColorHex, overlayStrength),
  };

  const isLightOverlay =
    content.overlay === "light" ||
    (content.bgType === "image" && overlayStrength > 40 && isColorLight(overlayColorHex)) ||
    (content.bgType === "solid" && isColorLight(content.solidColor || "#0f172a"));

  const headingColor = isLightOverlay ? "text-slate-900" : "text-white";
  const descColor = isLightOverlay ? "text-slate-700" : "text-slate-200";

  return (
    <section
      id="hero"
      className="relative w-full flex flex-col justify-center overflow-hidden select-none"
    >
      {/* Background Layer */}
      {content.bgType === "image" && (
        <div className="absolute inset-0 z-0">
          <picture>
            {content.mobileImage && (
              <source media="(max-width: 640px)" srcSet={content.mobileImage} />
            )}
            <img
              src={content.desktopImage || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600"}
              alt="Hero Background"
              className="w-full h-full object-cover object-center"
            />
          </picture>
        </div>
      )}

      {content.bgType === "gradient" && (
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `linear-gradient(${content.gradientAngle ?? 135}deg, ${content.gradientFrom || "#0f172a"} 0%, ${
              content.gradientTo || "#1e293b"
            } 100%)`,
          }}
        />
      )}

      {content.bgType === "solid" && (
        <div
          className="absolute inset-0 z-0"
          style={{ backgroundColor: content.solidColor || "#0f172a" }}
        />
      )}

      {content.bgType === "video" && content.videoUrl && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <iframe
            src={`${content.videoUrl}?autoplay=1&mute=1&loop=1&controls=0`}
            className="w-full h-full object-cover pointer-events-none scale-125"
            allow="autoplay; encrypted-media"
            title="Hero Video"
          />
        </div>
      )}

      {/* Overlay Layer (Custom color and opacity for background image) */}
      {content.bgType === "image" && overlayStrength > 0 && (
        <div className="absolute inset-0 z-10 transition-opacity" style={overlayStyle} />
      )}

      {/* Subtle vignette for dark images */}
      {content.bgType === "image" && !isLightOverlay && overlayStrength > 10 && (
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
      )}

      {/* Main Hero Container */}
      <div
        className={`relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col ${verticalClass}`}
      >
        <div className={`w-full flex flex-col ${alignClass} ${widthClass} ${animationClass}`}>
          {/* Badge */}
          {content.badgeText && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase mb-3.5 backdrop-blur-md bg-white/10 border border-white/20 text-white shadow-sm font-mono">
              <Sparkles className="w-3 h-3 text-white" />
              <span>{content.badgeText}</span>
            </div>
          )}

          {/* Heading */}
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.16] mb-3 ${headingColor}`}
            style={{
              fontFamily: branding.font || "inherit",
              textShadow: !isLightOverlay ? "0 2px 20px rgba(0,0,0,0.4)" : "none",
            }}
          >
            {content.heading}
          </h1>

          {/* Subtitle */}
          {content.subtitle && (
            <p
              className={`text-base sm:text-lg font-medium mb-3 leading-snug ${
                isLightOverlay ? "text-slate-800" : "text-zinc-200"
              }`}
            >
              {content.subtitle}
            </p>
          )}

          {/* Description */}
          {content.description && (
            <p
              className={`text-xs sm:text-sm md:text-base leading-relaxed mb-6 max-w-3xl ${descColor}`}
            >
              {content.description}
            </p>
          )}

          {/* Action Buttons */}
          {content.buttons && content.buttons.length > 0 && (
            <div
              className={`flex flex-wrap gap-3.5 pt-2 ${
                content.contentAlignment === "center"
                  ? "justify-center"
                  : content.contentAlignment === "right"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {content.buttons.map((btn) => (
                <HeroButtonItem
                  key={btn.id}
                  btn={btn}
                  branding={branding}
                  onCtaClick={onCtaClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const HeroButtonItem: React.FC<{
  btn: HeroCTAButton;
  branding: EventBranding;
  onCtaClick?: () => void;
}> = ({ btn, branding }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isExt = btn.targetType === "external" || (btn.link && btn.link.startsWith("http"));
    if (isExt) {
      // Native anchor handles opening in a new tab
      return;
    }

    e.preventDefault();
    const target = btn.sectionTarget || (btn.link ? btn.link.replace(/^#/, "") : "hero");
    if (target) {
      const el =
        document.getElementById(target) ||
        document.querySelector(`[data-section-id="${target}"]`) ||
        document.getElementById(`sec_${target}`) ||
        document.getElementById(target.replace(/^sec_/, "")) ||
        document.querySelector(`[id*="${target}"]`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const hasCustomStyle = Boolean(btn.backgroundColor || btn.borderRadius || btn.borderColor);

  let btnStyle: React.CSSProperties = {};
  let styleClass = "";

  if (hasCustomStyle) {
    btnStyle = {
      backgroundColor: isHovered
        ? btn.hoverBackgroundColor || btn.backgroundColor
        : btn.backgroundColor,
      color: isHovered
        ? btn.hoverTextColor || btn.textColor || "#ffffff"
        : btn.textColor || "#ffffff",
      borderColor: btn.borderColor || "transparent",
      borderRadius: btn.borderRadius || undefined,
      borderWidth: btn.borderColor && btn.borderColor !== "transparent" ? "1px" : undefined,
      borderStyle: btn.borderColor && btn.borderColor !== "transparent" ? "solid" : undefined,
    };
    styleClass = "shadow-lg shadow-black/30 font-bold";
  } else {
    const isPrimary = btn.style === "primary";
    const isOutline = btn.style === "outline";
    const isSecondary = btn.style === "secondary";

    if (isPrimary) {
      const isWhite =
        branding.primaryColor?.toLowerCase() === "#ffffff" ||
        branding.primaryColor?.toLowerCase() === "#fff";
      if (isWhite) {
        styleClass = "bg-white text-black hover:bg-zinc-200 shadow-lg shadow-black/40 font-bold";
      } else {
        btnStyle = { backgroundColor: branding.primaryColor };
        styleClass = "text-white shadow-lg shadow-black/40 hover:brightness-110 font-bold";
      }
    } else if (isSecondary) {
      btnStyle = { backgroundColor: branding.secondaryColor };
      styleClass = "text-white bg-zinc-900 border border-zinc-700 shadow hover:bg-zinc-800";
    } else if (isOutline) {
      styleClass =
        "border border-white/40 text-white hover:bg-white hover:text-black backdrop-blur-sm font-semibold";
    } else {
      styleClass = "text-white/90 hover:text-white hover:bg-white/10";
    }
  }

  const isExt = btn.targetType === "external" || (btn.link && btn.link.startsWith("http"));

  return (
    <a
      href={btn.link || "#"}
      target={isExt ? "_blank" : undefined}
      rel={isExt ? "noopener noreferrer" : undefined}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={btnStyle}
      className={`inline-flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold ${
        !btn.borderRadius ? branding.buttonStyle : ""
      } ${styleClass} transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer`}
    >
      <span>{btn.label}</span>
      <ArrowRight className="w-4 h-4" />
    </a>
  );
};
