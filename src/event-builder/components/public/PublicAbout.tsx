import React from "react";
import type { AboutContent, EventBranding } from "../../types/event";

interface PublicAboutProps {
  content: AboutContent;
  branding?: EventBranding;
}

export const PublicAbout: React.FC<PublicAboutProps> = ({ content }) => {
  const isImageLeft = content.layout === "image-text";
  const isCentered = content.layout === "centered";

  return (
    <section className="py-20 sm:py-24 bg-black text-white relative border-t border-zinc-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {isCentered ? (
          <div className="text-center max-w-3xl mx-auto">
            {content.badge && (
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="h-px w-12 bg-white/20" />
                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-zinc-400 font-mono">
                  {content.badge}
                </span>
                <span className="h-px w-12 bg-white/20" />
              </div>
            )}
            <h2 className="display-head text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-6 leading-tight uppercase">
              {content.heading}
            </h2>
            <div
              className="text-base sm:text-lg text-zinc-300 leading-relaxed space-y-4 mb-8 text-left sm:text-center font-normal"
              dangerouslySetInnerHTML={{ __html: content.richTextHtml }}
            />
            {content.imageUrl && (
              <div className="mt-8 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800">
                <img
                  src={content.imageUrl}
                  alt={content.heading}
                  className="w-full h-80 sm:h-96 object-cover grayscale contrast-125"
                />
                {content.imageCaption && (
                  <p className="text-xs text-zinc-400 py-2.5 bg-zinc-950 border-t border-zinc-850 font-mono">
                    {content.imageCaption}
                  </p>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Image Column */}
            <div
              className={`lg:col-span-5 ${isImageLeft ? "order-1" : "order-1 lg:order-2"}`}
            >
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 bg-zinc-900">
                  <img
                    src={
                      content.imageUrl ||
                      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800"
                    }
                    alt={content.heading}
                    className="w-full h-[360px] sm:h-[440px] object-cover grayscale contrast-125"
                  />
                  {content.imageCaption && (
                    <div className="p-3 bg-zinc-950/95 backdrop-blur text-xs text-zinc-400 border-t border-zinc-800 font-mono">
                      {content.imageCaption}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div
              className={`lg:col-span-7 ${isImageLeft ? "order-2" : "order-2 lg:order-1"}`}
            >
              {content.badge && (
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-zinc-400 font-mono">
                    {content.badge}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="h-px w-16 bg-white/20" />
                    <svg viewBox="0 0 10 10" className="size-2 text-zinc-400" fill="currentColor">
                      <rect x="5" y="0" width="7" height="7" rx="1" transform="rotate(45 5 0)" />
                    </svg>
                  </div>
                </div>
              )}
              <h2 className="display-head text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-6 leading-snug uppercase">
                {content.heading}
              </h2>
              <div
                className="text-sm sm:text-base text-zinc-300 leading-relaxed space-y-4 font-normal"
                dangerouslySetInnerHTML={{ __html: content.richTextHtml }}
              />

              {/* Stats Bar */}
              {content.stats && content.stats.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 mt-8 border-t border-zinc-800">
                  {content.stats.map((stat, i) => (
                    <div key={i} className="p-3 rounded-xl bg-zinc-950 border border-zinc-900">
                      <div className="display-figure text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
                        {stat.value}
                      </div>
                      <div className="text-[10px] font-semibold text-zinc-400 mt-1 uppercase tracking-wider font-mono">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
