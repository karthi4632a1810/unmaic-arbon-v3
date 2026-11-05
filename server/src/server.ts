import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_DIR = path.join(__dirname, "../data");

app.use(cors());
app.use(express.json({ limit: "20mb" }));

// Ensure data directory exists for file persistence fallback
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const EVENTS_FILE = path.join(DATA_DIR, "events.json");
const TEMPLATES_FILE = path.join(DATA_DIR, "templates.json");
const REGISTRATIONS_FILE = path.join(DATA_DIR, "registrations.json");
const MEDIA_FILE = path.join(DATA_DIR, "media.json");

function readJsonFile(filePath: string, fallback: any[] = []): any[] {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content);
  } catch (err) {
    return fallback;
  }
}

function writeJsonFile(filePath: string, data: any) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing JSON file:", err);
  }
}

function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Health check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    version: "1.0.0",
    service: "Event Builder API",
    timestamp: new Date().toISOString(),
  });
});

// GET /api/events
app.get("/api/events", (_req: Request, res: Response) => {
  const events = readJsonFile(EVENTS_FILE);
  res.json(events);
});

// GET /api/events/:id
app.get("/api/events/:id", (req: Request, res: Response) => {
  const events = readJsonFile(EVENTS_FILE);
  const event = events.find((e) => e.id === req.params.id || e.slug === req.params.id);
  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }
  res.json(event);
});

// POST /api/events
app.post("/api/events", (req: Request, res: Response) => {
  const { name, slug, startDate, endDate, timezone, templateId } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Event name is required" });
  }

  const events = readJsonFile(EVENTS_FILE);
  let finalSlug = slug ? slugify(slug) : slugify(name);
  let counter = 1;
  while (events.some((e) => e.slug === finalSlug)) {
    counter++;
    finalSlug = `${slug ? slugify(slug) : slugify(name)}-${counter}`;
  }

  const newEvent = {
    id: "evt_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now().toString(36),
    name,
    slug: finalSlug,
    status: "draft",
    published: false,
    startDate: startDate || new Date().toISOString(),
    endDate: endDate || startDate || new Date().toISOString(),
    timezone: timezone || "Asia/Kolkata",
    schemaVersion: 1,
    branding: {
      primaryColor: "#0284c7",
      secondaryColor: "#0f766e",
      font: "Inter",
      buttonStyle: "rounded-md",
    },
    header: {
      visible: true,
      layout: "centered",
      position: "floating",
      topGap: 16,
      radius: "full",
      background: "blur",
      scrollBehavior: "transparent-to-solid",
      navigation: [],
    },
    hero: {
      id: "hero_1",
      type: "hero",
      visible: true,
      settings: {},
      content: {
        heading: name,
        subtitle: "Annual Event 2026",
        description: "Join leading practitioners and thought leaders.",
        bgType: "gradient",
        overlay: "dark",
        overlayStrength: 60,
        contentAlignment: "center",
        verticalPosition: "center",
        contentWidth: "medium",
        buttons: [{ id: "b1", label: "Register Now", link: "#registration", style: "primary" }],
      },
    },
    sections: [],
    footer: {
      visible: true,
      copyrightText: `© ${new Date().getFullYear()} ${name}. All rights reserved.`,
      quickLinks: [],
      socialLinks: [],
    },
    seo: {
      title: `${name} | Official Event Page`,
      description: `Official registration and conference portal for ${name}.`,
    },
    analytics: { views: 0, ctaClicks: 0, registrations: 0 },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  events.unshift(newEvent);
  writeJsonFile(EVENTS_FILE, events);
  res.status(201).json(newEvent);
});

// PUT /api/events/:id
app.put("/api/events/:id", (req: Request, res: Response) => {
  const events = readJsonFile(EVENTS_FILE);
  const index = events.findIndex((e) => e.id === req.params.id);
  if (index < 0) {
    return res.status(404).json({ error: "Event not found" });
  }

  const updated = {
    ...events[index],
    ...req.body,
    id: events[index].id,
    updatedAt: new Date().toISOString(),
  };

  events[index] = updated;
  writeJsonFile(EVENTS_FILE, events);
  res.json(updated);
});

// DELETE /api/events/:id
app.delete("/api/events/:id", (req: Request, res: Response) => {
  const events = readJsonFile(EVENTS_FILE);
  const filtered = events.filter((e) => e.id !== req.params.id);
  if (filtered.length === events.length) {
    return res.status(404).json({ error: "Event not found" });
  }
  writeJsonFile(EVENTS_FILE, filtered);
  res.json({ success: true, message: "Event deleted" });
});

