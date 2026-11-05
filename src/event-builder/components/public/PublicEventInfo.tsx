import React from "react";
import { Calendar, Clock, MapPin, Building, Award } from "lucide-react";
import type { EventInfoContent, EventBranding } from "../../types/event";

interface PublicEventInfoProps {
  content: EventInfoContent;
  branding?: EventBranding;
}

export const PublicEventInfo: React.FC<PublicEventInfoProps> = ({ content }) => {
  return (
    <section className="relative z-20 -mt-10 sm:-mt-12 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="bg-zinc-950/95 text-white rounded-2xl shadow-2xl border border-zinc-800 p-5 sm:p-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center divide-y sm:divide-y-0 sm:divide-x divide-zinc-800/80 backdrop-blur-md">
        {/* Date */}
        <div className="flex items-start gap-3.5 pt-3 sm:pt-0">
          <div className="w-11 h-11 rounded-xl bg-white/10 text-white border border-white/20 flex items-center justify-center shrink-0 shadow-sm">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 font-mono">Date</div>
            <div className="text-sm sm:text-base font-bold text-white mt-0.5">{content.dateLabel}</div>
            <div className="text-xs text-zinc-400 mt-0.5 font-mono">{content.timeLabel}</div>
          </div>
        </div>

        {/* Time / Sessions */}
        <div className="flex items-start gap-3.5 pt-4 sm:pt-0 sm:pl-6">
          <div className="w-11 h-11 rounded-xl bg-white/10 text-white border border-white/20 flex items-center justify-center shrink-0 shadow-sm">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 font-mono">Schedule</div>
            <div className="text-sm sm:text-base font-bold text-white mt-0.5">{content.timeLabel}</div>
            {content.badge && (
              <span className="inline-block mt-1 text-[10px] font-semibold text-white bg-white/10 border border-white/20 px-2 py-0.5 rounded font-mono">
                {content.badge}
              </span>
            )}
          </div>
        </div>

        {/* Venue */}
        <div className="flex items-start gap-3.5 pt-4 sm:pt-0 sm:pl-6">
          <div className="w-11 h-11 rounded-xl bg-white/10 text-white border border-white/20 flex items-center justify-center shrink-0 shadow-sm">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 font-mono">Location</div>
            <div className="text-sm sm:text-base font-bold text-white mt-0.5 leading-snug">
              {content.venueName}
            </div>
            <div className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{content.locationLabel}</div>
          </div>
        </div>

        {/* Organizer */}
        <div className="flex items-start gap-3.5 pt-4 sm:pt-0 sm:pl-6">
          <div className="w-11 h-11 rounded-xl bg-white/10 text-white border border-white/20 flex items-center justify-center shrink-0 shadow-sm">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 font-mono">Organized By</div>
            <div className="text-sm sm:text-base font-bold text-white mt-0.5 leading-snug">
              {content.organizerName}
            </div>
            <div className="text-xs text-zinc-400 mt-0.5 flex items-center gap-1 font-mono">
              <Award className="w-3 h-3 text-zinc-400" />
              <span>Official Secretariat</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
