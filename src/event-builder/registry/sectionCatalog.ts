import type { SectionType } from "../types/event";

export interface SectionCatalogItem {
  type: SectionType;
  name: string;
  category: "Basic" | "Event" | "Content" | "Conversion" | "Media";
  icon: string;
  description: string;
  defaultContent: () => any;
  defaultSettings: () => Record<string, any>;
}

export const SECTION_CATALOG: SectionCatalogItem[] = [
  {
    type: "hero",
    name: "Hero Banner",
    category: "Basic",
    icon: "LayoutTemplate",
    description: "Main attention-grabbing event banner with headline, CTA buttons, and background",
    defaultSettings: () => ({
      paddingY: "none",
      bgType: "gradient",
      animation: "fade-up",
    }),
    defaultContent: () => ({
      heading: "Global Article 6 & High-Integrity Carbon Markets Summit 2026",
      subtitle: "Operationalizing Paris Agreement Article 6.2, 6.4 & Sovereign Climate Finance",
      description: "Convening international climate negotiators, sovereign carbon registries, and carbon market actors in Singapore to establish high-integrity frameworks, digital MRV public goods, and Article 6 authorization mechanisms.",
      bgType: "gradient",
      gradientFrom: "#000000",
      gradientTo: "#121214",
      overlay: "dark",
      overlayStrength: 85,
      contentAlignment: "center",
      verticalPosition: "center",
      contentWidth: "medium",
      animation: "fade-up",
      badgeText: "SINGAPORE • NOVEMBER 18–20, 2026 • UNFCCC ARTICLE 6 ALIGNED",
      buttons: [
        {
          id: "btn_1",
          label: "Request Institutional Delegation",
          link: "#registration",
          style: "primary",
        },
        {
          id: "btn_2",
          label: "Explore Plenary Tracks",
          link: "#schedule",
          style: "outline",
        },
      ],
    }),
  },
  {
    type: "eventInfo",
    name: "Event Details Strip",
    category: "Event",
    icon: "CalendarDays",
    description: "Quick summary of dates, times, venue, and organizer details",
    defaultSettings: () => ({
      paddingY: "small",
      bgType: "muted",
    }),
    defaultContent: () => ({
      dateLabel: "November 18–20, 2026",
      timeLabel: "09:00 AM – 06:00 PM SGT (UTC+8)",
      locationLabel: "Marina Bay Sands Expo & Convention Centre, Singapore",
      venueName: "Sands Grand Ballroom & Telemetry Hall",
      organizerName: "UNMAI Carbon Solutions Pte. Ltd. (Singapore HQ)",
      badge: "In-Person Sovereign & Observer Delegation",
      calendarLink: true,
    }),
  },
  {
    type: "countdown",
    name: "Live Countdown & Chronometer",
    category: "Event",
    icon: "Clock",
    description: "Bespoke UNMAI Chronometer dial and countdown ticker to CDM registry deadline or event kickoff",
    defaultSettings: () => ({
      paddingY: "standard",
      bgType: "dark",
    }),
    defaultContent: () => ({
      title: "Your CERs Have a Deadline. Your Next Move Matters.",
      subtitle: "Under decision 4/CMP.20, transfers to the Article 6.4 mechanism registry and CDM transactions cease on 31 December 2026.",
      targetDate: "2026-12-31T23:59:59Z",
      showDays: true,
      showHours: true,
      showMinutes: true,
      showSeconds: true,
      expiredMessage: "The CDM Registry transition window has concluded.",
      ctaText: "Find Out What’s Next",
      ctaLink: "#registration",
    }),
  },
  {
    type: "about",
    name: "About Event & Mandate",
    category: "Content",
    icon: "FileText",
    description: "Comprehensive overview of the event theme, institutional profile, and impact",
    defaultSettings: () => ({
      paddingY: "standard",
      bgType: "default",
    }),
    defaultContent: () => ({
      badge: "INSTITUTIONAL PROFILE & MANDATE",
      heading: "Truth, Transparency, Traceability, and Integrity in Global Climate Action",
      richTextHtml: `
        <p class="mb-4">UNMAI Carbon Solutions Pte. Ltd. is a Singapore-headquartered global climate advisory and digital solutions firm engaged in unlocking high-integrity carbon markets across Asia, Africa, and globally.</p>
        <p class="mb-4">With the Clean Development Mechanism approaching permanent closure under decision 4/CMP.20 on 31 December 2026, this summit structures the orderly transition of legacy credits and scales high-integrity Article 6.2 bilateral cooperative approaches and Article 6.4 crediting mechanisms.</p>
      `,
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80",
      imageCaption: "Marina Bay Financial District, Singapore — Secretariat Hub.",
      layout: "text-image",
      stats: [
        { label: "Partner Governments", value: "14+" },
        { label: "Advisory Faculty", value: "35+" },
        { label: "Pipeline Climate Finance", value: "$400M+" },
        { label: "CDM Closure Target", value: "31 Dec 2026" },
      ],
    }),
  },
  {
    type: "highlights",
    name: "Core Strategic Pillars",
    category: "Content",
    icon: "Sparkles",
    description: "Standout pillars or core benefits formatted in UNMAI digital infrastructure style",
    defaultSettings: () => ({
      paddingY: "standard",
      bgType: "muted",
    }),
    defaultContent: () => ({
      badge: "CORE PILLARS",
      heading: "Three Strategic Pillars of High-Integrity Climate Action",
      subtitle: "Rooted in rigorous international climate negotiations and empirical carbon market architecture.",
      columns: 3,
      cards: [
        {
          id: "hl_1",
          icon: "Activity",
          title: "Net Zero & Climate Policy Advisory",
          description: "National NDC targets, Article 6 readiness assessments, baseline methodologies, and domestic carbon policy instruments.",
        },
        {
          id: "hl_2",
          icon: "Shield",
          title: "Climate Finance & Investment Strategy",
          description: "Structured finance, carbon-linked capital mobilization, sovereign de-risking instruments, and blended finance funds.",
        },
        {
          id: "hl_3",
          icon: "Layers",
          title: "Digital Carbon Infrastructure & dMRV",
          description: "National carbon registries, automated dMRV, interoperable tokenization, and transparent provenance tracking for Legacy CERs.",
        },
        {
          id: "hl_4",
          icon: "Globe",
          title: "Article 6.2 Cooperative Approaches",
          description: "Bilateral agreement frameworks, corresponding adjustments, ITMO transfers, and multi-sovereign safeguard mechanisms.",
        },
        {
          id: "hl_5",
          icon: "CheckCircle",
          title: "CDM to Article 6.4 Transition",
          description: "Navigating decision 4/CMP.20, CDM registry cancellation deadlines, and eligible re-issuance on private verifiable registries.",
        },
        {
          id: "hl_6",
          icon: "Award",
          title: "Global Strategic Advisory Board",
          description: "Guided by world-renowned experts including Dr. Axel Michaelowa, Dr. Ajay Mathur, Chintan Shah, and Yuvaraj Dinesh Babu.",
        },
      ],
    }),
  },
  {
    type: "speakers",
    name: "Strategic Advisors & Faculty",
    category: "Event",
    icon: "UsersRound",
    description: "Grid of featured advisory board members with photos, credentials, and bios",
    defaultSettings: () => ({
      paddingY: "large",
      bgType: "default",
    }),
    defaultContent: () => ({
      badge: "STRATEGIC ADVISORY BOARD",
      heading: "Global Leadership & Distinguished Faculty",
      subtitle: "Learn directly from internationally recognized pioneers across UNFCCC negotiations, carbon registries, and clean energy.",
      layout: "4-column",
      speakers: [
        {
          id: "spk_1",
          name: "Dr. Axel Michaelowa",
          designation: "Global Strategic Advisor & GSAB Member",
          organization: "Perspectives Climate Group & University of Zurich",
          photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
          bio: "Internationally recognised expert in climate policy and carbon markets with over 30 years experience. Senior Founding Partner of Perspectives Climate Group and lead author on IPCC Fourth and Fifth Assessment Reports.",
          featured: true,
          socialLinks: [{ platform: "linkedin", url: "https://linkedin.com" }],
        },
        {
          id: "spk_2",
          name: "Yuvaraj Dinesh Babu Nithyanandam",
          designation: "Founder & Chief Executive Officer",
          organization: "UNMAI Carbon Solutions Pte. Ltd.",
          photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
          bio: "Founding visionary driving UNMAI Carbon across Singapore, Asia, and Africa. Leading expert on Article 6 operationalization, carbon registries, and high-integrity climate finance mobilization.",
          featured: true,
          socialLinks: [{ platform: "linkedin", url: "https://linkedin.com" }],
        },
        {
          id: "spk_3",
          name: "Dr. Ajay Mathur",
          designation: "Global Strategic Advisor",
          organization: "IIT Delhi • Former DG International Solar Alliance",
          photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop&q=80",
          bio: "Professor of Practice at School of Public Policy, IIT Delhi. Former Director General of the International Solar Alliance (ISA), former Director General of Bureau of Energy Efficiency (BEE), and former Director General of TERI.",
          featured: true,
          socialLinks: [{ platform: "linkedin", url: "https://linkedin.com" }],
        },
        {
          id: "spk_4",
          name: "Chintan Shah",
          designation: "Global Strategic Advisor",
          organization: "Founder SustCred • Former Director IREDA Ltd.",
          photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
          bio: "Three decades of experience in renewable finance, corporate banking, and structured lending. Former Director (Technical) at IREDA and Group President at ReNew.",
          featured: false,
          socialLinks: [{ platform: "linkedin", url: "https://linkedin.com" }],
        },
      ],
    }),
  },
  {
    type: "schedule",
    name: "Program Schedule & Tracks",
    category: "Event",
    icon: "CalendarClock",
    description: "Detailed timeline of plenaries, ministerial dialogues, and bilateral deal rooms",
    defaultSettings: () => ({
      paddingY: "standard",
      bgType: "muted",
    }),
    defaultContent: () => ({
      badge: "SUMMIT TRACKS",
      heading: "Scientific & Policy Program",
      subtitle: "High-level ministerial roundtables, technical dMRV architecture sessions, and bilateral deal rooms.",
      layout: "tabs",
      days: [
        {
          id: "day_1",
          dayNumber: 1,
          dateLabel: "Day 1 — Wednesday, Nov 18",
          title: "Article 6.2 & Sovereign Authorizations",
          items: [
            {
              id: "ses_1_1",
              time: "09:00 AM - 10:30 AM",
              title: "Opening Plenary: High-Integrity Carbon Markets in the Post-COP30 Landscape",
              speaker: "Dr. Axel Michaelowa & Yuvaraj Dinesh Babu",
              description: "Strategic insights on Article 6 methodologies, environmental integrity safeguards, and international transfer accounting.",
              room: "Plenary Sands Theatre",
              category: "Keynote",
            },
            {
              id: "ses_1_2",
              time: "11:00 AM - 01:00 PM",
              title: "Bilateral Cooperative Approaches (Article 6.2) & Corresponding Adjustments",
              speaker: "Sovereign Negotiation Panel",
              description: "Case studies from host countries in Asia and Africa on authorized ITMO transfers and risk mitigation.",
              room: "Hall 1",
              category: "Bilateral",
            },
          ],
        },
        {
          id: "day_2",
          dayNumber: 2,
          dateLabel: "Day 2 — Thursday, Nov 19",
          title: "CDM Closure & Legacy CERs Transition",
          items: [
            {
              id: "ses_2_1",
              time: "09:30 AM - 11:30 AM",
              title: "UNFCCC Decision 4/CMP.20 & the UNMAI Legacy CERs Platform",
              speaker: "Yuvaraj Dinesh Babu & Dhruv Kohli (Viviid Green)",
              description: "Operational review of provenance tracking, voluntary cancellations, and verifiable private re-issuance.",
              room: "Plenary Sands Theatre",
              category: "Registry Track",
            },
            {
              id: "ses_2_2",
              time: "02:00 PM - 04:30 PM",
              title: "Clean Energy Transition Finance & Capital Mobilization",
              speaker: "Chintan Shah & Dr. Ajay Mathur",
              description: "Leveraging structured finance, green bonds, and blended private debt for utility-scale decarbonization.",
              room: "Hall 2",
              category: "Climate Finance",
            },
          ],
        },
      ],
    }),
  },
  {
    type: "venue",
    name: "Venue & Secretariat Location",
    category: "Event",
    icon: "MapPin",
    description: "Venue directions, interactive map link, accommodation, and travel tips",
    defaultSettings: () => ({
      paddingY: "standard",
      bgType: "default",
    }),
    defaultContent: () => ({
      badge: "HOST CITY",
      heading: "Summit Location & Secretariat",
      venueName: "Marina Bay Sands Expo & Convention Centre",
      address: "10 Bayfront Avenue, Singapore 018956",
      city: "Singapore",
      country: "Singapore",
      contactPhone: "+65 6688 8868",
      contactEmail: "summit@unmaicarbon.earth",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.819917894!2d103.858!3d1.283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMDAuMCJOIDEwM8KwNTEnMjkuMCJF!5e0!3m2!1sen!2ssg!4v1600000000000",
      travelNotes: "Direct transit from Singapore Changi Airport (SIN) via MRT Downtown Line (Bayfront Station CE1/DT16) or 20 minutes by taxi.",
      nearbyHotels: [
        "Marina Bay Sands Hotel",
        "The Ritz-Carlton, Millenia Singapore",
        "Pan Pacific Singapore",
      ],
    }),
  },
  {
    type: "registration",
    name: "Registration & Delegation Passes",
    category: "Conversion",
    icon: "Ticket",
    description: "Delegate pass tiers and institutional registration modals",
    defaultSettings: () => ({
      paddingY: "large",
      bgType: "dark",
    }),
    defaultContent: () => ({
      badge: "DELEGATION REGISTRATION",
      heading: "Request Institutional Delegation Access",
      description: "Summit participation is strictly curated for government representatives, carbon project developers, multilateral funds, and verified market operators.",
      ctaType: "modal-form",
      tiers: [
        {
          id: "tier_observer",
          name: "Observer Pass",
          price: "$0",
          description: "For academic researchers and civil society observers upon credential review.",
          features: [
            "All Public Scientific Plenary Sessions",
            "Digital Proceedings & Article 6 Working Papers",
            "Official Summit Participation Record",
          ],
          recommended: false,
          buttonText: "Request Observer Pass",
        },
        {
          id: "tier_institutional",
          name: "Institutional Delegate Pass",
          price: "$1,250",
          description: "For corporate buyers, registry operators, and sovereign carbon focal points.",
          features: [
            "Full 3-Day All-Access Badge",
            "Private Bilateral Room Booking Privileges",
            "Executive Ministerial Networking Luncheons",
            "Priority Briefing Papers by Perspectives Climate Group",
          ],
          recommended: true,
          buttonText: "Register Institutional Pass",
        },
        {
          id: "tier_council",
          name: "Strategic Council Roundtable",
          price: "$2,800",
          description: "Closed-door Chatham House roundtable with UNMAI Global Strategic Advisory Board.",
          features: [
            "All Institutional Delegate Inclusions",
            "Closed-Door GSAB Advisory Board Roundtable",
            "Direct 1-on-1 Consultation Session",
            "VIP Gala Dinner at Sands SkyPark",
          ],
          recommended: false,
          buttonText: "Register Council Pass",
        },
      ],
    }),
  },
  {
    type: "sponsors",
    name: "Institutional Partners & Multilaterals",
    category: "Event",
    icon: "Handshake",
    description: "Showcase sovereign partners, multilateral development banks, and institutional collaborators",
    defaultSettings: () => ({
      paddingY: "standard",
      bgType: "muted",
    }),
    defaultContent: () => ({
      badge: "COLLABORATING BODIES",
      heading: "Institutional Partners & Multilaterals",
      subtitle: "Advancing carbon market integrity alongside global policy institutions and development finance bodies.",
      tiers: [
        {
          tierName: "Strategic Partners",
          sponsors: [
            { id: "sp_1", name: "Perspectives Climate Group", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=300&q=80", tier: "Strategic" },
            { id: "sp_2", name: "Viviid Green Private Limited", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=300&q=80", tier: "Strategic" },
          ],
        },
        {
          tierName: "Knowledge Partners",
          sponsors: [
            { id: "sp_3", name: "The Energy and Resources Institute (TERI)", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=300&q=80", tier: "Knowledge" },
            { id: "sp_4", name: "SustCred Sustainable Finance", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=300&q=80", tier: "Knowledge" },
          ],
        },
      ],
    }),
  },
  {
    type: "gallery",
    name: "Photo Gallery",
    category: "Media",
    icon: "Images",
    description: "Visual photo showcase of past climate summits, bilateral roundtables, and signing ceremonies",
    defaultSettings: () => ({
      paddingY: "standard",
      bgType: "default",
    }),
    defaultContent: () => ({
      badge: "SUMMIT ARCHIVES",
      heading: "Moments of Global Climate Impact",
      subtitle: "A visual record of ministerial roundtables, bilateral signing ceremonies, and working sessions.",
      layout: "grid",
      images: [
        { id: "gal_1", url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80", caption: "Keynote Plenary Hall — Singapore" },
        { id: "gal_2", url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80", caption: "Marina Bay Financial Secretariat" },
        { id: "gal_3", url: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80", caption: "Article 6 Sovereign Dialogue Panel" },
        { id: "gal_4", url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80", caption: "Clean Energy Project Field Validation" },
      ],
    }),
  },
  {
    type: "testimonials",
    name: "Delegate Testimonials",
    category: "Content",
    icon: "Quote",
    description: "Quotes from sovereign negotiators, institutional investors, and advisory faculty",
    defaultSettings: () => ({
      paddingY: "standard",
      bgType: "muted",
    }),
    defaultContent: () => ({
      badge: "DELEGATE PERSPECTIVES",
      heading: "Voices of Climate Leadership",
      subtitle: "Observations from international negotiators and institutional investors.",
      items: [
        {
          id: "t_1",
          name: "Dr. Axel Michaelowa",
          role: "Global Strategic Advisor",
          organization: "Perspectives Climate Group",
          quote: "Well-designed rules, credible methodologies and transparent infrastructure are essential to the effective operation of carbon markets. UNMAI’s work on Article 6 readiness is setting a global benchmark.",
          photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
          rating: 5,
        },
        {
          id: "t_2",
          name: "Dhruv Kohli",
          role: "Executive Director",
          organization: "Viviid Green Private Limited",
          quote: "The CDM Registry is closing on 31st December, so we started thinking about extending the life of our CERs and preserving their value. UNMAI Carbon Legacy CER Platform is timely and innovative.",
          photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80",
          rating: 5,
        },
      ],
    }),
  },
  {
    type: "faq",
    name: "Frequently Asked Questions",
    category: "Content",
    icon: "HelpCircle",
    description: "Accordion-style answers to common delegate inquiries",
    defaultSettings: () => ({
      paddingY: "standard",
      bgType: "default",
    }),
    defaultContent: () => ({
      badge: "DELEGATE INQUIRIES",
      heading: "Frequently Asked Questions",
      subtitle: "Information regarding participation criteria, Article 6 alignment, and Singapore visa facilitation.",
      items: [
        {
          id: "faq_1",
          question: "What is the primary objective of the UNMAI Carbon Summit?",
          answer: "The summit bridges the gap between complex UNFCCC negotiation decisions (such as Article 6.2, Article 6.4, and decision 4/CMP.20) and real-world capital deployment, digital registries, and verifiable carbon credit transactions.",
        },
        {
          id: "faq_2",
          question: "How does the UNMAI Carbon Legacy CERs Platform operate?",
          answer: "The platform enables project owners to submit CDM documentation and request re-issuance of corresponding Legacy CERs after underlying units have been voluntarily cancelled in the UNFCCC CDM registry. It maintains a verifiable activity trail with serial ranges.",
        },
        {
          id: "faq_3",
          question: "Can international delegations request visa support letters?",
          answer: "Yes, our Singapore secretariat provides official institutional visa invitation letters within 48 hours of delegate credential approval.",
        },
      ],
    }),
  },
  {
    type: "video",
    name: "Video Showcase",
    category: "Media",
    icon: "PlaySquare",
    description: "Embed high-definition institutional presentations or event trailers",
    defaultSettings: () => ({
      paddingY: "standard",
      bgType: "muted",
    }),
    defaultContent: () => ({
      heading: "UNMAI Carbon Global Operations",
      subtitle: "Discover our institutional approach to unlocking high-integrity carbon markets.",
      videoType: "youtube",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      aspectRatio: "16:9",
    }),
  },
  {
    type: "richText",
    name: "Custom Rich Text & Policy Notes",
    category: "Content",
    icon: "AlignLeft",
    description: "Formatted policy notes, statements of intent, or technical guidelines",
    defaultSettings: () => ({
      paddingY: "standard",
      bgType: "default",
    }),
    defaultContent: () => ({
      heading: "Decision 4/CMP.20 Advisory Guidance",
      contentHtml: `
        <p>Under UNFCCC Decision 4/CMP.20, transfers to the Article 6.4 mechanism registry, cancellations, and other Clean Development Mechanism (CDM) transactions must cease by 31 December 2026.</p>
        <p>UNFCCC guidance explicitly advises account holders to submit cancellation requests by <strong>25 November 2026</strong> to allow operational processing before year-end closure.</p>
        <h3>Recommended Institutional Steps:</h3>
        <ul>
          <li>Audit current CDM registry balances and pending issuance requests</li>
          <li>Review voluntary cancellation protocols under UNMAI Legacy CERs rules</li>
          <li>Execute documentation onboarding prior to the 25 November deadline</li>
        </ul>
      `,
      alignment: "left",
      containerWidth: "standard",
    }),
  },
  {
    type: "contact",
    name: "Contact & Secretariat",
    category: "Basic",
    icon: "Mail",
    description: "Official organizing secretariat email, phone, and inquiry channels",
    defaultSettings: () => ({
      paddingY: "standard",
      bgType: "default",
    }),
    defaultContent: () => ({
      heading: "Secretariat & Delegate Desk",
      subtitle: "Our Singapore secretariat is available to assist sovereign focal points, delegates, and registry applicants.",
      email: "summit@unmaicarbon.earth",
      phone: "+65 6688 8868",
      address: "UNMAI Carbon Solutions Pte. Ltd., Singapore Headquarters",
      socials: [
        { platform: "linkedin", url: "https://linkedin.com" },
        { platform: "twitter", url: "https://twitter.com" },
      ],
    }),
  },
  {
    type: "table",
    name: "Details & Data Table",
    category: "Content",
    icon: "Table",
    description: "Key-value event specs, webinar logistics details block, or multi-column data table",
    defaultSettings: () => ({
      paddingY: "standard",
      bgType: "default",
    }),
    defaultContent: () => ({
      badge: "LOGISTICS & SPECIFICATIONS",
      heading: "Webinar Details",
      subtitle: "Key session information, timings, and platform access instructions",
      layoutStyle: "key-value",
      striped: true,
      bordered: true,
      footnote: "Online session conducted via Microsoft Teams",
      ctaText: "Join Meeting in Teams",
      ctaLink: "https://teams.microsoft.com",
      columns: [
        { id: "col_1", key: "field", label: "Parameter" },
        { id: "col_2", key: "value", label: "Specification" },
      ],
      rows: [
        { id: "row_1", label: "Date", value: "6 October 2026, Tuesday" },
        { id: "row_2", label: "Time", value: "4:00 - 5:00 PM (IST)" },
        { id: "row_3", label: "Mode", value: "Online - Microsoft Teams" },
        { id: "row_4", label: "Panel", value: "Dr Ajay Mathur, Dr Axel Michaelowa, Yuvaraj Dinesh Babu, Dhruv Kohli" },
        { id: "row_5", label: "Inquiries", value: "rimi.pathak@unmaicarbon.earth" },
      ],
    }),
  },
];
