import React from "react";
import { Check, Ticket, ArrowRight, ShieldCheck } from "lucide-react";
import type { RegistrationContent, TicketTier, EventBranding } from "../../types/event";

interface PublicRegistrationProps {
  content: RegistrationContent;
  branding?: EventBranding;
  onSelectTier?: (tier: TicketTier) => void;
  onOpenModal?: () => void;
}

export const PublicRegistration: React.FC<PublicRegistrationProps> = ({
  content,
}) => {
  const tiers = content.tiers || [];

  const scrollToSection = (target?: string) => {
    if (!target) return;
    const id = target.replace(/^#/, "");
    const el =
      document.getElementById(id) ||
      document.querySelector(`[data-section-id="${id}"]`) ||
      document.getElementById(`sec_${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleTierAction = (tier: TicketTier) => {
    const url = content.externalUrl || content.linkUrl;
    if (content.ctaType === "section") {
      scrollToSection(content.ctaSectionTarget);
    } else if (content.ctaType === "whatsapp" && content.whatsappNumber) {
      const msg = encodeURIComponent(`Hi, I'm interested in registering for the ${tier.name} pass.`);
      window.open(`https://wa.me/${content.whatsappNumber}?text=${msg}`, "_blank", "noopener,noreferrer");
    } else if (content.ctaType === "email" && content.emailContact) {
      window.location.href = `mailto:${content.emailContact}?subject=Event Registration: ${tier.name}`;
    } else if (url) {
      if (url.startsWith("#")) scrollToSection(url);
      else window.open(url, "_blank", "noopener,noreferrer");
    } else if (content.ctaSectionTarget) {
      scrollToSection(content.ctaSectionTarget);
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-black text-white relative overflow-hidden border-t border-zinc-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          {content.badge && (
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-px w-12 bg-white/20" />
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-zinc-400 font-mono">
                <Ticket className="w-3.5 h-3.5 text-white" />
                <span>{content.badge}</span>
              </span>
              <span className="h-px w-12 bg-white/20" />
            </div>
          )}
          <h2 className="display-head text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight uppercase">
            {content.heading}
          </h2>

          {(() => {
            const rawText = content.description ?? content.subtitle ?? "";
            if (!rawText.trim()) return null;

            const lines = rawText
              .split("\n")
              .map((l) => l.trim())
              .filter(Boolean);

            const hasTrailingNewline = rawText.endsWith("\n");

            if (lines.length > 0 || hasTrailingNewline) {
              return (
                <div className="mt-5 max-w-2xl mx-auto flex flex-col items-center">
                  <ul className="space-y-2.5 text-left inline-flex flex-col">
                    {lines.map((line, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300 font-medium"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0 shadow-[0_0_8px_rgba(255,255,255,0.9)] ring-2 ring-white/20" />
                        <span className="leading-relaxed">
                          {line.replace(/^[-•*]\s*/, "")}
                        </span>
                      </li>
                    ))}
                    {hasTrailingNewline && (
                      <li className="flex items-start gap-3 text-xs sm:text-sm text-zinc-400 font-medium animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/60 mt-2 shrink-0 shadow-[0_0_8px_rgba(255,255,255,0.5)] ring-2 ring-white/20" />
                        <span className="leading-relaxed italic opacity-70">
                          (Type next point...)
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              );
            }

            return null;
          })()}
        </div>

        {/* Pricing Tiers Grid */}
        <div
          className={`grid gap-6 sm:gap-8 items-stretch ${
            tiers.length === 1
              ? "max-w-md mx-auto grid-cols-1"
              : tiers.length === 2
              ? "max-w-3xl mx-auto grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {tiers.map((tier) => {
            const isRecommended = tier.recommended;

            return (
              <div
                key={tier.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isRecommended
                    ? "bg-zinc-900 border-2 border-white shadow-[0_0_50px_-15px_rgba(255,255,255,0.2)] scale-[1.02] z-10"
                    : "bg-zinc-950 border border-zinc-800 hover:border-zinc-700 shadow-xl"
                }`}
              >
                {isRecommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase bg-white text-black shadow-md font-mono">
                    RECOMMENDED DELEGATION
                  </div>
                )}

                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white uppercase tracking-tight">{tier.name}</h3>
                      {tier.description && (
                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed whitespace-pre-line">{tier.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="my-6 pb-6 border-b border-zinc-800">
                    <span className="text-3.5xl sm:text-4xl font-bold text-white tracking-tight font-mono">
                      {tier.price}
                    </span>
                    <span className="text-xs text-zinc-500 ml-2 font-mono uppercase">/ credential</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                        <div className="w-4 h-4 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0 mt-0.5 border border-white/20">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <button
                    onClick={() => handleTierAction(tier)}
                    className={`w-full py-3.5 px-5 rounded-full font-bold text-xs sm:text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2 active:scale-95 cursor-pointer ${
                      isRecommended
                        ? "bg-white text-black hover:bg-zinc-200"
                        : "bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700"
                    }`}
                  >
                    <span>{tier.buttonText || "Choose Pass"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-center text-zinc-500 mt-3 flex items-center justify-center gap-1 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                    Verified Sovereign & Institutional Access
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
