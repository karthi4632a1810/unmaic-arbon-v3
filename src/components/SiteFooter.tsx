import { useLocation } from "react-router-dom";
import { ScrollLink } from "./ScrollLink";
import { COMPANY_LINKEDIN_URL, COMPANY_TAGLINE } from "../data/siteReference";
import { FooterReferenceColumns } from "./FooterReferenceColumns";
import { ScrollReveal } from "./ScrollReveal";
import imgLogoBlack from "../assets/logo-b.png";

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

const LINKEDIN_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="size-3.5" aria-hidden="true">
    <path d="M6.94 8.98H3.8v10.1h3.14V8.98ZM5.37 7.6a1.82 1.82 0 1 0 0-3.64 1.82 1.82 0 0 0 0 3.64ZM20.2 19.08v-5.55c0-2.97-1.58-4.35-3.69-4.35-1.7 0-2.46.94-2.88 1.59V8.98h-3.01c.04.84 0 10.1 0 10.1h3.13v-5.64c0-.3.02-.6.11-.82.23-.6.76-1.22 1.65-1.22 1.16 0 1.63.89 1.63 2.19v5.49h3.06Z" />
  </svg>
);

export function SiteFooter() {
  const { pathname } = useLocation();
  const showFooterReference = !HIDE_FOOTER_REFERENCE_PATHS.includes(
    pathname as (typeof HIDE_FOOTER_REFERENCE_PATHS)[number],
  );

  return (
    <footer className="bg-[#f9f9f9]">
      <ScrollReveal>
        <div className="mx-auto max-w-255 px-6 pb-8 pt-16">
          <div className="flex flex-col gap-10 border-b border-black/10 pb-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-2">
                <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl">
                  <img src={imgLogoBlack} alt="UNMAI Carbon mark" className="h-full w-full object-contain" />
                </div>
                <div className="space-y-1">
                  <span className="block text-xl font-black leading-[1.05] tracking-tight text-black">
                    UNMAI Carbon Solutions
                  </span>
                  <span className="block text-[12px] font-bold leading-[1.05] tracking-tight text-black/50">
                    {COMPANY_TAGLINE}
                  </span>
                </div>
              </div>
              <FooterSocialLinks />
            </div>

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16 lg:items-start">
              <div className="space-y-4">
                <p className="max-w-md text-sm leading-relaxed text-[#444654]">
                  Engineering trusted climate ecosystems through policy, finance, and interoperable
                  digital infrastructure.
                </p>
                <FooterContact />
              </div>
              <FooterQuickLinks />
            </div>
            {showFooterReference ? <FooterReferenceColumns /> : null}
          </div>
        </div>
      </ScrollReveal>
      <div className="bg-[#45464d] px-6 py-6">
        <div className="mx-auto grid max-w-[1020px] grid-cols-1 gap-4 text-xs text-white sm:grid-cols-3 sm:items-center">
          <p className="sm:text-left">© 2026 UNMAI Carbon Solutions Pte Ltd.</p>
          <a
            href="https://www.unmaicarbon.earth"
            target="_blank"
            rel="noreferrer noopener"
            className="text-center transition hover:text-white/80 hover:underline"
          >
            www.unmaicarbon.earth
          </a>
          <p className="text-center sm:text-right">{COMPANY_TAGLINE}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterSocialLinks() {
  return (
    <div className="flex gap-2 sm:ml-auto sm:justify-end">
      <a
        href={COMPANY_LINKEDIN_URL}
        target="_blank"
        rel="noreferrer noopener"
        className="flex size-8 items-center justify-center rounded-md border border-black/10 bg-black/5 text-black/70 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-black/20 hover:bg-black/10 hover:text-black hover:shadow-md active:translate-y-0 motion-reduce:hover:translate-y-0"
        aria-label="LinkedIn"
      >
        {LINKEDIN_ICON}
      </a>
    </div>
  );
}

function FooterContact() {
  return (
    <address className="not-italic grid max-w-xl gap-6 text-sm leading-relaxed text-black sm:grid-cols-2 sm:gap-x-12">
      <div className="flex gap-2.5">
        <MapPinIcon className="mt-0.5 size-4 shrink-0 text-black" />
        <div>
          Singapore HQ
          <br />
          10, Sim Lim Tower, Jalan Besar 
          <br />
          #10-10, Singapore 208787
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <a
          href="mailto:admin@unmaicarbon.earth"
          className="group flex items-center gap-2.5 transition hover:text-[#006c49]"
        >
          <MailIcon className="size-4 shrink-0 text-black" />
          <span className="group-hover:underline">admin@unmaicarbon.earth</span>
        </a>
        <a
          href="tel:+6590231823"
          className="group flex items-center gap-2.5 transition hover:text-[#006c49]"
        >
          <PhoneIcon className="size-4 shrink-0 text-black" />
          <span className="group-hover:underline">+65 9023 1823</span>
        </a>
      </div>
    </address>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.85 21 3 13.15 3 3a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z" />
    </svg>
  );
}

function FooterQuickLinks() {
  const midpoint = Math.ceil(QUICK_LINKS.length / 2);
  const columns = [QUICK_LINKS.slice(0, midpoint), QUICK_LINKS.slice(midpoint)] as const;

  return (
    <nav aria-label="Footer navigation" className="sm:justify-self-end lg:max-w-sm lg:justify-self-auto">
      <div className="grid grid-cols-2 gap-x-10 gap-y-2.5 sm:gap-x-14">
        {columns.map((links, columnIndex) => (
          <ul key={columnIndex} className="space-y-4 text-sm text-black">
            {links.map(({ label, to }) => (
              <li key={to}>
                <ScrollLink
                  to={to}
                  className="inline-block transition duration-200 ease-out hover:text-[#006c49] hover:underline"
                >
                  {label}
                </ScrollLink>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </nav>
  );
}
