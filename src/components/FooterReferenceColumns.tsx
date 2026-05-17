import { ScrollReveal } from "./ScrollReveal";
import {
  FOOTER_STRATEGIC_SERVICES,
  GLOBAL_ENGAGEMENT_COUNTRIES,
  INSTITUTIONAL_PARTICIPATION,
} from "../data/siteReference";

function ReferenceColumn({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <h3 className="mb-4 text-[11px] font-bold uppercase tracking-wider text-black">{title}</h3>
      <ul className="space-y-2.5 text-sm text-[#444654]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function FooterReferenceColumns() {
  return (
    <ScrollReveal>
      <div className="grid gap-10 border-t border-black/10 pt-10 sm:grid-cols-2 lg:grid-cols-3">
        <ReferenceColumn title="Strategic Services" items={FOOTER_STRATEGIC_SERVICES} />
        <ReferenceColumn title="Global Engagements" items={GLOBAL_ENGAGEMENT_COUNTRIES} />
        <ReferenceColumn title="Institutional Participation" items={INSTITUTIONAL_PARTICIPATION} />
      </div>
    </ScrollReveal>
  );
}
