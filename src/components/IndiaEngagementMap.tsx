import { useEffect, useMemo, useState } from "react";
import L from "leaflet";
import { CircleMarker, MapContainer, Marker, TileLayer, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

/** Representative engagement locations — coordinates approximate city centers. */
type IndiaEngagementPlace = {
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

const FOCUS_ZOOM = 7;
const MAP_BLACK = "#131b2e";
const MAP_WHITE = "#ffffff";
const MAP_GRAY = "#6b7280";

function createLocationPinIcon(active: boolean) {
  const ring = active ? MAP_WHITE : "rgba(255,255,255,0.55)";
  const scale = active ? "1.12" : "1";
  const pulse = active
    ? `<span class="india-map-pin-pulse" style="position:absolute;inset:-10px;border-radius:9999px;border:2px solid ${MAP_WHITE};opacity:0.5;"></span>`
    : "";

  return L.divIcon({
    className: "",
    html: `
      <div style="position:relative;width:36px;height:44px;display:flex;align-items:flex-end;justify-content:center;transform:scale(${scale});transition:transform 0.35s ease;">
        ${pulse}
        <svg width="32" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="filter:drop-shadow(0 10px 18px rgba(0,0,0,0.35));">
          <defs>
            <linearGradient id="pinGrad-${active ? "a" : "i"}" x1="12" y1="1" x2="12" y2="22" gradientUnits="userSpaceOnUse">
              <stop stop-color="${active ? MAP_WHITE : "#d1d5db"}"/>
              <stop offset="0.55" stop-color="${active ? "#374151" : MAP_GRAY}"/>
              <stop offset="1" stop-color="${MAP_BLACK}"/>
            </linearGradient>
          </defs>
          <path d="M12 22C11.2 20.96 10.12 19.63 8.77 18C6.25 14.95 4 12.23 4 8.94C4 4.56 7.58 1 12 1C16.42 1 20 4.56 20 8.94C20 12.23 17.75 14.95 15.23 18C13.88 19.63 12.8 20.96 12 22Z" fill="url(#pinGrad-${active ? "a" : "i"})" stroke="white" stroke-width="1.4"/>
          <circle cx="12" cy="9" r="3.4" fill="white" stroke="${ring}" stroke-width="1.2"/>
        </svg>
      </div>
    `,
    iconSize: [36, 44],
    iconAnchor: [18, 44],
    popupAnchor: [0, -38],
  });
}

function MapViewController({
  selectedId,
  places,
}: {
  selectedId: string | null;
  places: readonly IndiaEngagementPlace[];
}) {
  const map = useMap();
  const bounds = useMemo(
    () => L.latLngBounds(places.map((p) => [p.lat, p.lng] as L.LatLngTuple)),
    [places],
  );

  useEffect(() => {
    if (!selectedId) {
      map.flyToBounds(bounds, { padding: [48, 48], maxZoom: 6, duration: 0.65 });
      return;
    }
    const p = places.find((x) => x.id === selectedId);
    if (p) {
      map.flyTo([p.lat, p.lng], FOCUS_ZOOM, { duration: 0.7 });
    }
  }, [selectedId, map, bounds, places]);

  return null;
}

function CtrlScrollZoomController() {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();

    const onWheel = (event: WheelEvent) => {
      if (!(event.ctrlKey || event.metaKey)) return;

      event.preventDefault();
      event.stopPropagation();

      const currentZoom = map.getZoom();
      const delta = event.deltaY < 0 ? 1 : -1;
      const nextZoom = Math.max(map.getMinZoom(), Math.min(map.getMaxZoom(), currentZoom + delta));

      if (nextZoom !== currentZoom) {
        map.setZoom(nextZoom, { animate: true });
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, [map]);

  return null;
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
        "india-map-detail-card w-[min(420px,calc(100vw-180px))] max-w-[calc(100vw-180px)] overflow-hidden whitespace-normal wrap-break-word rounded-2xl border border-black/10 bg-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.18)]",
        className ?? "",
      ].join(" ")}
    >
      <div className="bg-linear-to-r from-[#0a0a0a] via-[#131b2e] to-[#374151] px-5 py-4">
        <div className="flex flex-wrap items-start gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
              {place.state}
            </p>
            <h3 className="mt-1 text-lg font-bold tracking-tight text-white">{place.name}</h3>
            <p className="mt-1.5 text-xs font-medium leading-5 text-white/75">{place.focus}</p>
          </div>
          <span className="shrink-0 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            {place.region}
          </span>
        </div>
      </div>
      <div className="space-y-4 p-5">
        <p className="text-sm leading-6 text-[#444654]">{place.summary}</p>
        <div className="flex flex-wrap gap-2">
          {place.highlights.map((item) => (
            <span
              key={item}
              className="rounded-full border border-black/12 bg-neutral-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#131b2e]"
            >
              {item}
            </span>
          ))}
        </div>
        <a
          href={place.link}
          target="_blank"
          rel="noreferrer noopener"
          className="india-map-detail-cta inline-flex items-center gap-2 rounded-lg bg-[#131b2e] px-4 py-2.5 text-sm font-semibold text-white! no-underline shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)] transition hover:bg-black hover:text-white! hover:shadow-[0_12px_28px_-10px_rgba(0,0,0,0.45)]"
        >
          Open external site
          <span className="text-inherit" aria-hidden="true">
            ↗
          </span>
        </a>
      </div>
    </article>
  );
}

