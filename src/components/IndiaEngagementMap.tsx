import { lazy, Suspense, useRef, useState } from "react";
import { getCountryLabel, type GlobalEngagementPlace } from "../lib/engagementMapUtils";

const EngagementGlobeView = lazy(() =>
  import("./EngagementGlobeView").then((m) => ({ default: m.EngagementGlobeView })),
);

const FOUNDER_LINKEDIN_URL =
  "https://www.linkedin.com/in/nithyanandam-yuvaraj-dinesh-babu-a1076b3/";

/** Capital-city coordinates with engagement summaries for the global map. */
export const GLOBAL_ENGAGEMENT_PLACES = [
  {
    id: "mongolia",
    country: "Mongolia",
    capital: "Ulaanbaatar",
    engagement: "ADB TA Support for Registry",
    lat: 47.8864,
    lng: 106.9057,
  },
  {
    id: "kyrgyzstan",
    country: "Kyrgyzstan",
    capital: "Bishkek",
    engagement: "A6 Implementation Framework Review",
    lat: 42.8746,
    lng: 74.5698,
  },
  {
    id: "singapore",
    country: "Singapore",
    capital: "Singapore",
    engagement: "Training of Government Officers on Paris Agreement",
    link: FOUNDER_LINKEDIN_URL,
    lat: 1.3521,
    lng: 103.8198,
  },
  {
    id: "india",
    country: "India",
    capital: "New Delhi",
    engagement: "World Bank SuPRABHA and USAID PACE-D",
    lat: 28.6139,
    lng: 77.209,
  },
  {
    id: "indonesia",
    country: "Indonesia",
    capital: "Jakarta",
    engagement: "A6 Strategy Framework Review",
    lat: -6.2088,
    lng: 106.8456,
  },
  {
    id: "thailand",
    country: "Thailand",
    capital: "Bangkok",
    engagement: "Establishment of GHG Training Centre at AIT Bangkok",
    lat: 13.7563,
    lng: 100.5018,
  },
  {
    id: "bangladesh",
    country: "Bangladesh",
    capital: "Dhaka",
    engagement: "Rooftop Solar Advisory for IDCOL",
    lat: 23.8103,
    lng: 90.4125,
  },
  {
    id: "vietnam",
    country: "Vietnam",
    capital: "Hanoi",
    engagement: "Carbon Credit Projects Advisory",
    lat: 21.0285,
    lng: 105.8542,
  },
  {
    id: "china",
    country: "China",
    capital: "Beijing",
    engagement: "Carbon Credit Projects Advisory",
    lat: 39.9042,
    lng: 116.4074,
  },
  {
    id: "middle-east",
    country: "Middle East",
    capital: "Riyadh",
    engagement: "Carbon Credit Projects Advisory",
    lat: 24.7136,
    lng: 46.6753,
  },
  {
    id: "mozambique",
    country: "Mozambique",
    capital: "Maputo",
    engagement: "Carbon Advisory",
    showFootnoteStar: false,
    lat: -25.9653,
    lng: 32.5892,
  },
  {
    id: "ghana",
    country: "Ghana",
    capital: "Accra",
    engagement: "Carbon Projects Advisory and Carbon Finance",
    lat: 5.6037,
    lng: -0.187,
  },
] as const satisfies readonly GlobalEngagementPlace[];

/** @deprecated Use GLOBAL_ENGAGEMENT_PLACES */
export const INDIA_ENGAGEMENT_PLACES = GLOBAL_ENGAGEMENT_PLACES;

export type IndiaEngagementPlace = GlobalEngagementPlace;

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 22C11.2 20.96 10.12 19.63 8.77 18C6.25 14.95 4 12.23 4 8.94C4 4.56 7.58 1 12 1C16.42 1 20 4.56 20 8.94C20 12.23 17.75 14.95 15.23 18C13.88 19.63 12.8 20.96 12 22Z"
        fill="currentColor"
      />
      <circle cx="12" cy="9" r="3" fill="white" />
    </svg>
  );
}

