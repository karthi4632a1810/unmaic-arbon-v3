import { ScrollReveal } from "./ScrollReveal";
import { getCountryLabel, getEngagementLine } from "../lib/engagementMapUtils";
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
    <section className="mx-auto max-w-[1216px]" aria-label="Global engagement locations">
      <ScrollReveal>
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#131b2e]">
              Location Directory
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-[#131b2e] sm:text-3xl">
              Global Engagement Locations
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
                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5c6b62]">
                      Location {(index + 1).toString().padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 text-xl font-bold tracking-tight text-[#131b2e]">
                      {getCountryLabel(place)}
                    </h3>
                    <p className="mt-0.5 text-xs font-medium text-[#5c6b62]">{place.capital}</p>
                  </div>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-white text-[#131b2e] shadow-sm">
                    <LocationPinIcon className="size-5" />
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-5">
                <p className="line-clamp-3 text-sm leading-6 text-[#444654]">
                  {getEngagementLine(place)}
                </p>

                {"link" in place && place.link ? (
                  <a
                    href={place.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="engagement-location-link mt-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#131b2e]! no-underline transition"
                  >
                    View engagement
                    <span className="engagement-location-link-icon flex size-6 items-center justify-center rounded-full bg-[#131b2e] text-white">
                      <ExternalLinkIcon className="size-3.5" />
                    </span>
                  </a>
                ) : null}
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
