import { useEffect, useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { LegacyCERsBrochureModal } from "./LegacyCERsBrochureModal";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Target: 31 December 2026, 23:59:59 UTC
const TARGET_DATE_MS = Date.UTC(2026, 11, 31, 23, 59, 59);

function calculateTimeLeft(): TimeLeft {
  const diff = Math.max(0, TARGET_DATE_MS - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function CounterSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);
  const [brochureOpen, setBrochureOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <>
      <section className="w-full bg-white py-14 sm:py-20 px-4 sm:px-6 relative border-t border-black/5">
        <ScrollReveal>
          <div className="mx-auto flex flex-col items-center max-w-[760px] w-full">
            {/* Top Status Bar (Figma theme) */}
            <div className="flex w-full items-center justify-between opacity-40 font-['Space_Mono',monospace] text-[9px] sm:text-[10px] tracking-wider text-black select-none">
              <div className="flex items-center gap-3 sm:gap-6">
                <span>MRV · VERIFIED</span>
                <span className="hidden xs:inline">ARTICLE 6 · READINESS FRAMEWORK</span>
              </div>
              <div className="text-right">
                <span>CLIMATE FINANCE: ACTIVE</span>
              </div>
            </div>

            {/* Client Headline & Subtext */}
            <div className="w-full text-center mt-6 mb-3 space-y-2">
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xl xs:text-2xl sm:text-3xl text-[#131b2e] tracking-tight leading-snug uppercase">
                YOUR CERs HAVE A DEADLINE. YOUR NEXT MOVE MATTERS.
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 font-medium max-w-xl mx-auto">
                Know your options before the CDM Registry closes.
              </p>
            </div>

            {/* Center Counter Grid (Figma design) */}
            <div className="w-full pt-3">
              <div className="w-full border-y border-black/10 py-6 sm:py-8">
                <div className="grid grid-cols-4 items-center justify-items-center w-full">
                  {/* DAYS */}
                  <div className="flex flex-col items-center">
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-4xl sm:text-6xl md:text-[72px] leading-none text-[#0a0a0a] tracking-tight">
                      {pad(timeLeft.days)}
                    </span>
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[9px] sm:text-[10px] tracking-[2.25px] uppercase text-black/35 mt-2.5 sm:mt-3">
                      DAYS
                    </span>
                  </div>

                  {/* HOURS */}
                  <div className="flex flex-col items-center">
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-4xl sm:text-6xl md:text-[72px] leading-none text-[#0a0a0a] tracking-tight">
                      {pad(timeLeft.hours)}
                    </span>
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[9px] sm:text-[10px] tracking-[2.25px] uppercase text-black/35 mt-2.5 sm:mt-3">
                      HOURS
                    </span>
                  </div>

                  {/* MINUTES */}
                  <div className="flex flex-col items-center">
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-4xl sm:text-6xl md:text-[72px] leading-none text-[#0a0a0a] tracking-tight">
                      {pad(timeLeft.minutes)}
                    </span>
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[9px] sm:text-[10px] tracking-[2.25px] uppercase text-black/35 mt-2.5 sm:mt-3">
                      MINUTES
                    </span>
                  </div>

                  {/* SECONDS */}
                  <div className="flex flex-col items-center">
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-4xl sm:text-6xl md:text-[72px] leading-none text-[#0a0a0a] tracking-tight">
                      {pad(timeLeft.seconds)}
                    </span>
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[9px] sm:text-[10px] tracking-[2.25px] uppercase text-black/35 mt-2.5 sm:mt-3">
                      SECONDS
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Target Date Note & Interactive CTA Button */}
            <div className="flex flex-col items-center mt-7 gap-3">
              <button
                type="button"
                onClick={() => setBrochureOpen(true)}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#131b2e] px-8 py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg shadow-[#131b2e]/15 transition-all duration-300 hover:bg-black hover:shadow-xl hover:shadow-[#131b2e]/25 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer"
              >
                {/* Subtle sheen on hover */}
                <span
                  className="pointer-events-none absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full transition-transform duration-1000 group-hover:translate-x-[300%]"
                  aria-hidden
                />
                <span>Find Out What’s Next</span>
                <span
                  className="inline-flex size-6 items-center justify-center rounded-full bg-white/10 text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:bg-white/20"
                  aria-hidden
                >
                  →
                </span>
              </button>
              <span className="font-['Space_Mono',monospace] text-[10px] sm:text-[11px] text-neutral-400">
                Countdown to CDM Registry Closure: 31 December 2026
              </span>
            </div>

            {/* Bottom Footer Info (Figma theme) */}
            <div className="w-full pt-8 mt-2">
              <div className="flex w-full items-center justify-between opacity-30 font-['Space_Mono',monospace] text-[9px] sm:text-[10px] tracking-wider text-black select-none border-t border-black/5 pt-4">
                <span>UNMAI CARBON · SINGAPORE</span>
                <span>UNMAICARBON.EARTH</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Smooth Animated Brochure Infographic Modal */}
      <LegacyCERsBrochureModal
        open={brochureOpen}
        onClose={() => setBrochureOpen(false)}
      />
    </>
  );
}

export default CounterSection;
