import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Eye, Maximize2, Download, Video, FileText, ExternalLink } from "lucide-react";
import type { GalleryContent, EventBranding } from "../../types/event";

interface PublicGalleryProps {
  content: GalleryContent;
  branding?: EventBranding;
}

/** Helper to determine if a color hex is perceptually dark */
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

export const PublicGallery: React.FC<PublicGalleryProps> = ({ content }) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const images = content.images || [];

  // Keyboard navigation for lightbox modal
  useEffect(() => {
    if (activeImageIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveImageIndex(null);
      if (e.key === "ArrowRight") {
        setActiveImageIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
      }
      if (e.key === "ArrowLeft") {
        setActiveImageIndex((prev) =>
          prev !== null ? (prev - 1 + images.length) % images.length : null
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex, images.length]);

  if (images.length === 0) return null;

  const handleNext = () => {
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % images.length);
    }
  };

  const handlePrev = () => {
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex - 1 + images.length) % images.length);
    }
  };

  // 1. Determine Column Count (1 - 4)
  const columns: number =
    content.columns ||
    (content.layout === "1-column" || content.layout === "1-col"
      ? 1
      : content.layout === "2-column" || content.layout === "2-col"
      ? 2
      : content.layout === "4-column" || content.layout === "4-col"
      ? 4
      : 3);

  // Responsive Grid classes
  const gridLayout =
    columns === 1
      ? "grid-cols-1 max-w-3xl mx-auto"
      : columns === 2
      ? "grid-cols-1 sm:grid-cols-2 max-w-5xl mx-auto gap-6 sm:gap-8"
      : columns === 4
      ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto gap-4 sm:gap-6"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto gap-5 sm:gap-6";

  // 2. Section Background & Theme
  const sectionBg = content.backgroundColor || "#000000";
  const isSectionDark = isDarkColor(sectionBg, true);

  // 3. Card Theme & Border
  const cardTheme = content.cardBackground || "dark";
  const isCardWhite = cardTheme === "white";
  const isCardGlass = cardTheme === "glass";
  const isCardZinc = cardTheme === "zinc";
  const isCardCustom = Boolean(content.customCardBgColor);

  const cardThemeClasses = isCardWhite
    ? "bg-white text-zinc-900 border border-zinc-200/90 shadow-xl"
    : isCardGlass
    ? "bg-zinc-950/70 backdrop-blur-xl border border-white/15 text-white shadow-2xl"
    : isCardZinc
    ? "bg-zinc-900 text-white border border-zinc-800 shadow-xl"
    : isCardCustom
    ? "shadow-xl border"
    : "bg-zinc-950 text-white border border-zinc-800/90 hover:border-zinc-700 shadow-xl";

  const customCardStyle: React.CSSProperties = {
    ...(isCardCustom && content.customCardBgColor
      ? { backgroundColor: content.customCardBgColor }
      : {}),
    ...(content.cardBorderColor ? { borderColor: content.cardBorderColor } : {}),
  };

  // 4. Aspect Ratio Class
  const aspectRatioClass =
    content.aspectRatio === "16/9"
      ? "aspect-video"
      : content.aspectRatio === "square"
      ? "aspect-square"
      : content.aspectRatio === "portrait"
      ? "aspect-[3/4]"
      : content.aspectRatio === "auto"
      ? "aspect-auto max-h-[640px]"
      : "aspect-4/3";

  return (
    <section
      id="gallery"
      data-section="gallery"
      data-custom-bg={Boolean(content.backgroundColor) ? "true" : undefined}
      className="py-16 sm:py-24 transition-colors"
      style={{ backgroundColor: content.backgroundColor || undefined }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {content.badge && (
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className={`h-px w-10 sm:w-12 ${isSectionDark ? "bg-white/20" : "bg-black/20"}`} />
              <span
                className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] font-mono ${
                  isSectionDark ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                {content.badge}
              </span>
              <span className={`h-px w-10 sm:w-12 ${isSectionDark ? "bg-white/20" : "bg-black/20"}`} />
            </div>
          )}

          <h2
            className={`display-head text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight uppercase ${
              isSectionDark ? "text-white" : "text-zinc-950"
            }`}
            style={content.textColor ? { color: content.textColor } : undefined}
          >
            {content.heading}
          </h2>

          {content.subtitle && (
            <p
              className={`text-xs sm:text-sm md:text-base mt-3 leading-relaxed max-w-2xl mx-auto ${
                isSectionDark ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              {content.subtitle}
            </p>
          )}

          {content.downloads && content.downloads.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-3.5 mt-6 sm:mt-8">
              {content.downloads.map((dl) => (
                <a
                  key={dl.id}
                  href={dl.url}
                  download={!dl.isExternal && dl.url.endsWith(".pdf")}
                  target={dl.isExternal || dl.url.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition duration-200 shadow-lg border border-emerald-500/40 bg-emerald-950/40 hover:bg-emerald-900/60 hover:border-emerald-400 text-emerald-200"
                >
                  {dl.url.includes("Recording") || dl.url.includes("drive.google.com") ? (
                    <Video className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <FileText className="w-4 h-4 text-emerald-400" />
                  )}
                  <span>{dl.label}</span>
                  {dl.isExternal ? (
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  ) : (
                    <Download className="w-3.5 h-3.5 opacity-70" />
                  )}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Gallery Grid (1 - 4 Columns Responsive) */}
        <div className={`grid ${gridLayout}`}>
          {images.map((img, idx) => (
            <div
              key={img.id || idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`group relative rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer flex flex-col hover:-translate-y-1 ${cardThemeClasses} ${aspectRatioClass}`}
              style={customCardStyle}
            >
              <img
                src={img.url}
                alt={img.caption || `Event visual resource ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Hover overlay with zoom icon & caption */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                <div className="flex justify-end">
                  <span className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white shadow-md">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-full bg-white text-black shadow font-bold shrink-0">
                    <Eye className="w-4 h-4" />
                  </span>
                  {img.caption && (
                    <span className="text-xs text-white font-mono font-semibold line-clamp-2 drop-shadow">
                      {img.caption}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveImageIndex(null)}
        >
          <button
            onClick={() => setActiveImageIndex(null)}
            className="absolute top-4 right-4 z-10 p-2.5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div
            className="max-w-4xl max-h-[88vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[activeImageIndex]?.url}
              alt={images[activeImageIndex]?.caption || "Expanded preview"}
              className="max-w-full max-h-[78vh] object-contain rounded-xl shadow-2xl border border-zinc-800"
            />
            {images[activeImageIndex]?.caption && (
              <div className="mt-3 px-4 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center max-w-2xl">
                <p className="text-xs sm:text-sm text-zinc-300 font-mono">
                  {images[activeImageIndex].caption}
                </p>
                <span className="text-[10px] text-zinc-500 font-mono mt-0.5 block">
                  {activeImageIndex + 1} of {images.length}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
