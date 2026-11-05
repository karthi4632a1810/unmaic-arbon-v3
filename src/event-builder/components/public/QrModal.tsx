import React, { useState } from "react";
import { X, Copy, Check, Download, QrCode } from "lucide-react";

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventUrl: string;
  eventName: string;
}

export const QrModal: React.FC<QrModalProps> = ({
  isOpen,
  onClose,
  eventUrl,
  eventName,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Use a reliable, fast SVG QR generator API
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(
    eventUrl
  )}&format=svg`;

  const handleCopy = () => {
    navigator.clipboard.writeText(eventUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    window.open(qrApiUrl, "_blank");
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
          <QrCode className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-white tracking-tight uppercase">Event QR Code</h3>
        <p className="text-xs text-zinc-400 mt-1 mb-4 truncate px-2 font-mono">{eventName}</p>

        {/* QR container */}
        <div className="p-4 bg-white rounded-2xl inline-block mx-auto mb-4 shadow-xl border border-zinc-200">
          <img
            src={qrApiUrl}
            alt="Event QR Code"
            className="w-48 h-48 mx-auto rounded-lg"
          />
        </div>

        <p className="text-xs text-zinc-400 mb-4 font-mono">
          Scan with mobile camera to access event credentials.
        </p>

        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 py-2 px-3 text-xs font-semibold rounded-full border border-zinc-700 hover:bg-zinc-900 text-zinc-200 flex items-center justify-center gap-1.5 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied!" : "Copy Link"}</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 py-2 px-3 text-xs font-bold rounded-full bg-white hover:bg-zinc-200 text-black flex items-center justify-center gap-1.5 transition shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Download SVG
          </button>
        </div>
      </div>
    </div>
  );
};
