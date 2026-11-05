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
    id: "pr-unmai-conil-partnership",
    title:
      "UNMAI Carbon Solutions Announces Integration of its Legacy CER Registry with CONIL’s Digital Transaction Platform",
    dateLabel: "October 2026",
    publishedAt: "2026-10-26",
    pdfPath:
      "/UNMAI Carbon Singapore and CONIL Partner to Expand Access to Legacy CDM Carbon Credits.pdf",
    icon: "handshake",
    summary:
      "UNMAI Carbon Solutions and Envex Technologies Ltd, operator of CONIL, enter into a Registry Account and Platform Integration Agreement to connect the UNMAI Legacy CER Registry with CONIL’s digital transaction platform.",
    content: [
      "Singapore, 26 October 2026 — UNMAI Carbon Solutions Pte Ltd and Envex Technologies Ltd, operator of CONIL, have entered into a Registry Account and Platform Integration Agreement to connect the UNMAI Legacy CER Registry with CONIL’s digital transaction platform.",
      "The integration is designed to provide holders of eligible Legacy Certified Emission Reductions (Legacy CERs) with an additional route to market, enabling them to list Legacy CERs on CONIL for purchase and retirement by buyers.",
      "Under the agreement, UNMAI will continue to operate the registry of record, issuing, recording, transferring and retiring Legacy CERs while maintaining the public register and issuing retirement certificates. CONIL will facilitate the transaction process, including credit listings, orders, payments and settlement between sellers and buyers.",
      "The integration will connect the two platforms through an application programming interface (API), enabling relevant project and credit information to be accessed for listings and allowing retirement instructions to be processed and reconciled against UNMAI Registry records.",
      "The collaboration comes as the UNFCCC CDM Registry approaches its scheduled closure on 31 December 2026, making it increasingly important for holders to understand the available pathways for managing their legacy credits.",
      "“Legacy CERs represent an important part of the history of international carbon markets. Our work at UNMAI is focused on creating a structured pathway for these credits to retain utility beyond the transition of the CDM Registry. Integrating with CONIL adds a transaction route for eligible Legacy CERs while preserving the registry records and provenance that underpin their traceability,” said Yuvaraj Dinesh Babu Nithyanandam, Founder & CEO of UNMAI Carbon Solutions.",
      "“Connecting CONIL with the UNMAI Legacy CER Registry is an important step towards making eligible Legacy CERs more accessible to buyers. By bringing registry-linked credit information into the transaction process, we aim to support transparent listings, streamlined transactions and clearly documented retirements, helping market participants navigate the evolving carbon market landscape,” said Vishwajit, Founder & CEO of CONIL/Envex.",
      "Under this agreement, sellers holding Legacy CERs in the UNMAI Registry can onboard directly with Envex, complete the required checks and list eligible Legacy CERs on CONIL. Sellers will set their own prices, and purchases through CONIL will be made for retirement rather than secondary trading.",
      "Each retirement will be executed through the UNMAI Registry and recorded against the relevant credit identifiers. UNMAI will issue a retirement certificate identifying the Legacy CER serial numbers, original CDM serial numbers, beneficiary and retirement purpose, supporting traceability and clear retirement records.",
      "The integration is subject to the parties’ technical implementation, testing and production go-live process. Importantly, Legacy CERs are not eligible for any compliance scheme unless the compliance scheme administrators issue official recognition of such assets.",
      "Project owners, buyers and custodians can learn more at https://legacycers.earth and https://conil.eco/ .",
      "About UNMAI Carbon Solutions: UNMAI Carbon Solutions Pte. Ltd. is a Singapore-headquartered global climate advisory and solutions firm engaged in unlocking high-integrity carbon markets. The firm is aligned across three core pillars: net zero transition and climate policy advisory, climate finance and investment strategy, and digital carbon market infrastructure and governance. UNMAI Carbon Solutions supports governments, Bilateral & Multilateral Development Institutions and Banks, and carbon market stakeholders across Asia, Africa, the Middle East, and other regions on operationalization of domestic carbon mechanisms and Paris Agreement - Article 6, decarbonization advisory, climate finance, carbon advisory & trading solutions, and digital innovation.",
      "UNMAI’s operating philosophy is rooted in Truth, Transparency, Traceability, and Integrity, reflecting its commitment to credible decarbonization, robust market systems, and trusted climate action.",
      "About CONIL: CONIL is a digital carbon credit platform developed by Envex Technologies, based in Abu Dhabi, UAE. It gives businesses single-account access to buy and retire verified carbon credits from leading registries such as Verra, Gold Standard, Isometric, EcoRegistry and the Northern Trust carbon ecosystem. Buyers complete a single KYC process, review full project documentation, and receive a retirement certificate for every purchase. Project developers and credit holders can list their inventory through dedicated storefronts and reach buyers worldwide. Learn more at www.conil.eco .",
      "Media Contact: Rimi Pathak, Carbon Markets and Communications Specialist, UNMAI Carbon Solutions Pte. Ltd. Email: rimi.pathak@unmaicarbon.earth, Website: www.unmaicarbon.earth",
      "Media Contact (CONIL): Marcin Nguyen, Regional Head, Envex Technologies. Email: marcin.nguyen@envex.co",
    ],
  },
  {
    id: "pr-legacy-cers-platform",
    title:
      "UNMAI Carbon Singapore launches Legacy CERs Platform to extend the utility of UNFCCC CDM Certified Emission Reductions",
    dateLabel: "September 2026",
    publishedAt: "2026-09-28",
    pdfPath: "/UNMAI Legacy CERs Platform Launch Press Release.pdf",
    icon: "announcement",
    summary:
      "UNMAI Carbon Solutions launches its Legacy CERs Platform to document provenance and enable the re-issuance, transfer, and retirement of eligible legacy Certified Emission Reductions originally issued under the UNFCCC CDM.",
    content: [
      "Singapore, 28 September 2026 — UNMAI Carbon Solutions Pte. Ltd. today announced the launch of its Legacy CERs Platform, a registry designed to document the provenance and subsequent re-issuance, transfer and retirement of eligible legacy Certified Emission Reductions (CERs) originally issued under the UNFCCC Clean Development Mechanism (CDM). The first batch of legacy CERs were issued from an Indian Grid Connected Wind Power Project managed by Viviid Green Private Limited, India.",
      "The launch comes as CDM registry transactions approach their final deadline. Under decision 4/CMP.20, transfers to the Article 6.4 mechanism registry, cancellations and other CDM registry transactions must cease by 31 December 2026. The registry will complete residual administrative operations after the cancellation of certain unpaid CERs in pending accounts on 1 July 2027. UNFCCC guidance advises account holders to submit cancellation requests by 25 November 2026 to allow processing before year end.",
      "The UNMAI Carbon Legacy CERs Platform enables project owners and authorised custodians to register organisations and projects, submit CDM project and issuance documentation, and request re-issuance of corresponding Legacy CERs after the underlying CERs have been voluntarily cancelled in the CDM registry and the evidence has been reviewed. Legacy CERs Platform administrator approves project documents, issuance requests and subsequent transfers or retirements. The platform maintains an activity trail, tracks available balances and serial ranges, and provides downloadable transfer and retirement certificates.",
      "“The CDM represents years of verified mitigation activity and investment. Our immediate priority is to give holders a clear, documented route to preserve the provenance of eligible CERs and manage their subsequent voluntary use,” said Yuvaraj Dinesh Babu, Founder and CEO of UNMAI Carbon Solutions. “Each applicant must establish its authority over the credits and provide the underlying CDM records before issuance on our platform. The participation fees are linked to transaction except a small project onboarding fee,” he added.",
      "“The CDM Registry is closing on 31st December, so naturally, we started thinking about extending the life of our CERs and how we could preserve their value. We found UNMAI Carbon Legacy CER Platform very timely and innovative,” said Dhruv Kohli, Viviid Green Private Limited. “We are happy to be its first member to have issued the first batch of Legacy CERs from our wind power projects portfolio. We look forward to this collaboration and wish UNMAI Carbon’s Legacy CERs Platform the very best,” he added.",
      "UNMAI Carbon plans to develop an optional project integrity ranking to help users distinguish between credits with different characteristics. It is also working on potential tokenisation and marketplace integration as separate future phases. A Legacy CER issued on the platform is a distinct, privately issued unit supported by evidence of the original CDM CER and its cancellation; it is not a UNFCCC issued CER or an Article 6 authorised unit. Any claim based on a retired unit remains subject to the buyer’s applicable accounting and claims rules.",
      "Project owners and custodians can learn more at https://legacycers.unmaicarbon.earth. Account opening and issuance are subject to UNMAI Carbon Legacy CERs Platform’s eligibility review, documentation requirements and applicable fees.",
      "About UNMAI Carbon Solutions: UNMAI Carbon Solutions Pte. Ltd. is a Singapore-headquartered global climate advisory and solutions firm engaged in unlocking high-integrity carbon markets. The firm is aligned across three core pillars: net zero transition and climate policy advisory, climate finance and investment strategy, and digital carbon market infrastructure and governance. UNMAI Carbon Solutions supports governments, Bilateral & Multilateral Development Institutions and Banks, and carbon market stakeholders across Asia, Africa, the Middle East, and other regions on operationalization of domestic carbon mechanisms and Paris Agreement - Article 6, decarbonization advisory, climate finance, carbon advisory & trading solutions, and digital innovation.",
      "UNMAI’s operating philosophy is rooted in Truth, Transparency, Traceability, and Integrity, reflecting its commitment to credible decarbonization, robust market systems, and trusted climate action.",
      "Media Contact: Rimi Pathak, Communication Manager, UNMAI Carbon Solutions Pte. Ltd. Email: rimi.pathak@unmaicarbon.earth, Website: www.unmaicarbon.earth",
    ],
  },
  {
    id: "pr-axel-michaelowa",
    title: "Dr Axel Michaelowa joins UNMAI Carbon Solutions Singapore as Global Strategic Advisor",
    dateLabel: "September 2026",
    publishedAt: "2026-09-21",
    pdfPath: "/UNMAI GSAB Dr Axel Press Release.pdf",
    icon: "person",
    summary:
      "UNMAI Carbon Solutions Pte. Ltd. announces the appointment of Dr Axel Michaelowa as a Global Strategic Advisor and member of its Global Strategic Advisory Board.",
    content: [
      "Singapore, 21 September 2026 — UNMAI Carbon Solutions Pte. Ltd., a Singapore-headquartered climate advisory and solutions firm, announced the appointment of Dr Axel Michaelowa as a Global Strategic Advisor and member of its Global Strategic Advisory Board.",
      "Dr Michaelowa is an internationally recognised expert in climate policy and carbon markets, with more than three decades of experience working on international climate policy instruments and the UNFCCC process. He is a Senior Founding Partner of Perspectives Climate Group and Research Director at Perspectives Climate Research, and leads research on international climate policy at the University of Zurich. His work spans the design of carbon markets, domestic climate policy instruments, climate finance and the evolution of crediting mechanisms under the Kyoto Protocol and Paris Agreement. He has advised governments, international organisations and private institutions, and contributed to the Fourth and Fifth Assessment Reports of the Intergovernmental Panel on Climate Change.",
      "His appointment strengthens UNMAI Carbon’s work on high-integrity carbon markets, Article 6 readiness, climate finance, carbon market infrastructure and digital public goods for monitoring, reporting and verification and national carbon registries. Dr Michaelowa will provide strategic insight on Article 6 methodologies, market integrity, authorisation and safeguards.",
      "“Dr Michaelowa brings a rare combination of rigorous research and practical experience in international climate negotiations and carbon market implementation,” said Yuvaraj Dinesh Babu Nithyanandam, Founder & CEO of UNMAI Carbon Solutions. “His guidance will be valuable as we support governments and market participants in building credible frameworks that can mobilise climate finance at scale.”",
      "“I am pleased to join UNMAI Carbon’s Global Strategic Advisory Board,” said Dr Michaelowa. “Well-designed rules, credible methodologies and transparent infrastructure are essential to the effective operation of carbon markets. I look forward to supporting UNMAI’s work on Article 6 readiness and high-integrity market development.”",
      "About UNMAI Carbon Solutions: UNMAI Carbon Solutions Pte. Ltd. is a Singapore-headquartered global climate advisory and solutions firm engaged in unlocking high-integrity carbon markets. The firm is aligned across three core pillars: net zero transition and climate policy advisory, climate finance and investment strategy, and digital carbon market infrastructure and governance. UNMAI Carbon Solutions supports governments, Bilateral & Multilateral Development Institutions and Banks, and carbon market stakeholders across Asia, Africa, the Middle East, and other regions on operationalization of domestic carbon mechanisms and Paris Agreement - Article 6, decarbonization advisory, climate finance, carbon advisory & trading solutions, and digital innovation.",
      "UNMAI’s operating philosophy is rooted in Truth, Transparency, Traceability, and Integrity, reflecting its commitment to credible decarbonization, robust market systems, and trusted climate action.",
      "Media Contact: Rimi Pathak, Communication Manager, UNMAI Carbon Solutions Pte. Ltd. Email: rimi.pathak@unmaicarbon.earth, Website: www.unmaicarbon.earth",
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
];

/** Newest first — every press-release list on the site renders this order. */
export const PRESS_RELEASES: PressRelease[] = [...RELEASES].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);

