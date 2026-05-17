import { lazy, Suspense, useEffect, useRef, useState } from "react";

const EngagementGlobeView = lazy(() =>
  import("./EngagementGlobeView").then((m) => ({ default: m.EngagementGlobeView })),
);

/** Representative engagement locations — coordinates approximate city centers. */
export type IndiaEngagementPlace = {
  id: string;
  name: string;
  state: string;
  region: string;
  focus: string;
  summary: string;
  highlights: string[];
  link: string;
  lat: number;
  lng: number;
};

export const INDIA_ENGAGEMENT_PLACES = [
  {
    id: "delhi",
    name: "New Delhi",
    state: "Delhi NCR",
    region: "North India",
    focus: "National policy coordination and institutional engagement",
    summary:
      "Supports central-government dialogue, market readiness frameworks, and multi-stakeholder coordination for climate infrastructure programs.",
    highlights: ["Policy", "Institutions", "Registry readiness"],
    link: "https://example.com/engagements/new-delhi",
    lat: 28.6139,
    lng: 77.209,
  },
  {
    id: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    region: "West India",
    focus: "Climate finance and market-linked investment outreach",
    summary:
      "Engagement focus includes finance institutions, carbon investment corridors, and implementation partnerships across enterprise stakeholders.",
    highlights: ["Finance", "Private sector", "Article 6"],
    link: "https://example.com/engagements/mumbai",
    lat: 19.076,
    lng: 72.8777,
  },
  {
    id: "bengaluru",
    name: "Bengaluru",
    state: "Karnataka",
    region: "South India",
    focus: "Digital MRV and climate-tech ecosystem collaboration",
    summary:
      "Supports technology-led implementation, interoperable carbon data systems, and applied digital infrastructure partnerships.",
    highlights: ["Digital MRV", "Climate tech", "Interoperability"],
    link: "https://example.com/engagements/bengaluru",
    lat: 12.9716,
    lng: 77.5946,
  },
  {
    id: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    region: "South India",
    focus: "Industrial decarbonization and coastal resilience engagement",
    summary:
      "Coordinates with institutional and industrial stakeholders on transition pathways, carbon accounting, and implementation planning.",
    highlights: ["Industry", "Transition", "Resilience"],
    link: "https://example.com/engagements/chennai",
    lat: 13.0827,
    lng: 80.2707,
  },
  {
    id: "kolkata",
    name: "Kolkata",
    state: "West Bengal",
    region: "East India",
    focus: "Regional public-sector and program delivery coordination",
    summary:
      "Supports cross-institutional engagement for state-linked climate initiatives, operational planning, and stakeholder alignment.",
    highlights: ["Programs", "Public sector", "Delivery"],
    link: "https://example.com/engagements/kolkata",
    lat: 22.5726,
    lng: 88.3639,
  },
  {
    id: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    region: "South-Central India",
    focus: "Enterprise implementation and carbon systems coordination",
    summary:
      "Engagement spans implementation partnerships, digital workflows, and climate program execution with regional institutions.",
    highlights: ["Execution", "Enterprise", "Systems"],
    link: "https://example.com/engagements/hyderabad",
    lat: 17.385,
    lng: 78.4867,
  },
  {
    id: "ahmedabad",
    name: "Ahmedabad",
    state: "Gujarat",
    region: "West India",
    focus: "Industrial transition and standards-aligned market support",
    summary:
      "Focuses on climate market implementation for industrial ecosystems, traceability structures, and governance-aligned delivery models.",
    highlights: ["Industry", "Standards", "Traceability"],
    link: "https://example.com/engagements/ahmedabad",
    lat: 23.0225,
    lng: 72.5714,
  },
  {
    id: "kochi",
    name: "Kochi",
    state: "Kerala",
    region: "South India",
    focus: "Blue economy, resilience, and regional implementation pathways",
    summary:
      "Supports coastal and resilience-oriented climate discussions with implementation planning for local and regional priorities.",
    highlights: ["Blue economy", "Resilience", "Regional planning"],
    link: "https://example.com/engagements/kochi",
    lat: 9.9312,
    lng: 76.2673,
  },
  {
    id: "guwahati",
    name: "Guwahati",
    state: "Assam",
    region: "North-East India",
    focus: "Landscape programs and regional capacity-building support",
    summary:
      "Focuses on institutional readiness, ecosystem-linked interventions, and programmatic collaboration across the North-East corridor.",
    highlights: ["Capacity building", "Landscape", "Readiness"],
    link: "https://example.com/engagements/guwahati",
    lat: 26.1445,
    lng: 91.7362,
  },
  {
    id: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    region: "North-West India",
    focus: "State-level transition planning and institutional alignment",
    summary:
      "Supports strategic consultation around market preparedness, institutional pathways, and long-range implementation design.",
    highlights: ["State strategy", "Alignment", "Planning"],
    link: "https://example.com/engagements/jaipur",
    lat: 26.9124,
    lng: 75.7873,
  },
] as const satisfies readonly IndiaEngagementPlace[];

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M14 5h5v5M10 14L19 5M15 5h4v4M9 9H5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationDetailCard({
  place,
  className,
}: {
  place: IndiaEngagementPlace;
  className?: string;
}) {
  return (
    <article
      className={[
        "india-map-detail-card flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.2)]",
        className ?? "",
      ].join(" ")}
    >
      <h3 className="min-w-0 truncate text-base font-bold tracking-tight text-[#131b2e]">
        {place.name}
      </h3>
      <a
        href={place.link}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`Open ${place.name} (external site)`}
        className="shrink-0 text-[#131b2e] no-underline transition hover:text-black"
      >
        <ExternalLinkIcon className="size-4" />
      </a>
    </article>
  );
}

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
  places: readonly IndiaEngagementPlace[];
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
                {place.name}
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
  const [isMobile, setIsMobile] = useState(false);
  const places = INDIA_ENGAGEMENT_PLACES;
  const selectedPlace = places.find((place) => place.id === selectedId) ?? null;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const syncMobile = () => setIsMobile(mediaQuery.matches);

    syncMobile();
    mediaQuery.addEventListener("change", syncMobile);

    return () => {
      mediaQuery.removeEventListener("change", syncMobile);
    };
  }, []);

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

            {!isMobile && selectedPlace ? (
              <div className="absolute left-6 top-6 z-20 hidden md:block">
                <LocationDetailCard place={selectedPlace} />
              </div>
            ) : null}

            {isMobile && selectedPlace ? (
              <div className="relative z-20 mx-4 mb-4 mt-4 md:hidden">
                <LocationDetailCard place={selectedPlace} className="w-full max-w-none" />
              </div>
            ) : null}

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
