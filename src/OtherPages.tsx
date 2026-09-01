import { lazy, Suspense, useState, type HTMLInputTypeAttribute, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { SiteCta } from "./components/SiteCta";
import { SiteFooter } from "./components/SiteFooter";
import { ScrollReveal } from "./components/ScrollReveal";
import { ScheduleConsultationModal } from "./components/ScheduleConsultationModal";
import { SiteHeader } from "./components/SiteHeader";
import { ScrollLink } from "./components/ScrollLink";
import { Streamlines } from "./components/ElementMotifs";
import {
  DossierList,
  PageBanner,
  RosterBand,
  SectionHeading,
  SlabStack,
  SpectrumList,
} from "./components/PageSections";
import { INSTITUTIONAL_PARTICIPATION } from "./components/EngagementGlobalSections";
import { GLOBAL_ENGAGEMENT_COUNTRIES } from "./data/siteReference";
import { ELEMENT_BY_ID, type ElementId } from "./lib/elements";
import { PRESS_RELEASES } from "./data/news";

const IndiaEngagementMap = lazy(() =>
  import("./components/IndiaEngagementMap").then((m) => ({ default: m.IndiaEngagementMap })),
);

function MapSectionFallback() {
  return (
    <section
      className="relative left-1/2 mb-8 flex min-h-[min(76vh,560px)] w-screen max-w-none -translate-x-1/2 items-center justify-center bg-[#0a0e18] sm:mb-10 sm:min-h-[min(86vh,760px)] lg:min-h-[min(92vh,960px)]"
      aria-label="Loading engagement map"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="size-12 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">
          Loading engagement map…
        </p>
      </div>
    </section>
  );
}

function PageScaffold({
  element,
  title,
  subtitle,
  bannerImage,
  children,
}: {
  element: ElementId;
  title: string;
  subtitle: string;
  bannerImage?: string;
  children: ReactNode;
}) {
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-[#191c1d] antialiased">
      <SiteHeader />
      <PageBanner
        element={element}
        title={title}
        subtitle={subtitle}
        backgroundImage={bannerImage}
      />
      <main className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">{children}</main>
      <SiteCta />
      <SiteFooter />
      <ScheduleConsultationModal
        open={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </div>
  );
}

/* ------------------------------------------------------- about — land */

const ABOUT_ENTRIES = [
  {
    label: "Institutional Profile",
    title: "Company introduction",
    body: "UNMAI Carbon Solutions is a Singapore-Headquartered global climate advisory and climate infrastructure firm supporting governments, institutions, corporates and market actors.",
    tags: ["Singapore HQ", "Global Advisory", "Institutional Delivery"],
  },
  {
    label: "Strategic Direction",
    title: "Mission & vision",
    body: (
      <div className="space-y-3">
        <p>
          <span className="font-bold text-[#131b2e]">Mission</span> — To accelerate high-integrity
          carbon markets and climate ambition through trusted advisory, interoperable digital
          infrastructure, climate finance solutions, and long-term institutional capacity building.
        </p>
        <p>
          <span className="font-bold text-[#131b2e]">Vision</span> — To enable a transparent,
          interoperable, and high-integrity global carbon market ecosystem that mobilizes climate
          finance and accelerates the net-zero transition.
        </p>
      </div>
    ),
    tags: ["Transparency", "Interoperability", "Integrity"],
  },
  {
    label: "Geographic Footprint",
    title: "Global reach",
    body: "UNMAI supports clients across Asia, Africa, Middle East through country engagements, multilateral collaboration, corporate advisory and standards participation.",
    tags: ["Asia", "Africa", "Middle East"],
  },
  {
    label: "Advantage UNMAI Carbon",
    title: "Why UNMAI Carbon",
    body: "Policy expertise, advisory experience, climate finance structuring, digital infrastructure, international negotiation support, building capacity and standards participation delivered through one platform.",
    tags: ["Policy", "Advisory", "Finance", "Capacity Building", "Digital"],
  },
] as const;

export function AboutPage() {
  return (
    <PageScaffold
      element="land"
      title="About UNMAI Carbon Solutions"
      subtitle="Building trusted climate markets through policy, finance, advisory and digital innovation."
      bannerImage={ELEMENT_BY_ID.land.bgImage}
    >
      {/* The name itself, set as the page's opening statement */}
      <ScrollReveal>
        <div className="mx-auto mb-10 max-w-[1216px] overflow-hidden rounded-2xl bg-[#18181b] sm:mb-12">
          <div className="relative grid gap-6 p-6 sm:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-12">
            <p
              className="display-figure select-none text-[clamp(3.5rem,13vw,7rem)] font-extrabold leading-none text-[#71717a]"
              lang="ta"
            >
              உண்மை
            </p>
            <div className="space-y-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#d4d4d8]">
                Foundational Principle
              </p>
              <h2 className="display-head text-xl font-bold tracking-tight text-white sm:text-2xl">
                UNMAI means truth
              </h2>
              <p className="text-sm leading-6 text-white/75 xs:text-base xs:leading-7">
                UNMAI derives from the Tamil word உண்மை meaning “Truth, Authenticity, Integrity, and
                Real,” embodying the firm’s core philosophy — and the reason every system we build
                is designed to be checked.
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
                {["Truth", "Authenticity", "Integrity"].map((value) => (
                  <span
                    key={value}
                    className="text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-400"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <SectionHeading
        eyebrow="About Overview"
        title="Institutional foundations and global climate positioning"
        paragraph="UNMAI Carbon Solutions bridges institutional-grade advisory, multilateral engagement, climate finance and interoperable digital infrastructure to advance high-integrity carbon market ecosystems."
        hue={ELEMENT_BY_ID.land.hue}
      />

      <div className="mt-8 sm:mt-10">
        <DossierList entries={ABOUT_ENTRIES} />
      </div>
    </PageScaffold>
  );
}

/* ----------------------------------------------------- services — fire */

const SERVICES = [
  {
    element: "land" as const,
    title: "Net Zero Transition & Climate Advisory",
    body: "Includes institutional-grade delivery model, implementation capability, strategic outcomes, and compliance-ready execution support.",
    tags: ["Strategic Outcomes", "Implementation Capability"],
  },
  {
    element: "water" as const,
    title: "Climate Finance & Investment Strategy",
    body: "Enables climate-aligned financing structures, investment mobilization, transaction advisory, and scalable capital deployment.",
    tags: ["Climate Finance", "Investment Mobilization"],
  },
  {
    element: "space" as const,
    title: "Carbon Market Digital Infrastructure & Governance",
    body: "Provides interoperable GHG-MRV & registry systems, dMRV solutions, and transparent data management.",
    tags: ["Carbon Registry", "National GHG-MRV", "Digital MRV"],
  },
  {
    element: "fire" as const,
    title: "Carbon Project Development",
    body: "Delivers end-to-end project structuring, project aggregation, methodology alignment and development, validation readiness, verification and issuance support services.",
    tags: ["Projects Development", "Carbon Assets", "ITMOs"],
  },
  {
    element: "air" as const,
    title: "Capacity Building & Institutional Readiness",
    body: "Designs & delivers capacity building to enhance institutional capabilities, technical readiness, stakeholder engagement, and long-term implementation preparedness.",
    tags: ["Capacity Building", "Institutional Readiness"],
  },
];

export function ServicesPage() {
  return (
    <PageScaffold
      element="fire"
      title="Strategic Climate & Carbon Market Services"
      subtitle="Institutional advisory and digital infrastructure for governments, multilaterals, climate institutions and corporates."
      bannerImage={ELEMENT_BY_ID.fire.bgImage}
    >
      <SectionHeading
        eyebrow="Service Portfolio"
        title="Services for carbon market operationalization"
        paragraph="Each service line is designed to deliver implementation-ready outcomes across policy, projects, finance, infrastructure, building capacity and institutional readiness mandates."
        hue={ELEMENT_BY_ID.fire.hue}
      />

      <div className="mt-8 sm:mt-10">
        <SpectrumList items={SERVICES} />
      </div>
    </PageScaffold>
  );
}

/* ------------------------------------- digital infrastructure — air */

const DIGITAL_INFRASTRUCTURE_LAYERS = [
  {
    title: "National Carbon Registries",
    body: "Provides sovereign-aligned registry infrastructure, transparent issuance workflows, interoperability and market linkages.",
    tags: ["Carbon Registries", "Market Infrastructure"],
  },
  {
    title: "Digital MRV Infrastructure",
    body: "Enables interoperable digital MRV solutions systems, automated reporting workflows, and transparent verification processes.",
    tags: ["Digital MRV", "Data Infrastructure"],
  },
  {
    title: "NAMBĪ Digital Ecosystem",
    body: "Unifies global dMRV ecosystem through interoperable platform that aggregates, benchmarks and standardizes climate action data towards achieving high-integrity carbon markets, and enabling climate finance to scale with confidence and transparency.",
    tags: ["dMRV Ecosystem", "dMRV Market Place"],
  },
] as const;

export function DigitalInfrastructurePage() {
  return (
    <PageScaffold
      element="space"
      title="Digital Carbon Infrastructure"
      subtitle="Building interoperable systems for trusted carbon market operations."
      bannerImage={ELEMENT_BY_ID.space.bgImage}
    >
      <SectionHeading
        eyebrow="Infrastructure Stack"
        title="Systems architecture for interoperable carbon markets"
        paragraph="UNMAI designs standards-based digital layers that strengthen transparency, traceability, and operational trust across national and cross-border carbon ecosystems."
        hue={ELEMENT_BY_ID.space.hue}
      />

      {/* Full-bleed dark band — the stack reads as slabs seen from above */}
      <section className="relative left-1/2 mt-8 w-screen max-w-none -translate-x-1/2 overflow-hidden bg-[#18181b] px-4 py-10 sm:mt-10 sm:px-6 sm:py-12 lg:px-8">
        <Streamlines className="pointer-events-none absolute inset-0 h-full w-full text-white/10" />
        <div className="relative">
          <SlabStack items={DIGITAL_INFRASTRUCTURE_LAYERS} />
        </div>
      </section>
    </PageScaffold>
  );
}

/* --------------------------------------------- global engagements — space */

export function GlobalEngagementsPage() {
  return (
    <PageScaffold
      element="air"
      title="Global Engagements"
      subtitle="Supporting governments, institutions, and climate stakeholders in operationalizing carbon markets and climate finance systems."
      bannerImage={ELEMENT_BY_ID.air.bgImage}
    >
      <SectionHeading
        eyebrow="Global Engagements"
        title="Active across Asia, Africa & the Middle East"
        paragraph="Supporting governments, institutions, and climate stakeholders in operationalizing carbon markets and climate finance systems."
        hue={ELEMENT_BY_ID.air.hue}
      />

      <div className="mt-8 sm:mt-10">
        <Suspense fallback={<MapSectionFallback />}>
          <IndiaEngagementMap />
        </Suspense>
      </div>

      <RosterBand
        eyebrow="Countries & Regions"
        title="Where UNMAI is engaged"
        items={GLOBAL_ENGAGEMENT_COUNTRIES}
      />

      <div className="mt-10 sm:mt-12">
        <SectionHeading
          eyebrow="Institutional Participation"
          title="Standards, partners & multilateral engagement"
          hue={ELEMENT_BY_ID.space.hue}
        />
        <ul className="mx-auto mt-6 grid max-w-[1216px] gap-x-8 gap-y-px sm:grid-cols-2 lg:grid-cols-3">
          {INSTITUTIONAL_PARTICIPATION.map((item, i) => (
            <li key={item} className="list-none">
              <ScrollReveal delayMs={i * 30}>
                <span className="flex items-center gap-3 border-b border-black/10 py-3 text-sm font-semibold text-[#131b2e] transition-colors duration-300 hover:text-[#2b6193]">
                  <span className="size-1 shrink-0 rounded-full bg-[#131b2e]" aria-hidden />
                  {item}
                </span>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </PageScaffold>
  );
}

/* --------------------------------------------------------- news — water */

function NewsLedger({ items }: { items: typeof PRESS_RELEASES }) {
  return (
    <ol className="mx-auto max-w-[1152px]">
      {items.map((release, i) => (
        <li key={release.id} className="list-none">
          <ScrollReveal
            delayMs={i * 80}
            className="group grid gap-x-8 gap-y-3 sm:grid-cols-[7.5rem_minmax(0,1fr)]"
          >
            <p className="display-figure pt-0.5 text-sm font-bold uppercase tracking-[0.08em] text-[#2b6193] sm:pt-1 sm:text-right sm:text-base">
              {release.dateLabel}
            </p>

            <div className="relative border-l border-dashed border-[#2b6193]/35 pb-8 pl-6 sm:pb-10 sm:pl-8">
              <span
                className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-[#2b6193] transition-all duration-500 group-hover:shadow-[0_0_0_6px_rgba(43,97,147,0.14)]"
                aria-hidden
              />
              <h3 className="display-head text-lg font-bold leading-snug tracking-tight text-[#131b2e] xs:text-xl">
                {release.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#444654]">{release.summary}</p>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold">
                <ScrollLink
                  to={`/news/${release.id}`}
                  className="inline-flex items-center gap-1.5 text-[#131b2e] transition hover:text-[#2b6193]"
                >
                  Read article
                  <span aria-hidden>→</span>
                </ScrollLink>
                {release.sourceUrl ? (
                  <a
                    href={release.sourceUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[#5c6b62] transition hover:text-[#2b6193]"
                  >
                    {release.sourceName ? `Source: ${release.sourceName}` : "View source"} ↗
                  </a>
                ) : null}
                {release.pdfPath ? (
                  <a
                    href={release.pdfPath}
                    download
                    className="text-[#5c6b62] transition hover:text-[#2b6193]"
                  >
                    Download PDF
                  </a>
                ) : null}
              </div>
            </div>
          </ScrollReveal>
        </li>
      ))}
    </ol>
  );
}

export function NewsPage() {
  return (
    <PageScaffold
      element="water"
      title="News"
      subtitle="Press releases and announcements from UNMAI Carbon Solutions."
      bannerImage={ELEMENT_BY_ID.water.bgImage}
    >
      <SectionHeading
        eyebrow="Press Releases"
        title="Latest announcements"
        paragraph="Download official press releases and key announcements."
        hue={ELEMENT_BY_ID.water.hue}
      />

      <div className="mt-8 sm:mt-10">
        <NewsLedger items={PRESS_RELEASES} />
      </div>
    </PageScaffold>
  );
}

export function NewsArticlePage() {
  const { id } = useParams();
  const article = PRESS_RELEASES.find((item) => item.id === id);

  if (!article) {
    return (
      <PageScaffold
        element="water"
        title="News"
        subtitle="Press releases and announcements from UNMAI Carbon Solutions."
        bannerImage={ELEMENT_BY_ID.water.bgImage}
      >
        <div className="mx-auto max-w-[850px] space-y-6">
          <h2 className="display-head text-xl font-bold text-[#131b2e]">Article not found</h2>
          <p className="text-sm leading-6 text-[#444654]">
            Return to the News page to view available press releases.
          </p>
          <Link
            to="/news"
            className="inline-flex text-sm font-semibold text-[#2b6193] transition hover:underline"
          >
            ← Back to News
          </Link>
        </div>
      </PageScaffold>
    );
  }

  return (
    <PageScaffold
      element="water"
      title="News"
      subtitle="Press releases and announcements from UNMAI Carbon Solutions."
      bannerImage={ELEMENT_BY_ID.water.bgImage}
    >
      <article className="mx-auto max-w-[720px]">
        <Link
          to="/news"
          className="text-sm font-semibold text-[#2b6193] transition hover:underline"
        >
          ← Back to News
        </Link>

        <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.18em] text-[#2b6193]">
          {article.dateLabel}
        </p>
        <h1 className="display-head mt-3 text-2xl font-bold leading-tight tracking-tight text-[#131b2e] sm:text-3xl">
          {article.title}
        </h1>
        <p className="mt-4 border-l-2 border-[#2b6193] pl-5 text-base leading-7 text-[#444654]">
          {article.summary}
        </p>

        <div className="mt-8 space-y-5 text-sm leading-7 text-[#2b2d33] xs:text-[15px]">
          {article.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {article.pdfPath || article.sourceUrl ? (
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-black/10 pt-6 text-sm font-semibold">
            {article.sourceUrl ? (
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[#131b2e] transition hover:text-[#2b6193]"
              >
                {article.sourceName ? `Read on ${article.sourceName}` : "Read original article"} ↗
              </a>
            ) : null}
            {article.pdfPath ? (
              <a
                href={article.pdfPath}
                download
                className="text-[#5c6b62] transition hover:text-[#2b6193]"
              >
                Download original PDF
              </a>
            ) : null}
          </div>
        ) : null}
      </article>
    </PageScaffold>
  );
}

/* ------------------------------------------------------ contact — water */

/** `text-base` on mobile + a matching inputMode keeps iOS from zooming the page on focus. */
const CONTACT_FIELDS: ReadonlyArray<{
  label: string;
  type: HTMLInputTypeAttribute;
  inputMode?: "text" | "email";
  autoComplete?: string;
}> = [
  { label: "Name", type: "text", autoComplete: "name" },
  { label: "Organization", type: "text", autoComplete: "organization" },
  { label: "Email", type: "email", inputMode: "email", autoComplete: "email" },
  { label: "Country", type: "text", autoComplete: "country-name" },
  { label: "Inquiry Type", type: "text" },
];

const CONTACT_CHANNELS: ReadonlyArray<{ label: string; value: string; href?: string }> = [
  { label: "Singapore HQ", value: "10, Sim Lim Tower, Jalan Besar #10-10, Singapore 208787" },
  { label: "Email", value: "admin@unmaicarbon.earth", href: "mailto:admin@unmaicarbon.earth" },
  { label: "Telephone", value: "+65 9023 1823", href: "tel:+6590231823" },
  {
    label: "LinkedIn",
    value: "UNMAI Carbon Solutions",
    href: "https://sg.linkedin.com/company/unmai-carbon-solutions",
  },
];

export function ContactPage() {
  return (
    <PageScaffold
      element="water"
      title="Contact UNMAI"
      subtitle="Connect with our team for strategic climate and carbon market engagements."
      bannerImage="https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=2000&q=80"
    >
      <SectionHeading
        eyebrow="Contact & Engagement"
        title="Initiate a strategic discussion"
        paragraph="Share your institutional priorities and our team will align a consultation pathway across policy, finance, and digital carbon market implementation."
        hue={ELEMENT_BY_ID.water.hue}
      />

      <div className="mx-auto mt-8 grid max-w-[1216px] gap-8 sm:mt-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12">
        <ScrollReveal>
          <form
            className="relative overflow-hidden rounded-2xl bg-[#f2f6f9] p-5 xs:p-6 sm:p-8"
            onSubmit={(event) => event.preventDefault()}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#2b6193]">
              Enterprise enquiry
            </p>
            <h3 className="display-head mt-2 text-xl font-bold tracking-tight text-[#131b2e]">
              Tell us what you are working on
            </h3>

            <div className="mt-6 grid gap-4">
              {CONTACT_FIELDS.map((field) => (
                <input
                  key={field.label}
                  type={field.type}
                  inputMode={field.inputMode}
                  autoComplete={field.autoComplete}
                  aria-label={field.label}
                  placeholder={field.label}
                  className="w-full min-w-0 border-b border-[#2b6193]/25 bg-transparent px-1 py-3 text-base text-[#131b2e] transition focus:border-[#2b6193] focus:outline-none sm:text-sm"
                />
              ))}
              <textarea
                aria-label="Message"
                placeholder="Message"
                className="h-24 w-full min-w-0 resize-y border-b border-[#2b6193]/25 bg-transparent px-1 py-3 text-base text-[#131b2e] transition focus:border-[#2b6193] focus:outline-none sm:text-sm"
              />
              <button
                type="submit"
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-[#131b2e] px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#2b6193]"
              >
                Submit inquiry
                <span aria-hidden>→</span>
              </button>
            </div>
          </form>
        </ScrollReveal>

        <div className="space-y-6">
          <ScrollReveal>
            <dl className="border-t border-black/12">
              {CONTACT_CHANNELS.map((channel) => (
                <div
                  key={channel.label}
                  className="grid gap-1 border-b border-black/12 py-4 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4"
                >
                  <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#5c6b62]">
                    {channel.label}
                  </dt>
                  <dd className="min-w-0 text-sm leading-6 text-[#131b2e]">
                    {channel.href ? (
                      <a
                        href={channel.href}
                        target={channel.href.startsWith("http") ? "_blank" : undefined}
                        rel={channel.href.startsWith("http") ? "noreferrer noopener" : undefined}
                        className="transition hover:text-[#2b6193] hover:underline"
                      >
                        {channel.value}
                      </a>
                    ) : (
                      channel.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>

          <ScrollReveal>
            <div className="overflow-hidden rounded-2xl border border-black/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7854291897165!2d103.85216357551307!3d1.3037601986838618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19b9ccd3454f%3A0xd21fd5685f6cccf7!2sJalan%20Besar!5e0!3m2!1sen!2sin!4v1778242302908!5m2!1sen!2sin"
                className="h-56 w-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="UNMAI Singapore Headquarters Map"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>

    </PageScaffold>
  );
}
