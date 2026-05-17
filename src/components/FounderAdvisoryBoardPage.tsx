import { useState, type ReactNode } from "react";
import photoAjay from "../assets/team/Ajay_Mathur.jpg";
import photoBoudhyyan from "../assets/team/Boudhyyan Duttaa Photo.jpeg";
import photoChintan from "../assets/team/Chintan Shah Photo.jpeg";
import photoDinesh from "../assets/team/Dinesh Photo.jpeg";
import photoKotteswari from "../assets/team/Kotteswari Photo.jpeg";
import photoShinu from "../assets/team/Shinu Photo.jpeg";
import photoSouvik from "../assets/team/Souvik Photo.jpeg";
import { ScrollReveal } from "./ScrollReveal";
import { ScheduleConsultationModal } from "./ScheduleConsultationModal";
import { SiteCta } from "./SiteCta";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { TeamBioModal } from "./TeamBioModal";

type TeamMember = {
  name: string;
  role: string;
  image?: string;
  linkedIn: string;
  shortBio?: string;
};

type AdvisoryMember = {
  name: string;
  role: string;
  image: string;
  linkedIn: string;
  bio: string;
};

const CORE_TEAM: TeamMember[] = [
  {
    name: "Nithyanandam Yuvaraj Dinesh Babu",
    role: "Founder & CEO",
    image: photoDinesh,
    linkedIn: "https://www.linkedin.com/in/nithyanandam-yuvaraj-dinesh-babu-a1076b3/",
  },
  {
    name: "Kotteswari",
    role: "Chief Digital Officer",
    image: photoKotteswari,
    linkedIn: "https://www.linkedin.com/in/kotteswari-yuvaraj-dinesh-babu-8a8b0175/",
  },
  {
    name: "Shinu Jose",
    role: "Senior Carbon Project Specialist",
    image: photoShinu,
    linkedIn: "https://www.linkedin.com/in/shinujosecarbon/",
  },
  {
    name: "Souvik Mitra",
    role: "Carbon Project Specialist",
    image: photoSouvik,
    linkedIn: "https://www.linkedin.com/in/souvik-mitra-4770ab39/",
  },
  {
    name: "Boudhyyan Duttaa",
    role: "CBG Business Head",
    image: photoBoudhyyan,
    linkedIn: "https://www.linkedin.com/in/boudhhayanduttaa/",
  },
  {
    name: "Mhamed Khalfa",
    role: "Middle East Carbon Market Expert",
    linkedIn: "https://www.linkedin.com/in/mhamed-khalfa/",
  },
];

const ADVISORY_BOARD: AdvisoryMember[] = [
  {
    name: "Dr Ajay Mathur",
    role: "Global Strategic Advisory Board",
    image: photoAjay,
    linkedIn: "https://www.linkedin.com/in/ajay-mathur-3666b3334/",
    bio: "Dr. Mathur currently serves as Professor of Practice at the School of Public Policy, Indian Institute of Technology Delhi, and is globally recognized as one of India's foremost leaders in clean energy, climate policy, and sustainable development. He previously served as Director General of the International Solar Alliance, where he advanced global cooperation on solar energy deployment, climate finance, and energy access across developing countries. Earlier, he led The Energy and Resources Institute (TERI), strengthening its global role in climate change research, energy transition, decarbonization, and sustainability policy advisory. Dr. Mathur also served as Director General of the Bureau of Energy Efficiency, Government of India, where he played a key role in shaping India's landmark energy efficiency and market-based transition programs, including the Perform, Achieve and Trade (PAT) mechanism. Over the course of his career, he has worked extensively with governments, multilateral institutions, industry, and international organizations on climate governance, clean energy systems, and low-carbon development pathways. His leadership reflects a unique combination of policy expertise, institutional governance, technical understanding, and international climate diplomacy. Dr. Mathur continues to contribute significantly to global sustainability discourse through academic engagement, strategic advisory roles, and international cooperation initiatives.",
  },
  {
    name: "Chintan Shah",
    role: "Global Strategic Advisory Board",
    image: photoChintan,
    linkedIn: "https://www.linkedin.com/in/chintan-shah-5b82613/",
    bio: "Chintan Shah is a renewable energy veteran with over three decades of experience in India's green energy sector. He is the Founder of SustCred, a consultancy firm, and has previously held leadership roles including Vice President & Head at Suzlon, Group President at ReNew, and Director at IREDA Ltd. Mr. Shah brings rich expertise of three decades in various roles across the value chain of India's Renewable Energy ecosystem including Solar, Wind, Storage, Manufacturing, Financing, R&D and Policy formulation. He has spearheaded multiple projects for appraisal, financing, policy formulation, planning and monitoring of Renewable Energy Projects. He started his career from TERI in the year 1996.",
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

function MemberPhoto({ name, image }: { name: string; image?: string }) {
  if (image) {
    return (
      <img
        src={image}
        alt={name}
        className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
      />
    );
  }

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-[#131b2e] to-[#2b6193] text-4xl font-bold text-white/90">
      {initials}
    </div>
  );
}

function CoreTeamCard({ person }: { person: TeamMember }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)] transition duration-300 ease-out hover:-translate-y-1 hover:border-[#334ac9]/20 hover:shadow-[0_20px_50px_-24px_rgba(51,74,201,0.18)] motion-reduce:hover:translate-y-0">
      <div className="relative aspect-[4/3] min-h-[420px] overflow-hidden bg-[#131b2e]">
        <MemberPhoto name={person.name} image={person.image} />
        <div
          className="absolute inset-0 bg-linear-to-t from-[#131b2e]/80 via-transparent to-transparent"
          aria-hidden
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#006c49]">Core Team</p>
          <h3 className="text-lg font-bold leading-snug text-[#131b2e]">{person.name}</h3>
          <p className="text-sm font-medium text-[#2b6193]">{person.role}</p>
        </div>
        <a
          href={person.linkedIn}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#006c49] transition hover:underline"
        >
          LinkedIn
          <span aria-hidden>↗</span>
        </a>
      </div>
    </article>
  );
}