function ChevronIcon({ direction, className }: { direction: "left" | "right"; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationsHorizontalSlider({
  places,
  selectedId,
  onSelectPlace,
}: {
  places: readonly GlobalEngagementPlace[];
  selectedId: string | null;
  onSelectPlace: (id: string | null) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const amount = Math.max(container.clientWidth * 0.75, 200);
    container.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="mt-4 flex items-center gap-2 sm:mt-5" aria-label="Engagement locations">
      <button
        type="button"
        onClick={() => scrollByAmount("left")}
        aria-label="Scroll locations left"
        className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-black/12 bg-white text-[#131b2e] shadow-sm transition hover:border-black/25 hover:bg-neutral-50"
      >
        <ChevronIcon direction="left" className="size-4" />
      </button>

      <div
        ref={scrollRef}
        className="india-map-locations-scroll flex min-w-0 flex-1 gap-2 overflow-x-auto scroll-smooth py-0.5"
      >
        <button
          type="button"
          onClick={() => onSelectPlace(null)}
          className={`flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 transition duration-300 ${
            selectedId === null
              ? "border-black bg-linear-to-r from-[#131b2e] to-[#374151] text-white shadow-[0_8px_24px_-12px_rgba(0,0,0,0.3)]"
              : "border-black/8 bg-white hover:border-black/25 hover:bg-neutral-50"
          }`}
        >
          <span className="text-sm font-semibold whitespace-nowrap">Global</span>
          <MapPinIcon
            className={`size-4 shrink-0 ${selectedId === null ? "text-white" : "text-neutral-400"}`}
          />
        </button>

        {places.map((place) => {
          const active = selectedId === place.id;
          return (
            <button
              key={place.id}
              type="button"
              onClick={() => onSelectPlace(place.id)}
              className={`flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 transition duration-300 ${
                active
                  ? "border-black bg-linear-to-r from-[#131b2e] to-[#374151] text-white shadow-[0_8px_24px_-12px_rgba(0,0,0,0.3)]"
                  : "border-black/8 bg-white hover:border-black/25 hover:bg-neutral-50"
              }`}
            >
              <span
                className={`text-sm font-semibold whitespace-nowrap ${active ? "text-white" : "text-[#131b2e]"}`}
              >
                {getCountryLabel(place)}
              </span>
              <MapPinIcon
                className={`size-4 shrink-0 ${active ? "text-white" : "text-neutral-400"}`}
              />
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => scrollByAmount("right")}
        aria-label="Scroll locations right"
        className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-black/12 bg-white text-[#131b2e] shadow-sm transition hover:border-black/25 hover:bg-neutral-50"
      >
        <ChevronIcon direction="right" className="size-4" />
      </button>
    </div>
  );
}

function GlobeLoadingFallback() {
  return (
    <div className="flex min-h-[58vh] flex-col items-center justify-center gap-4 bg-[#0a0e18] md:min-h-[min(78vh,720px)]">
      <div className="size-12 animate-spin rounded-full border-2 border-[hsl(71,100%,73%)]/25 border-t-[hsl(71,100%,73%)]" />
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">
        Loading 3D globe…
      </p>
    </div>
  );
}

export function IndiaEngagementMap() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const places = GLOBAL_ENGAGEMENT_PLACES;

  return (
    <section
      className="relative left-1/2 mb-12 w-screen max-w-none -translate-x-1/2 overflow-hidden bg-linear-to-b from-neutral-100 via-neutral-50 to-white py-10 sm:py-14"
      aria-label="Interactive global engagement map"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(0,0,0,0.06), transparent 45%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.04), transparent 50%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#131b2e]">
              Global Footprint
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-[#131b2e] sm:text-3xl">
              Explore Our Global Presence
            </h2>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white/80 px-4 py-3 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] backdrop-blur-sm">
            <span className="flex size-10 items-center justify-center rounded-xl bg-neutral-100 text-[#131b2e]">
              <MapPinIcon className="size-5" />
            </span>
            <div>
              <p className="text-2xl font-bold leading-none tracking-tight text-[#131b2e]">
                {places.length}
              </p>
              <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#5c6b62]">
                Active locations
              </p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0a0e18] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)] ring-1 ring-white/5">
          <div className="india-map-shell relative w-full md:min-h-[min(78vh,720px)]">
            <Suspense fallback={<GlobeLoadingFallback />}>
              <EngagementGlobeView
                places={places}
                selectedId={selectedId}
                onSelectPlace={setSelectedId}
                className="engagement-globe-canvas z-0 min-h-[58vh] w-full md:min-h-[min(78vh,720px)]"
              />
            </Suspense>

            <div
              className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(0,0,0,0.45)_100%)]"
              aria-hidden
            />

            <div
              className="pointer-events-none absolute right-4 top-4 z-20 hidden rounded-xl border border-white/15 bg-black/75 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-lg backdrop-blur-md sm:block"
              aria-hidden
            >
              Drag to rotate · Ctrl + scroll to zoom
            </div>

            <p className="pointer-events-none absolute bottom-4 right-4 z-20 max-w-[min(300px,72vw)] text-right text-[10px] leading-relaxed text-white/55 sm:bottom-5 sm:right-5 sm:text-[11px]">
              * Engagement links reference external sources and are not the official UNMAI Carbon
              Solutions website.
            </p>
          </div>
        </div>

        <LocationsHorizontalSlider
          places={places}
          selectedId={selectedId}
          onSelectPlace={setSelectedId}
        />

      </div>
    </section>
  );
}