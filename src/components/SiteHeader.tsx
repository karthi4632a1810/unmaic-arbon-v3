import { forwardRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ScrollLink } from "./ScrollLink";
import { COMPANY_LINKEDIN_URL } from "../data/siteReference";
import imgLogoBlack from "../assets/logo-b.png";
import imgLogoWhite from "../assets/logo-w.png";

const NAV_PIN_SCROLL_PX = 150;

const NAV_LINKS = [
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Digital Infrastructure", to: "/digital-infrastructure" },
  { label: "Global Engagements", to: "/global-engagements" },
  { label: "News", to: "/news" },
  { label: "Leadership", to: "/founder-advisory-board" },
] as const;

export const SiteHeader = forwardRef<HTMLElement>(function SiteHeader(_props, ref) {
  const { pathname } = useLocation();
  const [navDocked, setNavDocked] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const socialLinkClass = navDocked
    ? "flex size-8 items-center justify-center rounded-md border border-black/10 bg-black/5 text-black/70 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-black/20 hover:bg-black/10 hover:text-black hover:shadow-md active:translate-y-0 motion-reduce:hover:translate-y-0"
    : "flex size-8 items-center justify-center rounded-md border border-black/10 bg-black/5 text-black/70 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-black/20 hover:bg-black/10 hover:text-black hover:shadow-md active:translate-y-0 motion-reduce:hover:translate-y-0 lg:border-white/20 lg:bg-white/10 lg:text-white lg:hover:border-white/30 lg:hover:bg-white/20 lg:hover:text-white lg:hover:shadow-[0_8px_24px_rgba(255,255,255,0.12)]";

  useEffect(() => {
    const onScroll = () => {
      setNavDocked(window.scrollY >= NAV_PIN_SCROLL_PX);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      ref={ref}
      className={[
        "fixed left-1/2 z-99 -translate-x-1/2 transition-[top,width,border-radius,padding,box-shadow,background-color,border-color,border-width] duration-500 ease-in-out motion-reduce:transition-none",
        "top-0 w-screen rounded-none border-0 border-b border-black/8 bg-white px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.08)] sm:px-6",
        !navDocked
          ? "lg:top-6 lg:w-[min(1300px,calc(100%-2rem))] lg:rounded-full lg:border lg:border-white/12 lg:bg-[rgba(0,0,0,0.20)] lg:px-8 lg:py-3.5 lg:shadow-[0_12px_40px_rgba(0,0,0,0.10)]"
          : "",
      ].join(" ")}
    >
      <nav
        className="mx-auto flex max-w-[1300px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6"
        aria-label="Primary"
      >
        <div className="flex items-center justify-between gap-4">
          <ScrollLink
            to="/"
            className={
              navDocked
                ? "flex items-center justify-center gap-2 text-xl font-bold tracking-tight text-black transition hover:text-black/90"
                : "flex items-center justify-center gap-2 text-xl font-bold tracking-tight text-black transition hover:text-black/90 lg:text-white lg:hover:text-white/90"
            }
          >
            {navDocked ? (
              <img src={imgLogoBlack} alt="UNMAI Carbon" className="block size-10" />
            ) : (
              <>
                <img src={imgLogoBlack} alt="UNMAI Carbon" className="block size-10 lg:hidden" />
                <img src={imgLogoWhite} alt="UNMAI Carbon" className="hidden size-10 lg:block" />
              </>
            )}
            <div className="flex flex-col">
              <span
                className={
                  navDocked
                    ? "text-2xl font-bold tracking-tight text-black xs:text-[1.75rem]"
                    : "text-2xl font-bold tracking-tight text-black xs:text-[1.75rem] lg:text-white"
                }
              >
                UNMAI
              </span>
              {/* <span
                className={
                  navDocked
                    ? "text-xs font-bold uppercase tracking-tight text-black"
                    : "text-xs font-bold uppercase tracking-tight text-black opacity-75 md:text-white"
                }
              >
                Solutions
              </span> */}
            </div>
          </ScrollLink>
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="site-mobile-menu"
              className="inline-flex size-10 items-center justify-center rounded-full border border-black/10 bg-black/5 text-black transition hover:bg-black/10"
            >
              <span className="text-lg leading-none">{mobileMenuOpen ? "×" : "≡"}</span>
            </button>
          </div>
        </div>
        <div
          id="site-mobile-menu"
          className={`${
            mobileMenuOpen ? "flex" : "hidden"
          } max-h-[calc(100dvh-6rem)] flex-col items-stretch gap-2 overflow-y-auto rounded-2xl border border-black/10 bg-white p-4 shadow-[0_16px_40px_rgba(0,0,0,0.12)] lg:flex lg:max-h-none lg:flex-1 lg:flex-row lg:items-center lg:justify-center lg:gap-x-5 lg:gap-y-2 lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none xl:gap-x-6`}
        >
          {NAV_LINKS.map(({ label, to }) => {
            const active = pathname === to;
            return (
              <ScrollLink
                key={to}
                to={to}
                onClick={() => setMobileMenuOpen(false)}
                className={
                  navDocked
                    ? `whitespace-nowrap text-sm font-medium tracking-tight text-black/80 transition-colors duration-200 hover:text-black ${
                        active ? "border-b-2 border-black pb-0.5 text-black" : ""
                      }`
                    : `whitespace-nowrap text-sm font-medium tracking-tight transition-colors duration-200 hover:text-black lg:hover:text-white ${
                        active
                          ? "border-b-2 border-black pb-0.5 text-black lg:border-white lg:text-white"
                          : "text-black/80 lg:text-neutral-300"
                      }`
                }
              >
                {label}
              </ScrollLink>
            );
          })}
          <div className="mt-2 flex items-center gap-2 border-t border-black/10 pt-3 lg:hidden">
            <a
              href={COMPANY_LINKEDIN_URL}
              target="_blank"
              rel="noreferrer noopener"
              className={socialLinkClass}
              aria-label="LinkedIn"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="size-3.5"
                aria-hidden="true"
              >
                <path d="M6.94 8.98H3.8v10.1h3.14V8.98ZM5.37 7.6a1.82 1.82 0 1 0 0-3.64 1.82 1.82 0 0 0 0 3.64ZM20.2 19.08v-5.55c0-2.97-1.58-4.35-3.69-4.35-1.7 0-2.46.94-2.88 1.59V8.98h-3.01c.04.84 0 10.1 0 10.1h3.13v-5.64c0-.3.02-.6.11-.82.23-.6.76-1.22 1.65-1.22 1.16 0 1.63.89 1.63 2.19v5.49h3.06Z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="hidden gap-2 lg:flex">
          <a
            href={COMPANY_LINKEDIN_URL}
            target="_blank"
            rel="noreferrer noopener"
            className={socialLinkClass}
            aria-label="LinkedIn"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className="size-3.5"
              aria-hidden="true"
            >
              <path d="M6.94 8.98H3.8v10.1h3.14V8.98ZM5.37 7.6a1.82 1.82 0 1 0 0-3.64 1.82 1.82 0 0 0 0 3.64ZM20.2 19.08v-5.55c0-2.97-1.58-4.35-3.69-4.35-1.7 0-2.46.94-2.88 1.59V8.98h-3.01c.04.84 0 10.1 0 10.1h3.13v-5.64c0-.3.02-.6.11-.82.23-.6.76-1.22 1.65-1.22 1.16 0 1.63.89 1.63 2.19v5.49h3.06Z" />
            </svg>
          </a>
        </div>
      </nav>
    </header>
  );
});
