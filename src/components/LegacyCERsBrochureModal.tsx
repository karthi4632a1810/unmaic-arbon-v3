import { useEffect, useState } from "react";
import brochureImg from "../assets/legacy-cers-brochure.png";

type LegacyCERsBrochureModalProps = {
  open: boolean;
  onClose: () => void;
};

export function LegacyCERsBrochureModal({ open, onClose }: LegacyCERsBrochureModalProps) {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const [zoom, setZoom] = useState(false);

  // Smooth enter and exit animation lifecycle
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (open) {
      setMounted(true);
      // Trigger animation on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setActive(true);
        });
      });
      document.body.style.overflow = "hidden";
    } else {
      setActive(false);
      timer = setTimeout(() => {
        setMounted(false);
        setZoom(false);
      }, 250);
      document.body.style.overflow = "";
    }

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && active) {
        onClose();
      }
    };
    if (active) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [active, onClose]);

  if (!mounted) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legacy-cers-modal-title"
      className="fixed inset-0 z-[150] flex items-center justify-center p-2.5 sm:p-5 md:p-8"
    >
      {/* Frosted Glass Backdrop with Smooth Fade */}
      <div
        className={`absolute inset-0 bg-[#070b14]/75 backdrop-blur-md transition-opacity duration-300 ease-out ${
          active ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Dialog Shell with Smooth Scale & Spring Slide Animation */}
      <div
        className={`relative z-10 flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 bg-white shadow-[0_25px_70px_rgba(0,0,0,0.38)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          active
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-95 translate-y-5 opacity-0"
        }`}
      >
        {/* Header Bar */}
        <div className="flex shrink-0 items-center justify-between border-b border-black/[0.08] bg-white/95 px-5 py-4 sm:px-7 backdrop-blur-sm">
          <div className="flex flex-col gap-1 pr-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neutral-800 font-['Space_Mono',monospace]">
                <span className="size-1.5 rounded-full bg-neutral-900 animate-pulse" />
                Article 6 · CDM Registry Guidance
              </span>
              <span className="hidden sm:inline text-xs text-neutral-400 font-medium">
                Deadline: 31 Dec 2026
              </span>
            </div>
            <h3
              id="legacy-cers-modal-title"
              className="text-base sm:text-lg md:text-xl font-bold text-[#131b2e] tracking-tight leading-snug font-['Plus_Jakarta_Sans',sans-serif]"
            >
              Legacy CERs: Reissue Before the Registry Closes
            </h3>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Toggle Zoom View */}
            <button
              type="button"
              onClick={() => setZoom((prev) => !prev)}
              title={zoom ? "Normal view" : "Zoom view"}
              className="inline-flex items-center gap-1.5 rounded-xl border border-black/10 bg-neutral-50 px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-100 hover:border-black/20 active:scale-95 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-3.5"
                aria-hidden
              >
                {zoom ? (
                  <>
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </>
                ) : (
                  <>
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </>
                )}
              </svg>
              <span className="hidden sm:inline">{zoom ? "Reset" : "Zoom"}</span>
            </button>

            {/* Open in New Tab */}
            <a
              href={brochureImg}
              target="_blank"
              rel="noopener noreferrer"
              title="Open full resolution in new tab"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-black/10 bg-neutral-50 px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-100 hover:border-black/20 active:scale-95"
            >
              <span>Full View</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-3.5 opacity-60"
                aria-hidden
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>

            {/* Close Button with ESC label */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="group inline-flex items-center gap-1.5 rounded-xl border border-black/10 bg-neutral-50 p-2 sm:px-3 sm:py-2 text-xs font-medium text-neutral-600 transition hover:bg-black/5 hover:text-black hover:border-black/20 active:scale-95 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4 transition-transform group-hover:rotate-90 duration-200"
                aria-hidden
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              <kbd className="hidden md:inline-block rounded bg-black/5 px-1.5 py-0.5 font-mono text-[9px] text-neutral-400">
                ESC
              </kbd>
            </button>
          </div>
        </div>

        {/* Scrollable Infographic Canvas */}
        <div className="flex-1 overflow-y-auto overscroll-contain bg-neutral-100/70 p-3 sm:p-6 md:p-8 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:18px_18px]">
          <div className="mx-auto flex justify-center transition-all duration-300">
            <div
              className={`relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-md transition-all duration-300 ${
                zoom ? "w-[130%] max-w-none cursor-zoom-out" : "w-full max-w-3xl cursor-zoom-in"
              }`}
              onClick={() => setZoom((prev) => !prev)}
            >
              <img
                src={brochureImg}
                alt="Legacy CERs: Reissue Before the Registry Closes - Infographic & Options"
                className="block h-auto w-full select-none"
                loading="lazy"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* Footer Guidance Bar */}
        <div className="flex shrink-0 flex-col sm:flex-row items-center justify-between gap-3 border-t border-black/[0.08] bg-white px-5 py-3.5 sm:px-7">
          <p className="text-xs text-neutral-500 text-center sm:text-left">
            Need guidance navigating your CER transition? Consult with our climate finance specialists.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://cdm.unfccc.int"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#2b6193] hover:underline underline-offset-2 inline-flex items-center gap-1"
            >
              <span>cdm.unfccc.int</span>
              <span aria-hidden>↗</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-[#131b2e] px-5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-black active:scale-95 cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
