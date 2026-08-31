/**
 * Shape language for the five elements. Every motif is decorative (aria-hidden) and
 * stretches with its container — the strokes are non-scaling so they stay hairlines.
 */
import type { ReactElement } from "react";
import { ELEMENTS, type ElementId } from "../lib/elements";

const GLYPH_PATHS: Record<ElementId, ReactElement> = {
  land: (
    <>
      <path d="M2.5 18.5h19" />
      <path d="M4 14.2c2.6-3.4 4.7-3.4 6.6-.9 1.9 2.5 3.6 2.9 6.4-.6" />
      <path d="M7 9.6c2-2.2 4-2.2 6 0" />
    </>
  ),
  water: (
    <>
      <path d="M2.5 8c2.4 2.6 4.7-2.6 7.1 0 2.4 2.6 4.7-2.6 7.1 0 1 1.1 2 1.1 3 .4" />
      <path d="M2.5 13.4c2.4 2.6 4.7-2.6 7.1 0 2.4 2.6 4.7-2.6 7.1 0 1 1.1 2 1.1 3 .4" />
      <path d="M2.5 18.8c2.4 2.6 4.7-2.6 7.1 0 2.4 2.6 4.7-2.6 7.1 0 1 1.1 2 1.1 3 .4" />
    </>
  ),
  fire: (
    <>
      <path d="M12 2.5c3.2 4.2 5.4 6.6 5.4 9.7a5.4 5.4 0 1 1-10.8 0c0-1.7.8-3 1.9-4.2.5 1.9 1.6 2.6 2.6 1.9 1-.7.6-3.3.9-7.4z" />
      <path d="M12 21.5c-1.7 0-3-1.4-3-3.1 0-1.6 1.3-2.5 3-5 1.7 2.5 3 3.4 3 5 0 1.7-1.3 3.1-3 3.1z" />
    </>
  ),
  air: (
    <>
      <path d="M2.5 7.5h11.2a2.6 2.6 0 1 0-2.6-2.6" />
      <path d="M2.5 12h15a2.6 2.6 0 1 1-2.6 2.6" />
      <path d="M2.5 16.5h8.2a2.4 2.4 0 1 1-2.4 2.4" />
    </>
  ),
  space: (
    <>
      <circle cx="12" cy="12" r="3.6" />
      <ellipse cx="12" cy="12" rx="9.5" ry="4.2" transform="rotate(-26 12 12)" />
    </>
  ),
};

export function ElementGlyph({
  id,
  className = "size-6",
  strokeWidth = 1.5,
}: {
  id: ElementId;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {GLYPH_PATHS[id]}
    </svg>
  );
}

