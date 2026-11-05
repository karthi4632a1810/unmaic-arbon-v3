import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight, ExternalLink } from "lucide-react";
import type { EventHeader, EventBranding } from "../../types/event";

interface PublicHeaderProps {
  header: EventHeader;
  branding?: EventBranding;
  eventName: string;
  onCtaClick?: () => void;
}

// Convert Hex + opacity to rgba string
function hexToRgba(hex: string, opacity: number = 100): string {
  if (!hex) return "transparent";
  let clean = hex.replace("#", "");
  if (clean.length === 3) {
    clean = clean.split("").map((c) => c + c).join("");
  }
  if (clean.length !== 6) return hex;
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
}

export const PublicHeader: React.FC<PublicHeaderProps> = ({
  header,
  branding: _branding,
  eventName,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNavIdx, setHoveredNavIdx] = useState<number | null>(null);
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  const headerRef = React.useRef<HTMLElement>(null);

  const isFixed = header.position === "fixed" || header.position === "floating";
  const fixedTrigger = header.fixedTrigger || "section1";
  const triggerPixels = header.fixedTriggerPixels ?? 60;

  useEffect(() => {
    if (!isFixed) {
      setIsScrolled(false);
      return;
    }

    const getScrollTop = () => {
      const scrollParent = headerRef.current?.closest(".overflow-y-auto");
      if (scrollParent) {
        return scrollParent.scrollTop;
      }
      return window.scrollY || document.documentElement.scrollTop || 0;
    };

    const handleScroll = () => {
      const scrollY = getScrollTop();
      if (fixedTrigger === "section1") {
        const heroEl = document.getElementById("hero");
        if (heroEl) {
          const heroHeight = heroEl.offsetHeight || 400;
          setIsScrolled(scrollY > heroHeight - 80);
        } else {
          setIsScrolled(scrollY > 150);
        }
      } else {
        setIsScrolled(scrollY > triggerPixels);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll, { capture: true });
  }, [isFixed, fixedTrigger, triggerPixels]);

  if (!header.visible) return null;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    if (link.startsWith("#")) {
      e.preventDefault();
      const targetId = link.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setMobileMenuOpen(false);
    }
  };

  // Determine Background Style
  let backgroundStyle: React.CSSProperties = {};
  const bgType = header.backgroundType || (header.background === "transparent" ? "transparent" : "solid");
  const bgColor = header.backgroundColor || "#000000";
  const bgOpacity = header.backgroundOpacity ?? 100;
  const gradient = header.gradient || {
    angle: 135,
    stops: [
      { color: "#000000", opacity: 90 },
      { color: "#18181b", opacity: 80 },
    ],
  };

  if (isScrolled && header.scrollChangeColor) {
    // Scrolled state
    const scrolledBg = header.scrolledBackgroundColor || "#000000";
    backgroundStyle = {
      backgroundColor: hexToRgba(scrolledBg, 95),
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
    };
  } else if (bgType === "gradient") {
    const s1 = gradient.stops?.[0] || { color: "#000000", opacity: 90 };
    const s2 = gradient.stops?.[1] || { color: "#18181b", opacity: 80 };
    backgroundStyle = {
      background: `linear-gradient(${gradient.angle || 135}deg, ${hexToRgba(s1.color, s1.opacity)} 0%, ${hexToRgba(s2.color, s2.opacity)} 100%)`,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    };
  } else if (bgType === "transparent") {
    backgroundStyle = {
      backgroundColor: "transparent",
      borderBottom: "1px solid transparent",
    };
  } else {
    // Solid background
    backgroundStyle = {
      backgroundColor: hexToRgba(bgColor, bgOpacity),
      backdropFilter: bgOpacity < 100 ? "blur(12px)" : "none",
      WebkitBackdropFilter: bgOpacity < 100 ? "blur(12px)" : "none",
      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    };
  }

  // Active Link Colors
  const currentTextColor = isScrolled && header.scrollChangeColor
    ? header.scrolledTextColor || "#ffffff"
    : header.textColor || "#e4e4e7";

  const currentHoverColor = isScrolled && header.scrollChangeColor
    ? header.scrolledHoverColor || "#ffffff"
    : header.hoverTextColor || "#ffffff";

  // CTA Button Styling
  const cta = header.ctaButton || {
    visible: true,
    label: "Register Now",
    link: "#registration",
    targetType: "section",
    openNewTab: false,
    backgroundColor: "#ffffff",
    hoverBackgroundColor: "#09090b",
    textColor: "#09090b",
    hoverTextColor: "#ffffff",
    borderRadius: "9999px",
  };

  const isExternalCta = cta.targetType === "external" || cta.link?.startsWith("http");

  const ctaStyle: React.CSSProperties = {
    background: isCtaHovered
      ? cta.hoverBackgroundColor || "#09090b"
      : cta.backgroundColor || "#ffffff",
    color: isCtaHovered
      ? cta.hoverTextColor || "#ffffff"
      : cta.textColor || "#09090b",
    borderRadius: cta.borderRadius || "9999px",
    border: cta.borderColor ? `1px solid ${cta.borderColor}` : "1px solid transparent",
    boxShadow: isCtaHovered ? "0 6px 20px -4px rgba(0,0,0,0.4)" : "0 2px 8px rgba(0,0,0,0.15)",
    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
  };

  const layoutStyle = header.layoutStyle || "left-nav-right";
  const positionClass = isFixed ? "sticky top-0 left-0 right-0 z-40" : "relative z-40";

  // Split Navigation items for center-logo-split layout
  const midPoint = Math.ceil(header.navigation.length / 2);
  const navLeft = header.navigation.slice(0, midPoint);
  const navRight = header.navigation.slice(midPoint);

  return (
    <header
      ref={headerRef}
      className={`${positionClass} w-full transition-all duration-300 select-none`}
      style={backgroundStyle}
    >
      {/* Full width container spanning edge to edge, with inside responsive container */}
      <div className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${header.fullWidth ? "max-w-full" : "max-w-7xl"}`}>
        {/* LAYOUT 1: Left Logo • Right Navigation & CTA (Standard) */}
        {layoutStyle === "left-nav-right" && (
          <div className="flex items-center justify-between py-3.5 sm:py-4">
            {/* Logo */}
            <LogoItem header={header} eventName={eventName} onNavClick={handleNavClick} />

            {/* Desktop Navigation Links & CTA */}
            <div className="hidden md:flex items-center gap-7">
              <nav className="flex items-center gap-6 font-mono text-xs sm:text-sm font-medium">
                {header.navigation.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.link}
                    onClick={(e) => handleNavClick(e, item.link)}
                    onMouseEnter={() => setHoveredNavIdx(idx)}
                    onMouseLeave={() => setHoveredNavIdx(null)}
                    style={{
                      color: hoveredNavIdx === idx ? currentHoverColor : currentTextColor,
                      transition: "color 0.2s ease",
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {cta.visible && (
                <a
                  href={cta.link}
                  target={isExternalCta ? "_blank" : undefined}
                  rel={isExternalCta ? "noopener noreferrer" : undefined}
                  onClick={(e) => {
                    if (cta.link?.startsWith("#")) handleNavClick(e, cta.link);
                  }}
                  onMouseEnter={() => setIsCtaHovered(true)}
                  onMouseLeave={() => setIsCtaHovered(false)}
                  style={ctaStyle}
                  className="px-5 py-2 text-xs font-bold font-sans inline-flex items-center gap-1.5 cursor-pointer transform active:scale-95"
                >
                  <span>{cta.label}</span>
                  {isExternalCta ? (
                    <ExternalLink className="w-3 h-3" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5" />
                  )}
                </a>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg transition"
              style={{ color: currentTextColor }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        )}

        {/* LAYOUT 2: Left Logo • Centered Navigation • Right CTA (Modern SaaS) */}
        {layoutStyle === "left-nav-center" && (
          <div className="flex items-center justify-between py-3.5 sm:py-4">
            <div className="w-1/4 flex justify-start">
              <LogoItem header={header} eventName={eventName} onNavClick={handleNavClick} />
            </div>

            <nav className="hidden md:flex items-center justify-center gap-7 font-mono text-xs sm:text-sm font-medium w-2/4">
              {header.navigation.map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  onClick={(e) => handleNavClick(e, item.link)}
                  onMouseEnter={() => setHoveredNavIdx(idx)}
                  onMouseLeave={() => setHoveredNavIdx(null)}
                  style={{
                    color: hoveredNavIdx === idx ? currentHoverColor : currentTextColor,
                    transition: "color 0.2s ease",
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="w-1/4 flex justify-end items-center gap-3">
              {cta.visible && (
                <a
                  href={cta.link}
                  target={isExternalCta ? "_blank" : undefined}
                  rel={isExternalCta ? "noopener noreferrer" : undefined}
                  onClick={(e) => {
                    if (cta.link?.startsWith("#")) handleNavClick(e, cta.link);
                  }}
                  onMouseEnter={() => setIsCtaHovered(true)}
                  onMouseLeave={() => setIsCtaHovered(false)}
                  style={ctaStyle}
                  className="hidden sm:inline-flex px-5 py-2 text-xs font-bold font-sans items-center gap-1.5 cursor-pointer transform active:scale-95"
                >
                  <span>{cta.label}</span>
                  {isExternalCta ? <ExternalLink className="w-3 h-3" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </a>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg transition"
                style={{ color: currentTextColor }}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        )}

        {/* LAYOUT 3: Center Logo • Split Navigation Left/Right (Editorial Luxury) */}
        {layoutStyle === "center-logo-split" && (
          <div className="flex items-center justify-between py-3.5 sm:py-4">
            <nav className="hidden md:flex items-center justify-start gap-6 font-mono text-xs sm:text-sm font-medium w-1/3">
              {navLeft.map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  onClick={(e) => handleNavClick(e, item.link)}
                  onMouseEnter={() => setHoveredNavIdx(idx)}
                  onMouseLeave={() => setHoveredNavIdx(null)}
                  style={{
                    color: hoveredNavIdx === idx ? currentHoverColor : currentTextColor,
                    transition: "color 0.2s ease",
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="w-full md:w-1/3 flex justify-between md:justify-center items-center">
              <LogoItem header={header} eventName={eventName} onNavClick={handleNavClick} />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg transition"
                style={{ color: currentTextColor }}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            <div className="hidden md:flex items-center justify-end gap-6 w-1/3 font-mono text-xs sm:text-sm">
              <nav className="flex items-center gap-6">
                {navRight.map((item, idx) => {
                  const actualIdx = midPoint + idx;
                  return (
                    <a
                      key={actualIdx}
                      href={item.link}
                      onClick={(e) => handleNavClick(e, item.link)}
                      onMouseEnter={() => setHoveredNavIdx(actualIdx)}
                      onMouseLeave={() => setHoveredNavIdx(null)}
                      style={{
                        color: hoveredNavIdx === actualIdx ? currentHoverColor : currentTextColor,
                        transition: "color 0.2s ease",
                      }}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>

              {cta.visible && (
                <a
                  href={cta.link}
                  target={isExternalCta ? "_blank" : undefined}
                  rel={isExternalCta ? "noopener noreferrer" : undefined}
                  onClick={(e) => {
                    if (cta.link?.startsWith("#")) handleNavClick(e, cta.link);
                  }}
                  onMouseEnter={() => setIsCtaHovered(true)}
                  onMouseLeave={() => setIsCtaHovered(false)}
                  style={ctaStyle}
                  className="px-4 py-2 text-xs font-bold font-sans inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{cta.label}</span>
                </a>
              )}
            </div>
          </div>
        )}

        {/* LAYOUT 4: Stacked Centered (Logo Top, Nav Bottom) */}
        {layoutStyle === "stacked-center" && (
          <div className="flex flex-col items-center justify-center py-3 sm:py-4 gap-2 text-center">
            <div className="w-full flex items-center justify-between sm:justify-center">
              <LogoItem header={header} eventName={eventName} onNavClick={handleNavClick} />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg transition"
                style={{ color: currentTextColor }}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            <div className="hidden md:flex items-center gap-6 pt-1 font-mono text-xs sm:text-sm font-medium">
              {header.navigation.map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  onClick={(e) => handleNavClick(e, item.link)}
                  onMouseEnter={() => setHoveredNavIdx(idx)}
                  onMouseLeave={() => setHoveredNavIdx(null)}
                  style={{
                    color: hoveredNavIdx === idx ? currentHoverColor : currentTextColor,
                    transition: "color 0.2s ease",
                  }}
                >
                  {item.label}
                </a>
              ))}

              {cta.visible && (
                <a
                  href={cta.link}
                  target={isExternalCta ? "_blank" : undefined}
                  rel={isExternalCta ? "noopener noreferrer" : undefined}
                  onClick={(e) => {
                    if (cta.link?.startsWith("#")) handleNavClick(e, cta.link);
                  }}
                  onMouseEnter={() => setIsCtaHovered(true)}
                  onMouseLeave={() => setIsCtaHovered(false)}
                  style={ctaStyle}
                  className="ml-2 px-4 py-1.5 text-xs font-bold font-sans inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{cta.label}</span>
                </a>
              )}
            </div>
          </div>
        )}

        {/* LAYOUT 5: Minimal Clean */}
        {layoutStyle === "minimal" && (
          <div className="flex items-center justify-between py-3.5 sm:py-4">
            <LogoItem header={header} eventName={eventName} onNavClick={handleNavClick} />

            <div className="flex items-center gap-3">
              {cta.visible && (
                <a
                  href={cta.link}
                  target={isExternalCta ? "_blank" : undefined}
                  rel={isExternalCta ? "noopener noreferrer" : undefined}
                  onClick={(e) => {
                    if (cta.link?.startsWith("#")) handleNavClick(e, cta.link);
                  }}
                  onMouseEnter={() => setIsCtaHovered(true)}
                  onMouseLeave={() => setIsCtaHovered(false)}
                  style={ctaStyle}
                  className="px-5 py-2 text-xs font-bold font-sans inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{cta.label}</span>
                  {isExternalCta ? <ExternalLink className="w-3 h-3" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </a>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg transition"
                style={{ color: currentTextColor }}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-t px-6 py-5 shadow-2xl animate-in slide-in-from-top-2 duration-200"
          style={{
            backgroundColor: hexToRgba(bgColor, 98),
            borderColor: "rgba(255, 255, 255, 0.1)",
          }}
        >
          <nav className="flex flex-col gap-3.5 font-mono text-xs">
            {header.navigation.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                onClick={(e) => handleNavClick(e, item.link)}
                style={{ color: currentTextColor }}
                className="py-1 hover:underline"
              >
                {item.label}
              </a>
            ))}

            {cta.visible && (
              <a
                href={cta.link}
                target={isExternalCta ? "_blank" : undefined}
                rel={isExternalCta ? "noopener noreferrer" : undefined}
                onClick={(e) => {
                  if (cta.link?.startsWith("#")) handleNavClick(e, cta.link);
                }}
                style={ctaStyle}
                className="mt-2 text-center py-2.5 px-4 text-xs font-bold block"
              >
                {cta.label}
              </a>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

// Subcomponent: Logo
function LogoItem({
  header,
  eventName,
  onNavClick,
}: {
  header: EventHeader;
  eventName: string;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, link: string) => void;
}) {
  const brandName = header.logoText || eventName || "CLEAN ENERGY";

  return (
    <a
      href="#hero"
      onClick={(e) => onNavClick(e, "#hero")}
      className="flex items-center gap-2.5 font-bold tracking-tight text-base sm:text-lg focus:outline-none transition group shrink-0"
    >
      {header.logoImage ? (
        <img
          src={header.logoImage}
          alt={brandName}
          className="h-8 object-contain"
          style={{ maxWidth: header.logoWidth ? `${header.logoWidth}px` : "140px" }}
        />
      ) : (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-black bg-white text-sm shadow-sm font-mono shrink-0">
            {brandName[0] || "U"}
          </div>
          <span className="text-white font-bold tracking-tight font-mono text-sm sm:text-base uppercase truncate">
            {brandName}
          </span>
        </div>
      )}
    </a>
  );
}
