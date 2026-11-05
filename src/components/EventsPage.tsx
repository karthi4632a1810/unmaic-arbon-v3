import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { SiteHeader } from "./SiteHeader";
import { PageBanner, SectionHeading } from "./PageSections";
import { SiteCta } from "./SiteCta";
import { SiteFooter } from "./SiteFooter";
import { ScrollReveal } from "./ScrollReveal";
import { ScheduleConsultationModal } from "./ScheduleConsultationModal";
import { EventRegistrationModal } from "./EventRegistrationModal";
import { EVENTS_DATA, type EventItem, type EventCategory, type EventFormat } from "../data/events";
import { ELEMENT_BY_ID } from "../lib/elements";

export function EventsPage() {
  const [selectedTab, setSelectedTab] = useState<"all" | "upcoming" | "past">("all");
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>("All");
  const [selectedFormat, setSelectedFormat] = useState<EventFormat>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [selectedEventForModal, setSelectedEventForModal] = useState<EventItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const categories: EventCategory[] = ["All", "Summit", "Webinar", "Roundtable", "Forum", "Masterclass"];
  const formats: EventFormat[] = ["All", "In-Person", "Virtual", "Hybrid"];

  // Filter logic
  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter((event) => {
      // Tab filter
      if (selectedTab !== "all" && event.status !== selectedTab) {
        return false;
      }
      // Category filter
      if (selectedCategory !== "All" && event.category !== selectedCategory) {
        return false;
      }
      // Format filter
      if (selectedFormat !== "All" && event.format !== selectedFormat) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = event.title.toLowerCase().includes(q);
        const matchesSummary = event.summary.toLowerCase().includes(q);
        const matchesLocation = event.location.toLowerCase().includes(q);
        const matchesTopics = event.topics.some((t) => t.toLowerCase().includes(q));
        const matchesSpeakers = event.speakers?.some((s) => s.name.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSummary && !matchesLocation && !matchesTopics && !matchesSpeakers) {
          return false;
        }
      }
      return true;
    });
  }, [selectedTab, selectedCategory, selectedFormat, searchQuery]);

  const upcomingEvents = useMemo(
    () => filteredEvents.filter((e) => e.status === "upcoming"),
    [filteredEvents]
  );
  const pastEvents = useMemo(
    () => filteredEvents.filter((e) => e.status === "past"),
    [filteredEvents]
  );

  const handleOpenRegistration = (event: EventItem) => {
    setSelectedEventForModal(event);
    setModalOpen(true);
  };

  const resetFilters = () => {
    setSelectedTab("all");
    setSelectedCategory("All");
    setSelectedFormat("All");
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedTab !== "all" ||
    selectedCategory !== "All" ||
    selectedFormat !== "All" ||
    searchQuery.trim() !== "";

  return (
    <div className="min-h-screen bg-[#fafafc] font-sans text-[#191c1d] antialiased">
      <SiteHeader />

      {/* Banner using 'air' / Article 6 motif */}
      <PageBanner
        element="air"
        title="Events & Global Dialogues"
        subtitle="Convening sovereign leaders, climate negotiators, carbon market architects, and institutional investors across global summits, webinars, and policy roundtables."
        backgroundImage="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=2000&auto=format&fit=crop&q=80"
      />

      <main className="mx-auto max-w-[1240px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        {/* ======================= FILTER & CONTROL TOOLBAR ======================= */}
        <div className="mb-10 rounded-2xl border border-black/10 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            {/* View Tabs: All / Upcoming / Past */}
            <div className="inline-flex rounded-xl bg-neutral-100 p-1.5 self-start">
              <button
                type="button"
                onClick={() => setSelectedTab("all")}
                className={`rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedTab === "all"
                    ? "bg-white text-black shadow-sm"
                    : "text-neutral-600 hover:text-black"
                }`}
              >
                All Events ({EVENTS_DATA.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedTab("upcoming")}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedTab === "upcoming"
                    ? "bg-white text-black shadow-sm"
                    : "text-neutral-600 hover:text-black"
                }`}
              >
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                Upcoming ({EVENTS_DATA.filter((e) => e.status === "upcoming").length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedTab("past")}
                className={`rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedTab === "past"
                    ? "bg-white text-black shadow-sm"
                    : "text-neutral-600 hover:text-black"
                }`}
              >
                Past Events ({EVENTS_DATA.filter((e) => e.status === "past").length})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:max-w-xs">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events, topics, speakers..."
                className="w-full rounded-xl border border-black/15 bg-neutral-50/70 pl-9 pr-4 py-2 text-xs text-black placeholder:text-neutral-400 outline-none transition focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
              />
              <svg
                className="absolute left-3 top-2.5 size-4 text-neutral-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-2.5 text-xs text-neutral-400 hover:text-black"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Secondary Filter: Formats and Categories */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-black/5 pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mr-1">
                Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-lg px-3 py-1 text-xs font-medium transition ${
                    selectedCategory === cat
                      ? "bg-[#131b2e] text-white"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mr-1">
                Format:
              </span>
              {formats.map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setSelectedFormat(fmt)}
                  className={`rounded-lg px-3 py-1 text-xs font-medium transition ${
                    selectedFormat === fmt
                      ? "bg-[#2b6193] text-white"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  {fmt}
                </button>
              ))}

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="ml-2 text-xs font-semibold text-red-600 hover:underline"
                >
                  Reset All
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Empty Search Result Fallback */}
        {filteredEvents.length === 0 && (
          <div className="my-12 rounded-2xl border border-dashed border-black/20 bg-white p-12 text-center">
            <p className="text-sm font-semibold text-neutral-500">No events match your current filter.</p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-3 inline-flex rounded-lg bg-[#131b2e] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-black"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ======================= SECTION 1: UPCOMING EVENTS ======================= */}
        {(selectedTab === "all" || selectedTab === "upcoming") && upcomingEvents.length > 0 && (
          <section id="upcoming" className="mb-16 scroll-mt-24">
            <SectionHeading
              eyebrow="Convenings & Summits"
              title="Upcoming Events"
              paragraph="Register for upcoming climate conferences, bilateral Article 6 dialogues, and technical roundtables."
              hue={ELEMENT_BY_ID.air.hue}
            />

            <div className="mt-8 space-y-8">
              {upcomingEvents.map((event) => (
                <ScrollReveal key={event.id}>
                  {event.featured ? (
                    /* Featured Flagship Upcoming Card */
                    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition-all duration-300 hover:shadow-xl lg:grid lg:grid-cols-12">
                      {/* Left Banner Image & Badge */}
                      <div className="relative min-h-[260px] lg:col-span-5 lg:min-h-full">
                        <img
                          src={event.bannerImage}
                          alt={event.title}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent lg:hidden" />
                        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white shadow">
                            <span className="size-1.5 rounded-full bg-white animate-pulse" />
                            Upcoming
                          </span>
                          <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                            {event.category}
                          </span>
                        </div>

                        {/* Date overlay box on desktop */}
                        <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/20 bg-black/75 p-3.5 backdrop-blur-md text-white">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                            Summit Dates
                          </p>
                          <p className="mt-0.5 text-base font-bold sm:text-lg">{event.dateLabel}</p>
                          <p className="text-xs text-neutral-300">{event.timeLabel}</p>
                        </div>
                      </div>

                      {/* Right Details */}
                      <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-7">
                        <div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-500">
                            <span className="inline-flex items-center gap-1.5 font-semibold text-[#2b6193]">
                              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                              </svg>
                              {event.venue || event.location}
                            </span>
                            <span>•</span>
                            <span className="rounded bg-neutral-100 px-2 py-0.5 font-medium text-neutral-700">
                              Format: {event.format}
                            </span>
                          </div>

                          <h3 className="display-head mt-3 text-xl font-bold leading-tight tracking-tight text-[#131b2e] sm:text-2xl">
                            {event.title}
                          </h3>

                          {event.tagline && (
                            <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-[#4f65e3]">
                              {event.tagline}
                            </p>
                          )}

                          <p className="mt-3 text-sm leading-relaxed text-[#444654]">
                            {event.summary}
                          </p>

                          {/* Topics */}
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {event.topics.map((t) => (
                              <span
                                key={t}
                                className="rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[11px] font-medium text-neutral-700"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          {/* Speakers */}
                          {event.speakers && event.speakers.length > 0 && (
                            <div className="mt-5 border-t border-black/5 pt-4">
                              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                                Key Leadership & Advisors
                              </p>
                              <div className="mt-2 flex flex-wrap gap-3">
                                {event.speakers.map((spk) => (
                                  <div key={spk.name} className="flex items-center gap-2">
                                    <div className="flex size-7 items-center justify-center rounded-full bg-[#131b2e] text-[10px] font-bold text-white">
                                      {spk.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                                    </div>
                                    <div className="text-left">
                                      <p className="text-xs font-bold leading-none text-[#131b2e]">{spk.name}</p>
                                      <p className="text-[10px] text-neutral-500">{spk.role}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-black/5 pt-5">
                          <button
                            type="button"
                            onClick={() => handleOpenRegistration(event)}
                            className="inline-flex items-center gap-2 rounded-xl bg-[#131b2e] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow transition hover:bg-black active:scale-[0.99]"
                          >
                            {event.ctaPrimary.label}
                            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </button>

                          {event.ctaSecondary && (
                            <a
                              href={event.ctaSecondary.url}
                              download={event.ctaSecondary.isDownload}
                              target={event.ctaSecondary.isExternal ? "_blank" : undefined}
                              rel={event.ctaSecondary.isExternal ? "noreferrer noopener" : undefined}
                              className="inline-flex items-center gap-2 rounded-xl border border-black/15 bg-white px-5 py-2.5 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50 hover:text-black"
                            >
                              {event.ctaSecondary.label}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Regular Upcoming Card */
                    <div className="flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition hover:shadow-lg md:flex-row md:items-center md:gap-6">
                      <div className="max-w-3xl">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 font-bold uppercase tracking-wider text-emerald-700 text-[10px]">
                            <span className="size-1.5 rounded-full bg-emerald-500" />
                            Upcoming
                          </span>
                          <span className="rounded bg-neutral-100 px-2 py-0.5 font-medium text-neutral-700 text-[10px]">
                            {event.category}
                          </span>
                          <span className="text-neutral-300">•</span>
                          <span className="font-semibold text-[#2b6193]">{event.dateLabel}</span>
                          <span className="text-neutral-300">•</span>
                          <span className="text-neutral-500">{event.location}</span>
                        </div>

                        <h3 className="display-head mt-2.5 text-lg font-bold text-[#131b2e] sm:text-xl">
                          {event.title}
                        </h3>

                        {event.tagline && (
                          <p className="mt-1 text-xs font-medium text-[#4f65e3]">{event.tagline}</p>
                        )}

                        <p className="mt-2 text-sm leading-relaxed text-[#444654]">
                          {event.summary}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {event.topics.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="rounded border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[10px] font-medium text-neutral-600"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 flex shrink-0 items-center gap-3 md:mt-0 md:flex-col md:items-end">
                        <button
                          type="button"
                          onClick={() => handleOpenRegistration(event)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-[#131b2e] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-black"
                        >
                          {event.ctaPrimary.label}
                          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </button>
                        {event.ctaSecondary && (
                          <a
                            href={event.ctaSecondary.url}
                            target={event.ctaSecondary.isExternal ? "_blank" : undefined}
                            rel={event.ctaSecondary.isExternal ? "noreferrer noopener" : undefined}
                            className="text-xs font-semibold text-[#2b6193] hover:underline"
                          >
                            {event.ctaSecondary.label} →
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}

        {/* ======================= SECTION 2: PAST EVENTS ======================= */}
        {(selectedTab === "all" || selectedTab === "past") && pastEvents.length > 0 && (
          <section id="past" className="scroll-mt-24">
            <SectionHeading
              eyebrow="Archive & Knowledge Base"
              title="Past Events & Recordings"
              paragraph="Explore post-event recordings, presentation decks, and outcome documents from previous convenings."
              hue={ELEMENT_BY_ID.water.hue}
            />

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {pastEvents.map((event) => (
                <ScrollReveal key={event.id}>
                  <div className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition hover:shadow-lg">
                    {/* Top banner / Image */}
                    {event.featured && (
                      <div className="relative h-48 w-full overflow-hidden bg-neutral-900 sm:h-56">
                        <img
                          src={event.bannerImage}
                          alt={event.title}
                          className="h-full w-full object-cover opacity-90 transition duration-300 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                          <span className="rounded bg-black/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                            Recording & Deck Available
                          </span>
                          <span className="text-xs font-semibold">{event.dateLabel}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        {!event.featured && (
                          <div className="mb-2 flex items-center justify-between text-xs">
                            <span className="rounded bg-neutral-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neutral-600">
                              {event.category} • Concluded
                            </span>
                            <span className="font-semibold text-neutral-500">{event.dateLabel}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-xs text-neutral-500">
                          <span className="font-medium text-[#2b6193]">{event.location}</span>
                          <span>•</span>
                          <span>{event.timeLabel}</span>
                        </div>

                        <h3 className="display-head mt-2 text-lg font-bold leading-snug text-[#131b2e] sm:text-xl">
                          {event.title}
                        </h3>

                        {event.tagline && (
                          <p className="mt-1 text-xs font-medium text-neutral-600">{event.tagline}</p>
                        )}

                        <p className="mt-3 text-xs leading-relaxed text-[#444654] sm:text-sm">
                          {event.summary}
                        </p>

                        {/* Speakers list if present */}
                        {event.speakers && event.speakers.length > 0 && (
                          <div className="mt-4 border-t border-black/5 pt-3">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                              Speakers
                            </p>
                            <p className="mt-1 text-xs text-neutral-700">
                              {event.speakers.map((s) => s.name).join(", ")}
                            </p>
                          </div>
                        )}

                        {/* Topics */}
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {event.topics.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="rounded border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[10px] font-medium text-neutral-600"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-black/5 pt-4">
                        {event.ctaPrimary.action === "link" && event.ctaPrimary.url ? (
                          <Link
                            to={event.ctaPrimary.url}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-[#131b2e] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-black"
                          >
                            {event.ctaPrimary.label}
                            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </Link>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleOpenRegistration(event)}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-[#131b2e] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-black"
                          >
                            {event.ctaPrimary.label}
                          </button>
                        )}

                        {event.ctaSecondary && (
                          <a
                            href={event.ctaSecondary.url}
                            download={event.ctaSecondary.isDownload}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-black/15 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50 hover:text-black"
                          >
                            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            {event.ctaSecondary.label}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}

        {/* ======================= STRATEGIC PARTNERSHIP CALLOUT ======================= */}
        <div className="mt-16 rounded-2xl border border-black/10 bg-gradient-to-br from-[#131b2e] to-[#0a101f] p-8 text-white shadow-xl sm:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#93c5fd]">
                Collaborative Dialogues
              </p>
              <h2 className="display-head mt-2 text-2xl font-bold sm:text-3xl">
                Partner with UNMAI for High-Integrity Climate Convenings
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                Interested in co-hosting an Article 6 executive roundtable, sovereign registry consultation, or bilateral climate finance workshop? Engage with our climate policy and carbon markets advisory teams.
              </p>
            </div>
            <div className="shrink-0">
              <button
                type="button"
                onClick={() => setConsultationOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#131b2e] shadow transition hover:bg-neutral-100 active:scale-[0.99]"
              >
                Schedule Consultation
                <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>

      <SiteCta />
      <SiteFooter />

      {/* Modals */}
      <ScheduleConsultationModal
        open={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />

      <EventRegistrationModal
        event={selectedEventForModal}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}

