import { useLocation } from "react-router-dom";
import { ScrollLink } from "./ScrollLink";
import { COMPANY_LINKEDIN_URL, COMPANY_TAGLINE } from "../data/siteReference";
import { FooterReferenceColumns } from "./FooterReferenceColumns";
import { DotSphere } from "./ElementMotifs";
import { ScrollReveal } from "./ScrollReveal";

const QUICK_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Digital Infrastructure", to: "/digital-infrastructure" },
  { label: "Global Engagements", to: "/global-engagements" },
  { label: "News", to: "/news" },
  { label: "Leadership", to: "/founder-advisory-board" },
  { label: "Contact", to: "/contact" },
] as const;

/** Footer reference lists are shown on the page body for these routes — hide duplicate in footer. */
const HIDE_FOOTER_REFERENCE_PATHS = ["/global-engagements", "/founder-advisory-board"] as const;

/** Wordmark, logo diamond and the tagline dots — brighter than the functional accents. */
const BRAND_GREEN = "#2fa84f";

const CONTACT_EMAIL = "admin@unmaicarbon.earth";
const CONTACT_PHONE = "+65 9023 1823";

const LINKEDIN_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
    <path d="M6.94 8.98H3.8v10.1h3.14V8.98ZM5.37 7.6a1.82 1.82 0 1 0 0-3.64 1.82 1.82 0 0 0 0 3.64ZM20.2 19.08v-5.55c0-2.97-1.58-4.35-3.69-4.35-1.7 0-2.46.94-2.88 1.59V8.98h-3.01c.04.84 0 10.1 0 10.1h3.13v-5.64c0-.3.02-.6.11-.82.23-.6.76-1.22 1.65-1.22 1.16 0 1.63.89 1.63 2.19v5.49h3.06Z" />
  </svg>
);

function MapPinIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 10.4c0 5-7 11.1-7 11.1s-7-6.1-7-11.1a7 7 0 1 1 14 0z" />
      <circle cx="12" cy="10.2" r="2.6" />
    </svg>
  );
}

function MailIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3.2" y="5.4" width="17.6" height="13.2" rx="2.2" />
      <path d="m3.8 7 8.2 5.8L20.2 7" />
    </svg>
  );
}

function PhoneIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7.4 3.6 9.6 4l1.1 3.5-2 1.5a11.6 11.6 0 0 0 5.3 5.3l1.5-2 3.5 1.1.4 2.2a2 2 0 0 1-2.2 2.3C10.3 17.3 6.7 13.7 5.1 5.8a2 2 0 0 1 2.3-2.2z" />
    </svg>
  );
}

function ChevronRight({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9.5 5.5 7 6.5-7 6.5" />
    </svg>
  );
}

function ArrowRight({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4.5 12h14" />
      <path d="m13 6.5 5.5 5.5L13 17.5" />
    </svg>
  );
}

