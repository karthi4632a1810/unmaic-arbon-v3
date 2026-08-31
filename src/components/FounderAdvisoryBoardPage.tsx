import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useCachedImageUrl } from "../hooks/useCachedImageUrl";
import { cacheTeamImagesFromUrls } from "../lib/teamImageCache";
import { TEAM_PHOTOS } from "../lib/teamPhotos";
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
  bio?: string;
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
    image: TEAM_PHOTOS.dinesh,
    linkedIn: "https://www.linkedin.com/in/nithyanandam-yuvaraj-dinesh-babu-a1076b3/",
  },
  {
    name: "Kotteswari",
    role: "Chief Digital Officer",
    image: TEAM_PHOTOS.kotteswari,
    linkedIn: "https://www.linkedin.com/in/kotteswari-yuvaraj-dinesh-babu-8a8b0175/",
  },
  {
    name: "Shinu Jose",
    role: "Senior Carbon Project Specialist",
    image: TEAM_PHOTOS.shinu,
    linkedIn: "https://www.linkedin.com/in/shinujosecarbon/",
  },
  {
    name: "Souvik Mitra",
    role: "Carbon Project Specialist",
    image: TEAM_PHOTOS.souvik,
    linkedIn: "https://www.linkedin.com/in/souvik-mitra-4770ab39/",
  },
  {
    name: "Boudhhayan Duttaa",
    role: "CBG Business Head",
    image: TEAM_PHOTOS.boudhyyan,
    linkedIn: "https://www.linkedin.com/in/boudhhayanduttaa/",
  },
  {
    name: "Mhamed Khalfa",
    role: "Middle East Carbon Market Expert",
    image: TEAM_PHOTOS.khalfa,
    linkedIn: "https://www.linkedin.com/in/mhamed-khalfa/",
  },
];

const ADVISORY_BOARD: AdvisoryMember[] = [
  {
    name: "Dr Ajay Mathur",
    role: "Global Strategic Advisory Board",
    image: TEAM_PHOTOS.ajay,
    linkedIn: "https://www.linkedin.com/in/ajay-mathur-3666b3334/",
    bio: "Dr. Mathur currently serves as Professor of Practice at the School of Public Policy, Indian Institute of Technology Delhi, and is globally recognized as one of India's foremost leaders in clean energy, climate policy, and sustainable development. He previously served as Director General of the International Solar Alliance, where he advanced global cooperation on solar energy deployment, climate finance, and energy access across developing countries. Earlier, he led The Energy and Resources Institute (TERI), strengthening its global role in climate change research, energy transition, decarbonization, and sustainability policy advisory. Dr. Mathur also served as Director General of the Bureau of Energy Efficiency, Government of India, where he played a key role in shaping India's landmark energy efficiency and market-based transition programs, including the Perform, Achieve and Trade (PAT) mechanism. Over the course of his career, he has worked extensively with governments, multilateral institutions, industry, and international organizations on climate governance, clean energy systems, and low-carbon development pathways. His leadership reflects a unique combination of policy expertise, institutional governance, technical understanding, and international climate diplomacy. Dr. Mathur continues to contribute significantly to global sustainability discourse through academic engagement, strategic advisory roles, and international cooperation initiatives.",
  },
  {
    name: "Chintan Shah",
    role: "Global Strategic Advisory Board",
    image: TEAM_PHOTOS.chintan,
    linkedIn: "https://www.linkedin.com/in/chintan-shah-5b82613/",
    bio: "Chintan Shah is a renewable energy veteran with over three decades of experience in India's green energy sector. He is the Founder of SustCred, a consultancy firm, and has previously held leadership roles including Vice President & Head at Suzlon, Group President at ReNew, and Director at IREDA Ltd. Mr. Shah brings rich expertise of three decades in various roles across the value chain of India's Renewable Energy ecosystem including Solar, Wind, Storage, Manufacturing, Financing, R&D and Policy formulation. He has spearheaded multiple projects for appraisal, financing, policy formulation, planning and monitoring of Renewable Energy Projects. He started his career from TERI in the year 1996.",
  },
  {
    name: "Dr. Bhaskar Natarajan",
    role: "Global Strategic Advisory Board",
    image: TEAM_PHOTOS.bhaskar,
    linkedIn: "https://in.linkedin.com/in/bhaskar-natarajan-64609150",
    bio: "Dr. Bhaskar Natarajan has over thirty years' experience in the field of climate change and sustainable development. Dr. Bhaskar has worked with the public and private sectors, civil society organizations and funding agencies. Dr. Bhaskar has worked with grassroots agencies to implement renewable energy and energy efficiency projects across India.\n\nHe has worked on projects, supported by World Bank, USAID, ADB, UNDP, CIDA and DFID among others, and has been a part of several official government and industry committees of energy and environment.\n\nHe has also written and published in national and international journals and other publications apart from contributing to a book on Renewable Energy Policy.\n\nAmong key positions held are Deputy Chief of Party (Energy Efficiency) with the USAID PACE-D project, Managing Director of C-Quest Capital Green Ventures (the Indian arm of C-Quest Capital, US), Senior Advisor and Fellow with the Alliance for an Energy Efficient Economy. He currently advises CSOs on climate change and sustainability.",
  },
];

