export type EventCategory =
  | "All"
  | "Summit"
  | "Webinar"
  | "Roundtable"
  | "Forum"
  | "Masterclass";

export type EventFormat = "All" | "In-Person" | "Virtual" | "Hybrid";

export type EventSpeaker = {
  name: string;
  role: string;
  organization: string;
  avatar?: string;
};

export type EventItem = {
  id: string;
  slug?: string;
  title: string;
  tagline?: string;
  category: "Summit" | "Webinar" | "Roundtable" | "Forum" | "Masterclass";
  format: "In-Person" | "Virtual" | "Hybrid";
  status: "upcoming" | "past";
  featured?: boolean;
  startDate: string; // ISO string for sorting: YYYY-MM-DD
  endDate?: string;
  dateLabel: string; // e.g. "November 18–20, 2026"
  timeLabel: string; // e.g. "09:00 – 18:00 SGT"
  location: string; // e.g. "Marina Bay Sands, Singapore"
  venue?: string;
  summary: string;
  description?: string;
  topics: string[];
  speakers?: EventSpeaker[];
  bannerImage: string;
  ctaPrimary: {
    label: string;
    url?: string;
    action?: "link" | "modal" | "external";
  };
  ctaSecondary?: {
    label: string;
    url: string;
    isDownload?: boolean;
    isExternal?: boolean;
  };
};