/** Sprout riding a horizon line — the closing mark of the page. */
function SproutFlourish({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 340 150" className={className} fill="none" aria-hidden="true">
      <path
        d="M2 132c86 8 150-2 196-38 34-27 66-46 138-58"
        stroke="currentColor"
        strokeWidth="1.6"
        opacity="0.5"
      />
      <path d="M150 140V86" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M150 92c0-22 13-36 37-40 2 24-11 39-37 40z"
        fill="currentColor"
        opacity="0.75"
      />
      <path
        d="M150 100c0-19-11-31-32-35-2 21 9 34 32 35z"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}

export function SiteFooter() {
  const { pathname } = useLocation();
  const showFooterReference = !HIDE_FOOTER_REFERENCE_PATHS.includes(
    pathname as (typeof HIDE_FOOTER_REFERENCE_PATHS)[number],
  );

  return (
    <footer className="bg-white">
      <ScrollReveal>
        <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-8">
          <div className="relative pb-9 pt-10 sm:pb-10 sm:pt-12">
            <DotSphere
              className="pointer-events-none absolute -right-24 -top-20 h-[420px] w-[420px] text-[#17915b] opacity-[0.18]"
              nodes={false}
            />

            <a
              href={COMPANY_LINKEDIN_URL}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="UNMAI Carbon Solutions on LinkedIn"
              className="absolute right-0 top-8 flex size-10 items-center justify-center rounded-xl border border-[#131b2e]/12 bg-white text-[#131b2e] transition duration-300 hover:-translate-y-0.5 hover:border-[#17915b]/40 hover:text-[#17915b] motion-reduce:hover:translate-y-0 sm:top-10"
            >
              {LINKEDIN_ICON}
            </a>

            <div className="relative grid gap-9 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.95fr)_minmax(0,1fr)] lg:gap-0 lg:divide-x lg:divide-[#131b2e]/8">
              {/* Identity */}
              <div className="lg:pr-10">
                {/* Logo left, wordmark and tagline stacked tight beside it */}
                <ScrollLink to="/" className="flex items-center gap-3.5">
                  <span
                    className="size-13 shrink-0"
                    style={{
                      backgroundColor: BRAND_GREEN,
                      maskImage: "url('/logo-w.png')",
                      WebkitMaskImage: "url('/logo-w.png')",
                      maskSize: "contain",
                      WebkitMaskSize: "contain",
                      maskRepeat: "no-repeat",
                      WebkitMaskRepeat: "no-repeat",
                      maskPosition: "center",
                      WebkitMaskPosition: "center",
                    }}
                    aria-hidden
                  />
                  <span className="flex flex-col gap-1">
                    <span className="text-[1.35rem] font-extrabold leading-none tracking-[-0.02em] text-[#1f2937] sm:text-[1.55rem]">
                      UNMAI <span style={{ color: BRAND_GREEN }}>Carbon</span> Solutions
                    </span>
                    <span className="flex flex-wrap items-center gap-x-2 text-[13px] leading-tight text-[#6b7280]">
                      {COMPANY_TAGLINE.split("·").map((part, i) => (
                        <span key={part} className="inline-flex items-center gap-2">
                          {i > 0 ? (
                            <span
                              className="size-1.5 rounded-full"
                              style={{ backgroundColor: BRAND_GREEN }}
                              aria-hidden
                            />
                          ) : null}
                          {part.trim()}
                        </span>
                      ))}
                    </span>
                  </span>
                </ScrollLink>

                <p className="mt-6 max-w-[380px] text-sm leading-7 text-[#4d5a63]">
                  Engineering trusted climate ecosystems through policy, finance, and interoperable
                  digital infrastructure.
                </p>

                <div className="mt-6 flex gap-3">
                  <a
                    href={COMPANY_LINKEDIN_URL}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="LinkedIn"
                    className="flex size-11 items-center justify-center rounded-full border border-[#131b2e]/10 bg-white text-[#17915b] transition duration-300 hover:-translate-y-0.5 hover:border-[#17915b]/40 hover:bg-[#17915b]/6 motion-reduce:hover:translate-y-0"
                  >
                    {LINKEDIN_ICON}
                  </a>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    aria-label={`Email ${CONTACT_EMAIL}`}
                    className="flex size-11 items-center justify-center rounded-full border border-[#131b2e]/10 bg-white text-[#17915b] transition duration-300 hover:-translate-y-0.5 hover:border-[#17915b]/40 hover:bg-[#17915b]/6 motion-reduce:hover:translate-y-0"
                  >
                    <MailIcon className="size-4" />
                  </a>
                </div>
              </div>

              {/* Contact */}
              <address className="not-italic lg:px-10 lg:pt-12">
                <ul className="flex flex-col gap-5">
                  <li className="flex gap-3.5">
                    <span
                      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e8f4ee] text-[#17915b]"
                      aria-hidden
                    >
                      <MapPinIcon className="size-5" />
                    </span>
                    <div className="text-sm leading-6 text-[#4d5a63]">
                      <p className="font-bold text-[#131b2e]">Singapore HQ</p>
                      <p>10, Sim Lim Tower, Jalan Besar</p>
                      <p>#10-10, Singapore 208787</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3.5">
                    <span
                      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e8f4ee] text-[#17915b]"
                      aria-hidden
                    >
                      <MailIcon className="size-5" />
                    </span>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-sm font-semibold text-[#131b2e] transition hover:text-[#17915b]"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </li>
                  <li className="flex items-center gap-3.5">
                    <span
                      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e8f4ee] text-[#17915b]"
                      aria-hidden
                    >
                      <PhoneIcon className="size-5" />
                    </span>
                    <a
                      href="tel:+6590231823"
                      className="text-sm font-semibold text-[#131b2e] transition hover:text-[#17915b]"
                    >
                      {CONTACT_PHONE}
                    </a>
                  </li>
                </ul>
              </address>

              {/* Navigation */}
              <nav aria-label="Footer navigation" className="lg:pl-10 lg:pt-12">
                <ul className="grid grid-flow-col grid-cols-2 grid-rows-4 gap-x-6 gap-y-4">
                  {QUICK_LINKS.map(({ label, to }) => (
                    <li key={to}>
                      <ScrollLink
                        to={to}
                        className="group inline-flex items-center gap-2 text-sm text-[#3f4a54] transition duration-200 hover:text-[#17915b]"
                      >
                        <ChevronRight className="size-3.5 shrink-0 text-[#17915b] transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0" />
                        {label}
                      </ScrollLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {showFooterReference ? <FooterReferenceColumns /> : null}

          {/* Closing note */}
          <div className="pb-8">
            <div className="relative overflow-hidden rounded-2xl border border-[#131b2e]/8 bg-[linear-gradient(110deg,#fbfdfc_0%,#f3f9f5_100%)] px-5 py-5 sm:px-7">
              <SproutFlourish className="pointer-events-none absolute -right-4 bottom-0 h-[130px] w-[300px] text-[#17915b] opacity-30" />
              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
                <span
                  className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[#17915b]/20 bg-white text-[#17915b] shadow-[0_6px_18px_-10px_rgba(23,145,91,0.6)]"
                  aria-hidden
                >
                  <svg viewBox="0 0 24 24" className="size-6" fill="none">
                    <path
                      d="M20.2 3.9c-9.2.2-13.7 4.6-13.2 13.3 9.2-.2 13.7-4.6 13.2-13.3z"
                      fill="currentColor"
                    />
                    <path
                      d="M5.6 20.6C7.2 15.4 10.8 11.5 16.4 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>

                <div className="sm:border-r sm:border-[#131b2e]/10 sm:pr-7">
                  <p className="text-base font-bold leading-tight text-[#131b2e]">
                    Building trust. Enabling action.
                  </p>
                  <p className="mt-1 text-base font-semibold leading-tight text-[#17915b]">
                    Creating a sustainable future together.
                  </p>
                </div>

                <ScrollLink
                  to="/contact"
                  className="group inline-flex w-fit items-center gap-3 rounded-full border border-[#131b2e]/10 bg-white px-6 py-3 text-sm font-bold text-[#131b2e] shadow-[0_10px_26px_-18px_rgba(19,27,46,0.6)] transition duration-300 hover:-translate-y-0.5 hover:border-[#17915b]/40 hover:text-[#17915b] motion-reduce:hover:translate-y-0"
                >
                  Partner With Us
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0" />
                </ScrollLink>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-[#131b2e]/8 py-6">
            <div className="flex flex-col items-center gap-3 text-center text-xs text-[#6b7580] sm:flex-row sm:justify-between sm:text-left">
              <p>© 2026 UNMAI Carbon Solutions Pte Ltd. All rights reserved.</p>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                <a
                  href="https://www.unmaicarbon.earth"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition hover:text-[#17915b]"
                >
                  www.unmaicarbon.earth
                </a>
                <span className="text-[#131b2e]/20" aria-hidden>
                  |
                </span>
                <ScrollLink to="/contact" className="transition hover:text-[#17915b]">
                  Contact
                </ScrollLink>
                <span className="text-[#131b2e]/20" aria-hidden>
                  |
                </span>
                <span>{COMPANY_TAGLINE}</span>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}
