# Dynamic Event Website + Admin Builder

A production-ready, modern **Event Website + Admin Builder system** for creating beautiful event pages with Canva-level simplicity, structured predefined components, and instant publishing.

---

## 🌟 Key Features

- **Dynamic Event URLs**:
  - `/events/event-1`
  - `/events/event-2`
  - `/events/prashanth-hospital-gynae-event`
  - `/events/annual-medical-conference-2026`
- **Single Reusable Dynamic Renderer**: All events load dynamically based on slug configuration without hardcoding separate React pages.
- **Canva-Level Simplicity**: Predefined sections, themes, and human-friendly controls without exposing raw CSS, margins, padding, or flex-basis.
- **3-Panel Visual Event Studio**:
  - **Left Panel**: Categorized section library (Basic, Event, Content, Conversion, Media) + Page outline reordering.
  - **Center Panel**: Live canvas with device switcher (Desktop, Tablet 768px, Mobile 375px) and section hover controls.
  - **Right Panel**: Contextual properties inspector for theme settings when unselected, or section-specific controls when selected.
- **Header Builder with Presets**:
  - Floating, Fixed, or Normal positioning.
  - Transparent-to-solid, always visible, or shrink on scroll behaviors.
  - Mobile responsive drawer menu with smooth anchor scrolling (`#about`, `#speakers`, `#schedule`, `#registration`, etc.).
- **Interactive Attendee System**:
  - Ticket tiers with instant modal registration forms and confetti celebration.
  - Built-in QR code generator for every event.
  - Social sharing modal (WhatsApp, LinkedIn, X, Facebook, Direct Copy).
- **Production Admin Dashboard**:
  - Event CRUD, search, status filtering (Published, Draft).
  - One-click Duplicate Event with automatic unique slug generation.
  - Debounced Autosave with status indicator ("Saved ✓").
  - History Undo / Redo (`Ctrl+Z`, `Ctrl+Shift+Z`).
  - Predefined Templates (Medical Conference, Corporate Summit, Workshop).
  - Media Library with categorization and instant URL copy.
  - Registrations log with CSV export.

---

## 🚀 Quick Start

### 1. Development Mode

```bash
# Install dependencies
npm install

# Run Vite development server
npm run dev
```

Visit:
- **Admin Dashboard**: [http://localhost:5173/admin](http://localhost:5173/admin)
- **Events Management**: [http://localhost:5173/admin/events](http://localhost:5173/admin/events)
- **Medical Conference 2026**: [http://localhost:5173/events/event-1](http://localhost:5173/events/event-1)
- **Corporate Summit 2026**: [http://localhost:5173/events/event-2](http://localhost:5173/events/event-2)
- **Prashanth Hospital Gynaecology Event**: [http://localhost:5173/events/prashanth-hospital-gynae-event](http://localhost:5173/events/prashanth-hospital-gynae-event)
- **Annual Medical Conference 2026**: [http://localhost:5173/events/annual-medical-conference-2026](http://localhost:5173/events/annual-medical-conference-2026)

### 2. Run Tests

```bash
npx tsx src/event-builder/tests/eventBuilder.test.ts
```

All 11 unit tests verify slug generation, slug uniqueness, event creation, event duplication, publish/unpublish, section reordering, template cloning, and public event lookup.

### 3. Production Build

```bash
npm run build
```

### 4. Docker Compose Deployment

```bash
docker compose up -d --build
```

This starts:
- Frontend on port `5173` (Nginx SPA runner)
- Backend API on port `5000` (Node.js/Express)
- MongoDB on port `27017`

---

## 🏗 Architecture & Routes

```text
Admin Panel (/admin)
      ↓
Event Builder Studio (/admin/events/:id/builder)
      ↓
Event Configuration JSON (Versioned Schema v1.2)
      ↓
Database / Store (Express API + localStorage sync)
      ↓
Dynamic Event Renderer
      ↓
/events/:eventSlug
```

### Dynamic Section Registry
- `hero`: Attention-grabbing banner with background image/gradient/video, overlay slider, and CTA buttons.
- `eventInfo`: Quick summary strip with dates, time, venue, organizer badge.
- `countdown`: Live ticker deriving countdown until `event.startDate`.
- `about`: Multidisciplinary introduction with split layouts and key statistics.
- `highlights`: 3-6 responsive highlight cards with Lucide icons.
- `speakers`: Responsive faculty grid with interactive bio modal and keynote badges.
- `schedule`: Multi-day tab agenda with category filters and session timelines.
- `venue`: Physical address, directions, logistics, and embedded Google Map.
- `gallery`: Responsive event photo gallery with fullscreen lightbox modal.
- `sponsors`: Tiered partner grid (Platinum, Gold, Silver, Partner).
- `testimonials`: Attendee quotes, ratings, and avatars.
- `faq`: Animated accordions with real-time question search.
- `registration`: Tiered pass options with modal registration form + confetti.
- `video`: Embed YouTube, Vimeo, or direct video.
- `richText`: Clean editorial content.
- `contact`: Official secretariat helpline, email, and location.
- `footer`: Navigation links, legal disclaimers, and back-to-top button.
