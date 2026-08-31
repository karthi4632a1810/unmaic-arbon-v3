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
  /** The capability pillar this element carries. */
  pillar: string;
  /** One plain line on what UNMAI actually does there. */
  summary: string;
  /** Line/type colour. */
  hue: string;
  /** Wash used behind the hue on light bands. */
  tint: string;
};

export const ELEMENTS: readonly SiteElement[] = [
  {
    id: "land",
    name: "Land",
    roman: "Nilam",
    pillar: "Carbon Advisory",
    summary:
      "Work that starts on the ground — sectoral decarbonisation pathways, NDC and LT-LEDS design, and institutional readiness.",
    hue: "#006c49",
    tint: "#e7f1ec",
  },
  {
    id: "water",
    name: "Water",
    roman: "Neer",
    pillar: "Climate Finance",
    summary:
      "Capital in motion — results-based finance, carbon credit-linked instruments, and MRV-aligned financing mechanisms.",
    hue: "#2b6193",
    tint: "#e8eff6",
  },
  {
    id: "fire",
    name: "Fire",
    roman: "Thee",
    pillar: "Carbon Trading",
    summary:
      "Where value is released — origination, transaction structuring, offtake, and credit issuance support.",
    hue: "#a35311",
    tint: "#f7ece3",
  },
  {
    id: "air",
    name: "Air",
    roman: "Kaatru",
    pillar: "Article 6",
    summary:
      "Carbon crossing borders — Article 6 operationalisation, ITMO frameworks, and corresponding adjustments.",
    hue: "#4f65e3",
    tint: "#eaedfc",
  },
  {
    id: "space",
    name: "Space",
    roman: "Aagayam",
    pillar: "Global Carbon Interoperable Infrastructure",
    summary:
      "The layer that connects them — national registries, digital MRV, and interoperable carbon data.",
    hue: "#131b2e",
    tint: "#e9eaee",
  },
];

export const ELEMENT_BY_ID = Object.fromEntries(
  ELEMENTS.map((element) => [element.id, element]),
) as Record<ElementId, SiteElement>;
