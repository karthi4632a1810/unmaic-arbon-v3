import React, { useState } from "react";
import { X, Copy, Check, Share2, MessageCircle, Send } from "lucide-react";

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventUrl: string;
  eventName: string;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  isOpen,
  onClose,
  eventUrl,
  eventName,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const encodedUrl = encodeURIComponent(eventUrl);
  const encodedText = encodeURIComponent(`UNMAI Carbon: ${eventName}`);

  const shareLinks = [
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Share2,
    },
    {
      name: "X (Twitter)",
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      icon: Send,
    },
    {
      name: "WhatsApp",
      url: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
      icon: MessageCircle,
    },
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Share2,
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(eventUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-sm bg-zinc-950 text-white rounded-2xl shadow-2xl p-6 text-center border border-zinc-800 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-900 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 bg-white/10 text-white rounded-full flex items-center justify-center mx-auto mb-3 border border-white/20">
          <Share2 className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-white tracking-tight uppercase">Share Briefing</h3>
        <p className="text-xs text-zinc-400 mt-1 mb-5 truncate px-2 font-mono">{eventName}</p>

        <div className="grid grid-cols-2 gap-2.5 mb-5">
          {shareLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold shadow-sm transition bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 hover:border-zinc-700"
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2 p-1.5 bg-zinc-900 border border-zinc-800 rounded-xl">
          <input
            type="text"
            readOnly
            value={eventUrl}
            className="w-full text-xs bg-transparent px-2 text-zinc-300 outline-none truncate font-mono"
          />
          <button
            onClick={handleCopy}
            className="shrink-0 px-3 py-1.5 text-xs font-semibold bg-white text-black hover:bg-zinc-200 rounded-lg transition flex items-center gap-1 shadow-sm font-bold"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
