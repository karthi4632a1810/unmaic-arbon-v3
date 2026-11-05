import React, { useState } from "react";
import { Clock, MapPin, User } from "lucide-react";
import type { ScheduleContent, EventBranding } from "../../types/event";

interface PublicScheduleProps {
  content: ScheduleContent;
  branding?: EventBranding;
}

export const PublicSchedule: React.FC<PublicScheduleProps> = ({
  content,
}) => {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const days = content.days || [];
  const currentDay = days[activeDayIndex] || days[0];

  // Extract distinct categories from current day
  const categories = [
    "All",
    ...Array.from(
      new Set(
        currentDay?.items
          ?.map((item) => item.category)
          .filter(Boolean) as string[]
      )
    ),
  ];

  const filteredItems =
    currentDay?.items?.filter((item) => {
      if (selectedCategory === "All") return true;
      return item.category === selectedCategory;
    }) || [];

  return (
    <section className="py-20 sm:py-24 bg-black text-white border-t border-zinc-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
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

        {/* Day Tabs */}
        {content.days && content.days.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {content.days.map((day, idx) => {
              const isActive = idx === activeDayIndex;
              return (
                <button
                  key={day.id || idx}
                  onClick={() => {
                    setActiveDayIndex(idx);
                    setSelectedCategory("All");
                  }}
                  className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm flex flex-col items-center cursor-pointer ${
                    isActive
                      ? "bg-white text-black shadow-lg"
                      : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800"
                  }`}
                >
                  <span className="uppercase tracking-wider">Day {day.dayNumber || idx + 1}</span>
                  <span
                    className={`text-[10px] font-mono mt-0.5 ${
                      isActive ? "text-zinc-700" : "text-zinc-500"
                    }`}
                  >
                    {day.dateLabel}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Category Filter Pills */}
        {categories.length > 2 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1 text-xs font-semibold rounded-full transition font-mono ${
                  selectedCategory === cat
                    ? "bg-white text-black font-bold"
                    : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Timeline Items */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-950 rounded-2xl p-5 sm:p-6 border border-zinc-800 shadow-xl hover:border-zinc-700 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-white text-xs font-bold font-mono">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{item.time}</span>
                  </div>

                  {item.category && (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/20 font-mono uppercase">
                      {item.category}
                    </span>
                  )}

                  {item.room && (
                    <span className="text-xs text-zinc-400 flex items-center gap-1 font-mono">
                      <MapPin className="w-3 h-3 text-zinc-500" />
                      <span>{item.room}</span>
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {item.title}
                </h3>

                {item.description && (
                  <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>

              {item.speaker && (
                <div className="sm:text-right shrink-0 pt-2 sm:pt-0 sm:pl-5 border-t sm:border-t-0 sm:border-l border-zinc-800/80 flex sm:flex-col items-center sm:items-end gap-1.5">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 font-mono">
                    Plenary Lead / Speaker
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{item.speaker}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
