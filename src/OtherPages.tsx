import { lazy, Suspense, type ReactNode, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SiteCta } from "./components/SiteCta";
import { SiteFooter } from "./components/SiteFooter";
import { ScrollReveal } from "./components/ScrollReveal";
import { ScheduleConsultationModal } from "./components/ScheduleConsultationModal";
import { EngagementInstitutionalParticipation } from "./components/EngagementGlobalSections";
import { SiteHeader } from "./components/SiteHeader";
import { PRESS_RELEASES } from "./data/news";

const IndiaEngagementMap = lazy(() =>
  import("./components/IndiaEngagementMap").then((m) => ({ default: m.IndiaEngagementMap })),
);

function MapSectionFallback() {
  return (
    <section
      className="relative left-1/2 mb-12 flex min-h-[58vh] w-screen max-w-none -translate-x-1/2 items-center justify-center bg-[#0a0e18] md:min-h-[min(78vh,720px)]"
      aria-label="Loading engagement map"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="size-12 animate-spin rounded-full border-2 border-[hsl(71,100%,73%)]/25 border-t-[hsl(71,100%,73%)]" />
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">
          Loading engagement map…
        </p>
      </div>
    </section>
  );
}

function EnterpriseBanner({
  title,
  subtitle,
  backgroundImage,
}: {
  title: string;
  subtitle: string;
  backgroundImage?: string;
}) {
  return (
    <section
      className="relative overflow-hidden px-4 pb-14 pt-36 text-white sm:px-6 sm:pt-40 lg:px-8 lg:pt-44"
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(120deg, rgba(8,12,21,0.86), rgba(16,24,39,0.72)), url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : { background: "#131b2e" }
      }
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

function SectionCard({
  title,
  body,
  meta,
  kpis,
  className,
  children,
}: {
  title: string;
  body?: string;
  meta?: string;
  kpis?: string[];
  className?: string;
  children?: ReactNode;
}) {
  return (
    <article
      className={[
        "relative overflow-hidden rounded-2xl border border-black/[0.07] bg-linear-to-b from-white to-slate-50/90 p-6 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition duration-300 ease-out hover:-translate-y-1 hover:border-[#334ac9]/20 hover:shadow-[0_20px_50px_-24px_rgba(51,74,201,0.18)] motion-reduce:hover:translate-y-0 sm:p-8",
        className ?? "",
      ].join(" ")}
    >
      {meta ? (
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#2b6193]">{meta}</p>
      ) : null}
      <h3 className="text-xl font-bold text-[#131b2e]">{title}</h3>
      {body ? <p className="mt-3 text-base leading-7 text-[#444654]">{body}</p> : null}
      {kpis && kpis.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
          {kpis.map((kpi) => (
            <span key={kpi} className="text-xs font-bold uppercase tracking-wide text-[#45464d]">
              {kpi}
            </span>
          ))}
        </div>
      ) : null}
      {children}
    </article>
  );
}

