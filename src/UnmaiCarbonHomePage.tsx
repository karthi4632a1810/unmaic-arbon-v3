import { useLayoutEffect, useRef, useState } from "react";
import { SiteCta } from "./components/SiteCta";
import { SiteFooter } from "./components/SiteFooter";
import { ScheduleConsultationModal } from "./components/ScheduleConsultationModal";
import { SiteHeader } from "./components/SiteHeader";
import { HeroSection } from "./components/HeroSection";
import {
  CredentialStrip,
  DigitalInfrastructureSection,
  PressReleasesSection,
  StrategicServicesSection,
  TrustMetricsSection,
} from "./components/HomeSections";
import "./App.css";

/**
 * Below `lg` the header is a solid bar in normal document flow-space (not the floating pill),
 * so the hero is pushed down by the measured header height.
 */
const HEADER_OFFSET_MAX_WIDTH_PX = 1023;

export default function UnmaiCarbonHomePage() {
  const headerRef = useRef<HTMLElement>(null);

  /** Below `lg`, hero `margin-top` = measured fixed header height (px). */
  const [heroMarginTop, setHeroMarginTop] = useState<number | undefined>(undefined);
  const [consultationOpen, setConsultationOpen] = useState(false);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const offsetMq = window.matchMedia(`(max-width: ${HEADER_OFFSET_MAX_WIDTH_PX}px)`);

    const syncHeroMargin = () => {
      const el = headerRef.current;
      if (!el) return;
      if (offsetMq.matches) {
        setHeroMarginTop(el.offsetHeight);
      } else {
        setHeroMarginTop(undefined);
      }
    };

    syncHeroMargin();

    const ro = new ResizeObserver(syncHeroMargin);
    ro.observe(header);
    offsetMq.addEventListener("change", syncHeroMargin);
    window.addEventListener("resize", syncHeroMargin);

    return () => {
      ro.disconnect();
      offsetMq.removeEventListener("change", syncHeroMargin);
      window.removeEventListener("resize", syncHeroMargin);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-[#191c1d] antialiased">
      {/* Outside hero <section> so z-index isn’t trapped by stacking contexts — stays above all bands */}
      <SiteHeader ref={headerRef} />

      <HeroSection marginTop={heroMarginTop} />

      <TrustMetricsSection />

      <CredentialStrip />

      <DigitalInfrastructureSection />

      <StrategicServicesSection />

      <PressReleasesSection />

      <SiteCta />

      <SiteFooter />
      <ScheduleConsultationModal
        open={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </div>
  );
}
