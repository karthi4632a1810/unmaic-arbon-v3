import React, { useState } from "react";
import { Award, Building2, User } from "lucide-react";
import type { SpeakersContent, SpeakerItem, EventBranding } from "../../types/event";
import { SpeakerBioModal } from "./SpeakerBioModal";

interface PublicSpeakersProps {
  content: SpeakersContent;
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

export const PublicSpeakers: React.FC<PublicSpeakersProps> = ({
  content,
}) => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<SpeakerItem | null>(null);

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

  // Grid responsiveness mapped to columns 1-4
  const gridLayout =
    columns === 1
      ? "grid-cols-1 max-w-2xl mx-auto"
      : columns === 2
      ? "grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto"
      : columns === 4
      ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto";

  // 2. Section Background & Theme
  const sectionBg = content.backgroundColor || "#000000";
  const isSectionDark = isDarkColor(sectionBg, true);

  // 3. Card Background & Styling
  const cardTheme = content.cardBackground || "dark";
  const isCardWhite = cardTheme === "white";
  const isCardGlass = cardTheme === "glass";
  const isCardZinc = cardTheme === "zinc";
  const isCardCustom = Boolean(content.customCardBgColor);

  const isCardDark = isCardCustom
    ? isDarkColor(content.customCardBgColor, true)
    : !isCardWhite;

  const cardStyle = content.cardStyle || "card";
  const isAvatarCircle = cardStyle === "rounded-avatar";

  // Card theme classes
  const cardThemeClasses = isCardWhite
    ? "bg-white text-zinc-900 border border-zinc-200/90 shadow-xl"
    : isCardGlass
    ? "bg-zinc-950/70 backdrop-blur-xl border border-white/10 text-white shadow-2xl"
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

  const speakersList = content.speakers || [];

  return (
    <section
      id="speakers"
      data-section="speakers"
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
        </div>

        {/* Speakers Grid (1 - 4 Columns Responsive) */}
        <div className={`grid ${gridLayout} gap-5 sm:gap-6 lg:gap-8`}>
          {speakersList.map((spk, idx) => {
            const photoSrc =
              spk.photo ||
              spk.avatarUrl ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500";

            return (
              <div
                key={spk.id || idx}
                onClick={() => setSelectedSpeaker(spk)}
                className={`group rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer flex flex-col hover:-translate-y-1 ${cardThemeClasses}`}
                style={customCardStyle}
              >
                {/* 1. Image Header Container (skipped if text-only or hidePhotos) */}
                {(!content.hidePhotos && cardStyle !== "text-only" && photoSrc) && (
                  isAvatarCircle ? (
                    <div className="pt-8 pb-3 px-6 flex flex-col items-center text-center">
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-zinc-700/60 shadow-lg group-hover:scale-105 transition-transform duration-500 bg-zinc-900">
                        <img
                          src={photoSrc}
                          alt={spk.name}
                          className="w-full h-full object-cover object-center grayscale contrast-125"
                        />
                      </div>

                      {spk.featured && (
                        <span
                          className={`inline-flex items-center gap-1 mt-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs font-mono tracking-wider ${
                            isCardDark ? "bg-white text-black" : "bg-black text-white"
                          }`}
                          style={content.accentColor ? { backgroundColor: content.accentColor, color: "#000000" } : undefined}
                        >
                          <Award className="w-3 h-3" />
                          <span>{spk.keynoteLabel || "Keynote"}</span>
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="relative aspect-square w-full overflow-hidden bg-zinc-900">
                      <img
                        src={photoSrc}
                        alt={spk.name}
                        className="w-full h-full object-cover object-center grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                      />

                      {spk.featured && (
                        <span
                          className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-md font-mono tracking-wider ${
                            isCardDark ? "bg-white text-black" : "bg-black text-white"
                          }`}
                          style={
                            content.accentColor
                              ? { backgroundColor: content.accentColor, color: "#000000" }
                              : undefined
                          }
                        >
                          <Award className="w-3 h-3 text-amber-500 shrink-0" />
                          <span>{spk.keynoteLabel || "Keynote"}</span>
                        </span>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-xs font-semibold text-white flex items-center gap-1 font-mono">
                          <User className="w-3.5 h-3.5" /> View Profile & Credentials
                        </span>
                      </div>
                    </div>
                  )
                )}

                {/* 2. Speaker Info Content */}
                <div
                  className={`p-5 flex-1 flex flex-col justify-between ${
                    isAvatarCircle ? "text-center pt-1" : ""
                  }`}
                >
                  <div>
                    <h3
                      className={`text-base sm:text-lg font-bold leading-snug transition ${
                        isCardDark ? "text-white group-hover:text-zinc-200" : "text-zinc-900 group-hover:text-black"
                      }`}
                    >
                      {spk.name}
                    </h3>

                    <p
                      className={`text-xs font-semibold uppercase tracking-wider mt-1 line-clamp-2 font-mono ${
                        isCardDark ? "text-zinc-400" : "text-zinc-600"
                      }`}
                    >
                      {spk.designation || spk.role}
                    </p>

                    {/* Bio Snippet for 1-column or 2-column wide layout */}
                    {columns <= 2 && spk.bio && (
                      <p
                        className={`text-xs leading-relaxed mt-2.5 line-clamp-3 ${
                          isCardDark ? "text-zinc-400" : "text-zinc-600"
                        }`}
                      >
                        {spk.bio}
                      </p>
                    )}

                    {/* Topic Tags if present */}
                    {spk.topics && spk.topics.length > 0 && columns <= 2 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {spk.topics.slice(0, 3).map((topic, tIdx) => (
                          <span
                            key={tIdx}
                            className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${
                              isCardDark
                                ? "bg-white/5 border-white/10 text-zinc-300"
                                : "bg-zinc-100 border-zinc-200 text-zinc-700"
                            }`}
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Organization Footer Strip */}
                  {spk.organization && (
                    <div
                      className={`flex items-center gap-1.5 text-xs mt-3 pt-3 border-t ${
                        isAvatarCircle ? "justify-center" : ""
                      } ${
                        isCardDark ? "border-zinc-800/80 text-zinc-400" : "border-zinc-200 text-zinc-600"
                      }`}
                    >
                      <Building2 className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      <span className="truncate">{spk.organization}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Speaker Bio Full Modal */}
      <SpeakerBioModal
        speaker={selectedSpeaker}
        onClose={() => setSelectedSpeaker(null)}
      />
    </section>
  );
};
