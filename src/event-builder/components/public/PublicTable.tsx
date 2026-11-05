import React from "react";
import { ArrowUpRight, CheckCircle2, ExternalLink } from "lucide-react";
import type { TableContent, EventBranding } from "../../types/event";

interface PublicTableProps {
  content: TableContent;
  branding?: EventBranding;
}

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
  if (color.startsWith("rgb")) {
    const match = color.match(/\d+/g);
    if (match && match.length >= 3) {
      const r = parseInt(match[0], 10);
      const g = parseInt(match[1], 10);
      const b = parseInt(match[2], 10);
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance < 0.5;
    }
  }
  return fallbackDark;
};

export const PublicTable: React.FC<PublicTableProps> = ({ content, branding }) => {
  const isKeyValue = (content.layoutStyle || "key-value") === "key-value";
  const showHeader =
    content.showHeader !== false && Boolean(content.badge || content.heading || content.subtitle);
  const showFooter =
    content.showFooter !== false && Boolean(content.footnote || content.ctaLink || content.ctaText);

  const hasCustomBg = Boolean(content.backgroundColor && content.backgroundColor !== "transparent");
  const isPageDark = isDarkColor(branding?.backgroundColor, true);
  const isSectionDark = hasCustomBg ? isDarkColor(content.backgroundColor, true) : isPageDark;

  const isGlassCard = content.cardBackground === "glass";
  const isDarkCard =
    isGlassCard ||
    (content.customCardBgColor
      ? isDarkColor(content.customCardBgColor, true)
      : content.cardBackground === "dark");

  const cardClasses = isGlassCard
    ? "bg-zinc-900/80 backdrop-blur-xl border border-white/10 text-white shadow-2xl"
    : isDarkCard
    ? "bg-zinc-900 border border-zinc-800 text-white shadow-2xl"
    : "bg-white border border-zinc-200/90 text-zinc-900 shadow-xl";

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    if (link.startsWith("#")) {
      e.preventDefault();
      const targetId = link.substring(1);
      const el =
        document.getElementById(targetId) ||
        document.querySelector(`[data-section-id="${targetId}"]`) ||
        document.getElementById(`sec_${targetId}`) ||
        document.querySelector(`[id*="${targetId}"]`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <section
      data-custom-bg={hasCustomBg ? "true" : undefined}
      className="py-12 sm:py-16 md:py-20 relative z-10 transition-colors"
      style={{ backgroundColor: hasCustomBg ? content.backgroundColor : undefined }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        {showHeader && (
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            {content.badge && (
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-widest uppercase mb-3 shadow-xs border ${
                  isSectionDark
                    ? "bg-white/10 text-white border-white/20"
                    : "bg-zinc-100 text-zinc-800 border-zinc-200"
                }`}
              >
                {content.badge}
              </span>
            )}
            {content.heading && (
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-3 ${
                  isSectionDark ? "text-white" : "text-zinc-900"
                }`}
                style={{
                  fontFamily: branding?.font || "inherit",
                  color: isSectionDark ? "#ffffff" : "#09090b",
                }}
              >
                {content.heading}
              </h2>
            )}
            {content.subtitle && (
              <p
                className={`text-sm sm:text-base leading-relaxed font-normal ${
                  isSectionDark ? "text-zinc-300" : "text-zinc-600"
                }`}
                style={{
                  color: isSectionDark ? "#cbd5e1" : "#475569",
                }}
              >
                {content.subtitle}
              </p>
            )}
          </div>
        )}

        {/* Table Container */}
        <div
          className={`rounded-2xl overflow-hidden transition-all duration-300 ${cardClasses}`}
          style={{
            backgroundColor: content.customCardBgColor || undefined,
          }}
        >
          {isKeyValue ? (
            /* KEY-VALUE LAYOUT (Webinar Details Block) */
            <div className={`divide-y ${isDarkCard ? "divide-zinc-800" : "divide-zinc-200/80"}`}>
              {content.rows?.map((row, idx) => (
                <div
                  key={row.id || idx}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 transition ${
                    isDarkCard
                      ? `hover:bg-zinc-800/60 ${content.striped && idx % 2 === 1 ? "bg-zinc-800/30" : "bg-transparent"}`
                      : `hover:bg-zinc-50/80 ${content.striped && idx % 2 === 1 ? "bg-zinc-50/50" : "bg-white"}`
                  }`}
                >
                  {/* Left Label */}
                  <div className="sm:w-1/3 pr-4 mb-1 sm:mb-0 flex items-center gap-2">
                    <span
                      className={`font-mono text-xs font-bold uppercase tracking-wider ${
                        isDarkCard ? "text-zinc-400" : "text-zinc-500"
                      }`}
                    >
                      {row.label || `Field ${idx + 1}`}
                    </span>
                    {row.badge && (
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                          isDarkCard
                            ? "bg-zinc-800 text-zinc-300 border-zinc-700"
                            : "bg-zinc-100 text-zinc-700 border-zinc-200"
                        }`}
                      >
                        {row.badge}
                      </span>
                    )}
                  </div>

                  {/* Right Value */}
                  <div className="sm:w-2/3 flex items-center justify-between gap-3 text-left">
                    <div
                      className={`text-sm font-semibold leading-relaxed break-words ${
                        isDarkCard ? "text-white" : "text-zinc-900"
                      }`}
                    >
                      {row.value}
                    </div>

                    {/* Optional Action / Link in row */}
                    {(() => {
                      const rowHref =
                        row.targetType === "section" && row.sectionTarget
                          ? `#${row.sectionTarget}`
                          : row.link;
                      if (!rowHref) return null;
                      return (
                        <a
                          href={rowHref}
                          target={rowHref.startsWith("#") ? undefined : "_blank"}
                          rel={rowHref.startsWith("#") ? undefined : "noopener noreferrer"}
                          onClick={(e) => handleLinkClick(e, rowHref)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition shadow-xs cursor-pointer ${
                            isDarkCard
                              ? "bg-white text-black hover:bg-zinc-200"
                              : "bg-black text-white hover:bg-zinc-800"
                          }`}
                        >
                          <span>{row.linkText || "Open"}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      );
                    })()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* GRID TABLE LAYOUT */
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr
                    className={`border-b font-mono text-xs font-bold uppercase tracking-wider ${
                      isDarkCard
                        ? "border-zinc-800 bg-zinc-950/60 text-zinc-300"
                        : "border-zinc-200 bg-zinc-50/90 text-zinc-600"
                    }`}
                  >
                    {content.columns?.map((col) => (
                      <th
                        key={col.id || col.key}
                        className="py-3.5 px-4 sm:px-6"
                        style={{ width: col.width || "auto" }}
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody
                  className={`divide-y text-xs sm:text-sm ${
                    isDarkCard ? "divide-zinc-800" : "divide-zinc-200"
                  }`}
                >
                  {content.rows?.map((row, rIdx) => (
                    <tr
                      key={row.id || rIdx}
                      className={`transition ${
                        isDarkCard
                          ? `hover:bg-zinc-800/50 ${content.striped && rIdx % 2 === 1 ? "bg-zinc-800/30" : "bg-transparent"}`
                          : `hover:bg-zinc-50/80 ${content.striped && rIdx % 2 === 1 ? "bg-zinc-50/40" : "bg-white"}`
                      }`}
                    >
                      {content.columns?.map((col) => (
                        <td
                          key={col.key}
                          className={`py-3.5 px-4 sm:px-6 font-medium ${
                            isDarkCard ? "text-zinc-200" : "text-zinc-800"
                          }`}
                        >
                          {row[col.key] ?? "-"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Footnote / Meta Footer (Toggleable & Customizable) */}
          {showFooter && (
            <div
              className={`p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono border-t ${
                isDarkCard
                  ? "bg-zinc-950/70 border-zinc-800 text-zinc-400"
                  : "bg-zinc-50 border-zinc-200/90 text-zinc-500"
              }`}
            >
              {content.footnote ? (
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{content.footnote}</span>
                </span>
              ) : (
                <span />
              )}
              {(() => {
                const footerHref =
                  content.footerTargetType === "section" && content.footerSectionTarget
                    ? `#${content.footerSectionTarget}`
                    : content.ctaLink;
                if (!footerHref) return null;
                return (
                  <a
                    href={footerHref}
                    target={footerHref.startsWith("#") ? undefined : "_blank"}
                    rel={footerHref.startsWith("#") ? undefined : "noopener noreferrer"}
                    onClick={(e) => handleLinkClick(e, footerHref)}
                    className={`font-bold underline flex items-center gap-1 shrink-0 transition cursor-pointer ${
                      isDarkCard
                        ? "text-white hover:text-zinc-300"
                        : "text-black hover:text-zinc-600"
                    }`}
                  >
                    <span>{content.ctaText || "Join Meeting in Teams"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
