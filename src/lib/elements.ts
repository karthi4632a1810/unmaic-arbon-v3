/**
 * Pancha Bhuta — the five classical elements, used as the site's organising motif.
 * Each element owns a hue, a shape language, and one of UNMAI's five capability pillars,
 * so a section's form always says something true about its content.
 *
 * Hues are drawn from the existing brand palette wherever one already existed.
 */

export type ElementId = "land" | "water" | "fire" | "air" | "space";

export type SiteElement = {
  id: ElementId;
  /** English name shown as the element label. */
  name: string;
  /** Romanised Tamil — UNMAI (உண்மை, "truth") is a Tamil word, so the motif keeps its roots. */
  roman: string;
  /** English classical element alias (Earth, Water, Fire, Air, Ether). */
  elementLabel: string;
  /** The capability pillar this element carries. */
  pillar: string;
  /** One plain line on what UNMAI actually does there. */
  summary: string;
  /** Line/type colour. */
  hue: string;
  /** Wash used behind the hue on light bands. */
  tint: string;
  /** Real photographic nature background image for the element. */
  bgImage: string;
};

export const ELEMENTS: readonly SiteElement[] = [
  {
    id: "land",
    name: "Land",
    roman: "Nilam",
    elementLabel: "Earth",
    pillar: "Carbon Advisory",
    summary:
      "Work that starts on the ground — sectoral decarbonisation pathways, NDC and LT-LEDS design, and institutional readiness.",
    hue: "#4a5568",
    tint: "#eceef1",
    bgImage:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: "water",
    name: "Water",
    roman: "Neer",
    elementLabel: "Water",
    pillar: "Climate Finance",
    summary:
      "Capital in motion — results-based finance, carbon credit-linked instruments, and MRV-aligned financing mechanisms.",
    hue: "#2b6193",
    tint: "#e8eff6",
    bgImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: "fire",
    name: "Fire",
    roman: "Thee",
    elementLabel: "Fire",
    pillar: "Carbon Trading",
    summary:
      "Where value is released — origination, transaction structuring, offtake, and credit issuance support.",
    hue: "#a35311",
    tint: "#f7ece3",
    bgImage:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: "air",
    name: "Air",
    roman: "Kaatru",
    elementLabel: "Air",
    pillar: "Article 6",
    summary:
      "Carbon crossing borders — Article 6 operationalisation, ITMO frameworks, and corresponding adjustments.",
    hue: "#4f65e3",
    tint: "#eaedfc",
    bgImage:
      "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: "space",
    name: "Space",
    roman: "Aagayam",
    elementLabel: "Ether",
    pillar: "Global Carbon Interoperable Infrastructure",
    summary:
      "The layer that connects them — national registries, digital MRV, and interoperable carbon data.",
    hue: "#131b2e",
    tint: "#e9eaee",
    bgImage:
      "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=2000&q=80",
  },
];

export const ELEMENT_BY_ID = Object.fromEntries(
  ELEMENTS.map((element) => [element.id, element]),
) as Record<ElementId, SiteElement>;
