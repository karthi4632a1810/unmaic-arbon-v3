import { useEffect, useMemo, useState } from "react";
import L from "leaflet";
import { LayersControl, MapContainer, Marker, TileLayer, Tooltip, useMap } from "react-leaflet";
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

/** Moderate zoom so the place is readable without a tight street-level view. */
const FOCUS_ZOOM = 7;

function createLocationPinIcon(active: boolean) {
  const fill = active ? "#006c49" : "#2b6193";
  const shadow = active ? "0 10px 22px rgba(0,108,73,0.28)" : "0 8px 18px rgba(43,97,147,0.22)";

  return L.divIcon({
    className: "",
    html: `
      <div style="width:32px;height:40px;display:flex;align-items:flex-end;justify-content:center;filter:${shadow};">
        <svg width="28" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 22C11.2 20.96 10.12 19.63 8.77 18C6.25 14.95 4 12.23 4 8.94C4 4.56 7.58 1 12 1C16.42 1 20 4.56 20 8.94C20 12.23 17.75 14.95 15.23 18C13.88 19.63 12.8 20.96 12 22Z" fill="${fill}" stroke="white" stroke-width="1.2"/>
          <circle cx="12" cy="9" r="3.2" fill="white"/>
        </svg>
      </div>
    `,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -34],
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
      map.flyToBounds(bounds, { padding: [36, 36], maxZoom: 6, duration: 0.55 });
      return;
    }
    const p = places.find((x) => x.id === selectedId);
    if (p) {
      map.flyTo([p.lat, p.lng], FOCUS_ZOOM, { duration: 0.65 });
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
    <div
      className={[
        "w-[min(420px,calc(100vw-180px))] max-w-[calc(100vw-180px)] overflow-hidden whitespace-normal wrap-break-word rounded-2xl border border-black/10 bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)]",
        className ?? "",
      ].join(" ")}
    >
      <div className="flex flex-wrap items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#006c49]">{place.state}</p>
          <h3 className="mt-1 text-base font-semibold tracking-tight text-[#131b2e]">{place.name}</h3>
          <p className="mt-1 text-xs font-medium leading-5 text-[#2b6193]">{place.focus}</p>
        </div>
        <span className="shrink-0 rounded-full bg-[#006c49]/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#006c49]">
          {place.region}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-[#444654]">{place.summary}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {place.highlights.map((item) => (
          <span
            key={item}
            className="rounded-full border border-black/10 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#444654]"
          >
            {item}
          </span>
        ))}
      </div>
      <a
        href={place.link}
        target="_blank"
        rel="noreferrer noopener"
        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#006c49] transition hover:text-[#004d35]"
      >
        Open external site
        <span aria-hidden="true">↗</span>
      </a>
    </div>
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
    <Marker
      position={[place.lat, place.lng]}
      icon={active ? activePinIcon : inactivePinIcon}
      eventHandlers={{
        click: onSelect,
      }}
    >
      {active && showTooltip ? (
        <Tooltip
          permanent
          interactive
          direction="right"
          offset={[22, -4]}
          opacity={1}
          className="india-map-tooltip"
        >
          <LocationDetailCard place={place} />
        </Tooltip>
      ) : null}
    </Marker>
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
      className="relative left-1/2 mb-12 w-screen max-w-none -translate-x-1/2 border-y border-black/[0.07] bg-linear-to-b from-slate-50/90 to-white py-10"
      aria-label="Interactive India engagement map"
    >
      {/* Full-viewport-width map; panel overlays map */}
      <div className="relative left-1/2 w-screen max-w-none -translate-x-1/2 overflow-hidden border-y border-black/[0.07] bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)]">
        <div className="relative w-full [&_.india-map-tooltip]:border-0! [&_.india-map-tooltip]:bg-transparent! [&_.india-map-tooltip]:shadow-none! [&_.india-map-tooltip]:p-0! [&_.india-map-tooltip]:max-w-[calc(100vw-180px)] [&_.india-map-tooltip]:whitespace-normal! md:min-h-[min(88vh,760px)]">
          <MapContainer
            center={defaultCenter}
            zoom={5}
            className="z-0 size-full min-h-[55vh] [&_.leaflet-control-attribution]:text-[10px] md:min-h-[min(88vh,760px)]"
            scrollWheelZoom={false}
            zoomControl
            worldCopyJump
          >
            <LayersControl position="topright">
              <LayersControl.BaseLayer name="Street map">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer checked name="Light map">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="Satellite">
                <TileLayer
                  attribution="Tiles &copy; Esri"
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
              </LayersControl.BaseLayer>
            </LayersControl>
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

          {isMobile && selectedPlace ? (
            <div className="mx-4 mb-4 mt-4 md:hidden">
              <LocationDetailCard place={selectedPlace} className="w-full max-w-none" />
            </div>
          ) : null}

          <aside
            className="mx-4 my-4 flex max-h-[320px] flex-col gap-2 overflow-y-auto rounded-2xl border border-black/10 bg-white/95 p-3 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-sm md:absolute md:left-[50px] md:top-1/2 md:z-1000 md:my-0 md:max-h-[min(80vh,560px)] md:w-[min(280px,calc(100vw-100px))] md:-translate-y-1/2"
            aria-label="Engagement locations"
          >
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-left text-xs font-semibold uppercase tracking-wide transition ${
                selectedId === null
                  ? "border-[#006c49] bg-[#006c49]/10 text-[#004d35]"
                  : "border-black/15 bg-white text-[#444654] hover:border-[#006c49]/40 hover:bg-slate-50"
              }`}
            >
              All locations
            </button>
            {places.map((place) => {
              const active = selectedId === place.id;
              return (
                <div key={place.id} className="w-full">
                  <button
                    type="button"
                    onClick={() => setSelectedId(place.id)}
                    className={`w-full rounded-full border px-3 py-1.5 text-left text-xs font-semibold transition ${
                      active
                        ? "border-[#006c49] bg-[#006c49] text-white shadow-sm"
                        : "border-black/15 bg-white text-[#131b2e] hover:border-[#006c49]/40 hover:bg-slate-50"
                    }`}
                  >
                    {place.name}
                  </button>
                </div>
              );
            })}
          </aside>
        </div>
      </div>
    </section>
  );
}
