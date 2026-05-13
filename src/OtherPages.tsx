import { type ReactNode, useState } from "react";
import { ScrollReveal } from "./components/ScrollReveal";
import { ScheduleConsultationModal } from "./components/ScheduleConsultationModal";
import { INDIA_ENGAGEMENT_PLACES, IndiaEngagementMap } from "./components/IndiaEngagementMap";
import { SiteHeader } from "./components/SiteHeader";

const imgImage3 =
  "https://www.figma.com/api/mcp/asset/7c8496ff-75f5-4213-aa8c-30448363189a";

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

function SharedCta({ onScheduleClick }: { onScheduleClick: () => void }) {
  return (
    <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
      <ScrollReveal>
        <div className="relative mx-auto max-w-[1216px] overflow-hidden rounded-[32px] bg-black px-8 py-16 text-center sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute inset-0 opacity-10" aria-hidden>
            <div className="absolute inset-y-0 left-[25%] w-px bg-white" />
            <div className="absolute inset-y-0 right-[25%] w-px bg-white" />
            <div className="absolute left-0 right-0 top-[28%] h-px bg-white" />
          </div>
          <div className="relative mx-auto flex max-w-3xl flex-col gap-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-none">
              Partner to Operationalize High-Integrity Carbon Markets.
            </h2>
            <p className="text-base leading-7 text-white/70 sm:text-lg">
              Bridging climate policy, carbon finance, and digital innovation through sovereign-grade
              advisory and interoperable carbon infrastructure.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button
                type="button"
                className="rounded-lg bg-white px-8 py-4 text-sm font-bold text-black transition hover:bg-neutral-100"
              >
                Explore Strategic Services
              </button>
              <button
                type="button"
                onClick={onScheduleClick}
                className="rounded-lg border border-white/20 bg-white/10 px-8 py-4 text-sm font-bold text-white transition hover:bg-white/20"
              >
                Schedule Strategic Consultation
              </button>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-[#f9f9f9]">
      <ScrollReveal>
        <div className="mx-auto max-w-[1020px] px-6 pb-8 pt-16">
          <div className="grid gap-12 border-b border-black/10 pb-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-black p-1.5 shadow-sm ring-1 ring-black/10">
                  <img src={imgImage3} alt="Unmai Carbon mark" className="h-full w-full object-contain" />
                </div>
                <div className="space-y-1">
                  <span className="block text-[clamp(1.75rem,4vw,2.15rem)] font-black leading-[1.05] tracking-tight text-black">
                    UNMAI Carbon
                  </span>
                  <span className="block text-[clamp(1.2rem,2.5vw,1.6rem)] font-bold leading-[1.05] tracking-tight text-black/95">
                    Solutions
                  </span>
                </div>
              </div>
              <p className="text-sm text-black">Truth · Transparency · Traceability · Integrity</p>
              <p className="text-xs leading-relaxed text-black">
                Singapore HQ
                <br />
                10, Sim Lim Tower, Jalan Besar #10-10, Singapore 208787
                <br />
                Email: ydb@unmaicarbon.earth
                <br />
                Phone: +65 9023 1823
                <br />
                Website: www.unmaicarbon.earth
              </p>
            </div>
            <FooterList
              title="Strategic Services"
              items={[
                "Net Zero Transition",
                "Climate Policy Advisory",
                "Climate Finance",
                "Article 6 Implementation",
                "Carbon Registry Systems",
                "Digital MRV Infrastructure",
              ]}
            />
            <FooterList
              title="Global Engagements"
              items={[
                "Bhutan",
                "Nigeria",
                "Indonesia",
                "Sri Lanka",
                "Oman",
                "Saudi Arabia",
                "Pakistan",
                "Kenya",
              ]}
            />
            <FooterList
              title="Institutional Participation"
              items={[
                "ISO Standards",
                "UNFCCC Engagements",
                "CAD Trust",
                "VCMI",
                "BioCarbon Standard",
                "World Bank Collaboration",
              ]}
            />
          </div>
        </div>
      </ScrollReveal>
      <div className="bg-[#45464d] px-6 py-6">
        <div className="mx-auto flex max-w-[1020px] flex-col items-start justify-between gap-4 text-xs text-white sm:flex-row sm:items-center">
          <p>© 2026 UNMAI Carbon Solutions Pte Ltd.</p>
          <p>Truth · Transparency · Traceability · Integrity</p>
        </div>
      </div>
    </footer>
  );
}

function FooterList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="mb-4 text-[11px] font-bold uppercase tracking-wider text-black">{title}</h3>
      <ul className="space-y-2.5 text-sm text-black">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
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
        "relative overflow-hidden rounded-2xl border border-black/[0.07] bg-gradient-to-b from-white to-slate-50/90 p-6 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition duration-300 ease-out hover:-translate-y-1 hover:border-[#334ac9]/20 hover:shadow-[0_20px_50px_-24px_rgba(51,74,201,0.18)] motion-reduce:hover:translate-y-0 sm:p-8",
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
      <SharedCta onScheduleClick={() => setConsultationOpen(true)} />
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
      subtitle="Building trusted climate infrastructure through policy, finance, and digital innovation."
      bannerImage="https://images.unsplash.com/photo-1581092446327-9f89c1f2f2b6?auto=format&fit=crop&w=2000&q=80"
    >
      <SectionIntro
        title="About Overview"
        subtitle="Institutional Foundations and Global Climate Positioning"
        paragraph="UNMAI Carbon Solutions combines sovereign-grade advisory, multilateral engagement, and interoperable digital infrastructure to advance high-integrity carbon market ecosystems."
      />
      <div className="mx-auto grid max-w-[1216px] gap-8 lg:grid-cols-2">
        <SectionCard
          title="Company Introduction"
          meta="Institutional Profile"
          kpis={["Singapore HQ", "Global Advisory", "Enterprise Delivery"]}
          body="UNMAI Carbon Solutions is a Singapore-headquartered global climate advisory and enterprise climate infrastructure firm supporting governments, institutions, and market actors."
        />
        <SectionCard
          title="Meaning of UNMAI"
          meta="Foundational Principle"
          kpis={["Truth", "Authenticity", "Integrity"]}
          body='UNMAI derives from the Tamil principle of "Truth, Authenticity, Integrity, and Real," forming the foundation of our standards-based operating philosophy.'
        />
        <SectionCard title="T³I Philosophy" meta="Governance Framework" kpis={["Truth", "Transparency", "Traceability", "Integrity"]}>
          <ul className="mt-4 space-y-2 text-[#444654]">
            {["Truth", "Transparency", "Traceability", "Integrity"].map((v) => (
              <li key={v}>• {v}</li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard
          title="Mission & Vision"
          meta="Strategic Direction"
          kpis={["Sovereign-grade", "Interoperable", "Long-term Capability"]}
          body="Our mission is to operationalize high-integrity carbon markets through sovereign-grade advisory, interoperable infrastructure, and long-term institutional capability."
        />
        <SectionCard
          title="Global Reach"
          meta="Geographic Footprint"
          kpis={["Asia", "Africa", "Middle East"]}
          body="UNMAI supports climate infrastructure implementation across Asia, Africa, and the Middle East through country engagements, multilateral collaboration, and standards participation."
        />
        <SectionCard
          title="Why UNMAI"
          meta="Institutional Advantage"
          kpis={["Policy", "Finance", "Digital Infrastructure"]}
          body="Policy expertise, climate finance structuring, digital infrastructure, international negotiation support, and standards participation delivered through one institutional platform."
        />
      </div>
    </PageScaffold>
  );
}

export function ServicesPage() {
  const services = [
    "Net Zero Transition & Climate Advisory",
    "Climate Finance & Investment Strategy",
    "Carbon Market Infrastructure & Governance",
    "Carbon Project Development",
    "Digital MRV & Registry Systems",
    "Capacity Building & Institutional Readiness",
  ];
  return (
    <PageScaffold
      title="Strategic Climate & Carbon Market Services"
      subtitle="Enterprise advisory and digital infrastructure for governments, multilaterals, and climate institutions."
      bannerImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80"
    >
      <SectionIntro
        title="Service Portfolio"
        subtitle="Enterprise Services for Carbon Market Operationalization"
        paragraph="Each service line is designed to deliver implementation-ready outcomes across policy, finance, infrastructure, and institutional readiness mandates."
      />
      <div className="mx-auto grid max-w-[1216px] gap-6 md:grid-cols-2">
        {services.map((service, i) => (
          <SectionCard
            key={service}
            title={service}
            meta={`Service ${String(i + 1).padStart(2, "0")}`}
            kpis={["Strategic Outcomes", "Implementation Capability"]}
            body="Includes institutional-grade delivery model, implementation capability, strategic outcomes, and compliance-ready execution support."
          />
        ))}
      </div>
    </PageScaffold>
  );
}

export function DigitalInfrastructurePage() {
  const items = [
    "National Carbon Registries",
    "Digital MRV Infrastructure",
    "Blockchain-enabled Traceability",
    "NAMBĪ Digital Ecosystem",
    "Interoperability Frameworks",
    "Carbon Data Standards",
    "CAD Trust Integration",
    "Registry Ecosystem Architecture",
  ];
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
      <div className="mx-auto grid max-w-[1216px] gap-6 md:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <SectionCard
            key={item}
            title={item}
            meta={`System Layer ${i + 1}`}
            kpis={["Interoperable", "Standards-based"]}
            body="Architecture-driven implementation with standards-based system integration."
          />
        ))}
      </div>
    </PageScaffold>
  );
}

