import { ScrollReveal } from "./ScrollReveal";

const INSTITUTIONAL_BLOCKS = [
  {
    id: "multilateral",
    index: "01",
    meta: "Institutional Partners",
    title: "Multilateral Collaborations",
    body: "Engagement pathways supporting policy and implementation across multilateral climate mandates.",
    itemsLabel: "Partner network",
    items: ["ADB", "World Bank", "UNDP", "IFC"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M3 12h18M12 3c2.5 2.8 4 6 4 9s-1.5 6.2-4 9M12 3c-2.5 2.8-4 6-4 9s1.5 6.2 4 9"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
  {
    id: "capacity",
    index: "02",
    meta: "Implementation Support",
    title: "Regional Capacity Building",
    body: "Technical and institutional readiness support for long-term market operationalization.",
    itemsLabel: "Core capabilities",
    items: ["Technical Advisory", "Institutional Readiness"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden="true">
        <path
          d="M4 19V5a1 1 0 011-1h5l2 2h7a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M8 11h8M8 15h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
] as const;

export function EngagementInstitutionalSection() {
  return (
    <section className="mx-auto max-w-[1216px]" aria-label="Institutional engagement programs">
      <ScrollReveal>
        <div className="mb-8 flex flex-col gap-2 sm:mb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#131b2e]">
            Beyond Locations
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-[#131b2e] sm:text-3xl">
            Institutional & Programmatic Support
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        {INSTITUTIONAL_BLOCKS.map((block, i) => (
          <ScrollReveal key={block.id} delayMs={i * 100}>
            <article className="engagement-institutional-card group relative flex min-h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_2px_24px_-12px_rgba(0,0,0,0.1)] transition duration-500 ease-out hover:border-black/20 hover:shadow-[0_28px_64px_-24px_rgba(0,0,0,0.18)]">
              <div
                className="absolute left-0 top-0 h-full w-1.5 bg-[#131b2e] transition-all duration-500 group-hover:w-2"
                aria-hidden
              />

              <div className="flex flex-1 flex-col pl-6 pr-5 pt-6 pb-6 sm:pl-7 sm:pr-6 sm:pt-7 sm:pb-7">
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-neutral-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#131b2e]">
                    {block.meta}
                  </span>
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-black/8 bg-neutral-50 text-[#131b2e] transition duration-300 group-hover:border-black/15 group-hover:bg-[#131b2e] group-hover:text-white">
                    {block.icon}
                  </span>
                </div>

                <p className="mt-5 font-mono text-[11px] font-semibold tracking-widest text-[#9ca3af]">
                  {block.index}
                </p>
                <h3 className="mt-1 text-2xl font-bold tracking-tight text-[#131b2e] sm:text-[1.65rem] sm:leading-tight">
                  {block.title}
                </h3>
                <p className="mt-3 max-w-prose text-base leading-7 text-[#444654]">{block.body}</p>

                <div className="mt-6 border-t border-dashed border-black/10 pt-5">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#5c6b62]">
                    {block.itemsLabel}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {block.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-lg border border-black/12 bg-white px-3 py-2 text-xs font-semibold text-[#131b2e] shadow-[0_1px_0_rgba(0,0,0,0.04)] transition duration-300 group-hover:border-black/20 group-hover:bg-neutral-50"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div
                className="h-px w-full bg-linear-to-r from-[#131b2e]/20 via-[#131b2e]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden
              />
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
