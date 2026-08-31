export {
  GLOBAL_ENGAGEMENT_COUNTRIES,
  INSTITUTIONAL_PARTICIPATION,
} from "../components/EngagementGlobalSections";

/** Alphabetical — same convention as the other footer reference columns. */
export const FOOTER_STRATEGIC_SERVICES = [
  "Capacity Building & Institutional Readiness",
  "Carbon Market Digital Infrastructure & Governance",
  "Carbon Project Development",
  "Climate Finance & Investment Strategy",
  "Net Zero Transition & Climate Advisory",
] as const;

export const COMPANY_LINKEDIN_URL = "https://sg.linkedin.com/company/unmai-carbon-solutions";

/**
 * Brochure offered by the site-wide CTA. Drop the PDF at `public/unmai-carbon-brochure.pdf`
 * (or point this at whatever filename you ship) — the link downloads it directly.
 */
export const COMPANY_BROCHURE_URL = "/unmai-carbon-brochure.pdf";

export const COMPANY_TAGLINE = "Truth · Transparency · Traceability · Integrity";
