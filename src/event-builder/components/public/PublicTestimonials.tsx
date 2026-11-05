import React from "react";
import { Star, Quote } from "lucide-react";
import type { TestimonialsContent, EventBranding } from "../../types/event";

interface PublicTestimonialsProps {
  content: TestimonialsContent;
  branding?: EventBranding;
}

export const PublicTestimonials: React.FC<PublicTestimonialsProps> = ({
  content,
}) => {
  return (
    <section className="py-20 sm:py-24 bg-black text-white border-t border-zinc-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          {content.badge && (
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-px w-12 bg-white/20" />
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-zinc-400 font-mono">
                {content.badge}
              </span>
              <span className="h-px w-12 bg-white/20" />
            </div>
          )}
          <h2 className="display-head text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight uppercase">
            {content.heading}
          </h2>
          {content.subtitle && (
            <p className="text-sm sm:text-base text-zinc-400 mt-3 leading-relaxed">
              {content.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.items.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-950 rounded-2xl p-6 sm:p-7 border border-zinc-800 shadow-xl flex flex-col justify-between hover:border-zinc-700 transition"
            >
              <div>
                <div className="flex items-center gap-1 text-white mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-white" />
                  ))}
                </div>
                <div className="relative mb-6">
                  <Quote className="w-8 h-8 text-zinc-800 absolute -top-3 -left-2 -z-0 opacity-60" />
                  <p className="relative z-10 text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                    "{item.quote}"
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-zinc-800/80">
                <img
                  src={
                    item.photo ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200"
                  }
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-zinc-700 grayscale contrast-125"
                />
                <div>
                  <h4 className="text-sm font-bold text-white leading-snug">
                    {item.name}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5 font-mono">
                    {item.role} {item.organization ? `• ${item.organization}` : ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