function EnterpriseBanner({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section
      className="relative overflow-hidden px-4 pb-10 pt-24 text-white sm:px-6 sm:pb-12 sm:pt-28 lg:px-8 lg:pt-32"
      style={{
        backgroundImage:
          "linear-gradient(120deg, rgba(8,12,21,0.9), rgba(19,27,46,0.82)), url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-[1216px] space-y-4 sm:space-y-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#e6ff80] xs:text-xs">
          UNMAI Carbon Solutions
        </p>
        <h1 className="max-w-4xl text-2xl font-bold leading-tight tracking-tight xs:text-3xl sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="max-w-3xl text-sm leading-6 text-white/80 xs:text-base xs:leading-7 sm:text-lg">
          {subtitle}
        </p>
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
      <div className="mx-auto mb-8 flex max-w-[1216px] flex-col gap-5 border-b border-black/8 pb-6 sm:gap-6 sm:pb-8 md:mb-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#006c49]">{title}</p>
          <h2 className="display-head max-w-2xl text-[clamp(1.7rem,4.4vw,2.9rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#131b2e]">
            {subtitle}
          </h2>
        </div>
        <p className="max-w-xl text-left text-sm leading-6 text-[#444654] xs:text-base xs:leading-7 lg:text-right">
          {paragraph}
        </p>
      </div>
    </ScrollReveal>
  );
}

const TEAM_IMAGE_URLS = [
  ...CORE_TEAM.map((member) => member.image),
  ...ADVISORY_BOARD.map((member) => member.image),
].filter((url): url is string => Boolean(url));

function MemberPhotoPlaceholder({ name }: { name: string }) {
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

function CachedMemberPhoto({ name, image }: { name: string; image: string }) {
  const displayUrl = useCachedImageUrl(image);
  const [hasError, setHasError] = useState(false);

  if (!displayUrl || hasError) {
    return <MemberPhotoPlaceholder name={name} />;
  }

  return (
    <img
      src={displayUrl}
      alt={name}
      className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.03]"
      onError={() => setHasError(true)}
    />
  );
}

function MemberPhoto({ name, image }: { name: string; image?: string }) {
  if (image) {
    return <CachedMemberPhoto name={name} image={image} />;
  }

  return <MemberPhotoPlaceholder name={name} />;
}

function CoreTeamCard({ person, onOpenBio }: { person: TeamMember; onOpenBio?: () => void }) {
  const bioText = person.bio || person.shortBio;
  const hasBio = Boolean(bioText && onOpenBio);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)] transition duration-300 ease-out hover:-translate-y-1 hover:border-[#334ac9]/20 hover:shadow-[0_20px_50px_-24px_rgba(51,74,201,0.18)] motion-reduce:hover:translate-y-0">
      {hasBio ? (
        <button
          type="button"
          onClick={onOpenBio}
          className="relative flex w-full justify-center pb-3 pt-6 xs:pt-8"
        >
          <div className="relative size-40 overflow-hidden rounded-full border-4 border-white shadow-lg ring-2 ring-black/10 transition duration-300 group-hover:scale-[1.04] group-hover:ring-[#006c49]/50 xs:size-48 sm:size-44 md:size-52 lg:size-56">
            <MemberPhoto name={person.name} image={person.image} />
          </div>
        </button>
      ) : (
        <div className="relative flex w-full justify-center pb-3 pt-6 xs:pt-8">
          <div className="relative size-40 overflow-hidden rounded-full border-4 border-white shadow-lg ring-2 ring-black/10 transition duration-300 group-hover:scale-[1.04] group-hover:ring-[#006c49]/50 xs:size-48 sm:size-44 md:size-52 lg:size-56">
            <MemberPhoto name={person.name} image={person.image} />
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col items-center gap-3 p-5 text-center sm:p-6">
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#006c49]">
            Core Team
          </p>
          {hasBio ? (
            <button
              type="button"
              onClick={onOpenBio}
              className="text-center text-lg font-bold leading-snug text-[#131b2e] transition hover:text-[#006c49] sm:text-xl"
            >
              {person.name}
            </button>
          ) : (
            <h3 className="text-center text-lg font-bold leading-snug text-[#131b2e] sm:text-xl">
              {person.name}
            </h3>
          )}
          <p className="text-sm font-medium text-[#2b6193]">{person.role}</p>
        </div>
        {bioText ? (
          <p className="line-clamp-4 flex-1 text-center text-sm leading-6 text-[#444654]">
            {bioText}
          </p>
        ) : (
          <div className="flex-1" />
        )}
        <div className="mt-auto flex flex-wrap items-center justify-center gap-3 pt-1">
          {hasBio ? (
            <button
              type="button"
              onClick={onOpenBio}
              className="text-xs font-semibold uppercase tracking-[0.12em] text-[#131b2e] transition hover:text-[#006c49]"
            >
              Read full profile
            </button>
          ) : null}
          {person.linkedIn ? (
            <a
              href={person.linkedIn}
              target="_blank"
              rel="noreferrer noopener"
              className="text-xs font-semibold uppercase tracking-[0.12em] text-[#006c49] transition hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              LinkedIn ↗
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function AdvisoryCard({ person, onOpenBio }: { person: AdvisoryMember; onOpenBio: () => void }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)] transition duration-300 ease-out hover:-translate-y-1 hover:border-[#334ac9]/20 hover:shadow-[0_20px_50px_-24px_rgba(51,74,201,0.18)] motion-reduce:hover:translate-y-0">
      <button
        type="button"
        onClick={onOpenBio}
        className="relative flex w-full justify-center pb-3 pt-6 xs:pt-8"
      >
        <div className="relative size-40 overflow-hidden rounded-full border-4 border-white shadow-lg ring-2 ring-black/10 transition duration-300 group-hover:scale-[1.04] group-hover:ring-[#006c49]/50 xs:size-48 sm:size-44 md:size-52 lg:size-56">
          <MemberPhoto name={person.name} image={person.image} />
        </div>
      </button>
      <div className="flex flex-1 flex-col items-center gap-3 p-5 text-center sm:p-6">
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#006c49]">
            Advisory Board
          </p>
          <button
            type="button"
            onClick={onOpenBio}
            className="text-center text-lg font-bold leading-snug text-[#131b2e] transition hover:text-[#006c49] sm:text-xl"
          >
            {person.name}
          </button>
          <p className="text-sm font-medium text-[#2b6193]">{person.role}</p>
        </div>
        <p className="line-clamp-4 flex-1 text-center text-sm leading-6 text-[#444654]">
          {person.bio}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <button
            type="button"
            onClick={onOpenBio}
            className="text-xs font-semibold uppercase tracking-[0.12em] text-[#131b2e] transition hover:text-[#006c49]"
          >
            Read full profile
          </button>
          {person.linkedIn ? (
            <a
              href={person.linkedIn}
              target="_blank"
              rel="noreferrer noopener"
              className="text-xs font-semibold uppercase tracking-[0.12em] text-[#006c49] transition hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              LinkedIn ↗
            </a>
          ) : null}
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

type BioModalData = {
  name: string;
  role?: string;
  category: string;
  bio: string;
  linkedIn?: string;
};

export function FounderAdvisoryBoardPage() {
  const [activeBioMember, setActiveBioMember] = useState<BioModalData | null>(null);
  const coreTeamSorted = useMemo(
    () =>
      [...CORE_TEAM].sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
      ),
    [],
  );

  useEffect(() => {
    void cacheTeamImagesFromUrls(TEAM_IMAGE_URLS);
  }, []);

  return (
    <PageShell>
      <EnterpriseBanner
        title="Leadership"
        subtitle="Institutional leadership guiding sovereign-grade climate advisory, carbon finance, and digital market infrastructure."
      />
      <main className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <SectionIntro
          title="Core Team"
          subtitle="Leadership Across Policy, Finance & Digital Infrastructure"
          paragraph="UNMAI’s core team brings together policy, finance, digital infrastructure, and carbon market implementation depth to support governments, institutions, and corporates."
        />

        <div className="mx-auto grid max-w-[1216px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coreTeamSorted.map((person) => (
            <ScrollReveal key={person.name}>
              <CoreTeamCard
                person={person}
                onOpenBio={
                  person.bio || person.shortBio
                    ? () =>
                        setActiveBioMember({
                          name: person.name,
                          role: person.role,
                          category: "Core Team",
                          bio: (person.bio || person.shortBio)!,
                          linkedIn: person.linkedIn,
                        })
                    : undefined
                }
              />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-10 sm:mt-12">
          <SectionIntro
            title="Global Strategic Advisory Board"
            subtitle="Strategic Guidance from Global Climate Leaders"
            paragraph="Our advisory board provides strategic counsel on climate policy, energy transition, renewable markets, and institutional carbon market development."
          />
        </div>

        <div className="mx-auto grid max-w-[1216px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ADVISORY_BOARD.map((person) => (
            <ScrollReveal key={person.name}>
              <AdvisoryCard
                person={person}
                onOpenBio={() =>
                  setActiveBioMember({
                    name: person.name,
                    role: person.role,
                    category: "Global Strategic Advisory Board",
                    bio: person.bio,
                    linkedIn: person.linkedIn,
                  })
                }
              />
            </ScrollReveal>
          ))}
        </div>
      </main>

      <TeamBioModal
        open={activeBioMember !== null}
        name={activeBioMember?.name ?? ""}
        role={activeBioMember?.role}
        category={activeBioMember?.category}
        bio={activeBioMember?.bio ?? ""}
        linkedIn={activeBioMember?.linkedIn}
        onClose={() => setActiveBioMember(null)}
      />
    </PageShell>
  );
}
