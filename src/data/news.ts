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
    "id": "pr-nambi-school-of-climate",
    "title": "UNMAI Carbon Solutions Launches NAMB\u012a and School of Climate, Two Digital Public Goods, at COP31",
    "dateLabel": "November 2026",
    "publishedAt": "2026-11-18",
    "pdfPath": "/UNMAI Carbon Solutions Launches NAMBI and School of Climate.pdf",
    "icon": "announcement",
    "summary": "UNMAI Carbon Solutions Pte Ltd has launched two Digital Public Goods at COP31 T\u00fcrkiye: NAMB\u012a, a unified digital Measurement, Reporting and Verification (dMRV) data platform for high-integrity carbon markets, and School of Climate, a global learning platform for climate action launched jointly with Carbon Market Network.",
    "content": [
      "Antalya, T\u00fcrkiye, Wednesday, 18 November 2026 \u2014 UNMAI Carbon Solutions Pte Ltd has launched two Digital Public Goods at COP31 T\u00fcrkiye: NAMB\u012a (Navigating Market Based Instruments), a unified digital Measurement, Reporting and Verification (dMRV) data platform for high-integrity carbon markets, and School of Climate, a global learning platform for climate action launched jointly with Carbon Market Network. Both were unveiled at the WGEO Pavilion at 11 AM (TRT).",
      "The two platforms respond to what credible carbon markets depend on: data that can be trusted and people equipped to use it. NAMB\u012a brings carbon project data into a single, comparable framework so that climate finance can scale with confidence. School of Climate opens free, practical climate and carbon market learning to anyone who wants to understand, participate in and contribute to climate action.",
      "NAMB\u012a: Navigating Market Based Instruments",
      "The NAMB\u012a Earth Portal unifies the global dMRV ecosystem through an interoperable carbon data framework, under the promise \u201cTrusted Data. Informed Investment. Global Impact.\u201d The name comes from the Tamil word nambikkai, meaning trust, faith and reliability. NAMB\u012a\u2019s vision is a high-integrity, inclusive, Paris-aligned carbon market with harmonised data flows, and its mission is to aggregate, standardise and democratise dMRV solutions, embedding Trust, Transparency, Traceability and Integrity (3TI).",
      "NAMB\u012a delivers four core functions. As a one-stop interoperable platform, it brings several core services together in one place. It aggregates and harmonises published dMRV data from multiple sources and standards into a central repository, so that carbon projects can be compared across registries and methodologies. Its discovery and matchmaking services help project developers find and engage dMRV providers, while its analytics and decision support tools draw on published dMRV data, including real-time monitoring data. Secure payment gateways are planned over time.",
      "The platform is built on a five-layer open architecture that will incorporate systems such as the Climate Action Data Trust (CAD Trust), Forest Stack and the BeckN protocol. API-driven integration, schema mapping and dMRV-as-a-Service enables bridging voluntary and compliance markets, underpinned by a common dMRV data protocol, standard formats, decentralised identifiers and open APIs, and supported by national engagements, capacity building, pilots and policy support.",
      "The portal also hosts a Carbon Methodology Repository of 252 methodologies as of 17 November 2026 (104 from Verra VCS, 63 from the Global Carbon Council (GCC 2.0), 44 from Gold Standard, 23 from Isometric and 18 from Cercarbono), a dMRV Market Platform of verified applications and a Projects Dashboard, with a sandbox, documentation and training open to the public. Next step is to enhance the repository with all VCM standards\u2019 methodologies (600 methodologies from 60 standards).",
      "School of Climate",
      "School of Climate is a global learning platform for climate action, an initiative of Carbon Market Network and UNMAI Carbon Solutions. Access to practical, career-oriented climate learning remains limited across many regions, so its mission is to democratize climate education through accessible resources, practical knowledge and industry connections, while simplifying complex concepts, developing industry-relevant skills and encouraging climate entrepreneurship.",
      "Its learning ecosystem combines free learning resources, toolkits and research reports, structured courses, career and opportunity awareness, and industry insights. Learners can choose from more than 200 vetted free courses across carbon and net zero, climate fundamentals, climate policy and finance, and adaptation and resilience, follow learning paths such as Carbon Markets & Trading Specialist, and store their credentials in a Certificate Vault and build a shareable practitioner profile. More than 1,200 climate practitioners across over 60 countries have already enrolled on the platform. To stay sustainable, free introductory learning is complemented by premium courses and certifications, corporate training, digital learning products, and partnerships and sponsorships.",
      "Yuvaraj Dinesh Babu Nithyanandam, Founder & CEO of UNMAI Carbon Solutions, said: \u201cThe future of climate action depends on two things: climate-literate people and trusted climate data. NAMB\u012a aims to make digital MRV solutions more accessible by bringing them together, standardising them and democratising their use. School of Climate complements this by making climate knowledge accessible to all. Real climate action begins with knowledge. School of Climate is our effort to open up climate learning to everyone, whatever their background, and widen the circle of people shaping solutions. I see it as an investment in a generation that understands what lies ahead and has the confidence to act on it.\u201d",
      "Girish Gilda, Founder of Carbon Market Network, said: \"I believe meaningful climate action starts with understanding. With School of Climate, we hope to make climate education more accessible and bring more people into the conversation. For me, this is a step towards building a generation that understands the challenges ahead and feels equipped to be part of the change.\"",
      "Project developers, market participants, learners and institutions can learn more at https://www.nambi.earth and https://www.schoolofclimate.com .",
      "About UNMAI Carbon Solutions: UNMAI Carbon Solutions Pte. Ltd. is a Singapore-headquartered global climate advisory and solutions firm engaged in unlocking high-integrity carbon markets. The firm is aligned across three core pillars: net zero transition and climate policy advisory, climate finance and investment strategy, and digital carbon market infrastructure and governance. UNMAI Carbon Solutions supports governments, Bilateral & Multilateral Development Institutions and Banks, and carbon market stakeholders across Asia, Africa, the Middle East, and other regions on operationalization of domestic carbon mechanisms and Paris Agreement - Article 6, decarbonization advisory, climate finance, carbon advisory & trading solutions, and digital innovation.",
      "UNMAI\u2019s operating philosophy is rooted in Truth, Transparency, Traceability, and Integrity, reflecting its commitment to credible decarbonization, robust market systems, and trusted climate action.",
      "Media Contact: Rimi Pathak, Carbon Markets and Communications Specialist, UNMAI Carbon Solutions Pte. Ltd. Email: rimi.pathak@unmaicarbon.earth, Website: www.unmaicarbon.earth"
    ]
  },
  {
    "id": "pr-unmai-conil-partnership",
    "title": "UNMAI Carbon Solutions Announces Integration of its Legacy CER Registry with CONIL\u2019s Digital Transaction Platform",
    "dateLabel": "October 2026",
    "publishedAt": "2026-10-26",
    "pdfPath": "/UNMAI Carbon Singapore and CONIL Partner to Expand Access to Legacy CDM Carbon Credits.pdf",
    "icon": "handshake",
    "summary": "UNMAI Carbon Solutions and Envex Technologies Ltd, operator of CONIL, enter into a Registry Account and Platform Integration Agreement to connect the UNMAI Legacy CER Registry with CONIL\u2019s digital transaction platform.",
    "content": [
      "Singapore, 26 October 2026 \u2014 UNMAI Carbon Solutions Pte Ltd and Envex Technologies Ltd, operator of CONIL, have entered into a Registry Account and Platform Integration Agreement to connect the UNMAI Legacy CER Registry with CONIL\u2019s digital transaction platform.",
      "The integration is designed to provide holders of eligible Legacy Certified Emission Reductions (Legacy CERs) with an additional route to market, enabling them to list Legacy CERs on CONIL for purchase and retirement by buyers.",
      "Under the agreement, UNMAI will continue to operate the registry of record, issuing, recording, transferring and retiring Legacy CERs while maintaining the public register and issuing retirement certificates. CONIL will facilitate the transaction process, including credit listings, orders, payments and settlement between sellers and buyers.",
      "The integration will connect the two platforms through an application programming interface (API), enabling relevant project and credit information to be accessed for listings and allowing retirement instructions to be processed and reconciled against UNMAI Registry records.",
      "The collaboration comes as the UNFCCC CDM Registry approaches its scheduled closure on 31 December 2026, making it increasingly important for holders to understand the available pathways for managing their legacy credits.",
      "\u201cLegacy CERs represent an important part of the history of international carbon markets. Our work at UNMAI is focused on creating a structured pathway for these credits to retain utility beyond the transition of the CDM Registry. Integrating with CONIL adds a transaction route for eligible Legacy CERs while preserving the registry records and provenance that underpin their traceability,\u201d said Yuvaraj Dinesh Babu Nithyanandam, Founder & CEO of UNMAI Carbon Solutions.",
      "\u201cConnecting CONIL with the UNMAI Legacy CER Registry is an important step towards making eligible Legacy CERs more accessible to buyers. By bringing registry-linked credit information into the transaction process, we aim to support transparent listings, streamlined transactions and clearly documented retirements, helping market participants navigate the evolving carbon market landscape,\u201d said Vishwajit, Founder & CEO of CONIL/Envex.",
      "Under this agreement, sellers holding Legacy CERs in the UNMAI Registry can onboard directly with Envex, complete the required checks and list eligible Legacy CERs on CONIL. Sellers will set their own prices, and purchases through CONIL will be made for retirement rather than secondary trading.",
      "Each retirement will be executed through the UNMAI Registry and recorded against the relevant credit identifiers. UNMAI will issue a retirement certificate identifying the Legacy CER serial numbers, original CDM serial numbers, beneficiary and retirement purpose, supporting traceability and clear retirement records.",
      "The integration is subject to the parties\u2019 technical implementation, testing and production go-live process. Importantly, Legacy CERs are not eligible for any compliance scheme unless the compliance scheme administrators issue official recognition of such assets.",
      "Project owners, buyers and custodians can learn more at https://legacycers.earth and https://conil.eco/ .",
      "About UNMAI Carbon Solutions: UNMAI Carbon Solutions Pte. Ltd. is a Singapore-headquartered global climate advisory and solutions firm engaged in unlocking high-integrity carbon markets. The firm is aligned across three core pillars: net zero transition and climate policy advisory, climate finance and investment strategy, and digital carbon market infrastructure and governance. UNMAI Carbon Solutions supports governments, Bilateral & Multilateral Development Institutions and Banks, and carbon market stakeholders across Asia, Africa, the Middle East, and other regions on operationalization of domestic carbon mechanisms and Paris Agreement - Article 6, decarbonization advisory, climate finance, carbon advisory & trading solutions, and digital innovation.",
      "UNMAI\u2019s operating philosophy is rooted in Truth, Transparency, Traceability, and Integrity, reflecting its commitment to credible decarbonization, robust market systems, and trusted climate action.",
      "About CONIL: CONIL is a digital carbon credit platform developed by Envex Technologies, based in Abu Dhabi, UAE. It gives businesses single-account access to buy and retire verified carbon credits from leading registries such as Verra, Gold Standard, Isometric, EcoRegistry and the Northern Trust carbon ecosystem. Buyers complete a single KYC process, review full project documentation, and receive a retirement certificate for every purchase. Project developers and credit holders can list their inventory through dedicated storefronts and reach buyers worldwide. Learn more at www.conil.eco .",
      "Media Contact: Rimi Pathak, Carbon Markets and Communications Specialist, UNMAI Carbon Solutions Pte. Ltd. Email: rimi.pathak@unmaicarbon.earth, Website: www.unmaicarbon.earth",
      "Media Contact (CONIL): Marcin Nguyen, Regional Head, Envex Technologies. Email: marcin.nguyen@envex.co"
    ]
  },
  {
    "id": "pr-legacy-cers-platform",
    "title": "UNMAI Carbon Singapore launches Legacy CERs Platform to extend the utility of UNFCCC CDM Certified Emission Reductions",
    "dateLabel": "September 2026",
    "publishedAt": "2026-09-28",
    "pdfPath": "/UNMAI Legacy CERs Platform Launch Press Release.pdf",
    "icon": "announcement",
    "summary": "UNMAI Carbon Solutions launches its Legacy CERs Platform to document provenance and enable the re-issuance, transfer, and retirement of eligible legacy Certified Emission Reductions originally issued under the UNFCCC CDM.",
    "content": [
      "Singapore, 28 September 2026 \u2014 UNMAI Carbon Solutions Pte. Ltd. today announced the launch of its Legacy CERs Platform, a registry designed to document the provenance and subsequent re-issuance, transfer and retirement of eligible legacy Certified Emission Reductions (CERs) originally issued under the UNFCCC Clean Development Mechanism (CDM). The first batch of legacy CERs were issued from an Indian Grid Connected Wind Power Project managed by Viviid Green Private Limited, India.",
      "The launch comes as CDM registry transactions approach their final deadline. Under decision 4/CMP.20, transfers to the Article 6.4 mechanism registry, cancellations and other CDM registry transactions must cease by 31 December 2026. The registry will complete residual administrative operations after the cancellation of certain unpaid CERs in pending accounts on 1 July 2027. UNFCCC guidance advises account holders to submit cancellation requests by 25 November 2026 to allow processing before year end.",
      "The UNMAI Carbon Legacy CERs Platform enables project owners and authorised custodians to register organisations and projects, submit CDM project and issuance documentation, and request re-issuance of corresponding Legacy CERs after the underlying CERs have been voluntarily cancelled in the CDM registry and the evidence has been reviewed. Legacy CERs Platform administrator approves project documents, issuance requests and subsequent transfers or retirements. The platform maintains an activity trail, tracks available balances and serial ranges, and provides downloadable transfer and retirement certificates.",
      "\u201cThe CDM represents years of verified mitigation activity and investment. Our immediate priority is to give holders a clear, documented route to preserve the provenance of eligible CERs and manage their subsequent voluntary use,\u201d said Yuvaraj Dinesh Babu, Founder and CEO of UNMAI Carbon Solutions. \u201cEach applicant must establish its authority over the credits and provide the underlying CDM records before issuance on our platform. The participation fees are linked to transaction except a small project onboarding fee,\u201d he added.",
      "\u201cThe CDM Registry is closing on 31st December, so naturally, we started thinking about extending the life of our CERs and how we could preserve their value. We found UNMAI Carbon Legacy CER Platform very timely and innovative,\u201d said Dhruv Kohli, Viviid Green Private Limited. \u201cWe are happy to be its first member to have issued the first batch of Legacy CERs from our wind power projects portfolio. We look forward to this collaboration and wish UNMAI Carbon\u2019s Legacy CERs Platform the very best,\u201d he added.",
      "UNMAI Carbon plans to develop an optional project integrity ranking to help users distinguish between credits with different characteristics. It is also working on potential tokenisation and marketplace integration as separate future phases. A Legacy CER issued on the platform is a distinct, privately issued unit supported by evidence of the original CDM CER and its cancellation; it is not a UNFCCC issued CER or an Article 6 authorised unit. Any claim based on a retired unit remains subject to the buyer\u2019s applicable accounting and claims rules.",
      "Project owners and custodians can learn more at https://legacycers.unmaicarbon.earth. Account opening and issuance are subject to UNMAI Carbon Legacy CERs Platform\u2019s eligibility review, documentation requirements and applicable fees.",
      "About UNMAI Carbon Solutions: UNMAI Carbon Solutions Pte. Ltd. is a Singapore-headquartered global climate advisory and solutions firm engaged in unlocking high-integrity carbon markets. The firm is aligned across three core pillars: net zero transition and climate policy advisory, climate finance and investment strategy, and digital carbon market infrastructure and governance. UNMAI Carbon Solutions supports governments, Bilateral & Multilateral Development Institutions and Banks, and carbon market stakeholders across Asia, Africa, the Middle East, and other regions on operationalization of domestic carbon mechanisms and Paris Agreement - Article 6, decarbonization advisory, climate finance, carbon advisory & trading solutions, and digital innovation.",
      "UNMAI\u2019s operating philosophy is rooted in Truth, Transparency, Traceability, and Integrity, reflecting its commitment to credible decarbonization, robust market systems, and trusted climate action.",
      "Media Contact: Rimi Pathak, Communication Manager, UNMAI Carbon Solutions Pte. Ltd. Email: rimi.pathak@unmaicarbon.earth, Website: www.unmaicarbon.earth"
    ]
  },
  {
    "id": "pr-axel-michaelowa",
    "title": "Dr Axel Michaelowa joins UNMAI Carbon Solutions Singapore as Global Strategic Advisor",
    "dateLabel": "September 2026",
    "publishedAt": "2026-09-21",
    "pdfPath": "/UNMAI GSAB Dr Axel Press Release.pdf",
    "icon": "person",
    "summary": "UNMAI Carbon Solutions Pte. Ltd. announces the appointment of Dr Axel Michaelowa as a Global Strategic Advisor and member of its Global Strategic Advisory Board.",
    "content": [
      "Singapore, 21 September 2026 \u2014 UNMAI Carbon Solutions Pte. Ltd., a Singapore-headquartered climate advisory and solutions firm, announced the appointment of Dr Axel Michaelowa as a Global Strategic Advisor and member of its Global Strategic Advisory Board.",
      "Dr Michaelowa is an internationally recognised expert in climate policy and carbon markets, with more than three decades of experience working on international climate policy instruments and the UNFCCC process. He is a Senior Founding Partner of Perspectives Climate Group and Research Director at Perspectives Climate Research, and leads research on international climate policy at the University of Zurich. His work spans the design of carbon markets, domestic climate policy instruments, climate finance and the evolution of crediting mechanisms under the Kyoto Protocol and Paris Agreement. He has advised governments, international organisations and private institutions, and contributed to the Fourth and Fifth Assessment Reports of the Intergovernmental Panel on Climate Change.",
      "His appointment strengthens UNMAI Carbon\u2019s work on high-integrity carbon markets, Article 6 readiness, climate finance, carbon market infrastructure and digital public goods for monitoring, reporting and verification and national carbon registries. Dr Michaelowa will provide strategic insight on Article 6 methodologies, market integrity, authorisation and safeguards.",
      "\u201cDr Michaelowa brings a rare combination of rigorous research and practical experience in international climate negotiations and carbon market implementation,\u201d said Yuvaraj Dinesh Babu Nithyanandam, Founder & CEO of UNMAI Carbon Solutions. \u201cHis guidance will be valuable as we support governments and market participants in building credible frameworks that can mobilise climate finance at scale.\u201d",
      "\u201cI am pleased to join UNMAI Carbon\u2019s Global Strategic Advisory Board,\u201d said Dr Michaelowa. \u201cWell-designed rules, credible methodologies and transparent infrastructure are essential to the effective operation of carbon markets. I look forward to supporting UNMAI\u2019s work on Article 6 readiness and high-integrity market development.\u201d",
      "About UNMAI Carbon Solutions: UNMAI Carbon Solutions Pte. Ltd. is a Singapore-headquartered global climate advisory and solutions firm engaged in unlocking high-integrity carbon markets. The firm is aligned across three core pillars: net zero transition and climate policy advisory, climate finance and investment strategy, and digital carbon market infrastructure and governance. UNMAI Carbon Solutions supports governments, Bilateral & Multilateral Development Institutions and Banks, and carbon market stakeholders across Asia, Africa, the Middle East, and other regions on operationalization of domestic carbon mechanisms and Paris Agreement - Article 6, decarbonization advisory, climate finance, carbon advisory & trading solutions, and digital innovation.",
      "UNMAI\u2019s operating philosophy is rooted in Truth, Transparency, Traceability, and Integrity, reflecting its commitment to credible decarbonization, robust market systems, and trusted climate action.",
      "Media Contact: Rimi Pathak, Communication Manager, UNMAI Carbon Solutions Pte. Ltd. Email: rimi.pathak@unmaicarbon.earth, Website: www.unmaicarbon.earth"
    ]
  },
  {
    "id": "pr-chintan-shah",
    "title": "UNMAI appoints Chintan Shah to Global Strategic Advisory Board",
    "dateLabel": "May 2026",
    "publishedAt": "2026-05-19",
    "pdfPath": "/UNMAI PR Chintan Shah Final.pdf",
    "icon": "people",
    "summary": "UNMAI Carbon Solutions Pte Ltd announces the appointment of Chintan Shah to its Global Strategic Advisory Board.",
    "content": [
      "Singapore, 19th May 2026 \u2014 UNMAI Carbon Solutions Pte. Ltd., a Singapore-headquartered global climate advisory and solutions firm, announced Chintan Shah as Global Strategic Advisor to its Global Strategic Advisory Board to enhance the firm\u2019s capabilities in climate finance, investment strategy, structured finance, and carbon market-linked capital mobilization.",
      "Chintan Shah is the Founder of SustCred, a firm focused on sustainable investment in the renewable energy sector. Until recently he served as Group President of Strategic Business Development and Policy Affairs at ReNew. Earlier, he served as Director (Technical) at the Indian Renewable Energy Development Agency (IREDA) Ltd., where he was instrumental in project financing and policy planning. He also held leadership roles as President of Strategic Business Development and Corporate Affairs at Suzlon Energy Limited and worked with The Energy and Resources Institute (TERI).",
      "He brings three decades of experience across strategic business development, policy and regulatory affairs, project execution, structured lending, corporate finance, and investment advisory, with exposure spanning private credit, financial markets, and institutional financial solutions in clean energy.",
      "\u201cWe are delighted to welcome Chintan Shah at a time when climate finance and carbon markets are increasingly converging with mainstream capital markets,\u201d said Yuvaraj Dinesh Babu Nithyanandam, Founder & CEO of UNMAI Carbon Solutions. \u201cHis expertise in financing structures, institutional banking, investment strategy, and financial ecosystems will significantly strengthen UNMAI Carbon\u2019s ability to support scalable climate finance solutions and high-integrity carbon market development.\u201d",
      "\u201cUNMAI Carbon\u2019s focus on trusted carbon market systems, climate finance innovation, and digital infrastructure presents a strong platform for enabling meaningful impact in the global transition toward net zero,\u201d said Chintan Shah. \u201cI look forward to guiding UNMAI Carbon contributing toward strengthening investment pathways, financing ecosystems, and institutional confidence required for scaling credible climate and carbon market initiatives globally.\u201d",
      "About UNMAI Carbon Solutions: UNMAI Carbon Solutions Pte. Ltd. is aligned across three core pillars: net zero transition and climate policy advisory, climate finance and investment strategy, and carbon market infrastructure and governance. UNMAI supports governments, bilateral and multilateral development institutions and banks, and carbon market stakeholders across Asia, Africa, the Middle East, and other regions on operationalization of domestic carbon mechanisms and Paris Agreement \u2013 Article 6, decarbonization advisory, climate finance, carbon advisory & trading solutions, and digital innovation.",
      "Media contact: Yuvaraj Dinesh Babu Nithyanandam, Founder & CEO, UNMAI Carbon Solutions Pte. Ltd. Email: ydb@unmaicarbon.earth."
    ]
  },
  {
    "id": "pr-ajay-mathur",
    "title": "UNMAI appoints Dr Ajay Mathur as Global Strategic Advisor",
    "dateLabel": "May 2026",
    "publishedAt": "2026-05-13",
    "pdfPath": "/UNMAI PR Dr Ajay Mathur.pdf",
    "icon": "person",
    "summary": "UNMAI Carbon Solutions Pte Ltd announces Dr Ajay Mathur as its first Global Strategic Advisor to the Global Strategic Advisory Board.",
    "content": [
      "Singapore, 13th May 2026 \u2014 UNMAI Carbon Solutions Pte. Ltd., a Singapore-headquartered global climate advisory and solutions firm, announced Dr. Ajay Mathur as its first Global Strategic Advisor to its Global Strategic Advisory Board.",
      "Dr. Mathur currently serves as Professor of Practice at the School of Public Policy, Indian Institute of Technology Delhi, and is globally recognized as one of India\u2019s foremost leaders in clean energy, climate policy, and sustainable development. He previously served as Director General of the International Solar Alliance, where he advanced global cooperation on solar energy deployment, climate finance, and energy access across developing countries. Earlier, he led The Energy and Resources Institute (TERI), strengthening its global role in climate change research, energy transition, decarbonization, and sustainability policy advisory. Dr. Mathur also served as Director General of the Bureau of Energy Efficiency, Government of India, where he played a key role in shaping India\u2019s landmark energy efficiency and market-based transition programs, including the Perform, Achieve and Trade (PAT) mechanism.",
      "His appointment marks an important step in strengthening UNMAI Carbon\u2019s strategic leadership as the firm expands its work across high-integrity carbon markets, Article 6 readiness, climate finance, carbon market infrastructure, and digital infrastructure related to public good on dMRV and National Carbon Registry systems.",
      "\u201cWe are deeply privileged and excited to welcome Dr. Ajay Mathur to UNMAI Carbon Solutions, reflecting the caliber of globally respected leadership required to accelerate climate finance and strengthen high-integrity carbon markets,\u201d said Yuvaraj Dinesh Babu Nithyanandam, Founder & CEO of UNMAI Carbon Solutions.",
      "\u201cUNMAI Carbon\u2019s strong emphasis on integrity, transparency, interoperability, and practical market architecture is closely aligned with the direction in which the global carbon markets ecosystem must evolve,\u201d said Dr. Ajay Mathur. \u201cI am pleased to join UNMAI Carbon as a Global Strategic Advisor and look forward to contribute towards advancing credible carbon market frameworks, strengthening climate finance ecosystems, and enhancing institutional readiness for impactful decarbonization and inclusive net zero transitions.\u201d",
      "About UNMAI Carbon Solutions: UNMAI Carbon Solutions Pte. Ltd. is aligned across three core pillars: net zero transition and climate policy advisory, climate finance and investment strategy, and carbon market infrastructure and governance. UNMAI supports governments, bilateral and multilateral development institutions and banks, and carbon market stakeholders across Asia, Africa, the Middle East, and other regions on operationalization of domestic carbon mechanisms and Paris Agreement \u2013 Article 6, decarbonization advisory, climate finance, carbon advisory & trading solutions, and digital innovation.",
      "Media contact: Yuvaraj Dinesh Babu Nithyanandam, Founder & CEO, UNMAI Carbon Solutions Pte. Ltd. Email: ydb@unmaicarbon.earth."
    ]
  },
  {
    "id": "teri-unmai-mou",
    "title": "TERI Partners with UNMAI Carbon Solutions to Strengthen Carbon Markets and Climate Action",
    "dateLabel": "April 2026",
    "publishedAt": "2026-04-01",
    "sourceUrl": "https://www.energetica-india.net/news/teri-partners-with-unmai-carbon-solutions-to-strengthen-carbon-markets-and-climate-action",
    "sourceName": "Energetica India",
    "icon": "handshake",
    "summary": "The Energy and Resources Institute has signed an MoU with UNMAI Carbon Solutions to collaborate on climate change, decarbonisation, and carbon markets.",
    "content": [
      "The Energy and Resources Institute (TERI) has signed a Memorandum of Understanding (MoU) with Singapore-based UNMAI Carbon Solutions Pte. Ltd. to collaborate on advancing climate action, decarbonisation strategies, and robust carbon market frameworks.",
      "The agreement was formalised by Dr. Vibha Dhawan, Director General of TERI, and Nithyanandam Yuvaraj Dinesh Babu, Founder and CEO of UNMAI Carbon Solutions.",
      "The partnership will focus on advancing high-integrity carbon markets, strengthening climate finance mechanisms, and developing digital solutions such as MRV systems and carbon market infrastructure to support credible net-zero pathways in India and globally.",
      "By combining TERI\u2019s deep-rooted expertise in research, policy advisory, and sustainability with UNMAI\u2019s global experience in carbon markets and digital innovation, the collaboration seeks to accelerate scalable, science-driven solutions for net-zero transitions in India and beyond.",
      "The initiative underscores a growing emphasis on credible carbon ecosystems, where data integrity, financial innovation, and policy alignment will play a decisive role in shaping future climate outcomes."
    ]
  }
];

/** Newest first — every press-release list on the site renders this order. */
export const PRESS_RELEASES: PressRelease[] = [...RELEASES].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);
