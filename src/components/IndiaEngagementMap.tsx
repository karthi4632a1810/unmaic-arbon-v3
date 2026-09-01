import { lazy, Suspense, useState } from "react";
import {
  getEngagementCountryGroups,
  type GlobalEngagementPlace,
} from "../lib/engagementMapUtils";

const EngagementGlobeView = lazy(() =>
  import("./EngagementGlobeView").then((m) => ({ default: m.EngagementGlobeView })),
);

const FOUNDER_LINKEDIN_URL =
  "https://www.linkedin.com/in/nithyanandam-yuvaraj-dinesh-babu-a1076b3/";

/** Capital-city coordinates with engagement summaries, alphabetical by country. */
export const GLOBAL_ENGAGEMENT_PLACES = [
  {
    id: "bangladesh",
    country: "Bangladesh",
    capital: "Dhaka",
    engagement: "Rooftop Solar Advisory for IDCOL",
    lat: 23.8103,
    lng: 90.4125,
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
    id: "ghana",
    country: "Ghana",
    capital: "Accra",
    engagement: "Carbon Projects Advisory and Carbon Finance",
    showFootnoteStar: false,
    lat: 5.6037,
    lng: -0.187,
  },
  {
    id: "india-chennai",
    country: "India",
    capital: "Chennai",
    city: "Chennai",
    engagement: "Development of CBG Projects",
    showFootnoteStar: false,
    lat: 13.0827,
    lng: 80.2707,
  },
  {
    id: "india-mumbai",
    country: "India",
    capital: "Mumbai",
    city: "Mumbai",
    engagement: "Carbon Advisory & Market Solutions",
    showFootnoteStar: false,
    lat: 19.076,
    lng: 72.8777,
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
    id: "kyrgyzstan",
    country: "Kyrgyzstan",
    capital: "Bishkek",
    engagement: "A6 Implementation Framework Review",
    lat: 42.8746,
    lng: 74.5698,
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
    id: "mongolia",
    country: "Mongolia",
    capital: "Ulaanbaatar",
    engagement: "ADB TA Support for Registry",
    lat: 47.8864,
    lng: 106.9057,
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
    id: "singapore",
    country: "Singapore",
    capital: "Singapore",
    engagement: "Training of Government Officers on Paris Agreement",
    link: FOUNDER_LINKEDIN_URL,
    lat: 1.3521,
    lng: 103.8198,
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
    id: "vietnam",
    country: "Vietnam",
    capital: "Hanoi",
    engagement: "Carbon Credit Projects Advisory",
    lat: 21.0285,
    lng: 105.8542,
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

function LocationsVerticalList({
  countryGroups,
  selectedCountry,
  onSelectCountry,
}: {
  countryGroups: ReturnType<typeof getEngagementCountryGroups>;
  selectedCountry: string | null;
  onSelectCountry: (country: string | null) => void;
}) {
  const itemClass = (active: boolean) =>
    [
      "flex w-full items-center rounded-xl border px-4 py-2.5 text-left transition duration-200",
      active
        ? "border-white/40 bg-white/15 text-white shadow-[0_0_20px_-4px_rgba(255,255,255,0.2)] font-bold"
        : "border-transparent bg-transparent text-white/75 hover:border-white/10 hover:bg-white/[0.08] hover:text-white",
    ].join(" ");

  return (
    <nav
      aria-label="Engagement locations"
      className="india-map-country-panel flex h-full max-h-full w-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-[rgba(10,14,24,0.22)] shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur-md backdrop-saturate-150"
    >
      <p className="shrink-0 border-b border-white/8 bg-white/3 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">
        Countries
      </p>
      <div className="india-map-country-panel-scroll flex flex-col gap-1 overflow-y-auto p-2.5">
        <button
          type="button"
          onClick={() => onSelectCountry(null)}
          className={itemClass(selectedCountry === null)}
        >
          <span className="text-sm font-semibold">Global view</span>
        </button>

        {countryGroups.map((group) => {
          const active = selectedCountry === group.country;
          return (
            <button
              key={group.country}
              type="button"
              onClick={() => onSelectCountry(group.country)}
              className={itemClass(active)}
            >
              <span className="text-sm font-semibold">{group.country}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function GlobeLoadingFallback() {
  return (
    <div className="flex h-full min-h-full w-full flex-col items-center justify-center gap-4 bg-[#0a0e18]">
      <div className="size-12 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">
        Loading 3D globe…
      </p>
    </div>
  );
}

export function IndiaEngagementMap() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const places = GLOBAL_ENGAGEMENT_PLACES;
  const countryGroups = getEngagementCountryGroups(places);

  return (
    <section
      className="relative left-1/2 mb-8 w-screen max-w-none -translate-x-1/2 overflow-hidden bg-linear-to-b from-neutral-100 via-neutral-50 to-white py-8 sm:mb-10 sm:py-10 lg:py-12"
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
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#131b2e]">
              Global Footprint
            </p>
            <h2 className="text-xl font-bold tracking-tight text-[#131b2e] xs:text-2xl sm:text-3xl">
              Explore Our Global Presence
            </h2>
          </div>
          <div className="flex w-fit items-center gap-3 rounded-2xl border border-black/10 bg-white/80 px-4 py-3 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] backdrop-blur-sm">
            <span className="flex size-10 items-center justify-center rounded-xl bg-neutral-100 text-[#131b2e]">
              <MapPinIcon className="size-5" />
            </span>
            <div>
              <p className="text-2xl font-bold leading-none tracking-tight text-[#131b2e]">
                {countryGroups.length}
              </p>
              <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#5c6b62]">
                Countries
              </p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0e18] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)] ring-1 ring-white/5 sm:rounded-[28px]">
          <div className="india-map-shell relative min-h-[min(76vh,560px)] w-full sm:min-h-[min(86vh,760px)] lg:min-h-[min(92vh,960px)]">
            <div className="globe-stage absolute inset-0 z-0">
              <Suspense fallback={<GlobeLoadingFallback />}>
                <EngagementGlobeView
                  places={places}
                  selectedCountry={selectedCountry}
                  onSelectCountry={setSelectedCountry}
                  className="engagement-globe-canvas h-full min-h-full w-full"
                />
              </Suspense>
            </div>

            <div
              className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_85%_75%_at_32%_50%,transparent_45%,rgba(0,0,0,0.35)_100%)]"
              aria-hidden
            />

            <div
              className="pointer-events-none absolute bottom-4 left-4 z-20 hidden rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/90 shadow-lg backdrop-blur-md sm:block"
              aria-hidden
            >
              Drag to rotate · Ctrl + scroll to zoom
            </div>

            <aside className="pointer-events-none absolute inset-x-3 bottom-3 z-30 flex max-h-[min(38vh,300px)] items-stretch xs:inset-x-4 xs:bottom-4 sm:inset-x-auto sm:bottom-auto sm:right-6 sm:top-1/2 sm:max-h-[min(66vh,680px)] sm:w-[min(320px,calc(100%-3rem))] sm:-translate-y-1/2 lg:right-8 lg:w-[min(340px,calc(100%-4rem))]">
              <div className="pointer-events-auto w-full min-w-0">
                <LocationsVerticalList
                  countryGroups={countryGroups}
                  selectedCountry={selectedCountry}
                  onSelectCountry={setSelectedCountry}
                />
              </div>
            </aside>
          </div>
        </div>

      </div>
    </section>
  );
}