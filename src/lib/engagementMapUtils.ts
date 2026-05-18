export type GlobalEngagementPlace = {
  id: string;
  country: string;
  capital: string;
  engagement: string;
  link?: string;
  lat: number;
  lng: number;
  /** When false, country name has no * suffix (e.g. Mozambique). Default true. */
  showFootnoteStar?: boolean;
};

export function getCountryLabel(place: Pick<GlobalEngagementPlace, "country" | "showFootnoteStar">) {
  return place.showFootnoteStar === false ? place.country : `${place.country}*`;
}

export function getEngagementLine(
  place: Pick<GlobalEngagementPlace, "country" | "engagement" | "showFootnoteStar">,
) {
  const label = getCountryLabel(place);
  if (!place.engagement.trim()) return label;
  return `${label} — ${place.engagement}`;
}