// POST /api/events/:id/publish
app.post("/api/events/:id/publish", (req: Request, res: Response) => {
  const events = readJsonFile(EVENTS_FILE);
  const index = events.findIndex((e) => e.id === req.params.id);
  if (index < 0) return res.status(404).json({ error: "Event not found" });

  events[index].published = true;
  events[index].status = "published";
  events[index].updatedAt = new Date().toISOString();
  writeJsonFile(EVENTS_FILE, events);
  res.json(events[index]);
});

// POST /api/events/:id/unpublish
app.post("/api/events/:id/unpublish", (req: Request, res: Response) => {
  const events = readJsonFile(EVENTS_FILE);
  const index = events.findIndex((e) => e.id === req.params.id);
  if (index < 0) return res.status(404).json({ error: "Event not found" });

  events[index].published = false;
  events[index].status = "draft";
  events[index].updatedAt = new Date().toISOString();
  writeJsonFile(EVENTS_FILE, events);
  res.json(events[index]);
});

// POST /api/events/:id/duplicate
app.post("/api/events/:id/duplicate", (req: Request, res: Response) => {
  const events = readJsonFile(EVENTS_FILE);
  const source = events.find((e) => e.id === req.params.id);
  if (!source) return res.status(404).json({ error: "Event not found" });

  let newSlug = `${source.slug}-copy`;
  let counter = 1;
  while (events.some((e) => e.slug === newSlug)) {
    counter++;
    newSlug = `${source.slug}-copy-${counter}`;
  }

  const clone = {
    ...JSON.parse(JSON.stringify(source)),
    id: "evt_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now().toString(36),
    name: `${source.name} (Copy)`,
    slug: newSlug,
    published: false,
    status: "draft",
    analytics: { views: 0, ctaClicks: 0, registrations: 0 },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  events.unshift(clone);
  writeJsonFile(EVENTS_FILE, events);
  res.status(201).json(clone);
});

// PUBLIC ENDPOINT: GET /api/public/events/:slug
app.get("/api/public/events/:slug", (req: Request, res: Response) => {
  const events = readJsonFile(EVENTS_FILE);
  const event = events.find(
    (e) => e.slug.toLowerCase().trim() === req.params.slug.toLowerCase().trim()
  );

  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }

  // Sanitized public representation
  const publicData = {
    name: event.name,
    slug: event.slug,
    published: event.published,
    startDate: event.startDate,
    endDate: event.endDate,
    timezone: event.timezone,
    branding: event.branding,
    header: event.header,
    hero: event.hero,
    sections: event.sections.filter((s: any) => s.visible),
    footer: event.footer,
    seo: event.seo,
  };

  res.json(publicData);
});

// POST /api/public/events/:slug/register
app.post("/api/public/events/:slug/register", (req: Request, res: Response) => {
  const { fullName, email, phone, organization, ticketTierName, ticketPrice, notes } = req.body;
  if (!fullName || !email) {
    return res.status(400).json({ error: "Full name and email are required" });
  }

  const registrations = readJsonFile(REGISTRATIONS_FILE);
  const newRecord = {
    id: "reg_" + Date.now().toString(36),
    eventSlug: req.params.slug,
    fullName,
    email,
    phone,
    organization,
    ticketTierName,
    ticketPrice,
    notes,
    createdAt: new Date().toISOString(),
  };

  registrations.unshift(newRecord);
  writeJsonFile(REGISTRATIONS_FILE, registrations);
  res.status(201).json({ success: true, registration: newRecord });
});

// GET /api/templates
app.get("/api/templates", (_req: Request, res: Response) => {
  const templates = readJsonFile(TEMPLATES_FILE);
  res.json(templates);
});

// GET /api/media
app.get("/api/media", (_req: Request, res: Response) => {
  const media = readJsonFile(MEDIA_FILE);
  res.json(media);
});

// POST /api/media
app.post("/api/media", (req: Request, res: Response) => {
  const { name, url, category } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  const media = readJsonFile(MEDIA_FILE);
  const newItem = {
    id: "med_" + Date.now().toString(36),
    name: name || "Asset",
    url,
    category: category || "all",
    sizeBytes: 1024 * 500,
    createdAt: new Date().toISOString(),
  };

  media.unshift(newItem);
  writeJsonFile(MEDIA_FILE, media);
  res.status(201).json(newItem);
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`[Event Builder API] Server running on http://localhost:${PORT}`);
});

export default app;
