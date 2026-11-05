import React from "react";
import type { SponsorsContent, EventBranding } from "../../types/event";

interface PublicSponsorsProps {
  content: SponsorsContent;
  branding: EventBranding;
}

export const PublicSponsors: React.FC<PublicSponsorsProps> = ({ content }) => {
  return (
    <section className="py-20 sm:py-24 bg-black text-white border-t border-zinc-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          {content.badge && (
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-px w-8 bg-zinc-800" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-400">
                {content.badge}
              </span>
              <span className="h-px w-8 bg-zinc-800" />
            </div>
          )}
          <h2 className="text-2xl sm:text-3.5xl font-extrabold tracking-tight text-white leading-tight uppercase font-mono">
            {content.heading}
          </h2>
          {content.subtitle && (
            <p className="text-sm sm:text-base text-zinc-400 mt-3 leading-relaxed">
              {content.subtitle}
            </p>
          )}
        </div>

        {/* Tiers */}
        <div className="space-y-12">
          {content.tiers.map((tier) => (
            <div key={tier.id} className="text-center">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-1 rounded-full bg-zinc-900/80 border border-zinc-800">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-300">
                  {tier.name}
                </h3>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6">
                {tier.sponsors.map((sp) => (
                  <a
                    key={sp.id}
                    href={sp.website || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="p-5 sm:p-6 bg-zinc-950 hover:bg-zinc-900/90 rounded-xl border border-zinc-800/80 hover:border-zinc-500 shadow-sm transition-all duration-200 flex items-center justify-center w-48 sm:w-56 h-24 group"
                  >
                    {sp.logo ? (
                      <img
                        src={sp.logo}
                        alt={sp.name}
                        className="max-h-12 max-w-[140px] object-contain filter grayscale contrast-125 opacity-75 group-hover:opacity-100 transition-all duration-300"
                      />
                    ) : (
                      <span className="text-xs sm:text-sm font-bold font-mono text-zinc-300 group-hover:text-white transition tracking-wide text-center">
                        {sp.name}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

