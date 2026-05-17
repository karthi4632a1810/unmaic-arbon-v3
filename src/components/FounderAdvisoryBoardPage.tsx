import { useState, type ReactNode } from "react";
import photoAjay from "../assets/team/Ajay_Mathur.jpg";
import photoBoudhyyan from "../assets/team/Boudhyyan Duttaa Photo.jpeg";
import photoChintan from "../assets/team/Chintan Shah Photo.jpeg";
import photoDinesh from "../assets/team/Dinesh Photo.jpeg";
import photoGiselle from "../assets/team/Giselle Photo .jpeg";
import photoKotteswari from "../assets/team/Kotteswari Photo.jpeg";
import photoShinu from "../assets/team/Shinu Photo.jpeg";
import photoSouvik from "../assets/team/Souvik Photo.jpeg";
import { ScrollReveal } from "./ScrollReveal";
import { ScheduleConsultationModal } from "./ScheduleConsultationModal";
import { SiteCta } from "./SiteCta";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

type PersonProfile = {
  name: string;
  role?: string;
  bio: string;
  focus: string[];
  image: string;
};

/* Future: dedicated founder spotlight — uncomment FOUNDER and <FounderSpotlight /> in JSX below.
const FOUNDER: PersonProfile = {
  name: "Boudhyyan Duttaa",
  role: "Founder & CEO · UNMAI Carbon Solutions",
  bio: "Leads UNMAI’s sovereign-grade climate advisory mandate across policy, carbon finance, and digital market infrastructure, with deep experience in international climate negotiations, Article 6 operationalization, and institutional design for high-integrity carbon registries and MRV ecosystems.",
  focus: [
    "Climate Policy",
    "Article 6",
    "Carbon Finance",
    "Digital MRV",
    "Institutional Governance",
  ],
  image: photoBoudhyyan,
};
*/

const TEAM: PersonProfile[] = [
  {
    name: "Boudhyyan Duttaa",
    bio: "Leads UNMAI’s sovereign-grade climate advisory mandate across policy, carbon finance, and digital market infrastructure, with deep experience in international climate negotiations, Article 6 operationalization, and institutional design for high-integrity carbon registries and MRV ecosystems.",
    focus: [
      "Climate Policy",
      "Article 6",
      "Carbon Finance",
      "Digital MRV",
      "Institutional Governance",
    ],
    image: photoBoudhyyan,
  },
  {
    name: "Ajay Mathur",
    bio: "Provides strategic guidance on climate policy, energy transition pathways, and institutional approaches to scalable carbon market development.",
    focus: ["Climate Policy", "Energy Transition", "Institutional Strategy"],
    image: photoAjay,
  },
  {
    name: "Chintan Shah",
    bio: "Advises on carbon market implementation, enterprise engagement, and program delivery across policy and finance stakeholders.",
    focus: ["Carbon Markets", "Enterprise Engagement", "Program Delivery"],
    image: photoChintan,
  },
  {
    name: "Dinesh",
    bio: "Supports advisory engagements spanning climate finance structuring, market readiness, and implementation planning for institutional clients.",
    focus: ["Climate Finance", "Market Readiness", "Implementation"],
    image: photoDinesh,
  },
  {
    name: "Giselle",
    bio: "Contributes expertise on international climate cooperation, stakeholder alignment, and governance-oriented market development.",
    focus: ["International Cooperation", "Governance", "Stakeholder Alignment"],
    image: photoGiselle,
  },
  {
    name: "Kotteswari",
    bio: "Advises on regional program design, institutional coordination, and delivery frameworks for climate infrastructure initiatives.",
    focus: ["Regional Programs", "Institutional Coordination", "Delivery"],
    image: photoKotteswari,
  },
  {
    name: "Shinu",
    bio: "Supports digital carbon infrastructure, registry interoperability, and standards-aligned MRV and traceability systems.",
    focus: ["Digital Infrastructure", "Registries", "MRV"],
    image: photoShinu,
  },
  {
    name: "Souvik",
    bio: "Guides strategic advisory on carbon project development, assurance frameworks, and market integrity across implementation cycles.",
    focus: ["Project Development", "Assurance", "Market Integrity"],
    image: photoSouvik,
  },
];