export function GlobalEngagementsPage() {
  const countries = INDIA_ENGAGEMENT_PLACES.map((place) => place.name);
  return (
    <PageScaffold
      title="Global Engagements"
      subtitle="Supporting climate market development across Asia, Africa, and the Middle East."
      bannerImage="https://images.unsplash.com/photo-1484589065579-248aad0d8b13?auto=format&fit=crop&w=2000&q=80"
    >
      <SectionIntro
        title="Global Footprint"
        subtitle="Sovereign and Multilateral Engagements Across Regions"
        paragraph="Country-level implementation support is delivered through strategic collaboration with governments, institutions, and climate stakeholders in priority geographies."
      />
      <IndiaEngagementMap />
      <div className="mx-auto max-w-[1216px] space-y-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {countries.map((country, i) => (
            <SectionCard key={country} title={country} meta={`Location ${(i + 1).toString().padStart(2, "0")}`} />
          ))}
        </div>
        <SectionCard
          title="Multilateral Collaborations"
          meta="Institutional Partners"
          kpis={["ADB", "World Bank", "UNDP", "IFC"]}
          body="Engagement pathways supporting policy and implementation across multilateral climate mandates."
        />
        <SectionCard
          title="Regional Capacity Building"
          meta="Implementation Support"
          kpis={["Technical Advisory", "Institutional Readiness"]}
          body="Technical and institutional readiness support for long-term market operationalization."
        />
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
        subtitle="Initiate a Strategic Climate Infrastructure Discussion"
        paragraph="Share your institutional priorities and our team will align a consultation pathway across policy, finance, and digital carbon market implementation."
      />
      <div className="mx-auto grid max-w-[1216px] gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          <SectionCard
            title="Enterprise Contact Form"
            meta="Strategic Inquiry"
            kpis={["Response-ready", "Institutional Engagement", "Confidential"]}
          >
            <div className="mt-5 space-y-5">
              <div className="grid gap-3 sm:grid-cols-3">
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
              </div>

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
            title="Global Engagement Map"
            meta="Geo Presence"
            body="Strategic advisory operations anchored in Singapore with active sovereign and multilateral engagement corridors."
            kpis={["Asia", "Africa", "Middle East"]}
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
          />
          <SectionCard
            title="Contact Intelligence"
            meta="Direct Channels"
            body="Singapore HQ · 10, Sim Lim Tower, Jalan Besar #10-10, Singapore 208787"
            kpis={["ydb@unmaicarbon.earth", "+65 9023 1823", "www.unmaicarbon.earth"]}
          />
        </div>
      </div>
    </PageScaffold>
  );
}
