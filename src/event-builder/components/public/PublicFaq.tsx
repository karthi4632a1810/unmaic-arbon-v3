import React, { useState } from "react";
import { ChevronDown, HelpCircle, Search } from "lucide-react";
import type { FAQContent, EventBranding } from "../../types/event";

interface PublicFaqProps {
  content: FAQContent;
  branding?: EventBranding;
}

export const PublicFaq: React.FC<PublicFaqProps> = ({ content }) => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    [content.items[0]?.id || ""]: true,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const toggle = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredItems = content.items.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-20 sm:py-24 bg-black text-white border-t border-zinc-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
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

          {/* Quick FAQ Search */}
          {content.items.length > 3 && (
            <div className="mt-6 max-w-md mx-auto relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search inquiries (e.g. Article 6, Decision 4/CMP.20, visas)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-zinc-900 border border-zinc-800 text-white rounded-full focus:outline-none focus:border-white transition placeholder:text-zinc-500 font-mono"
              />
            </div>
          )}
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {filteredItems.map((item) => {
            const isOpen = !!openIds[item.id];
            return (
              <div
                key={item.id}
                className="border border-zinc-800 bg-zinc-950 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(item.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 bg-zinc-950 hover:bg-zinc-900 transition cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base text-white flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-zinc-400 shrink-0" />
                    <span>{item.question}</span>
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 bg-zinc-900 border border-zinc-800 text-white ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-850 bg-zinc-900/30 animate-in fade-in duration-150">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="text-center py-8 text-sm text-zinc-400 font-mono">
              No matching questions found for "{searchQuery}".
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