function PageScaffold({
  title,
  subtitle,
  bannerImage,
  children,
}: {
  title: string;
  subtitle: string;
  bannerImage?: string;
  children: ReactNode;
}) {
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-[#191c1d] antialiased">
      <SiteHeader />
      <EnterpriseBanner title={title} subtitle={subtitle} backgroundImage={bannerImage} />
      <main className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">{children}</main>
      <SiteCta />
      <SiteFooter />
      <ScheduleConsultationModal
        open={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </div>
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

export function AboutPage() {
  return (
    <PageScaffold
      title="About UNMAI Carbon Solutions"
      subtitle="Building trusted climate markets through policy, finance, advisory and digital innovation."
      bannerImage="https://images.unsplash.com/photo-1581092446327-9f89c1f2f2b6?auto=format&fit=crop&w=2000&q=80"
    >
      <SectionIntro
        title="About Overview"
        subtitle="Institutional Foundations and Global Climate Positioning"
        paragraph="UNMAI Carbon Solutions bridges institutional-grade advisory, multilateral engagement, climate finance and interoperable digital infrastructure to advance high-integrity carbon market ecosystems."
      />
      <div className="mx-auto grid max-w-[1216px] gap-8 lg:grid-cols-2">
        <SectionCard
          title="Company Introduction"
          meta="Institutional Profile"
          kpis={["Singapore HQ", "Global Advisory", "Institutional Delivery"]}
          body="UNMAI Carbon Solutions is a Singapore-Headquartered global climate advisory and climate infrastructure firm supporting governments, institutions, corporates and market actors."
        />
        <SectionCard
          title="Meaning of UNMAI"
          meta="Foundational Principle"
          kpis={["Truth", "Authenticity", "Integrity"]}
          body='UNMAI derives from the Tamil word உண்மை meaning "Truth, Authenticity, Integrity, and Real," embodying the firm&apos;s core philosophy.'
        />
        <SectionCard
          title="Mission & Vision"
          meta="Strategic Direction"
          kpis={["Transparency", "Interoperability", "Integrity"]}
        >
          <div className="mt-4 space-y-4 text-base leading-7 text-[#444654]">
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
        </SectionCard>
        <SectionCard
          title="Global Reach"
          meta="Geographic Footprint"
          kpis={["Asia", "Africa", "Middle East"]}
          body="UNMAI supports clients across Asia, Africa, Middle East through country engagements, multilateral collaboration, corporate advisory and standards participation."
        />
        <SectionCard
          title="Why UNMAI Carbon"
          meta="Advantage UNMAI Carbon"
          kpis={["Policy", "Advisory", "Finance", "Capacity Building", "Digital"]}
          body="Policy expertise, advisory experience, climate finance structuring, digital infrastructure, international negotiation support, building capacity and standards participation delivered through one platform."
        />
      </div>
    </PageScaffold>
  );
}

const SERVICES = [
  {
    title: "Net Zero Transition & Climate Advisory",
    body: "Includes institutional-grade delivery model, implementation capability, strategic outcomes, and compliance-ready execution support.",
    kpis: ["Strategic Outcomes", "Implementation Capability"],
  },
  {
    title: "Climate Finance & Investment Strategy",
    body: "Enables climate-aligned financing structures, investment mobilization, transaction advisory, and scalable capital deployment.",
    kpis: ["Climate Finance", "Investment Mobilization"],
  },
  {
    title: "Carbon Market Digital Infrastructure & Governance",
    body: "Provides interoperable GHG-MRV & registry systems, dMRV solutions, and transparent data management.",
    kpis: ["Carbon Registry", "National GHG-MRV", "Digital MRV"],
  },
  {
    title: "Carbon Project Development",
    body: "Delivers end-to-end project structuring, project aggregation, methodology alignment and development, validation readiness, verification and issuance support services.",
    kpis: ["Projects Development", "Carbon Assets", "ITMOs"],
  },
  {
    title: "Capacity Building & Institutional Readiness",
    body: "Designs & delivers capacity building to enhance institutional capabilities, technical readiness, stakeholder engagement, and long-term implementation preparedness.",
    kpis: ["Capacity Building", "Institutional Readiness"],
  },
] as const;

export function ServicesPage() {
  return (
    <PageScaffold
      title="Strategic Climate & Carbon Market Services"
      subtitle="Institutional advisory and digital infrastructure for governments, multilaterals, climate institutions and corporates."
      bannerImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80"
    >
      <SectionIntro
        title="Service Portfolio"
        subtitle="Services for Carbon Market Operationalization"
        paragraph="Each service line is designed to deliver implementation-ready outcomes across policy, projects, finance, infrastructure, building capacity and institutional readiness mandates."
      />
      <div className="mx-auto grid max-w-[1216px] gap-6 md:grid-cols-2">
        {SERVICES.map((service, i) => (
          <SectionCard
            key={service.title}
            title={service.title}
            meta={`Service ${String(i + 1).padStart(2, "0")}`}
            kpis={[...service.kpis]}
            body={service.body}
          />
        ))}
      </div>
    </PageScaffold>
  );
}

const DIGITAL_INFRASTRUCTURE_LAYERS = [
  {
    title: "National Carbon Registries",
    body: "Provides sovereign-aligned registry infrastructure, transparent issuance workflows, interoperability and market linkages.",
    kpis: ["Carbon Registries", "Market Infrastructure"],
  },
  {
    title: "Digital MRV Infrastructure",
    body: "Enables interoperable digital MRV solutions systems, automated reporting workflows, and transparent verification processes.",
    kpis: ["Digital MRV", "Data Infrastructure"],
  },
  {
    title: "NAMBĪ Digital Ecosystem",
    body: "Unifies global dMRV ecosystem through interoperable platform that aggregates, benchmarks and standardizes climate action data towards achieving high-integrity carbon markets, and enabling climate finance to scale with confidence and transparency.",
    kpis: ["dMRV Ecosystem", "dMRV Market Place"],
  },
] as const;

export function DigitalInfrastructurePage() {
  return (
    <PageScaffold
      title="Digital Carbon Infrastructure"
      subtitle="Building interoperable systems for trusted carbon market operations."
      bannerImage="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=80"
    >
      <SectionIntro
        title="Infrastructure Stack"
        subtitle="Systems Architecture for Interoperable Carbon Markets"
        paragraph="UNMAI designs standards-based digital layers that strengthen transparency, traceability, and operational trust across national and cross-border carbon ecosystems."
      />
      <div className="mx-auto grid max-w-[1216px] gap-6 md:grid-cols-2 lg:grid-cols-3">
        {DIGITAL_INFRASTRUCTURE_LAYERS.map((layer, i) => (
          <SectionCard
            key={layer.title}
            title={layer.title}
            meta={`System Layer ${String(i + 1).padStart(2, "0")}`}
            kpis={[...layer.kpis]}
            body={layer.body}
          />
        ))}
      </div>
    </PageScaffold>
  );
}

export function GlobalEngagementsPage() {
  return (
    <PageScaffold
      title="Global Engagements"
      subtitle="Supporting governments, institutions, and climate stakeholders in operationalizing carbon markets and climate finance systems."
      bannerImage="https://images.unsplash.com/photo-1484589065579-248aad0d8b13?auto=format&fit=crop&w=2000&q=80"
    >
      <SectionIntro
        title="Global Engagements"
        subtitle="Active Across Asia, Africa & The Middle East"
        paragraph="Supporting governments, institutions, and climate stakeholders in operationalizing carbon markets and climate finance systems."
      />
      <Suspense fallback={<MapSectionFallback />}>
        <IndiaEngagementMap />
      </Suspense>
      <div className="mx-auto max-w-[1216px] pb-4">
        <EngagementInstitutionalParticipation />
      </div>
    </PageScaffold>
  );
}

export function NewsPage() {
  const items = useMemo(
    () => [...PRESS_RELEASES].sort((a, b) => b.dateLabel.localeCompare(a.dateLabel)),
    [],
  );

  return (
    <PageScaffold
      title="News"
      subtitle="Press releases and announcements from UNMAI Carbon Solutions."
      bannerImage="https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=2000&q=80"
    >
      <SectionIntro
        title="Press Releases"
        subtitle="Latest Announcements"
        paragraph="Download official press releases and key announcements."
      />
      <div className="mx-auto grid max-w-[1216px] gap-6 md:grid-cols-2">
        {items.map((pr, i) => (
          <ScrollReveal key={pr.id} delayMs={i * 90} className="h-full min-h-0">
            <article className="flex h-full flex-col gap-5 rounded-2xl border border-black/10 bg-white p-6 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.25)]">
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#006c49]">
                  {pr.dateLabel}
                </p>
                <h3 className="text-xl font-bold tracking-tight text-[#131b2e]">{pr.title}</h3>
                <p className="text-sm leading-6 text-[#444654]">{pr.summary}</p>
              </div>
              <div className="mt-auto flex flex-wrap gap-3">
                <Link
                  to={`/news/${pr.id}`}
                  className="inline-flex items-center justify-center rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-900"
                >
                  Read article
                </Link>
                {pr.sourceUrl ? (
                  <a
                    href={pr.sourceUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center justify-center rounded-lg border border-black/15 bg-white px-4 py-2 text-sm font-semibold text-[#131b2e] transition hover:border-black/25 hover:bg-black/3"
                  >
                    {pr.sourceName ? `Source: ${pr.sourceName}` : "View source"} ↗
                  </a>
                ) : null}
                {pr.pdfPath ? (
                  <a
                    href={pr.pdfPath}
                    download
                    className="inline-flex items-center justify-center rounded-lg border border-black/15 bg-white px-4 py-2 text-sm font-semibold text-[#131b2e] transition hover:border-black/25 hover:bg-black/3"
                  >
                    Download PDF
                  </a>
                ) : null}
              </div>
            </article>
          </ScrollReveal>
        ))}
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
        title="News"
        subtitle="Press releases and announcements from UNMAI Carbon Solutions."
        bannerImage="https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=2000&q=80"
      >
        <div className="mx-auto max-w-[850px]">
          <SectionCard title="Article not found" body="Please return to the News page to view available press releases." />
          <div className="mt-6">
            <Link to="/news" className="text-sm font-semibold text-[#006c49] transition hover:underline">
              ← Back to News
            </Link>
          </div>
        </div>
      </PageScaffold>
    );
  }

  return (
    <PageScaffold
      title="News"
      subtitle="Press releases and announcements from UNMAI Carbon Solutions."
      bannerImage="https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=2000&q=80"
    >
      <div className="mx-auto max-w-[850px]">
        <div className="mb-8">
          <Link to="/news" className="text-sm font-semibold text-[#006c49] transition hover:underline">
            ← Back to News
          </Link>
        </div>

        <article className="rounded-2xl border border-black/10 bg-white p-7 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.20)] sm:p-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#006c49]">
            {article.dateLabel}
          </p>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#131b2e] sm:text-3xl">
            {article.title}
          </h1>
          <p className="mt-3 text-base leading-7 text-[#444654]">{article.summary}</p>

          <div className="mt-8 space-y-5 text-[15px] leading-7 text-[#2b2d33]">
            {article.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {(article.pdfPath || article.sourceUrl) ? (
            <div className="mt-10 flex flex-wrap gap-3 border-t border-black/10 pt-6">
              {article.sourceUrl ? (
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center justify-center rounded-lg border border-black/15 bg-white px-4 py-2 text-sm font-semibold text-[#131b2e] transition hover:border-black/25 hover:bg-black/3"
                >
                  {article.sourceName ? `Read on ${article.sourceName}` : "Read original article"} ↗
                </a>
              ) : null}
              {article.pdfPath ? (
                <a
                  href={article.pdfPath}
                  download
                  className="inline-flex items-center justify-center rounded-lg border border-black/15 bg-white px-4 py-2 text-sm font-semibold text-[#131b2e] transition hover:border-black/25 hover:bg-black/3"
                >
                  Download original PDF
                </a>
              ) : null}
            </div>
          ) : null}
        </article>
      </div>
    </PageScaffold>
  );
}

export function LeadershipPage() {
  const sections = [
    "Founder & CEO",
    "CXO Expertise",
    "International Negotiation Support",
    "Climate Policy Experience",
    "Carbon Finance Leadership",
    "Global Advisory Experience",
    "Standards & Institutional Participation",
  ];
  return (
    <PageScaffold
      title="Leadership & Expertise"
      subtitle="Decades of experience across climate finance, Article 6, and carbon market implementation."
      bannerImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80"
    >
      <SectionIntro
        title="Leadership Capability"
        subtitle="Strategic Expertise Across Policy, Finance, and Implementation"
        paragraph="Leadership depth reflects multi-decade execution across international negotiations, climate policy advisory, carbon finance structuring, and institutional participation."
      />
      <div className="mx-auto grid max-w-[1216px] gap-6 md:grid-cols-2">
        {sections.map((section, i) => (
          <SectionCard
            key={section}
            title={section}
            meta={`Leadership Domain ${i + 1}`}
            kpis={["Policy", "Finance", "Execution"]}
            body="Institutional expertise spanning strategy, policy execution, and international advisory support."
          />
        ))}
      </div>
    </PageScaffold>
  );
}

export function InsightsPage() {
  const sections = [
    "Featured Insights",
    "Article 6 Intelligence",
    "Climate Finance",
    "Carbon Market Governance",
    "Digital MRV & Registries",
    "Climate Policy Analysis",
    "COP & UNFCCC Updates",
  ];
  return (
    <PageScaffold
      title="Insights & Climate Intelligence"
      subtitle="Strategic perspectives on carbon markets, climate finance, and digital climate infrastructure."
      bannerImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2000&q=80"
    >
      <SectionIntro
        title="Insight Streams"
        subtitle="Policy Intelligence and Market Implementation Perspectives"
        paragraph="Our insight tracks synthesize governance shifts, finance signals, and infrastructure priorities into decision-ready intelligence for institutions."
      />
      <div className="mx-auto grid max-w-[1216px] gap-6 md:grid-cols-2">
        {sections.map((section, i) => (
          <SectionCard
            key={section}
            title={section}
            meta={`Insight Track ${i + 1}`}
            kpis={["Analysis", "Governance", "Implementation"]}
            body="Enterprise-grade analysis and implementation-oriented perspectives for institutional stakeholders."
          />
        ))}
      </div>
    </PageScaffold>
  );
}

export function ContactPage() {
  return (
    <PageScaffold
      title="Contact UNMAI"
      subtitle="Connect with our team for strategic climate and carbon market engagements."
      bannerImage="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=80"
    >
      <SectionIntro
        title="Contact & Engagement"
        subtitle="Initiate a Strategic Discussion"
        paragraph="Share your institutional priorities and our team will align a consultation pathway across policy, finance, and digital carbon market implementation."
      />
      <div className="mx-auto grid max-w-[1216px] gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          <SectionCard
            title="Enterprise Contact Form"
            // meta="Strategic Inquiry"
            // kpis={["Response-ready", "Institutional Engagement", "Confidential"]}
          >
            <div className="mt-5 space-y-5">
              {/* <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Pathway", value: "Strategic Consultation" },
                  { label: "Response SLA", value: "< 24 Hours" },
                  { label: "Engagement Type", value: "Institutional" },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg border border-black/10 bg-white px-3 py-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#667085]">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#131b2e]">{item.value}</p>
                  </div>
                ))}
              </div> */}

              <div className="grid gap-4">
                {["Name", "Organization", "Email", "Country", "Inquiry Type"].map((f) => (
                  <input
                    key={f}
                    placeholder={f}
                    className="rounded-lg border border-black/10 bg-white px-4 py-3 text-sm shadow-[inset_0_1px_0_rgba(0,0,0,0.02)] transition focus:border-[#2b6193]/35 focus:outline-none"
                  />
                ))}
                <textarea
                  placeholder="Message"
                  className="h-[70px] rounded-lg border border-black/10 bg-white px-4 py-3 text-sm shadow-[inset_0_1px_0_rgba(0,0,0,0.02)] transition focus:border-[#2b6193]/35 focus:outline-none"
                />
                <button className="rounded-lg bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-neutral-900">
                  Submit Inquiry
                </button>
              </div>
            </div>
          </SectionCard>
          <SectionCard
            title="Strategic Consultation"
            meta="Executive Engagement"
            body="Schedule a high-level consultation for policy, finance, and digital carbon infrastructure engagements."
          />
        </div>
        <div className="space-y-6">
          <SectionCard
            title="Geo Presence"
            // meta="Global Engagement Map"
            body="Strategic advisory operations anchored in Singapore with active sovereign and multilateral engagement corridors."
            // kpis={["Asia", "Africa", "Middle East"]}
          >
            <div className="relative mt-5 overflow-hidden rounded-xl border border-black/10">
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
          </SectionCard>
          <SectionCard
            title="Institutional Presence"
            meta="LinkedIn"
            body="Institutional updates, climate intelligence briefings, and strategic advisory perspectives."
            kpis={["Company Page"]}
          >
            <a
              href="https://sg.linkedin.com/company/unmai-carbon-solutions"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-4 inline-flex text-sm font-semibold text-[#006c49] transition hover:underline"
            >
              UNMAI Carbon Solutions on LinkedIn ↗
            </a>
          </SectionCard>
          <SectionCard
            title="Contact Intelligence"
            meta="Direct Channels"
            body="Singapore HQ · 10, Sim Lim Tower, Jalan Besar #10-10, Singapore 208787"
            kpis={["admin@unmaicarbon.earth", "+65 9023 1823", "www.unmaicarbon.earth"]}
          />
        </div>
      </div>
    </PageScaffold>
  );
}
