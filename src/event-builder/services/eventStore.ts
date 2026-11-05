import type { EventDocument, EventTemplate } from "../types/event";
import { SEED_EVENTS } from "./seedEvents";
import { EVENT_TEMPLATES } from "./templatesData";

const STORAGE_KEY = "event_builder_events_v5_past";
const TEMPLATES_KEY = "event_builder_templates_v5_past";
const REGISTRATIONS_KEY = "event_builder_registrations_v3_bw";

/**
 * Clean slugify function with unicode handling, transliteration,
 * lowercase conversion, and hyphen trimming.
 */
export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Remove invalid chars
    .replace(/[\s_]+/g, "-") // Replace spaces with -
    .replace(/-+/g, "-") // Collapse consecutive -
    .replace(/^-+|-+$/g, ""); // Trim dashes
}

export interface RegistrationRecord {
  id: string;
  eventId: string;
  eventSlug: string;
  eventName: string;
  fullName: string;
  email: string;
  phone?: string;
  organization?: string;
  ticketTierId?: string;
  ticketTierName?: string;
  ticketPrice?: string;
  notes?: string;
  createdAt: string;
}

const DEPRECATED_EVENT_IDS = new Set([
  "evt_seed_001",
  "evt_seed_002",
  "evt_seed_003",
  "evt_seed_004",
  "event-1",
  "event-2",
  "prashanth-hospital-gynae-event",
  "annual-medical-conference-2026",
]);

class EventStoreService {
  private events: EventDocument[] = [];
  private templates: EventTemplate[] = [];

  constructor() {
    this.initialize();
  }