function EnterpriseBanner({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section
      className="relative overflow-hidden px-4 pb-14 pt-36 text-white sm:px-6 sm:pt-40 lg:px-8 lg:pt-44"
      style={{
        backgroundImage:
          "linear-gradient(120deg, rgba(8,12,21,0.9), rgba(19,27,46,0.82)), url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-[1216px] space-y-5">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e6ff80]">
          UNMAI Carbon Solutions
        </p>
        <h1 className="max-w-4xl text-3xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        <p className="max-w-3xl text-base leading-7 text-white/80 sm:text-lg">{subtitle}</p>
      </div>
    </section>
  );
}

function SectionIntro({
  title,
  subtitle,
  paragraph,
}: {
  title: string;
  subtitle: string;
  paragraph: string;
}) {
  return (
    <ScrollReveal>
      <div className="mx-auto mb-12 flex max-w-[1216px] flex-col gap-6 border-b border-black/8 pb-8 md:mb-14 md:flex-row md:items-center md:justify-between md:gap-10">
        <div className="space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#006c49]">{title}</p>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-[#131b2e] sm:text-4xl">
            {subtitle}
          </h2>
        </div>
        <p className="max-w-xl text-left text-base leading-7 text-[#444654] md:text-right">{paragraph}</p>
      </div>
    </ScrollReveal>
  );
}

function FocusTags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-black/10 bg-neutral-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#131b2e]"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function AdvisorCard({ person }: { person: PersonProfile }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)] transition duration-300 ease-out hover:-translate-y-1 hover:border-[#334ac9]/20 hover:shadow-[0_20px_50px_-24px_rgba(51,74,201,0.18)] motion-reduce:hover:translate-y-0">
      <div className="relative aspect-[4/3] min-h-[420px] overflow-hidden bg-[#131b2e]">
        <img
          src={person.image}
          alt={person.name}
          className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-[#131b2e]/80 via-transparent to-transparent"
          aria-hidden
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#006c49]">
            Team
          </p>
          <h3 className="text-lg font-bold leading-snug text-[#131b2e]">{person.name}</h3>
          {person.role ? (
            <p className="text-sm font-medium text-[#2b6193]">{person.role}</p>
          ) : null}
        </div>
        <p className="flex-1 text-sm leading-6 text-[#444654]">{person.bio}</p>
        <FocusTags items={person.focus} />
      </div>
    </article>
  );
}

function PageShell({ children }: { children: ReactNode }) {
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-[#191c1d] antialiased">
      <SiteHeader />
      {children}
      <SiteCta />
      <SiteFooter />
      <ScheduleConsultationModal
        open={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </div>
  );
}

export function FounderAdvisoryBoardPage() {
  return (
    <PageShell>
      <EnterpriseBanner
        title="Founder & Advisory Board"
        subtitle="Institutional leadership guiding sovereign-grade climate advisory, carbon finance, and digital market infrastructure."
      />
      <main className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <SectionIntro
          title="Our Team"
          subtitle="Global Expertise Across Policy, Finance & Infrastructure"
          paragraph="UNMAI’s leadership and advisory network brings together policy, finance, standards, and implementation depth to support governments and institutions building high-integrity carbon ecosystems."
        />

        {/* Future: uncomment FOUNDER constant above and add FounderSpotlight hero here */}

        <div className="mx-auto grid max-w-[1216px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((person) => (
            <ScrollReveal key={person.name}>
              <AdvisorCard person={person} />
            </ScrollReveal>
          ))}
        </div>
      </main>
    </PageShell>
  );
}
