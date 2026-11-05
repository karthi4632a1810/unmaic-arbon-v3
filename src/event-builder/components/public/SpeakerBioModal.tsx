import React from "react";
import { X, Building2, Award, ExternalLink } from "lucide-react";
import type { SpeakerItem } from "../../types/event";

interface SpeakerBioModalProps {
  speaker: SpeakerItem | null;
  onClose: () => void;
  accentColor?: string;
}

export const SpeakerBioModal: React.FC<SpeakerBioModalProps> = ({
  speaker,
  onClose,
}) => {
  if (!speaker) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-lg bg-zinc-950 text-white rounded-2xl shadow-2xl overflow-hidden border border-zinc-800 animate-in zoom-in-95 duration-200"
        role="dialog"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 rounded-full border border-zinc-700 shadow-sm transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-2/5 relative h-56 sm:h-auto bg-zinc-900 shrink-0">
            <img
              src={speaker.photo || speaker.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500"}
              alt={speaker.name}
              className="w-full h-full object-cover grayscale contrast-125"
            />
            {speaker.featured && (
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white text-black flex items-center gap-1 shadow font-mono">
                <Award className="w-3 h-3" /> Keynote
              </span>
            )}
          </div>

          <div className="p-6 sm:w-3/5 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white leading-tight mb-1">{speaker.name}</h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2 font-mono">
                {speaker.designation || speaker.role}
              </p>

              {speaker.organization && (
                <div className="flex items-center gap-1.5 text-xs text-zinc-300 mb-4 font-medium">
                  <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{speaker.organization}</span>
                </div>
              )}

              <div className="text-xs leading-relaxed text-zinc-400 border-t border-zinc-800/80 pt-3">
                {speaker.bio || "Esteemed faculty member and keynote authority."}
              </div>
            </div>

            {speaker.socialLinks && speaker.socialLinks.length > 0 && (
              <div className="pt-4 border-t border-zinc-800/80 mt-4 flex items-center gap-2">
                <span className="text-xs text-zinc-500 font-medium">Connect:</span>
                {speaker.socialLinks.map((s, i) => (
                  <a
                    key={i}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-medium flex items-center gap-1 capitalize transition border border-zinc-800"
                  >
                    <span>{s.platform}</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
