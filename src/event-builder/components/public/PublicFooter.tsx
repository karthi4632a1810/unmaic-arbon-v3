import React from "react";
import { ArrowUp, Sparkles } from "lucide-react";
import type { EventFooter, EventBranding } from "../../types/event";

interface PublicFooterProps {
  footer: EventFooter;
  branding?: EventBranding;
  eventName: string;
  forceRender?: boolean;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({
  footer,
  eventName,
  forceRender = false,
}) => {
  if (!footer.visible && !forceRender) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace(/^#/, "");
      const elem =
        document.getElementById(targetId) ||
        document.querySelector(`[data-section-id="${targetId}"]`);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const customBg = footer.backgroundColor && footer.backgroundColor !== "transparent" ? footer.backgroundColor : undefined;
  const customTextColor = footer.textColor || undefined;
  const showBackToTop = footer.showBackToTop !== false;
  const showBrandBadge = footer.showBrandBadge !== false;
  const showDisclaimer = footer.showDisclaimer !== false;
  const showQuickLinks = footer.showQuickLinks !== false;
  const organizationName = footer.organizationName || "UNMAI Carbon Solutions Pte. Ltd. (Singapore)";
  const brandBadgeText = footer.brandBadgeText || "UNMAI Carbon High-Integrity Architecture";

  return (
    <footer
      data-custom-bg={customBg ? "true" : undefined}
      style={{
        backgroundColor: customBg || undefined,
        color: customTextColor || undefined,
      }}
      className={`border-t border-zinc-900 pt-16 pb-12 font-['Space_Grotesk',sans-serif] ${
        customBg ? "" : "bg-black text-white"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12 border-b border-zinc-800/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center font-black text-base shadow font-mono">
              {eventName[0] || "U"}
            </div>
            <div>
              <div className="font-bold text-base text-white tracking-tight uppercase">{eventName}</div>
              <div className="text-xs text-zinc-400 font-mono">{organizationName}</div>
            </div>
          </div>

          {/* Quick Links */}
          {showQuickLinks && footer.quickLinks && footer.quickLinks.length > 0 && (
            <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-medium text-zinc-400 font-mono">
              {footer.quickLinks.map((link, idx) => {
                const href =
                  link.targetType === "section" && link.sectionTarget
                    ? `#${link.sectionTarget}`
                    : link.link;
                const isAnchor = href && href.startsWith("#");

                return (
                  <a
                    key={idx}
                    href={href}
                    onClick={(e) => handleLinkClick(e, href)}
                    target={isAnchor ? undefined : "_blank"}
                    rel={isAnchor ? undefined : "noopener noreferrer"}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          )}

          {/* Back to Top */}
          {showBackToTop && (
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-mono border border-zinc-800 transition cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 text-center sm:text-left font-mono">
          <div>
            <p>{footer.copyrightText || `© 2026 UNMAI Carbon Solutions Pte. Ltd. All rights reserved.`}</p>
            {showDisclaimer && footer.disclaimer && (
              <p className="text-[11px] text-zinc-500 mt-1">{footer.disclaimer}</p>
            )}
          </div>

          {showBrandBadge && (
            <div className="flex items-center gap-2 text-zinc-400">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>{brandBadgeText}</span>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};