function AdvisoryCard({
  person,
  onOpenBio,
}: {
  person: AdvisoryMember;
  onOpenBio: () => void;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)] transition duration-300 ease-out hover:-translate-y-1 hover:border-[#334ac9]/20 hover:shadow-[0_20px_50px_-24px_rgba(51,74,201,0.18)] motion-reduce:hover:translate-y-0">
      <button
        type="button"
        onClick={onOpenBio}
        className="relative aspect-[4/3] min-h-[420px] w-full overflow-hidden bg-[#131b2e] text-left"
      >
        <MemberPhoto name={person.name} image={person.image} />
        <div
          className="absolute inset-0 bg-linear-to-t from-[#131b2e]/80 via-transparent to-transparent"
          aria-hidden
        />
      </button>
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#006c49]">
            Advisory Board
          </p>
          <button
            type="button"
            onClick={onOpenBio}
            className="text-left text-lg font-bold leading-snug text-[#131b2e] transition hover:text-[#006c49]"
          >
            {person.name}
          </button>
          <p className="text-sm font-medium text-[#2b6193]">{person.role}</p>
        </div>
        <p className="line-clamp-4 flex-1 text-sm leading-6 text-[#444654]">{person.bio}</p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onOpenBio}
            className="text-xs font-semibold uppercase tracking-[0.12em] text-[#131b2e] transition hover:text-[#006c49]"
          >
            Read full profile
          </button>
          <a
            href={person.linkedIn}
            target="_blank"
            rel="noreferrer noopener"
            className="text-xs font-semibold uppercase tracking-[0.12em] text-[#006c49] transition hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            LinkedIn ↗
          </a>
        </div>
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
  const [activeAdvisor, setActiveAdvisor] = useState<AdvisoryMember | null>(null);

  return (
    <PageShell>
      <EnterpriseBanner
        title="Leadership"
        subtitle="Institutional leadership guiding sovereign-grade climate advisory, carbon finance, and digital market infrastructure."
      />
      <main className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <SectionIntro
          title="Core Team"
          subtitle="Leadership Across Policy, Finance & Digital Infrastructure"
          paragraph="UNMAI’s core team brings together policy, finance, digital infrastructure, and carbon market implementation depth to support governments, institutions, and corporates."
        />

        <div className="mx-auto grid max-w-[1216px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_TEAM.map((person) => (
            <ScrollReveal key={person.name}>
              <CoreTeamCard person={person} />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-20">
          <SectionIntro
            title="Global Strategic Advisory Board"
            subtitle="Strategic Guidance from Global Climate Leaders"
            paragraph="Our advisory board provides strategic counsel on climate policy, energy transition, renewable markets, and institutional carbon market development."
          />
        </div>

        <div className="mx-auto grid max-w-[1216px] gap-6 sm:grid-cols-2">
          {ADVISORY_BOARD.map((person) => (
            <ScrollReveal key={person.name}>
              <AdvisoryCard person={person} onOpenBio={() => setActiveAdvisor(person)} />
            </ScrollReveal>
          ))}
        </div>
      </main>

      <TeamBioModal
        open={activeAdvisor !== null}
        name={activeAdvisor?.name ?? ""}
        role={activeAdvisor?.role}
        bio={activeAdvisor?.bio ?? ""}
        linkedIn={activeAdvisor?.linkedIn}
        onClose={() => setActiveAdvisor(null)}
      />
    </PageShell>
  );
}
