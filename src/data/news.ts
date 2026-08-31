export type PressRelease = {
  id: string;
  title: string;
  dateLabel: string;
  /** ISO date used for ordering — `dateLabel` is display copy only. */
  publishedAt: string;
  pdfPath?: string;
  sourceUrl?: string;
  sourceName?: string;
  /** Mark shown beside the release in the press list. */
  icon?: "handshake" | "person" | "people" | "announcement";
  summary: string;
  content: string[];
};

const RELEASES: PressRelease[] = [
  {
    id: "teri-unmai-mou",
    title: "TERI Partners with UNMAI Carbon Solutions to Strengthen Carbon Markets and Climate Action",
    dateLabel: "April 2026",
    publishedAt: "2026-04-01",
    sourceUrl:
      "https://www.energetica-india.net/news/teri-partners-with-unmai-carbon-solutions-to-strengthen-carbon-markets-and-climate-action",
    sourceName: "Energetica India",
    icon: "handshake",
    summary:
      "The Energy and Resources Institute has signed an MoU with UNMAI Carbon Solutions to collaborate on climate change, decarbonisation, and carbon markets.",
    content: [
      "The Energy and Resources Institute (TERI) has signed a Memorandum of Understanding (MoU) with Singapore-based UNMAI Carbon Solutions Pte. Ltd. to collaborate on advancing climate action, decarbonisation strategies, and robust carbon market frameworks.",
      "The agreement was formalised by Dr. Vibha Dhawan, Director General of TERI, and Nithyanandam Yuvaraj Dinesh Babu, Founder and CEO of UNMAI Carbon Solutions.",
      "The partnership will focus on advancing high-integrity carbon markets, strengthening climate finance mechanisms, and developing digital solutions such as MRV systems and carbon market infrastructure to support credible net-zero pathways in India and globally.",
      "By combining TERI’s deep-rooted expertise in research, policy advisory, and sustainability with UNMAI’s global experience in carbon markets and digital innovation, the collaboration seeks to accelerate scalable, science-driven solutions for net-zero transitions in India and beyond.",
      "The initiative underscores a growing emphasis on credible carbon ecosystems, where data integrity, financial innovation, and policy alignment will play a decisive role in shaping future climate outcomes.",
    ],
  },
  {
    id: "pr-ajay-mathur",
    title: "UNMAI appoints Dr Ajay Mathur as Global Strategic Advisor",
    dateLabel: "May 2026",
    publishedAt: "2026-05-13",
    pdfPath: "/UNMAI PR Dr Ajay Mathur.pdf",
    icon: "person",
    summary:
      "UNMAI Carbon Solutions Pte Ltd announces Dr Ajay Mathur as its first Global Strategic Advisor to the Global Strategic Advisory Board.",
    content: [
      "Singapore, 13th May 2026 — UNMAI Carbon Solutions Pte. Ltd., a Singapore-headquartered global climate advisory and solutions firm, announced Dr. Ajay Mathur as its first Global Strategic Advisor to its Global Strategic Advisory Board.",
      "Dr. Mathur currently serves as Professor of Practice at the School of Public Policy, Indian Institute of Technology Delhi, and is globally recognized as one of India’s foremost leaders in clean energy, climate policy, and sustainable development. He previously served as Director General of the International Solar Alliance, where he advanced global cooperation on solar energy deployment, climate finance, and energy access across developing countries. Earlier, he led The Energy and Resources Institute (TERI), strengthening its global role in climate change research, energy transition, decarbonization, and sustainability policy advisory. Dr. Mathur also served as Director General of the Bureau of Energy Efficiency, Government of India, where he played a key role in shaping India’s landmark energy efficiency and market-based transition programs, including the Perform, Achieve and Trade (PAT) mechanism.",
      "His appointment marks an important step in strengthening UNMAI Carbon’s strategic leadership as the firm expands its work across high-integrity carbon markets, Article 6 readiness, climate finance, carbon market infrastructure, and digital infrastructure related to public good on dMRV and National Carbon Registry systems.",
      "“We are deeply privileged and excited to welcome Dr. Ajay Mathur to UNMAI Carbon Solutions, reflecting the caliber of globally respected leadership required to accelerate climate finance and strengthen high-integrity carbon markets,” said Yuvaraj Dinesh Babu Nithyanandam, Founder & CEO of UNMAI Carbon Solutions.",
      "“UNMAI Carbon’s strong emphasis on integrity, transparency, interoperability, and practical market architecture is closely aligned with the direction in which the global carbon markets ecosystem must evolve,” said Dr. Ajay Mathur. “I am pleased to join UNMAI Carbon as a Global Strategic Advisor and look forward to contribute towards advancing credible carbon market frameworks, strengthening climate finance ecosystems, and enhancing institutional readiness for impactful decarbonization and inclusive net zero transitions.”",
      "About UNMAI Carbon Solutions: UNMAI Carbon Solutions Pte. Ltd. is aligned across three core pillars: net zero transition and climate policy advisory, climate finance and investment strategy, and carbon market infrastructure and governance. UNMAI supports governments, bilateral and multilateral development institutions and banks, and carbon market stakeholders across Asia, Africa, the Middle East, and other regions on operationalization of domestic carbon mechanisms and Paris Agreement – Article 6, decarbonization advisory, climate finance, carbon advisory & trading solutions, and digital innovation.",
      "Media contact: Yuvaraj Dinesh Babu Nithyanandam, Founder & CEO, UNMAI Carbon Solutions Pte. Ltd. Email: ydb@unmaicarbon.earth.",
    ],
  },
  {
    id: "pr-chintan-shah",
    title: "UNMAI appoints Chintan Shah to Global Strategic Advisory Board",
    dateLabel: "May 2026",
    publishedAt: "2026-05-19",
    pdfPath: "/UNMAI PR Chintan Shah Final.pdf",
    icon: "people",
    summary:
      "UNMAI Carbon Solutions Pte Ltd announces the appointment of Chintan Shah to its Global Strategic Advisory Board.",
    content: [
      "Singapore, 19th May 2026 — UNMAI Carbon Solutions Pte. Ltd., a Singapore-headquartered global climate advisory and solutions firm, announced Chintan Shah as Global Strategic Advisor to its Global Strategic Advisory Board to enhance the firm’s capabilities in climate finance, investment strategy, structured finance, and carbon market-linked capital mobilization.",
      "Chintan Shah is the Founder of SustCred, a firm focused on sustainable investment in the renewable energy sector. Until recently he served as Group President of Strategic Business Development and Policy Affairs at ReNew. Earlier, he served as Director (Technical) at the Indian Renewable Energy Development Agency (IREDA) Ltd., where he was instrumental in project financing and policy planning. He also held leadership roles as President of Strategic Business Development and Corporate Affairs at Suzlon Energy Limited and worked with The Energy and Resources Institute (TERI).",
      "He brings three decades of experience across strategic business development, policy and regulatory affairs, project execution, structured lending, corporate finance, and investment advisory, with exposure spanning private credit, financial markets, and institutional financial solutions in clean energy.",
      "“We are delighted to welcome Chintan Shah at a time when climate finance and carbon markets are increasingly converging with mainstream capital markets,” said Yuvaraj Dinesh Babu Nithyanandam, Founder & CEO of UNMAI Carbon Solutions. “His expertise in financing structures, institutional banking, investment strategy, and financial ecosystems will significantly strengthen UNMAI Carbon’s ability to support scalable climate finance solutions and high-integrity carbon market development.”",
      "“UNMAI Carbon’s focus on trusted carbon market systems, climate finance innovation, and digital infrastructure presents a strong platform for enabling meaningful impact in the global transition toward net zero,” said Chintan Shah. “I look forward to guiding UNMAI Carbon contributing toward strengthening investment pathways, financing ecosystems, and institutional confidence required for scaling credible climate and carbon market initiatives globally.”",
      "About UNMAI Carbon Solutions: UNMAI Carbon Solutions Pte. Ltd. is aligned across three core pillars: net zero transition and climate policy advisory, climate finance and investment strategy, and carbon market infrastructure and governance. UNMAI supports governments, bilateral and multilateral development institutions and banks, and carbon market stakeholders across Asia, Africa, the Middle East, and other regions on operationalization of domestic carbon mechanisms and Paris Agreement – Article 6, decarbonization advisory, climate finance, carbon advisory & trading solutions, and digital innovation.",
      "Media contact: Yuvaraj Dinesh Babu Nithyanandam, Founder & CEO, UNMAI Carbon Solutions Pte. Ltd. Email: ydb@unmaicarbon.earth.",
    ],
  },
];

/** Newest first — every press-release list on the site renders this order. */
export const PRESS_RELEASES: PressRelease[] = [...RELEASES].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);

