import React from "react";
import { MapPin, Phone } from "lucide-react";
import type { VenueContent } from "../../../types/event";
import { CollapsibleGroup } from "./CollapsibleGroup";
import { ImageUploadField } from "./ImageUploadField";
import { AutoResizeTextarea } from "./AutoResizeTextarea";

interface VenueEditorProps {
  content: VenueContent;
  onChange: (updated: VenueContent) => void;
}

export const VenueEditor: React.FC<VenueEditorProps> = ({ content, onChange }) => {
  const handleUpdate = (fields: Partial<VenueContent>) => {
    onChange({ ...content, ...fields });
  };

  return (
    <div className="space-y-3.5 text-xs text-zinc-900 pb-10 font-sans">
      {/* 1. VENUE & LOCATION */}
      <CollapsibleGroup
        title="Venue & Location"
        subtitle={`${content.venueName || "Venue"} • ${content.city || "City"}`}
        icon={<MapPin className="w-3.5 h-3.5 text-rose-500" />}
        badge="LOCATION"
        defaultOpen={true}
      >
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">
            Venue Name
          </span>
          <input
            type="text"
            value={content.venueName}
            onChange={(e) => handleUpdate({ venueName: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 font-bold text-xs bg-white focus:outline-none focus:border-black"
          />
        </div>

        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">
            Complete Physical Address
          </span>
          <AutoResizeTextarea
            minRows={2}
            value={content.address}
            onChange={(e) => handleUpdate({ address: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 text-xs bg-white focus:outline-none focus:border-black"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="block text-[11px] font-semibold text-zinc-600 mb-1">City</span>
            <input
              type="text"
              value={content.city}
              onChange={(e) => handleUpdate({ city: e.target.value })}
              className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-200 text-xs font-semibold bg-white focus:outline-none focus:border-black"
            />
          </div>
          <div>
            <span className="block text-[11px] font-semibold text-zinc-600 mb-1">Country</span>
            <input
              type="text"
              value={content.country}
              onChange={(e) => handleUpdate({ country: e.target.value })}
              className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-200 text-xs font-semibold bg-white focus:outline-none focus:border-black"
            />
          </div>
        </div>

        <div>
          <ImageUploadField
            label="Venue Exterior / Hall Photo"
            value={content.venueImage || ""}
            onChange={(url) => handleUpdate({ venueImage: url })}
            folder="venue"
            placeholder="https://images.unsplash.com/..."
            aspectRatio="wide"
            helperText="Uploads to public/uploads/venue via PHP"
          />
        </div>
      </CollapsibleGroup>

      {/* 2. MAP & CONTACT */}
      <CollapsibleGroup
        title="Map Embed & Contact"
        subtitle={content.contactEmail || "Contact Details"}
        icon={<Phone className="w-3.5 h-3.5 text-emerald-500" />}
        badge="CONTACT"
        defaultOpen={false}
      >
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1 font-mono">
            Google Maps Embed URL (iframe src)
          </span>
          <input
            type="text"
            placeholder="https://www.google.com/maps/embed?pb=..."
            value={content.mapEmbedUrl || ""}
            onChange={(e) => handleUpdate({ mapEmbedUrl: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 text-xs font-mono bg-white focus:outline-none focus:border-black"
          />
          <p className="text-[10px] text-zinc-400 mt-1 font-mono">
            Copy src from Google Maps &gt; Share &gt; Embed a map.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-zinc-100">
          <div>
            <span className="block text-[11px] font-semibold text-zinc-600 mb-1">
              Contact Phone
            </span>
            <input
              type="text"
              value={content.contactPhone || ""}
              onChange={(e) => handleUpdate({ contactPhone: e.target.value })}
              className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-200 text-xs bg-white focus:outline-none focus:border-black"
            />
          </div>
          <div>
            <span className="block text-[11px] font-semibold text-zinc-600 mb-1">
              Contact Email
            </span>
            <input
              type="email"
              value={content.contactEmail || ""}
              onChange={(e) => handleUpdate({ contactEmail: e.target.value })}
              className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-200 text-xs bg-white focus:outline-none focus:border-black"
            />
          </div>
        </div>
      </CollapsibleGroup>
    </div>
  );
};