function PlaceMarker({
  place,
  active,
  showTooltip,
  activePinIcon,
  inactivePinIcon,
  onSelect,
}: {
  place: IndiaEngagementPlace;
  active: boolean;
  showTooltip: boolean;
  activePinIcon: L.DivIcon;
  inactivePinIcon: L.DivIcon;
  onSelect: () => void;
}) {
  return (
    <>
      {active ? (
        <CircleMarker
          center={[place.lat, place.lng]}
          radius={22}
          pathOptions={{
            color: MAP_WHITE,
            fillColor: MAP_BLACK,
            fillOpacity: 0.12,
            weight: 2,
            opacity: 0.7,
          }}
          className="india-map-active-ring"
        />
      ) : null}
      <Marker
        position={[place.lat, place.lng]}
        icon={active ? activePinIcon : inactivePinIcon}
        eventHandlers={{ click: onSelect }}
        zIndexOffset={active ? 1000 : 0}
      >
        {active && showTooltip ? (
          <Tooltip
            permanent
            interactive
            direction="right"
            offset={[24, -6]}
            opacity={1}
            className="india-map-tooltip"
          >
            <LocationDetailCard place={place} />
          </Tooltip>
        ) : null}
      </Marker>
    </>
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

export function IndiaEngagementMap() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const places = INDIA_ENGAGEMENT_PLACES;
  const defaultCenter: L.LatLngTuple = [20.5937, 78.9629];
  const activePinIcon = useMemo(() => createLocationPinIcon(true), []);
  const inactivePinIcon = useMemo(() => createLocationPinIcon(false), []);
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
      aria-label="Interactive India engagement map"
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
              Engagement Footprint
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-[#131b2e] sm:text-3xl">
              Explore Our India Presence
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

        <div className="relative overflow-hidden rounded-[28px] border border-black/15 bg-[#0a0a0a] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
          <div className="india-map-shell relative w-full [&_.india-map-tooltip]:max-w-[calc(100vw-180px)] [&_.india-map-tooltip]:border-0! [&_.india-map-tooltip]:bg-transparent! [&_.india-map-tooltip]:p-0! [&_.india-map-tooltip]:shadow-none! [&_.india-map-tooltip]:whitespace-normal! md:min-h-[min(78vh,720px)]">
            <MapContainer
              center={defaultCenter}
              zoom={5}
              className="india-map-canvas z-0 size-full min-h-[58vh] md:min-h-[min(78vh,720px)]"
              scrollWheelZoom={false}
              zoomControl
              worldCopyJump
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              />
              <MapViewController selectedId={selectedId} places={places} />
              <CtrlScrollZoomController />
              {places.map((place) => (
                <PlaceMarker
                  key={place.id}
                  place={place}
                  active={selectedId === place.id}
                  showTooltip={!isMobile}
                  activePinIcon={activePinIcon}
                  inactivePinIcon={inactivePinIcon}
                  onSelect={() => setSelectedId(place.id)}
                />
              ))}
            </MapContainer>

            <div
              className="india-map-tone-overlay pointer-events-none absolute inset-0 z-[400]"
              aria-hidden
            />

            <div
              className="pointer-events-none absolute right-4 top-4 z-[500] hidden rounded-xl border border-white/20 bg-black/80 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-lg backdrop-blur-md sm:block"
              aria-hidden
            >
              Ctrl + scroll to zoom
            </div>

            {isMobile && selectedPlace ? (
              <div className="relative z-[500] mx-4 mb-4 mt-4 md:hidden">
                <LocationDetailCard place={selectedPlace} className="w-full max-w-none" />
              </div>
            ) : null}

            <aside
              className="india-map-panel relative z-[500] mx-4 my-4 flex max-h-[340px] flex-col gap-2 overflow-hidden rounded-2xl border border-black/12 bg-white/95 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.2)] backdrop-blur-md md:absolute md:left-6 md:top-1/2 md:my-0 md:max-h-[min(76vh,580px)] md:w-[min(300px,calc(100vw-80px))] md:-translate-y-1/2 lg:left-8"
              aria-label="Engagement locations"
            >
              <div className="shrink-0 border-b border-black/10 bg-linear-to-r from-[#0a0a0a] to-[#131b2e] px-4 py-3.5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                  Locations
                </p>
                <p className="mt-0.5 text-sm font-semibold text-white">Select a city to explore</p>
              </div>

              <div className="india-map-panel-scroll flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto p-3">
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className={`group flex shrink-0 items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition duration-300 ${
                    selectedId === null
                      ? "border-black bg-neutral-100 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]"
                      : "border-black/8 bg-white hover:border-black/25 hover:bg-neutral-50"
                  }`}
                >
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-lg transition ${
                      selectedId === null
                        ? "bg-[#131b2e] text-white"
                        : "bg-neutral-100 text-[#131b2e] group-hover:bg-neutral-200"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
                      <path
                        d="M3 10.5L12 4l9 6.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block text-xs font-bold uppercase tracking-wide ${
                        selectedId === null ? "text-black" : "text-[#131b2e]"
                      }`}
                    >
                      All locations
                    </span>
                    <span className="block text-[10px] text-[#5c6b62]">Full India overview</span>
                  </span>
                </button>

                {places.map((place, index) => {
                  const active = selectedId === place.id;
                  return (
                    <button
                      key={place.id}
                      type="button"
                      onClick={() => setSelectedId(place.id)}
                      className={`group flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition duration-300 ${
                        active
                          ? "border-black bg-linear-to-r from-[#131b2e] to-[#374151] text-white shadow-[0_10px_28px_-12px_rgba(0,0,0,0.35)]"
                          : "border-black/8 bg-white hover:border-black/25 hover:bg-neutral-50"
                      }`}
                    >
                      <span
                        className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold tabular-nums transition ${
                          active
                            ? "bg-white/15 text-white"
                            : "bg-neutral-100 text-[#131b2e] group-hover:bg-neutral-200"
                        }`}
                      >
                        {(index + 1).toString().padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block truncate text-sm font-semibold ${
                            active ? "text-white" : "text-[#131b2e]"
                          }`}
                        >
                          {place.name}
                        </span>
                        <span
                          className={`block truncate text-[10px] uppercase tracking-wide ${
                            active ? "text-white/75" : "text-[#5c6b62]"
                          }`}
                        >
                          {place.region}
                        </span>
                      </span>
                      <MapPinIcon
                        className={`size-4 shrink-0 ${active ? "text-white" : "text-neutral-400"}`}
                      />
                    </button>
                  );
                })}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