/** Land — stacked contour lines, denser toward the base, like a read-out of core samples. */
export function StrataField({ className = "", lines = 9 }: { className?: string; lines?: number }) {
  return (
    <svg
      viewBox="0 0 1200 400"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      {Array.from({ length: lines }, (_, i) => {
        const y = 40 + i * (320 / (lines - 1));
        const lift = 26 - i * 2.4;
        return (
          <path
            key={i}
            d={`M0 ${y} C 200 ${y - lift} 340 ${y + lift} 560 ${y - lift * 0.6} S 940 ${
              y + lift * 0.8
            } 1200 ${y - lift * 0.3}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            opacity={0.25 + i * 0.055}
          />
        );
      })}
    </svg>
  );
}

/** Air — long drifting streamlines. */
export function Streamlines({ className = "" }: { className?: string }) {
  const bands = [70, 150, 230, 310, 390, 470];
  return (
    <svg
      viewBox="0 0 1200 540"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      {bands.map((y, i) => (
        <path
          key={y}
          className="motif-drift"
          style={{ animationDelay: `${i * -3.5}s`, animationDuration: `${22 + i * 4}s` }}
          d={`M-200 ${y} C 60 ${y - 44} 260 ${y + 40} 520 ${y - 12} S 980 ${y + 46} 1400 ${y - 20}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          opacity={0.5 - i * 0.05}
        />
      ))}
    </svg>
  );
}

/** Fire — rays fanning from a single origin: one platform, four directions. */
export function RayFan({ className = "" }: { className?: string }) {
  const rays = Array.from({ length: 13 }, (_, i) => -68 + i * 11);
  return (
    <svg viewBox="0 0 600 600" className={className} aria-hidden="true">
      {rays.map((angle) => {
        const radians = (angle * Math.PI) / 180;
        return (
          <line
            key={angle}
            x1="300"
            y1="600"
            x2={300 + Math.sin(radians) * 720}
            y2={600 - Math.cos(radians) * 720}
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            opacity={0.5 - Math.abs(angle) / 220}
          />
        );
      })}
      {[120, 210, 300, 390].map((r) => (
        <circle
          key={r}
          cx="300"
          cy="600"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 7"
          vectorEffect="non-scaling-stroke"
          opacity="0.35"
        />
      ))}
    </svg>
  );
}

/** Space — orbital rings carrying one dot per element. */
export function OrbitField({ className = "" }: { className?: string }) {
  const rings = [
    { rx: 300, ry: 120, rotate: -18 },
    { rx: 220, ry: 92, rotate: 14 },
    { rx: 140, ry: 62, rotate: -6 },
  ];

  return (
    <svg viewBox="0 0 800 400" className={className} aria-hidden="true">
      <g transform="translate(400 200)">
        {rings.map((ring) => (
          <ellipse
            key={ring.rx}
            rx={ring.rx}
            ry={ring.ry}
            transform={`rotate(${ring.rotate})`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            opacity="0.35"
          />
        ))}
        <g className="motif-orbit">
          {ELEMENTS.map((element, i) => {
            const angle = (i / ELEMENTS.length) * Math.PI * 2;
            return (
              <circle
                key={element.id}
                cx={Math.cos(angle) * 300}
                cy={Math.sin(angle) * 120}
                r="5"
                fill={element.id === "space" ? "#e6ff80" : element.hue}
                opacity="0.9"
              />
            );
          })}
        </g>
      </g>
    </svg>
  );
}

/** A globe read as data: orthographic dot sphere, front hemisphere only. */
const DOT_SPHERE_RADIUS = 150;

const DOT_SPHERE_POINTS = (() => {
  const dots: { x: number; y: number; depth: number }[] = [];
  for (let lat = -84; lat <= 84; lat += 8) {
    const latRad = (lat * Math.PI) / 180;
    const ringRadius = Math.cos(latRad) * DOT_SPHERE_RADIUS;
    const y = Math.sin(latRad) * DOT_SPHERE_RADIUS;
    const steps = Math.max(8, Math.round((2 * Math.PI * ringRadius) / 11));
    for (let i = 0; i < steps; i += 1) {
      const lon = (i / steps) * Math.PI * 2;
      const depth = Math.cos(lon);
      if (depth <= 0.05) continue;
      dots.push({ x: Math.sin(lon) * ringRadius, y, depth });
    }
  }
  return dots;
})();

/** A few brighter nodes, so the surface reads as a live network. */
const DOT_SPHERE_NODES = [
  { x: -42, y: -78 },
  { x: 62, y: -40 },
  { x: -88, y: 12 },
  { x: 18, y: 44 },
  { x: 96, y: 76 },
  { x: -34, y: 104 },
] as const;

export function DotSphere({
  className = "",
  rings = true,
  nodes = true,
}: {
  className?: string;
  /** Orbit rings around the sphere. */
  rings?: boolean;
  /** Brighter network nodes on the surface. */
  nodes?: boolean;
}) {
  return (
    <svg viewBox="-190 -190 380 380" className={className} fill="none" aria-hidden="true">
      {rings
        ? [
            { rx: 182, ry: 176, rotate: -14 },
            { rx: 176, ry: 128, rotate: 22 },
          ].map((ring) => (
            <ellipse
              key={ring.rotate}
              rx={ring.rx}
              ry={ring.ry}
              transform={`rotate(${ring.rotate})`}
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.28"
            />
          ))
        : null}
      <g fill="currentColor">
        {DOT_SPHERE_POINTS.map((dot, i) => (
          <circle key={i} cx={dot.x} cy={dot.y} r="1.5" opacity={0.2 + dot.depth * 0.55} />
        ))}
      </g>
      {nodes ? (
        <g fill="currentColor">
          {DOT_SPHERE_NODES.map((node) => (
            <circle key={`${node.x}-${node.y}`} cx={node.x} cy={node.y} r="3" opacity="0.95" />
          ))}
        </g>
      ) : null}
    </svg>
  );
}