  private initialize() {
    if (typeof window === "undefined") {
      this.events = [...SEED_EVENTS];
      this.templates = [...EVENT_TEMPLATES];
      return;
    }

    try {
      const storedEvents = localStorage.getItem(STORAGE_KEY);
      if (storedEvents) {
        const parsed = JSON.parse(storedEvents);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Purge legacy deleted events
          const cleanEvents = parsed.filter(
            (e: EventDocument) => !DEPRECATED_EVENT_IDS.has(e.id) && !DEPRECATED_EVENT_IDS.has(e.slug)
          );
          const hasWebinar = cleanEvents.some(
            (e: EventDocument) => e.id === "evt_webinar_cdm_cers_2026" || e.slug === "extending-legacy-cdm-cers-webinar"
          );
          this.events = hasWebinar && cleanEvents.length > 0 ? cleanEvents : [...SEED_EVENTS];
        } else {
          this.events = [...SEED_EVENTS];
        }
      } else {
        this.events = [...SEED_EVENTS];
      }
      this.persistEvents();

      const storedTemplates = localStorage.getItem(TEMPLATES_KEY);
      if (storedTemplates) {
        this.templates = JSON.parse(storedTemplates);
      } else {
        this.templates = [...EVENT_TEMPLATES];
        localStorage.setItem(TEMPLATES_KEY, JSON.stringify(this.templates));
      }

      // Sync with PHP SQLite file-based database
      this.syncFromBackend();
    } catch (e) {
      console.error("Failed to initialize event store:", e);
      this.events = [...SEED_EVENTS];
      this.templates = [...EVENT_TEMPLATES];
    }
  }

  public async syncFromBackend(): Promise<void> {
    if (typeof window === "undefined") return;
    try {
      const res = await fetch("/api/events.php");
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const remoteEvents: EventDocument[] = json.data;
          this.events = remoteEvents;
          this.persistEvents();
        }
      }
    } catch {
      // Local fallback
    }
  }

  private async syncToBackend(event: EventDocument): Promise<void> {
    if (typeof window === "undefined") return;
    try {
      await fetch("/api/events.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      });
    } catch {
      // Fallback
    }
  }

  private persistEvents() {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.events));
    } catch (e) {
      console.warn("Storage quota or localStorage error:", e);
    }
  }

  public getEvents(): EventDocument[] {
    return [...this.events];
  }

  public getTemplates(): EventTemplate[] {
    return [...this.templates];
  }

  public getEventById(id: string): EventDocument | null {
    const found = this.events.find((e) => e.id === id);
    if (!found && this.events.length === 1) {
      return this.events[0];
    }
    return found || null;
  }

  public getEventBySlug(slug: string): EventDocument | null {
    const cleanSlug = slug.toLowerCase().trim();
    if (
      cleanSlug === "webinar" ||
      cleanSlug === "cdm-webinar" ||
      cleanSlug === "event-1" ||
      cleanSlug === "event-2" ||
      cleanSlug === "extending-legacy-cdm-cers-webinar"
    ) {
      const webinar = this.events.find(
        (e) => e.slug === "extending-legacy-cdm-cers-webinar" || e.id === "evt_webinar_cdm_cers_2026"
      );
      if (webinar) return webinar;
    }
    const found = this.events.find((e) => e.slug.toLowerCase().trim() === cleanSlug);
    if (!found && this.events.length === 1) {
      return this.events[0];
    }
    return found || null;
  }

  public generateUniqueSlug(baseName: string, excludeId?: string): string {
    let base = slugify(baseName) || "event";
    let candidate = base;
    let counter = 1;

    while (this.events.some((e) => e.slug === candidate && e.id !== excludeId)) {
      counter++;
      candidate = `${base}-${counter}`;
    }

    return candidate;
  }

  public createEvent(
    data: {
      name: string;
      slug?: string;
      startDate?: string;
      endDate?: string;
      timezone?: string;
      templateId?: string;
      category?: string;
    }
  ): EventDocument {
    const template = this.templates.find((t) => t.id === data.templateId) || this.templates[0];
    const baseConfig = template ? template.configuration : EVENT_TEMPLATES[0].configuration;

    const slug = data.slug
      ? this.generateUniqueSlug(data.slug)
      : this.generateUniqueSlug(data.name);

    const now = new Date().toISOString();
    const newEvent: EventDocument = {
      ...JSON.parse(JSON.stringify(baseConfig)),
      id: "evt_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now().toString(36),
      name: data.name,
      slug,
      status: "draft",
      published: false,
      startDate: data.startDate || now,
      endDate: data.endDate || data.startDate || now,
      timezone: data.timezone || "Asia/Kolkata",
      category: data.category || template?.category || "General",
      analytics: { views: 0, ctaClicks: 0, registrations: 0 },
      createdAt: now,
      updatedAt: now,
    };

    // Replace hero title with new event name
    if (newEvent.hero?.content) {
      newEvent.hero.content.heading = data.name;
    }

    this.events.unshift(newEvent);
    this.persistEvents();
    this.syncToBackend(newEvent);
    return newEvent;
  }

  public saveEvent(event: EventDocument): EventDocument {
    const index = this.events.findIndex((e) => e.id === event.id);
    const updated: EventDocument = {
      ...event,
      updatedAt: new Date().toISOString(),
    };

    if (index >= 0) {
      this.events[index] = updated;
    } else {
      this.events.unshift(updated);
    }

    this.persistEvents();
    this.syncToBackend(updated);
    return updated;
  }

  public duplicateEvent(id: string): EventDocument {
    const source = this.getEventById(id);
    if (!source) throw new Error("Event not found");

    const newName = `${source.name} (Copy)`;
    const newSlug = this.generateUniqueSlug(`${source.slug}-copy`);
    const now = new Date().toISOString();

    const clone: EventDocument = {
      ...JSON.parse(JSON.stringify(source)),
      id: "evt_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now().toString(36),
      name: newName,
      slug: newSlug,
      status: "draft",
      published: false,
      analytics: { views: 0, ctaClicks: 0, registrations: 0 },
      createdAt: now,
      updatedAt: now,
    };

    this.events.unshift(clone);
    this.persistEvents();
    this.syncToBackend(clone);
    return clone;
  }

  public deleteEvent(id: string): boolean {
    const initialLen = this.events.length;
    this.events = this.events.filter((e) => e.id !== id);
    if (this.events.length !== initialLen) {
      this.persistEvents();
      if (typeof window !== "undefined") {
        fetch(`/api/events.php?id=${encodeURIComponent(id)}`, { method: "DELETE" }).catch(() => {});
      }
      return true;
    }
    return false;
  }

  public togglePublish(id: string): EventDocument {
    const event = this.getEventById(id);
    if (!event) throw new Error("Event not found");

    const isNowPublished = !event.published;
    const updated: EventDocument = {
      ...event,
      published: isNowPublished,
      status: isNowPublished ? "published" : "draft",
      updatedAt: new Date().toISOString(),
    };

    return this.saveEvent(updated);
  }

  public recordView(slug: string) {
    const event = this.getEventBySlug(slug);
    if (event) {
      if (!event.analytics) event.analytics = { views: 0, ctaClicks: 0, registrations: 0 };
      event.analytics.views = (event.analytics.views || 0) + 1;
      this.saveEvent(event);
    }
  }

  public recordCtaClick(slug: string) {
    const event = this.getEventBySlug(slug);
    if (event) {
      if (!event.analytics) event.analytics = { views: 0, ctaClicks: 0, registrations: 0 };
      event.analytics.ctaClicks = (event.analytics.ctaClicks || 0) + 1;
      this.saveEvent(event);
    }
  }

  public submitRegistration(record: Omit<RegistrationRecord, "id" | "createdAt">): RegistrationRecord {
    const fullRecord: RegistrationRecord = {
      ...record,
      id: "reg_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    try {
      const stored = localStorage.getItem(REGISTRATIONS_KEY);
      const all: RegistrationRecord[] = stored ? JSON.parse(stored) : [];
      all.unshift(fullRecord);
      localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(all));

      // Bump count on event
      const event = this.getEventBySlug(record.eventSlug);
      if (event) {
        if (!event.analytics) event.analytics = { views: 0, ctaClicks: 0, registrations: 0 };
        event.analytics.registrations = (event.analytics.registrations || 0) + 1;
        this.saveEvent(event);
      }

      // Sync registration to PHP SQLite file database
      if (typeof window !== "undefined") {
        fetch("/api/registrations.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fullRecord),
        }).catch(() => {});
      }
    } catch (e) {
      console.warn("Error storing registration:", e);
    }

    return fullRecord;
  }

  public addRegistration(record: Omit<RegistrationRecord, "id" | "createdAt">): RegistrationRecord {
    return this.submitRegistration(record);
  }

  public getRegistrations(eventSlug?: string): RegistrationRecord[] {
    try {
      const stored = localStorage.getItem(REGISTRATIONS_KEY);
      const all: RegistrationRecord[] = stored ? JSON.parse(stored) : [];
      if (eventSlug) {
        return all.filter((r) => r.eventSlug === eventSlug);
      }
      return all;
    } catch (e) {
      return [];
    }
  }

  public resetToSeeds(): void {
    this.events = [...SEED_EVENTS];
    this.persistEvents();
  }
}

export const eventStore = new EventStoreService();
