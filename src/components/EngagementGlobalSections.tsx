import { ScrollReveal } from "./ScrollReveal";

export const GLOBAL_ENGAGEMENT_COUNTRIES = [
  "Bhutan",
  "Nigeria",
  "Indonesia",
  "Sri Lanka",
  "Saudi Arabia",
  "Pakistan",
  "Kenya",
  "Mongolia",
  "Ghana",
  "India",
  "Tanzania",
  "Mozambique",
  "USA",
] as const;

export const INSTITUTIONAL_PARTICIPATION = [
  "ISO Standards",
  "CAD Trust",
  "VCMI",
  "BioCarbon Standard",
  "The World Bank",
  "ChildFund International",
  "Gold Standard",
  "UNIDROIT",
  "CDOP",
  "ADB",
  "Singapore Chemical Industry Council Limited",
] as const;

export function EngagementGlobalCountries() {
  return (
    <section className="mx-auto max-w-[1216px]" aria-label="Global engagement countries">
      <ScrollReveal>
        <div className="mb-8 flex flex-col gap-2 sm:mb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#131b2e]">
            Global Engagements
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-[#131b2e] sm:text-3xl">
            Countries & Regions
          </h2>
        </div>
      </ScrollReveal>
      <ul className="flex flex-wrap gap-2.5">
        {GLOBAL_ENGAGEMENT_COUNTRIES.map((country, index) => (
          <ScrollReveal key={country} delayMs={index * 30}>
            <li className="list-none">
              <span className="inline-block rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-[#131b2e] shadow-[0_1px_0_rgba(0,0,0,0.04)] transition duration-200 hover:border-[#006c49]/25 hover:bg-[#006c49]/5">
                {country}
              </span>
            </li>
          </ScrollReveal>
        ))}
      </ul>
    </section>
  );
}

export function EngagementInstitutionalParticipation() {
  return (
    <section className="mx-auto max-w-[1216px]" aria-label="Institutional participation">
      <ScrollReveal>
        <div className="mb-8 flex flex-col gap-2 sm:mb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#131b2e]">
            Institutional Participation
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-[#131b2e] sm:text-3xl">
            Standards, Partners & Multilateral Engagement
          </h2>
        </div>
      </ScrollReveal>
      <ul className="flex flex-wrap gap-2.5">
        {INSTITUTIONAL_PARTICIPATION.map((item, index) => (
          <ScrollReveal key={item} delayMs={index * 30}>
            <li className="list-none">
              <span className="inline-block rounded-lg border border-black/10 bg-neutral-50 px-4 py-2.5 text-sm font-semibold text-[#131b2e] transition duration-200 hover:border-black/20 hover:bg-white">
                {item}
              </span>
            </li>
          </ScrollReveal>
        ))}
      </ul>
    </section>
  );
}
