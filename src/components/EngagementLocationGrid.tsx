import { ScrollReveal } from "./ScrollReveal";
import { INDIA_ENGAGEMENT_PLACES } from "./IndiaEngagementMap";

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationPinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 22C11.2 20.96 10.12 19.63 8.77 18C6.25 14.95 4 12.23 4 8.94C4 4.56 7.58 1 12 1C16.42 1 20 4.56 20 8.94C20 12.23 17.75 14.95 15.23 18C13.88 19.63 12.8 20.96 12 22Z"
        fill="currentColor"
      />
      <circle cx="12" cy="9" r="3" fill="white" />
    </svg>
  );
}

export function EngagementLocationGrid() {
  const places = INDIA_ENGAGEMENT_PLACES;

  return (
    <section className="mx-auto max-w-[1216px]" aria-label="India engagement locations">
      <ScrollReveal>
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#131b2e]">
              Location Directory
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-[#131b2e] sm:text-3xl">
              Cities We Engage Across India
            </h2>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-neutral-50 px-4 py-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#131b2e] text-white">
              <LocationPinIcon className="size-5" />
            </span>
            <div>
              <p className="text-2xl font-bold leading-none tracking-tight text-[#131b2e]">
                {places.length}
              </p>
              <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#5c6b62]">
                Engagement hubs
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {places.map((place, index) => (
          <ScrollReveal key={place.id} delayMs={index * 60}>
            <article className="engagement-location-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)] transition duration-500 ease-out hover:-translate-y-1.5 hover:border-black/20 hover:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.28)] motion-reduce:hover:translate-y-0">
              <div className="relative overflow-hidden border-b border-black/6 bg-linear-to-br from-neutral-50 via-[#f4f4f5] to-neutral-100 px-5 py-4">
                <div
                  className="pointer-events-none absolute inset-0 opacity-60"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 80% 20%, rgba(0,0,0,0.07) 1px, transparent 1px)",
                    backgroundSize: "12px 12px",
                  }}
                  aria-hidden
                />
                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5c6b62]">
                      Location {(index + 1).toString().padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 text-xl font-bold tracking-tight text-[#131b2e]">
                      {place.name}
                    </h3>
                  </div>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-white text-[#131b2e] shadow-sm transition duration-300 group-hover:scale-105 group-hover:border-black/15 group-hover:bg-neutral-50">
                    <LocationPinIcon className="size-5" />
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-black/10 bg-neutral-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#131b2e]">
                    {place.region}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-[#5c6b62]">
                    {place.state}
                  </span>
                </div>

                <p className="line-clamp-2 text-sm leading-6 text-[#444654]">{place.focus}</p>

                <div className="mt-auto flex flex-wrap gap-1.5">
                  {place.highlights.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-black/8 bg-neutral-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#45464d]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={place.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="engagement-location-link inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#131b2e]! no-underline transition group-hover:gap-3"
                >
                  View engagement
                  <span className="engagement-location-link-icon flex size-6 items-center justify-center rounded-full bg-[#131b2e] text-white transition duration-300 group-hover:bg-black">
                    <ExternalLinkIcon className="size-3.5" />
                  </span>
                </a>
              </div>

              <div
                className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#131b2e] transition-all duration-500 ease-out group-hover:w-full"
                aria-hidden
              />
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
