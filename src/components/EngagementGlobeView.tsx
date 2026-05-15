import { useEffect, useMemo, useRef, useState } from "react";
import Globe, { type GlobeMethods } from "react-globe.gl";

/** NASA Blue Marble — full-color daytime Earth */
const GLOBE_IMAGE = "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg";
const GLOBE_BUMP = "//unpkg.com/three-globe/example/img/earth-topology.png";
const SPACE_BG = "rgba(10, 14, 24, 1)";
const PIN_ACTIVE = "hsl(71, 100%, 73%)";
const PIN_INACTIVE = "hsla(71, 100%, 73%, 0.42)";

type EngagementPlace = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};

type GlobePoint = EngagementPlace & {
  size: number;
  color: string;
};

type EngagementGlobeViewProps = {
  places: readonly EngagementPlace[];
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
  const [dims, setDims] = useState({ width: 800, height: 520 });

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

  const pointsData = useMemo<GlobePoint[]>(
    () =>
      places.map((place) => ({
        ...place,
        size: selectedId === place.id ? 0.8 : 0.42,
        color: selectedId === place.id ? PIN_ACTIVE : PIN_INACTIVE,
      })),
    [places, selectedId],
  );

  const ringsData = useMemo(() => {
    if (!selectedId) return [];
    const place = places.find((p) => p.id === selectedId);
    return place ? [{ lat: place.lat, lng: place.lng }] : [];
  }, [places, selectedId]);

  return (
    <div ref={containerRef} className={className}>
      <Globe
        ref={globeRef}
        width={dims.width}
        height={dims.height}
        globeImageUrl={GLOBE_IMAGE}
        bumpImageUrl={GLOBE_BUMP}
        backgroundColor={SPACE_BG}
        atmosphereColor="rgba(120, 180, 255, 0.35)"
        atmosphereAltitude={0.2}
        pointsData={pointsData}
        pointLat="lat"
        pointLng="lng"
        pointAltitude={0.03}
        pointRadius="size"
        pointColor="color"
        pointLabel={(d) => {
          const point = d as GlobePoint;
          return `<div class="globe-point-label">${point.name}</div>`;
        }}
        onPointClick={(point) => onSelectPlace((point as GlobePoint).id)}
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
