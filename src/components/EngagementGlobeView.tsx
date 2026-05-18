import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Globe, { type GlobeMethods } from "react-globe.gl";
import {
  getCountryLabel,
  getEngagementLine,
  type GlobalEngagementPlace,
} from "../lib/engagementMapUtils";

/** NASA Blue Marble — full-color daytime Earth */
const GLOBE_IMAGE = "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg";
const GLOBE_BUMP = "//unpkg.com/three-globe/example/img/earth-topology.png";
const SPACE_BG = "rgba(10, 14, 24, 1)";
const PIN_ACTIVE = "hsl(71, 100%, 73%)";
const PIN_INACTIVE = "hsla(71, 100%, 73%, 0.55)";

const PIN_SVG = `<svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true" focusable="false"><path d="M12 22C11.2 20.96 10.12 19.63 8.77 18C6.25 14.95 4 12.23 4 8.94C4 4.56 7.58 1 12 1C16.42 1 20 4.56 20 8.94C20 12.23 17.75 14.95 15.23 18C13.88 19.63 12.8 20.96 12 22Z" fill="currentColor"/><circle cx="12" cy="9" r="3" fill="#0a0e18"/></svg>`;

const LINK_ICON_SVG = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true"><path d="M14 5h5v5M10 14L19 5M15 5h4v4M9 9H5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

type HtmlGlobePlace = GlobalEngagementPlace & { active: boolean };

type EngagementGlobeViewProps = {
  places: readonly GlobalEngagementPlace[];
  selectedId: string | null;
  onSelectPlace: (id: string) => void;
  className?: string;
};

