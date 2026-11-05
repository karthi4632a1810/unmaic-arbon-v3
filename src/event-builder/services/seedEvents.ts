import type { EventDocument } from "../types/event";
import { EVENT_TEMPLATES } from "./templatesData";

// Only the official webinar: Extending the Utility of Legacy UNFCCC CDM CERs
const tplWebinar =
  EVENT_TEMPLATES.find((t) => t.id === "tpl_unmai_legacy_cers_webinar")?.configuration ||
  EVENT_TEMPLATES[4]?.configuration ||
  EVENT_TEMPLATES[0].configuration;

export const SEED_EVENTS: EventDocument[] = [
  // Official Webinar: Extending the Utility of Legacy UNFCCC CDM CERs
  {
    ...tplWebinar,
    id: "evt_webinar_cdm_cers_2026",
    name: "Extending the Utility of Legacy UNFCCC CDM CERs",
    slug: "extending-legacy-cdm-cers-webinar",
    status: "published",
    published: true,
    startDate: "2026-10-06T16:00:00+05:30",
    endDate: "2026-10-06T17:00:00+05:30",
    timezone: "Asia/Kolkata",
    analytics: { views: 1698, ctaClicks: 420, registrations: 148 },
    createdAt: "2026-09-28T09:00:00Z",
    updatedAt: "2026-10-05T07:35:14+02:00",
  },
];