export const EVENTS_DATA: EventItem[] = [
  // ===================== UPCOMING EVENTS =====================
  {
    id: "evt-article6-summit-2026",
    slug: "global-article-6-summit-2026",
    title: "Global Article 6 & High-Integrity Carbon Markets Summit 2026",
    tagline: "Operationalizing Paris Agreement Article 6.2, 6.4 & Sovereign Climate Finance",
    category: "Summit",
    format: "In-Person",
    status: "upcoming",
    featured: true,
    startDate: "2026-11-18",
    endDate: "2026-11-20",
    dateLabel: "November 18–20, 2026",
    timeLabel: "09:00 – 18:00 SGT (UTC+8)",
    location: "Singapore",
    venue: "Marina Bay Sands Expo & Convention Centre, Singapore",
    summary:
      "Convening international climate negotiators, sovereign carbon registries, multilateral development banks, and carbon market actors in Singapore to establish high-integrity frameworks, digital MRV public goods, and Article 6 authorization mechanisms.",
    description:
      "As international carbon markets accelerate following COP decisions, sovereign entities and private buyers require rigorous frameworks for Article 6.2 bilateral transfers and Article 6.4 transition mechanisms. This three-day summit brings together global decision-makers for Chatham House discussions, bilateral structuring sessions, and technical digital MRV showcases.",
    topics: [
      "Article 6.2 Bilateral Agreements",
      "Article 6.4 Crediting Mechanism",
      "Corresponding Adjustments",
      "Digital MRV & National Registries",
      "Sovereign Decarbonization Finance",
    ],
    speakers: [
      {
        name: "Dr. Axel Michaelowa",
        role: "Senior Founding Partner",
        organization: "Perspectives Climate Group; UNMAI Global Strategic Advisory Board",
      },
      {
        name: "Yuvaraj Dinesh Babu Nithyanandam",
        role: "Founder & CEO",
        organization: "UNMAI Carbon Solutions",
      },
      {
        name: "Rimi Pathak",
        role: "Carbon Market & Communications Specialist",
        organization: "UNMAI Carbon Solutions",
      },
    ],
    bannerImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80",
    ctaPrimary: {
      label: "Request Invitation",
      action: "modal",
    },
    ctaSecondary: {
      label: "Download Brochure",
      url: "/UNMAI_CORPORATE PPT 1.pptx",
      isDownload: true,
    },
  },
  {
    id: "evt-cdm-closure-forum-2026",
    title: "UNFCCC CDM Closure & Legacy CERs Transition Forum",
    tagline: "Critical Actions Before the 25 November 2026 Voluntary Cancellation Window",
    category: "Roundtable",
    format: "Hybrid",
    status: "upcoming",
    featured: false,
    startDate: "2026-11-12",
    dateLabel: "November 12, 2026",
    timeLabel: "14:00 – 17:30 SGT / 11:30 – 15:00 IST",
    location: "Singapore & Virtual (Hybrid)",
    venue: "UNMAI Singapore HQ & Live Broadcast",
    summary:
      "An executive briefing and technical clinic for clean energy project owners, custodians, and institutional buyers on the final steps required under UNFCCC decision 4/CMP.20 before CDM registry transactions cease on 31 December 2026.",
    description:
      "With UNFCCC guidance advising account holders to submit cancellation requests by 25 November 2026, this session provides a practical roadmap for verifying cancellation records, submitting documentation, and onboarding credits onto the UNMAI Legacy CERs Platform and CONIL digital marketplace.",
    topics: [
      "UNFCCC Decision 4/CMP.20",
      "Voluntary Cancellation Workflows",
      "Serial Range Verification",
      "UNMAI Platform Onboarding",
    ],
    speakers: [
      {
        name: "Yuvaraj Dinesh Babu Nithyanandam",
        role: "Founder & CEO",
        organization: "UNMAI Carbon Solutions",
      },
      {
        name: "Vishwajit",
        role: "Founder & CEO",
        organization: "CONIL / Envex Technologies",
      },
    ],
    bannerImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    ctaPrimary: {
      label: "Register for Hybrid Session",
      action: "modal",
    },
    ctaSecondary: {
      label: "Learn About Legacy CERs",
      url: "https://www.legacycers.earth/",
      isExternal: true,
    },
  },
  {
    id: "evt-apac-climate-finance-forum",
    title: "Asia-Pacific Climate Finance & Sovereign Carbon Forum",
    tagline: "Bridging Private Capital and National Climate Commitments",
    category: "Forum",
    format: "Hybrid",
    status: "upcoming",
    featured: false,
    startDate: "2026-12-08",
    endDate: "2026-12-09",
    dateLabel: "December 8–9, 2026",
    timeLabel: "09:30 – 17:00 ICT / 10:30 – 18:00 SGT",
    location: "Bangkok, Thailand & Virtual",
    venue: "Bangkok Convention Centre & Virtual Hub",
    summary:
      "Bringing together regional development banks, sovereign climate offices, and carbon asset managers across ASEAN and South Asia to mobilize results-based climate finance and establish interoperable national registries.",
    description:
      "Focusing on the transition from voluntary credits to compliance mechanisms, this forum addresses sovereign authorization criteria, regional carbon pricing models, and blended finance structures that de-risk private investment in grid decarbonization.",
    topics: [
      "Results-Based Climate Finance",
      "ASEAN Power Grid Decarbonization",
      "National Registry Interoperability",
      "De-risking Carbon Investments",
    ],
    speakers: [
      {
        name: "Yuvaraj Dinesh Babu Nithyanandam",
        role: "Founder & CEO",
        organization: "UNMAI Carbon Solutions",
      },
    ],
    bannerImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
    ctaPrimary: {
      label: "Request Details & RSVP",
      action: "modal",
    },
  },

  // ===================== PAST EVENTS =====================
  {
    id: "evt-webinar-cdm-cers-2026",
    slug: "extending-legacy-cdm-cers-webinar",
    title: "Extending the Utility of Legacy UNFCCC CDM CERs",
    tagline: "Navigating the CDM Registry Closure and Verifiable Re-issuance Pathways",
    category: "Webinar",
    format: "Virtual",
    status: "past",
    featured: true,
    startDate: "2026-10-06",
    dateLabel: "October 6, 2026",
    timeLabel: "16:00 – 17:00 IST / 18:30 – 19:30 SGT",
    location: "Virtual (Microsoft Teams)",
    venue: "Online Global Broadcast",
    summary:
      "In-depth exploration of UNFCCC decision 4/CMP.20, the impending 31 December 2026 CDM registry deadline, and practical routes to document provenance and extend the utility of eligible legacy Certified Emission Reductions.",
    description:
      "This high-level webinar brought together global climate policy specialists and project developers to unpack the transition landscape for millions of un-cancelled CDM CERs. Topics covered included serial number provenance, cancellation confirmation requirements, private registry re-issuance, and buyer claims integrity.",
    topics: [
      "CDM Registry Closure (31 Dec 2026)",
      "Decision 4/CMP.20 & Article 6.4",
      "Private Registry Re-issuance",
      "Serial Provenance & Activity Trails",
      "Buyer Claims & Integrity Standards",
    ],
    speakers: [
      {
        name: "Dr. Ajay Mathur",
        role: "Professor of Practice",
        organization: "IIT Delhi",
      },
      {
        name: "Dr. Axel Michaelowa",
        role: "Senior Founding Partner",
        organization: "Perspectives Climate Group; UNMAI Global Strategic Advisory Board",
      },
      {
        name: "Yuvaraj Dinesh Babu Nithyanandam",
        role: "Founder & CEO",
        organization: "UNMAI Carbon Solutions",
      },
      {
        name: "Dhruv Kohli",
        role: "Carbon Finance",
        organization: "Viviid Green",
      },
    ],
    bannerImage: "/assets/webinar/webinar_poster.png",
    ctaPrimary: {
      label: "View Webinar Page",
      url: "/events/extending-legacy-cdm-cers-webinar",
      action: "link",
    },
    ctaSecondary: {
      label: "Download Presentation (PDF)",
      url: "/assets/webinar/LEGACY CERs FINAL WEBINAR 6 OCT 2026 V2.0.pdf",
      isDownload: true,
    },
  },
  {
    id: "evt-conil-partnership-briefing",
    title: "UNMAI & CONIL Partnership: Expanding Access to Legacy CDM Credits",
    tagline: "Connecting the UNMAI Legacy CER Registry with CONIL's Digital Transaction Platform",
    category: "Webinar",
    format: "Virtual",
    status: "past",
    featured: false,
    startDate: "2026-10-26",
    dateLabel: "October 26, 2026",
    timeLabel: "15:00 – 16:30 SGT (UTC+8)",
    location: "Virtual Briefing",
    venue: "Digital Platform Integration Launch",
    summary:
      "Technical briefing on the Registry Account and Platform Integration Agreement between UNMAI and Envex Technologies (CONIL), demonstrating API-driven credit listings, order settlement, and permanent retirement certificates.",
    description:
      "Representatives from UNMAI and Envex Technologies detailed how the registry integration allows eligible credit holders to onboard with CONIL, set transparent prices, and sell directly to institutional buyers seeking verified voluntary retirements.",
    topics: [
      "API Registry Integration",
      "CONIL Digital Storefronts",
      "Retirement Certificates",
      "Secondary Market Demarcation",
    ],
    speakers: [
      {
        name: "Yuvaraj Dinesh Babu Nithyanandam",
        role: "Founder & CEO",
        organization: "UNMAI Carbon Solutions",
      },
      {
        name: "Vishwajit",
        role: "Founder & CEO",
        organization: "CONIL / Envex Technologies",
      },
    ],
    bannerImage:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=80",
    ctaPrimary: {
      label: "Read Partnership News",
      url: "/news/pr-unmai-conil-partnership",
      action: "link",
    },
    ctaSecondary: {
      label: "Download Release PDF",
      url: "/UNMAI Carbon Singapore and CONIL Partner to Expand Access to Legacy CDM Carbon Credits.pdf",
      isDownload: true,
    },
  },
  {
    id: "evt-clean-energy-masterclass",
    title: "Clean Energy Decarbonization & Carbon Markets Masterclass",
    tagline: "Methodologies, Additionality & Article 6 Alignment for Project Developers",
    category: "Masterclass",
    format: "Virtual",
    status: "past",
    featured: false,
    startDate: "2026-09-15",
    dateLabel: "September 15, 2026",
    timeLabel: "10:00 – 13:00 SGT",
    location: "Virtual (Singapore / New Delhi)",
    venue: "Online Masterclass",
    summary:
      "Comprehensive training for renewable energy developers across Asia on assessing project eligibility, navigating Article 6.2 authorization criteria, and maintaining high integrity across voluntary and compliance standards.",
    description:
      "A hands-on masterclass addressing baseline methodology evolution, grid emission factor determination, and the transition of existing renewable assets into emerging Article 6 and domestic compliance market frameworks.",
    topics: [
      "Grid Emission Factors",
      "Additionality Assessment",
      "Article 6.2 Eligibility",
      "Digital MRV Readiness",
    ],
    speakers: [
      {
        name: "Yuvaraj Dinesh Babu Nithyanandam",
        role: "Founder & CEO",
        organization: "UNMAI Carbon Solutions",
      },
    ],
    bannerImage:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&auto=format&fit=crop&q=80",
    ctaPrimary: {
      label: "Explore Advisory Services",
      url: "/services",
      action: "link",
    },
  },
];

