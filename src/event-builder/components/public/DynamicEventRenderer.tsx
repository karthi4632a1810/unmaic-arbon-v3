import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import {
  Share2,
  QrCode,
  Ticket,
  AlertCircle,
  Eye,
  EyeOff,
  Sliders,
} from "lucide-react";
import type { EventDocument } from "../../types/event";
import { eventStore } from "../../services/eventStore";
import { sectionRegistry } from "./sectionRegistry";
import { PublicHeader } from "./PublicHeader";
import { PublicHero } from "./PublicHero";
import { PublicFooter } from "./PublicFooter";
import { QrModal } from "./QrModal";
import { SocialShareModal } from "./SocialShareModal";
import { loadGoogleFont } from "../builder/editors/ThemeAndHeaderEditor";

interface DynamicEventRendererProps {
  /**
   * If provided, renders this event directly (used by the live builder canvas)
   */
  initialEvent?: EventDocument;
  /**
   * Called when a section is clicked in canvas mode
   */
  onSelectSectionId?: (id: string) => void;
  selectedSectionId?: string;
  isBuilderMode?: boolean;
  onToggleVisibility?: (id: string) => void;
}

export const DynamicEventRenderer: React.FC<DynamicEventRendererProps> = ({
  initialEvent,
  onSelectSectionId,
  selectedSectionId,
  isBuilderMode = false,
  onToggleVisibility,
}) => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const isPreviewParam = searchParams.get("preview") === "true";

  const [event, setEvent] = useState<EventDocument | null>(initialEvent || null);
  const [isLoading, setIsLoading] = useState<boolean>(!initialEvent);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Floating "Register" -> jump to registration section, or open its external link in a new tab. Never a popup.
  const handleFloatingRegister = () => {
    const regSection = event?.sections?.find(
      (s) => s.type === "registration" && s.visible !== false
    );
    if (regSection) {
      const el =
        document.getElementById(regSection.id) ||
        document.querySelector(`[data-section-id="${regSection.id}"]`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    const url = regSection?.content?.externalUrl;
    if (url && !url.startsWith("#")) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else if (url) {
      const el = document.getElementById(url.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Sync when initialEvent changes (in builder)
  useEffect(() => {
    if (initialEvent) {
      setEvent(initialEvent);
      setIsLoading(false);
    }
  }, [initialEvent]);

  // Load by slug if not in builder mode
  useEffect(() => {
    if (initialEvent) return;

    if (slug) {
      setIsLoading(true);
      const found = eventStore.getEventBySlug(slug);
      if (found) {
        setEvent(found);
        // Track analytics view
        eventStore.recordView(slug);
        // SEO metadata
        document.title = found.seo?.title || `${found.name} | Official Event Page`;
      } else {
        setEvent(null);
      }
      setIsLoading(false);
    }
  }, [slug, initialEvent]);

  // Dynamically load Google Font
  useEffect(() => {
    if (event?.branding?.font) {
      loadGoogleFont(event.branding.font);
    }
  }, [event?.branding?.font]);

  // Loading Skeleton State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center text-white">
        <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium font-mono text-zinc-400">Loading event page...</p>
      </div>
    );
  }

  // 404 Not Found State
  if (!event) {
    const allEvents = eventStore.getEvents();
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-['Space_Grotesk',sans-serif]">
        <div className="max-w-md w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-8 text-center shadow-2xl">
          <div className="w-16 h-16 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2 uppercase tracking-tight">Event Not Found</h2>
          <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
            The event <code className="text-white font-mono bg-zinc-900 px-2 py-0.5 rounded">/events/{slug}</code> could not be found or has not been published yet.
          </p>

          <div className="text-left mb-6 bg-zinc-900/80 p-4 rounded-xl border border-zinc-800">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2 font-mono">
              Available Active Events:
            </span>
            <ul className="space-y-1.5 text-xs font-mono">
              {allEvents.map((evt) => (
                <li key={evt.id}>
                  <Link
                    to={`/events/${evt.slug}`}
                    className="text-white hover:text-zinc-300 flex items-center gap-1.5 py-1 transition underline"
                  >
                    <span>/events/{evt.slug}</span>
                    <span className="text-zinc-500 truncate">({evt.name})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3 justify-center">
            <Link
              to="/admin/events"
              className="px-4 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 text-xs font-semibold transition"
            >
              Open Admin Events
            </Link>
            <Link
              to="/"
              className="px-4 py-2.5 rounded-full bg-white hover:bg-zinc-200 text-black text-xs font-bold transition shadow-sm"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Draft Gate check (if draft and NOT preview mode and NOT builder mode)
  if (!event.published && !isPreviewParam && !isBuilderMode) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-['Space_Grotesk',sans-serif]">
        <div className="max-w-md w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-8 text-center shadow-2xl">
          <div className="w-16 h-16 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
            <Eye className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2 tracking-tight">{event.name}</h2>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20 mb-4 font-mono">
            DRAFT MODE
          </span>
          <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
            This event page is currently in draft mode and has not been published for general public view yet.
          </p>

          <div className="flex gap-3 justify-center">
            <Link
              to={`/events/${event.slug}?preview=true`}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-xs transition shadow"
            >
              View in Preview Mode
            </Link>
            <Link
              to={`/admin/events/${event.id}/builder`}
              className="px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 text-xs font-semibold transition"
            >
              Open in Event Builder
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentUrl = typeof window !== "undefined" ? window.location.href : `https://example.com/events/${event.slug}`;

  return (
    <div
      className="min-h-screen flex flex-col relative selection:bg-white selection:text-black dynamic-event-page"
      style={{
        fontFamily: `"${event.branding.font || "Inter"}", sans-serif`,
        backgroundColor: event.branding.backgroundColor || "#000000",
        color: event.branding.textColor || "#ffffff",
      }}
    >
      <style>{`
        .dynamic-event-page {
          --event-bg: ${event.branding.backgroundColor || "#000000"};
          --event-text: ${event.branding.textColor || "#ffffff"};
          --event-font: "${event.branding.font || "Inter"}", sans-serif;
          --event-font-size: ${event.branding.fontSize || "16px"};
          --event-font-weight: ${event.branding.fontWeight || "400"};
          --event-line-height: ${event.branding.lineHeight || "1.6"};
          --event-letter-spacing: ${event.branding.letterSpacing || "normal"};
          background-color: var(--event-bg);
          color: var(--event-text);
          font-family: var(--event-font);
        }
        .dynamic-event-page section:not(#hero):not([data-custom-bg="true"]),
        .dynamic-event-page footer:not([data-custom-bg="true"]) {
          background-color: var(--event-bg);
          color: var(--event-text);
        }
        .dynamic-event-page h1,
        .dynamic-event-page h2,
        .dynamic-event-page h3,
        .dynamic-event-page h4,
        .dynamic-event-page .display-head {
          font-family: var(--event-font);
        }
        .dynamic-event-page p,
        .dynamic-event-page li {
          font-family: var(--event-font);
          font-weight: var(--event-font-weight);
          line-height: var(--event-line-height);
          letter-spacing: var(--event-letter-spacing);
          font-size: var(--event-font-size);
        }
      `}</style>
      {/* Preview Notification Floating Bar (Fixed bottom center with 30px gap) */}
      {isPreviewParam && !isBuilderMode && (
        <aside
          aria-label="Preview notice"
          className="fixed bottom-[30px] left-1/2 -translate-x-1/2 z-50 bg-zinc-950/95 backdrop-blur-md border border-zinc-800 text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-4 max-w-[90vw] animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <Eye className="w-4 h-4 shrink-0 text-zinc-300" />
            <span className="font-mono text-xs font-semibold tracking-wide whitespace-nowrap text-zinc-200">
              PREVIEW MODE — "{event.name}"
            </span>
          </div>
          <div className="h-4 w-px bg-zinc-800 shrink-0" />
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to={`/admin/events/${event.id}/builder`}
              className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold hover:bg-zinc-200 transition flex items-center gap-1.5 shadow-sm whitespace-nowrap"
            >
              <Sliders className="w-3.5 h-3.5" /> Edit in Builder
            </Link>
            <Link
              to="/admin/events"
              className="text-xs text-zinc-400 hover:text-white transition px-2 py-1 whitespace-nowrap"
            >
              Close
            </Link>
          </div>
        </aside>
      )}

      {/* Public Header */}
      {event.header && (event.header.visible !== false || isBuilderMode) && (
        <div
          id="header"
          data-section-id="header"
          onClick={() => onSelectSectionId && onSelectSectionId("header")}
          className={
            isBuilderMode
              ? `relative cursor-pointer transition-all duration-200 ${
                  event.header.visible === false
                    ? "opacity-60 grayscale border-2 border-dashed border-zinc-700 my-2 rounded-2xl overflow-hidden"
                    : ""
                } ${
                  selectedSectionId === "header"
                    ? "ring-2 ring-white ring-offset-2 ring-offset-black z-30"
                    : "hover:outline-dashed hover:outline-2 hover:outline-white/60"
                }`
              : ""
          }
        >
          {isBuilderMode && event.header.visible === false && (
            <div className="bg-zinc-950 border-b border-zinc-800 text-zinc-300 px-4 py-2 flex items-center justify-between text-xs font-mono z-30">
              <div className="flex items-center gap-2">
                <EyeOff className="w-3.5 h-3.5 text-zinc-400" />
                <span className="font-bold tracking-wider uppercase text-zinc-300 text-[11px]">
                  Header Inactive (Hidden from Live Page)
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleVisibility && onToggleVisibility("header");
                }}
                className="px-2.5 py-1 rounded bg-white text-black font-bold text-[11px] hover:bg-zinc-200 transition cursor-pointer flex items-center gap-1 font-mono shadow-xs"
              >
                <Eye className="w-3 h-3 text-black" />
                <span>Make Active</span>
              </button>
            </div>
          )}
          <PublicHeader
            header={event.header}
            branding={event.branding}
            eventName={event.name}
          />
        </div>
      )}

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        {/* Hero Section */}
        {event.hero && (event.hero.visible || isBuilderMode) && (
          <div
            id="hero"
            data-section-id={event.hero.id}
            onClick={() => onSelectSectionId && onSelectSectionId(event.hero.id)}
            className={
              isBuilderMode
                ? `relative cursor-pointer transition-all duration-200 ${
                    !event.hero.visible
                      ? "opacity-60 grayscale border-2 border-dashed border-zinc-700 my-2 rounded-2xl overflow-hidden"
                      : ""
                  } ${
                    selectedSectionId === event.hero.id
                      ? "ring-2 ring-white ring-offset-2 ring-offset-black z-30"
                      : "hover:outline-dashed hover:outline-2 hover:outline-white/60"
                  }`
                : ""
            }
          >
            {isBuilderMode && !event.hero.visible && (
              <div className="bg-zinc-950 border-b border-zinc-800 text-zinc-300 px-4 py-2 flex items-center justify-between text-xs font-mono z-30">
                <div className="flex items-center gap-2">
                  <EyeOff className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="font-bold tracking-wider uppercase text-zinc-300 text-[11px]">
                    Hero Banner Inactive (Hidden from Live Page)
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleVisibility && onToggleVisibility(event.hero.id);
                  }}
                  className="px-2.5 py-1 rounded bg-white text-black font-bold text-[11px] hover:bg-zinc-200 transition cursor-pointer flex items-center gap-1 font-mono shadow-xs"
                >
                  <Eye className="w-3 h-3 text-black" />
                  <span>Make Active</span>
                </button>
              </div>
            )}
            <PublicHero
              content={event.hero.content}
              branding={event.branding}
            />
          </div>
        )}

        {/* Dynamic Section Registry Iteration */}
        {event.sections &&
          event.sections.map((section) => {
            if (!section.visible && !isBuilderMode) return null;

            const Component = sectionRegistry[section.type];
            if (!Component) return null;

            const isSelected = selectedSectionId === section.id;
            const customSectionBg =
              section.content?.backgroundColor && section.content.backgroundColor !== "transparent"
                ? section.content.backgroundColor
                : section.settings?.bgType === "custom" && section.settings?.customBgColor
                ? section.settings.customBgColor
                : undefined;

            return (
              <div
                key={section.id}
                id={section.id}
                data-section-id={section.id}
                data-custom-bg={customSectionBg ? "true" : undefined}
                style={customSectionBg ? { backgroundColor: customSectionBg } : undefined}
                onClick={() => onSelectSectionId && onSelectSectionId(section.id)}
                className={
                  isBuilderMode
                    ? `relative cursor-pointer transition-all duration-200 ${
                        !section.visible
                          ? "opacity-60 grayscale border-2 border-dashed border-zinc-700 my-2 rounded-2xl overflow-hidden"
                          : ""
                      } ${
                        isSelected
                          ? "ring-2 ring-white ring-offset-2 ring-offset-black z-30"
                          : "hover:outline-dashed hover:outline-2 hover:outline-white/60"
                      }`
                    : ""
                }
              >
                {/* Section targets for button & header JavaScript smooth scrolling */}
                <span id={section.id} data-section-id={section.id} className="absolute -top-24 pointer-events-none" />
                <span id={section.type} className="absolute -top-24 pointer-events-none" />
                {section.anchorId && (
                  <span
                    id={section.anchorId}
                    className="absolute -top-24 pointer-events-none"
                  />
                )}

                {/* Inactive Section Banner in Builder Mode */}
                {isBuilderMode && !section.visible && (
                  <div className="bg-zinc-950 border-b border-zinc-800 text-zinc-300 px-4 py-2 flex items-center justify-between text-xs font-mono z-30">
                    <div className="flex items-center gap-2">
                      <EyeOff className="w-3.5 h-3.5 text-zinc-400" />
                      <span className="font-bold tracking-wider uppercase text-zinc-300 text-[11px]">
                        Section Inactive (Hidden from Live Page)
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleVisibility && onToggleVisibility(section.id);
                      }}
                      className="px-2.5 py-1 rounded bg-white text-black font-bold text-[11px] hover:bg-zinc-200 transition cursor-pointer flex items-center gap-1 font-mono shadow-xs"
                    >
                      <Eye className="w-3 h-3 text-black" />
                      <span>Make Active</span>
                    </button>
                  </div>
                )}

                <Component
                  content={section.content}
                  settings={section.settings}
                  branding={event.branding}
                  eventStartDate={event.startDate}
                />
              </div>
            );
          })}
      </main>

      {/* Footer Section */}
      {event.footer && (event.footer.visible !== false || isBuilderMode) && (
        <div
          id="footer"
          data-section-id="footer"
          onClick={() => onSelectSectionId && onSelectSectionId("footer")}
          className={
            isBuilderMode
              ? `relative cursor-pointer transition-all duration-200 ${
                  event.footer.visible === false
                    ? "opacity-60 grayscale border-2 border-dashed border-zinc-700 my-2 rounded-2xl overflow-hidden"
                    : ""
                } ${
                  selectedSectionId === "footer"
                    ? "ring-2 ring-white ring-offset-2 ring-offset-black z-30"
                    : "hover:outline-dashed hover:outline-2 hover:outline-white/60"
                }`
              : ""
          }
        >
          {/* Target anchor for on-page jump to footer */}
          <span id="footer_target" className="absolute -top-24 pointer-events-none" />

          {/* Inactive Section Banner in Builder Mode */}
          {isBuilderMode && event.footer.visible === false && (
            <div className="bg-zinc-950 border-b border-zinc-800 text-zinc-300 px-4 py-2 flex items-center justify-between text-xs font-mono z-30">
              <div className="flex items-center gap-2">
                <EyeOff className="w-3.5 h-3.5 text-zinc-400" />
                <span className="font-bold tracking-wider uppercase text-zinc-300 text-[11px]">
                  Footer Inactive (Hidden from Live Page)
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleVisibility && onToggleVisibility("footer");
                }}
                className="px-2.5 py-1 rounded bg-white text-black font-bold text-[11px] hover:bg-zinc-200 transition cursor-pointer flex items-center gap-1 font-mono shadow-xs"
              >
                <Eye className="w-3 h-3 text-black" />
                <span>Make Active</span>
              </button>
            </div>
          )}

          <PublicFooter
            footer={event.footer}
            branding={event.branding}
            eventName={event.name}
            forceRender={isBuilderMode}
          />
        </div>
      )}

      {/* Floating Action Menu (Share, QR, Register) */}
      {!isBuilderMode && (
        <aside
          aria-label="Event quick actions"
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-zinc-900/90 backdrop-blur-md p-1.5 rounded-full border border-zinc-800 shadow-2xl animate-in slide-in-from-bottom-5 duration-300"
        >
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="p-3 text-zinc-300 hover:text-white hover:bg-white/10 rounded-full transition"
            title="Share Event"
            aria-label="Share Event"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsQrModalOpen(true)}
            className="p-3 text-zinc-300 hover:text-white hover:bg-white/10 rounded-full transition"
            title="View QR Code"
            aria-label="View QR Code"
          >
            <QrCode className="w-4 h-4" />
          </button>

          {event.sections?.some((s) => s.type === "registration" && s.visible !== false) && (
            <button
              onClick={handleFloatingRegister}
              className="px-5 py-2.5 rounded-full text-xs font-bold text-black bg-white hover:bg-zinc-200 shadow-md transition flex items-center gap-1.5"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>Register</span>
            </button>
          )}
        </aside>
      )}

      {/* Interactive Modals */}

      <QrModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        eventUrl={currentUrl}
        eventName={event.name}
      />

      <SocialShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        eventUrl={currentUrl}
        eventName={event.name}
      />
    </div>
  );
};