export function EngagementGlobeView({
  places,
  selectedId,
  onSelectPlace,
  className,
}: EngagementGlobeViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const onSelectRef = useRef(onSelectPlace);
  const [dims, setDims] = useState({ width: 800, height: 520 });
  const [globeReady, setGlobeReady] = useState(false);

  onSelectRef.current = onSelectPlace;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const sync = () => {
      setDims({ width: el.clientWidth, height: el.clientHeight });
    };

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    if (!selectedId) {
      globe.pointOfView({ lat: 22, lng: 79, altitude: 1.5 }, 1100);
      return;
    }

    const place = places.find((p) => p.id === selectedId);
    if (place) {
      globe.pointOfView({ lat: place.lat, lng: place.lng, altitude: 0.52 }, 1100);
    }
  }, [selectedId, places]);

  useEffect(() => {
    if (!globeReady) return;

    const globe = globeRef.current;
    const container = containerRef.current;
    if (!globe || !container) return;

    const controls = globe.controls();
    controls.enableZoom = false;

    const canvas = globe.renderer().domElement;
    canvas.style.touchAction = "pan-y";

    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return;

      event.preventDefault();

      const pov = globe.pointOfView();
      const delta = Math.min(Math.abs(event.deltaY), 120);
      const scale = 1 + Math.sign(event.deltaY) * delta * 0.0025;
      const nextAltitude = Math.min(2.5, Math.max(0.28, pov.altitude * scale));

      globe.pointOfView({ lat: pov.lat, lng: pov.lng, altitude: nextAltitude }, 0);
    };

    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", onWheel);
    };
  }, [globeReady, dims.width, dims.height]);

  const htmlElementsData = useMemo<HtmlGlobePlace[]>(
    () => places.map((place) => ({ ...place, active: selectedId === place.id })),
    [places, selectedId],
  );

  const ringsData = useMemo(() => {
    if (!selectedId) return [];
    const place = places.find((p) => p.id === selectedId);
    return place ? [{ lat: place.lat, lng: place.lng }] : [];
  }, [places, selectedId]);

  const buildPinElement = useCallback((place: HtmlGlobePlace) => {
    const wrapper = document.createElement("div");
    wrapper.className = [
      "engagement-globe-marker",
      place.active ? "engagement-globe-marker--active" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const linkUrl = place.link?.trim();
    const tooltip = linkUrl
      ? document.createElement("a")
      : document.createElement("div");
    tooltip.className = [
      "engagement-globe-marker__tooltip",
      linkUrl ? "engagement-globe-marker__tooltip--linked" : "",
    ]
      .filter(Boolean)
      .join(" ");

    if (linkUrl) {
      const linkedTooltip = tooltip as HTMLAnchorElement;
      linkedTooltip.href = linkUrl;
      linkedTooltip.target = "_blank";
      linkedTooltip.rel = "noreferrer noopener";
      linkedTooltip.setAttribute(
        "aria-label",
        `Open external link: ${getEngagementLine(place)}`,
      );
    }

    const body = document.createElement("div");
    body.className = "engagement-globe-marker__tooltip-body";

    const country = document.createElement("p");
    country.className = "engagement-globe-marker__tooltip-country";
    country.textContent = getCountryLabel(place);
    body.appendChild(country);

    if (place.engagement.trim()) {
      const desc = document.createElement("p");
      desc.className = "engagement-globe-marker__tooltip-desc";
      desc.textContent = place.engagement;
      body.appendChild(desc);
    }

    tooltip.appendChild(body);

    if (linkUrl) {
      const linkIcon = document.createElement("span");
      linkIcon.className = "engagement-globe-marker__tooltip-link";
      linkIcon.innerHTML = LINK_ICON_SVG;
      linkIcon.setAttribute("aria-hidden", "true");
      tooltip.appendChild(linkIcon);

      tooltip.addEventListener("click", (event) => {
        event.stopPropagation();
        onSelectRef.current(place.id);
        wrapper.classList.add("engagement-globe-marker--open");
      });
    }

    const pin = document.createElement("div");
    pin.className = [
      "engagement-globe-marker__pin",
      place.active ? "engagement-globe-marker__pin--active" : "",
    ]
      .filter(Boolean)
      .join(" ");
    pin.style.color = place.active ? PIN_ACTIVE : PIN_INACTIVE;
    pin.innerHTML = PIN_SVG;

    wrapper.appendChild(tooltip);
    wrapper.appendChild(pin);

    const activate = () => {
      onSelectRef.current(place.id);
      wrapper.classList.add("engagement-globe-marker--open");
    };

    pin.setAttribute("role", "button");
    pin.setAttribute("tabindex", "0");
    pin.setAttribute("aria-label", getEngagementLine(place));

    pin.addEventListener("click", (event) => {
      event.stopPropagation();
      activate();
    });

    pin.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activate();
      }
    });

    wrapper.addEventListener("mouseenter", () => {
      wrapper.classList.add("engagement-globe-marker--hover");
    });

    wrapper.addEventListener("mouseleave", () => {
      wrapper.classList.remove("engagement-globe-marker--hover", "engagement-globe-marker--open");
    });

    pin.addEventListener("touchstart", (event) => {
      event.stopPropagation();
      activate();
    }, { passive: true });

    return wrapper;
  }, []);

  return (
    <div ref={containerRef} className={["relative touch-pan-y", className].filter(Boolean).join(" ")}>
      <Globe
        ref={globeRef}
        onGlobeReady={() => setGlobeReady(true)}
        width={dims.width}
        height={dims.height}
        globeImageUrl={GLOBE_IMAGE}
        bumpImageUrl={GLOBE_BUMP}
        backgroundColor={SPACE_BG}
        atmosphereColor="rgba(120, 180, 255, 0.35)"
        atmosphereAltitude={0.2}
        htmlElementsData={htmlElementsData}
        htmlLat="lat"
        htmlLng="lng"
        htmlAltitude={0.02}
        htmlElement={(datum) => buildPinElement(datum as HtmlGlobePlace)}
        htmlTransitionDuration={0}
        ringsData={ringsData}
        ringLat="lat"
        ringLng="lng"
        ringColor={() => "hsla(71, 100%, 73%, 0.55)"}
        ringMaxRadius={2.8}
        ringPropagationSpeed={2}
        ringRepeatPeriod={1300}
      />
    </div>
  );
}
