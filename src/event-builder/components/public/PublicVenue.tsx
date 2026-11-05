import React from "react";
import { MapPin, Phone, Mail, Navigation, Hotel } from "lucide-react";
import type { VenueContent, EventBranding } from "../../types/event";

interface PublicVenueProps {
  content: VenueContent;
  branding?: EventBranding;
}

export const PublicVenue: React.FC<PublicVenueProps> = ({ content }) => {
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
          <p className="text-sm sm:text-base text-zinc-400 mt-3 font-mono">
            {content.venueName} • {content.city}, {content.country}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-zinc-950 rounded-2xl p-6 sm:p-7 border border-zinc-800 shadow-xl space-y-5">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-white border border-white/20 flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white uppercase tracking-tight">{content.venueName}</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed">
                    {content.address}
                  </p>
                </div>
              </div>

              {(content.contactPhone || content.contactEmail) && (
                <div className="pt-4 border-t border-zinc-800/80 space-y-2.5">
                  {content.contactPhone && (
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-300 font-mono">
                      <Phone className="w-4 h-4 text-zinc-500 shrink-0" />
                      <span>{content.contactPhone}</span>
                    </div>
                  )}
                  {content.contactEmail && (
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-300 font-mono">
                      <Mail className="w-4 h-4 text-zinc-500 shrink-0" />
                      <span>{content.contactEmail}</span>
                    </div>
                  )}
                </div>
              )}

              {content.travelNotes && (
                <div className="pt-4 border-t border-zinc-800/80 flex items-start gap-3 text-xs text-zinc-400 leading-relaxed">
                  <Navigation className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <span>{content.travelNotes}</span>
                </div>
              )}
            </div>

            {/* Nearby Hotels */}
            {content.nearbyHotels && content.nearbyHotels.length > 0 && (
              <div className="bg-zinc-950 rounded-2xl p-6 border border-zinc-800 shadow-xl">
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-3 font-mono">
                  <Hotel className="w-4 h-4 text-white" />
                  <span>Partner Accommodations</span>
                </div>
                <ul className="space-y-2">
                  {content.nearbyHotels.map((hotel, idx) => (
                    <li
                      key={idx}
                      className="text-xs sm:text-sm text-zinc-300 flex items-center justify-between py-1.5 border-b border-zinc-800/80 last:border-0"
                    >
                      <span className="font-medium">{hotel}</span>
                      <span className="text-[10px] text-zinc-400 font-mono uppercase bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
                        Delegate Rate
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Interactive Map Embed */}
          <div className="lg:col-span-7 h-[380px] sm:h-[440px] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900 grayscale contrast-125">
            {content.mapEmbedUrl ? (
              <iframe
                src={content.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Venue Map"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500 p-6 text-center">
                <MapPin className="w-10 h-10 mb-2 opacity-50" />
                <p className="text-sm font-semibold text-white">{content.venueName}</p>
                <p className="text-xs text-zinc-400 mt-1">{content.address}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
