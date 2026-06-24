export type GlobalEngagementPlace = {
  id: string;
  /** Country shown in the side panel and used for grouping. */
  country: string;
  capital: string;
  engagement: string;
  link?: string;
  lat: number;
  lng: number;
  /** Optional city label for map pins when a country has multiple offices. */
  city?: string;
  /** When false, country name has no * suffix (e.g. Mozambique). Default true. */
  showFootnoteStar?: boolean;
};

export type EngagementCountryGroup = {
  country: string;
  places: GlobalEngagementPlace[];
};

export function getEngagementCountryGroups(
  places: readonly GlobalEngagementPlace[],
): EngagementCountryGroup[] {
  const order: string[] = [];
  const map = new Map<string, GlobalEngagementPlace[]>();

  for (const place of places) {
    if (!map.has(place.country)) {
      order.push(place.country);
      map.set(place.country, []);
    }
    map.get(place.country)!.push(place);
  }

  return order.map((country) => ({
    country,
    places: map.get(country)!,
  }));
}

export function getPlacesInCountry(
  places: readonly GlobalEngagementPlace[],
  country: string | null,
) {
  if (!country) return [];
  return places.filter((place) => place.country === country);
}

export function getCountryLabel(place: Pick<GlobalEngagementPlace, "country" | "showFootnoteStar">) {
  return place.showFootnoteStar === false ? place.country : `${place.country}*`;
}

/** Pin headline (city name when a country has multiple locations). */
export function getMarkerHeadline(
  place: Pick<GlobalEngagementPlace, "country" | "capital" | "city" | "showFootnoteStar">,
) {
  const name =
    place.city ?? (place.capital !== place.country ? place.capital : place.country);
  return place.showFootnoteStar === false ? name : `${name}*`;
}

export function getEngagementLine(
  place: Pick<
    GlobalEngagementPlace,
    "country" | "capital" | "city" | "engagement" | "showFootnoteStar"
  >,
) {
  const label = getMarkerHeadline(place);
  if (!place.engagement.trim()) return label;
  return `${label} — ${place.engagement}`;
}

/** Geographic center for flying the globe to a country with one or more pins. */
export function getCountryViewTarget(places: readonly GlobalEngagementPlace[]) {
  if (places.length === 0) return null;

  const lat =
    places.reduce((sum, place) => sum + place.lat, 0) / places.length;
  const lng =
    places.reduce((sum, place) => sum + place.lng, 0) / places.length;

  const altitude = places.length > 1 ? 0.88 : 0.52;

  return { lat, lng, altitude };
}
