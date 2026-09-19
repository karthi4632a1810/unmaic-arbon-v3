import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CounterSection } from "./CounterSection";

export function CdmCountdownPage() {
  const [searchParams] = useSearchParams();
  const isEmbed = searchParams.get("embed") === "true";
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = "CDM Registry Closure Countdown | UNMAI Carbon Solutions";

    let metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute("content") : "";
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Live countdown to the CDM Registry closure on 31 December 2026. Explore transition options for legacy CERs under Article 6 with UNMAI Carbon Solutions."
      );
    }

    return () => {
      document.title = originalTitle;
      if (metaDesc && originalDesc) {
        metaDesc.setAttribute("content", originalDesc);
      }
    };
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback if clipboard API is restricted
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Embed mode: zero extra chrome, minimal padding, ideal for iframes or LinkedIn widgets
  if (isEmbed) {
    return (
      <main className="min-h-screen w-full bg-[#09090b] text-white flex items-center justify-center p-2 sm:p-4 overflow-hidden">
        <CounterSection standalone />
      </main>
    );
  }

  // Standalone dedicated page mode
  return (
    <div className="relative min-h-screen w-full bg-[#09090b] text-white flex flex-col justify-between selection:bg-white/20 selection:text-white">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,255,255,0.07), transparent 70%), radial-gradient(ellipse 60% 40% at 50% 110%, rgba(255,255,255,0.04), transparent 70%)",
        }}
        aria-hidden
      />

      {/* Top Utility Bar for LinkedIn Readers */}
      <header className="relative z-10 w-full border-b border-white/[0.08] bg-[#09090b]/80 backdrop-blur-md px-4 py-3 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1216px] items-center justify-between gap-4">
          {/* Brand Logo & Name */}
          <Link
            to="/"
            className="group flex items-center gap-3 text-white/90 transition hover:text-white"
            title="UNMAI Carbon Solutions Homepage"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/5 p-1.5 transition-colors group-hover:border-white/40 group-hover:bg-white/10">
              <img src="/logo-w.png" alt="UNMAI" className="size-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold tracking-tight text-white">
                UNMAI Carbon Solutions
              </span>
              <span className="font-['Space_Mono',monospace] text-[10px] text-white/50 tracking-wider">
                CLIMATE INFRASTRUCTURE
              </span>
            </div>
          </Link>

          {/* Action Buttons: Share, Copy Link, Visit Website */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Share on LinkedIn Button */}
            <button
              type="button"
              onClick={handleShareLinkedIn}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm transition-all duration-200 hover:border-white/35 hover:bg-white/[0.12] hover:text-white active:scale-95 cursor-pointer"
              title="Share on LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-3.5 text-[#0a66c2]"
                aria-hidden
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.62 1.62 0 0 0-1.62 1.62c0 .89.73 1.62 1.62 1.62.89 0 1.62-.73 1.62-1.62 0-.89-.73-1.62-1.62-1.62Z" />
              </svg>
              <span className="hidden sm:inline">Share</span>
            </button>

            {/* Copy Page Link */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm transition-all duration-200 hover:border-white/35 hover:bg-white/[0.12] hover:text-white active:scale-95 cursor-pointer"
              title="Copy link to clipboard"
            >
              {copied ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-3.5 text-emerald-400"
                    aria-hidden
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-emerald-300 font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-3.5 text-white/70"
                    aria-hidden
                  >
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                  <span>Copy Link</span>
                </>
              )}
            </button>

            {/* Visit Main Website */}
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-neutral-900 transition-all duration-200 hover:bg-neutral-200 active:scale-95 shadow-[0_0_20px_-4px_rgba(255,255,255,0.4)]"
            >
              <span className="hidden xs:inline">Main Website</span>
              <span className="xs:hidden">Home</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area: Centered Counter */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="w-full">
          <CounterSection standalone />
        </div>
      </main>

      {/* Minimal Discreet Footer */}
      <footer className="relative z-10 w-full border-t border-white/[0.08] bg-[#09090b]/80 backdrop-blur-md px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-[1216px] flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left font-['Space_Mono',monospace] text-[10px] text-white/40">
          <div>
            <span>UNMAI CARBON SOLUTIONS · SINGAPORE · </span>
            <a
              href="https://unmaicarbon.earth"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70 underline underline-offset-2"
            >
              UNMAICARBON.EARTH
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-white/70 transition">
              About
            </Link>
            <span>·</span>
            <Link to="/services" className="hover:text-white/70 transition">
              Services
            </Link>
            <span>·</span>
            <Link to="/digital-infrastructure" className="hover:text-white/70 transition">
              Infrastructure
            </Link>
            <span>·</span>
            <Link to="/contact" className="hover:text-white/70 transition">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CdmCountdownPage;
